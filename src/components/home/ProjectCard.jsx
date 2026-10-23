import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin } from 'lucide-react'
import PlaceholderTag from '../ui/PlaceholderTag'

/* Editorial project card. `size` controls aspect ratio for the editorial grid. */
export default function ProjectCard({ project, size = 'md', className = '' }) {
  const ratio = { lg: 'aspect-[4/5] md:aspect-auto md:h-full md:min-h-[640px]', md: 'aspect-[4/3]', wide: 'aspect-[16/10] md:aspect-[21/10]' }[size]
  return (
    <Link to={`/projects/${project.slug}`} className={`group img-zoom relative block overflow-hidden rounded-3xl bg-navy ${ratio} ${className}`}>
      <img
        src={project.image(size === 'lg' ? 1400 : 1000)}
        srcSet={`${project.image(700)} 700w, ${project.image(1100)} 1100w, ${project.image(1600)} 1600w`}
        sizes={size === 'md' ? '(min-width:768px) 50vw, 100vw' : '100vw'}
        alt={`${project.name} (stock image)`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
      <div className="absolute left-5 top-5 flex flex-wrap gap-2 md:left-7 md:top-7">
        <span className="rounded-full bg-white/90 px-3 py-1 font-display text-[0.7rem] font-bold uppercase tracking-[0.14em] text-navy backdrop-blur">{project.category}</span>
        {project.sample && <PlaceholderTag className="!bg-white/90">Sample project</PlaceholderTag>}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-7">
        <div>
          <h3 className="font-display text-[clamp(1.25rem,1rem+1vw,2rem)] font-bold leading-tight text-white">{project.name}</h3>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-white/75">
            <MapPin className="h-4 w-4 text-amber" aria-hidden="true" /> {project.location}
            <span className="mx-1 text-white/40">·</span> {project.status}
          </p>
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-amber text-navy transition-transform duration-500 group-hover:rotate-45">
          <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}
