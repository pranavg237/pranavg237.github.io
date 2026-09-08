// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages user site: served at the domain root, so no `base` is set.
// If a custom domain is added later, update `site` and add public/CNAME.
export default defineConfig({
  site: 'https://pranavg237.github.io',
  output: 'static',
  // Extensionless URLs with no trailing slash. GitHub Pages resolves
  // /about to about.html natively, so there is no redirect hop.
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      // /writing is scaffolded but unlinked until a real post exists.
      filter: (page) => !page.includes('/writing'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
