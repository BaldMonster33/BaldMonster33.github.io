import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { SITE } from './src/consts.ts';

export default defineConfig({
  site: SITE.url,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    // `directory` emits `blog/index.html` rather than `blog.html`, which is what
    // lets a plain static host resolve `/blog` with no rewrite rules of its own.
    // Worth keeping if this ever moves off GitHub Pages: hosts that serve
    // objects by exact key need either this layout or a redirect shim.
    format: 'directory',
  },
  markdown: {
    shikiConfig: {
      themes: { dark: 'github-dark-dimmed', light: 'github-light' },
      wrap: true,
    },
  },
});
