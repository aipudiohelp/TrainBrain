import { readFileSync, existsSync, readdirSync } from "node:fs";
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
check(/<html lang="en" dir="ltr">/.test(html), "English LTR document defaults are missing");
check(/<main id="main-content">/.test(html), "Main landmark or skip-link target is missing");
check(/<title>[^<]+<\/title>/.test(html), "Page title is missing");
check(/<meta name="description" content="[^"]+">/.test(html), "Meta description is missing");
check(/<link rel="canonical" href="https:\/\//.test(html), "Canonical URL is missing");
check(/application\/ld\+json/.test(html), "Structured data is missing");
check(/ProfessionalService/.test(html) && /Organization/.test(html), "Organization/ProfessionalService schema types are missing");
check(/id="founder"/.test(html) && /About the Founder/.test(html), "Founder section is missing");
check(!/Trainer Profile|PROFILE IN PREPARATION|Company logo/.test(html), "Generic trainer placeholders remain");
check(!/contact@trainbrain\.eg|executive@trainbrain\.eg|example\.com|your-email/i.test(html + "\n" + js), "A placeholder or old email address remains");

const emailOccurrences = [...html.matchAll(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)].map((match) => match[0].toLowerCase());
check(emailOccurrences.length > 0 && emailOccurrences.every((value) => value === "ibrahimhammouda1@gmail.com"), "Public email addresses do not resolve to the approved contact only");

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
check(ids.length === new Set(ids).size, "Duplicate HTML id attributes were found");
const idSet = new Set(ids);
for (const [, href] of html.matchAll(/\bhref="#([^"]+)"/g)) check(idSet.has(href), `Broken section link: #${href}`);

for (const [, path] of html.matchAll(/(?:src|href)="((?:assets|css|js)\/[^"]+)"/g)) {
  check(existsSync(join(root, path)), `Missing local file: ${path}`);
}

for (const paragraph of [
  "Ibrahim Hammouda is an international communications strategist and founder of TrainBrain for Consultation and Skills Development.",
  "Throughout his career, Ibrahim has served as a strategic link between international institutions, governance bodies, and corporate leaders—advising on trade infrastructure, cross-cultural diplomacy, and strategic positioning.",
  "One of the main pillars of inspiration behind this work is Mr. Shafik Gabr who has been a mentor, supporter and a role-model."
]) check(html.includes(paragraph), "A supplied founder-biography sentence has changed");

check(/eastwestdialogue\.org\/ibrahim-hammouda\//.test(html), "Founder profile link is missing");
check(/rel="noopener noreferrer"/.test(html), "External new-tab link is missing safe rel attributes");
check(/\.nodeValue\s*=/.test(js) && !/\.textContent\s*=/.test(js), "Language update must change text nodes without replacing container markup");
check(/aria-expanded/.test(html) && /Escape/.test(js), "Accessible responsive menu behavior is incomplete");
check(/document\.documentElement\.dir/.test(js) && /"ar" \? "rtl" : "ltr"/.test(js), "Language switching direction handling is missing");
check(/mailto:Ibrahimhammouda1@gmail\.com/.test(html), "Approved email mailto link is missing");

const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
const sitemap = read("sitemap.xml");
const robots = read("robots.txt");
check(Boolean(canonical) && sitemap.includes(`<loc>${canonical}</loc>`), "Sitemap and canonical URL do not match");
check(Boolean(canonical) && robots.includes(`${canonical}sitemap.xml`), "robots.txt sitemap location does not match canonical base URL");
check(/Content-Security-Policy/.test(read("vercel.json")), "Vercel security header configuration is missing");
check(css.includes("prefers-reduced-motion") && css.includes(":focus-visible"), "Keyboard focus or reduced-motion styling is missing");
check(readdirSync(join(root, "assets")).length >= 2, "Local logo and founder portrait assets are missing");

if (failures.length) {
  console.error(`Site checks failed (${failures.length}):\n- ${failures.join("\n- ")}`);
  process.exitCode = 1;
} else {
  console.log("Site checks passed: HTML structure, bilingual hooks, founder copy/link, contact email, local assets, internal anchors, metadata/schema, sitemap/robots, and Vercel headers.");
}
