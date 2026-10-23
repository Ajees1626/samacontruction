import * as THREE from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { createTextures } from './textures'

/*
  Procedural modern two-storey house for the homepage cinematic.
  ─────────────────────────────────────────────────────────────
  One connected building: every room the camera visits physically exists inside the same
  shell, so the journey (approach → door → living → kitchen → stairs → bedroom → balcony →
  reveal) is continuous rather than a sequence of unrelated images.

  Units are metres. +Z faces the street, ground floor at y = 0, first floor at y = FF.

  Plan (top view):
    Ground floor  x ∈ [-9, 9],  z ∈ [-6, 6]
      living (x < -0.35) · floating stair x ∈ [-0.3, 1.1] rising toward -z · kitchen/dining (x > 1.1)
      front door x ∈ [-3.65, -2.35] on z = 6
    First floor   x ∈ [-9, 6]
      bedroom x ∈ [-9, -0.35], z ∈ [-1.5, 6] · balcony x ∈ [-8, -1], z ∈ [6, 8.4]
*/

export const FF = 3.6 // first-floor level
const GF_H = 3.3 // ground-floor ceiling (underside of slab)
const UF_TOP = 6.7 // first-floor ceiling (underside of roof)

export function createHouse({ quality = 1 } = {}) {
  const scene = new THREE.Scene()
  const tex = createTextures(quality)
  const disposables = []
  const hq = quality > 0.7

  /* ── Materials ───────────────────────────────────────────── */
  const mat = (params, tile) => {
    const m = new THREE.MeshStandardMaterial(params)
    m.userData.tile = tile || 1
    disposables.push(m)
    return m
  }
  const M = {
    render: mat({ color: '#ffffff', map: tex.render, roughness: 0.92 }, 2.5),
    plaster: mat({ color: '#ffffff', map: tex.plaster, roughness: 0.95 }, 2.5),
    ceiling: mat({ color: '#f7f6f2', roughness: 0.95 }),
    cladding: mat({ color: '#ffffff', map: tex.cladding, roughness: 0.62, metalness: 0.15 }, 1.6),
    concrete: mat({ color: '#ffffff', map: tex.concrete, roughness: 0.88 }, 2.4),
    darkConcrete: mat({ color: '#8a8782', map: tex.concrete, roughness: 0.9 }, 2),
    wood: mat({ color: '#ffffff', map: tex.woodFloor, roughness: 0.5 }, 3),
    oak: mat({ color: '#ffffff', map: tex.oak, roughness: 0.55 }, 1.2),
    walnut: mat({ color: '#7a5539', map: tex.oak, roughness: 0.5 }, 1),
    frame: mat({ color: '#1d2026', roughness: 0.35, metalness: 0.7 }),
    black: mat({ color: '#15161a', roughness: 0.5, metalness: 0.4 }),
    steel: mat({ color: '#c9ccd1', roughness: 0.25, metalness: 0.9 }),
    brass: mat({ color: '#c79a3c', roughness: 0.3, metalness: 0.9 }),
    navyCab: mat({ color: '#1e2a5c', roughness: 0.55, metalness: 0.05 }),
    marble: mat({ color: '#ffffff', map: tex.marble, roughness: 0.18 }, 1.4),
    grass: mat({ color: '#d9dccb', map: tex.grass, roughness: 1 }, 6),
    pavers: mat({ color: '#ffffff', map: tex.pavers, roughness: 0.85 }, 2.4),
    deck: mat({ color: '#ffffff', map: tex.deck, roughness: 0.7 }, 2),
    linen: mat({ color: '#d9d3c7', roughness: 1 }),
    charcoalFabric: mat({ color: '#3b3e46', roughness: 1 }),
    bedding: mat({ color: '#f4f2ee', roughness: 1 }),
    rug: mat({ color: '#cbbfae', roughness: 1 }),
    rugDark: mat({ color: '#6f6a63', roughness: 1 }),
    leaf: mat({ color: '#4b6437', roughness: 0.9 }),
    leafDark: mat({ color: '#35482a', roughness: 0.9 }),
    leafLight: mat({ color: '#6c7d46', roughness: 0.9 }),
    trunk: mat({ color: '#5a4434', roughness: 1 }),
    pot: mat({ color: '#e3ddd2', roughness: 0.8 }),
    hedge: mat({ color: '#41602f', roughness: 1 }),
    gravel: mat({ color: '#b9b4a8', map: tex.concrete, roughness: 1 }, 1),
    hill: mat({ color: '#6f8458', roughness: 1 }),
  }
  M.glass = new THREE.MeshPhysicalMaterial({
    color: '#c3d6dd',
    roughness: 0.03,
    metalness: 0.15,
    transparent: true,
    opacity: 0.24,
    envMapIntensity: 2.4,
    depthWrite: false,
    side: THREE.DoubleSide,
  })
  M.water = new THREE.MeshPhysicalMaterial({ color: '#2f8fb3', roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.88, envMapIntensity: 1.4 })
  M.downlight = new THREE.MeshBasicMaterial({ color: '#fff3dc' })
  M.warmGlow = new THREE.MeshBasicMaterial({ color: '#ffd9a0' })
  M.fire = new THREE.MeshBasicMaterial({ map: tex.fire })
  M.art1 = new THREE.MeshStandardMaterial({ map: tex.art1, roughness: 0.8 })
  M.art2 = new THREE.MeshStandardMaterial({ map: tex.art2, roughness: 0.8 })
  disposables.push(M.glass, M.water, M.downlight, M.warmGlow, M.fire, M.art1, M.art2)
  Object.values(tex).forEach((t) => disposables.push(t))

  /* ── Geometry helpers ────────────────────────────────────── */
  const root = new THREE.Group()
  scene.add(root)

  // Box from min/max extents. `m` may be a material or an array of 6 (px, nx, py, ny, pz, nz).
  // UVs are rescaled to world size so textures keep a consistent physical scale.
  function box(x1, x2, y1, y2, z1, z2, m, { cast = true, receive = true, parent = root } = {}) {
    const w = Math.abs(x2 - x1)
    const h = Math.abs(y2 - y1)
    const d = Math.abs(z2 - z1)
    const geo = new THREE.BoxGeometry(w, h, d)
    const uv = geo.attributes.uv
    const dims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]]
    for (let i = 0; i < uv.count; i++) {
      const f = (i / 4) | 0
      const fm = Array.isArray(m) ? m[f] : m
      const tile = fm.userData?.tile || 1
      uv.setXY(i, (uv.getX(i) * dims[f][0]) / tile, (uv.getY(i) * dims[f][1]) / tile)
    }
    const mesh = new THREE.Mesh(geo, m)
    mesh.position.set((x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2)
    mesh.castShadow = cast
    mesh.receiveShadow = receive
    parent.add(mesh)
    disposables.push(geo)
    return mesh
  }

  // Face-material array: `outer` on one face, `inner` on all others.
  const faces = (outerIndex, outer, inner) => Array.from({ length: 6 }, (_, i) => (i === outerIndex ? outer : inner))
  const PX = 0, NX = 1, PY = 2, NY = 3, PZ = 4, NZ = 5

  // Wall running along X at depth z (thickness t), with rectangular openings {a, b, bottom, top}.
  function wallX(z, x1, x2, y1, y2, t, m, openings = []) {
    let cur = x1
    const z1 = z - t / 2
    const z2 = z + t / 2
    ;[...openings].sort((p, q) => p.a - q.a).forEach((o) => {
      if (o.a > cur) box(cur, o.a, y1, y2, z1, z2, m)
      if (o.bottom > y1) box(o.a, o.b, y1, o.bottom, z1, z2, m)
      if (o.top < y2) box(o.a, o.b, o.top, y2, z1, z2, m)
      cur = o.b
    })
    if (cur < x2) box(cur, x2, y1, y2, z1, z2, m)
  }
  function wallZ(x, z1, z2, y1, y2, t, m, openings = []) {
    let cur = z1
    const x1 = x - t / 2
    const x2 = x + t / 2
    ;[...openings].sort((p, q) => p.a - q.a).forEach((o) => {
      if (o.a > cur) box(x1, x2, y1, y2, cur, o.a, m)
      if (o.bottom > y1) box(x1, x2, y1, o.bottom, o.a, o.b, m)
      if (o.top < y2) box(x1, x2, o.top, y2, o.a, o.b, m)
      cur = o.b
    })
    if (cur < z2) box(x1, x2, y1, y2, cur, z2, m)
  }

  // Framed glazing inside an opening. axis 'x' = pane spans X at depth `at`.
  function glaze(axis, at, a, b, bottom, top, { mullions = 0, frameDepth = 0.08 } = {}) {
    const f = 0.05
    const g = new THREE.Group()
    root.add(g)
    const pane = axis === 'x' ? box(a, b, bottom, top, at - 0.01, at + 0.01, M.glass, { cast: false, receive: false, parent: g }) : box(at - 0.01, at + 0.01, bottom, top, a, b, M.glass, { cast: false, receive: false, parent: g })
    pane.renderOrder = 2
    const bar = (p1, p2, q1, q2) =>
      axis === 'x'
        ? box(p1, p2, q1, q2, at - frameDepth / 2, at + frameDepth / 2, M.frame, { parent: g })
        : box(at - frameDepth / 2, at + frameDepth / 2, q1, q2, p1, p2, M.frame, { parent: g })
    bar(a, b, top - f, top)
    bar(a, b, bottom, bottom + f)
    bar(a, a + f, bottom, top)
    bar(b - f, b, bottom, top)
    for (let i = 1; i <= mullions; i++) {
      const m = a + ((b - a) * i) / (mullions + 1)
      bar(m - f / 2, m + f / 2, bottom, top)
    }
    return g
  }

  const cyl = (rt, rb, h, m, x, y, z, seg = 24, opts = {}) => {
    const geo = new THREE.CylinderGeometry(rt, rb, h, seg)
    const mesh = new THREE.Mesh(geo, m)
    mesh.position.set(x, y, z)
    mesh.castShadow = opts.cast ?? true
    mesh.receiveShadow = true
    ;(opts.parent || root).add(mesh)
    disposables.push(geo)
    return mesh
  }
  const sphere = (r, m, x, y, z, sx = 1, sy = 1, sz = 1, detail = 1) => {
    const geo = new THREE.IcosahedronGeometry(r, detail)
    const mesh = new THREE.Mesh(geo, m)
    mesh.position.set(x, y, z)
    mesh.scale.set(sx, sy, sz)
    mesh.castShadow = true
    mesh.receiveShadow = true
    root.add(mesh)
    disposables.push(geo)
    return mesh
  }
  const plane = (w, h, m, x, y, z, rx = 0, ry = 0) => {
    const geo = new THREE.PlaneGeometry(w, h)
    const mesh = new THREE.Mesh(geo, m)
    mesh.position.set(x, y, z)
    mesh.rotation.set(rx, ry, 0)
    root.add(mesh)
    disposables.push(geo)
    return mesh
  }
  const downlight = (x, y, z) => {
    const m = plane(0.16, 0.16, M.downlight, x, y - 0.005, z, Math.PI / 2)
    m.material = M.downlight
    return m
  }

  /* ── Sky, fog, ground ────────────────────────────────────── */
  const skyGeo = new THREE.SphereGeometry(500, 32, 16)
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: { top: { value: new THREE.Color('#4f88cc') }, mid: { value: new THREE.Color('#9fc2e8') }, horizon: { value: new THREE.Color('#f3ece1') } },
    vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader:
      'uniform vec3 top; uniform vec3 mid; uniform vec3 horizon; varying vec3 vP; void main(){ float h = max(vP.y, 0.0); vec3 c = mix(horizon, mid, smoothstep(0.0, 0.18, h)); c = mix(c, top, smoothstep(0.18, 0.75, h)); gl_FragColor = vec4(c, 1.0); }',
  })
  const sky = new THREE.Mesh(skyGeo, skyMat)
  scene.add(sky)
  disposables.push(skyGeo, skyMat)
  scene.fog = new THREE.Fog('#e9ebe6', 70, 320)

  const groundGeo = new THREE.PlaneGeometry(700, 700)
  groundGeo.attributes.uv.array.forEach((_, i, arr) => (arr[i] *= 700 / 6))
  const ground = new THREE.Mesh(groundGeo, M.grass)
  ground.rotation.x = -Math.PI / 2
  ground.position.y = -0.3
  ground.receiveShadow = true
  root.add(ground)
  disposables.push(groundGeo)

  // Plinth / ground slab and front terrace
  box(-9.4, 9.4, -0.3, 0, -6.4, 6.4, M.concrete)
  box(-8.85, 8.85, 0, 0.012, -5.85, 5.85, M.wood, { cast: false }) // ground-floor timber floor
  box(-9.4, 9.4, -0.3, -0.02, 6.4, 9.6, M.pavers)
  // Rear terrace + pool
  box(-9.4, 9.4, -0.3, -0.02, -9, -6.4, M.deck)
  box(-9, -0.5, -0.3, -0.1, -15.2, -9, M.concrete)
  box(-8.6, -0.9, -0.3, -0.14, -14.8, -9.4, M.water, { cast: false })

  // Stepping-stone path + driveway
  for (let z = 10.1; z < 25; z += 1.0) box(-3.75, -2.25, -0.3, -0.24, z, z + 0.72, M.pavers, { cast: false })
  box(2.6, 8.8, -0.3, -0.26, 9.6, 34, M.concrete, { cast: false })

  // Boundary wall with gaps for path and driveway
  box(-26, -4.6, -0.3, 0.9, 26, 26.35, M.render)
  box(-1.4, 2.2, -0.3, 0.9, 26, 26.35, M.render)
  box(9.2, 28, -0.3, 0.9, 26, 26.35, M.render)

  /* ── Structure: slabs & roof ─────────────────────────────── */
  const slabTop = (top) => [M.render, M.render, top, M.ceiling, M.render, M.render]
  const SY1 = GF_H
  const SY2 = FF
  box(-9, -0.35, SY1, SY2, -6, 6, slabTop(M.wood)) // left of stair void
  box(1.2, 6, SY1, SY2, -6, 6, slabTop(M.wood)) // right of stair void
  box(-0.35, 1.2, SY1, SY2, -6, -4.2, slabTop(M.wood)) // landing
  box(-0.35, 1.2, SY1, SY2, 3.2, 6, slabTop(M.wood)) // front of void
  box(6, 9.3, SY1, SY2, -6.3, 6.3, slabTop(M.gravel)) // roof over kitchen
  box(-8, -1, SY1 + 0.05, SY2, 6, 8.4, slabTop(M.deck)) // balcony cantilever
  // Kitchen roof parapet
  box(9.0, 9.3, SY2, SY2 + 0.5, -6.3, 6.3, M.render)
  box(6, 9.3, SY2, SY2 + 0.5, 6.0, 6.3, M.render)
  box(6, 9.3, SY2, SY2 + 0.5, -6.3, -6.0, M.render)

  // Main roof with overhang + fascia
  box(-9.6, 6.6, UF_TOP, UF_TOP + 0.38, -6.6, 6.9, [M.render, M.render, M.gravel, M.ceiling, M.render, M.render])
  box(-9.6, 6.6, UF_TOP + 0.38, UF_TOP + 0.6, 6.75, 6.9, M.render)

  /* ── Ground-floor walls ──────────────────────────────────── */
  const T = 0.3
  const gfOuter = (face) => faces(face, M.render, M.plaster)
  const doorOpen = { a: -3.65, b: -2.35, bottom: 0, top: 2.7 }
  wallX(6, -9, 9, 0, GF_H, T, gfOuter(PZ), [
    { a: -8.4, b: -4.4, bottom: 0, top: 3.0 },
    doorOpen,
    { a: -2.2, b: -1.6, bottom: 0, top: 2.7 },
    { a: 2.2, b: 8.4, bottom: 0.9, top: 2.9 },
  ])
  glaze('x', 6, -8.4, -4.4, 0, 3.0, { mullions: 1 })
  glaze('x', 6, -2.2, -1.6, 0, 2.7)
  glaze('x', 6, 2.2, 8.4, 0.9, 2.9, { mullions: 2 })

  wallX(-6, -9, 9, 0, GF_H, T, gfOuter(NZ), [
    { a: -8.4, b: -0.8, bottom: 0, top: 3.0 },
    { a: 1.6, b: 7.8, bottom: 0.95, top: 2.9 },
  ])
  glaze('x', -6, -8.4, -0.8, 0, 3.0, { mullions: 2 })
  glaze('x', -6, 1.6, 7.8, 0.95, 2.9, { mullions: 2 })

  wallZ(-9, -6, 6, 0, GF_H, T, gfOuter(NX), [{ a: 3, b: 4.1, bottom: 0.4, top: 3.0 }])
  glaze('z', -9, 3, 4.1, 0.4, 3.0)
  wallZ(9, -6, 6, 0, GF_H, T, gfOuter(PX))

  // Concrete feature wall that carries the floating stair
  box(-0.6, -0.3, 0, GF_H, -6, 2.8, [M.plaster, M.concrete, M.plaster, M.plaster, M.concrete, M.plaster])

  // Timber fins beside the entrance
  for (let x = -1.35; x < 1.9; x += 0.2) box(x, x + 0.07, 0, GF_H, 6.16, 6.36, M.oak)

  /* ── Front door (animated pivot) ─────────────────────────── */
  const door = new THREE.Group()
  door.position.set(-3.65, 0, 6)
  root.add(door)
  box(0.02, 1.28, 0.01, 2.69, -0.035, 0.035, M.oak, { parent: door })
  box(1.08, 1.12, 0.75, 1.95, 0.035, 0.075, M.brass, { parent: door })
  box(1.08, 1.12, 0.75, 1.95, -0.075, -0.035, M.brass, { parent: door })
  // Door frame
  box(-3.7, -3.65, 0, 2.75, 5.85, 6.15, M.frame)
  box(-2.35, -2.3, 0, 2.75, 5.85, 6.15, M.frame)
  box(-3.7, -2.3, 2.7, 2.75, 5.85, 6.15, M.frame)
  // Entrance lights
  box(-4.1, -3.95, 1.9, 2.4, 6.15, 6.25, M.warmGlow, { cast: false })
  box(-2.05, -1.9, 1.9, 2.4, 6.15, 6.25, M.warmGlow, { cast: false })

  /* ── First-floor walls ───────────────────────────────────── */
  const ufOuter = (face) => faces(face, M.cladding, M.plaster)
  const slider = { a: -7.5, b: -1.5, bottom: FF, top: FF + 2.75 }
  wallX(6, -9, 6, FF, UF_TOP, T, ufOuter(PZ), [slider, { a: 1.5, b: 5, bottom: FF + 0.8, top: FF + 2.65 }])
  glaze('x', 6, 1.5, 5, FF + 0.8, FF + 2.65, { mullions: 1 })
  wallX(-6, -9, 6, FF, UF_TOP, T, ufOuter(NZ), [
    { a: -7.5, b: -3.5, bottom: FF + 0.9, top: FF + 2.6 },
    { a: 1.6, b: 5, bottom: FF + 0.8, top: FF + 2.6 },
  ])
  glaze('x', -6, -7.5, -3.5, FF + 0.9, FF + 2.6, { mullions: 1 })
  glaze('x', -6, 1.6, 5, FF + 0.8, FF + 2.6)
  wallZ(-9, -6, 6, FF, UF_TOP, T, ufOuter(NX), [{ a: 3.6, b: 5.2, bottom: FF + 0.6, top: FF + 2.7 }])
  glaze('z', -9, 3.6, 5.2, FF + 0.6, FF + 2.7)
  wallZ(6, -6, 6, FF, UF_TOP, T, ufOuter(PX))

  // Bedroom partitions
  wallX(-1.5, -9, -0.35, FF, UF_TOP, 0.14, M.plaster, [{ a: -2.45, b: -1.25, bottom: FF, top: FF + 2.2 }])
  wallZ(-0.35, -1.5, 6, FF, UF_TOP, 0.14, M.plaster)

  // Sliding balcony door: fixed pane + animated slider
  const slFrame = (g, a, b, z) => {
    const f = 0.05
    box(a, b, FF + 2.7, FF + 2.75, z - 0.04, z + 0.04, M.frame, { parent: g })
    box(a, b, FF, FF + 0.06, z - 0.04, z + 0.04, M.frame, { parent: g })
    box(a, a + f, FF, FF + 2.75, z - 0.04, z + 0.04, M.frame, { parent: g })
    box(b - f, b, FF, FF + 2.75, z - 0.04, z + 0.04, M.frame, { parent: g })
    const p = box(a, b, FF, FF + 2.75, z - 0.01, z + 0.01, M.glass, { cast: false, receive: false, parent: g })
    p.renderOrder = 2
  }
  const fixedPane = new THREE.Group()
  root.add(fixedPane)
  slFrame(fixedPane, -7.5, -4.45, 6.06)
  const sliderPane = new THREE.Group()
  root.add(sliderPane)
  slFrame(sliderPane, -4.55, -1.5, 5.94)

  // Balcony glass balustrade
  glaze('x', 8.38, -8, -1, FF, FF + 1.05, { frameDepth: 0.05 })
  glaze('z', -7.98, 6, 8.4, FF, FF + 1.05, { frameDepth: 0.05 })
  glaze('z', -1.02, 6, 8.4, FF, FF + 1.05, { frameDepth: 0.05 })

  // Stair void guards (first floor)
  glaze('z', 1.25, -4.2, 3.2, FF, FF + 1.0, { frameDepth: 0.04 })
  glaze('x', 3.25, -0.35, 1.25, FF, FF + 1.0, { frameDepth: 0.04 })
  glaze('z', -0.4, -4.15, -1.55, FF, FF + 1.0, { frameDepth: 0.04 })

  /* ── Floating stair ──────────────────────────────────────── */
  const RISERS = 20
  const rise = FF / RISERS
  const run = 7 / RISERS
  for (let i = 0; i < RISERS; i++) {
    const zFront = 2.8 - i * run
    box(-0.3, 1.1, (i + 1) * rise - 0.07, (i + 1) * rise, zFront - run - 0.02, zFront, M.oak)
  }
  // Glass balustrade along the open side, following the pitch
  const pitch = Math.atan2(FF, 7)
  const len = Math.hypot(FF, 7)
  const stairGlassGeo = new THREE.BoxGeometry(0.02, 1.0, len)
  const stairGlass = new THREE.Mesh(stairGlassGeo, M.glass)
  stairGlass.position.set(1.12, FF / 2 + 0.55, -0.7)
  stairGlass.rotation.x = pitch
  stairGlass.renderOrder = 2
  root.add(stairGlass)
  const railGeo = new THREE.BoxGeometry(0.05, 0.05, len)
  const rail = new THREE.Mesh(railGeo, M.frame)
  rail.position.set(1.12, FF / 2 + 1.06, -0.7)
  rail.rotation.x = pitch
  root.add(rail)
  disposables.push(stairGlassGeo, railGeo)

  /* ── Living room ─────────────────────────────────────────── */
  // Fireplace wall
  box(-8.85, -8.6, 0, GF_H, -3.8, 1.6, M.darkConcrete)
  box(-8.6, -8.55, 0.45, 1.05, -2.4, 0.2, M.black)
  plane(2.5, 0.32, M.fire, -8.54, 0.66, -1.1, 0, Math.PI / 2)
  box(-8.6, -8.2, 0.3, 0.42, -3.6, 1.4, M.darkConcrete) // hearth bench
  // Rug, sofa, chaise
  box(-7.9, -4.0, 0, 0.015, -3.7, 1.3, M.rug, { cast: false })
  box(-5.4, -4.45, 0.08, 0.42, -3.2, 0.9, M.linen)
  box(-4.65, -4.4, 0.08, 0.85, -3.2, 0.9, M.linen) // back
  box(-5.4, -4.4, 0.08, 0.62, -3.4, -3.2, M.linen)
  box(-5.4, -4.4, 0.08, 0.62, 0.9, 1.1, M.linen)
  for (let z = -3.1; z < 0.8; z += 1.3) box(-5.3, -4.68, 0.42, 0.56, z, z + 1.22, M.linen)
  box(-5.5, -4.4, 0, 0.08, -3.4, 1.1, M.black)
  // Coffee table + objects
  box(-7.1, -6.0, 0.3, 0.36, -2.0, -0.3, M.walnut)
  box(-7.0, -6.1, 0, 0.3, -1.9, -0.4, M.black)
  box(-6.8, -6.5, 0.36, 0.42, -1.6, -1.3, M.brass)
  // Armchairs
  ;[-3.3, 1.3].forEach((z) => {
    box(-7.6, -6.8, 0.1, 0.45, z - 0.4, z + 0.4, M.charcoalFabric)
    box(-7.6, -7.45, 0.1, 0.85, z - 0.4, z + 0.4, M.charcoalFabric)
  })
  // Plants by the glazing
  const plant = (x, z, s = 1, y0 = 0) => {
    cyl(0.22 * s, 0.17 * s, 0.5 * s, M.pot, x, y0 + 0.25 * s, z)
    sphere(0.42 * s, M.leaf, x, y0 + 0.95 * s, z, 1, 1.25, 1)
    sphere(0.3 * s, M.leafLight, x + 0.18 * s, y0 + 1.25 * s, z - 0.1 * s)
  }
  plant(-8.3, -5.3, 1.3)
  plant(-1.3, -5.3, 1.1)
  plant(-8.2, 5.2, 1)
  // Floor lamp
  cyl(0.015, 0.015, 1.7, M.black, -4.0, 0.85, -3.6, 8)
  cyl(0.2, 0.28, 0.25, M.linen, -4.0, 1.75, -3.6, 20)
  // Artwork on concrete wall
  plane(1.6, 1.1, M.art1, -0.62, 1.7, -2.5, 0, -Math.PI / 2)
  plane(1.1, 1.4, M.art2, -0.62, 1.6, 0.2, 0, -Math.PI / 2)
  // Console in foyer
  box(-1.4, -0.65, 0.75, 0.82, 3.4, 5.4, M.walnut)
  box(-1.35, -0.7, 0, 0.75, 3.45, 3.5, M.black)
  box(-1.35, -0.7, 0, 0.75, 5.3, 5.35, M.black)

  /* ── Kitchen & dining ────────────────────────────────────── */
  box(8.3, 8.85, 0, 0.86, -5.2, 2.2, M.navyCab)
  box(8.25, 8.85, 0.86, 0.91, -5.2, 2.2, M.marble)
  box(8.83, 8.85, 0.91, 1.7, -5.2, 2.2, M.marble) // splashback
  box(8.3, 8.85, 0, 2.7, -5.85, -5.2, M.navyCab) // tall pantry
  box(8.5, 8.85, 1.9, 2.6, -5.2, -1.4, M.navyCab)
  box(8.5, 8.85, 1.9, 2.6, 0.3, 2.2, M.navyCab)
  box(8.35, 8.85, 2.3, 2.45, -1.4, 0.3, M.steel) // hood
  box(8.55, 8.75, 2.45, GF_H, -0.75, -0.35, M.steel)
  box(8.3, 8.5, 0.92, 0.93, -1.2, 0.1, M.black) // hob
  // brass handles
  for (let z = -5.0; z < 2.2; z += 0.6) box(8.27, 8.3, 0.7, 0.72, z, z + 0.35, M.brass, { cast: false })
  // Island with waterfall marble
  box(4.75, 5.75, 0, 0.88, -2.8, 0.8, M.oak)
  box(4.6, 5.9, 0.88, 0.94, -3.0, 1.0, M.marble)
  box(4.6, 5.9, 0, 0.88, -3.0, -2.94, M.marble)
  box(4.6, 5.9, 0, 0.88, 0.94, 1.0, M.marble)
  // Stools
  ;[-2.2, -1.0, 0.2].forEach((z) => {
    cyl(0.2, 0.2, 0.06, M.walnut, 4.15, 0.68, z)
    cyl(0.02, 0.02, 0.66, M.black, 4.15, 0.34, z, 8)
    cyl(0.18, 0.18, 0.02, M.black, 4.15, 0.01, z)
  })
  // Pendants
  ;[-2.1, -1.0, 0.1].forEach((z) => {
    cyl(0.006, 0.006, 0.95, M.black, 5.25, GF_H - 0.47, z, 6, { cast: false })
    cyl(0.07, 0.17, 0.28, M.black, 5.25, GF_H - 1.05, z, 20)
    cyl(0.16, 0.16, 0.01, M.warmGlow, 5.25, GF_H - 1.2, z, 20, { cast: false })
  })
  // Dining table + chairs
  box(3.8, 6.8, 0.74, 0.79, 3.55, 4.75, M.walnut)
  box(3.95, 4.05, 0, 0.74, 3.7, 4.6, M.black)
  box(6.55, 6.65, 0, 0.74, 3.7, 4.6, M.black)
  ;[4.3, 5.3, 6.3].forEach((x) => {
    ;[3.2, 5.1].forEach((z) => {
      box(x - 0.22, x + 0.22, 0.44, 0.48, z - 0.22, z + 0.22, M.oak)
      box(x - 0.22, x + 0.22, 0.48, 0.9, z + (z < 4 ? -0.22 : 0.18), z + (z < 4 ? -0.18 : 0.22), M.oak)
      box(x - 0.2, x + 0.2, 0, 0.44, z - 0.2, z + 0.2, M.black, { cast: false })
    })
  })
  plant(8.4, 5.3, 1)
  plant(1.6, -5.3, 0.9)

  /* ── Bedroom ─────────────────────────────────────────────── */
  const y = FF
  box(-8.97, -8.85, y, y + 1.35, 0.4, 4.0, M.linen) // upholstered headboard
  box(-8.85, -6.7, y, y + 0.32, 1.1, 3.3, M.walnut)
  box(-8.8, -6.75, y + 0.32, y + 0.58, 1.15, 3.25, M.bedding)
  box(-8.0, -6.7, y + 0.58, y + 0.62, 1.12, 3.28, M.rug) // throw
  box(-8.75, -8.3, y + 0.58, y + 0.75, 1.3, 2.1, M.bedding)
  box(-8.75, -8.3, y + 0.58, y + 0.75, 2.3, 3.1, M.bedding)
  ;[0.55, 3.85].forEach((z) => {
    box(-8.85, -8.35, y, y + 0.5, z - 0.25, z + 0.25, M.walnut)
    cyl(0.005, 0.005, 1.6, M.black, -8.6, UF_TOP - 0.8, z, 6, { cast: false })
    sphere(0.12, M.warmGlow, -8.6, y + 1.35, z, 1, 1, 1, 2).castShadow = false
  })
  box(-8.2, -4.8, y, y + 0.012, 0.3, 4.2, M.rugDark, { cast: false })
  box(-6.4, -5.9, y, y + 0.45, 1.3, 3.1, M.charcoalFabric) // bench
  box(-7.6, -3.2, y, y + 2.6, -1.43, -0.85, M.oak) // wardrobe
  for (let x = -7.6; x < -3.2; x += 1.1) box(x, x + 0.01, y + 0.05, y + 2.55, -0.85, -0.84, M.black, { cast: false })
  plant(-1.0, 5.3, 1, y)
  plane(1.4, 1.0, M.art2, -0.43, y + 1.6, 2.4, 0, -Math.PI / 2)
  // Study corner beyond the stair
  box(2, 4, y + 0.73, y + 0.77, -5.6, -4.8, M.oak)
  box(2.05, 2.1, y, y + 0.73, -5.55, -4.85, M.black)
  box(3.9, 3.95, y, y + 0.73, -5.55, -4.85, M.black)
  // Balcony furniture
  box(-7.6, -6.9, y + 0.1, y + 0.45, 6.6, 7.4, M.walnut)
  box(-7.6, -6.9, y + 0.45, y + 0.9, 6.6, 6.7, M.walnut)
  box(-1.9, -1.2, y, y + 0.55, 6.3, 8.2, M.darkConcrete)
  sphere(0.35, M.leaf, -1.55, y + 0.75, 6.8, 1, 0.8, 1)
  sphere(0.35, M.leafDark, -1.55, y + 0.75, 7.7, 1, 0.8, 1)

  /* ── Ceiling downlights ─────────────────────────────────── */
  for (let x = -7.5; x <= 7.5; x += 2.5) for (let z = -4.5; z <= 4.5; z += 3) if (!(x > -0.6 && x < 1.3)) downlight(x, GF_H, z)
  for (let x = -7.5; x <= 4.5; x += 2.5) for (let z = -4.5; z <= 4.5; z += 3) if (!(x > -0.6 && x < 1.3)) downlight(x, UF_TOP, z)

  /* ── Landscape ───────────────────────────────────────────── */
  // Trees are built from many small, noise-displaced foliage clumps and drawn with
  // instancing (one draw call per foliage tone) to keep the landscape rich but cheap.
  const leafGeo = new THREE.SphereGeometry(1, 14, 10)
  {
    const p = leafGeo.attributes.position
    const v = new THREE.Vector3()
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i)
      const n = 0.88 + 0.12 * Math.sin(v.x * 5.1 + v.y * 3.7) * Math.cos(v.z * 4.3 - v.y * 2.1) + (Math.random() - 0.5) * 0.12
      v.multiplyScalar(n)
      p.setXYZ(i, v.x, v.y, v.z)
    }
    leafGeo.computeVertexNormals()
  }
  const trunkGeo = new THREE.CylinderGeometry(0.6, 1, 1, 7)
  disposables.push(leafGeo, trunkGeo)
  const leafSets = [[], [], []]
  const trunks = []
  const rnd = (() => { let s = 7; return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646 })()
  const tree = (x, z, s = 1, kind = 'round') => {
    const h = (kind === 'column' ? 1.6 : 2.4) * s
    trunks.push([x, -0.3 + h / 2, z, 0.13 * s, h])
    const clumps = kind === 'column' ? 7 : 11
    for (let i = 0; i < clumps; i++) {
      const a = rnd() * Math.PI * 2
      const r = (kind === 'column' ? 0.35 : 1.45) * s * Math.sqrt(rnd())
      const yy = kind === 'column' ? h + (i / clumps) * 5.2 * s : h + 0.5 * s + rnd() * 2.2 * s
      const size = (kind === 'column' ? 0.75 : 0.95 + rnd() * 0.55) * s
      leafSets[(rnd() * 3) | 0].push([x + Math.cos(a) * r, yy, z + Math.sin(a) * r, size, kind === 'column' ? 1.3 : 0.85 + rnd() * 0.3])
    }
  }
  ;[[-13, 9, 1.3], [-15.5, -1, 1.5], [-12.5, -10, 1.2], [-4, -19, 1.6], [6, -18, 1.4], [14, -9, 1.5], [16, 3, 1.3], [-10, 19, 1], [19, 16, 1.2], [-20, 22, 1.4], [-24, 6, 1.6], [24, -2, 1.5], [-17, 30, 1.3], [26, 30, 1.5], [-30, -14, 1.7], [30, -16, 1.6]].forEach(([x, z, s]) => tree(x, z, s))
  ;[[11.2, -4], [11.2, -1], [11.2, 2], [-11.6, 3.5], [-11.6, 6.2]].forEach(([x, z]) => tree(x, z, 0.75, 'column'))
  const ringCount = hq ? 90 : 40
  for (let i = 0; i < ringCount; i++) {
    const a = (i / ringCount) * Math.PI * 2 + rnd() * 0.05
    const r = 46 + rnd() * 50
    tree(Math.cos(a) * r, Math.sin(a) * r - 6, 1.4 + rnd() * 1.2)
  }
  const dummy = new THREE.Object3D()
  ;[M.leaf, M.leafDark, M.leafLight].forEach((m, k) => {
    const list = leafSets[k]
    const im = new THREE.InstancedMesh(leafGeo, m, list.length)
    list.forEach(([x, y2, z, s, sy], i) => {
      dummy.position.set(x, y2, z)
      dummy.scale.set(s, s * sy, s)
      dummy.rotation.set(rnd() * 3, rnd() * 3, rnd() * 3)
      dummy.updateMatrix()
      im.setMatrixAt(i, dummy.matrix)
    })
    im.castShadow = true
    im.receiveShadow = true
    root.add(im)
  })
  const trunkMesh = new THREE.InstancedMesh(trunkGeo, M.trunk, trunks.length)
  trunks.forEach(([x, y2, z, r, h], i) => {
    dummy.position.set(x, y2, z)
    dummy.rotation.set(0, 0, 0)
    dummy.scale.set(r, h, r)
    dummy.updateMatrix()
    trunkMesh.setMatrixAt(i, dummy.matrix)
  })
  trunkMesh.castShadow = true
  root.add(trunkMesh)

  // Distant rolling hills, softened by fog
  ;[[-160, -220, 120], [40, -260, 150], [220, -120, 130], [-260, 40, 140], [240, 160, 120], [-120, 260, 150], [90, 280, 130]].forEach(([x, z, r]) => {
    const hill = sphere(r, M.hill, x, -r * 0.82, z, 1.6, 1, 1, 3)
    hill.castShadow = false
  })
  // Hedges and planters along the facade
  box(-8.9, -4.6, -0.3, 0.55, 9.7, 10.3, M.hedge)
  box(-1.4, 2.2, -0.3, 0.55, 9.7, 10.3, M.hedge)
  box(-9.4, -9.0, -0.3, 0.5, -6, 6, M.hedge)
  // Ornamental grasses
  for (let i = 0; i < 14; i++) {
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.9, 7), i % 2 ? M.leafLight : M.leaf)
    cone.position.set(-8.6 + (i % 7) * 0.65, 0.1, 10.8 + Math.floor(i / 7) * 0.6)
    cone.castShadow = true
    root.add(cone)
    disposables.push(cone.geometry)
  }
  // Garden bollards
  ;[12, 15, 18, 21].forEach((z) => {
    cyl(0.07, 0.07, 0.7, M.black, -4.3, 0.05, z, 10)
    cyl(0.072, 0.072, 0.1, M.warmGlow, -4.3, 0.33, z, 10, { cast: false })
  })
  // Pool loungers
  ;[-7, -5.4].forEach((x) => box(x, x + 0.7, -0.02, 0.35, -8.6, -6.8, M.bedding))

  /* ── Lighting ────────────────────────────────────────────── */
  const hemi = new THREE.HemisphereLight('#dbe6f2', '#6f6553', 0.45)
  scene.add(hemi)

  const sun = new THREE.DirectionalLight('#ffe8c8', 7.5)
  sun.position.set(-18, 22, 20)
  sun.target.position.set(0, 0, 0)
  sun.castShadow = true
  sun.shadow.mapSize.set(hq ? 4096 : 1024, hq ? 4096 : 1024)
  Object.assign(sun.shadow.camera, { left: -24, right: 24, top: 24, bottom: -24, near: 1, far: 90 })
  sun.shadow.camera.updateProjectionMatrix()
  sun.shadow.bias = -0.0003
  sun.shadow.normalBias = 0.03
  sun.shadow.radius = 3
  scene.add(sun, sun.target)

  const interior = []
  const pl = (x, y2, z, intensity = 14, color = '#ffe2bb', distance = 14) => {
    const l = new THREE.PointLight(color, intensity, distance, 2)
    l.position.set(x, y2, z)
    l.userData.base = intensity
    scene.add(l)
    interior.push(l)
  }
  pl(-5, 2.8, 0, 18)
  pl(-2.8, 2.8, 4.4, 8)
  pl(5.2, 2.4, -1, 14)
  pl(5.2, 2.8, 4.2, 8)
  pl(0.4, 5.6, -2, 10)
  pl(-4.8, 6.2, 2.2, 14)
  pl(-1.8, 6.2, -3.8, 6)

  /* ── Animated parts API ──────────────────────────────────── */
  return {
    scene,
    sun,
    hemi,
    interior,
    setDoor(open) {
      door.rotation.y = open * 1.62 // swings inward
    },
    setSlider(open) {
      sliderPane.position.x = -open * 2.85
    },
    initEnvironment(renderer) {
      const pmrem = new THREE.PMREMGenerator(renderer)
      const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
      scene.environment = env
      scene.environmentIntensity = 0.42
      pmrem.dispose()
      disposables.push(env)
    },
    dispose() {
      disposables.forEach((d) => d.dispose?.())
    },
  }
}
