import { STATS } from '../../config/site'
import CountUp from '../ui/CountUp'
import PlaceholderTag from '../ui/PlaceholderTag'

export default function Stats({ light = false }) {
  const anyPlaceholder = STATS.some((s) => s.placeholder)
  return (
    <section className={`relative overflow-hidden ${light ? 'bg-cloud' : 'bg-navy'} `}>
      {!light && <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px)] [background-size:25%_100%]" />}
      <div className="container-x relative py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4" data-reveal>
          <p className={`eyebrow ${light ? '' : 'eyebrow-light'}`}>Sama in numbers</p>
          {anyPlaceholder && <PlaceholderTag>Figures pending verification</PlaceholderTag>}
        </div>
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4" data-reveal="stagger">
          {STATS.map((s) => (
            <div key={s.label} className={`border-l-2 pl-5 md:pl-7 ${light ? 'border-amber' : 'border-amber/90'}`}>
              <dt className={`order-2 mt-3 text-[0.9rem] md:text-base ${light ? 'text-graphite/75' : 'text-white/70'}`}>{s.label}</dt>
              <dd className={`font-display text-[clamp(3rem,1.8rem+4.6vw,6rem)] font-extrabold leading-none tracking-tight text-transparent ${light ? '[-webkit-text-stroke:2px_#161e4b]' : '[-webkit-text-stroke:2px_#ffffff]'}`}>
                <CountUp value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
