---
title: How this site is built
description: >-
  Astro compiled to static HTML, built by CI, deployed to a static host. No
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

The built output is committed nowhere and uploaded nowhere by hand. A push runs
the build in CI and publishes the `dist/` directory. The whole deployment is a
static file tree, which is the cheapest thing on the internet to serve and the
least interesting thing to attack.

One wrinkle worth knowing if you ever move a static site between hosts: how the
host resolves a URL naming a directory rather than a file. Astro's
`build.format: 'directory'` emits `blog/index.html` instead of `blog.html`, and
most static hosts will serve that for a request to `/blog`. Hosts that serve
objects strictly by key will not, and answer 404 or 403 instead. The fix is
either this file layout or a rewrite rule at the edge that appends
`index.html`. Choosing the layout means the site stays portable and the edge
stays empty:

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

A custom domain on GitHub Pages is one file — a `CNAME` in the build output —
and it is worth knowing what that file does before you add it. It doesn't just
*attach* the domain, it makes GitHub redirect the `github.io` address to it. So a
DNS record pointing at the wrong host doesn't cost you the custom domain, it
costs you both addresses: the one that's broken and the one that would have
worked. Mine spent a few days pointing at `github.com` instead of `github.io`,
which is exactly the kind of typo that reads as correct every time you look at
it.

The sequel, for anyone stuck on the same thing: clearing the custom domain in
the repository settings did nothing, because the setting is populated *from* the
`CNAME` file in the configured publishing source — and mine was still a
leftover `gh-pages` branch from 2022 that had one. I was fighting a file, not a
field.

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

## The view counter

There may or may not be a number under each post, and which one you get depends
on where you're reading this.

A static host has nowhere to record a view, so the front end treats the counter
as optional in the strict sense: one build-time value names the endpoint, and
with it empty no request is made and every count stays hidden — which looks the
same as a page nobody has opened. Nothing in `src/` names a backend, so moving
the counter, or removing it, never edits a component.

The design constraint I cared about was that the site must not *need* it. A view
count is decoration. If the request fails, the page is exactly what it was
without it. That is also why one request returns every count at once: an index
page listing twenty cards shows twenty numbers without twenty requests, and
without counting a view for each post it merely links to.

## Cost

Static hosting for a personal site fits inside a free tier on every provider I
looked at, and a counter would too. The domain is the only line item.

The previous version of this site ran on a plan that involved an always-on EC2
instance, which would have cost roughly ten times as much and come with an
operating system to patch. Static files don't have a CVE backlog.
