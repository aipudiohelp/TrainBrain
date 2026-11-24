# TrainBrain final handoff

Prepared 24 November 2026. Static, English-only HTML/CSS/JavaScript. No build step, runtime packages, database, analytics tracker or contact-form backend.

## Client edits

- Reduced Ibrahim's portrait to a maximum 300px on desktop and 240-260px on mobile, preserving its crop and caption.
- Kept the original single "View Ibrahim's Profile" button, text, attributes and external destination. No extra profile or social links.
- Moved Learning & Coaching to the beginning of the expertise area. Training approach is a standalone subheading directly below its title, followed by the original approach paragraph and remaining credentials. The homepage hero is unchanged in content.
- Updated the corporate-training introduction to: "Our trainers bring approximately 25 years of professional marketing and business experience, alongside university-level instruction, executive coaching and startup mentoring."
- Improved font sizes, line height, text contrast, button contrast and small-screen layout throughout. System fonts stay local, so there is no external font dependency.
- Added 14 context-specific enquiry buttons, one per Training & Facilitation Expertise and Selected Training Topics card. They open the visitor's email app, addressed to the existing company contact, with the chosen subject. They do not send automatically or create a booking.
- Made Selected Training Topics card titles dark red.
- Removed the ACC / International Coaching Federation 2025 credential bullet.
- Removed all four stats cards from the corporate-training introduction.

## Review fixes

- Fixed the source's blank dynamic copyright year.
- Retained security headers in vercel.json. Added an exact SHA-256 permission for the inline JSON-LD block without allowing arbitrary inline scripts. Domain changes must refresh this hash, which the supplied script handles.
- Corrected the service schema's organization relationship and added WebPage structured data using only content already on the page. Added Twitter image metadata.
- Added llms.txt as a plain-text discovery aid based on the visible page. It does not guarantee search indexing, AI visibility or citations.
- Excluded the unreferenced personal portfolio asset assets/may-gad-portfolio.webp from the deployment package. It contained identifiable trainer information and the removed ACC claim. The source archive is not changed. All assets actually used by the website remain.
- Expanded the bundled checker to cover the requested removals, 14 buttons, block order, unchanged single-profile scope, schema JSON, CSP hash and domain consistency.

## Verification

- Existing and expanded checks: `node scripts/check-site.mjs`.
- JavaScript syntax: `node --check js/site.js` and the maintenance scripts.
- Browser checks using local HTTP with the actual Vercel security headers at 320, 390, 768, 1024, 1280 and 1440px.
- No horizontal overflow or JavaScript/HTTP/CSP errors in the final browser pass.
- Responsive menu open, Escape close, and navigation-link close tested.
- All 14 enquiry-button subjects checked against their card titles. Email links were inspected, not sent.
- Automated WCAG A/AA checks found no violations at these six widths. This is not a full manual accessibility certification.
- Desktop and mobile screenshots include the complete page plus detailed captures. Screenshots were inspected for portrait proportions, spacing, headings, card buttons and readability.

## Required before the real launch

1. The canonical, social metadata, schema, robots, sitemap and llms.txt now use the user-selected standalone origin https://trainbrain-eg.com/. The domain is not purchased yet. No registration, DNS changes, ownership verification or deployment was performed.
2. If the final domain name changes, rerun `node scripts/set-domain.mjs https://YOUR-ACTUAL-DOMAIN/`, then `node scripts/check-site.mjs`. The command is repeatable, including with the current https://trainbrain-eg.com/ origin. Use the real selected domain, not the illustrative text. The script updates the four machine-facing files and refreshes the CSP hash together.
3. Deploy the contents of this folder with index.html at the site root. On Vercel, choose framework Other, no build command, and output directory `.`. vercel.json headers apply on Vercel only; an alternate host must configure equivalent headers.
4. After deployment, test HTTPS, redirects, security response headers, the profile link, mailbox handling, canonical, robots, sitemap and social preview. Submit the sitemap through the owner's search-console accounts if desired.
5. The client should sign off the retained biography, corporate claims and remaining credentials before publication. This delivery checks implementation, not independent verification of professional qualifications.

The review is a static-source and local-browser review, not a penetration test, DNS check, mailbox-delivery test or guarantee of search performance. Full source and checks are included for later revisions.
