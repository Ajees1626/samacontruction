/*
  Reusable scroll-animation blocks shared by the homepage and inner pages.
  All motion is driven by useReveal() on the page scope (data-* attributes).
*/

/* Huge outlined word that slides sideways as you scroll. */
export function OutlineWord({ text, className = '', dark = false, amount = -25 }) {
  const repeated = `${text} · ${text} · ${text}`
  return (
    <div aria-hidden="true" className={`pointer-events-none overflow-hidden ${className}`}>
      <p
        className={`whitespace-nowrap font-display text-[clamp(4rem,14vw,14rem)] font-extrabold uppercase leading-[0.9] tracking-tighter text-transparent ${dark ? '[-webkit-text-stroke:1.5px_rgba(255,255,255,0.16)]' : '[-webkit-text-stroke:1.5px_rgba(22,30,75,0.13)]'}`}
        data-scroll-x={amount}
      >
        {repeated}
      </p>
    </div>
  )
}

/* Large statement whose words brighten one by one with scroll. */
export function ScrubText({ eyebrow, children, className = '', dark = false }) {
  return (
    <div className={className}>
      {eyebrow && <p className={`eyebrow ${dark ? 'eyebrow-light' : ''}`} data-reveal>{eyebrow}</p>}
      <p className={`mt-7 max-w-5xl font-display text-[clamp(1.5rem,0.95rem+2.4vw,3.2rem)] font-bold leading-[1.16] tracking-tight ${dark ? 'text-white' : 'text-navy'}`} data-split="scrub">
        {children}
      </p>
    </div>
  )
}

/* Parallax photo band with two rows of big words moving in opposite directions. */
export function ImageBand({ image, rowA, rowB, label = 'Highlights' }) {
  const a = `${rowA} · ${rowA} · ${rowA}`
  const b = `${rowB} · ${rowB} · ${rowB}`
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 py-20 md:py-36" aria-label={label}>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img src={image(2200)} srcSet={`${image(900)} 900w, ${image(1600)} 1600w, ${image(2200)} 2200w`} sizes="100vw" alt="" loading="lazy" className="h-full w-full object-cover" data-parallax-img />
      </div>
      <div className="absolute inset-0 -z-10 bg-navy-900/70" />
      <div aria-hidden="true" className="space-y-2 md:space-y-4">
        <p className="whitespace-nowrap font-display text-[clamp(2.75rem,8.5vw,8rem)] font-extrabold uppercase leading-none tracking-tight text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.85)]" data-scroll-x="-30">{a}</p>
        <p className="-translate-x-1/2 whitespace-nowrap font-display text-[clamp(2.75rem,8.5vw,8rem)] font-extrabold uppercase leading-none tracking-tight text-amber" data-scroll-x="25">{b}</p>
      </div>
      <p className="sr-only">{rowA}. {rowB}.</p>
    </section>
  )
}
