import { useEffect, useRef, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'
import { useLenis } from '../../lib/SmoothScroll'

/* Circular scroll-progress indicator that doubles as a back-to-top button. */
export function ScrollTopProgress() {
  const lenis = useLenis()
  const [show, setShow] = useState(false)
  const circleRef = useRef(null)
  const C = 2 * Math.PI * 22

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      if (circleRef.current) circleRef.current.style.strokeDashoffset = String(C * (1 - p))
      setShow(window.scrollY > 400)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [C])

  const toTop = () => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: 'smooth' }))

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-white/90 text-navy shadow-[0_10px_30px_-10px_rgba(22,30,75,0.4)] backdrop-blur transition-all duration-500 hover:bg-amber md:bottom-8 md:right-8 ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
    >
      <svg viewBox="0 0 50 50" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="25" cy="25" r="22" fill="none" stroke="rgba(22,30,75,0.12)" strokeWidth="2" />
        <circle ref={circleRef} cx="25" cy="25" r="22" fill="none" stroke="#fcb415" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C} />
      </svg>
      <ArrowUp className="relative h-5 w-5" aria-hidden="true" />
    </button>
  )
}

/* Desktop-only follow cursor: a small ring that trails the pointer and grows into a label over [data-cursor] elements. */
export function FollowCursor() {
  const ref = useRef(null)
  const [label, setLabel] = useState('')
  const [enabled] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion())

  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' })
    const move = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
      const target = e.target.closest?.('[data-cursor], a, button')
      const text = target?.closest('[data-cursor]')?.dataset.cursor || ''
      setLabel(text)
      el.dataset.state = text ? 'label' : target ? 'link' : 'idle'
    }
    const leave = () => (el.style.opacity = '0')
    const enter = () => (el.style.opacity = '1')
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', leave)
    document.addEventListener('pointerenter', enter)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      document.removeEventListener('pointerenter', enter)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <div ref={ref} aria-hidden="true" data-state="idle" className="follow-cursor pointer-events-none fixed left-0 top-0 z-[70] hidden md:block">
      <span className="follow-cursor-ring grid place-items-center rounded-full font-display text-xs font-bold uppercase tracking-[0.16em] text-navy">{label}</span>
    </div>
  )
}

/* Faint architectural column lines behind the page (desktop). */
export function GridLines() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] hidden mix-blend-multiply lg:block">
      <div className="container-x grid h-full grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`h-full border-l border-navy/[0.05] ${i === 3 ? 'border-r' : ''}`} />
        ))}
      </div>
    </div>
  )
}
