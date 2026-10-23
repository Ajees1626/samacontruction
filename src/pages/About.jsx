import { useRef } from 'react'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import PlaceholderTag from '../components/ui/PlaceholderTag'
import CTASection from '../components/ui/CTASection'
import Icon from '../components/ui/Icon'
import Stats from '../components/home/Stats'
import Process from '../components/home/Process'
import { ImageBand, OutlineWord } from '../components/ui/Motion'
import useReveal from '../hooks/useReveal'
import useSeo from '../hooks/useSeo'
import { IMG } from '../data/images'
import { STRENGTHS } from '../data/content'

const VALUES = [
  { icon: 'ShieldCheck', title: 'Integrity', text: 'Honest estimates, transparent reporting and doing what we say we will.' },
  { icon: 'BadgeCheck', title: 'Quality', text: 'Workmanship and materials that are checked, recorded and built to last.' },
  { icon: 'HardHat', title: 'Safety', text: 'Every person on our sites goes home safely — no exceptions.' },
  { icon: 'Users', title: 'Partnership', text: 'Long-term relationships with clients, consultants and specialist trades.' },
]

export default function About() {
  useSeo({ title: 'About Us', description: 'SAMA Construction & Developments combines engineering, planning and site execution under one accountable team for residential, commercial, industrial and infrastructure projects.' })
  const ref = useRef(null)
  useReveal(ref)

  return (
    <div ref={ref}>
      <PageHero
        eyebrow="About SAMA Construction & Developments"
        title="Engineering-led construction, delivered with integrity."
        text="We plan, engineer and build — bringing structural rigour and transparent management to every project we take on."
        image={IMG.cranesTower}
        crumbs={[{ label: 'About Us' }]}
      />
      <OutlineWord text="SAMA Construction & Developments" className="bg-paper pt-4" />

      <section className="bg-paper">
        <div className="container-x section-y grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow" data-reveal>Our story</p>
            <h2 className="t-section mt-6" data-split>Built on the belief that good construction is good engineering, well managed.</h2>
          </div>
          <div className="space-y-6 text-graphite/80 lg:col-span-7 t-lead">
            <p data-reveal>
              SAMA Construction & Developments delivers residential, commercial, industrial and infrastructure projects for private owners, developers, businesses and public clients. Our teams combine design coordination, structural engineering, planning and site supervision so that clients deal with one accountable partner.
            </p>
            <p data-reveal>
              We believe the quality of a building is decided long before its finishes are installed — in the soil report, the structural design, the programme and the discipline of daily site management. That belief shapes how we plan, how we build and how we report.
            </p>
            <div className="rounded-2xl border border-dashed border-teal/40 bg-teal-100/40 p-6 text-base" data-reveal>
              <PlaceholderTag>Content needed</PlaceholderTag>
              <p className="mt-3 text-graphite/80">Founding year, founders, headquarters, company registration, leadership team and key milestones should be added here from verified company records.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cloud">
        <div className="container-x section-y">
          <div className="grid gap-5 md:grid-cols-12">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl md:col-span-8" data-reveal="mask">
              <img src={IMG.siteTeamAerial(1600)} alt="Site team on a large construction project (stock image)" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-between gap-5 md:col-span-4">
              <div className="flex-1 rounded-3xl bg-navy p-8 text-white" data-reveal>
                <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-amber">Mission</p>
                <p className="mt-4 font-display text-2xl font-bold leading-snug">To build safe, durable and well-engineered spaces — on time, on budget and to specification.</p>
              </div>
              <div className="flex-1 rounded-3xl bg-amber p-8 text-navy" data-reveal data-delay="0.1">
                <p className="font-display text-xs font-bold uppercase tracking-[0.2em]">Vision</p>
                <p className="mt-4 font-display text-2xl font-bold leading-snug">To be the construction partner clients return to — for every project that follows.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-x section-y">
          <SectionHeading eyebrow="Our values" title="What guides every decision on site." />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-reveal="stagger">
            {VALUES.map((v) => (
              <li key={v.title} className="rounded-3xl border border-navy/8 p-7 transition hover:border-amber hover:shadow-xl">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-amber"><Icon name={v.icon} className="h-6 w-6" /></span>
                <h3 className="mt-6 font-display text-xl font-bold">{v.title}</h3>
                <p className="mt-3 text-[0.95rem] text-graphite/75">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ImageBand image={IMG.rebarCrewTop} rowA="Integrity · Quality · Safety" rowB="Partnership · Precision · Accountability" label="Our values" />

      <Stats />

      <section className="bg-paper">
        <div className="container-x section-y">
          <SectionHeading eyebrow="How we work" title="Strengths that show up on site." />
          <ul className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
            {STRENGTHS.map((s) => (
              <li key={s.title} className="flex gap-5 border-t border-navy/10 pt-7">
                <Icon name={s.icon} className="h-7 w-7 shrink-0 text-teal" />
                <div>
                  <h3 className="font-display text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-[0.95rem] text-graphite/75">{s.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cloud">
        <div className="container-x section-y">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Leadership" title="The people accountable for your project." />
            <PlaceholderTag>Team profiles to be supplied</PlaceholderTag>
          </div>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-reveal="stagger">
            {[
              ['Managing Director', IMG.portrait1],
              ['Director — Projects', IMG.portrait2],
              ['Head of Engineering', IMG.portrait3],
              ['Head of HSE & Quality', IMG.portrait4],
            ].map(([role, img]) => (
              <li key={role} className="group overflow-hidden rounded-3xl bg-white">
                <div className="img-zoom relative aspect-[4/5] overflow-hidden bg-concrete/60">
                  <img src={img(700)} alt={`Sample portrait for ${role} (stock image)`} loading="lazy" className="h-full w-full object-cover grayscale transition duration-700 group-hover:grayscale-0" />
                  <PlaceholderTag className="absolute left-4 top-4 !bg-white/90">Sample photo</PlaceholderTag>
                </div>
                <div className="p-6">
                  <p className="font-display text-lg font-bold text-navy/40">Name to be added</p>
                  <p className="mt-1 text-sm text-stone">{role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Process />
      <div className="h-4 bg-paper" />
      <CTASection />
    </div>
  )
}
