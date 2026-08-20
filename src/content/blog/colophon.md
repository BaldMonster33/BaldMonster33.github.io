---
title: How this site is built
description: >-
  Astro compiled to static HTML, built by CI, served from GitHub Pages. No
  server, no database, no framework shipped to the browser.
date: 2026-08-20
tags: ['infra', 'meta']
---

This site replaces a Jekyll blog I set up in 2022 and then stopped touching. The
new one is deliberately boring, which is the point.

## The stack

[Astro](https://astro.build) builds Markdown into static HTML. There is no
client-side framework — the JavaScript that ships is a few lines for the theme
toggle, plus the front door, which I will come back to. Posts are Markdown files
with typed frontmatter, so a typo in a date or a missing description fails the
build instead of rendering as `undefined` in production.

## Hosting

The built output is committed nowhere and uploaded nowhere by hand. A push to
`main` runs the build in CI and publishes the `dist/` directory to GitHub Pages.
The whole deployment is a static file tree, which is the cheapest thing on the
internet to serve and the least interesting thing to attack.

A custom domain is one file — a `CNAME` in the build output — and it is worth
knowing what that file does before you add it. It doesn't just *attach* the
domain, it makes GitHub redirect the `github.io` address to it. So a DNS record
pointing at the wrong host doesn't cost you the custom domain, it costs you both
addresses: the one that's broken and the one that would have worked. Mine spent a
few days pointing at `github.com` instead of `github.io`, which is exactly the
kind of typo that reads as correct every time you look at it.

One wrinkle worth knowing if you ever move a static site between hosts: how the
host resolves a URL that names a directory rather than a file. Astro's
`build.format: 'directory'` emits `blog/index.html` instead of `blog.html`, and
most static hosts will serve that for a request to `/blog`. Hosts that serve
objects strictly by key — an ordinary object store fronted by a CDN, for
instance — will not, and answer 404 or 403 instead. The fix is either this file
layout or a rewrite rule at the edge that appends `index.html`. Choosing the
layout means the site is portable and the edge stays empty:

```js
// The rewrite you need only if your host won't do the above for you.
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri.endsWith('/')) {
    request.uri = uri + 'index.html';
  } else if (!uri.split('/').pop().includes('.')) {
    request.uri = uri + '/index.html';
  }

  return request;
}
```

## The front door

The home page greets you with an **Enter** button you cannot click with a mouse.
It is called *Fitts's Revenge*.

Fitts's Law says the time to acquire a target falls out of its size and its
distance — both of which a designer controls, and neither of which a keyboard has
ever cared about. So the button declines to be a target at all, and hands the
page to Tab and Enter instead.

The reason it exists is the role reversal. People turn up at a product every day
and discover the mouse simply will not do it, while a keyboard or a screen reader
gets through fine. Most visitors never feel that, because for them pointing
always works. Here, for about thirty seconds, it doesn't.

The first version merely flinched when the cursor got close, which turned out to
be trivially beatable — you just approach slowly. So it now runs a loop that
keeps the button parked on whichever part of the screen is furthest from where
your cursor is *heading*, and teleports if you get inside 150 pixels. Two things
made it actually work. Aiming at your predicted position, not your current one,
so it dodges where you're going. And a grid of candidate positions rather than
simple "move away from the cursor" repulsion, because repulsion can be walked
into a corner and pinned.

I checked it by replaying the maths headlessly against a simulated cursor that
chases the button at speeds from a slow creep to a violent flick. That caught a
bug I would never have found by hand: judging danger purely by predicted cursor
position reads a fast, direct approach as *heading past me, no danger*, and the
pursuer could sit inside the button 7% of the time. Danger is now the nearer of
where you are and where you're going.

The constraint that mattered: making it impossible is only acceptable if the ways
through don't require aim. Keyboard activation is detected and never dodges.
`prefers-reduced-motion` turns the whole act off and gives you an ordinary
button. Escape works. A skip link appears once it's clear you're being toyed
with. Without JavaScript there's no door at all.

That isn't a caveat bolted onto the joke, it *is* the point. A page that shut out
the keyboard too wouldn't be saying anything about accessibility. It would just
be inaccessible.

## The view counter that isn't here

Pages have a slot for a view count, and on a purely static host it is always
empty. Counting views needs somewhere to write a number down, and there is no
"somewhere" in a file tree.

Rather than fake it or bolt the site to one vendor, the count reads from a single
configured endpoint. Leave it unset — as it is now — and no request is made at
all and every count stays hidden, which is indistinguishable from a page nobody
has opened yet. Point it at a deployed function and the same build starts showing
numbers. The repo carries a small reference implementation for that, about forty
lines against a key-value store, which is a free tier away from working on
several providers.

The design constraint I cared about was that the site must not *need* it. A view
count is decoration. If the request fails, the page is exactly what it was
without it.

## Cost

The domain, and nothing else. Static hosting for a personal site fits inside a
free tier on every provider I looked at, and the counter would too.

The previous version of this site ran on a plan that involved an always-on VM,
which would have cost real money every month and come with an operating system to
patch. Static files don't have a CVE backlog.
