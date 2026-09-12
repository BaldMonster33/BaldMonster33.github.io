# qinle.ltd

Personal site. [Astro](https://astro.build) compiled to static HTML, built by
GitHub Actions, served from GitHub Pages.

Currently live at **https://www.qinle.ltd**. The default GitHub Pages address
redirects to the custom domain.

There is no application server, database, or client-side framework. The
JavaScript that ships powers the theme toggle, front door, project demo launcher,
standalone interactive demos, and — only if a counter is configured — one
`fetch` for view counts.

## Running it

```sh
npm ci
npm run dev      # http://localhost:4321
npm run check    # astro check: types and content schemas
npm run build    # -> dist/
```

Node 22. `npm ci` rather than `npm install`, so the lockfile decides.

## Browser support

The supported floor is the current major versions of Chrome, Edge, Firefox and
Safari on laptops, plus current mobile Safari and Chrome. The interactive layer
uses progressive fallbacks:

- Safari gets an explicit dialog focus cycle, so the front-door Tab route does
  not depend on its optional “Press Tab to highlight each item” preference.
- Fine mouse pointers see Fitts's Revenge; touch, pen and reduced-motion users
  get a stable Enter control.
- Demo launchers remain real links when modal-dialog support is unavailable.
- Mobile demos open edge-to-edge and keep 44px touch targets where space is
  constrained.

Before deployment, run `npm run check`, `npm run build`, and smoke-test fresh
desktop and mobile sessions in Chromium, Firefox and WebKit. WebKit automation
is a rendering-engine check; Safari's app-level keyboard preference still needs
one manual check in Safari itself.

## Layout

```
src/
  consts.ts            site metadata; the one place a URL or endpoint is set
  content/
    blog/              posts, Markdown + typed frontmatter
    projects/          project entries, same idea
  content.config.ts    the schemas those two are validated against
  layouts/             page shells
  components/          cards, sidebar, theme toggle, front door
  pages/               routes, including rss.xml.js, robots.txt.ts, tag pages
  utils/               date formatting, path normalising
public/                copied verbatim into dist/
counter/               optional view counter, deployed separately
```

Adding a post means adding a Markdown file under `src/content/blog/`. The
frontmatter is schema-checked at build time, so a missing description or a
malformed date fails the build rather than rendering as `undefined` in
production.

### Project artifacts and licensing

Project pages link to original course reports, recordings,
and recovered code. Files under `public/artifacts/` and `project-source/` are
historical project materials and are excluded from the website code's root MIT
license. Their authors retain their existing rights; publication here does not
assign a new license. See `public/artifacts/README.md` and each source package's
attribution notes for provenance, third-party licenses, and archive limitations.

## Deploying

Push to `main`. The workflow runs `npm ci`, `npm run check`, `npm run build` and
publishes `dist/` to Pages. `workflow_dispatch` is enabled so a failed build can
be re-run without an empty commit.

### The address it serves on

This repository uses the custom GitHub Actions Pages workflow, so the custom
domain is authoritative under Settings → Pages rather than in `public/CNAME`.
Keep these values aligned:

1. `www.qinle.ltd` DNS CNAME → `baldmonster33.github.io.`
2. Apex DNS A records → GitHub Pages' four documented addresses.
3. Settings → Pages → Custom domain → `www.qinle.ltd`, with HTTPS enforced.
4. `src/site.profile.ts` → `https://www.qinle.ltd`, which supplies canonical
   links, Open Graph tags, the sitemap, RSS, and `robots.txt`.

Changing Pages before DNS resolves can redirect the otherwise working
`github.io` address to an unreachable hostname, so verify DNS first.

## View counts

Off by default, and the site is designed to work that way rather than to tolerate
it. Static hosting has nowhere to record a number, so with no endpoint set the
front end issues no request and every count stays hidden — the same as a page
nobody has opened.

Turning it on is one repository variable, `PUBLIC_VIEWS_ENDPOINT`. Nothing in
`src/` names an endpoint, so switching backends or hosts never edits a component.
See [`counter/README.md`](counter/README.md) for a deployable reference
implementation and the contract it satisfies.

## Things left to decide

Carried over deliberately, so they stay visible:

- `src/pages/resume.astro` has placeholder bullets marked for review, and the
  skills list needs a pass.
- The degree designation is unconfirmed: B.S.E. or B.S.
- The home-page bio in `src/pages/index.astro` is a first draft.
- `public/avatar.svg` is the monogram the photo replaced. Point `Sidebar.astro`
  back at it to undo that.
- There is no downloadable resume. The previous site served a 2022 PDF
  containing a phone number and a university address, which is not worth
  republishing; `/resume` is the page that replaces it. If a PDF is wanted,
  generate a fresh one with contact details you are happy to publish.

## Note on history

Commits before this one built a Jekyll blog. The Astro rewrite replaced it
wholesale; the old `_posts` and Chirpy theme are in the history if they are ever
wanted.
