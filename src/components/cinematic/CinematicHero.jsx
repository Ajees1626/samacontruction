import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronsDown } from 'lucide-react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap'
import { useLenis } from '../../lib/SmoothScroll'
import { CINEMATIC } from '../../config/cinematic'
import { CHAPTERS } from './chapters'
import Logo from '../ui/Logo'

/*
  Homepage hero — a scroll-controlled architectural camera journey through one house.
  The section is pinned by ScrollTrigger only for the length of the journey, then releases
  into the normal page. Scroll progress drives a GSAP timeline that both moves the camera
  (via `state.target`) and choreographs the captions, so picture and text stay in sync.
*/

function webglAvailable() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}

const isMobileViewport = () => window.matchMedia('(max-width: 767px), (pointer: coarse) and (max-width: 1024px)').matches

function chooseMode() {
  if (typeof window === 'undefined') return 'static'
  if (prefersReducedMotion()) return 'static'
  if (navigator.connection?.saveData) return 'static'
  const mobile = isMobileViewport()
  const frames = CINEMATIC.frames[mobile ? 'mobile' : 'desktop']
  if (CINEMATIC.mode !== 'realtime' && frames.count > 0) return 'frames'
  if (CINEMATIC.mode === 'frames') return 'static'
  return webglAvailable() ? 'realtime' : 'static'
}

export default function CinematicHero() {
  const [mode] = useState(chooseMode)
  if (mode === 'static') return <StaticHero />
  return <JourneyHero mode={mode} />
}

function JourneyHero({ mode }) {
  const lenis = useLenis()
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const stRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    const section = sectionRef.current
    // A fresh canvas per mount: a WebGL context that was disposed cannot be re-acquired
    // on the same element (React StrictMode mounts effects twice in development).
    const canvas = document.createElement('canvas')
    canvas.className = 'absolute inset-0 block h-full w-full'
    canvas.setAttribute('aria-hidden', 'true')
    canvasRef.current.appendChild(canvas)
    const mobile = isMobileViewport()
    const lowPower = mobile || (navigator.deviceMemory && navigator.deviceMemory <= 4) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)

    const state = { target: 0, p: 0 }
    if (import.meta.env.DEV) window.__cineSet = (p) => (state.target = state.p = p) // dev inspection helper

    // The renderer (and three.js) is code-split and loaded only when the hero mounts.
    let driver = null
    let disposed = false
    const resize = () => driver?.resize(section.clientWidth, section.clientHeight)
    import('./drivers')
      .then(({ createFrameDriver, createRealtimeDriver }) => {
        if (disposed) return
        if (mode === 'frames') {
          const f = CINEMATIC.frames[mobile ? 'mobile' : 'desktop']
          driver = createFrameDriver(canvas, { ...f, preload: CINEMATIC.frames.preload, cacheSize: CINEMATIC.frames.cacheSize, onFirstFrame: () => setReady(true) })
        } else {
          driver = createRealtimeDriver(canvas, { quality: lowPower ? 0.5 : 1, onFirstFrame: () => setReady(true) })
        }
        resize()
      })
      .catch((e) => {
        if (disposed) return
        console.warn('[cinematic] renderer unavailable, using static hero', e)
        setFailed(true)
      })

    const ro = new ResizeObserver(resize)
    ro.observe(section)

    // Render only while the hero is on screen.
    let visible = true
    let last = performance.now()
    const tick = () => {
      if (!visible || !driver) return
      const now = performance.now()
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      // Critically damped follow → camera inertia on top of Lenis smoothing.
      state.p += (state.target - state.p) * (1 - Math.exp(-dt * 7))
      if (Math.abs(state.target - state.p) < 0.00005) state.p = state.target
      driver.render(state.p, now / 1000)
    }
    gsap.ticker.add(tick)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      last = performance.now()
    })
    io.observe(section)

    const ctx = gsap.context(() => {
      const lengthVh = CINEMATIC.scrollLength[mobile ? 'mobile' : 'desktop']
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + Math.round(window.innerHeight * lengthVh),
          pin: true,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = CHAPTERS.reduce((acc, c, i) => (self.progress >= c.range[0] - 0.005 ? i : acc), 0)
            setActive((prev) => (prev === idx ? prev : idx))
          },
        },
      })
      stRef.current = tl.scrollTrigger

      // Camera progress (duration 1 = full journey).
      tl.to(state, { target: 1, duration: 1 }, 0)
      tl.fromTo('.cine-bar', { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)

      // Intro title leaves as the camera starts moving.
      tl.to('.cine-intro', { opacity: 0, y: -50, duration: 0.05 }, 0.02)
      tl.to('.cine-cue', { opacity: 0, duration: 0.02 }, 0.01)

      // Chapter captions
      CHAPTERS.forEach((c, i) => {
        if (i === 0 || i === CHAPTERS.length - 1) return // intro & finale have their own overlays
        const el = `.cine-ch-${i}`
        const [a, b] = c.range
        tl.fromTo(el, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.022, ease: 'power2.out' }, a)
        tl.to(el, { opacity: 0, y: -24, duration: 0.018, ease: 'power2.in' }, b - 0.018)
      })

      // Final reveal and hand-off into the page.
      tl.fromTo('.cine-final', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.05, ease: 'power2.out' }, 0.94)
      tl.to('.cine-shade', { opacity: 1, duration: 0.06 }, 0.93)
    }, section)

    // Intro entrance animation (not scroll-linked).
    const intro = gsap.fromTo(section.querySelectorAll('.cine-in'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.4, stagger: 0.12, ease: 'expo.out', delay: 0.3 })

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('orientationchange', refresh)

    return () => {
      window.removeEventListener('orientationchange', refresh)
      intro.kill()
      ctx.revert()
      gsap.ticker.remove(tick)
      io.disconnect()
      ro.disconnect()
      disposed = true
      driver?.dispose()
      canvas.remove()
    }
  }, [mode])

  const skip = () => {
    const target = document.getElementById('after-hero')
    const st = stRef.current
    if (!target && !st) return
    const y = target ? target.getBoundingClientRect().top + window.scrollY : st.end + 2
    if (lenis) lenis.scrollTo(y, { duration: 1.8 })
    else window.scrollTo({ top: y, behavior: 'smooth' })
  }

  if (failed) return <StaticHero />

  return (
    <div className="relative bg-navy-900">
      <section ref={sectionRef} className="relative h-[100svh] w-full overflow-hidden bg-[#dfe6ec]" aria-label="Scroll-controlled cinematic journey through a modern house">
        <div ref={canvasRef} className="absolute inset-0" />

        {/* Legibility gradients */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />
        <div className="cine-shade pointer-events-none absolute inset-0 bg-navy-900/55 opacity-0 md:bg-transparent md:bg-gradient-to-r md:from-navy-900/75 md:via-navy-900/25 md:to-transparent" />

        {/* Scene 01 — brand intro */}
        <div className="cine-intro pointer-events-none absolute inset-0 flex items-end">
          <div className="container-x pb-28 md:pb-32">
            <p className="cine-in eyebrow eyebrow-light">SAMA Construction & Developments</p>
            <h1 className="cine-in t-hero mt-5 max-w-4xl text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.25)]">
              We build what <span className="text-amber">lasts.</span>
            </h1>
            <p className="cine-in t-lead mt-5 max-w-xl text-white/85">Step inside a home built with structural precision — from the ground up.</p>
          </div>
        </div>

        {/* Chapter captions */}
        {CHAPTERS.map((c, i) =>
          i === 0 || i === CHAPTERS.length - 1 ? null : (
            <div key={c.id} className={`cine-ch-${i} pointer-events-none absolute inset-x-0 bottom-24 opacity-0 md:bottom-28`}>
              <div className="container-x">
                <p className="flex items-center gap-3 font-display text-xs font-bold uppercase tracking-[0.28em] text-amber">
                  <span>{c.id}</span>
                  <span className="h-px w-10 bg-amber/70" />
                  <span className="text-white/85">{c.label}</span>
                </p>
                <p className="mt-3 max-w-xl font-display text-[clamp(1.5rem,1rem+2.2vw,2.75rem)] font-bold leading-[1.08] tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">
                  {c.title}
                </p>
              </div>
            </div>
          ),
        )}

        {/* Scene 09 — final reveal → website */}
        <div className="cine-final absolute inset-0 flex items-center opacity-0">
          <div className="container-x">
            <p className="eyebrow eyebrow-light">09 · The complete home</p>
            <h2 className="t-hero mt-5 max-w-3xl text-white">
              From foundation <br className="hidden sm:block" />
              to <span className="text-amber">finish.</span>
            </h2>
            <p className="t-lead mt-5 max-w-lg text-white/80">Residential, commercial, industrial and infrastructure construction — engineered, managed and delivered by one accountable team.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/projects" className="btn btn-primary">Explore our work <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
              <Link to="/request-a-quote" className="btn btn-ghost-light">Request a Quote</Link>
            </div>
          </div>
        </div>

        {/* Chapter rail (tablet & desktop) */}
        <ol className="pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col gap-3 md:flex lg:right-8" aria-hidden="true">
          {CHAPTERS.map((c, i) => (
            <li key={c.id} className="flex items-center justify-end gap-3">
              <span className={`font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${i === active ? 'text-white opacity-100' : 'text-white/0 opacity-0'}`}>{c.label}</span>
              <span className={`block h-[2px] rounded-full transition-all duration-500 ${i === active ? 'w-8 bg-amber' : i < active ? 'w-4 bg-white/70' : 'w-4 bg-white/30'}`} />
            </li>
          ))}
        </ol>

        {/* Bottom bar: progress, counter, skip */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="container-x flex items-center justify-between gap-4 pb-6 md:pb-8">
            <div className="cine-cue flex items-center gap-3 text-white/85">
              <span className="relative block h-10 w-px overflow-hidden bg-white/25">
                <span className="scroll-cue-line absolute inset-x-0 top-0 h-1/2 bg-amber" />
              </span>
              <span className="font-display text-xs font-bold uppercase tracking-[0.24em]">Scroll to enter</span>
            </div>
            <p className="ml-auto hidden font-display text-xs font-bold tracking-[0.2em] text-white/85 sm:block" aria-hidden="true">
              <span className="text-amber">{CHAPTERS[active].id}</span> / {CHAPTERS[CHAPTERS.length - 1].id}
            </p>
            <button type="button" onClick={skip} className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-black/15 px-4 py-2 font-display text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:border-amber hover:bg-amber hover:text-navy">
              Skip intro <ChevronsDown className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="h-[3px] w-full bg-white/15">
            <div className="cine-bar h-full origin-left scale-x-0 bg-amber" />
          </div>
        </div>

        {/* Loader */}
        <div className={`absolute inset-0 z-10 grid place-items-center bg-navy-900 transition-opacity duration-1000 ${ready ? 'pointer-events-none opacity-0' : 'opacity-100'}`} aria-hidden={ready}>
          <div className="flex flex-col items-center gap-6">
            <Logo light />
            <span className="relative block h-[2px] w-40 overflow-hidden bg-white/15">
              <span className="absolute inset-y-0 left-0 w-1/3 animate-[marquee_1.2s_linear_infinite] bg-amber" style={{ animationName: 'loaderSlide' }} />
            </span>
            <span className="font-display text-[0.7rem] font-bold uppercase tracking-[0.3em] text-white/60">Preparing the site</span>
          </div>
        </div>
      </section>
    </div>
  )
}

/* Static hero for reduced motion, data saver or devices without WebGL. */
function StaticHero() {
  const img = CINEMATIC.fallbackImage
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-navy-900" aria-label="Introduction">
      <img src={img} alt="Contemporary two-storey house with large glazing at dusk (stock image)" className="absolute inset-0 -z-10 h-full w-full object-cover" fetchPriority="high" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-black/30" />
      <div className="container-x pb-20 pt-40 md:pb-28">
        <p className="eyebrow eyebrow-light">SAMA Construction & Developments</p>
        <h1 className="t-hero mt-5 max-w-4xl text-white">
          We build what <span className="text-amber">lasts.</span>
        </h1>
        <p className="t-lead mt-5 max-w-xl text-white/85">Residential, commercial, industrial and infrastructure construction — engineered, managed and delivered by one accountable team.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/projects" className="btn btn-primary">Explore our work <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          <Link to="/request-a-quote" className="btn btn-ghost-light">Request a Quote</Link>
        </div>
      </div>
    </section>
  )
}
