import { IMG } from './images'

/*
  SAMPLE PROJECT ENTRIES — NOT REAL SAMA CONSTRUCTION PROJECTS.
  Every entry is flagged `sample: true` and uses stock photography. Replace with verified projects
  (name, location, client permission, real photographs, real figures) before launch.
  The project detail page is a single data-driven template (src/pages/ProjectDetail.jsx).
*/
export const PROJECT_CATEGORIES = ['All', 'Residential', 'Commercial', 'Industrial', 'Infrastructure', 'Civil']

export const PROJECTS = [
  {
    slug: 'contemporary-villa-residence',
    name: 'Contemporary Villa Residence',
    category: 'Residential',
    location: 'Location to be confirmed',
    status: 'Status to be confirmed',
    year: null,
    image: IMG.villaPool,
    gallery: [IMG.villaTerrace, IMG.livingInterior, IMG.houseTimber],
    summary: 'A two-storey reinforced concrete residence with cantilevered terraces, large-format glazing and a landscaped pool deck.',
    scope: ['RCC frame structure', 'Cantilevered terraces', 'Structural glazing', 'MEP & finishes', 'Landscape & pool'],
    facts: [
      { label: 'Built-up area', value: 'To be confirmed' },
      { label: 'Floors', value: 'To be confirmed' },
      { label: 'Duration', value: 'To be confirmed' },
    ],
    sample: true,
  },
  {
    slug: 'corporate-office-block',
    name: 'Corporate Office Block',
    category: 'Commercial',
    location: 'Location to be confirmed',
    status: 'Status to be confirmed',
    image: IMG.glassOffice,
    gallery: [IMG.officeInterior, IMG.towersUp, IMG.facadeDark],
    summary: 'A glazed commercial office building with open-plan floor plates, a central services core and basement parking.',
    scope: ['Core & shell', 'Curtain wall coordination', 'Basement works', 'Fit-out', 'External works'],
    facts: [
      { label: 'Built-up area', value: 'To be confirmed' },
      { label: 'Floors', value: 'To be confirmed' },
      { label: 'Duration', value: 'To be confirmed' },
    ],
    sample: true,
  },
  {
    slug: 'logistics-warehouse-facility',
    name: 'Logistics Warehouse Facility',
    category: 'Industrial',
    location: 'Location to be confirmed',
    status: 'Status to be confirmed',
    image: IMG.warehouse,
    gallery: [IMG.welder, IMG.earthworksAerial, IMG.electricalWorker],
    summary: 'A pre-engineered steel warehouse with heavy-duty flooring, high-bay racking zones and loading docks.',
    scope: ['PEB structure', 'Heavy-duty flooring', 'Loading docks', 'Fire & electrical services', 'Yard & drainage'],
    facts: [
      { label: 'Built-up area', value: 'To be confirmed' },
      { label: 'Clear height', value: 'To be confirmed' },
      { label: 'Duration', value: 'To be confirmed' },
    ],
    sample: true,
  },
  {
    slug: 'mid-rise-residential-towers',
    name: 'Mid-rise Residential Towers',
    category: 'Residential',
    location: 'Location to be confirmed',
    status: 'Status to be confirmed',
    image: IMG.highriseBuild,
    gallery: [IMG.cranesTower, IMG.rebarCrew, IMG.apartments],
    summary: 'Multi-block residential towers built with a repeatable floor cycle, tower-crane logistics and phased handover.',
    scope: ['Raft foundations', 'RCC towers', 'Tower crane logistics', 'Facade & finishes', 'Amenities'],
    facts: [
      { label: 'Units', value: 'To be confirmed' },
      { label: 'Towers', value: 'To be confirmed' },
      { label: 'Duration', value: 'To be confirmed' },
    ],
    sample: true,
  },
  {
    slug: 'arterial-road-upgrade',
    name: 'Arterial Road Upgrade',
    category: 'Infrastructure',
    location: 'Location to be confirmed',
    status: 'Status to be confirmed',
    image: IMG.roadworks,
    gallery: [IMG.siteTeamAerial, IMG.earthworksAerial, IMG.engineersSite],
    summary: 'Widening and resurfacing of an arterial road with new stormwater drainage, utility ducts and street lighting.',
    scope: ['Earthworks', 'Pavement layers', 'Stormwater drainage', 'Utility ducts', 'Street lighting'],
    facts: [
      { label: 'Length', value: 'To be confirmed' },
      { label: 'Lanes', value: 'To be confirmed' },
      { label: 'Duration', value: 'To be confirmed' },
    ],
    sample: true,
  },
  {
    slug: 'urban-apartment-block',
    name: 'Urban Apartment Block',
    category: 'Residential',
    location: 'Location to be confirmed',
    status: 'Status to be confirmed',
    image: IMG.apartments,
    gallery: [IMG.facadeDark, IMG.timberFrame, IMG.livingInterior],
    summary: 'A compact urban apartment building with a dark-clad facade, recessed balconies and efficient floor planning.',
    scope: ['RCC structure', 'Facade cladding', 'Balconies', 'Services', 'Interior finishes'],
    facts: [
      { label: 'Units', value: 'To be confirmed' },
      { label: 'Floors', value: 'To be confirmed' },
      { label: 'Duration', value: 'To be confirmed' },
    ],
    sample: true,
  },
  {
    slug: 'site-development-earthworks',
    name: 'Site Development & Earthworks',
    category: 'Civil',
    location: 'Location to be confirmed',
    status: 'Status to be confirmed',
    image: IMG.earthworksAerial,
    gallery: [IMG.roadworks, IMG.rebarCrewTop, IMG.siteTeamAerial],
    summary: 'Bulk earthworks, levelling and retaining structures preparing a large greenfield site for development.',
    scope: ['Bulk earthworks', 'Retaining walls', 'Drainage', 'Internal roads', 'Utility trenches'],
    facts: [
      { label: 'Site area', value: 'To be confirmed' },
      { label: 'Earthwork volume', value: 'To be confirmed' },
      { label: 'Duration', value: 'To be confirmed' },
    ],
    sample: true,
  },
  {
    slug: 'family-home-timber-concrete',
    name: 'Family Home in Timber & Concrete',
    category: 'Residential',
    location: 'Location to be confirmed',
    status: 'Status to be confirmed',
    image: IMG.houseEvening,
    gallery: [IMG.houseTimber, IMG.villaWhite, IMG.livingInterior],
    summary: 'A modern family home combining exposed concrete, timber cladding and generous glazing around a garden court.',
    scope: ['Structure', 'Timber cladding', 'Glazing', 'Interiors', 'Landscape'],
    facts: [
      { label: 'Built-up area', value: 'To be confirmed' },
      { label: 'Floors', value: 'To be confirmed' },
      { label: 'Duration', value: 'To be confirmed' },
    ],
    sample: true,
  },
]

export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug)
