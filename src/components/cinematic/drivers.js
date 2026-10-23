import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { createHouse } from './houseScene'
import { createCameraPath, smoothstep } from './cameraPath'

/*
  Renderers for the cinematic hero. Both expose the same interface:
    resize(width, height)
    render(progress, timeSeconds)
    dispose()
*/

/* ── Option C: real-time procedural house ─────────────────── */
export function createRealtimeDriver(canvas, { quality = 1, onFirstFrame } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', alpha: false })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, quality < 1 ? 1.25 : 1.75))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const house = createHouse({ quality })
  if (import.meta.env.DEV) window.__cine = { renderer, house }
  house.initEnvironment(renderer)
  const camera = new THREE.PerspectiveCamera(50, 1, 0.05, 1200)
  const sample = createCameraPath()
  const pos = new THREE.Vector3()
  const look = new THREE.Vector3()
  // Ambient occlusion (desktop quality only) grounds furniture, corners and joints.
  let composer = null
  if (quality >= 1) {
    composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(house.scene, camera))
    const ao = new GTAOPass(house.scene, camera, 1, 1)
    ao.updateGtaoMaterial({ radius: 0.6, distanceExponent: 1.4, thickness: 1.5, scale: 1.1, samples: 12 })
    ao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 6, rings: 2, samples: 12 })
    ao.blendIntensity = 0.9
    composer.addPass(ao)
    composer.addPass(new OutputPass())
  }

  let first = true
  let lastDoor = -1
  let lastSlide = -1

  // Static shadows: the sun never moves, so render the shadow map once.
  renderer.shadowMap.autoUpdate = false
  renderer.shadowMap.needsUpdate = true

  return {
    resize(w, h) {
      renderer.setSize(w, h, false)
      composer?.setPixelRatio(renderer.getPixelRatio())
      composer?.setSize(w, h)
      const aspect = w / h
      camera.aspect = aspect
      // Keep a consistent horizontal field of view across landscape and portrait screens.
      const hfov = THREE.MathUtils.degToRad(aspect < 1 ? 82 : 76)
      const vfov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(hfov / 2) / aspect))
      camera.fov = THREE.MathUtils.clamp(vfov, 42, 78)
      camera.updateProjectionMatrix()
    },
    render(p, time) {
      sample(p, pos, look)

      // Subtle drift on the establishing and final shots so the frame never feels frozen.
      const idleStart = 1 - smoothstep(0, 0.05, p)
      const idleEnd = smoothstep(0.95, 1, p)
      const idle = idleStart + idleEnd
      if (idle > 0) {
        pos.x += Math.sin(time * 0.22) * 0.6 * idle
        pos.y += Math.sin(time * 0.31) * 0.12 * idle
        look.x += Math.sin(time * 0.17) * 0.25 * idle
      }
      camera.position.copy(pos)
      camera.lookAt(look)

      const door = smoothstep(0.19, 0.285, p)
      const slide = smoothstep(0.795, 0.855, p)
      if (door !== lastDoor || slide !== lastSlide) {
        house.setDoor(door)
        house.setSlider(slide)
        renderer.shadowMap.needsUpdate = true // moving parts → refresh shadows
        lastDoor = door
        lastSlide = slide
      }

      // Gently lift exposure indoors (eye adaptation from daylight to interior).
      const inside = smoothstep(0.27, 0.34, p) * (1 - smoothstep(0.855, 0.9, p))
      renderer.toneMappingExposure = 1.05 + 0.32 * inside

      if (composer) composer.render()
      else renderer.render(house.scene, camera)
      if (first) {
        first = false
        onFirstFrame?.()
      }
    },
    dispose() {
      house.dispose()
      composer?.dispose()
      renderer.dispose()
      renderer.forceContextLoss?.()
    },
  }
}

/* ── Option A: pre-rendered image sequence ────────────────── */
/*
  Memory strategy: compressed frames are kept as Blobs (small), and only a window of
  decoded ImageBitmaps (LRU, `cacheSize`) lives in GPU/CPU memory at any time.
*/
export function createFrameDriver(canvas, { count, src, preload = 24, cacheSize = 36, onFirstFrame, onProgress } = {}) {
  const ctx = canvas.getContext('2d')
  const blobs = new Array(count)
  const bitmaps = new Map() // index -> ImageBitmap (insertion order = LRU)
  const decoding = new Set()
  let current = -1
  let width = 1
  let height = 1
  let disposed = false
  let loaded = 0
  let first = true

  const fetchFrame = async (i) => {
    if (blobs[i] || disposed) return
    try {
      const res = await fetch(src(i))
      if (!res.ok) return
      blobs[i] = await res.blob()
      loaded++
      onProgress?.(loaded / count)
    } catch {
      /* network error — frame will be retried on demand */
    }
  }

  const touch = (i, bmp) => {
    bitmaps.delete(i)
    bitmaps.set(i, bmp)
    while (bitmaps.size > cacheSize) {
      const [oldest, b] = bitmaps.entries().next().value
      b.close?.()
      bitmaps.delete(oldest)
    }
  }

  const decode = async (i) => {
    if (i < 0 || i >= count || bitmaps.has(i) || decoding.has(i)) return
    if (!blobs[i]) await fetchFrame(i)
    if (!blobs[i] || disposed) return
    decoding.add(i)
    try {
      const bmp = await createImageBitmap(blobs[i])
      if (disposed) return bmp.close?.()
      touch(i, bmp)
      if (i === current) draw(i)
    } finally {
      decoding.delete(i)
    }
  }

  const draw = (i) => {
    let bmp = bitmaps.get(i)
    if (!bmp) {
      // Draw the nearest decoded frame while the exact one decodes.
      let best = null
      let dist = Infinity
      bitmaps.forEach((b, k) => {
        const d = Math.abs(k - i)
        if (d < dist) (dist = d), (best = b)
      })
      bmp = best
    } else touch(i, bmp)
    if (!bmp) return
    const s = Math.max(width / bmp.width, height / bmp.height)
    const w = bmp.width * s
    const h = bmp.height * s
    ctx.drawImage(bmp, (width - w) / 2, (height - h) / 2, w, h)
    if (first) {
      first = false
      onFirstFrame?.()
    }
  }

  // Initial frames first, then progressively the rest in order.
  ;(async () => {
    await Promise.all(Array.from({ length: Math.min(preload, count) }, (_, i) => fetchFrame(i)))
    decode(0)
    const queue = Array.from({ length: count }, (_, i) => i).filter((i) => !blobs[i])
    const worker = async () => {
      while (queue.length && !disposed) await fetchFrame(queue.shift())
    }
    await Promise.all(Array.from({ length: 4 }, worker))
  })()

  return {
    resize(w, h) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.width = Math.round(w * dpr)
      height = canvas.height = Math.round(h * dpr)
      if (current >= 0) draw(current)
    },
    render(p) {
      const i = Math.round(p * (count - 1))
      if (i === current) return
      current = i
      draw(i)
      for (let k = -3; k <= 6; k++) decode(i + k)
    },
    dispose() {
      disposed = true
      bitmaps.forEach((b) => b.close?.())
      bitmaps.clear()
    },
  }
}
