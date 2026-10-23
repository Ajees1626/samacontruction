import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { IMG } from '../../data/images'
import { SERVICES } from '../../data/services'

export default function Intro() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="container-x section-y grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 lg:pr-8">
          <p className="eyebrow" data-reveal>Who we are</p>
          <h2 className="t-page mt-6" data-split>
            A construction company built on engineering discipline.
          </h2>
          <p className="t-lead mt-8 text-graphite/80" data-reveal>
            SAMA Construction & Developments plans, engineers and builds residential, commercial, industrial and infrastructure projects. We bring structural rigour, transparent project management and a dedicated site team to every build — whatever its scale.
          </p>
          <div className="mt-10 grid gap-6 border-t border-navy/10 pt-8 sm:grid-cols-2" data-reveal="stagger">
            <div>
              <p className="font-display text-lg font-bold text-navy">Design & build</p>
              <p className="mt-2 text-[0.95rem] text-graphite/75">One contract, one accountable team from concept through handover.</p>
            </div>
            <div>
              <p className="font-display text-lg font-bold text-navy">Build-only & PMC</p>
              <p className="mt-2 text-[0.95rem] text-graphite/75">Construction and project management for owner-supplied designs.</p>
            </div>
          </div>
          <Link to="/about" className="link-arrow mt-10" data-reveal>
            More about the company <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[5/4] lg:aspect-[4/5]" data-reveal="mask">
            <img src={IMG.siteTeamAerial(1400)} srcSet={`${IMG.siteTeamAerial(800)} 800w, ${IMG.siteTeamAerial(1400)} 1400w`} sizes="(min-width:1024px) 50vw, 100vw" alt="Construction team reviewing a large site from above (stock image)" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-8 left-4 right-4 rounded-2xl bg-navy p-6 text-white shadow-2xl sm:left-auto sm:right-8 sm:w-80" data-reveal data-delay="0.2">
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-amber">Our commitment</p>
            <p className="mt-3 font-display text-xl font-bold leading-snug">Structure first. Quality checked. Safety non-negotiable.</p>
          </div>
          <div className="absolute -left-6 top-10 hidden h-40 w-40 grid-lines lg:block" aria-hidden="true" />
        </div>
      </div>

      {/* Services ticker */}
      <div className="border-y border-navy/10 bg-cloud py-6" aria-hidden="true">
        <div className="flex overflow-hidden">
          <div className="marquee-track flex shrink-0 items-center gap-10 pr-10">
            {[...SERVICES, ...SERVICES].map((s, i) => (
              <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-[clamp(1.25rem,1rem+1.2vw,2rem)] font-bold text-navy/85">
                {s.title}
                <span className="h-2.5 w-2.5 rotate-45 bg-amber" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
