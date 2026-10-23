/*
  Homepage cinematic configuration.
  ──────────────────────────────────
  The hero supports two renderers behind the same scroll timeline:

  1. 'frames'   — Option A: a professionally rendered image sequence of the house journey
                  (see docs/CINEMATIC_ASSET_SPEC.md). Used automatically once `frames.count > 0`.
  2. 'realtime' — Option C: the built-in procedural Three.js house (no external assets needed).

  To switch to rendered frames: export the sequence into /public/cinematic/desktop and
  /public/cinematic/mobile, then set the counts below.
*/
/*
  Which hero the homepage shows:
    'slider'    — full-screen image slider with scroll animations (current choice)
    'cinematic' — the scroll-controlled 3D house journey (paused for now; code kept intact)
*/
export const HOME_HERO = 'slider'

export const CINEMATIC = {
  mode: 'auto', // 'auto' | 'frames' | 'realtime'

  frames: {
    desktop: { count: 0, src: (i) => `/cinematic/desktop/frame_${String(i + 1).padStart(4, '0')}.webp` },
    mobile: { count: 0, src: (i) => `/cinematic/mobile/frame_${String(i + 1).padStart(4, '0')}.webp` },
    preload: 24, // frames fetched before the hero is revealed
    cacheSize: 36, // decoded frames kept in memory (LRU)
  },

  // Scroll distance of the pinned journey, in viewport heights.
  scrollLength: { desktop: 8, mobile: 5.5 },

  // Static image shown for reduced motion, data-saver, or when WebGL is unavailable.
  fallbackImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&q=80&auto=format&fit=crop',
}
