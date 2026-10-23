import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'

/* Counts up to `value` once scrolled into view. `value === null` renders a placeholder. */
export default function CountUp({ value, suffix = '', className = '' }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (value == null || !ref.current) return
    const el = ref.current
    if (prefersReducedMotion()) {
      el.textContent = value.toLocaleString()
      return
    }
    const obj = { n: 0 }
    const tween = gsap.to(obj, {
      n: value,
      duration: 2.2,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => (el.textContent = Math.round(obj.n).toLocaleString()),
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [value])

  if (value == null) {
    return (
      <span className={className} aria-label="Figure to be confirmed">
        <span className="opacity-40">00</span>
        <span className="[-webkit-text-stroke:2px_#fcb415]">{suffix}</span>
      </span>
    )
  }
  return (
    <span className={className}>
      <span ref={ref}>0</span>
      <span className="[-webkit-text-stroke:2px_#fcb415]">{suffix}</span>
    </span>
  )
}
