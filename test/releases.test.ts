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

test("the hand-written What's new becomes headline, items and shot, and stays out of the change lists", () => {
  const body = "Intro.\n\n## What's new\n\n<!-- shot: logos -->\n- **Place SVG logos** on any face.\n- Drag them along an axis.\n\n---\n\n## [0.2.0](u) (2026-11-09)\n\n### Features\n\n* **desktop:** svg logos";
  const [r] = parseReleases([{ tag_name: 'v0.2.0', published_at: '2026-11-09T00:00:00Z', html_url: 'u', body }]);
  assert.deepEqual(r.news, { headline: 'Place SVG logos', items: ['Place SVG logos on any face.', 'Drag them along an axis.'], shot: 'logos' });
  assert.deepEqual(r.sections, [{ title: 'Features', items: ['desktop: svg logos'] }]);
  const [old] = parseReleases([{ tag_name: 'v0.1.0', published_at: '2026-11-08T00:00:00Z', html_url: 'u', body: '### Features\n\n* x' }]);
  assert.equal(old.news, undefined);
});

test('an empty list means not released', () => {
  assert.deepEqual(parseReleases([]), []);
});

test('breaking changes stay off the site', () => {
  const [r] = parseReleases([{ tag_name: 'v1.0.0', published_at: '2026-11-08T00:00:00Z', html_url: 'u', body: '### ⚠ BREAKING CHANGES\n\n* **desktop:** removed X\n\n### Features\n\n* **desktop:** added Y' }]);
  assert.deepEqual(r.sections, [{ title: 'Features', items: ['desktop: added Y'] }]);
});

test('the site leaves out docs, CI and prototype work', () => {
  const body = '### Features\n\n* **desktop:** added Y\n* **prototype:** dummy\n\n### Documentation\n\n* add README\n\n### Continuous Integration\n\n* add workflows';
  const [r] = parseReleases([{ tag_name: 'v1.0.0', published_at: '2026-11-08T00:00:00Z', html_url: 'u', body }]);
  assert.deepEqual(r.sections, [{ title: 'Features', items: ['desktop: added Y'] }]);
});
