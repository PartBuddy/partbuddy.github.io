import { loadReleases } from './lib/releases';

// Released = there is a published release of PartBuddy/partbuddy (src/lib/releases.ts).
// Without one: "Coming soon – follow along". With one: version, changelog, "Download for Windows"
// and the open-source / GPL-3.0 mentions.
export const releases = await loadReleases();
export const latest = releases[0];
export const RELEASED = releases.length > 0;

export const SITE_URL = 'https://partbuddy.github.io';
export const DOWNLOAD_URL = latest?.downloadUrl ?? 'https://github.com/PartBuddy/partbuddy/releases/latest';
