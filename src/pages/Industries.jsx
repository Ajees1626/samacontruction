import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import CTASection from '../components/ui/CTASection'
import Icon from '../components/ui/Icon'
import { ImageBand, OutlineWord } from '../components/ui/Motion'
import useReveal from '../hooks/useReveal'
import useSeo from '../hooks/useSeo'
import { INDUSTRIES } from '../data/content'
import { getService } from '../data/services'
import { IMG } from '../data/images'

export default function Industries() {
  useSeo({ title: 'Industries', description: 'Sectors served by SAMA Construction & Developments: residential, commercial, industrial, hospitality, institutional and public infrastructure.' })
  const ref = useRef(null)
  useReveal(ref)

  return (
    <div ref={ref}>
      <PageHero eyebrow="Industries" title="Sector knowledge that shapes how we build." text="Different buildings carry different risks. We bring sector-specific experience to planning, sequencing and specification." image={IMG.towersFog} crumbs={[{ label: 'Industries' }]} />
      <OutlineWord text="Industries" className="bg-paper pt-4" />
      <section className="bg-paper">
        <div className="container-x section-y">
          <ul className="space-y-5">
            {INDUSTRIES.map((ind, i) => (
              <li key={ind.title} className="group grid overflow-hidden rounded-3xl border border-navy/8 bg-white md:grid-cols-12" data-reveal>
                <div className={`relative aspect-[16/10] overflow-hidden md:col-span-5 md:aspect-auto md:min-h-80 ${i % 2 ? 'md:order-2' : ''}`}>
                  <img src={ind.image(1100)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" data-parallax-img />
                </div>
                <div className="flex flex-col justify-center p-7 md:col-span-7 md:p-12">
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-amber text-navy"><Icon name={ind.icon} className="h-6 w-6" /></span>
                    <span className="font-display text-sm font-bold text-stone">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h2 className="mt-6 t-card" data-split>{ind.title}</h2>
                  <p className="mt-3 max-w-xl text-graphite/75">{ind.text}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {ind.services.map((slug) => {
                      const s = getService(slug)
                      return (
                        <Link key={slug} to={`/services/${slug}`} className="inline-flex items-center gap-1.5 rounded-full bg-cloud px-4 py-2 text-sm font-semibold text-navy transition hover:bg-teal-100 hover:text-teal">
                          {s.title} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ImageBand image={IMG.towersUp} rowA="Homes · Offices · Factories" rowB="Hotels · Hospitals · Schools · Roads" label="Sectors" />
      <CTASection />
    </div>
  )
}
