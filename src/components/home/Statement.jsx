import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { IMG } from '../../data/images'

/*
  Statement + arch image reveal.
  The statement brightens word by word with scroll; the image opens from an arch to full width
  while a large outlined word drifts sideways behind it.
*/
export default function Statement() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="container-x pt-24 md:pt-32">
        <p className="eyebrow" data-reveal>Our approach</p>
        <p className="mt-8 max-w-5xl font-display text-[clamp(1.6rem,1rem+2.6vw,3.4rem)] font-bold leading-[1.15] tracking-tight text-navy" data-split="scrub">
          We plan, engineer and build structures that stand for generations — with one accountable team from the first drawing to the final handover.
        </p>
      </div>

      <div className="relative mt-16 md:mt-24" aria-hidden="true">
        <p
          className="pointer-events-none whitespace-nowrap font-display text-[clamp(4.5rem,15vw,15rem)] font-extrabold uppercase leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgba(22,30,75,0.14)]"
          data-scroll-x="-30"
        >
          Foundation · Structure · Finish · Foundation
        </p>
      </div>

      <div className="container-x relative -mt-10 pb-24 md:-mt-24 md:pb-32">
        <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10] lg:aspect-[16/8]" data-arch>
          <img src={IMG.houseEvening(2200)} srcSet={`${IMG.houseEvening(900)} 900w, ${IMG.houseEvening(1600)} 1600w, ${IMG.houseEvening(2200)} 2200w`} sizes="100vw" alt="Contemporary two-storey house at dusk (stock image)" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
          <Link to="/projects" className="group absolute inset-0 m-auto grid h-24 w-24 place-items-center rounded-full bg-white text-navy shadow-2xl transition-transform duration-500 hover:scale-110 md:h-32 md:w-32" aria-label="View projects">
            <ArrowUpRight className="h-8 w-8 transition-transform duration-500 group-hover:rotate-45 md:h-10 md:w-10" aria-hidden="true" />
          </Link>
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 text-white md:p-10">
            <p className="font-display text-xl font-bold md:text-3xl">From foundation to finish.</p>
            <p className="font-display text-xs font-bold uppercase tracking-[0.24em] text-white/80">Design · Engineering · Construction</p>
          </div>
        </div>
      </div>
    </section>
  )
}
