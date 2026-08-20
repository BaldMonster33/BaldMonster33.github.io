# View counter (optional)

The site ships without this. Static hosting has nowhere to write a number down,
so with no endpoint configured the front end makes no request and every count
stays hidden — which looks the same as a page nobody has opened yet.

This directory is the piece you deploy if you want the numbers. It is not part of
the site build and the Pages workflow ignores it.

## The contract

Anything that satisfies this works. `worker.js` is one implementation, not the
interface.

| Request | Response |
| --- | --- |
| `GET /` | `{"views": {"/blog": 12, ...}}` — read only |
| `GET /?p=/blog` | same, after incrementing `/blog` |

Two properties matter and are easy to get wrong:

- **One request returns every count.** An index page listing twenty cards must
  show twenty numbers from one request, and must not count a view for each post
  it merely links to. Only the path in `?p=` is incremented.
- **CORS.** The site and the counter are on different origins now, which was not
  true when this ran behind a CDN path on the same domain. `ORIGIN` in
  `worker.js` must equal `SITE.url` in `src/consts.ts`; without a matching
  `Access-Control-Allow-Origin` the browser discards the response and every
  count silently stays hidden. Changing the site's hostname means redeploying
  this too.

## Deploying it on Cloudflare

Free tier, and the relevant part of "free" is the failure mode: when the daily
request allowance runs out the counter stops answering and the site loses its
numbers. It does not start billing.

```sh
cd counter
npx wrangler kv namespace create VIEWS   # paste the printed id into wrangler.toml
npx wrangler deploy                      # prints https://qinle-views.<you>.workers.dev
```

Then switch it on for the site — this is the only change needed, because nothing
in `src/` names an endpoint:

```sh
gh variable set PUBLIC_VIEWS_ENDPOINT --body https://qinle-views.<you>.workers.dev
```

Push anything to `main` (or run the workflow manually) and the next build bakes
the endpoint in. To turn it off again, delete the variable and rebuild.

## Moving it somewhere else

The handler is a standard `fetch(request)` function. The only vendor-specific
lines are the two `store.get` / `store.put` calls against the KV binding:

- **Deno Deploy** — swap KV for `Deno.openKv()`; the handler body is unchanged.
- **Netlify / Vercel functions** — swap KV for their store, or any Redis.
- **A VM you already pay for** — a file on disk and a mutex is a complete
  implementation. Do not add a database for this.

Keep `ORIGIN` in step with wherever the site is served, including the `www.`, or
the CORS grant silently stops matching.

## What it deliberately does not do

- **No rate limiting.** Behind the old private setup, authentication was the rate
  limit. Here the checks are a plausible-looking path and an `Origin` header
  match, neither of which is authorisation — `Origin` is trivially forged outside
  a browser. The exposure is a wrong number on a page, and on a free tier a
  stalled counter, not a bill. If that stops being acceptable, put the platform's
  own rate limiting in front of it rather than inventing one here.
- **No per-visitor anything.** No cookies, no fingerprints, no IP storage. The
  stored state is a map of path to integer and nothing else, which is the whole
  reason this needs no privacy notice.
- **No exact counts.** Refreshes are ignored per session as a courtesy, not a
  control, and concurrent increments can be lost. See the comment on `KEY` in
  `worker.js` for why that tradeoff is the right one.
