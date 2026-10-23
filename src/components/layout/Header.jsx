import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react'
import Logo from '../ui/Logo'
import Icon from '../ui/Icon'
import { NAV, SITE } from '../../config/site'
import { SERVICES } from '../../data/services'
import { IMG } from '../../data/images'
import { useLenis } from '../../lib/SmoothScroll'

/* Internal route via router, or external site (e.g. Sama Institutes) in a new tab. */
function AnyLink({ to, href, children, ...props }) {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener" {...props}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    )
  }
  return <Link to={to} {...props}>{children}</Link>
}

export default function Header() {
  const { pathname } = useLocation()
  const lenis = useLenis()
  const [solid, setSolid] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openKey, setOpenKey] = useState(null)
  const [mobileSection, setMobileSection] = useState(null)
  const closeTimer = useRef(null)
  const navRef = useRef(null)

  // Transparent over hero imagery, solid once the page content is reached.
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const marker = document.getElementById('after-hero')
      setSolid(marker ? marker.getBoundingClientRect().top <= 88 : window.scrollY > 40)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [pathname])

  // Close menus on navigation.
  useEffect(() => {
    setMobileOpen(false)
    setOpenKey(null)
  }, [pathname])

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    if (mobileOpen) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
    const onKey = (e) => e.key === 'Escape' && (setMobileOpen(false), setOpenKey(null))
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen, lenis])

  const openMenu = (key) => {
    clearTimeout(closeTimer.current)
    setOpenKey(key)
  }
  const scheduleClose = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenKey(null), 140)
  }

  const light = !solid && !mobileOpen
  const linkBase = 'relative flex items-center gap-1 rounded-full px-3.5 py-2 font-display text-[0.9rem] font-semibold transition-colors'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,padding] duration-500 ${
        solid || mobileOpen ? 'bg-white/95 py-3 shadow-[0_1px_0_rgba(22,30,75,0.08),0_12px_40px_-20px_rgba(22,30,75,0.25)] backdrop-blur-md' : 'py-5'
      }`}
    >
      {!solid && !mobileOpen && <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-black/45 to-transparent" />}
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-amber focus:px-4 focus:py-2 focus:font-bold focus:text-navy">
        Skip to content
      </a>
      <div className="container-x flex items-center justify-between gap-6">
        <Link to="/" aria-label={`${SITE.name} home`} className="shrink-0">
          <Logo light={light} />
        </Link>

        <nav ref={navRef} aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {NAV.map((item) => {
              const hasMenu = item.children || item.mega
              const isOpen = openKey === item.label
              return (
                <li key={item.label} className="relative" onMouseEnter={() => hasMenu && openMenu(item.label)} onMouseLeave={() => hasMenu && scheduleClose()}>
                  {hasMenu ? (
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={() => setOpenKey(isOpen ? null : item.label)}
                      className={`${linkBase} ${light ? 'text-white hover:bg-white/10' : 'text-navy hover:bg-navy/5'} ${pathname.startsWith(item.to) ? 'after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-0.5 after:bg-amber' : ''}`}
                    >
                      {item.label}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                  ) : (
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `${linkBase} ${light ? 'text-white hover:bg-white/10' : 'text-navy hover:bg-navy/5'} ${isActive ? 'after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-0.5 after:bg-amber' : ''}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  )}

                  {item.children && (
                    <div className={`absolute left-1/2 top-full w-80 -translate-x-1/2 pt-4 transition-all duration-300 ${isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'}`}>
                      <ul className="rounded-2xl border border-navy/5 bg-white p-2.5 shadow-[0_30px_80px_-30px_rgba(22,30,75,0.45)]">
                        {item.children.map((c) => (
                          <li key={c.to || c.href}>
                            <AnyLink to={c.to} href={c.href} className="group block rounded-xl px-4 py-3 transition hover:bg-cloud" onFocus={() => openMenu(item.label)} onBlur={scheduleClose}>
                              <span className="flex items-center justify-between font-display text-[0.95rem] font-bold text-navy group-hover:text-teal">
                                {c.label}
                                <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                              </span>
                              <span className="mt-0.5 block text-[0.8125rem] text-stone">{c.desc}</span>
                            </AnyLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.mega && (
                    <div className={`fixed inset-x-0 top-[72px] pt-3 transition-all duration-300 ${isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'}`}>
                      <div className="container-x">
                        <div className="grid grid-cols-[1fr_320px] gap-3 rounded-3xl border border-navy/5 bg-white p-3 shadow-[0_40px_100px_-40px_rgba(22,30,75,0.5)]">
                          <ul className="grid grid-cols-3 gap-1.5 p-2">
                            {SERVICES.map((s) => (
                              <li key={s.slug}>
                                <Link to={`/services/${s.slug}`} className="group flex h-full gap-4 rounded-2xl p-4 transition hover:bg-cloud" onFocus={() => openMenu(item.label)} onBlur={scheduleClose}>
                                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-amber transition group-hover:bg-amber group-hover:text-navy">
                                    <Icon name={s.icon} className="h-5 w-5" />
                                  </span>
                                  <span>
                                    <span className="block font-display text-[0.95rem] font-bold text-navy group-hover:text-teal">{s.title}</span>
                                    <span className="mt-1 line-clamp-2 block text-[0.8125rem] leading-snug text-stone">{s.short}</span>
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link to="/services" className="group relative overflow-hidden rounded-2xl" onFocus={() => openMenu(item.label)} onBlur={scheduleClose}>
                            <img src={IMG.cranesTower(700)} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-105" loading="lazy" />
                            <span className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                            <span className="relative flex h-full min-h-60 flex-col justify-end p-6 text-white">
                              <span className="eyebrow eyebrow-light text-[0.65rem]">All services</span>
                              <span className="mt-3 font-display text-xl font-bold leading-tight">End-to-end construction under one roof</span>
                              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-amber">Explore services <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/request-a-quote" className="btn btn-primary hidden !px-5 !py-3 text-sm sm:inline-flex">
            Request a Quote
          </Link>
          <button
            type="button"
            className={`grid h-12 w-12 place-items-center rounded-full border transition xl:hidden ${light ? 'border-white/30 text-white' : 'border-navy/15 text-navy'}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-[76px] z-40 overflow-y-auto bg-white transition-[opacity,transform,visibility] duration-500 xl:hidden ${
          mobileOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'
        }`}
        data-lenis-prevent
        aria-hidden={!mobileOpen}
      >
        <nav aria-label="Mobile" className="container-x flex min-h-full flex-col pb-10 pt-4">
          <ul className="divide-y divide-navy/8 border-y border-navy/8">
            {NAV.map((item) => {
              const sub = item.children || (item.mega ? SERVICES.map((s) => ({ label: s.title, to: `/services/${s.slug}` })) : null)
              const expanded = mobileSection === item.label
              return (
                <li key={item.label}>
                  {sub ? (
                    <>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between py-4 text-left font-display text-[1.375rem] font-bold text-navy"
                        aria-expanded={expanded}
                        onClick={() => setMobileSection(expanded ? null : item.label)}
                        tabIndex={mobileOpen ? 0 : -1}
                      >
                        {item.label}
                        <ChevronDown className={`h-5 w-5 transition-transform ${expanded ? 'rotate-180 text-teal' : ''}`} aria-hidden="true" />
                      </button>
                      <div className={`grid transition-[grid-template-rows] duration-500 ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                        <ul className="overflow-hidden">
                          <li>
                            <Link to={item.to} tabIndex={mobileOpen && expanded ? 0 : -1} className="block py-2.5 pl-4 font-semibold text-teal">
                              {item.mega ? 'All services' : 'Overview'}
                            </Link>
                          </li>
                          {sub.map((c) => (
                            <li key={(c.to || c.href) + c.label}>
                              <AnyLink to={c.to} href={c.href} tabIndex={mobileOpen && expanded ? 0 : -1} className="block py-2.5 pl-4 text-graphite hover:text-navy">
                                {c.label}
                                {c.href && <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" />}
                              </AnyLink>
                            </li>
                          ))}
                          <li className="h-3" />
                        </ul>
                      </div>
                    </>
                  ) : (
                    <NavLink to={item.to} tabIndex={mobileOpen ? 0 : -1} className={({ isActive }) => `block py-4 font-display text-[1.375rem] font-bold ${isActive ? 'text-teal' : 'text-navy'}`}>
                      {item.label}
                    </NavLink>
                  )}
                </li>
              )
            })}
          </ul>
          <Link to="/request-a-quote" tabIndex={mobileOpen ? 0 : -1} className="btn btn-primary mt-8 w-full">
            Request a Quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link to="/contact" tabIndex={mobileOpen ? 0 : -1} className="btn btn-ghost mt-3 w-full">
            Contact us
          </Link>
          <div className="mt-auto pt-10 text-sm text-stone">
            {SITE.contact.phone || SITE.contact.email ? (
              <div className="space-y-1">
                {[SITE.contact.phone, SITE.contact.phoneAlt].filter(Boolean).map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, '')}`} tabIndex={mobileOpen ? 0 : -1} className="block font-semibold text-navy">{p}</a>
                ))}
                {SITE.contact.email && <a href={`mailto:${SITE.contact.email}`} tabIndex={mobileOpen ? 0 : -1} className="block">{SITE.contact.email}</a>}
              </div>
            ) : (
              <p>Contact details will appear here once confirmed.</p>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
