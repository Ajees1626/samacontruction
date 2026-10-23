import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from '../lib/gsap'

/*
  Scroll animations for a page or section scope (inspired by editorial architecture themes).

    [data-reveal]                fade + rise
    [data-reveal="mask"]         image wipes open from an inset, image settles from a zoom
    [data-reveal="stagger"]      children stagger in
    [data-split]                 heading lines rise out of a mask, line by line
    [data-split="scrub"]         words brighten one by one as you scroll (statement text)
    [data-split="chars"]         characters cascade in (large display words)
    [data-arch]                  image opens from an arch to full width while scrolling
    [data-parallax="0.15"]       element drifts vertically against the scroll
    [data-parallax-img]          image moves inside its frame (frame must clip overflow)
    [data-scroll-x="-30"]        element slides horizontally with scroll (xPercent amount)
    [data-scale-in]              section scales up from 0.9 with rounded corners as it enters
*/
export default function useReveal(scopeRef, deps = []) {
  useLayoutEffect(() => {
    const scope = scopeRef.current
    if (!scope) return
    const reduced = prefersReducedMotion()
    const q = (sel) => gsap.utils.toArray(sel, scope)

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(q('[data-reveal]'), { opacity: 1, clearProps: 'transform,clipPath' })
        return
      }

      q('[data-reveal]').forEach((el) => {
        const type = el.dataset.reveal
        const trigger = { trigger: el, start: 'top 88%', once: true }
        if (type === 'mask') {
          const img = el.querySelector('img')
          gsap.fromTo(el, { opacity: 1, clipPath: 'inset(14% 14% 14% 14% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 24px)', duration: 1.6, ease: 'expo.out', scrollTrigger: trigger })
          if (img) gsap.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 2, ease: 'expo.out', scrollTrigger: trigger })
        } else if (type === 'stagger') {
          gsap.set(el, { opacity: 1 })
          gsap.fromTo(el.children, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.1, ease: 'expo.out', scrollTrigger: trigger })
        } else {
          gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', delay: Number(el.dataset.delay || 0), scrollTrigger: trigger })
        }
      })

      q('[data-split]').forEach((el) => {
        const mode = el.dataset.split
        if (mode === 'scrub') {
          SplitText.create(el, {
            type: 'words',
            autoSplit: true,
            onSplit: (self) =>
              gsap.fromTo(self.words, { opacity: 0.14 }, { opacity: 1, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 52%', scrub: true } }),
          })
        } else if (mode === 'chars') {
          SplitText.create(el, {
            type: 'chars',
            autoSplit: true,
            onSplit: (self) =>
              gsap.fromTo(self.chars, { opacity: 0, yPercent: 60, rotateX: -70 }, { opacity: 1, yPercent: 0, rotateX: 0, stagger: 0.035, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }),
          })
        } else {
          SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            linesClass: 'split-line',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, { yPercent: 115, duration: 1.25, stagger: 0.11, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }),
          })
        }
      })

      q('[data-arch]').forEach((el) => {
        const img = el.querySelector('img')
        const st = { trigger: el, start: 'top 90%', end: 'top 15%', scrub: true }
        gsap.fromTo(el, { clipPath: 'inset(0% 26% 0% 26% round 999px 999px 0px 0px)' }, { clipPath: 'inset(0% 0% 0% 0% round 32px 32px 32px 32px)', ease: 'none', scrollTrigger: st })
        if (img) gsap.fromTo(img, { scale: 1.35 }, { scale: 1, ease: 'none', scrollTrigger: st })
      })

      q('[data-parallax]').forEach((el) => {
        const amount = Number(el.dataset.parallax || 0.12)
        gsap.fromTo(el, { yPercent: -amount * 50 }, { yPercent: amount * 50, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } })
      })

      q('[data-parallax-img]').forEach((el) => {
        gsap.fromTo(el, { yPercent: -9, scale: 1.2 }, { yPercent: 9, scale: 1.2, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } })
      })

      q('[data-scroll-x]').forEach((el) => {
        const x = Number(el.dataset.scrollX || -25)
        gsap.fromTo(el, { xPercent: 0 }, { xPercent: x, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } })
      })

      q('[data-scale-in]').forEach((el) => {
        gsap.fromTo(el, { scale: 0.92, borderRadius: 48 }, { scale: 1, borderRadius: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 30%', scrub: true } })
      })
    }, scope)

    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      cancelAnimationFrame(id)
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
