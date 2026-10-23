import { useRef } from 'react'
import LinkButton from './LinkButton'
import useReveal from '../../hooks/useReveal'
import { IMG } from '../../data/images'

/* Shared closing call-to-action used on the homepage and inner pages. */
export default function CTASection({ title = 'Planning your next project?', text, image = IMG.craneSunset }) {
  const ref = useRef(null)
  useReveal(ref)
  return (
    <section ref={ref} className="bg-paper px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-navy md:rounded-[40px]">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img data-parallax="0.18" src={image(2000)} srcSet={`${image(900)} 900w, ${image(1600)} 1600w, ${image(2200)} 2200w`} sizes="100vw" alt="" loading="lazy" className="h-[120%] w-full object-cover" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-900/95 via-navy/80 to-navy/30" />
        <div className="container-x grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8" data-reveal>
            <p className="eyebrow eyebrow-light">Start a conversation</p>
            <h2 className="t-page mt-6 text-white">{title}</h2>
            <p className="t-lead mt-6 max-w-xl text-white/75">
              {text || 'Tell us about your site, scope and timeline. Our team will review your brief and respond with next steps and an initial approach.'}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch" data-reveal data-delay="0.15">
            <LinkButton to="/request-a-quote" className="w-full sm:w-auto lg:w-full">Request a Quote</LinkButton>
            <LinkButton to="/contact" variant="ghost-light" className="w-full sm:w-auto lg:w-full">Contact our team</LinkButton>
          </div>
        </div>
      </div>
    </section>
  )
}
