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
