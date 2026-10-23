import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import CTASection from '../components/ui/CTASection'
import PlaceholderTag from '../components/ui/PlaceholderTag'
import { OutlineWord } from '../components/ui/Motion'
import useReveal from '../hooks/useReveal'
import useSeo from '../hooks/useSeo'
import { ARTICLES } from '../data/content'
import { IMG } from '../data/images'

export default function News() {
  useSeo({ title: 'News & Insights', description: 'Construction insights on planning, quality and project management from SAMA Construction & Developments.' })
  const ref = useRef(null)
  useReveal(ref)
  const [lead, ...rest] = ARTICLES

  return (
    <div ref={ref}>
      <PageHero eyebrow="News & insights" title="Perspectives from the field." text="Practical insight on planning, engineering and delivering construction projects." image={IMG.blueprints} crumbs={[{ label: 'News & Insights' }]} />
      <OutlineWord text="Insights" className="bg-paper pt-4" />
      <section className="bg-paper">
        <div className="container-x section-y">
          <div className="mb-10 flex justify-end"><PlaceholderTag>Sample articles — company news to follow</PlaceholderTag></div>
          <Link to={`/news/${lead.slug}`} className="group img-zoom grid overflow-hidden rounded-3xl bg-cloud md:grid-cols-2" data-reveal>
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[440px]">
              <img src={lead.image(1300)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-14">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal">{lead.category}</p>
              <h2 className="t-section mt-4 transition group-hover:text-teal" data-split>{lead.title}</h2>
              <p className="mt-5 text-graphite/75">{lead.excerpt}</p>
              <span className="link-arrow mt-8">Read article <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
            </div>
          </Link>
          <ul className="mt-5 grid gap-5 md:grid-cols-2">
            {rest.map((a) => (
              <li key={a.slug} data-reveal>
                <Link to={`/news/${a.slug}`} className="group img-zoom block h-full overflow-hidden rounded-3xl border border-navy/8 bg-white">
                  <div className="aspect-[16/9] overflow-hidden"><img src={a.image(1000)} alt="" loading="lazy" className="h-full w-full object-cover" /></div>
                  <div className="p-7">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal">{a.category}</p>
                    <h3 className="mt-3 t-card transition group-hover:text-teal">{a.title}</h3>
                    <p className="mt-3 text-[0.95rem] text-graphite/75">{a.excerpt}</p>
                  </div>
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
