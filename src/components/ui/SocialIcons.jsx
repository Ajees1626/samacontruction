import { SITE } from '../../config/site'

const PATHS = {
  linkedin: 'M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.24 8.25h4.5V23H.24V8.25zM8.34 8.25h4.31v2.02h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V23h-4.49v-7.1c0-1.7-.03-3.88-2.36-3.88-2.37 0-2.73 1.85-2.73 3.76V23H8.34V8.25z',
  instagram: 'M12 2.2c3.2 0 3.58 0 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s0-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33 0 7.05.07 2.7.27.27 2.7.07 7.05 0 8.33 0 8.74 0 12s0 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 24 8.74 24 12 24s3.67 0 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s0-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67 0 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z',
  facebook: 'M9 8H6v4h3v12h5V12h3.64L18 8h-4V6.33C14 5.38 14.19 5 15.11 5H18V0h-3.81C10.6 0 9 1.58 9 4.62V8z',
  youtube: 'M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z',
}

/* Links only verified profiles (SITE.social). Unconfigured networks render as muted placeholders. */
export default function SocialIcons({ className = '' }) {
  return (
    <ul className={`flex items-center gap-2.5 ${className}`}>
      {Object.keys(PATHS).map((k) => {
        const href = SITE.social[k]
        const icon = (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d={PATHS[k]} />
          </svg>
        )
        return (
          <li key={k}>
            {href ? (
              <a href={href} target="_blank" rel="noreferrer" aria-label={k} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-amber hover:bg-amber hover:text-navy">
                {icon}
              </a>
            ) : (
              <span title={k + ' profile to be added'} className="grid h-10 w-10 place-items-center rounded-full border border-dashed border-white/15 text-white/30">
                {icon}
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
