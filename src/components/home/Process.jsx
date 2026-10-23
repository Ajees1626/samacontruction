import { useLayoutEffect, useRef } from 'react'
import { PROCESS } from '../../data/content'
import Icon from '../ui/Icon'
import SectionHeading from '../ui/SectionHeading'
import { gsap, prefersReducedMotion } from '../../lib/gsap'

export default function Process() {
  const ref = useRef(null)

  // Draw the connecting line as the steps scroll into view.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.process-line', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'bottom 60%', scrub: true } })
      gsap.fromTo('.process-line-v', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.process-list', start: 'top 70%', end: 'bottom 60%', scrub: true } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-amber/10 blur-3xl" />
      <div className="container-x section-y relative">
        <SectionHeading light eyebrow="How we build" title="A clear path from first conversation to final handover." text="Six stages, each with defined deliverables and sign-offs, so owners always know where their project stands." />

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-white/15 lg:block">
            <div className="process-line h-full origin-left bg-amber" />
          </div>
          <div className="absolute bottom-0 left-7 top-0 w-px bg-white/15 lg:hidden">
            <div className="process-line-v h-full origin-top bg-amber" />
          </div>
          <ol className="process-list relative grid gap-10 lg:grid-cols-6 lg:gap-6">
            {PROCESS.map((s, i) => (
              <li key={s.step} className="relative pl-20 lg:pl-0" data-reveal data-delay={i * 0.06}>
                <span className="absolute left-0 top-0 grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-navy text-amber lg:relative">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <p className="font-display text-xs font-bold tracking-[0.24em] text-amber lg:mt-8">STEP {s.step}</p>
                <h3 className="mt-2 font-display text-xl font-bold text-white">{s.title}</h3>
                <p className="mt-3 text-[0.9375rem] text-white/65">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
