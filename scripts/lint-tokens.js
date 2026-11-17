// Token lint (CLAUDE.md hard rule 4).
// Fails if a hex colour literal appears anywhere under src/ except:
//   - src/styles/tokens.css  (the only place colours are declared)
//   - the logo SVG           (the only place #FF4500 may appear)
// Also fails if #FF4500 appears anywhere outside the logo SVG, including tokens.css.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const srcDir = join(root, 'src');

const TOKENS_FILE = ['src', 'styles', 'tokens.css'].join(sep);
const isLogoSvg = (rel) => /logo[^/\\]*\.svg$/i.test(rel);
const SCANNED = /\.(css|js|mjs|njk|html|svg|json)$/i;
// 3, 4, 6 or 8 hex digits, not part of a longer word (avoids matching ids like #enquiry).
const HEX = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![0-9a-zA-Z_-])/g;
const LOGO_ORANGE = /#ff4500(?![0-9a-zA-Z_-])/gi;

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const problems = [];
for (const file of walk(srcDir)) {
  const rel = relative(root, file);
  if (!SCANNED.test(rel)) continue;
  const lines = readFileSync(file, 'utf8').split(/\r?\n/);
  lines.forEach((line, i) => {
    if (!isLogoSvg(rel)) {
      for (const m of line.matchAll(LOGO_ORANGE)) {
        problems.push(`${rel}:${i + 1}: ${m[0]} is reserved for the logo asset`);
      }
    }
    if (rel === TOKENS_FILE || isLogoSvg(rel)) return;
    for (const m of line.matchAll(HEX)) {
      if (/^#ff4500$/i.test(m[0])) continue; // already reported above
      problems.push(`${rel}:${i + 1}: hex colour ${m[0]} outside tokens.css`);
    }
  });
}

if (problems.length) {
  console.error(`lint:tokens failed with ${problems.length} problem(s):`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log('lint:tokens: no hex colours outside src/styles/tokens.css and the logo SVG.');
