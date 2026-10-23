/* Accessible labelled form field with inline error message. */
export default function Field({ label, name, error, required, as = 'input', children, className = '', hint, ...props }) {
  const id = `f-${name}`
  const Cmp = as
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-navy">
        {label} {required && <span className="text-amber-600" aria-hidden="true">*</span>}
      </label>
      <Cmp
        id={id}
        name={name}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
        aria-required={required || undefined}
        className={`field ${as === 'textarea' ? 'min-h-36 resize-y' : ''} ${as === 'select' ? 'appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23161e4b%27 stroke-width=%272%27%3E%3Cpath d=%27m6 9 6 6 6-6%27/%3E%3C/svg%3E")] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-12' : ''}`}
        {...props}
      >
        {children}
      </Cmp>
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-xs text-stone">{hint}</p>}
      {error && <p id={`${id}-err`} role="alert" className="mt-1.5 text-sm font-medium text-red-600">{error}</p>}
    </div>
  )
}
