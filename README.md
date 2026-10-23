# Sama Construction — Website

A React website for Sama Construction. The homepage opens with a scroll-controlled 3D walk through a modern house, then continues into the normal company site.

**Stack:** React 19 · Vite 8 · JavaScript/JSX (no TypeScript) · Tailwind CSS 4 · GSAP 3 + ScrollTrigger · Lenis · React Router 7 · Three.js (homepage hero only) · Lucide icons

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

Node 20 or newer is required. The site was built and tested on Node 22.

The site is a single-page app. On a static host, send every unknown path to `index.html`:

- **Netlify:** `/*  /index.html  200` in `public/_redirects`
- **Vercel:** add a rewrite to `/index.html`
- **Apache / Nginx:** use `try_files $uri /index.html`

## Brand colours

| Token | Hex | Approx. share | Used for |
|---|---|---|---|
| `paper` / `cloud` | `#ffffff` / `#f6f6f3` | ~80% | Page backgrounds and cards |
| `navy` | `#161e4b` | ~10% | Headings, dark sections, footer |
| `amber` | `#fcb415` | ~10% | Main buttons, highlights, accent lines |
| `teal` | `#0f9d8f` | small | Focus rings, hover states, tags, placeholder markers |

All tokens live in `src/index.css` under `@theme`. Headings use Manrope and body text uses Inter. Font sizes scale with `clamp()`.

## Project structure

```
src/
  config/
    site.js          ← company details, contact info, stats, navigation, form endpoint
    cinematic.js     ← hero mode (real-time 3D or rendered frames), scroll length, fallback image
  data/              ← services, projects, industries, articles, jobs, image library
  components/
    cinematic/       ← CinematicHero, procedural house, camera path, renderers
    home/            ← homepage sections (reused on inner pages)
    layout/          ← Header (mega menu + mobile drawer), Footer, Layout
    ui/              ← PageHero, SectionHeading, LinkButton, CountUp, Field, CTASection…
  hooks/             ← useReveal (scroll reveals, image masks, parallax), useSeo
  lib/               ← GSAP setup, Lenis provider, form validation and submission
  pages/             ← one file per route; service, project and article pages are data-driven templates
```

## Routes

| Path | Page |
|---|---|
| `/` | Home, with the cinematic hero |
| `/about` | About Us |
| `/services` and `/services/:slug` | Services, plus one shared template for each service |
| `/projects` and `/projects/:slug` | Projects with category filter, plus one shared project template |
| `/industries` | Industries |
| `/capabilities` | Infrastructure & Capabilities |
| `/quality-safety-sustainability` | Quality, Safety & Sustainability |
| `/careers` | Careers |
| `/news` and `/news/:slug` | News & Insights, plus an article template |
| `/contact` | Contact form |
| `/request-a-quote` | Three-step quote form. `?service=slug` pre-selects a service |
| `/privacy-policy` | Privacy Policy |
| `*` | Custom 404 page |

## The cinematic hero — what is actually built

There were no rendered frames, walkthrough video or 3D model of a house in the project. So the hero currently uses **Option C: real-time 3D**:

- `houseScene.js` builds one connected two-storey house in code. It includes:
  - The exterior and garden
  - A front door that swings open
  - A living room with a fireplace
  - A navy-and-marble kitchen
  - A floating staircase on a concrete wall
  - An upstairs bedroom
  - A sliding door onto a cantilevered balcony
- The lighting uses sun shadows, an environment map and ambient occlusion (GTAO, desktop only).
- `cameraPath.js` lists 20 camera keyframes. Each keyframe has a position and a look-at target. The camera moves along a smooth spline between them, so the shot never cuts.
- ScrollTrigger pins the hero for 8 screen heights on desktop and 5.5 on mobile. One GSAP timeline uses scroll progress to drive the camera, the door, the balcony slider, the change in indoor exposure and all the captions.
- When the pin ends, the page simply continues scrolling. There is no scroll lock, no jump and no blank screen. A **Skip intro** button jumps straight to the content.

**Honest limitation:** this is a stylised architectural model, not a photorealistic render. To get photoreal quality, have the journey rendered offline and drop the frames in. The code already supports that (**Option A**):

1. Follow `docs/CINEMATIC_ASSET_SPEC.md` to export the frames into `public/cinematic/desktop/` and `public/cinematic/mobile/`.
2. In `src/config/cinematic.js`, set `frames.desktop.count` and `frames.mobile.count`.

The hero then switches to a canvas image-sequence player. That player:

- Preloads the first frames.
- Streams the rest in order.
- Keeps only about 36 decoded frames in memory at a time (LRU cache).

The captions and scroll timing stay the same.

**Fallbacks:** visitors who prefer reduced motion, have Data Saver on, or have no WebGL get a static hero image with the same headline and buttons. On phones, small tablets and low-memory devices the scene renders at lower quality (lower pixel ratio, smaller shadow map, fewer trees, no ambient occlusion).

## Content still to verify

Every invented or unconfirmed item is marked in the UI with a teal **Placeholder** tag. Once the content is verified, set `SHOW_PLACEHOLDER_MARKERS = false` in `src/config/site.js` to hide the tags. The full list is in `docs/ASSET_REQUIREMENTS.md`.

- **Contact details and social links:** `SITE.contact` and `SITE.social` are empty, and the UI shows "TBC".
- **Statistics:** `STATS` values are `null` and show as "00".
- **Projects:** all 8 are samples marked `sample: true`. Their images are licensed Unsplash stock photos, not Sama projects.
- **Leadership, history, certifications, client logos and testimonials:** these show empty slots. No testimonials have been invented.
- **Forms:** set `SITE.formEndpoint` (for example Formspree or your own API) to send submissions. Until it is set, the forms validate fully and then tell the visitor they are in demo mode. Nothing is sent.
- **Budget ranges** on the quote form are in INR. Change them in `src/pages/Quote.jsx` if needed.

## Accessibility and performance notes

- Pages use semantic landmarks and include a skip link.
- Menus and forms work with the keyboard, and focus rings are visible (teal).
- Form fields use `aria-invalid` and error messages are announced as alerts.
- Reduced-motion users get native scrolling with no Lenis, and reveal animations are switched off.
- Inner pages are code-split. Three.js (about 147 kB gzipped) is downloaded only when the homepage hero mounts.
- Below-the-fold images load lazily and use responsive `srcSet`.
- Each route sets its own title, description, Open Graph tags and canonical URL through `useSeo`.
