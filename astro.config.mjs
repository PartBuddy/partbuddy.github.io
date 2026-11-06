import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://partbuddy.github.io',
  // privacy.html and imprint.html keep their URLs (linked from the Google OAuth consent screen).
  build: { format: 'file', inlineStylesheets: 'always' },
  trailingSlash: 'never',
});
