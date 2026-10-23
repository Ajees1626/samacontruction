import { SHOW_PLACEHOLDER_MARKERS } from '../../config/site'

/* Visible marker for content that still needs verified company information. */
export default function PlaceholderTag({ children = 'Placeholder', className = '' }) {
  if (!SHOW_PLACEHOLDER_MARKERS) return null
  return (
    <span className={`placeholder-tag ${className}`} title="Replace with verified SAMA Construction & Developments content">
      {children}
    </span>
  )
}
