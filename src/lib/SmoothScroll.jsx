import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

const LenisContext = createContext(null)
export const useLenis = () => useContext(LenisContext)

/*
  Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger and Lenis share one clock.
  Disabled for users who prefer reduced motion (native scrolling is used instead).
*/
export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null)
  const rafRef = useRef(null)

  useEffect(() => {
    document.documentElement.classList.add('js-motion')
    if (prefersReducedMotion()) return

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    })
    instance.on('scroll', ScrollTrigger.update)
    rafRef.current = (time) => instance.raf(time * 1000)
    gsap.ticker.add(rafRef.current)
    gsap.ticker.lagSmoothing(0)
    setLenis(instance)

    return () => {
      gsap.ticker.remove(rafRef.current)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
