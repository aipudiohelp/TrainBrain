# TrainBrain website

Static, English-only TrainBrain client website. No build step or runtime dependencies. See [DELIVERY.md](DELIVERY.md) for the complete change list, verification scope and launch checklist.

## Local check

With Node.js installed:

```sh
node scripts/check-site.mjs
```

To preview, serve this folder with any static HTTP server and open its local address. Opening index.html directly is also possible, but HTTP is preferable for testing.

## Files

- index.html: single-page content, metadata and structured data.
- css/styles.css: responsive layout and accessible brand colours.
- js/site.js: navigation menu and copyright year.
- assets/: logo, favicon and founder portrait.
- robots.txt, sitemap.xml, llms.txt: crawler and discovery information.
- vercel.json: Vercel security-response headers.
- scripts/check-site.mjs: source and metadata regression checks.
- scripts/set-domain.mjs: coordinated final-domain update and CSP hash refresh.
- SEO.md: search/discovery handoff.
- DELIVERY.md: edits, review results and launch limits.

## Set the final domain

The site is configured for the user-selected production origin https://trainbrain-eg.com/. The domain is not purchased yet; no DNS connection, ownership verification or deployment has been performed. If the final name changes, rerun the following with the new actual HTTPS origin, then rerun checks:

```sh
node scripts/set-domain.mjs https://YOUR-ACTUAL-DOMAIN/
node scripts/check-site.mjs
```

Do not use the illustrative domain text literally. The script updates canonical, social metadata, schema, sitemap, robots and llms.txt together. It also refreshes the security policy's exact structured-data hash. If editing the JSON-LD manually, rerun this script with the current canonical origin before deploying.

## Deployment

Deploy this folder's contents with index.html at the root. For Vercel use Framework Preset Other, no build command, output directory `.`. Import your own repository if desired. No deployment was performed as part of this delivery.

Configure the owned domain and DNS using the host's actual project-specific instructions. Never copy DNS values from an unrelated project. If using another host, configure the equivalent response headers yourself; vercel.json only applies on Vercel.

## Contact actions

All enquiry buttons open the visitor's email app to the existing company contact. Card buttons include the selected subject. They do not send automatically. No form processing, payment, reservation or email-delivery service is included.

## Source hygiene

Only assets used by the site are included, along with the source's legacy root logo. An unused personal portfolio image has been excluded to avoid exposing private or removed profile material. No credentials, tracking, source CV or backend configuration are required.

## Final checks after launch

Verify HTTPS, primary-domain redirects, metadata, security headers, sitemap, robots, mobile navigation, profile destination, social previews and contact links. Confirm company copy and qualifications with the client. See DELIVERY.md for the limits of local testing.
