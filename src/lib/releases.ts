// Release data, fetched once at build time (visitors make no requests). Only used when RELEASED is true.
import { RELEASED } from '../config';

export type Release = { version: string; date: string; url: string; notes: string[] };

const API = 'https://api.github.com/repos/PartBuddy/partbuddy/releases?per_page=3';

export async function getReleases(): Promise<Release[]> {
  if (!RELEASED) return [];
  try {
    const headers: Record<string, string> = { Accept: 'application/vnd.github+json', 'User-Agent': 'partbuddy-web-build' };
    const token = (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env.GITHUB_TOKEN;
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetch(API, { headers });
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const list = (await res.json()) as { tag_name: string; published_at: string; html_url: string; body: string | null; draft: boolean; prerelease: boolean }[];
    return list
      .filter((r) => !r.draft && !r.prerelease)
      .map((r) => ({
        version: r.tag_name.replace(/^v/, ''),
        date: new Date(r.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        url: r.html_url,
        // First bullet lines of the release notes, without Markdown markup.
        notes: (r.body ?? '')
          .split(/\r?\n/)
          .filter((l) => /^\s*[-*]\s+/.test(l))
          .map((l) => l.replace(/^\s*[-*]\s+/, '').replace(/\*\*|`|\[([^\]]+)\]\([^)]+\)/g, '$1').trim())
          .slice(0, 4),
      }));
  } catch (e) {
    // The page still builds; the download button links to the latest release either way.
    console.warn(`[releases] could not load release data: ${(e as Error).message}`);
    return [];
  }
}
