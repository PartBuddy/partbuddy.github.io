// node --test test/releases.test.ts
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { parseReleases, type RawRelease } from '../src/lib/releases.ts';

test('release-please notes become versions, sections and a download link', async () => {
  const raw = JSON.parse(await readFile('test/fixtures/releases.json', 'utf8')) as RawRelease[];
  const [latest, older, ...rest] = parseReleases(raw);
  assert.equal(rest.length, 0, 'prereleases are left out');
  assert.equal(latest.version, '0.2.0');
  assert.equal(latest.date, '2026-12-01');
  assert.equal(latest.dateLabel, '1 Dec 2026');
  assert.match(latest.downloadUrl, /PartBuddy-Setup-0\.2\.0\.exe$/);
  assert.deepEqual(latest.sections, [
    { title: 'Features', items: ['desktop: sharing package lists the standard parts to buy', 'assistant chat polish with Markdown'] },
    { title: 'Bug Fixes', items: ['desktop: expired sign-in is shown in the chat'] },
  ]);
  assert.equal(older.downloadUrl, older.url, 'without an installer the button opens the release page');
});

test('an empty list means not released', () => {
  assert.deepEqual(parseReleases([]), []);
});

test('breaking changes stay off the site', () => {
  const [r] = parseReleases([{ tag_name: 'v1.0.0', published_at: '2026-11-08T00:00:00Z', html_url: 'u', body: '### ⚠ BREAKING CHANGES\n\n* **desktop:** removed X\n\n### Features\n\n* **desktop:** added Y' }]);
  assert.deepEqual(r.sections, [{ title: 'Features', items: ['desktop: added Y'] }]);
});

test('the site leaves out docs, CI, prototype work and features removed before the release', async () => {
  const raw = JSON.parse(await readFile('src/data/releases.json', 'utf8')) as RawRelease[];
  const hidden = JSON.parse(await readFile('src/data/changelog-hidden.json', 'utf8')).items as string[];
  // Every hidden entry must match a real note, or a typo would let it through.
  const all = raw.flatMap((r) => (r.body ?? '').split('\n')).join('\n');
  for (const h of hidden) assert.ok(all.includes(h.replace(/^\w[\w-]*: /, '').split(' (')[0]), h);
  const items = parseReleases(raw).flatMap((r) => r.sections.flatMap((s) => s.items));
  for (const h of hidden) assert.ok(!items.includes(h), h);
  assert.ok(!items.some((t) => /^(prototype|runner|ci|site|clickdummy): /.test(t)));
  assert.ok(items.includes('desktop: logo block from an SVG file (F1)'));
});
