/**
 * View counter. Optional, and the site works without it.
 *
 * Contract with the front end (src/layouts/BaseLayout.astro), which is the only
 * thing that must stay true if you reimplement this elsewhere:
 *
 *   GET /            -> { "views": { "/blog": 12, ... } }   read only
 *   GET /?p=/blog    -> { "views": { "/blog": 13, ... } }   record, then read
 *
 * One request per page load returns every count, so an index page listing
 * twenty cards shows twenty numbers without twenty requests — and without
 * counting a view for each post it merely links to.
 *
 * Written against the standard `fetch(request)` interface rather than any
 * vendor's helper, so the only Cloudflare-specific thing here is the KV binding.
 * On another runtime, replace the two `store` calls: everything else ports.
 */

/**
 * Where the site is served. Anything else gets no CORS grant and no write.
 *
 * Must match SITE.url in src/consts.ts exactly — scheme, `www.` and all. A
 * mismatch is silent: the browser drops the response, the counts stay hidden,
 * and nothing logs an error anywhere the site can see.
 */
const ORIGIN = 'https://baldmonster33.github.io';

/**
 * A single key holding the whole map, rather than one key per path.
 *
 * The tradeoff is deliberate. Per-path keys make an increment atomic but make a
 * read of every count an N-key scan, which is the common case here and the
 * expensive one. One blob makes the read a single lookup and the write a
 * read-modify-write that can lose an increment when two arrive together.
 *
 * Losing an increment is the right failure. These are approximate tallies for a
 * personal blog, not billing records, and the alternative — paying for a
 * transactional store, or an N-read fan-out on every page load — costs real
 * money to fix a number nobody audits.
 */
const KEY = 'views';

/** Guards against a stranger inventing pages. See notes in the README. */
function isSanePath(p) {
  return (
    typeof p === 'string' &&
    p.startsWith('/') &&
    p.length <= 128 &&
    !p.includes('//') &&
    // Real pages here are extensionless directories; a dot means an asset, a
    // traversal attempt, or junk.
    !p.includes('.')
  );
}

function corsHeaders(request) {
  const origin = request.headers.get('Origin');
  return {
    'content-type': 'application/json; charset=utf-8',
    // Echoed only on an exact match, so the grant is never wildcarded.
    ...(origin === ORIGIN ? { 'access-control-allow-origin': ORIGIN } : {}),
    'access-control-allow-methods': 'GET, OPTIONS',
    // The count is live. A cached response would freeze every number on the
    // page at whatever the first visitor after a deploy happened to see.
    'cache-control': 'no-store',
  };
}

export default {
  async fetch(request, env) {
    const headers = corsHeaders(request);

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    if (request.method !== 'GET') {
      return new Response(JSON.stringify({ error: 'method not allowed' }), { status: 405, headers });
    }

    const store = env.VIEWS;
    const url = new URL(request.url);
    const path = url.searchParams.get('p');

    let views = {};
    try {
      views = JSON.parse((await store.get(KEY)) ?? '{}');
    } catch {
      // Corrupt or absent blob. Starting from empty loses history, which is
      // strictly better than serving a 500 and blanking every count forever.
      views = {};
    }

    // A write is only attempted for a plausible path, and only when the browser
    // says it came from the site. Neither check is a real authorisation — the
    // Origin header is trivially forged outside a browser — but together they
    // stop the accidental and the idle, and the worst a determined visitor
    // achieves is a wrong number on a page about themselves.
    const fromSite = request.headers.get('Origin') === ORIGIN;
    if (path && isSanePath(path) && fromSite) {
      views[path] = (views[path] ?? 0) + 1;
      await store.put(KEY, JSON.stringify(views));
    }

    return new Response(JSON.stringify({ views }), { status: 200, headers });
  },
};
