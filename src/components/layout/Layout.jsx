import { useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { FollowCursor, GridLines, ScrollTopProgress } from './ScrollExtras'
import { useLenis } from '../../lib/SmoothScroll'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap'

export default function Layout() {
  const { pathname } = useLocation()
  const lenis = useLenis()
  const mainRef = useRef(null)

  // Reset scroll and play a short page-enter transition on each route change.
  useLayoutEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)

    let tween
    if (!prefersReducedMotion() && mainRef.current) {
      tween = gsap.fromTo(mainRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out', clearProps: 'opacity' })
    }
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      cancelAnimationFrame(id)
      tween?.kill()
    }
  }, [pathname, lenis])

  return (
    <>
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <GridLines />
      <ScrollTopProgress />
      <FollowCursor />
    </>
  )
}
