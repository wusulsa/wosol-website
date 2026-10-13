# WOSOL website

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

## Deployment and validation

Review the pull request before deploying through the existing cPanel process. `.cpanel.yml` copies the new pages; `.htaccess` provides clean URLs. A local static server must map these URLs to their corresponding HTML files.

Validated: all 12 pages' internal links/assets/anchors, unique IDs, one H1/canonical per page, hreflang, sitemap XML, English text and accessible form labels, JavaScript syntax, mobile navigation, English registration validation, and Riyadh corporate quote preselection. Blank registration validation was tested; no live forms were submitted.

After deployment, verify Apache redirects, English directory redirects, sitemap URLs and indexing in Google Search Console. Backend delivery and field performance remain separate checks. Business facts should be confirmed by the owner before publication; keyword search volumes were not measured and search ranking is not guaranteed.

For the latest visual revision, static route/language/asset checks and exclusion checks passed. Automated visual verification was unavailable because the browser blocked access to the local error tab. The private preview deployment succeeded; review the rendered layout before merging. The cPanel deployment copies only approved website image directories and regulatory SVGs, excluding reference PDFs. Previously deployed files are not deleted automatically.

### Image quality
Fleet photos now use the unchanged native originals with their native width/height metadata and explicit CSS height:auto. Display widths are capped at 520px on desktop and 440px on mobile. Enlarged derivatives remain as archival assets, but are no longer used by page photo markup. No generative image edits are published. The hero and logo use native embedded assets from the approved profile.

Design preference: preserve natural photo proportions, avoid oversized or stretched media, and verify actual rendered image dimensions on mobile and desktop before delivery. The decorative branded minibus belongs next to the header logo, not in an oversized standalone fleet section. Its short arrival animation respects reduced-motion preferences.


Rendered QA for the proportion fix: narrow viewport photo 244x162.54px; desktop homepage 520x346.40px; desktop university page 505.58x336.79px. Verified in the hosted preview using browser DOM measurements. Native aspect ratios are reserved during lazy loading to avoid layout shifts. Header minibus is 46x18px on mobile and 54x21px on desktop.

