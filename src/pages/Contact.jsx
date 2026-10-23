import { useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Clock, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import PlaceholderTag from '../components/ui/PlaceholderTag'
import Field from '../components/ui/Field'
import FormSuccess from '../components/ui/FormStatus'
import LinkButton from '../components/ui/LinkButton'
import { OutlineWord } from '../components/ui/Motion'
import useReveal from '../hooks/useReveal'
import useSeo from '../hooks/useSeo'
import { useForm } from '../lib/forms'
import { IMG } from '../data/images'
import { SITE } from '../config/site'

const TOPICS = ['General enquiry', 'New project', 'Careers', 'Suppliers & subcontractors', 'Media']

export default function Contact() {
  useSeo({ title: 'Contact Us', description: 'Contact SAMA Construction & Developments about a new project, partnership or career opportunity.' })
  const ref = useRef(null)
  useReveal(ref)
  const [params] = useSearchParams()
  const topic = params.get('topic') === 'careers' ? 'Careers' : 'General enquiry'
  const form = useForm(
    { name: '', email: '', phone: '', topic, message: '', consent: false, website: '' },
    { name: { required: true }, email: { required: true, email: true }, phone: { phone: true }, message: { required: true, min: 10 }, consent: { checked: true, message: 'Please accept the privacy policy.' } },
    'contact',
  )
  const { phone, phoneAlt, email, address, hours } = SITE.contact
  const details = [
    { icon: Phone, label: 'Phone', value: phone, href: phone && `tel:${phone.replace(/\s/g, '')}` },
    ...(phoneAlt ? [{ icon: Phone, label: 'Phone (alternate)', value: phoneAlt, href: `tel:${phoneAlt.replace(/\s/g, '')}` }] : []),
    { icon: Mail, label: 'Email', value: email, href: email && `mailto:${email}` },
    { icon: MapPin, label: 'Office', value: address },
    { icon: Clock, label: 'Hours', value: hours },
  ]

  return (
    <div ref={ref}>
      <PageHero eyebrow="Contact" title="Let’s talk about your project." text="Questions, partnerships or a new build — reach the right team here." image={IMG.towersUp} crumbs={[{ label: 'Contact Us' }]} />
      <OutlineWord text="Let’s build" className="bg-paper pt-4" />
      <section className="bg-paper">
        <div className="container-x section-y grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <p className="eyebrow" data-reveal>Get in touch</p>
            <ul className="mt-8 space-y-6" data-reveal="stagger">
              {details.map(({ icon: I, label, value, href }) => (
                <li key={label} className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy text-amber"><I className="h-5 w-5" aria-hidden="true" /></span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone">{label}</p>
                    {value ? (href ? <a href={href} className="font-display text-lg font-bold text-navy hover:text-teal">{value}</a> : <p className="font-display text-lg font-bold text-navy">{value}</p>) : <PlaceholderTag className="mt-1">To be confirmed</PlaceholderTag>}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-3xl bg-amber p-7" data-reveal>
              <p className="font-display text-xl font-bold text-navy">Have drawings or a BOQ?</p>
              <p className="mt-2 text-navy/80">Use our quote form to share project details and timelines.</p>
              <LinkButton to="/request-a-quote" variant="navy" className="mt-6">Request a Quote</LinkButton>
            </div>
          </aside>

          <div className="lg:col-span-8" data-reveal>
            {form.status === 'sent' ? (
              <FormSuccess demo={form.demo} title="Message received" onReset={form.reset} />
            ) : (
              <form noValidate onSubmit={form.onSubmit} className="rounded-3xl border border-navy/8 bg-cloud p-6 md:p-10">
                <h2 className="font-display text-2xl font-bold md:text-3xl" data-split>Send us a message</h2>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" name="name" required autoComplete="name" value={form.values.name} onChange={form.onChange} error={form.errors.name} />
                  <Field label="Email" name="email" type="email" required autoComplete="email" value={form.values.email} onChange={form.onChange} error={form.errors.email} />
                  <Field label="Phone" name="phone" type="tel" autoComplete="tel" value={form.values.phone} onChange={form.onChange} error={form.errors.phone} />
                  <Field as="select" label="Topic" name="topic" value={form.values.topic} onChange={form.onChange}>
                    {TOPICS.map((t) => <option key={t}>{t}</option>)}
                  </Field>
                  <Field as="textarea" label="Message" name="message" required className="sm:col-span-2" value={form.values.message} onChange={form.onChange} error={form.errors.message} />
                </div>
                <input type="text" name="website" value={form.values.website} onChange={form.onChange} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <label className="mt-6 flex items-start gap-3 text-sm text-graphite/80">
                  <input type="checkbox" name="consent" checked={form.values.consent} onChange={form.onChange} className="mt-0.5 h-5 w-5 rounded accent-navy" aria-invalid={form.errors.consent ? 'true' : 'false'} />
                  <span>I agree to SAMA Construction & Developments processing my details to respond to this enquiry, as described in the <Link to="/privacy-policy" className="font-semibold text-navy underline">privacy policy</Link>.</span>
                </label>
                {form.errors.consent && <p role="alert" className="mt-2 text-sm font-medium text-red-600">{form.errors.consent}</p>}
                {form.status === 'error' && <p role="alert" className="mt-4 text-sm font-medium text-red-600">Something went wrong. Please try again.</p>}
                <button type="submit" disabled={form.status === 'sending'} className="btn btn-navy mt-8 w-full sm:w-auto disabled:opacity-60">
                  {form.status === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
                  {form.status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="bg-paper pb-4 px-3 sm:px-4">
        <div className="relative grid h-[360px] place-items-center overflow-hidden rounded-[28px] bg-concrete md:h-[440px]" data-reveal>
          {SITE.contact.mapEmbedUrl ? (
            <iframe title="Office location map" src={SITE.contact.mapEmbedUrl} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          ) : (
            <div className="grid-lines absolute inset-0 grid place-items-center">
              <div className="text-center">
                <MapPin className="mx-auto h-10 w-10 text-navy/40" aria-hidden="true" />
                <p className="mt-3 font-display font-bold text-navy/50">Office map will appear here</p>
                <PlaceholderTag className="mt-3">Add map embed URL</PlaceholderTag>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
