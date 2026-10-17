# WOSOL continuation — 2026-10-17

## Latest override — failure alert and scoped pricing automation, 17 October 2026

This section supersedes older open items below. Integration failure email is SAVED to info@wosol.net with an Arabic subject and investigation instructions. Reopened after reload and verified recipient, body and Remove Alert. Zoho Forms states the alert triggers on the first failure once per 24 hours. No induced failure or mailbox-delivery test was performed.

Updated the existing calculate_subscription_price function: Routes and active Pricing_Plans now paginate up to ten pages of 200; incomplete fetch, exception or reaching the full 2,000-record ceiling writes a diagnostic and returns without replacing the prior price. This is bounded pagination, not unlimited coverage. One-way selection now uses parsed GO_ONLY/RETURN_ONLY codes as well as legacy wording. Saved successfully; commercial rates/formulas unchanged.

Replaced the broad active pricing workflow with three active rules using the SAME existing function action: creation; edits to Neighborhood/university_branch/direction/subscription_type/start_date; edits to pricing_id/approval_status/Paid_Total/Payment_Grace_Until/subscription_status. Each edit rule uses ANY changed field and repeats. Two edit rules are needed because Zoho limits this trigger to five fields. Original rule is deactivated, retained for history; its trigger was NOT changed because that would reset historical statistics. Phone normalization is unchanged. Forms Automation and Upsert remain OFF.

Controlled tests used only the existing synthetic CRM record: round trip to outbound one-way and back invoked the scoped rule and restored the previous amount; name-only change invoked phone normalization without pricing. Name and direction restored; final COQL confirms New status, blank approval/payment and blank historical consent fields. No new form submission, invoice, payment or operational approval. Successful new submission remains explicitly DEFERRED.

Remaining: end-to-end consent delivery and same-reference retry; independent duplicate applications versus renewals; real failure-email delivery; >200-record/cap/error pagination scenarios; no-match/multiple-match pricing and historical approvals. Two edit rules can both invoke the same function if one edit changes fields in both groups; concurrency/idempotence remains to be tested. Review any future API/Deluge writes for explicit workflow triggers. No website/source deployment changes: preview version 23 remains current. See the latest dated report/checklist section for details and rollback.

## Latest state — high-priority remediation, 17 October 2026

Follow-up: owner explicitly deferred the successful new form submission; do not submit a replacement or reuse an arbitrary identity. Consent delivery and same-source retry tests remain deferred. Read-only COQL metadata confirms field21 is used and unique (case insensitive), while consent fields have no defaults.

Resolved Pricing_Calc_Status: metadata identified the existing field as unused. Restored it to Standard / pricing-and-approval section, without creating another field or modifying pricing code. Function logs confirmed the reviewed pricing function ran successfully. Re-tested by changing only the existing synthetic test name; status now reads “تم تحديد خط السير وخطة التسعير واحتساب المبلغ بنجاح.” in both CRM UI and COQL. Calculated amount unchanged, phones normalized, subscription New and approval blank. The earlier function-version suspicion is resolved by this evidence. Forms automation remains off pending the deferred end-to-end test and wider scenarios. Integration failure-email configuration was inspected: recipient/subject/message are empty; no alert was saved or sent.

This section supersedes the earlier inspection-only/test baseline below. Forms identity fields now require exactly ten ASCII digits; a saved Deny Submissions rule rejects all-zero subscriber OR contact IDs. Browser tests confirmed rejection of letters and short input. After explicit action-time confirmation, submitted exactly ONE rejection-test attempt with both IDs all zero. Forms displayed the configured denial message; a targeted CRM COQL query returned 204/no matching records. No retry was made. This proves the combined all-zero case, not each OR branch independently, government identity verification or checksum validation.

After reviewing existing and unused CRM fields, created optional consent evidence fields in Subscriptions: field20 (acceptance text), field21 (unique source request reference), field22 (terms version), field23 (submission datetime). Saved and reopened Forms integration to verify TermsConditions, UniqueId, constant WOSOL-EDU-2026-10-17-v1, and Added Time mappings respectively. A new Forms Unique ID counter starts at 202610170001. No default consent was set. Old test evidence was NOT backfilled. A fresh successful submission and duplicate-reference retry remain untested; do not claim end-to-end consent or deduplication success.

Reviewed existing Prevent Duplicate Active Subscription validation: protects activation/approval, not repeated new applications; it does not validate identity format. Unique source reference protects repeated processing of one entry, not separately submitted duplicates. Upsert and Forms automation remain OFF.

Controlled CRM edit of the existing synthetic test invoked BOTH workflows, confirmed by timeline and connector: both phones normalized to international format; pricing and route/plan were populated. Test remains New, approval and paid total blank. No invoice/payment action was invoked. Do not use this record operationally; it now has calculated price/route unlike the earlier baseline. Pricing_Calc_Status stayed blank despite calculated outputs: investigate actual workflow action/version before enabling Forms automation. Pricing function review also found first-page-only route lookup (200) and pricing-plan search, broad create/edit recalculation, and dependence on direction labels. Current public form includes the expected one-way wording; a form direction defect was not established.

Connector works with module API name Subscriptions; CustomModule12 is only the UI route. Earlier INVALID_MODULE does not establish an account/connector fault. See the final dated remediation section in the audit and checklist. Website version 23 unchanged.

## Controlled Zoho Forms test — 2026-10-17, Asia/Riyadh

After explicit action-time consent, submitted ONE synthetic request `[controlled test]`. Forms entry `[internal ID retained locally]` saved `تمت الموافقة` and Added Time `17-Oct-2026`; integration progressed from pending to Record added. Verified CRM record `[internal ID retained locally]`, subscription `[test subscription]`, directly in the UI. Test name and location text clearly identify non-operational test data; record remains New, with no route, pricing plan, payment link, Books customer or related subscription payments visible. Timeline showed creation and zero upcoming automated actions. Do not approve, bill, route, renew or reuse this test as a real subscription. No duplicate submission and no deletion performed.

Findings: ID `0000000000` was accepted by both systems; CRM identity field's no-duplicate option is unchecked. Upsert and Automation & Process Management in Forms remain unchecked. Two CRM workflows are active (phone normalization and price/tax calculation), both create/edit for all subscriptions. Phones remained in local format in the test, so normalization is not proven and did not appear in the resulting values. The existing CRM approval picklist (pending/approved/waitlist/rejected) belongs to operational approval, NOT respondent consent. No consent mapping or terms-version snapshot was verified in CRM. Forms has a respondent email notification enabled, no SMS gateway or WhatsApp configuration; mailbox delivery was not verified. No new-record Form Rules or Deny Submissions rules configured. Settings were inspected only, not changed. Full evidence and remaining work are in the dated audit section below. Website preview/version 23 and production are unchanged.

The Wosol Operations search connector returned INVALID_MODULE for CustomModule12; verification therefore used the authenticated CRM UI, not the connector. Investigate connector metadata/account before relying on it for this module.

## Zoho Forms review — 2026-10-17

Updated the external educational subscription form license from 9900 to 35/00001075; Saved Successfully and respondent-page reload verified. Existing Zoho Forms integration is Connected to Subscriptions / Standard with 15 mapped fields. Automation, Assignment Rules and Upsert are unchecked; no integration changes made. Consent is not mapped in the visible configuration. Builder has additional weekly-trip fields absent from current public view and a duplicate Sunday-return label. No submission, record-delivery proof or failure-log verification. Website form remains unchanged; H03–H06 are not closed by this discovery. See the dated section in the selected-improvements report for evidence and follow-up.

## Current handoff — documentation reconciled

- Repository: https://github.com/wusulsa/wosol-website
- Working branch: improve/website-experience-seo
- Existing review: https://github.com/wusulsa/wosol-website/pull/1
- Latest application commit: e3849c3 (later documentation commits do not change the deployed application).
- Public preview: https://wosol-professional-preview.a-m-alyamani.chatgpt.site/
- Sites project: appgprj_6ace8b3f40f0819189022d43092e6041
- Published preview: version 23.
- Deployed source: c73ce291828b666215f707e136c6332d0091f330
- Successful deployment: appgdep_6acff51b536c8191b725c73a21026946
- Local application checkout: ../wosol-website
- Separate Sites checkout: ../wosol-preview
- Preview preparation: ../prepare-wosol-preview.cjs

Read [the current checklist](docs/audits/2026-10-14-implementation-checklist-ar.md) and [execution evidence](docs/audits/2026-10-14-selected-improvements-ar.md). The original audit remains a historical baseline at f96c3db, not a list of entirely unresolved defects.

## Completed and pending

Implemented: quote contact fields and client validation, shorter copy, bilingual operating scope, contrast, homepage hierarchy, WebP car exports, local fonts, Schema, share images, seasonal FAQs, motion controls and contact refinements. Footer and service cards show unified phone 920003790 followed by WhatsApp 0536060003 then 0501844991, each with an icon and a single clickable target. English uses international formatting. Other listed mobile contacts remain available.

Partial: H02 real delivery validation; M04 approved operational timings; M05/L02 original safety photos and publishable certificates; H07/G03 actual analytics activation and CRM attribution; G04 production performance checks. Deferred: H01 official launch, H03 student confirmation, H04 registration simplification, H05 privacy/data-flow review, H06 direct CRM request integration. Google access and verified GA4 ID, branch details/hours, Ads budget and approval remain pending. Do not treat code readiness as activation or delivery proof.

Validation evidence: 12-page checks passed after application changes. Contact layouts, ordering, hrefs and 44px touch targets checked in Arabic/English at 390px and 1365px; no actual WhatsApp messages sent. Last PageSpeed run is version 19: Performance 90, Accessibility 100, Best Practices 100; no fresh run for versions 20–23. Historical browser JSON belongs to the main audit batch. Current documentation-only update does not rerun those tests or publish a new site version.

## Publication compatibility

Windows source helper requires Git Bash on process PATH and TAR_OPTIONS=--force-local, plus a forward-slash absolute archive path. Open the existing Sites source before edits; package/push exact source and publish through native Sites tools. Credentials stay in memory/stdin. Preserve public audience, noindex and disabled forms. Main and wosol.net remain unchanged.

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

## Historical implementation log — superseded details remain historical

The sections below record earlier revisions. Use the current handoff above for deployed IDs and the final contact configuration. Later dated changes supersede earlier capacity labels and assets.

### Fleet categories — 2026-10-14
Added bilingual categories: small vehicles 4–7 passengers (white Yaris and RAV4 model images), small buses 11, mid-size buses 21, large buses 51. Sources: assets/fleet/cars/SOURCES.md. Shared template: scripts/fleet-experience.cjs. Public preview source: 98bd0a4711e90db554cb62975e7af21e4031b838; deployment appgdep_6acfc78058a48191910dcced17e2e10e succeeded. All 12 pages passed validation; live Arabic/English categories, four tabs, image loading and mobile overflow checked. User plans further additions.

### Vehicle branding — 2026-10-14
Small-vehicle category now displays 4 - 5 - 7 passengers as requested (category options, not per-model claims). Large buses are selected by default in Arabic and English. scripts/brand-assets.cjs builds SVG compositions with original photos and wordmark; all logo gold maps to #F1B654, black remains #111111. Native logo preserved. Header, footer and car doors use the same branding.

### Staria and service audience — 2026-10-14
Small-vehicle capacities use commas (4, 5, 7), small buses 9, 11. Added white Hyundai Staria with WOSOL door branding alongside Hiace; source documented in assets/fleet/cars/SOURCES.md. Expanded company service copy to institutions and authorities in Arabic and English, including forms, metadata and navigation. Preview source 292cd83e64a86d010561253363053f2c879f7922; deployment appgdep_6acfcd8bab308191aef35a59459ed642 succeeded. Checked 12 pages and desktop/mobile layout; large buses remain default.

### Centred door logos — 2026-10-14
Enlarged Yaris/RAV4 door logos about 44% and Staria 40%, retaining front-door centres. Removed visible model captions from all four cards in both languages; Hiace photo unchanged. Cards vertically centre images. Preview source 7cdae012aaee254b69479e882d826f250991b4c5, deployment appgdep_6acfcf2aba4c8191b9af200676a0e44e succeeded.

### Coverage and copy audit — 2026-10-14
Added Al Khobar, Buraydah, Rabigh, Al Qassim, Bisha and Umluj. Single-source content/coverage.json drives the 14-entry count and regional service descriptions in both languages. Label is destinations and service areas, not 14 independent cities: Al Qassim includes Buraydah and NEOM is a project. Fixed missed Arabic للشركات variants in footer, service titles, metadata and translation dictionary; expanded to institutions and authorities without duplicates. Audited all generated pages, six added names, counter and large-bus default. Public preview banner corrected in workspace prepare-wosol-preview.cjs; forms remain disabled. Source 49684f14a1b57843da1831c890057ca3c3461eb0; deployment appgdep_6acfd15e4adc8191aa7ccaa43943813c succeeded.
