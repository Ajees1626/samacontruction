import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHero from '../components/ui/PageHero'
import CTASection from '../components/ui/CTASection'
import PlaceholderTag from '../components/ui/PlaceholderTag'
import ProjectCard from '../components/home/ProjectCard'
import { OutlineWord } from '../components/ui/Motion'
import useReveal from '../hooks/useReveal'
import useSeo from '../hooks/useSeo'
import { PROJECTS, PROJECT_CATEGORIES } from '../data/projects'
import { IMG } from '../data/images'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'

export default function Projects() {
  useSeo({ title: 'Projects', description: 'Residential, commercial, industrial, civil and infrastructure projects by SAMA Construction & Developments.' })
  const [params, setParams] = useSearchParams()
  const initial = PROJECT_CATEGORIES.includes(params.get('category')) ? params.get('category') : 'All'
  const [filter, setFilter] = useState(initial)
  const ref = useRef(null)
  const gridRef = useRef(null)
  useReveal(ref)

  const list = useMemo(() => (filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)), [filter])

  const choose = (c) => {
    setFilter(c)
    setParams(c === 'All' ? {} : { category: c }, { replace: true })
  }

  // Animate grid items whenever the filter changes.
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !gridRef.current) return
    const tween = gsap.fromTo(gridRef.current.children, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out' })
    ScrollTrigger.refresh()
    return () => tween.kill()
  }, [filter])

  return (
    <div ref={ref}>
      <PageHero eyebrow="Projects" title="Built work, from homes to infrastructure." text="Explore projects by sector. Entries currently shown are clearly marked samples awaiting verified project records and photography." image={IMG.highriseBuild} crumbs={[{ label: 'Projects' }]} />
      <OutlineWord text="Projects" className="bg-paper pt-4" />

      <section className="bg-paper">
        <div className="container-x section-y">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div role="tablist" aria-label="Filter projects by category" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2" data-lenis-prevent>
              {PROJECT_CATEGORIES.map((c) => {
                const count = c === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.category === c).length
                const active = filter === c
                return (
                  <button
                    key={c}
                    role="tab"
                    aria-selected={active}
                    type="button"
                    onClick={() => choose(c)}
                    className={`shrink-0 rounded-full border px-5 py-2.5 font-display text-sm font-bold transition ${active ? 'border-navy bg-navy text-white' : 'border-navy/15 text-navy hover:border-navy'}`}
                  >
                    {c} <span className={`ml-1 ${active ? 'text-amber' : 'text-stone'}`}>{count}</span>
                  </button>
                )
              })}
            </div>
            <PlaceholderTag>Sample entries</PlaceholderTag>
          </div>

          <div ref={gridRef} className="mt-12 grid gap-5 md:grid-cols-2">
            {list.map((p, i) => (
              <ProjectCard key={p.slug} project={p} size={i === 0 && list.length > 2 ? 'wide' : 'md'} className={i === 0 && list.length > 2 ? 'md:col-span-2' : ''} />
            ))}
          </div>
          {list.length === 0 && <p className="mt-12 text-center text-stone">No projects in this category yet.</p>}
        </div>
      </section>
      <CTASection />
    </div>
  )
}
