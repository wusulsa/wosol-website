# WOSOL continuation — 2026-10-14

## Audit handoff — documentation only

The owner requested the complete audit be uploaded for later improvements. Read the [full Arabic audit](docs/audits/2026-10-14-website-seo-audit-ar.md) and its [prioritized checklist](docs/audits/2026-10-14-implementation-checklist-ar.md). The audited application commit is `f96c3db`. Recommendations are pending; this documentation upload does not implement them or deploy production. Continue tracking evidence and completed work in the checklist.

The owner approved the latest moving cartoon Coaster and requested that the current work be saved to GitHub for small changes in a later session.

- Repository: https://github.com/wusulsa/wosol-website
- Working branch: improve/website-experience-seo
- Existing review: https://github.com/wusulsa/wosol-website/pull/1
- Latest application commit at handoff: f4ff4f8935f55e6d36b80f71776987a401657b82
- Public preview: https://wosol-professional-preview.a-m-alyamani.chatgpt.site/
- Sites project: appgprj_6ace8b3f40f0819189022d43092e6041
- Deployed preview source commit: 4d6ae40e0ee24b4c5a81fff0dfbce962b730d4a6
- Latest successful deployment: appgdep_6acead043a408191b2c3ef51d4a482b9
- Local application checkout: ../wosol-website
- Separate Sites checkout: ../wosol-preview
- Preview preparation script: ../prepare-wosol-preview.cjs

## Approved state and constraints

- Arabic and English pages; prioritize King Abdulaziz University female student transport in Jeddah, then corporate transport in Jeddah/Riyadh.
- License: 35/00001075.
- Do not publish contracted clients, fleet totals, administrative structure or full reference PDFs.
- Gold: #F1B654.
- Keep image proportions natural and verify rendered dimensions; CSS height:auto and explicit aspect ratios prevent previous stretching.
- Owner chose the previously AI-enhanced fleet images; they are in assets/fleet/showcase with presentation captions.
- Approved moving bus: assets/profile-2026/approved-cartoon-bus.webp. This is the cartoon Coaster with phone numbers removed, facing right with readable branding.
- Bus moves left to right in the separate full-width lane beneath navigation. Preserve pause/resume and reduced-motion support.
- Header logo is enlarged about 15% with animated triangle blades.
- Public preview disables form submission and indexing. The owner explicitly requested public access on 2026-10-14; Sites access_mode is public, revision 2. Preserve public access and use the standard publishing workflow, not owner-private deployment tools.
- GitHub branch is for review. Main/live wosol.net have not been merged or deployed by this work.

## Implementation and validation

- Page generator: scripts/build-pages.cjs and scripts/home-experience.cjs.
- Bus/logo markup: scripts/brand-motion.cjs; motion control: js/brand-route.js.
- Styles: css/premium.css. Image markup: scripts/image-markup.cjs.
- Rebuild: node scripts/build-pages.cjs.
- Static validation: python scripts/check-pages.py (12 bilingual pages).
- Last browser check confirmed the approved bus asset loaded at 96x34 CSS pixels, header-bus-cross animation, and working pause/resume.
- Continue from this branch and existing preview; do not create another site.

## Fleet categories — 2026-10-14
Added bilingual categories: small vehicles 4–7 passengers (white Yaris and RAV4 model images), small buses 11, mid-size buses 21, large buses 51. Sources: assets/fleet/cars/SOURCES.md. Shared template: scripts/fleet-experience.cjs. Public preview source: 98bd0a4711e90db554cb62975e7af21e4031b838; deployment appgdep_6acfc78058a48191910dcced17e2e10e succeeded. All 12 pages passed validation; live Arabic/English categories, four tabs, image loading and mobile overflow checked. User plans further additions.

## Vehicle branding — 2026-10-14
Small-vehicle category now displays 4 - 5 - 7 passengers as requested (category options, not per-model claims). Large buses are selected by default in Arabic and English. scripts/brand-assets.cjs builds SVG compositions with original photos and wordmark; all logo gold maps to #F1B654, black remains #111111. Native logo preserved. Header, footer and car doors use the same branding.

## Staria and service audience — 2026-10-14
Small-vehicle capacities use commas (4, 5, 7), small buses 9, 11. Added white Hyundai Staria with WOSOL door branding alongside Hiace; source documented in assets/fleet/cars/SOURCES.md. Expanded company service copy to institutions and authorities in Arabic and English, including forms, metadata and navigation. Preview source 292cd83e64a86d010561253363053f2c879f7922; deployment appgdep_6acfcd8bab308191aef35a59459ed642 succeeded. Checked 12 pages and desktop/mobile layout; large buses remain default.

## Centred door logos — 2026-10-14
Enlarged Yaris/RAV4 door logos about 44% and Staria 40%, retaining front-door centres. Removed visible model captions from all four cards in both languages; Hiace photo unchanged. Cards vertically centre images. Preview source 7cdae012aaee254b69479e882d826f250991b4c5, deployment appgdep_6acfcf2aba4c8191b9af200676a0e44e succeeded.

## Coverage and copy audit — 2026-10-14
Added Al Khobar, Buraydah, Rabigh, Al Qassim, Bisha and Umluj. Single-source content/coverage.json drives the 14-entry count and regional service descriptions in both languages. Label is destinations and service areas, not 14 independent cities: Al Qassim includes Buraydah and NEOM is a project. Fixed missed Arabic للشركات variants in footer, service titles, metadata and translation dictionary; expanded to institutions and authorities without duplicates. Audited all generated pages, six added names, counter and large-bus default. Public preview banner corrected in workspace prepare-wosol-preview.cjs; forms remain disabled. Source 49684f14a1b57843da1831c890057ca3c3461eb0; deployment appgdep_6acfd15e4adc8191aa7ccaa43943813c succeeded.
