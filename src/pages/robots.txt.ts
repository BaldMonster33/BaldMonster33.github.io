import type { APIRoute } from 'astro';
import { SITE } from '../consts';

/**
 * Generated rather than sitting in public/ so the sitemap URL cannot drift from
 * SITE.url. A hardcoded robots.txt survived a host change once already and spent
 * that time advertising a sitemap on a hostname that no longer resolved.
 */
export const GET: APIRoute = () =>
  new Response(
    `User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap-index.xml', SITE.url).href}
`,
    { headers: { 'content-type': 'text/plain; charset=utf-8' } }
  );
