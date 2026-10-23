import * as THREE from 'three'

/*
  Scroll-progress → camera keyframes for the house journey.
  `t` is the scroll progress (0–1) at which the camera reaches the key.
  Positions and look-at targets are each interpolated along a centripetal Catmull-Rom spline,
  so the camera moves through space continuously with no cuts.
*/
export const KEYS = [
  // 01 Exterior — wide establishing shot
  { t: 0.0, pos: [10.5, 2.4, 27], look: [-1.5, 3.0, 0] },
  // 02 Approach the entrance
  { t: 0.075, pos: [5.5, 2.2, 22.5], look: [-2.2, 2.6, 4] },
  { t: 0.145, pos: [-1.4, 1.8, 14.5], look: [-3, 1.75, 6] },
  { t: 0.2, pos: [-2.9, 1.7, 9.6], look: [-2.95, 1.55, 6] },
  // 03 Door opens, camera crosses the threshold
  { t: 0.27, pos: [-2.85, 1.7, 7.7], look: [-3.2, 1.5, 3] },
  { t: 0.325, pos: [-2.85, 1.65, 4.6], look: [-4.6, 1.35, 0] },
  // 04 Living room
  { t: 0.39, pos: [-3.5, 1.6, 2.3], look: [-7.4, 1.15, -3.2] },
  { t: 0.45, pos: [-1.3, 1.6, 4.1], look: [2, 1.4, 1.5] },
  // 05 Kitchen
  { t: 0.51, pos: [2.4, 1.65, 3.1], look: [7.6, 1.05, -1.6] },
  { t: 0.56, pos: [2.0, 1.65, 4.5], look: [0.4, 2.2, 0.5] },
  // 06 Staircase — climb to the first floor
  { t: 0.6, pos: [0.4, 1.7, 3.9], look: [0.4, 3.3, -2.5] },
  { t: 0.645, pos: [0.4, 3.45, -0.7], look: [0.4, 4.4, -6] },
  { t: 0.69, pos: [0.4, 5.25, -4.55], look: [-1.8, 5.1, -5.2] },
  { t: 0.72, pos: [-1.85, 5.25, -4.6], look: [-1.85, 5.05, 0] },
  // 07 Bedroom
  { t: 0.755, pos: [-1.85, 5.25, -0.55], look: [-5.2, 4.6, 2.4] },
  { t: 0.79, pos: [-3.0, 5.2, 1.6], look: [-8.4, 4.4, 2.2] },
  // 08 Balcony — doors slide open, step outside
  { t: 0.83, pos: [-4.0, 5.2, 3.4], look: [-3.8, 4.9, 10] },
  { t: 0.875, pos: [-3.2, 5.25, 7.5], look: [-1.0, 3.6, 28] },
  // 09 Pull back to reveal the complete house
  { t: 0.935, pos: [3.2, 7.2, 16.5], look: [-1.5, 3.2, 0] },
  { t: 1.0, pos: [12.5, 5.0, 24.5], look: [-1.0, 2.9, 0] },
]

const toCurve = (key) =>
  new THREE.CatmullRomCurve3(KEYS.map((k) => new THREE.Vector3(...k[key])), false, 'centripetal')

export function createCameraPath() {
  const posCurve = toCurve('pos')
  const lookCurve = toCurve('look')
  const n = KEYS.length - 1

  return function sample(p, outPos, outLook) {
    const q = Math.min(Math.max(p, 0), 1)
    let i = 0
    while (i < n - 1 && q > KEYS[i + 1].t) i++
    const t0 = KEYS[i].t
    const t1 = KEYS[i + 1].t
    const local = t1 > t0 ? (q - t0) / (t1 - t0) : 0
    const u = (i + local) / n
    posCurve.getPoint(u, outPos)
    lookCurve.getPoint(u, outLook)
  }
}

export { CHAPTERS, smoothstep } from './chapters'
