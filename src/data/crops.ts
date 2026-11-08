// Crop of each app screenshot, in CSS pixels of the 1440 × 900 window the shots are taken in
// (`pnpm site:shots` in the app repository renders them at 2x). [left, top, width, height].
// A dark variant (<name>-dark) uses the crop of <name>. Shots without an entry are used whole.
// { from, rect } cuts a second view out of another shot.
// Layout at 1440 × 900: title bar 0–40, left panel 0–235, 3D view 240–1020, chat 1020–1440.
type Rect = [number, number, number, number];
export const crops: Record<string, Rect | { from: string; rect: Rect }> = {
  // The whole conversation: the request, answered questions, a research step and its result.
  conversation: { from: 'research', rect: [340, 40, 1100, 680] },
  sketch: [270, 96, 900, 796],
  'sketch-chat': [1020, 40, 420, 600],
  photo: [1020, 40, 420, 420],
  research: [560, 300, 880, 420],
  // Homepage chapters: Ask (part and question cards), Build (parameters, clip, face actions),
  // Check (finding card, part, warning in the status bar), Print (parts nested on the bed).
  clarify: [480, 40, 960, 640],
  params: [0, 40, 900, 620],
  view: [0, 40, 1020, 830],
  blocks: [240, 280, 780, 580],
  templates: [130, 90, 1180, 260],
  printready: [0, 150, 1020, 750],
  explode: [240, 40, 780, 600],
  plate: [240, 230, 780, 610],
  assembly: [240, 40, 780, 800],
  section: [240, 40, 780, 640],
  start: [130, 50, 1180, 590],
  versions: [380, 80, 680, 380],
  import: [0, 40, 1020, 760],
  export: [160, 0, 860, 540],
  model: [1000, 180, 440, 700],
  // The clip with its three numbered notes (face, edge, plate).
  notes: [330, 320, 600, 440],
};
