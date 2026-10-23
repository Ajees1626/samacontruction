# Design notes: reference review and applied ideas

These references were reviewed for inspiration only. No layout, code, copy or imagery was copied from them.

| Reference | Patterns observed | How Sama uses the idea |
|---|---|---|
| Gactur (home 1) | Transparent-to-solid sticky header, small eyebrow labels with an accent marker, dark/light section rhythm, project grid with drag cue, stat pairs | Header goes from transparent over the hero to solid white. Eyebrow labels carry an amber rule. Navy sections (stats, process, footer) alternate with white sections |
| Renovatio (demo 01 / home 05) | Keyword ticker, numbered process steps, large editorial project list, a news section led by one featured post | Services marquee under the intro. Six-step process with a line that draws on scroll. Editorial project grid (one large, two stacked, one wide). News page led by a featured article |
| Antra (ThemeForest preview) | The preview loads in an iframe and its content could not be extracted | Not used |

## Departures from the references (construction rather than interior design)
- Content is organised around **capability and accountability**: process, quality hold-points, safety, plant and project controls. It is not organised around mood boards.
- Imagery favours **sites, structure and engineering** (rebar, cranes, earthworks) next to finished buildings.
- The project data model includes category, location, status, scope and project facts, which are things a construction client cares about.
- The hero tells the story of a building from approach to completion, ending on "From foundation to finish".

## Layout system
- Container: max-width 1360 px, with `clamp(1rem, 4vw, 3rem)` side padding.
- Section rhythm: `clamp(4.5rem, 9vw, 8.5rem)` vertical padding.
- Type scale, using `clamp()`:

| Style | Range |
|---|---|
| Hero | 36–88 px |
| Page heading | 34–72 px |
| Section heading | 28–48 px |
| Card heading | 20–28 px |
| Body | 16–17 px |

- Corner radius: 24 px on cards and 28–40 px on feature panels.
- Motion:
  - Easing: `expo.out` and `power3.out`
  - Reveals: fade and rise, plus image clip-path masks
  - Parallax: about 15% at most
- No scroll snapping. The only pinned section is the hero.
