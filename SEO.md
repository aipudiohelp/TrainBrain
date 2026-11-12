# TrainBrain SEO setup

This is the SEO handoff for the English-only static website. Technical SEO lives in `index.html`, `robots.txt`, and `sitemap.xml`; the page remains crawlable without client-side language switching.

## Current page metadata

- **Title:** TrainBrain | Corporate Training & Executive Consultancy
- **Description:** Corporate training and executive consultancy in leadership, marketing strategy, communication and skills development for financial and corporate teams.
- **Canonical:** `https://trainbrain.aipudio.online/`
- **Open Graph:** English title/description and the local TrainBrain brand image.
- **Robots:** `index, follow`; `robots.txt` allows public crawling and points to the sitemap.
- **Sitemap:** one canonical homepage URL in `sitemap.xml`.
- **Structured data:** `Organization`, `ProfessionalService`, and `Person` (Ibrahim Hammouda and May Gad where appropriate). The structured data does not include personal phone numbers or May's email.

## Before launch

1. Confirm the permanent production domain. The current preview host could not be verified in this environment. Update the canonical URL, Open Graph URL/image, all JSON-LD URLs and IDs, `robots.txt`, and `sitemap.xml` together.
2. After the domain resolves, verify the homepage, `/robots.txt`, and `/sitemap.xml` over HTTPS.
3. Add the verified domain to Google Search Console and Bing Webmaster Tools, then submit the sitemap.
4. Validate the structured data and review search snippets after deployment.
5. Keep the page title, description, headings, image alt text, and visible service copy aligned with the approved company offering. Do not add claims that are not in the approved materials.

## Content topics present on the page

Corporate training, executive communication, leadership development, marketing strategy, brand positioning, market research, commercial growth, startup mentoring, financial-sector consultancy, and workforce skills development.

No keyword meta tag, analytics tracker, or third-party font is used. This keeps the page lightweight and avoids publishing unverifiable contact or performance claims.
