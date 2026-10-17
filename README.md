# WOSOL website

## Website audit and next improvements

- [Full Arabic technical, SEO and customer-journey audit — 14 October 2026](docs/audits/2026-10-14-website-seo-audit-ar.md)
- [Prioritized implementation checklist](docs/audits/2026-10-14-implementation-checklist-ar.md)
- [Selected improvements: completed work, deferred work and external dependencies](docs/audits/2026-10-14-selected-improvements-ar.md)

Status reconciled on 15 October 2026 against application commit `e3849c3` and public preview version 23. Documentation updates do not deploy production or complete deferred work.

The original audit preserves the initial findings. The selected-improvements record is the current source for implementation status; some items remain deferred or depend on account access and production launch.

Static Arabic/English website hosted on Apache/cPanel. Existing contact and registration integrations are retained.

## Pages

- `/`: university/corporate journeys, real fleet photography, service coverage and FAQs.
- `/king-abdulaziz-university-transport`: King Abdulaziz University student transport in Jeddah.
- `/employee-transport-jeddah`: employee transport in Jeddah.
- `/employee-transport-riyadh`: employee transport in Riyadh.
- `/corporate-transport-saudi-arabia`: corporate coverage and multi-city requirements.
- `/register`: student transport request form.

Each page has a server-rendered English counterpart under `/en/`, with reciprocal hreflang links and its own canonical URL. The old `/student-transport-jeddah` route permanently redirects to the KAU page on Apache.

## Editing and building

The 2026 presentation is defined in `scripts/home-experience.cjs`, `css/premium.css` and `js/experience.js`: service selection, corporate/university journeys, technology, ISO management systems, coverage and an accessible fleet category switcher. The new cover artwork was extracted from the supplied 2026 profile; the original profile is not offered for download.

Customer identities/logos, fleet totals and the administrative structure are intentionally excluded. The licence is `35/00001075`, explicitly confirmed by the owner. Published historical performance values are attributed to the 2025–2026 reporting period rather than presented as individual journey guarantees.

Run `node scripts/build-pages.cjs` after editing shared content. The script generates the Arabic and English HTML, sitemap and runtime translations without installing dependencies. Marketing copy lives in the bilingual build source; existing form markup lives in `content/registration-form.html` and `content/contact-form.html`. Shared form strings and English translations live in the adjacent JSON files. Do not edit generated HTML directly.

`css/experience.css` defines the editorial presentation on top of the original styles. `assets/fleet/fleet-*.jpg` are original embedded photographs extracted from page 10 of the existing public company profile PDF; no generated fleet or customer claims were added.

Run `python scripts/check-pages.py` for route, asset, language and metadata checks. It uses only the Python standard library.

Audit regression checks: `node --test scripts/check-measurement.cjs` uses Node's standard library. `node scripts/check-audit.cjs` requires Playwright, Chrome and the local static server at port 8765; `WOSOL_PLAYWRIGHT_MODULE` can point to a bundled Playwright installation. It intercepts all email submissions and sends no real customer data. `scripts/optimize-audit-assets.cjs` requires Sharp (`WOSOL_SHARP_MODULE` may supply its path). These tools preserve source photographs and branding.

## Deployment and validation

Review the pull request before deploying through the existing cPanel process. `.cpanel.yml` copies the new pages; `.htaccess` provides clean URLs. A local static server must map these URLs to their corresponding HTML files.

Validated: all 12 pages' internal links/assets/anchors, unique IDs, one H1/canonical per page, hreflang, sitemap XML, English text and accessible form labels, JavaScript syntax, mobile navigation, English registration validation, and Riyadh corporate quote preselection. Blank registration validation was tested; no live forms were submitted.

After deployment, verify Apache redirects, English directory redirects, sitemap URLs and indexing in Google Search Console. Backend delivery and field performance remain separate checks. Business facts should be confirmed by the owner before publication; keyword search volumes were not measured and search ranking is not guaranteed.

For the selected audit revision, all 12 static pages passed route/language/asset and exclusion checks. Local browser checks covered Arabic/English at mobile and desktop widths, mocked form acceptance and rejection, motion and large-bus default selection. The public preview disables submissions and indexing; production is unchanged. The cPanel deployment copies only approved website image directories and regulatory SVGs, excluding reference PDFs. Previously deployed files are not deleted automatically.

### Image quality
At the explicit request of the owner, fleet photos now use the previously AI-enhanced presentation images in assets/fleet/showcase, with responsive WebP variants, native aspect metadata and CSS height:auto. Display widths remain capped at 520px on desktop and 440px on mobile. Arabic/English captions identify AI enhancement and possible differences in fine details. Original reference photos remain unchanged. The hero and logo use native embedded assets from the approved profile.

Design preference: preserve natural photo proportions, avoid oversized or stretched media, and verify actual rendered image dimensions on mobile and desktop before delivery. The branded minibus now crosses a separate 38px full-width lane below the navigation from left to right, with curved gold livery, a pause control and reduced-motion support.


Rendered QA for the proportion fix: narrow viewport photo 244x162.54px; desktop homepage 520x346.40px; desktop university page 505.58x336.79px. Verified in the hosted preview using browser DOM measurements. Native aspect ratios are reserved during lazy loading to avoid layout shifts. Header minibus is 46x18px on mobile and 54x21px on desktop.

