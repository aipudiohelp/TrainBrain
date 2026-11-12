# TrainBrain website

Static, English-only TrainBrain website prepared for GitHub and Vercel. It uses local assets and has no build-time or runtime dependencies.

## Project files

```text
trainbrain-site/
├── assets/
│   ├── favicon.png
│   ├── ibrahim-hammouda.webp
│   └── trainbrain-logo.webp
├── css/
│   └── styles.css
├── js/
│   └── site.js
├── scripts/
│   └── check-site.mjs
├── .gitignore
├── index.html
├── robots.txt
├── SEO.md
├── sitemap.xml
├── vercel.json
└── README.md
```

## SEO handoff

See [SEO.md](SEO.md) for the current metadata, sitemap, schema, and post-deployment checklist.



## Before production launch

- **Confirm the production domain.** Canonical and structured-data URLs currently use `https://trainbrain.aipudio.online/`, the preview address shown in the supplied materials. I could not verify that host from this environment, and it may not be the final production domain. Replace the base URL consistently in `index.html`, `robots.txt`, and `sitemap.xml`, then redeploy.
- **Review company claims.** The anonymous expertise section uses approved professional background information. Confirm any company-specific outcome claims before publication.
- The founder biography remains in English as supplied.
- Only `Ibrahimhammouda1@gmail.com` is used as the public contact email. No phone number or personal address from the supplied materials is published.

## Check locally

With Node.js installed, run:

```powershell
node scripts/check-site.mjs
```

This is a static HTML, JavaScript, asset, email, schema, sitemap, English-only, and internal-link check. The project does not require a build step.

## Publish the project to GitHub

1. Create an empty repository at [github.com/new](https://github.com/new), for example `trainbrain-site`. Do not add a separate README, license, or `.gitignore`; this folder already contains its project files.
2. Open PowerShell in the extracted `trainbrain-site` folder and run these commands, replacing `YOUR_GITHUB_OWNER` with the account or organization that owns the repository:

```powershell
git init -b main
git add .
git commit -m "Prepare TrainBrain production website"
git remote add origin https://github.com/YOUR_GITHUB_OWNER/trainbrain-site.git
git push -u origin main
```

Git must be installed and authenticated to GitHub. Keep the repository free of the source CV and unrelated personal files. The repository contains only the approved company logo and founder portrait assets.

## Deploy on Vercel

1. Sign in at [vercel.com](https://vercel.com/), choose **Add New → Project**, and import the GitHub repository.
2. Set **Framework Preset** to **Other**. Set **Build Command** to blank and **Output Directory** to `.` (the repository root). Leave the root directory as `.`. This plain HTML/CSS/JS project has no build step.
3. Select **Deploy**. The `vercel.json` file adds the security response headers for deployments served by Vercel.
4. For later updates, commit and push to `main`; Vercel will deploy the connected branch.

## Connect a custom domain

1. In Vercel, open the project, choose **Settings → Domains**, and add the exact domain the client owns.
2. Follow the DNS records Vercel displays for that project. Add them at the domain registrar/DNS provider, then wait for Vercel to verify the domain and provision HTTPS. Do not reuse sample DNS values from another project.
3. If both the apex domain and `www` will be used, add both and choose one as the primary domain with a redirect.
4. Replace `https://trainbrain.aipudio.online/` throughout the canonical, Open Graph, JSON-LD, robots, and sitemap references in `index.html`, `robots.txt`, and `sitemap.xml` with the verified primary HTTPS URL. Commit and push the change.

See the official [Vercel static build settings](https://vercel.com/docs/builds/configure-a-build), [Vercel custom-domain guide](https://vercel.com/docs/domains/set-up-custom-domain), and [GitHub local project guide](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github).

## Verification limits

The bundled checks cover the project files, SEO metadata, and local links. They do not verify a deployment, DNS, mailbox delivery, search indexing, or provide a penetration test/external vulnerability scan. Recheck the deployed site, headers, canonical URL, sitemap, and contact links after the final domain is connected.
