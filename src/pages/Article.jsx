import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import CTASection from '../components/ui/CTASection'
import PlaceholderTag from '../components/ui/PlaceholderTag'
import useReveal from '../hooks/useReveal'
import useSeo from '../hooks/useSeo'
import { ARTICLES } from '../data/content'
import NotFound from './NotFound'

export default function Article() {
  const { slug } = useParams()
  const article = ARTICLES.find((a) => a.slug === slug)
  useSeo(article ? { title: article.title, description: article.excerpt, image: article.image(1200) } : { title: 'Article not found' })
  const ref = useRef(null)
  useReveal(ref, [slug])
  if (!article) return <NotFound />

  return (
    <div ref={ref} key={slug}>
      <PageHero eyebrow={article.category} title={article.title} text={article.excerpt} image={article.image} crumbs={[{ label: 'News & Insights', to: '/news' }, { label: article.title }]} />
      <article className="bg-paper">
        <div className="container-x section-y">
          <div className="mx-auto max-w-2xl">
            {article.sample && <PlaceholderTag>Sample article</PlaceholderTag>}
            <div className="mt-8 space-y-6 text-[1.0625rem] leading-relaxed text-graphite/85 md:text-lg">
              {article.body.map((p, i) => (
                <p key={i} {...(i === 0 ? { 'data-split': '' } : { 'data-reveal': '' })} className={i === 0 ? 'font-display text-xl font-semibold leading-snug text-navy md:text-2xl' : ''}>{p}</p>
              ))}
            </div>
            <Link to="/news" className="link-arrow mt-12"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> All insights</Link>
          </div>
        </div>
      </article>
      <CTASection />
    </div>
  )
}
