import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, MapPin } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import CTASection from '../components/ui/CTASection'
import PlaceholderTag from '../components/ui/PlaceholderTag'
import useReveal from '../hooks/useReveal'
import useSeo from '../hooks/useSeo'
import { PROJECTS, getProject } from '../data/projects'
import NotFound from './NotFound'

/* Single data-driven template for every project page. */
export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)
  useSeo(project ? { title: project.name, description: project.summary, image: project.image(1200) } : { title: 'Project not found' })
  const ref = useRef(null)
  useReveal(ref, [slug])

  if (!project) return <NotFound />

  const idx = PROJECTS.indexOf(project)
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length]
  const next = PROJECTS[(idx + 1) % PROJECTS.length]

  return (
    <div ref={ref} key={slug}>
      <PageHero tall eyebrow={project.category} title={project.name} text={project.summary} image={project.image} crumbs={[{ label: 'Projects', to: '/projects' }, { label: project.name }]}>
        {project.sample && <PlaceholderTag className="!bg-white">Sample project — not a completed SAMA Construction & Developments project</PlaceholderTag>}
      </PageHero>

      <section className="bg-paper">
        <div className="container-x">
          <dl className="grid -translate-y-10 grid-cols-2 gap-px overflow-hidden rounded-3xl bg-navy/10 shadow-2xl md:-translate-y-14 md:grid-cols-5" data-reveal>
            {[
              { label: 'Category', value: project.category },
              { label: 'Location', value: project.location },
              { label: 'Status', value: project.status },
              ...project.facts.slice(0, 2),
            ].map((f) => (
              <div key={f.label} className="bg-white p-5 md:p-7">
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-stone">{f.label}</dt>
                <dd className="mt-2 font-display text-base font-bold text-navy md:text-lg">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="container-x pb-20 md:pb-28 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow" data-reveal>The project</p>
            <p className="mt-6 font-display text-[clamp(1.375rem,1.1rem+1vw,2rem)] font-semibold leading-snug text-navy" data-split="scrub">{project.summary}</p>
            <p className="mt-6 text-graphite/75" data-reveal>
              Detailed project narrative — client brief, site constraints, engineering solutions, programme and outcomes — will be added from verified project records with client permission.
            </p>
          </div>
          <aside className="lg:col-span-5">
            <div className="rounded-3xl bg-cloud p-8" data-reveal>
              <h2 className="font-display text-xl font-bold">Scope delivered</h2>
              <ul className="mt-5 space-y-3">
                {project.scope.map((s) => (
                  <li key={s} className="flex gap-3 text-graphite/80"><Check className="mt-1 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />{s}</li>
                ))}
              </ul>
              <p className="mt-6 flex items-center gap-2 text-sm text-stone"><MapPin className="h-4 w-4 text-teal" aria-hidden="true" />{project.location}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-paper pb-20 md:pb-28">
        <div className="container-x grid gap-5 md:grid-cols-12">
          {project.gallery.map((g, i) => (
            <div key={i} className={`overflow-hidden ${i === 0 ? 'aspect-[4/3] sm:aspect-[16/8] md:col-span-12' : 'aspect-[4/3] rounded-3xl md:col-span-6'}`} {...(i === 0 ? { 'data-arch': '' } : { 'data-reveal': 'mask' })}>
              <img src={g(i === 0 ? 2000 : 1100)} alt={`${project.name} — gallery image ${i + 1} (stock image)`} loading="lazy" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <nav aria-label="More projects" className="border-t border-navy/10 bg-paper">
        <div className="container-x grid gap-4 py-10 sm:grid-cols-2">
          <Link to={`/projects/${prev.slug}`} className="group flex items-center gap-4 rounded-2xl p-4 transition hover:bg-cloud">
            <ArrowLeft className="h-5 w-5 text-navy transition group-hover:-translate-x-1" aria-hidden="true" />
            <span><span className="block text-xs font-semibold uppercase tracking-[0.16em] text-stone">Previous</span><span className="font-display font-bold text-navy">{prev.name}</span></span>
          </Link>
          <Link to={`/projects/${next.slug}`} className="group flex items-center justify-end gap-4 rounded-2xl p-4 text-right transition hover:bg-cloud">
            <span><span className="block text-xs font-semibold uppercase tracking-[0.16em] text-stone">Next</span><span className="font-display font-bold text-navy">{next.name}</span></span>
            <ArrowRight className="h-5 w-5 text-navy transition group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </nav>
      <CTASection />
    </div>
  )
}
