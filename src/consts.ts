/** Single source of truth for site-wide metadata. */
export const SITE = {
  url: 'https://www.qinle.ltd',
  title: 'Le Qin',
  /** Used in <title> suffixes and the RSS feed. */
  name: 'Le Qin',
  role: 'Software Development Engineer II',
  team: 'AWS Observability Analytics',
  location: 'Vancouver, BC',
  description:
    'Le Qin — software engineer working on observability at AWS. Notes on distributed systems, telemetry, and the occasional side project.',
  /**
   * This repository and everything it builds are public. Keep these values, and
   * anything else added here, to things that are already public.
   */
  social: {
    github: 'https://github.com/BaldMonster33',
    linkedin: 'https://www.linkedin.com/in/johnnyqin2002/',
    email: 'johnnyqin10@gmail.com',
  },
} as const;

/**
 * Where the view counter lives, or '' for no counter.
 *
 * Deliberately not a hardcoded path. A static host has nowhere to run the
 * counter, so on GitHub Pages this is empty and the site ships without one: no
 * request is made and every count stays hidden. Point it at a deployed worker
 * (see counter/) and the same build starts showing numbers, which keeps the
 * choice of backend — and of host — out of the components entirely.
 *
 * Set at build time, because it is baked into the emitted HTML:
 *   PUBLIC_VIEWS_ENDPOINT=https://views.example.workers.dev npm run build
 */
// Optional chaining because astro.config.mjs imports this file from plain Node,
// where `import.meta.env` does not exist and a bare property read would throw
// before the config is ever evaluated.
export const VIEWS_ENDPOINT: string = import.meta.env?.PUBLIC_VIEWS_ENDPOINT ?? '';

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
] as const;
