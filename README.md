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

Run `node scripts/build-pages.cjs` after editing shared content. The script generates the Arabic and English HTML, sitemap and runtime translations without installing dependencies. Marketing copy lives in the bilingual build source; existing form markup lives in `content/registration-form.html` and `content/contact-form.html`. Shared form strings and English translations live in the adjacent JSON files. Do not edit generated HTML directly.

`css/experience.css` defines the editorial presentation on top of the original styles. `assets/fleet/fleet-*.jpg` are original embedded photographs extracted from page 10 of the existing public company profile PDF; no generated fleet or customer claims were added.

Run `python scripts/check-pages.py` for route, asset, language and metadata checks. It uses only the Python standard library.

## Deployment and validation

Review the pull request before deploying through the existing cPanel process. `.cpanel.yml` copies the new pages; `.htaccess` provides clean URLs. A local static server must map these URLs to their corresponding HTML files.

Validated: all 12 pages' internal links/assets/anchors, unique IDs, one H1/canonical per page, hreflang, sitemap XML, English text and accessible form labels, JavaScript syntax, mobile navigation, English registration validation, and Riyadh corporate quote preselection. Blank registration validation was tested; no live forms were submitted.

After deployment, verify Apache redirects, English directory redirects, sitemap URLs and indexing in Google Search Console. Backend delivery and field performance remain separate checks. Business facts should be confirmed by the owner before publication; keyword search volumes were not measured and search ranking is not guaranteed.
