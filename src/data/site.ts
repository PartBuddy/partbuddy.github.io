// Thin adapter. The product facts (features, models, roadmap) live in the app repository as
// site/site-content.json and arrive here as src/data/site-content.json through the sync pull
// request of its site-sync workflow. Edit them there, not here. The type below makes
// `astro check` fail when the synced file is missing a field.
import content from './site-content.json';

type Titled = { title: string; text: string };
type SiteContent = {
  proof: string[];
  worksWith: string[];
  steps: Titled[];
  tour: { tab: string; title: string; text: string; shot: string; alt: string }[];
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

export const { proof, worksWith, steps, tour, standards, bento, models, roadmap } = c;
// The app's privacy facts plus one about this website.
export const privacy: Titled[] = [...c.privacy, { title: 'No tracking here either', text: 'This website sets no cookies and loads nothing from other servers.' }];

// Website-only content.
export const channels = [
  { name: 'YouTube', handle: '@PartBuddy', url: 'https://www.youtube.com/@PartBuddy' },
  { name: 'TikTok', handle: '@partbuddy', url: 'https://www.tiktok.com/@partbuddy' },
  { name: 'Instagram', handle: '@partbuddyapp', url: 'https://www.instagram.com/partbuddyapp/' },
  { name: 'Bluesky', handle: 'partbuddy.bsky.social', url: 'https://bsky.app/profile/partbuddy.bsky.social' },
];

export const KOFI_URL = 'https://ko-fi.com/partbuddy';
