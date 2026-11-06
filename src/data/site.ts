// All product content of the homepage lives here, so the PartBuddy development can keep it current
// by editing this one file. Facts only: nothing goes in that the app does not do today.
// `shot` is a file name in src/assets/shots without extension; a missing file shows a marked placeholder.

export const channels = [
  { name: 'YouTube', handle: '@PartBuddy', url: 'https://www.youtube.com/@PartBuddy' },
  { name: 'TikTok', handle: '@partbuddy', url: 'https://www.tiktok.com/@partbuddy' },
  { name: 'Instagram', handle: '@partbuddyapp', url: 'https://www.instagram.com/partbuddyapp/' },
  { name: 'Bluesky', handle: 'partbuddy.bsky.social', url: 'https://bsky.app/profile/partbuddy.bsky.social' },
];

export const KOFI_URL = 'https://ko-fi.com/partbuddy';

export type Feature = {
  id: string;
  title: string;
  text: string;
  facts: [string, string][];
  shot: string;
  alt: string;
  extra?: { shot: string; alt: string };
};

export type Chapter = { id: string; title: string; lede: string; features: Feature[] };

export const chapters: Chapter[] = [
  {
    id: 'describe',
    title: 'Describe',
    lede: 'Start with words, a sketch, a photo or a data sheet. The assistant asks for what decides the part.',
    features: [
      {
        id: 'sketch',
        title: 'Sketch with real dimensions',
        text: 'Draw on squared paper with the mouse or a pen. Lines, rectangles, circles and arcs snap to the grid, and you type the sizes that matter. The assistant builds from your dimensions and asks only for the ones the sketch leaves open.',
        facts: [
          ['Tools', 'pen, line, rectangle, circle, arc, dimension, label'],
          ['Dimensions', '40 · Ø 8 · R 3, in mm'],
          ['Snapping', 'half squares and corners; Shift for 45°'],
          ['Keys', 'V P L R C A M T E'],
        ],
        shot: 'sketch',
        alt: 'The sketch sheet with a rectangle, a circle, typed dimensions and an M3 hole label',
        extra: { shot: 'sketch-chat', alt: 'The assistant reading the sketch and asking for the height and thickness' },
      },
      {
        id: 'photo',
        title: 'A photo of the real thing',
        text: 'Attach a photo of the object your part has to fit. The assistant says what it sees and what it takes you to want, then asks for the two or three critical dimensions. It never reads sizes off the pixels.',
        facts: [
          ['Formats', 'PNG, JPEG'],
          ['Stored', 'in the project’s photos folder'],
        ],
        shot: 'photo',
        alt: 'A photo attached in the chat and the assistant asking for dimensions',
      },
      {
        id: 'research',
        title: 'Research with sources',
        text: 'The assistant can search the web and read pages. Sources appear as cards with their link, and a dimension taken from a data sheet names where it came from. Standard parts go straight in as counterparts.',
        facts: [
          ['Standard parts', 'screws, nuts, washers, bearings, pins'],
          ['Page content', 'treated as data, never as instructions'],
        ],
        shot: 'research',
        alt: 'Web sources shown as cards in the chat',
      },
    ],
  },
  {
    id: 'build',
    title: 'Build',
    lede: 'SolidCraft builds the geometry. You watch every step, point at faces and change what is clear yourself.',
    features: [
      {
        id: 'view',
        title: 'Live 3D view with notes',
        text: 'Every step the assistant takes appears in the view as it happens. Click a face or an edge to select it by its real name, pin a note to it, and send it along as context with your next request.',
        facts: [
          ['Picking', 'faces and edges, with hover highlight'],
          ['Notes', 'pinned to geometry, sent as context'],
        ],
        shot: 'view',
        alt: 'The 3D view with a selected face and a pinned note',
      },
      {
        id: 'blocks',
        title: 'Function blocks',
        text: 'The details that make a print work, inserted at a face you pick and built on SolidCraft’s own commands where it has them.',
        facts: [],
        shot: 'blocks',
        alt: 'A function block inserted at a selected face',
      },
      {
        id: 'templates',
        title: 'Templates to start from',
        text: 'Parametric starting points on the start page. Each size is a parameter with a comment, so you change a template in the parameter panel without asking the assistant at all.',
        facts: [['Templates', 'box with lid, housing for heat-set inserts, wall holder, cable clip, tube adapter']],
        shot: 'templates',
        alt: 'The template gallery',
      },
    ],
  },
  {
    id: 'check',
    title: 'Check',
    lede: 'Before the part goes to the slicer, PartBuddy checks what can only be decided while designing.',
    features: [
      {
        id: 'printready',
        title: 'Ready-to-print indicator',
        text: 'One indicator shows whether the part is ready to print, and each finding points at the spot. For prints of several parts it also measures the clearance between them.',
        facts: [
          ['Checks', 'build volume, thin walls, bed contact, feature errors'],
          ['Between parts', 'overlap and gaps tighter than your material’s push fit'],
          ['Overhang', 'a yellow hint at the spot, never red'],
        ],
        shot: 'printready',
        alt: 'The ready-to-print indicator with its checks',
      },
      {
        id: 'explode',
        title: 'Section and exploded view',
        text: 'Cut the part open to see walls and fits from the inside. For prints of several parts, a slider pulls them apart, with dashed lines back to where each one sits.',
        facts: [['Exploded view', 'from assembled to apart, nothing sinks below the floor']],
        shot: 'explode',
        alt: 'The exploded view of a two-part enclosure',
        extra: { shot: 'section', alt: 'The section view cutting through a cable clip' },
      },
    ],
  },
  {
    id: 'keep',
    title: 'Keep and hand off',
    lede: 'Every design is a project folder you can see. Versions are saved on their own, and the part leaves in the formats your slicer and your friends need.',
    features: [
      {
        id: 'start',
        title: 'Projects and start page',
        text: 'Each project is a visible folder with the design, the chat, the versions and the exports. The start page shows them as tiles with a preview image, the last change and the ready-to-print state.',
        facts: [
          ['Default folder', 'Documents\\PartBuddy'],
          ['Saving', 'automatic'],
        ],
        shot: 'start',
        alt: 'The start page with project tiles',
      },
      {
        id: 'versions',
        title: 'Versions you can compare',
        text: 'PartBuddy saves a version before each request to the assistant and at every export. Name one whenever you like. “Compare with now” tells you per body what was added, removed or moved.',
        facts: [
          ['Automatic', 'the newest 30 are kept'],
          ['Named', 'kept until you delete them'],
          ['Restore', 'saves the current state first'],
        ],
        shot: 'versions',
        alt: 'The version list with a comparison result',
      },
      {
        id: 'import',
        title: 'Import',
        text: 'Bring in a STEP file of a circuit board and build the housing around it, or start from a mesh you downloaded. STEP and IGES stay editable bodies; meshes can be converted to faces.',
        facts: [
          ['Editable', 'STEP, IGES (with repair)'],
          ['Mesh', 'STL, 3MF, OBJ'],
        ],
        shot: 'import',
        alt: 'An imported circuit board in the structure tree',
      },
      {
        id: 'export',
        title: 'To the slicer and beyond',
        text: 'Open the part in Bambu Studio or OrcaSlicer with one click, or pick the face it should print on. A sharing package collects everything someone else needs to print it.',
        facts: [
          ['Sharing package', '3MF, STEP, four pictures at 1600 × 1200, a Markdown description'],
          ['Slicers', 'Bambu Studio, OrcaSlicer'],
        ],
        shot: 'export',
        alt: 'The export menu with Open in Bambu Studio and Sharing package',
      },
    ],
  },
];

// Balloon numbers match the numbers in src/assets/drawings/section-blocks.svg.
export const functionBlocks = [
  ['Thread', 'modelled threads and tapped holes'],
  ['Countersink', 'countersunk holes'],
  ['Snap hook', 'snap fits'],
  ['Screw boss', 'with pilot hole'],
  ['Lid with lip', 'or with a groove'],
  ['Heat-set insert seat', 'stepped bore for brass inserts'],
  ['Nut trap', 'hexagonal pocket'],
  ['Slot', 'elongated holes'],
] as const;
export const textAndLogos = 'Text and logos, embossed or engraved.';

export const aroundIt = [
  ['Languages', 'English and German, switched at once'],
  ['First start', 'a short setup: SolidCraft, assistant, printer and material, project folder'],
  ['Updates', 'the installer checks GitHub releases and installs on your word'],
] as const;

export const models = {
  subscriptions: [
    ['Claude Pro or Max', 'through Claude Code'],
    ['ChatGPT Plus or Pro', ''],
  ],
  local: ['Ollama', 'LM Studio', 'llama.cpp', 'vLLM', 'Strata'],
  localNote:
    'PartBuddy finds local servers on this computer and offers only models that can call tools and have at least 16K context.',
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
