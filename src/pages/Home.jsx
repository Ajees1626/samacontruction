import { useRef } from 'react'
import CinematicHero from '../components/cinematic/CinematicHero'
import HeroSlider from '../components/home/HeroSlider'
import Intro from '../components/home/Intro'
import Statement from '../components/home/Statement'
import Stats from '../components/home/Stats'
import ServicesGrid from '../components/home/ServicesGrid'
import OutlineMarquee from '../components/home/OutlineMarquee'
import FeaturedProjects from '../components/home/FeaturedProjects'
import WhySama from '../components/home/WhySama'
import Process from '../components/home/Process'
import QualitySafety from '../components/home/QualitySafety'
import AboutTeaser from '../components/home/AboutTeaser'
import Clients from '../components/home/Clients'
import CTASection from '../components/ui/CTASection'
import SectionHeading from '../components/ui/SectionHeading'
import LinkButton from '../components/ui/LinkButton'
import useReveal from '../hooks/useReveal'
import useSeo from '../hooks/useSeo'
import { HOME_HERO } from '../config/cinematic'

export default function Home() {
  useSeo({})
  const ref = useRef(null)
  useReveal(ref)
  const slider = HOME_HERO !== 'cinematic'

  return (
    <>
      {slider ? <HeroSlider /> : <CinematicHero />}
      {/* Page content slides up over the hero with rounded corners. */}
      <div id="after-hero" ref={ref} className={slider ? 'relative z-10 -mt-8 overflow-clip rounded-t-[32px] bg-paper md:-mt-12 md:rounded-t-[48px]' : ''}>
        <Intro />
        <Statement />
        <Stats />
        <section className="bg-cloud">
          <div className="container-x section-y">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <SectionHeading eyebrow="What we do" title="Construction services across every scale." text="From a single residence to industrial facilities and public infrastructure — delivered by specialist teams under one accountable contract." />
              <div data-reveal><LinkButton to="/services" variant="ghost">All services</LinkButton></div>
            </div>
            <div className="mt-14"><ServicesGrid /></div>
          </div>
        </section>
        <OutlineMarquee />
        <FeaturedProjects />
        <WhySama />
        <Process />
        <QualitySafety />
        <AboutTeaser />
        <Clients />
        <CTASection />
      </div>
    </>
  )
}
