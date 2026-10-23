import { Quote } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import PlaceholderTag from '../ui/PlaceholderTag'

/*
  Clients & testimonials.
  Only verified client logos (with permission) and genuine testimonials should be added.
  Until then, neutral placeholder slots are shown — no fabricated quotes.
*/
export const CLIENT_LOGOS = [] // e.g. { name: 'Client name', src: '/clients/client.svg' }
export const TESTIMONIALS = [] // e.g. { quote: '…', name: 'Name', role: 'Role, Organisation' }

export default function Clients() {
  return (
    <section className="bg-paper">
      <div className="container-x section-y">
        <SectionHeading align="center" eyebrow="Clients & partners" title="Trusted by owners, developers and institutions." className="mx-auto">
          <div className="mt-6 flex justify-center"><PlaceholderTag>Awaiting verified clients & testimonials</PlaceholderTag></div>
        </SectionHeading>

        <ul className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-navy/8 bg-navy/8 sm:grid-cols-3 lg:grid-cols-6" data-reveal="stagger">
          {(CLIENT_LOGOS.length ? CLIENT_LOGOS : Array.from({ length: 6 })).map((c, i) => (
            <li key={i} className="grid h-28 place-items-center bg-white px-6 md:h-36">
              {c ? (
                <img src={c.src} alt={c.name} className="max-h-12 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" loading="lazy" />
              ) : (
                <span className="flex items-center gap-2.5 text-navy/35 transition hover:text-navy/70" title="Sample logo slot — replace with a verified client logo">
                  <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
                    {[
                      <path key="a" d="M4 28 16 4l12 24z" fill="none" stroke="currentColor" strokeWidth="2.5" />,
                      <rect key="b" x="5" y="5" width="22" height="22" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5" />,
                      <circle key="c" cx="16" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="2.5" />,
                    ][i % 3]}
                    <rect x="13" y="13" width="6" height="6" fill="#fcb415" />
                  </svg>
                  <span className="whitespace-nowrap font-display text-xs font-extrabold uppercase tracking-[0.14em] md:text-sm">Client {String(i + 1).padStart(2, '0')}</span>
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-12 max-w-4xl" data-reveal>
          {TESTIMONIALS.length ? (
            TESTIMONIALS.map((t) => (
              <figure key={t.name} className="rounded-3xl bg-cloud p-8 md:p-12">
                <Quote className="h-10 w-10 text-amber" aria-hidden="true" />
                <blockquote className="mt-6 font-display text-2xl font-semibold leading-snug text-navy">“{t.quote}”</blockquote>
                <figcaption className="mt-6 text-sm text-stone"><strong className="text-navy">{t.name}</strong> — {t.role}</figcaption>
              </figure>
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-navy/15 bg-cloud p-8 text-center md:p-12">
              <Quote className="mx-auto h-10 w-10 text-amber" aria-hidden="true" />
              <p className="mx-auto mt-5 max-w-xl font-display text-xl font-semibold text-navy/60">Client testimonials will be published here with each client’s permission.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
