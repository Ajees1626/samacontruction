/*
  Typographic placeholder logo. Replace with the official SAMA Construction & Developments logo
  (SVG preferred) — see docs/ASSET_REQUIREMENTS.md.
*/
export default function Logo({ light = false, className = '' }) {
  const text = light ? '#ffffff' : '#161e4b'
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden="true">
        <rect width="40" height="40" rx="9" fill={light ? 'rgba(255,255,255,0.08)' : '#161e4b'} stroke={light ? 'rgba(255,255,255,0.35)' : 'none'} />
        <path d="M8 30h24v3H8zM11 24h18v3H11zM14 18h12v3H14zM17 7h6v8h-6z" fill="#fcb415" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.2rem] font-extrabold tracking-[0.18em]" style={{ color: text }}>SAMA</span>
        <span className="mt-1 font-display text-[0.5rem] font-bold tracking-[0.2em]" style={{ color: light ? 'rgba(255,255,255,0.75)' : '#8b8a85' }}>CONSTRUCTION &amp; DEVELOPMENTS</span>
      </span>
    </span>
  )
}
