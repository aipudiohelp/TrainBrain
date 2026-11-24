# TrainBrain SEO and discovery handoff

## Implemented

- Descriptive page title and description, one H1 and semantic page sections.
- English document language, accessible headings, image alt text and ordinary HTML links.
- A single canonical homepage, consistent Open Graph URL and logo image, Twitter summary metadata including the image.
- Organization, ProfessionalService and WebPage JSON-LD reflecting the visible company information. No invented qualifications, prices, reviews or availability.
- robots.txt allows crawling and references sitemap.xml. The sitemap contains the canonical homepage only. Anchor sections are not separate pages.
- llms.txt provides a concise factual discovery summary and links to visible sections. This is optional and is not a guarantee of indexing or AI citations.
- No keyword stuffing, hidden promotional content, external fonts or analytics trackers.

## Domain

The current canonical is https://trainbrain-eg.com/, selected by the user for the standalone client website. The domain is not purchased yet. This delivery only configures the files; it does not register the domain, connect DNS, verify ownership or deploy the site. All machine-facing origins now use this production name, not the previous preview subdomain.

If the final domain name changes, rerun:

```sh
node scripts/set-domain.mjs https://YOUR-ACTUAL-DOMAIN/
node scripts/check-site.mjs
```

Replace the illustrative domain with the final HTTPS origin. This updates index.html, robots.txt, sitemap.xml and llms.txt, including social image URLs and JSON-LD IDs, and refreshes the exact JSON-LD hash allowed by the Content Security Policy. The hash must stay synchronized whenever that block changes.

## After deployment

- Verify HTTPS, canonical redirects, robots, sitemap, social preview and security response headers on the actual host.
- Submit the sitemap using the owner's search-console accounts.
- Validate structured data and check that visible content matches any search snippets.
- Ask the client to sign off retained business/qualification claims. Implementation review does not independently verify those claims.
- No ranking, rich result or AI-citation outcome is promised.
