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
- **Screenshots and video:** drop files into `src/assets/shots/` under the names used in
  `src/data/site.ts` and `src/pages/index.astro` (`<name>.png`, optional `<name>-dark.png`,
  `hero.mp4` + `hero-poster.png`). Missing files render as marked placeholders.
- No tracking, no cookies, no external requests. The theme choice is kept in `localStorage`.
