import { useState } from 'react'
import { SITE } from '../config/site'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^[+()\-\s\d]{7,20}$/

/* Field rules: { required, email, phone, min } */
export function validate(values, rules) {
  const errors = {}
  Object.entries(rules).forEach(([name, r]) => {
    const v = (values[name] ?? '').toString().trim()
    if (r.required && !v) errors[name] = r.message || 'This field is required.'
    else if (v && r.email && !EMAIL.test(v)) errors[name] = 'Please enter a valid email address.'
    else if (v && r.phone && !PHONE.test(v)) errors[name] = 'Please enter a valid phone number.'
    else if (v && r.min && v.length < r.min) errors[name] = `Please enter at least ${r.min} characters.`
    else if (r.checked && !values[name]) errors[name] = r.message || 'Please confirm to continue.'
  })
  return errors
}

/*
  Submits an enquiry. With SITE.formEndpoint configured, POSTs JSON to it.
  Without an endpoint the site runs in demo mode: nothing is transmitted and the
  caller is told so, rather than pretending the message was delivered.
*/
export async function submitEnquiry(type, values) {
  if (!SITE.formEndpoint) {
    await new Promise((r) => setTimeout(r, 700))
    return { ok: true, demo: true }
  }
  const res = await fetch(SITE.formEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ type, ...values, submittedAt: new Date().toISOString() }),
  })
  if (!res.ok) throw new Error('Submission failed')
  return { ok: true, demo: false }
}

export function useForm(initial, rules, type) {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [demo, setDemo] = useState(false)

  const onChange = (e) => {
    const { name, value, type: t, checked } = e.target
    setValues((v) => ({ ...v, [name]: t === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (values.website) return // honeypot
    const errs = validate(values, rules)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) {
      e.currentTarget.querySelector(`[name="${first}"]`)?.focus()
      return
    }
    setStatus('sending')
    try {
      const r = await submitEnquiry(type, values)
      setDemo(r.demo)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setValues(initial)
    setStatus('idle')
  }

  return { values, errors, status, demo, onChange, onSubmit, reset }
}
