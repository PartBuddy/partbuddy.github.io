// Thin adapter. The product facts (features, models, roadmap) live in the app repository as
// site/site-content.json and arrive here as src/data/site-content.json through the sync pull
// request of its site-sync workflow. Edit them there, not here. The type below makes
// `astro check` fail when the synced file is missing a field.
import content from './site-content.json';

type Titled = { title: string; text: string };
type SiteContent = {
  worksWith: string[];
  chapters: { kicker: string; title: string; text: string; points: string[]; shot: string; alt: string }[];
  standards: {
    fasteners: string[][];
    inserts: string[][];
    insertNote: string;
    fits: { material: string; overhang: string; fits: string[] }[];
    supportFree: string[];
    checks: string[];
  };
  bento: { title: string; text: string; shot: string; alt: string; size?: string }[];
  privacy: Titled[];
  models: { local: string[]; localNote: string };
  roadmap: { today: string[]; next: string[]; later: string[] };
};
const c: SiteContent = content;

export const { worksWith, chapters, standards, bento, models, roadmap } = c;
// The app's privacy facts plus one about this website.
export const privacy: Titled[] = [...c.privacy, { title: 'No cookies here either', text: 'This website sets no cookies. It only counts visits anonymously, on the maker’s own server.' }];

// Website-only content: positioning, not product facts.
export const hero = {
  title: ['Parts that fit.', 'First print.'],
  kicker: 'CAD that asks before it builds',
  sub: 'Describe the part you need. PartBuddy asks what matters, builds real, editable CAD while you watch, and checks it against your printer before you slice.',
  fine: 'Free · For Windows · Your Claude or ChatGPT plan, or a local model',
};
export const channels = [
  { name: 'YouTube', handle: '@PartBuddy', url: 'https://www.youtube.com/@PartBuddy' },
  { name: 'TikTok', handle: '@partbuddy', url: 'https://www.tiktok.com/@partbuddy' },
  { name: 'Instagram', handle: '@partbuddyapp', url: 'https://www.instagram.com/partbuddyapp/' },
  { name: 'Bluesky', handle: 'partbuddy.bsky.social', url: 'https://bsky.app/profile/partbuddy.bsky.social' },
];

export const KOFI_URL = 'https://ko-fi.com/partbuddy';
// The SolidCraft version the app is developed against, read at build time from RECOMMENDED_VERSION in the
// app's engineVersion.ts on main, so the site never names an outdated one; offline the last known value.
// Link the tag itself: SolidCraft's "Latest" can be newer than what PartBuddy has been tested with.
const ENGINE_VERSION = 'https://raw.githubusercontent.com/PartBuddy/partbuddy/main/apps/desktop/src/main/solidcraft/engineVersion.ts';
const solidcraftVersion = await fetch(ENGINE_VERSION, { signal: AbortSignal.timeout(8000) })
  .then(async (res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const v = /RECOMMENDED_VERSION = '([^']+)'/.exec(await res.text())?.[1];
    if (!v) throw new Error('no RECOMMENDED_VERSION');
    console.info(`[solidcraft] ${v} from the app`);
    return v;
  })
  .catch((e) => {
    console.warn(`[solidcraft] ${(e as Error).message}; using 0.40.1`);
    return '0.40.1';
  });
export const SOLIDCRAFT = { version: solidcraftVersion, url: `https://github.com/tangency-labs/solidcraft/releases/tag/v${solidcraftVersion}` };
