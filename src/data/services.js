import { IMG } from './images'

/*
  Service categories — subject to confirmation by SAMA Construction & Developments.
  Copy describes typical scope for each discipline; edit to reflect the company's actual offering.
*/
export const SERVICES = [
  {
    slug: 'residential-construction',
    title: 'Residential Construction',
    icon: 'House',
    short: 'Villas, independent homes, apartments and gated communities built to exacting structural and finishing standards.',
    image: IMG.villaWhite,
    hero: IMG.houseEvening,
    intro:
      'From a single family residence to multi-block housing, we take residential projects from foundation design to final handover — coordinating structure, services and finishes under one accountable team.',
    scope: [
      'Independent homes and luxury villas',
      'Apartment and multi-storey residential blocks',
      'Gated communities and township infrastructure',
      'Structural works, masonry and finishing',
      'MEP coordination and installation',
      'Renovation, extension and structural retrofit',
    ],
    highlights: [
      { title: 'Structure first', text: 'Foundations, frames and slabs engineered and inspected before anything is finished over them.' },
      { title: 'Finishes that last', text: 'Material selection guided by durability and maintenance, not just appearance.' },
      { title: 'One point of contact', text: 'A dedicated project manager keeps owners informed at every milestone.' },
    ],
  },
  {
    slug: 'commercial-construction',
    title: 'Commercial Construction',
    icon: 'Building2',
    short: 'Offices, retail, hospitality and mixed-use buildings delivered on programme for owners and developers.',
    image: IMG.glassOffice,
    hero: IMG.towersDusk,
    intro:
      'Commercial projects live and die by programme. We plan sequencing, procurement and trade coordination up front so that buildings open when the business needs them to.',
    scope: [
      'Corporate offices and business parks',
      'Retail, showrooms and shopping centres',
      'Hotels and hospitality buildings',
      'Mixed-use developments',
      'Fit-out and core & shell works',
      'Facade and envelope coordination',
    ],
    highlights: [
      { title: 'Programme discipline', text: 'Look-ahead planning and weekly progress tracking against the baseline schedule.' },
      { title: 'Cost visibility', text: 'Transparent bills of quantities and change control from day one.' },
      { title: 'Coordinated services', text: 'Structure, MEP and facade interfaces resolved before they reach site.' },
    ],
  },
  {
    slug: 'industrial-construction',
    title: 'Industrial Construction',
    icon: 'Factory',
    short: 'Factories, warehouses and logistics facilities with heavy-duty floors, long spans and fast-track delivery.',
    image: IMG.warehouse,
    hero: IMG.welder,
    intro:
      'Industrial buildings demand load-bearing floors, clear spans and services that keep operations running. We build facilities around how they will actually be used.',
    scope: [
      'Manufacturing plants and process buildings',
      'Warehouses and logistics parks',
      'Pre-engineered and structural steel buildings',
      'Heavy-duty industrial flooring',
      'Utility buildings and equipment foundations',
      'Internal roads, drainage and yard works',
    ],
    highlights: [
      { title: 'Built for load', text: 'Floors and foundations designed around racking, machinery and vehicle loads.' },
      { title: 'Fast-track ready', text: 'Phased handovers so operations can begin while works continue.' },
      { title: 'Safety-critical sites', text: 'Permit-to-work and segregation planning on live operational sites.' },
    ],
  },
  {
    slug: 'civil-engineering',
    title: 'Civil Engineering',
    icon: 'DraftingCompass',
    short: 'Earthworks, foundations, retaining structures and site development engineered for the ground conditions.',
    image: IMG.earthworksAerial,
    hero: IMG.rebarCrewTop,
    intro:
      'Every good building starts below ground. Our civil engineering teams handle site preparation, foundations and heavy structures with the rigour they demand.',
    scope: [
      'Site preparation and bulk earthworks',
      'Pile and raft foundations',
      'Retaining walls and basements',
      'Reinforced concrete structures',
      'Stormwater drainage and culverts',
      'Water tanks and treatment structures',
    ],
    highlights: [
      { title: 'Ground-led design', text: 'Foundations specified from soil investigation, not assumption.' },
      { title: 'Concrete control', text: 'Mix design, cube testing and pour records maintained for every element.' },
      { title: 'Heavy plant expertise', text: 'Earthmoving and lifting operations planned and supervised on site.' },
    ],
  },
  {
    slug: 'infrastructure-development',
    title: 'Infrastructure Development',
    icon: 'Route',
    short: 'Roads, utilities and public infrastructure that connect communities and support long-term growth.',
    image: IMG.roadworks,
    hero: IMG.siteTeamAerial,
    intro:
      'Infrastructure is built to serve for decades. We approach roads, utilities and public works with an emphasis on durability, safety and minimal disruption to the people around them.',
    scope: [
      'Roads, pavements and internal road networks',
      'Water supply and sewerage networks',
      'Bridges, culverts and minor structures',
      'Street lighting and utility corridors',
      'Public buildings and amenities',
      'Landscaping and external development',
    ],
    highlights: [
      { title: 'Durable by design', text: 'Pavement and utility specifications chosen for long service life.' },
      { title: 'Traffic & public safety', text: 'Diversion and barricading plans for works around live traffic.' },
      { title: 'Stakeholder coordination', text: 'Clear communication with authorities, utilities and residents.' },
    ],
  },
  {
    slug: 'project-management',
    title: 'Project Management',
    icon: 'ClipboardCheck',
    short: 'End-to-end planning, cost control, procurement and supervision — one accountable team from brief to handover.',
    image: IMG.blueprints,
    hero: IMG.engineersSite,
    intro:
      'Good construction is managed construction. We offer project management as a standalone service or as part of a design-and-build contract, representing the owner’s interest at every stage.',
    scope: [
      'Feasibility, budgeting and cost planning',
      'Design management and approvals coordination',
      'Tendering, procurement and contract administration',
      'Programme planning and progress reporting',
      'Quality assurance and site supervision',
      'Commissioning, snagging and handover',
    ],
    highlights: [
      { title: 'Single accountability', text: 'One team responsible for time, cost and quality outcomes.' },
      { title: 'Reporting you can read', text: 'Regular, plain-language reports with photos, progress and risks.' },
      { title: 'Risk managed early', text: 'Issues surfaced and resolved before they become site problems.' },
    ],
  },
]

export const getService = (slug) => SERVICES.find((s) => s.slug === slug)
