import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-white/70">
        <li><Link to="/" className="hover:text-amber">Home</Link></li>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            {it.to ? <Link to={it.to} className="hover:text-amber">{it.label}</Link> : <span aria-current="page" className="text-white">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
