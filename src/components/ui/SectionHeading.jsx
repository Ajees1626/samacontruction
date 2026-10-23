export default function SectionHeading({ eyebrow, title, text, light = false, align = 'left', className = '', children }) {
  const center = align === 'center'
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <p className={`eyebrow ${light ? 'eyebrow-light' : ''} ${center ? 'justify-center' : ''}`} data-reveal>{eyebrow}</p>}
      <h2 className={`t-section mt-5 ${light ? 'text-white' : ''}`} data-split>{title}</h2>
      {text && <p className={`t-lead mt-5 ${light ? 'text-white/70' : 'text-graphite/75'}`} data-reveal data-delay="0.15">{text}</p>}
      {children}
    </div>
  )
}
