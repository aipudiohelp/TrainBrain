import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
const root = fileURLToPath(new URL('../', import.meta.url));
const read = p => readFileSync(root + p, 'utf8');
const write = (p, value) => writeFileSync(root + p, value);
const current = read('index.html').match(/<link rel="canonical" href="([^"]+)"/)?.[1];
let target;
try {
  target = new URL(process.argv[2]);
  if (target.protocol !== 'https:' || target.username || target.password || target.pathname !== '/' || target.search || target.hash) throw new Error();
} catch {
  console.error('Use: node scripts/set-domain.mjs https://your-owned-domain.example/\nSupply only the final HTTPS origin, with no path, query, or fragment.');
  process.exit(1);
}
if (!current) throw new Error('Cannot locate current canonical URL. No changes made.');
const next = target.href;
for (const file of ['index.html', 'robots.txt', 'sitemap.xml', 'llms.txt']) {
  write(file, read(file).split(current).join(next));
}
const html = read('index.html');
const inline = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
if (!inline) throw new Error('Structured data is missing.');
const hash = createHash('sha256').update(inline).digest('base64');
const config = JSON.parse(read('vercel.json'));
for (const rule of config.headers) for (const header of rule.headers) {
  if (header.key === 'Content-Security-Policy') {
    header.value = header.value.replace(/script-src [^;]+/, `script-src 'self' 'sha256-${hash}'`);
  }
}
write('vercel.json', JSON.stringify(config, null, 2) + '\n');
console.log(`Updated canonical, social metadata, schema, sitemap, robots and llms.txt to ${next}. CSP hash refreshed. Run node scripts/check-site.mjs before deploying.`);
