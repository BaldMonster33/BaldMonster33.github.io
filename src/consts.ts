/**
 * Single source of truth for site-wide metadata.
 *
 * Shared verbatim by both versions of the site. Nothing host-specific belongs in
 * here — that lives in ./site.profile.ts, which is the one file the public
 * export replaces. Keep everything below to values that are safe to publish,
 * because everything below is published.
 */
import { PROFILE } from './site.profile';

export const SITE = {
  url: PROFILE.url,
  title: 'Le Qin',
  /** Used in <title> suffixes and the RSS feed. */
  name: 'Le Qin',
  role: 'Software Development Engineer II',
  team: 'AWS Observability Analytics',
  location: 'Vancouver, BC',
  description:
    'Le Qin — software engineer working on observability at AWS. Notes on distributed systems, telemetry, and the occasional side project.',
  social: {
    github: 'https://github.com/BaldMonster33',
    linkedin: 'https://www.linkedin.com/in/johnnyqin2002/',
    email: 'johnnyqin10@gmail.com',
  },
} as const;

/**
 * Where the view counter lives, or '' for no counter.
 *
 * The profile supplies the default and an environment variable overrides it, so
 * moving the counter — between hosts, or out of existence — never touches a
 * component. With an empty value the front end issues no request at all and
 * every count stays hidden, which is already what a page nobody has opened
 * looks like.
 *
 * Read at build time, because it is baked into the emitted HTML:
 *   PUBLIC_VIEWS_ENDPOINT=https://views.example.workers.dev npm run build
 */
// Optional chaining because astro.config.mjs imports this file from plain Node,
// where `import.meta.env` does not exist and a bare property read would throw
// before the config is ever evaluated.
export const VIEWS_ENDPOINT: string =
  import.meta.env?.PUBLIC_VIEWS_ENDPOINT ?? PROFILE.viewsEndpoint;

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
] as const;
