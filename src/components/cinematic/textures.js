import * as THREE from 'three'

/*
  Procedural canvas textures for the cinematic house.
  Generated at runtime so the hero needs no external texture downloads.
  Each texture represents roughly `tile` metres (see materials.js userData.tile).
*/

const rand = (() => {
  let s = 1337
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
})()

function make(size, draw, { srgb = true } = {}) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')
  draw(g, size)
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.anisotropy = 8
  if (srgb) t.colorSpace = THREE.SRGBColorSpace
  return t
}

function speckle(g, s, count, colors, min = 0.5, max = 1.5, alpha = 0.08) {
  for (let i = 0; i < count; i++) {
    g.fillStyle = colors[(rand() * colors.length) | 0]
    g.globalAlpha = alpha * (0.4 + rand())
    const r = min + rand() * (max - min)
    g.fillRect(rand() * s, rand() * s, r, r)
  }
  g.globalAlpha = 1
}

function blotches(g, s, count, color, alpha = 0.05, rMin = 20, rMax = 120) {
  for (let i = 0; i < count; i++) {
    const x = rand() * s
    const y = rand() * s
    const r = rMin + rand() * (rMax - rMin)
    const grd = g.createRadialGradient(x, y, 0, x, y, r)
    grd.addColorStop(0, color)
    grd.addColorStop(1, 'rgba(0,0,0,0)')
    g.globalAlpha = alpha * rand()
    g.fillStyle = grd
    g.fillRect(x - r, y - r, r * 2, r * 2)
  }
  g.globalAlpha = 1
}

export function createTextures(quality = 1) {
  const S = quality > 0.7 ? 1024 : 512

  const woodFloor = make(S, (g, s) => {
    const rows = 8
    const h = s / rows
    const tones = ['#b98c5d', '#a97c4f', '#c29563', '#b08455', '#9f7448', '#bd9061']
    for (let r = 0; r < rows; r++) {
      let x = -rand() * s * 0.5
      while (x < s) {
        const w = s * (0.35 + rand() * 0.45)
        g.fillStyle = tones[(rand() * tones.length) | 0]
        g.fillRect(x, r * h, w, h)
        // grain
        for (let k = 0; k < 14; k++) {
          g.strokeStyle = `rgba(70,40,15,${0.05 + rand() * 0.08})`
          g.lineWidth = 0.6 + rand()
          g.beginPath()
          const yy = r * h + rand() * h
          g.moveTo(x, yy)
          g.bezierCurveTo(x + w * 0.3, yy + (rand() - 0.5) * 6, x + w * 0.6, yy + (rand() - 0.5) * 6, x + w, yy + (rand() - 0.5) * 4)
          g.stroke()
        }
        g.fillStyle = 'rgba(40,22,8,0.55)'
        g.fillRect(x, r * h, 1.5, h)
        x += w
      }
      g.fillStyle = 'rgba(40,22,8,0.5)'
      g.fillRect(0, r * h, s, 1.5)
    }
  })

  const oak = make(S / 2, (g, s) => {
    g.fillStyle = '#b8895a'
    g.fillRect(0, 0, s, s)
    for (let k = 0; k < 90; k++) {
      g.strokeStyle = `rgba(80,45,15,${0.04 + rand() * 0.1})`
      g.lineWidth = 0.5 + rand() * 1.2
      g.beginPath()
      const x = rand() * s
      g.moveTo(x, 0)
      g.bezierCurveTo(x + (rand() - 0.5) * 10, s * 0.33, x + (rand() - 0.5) * 10, s * 0.66, x + (rand() - 0.5) * 6, s)
      g.stroke()
    }
  })

  const plaster = make(S / 2, (g, s) => {
    g.fillStyle = '#f3f1ec'
    g.fillRect(0, 0, s, s)
    blotches(g, s, 40, '#d9d4ca', 0.12, 10, 60)
    speckle(g, s, 4000, ['#cfc9bd', '#ffffff'], 0.5, 1.5, 0.12)
  })

  const render = make(S / 2, (g, s) => {
    g.fillStyle = '#ecebe6'
    g.fillRect(0, 0, s, s)
    blotches(g, s, 50, '#cfccc3', 0.15, 10, 70)
    speckle(g, s, 6000, ['#c4c0b6', '#ffffff', '#d8d4cb'], 0.5, 1.8, 0.14)
  })

  const concrete = make(S / 2, (g, s) => {
    g.fillStyle = '#b4b1aa'
    g.fillRect(0, 0, s, s)
    blotches(g, s, 70, '#8f8b84', 0.18, 10, 90)
    blotches(g, s, 40, '#d2cfc8', 0.18, 10, 60)
    speckle(g, s, 9000, ['#7e7a73', '#e2dfd9', '#9c9890'], 0.5, 2, 0.2)
    // formwork tie holes / panel joints
    g.strokeStyle = 'rgba(70,68,64,0.25)'
    g.lineWidth = 1.5
    g.strokeRect(0.75, 0.75, s - 1.5, s - 1.5)
    g.fillStyle = 'rgba(60,58,54,0.4)'
    ;[0.25, 0.75].forEach((a) => [0.25, 0.75].forEach((b) => { g.beginPath(); g.arc(a * s, b * s, 3, 0, Math.PI * 2); g.fill() }))
  })

  const cladding = make(S / 2, (g, s) => {
    g.fillStyle = '#2b2e35'
    g.fillRect(0, 0, s, s)
    const n = 8
    for (let i = 0; i < n; i++) {
      const x = (i / n) * s
      g.fillStyle = i % 2 ? '#2f333b' : '#292c33'
      g.fillRect(x, 0, s / n, s)
      g.fillStyle = 'rgba(0,0,0,0.55)'
      g.fillRect(x, 0, 2, s)
      g.fillStyle = 'rgba(255,255,255,0.05)'
      g.fillRect(x + 2, 0, 1, s)
    }
    speckle(g, s, 2000, ['#3a3f48', '#22252b'], 0.5, 1.5, 0.3)
  })

  const grass = make(S / 2, (g, s) => {
    g.fillStyle = '#62783f'
    g.fillRect(0, 0, s, s)
    blotches(g, s, 60, '#4c6230', 0.4, 10, 70)
    blotches(g, s, 40, '#869450', 0.3, 10, 50)
    speckle(g, s, 16000, ['#45592a', '#86955a', '#6e8144', '#56692f'], 0.8, 2.2, 0.5)
  })

  const pavers = make(S / 2, (g, s) => {
    g.fillStyle = '#9a968e'
    g.fillRect(0, 0, s, s)
    const n = 4
    const w = s / n
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++) {
        const l = 200 + ((rand() * 20) | 0)
        g.fillStyle = `rgb(${l},${l - 4},${l - 12})`
        g.fillRect(i * w + 2, j * w + 2, w - 4, w - 4)
      }
    speckle(g, s, 3000, ['#8d8980', '#e9e6df'], 0.5, 1.5, 0.25)
  })

  const marble = make(S / 2, (g, s) => {
    g.fillStyle = '#f2f0ec'
    g.fillRect(0, 0, s, s)
    for (let k = 0; k < 18; k++) {
      g.strokeStyle = `rgba(120,118,115,${0.08 + rand() * 0.18})`
      g.lineWidth = 0.5 + rand() * 2
      g.beginPath()
      let x = rand() * s
      let y = 0
      g.moveTo(x, y)
      while (y < s) {
        x += (rand() - 0.5) * 30
        y += 10 + rand() * 30
        g.lineTo(x, y)
      }
      g.stroke()
    }
  })

  const deck = make(S / 2, (g, s) => {
    const n = 8
    for (let i = 0; i < n; i++) {
      g.fillStyle = ['#8a6243', '#7d583b', '#93694a'][i % 3]
      g.fillRect(0, (i / n) * s, s, s / n)
      g.fillStyle = 'rgba(30,18,8,0.6)'
      g.fillRect(0, (i / n) * s, s, 2)
    }
  })

  const fire = make(128, (g, s) => {
    const grd = g.createLinearGradient(0, s, 0, 0)
    grd.addColorStop(0, '#ffb54a')
    grd.addColorStop(0.3, '#d9601c')
    grd.addColorStop(0.7, '#3a1406')
    grd.addColorStop(1, '#0c0502')
    g.fillStyle = grd
    g.fillRect(0, 0, s, s)
    // flame tongues
    for (let i = 0; i < 9; i++) {
      const x = (i + 0.5) * (s / 9)
      const fg = g.createLinearGradient(0, s, 0, s * 0.2)
      fg.addColorStop(0, 'rgba(255,220,140,0.9)')
      fg.addColorStop(1, 'rgba(255,120,30,0)')
      g.fillStyle = fg
      g.beginPath()
      g.moveTo(x - 6, s)
      g.quadraticCurveTo(x - 4, s * 0.5, x + (i % 2 ? 3 : -3), s * (0.25 + (i % 3) * 0.1))
      g.quadraticCurveTo(x + 4, s * 0.5, x + 6, s)
      g.fill()
    }
  })

  const art = (a, b, c) =>
    make(256, (g, s) => {
      g.fillStyle = '#f4f1ea'
      g.fillRect(0, 0, s, s)
      g.fillStyle = a
      g.fillRect(s * 0.12, s * 0.12, s * 0.5, s * 0.76)
      g.fillStyle = b
      g.beginPath()
      g.arc(s * 0.66, s * 0.4, s * 0.2, 0, Math.PI * 2)
      g.fill()
      g.fillStyle = c
      g.fillRect(s * 0.45, s * 0.66, s * 0.42, s * 0.06)
    })

  return {
    woodFloor,
    oak,
    plaster,
    render,
    concrete,
    cladding,
    grass,
    pavers,
    marble,
    deck,
    fire,
    art1: art('#161e4b', '#fcb415', '#0f9d8f'),
    art2: art('#c9bfae', '#161e4b', '#fcb415'),
  }
}
