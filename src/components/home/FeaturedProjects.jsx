import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { PROJECTS } from '../../data/projects'
import SectionHeading from '../ui/SectionHeading'
import LinkButton from '../ui/LinkButton'
import PlaceholderTag from '../ui/PlaceholderTag'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap'

/*
  Featured projects as a horizontal gallery.
  Desktop: the section pins and vertical scroll moves the track sideways.
  Touch / small screens: a native swipeable row with snap points (no pinning).
*/
export default function FeaturedProjects() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const items = PROJECTS.slice(0, 6)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (pointer: fine)', () => {
      const track = trackRef.current
      const distance = () => track.scrollWidth - window.innerWidth
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => '+=' + distance(),
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
      // Each card's image drifts inside its frame as it travels.
      gsap.utils.toArray('.fp-img', track).forEach((img) => {
        gsap.fromTo(img, { xPercent: -8 }, { xPercent: 8, ease: 'none', scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } })
      })
      gsap.fromTo('.fp-progress', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: () => '+=' + distance(), scrub: true } })
    })
    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-paper lg:flex lg:h-[100svh] lg:flex-col lg:justify-center">
      <div className="container-x pt-24 md:pt-32 lg:pt-24">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Featured projects" title="Work that stands on its own foundations." />
          <div className="flex items-center gap-4" data-reveal>
            <PlaceholderTag>Sample projects</PlaceholderTag>
            <LinkButton to="/projects" variant="navy">All projects</LinkButton>
          </div>
        </div>
      </div>

      <div className="mt-12 overflow-x-auto pb-6 lg:mt-14 lg:overflow-visible lg:pb-0 [scrollbar-width:none] snap-x snap-mandatory lg:snap-none" data-lenis-prevent-touch>
        <ul ref={trackRef} className="flex w-max gap-5 px-[max(1rem,4vw)] lg:gap-8 lg:pl-[max(3rem,calc((100vw-1360px)/2+3rem))] lg:pr-[10vw]">
          {items.map((p, i) => (
            <li key={p.slug} className="w-[82vw] shrink-0 snap-start sm:w-[60vw] lg:w-[34vw] xl:w-[30vw]">
              <Link to={`/projects/${p.slug}`} className="group block" data-cursor="View">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-navy lg:aspect-auto lg:h-[56svh] lg:min-h-[380px]">
                  <img src={p.image(1200)} srcSet={`${p.image(700)} 700w, ${p.image(1200)} 1200w`} sizes="(min-width:1024px) 40vw, 82vw" alt={`${p.name} (stock image)`} loading="lazy" className="fp-img absolute inset-0 h-full w-[116%] max-w-none -translate-x-[7%] object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/75 via-transparent to-transparent" />
                  <span className="absolute left-6 top-6 font-display text-[clamp(3rem,5vw,5rem)] font-extrabold leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.8)]">{String(i + 1).padStart(2, '0')}</span>
                  <span className="absolute right-6 top-6 grid h-14 w-14 place-items-center rounded-full bg-amber text-navy transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-amber">{p.category}</p>
                    <h3 className="mt-2 font-display text-[clamp(1.375rem,1.1rem+1vw,2rem)] font-bold leading-tight text-white">{p.name}</h3>
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-white/75"><MapPin className="h-4 w-4" aria-hidden="true" />{p.location}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="container-x hidden pb-10 lg:block">
        <div className="mt-10 h-[2px] w-full bg-navy/10">
          <div className="fp-progress h-full origin-left scale-x-0 bg-amber" />
        </div>
      </div>
    </section>
  )
}
