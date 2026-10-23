import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Briefcase, Check, Clock, Mail, MapPin, Phone } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import PlaceholderTag from '../components/ui/PlaceholderTag'
import Icon from '../components/ui/Icon'
import { ImageBand, OutlineWord, ScrubText } from '../components/ui/Motion'
import useReveal from '../hooks/useReveal'
import useSeo from '../hooks/useSeo'
import { JOBS } from '../data/content'
import { IMG } from '../data/images'
import { SITE } from '../config/site'
import { ALUMNI, COURSE_GROUPS, GLOBAL_NETWORK, INSTITUTES, INSTITUTE_PILLARS, PLACEMENT_SUPPORT, SOFTWARE_COURSES, TRAINING_STAGES } from '../data/institutes'

/* External link to the Sama Institutes website (opens in a new tab). */
function InstitutesLink({ children = 'Visit Sama Institutes', variant = 'primary', className = '' }) {
  return (
    <a href={INSTITUTES.url} target="_blank" rel="noopener" className={`btn btn-${variant} group ${className}`}>
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}

export default function Careers() {
  useSeo({
    title: 'Careers & Sama Institutes',
    description: 'Build your career in construction. Sama Institutes, the skill and career development arm of SAMA Construction & Developments, trains Civil, Mechanical and Electrical engineers in Chennai with placement support in India and the Gulf.',
  })
  const ref = useRef(null)
  useReveal(ref)
  const applyHref = SITE.contact.careersEmail ? `mailto:${SITE.contact.careersEmail}` : '/contact?topic=careers'
  const totalAbroad = GLOBAL_NETWORK.reduce((n, g) => n + g.count, 0)

  return (
    <div ref={ref}>
      <PageHero
        eyebrow="Careers · Sama Institutes"
        title="Build your career. Master the industry."
        text="Training and placement for Civil, Mechanical and Electrical engineers — through Sama Institutes, the skill and career development arm of SAMA Construction & Developments."
        image={IMG.engineersSite}
        crumbs={[{ label: 'Careers' }]}
      >
        <div className="flex flex-wrap gap-3">
          <InstitutesLink />
          <a href="#courses" className="btn btn-ghost-light">Explore courses</a>
        </div>
      </PageHero>

      {/* Intro */}
      <section className="bg-paper">
        <OutlineWord text="Sama Institutes" className="pt-4" />
        <div className="container-x pt-10 md:pt-16">
          <ScrubText eyebrow="From classroom to construction site">
            We don’t just build structures — we help build careers. Sama Institutes trains engineers in the software, standards and site thinking the industry actually hires for.
          </ScrubText>
        </div>
      </section>

      {/* About the institute */}
      <section className="bg-paper">
        <div className="container-x section-y grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]" data-arch>
              <img src={IMG.blueprints(1400)} srcSet={`${IMG.blueprints(800)} 800w, ${IMG.blueprints(1400)} 1400w`} sizes="(min-width:1024px) 50vw, 100vw" alt="Engineer working on construction drawings (stock image)" loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/85 to-transparent p-6 text-white md:p-8">
                <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-amber">Based in</p>
                <p className="mt-1 font-display text-2xl font-bold">Tambaram, Chennai</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 lg:self-center">
            <p className="eyebrow" data-reveal>A SAMA Construction & Developments initiative</p>
            <h2 className="t-section mt-6" data-split>Where engineering education meets real project work.</h2>
            <p className="t-lead mt-6 text-graphite/80" data-reveal>{INSTITUTES.about}</p>
            <p className="mt-4 text-graphite/75" data-reveal>Small batches, working mentors and a project at the end of every course — so you leave with skills you can prove, not just a certificate.</p>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2" data-reveal="stagger">
              {INSTITUTE_PILLARS.map((p) => (
                <li key={p.title} className="rounded-2xl bg-cloud p-5">
                  <Icon name={p.icon} className="h-7 w-7 text-teal" />
                  <h3 className="mt-4 font-display text-lg font-bold">{p.title}</h3>
                  <p className="mt-1.5 text-[0.9rem] text-graphite/75">{p.text}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10" data-reveal><InstitutesLink variant="navy">Explore Sama Institutes</InstitutesLink></div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="scroll-mt-24 bg-cloud">
        <div className="container-x section-y">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Courses" title="10 career-focused courses, one placement team." text="Small batches, working mentors and real project work — classroom or online." />
            <div data-reveal><InstitutesLink variant="ghost">All course details</InstitutesLink></div>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-3" data-reveal="stagger">
            {COURSE_GROUPS.map((g, gi) => (
              <article key={g.title} className="group flex flex-col rounded-3xl bg-white p-7 transition-shadow duration-500 hover:shadow-[0_40px_80px_-40px_rgba(22,30,75,0.45)] md:p-9">
                <div className="flex items-center justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy text-amber transition group-hover:bg-amber group-hover:text-navy">
                    <Icon name={g.icon} className="h-7 w-7" />
                  </span>
                  <span className="font-display text-[2.75rem] font-extrabold leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(22,30,75,0.2)]">0{gi + 1}</span>
                </div>
                <h3 className="mt-7 t-card">{g.title}</h3>
                <ul className="mt-6 flex-1 divide-y divide-navy/8 border-t border-navy/8">
                  {g.courses.map((c) => (
                    <li key={c.name} className="flex items-center justify-between gap-4 py-3.5">
                      <span className="font-medium text-graphite">{c.name}</span>
                      <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-navy">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {c.weeks} weeks
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-5 rounded-3xl bg-navy p-7 text-white md:grid-cols-12 md:items-center md:p-10" data-reveal>
            <div className="md:col-span-5">
              <p className="eyebrow eyebrow-light">Software courses</p>
              <p className="mt-4 font-display text-2xl font-bold text-white">Software-fluent from day one.</p>
              <p className="mt-2 text-white/70">AutoCAD, Revit, STAAD.Pro, Primavera P6 and BIM coordination tools — taught on real project sets.</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-3 md:col-span-7">
              {SOFTWARE_COURSES.map((s) => (
                <li key={s.name} className="rounded-2xl border border-white/15 bg-white/5 p-5">
                  <p className="font-display text-xl font-bold text-white">{s.name}</p>
                  <p className="mt-1 text-sm font-semibold text-amber">{s.hours}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ImageBand image={IMG.rebarCrew} rowA="Quantity Surveying · Structural Design · QA & QC" rowB="MEP Coordination · HVAC · Primavera P6 · STAAD.Pro · BIM" label="Course subjects" />

      {/* Training process */}
      <section className="bg-paper">
        <div className="container-x section-y">
          <SectionHeading eyebrow="Training process" title="Five stages from classroom to career." />
          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5" data-reveal="stagger">
            {TRAINING_STAGES.map((s, i) => (
              <li key={s.title} className="relative rounded-3xl border border-navy/8 p-7 transition hover:border-amber">
                <span className="font-display text-[3.25rem] font-extrabold leading-none text-transparent [-webkit-text-stroke:1.5px_#fcb415]">0{i + 1}</span>
                <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-[0.92rem] text-graphite/75">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Placement & global network */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute -left-40 top-20 h-[480px] w-[480px] rounded-full bg-amber/10 blur-3xl" />
        <div className="container-x section-y relative grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow eyebrow-light" data-reveal>Placement</p>
            <h2 className="t-section mt-6 text-white" data-split>Your skills should take you further.</h2>
            <p className="t-lead mt-6 text-white/70" data-reveal>Training is only half the job. The placement team helps you present your work, prepare for technical interviews and connect with contractors, consultancies and MEP firms — in India and across the Gulf.</p>
            <ul className="mt-8 space-y-3" data-reveal="stagger">
              {PLACEMENT_SUPPORT.map((p) => (
                <li key={p} className="flex gap-3 text-white/85"><Check className="mt-1 h-4 w-4 shrink-0 text-amber" aria-hidden="true" />{p}</li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <p className="font-display text-xs font-bold uppercase tracking-[0.24em] text-amber" data-reveal>From SAMA to the world</p>
            <p className="mt-3 font-display text-2xl font-bold text-white md:text-3xl" data-split>Same foundations. Bigger horizons.</p>
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-4" data-reveal="stagger">
              {GLOBAL_NETWORK.map((g) => (
                <div key={g.country} className="bg-navy p-6">
                  <dd className="font-display text-[clamp(2.5rem,2rem+2vw,3.75rem)] font-extrabold leading-none text-transparent [-webkit-text-stroke:2px_#ffffff]">{g.count}</dd>
                  <dt className="mt-3 text-sm text-white/70">{g.country}</dt>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-white/55" data-reveal>{totalAbroad} engineers placed abroad, as listed by Sama Institutes.</p>
          </div>
        </div>

        <div className="container-x relative pb-20 md:pb-28">
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white/60" data-reveal>Where our engineers work</h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
            {ALUMNI.map((a) => (
              <li key={a.name} className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 transition hover:border-amber/60 hover:bg-white/[0.07]">
                <p className="font-display text-lg font-bold text-white">{a.name}</p>
                <p className="mt-1 text-sm font-semibold text-amber">{a.role}</p>
                <p className="mt-3 text-sm text-white/70">{a.company}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-white/50"><MapPin className="h-3.5 w-3.5" aria-hidden="true" />{a.place}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Jobs at SAMA Construction & Developments */}
      <section className="bg-cloud">
        <div className="container-x section-y">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Work with SAMA Construction" title="Current opportunities." />
            <PlaceholderTag>Sample vacancies</PlaceholderTag>
          </div>
          <ul className="mt-12 divide-y divide-navy/10 overflow-hidden rounded-3xl bg-white" data-reveal="stagger">
            {JOBS.map((j) => {
              const inner = (
                <>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">{j.dept}</p>
                    <h3 className="mt-2 font-display text-xl font-bold text-navy">{j.title}</h3>
                    <p className="mt-2 flex flex-wrap items-center gap-4 text-sm text-stone">
                      <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" aria-hidden="true" />{j.location}</span>
                      <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" aria-hidden="true" />{j.type}</span>
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 font-display text-sm font-bold text-navy">Apply <span className="grid h-10 w-10 place-items-center rounded-full bg-amber transition group-hover:rotate-45"><ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span></span>
                </>
              )
              const cls = 'group flex flex-col gap-5 p-6 transition hover:bg-amber-100/50 sm:flex-row sm:items-center sm:justify-between md:p-8'
              return (
                <li key={j.title}>
                  {applyHref.startsWith('mailto:') ? (
                    <a href={`${applyHref}?subject=${encodeURIComponent('Application: ' + j.title)}`} className={cls}>{inner}</a>
                  ) : (
                    <Link to={applyHref} className={cls}>{inner}</Link>
                  )}
                </li>
              )
            })}
          </ul>
          <p className="mt-8 text-center text-graphite/70" data-reveal>Don’t see your role? <Link to="/contact?topic=careers" className="font-semibold text-navy underline decoration-amber decoration-2 underline-offset-4 hover:text-teal">Send us a general application.</Link></p>
        </div>
      </section>

      {/* Admissions CTA */}
      <section className="bg-cloud px-3 pb-3 sm:px-4 sm:pb-4">
        <div className="relative isolate overflow-hidden rounded-[28px] bg-navy md:rounded-[40px]">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <img src={IMG.cranesTower(2000)} alt="" loading="lazy" className="h-full w-full object-cover" data-parallax-img />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-900/95 via-navy/85 to-navy/40" />
          <div className="container-x grid gap-10 py-20 md:py-24 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow eyebrow-light" data-reveal>Admissions open</p>
              <h2 className="t-page mt-6 text-white" data-split>Ready to build your future in engineering?</h2>
              <p className="t-lead mt-6 max-w-xl text-white/75" data-reveal>Talk to Sama Institutes counsellors about the right course for your goals — whether you are a fresh graduate or a working professional.</p>
              <div className="mt-8 flex flex-wrap gap-3" data-reveal>
                <InstitutesLink>Enquire at Sama Institutes</InstitutesLink>
              </div>
            </div>
            <address className="space-y-4 not-italic text-white/80 lg:col-span-5" data-reveal>
              {INSTITUTES.contact.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="flex items-center gap-3 hover:text-amber"><Phone className="h-4 w-4 text-amber" aria-hidden="true" />{p}</a>
              ))}
              <a href={`mailto:${INSTITUTES.contact.email}`} className="flex items-center gap-3 hover:text-amber"><Mail className="h-4 w-4 text-amber" aria-hidden="true" />{INSTITUTES.contact.email}</a>
              <p className="flex gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0 text-amber" aria-hidden="true" />{INSTITUTES.contact.address}</p>
            </address>
          </div>
        </div>
      </section>
    </div>
  )
}
