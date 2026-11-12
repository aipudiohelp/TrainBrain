import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (path) => readFileSync(join(root, path), "utf8");
const html = read("index.html");
const js = read("js/site.js");
const css = read("css/styles.css");
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

check(/<!doctype html>/i.test(html), "HTML5 doctype is missing");
check(/<html lang="en">/.test(html), "English document language is missing");
check(!/[\u0600-\u06FF]/.test(html + js + css), "Arabic language content or controls remain in the site");
check(!/data-(?:en|ar|alt-en|alt-ar|label-en|label-ar)=/.test(html), "Bilingual data attributes remain");
check(!/langBtn|setLanguage|localStorage/.test(html + js), "Language-switching code remains");
check(/<main id="main-content">/.test(html), "Main landmark or skip-link target is missing");
check(/<title>[^<]+<\/title>/.test(html), "Page title is missing");
check(/<meta name="description" content="[^"]+">/.test(html), "Meta description is missing");
check(/<link rel="canonical" href="https:\/\//.test(html), "Canonical URL is missing");
check(/application\/ld\+json/.test(html), "Structured data is missing");
check(/ProfessionalService/.test(html) && /Organization/.test(html), "Organization or service schema is missing");
check(/id="experts"/.test(html) && /TrainBrain Expertise/.test(html), "Company expertise section is missing");
const expertiseSection = html.match(/<section class="experts"[\s\S]*?<\/section>/)?.[0] ?? "";
check(expertiseSection.length > 0 && !/<img\b/i.test(expertiseSection), "The company expertise section is missing or contains a personal image");
check(/id="founder"/.test(html) && /Ibrahim Hammouda/.test(html), "Founder section is missing");
check(!/Trainer Profile|PROFILE IN PREPARATION|Company logo/.test(html), "Generic trainer placeholders remain");

const emailOccurrences = [...html.matchAll(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)].map((match) => match[0].toLowerCase());
check(emailOccurrences.length > 0 && emailOccurrences.every((value) => value === "ibrahimhammouda1@gmail.com"), "Public contact email is not the approved company Gmail only");
check((html.match(/mailto:Ibrahimhammouda1@gmail\.com\?subject=Consultation%20Request/g) || []).length >= 2, "Header/footer consultation email actions are missing");
check(/mailto:Ibrahimhammouda1@gmail\.com\?subject=Training%20Request/.test(html), "Training email action is missing");
check((html.match(/class="btn btn-training" href="mailto:Ibrahimhammouda1@gmail\.com\?subject=Training%20Request"/g) || []).length >= 2, "Header/footer training email actions are missing");
check(/\.btn:not\(\.btn-training\)\{background:linear-gradient\(135deg,#D7192D,#B51225\);color:#fff\}/.test(css), "Consultation button is not using the red brand accent with white text");
check(/class="btn btn-training"/.test(html) && /\.btn-training\{[^}]*background:[^}]*#0878c9/s.test(css), "Training button does not use the TrainBrain blue accent");

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
check(ids.length === new Set(ids).size, "Duplicate HTML id attributes were found");
const idSet = new Set(ids);
for (const [, href] of html.matchAll(/\bhref="#([^"]+)"/g)) check(idSet.has(href), `Broken section link: #${href}`);
for (const [, path] of html.matchAll(/(?:src|href)="((?:assets|css|js)\/[^"]+)"/g)) check(existsSync(join(root, path)), `Missing local file: ${path}`);

check(/eastwestdialogue\.org\/ibrahim-hammouda\//.test(html), "Founder profile link is missing");
check(/aria-expanded/.test(html) && /Escape/.test(js), "Accessible responsive menu behavior is incomplete");
check(/Content-Security-Policy/.test(read("vercel.json")), "Vercel security header configuration is missing");
check(/prefers-reduced-motion/.test(css) && /:focus-visible/.test(css), "Keyboard focus or reduced-motion styling is missing");
check(!existsSync(join(root, "assets/trainer-profile.webp")), "An individual trainer profile image remains in the project");

const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
const sitemap = read("sitemap.xml");
const robots = read("robots.txt");
check(Boolean(canonical) && sitemap.includes(`<loc>${canonical}</loc>`), "Sitemap and canonical URL do not match");
check(Boolean(canonical) && robots.includes(`${canonical}sitemap.xml`), "robots.txt sitemap location does not match canonical base URL");
check(existsSync(join(root, "SEO.md")), "SEO handoff file is missing");

if (failures.length) {
  console.error(`Site checks failed (${failures.length}):\n- ${failures.join("\n- ")}`);
  process.exitCode = 1;
} else {
  console.log("Site checks passed: English-only HTML, TrainBrain expertise content, direct Gmail CTAs, SEO metadata/schema, internal links, assets, sitemap/robots, and Vercel headers.");
}
