# WOSOL continuation — 2026-10-14

The owner approved the latest moving cartoon Coaster and requested that the current work be saved to GitHub for small changes in a later session.

- Repository: https://github.com/wusulsa/wosol-website
- Working branch: improve/website-experience-seo
- Existing review: https://github.com/wusulsa/wosol-website/pull/1
- Latest application commit at handoff: f4ff4f8935f55e6d36b80f71776987a401657b82
- Private preview: https://wosol-professional-preview.a-m-alyamani.chatgpt.site/
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
- Private preview disables form submission and indexing. Preserve owner-private access.
- GitHub branch is for review. Main/live wosol.net have not been merged or deployed by this work.

## Implementation and validation

- Page generator: scripts/build-pages.cjs and scripts/home-experience.cjs.
- Bus/logo markup: scripts/brand-motion.cjs; motion control: js/brand-route.js.
- Styles: css/premium.css. Image markup: scripts/image-markup.cjs.
- Rebuild: node scripts/build-pages.cjs.
- Static validation: python scripts/check-pages.py (12 bilingual pages).
- Last browser check confirmed the approved bus asset loaded at 96x34 CSS pixels, header-bus-cross animation, and working pause/resume.
- Continue from this branch and existing preview; do not create another site.
