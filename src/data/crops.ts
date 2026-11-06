// Crop of each app screenshot, in CSS pixels of the 1440 × 900 window the shots are taken in
// (`pnpm site:shots` in the app repository renders them at 2x). [left, top, width, height].
// A dark variant (<name>-dark) uses the crop of <name>. Shots without an entry are used whole.
// Layout at 1440 × 900: title bar 0–40, left panel 0–235, 3D view 240–1020, chat 1020–1440.
export const crops: Record<string, [number, number, number, number]> = {
  sketch: [270, 96, 900, 780],
  'sketch-chat': [1020, 40, 420, 600],
  photo: [1020, 40, 420, 420],
  research: [560, 300, 880, 420],
  clarify: [560, 40, 880, 600],
  params: [0, 40, 900, 620],
  view: [240, 110, 780, 745],
  blocks: [240, 280, 780, 580],
  templates: [130, 90, 1180, 260],
  printready: [150, 300, 870, 580],
  explode: [240, 40, 780, 600],
  section: [240, 40, 780, 640],
  start: [130, 50, 1180, 590],
  versions: [380, 80, 680, 380],
  import: [0, 40, 1020, 760],
  export: [160, 0, 860, 540],
  model: [1000, 180, 440, 700],
};
