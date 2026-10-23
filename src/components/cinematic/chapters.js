/* Kept free of three.js so the hero UI can render before the 3D bundle loads. */

/* Chapter captions overlaid on the journey (scroll ranges in progress units). */
export const CHAPTERS = [
  { id: '01', label: 'Exterior', title: 'A home, engineered from the ground up', range: [0.0, 0.0] },
  { id: '02', label: 'Approach', title: 'Clean lines. Honest materials.', range: [0.08, 0.19] },
  { id: '03', label: 'Entrance', title: 'Every threshold, built true', range: [0.2, 0.31] },
  { id: '04', label: 'Living', title: 'Open spans, structural confidence', range: [0.33, 0.45] },
  { id: '05', label: 'Kitchen', title: 'Precision in every joint and finish', range: [0.47, 0.57] },
  { id: '06', label: 'Staircase', title: 'Cantilevered treads, carried by concrete', range: [0.59, 0.71] },
  { id: '07', label: 'Bedroom', title: 'Quiet rooms, solid construction', range: [0.73, 0.81] },
  { id: '08', label: 'Balcony', title: 'Cantilevered slab. Open sky.', range: [0.83, 0.9] },
  { id: '09', label: 'Complete', title: 'From foundation to finish', range: [0.92, 1.0] },
]

export const smoothstep = (a, b, x) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1)
  return t * t * (3 - 2 * t)
}
