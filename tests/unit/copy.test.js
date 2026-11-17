// Copy check (CLAUDE.md hard rule 1, Definition of done).
// Every string in content/homepage.json must appear verbatim in docs/spec.md.
// Only whitespace is normalised on both sides. On the spec side, pandoc Markdown
// escapes are also removed (decision D-021): `\|` -> `|`, `\[` -> `[`, `\]` -> `]`,
// and a trailing `\` hard line break -> a space. Nothing else is altered: case,
// punctuation, apostrophes, ® and ™ marks must match exactly.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (rel) => readFileSync(new URL(`../../${rel}`, import.meta.url), 'utf8');

const collapse = (s) => s.replace(/\s+/g, ' ').trim();

export function normaliseSpec(md) {
  return collapse(
    md
      .replace(/\\\r?\n/g, ' ')
      .replace(/\\\|/g, '|')
      .replace(/\\\[/g, '[')
      .replace(/\\\]/g, ']'),
  );
}

// Every string leaf with its JSON path. Booleans, numbers and nulls are flags, not copy.
function stringLeaves(value, path = []) {
  if (typeof value === 'string') return [[path.join('.'), value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => stringLeaves(v, [...path, i]));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => stringLeaves(v, [...path, k]));
  }
  return [];
}

const spec = normaliseSpec(read('docs/spec.md'));
const homepage = JSON.parse(read('content/homepage.json'));
const leaves = stringLeaves(homepage);

describe('content/homepage.json is verbatim spec copy', () => {
  it('contains copy to check', () => {
    expect(leaves.length).toBeGreaterThan(100);
  });

  it.each(leaves)('%s', (_path, text) => {
    expect(text.trim().length).toBeGreaterThan(0);
    expect(spec.includes(collapse(text)), `not found verbatim in docs/spec.md: "${text}"`).toBe(
      true,
    );
  });

  it('every one of sections 1 to 14 is present', () => {
    const sections = new Set(
      Object.values(homepage)
        .map((s) => s.section)
        .filter(Number.isInteger),
    );
    for (let n = 1; n <= 14; n += 1) expect(sections.has(n), `section ${n}`).toBe(true);
  });
});

describe('the copy check itself', () => {
  it('rejects altered copy (punctuation, case, marks)', () => {
    for (const altered of [
      "Change Doesn't Set You Apart. How You Lead It Does!",
      'change doesn’t set you apart.',
      'HCMBOK training through an authorised HUCMI training partner',
      'Founder, WinningThruChange® \\| OCM Trainer',
    ]) {
      expect(spec.includes(collapse(altered)), altered).toBe(false);
    }
  });

  it('removes pandoc escapes from the spec', () => {
    expect(normaliseSpec('a \\| b')).toBe('a | b');
    expect(normaliseSpec('line one\\\nline two')).toBe('line one line two');
    expect(normaliseSpec('\\[1\\]')).toBe('[1]');
  });
});
