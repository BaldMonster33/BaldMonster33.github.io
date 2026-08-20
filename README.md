# www.qinle.ltd

Personal site. [Astro](https://astro.build) compiled to static HTML, built by
GitHub Actions, served from GitHub Pages.

There is no server, no database, and no client-side framework. The JavaScript
that ships is the theme toggle, the home-page front door, and — only if a counter
is configured — one `fetch` for view counts.

## Running it

```sh
npm ci
npm run dev      # http://localhost:4321
npm run check    # astro check: types and content schemas
npm run build    # -> dist/
```

Node 22. `npm ci` rather than `npm install`, so the lockfile decides.

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
  pages/               routes, including rss.xml.js and the tag pages
  utils/               date formatting, path normalising
public/                copied verbatim into dist/, including CNAME
counter/               optional view counter, deployed separately
```

Adding a post means adding a Markdown file under `src/content/blog/`. The
frontmatter is schema-checked at build time, so a missing description or a
malformed date fails the build rather than rendering as `undefined` in
production.

## Deploying

Push to `main`. The workflow runs `npm ci`, `npm run check`, `npm run build` and
publishes `dist/` to Pages. `workflow_dispatch` is enabled so a failed build can
be re-run without an empty commit.

The custom domain is `public/CNAME`, which Astro copies into `dist/`. It lives in
the build output rather than only in the repository's Pages settings so that the
domain survives being redeployed by something other than this workflow.

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
