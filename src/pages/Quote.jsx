import { useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Loader2, Send } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import Field from '../components/ui/Field'
import FormSuccess from '../components/ui/FormStatus'
import Icon from '../components/ui/Icon'
import useReveal from '../hooks/useReveal'
import useSeo from '../hooks/useSeo'
import { useForm, validate } from '../lib/forms'
import { SERVICES } from '../data/services'
import { IMG } from '../data/images'

const STEPS = ['Project', 'Details', 'Contact']
const BUDGETS = ['Not sure yet', 'Under ₹50 lakh', '₹50 lakh – ₹2 crore', '₹2 crore – ₹10 crore', 'Above ₹10 crore']
const TIMELINES = ['As soon as possible', 'Within 3 months', '3 – 6 months', '6 – 12 months', 'Planning stage only']
const STAGES = ['Idea / feasibility', 'Design in progress', 'Approved drawings', 'Tender / BOQ ready']

const RULES = [
  { service: { required: true, message: 'Please choose a service.' } },
  { location: { required: true }, description: { required: true, min: 20 } },
  { name: { required: true }, email: { required: true, email: true }, phone: { required: true, phone: true }, consent: { checked: true, message: 'Please accept the privacy policy.' } },
]

export default function Quote() {
  useSeo({ title: 'Request a Quote', description: 'Request a construction quote from SAMA Construction & Developments. Share your project type, location, budget and timeline.' })
  const ref = useRef(null)
  useReveal(ref)
  const [params] = useSearchParams()
  const preset = SERVICES.some((s) => s.slug === params.get('service')) ? params.get('service') : ''
  const allRules = Object.assign({}, ...RULES)
  const form = useForm(
    { service: preset, location: '', area: '', stage: STAGES[0], budget: BUDGETS[0], timeline: TIMELINES[1], description: '', name: '', company: '', email: '', phone: '', consent: false, website: '' },
    allRules,
    'quote',
  )
  const [step, setStep] = useState(0)
  const [stepErrors, setStepErrors] = useState({})
  const errors = { ...stepErrors, ...form.errors }

  const next = () => {
    const errs = validate(form.values, RULES[step])
    setStepErrors(errs)
    if (Object.keys(errs).length) {
      document.querySelector(`[name="${Object.keys(errs)[0]}"]`)?.focus()
      return
    }
    setStep((s) => s + 1)
  }
  const onChange = (e) => {
    setStepErrors((er) => ({ ...er, [e.target.name]: undefined }))
    form.onChange(e)
  }

  return (
    <div ref={ref}>
      <PageHero eyebrow="Request a quote" title="Tell us what you’re planning to build." text="Three short steps. Our team reviews every enquiry and responds with next steps." image={IMG.timberFrame} crumbs={[{ label: 'Request a Quote' }]} lip="cloud" />
      <section className="bg-cloud">
        <div className="container-x section-y grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <ol className="space-y-3" aria-label="Form progress">
              {STEPS.map((s, i) => (
                <li key={s} className={`flex items-center gap-4 rounded-2xl p-4 transition ${i === step ? 'bg-white shadow-sm' : ''}`} aria-current={i === step ? 'step' : undefined}>
                  <span className={`grid h-10 w-10 place-items-center rounded-full font-display text-sm font-bold ${i < step ? 'bg-teal text-white' : i === step ? 'bg-amber text-navy' : 'bg-navy/8 text-navy/50'}`}>
                    {i < step ? <Check className="h-4 w-4" aria-hidden="true" /> : i + 1}
                  </span>
                  <span className={`font-display font-bold ${i <= step ? 'text-navy' : 'text-navy/40'}`}>{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm text-graphite/70">Fields marked <span className="text-amber-600">*</span> are required. Budget ranges are indicative and help us route your enquiry.</p>
          </aside>

          <div className="lg:col-span-8">
            {form.status === 'sent' ? (
              <FormSuccess demo={form.demo} title="Quote request received" onReset={() => (form.reset(), setStep(0))} />
            ) : (
              <form noValidate onSubmit={step === 2 ? form.onSubmit : (e) => (e.preventDefault(), next())} className="rounded-3xl bg-white p-6 shadow-[0_30px_80px_-50px_rgba(22,30,75,0.4)] md:p-10">
                {step === 0 && (
                  <fieldset>
                    <legend className="font-display text-2xl font-bold text-navy">What type of project is it?</legend>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-invalid={errors.service ? 'true' : 'false'}>
                      {SERVICES.map((s) => {
                        const active = form.values.service === s.slug
                        return (
                          <label key={s.slug} className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition ${active ? 'border-navy bg-navy text-white' : 'border-navy/12 hover:border-navy/40'}`}>
                            <input type="radio" name="service" value={s.slug} checked={active} onChange={onChange} className="sr-only" />
                            <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${active ? 'bg-amber text-navy' : 'bg-cloud text-navy'}`}><Icon name={s.icon} className="h-5 w-5" /></span>
                            <span className="font-display font-bold">{s.title}</span>
                          </label>
                        )
                      })}
                    </div>
                    {errors.service && <p role="alert" className="mt-3 text-sm font-medium text-red-600">{errors.service}</p>}
                  </fieldset>
                )}

                {step === 1 && (
                  <fieldset>
                    <legend className="font-display text-2xl font-bold text-navy">Project details</legend>
                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                      <Field label="Site location (city / area)" name="location" required value={form.values.location} onChange={onChange} error={errors.location} />
                      <Field label="Approx. built-up area" name="area" placeholder="e.g. 3,500 sq ft" value={form.values.area} onChange={onChange} />
                      <Field as="select" label="Design stage" name="stage" value={form.values.stage} onChange={onChange}>{STAGES.map((o) => <option key={o}>{o}</option>)}</Field>
                      <Field as="select" label="Indicative budget" name="budget" value={form.values.budget} onChange={onChange}>{BUDGETS.map((o) => <option key={o}>{o}</option>)}</Field>
                      <Field as="select" label="Preferred start" name="timeline" value={form.values.timeline} onChange={onChange} className="sm:col-span-2">{TIMELINES.map((o) => <option key={o}>{o}</option>)}</Field>
                      <Field as="textarea" label="Describe your project" name="description" required className="sm:col-span-2" placeholder="Building type, floors, special requirements…" value={form.values.description} onChange={onChange} error={errors.description} />
                    </div>
                  </fieldset>
                )}

                {step === 2 && (
                  <fieldset>
                    <legend className="font-display text-2xl font-bold text-navy">Your contact details</legend>
                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                      <Field label="Full name" name="name" required autoComplete="name" value={form.values.name} onChange={onChange} error={errors.name} />
                      <Field label="Company (optional)" name="company" autoComplete="organization" value={form.values.company} onChange={onChange} />
                      <Field label="Email" name="email" type="email" required autoComplete="email" value={form.values.email} onChange={onChange} error={errors.email} />
                      <Field label="Phone" name="phone" type="tel" required autoComplete="tel" value={form.values.phone} onChange={onChange} error={errors.phone} />
                    </div>
                    <input type="text" name="website" value={form.values.website} onChange={onChange} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                    <label className="mt-6 flex items-start gap-3 text-sm text-graphite/80">
                      <input type="checkbox" name="consent" checked={form.values.consent} onChange={onChange} className="mt-0.5 h-5 w-5 accent-navy" />
                      <span>I agree to SAMA Construction & Developments processing these details to prepare a response, as described in the <Link to="/privacy-policy" className="font-semibold text-navy underline">privacy policy</Link>.</span>
                    </label>
                    {errors.consent && <p role="alert" className="mt-2 text-sm font-medium text-red-600">{errors.consent}</p>}
                    {form.status === 'error' && <p role="alert" className="mt-4 text-sm font-medium text-red-600">Something went wrong. Please try again.</p>}
                  </fieldset>
                )}

                <div className="mt-10 flex flex-col-reverse gap-3 border-t border-navy/8 pt-8 sm:flex-row sm:justify-between">
                  {step > 0 ? (
                    <button type="button" onClick={() => setStep((s) => s - 1)} className="btn btn-ghost">
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
                    </button>
                  ) : <span />}
                  {step < 2 ? (
                    <button type="submit" className="btn btn-navy">Continue <ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
                  ) : (
                    <button type="submit" disabled={form.status === 'sending'} className="btn btn-primary disabled:opacity-60">
                      {form.status === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
                      {form.status === 'sending' ? 'Sending…' : 'Submit request'}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
