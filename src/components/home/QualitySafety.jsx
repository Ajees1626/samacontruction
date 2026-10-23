import { Check } from 'lucide-react'
import { QUALITY_PILLARS } from '../../data/content'
import Icon from '../ui/Icon'
import SectionHeading from '../ui/SectionHeading'
import LinkButton from '../ui/LinkButton'

export default function QualitySafety({ showLink = true }) {
  return (
    <section className="bg-paper">
      <div className="container-x section-y">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Quality, safety & sustainability" title="Standards you can inspect." text="Our approach to quality control, site safety, materials and environmental care. Certifications will be listed here once confirmed." />
          {showLink && <div data-reveal><LinkButton to="/quality-safety-sustainability" variant="ghost">Our standards</LinkButton></div>}
        </div>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4" data-reveal="stagger">
          {QUALITY_PILLARS.map((q) => (
            <li key={q.title} className="group relative overflow-hidden rounded-3xl border border-navy/8 bg-white">
              <div className="img-zoom relative aspect-[16/10] overflow-hidden">
                <img src={q.image(800)} alt="" loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-navy/25" />
              </div>
              <div className="p-6 md:p-7">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-teal-100 text-teal"><Icon name={q.icon} className="h-5 w-5" /></span>
                  <h3 className="font-display text-lg font-bold">{q.title}</h3>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {q.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-[0.9rem] text-graphite/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
