import { useRef } from 'react'
import useReveal from '../hooks/useReveal'
import PageHero from '../components/ui/PageHero'
import PlaceholderTag from '../components/ui/PlaceholderTag'
import useSeo from '../hooks/useSeo'
import { IMG } from '../data/images'
import { SITE } from '../config/site'

const SECTIONS = [
  { h: 'Information we collect', p: ['When you contact us or request a quote, we collect the details you provide — such as your name, email address, phone number, company, project location and project description.', 'We may also collect basic technical information (for example browser type and pages visited) to keep the website secure and working well.'] },
  { h: 'How we use your information', p: ['To respond to enquiries and prepare quotations.', 'To manage projects, contracts and recruitment where you have engaged with us.', 'To meet legal, regulatory and accounting obligations.'] },
  { h: 'Sharing', p: ['We do not sell personal information. We share it only with service providers who help us operate (for example email or hosting providers), or where required by law.'] },
  { h: 'Retention', p: ['We keep personal information only for as long as needed for the purposes above or as required by law.'] },
  { h: 'Your rights', p: ['You may request access to, correction of or deletion of your personal information, subject to applicable law. Contact us using the details on our Contact page.'] },
  { h: 'Cookies', p: ['This website does not set advertising cookies. If analytics are added, this section will describe them and how to opt out.'] },
  { h: 'Changes', p: ['We may update this policy from time to time. The latest version will always be published on this page.'] },
]

export default function Privacy() {
  useSeo({ title: 'Privacy Policy', description: `How ${SITE.name} collects, uses and protects personal information.` })
  const ref = useRef(null)
  useReveal(ref)
  return (
    <div ref={ref}>
      <PageHero eyebrow="Legal" title="Privacy Policy" image={IMG.officeInterior} crumbs={[{ label: 'Privacy Policy' }]} />
      <section className="bg-paper">
        <div className="container-x section-y">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-dashed border-teal/40 bg-teal-100/40 p-5 text-sm text-graphite/80">
              <PlaceholderTag>Legal review required</PlaceholderTag>
              <p className="mt-2">This is a general template. Have it reviewed by legal counsel for your jurisdiction (e.g. India’s Digital Personal Data Protection Act, 2023, or GDPR where applicable) and add the company’s legal name, address and grievance officer details.</p>
            </div>
            {SECTIONS.map((s, i) => (
              <section key={s.h} className="mt-12">
                <h2 className="font-display text-2xl font-bold" data-split>{i + 1}. {s.h}</h2>
                <div className="mt-4 space-y-3 text-graphite/80" data-reveal>
                  {s.p.map((p) => <p key={p}>{p}</p>)}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
