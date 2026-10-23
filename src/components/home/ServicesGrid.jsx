import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SERVICES } from '../../data/services'
import Icon from '../ui/Icon'

/* Service cards — reused on the homepage and the Services page. */
export default function ServicesGrid({ items = SERVICES }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
      {items.map((s, i) => (
        <li key={s.slug}>
          <Link to={`/services/${s.slug}`} className="group img-zoom relative flex h-full flex-col overflow-hidden rounded-3xl border border-navy/8 bg-white transition-shadow duration-500 hover:shadow-[0_40px_80px_-40px_rgba(22,30,75,0.45)]">
            <div className="relative aspect-[16/11] overflow-hidden">
              <img src={s.image(900)} srcSet={`${s.image(600)} 600w, ${s.image(900)} 900w`} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" alt="" loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
              <span className="absolute left-5 top-5 font-display text-sm font-bold tracking-widest text-white/90">{String(i + 1).padStart(2, '0')}</span>
              <span className="absolute -bottom-6 right-6 grid h-14 w-14 place-items-center rounded-2xl bg-amber text-navy shadow-lg transition-transform duration-500 group-hover:-translate-y-1">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6 pt-8 md:p-7 md:pt-9">
              <h3 className="t-card transition-colors group-hover:text-teal">{s.title}</h3>
              <p className="mt-3 flex-1 text-[0.95rem] text-graphite/75">{s.short}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-bold text-navy">
                View service
                <span className="grid h-8 w-8 place-items-center rounded-full border border-navy/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-amber group-hover:bg-amber">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
