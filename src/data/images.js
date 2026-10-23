/*
  Image library.
  These are licensed stock photographs from Unsplash (Unsplash License — free for commercial use)
  used as PLACEHOLDERS until the company's own project photography is supplied.
  None of these images depict SAMA Construction & Developments projects. Replace with authorised company photos
  (see docs/ASSET_REQUIREMENTS.md).
*/

const u = (id) => (w = 1600, h) =>
  `https://images.unsplash.com/${id}?w=${w}${h ? `&h=${h}` : ''}&q=78&auto=format&fit=crop`

export const IMG = {
  cranesSky: u('photo-1429497419816-9ca5cfb4571a'),
  cranesTower: u('photo-1599707254554-027aeb4deacd'),
  craneSunset: u('photo-1535732759880-bbd5c7265e3f'),
  siteTeamAerial: u('photo-1541888946425-d81bb19240f5'),
  rebarCrewTop: u('photo-1504307651254-35680f356dfd'),
  rebarCrew: u('photo-1531834685032-c34bf0d84c77'),
  engineersSite: u('photo-1626885930974-4b69aa21bbf9'),
  electricalWorker: u('photo-1621905251189-08b45d6a269e'),
  welder: u('photo-1558618666-fcd25c85cd64'),
  blueprints: u('photo-1503387762-592deb58ef4e'),
  roadworks: u('photo-1503708928676-1cb796a0891e'),
  earthworksAerial: u('photo-1517089596392-fb9a9033e05b'),
  glassOffice: u('photo-1554435493-93422e8220c8'),
  pyramidFacade: u('photo-1487958449943-2429e8be8625'),
  towersUp: u('photo-1486406146926-c627a92ad1ab'),
  towersDusk: u('photo-1511818966892-d7d671e672a2'),
  towersFog: u('photo-1449157291145-7efd050a4d0e'),
  apartments: u('photo-1545324418-cc1a3fa10c00'),
  timberFrame: u('photo-1508450859948-4e04fabaa4ea'),
  warehouse: u('photo-1587293852726-70cdb56c2866'),
  highriseBuild: u('photo-1565008447742-97f6f38c985c'),
  facadeDark: u('photo-1448630360428-65456885c650'),
  villaPool: u('photo-1613490493576-7fde63acd811'),
  villaWhite: u('photo-1580587771525-78b9dba3b914'),
  houseTimber: u('photo-1600566753190-17f0baa2a6c3'),
  houseEvening: u('photo-1600585154340-be6161a56a0c'),
  villaTerrace: u('photo-1600596542815-ffad4c1539a9'),
  livingInterior: u('photo-1600607687939-ce8a6c25118c'),
  officeInterior: u('photo-1497366216548-37526070297c'),

  // Sample portraits for leadership slots — stock models, not Sama staff.
  portrait1: u('photo-1560250097-0b93528c311a'),
  portrait2: u('photo-1573497019940-1c28c88b4f3e'),
  portrait3: u('photo-1519085360753-af0119f7cbe7'),
  portrait4: u('photo-1573496359142-b8d87734a5a2'),
}
