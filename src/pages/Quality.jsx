import { useRef } from 'react'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import CTASection from '../components/ui/CTASection'
import PlaceholderTag from '../components/ui/PlaceholderTag'
import Icon from '../components/ui/Icon'
import QualitySafety from '../components/home/QualitySafety'
import { OutlineWord, ScrubText } from '../components/ui/Motion'
import useReveal from '../hooks/useReveal'
import useSeo from '../hooks/useSeo'
import { IMG } from '../data/images'

const STAGES = [
  { icon: 'ClipboardCheck', title: 'Before work starts', text: 'Method statements, inspection & test plans and material approvals agreed in advance.' },
  { icon: 'Eye', title: 'During construction', text: 'Hold-point inspections before concealment — reinforcement, waterproofing, services.' },
  { icon: 'FileText', title: 'Records', text: 'Test results, pour records and inspection sign-offs maintained for each element.' },
  { icon: 'BadgeCheck', title: 'Before handover', text: 'Snagging, commissioning and as-built documentation reviewed with the client.' },
]

export default function Quality() {
  useSeo({ title: 'Quality, Safety & Sustainability', description: 'How SAMA Construction & Developments approaches quality control, site safety, material standards and sustainability.' })
  const ref = useRef(null)
  useReveal(ref)

  return (
    <div ref={ref}>
      <PageHero eyebrow="Quality, safety & sustainability" title="Standards you can see — and inspect." text="Quality is built in stages, safety is planned before work begins, and responsible practice is part of every method statement." image={IMG.engineersSite} crumbs={[{ label: 'Quality, Safety & Sustainability' }]} />
      <section className="bg-paper">
        <OutlineWord text="Quality · Safety" className="pt-4" />
        <div className="container-x pt-10 md:pt-16">
          <ScrubText eyebrow="Our standard">Quality is built in stages. Safety is planned before work begins. Responsibility for people and the environment is written into every method statement.</ScrubText>
        </div>
      </section>

      <QualitySafety showLink={false} />

      <section className="bg-cloud">
        <div className="container-x section-y grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Quality assurance" title="Quality checked at every hold point." text="The most important inspections happen before work is covered up." />
            <div className="mt-10 aspect-[4/3] overflow-hidden rounded-3xl" data-reveal="mask">
              <img src={IMG.rebarCrewTop(1100)} alt="Reinforcement work being inspected from above (stock image)" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </div>
          <ol className="grid gap-5 sm:grid-cols-2 lg:col-span-7 lg:self-center" data-reveal="stagger">
            {STAGES.map((s, i) => (
              <li key={s.title} className="rounded-3xl bg-white p-8">
                <div className="flex items-center justify-between">
                  <Icon name={s.icon} className="h-8 w-8 text-teal" />
                  <span className="font-display text-sm font-bold text-amber-600">0{i + 1}</span>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-3 text-[0.95rem] text-graphite/75">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-x section-y">
          <div className="grid gap-10 rounded-[32px] bg-navy p-8 text-white md:grid-cols-2 md:p-14">
            <div>
              <p className="eyebrow eyebrow-light" data-reveal>Certifications & compliance</p>
              <h2 className="t-section mt-5 text-white" data-split>Accreditations</h2>
              <p className="mt-5 text-white/70" data-reveal>Only verified certifications (for example ISO management systems or statutory registrations) will be displayed here, with certificate numbers and validity dates.</p>
            </div>
            <div className="grid grid-cols-2 gap-4" data-reveal>
              {['Quality management', 'Health & safety', 'Environmental', 'Registrations'].map((c) => (
                <div key={c} className="grid place-items-center rounded-2xl border border-dashed border-white/20 p-6 text-center">
                  <Icon name="Award" className="h-8 w-8 text-amber/70" />
                  <p className="mt-3 text-sm font-semibold text-white/70">{c}</p>
                  <PlaceholderTag className="mt-3 !bg-white/90">To be verified</PlaceholderTag>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTASection />
    </div>
  )
}
