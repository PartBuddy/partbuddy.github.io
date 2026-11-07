# partbuddy-web

Public website of PartBuddy at <https://partbuddy.github.io>, built with Astro and deployed by
`.github/workflows/deploy.yml` (Pages source: GitHub Actions).

```sh
npm install
npm run build     # astro check + static build into dist/
npm run preview   # serve dist/ on http://localhost:4321
npm test          # release-notes parser
```

## How the site updates itself

Nothing here is edited by hand for a release. The app repository `PartBuddy/partbuddy` is the source
(its `docs/website.md` has the details):

1. **Product facts** (features, tour, standards, models, roadmap) are edited in the app repository in
   `site/site-content.json`. Its site-sync workflow opens the pull request `site-sync/content` here;
   the build check of that pull request fails if a field is missing. Merge it, and the site deploys.
2. **A release** of the app redeploys this site at once (`repository_dispatch: partbuddy-release`). The
   build reads the releases from the GitHub API: the hero shows the version and date, the buttons read
   "Download for Windows" and link the installer, `/changelog.html` lists every release. No release yet
   means "Coming soon". The same run updates the snapshot `src/data/releases.json` by pull request, so a
   build without network or token shows the last known state.
3. **Screenshots** are rendered after each release (`pnpm site:shots`) and arrive as the pull request
   `site-sync/media`. The hero film is still produced by hand.

Positioning copy that is not a product fact stays here: `src/data/compare.ts` (comparison),
`src/data/site.ts` (channels, Ko-fi), FAQ in `src/pages/index.astro`.

Test a release locally:

```sh
PARTBUDDY_RELEASES_FIXTURE=test/fixtures/releases.json npm run build
```

Secrets: `PARTBUDDY_RELEASES_TOKEN` here (read access to the releases while the app repository is
private, optional); `SITE_REPO_TOKEN` in the app repository.

## Details

- **Screenshots:** `pnpm site:shots` in the app repository renders them at 1440 × 900 @2x into
  `src/assets/shots/`. `scripts/crop-shots.mjs` cuts each one to the region in `src/data/crops.ts`
  before every build. Missing files render as marked placeholders.
- **Hero video:** `hero.mp4` + `hero-poster.png` (optionally `hero-dark.mp4` + `hero-poster-dark.png`).
- **Lighthouse on this server:** run Chrome with `--disable-gpu`. Without a GPU, headless Chrome
  waits up to 350 ms for its software GPU process, which shows up as about 1.5 s of blocking time.
- No tracking, no cookies, no external requests. The theme choice is kept in `localStorage`.
