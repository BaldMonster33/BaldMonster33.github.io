import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { SITE } from './src/consts.ts';

export default defineConfig({
  site: SITE.url,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    // `directory` emits `blog/index.html` rather than `blog.html`, which is
    // what lets an ordinary static host resolve `/blog` with no rewrite rules
    // of its own. Hosts that serve objects by exact key are the exception and
    // need a rewrite that appends `index.html`; both deployment targets here
    // are set up for that, so keep this layout rather than assuming either one.
    format: 'directory',
  },
  markdown: {
    shikiConfig: {
      themes: { dark: 'github-dark-dimmed', light: 'github-light' },
      wrap: true,
    },
  },
});
