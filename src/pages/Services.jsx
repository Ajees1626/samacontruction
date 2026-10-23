import { useRef } from 'react'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import CTASection from '../components/ui/CTASection'
import ServicesGrid from '../components/home/ServicesGrid'
import Process from '../components/home/Process'
import { ImageBand, OutlineWord } from '../components/ui/Motion'
import useReveal from '../hooks/useReveal'
import useSeo from '../hooks/useSeo'
import { IMG } from '../data/images'

const MODELS = [
  { title: 'Design & Build', text: 'Single-point responsibility for design coordination and construction under one contract.' },
  { title: 'Build Only', text: 'Construction of owner-supplied, approved designs with full site management.' },
  { title: 'Project Management (PMC)', text: 'Owner-side management of time, cost, quality and contractors.' },
]

export default function Services() {
  useSeo({ title: 'Services', description: 'Residential, commercial and industrial construction, civil engineering, infrastructure development and project management from SAMA Construction & Developments.' })
  const ref = useRef(null)
  useReveal(ref)

  return (
    <div ref={ref}>
      <PageHero eyebrow="Services" title="Every discipline a building needs, under one roof." text="Six core service lines, delivered by specialist teams and coordinated by one accountable project manager." image={IMG.rebarCrewTop} crumbs={[{ label: 'Services' }]} lip="cloud" />
      <OutlineWord text="Services" className="bg-cloud" />
      <section className="bg-cloud">
        <div className="container-x section-y">
          <ServicesGrid />
        </div>
      </section>
      <ImageBand image={IMG.siteTeamAerial} rowA="Plan · Engineer · Build" rowB="Residential · Commercial · Industrial · Infrastructure" label="How we work" />
      <section className="bg-paper">
        <div className="container-x section-y grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Engagement models" title="Work with us the way your project needs." text="Choose the contracting model that fits your project, risk profile and in-house capability." />
          </div>
          <ol className="divide-y divide-navy/10 border-y border-navy/10 lg:col-span-7" data-reveal="stagger">
            {MODELS.map((m, i) => (
              <li key={m.title} className="flex gap-6 py-8">
                <span className="font-display text-sm font-bold text-amber-600">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-display text-2xl font-bold">{m.title}</h3>
                  <p className="mt-2 text-graphite/75">{m.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Process />
      <div className="h-4 bg-paper" />
      <CTASection />
    </div>
  )
}
