import { useRef } from 'react'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import CTASection from '../components/ui/CTASection'
import PlaceholderTag from '../components/ui/PlaceholderTag'
import Icon from '../components/ui/Icon'
import Stats from '../components/home/Stats'
import { OutlineWord, ScrubText } from '../components/ui/Motion'
import useReveal from '../hooks/useReveal'
import useSeo from '../hooks/useSeo'
import { CAPABILITIES } from '../data/content'
import { IMG } from '../data/images'

const RESOURCES = [
  { title: 'Plant & machinery', items: ['Excavators & loaders', 'Concrete batching / transit mixers', 'Tower & mobile cranes', 'Compaction equipment'] },
  { title: 'Formwork & access', items: ['System formwork', 'Scaffolding & access towers', 'Shoring & propping', 'Safety netting & edge protection'] },
  { title: 'Digital & controls', items: ['Planning & scheduling software', 'Quantity take-off & cost tracking', 'Site progress photo reporting', 'Document control'] },
]

export default function Capabilities() {
  useSeo({ title: 'Infrastructure & Capabilities', description: 'Project teams, plant and equipment, engineering coordination and project controls at SAMA Construction & Developments.' })
  const ref = useRef(null)
  useReveal(ref)

  return (
    <div ref={ref}>
      <PageHero eyebrow="Infrastructure & capabilities" title="The people, plant and systems behind every build." text="Capability is what turns a good plan into a finished building. Here is what we bring to site." image={IMG.cranesSky} crumbs={[{ label: 'Capabilities' }]} />
      <section className="bg-paper">
        <OutlineWord text="Capabilities" className="pt-4" />
        <div className="container-x pb-6 pt-10 md:pt-16">
          <ScrubText eyebrow="What we bring">Capability is what turns a good plan into a finished building — experienced people, the right plant and disciplined systems, working as one team on every site.</ScrubText>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-x section-y">
          <SectionHeading eyebrow="Core capabilities" title="Built to deliver at scale." />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-navy/8 bg-navy/8 sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
            {CAPABILITIES.map((c) => (
              <li key={c.title} className="bg-white p-8 md:p-10">
                <Icon name={c.icon} className="h-8 w-8 text-teal" />
                <h3 className="mt-6 font-display text-xl font-bold">{c.title}</h3>
                <p className="mt-3 text-[0.95rem] text-graphite/75">{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 opacity-30">
          <img src={IMG.welder(1800)} alt="" loading="lazy" className="h-full w-full object-cover" data-parallax="0.15" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />
        <div className="container-x section-y relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading light eyebrow="Resources" title="Equipment and systems on site." />
            <PlaceholderTag className="!bg-white/90">Confirm owned vs. hired fleet</PlaceholderTag>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3" data-reveal="stagger">
            {RESOURCES.map((r) => (
              <div key={r.title} className="rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-sm">
                <h3 className="font-display text-xl font-bold text-white">{r.title}</h3>
                <ul className="mt-5 space-y-3 text-white/75">
                  {r.items.map((it) => (
                    <li key={it} className="flex items-center gap-3"><span className="h-1.5 w-1.5 rotate-45 bg-amber" />{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Stats light />
      <CTASection />
    </div>
  )
}
