import { CircleCheck } from 'lucide-react'

export default function FormSuccess({ demo, title, onReset }) {
  return (
    <div role="status" className="rounded-3xl bg-navy p-8 text-white md:p-12">
      <CircleCheck className="h-12 w-12 text-amber" aria-hidden="true" />
      <h2 className="mt-6 font-display text-3xl font-bold text-white">{title}</h2>
      {demo ? (
        <p className="mt-4 max-w-lg text-white/75">
          Your details passed validation. <strong className="text-amber">Demo mode:</strong> this form is not yet connected to a mail service or CRM, so nothing was sent. Set <code className="rounded bg-white/10 px-1.5">SITE.formEndpoint</code> in <code className="rounded bg-white/10 px-1.5">src/config/site.js</code> to go live.
        </p>
      ) : (
        <p className="mt-4 max-w-lg text-white/75">Thank you — our team will review your message and get back to you.</p>
      )}
      <button type="button" onClick={onReset} className="btn btn-ghost-light mt-8">Send another</button>
    </div>
  )
}
