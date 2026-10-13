# WOSOL website

Static Arabic/English website hosted on Apache/cPanel. Existing contact and registration integrations are retained.

## Pages

- `/`: service overview, separate student/corporate journeys, and FAQs.
- `/student-transport-jeddah`: university transport and registration guidance.
- `/employee-transport-jeddah`: employee transport and quote requirements.
- `/register`: student transport request form.

Translations live in `js/i18n.js`. Presentation improvements are in `css/experience.css`, extending the existing styles.

## Deployment and validation

Review the pull request before deploying through the existing cPanel process. `.cpanel.yml` copies the new pages; `.htaccess` provides clean URLs. A local static server must map these URLs to their corresponding HTML files.

Validated: internal links and anchors, unique IDs, one H1/canonical per page, sitemap XML, Arabic/English translation coverage, JavaScript syntax, mobile layout, English navigation, corporate quote preselection and FAQ expansion. No live forms were submitted.

After deployment, verify Apache redirects, sitemap URLs and indexing in Google Search Console. Backend delivery and field performance remain separate checks. Business facts and certifications should be confirmed by the owner before publication; search ranking is not guaranteed.
