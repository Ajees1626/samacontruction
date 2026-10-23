# Cinematic hero: production asset spec

Use this spec to commission a **photorealistic** version of the homepage house journey. The site already plays a rendered frame sequence. Drop the frames in and update the counts as described at the end.

## 1. Deliverable options

| Option | Deliverable | Notes |
|---|---|---|
| **A (recommended)** | Image sequence (WebP) | Gives exact frame-to-scroll sync on every browser. The player is already built in `src/components/cinematic/drivers.js` (`createFrameDriver`). |
| B | Single MP4/WebM, all-intra or short GOP | Scrubbing video by scroll is unreliable on Safari and iOS. Use only if A is not possible. |
| C | glTF/GLB model with baked lighting | Can replace the procedural model in `houseScene.js`. Needs named door and slider nodes. |

## 2. Story and camera path (one continuous shot, no cuts)

The camera timing must follow the scroll ranges in `src/components/cinematic/chapters.js`. Each frame percentage below is a position along the whole sequence.

| # | Scene | Frames (of 100%) | Camera |
|---|---|---|---|
| 01 | Exterior establishing shot | 0–7% | Wide 3/4 view from the street, eye height about 2.4 m, with a slow push-in |
| 02 | Approach the entrance | 7–20% | Dolly toward the front door along the path. The house grows in frame. Keep parallax between foreground planting and the facade |
| 03 | Door opens and the camera enters | 19–33% | Stop about 3 m from the door. The pivot door swings in about 90° over roughly 8% of the frames, then the camera passes through. Blend exposure from exterior to interior |
| 04 | Living room | 33–45% | Slow lateral move across the room toward the fireplace and the full-height glazing to the garden |
| 05 | Kitchen | 45–57% | Turn and travel past the island. Show the cabinetry, worktop and pendants |
| 06 | Staircase | 57–71% | Line up at the foot of the stair and climb with it to the first floor |
| 07 | Bedroom | 71–81% | Go through the bedroom doorway and slowly reveal the bed wall and window |
| 08 | Balcony | 81–90% | Face the sliding door, which opens between about 80% and 85%. Step out to the glass balustrade with a view of the garden |
| 09 | Full house reveal | 90–100% | Rise and pull back through the air into a wide 3/4 hero shot of the whole house. Hold steady for the last 3% |

**Continuity rules**

- It must be the same house, materials, time of day and lighting throughout.
- The door and slider must physically animate. They must not cross-fade.
- No jump cuts, whip-pans or dissolves.

## 3. Technical spec

| Item | Desktop | Mobile |
|---|---|---|
| Frame count | 300–420 | 180–240 (same path, sampled) |
| Resolution | 1920×1080 (16:9) | 1080×1920 (9:16) **or** 1080×1350. Re-frame the shot so the doors stay centred |
| Format | WebP, quality about 72, sRGB | WebP, quality about 68 |
| Target size per frame | 90–160 KB | 50–90 KB |
| Total sequence | 30–55 MB | 10–18 MB |
| Motion blur | Light (180° shutter) | Same |
| Naming | `frame_0001.webp` … `frame_0420.webp` | Same pattern |
| Location | `public/cinematic/desktop/` | `public/cinematic/mobile/` |

**Composition safe zones:** keep the bottom-left 40% × 30% of the frame low in detail, because the captions sit there. Keep the top 90 px clear of bright highlights, because the header sits there.

**Rendering:** Unreal Engine 5 (Movie Render Queue), Twinmotion, Lumion, D5, Enscape or Blender Cycles all work. Use a physical sky, render with path tracing or high-quality GI, and use ACES or AgX tone mapping.

## 4. Enabling the sequence

In `src/config/cinematic.js`:

```js
frames: {
  desktop: { count: 360, src: (i) => `/cinematic/desktop/frame_${String(i + 1).padStart(4, '0')}.webp` },
  mobile:  { count: 200, src: (i) => `/cinematic/mobile/frame_${String(i + 1).padStart(4, '0')}.webp` },
  preload: 24,
  cacheSize: 36,
},
```

`mode: 'auto'` uses the frames whenever a count is greater than 0. If frames are missing, it falls back to the real-time 3D house.

## 5. Also needed

- **Poster frame:** the first frame as a JPG, about 250 KB. Set it as `CINEMATIC.fallbackImage` so reduced-motion and data-saver visitors see it.
- **Final reveal still:** at 2400 px. Optionally reuse it for `SITE.ogImage`.
- **Licensing:** written confirmation that Sama Construction owns the renders, or is licensed to use them. If the house is a concept design and not a built project, label it on the site as a concept visualisation.
