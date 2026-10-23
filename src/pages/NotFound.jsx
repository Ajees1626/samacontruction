import { useRef } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import { ArrowLeft } from 'lucide-react'
import useSeo from '../hooks/useSeo'
import LinkButton from '../components/ui/LinkButton'

export default function NotFound() {
  useSeo({ title: 'Page not found', description: 'The page you are looking for could not be found.' })
  const ref = useRef(null)
  useReveal(ref)
  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="pointer-events-none absolute -bottom-10 right-0 -z-10 select-none font-display text-[clamp(10rem,35vw,30rem)] font-extrabold leading-none tracking-tighter text-white/[0.04]" aria-hidden="true">404</div>
      <div className="container-x pt-28">
        <p className="eyebrow eyebrow-light">Error 404</p>
        <h1 className="t-page mt-6 max-w-3xl text-white" data-split>This page is still <span className="text-amber">under construction.</span></h1>
        <p className="t-lead mt-6 max-w-xl text-white/70">The page you’re looking for doesn’t exist or has moved. Let’s get you back on solid ground.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <LinkButton to="/">Back to home</LinkButton>
          <LinkButton to="/projects" variant="ghost-light">View projects</LinkButton>
        </div>
        <Link to="/contact" className="mt-10 inline-flex items-center gap-2 text-sm text-white/60 hover:text-amber"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Report a broken link</Link>
      </div>
    </section>
  )
}
