/*
  Central company configuration.
  ────────────────────────────────
  Everything marked `placeholder: true` (or wrapped in PH()) is editable content that MUST be
  replaced with verified SAMA Construction & Developments information before launch. Nothing in this file is
  a factual claim about the company.

  Set SHOW_PLACEHOLDER_MARKERS to false once all content has been verified to hide the
  "Placeholder" tags rendered across the site.
*/

export const SHOW_PLACEHOLDER_MARKERS = true

export const SITE = {
  name: 'SAMA Construction & Developments',
  shortName: 'SAMA',
  tagline: 'Building with precision. Delivering with integrity.',
  url: 'https://www.samaconstruction.example', // TODO: replace with the live domain
  description:
    'SAMA Construction & Developments delivers residential, commercial, industrial and infrastructure construction with disciplined engineering, transparent project management and a relentless focus on quality and safety.',
  ogImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop',

  // Contact details — confirmed by the client (shared with Sama Institutes).
  contact: {
    phone: '+91 94894 32478',
    phoneAlt: '+91 98944 96645',
    email: 'info@samainstitutes.com',
    careersEmail: null,
    address: 'Durairaj Paradise, 100 Feet Road, Near Camp Road Junction, Tambaram, Chennai – 600073, Tamil Nadu',
    hours: null, // e.g. 'Mon – Sat, 9:00 – 18:00' — not yet provided
    mapEmbedUrl: 'https://www.google.com/maps?q=Durairaj+Paradise,+100+Feet+Road,+Tambaram,+Chennai+600073&output=embed',
  },

  // Social profiles — only add verified URLs.
  social: {
    linkedin: null,
    instagram: null,
    facebook: null,
    youtube: null,
  },

  // Form submissions: set to an HTTPS endpoint (Formspree, your API, etc.) to POST JSON.
  formEndpoint: null,
}

/*
  Headline statistics — PLACEHOLDER VALUES ONLY.
  Replace `value` with verified figures and set `placeholder: false`.
*/
export const STATS = [
  { value: null, suffix: '+', label: 'Projects completed', note: 'Verified figure required', placeholder: true },
  { value: null, suffix: '+', label: 'Years of experience', note: 'Verified figure required', placeholder: true },
  { value: null, suffix: 'M', label: 'Sq ft of built-up area delivered', note: 'Verified figure required', placeholder: true },
  { value: null, suffix: '', label: 'Cities / regions served', note: 'Verified figure required', placeholder: true },
]

export const NAV = [
  {
    label: 'Company',
    to: '/about',
    children: [
      { label: 'About Us', to: '/about', desc: 'Who we are and how we work' },
      { label: 'Quality, Safety & Sustainability', to: '/quality-safety-sustainability', desc: 'Standards on every site' },
      { label: 'News & Insights', to: '/news', desc: 'Perspectives from the field' },
      { label: 'Careers', to: '/careers', desc: 'Jobs, training & placement' },
      { label: 'Sama Institutes', href: 'https://samainstitutes.com/', desc: 'Skill & career development for engineers' },
    ],
  },
  { label: 'Services', to: '/services', mega: true },
  { label: 'Projects', to: '/projects' },
  { label: 'Capabilities', to: '/capabilities' },
  { label: 'Industries', to: '/industries' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
]
