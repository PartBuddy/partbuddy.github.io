// All product content of the homepage lives here, so the PartBuddy development can keep it current
// by editing this one file. Facts only: nothing goes in that the app does not do today.
// `shot` is a file name in src/assets/shots without extension (cropped per src/data/crops.ts).

export const channels = [
  { name: 'YouTube', handle: '@PartBuddy', url: 'https://www.youtube.com/@PartBuddy' },
  { name: 'TikTok', handle: '@partbuddy', url: 'https://www.tiktok.com/@partbuddy' },
  { name: 'Instagram', handle: '@partbuddyapp', url: 'https://www.instagram.com/partbuddyapp/' },
  { name: 'Bluesky', handle: 'partbuddy.bsky.social', url: 'https://bsky.app/profile/partbuddy.bsky.social' },
];

export const KOFI_URL = 'https://ko-fi.com/partbuddy';

// The three steps of the page, each with one big screenshot.
export const steps = [
  {
    title: 'Describe it',
    text: 'Type what you need, or draw it on squared paper and type the sizes that matter.',
    shot: 'sketch',
    alt: 'The sketch sheet with a rectangle, a circle and typed dimensions',
  },
  {
    title: 'Watch it take shape',
    text: 'Every step appears live in the 3D view. Where there is a real choice, the assistant asks and recommends one option.',
    shot: 'clarify',
    alt: 'An enclosure in the 3D view next to a question from the assistant with a recommended option',
  },
  {
    title: 'Print it',
    text: 'A check flags thin walls, parts too big for your printer and fits that are too tight. One click opens the part in Bambu Studio or OrcaSlicer.',
    shot: 'printready',
    alt: 'The ready-to-print check pointing at a fit that is too tight',
  },
];

// Four reasons to care, text only.
export const highlights = [
  {
    icon: 'messageCircleQuestion',
    title: 'Asks before it guesses',
    text: 'When a part can be built several ways, you get a short question with options and a recommendation. You decide.',
  },
  {
    icon: 'slidersHorizontal',
    title: 'Clear sizes change at once',
    text: 'Dimensions driven by a parameter change directly, with a preview. No request to the assistant, no waiting.',
  },
  {
    icon: 'penTool',
    title: 'Sketches with real sizes',
    text: 'Front, top and side sheets, typed dimensions like Ø 8 or R 3, and a photo underneath if you have one.',
  },
  {
    icon: 'creditCard',
    title: 'Your subscription, no API bill',
    text: 'Runs on Claude Pro or Max through Claude Code, or ChatGPT Plus or Pro. Or on a local model.',
  },
];

// Everything else the app does, one line each.
export const more = [
  ['Live 3D view', 'click faces and edges, pin notes to them'],
  ['Function blocks', 'threads, countersinks, snap hooks, screw bosses, lids with lip, insert seats, nut traps, slots, text'],
  ['Photo as input', 'the assistant asks for the critical sizes, never reads them off pixels'],
  ['Research', 'web search with sources; screws, nuts, bearings and pins as standard parts'],
  ['Section and exploded view', 'look inside and pull multi-part prints apart'],
  ['Templates', 'box with lid, insert housing, wall holder, cable clip, tube adapter'],
  ['Projects and versions', 'a folder per project, versions saved on their own, compare with now'],
  ['Import', 'STEP and IGES as editable bodies, STL, 3MF and OBJ as meshes'],
  ['Sharing package', '3MF, STEP, four pictures and a description in one folder'],
  ['Local models', 'Ollama, LM Studio, llama.cpp, vLLM, Strata'],
  ['English and German', 'with a short setup on first start and update checks'],
] as const;

export const models = {
  local: ['Ollama', 'LM Studio', 'llama.cpp', 'vLLM', 'Strata'],
  localNote: 'PartBuddy finds local servers on this computer and offers only models that can call tools and have at least 16K context.',
};

export const roadmap = {
  next: ['SolidCraft 0.40 final'],
  later: ['MCP server for Claude Desktop and Codex', 'Dimensions right at the edges', 'Permissions per tool', 'Cost display for your own API keys', 'Local-only mode'],
};
