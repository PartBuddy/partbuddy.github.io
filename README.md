# partbuddy-web

Public website of PartBuddy at <https://partbuddy.github.io>, built with Astro and deployed by
`.github/workflows/deploy.yml` (Pages source: GitHub Actions).

```sh
npm install
npm run build     # astro check + static build into dist/
npm run preview   # serve dist/ on http://localhost:4321
```

- **Release switch:** `RELEASED` in `src/config.ts`. `false` shows "Coming soon – follow along";
  `true` shows "Download for Windows" and the open-source / GPL-3.0 mentions.
- **Product content:** features, models, roadmap and channels live in `src/data/site.ts`. Keep it
  to what the app does today.
- **Screenshots:** `pnpm site:shots` in the app repository renders them at 1440 × 900 @2x into
  `src/assets/shots/`. `scripts/crop-shots.mjs` cuts each one to the region in `src/data/crops.ts`
  before every build. Missing files render as marked placeholders.
- **Hero video:** `hero.mp4` + `hero-poster.png` (optionally `hero-dark.mp4` + `hero-poster-dark.png`).
- **Drawings:** `src/assets/drawings/*.svg`, commissioned from Codex; they draw themselves in on scroll.
- **Lighthouse on this server:** run Chrome with `--disable-gpu`. Without a GPU, headless Chrome
  waits up to 350 ms for its software GPU process, which shows up as about 1.5 s of blocking time.
- No tracking, no cookies, no external requests. The theme choice is kept in `localStorage`.
