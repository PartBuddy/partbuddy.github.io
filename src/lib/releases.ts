// Release data of PartBuddy/partbuddy, read once at build time (visitors make no requests).
// Order: PARTBUDDY_RELEASES_FIXTURE (a JSON file, for tests) → GitHub API → the snapshot in
// src/data/releases.json, which the app's site-sync workflow keeps current. So the site builds
// without network or token and then shows the last known state, or "Coming soon" if there is none.
import { readFile } from 'node:fs/promises';

// The fields of a GitHub API release that are used; the snapshot stores exactly these.
export type RawRelease = {
  tag_name: string;
  published_at: string;
  html_url: string;
  body: string | null;
  draft?: boolean;
  prerelease?: boolean;
  assets?: { name: string; browser_download_url: string }[];
};
export type Section = { title: string; items: string[] };
// The user-facing highlights of a release: the "## What's new" section its author writes by hand.
export type News = { headline: string; items: { title: string; text: string }[]; shot?: string };
export type Release = { version: string; date: string; dateLabel: string; url: string; downloadUrl: string; sections: Section[]; news?: News };

// The site shows only what is in the app: no breaking-change notes, docs, CI or build work, no
// entries of the prototype, runner or site.
const SHOWN_SECTIONS = new Set(['Changes', 'Features', 'Bug Fixes', 'Performance']);
const NOT_APP = /^(prototype|clickdummy|runner|ci|site|docs|build): /;

const API = 'https://api.github.com/repos/PartBuddy/partbuddy/releases?per_page=30';
const SNAPSHOT = 'src/data/releases.json';

// A bullet of release-please notes, e.g. "**desktop:** chat polish ([#151](…)) ([6a07faf](…))", as plain text.
const clean = (s: string) =>
  s
    .replace(/\s*\(\[[^\]]+\]\([^)]+\)\)/g, '') // trailing (#PR) and (commit) links
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+):\*\*\s*/, '$1: ')
    .replace(/\*\*|`/g, '')
    .trim();

// "## What's new" up to the next heading or "---": its bullets split into the bold start and the rest
// ("- **Place SVG logos:** on any face." → "Place SVG logos" + "on any face."), the first title as the
// headline, and an optional "<!-- shot: name -->" naming a picture in src/assets/shots.
export function parseNews(body: string | null): News | undefined {
  const items: News['items'] = [];
  let shot: string | undefined;
  let inside = false;
  for (const line of (body ?? '').split(/\r?\n/)) {
    if (/^#{1,6}\s|^---/.test(line)) inside = /^##\s+What's new\s*$/i.test(line);
    else if (inside) {
      shot ??= /<!--\s*shot:\s*([\w-]+)\s*-->/.exec(line)?.[1];
      const bullet = /^\s*[-*]\s+(.+)/.exec(line)?.[1];
      if (!bullet) continue;
      const bold = /^\*\*([^*]+)\*\*(.*)/.exec(bullet);
      items.push(bold ? { title: bold[1].replace(/[:.]\s*$/, '').trim(), text: clean(bold[2].replace(/^\s*:/, '')).replace(/^\p{Ll}/u, (c) => c.toUpperCase()) } : { title: '', text: clean(bullet) });
    }
  }
  const headline = items[0]?.title || items[0]?.text || '';
  return items.length ? { headline, items, shot } : undefined;
}

// "### Features" starts a section; "## " titles (release-please's "## [0.2.0](…) (date)", "## What's
// new") start sections that are not shown, so their bullets stay out of the change lists.
export function parseNotes(body: string | null): Section[] {
  const sections: Section[] = [];
  let current: Section = { title: 'Changes', items: [] };
  for (const line of (body ?? '').split(/\r?\n/)) {
    const heading = /^#{2,3}\s+(.+)/.exec(line);
    const bullet = /^\s*[-*]\s+(.+)/.exec(line);
    if (heading) {
      if (current.items.length) sections.push(current);
      current = { title: heading[1].trim(), items: [] };
    } else if (bullet) {
      const text = clean(bullet[1]);
      if (text) current.items.push(text);
    }
  }
  if (current.items.length) sections.push(current);
  return sections
    .filter((s) => SHOWN_SECTIONS.has(s.title))
    .map((s) => ({ ...s, items: s.items.filter((t) => !NOT_APP.test(t)) }))
    .filter((s) => s.items.length);
}

export function parseReleases(raw: RawRelease[]): Release[] {
  return raw
    .filter((r) => !r.draft && !r.prerelease && r.published_at)
    .sort((a, b) => b.published_at.localeCompare(a.published_at))
    .map((r) => ({
      version: r.tag_name.replace(/^v/, ''),
      date: r.published_at.slice(0, 10),
      dateLabel: new Date(r.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }),
      url: r.html_url,
      // The Windows installer if the release has one, else the release page.
      downloadUrl: r.assets?.find((a) => /\.exe$/i.test(a.name))?.browser_download_url ?? r.html_url,
      sections: parseNotes(r.body),
      news: parseNews(r.body),
    }));
}

const env = process.env;
const readJson = async (path: string) => JSON.parse(await readFile(path, 'utf8')) as RawRelease[];

export async function loadReleases(): Promise<Release[]> {
  if (env.PARTBUDDY_RELEASES_FIXTURE) {
    console.info(`[releases] fixture ${env.PARTBUDDY_RELEASES_FIXTURE}`);
    return parseReleases(await readJson(env.PARTBUDDY_RELEASES_FIXTURE));
  }
  try {
    const headers: Record<string, string> = { Accept: 'application/vnd.github+json', 'User-Agent': 'partbuddy-web-build' };
    // The app repository is private until the first release, so the API needs a token until then.
    const token = env.PARTBUDDY_RELEASES_TOKEN || env.GITHUB_TOKEN;
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetch(API, { headers, signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`GitHub API ${res.status}${token ? '' : ' (no token)'}`);
    const releases = parseReleases((await res.json()) as RawRelease[]);
    console.info(`[releases] ${releases.length} from the GitHub API`);
    return releases;
  } catch (e) {
    const releases = parseReleases(await readJson(SNAPSHOT));
    console.warn(`[releases] ${(e as Error).message}; using the snapshot (${releases.length} releases)`);
    return releases;
  }
}
