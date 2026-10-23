import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function LinkButton({ to, variant = 'primary', children, icon = true, className = '', ...props }) {
  return (
    <Link to={to} className={`btn btn-${variant} group ${className}`} {...props}>
      <span>{children}</span>
      {icon && <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />}
    </Link>
  )
}
