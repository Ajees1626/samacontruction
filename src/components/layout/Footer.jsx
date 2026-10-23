import { Link } from 'react-router-dom'
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import Logo from '../ui/Logo'
import SocialIcons from '../ui/SocialIcons'
import PlaceholderTag from '../ui/PlaceholderTag'
import { SITE } from '../../config/site'
import { SERVICES } from '../../data/services'
import { useLenis } from '../../lib/SmoothScroll'

const COMPANY = [
  { label: 'About Us', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Capabilities', to: '/capabilities' },
  { label: 'Industries', to: '/industries' },
  { label: 'Quality & Safety', to: '/quality-safety-sustainability' },
  { label: 'News & Insights', to: '/news' },
  { label: 'Careers', to: '/careers' },
  { label: 'Sama Institutes', href: 'https://samainstitutes.com/' },
  { label: 'Contact', to: '/contact' },
]

export default function Footer() {
  const lenis = useLenis()
  const year = new Date().getFullYear()
  const { phone, phoneAlt, email, address } = SITE.contact
  const toTop = () => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: 'smooth' }))

  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white/70">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="container-x relative pt-20 md:pt-24">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed">
              {SITE.name} plans, engineers and builds residential, commercial, industrial and infrastructure projects — with one accountable team from first conversation to final handover.
            </p>
            <SocialIcons className="mt-8" />
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">Company</h3>
              <ul className="mt-5 space-y-3 text-[0.95rem]">
                {COMPANY.map((l) => (
                  <li key={l.label}>
                    {l.href ? (
                      <a href={l.href} target="_blank" rel="noopener" className="inline-flex items-center gap-1 transition hover:text-amber">{l.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
                    ) : (
                      <Link to={l.to} className="transition hover:text-amber">{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">Services</h3>
              <ul className="mt-5 space-y-3 text-[0.95rem]">
                {SERVICES.map((s) => (
                  <li key={s.slug}><Link to={`/services/${s.slug}`} className="transition hover:text-amber">{s.title}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">Contact</h3>
              <ul className="mt-5 space-y-4 text-[0.95rem]">
                <li className="flex gap-3"><Phone className="mt-1 h-4 w-4 shrink-0 text-amber" aria-hidden="true" />{phone ? (
                    <span className="flex flex-col">
                      {[phone, phoneAlt].filter(Boolean).map((p) => (
                        <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-amber">{p}</a>
                      ))}
                    </span>
                  ) : <PlaceholderTag>Phone TBC</PlaceholderTag>}</li>
                <li className="flex gap-3"><Mail className="mt-1 h-4 w-4 shrink-0 text-amber" aria-hidden="true" />{email ? <a href={`mailto:${email}`} className="hover:text-amber">{email}</a> : <PlaceholderTag>Email TBC</PlaceholderTag>}</li>
                <li className="flex gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0 text-amber" aria-hidden="true" />{address ? <span>{address}</span> : <PlaceholderTag>Address TBC</PlaceholderTag>}</li>
              </ul>
              <Link to="/request-a-quote" className="btn btn-primary mt-8 !px-5 !py-3 text-sm">
                Request a Quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative select-none overflow-hidden py-6" aria-hidden="true">
          <p className="whitespace-nowrap font-display text-[clamp(2.75rem,8.4vw,9.5rem)] font-extrabold leading-none tracking-[-0.04em] text-white/[0.04]">SAMA CONSTRUCTION</p>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-7 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-amber">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-amber">Contact</Link>
            <button type="button" onClick={toTop} className="inline-flex items-center gap-2 font-semibold text-white hover:text-amber">
              Back to top <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
