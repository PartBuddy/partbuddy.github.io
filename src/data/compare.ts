// "Why not just use …": PartBuddy against kinds of tools, not named products, so every cell
// stays true without tracking other products. The one exception is SolidCraft, PartBuddy's own
// engine, because "why not drive it directly" is the obvious question (Manuel 2026-11-08).
// Cells: [mark, note]. The last column is PartBuddy; its claims must match site-content.json.
type Mark = 'yes' | 'no' | 'part';
type Cell = [Mark, string?];

export const compare: { intro: string; columns: string[]; rows: { label: string; cells: Cell[] }[]; footnote: string } = {
  intro: 'There are four usual ways to get a functional printed part today. Each solves one part of the problem.',
  columns: ['Classic CAD', 'Text-to-3D generator', 'Chatbot writing CAD code', 'Chatbot connected to SolidCraft', 'PartBuddy'],
  rows: [
    {
      label: 'Exact, editable geometry (STEP)',
      cells: [['yes'], ['no', 'Mesh'], ['yes', 'As code'], ['yes', 'Same engine'], ['yes', 'With full history']],
    },
    {
      label: 'Describe the part in words',
      cells: [['no'], ['yes'], ['yes'], ['yes'], ['yes', 'Or a sketch or photo']],
    },
    {
      label: 'Asks about loads, fits and real sizes',
      cells: [['no', 'You decide alone'], ['no'], ['part', 'If you ask it to'], ['part', 'If you ask it to'], ['yes', 'Before it builds']],
    },
    {
      label: 'ISO fasteners, inserts and fits built in',
      cells: [['part', 'Libraries, by hand'], ['no'], ['part', 'If it knows them'], ['part', 'If it knows them'], ['yes', 'Sized per material']],
    },
    {
      label: 'Checked against your printer',
      cells: [['part', 'Add-ons'], ['no'], ['no'], ['no'], ['yes', 'After every change']],
    },
    {
      label: 'See and change every step in 3D',
      cells: [['yes'], ['no'], ['part', 'After each run'], ['part', 'Faces named in words'], ['yes', 'Click a face, ask in words']],
    },
    {
      label: 'Notes pinned to the model',
      cells: [['part', 'Comments, for people'], ['no'], ['no'], ['no'], ['yes', 'The assistant reads them']],
    },
  ],
  footnote: 'Typical for each kind of tool; single products differ.',
};
