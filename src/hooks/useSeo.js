import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE } from '../config/site'

const setMeta = (attr, key, content) => {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/* Per-route SEO metadata (title, description, Open Graph, canonical). */
export default function useSeo({ title, description, image } = {}) {
  const { pathname } = useLocation()
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`
    const desc = description || SITE.description
    const url = SITE.url + pathname
    document.title = fullTitle
    setMeta('name', 'description', desc)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', image || SITE.ogImage)
    setMeta('name', 'twitter:card', 'summary_large_image')
    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = url
  }, [title, description, image, pathname])
}
