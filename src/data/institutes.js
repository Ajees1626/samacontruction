/*
  Sama Institutes — skill & career development arm of SAMA Construction & Developments.
  Content taken from the institute's own website (https://samainstitutes.netlify.app/ demo,
  live at https://samainstitutes.com/). Keep in sync with that site.
*/
export const INSTITUTES = {
  name: 'Sama Institutes',
  url: 'https://samainstitutes.com/',
  tagline: 'Build your career. Master the industry.',
  summary:
    'A training and placement centre for Civil, Mechanical and Electrical Engineers in Chennai — building practical, software-fluent professionals ready for the industry from day one.',
  about:
    'Sama Institutes is the skill and career development arm of SAMA Construction & Developments. Programmes are designed around practical market requirements — the plans, estimates, designs, quality records and MEP systems you will be asked to deliver on the job.',
  contact: {
    phones: ['+91 94894 32478', '+91 98944 96645'],
    email: 'info@samainstitutes.com',
    address: 'Durairaj Paradise, 100 Feet Road, Near Camp Road Junction, Tambaram, Chennai – 600073, Tamil Nadu',
  },
}

export const INSTITUTE_PILLARS = [
  { icon: 'Compass', title: 'Industry-focused training', text: 'Curriculum shaped by what consultancies and contractors hire for.' },
  { icon: 'DraftingCompass', title: 'Practical learning', text: 'Every concept is applied on real drawings, models and schedules.' },
  { icon: 'Users', title: 'Expert mentorship', text: 'Small batches guided by practising engineers and architects.' },
  { icon: 'Award', title: 'Placement assistance', text: 'Portfolio, interview and placement support after training.' },
]

export const COURSE_GROUPS = [
  {
    title: 'Civil & Structural',
    icon: 'Building2',
    courses: [
      { name: 'Quantity Surveying', weeks: 8 },
      { name: 'Concrete Technology', weeks: 6 },
      { name: 'Structural Design in RCC', weeks: 12 },
    ],
  },
  {
    title: 'Construction Management',
    icon: 'ClipboardCheck',
    courses: [
      { name: 'Advanced Construction Management', weeks: 12 },
      { name: 'QA & QC', weeks: 6 },
      { name: 'Fire and Safety Management', weeks: 8 },
      { name: 'Facility Management System in Building', weeks: 6 },
    ],
  },
  {
    title: 'MEP & Building Services',
    icon: 'Cog',
    courses: [
      { name: 'MEP System & Coordination', weeks: 10 },
      { name: 'HVAC', weeks: 8 },
      { name: 'Electrical Design in Construction', weeks: 8 },
    ],
  },
]

export const SOFTWARE_COURSES = [
  { name: 'Civil', hours: '80–240 hrs' },
  { name: 'Architecture', hours: '80–240 hrs' },
  { name: 'BIM', hours: '80–240 hrs' },
]

export const TRAINING_STAGES = [
  { title: 'Learn', text: 'Core concepts, Indian Standards and software fundamentals, taught from first principles in small batches.' },
  { title: 'Practice', text: 'Guided exercises on real drawings, BOQs, schedules and test reports until the workflow becomes second nature.' },
  { title: 'Build', text: 'Model it in CAD and BIM — AutoCAD, Revit and coordination tools, reviewed like a drawing office.' },
  { title: 'Get industry ready', text: 'Site-practice sessions, drawing reviews and professional standards that close the gap between classroom and site.' },
  { title: 'Placement support', text: 'Portfolio reviews, mock interviews and introductions to hiring firms until you land the role.' },
]

export const PLACEMENT_SUPPORT = [
  'Portfolio built from your course projects',
  'Resume and LinkedIn profile review',
  'Mock technical interviews with mentors',
  'Introductions to hiring firms in our network',
]

export const GLOBAL_NETWORK = [
  { country: 'Saudi Arabia', count: 10 },
  { country: 'UAE', count: 6 },
  { country: 'Qatar', count: 1 },
  { country: 'Maldives', count: 1 },
]

export const ALUMNI = [
  { name: 'A.M. Muhammath Jibreel', role: 'Senior Mechanical Site Engineer', company: 'Belco Electromechanical LLC', place: 'UAE · Fujairah' },
  { name: 'K.H. Ahamed Mohideen Bayas', role: 'Project Engineer', company: 'Reda Hazard Control', place: 'Saudi Arabia' },
  { name: 'S.M. Mohamed Imran', role: 'Quantity Surveyor (Tender)', company: 'Arabian Construction Company', place: 'Saudi Arabia' },
  { name: 'S.J. Al Hameed Yazar', role: 'Senior Project Control Engineer', company: 'Parsons', place: 'UAE · Abu Dhabi' },
  { name: 'S.M. Abdul Rahuman Ashik', role: 'Electrical Engineer', company: 'Alfaneyah Electromechanical Company Ltd', place: 'Saudi Arabia' },
  { name: 'M.S. Abdul Basith', role: 'Civil QA/QC Engineer', company: 'Al Naba Contracting Company', place: 'Saudi Arabia' },
]
