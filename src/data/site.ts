// All product content of the homepage lives here, so the PartBuddy development can keep it current
// by editing this one file. Facts only: nothing goes in that the app does not do today.

export const channels = [
  { name: 'YouTube', handle: '@PartBuddy', url: 'https://www.youtube.com/@PartBuddy' },
  { name: 'TikTok', handle: '@partbuddy', url: 'https://www.tiktok.com/@partbuddy' },
  { name: 'Instagram', handle: '@partbuddyapp', url: 'https://www.instagram.com/partbuddyapp/' },
  { name: 'Bluesky', handle: 'partbuddy.bsky.social', url: 'https://bsky.app/profile/partbuddy.bsky.social' },
];

export const KOFI_URL = 'https://ko-fi.com/partbuddy';

// `shot` is a file name in src/assets/shots without extension; missing files show a marked placeholder.
export const features = [
  {
    icon: 'move3d',
    title: 'Live 3D view',
    text: 'You see every step as it happens. Click a face or an edge to select it, pin a note to it, and cut the part open or pull it apart in the section and exploded views.',
    shot: 'view',
    alt: 'The 3D view with a selected face and a pinned note',
    wide: true,
  },
  {
    icon: 'search',
    title: 'Research with sources',
    text: 'The assistant searches the web and shows its sources as cards. Standard parts go straight into the design: screws, nuts, washers, bearings and pins.',
    shot: 'research',
    alt: 'Web search results shown as source cards in the chat',
  },
  {
    icon: 'penTool',
    title: 'Sketch or photo as input',
    text: 'Start from a hand sketch or a photo. The assistant asks for the dimensions that decide the fit and never reads them from pixels.',
    shot: 'sketch',
    alt: 'A sketch in the chat and the assistant asking for the key dimensions',
  },
  {
    icon: 'puzzle',
    title: 'Function blocks',
    text: 'Threads, countersinks, snap hooks, screw bosses, lids with a lip, text and logos, seats for heat-set inserts, nut traps and slots.',
    shot: 'blocks',
    alt: 'Function blocks applied to a part',
  },
  {
    icon: 'circleCheck',
    title: 'Ready to print',
    text: 'One indicator checks build volume, thin walls, bed contact and the clearance between parts. Overhang appears as a hint at the spot, not as an error.',
    shot: 'printready',
    alt: 'The ready-to-print indicator with its checks',
  },
  {
    icon: 'folderOpen',
    title: 'Projects and versions',
    text: 'A start page with preview images, a template gallery, and versions you can compare. Import STEP, IGES, STL, 3MF and OBJ.',
    shot: 'start',
    alt: 'The start page with project tiles',
  },
  {
    icon: 'share2',
    title: 'Hand-off',
    text: 'Export, open the part in Bambu Studio or OrcaSlicer with one click, or build a share package with 3MF, STEP, images and a description.',
    shot: 'export',
    alt: 'The export and share options',
  },
] as const;

export const aroundIt = 'Interface in English and German. A short setup on first start. An installer that checks for updates.';

export const models = {
  subscriptions: ['Claude Pro or Max, through Claude Code', 'ChatGPT Plus or Pro'],
  local: ['Ollama', 'LM Studio', 'llama.cpp', 'vLLM', 'Strata'],
};

export const roadmap = {
  next: ['Its own log file', 'SolidCraft 0.40 final'],
  later: [
    'MCP server for Claude Desktop and Codex',
    'Dimensions right at the edges',
    'Permissions per tool',
    'Cost display when you use your own API keys',
    'Local-only mode',
  ],
};
