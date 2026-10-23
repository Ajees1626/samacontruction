import { IMG } from './images'

/* Industries served — confirm with SAMA Construction & Developments. */
export const INDUSTRIES = [
  { title: 'Residential & Real Estate', icon: 'House', image: IMG.villaTerrace, text: 'Homes, villas, apartments and gated communities for owners and developers.', services: ['residential-construction', 'project-management'] },
  { title: 'Commercial & Offices', icon: 'Building2', image: IMG.towersUp, text: 'Office buildings, business parks and mixed-use developments.', services: ['commercial-construction', 'project-management'] },
  { title: 'Industrial & Logistics', icon: 'Warehouse', image: IMG.warehouse, text: 'Factories, warehouses and logistics facilities designed around operations.', services: ['industrial-construction', 'civil-engineering'] },
  { title: 'Hospitality & Retail', icon: 'Hotel', image: IMG.pyramidFacade, text: 'Hotels, showrooms and retail buildings where finish quality is visible to every guest.', services: ['commercial-construction'] },
  { title: 'Healthcare & Education', icon: 'GraduationCap', image: IMG.officeInterior, text: 'Institutional buildings with demanding services, safety and compliance needs.', services: ['commercial-construction', 'project-management'] },
  { title: 'Public Infrastructure', icon: 'Landmark', image: IMG.roadworks, text: 'Roads, utilities and public works that serve communities for decades.', services: ['infrastructure-development', 'civil-engineering'] },
]

/* Core strengths — wording to be confirmed against company practice. */
export const STRENGTHS = [
  { icon: 'Compass', title: 'Planning', text: 'Detailed programmes, logistics plans and procurement schedules prepared before mobilisation.' },
  { icon: 'DraftingCompass', title: 'Engineering', text: 'Structural and services coordination resolved on drawings, not discovered on site.' },
  { icon: 'BadgeCheck', title: 'Quality', text: 'Stage-wise inspections and test records for materials and workmanship.' },
  { icon: 'HardHat', title: 'Execution', text: 'Experienced site leadership, supervised trades and disciplined daily planning.' },
  { icon: 'MessageSquare', title: 'Communication', text: 'Clear reporting and a single point of contact for every client.' },
  { icon: 'ShieldCheck', title: 'Safety', text: 'Safety inductions, PPE and site safety planning as a condition of work.' },
]

export const PROCESS = [
  { step: '01', title: 'Consultation', text: 'We listen to your brief, site, budget and timeline, and advise on feasibility and approach.', icon: 'MessageSquare' },
  { step: '02', title: 'Planning', text: 'Scope, budget, programme and approvals are mapped into a clear, agreed project plan.', icon: 'ClipboardList' },
  { step: '03', title: 'Design & Engineering', text: 'Architectural, structural and MEP designs are coordinated and value-engineered.', icon: 'DraftingCompass' },
  { step: '04', title: 'Construction', text: 'Site teams execute to programme with daily supervision and progress reporting.', icon: 'HardHat' },
  { step: '05', title: 'Quality Inspection', text: 'Stage inspections, testing and snagging confirm the work meets specification.', icon: 'BadgeCheck' },
  { step: '06', title: 'Handover', text: 'Commissioning, documentation and a walkthrough before keys change hands.', icon: 'Award' },
]

export const QUALITY_PILLARS = [
  {
    icon: 'BadgeCheck',
    title: 'Quality control',
    image: IMG.engineersSite,
    points: ['Inspection and test plans for key activities', 'Material approvals before procurement', 'Concrete cube and material testing records', 'Documented snagging before handover'],
  },
  {
    icon: 'HardHat',
    title: 'Site safety',
    image: IMG.rebarCrew,
    points: ['Site induction for every worker and visitor', 'Mandatory PPE on all active sites', 'Working-at-height and lifting plans', 'Toolbox talks and incident reporting'],
  },
  {
    icon: 'Layers',
    title: 'Material standards',
    image: IMG.timberFrame,
    points: ['Approved suppliers and traceable materials', 'Specification-compliant products only', 'Proper storage and handling on site', 'Samples and mock-ups for key finishes'],
  },
  {
    icon: 'Leaf',
    title: 'Sustainability',
    image: IMG.villaTerrace,
    points: ['Waste segregation and reduction on site', 'Dust, noise and run-off control', 'Energy- and water-efficient design options', 'Responsible sourcing where available'],
  },
]

export const CAPABILITIES = [
  { icon: 'Users', title: 'In-house project teams', text: 'Project managers, site engineers, planners and quantity surveyors working as one delivery team.' },
  { icon: 'Truck', title: 'Plant & equipment', text: 'Access to earthmoving, lifting and concreting equipment appropriate to project scale.' },
  { icon: 'Cog', title: 'Engineering coordination', text: 'Structural, architectural and MEP drawings coordinated before work reaches site.' },
  { icon: 'Gauge', title: 'Planning & controls', text: 'Baseline programmes, cost tracking and progress reporting for every project.' },
  { icon: 'Package', title: 'Procurement', text: 'Supplier and subcontractor networks for materials, specialist trades and services.' },
  { icon: 'ShieldCheck', title: 'HSE management', text: 'Health, safety and environmental planning built into every method statement.' },
]

/* Sample editorial articles — general industry insights, not company news. */
export const ARTICLES = [
  {
    slug: 'what-to-plan-before-breaking-ground',
    title: 'What to plan before breaking ground',
    category: 'Planning',
    date: null,
    image: IMG.blueprints,
    excerpt: 'Soil investigation, approvals, budgets and programmes — the decisions that shape a project long before excavation starts.',
    body: [
      'The most expensive changes on a construction project are the ones made after work has started. That is why the weeks spent before mobilisation matter so much.',
      'A geotechnical investigation tells the structural engineer what the ground can carry, which in turn decides foundation type, depth and cost. Skipping it rarely saves money; it simply moves risk to the most expensive phase of the project.',
      'Approvals, utility connections and access arrangements should be mapped early, alongside a realistic programme that includes procurement lead times for long-lead items such as structural steel, lifts and facade systems.',
      'Finally, agree how decisions will be made. A clear change-control process protects the budget and keeps everyone working from the same drawings.',
    ],
    sample: true,
  },
  {
    slug: 'understanding-quality-inspections',
    title: 'Understanding stage-wise quality inspections',
    category: 'Quality',
    date: null,
    image: IMG.engineersSite,
    excerpt: 'Why the most important inspections happen before concrete is poured — and what owners should ask to see.',
    body: [
      'Quality in construction is mostly invisible once a building is finished. Reinforcement, waterproofing and embedded services are covered within days of being installed.',
      'Stage-wise inspections — reinforcement checks before a pour, waterproofing tests before tiling, pressure tests before services are concealed — are what make hidden work dependable.',
      'Owners should expect inspection records, test results and photographs as part of regular reporting. They are the evidence that the building matches its specification.',
    ],
    sample: true,
  },
  {
    slug: 'reading-a-construction-programme',
    title: 'How to read a construction programme',
    category: 'Project Management',
    date: null,
    image: IMG.cranesSky,
    excerpt: 'Critical paths, float and milestones explained for owners who want to understand where their project really stands.',
    body: [
      'A construction programme is more than a list of dates. It shows how activities depend on one another and which of them directly control the completion date — the critical path.',
      'Activities with float can slip without affecting completion; critical activities cannot. Knowing the difference helps owners focus attention where it matters.',
      'Ask for programme updates that compare progress with the original baseline. Trends over several weeks tell you far more than a single snapshot.',
    ],
    sample: true,
  },
]

/* Sample vacancies — replace with real openings. */
export const JOBS = [
  { title: 'Site Engineer — Civil', type: 'Full-time', location: 'Location to be confirmed', dept: 'Construction', sample: true },
  { title: 'Project Manager', type: 'Full-time', location: 'Location to be confirmed', dept: 'Project Management', sample: true },
  { title: 'Quantity Surveyor', type: 'Full-time', location: 'Location to be confirmed', dept: 'Commercial', sample: true },
  { title: 'HSE Officer', type: 'Full-time', location: 'Location to be confirmed', dept: 'Health & Safety', sample: true },
  { title: 'Planning Engineer', type: 'Full-time', location: 'Location to be confirmed', dept: 'Planning', sample: true },
]
