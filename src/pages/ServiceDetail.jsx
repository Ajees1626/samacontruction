import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import CTASection from '../components/ui/CTASection'
import LinkButton from '../components/ui/LinkButton'
import Icon from '../components/ui/Icon'
import ProjectCard from '../components/home/ProjectCard'
import { OutlineWord } from '../components/ui/Motion'
import useReveal from '../hooks/useReveal'
import useSeo from '../hooks/useSeo'
import { SERVICES, getService } from '../data/services'
import { PROJECTS } from '../data/projects'
import { PROCESS } from '../data/content'
import NotFound from './NotFound'

const CATEGORY_FOR = {
  'residential-construction': 'Residential',
  'commercial-construction': 'Commercial',
  'industrial-construction': 'Industrial',
  'civil-engineering': 'Civil',
  'infrastructure-development': 'Infrastructure',
}

/* Single data-driven template for every service page. */
export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)
  useSeo(service ? { title: service.title, description: service.short, image: service.image(1200) } : { title: 'Service not found' })
  const ref = useRef(null)
  useReveal(ref, [slug])

  if (!service) return <NotFound />

  const related = PROJECTS.filter((p) => !CATEGORY_FOR[slug] || p.category === CATEGORY_FOR[slug]).slice(0, 2)
  const others = SERVICES.filter((s) => s.slug !== slug)

  return (
    <div ref={ref} key={slug}>
      <PageHero eyebrow="Service" title={service.title} text={service.short} image={service.hero} crumbs={[{ label: 'Services', to: '/services' }, { label: service.title }]}>
        <LinkButton to={`/request-a-quote?service=${service.slug}`}>Request a quote</LinkButton>
      </PageHero>
      <OutlineWord text={service.title} className="bg-paper pt-4" />

      <section className="bg-paper">
        <div className="container-x section-y grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow" data-reveal>Overview</p>
            <p className="mt-6 font-display text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] font-semibold leading-snug text-navy" data-split="scrub">{service.intro}</p>
            <div className="mt-12 grid gap-5 sm:grid-cols-3" data-reveal="stagger">
              {service.highlights.map((h) => (
                <div key={h.title} className="rounded-2xl bg-cloud p-6">
                  <h3 className="font-display text-lg font-bold">{h.title}</h3>
                  <p className="mt-2 text-[0.9rem] text-graphite/75">{h.text}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="lg:col-span-5">
            <div className="rounded-3xl bg-navy p-8 text-white md:p-10 lg:sticky lg:top-28" data-reveal>
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-amber text-navy"><Icon name={service.icon} className="h-7 w-7" /></span>
              <h2 className="mt-6 font-display text-2xl font-bold text-white">Scope of work</h2>
              <ul className="mt-6 space-y-3.5">
                {service.scope.map((s) => (
                  <li key={s} className="flex gap-3 text-white/80"><Check className="mt-1 h-4 w-4 shrink-0 text-amber" aria-hidden="true" />{s}</li>
                ))}
              </ul>
              <Link to={`/request-a-quote?service=${service.slug}`} className="btn btn-primary mt-9 w-full">Discuss your project <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-cloud">
        <div className="container-x section-y grid items-center gap-12 lg:grid-cols-2">
          <div className="aspect-[4/3] overflow-hidden" data-arch>
            <img src={service.image(1400)} alt={`${service.title} (stock image)`} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div>
            <SectionHeading eyebrow="Delivery" title="How we deliver it." />
            <ol className="mt-10 space-y-6" data-reveal="stagger">
              {PROCESS.map((p) => (
                <li key={p.step} className="flex gap-5">
                  <span className="font-display text-sm font-bold text-amber-600">{p.step}</span>
                  <div>
                    <h3 className="font-display text-lg font-bold">{p.title}</h3>
                    <p className="mt-1 text-[0.95rem] text-graphite/75">{p.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-paper">
          <div className="container-x section-y">
            <SectionHeading eyebrow="Related projects" title="Examples of this work." />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {related.map((p) => (
                <div key={p.slug} data-reveal><ProjectCard project={p} /></div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-paper pb-20">
        <div className="container-x">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-stone">Other services</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="group flex items-center justify-between gap-3 rounded-2xl border border-navy/10 p-5 font-display font-bold text-navy transition hover:border-amber hover:bg-amber-100">
                  {s.title}
                  <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
