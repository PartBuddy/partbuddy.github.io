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

// Short proof points next to the hero button.
export const proof = [
  'Real, editable CAD you can export as STEP',
  'Asks before it guesses',
  'Checks the part before your slicer',
  'Your Claude or ChatGPT plan, or a local model',
];

// What PartBuddy works with. Text only, no third-party logos.
export const worksWith = ['Claude Code', 'ChatGPT', 'Ollama', 'LM Studio', 'llama.cpp', 'Bambu Studio', 'OrcaSlicer', 'STEP', '3MF', 'STL'];

// The product tour: one tab per step, each with one large picture.
export const tour = [
  {
    tab: 'Sketch',
    title: 'Sketch it with the sizes that matter',
    text: 'Draw on squared paper in front, top and side sheets and type dimensions like 40, Ø 8 or R 3. Or just describe the part in a sentence.',
    shot: 'sketch',
    alt: 'The sketch sheet with a rectangle, a circle, typed dimensions and an M3 hole label',
  },
  {
    tab: 'It asks',
    title: 'It asks before it guesses',
    text: 'Where a part can be built several ways, the assistant asks a short question with options and recommends one. You decide.',
    shot: 'clarify',
    alt: 'A housing in the 3D view next to questions from the assistant with recommended options',
  },
  {
    tab: 'Build',
    title: 'Watch every step in real CAD',
    text: 'SolidCraft builds editable geometry while you watch. Click any face or edge, pin a note to it and change it in words.',
    shot: 'view',
    alt: 'A cable clip with a selected face and its name, area and actions',
  },
  {
    tab: 'Details',
    title: 'Add the details that make it print',
    text: 'Threads, snap hooks, screw bosses, lids with a lip, seats for heat-set inserts and nut traps, placed on the face you pick.',
    shot: 'blocks',
    alt: 'The function block panel adding a heat-set insert seat for M3',
  },
  {
    tab: 'Check',
    title: 'Know it will print before you slice',
    text: 'One check flags thin walls, parts too big for your printer and fits tighter than your material allows, and points at the spot.',
    shot: 'printready',
    alt: 'The ready-to-print check reporting that lid and case are too tight',
  },
  {
    tab: 'Print',
    title: 'Straight to your slicer',
    text: 'Open the part in Bambu Studio or OrcaSlicer with one click, or export 3MF, STEP and STL. Supports and orientation stay with your slicer.',
    shot: 'export',
    alt: 'The export menu with 3MF, STL, STEP, Sharing package and Open in Bambu Studio',
  },
];

// Everything else, as a bento grid. `size`: 'wide' tiles span two columns.
export const bento = [
  { title: 'Pull it apart', text: 'Exploded and section views for parts that belong together.', shot: 'explode', alt: 'An enclosure, its lid and a screw pulled apart', size: 'wide' },
  { title: 'Versions you can compare', text: 'Saved before every request. Compare any of them with now.', shot: 'versions', alt: 'The versions dialog comparing a named version with the current design' },
  { title: 'Start from a photo', text: 'It asks for the one size that sets the scale. It never guesses from pixels.', shot: 'photo', alt: 'The assistant asking for the length of a box shown in a photo' },
  { title: 'Research with sources', text: 'Web search with sources, and standard screws, nuts and bearings.', shot: 'research', alt: 'Search results with sources and an M3 screw placed as a standard part', pos: 'right' },
  { title: 'Build around real parts', text: 'Import STEP and IGES as editable bodies, STL, 3MF and OBJ as meshes.', shot: 'import', alt: 'A housing built around an imported circuit board', size: 'wide' },
  { title: 'Projects and templates', text: 'Every design is a folder you can see. Start from a box, clip or holder.', shot: 'start', alt: 'The start page with templates and project tiles' },
  { title: 'Pick model and effort', text: 'Per chat. With a Claude plan you see how much you have used.', shot: 'model', alt: 'The assistant menu with Claude Code, ChatGPT, local models, model and effort' },
];

// "Your data" section.
export const privacy = [
  { title: 'Your files stay yours', text: 'Projects are plain folders on your computer. PartBuddy has no account and no cloud of its own.' },
  { title: 'Your model, your choice', text: 'Use your Claude or ChatGPT subscription, or keep everything on your machine with a local model.' },
  { title: 'No tracking here either', text: 'This website sets no cookies and loads nothing from other servers.' },
];

export const models = {
  local: ['Ollama', 'LM Studio', 'llama.cpp', 'vLLM', 'Strata'],
  localNote: 'PartBuddy finds local servers on this computer and offers only models that can call tools and have at least 16K context.',
};

// Honest status, Zoo-style: what works today, what comes next, ideas without dates.
export const status = {
  today: ['Design with an assistant in real CAD', 'Sketches, photos and research as input', 'Ready-to-print check and slicer hand-off', 'English and German, installer with update checks'],
  next: ['SolidCraft 0.40 final'],
  later: ['MCP server for Claude Desktop and Codex', 'Dimensions right at the edges', 'Permissions per tool', 'Cost display for your own API keys', 'Local-only mode'],
};
