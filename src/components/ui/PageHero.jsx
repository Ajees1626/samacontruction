import { useLayoutEffect, useRef } from 'react'
import { gsap, SplitText, prefersReducedMotion } from '../../lib/gsap'
import Breadcrumbs from './Breadcrumbs'

const LIP = { paper: 'bg-paper', cloud: 'bg-cloud', navy: 'bg-navy' }

/*
  Inner-page hero with the same motion language as the homepage:
  image settles from a zoom, title rises line by line, and on scroll the image drifts,
  the copy lifts away and the page content slides over it with rounded corners.
  `lip` = background colour of the section that follows ('paper' | 'cloud' | 'navy' | false).
*/
export default function PageHero({ eyebrow, title, text, image, crumbs = [], children, tall = false, lip = 'paper' }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.ph-img', { scale: 1.2 }, { scale: 1, duration: 2.4, ease: 'expo.out' })
      gsap.fromTo('.ph-in', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out', delay: 0.15 })
      SplitText.create('.ph-title', {
        type: 'lines',
        mask: 'lines',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit: (self) => gsap.from(self.lines, { yPercent: 115, duration: 1.3, stagger: 0.1, ease: 'expo.out', delay: 0.25 }),
      })
      const st = { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to('.ph-wrap', { yPercent: 18, ease: 'none', scrollTrigger: st })
      gsap.to('.ph-content', { yPercent: -30, opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '80% top' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className={`relative isolate flex items-end overflow-hidden bg-navy ${tall ? 'min-h-[88svh]' : 'min-h-[64svh] md:min-h-[72svh]'}`}>
      <div className="ph-wrap absolute inset-0 -z-10">
        <img
          src={image(2000)}
          srcSet={`${image(900)} 900w, ${image(1400)} 1400w, ${image(2000)} 2000w`}
          sizes="100vw"
          alt=""
          className="ph-img h-full w-full object-cover"
          fetchPriority="high"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-900 via-navy/65 to-navy/25" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-900/70 to-transparent" />
      <div className={`ph-content container-x relative w-full pt-32 md:pt-36 ${lip ? 'pb-20 md:pb-28' : 'pb-14 md:pb-20'}`}>
        <div className="ph-in"><Breadcrumbs items={crumbs} /></div>
        {eyebrow && <p className="ph-in eyebrow eyebrow-light mt-8">{eyebrow}</p>}
        <h1 className="ph-title t-page mt-5 max-w-4xl text-white">{title}</h1>
        {text && <p className="ph-in t-lead mt-6 max-w-2xl text-white/75">{text}</p>}
        {children && <div className="ph-in mt-8">{children}</div>}
      </div>
      {lip && <div aria-hidden="true" className={`ph-lip absolute inset-x-0 bottom-0 h-8 origin-bottom rounded-t-[32px] md:h-12 md:rounded-t-[48px] ${LIP[lip]}`} />}
    </section>
  )
}
