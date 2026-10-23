import { STRENGTHS } from '../../data/content'
import { IMG } from '../../data/images'
import Icon from '../ui/Icon'

export default function WhySama() {
  return (
    <section className="relative bg-cloud">
      <div className="container-x section-y grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow" data-reveal>Why SAMA Construction & Developments</p>
            <h2 className="t-section mt-6" data-reveal>Built on planning. Proven on site.</h2>
            <p className="t-lead mt-6 text-graphite/75" data-reveal>Good buildings are the result of good decisions made early and executed carefully. These are the principles our teams work to on every project.</p>
            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-3xl" data-reveal="mask">
              <img src={IMG.blueprints(1100)} alt="Engineer reviewing construction drawings (stock image)" loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute bottom-0 left-0 bg-amber px-5 py-3 font-display text-sm font-bold text-navy">Plan · Engineer · Build</div>
            </div>
          </div>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-3xl border border-navy/8 bg-navy/8 sm:grid-cols-2 lg:col-span-7 lg:self-start" data-reveal="stagger">
          {STRENGTHS.map((s, i) => (
            <li key={s.title} className="group bg-white p-7 transition-colors duration-500 hover:bg-navy md:p-9">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-amber-100 text-navy transition group-hover:bg-amber">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <span className="font-display text-sm font-bold text-navy/25 group-hover:text-white/30">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="mt-7 font-display text-xl font-bold text-navy group-hover:text-white">{s.title}</h3>
              <p className="mt-3 text-[0.95rem] text-graphite/75 group-hover:text-white/70">{s.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
