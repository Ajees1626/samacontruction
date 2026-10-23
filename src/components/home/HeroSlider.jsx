import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { gsap, SplitText, prefersReducedMotion } from '../../lib/gsap'
import { IMG } from '../../data/images'

/*
  Homepage hero — full-screen image slider.
  Slides change with a clip-path wipe, a slow Ken Burns zoom and a masked line-by-line title reveal.
  On scroll the image drifts (parallax), the copy lifts away and the next section overlaps it.
*/
const SLIDES = [
  { eyebrow: 'Residential construction', title: 'Homes engineered to last generations', text: 'Villas, apartments and communities built on sound structure and honest materials.', image: IMG.villaPool, to: '/services/residential-construction' },
  { eyebrow: 'Commercial construction', title: 'Buildings that open on schedule', text: 'Offices, retail and mixed-use developments delivered with programme discipline.', image: IMG.glassOffice, to: '/services/commercial-construction' },
  { eyebrow: 'Industrial & infrastructure', title: 'Built for load, built for scale', text: 'Factories, warehouses, roads and utilities engineered for decades of service.', image: IMG.highriseBuild, to: '/services/industrial-construction' },
  { eyebrow: 'Project management', title: 'One team from foundation to finish', text: 'Planning, engineering and site execution under a single accountable contract.', image: IMG.cranesTower, to: '/services/project-management' },
]
const DURATION = 7 // seconds per slide

export default function HeroSlider() {
  const rootRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const prevIndex = useRef(0)
  const progressTween = useRef(null)
  const reduced = useRef(false)

  const go = useCallback((n) => setIndex((n + SLIDES.length) % SLIDES.length), [])
  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), [])
  const prev = useCallback(() => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length), [])

  // Intro + scroll-linked parallax (once).
  useLayoutEffect(() => {
    reduced.current = prefersReducedMotion()
    const root = rootRef.current
    const ctx = gsap.context(() => {
      gsap.set('.hs-slide', { autoAlpha: 0 })
      gsap.set('.hs-slide-0', { autoAlpha: 1 })
      if (reduced.current) return
      gsap.from('.hs-chrome', { opacity: 0, y: 30, duration: 1.2, stagger: 0.08, ease: 'expo.out', delay: 0.6 })
      // Scroll: image drifts slower than the page, copy lifts and fades, badge spins faster.
      const st = { trigger: root, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to('.hs-media', { yPercent: 22, scale: 1.06, ease: 'none', scrollTrigger: st })
      gsap.to('.hs-copy', { yPercent: -35, opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '70% top' } })
      gsap.to('.hs-badge-ring', { rotate: '+=220', ease: 'none', scrollTrigger: st })
    }, root)
    return () => ctx.revert()
  }, [])

  // Slide transition.
  useLayoutEffect(() => {
    const root = rootRef.current
    const from = prevIndex.current
    const to = index
    const incoming = root.querySelector(`.hs-slide-${to}`)
    const outgoing = root.querySelector(`.hs-slide-${from}`)
    prevIndex.current = to

    if (reduced.current) {
      gsap.set(root.querySelectorAll('.hs-slide'), { autoAlpha: 0 })
      gsap.set(incoming, { autoAlpha: 1, clipPath: 'none' })
      return
    }

    const title = incoming.querySelector('.hs-title')
    const fades = incoming.querySelectorAll('.hs-fade')
    const img = incoming.querySelector('.hs-img')
    const split = SplitText.create(title, { type: 'lines', mask: 'lines', linesClass: 'split-line' })
    const tl = gsap.timeline()
    if (from !== to) {
      gsap.set(root.querySelectorAll('.hs-slide'), { zIndex: 0 })
      gsap.set(outgoing, { zIndex: 1, autoAlpha: 1 })
      gsap.set(incoming, { zIndex: 2 })
      tl.fromTo(incoming, { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 100%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut' }, 0)
      tl.fromTo(outgoing.querySelector('.hs-img'), { xPercent: 0 }, { xPercent: -12, duration: 1.3, ease: 'expo.inOut' }, 0)
      tl.set(outgoing, { autoAlpha: 0 })
      tl.set(outgoing.querySelector('.hs-img'), { xPercent: 0 })
    }
    const kenBurns = gsap.fromTo(img, { scale: 1.18 }, { scale: 1, duration: DURATION + 1.5, ease: 'none' })
    tl.from(split.lines, { yPercent: 110, duration: 1.2, stagger: 0.1, ease: 'expo.out' }, from !== to ? 0.55 : 0.4)
    tl.from(fades, { opacity: 0, y: 24, duration: 1, stagger: 0.08, ease: 'expo.out' }, '<0.15')

    // On the next change, finish (not rewind) this transition so the outgoing slide stays visible.
    return () => {
      tl.progress(1).kill()
      kenBurns.kill()
      split.revert()
    }
  }, [index])

  // Autoplay with progress bar.
  useEffect(() => {
    if (prefersReducedMotion()) return
    const bar = rootRef.current.querySelector(`.hs-bar-${index}`)
    rootRef.current.querySelectorAll('.hs-bar').forEach((b) => gsap.set(b, { scaleX: 0 }))
    progressTween.current = gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: DURATION, ease: 'none', onComplete: next })
    return () => progressTween.current?.kill()
  }, [index, next])

  useEffect(() => {
    if (!progressTween.current) return
    paused ? progressTween.current.pause() : progressTween.current.resume()
  }, [paused, index])

  // Pause when off-screen or tab hidden.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setPaused(!e.isIntersecting))
    io.observe(rootRef.current)
    const onVis = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  // Swipe on touch devices.
  const touch = useRef(null)
  const onPointerDown = (e) => (touch.current = e.clientX)
  const onPointerUp = (e) => {
    if (touch.current == null) return
    const dx = e.clientX - touch.current
    touch.current = null
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)()
  }

  return (
    <section
      ref={rootRef}
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-navy-900 text-white"
      aria-roledescription="carousel"
      aria-label="SAMA Construction & Developments highlights"
      onKeyDown={(e) => (e.key === 'ArrowRight' ? next() : e.key === 'ArrowLeft' ? prev() : null)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div className="hs-media absolute inset-0 origin-top">
        {SLIDES.map((s, i) => (
          <div key={i} className={`hs-slide hs-slide-${i} absolute inset-0`} aria-hidden={i !== index} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${SLIDES.length}`}>
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={s.image(2200)}
                srcSet={`${s.image(900)} 900w, ${s.image(1500)} 1500w, ${s.image(2200)} 2200w`}
                sizes="100vw"
                alt=""
                className="hs-img h-full w-full object-cover will-change-transform"
                fetchPriority={i === 0 ? 'high' : 'low'}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900/85 via-navy-900/45 to-navy-900/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-black/30" />

            <div className="hs-copy absolute inset-0 flex items-center">
              <div className="container-x w-full pt-16">
                <p className="hs-fade eyebrow eyebrow-light">{String(i + 1).padStart(2, '0')} · {s.eyebrow}</p>
                <h2 className="hs-title t-hero mt-6 max-w-[14ch] text-white" aria-live={i === index ? 'polite' : 'off'}>
                  {i === 0 ? <span className="sr-only">SAMA Construction & Developments — </span> : null}
                  {s.title}
                </h2>
                <p className="hs-fade t-lead mt-6 max-w-xl text-white/80">{s.text}</p>
                <div className="hs-fade mt-9 flex flex-wrap gap-3">
                  <Link to={s.to} tabIndex={i === index ? 0 : -1} className="btn btn-primary">Explore service <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
                  <Link to="/projects" tabIndex={i === index ? 0 : -1} className="btn btn-ghost-light">View projects</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h1 className="sr-only">SAMA Construction & Developments — residential, commercial, industrial and infrastructure construction</h1>

      {/* Rotating circular badge (desktop) */}
      <Link to="/about" className="hs-chrome group absolute right-[6%] top-1/2 z-10 hidden h-40 w-40 -translate-y-1/2 lg:block" aria-label="About SAMA Construction & Developments">
        <svg viewBox="0 0 160 160" className="hs-badge-ring h-full w-full animate-[spin_22s_linear_infinite]" aria-hidden="true">
          <defs><path id="hs-circle" d="M80,80 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0" /></defs>
          <text className="fill-white font-display text-[11.5px] font-bold uppercase tracking-[0.32em]">
            <textPath href="#hs-circle">SAMA Construction &amp; Developments ·</textPath>
          </text>
        </svg>
        <span className="absolute inset-0 m-auto grid h-16 w-16 place-items-center rounded-full bg-amber text-navy transition-transform duration-500 group-hover:scale-110 group-hover:rotate-45">
          <ArrowUpRight className="h-6 w-6" aria-hidden="true" />
        </span>
      </Link>

      {/* Bottom bar: progress, counter, arrows */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="container-x flex items-end justify-between gap-6 pb-14 md:pb-20">
          <div className="hs-chrome flex w-full max-w-md items-center gap-3">
            {SLIDES.map((s, i) => (
              <button key={i} type="button" onClick={() => go(i)} className="group flex-1 py-3 text-left" aria-label={`Go to slide ${i + 1}: ${s.eyebrow}`} aria-current={i === index}>
                <span className={`mb-2 hidden font-display text-[0.65rem] font-bold uppercase tracking-[0.18em] transition sm:block ${i === index ? 'text-white' : 'text-white/45 group-hover:text-white/80'}`}>{String(i + 1).padStart(2, '0')}</span>
                <span className="relative block h-[2px] overflow-hidden bg-white/25">
                  <span className={`hs-bar hs-bar-${i} absolute inset-0 origin-left scale-x-0 bg-amber`} />
                </span>
              </button>
            ))}
          </div>
          <div className="hs-chrome flex shrink-0 items-center gap-3">
            <p className="mr-2 hidden font-display text-sm font-bold tracking-[0.2em] sm:block" aria-hidden="true">
              <span className="text-amber">{String(index + 1).padStart(2, '0')}</span> / {String(SLIDES.length).padStart(2, '0')}
            </p>
            <button type="button" onClick={prev} aria-label="Previous slide" className="grid h-12 w-12 place-items-center rounded-full border border-white/30 transition hover:border-amber hover:bg-amber hover:text-navy">
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={next} aria-label="Next slide" className="grid h-12 w-12 place-items-center rounded-full border border-white/30 transition hover:border-amber hover:bg-amber hover:text-navy">
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
