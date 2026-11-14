import { loadReleases } from './lib/releases';

// Released = there is a published release of PartBuddy/partbuddy (src/lib/releases.ts).
// Without one: "Coming soon – follow along". With one: version, changelog, "Download for Windows"
// and the open-source / GPL-3.0 mentions.
export const releases = await loadReleases();
export const latest = releases[0];
export const RELEASED = releases.length > 0;

export const SITE_URL = 'https://partbuddy.github.io';
// Own GoatCounter instance (LXC 102 on pve-n100, through the Cloudflare tunnel); empty means no counting.
export const GOATCOUNTER_URL = 'https://stats.mstaggl.me';
export const DOWNLOAD_URL = latest?.downloadUrl ?? 'https://github.com/PartBuddy/partbuddy/releases/latest';

export const MAC_URL = latest?.macUrl;

export const REPO_URL = 'https://github.com/PartBuddy/partbuddy';
// Star count, read once at build time like the releases (visitors make no requests); without network
// the star links show no number. The daily scheduled deploy keeps it current.
export const STARS: number | undefined = await fetch('https://api.github.com/repos/PartBuddy/partbuddy', {
  headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'partbuddy-web-build' },
  signal: AbortSignal.timeout(8000),
})
  .then(async (res) => {
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const n = ((await res.json()) as { stargazers_count: number }).stargazers_count;
    console.info(`[stars] ${n}`);
    return n;
  })
  .catch((e) => {
    console.warn(`[stars] ${(e as Error).message}; no star count`);
    return undefined;
  });
