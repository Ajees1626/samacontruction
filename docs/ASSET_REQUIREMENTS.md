# Assets and content still required

The site is structurally complete. These items need **verified Sama Construction material** before launch. Nothing below has been invented in the site; each one is a clearly marked placeholder.

## Brand
- [ ] Official logo as SVG, in a primary version and a white/reversed version. Replace `src/components/ui/Logo.jsx` and `public/favicon.svg`.
- [ ] Confirm the brand colours (navy `#161e4b`, amber `#fcb415`, teal highlight `#0f9d8f`) and any brand guidelines.

## Company information (`src/config/site.js`)
- [x] Phone (2 numbers), email, Tambaram head office address
- [ ] Careers email and opening hours
- [ ] Check the Google Maps pin (currently an address search); replace with the exact place link if it is off
- [ ] LinkedIn, Instagram, Facebook and YouTube URLs
- [ ] Live domain (`SITE.url`) and default share image (`SITE.ogImage`)
- [ ] Form endpoint (`SITE.formEndpoint`), for example Formspree, HubSpot or a custom API

## Statistics (`STATS`)
- [ ] Projects completed
- [ ] Years of experience
- [ ] Built-up area delivered
- [ ] Cities or regions served

## About page
- [ ] Founding year, founders, company story and milestones
- [ ] Leadership team: names, roles and portraits (4:5, at least 1200 px)
- [ ] Company registration or legal entity name (also needed for the Privacy Policy)

## Services (`src/data/services.js`)
- [ ] Confirm the six service lines and edit the scope bullets to match what the company actually offers

## Projects (`src/data/projects.js`)
For each real project you want to show:
- [ ] Name, location, category, status and completion year
- [ ] Built-up area, floors and duration
- [ ] Short summary, scope and challenges solved
- [ ] 4–8 professional photos (landscape, at least 2400 px wide), with client permission to publish
- [ ] Set `sample: false`

## Quality, safety and sustainability
- [ ] Certifications (ISO 9001, 45001, 14001, etc.) with certificate numbers and validity dates, **only if held**
- [ ] Any safety statistics or awards, **only if verified**

## Clients and testimonials (`src/components/home/Clients.jsx`)
- [ ] Client logos as SVG or PNG, with permission
- [ ] Testimonials with name, role and organisation, with written permission

## Careers (`src/data/content.js` → `JOBS`)
- [ ] Current open roles, or remove the sample list

## Photography to replace stock images (`src/data/images.js`)
Every image on the site is currently a licensed Unsplash stock photo used as a placeholder. Priority replacements:
- [ ] Active site photography: cranes, concrete pours, reinforcement work, teams in PPE
- [ ] Completed buildings: exterior, golden hour, at least 2400 px
- [ ] Engineering and planning: drawings, site meetings, survey work
- [ ] Equipment fleet

## Cinematic hero
- [ ] Optional photoreal render sequence. See `docs/CINEMATIC_ASSET_SPEC.md`.

## Legal
- [ ] Have the Privacy Policy reviewed by legal counsel. Add the legal entity name and grievance or contact officer details.
