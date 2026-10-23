import { IMG } from '../../data/images'
import LinkButton from '../ui/LinkButton'

export default function AboutTeaser() {
  return (
    <section className="bg-cloud">
      <div className="container-x section-y grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 lg:order-1">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3 aspect-[3/4] overflow-hidden rounded-3xl" data-reveal="mask">
              <img src={IMG.engineersSite(900)} alt="Engineers in hard hats reviewing work on site (stock image)" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="col-span-2 flex flex-col gap-4 pt-16">
              <div className="aspect-square overflow-hidden rounded-3xl" data-reveal="mask">
                <img src={IMG.rebarCrew(600)} alt="Workers fixing reinforcement on a structure (stock image)" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="rounded-3xl bg-amber p-5 font-display text-navy" data-reveal>
                <p className="text-sm font-bold uppercase tracking-[0.16em]">People first</p>
                <p className="mt-2 text-lg font-bold leading-snug">Experienced engineers. Supervised sites.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="eyebrow" data-reveal>About the company</p>
          <h2 className="t-section mt-6" data-reveal>One team, accountable from foundation to finish.</h2>
          <p className="t-lead mt-6 text-graphite/80" data-reveal>
            SAMA Construction & Developments combines engineering, planning and site execution under one roof. We work with homeowners, developers, businesses and public bodies — and treat every project as a long-term reflection of our name.
          </p>
          <p className="mt-5 text-graphite/75" data-reveal>Our history, leadership and milestones will be presented on the About page once verified details are supplied.</p>
          <div className="mt-10" data-reveal><LinkButton to="/about" variant="navy">About the company</LinkButton></div>
        </div>
      </div>
    </section>
  )
}
