---
title: How this site is built
description: >-
  I rebuilt my old Jekyll blog with Astro. Pages are static HTML, with
  JavaScript for the demos and a few site controls.
date: 2026-08-20
tags: ['infra', 'meta']
---

This site replaces a Jekyll blog I set up in 2022 and then stopped updating.
I rebuilt it with [Astro](https://astro.build), which turns Markdown files into
static HTML.

## Writing and publishing

Posts and project summaries live in Markdown files. Their titles, dates, and
other fields are checked during the build, so a missing description or an
invalid date gets caught before publishing. The longer visual project pages
also have JSON files for their text, captions, and charts.

A push to the main branch runs the checks and build in GitHub Actions, then
publishes the output to GitHub Pages. I don't upload the files by hand or run an
application server for the site.

Astro writes directory pages such as `blog/index.html`. GitHub Pages can serve
that file when someone visits `/blog`. A host that looks up files by their exact
path would need a rewrite rule to add `index.html`.

The custom domain is configured in the repository's Pages settings, with DNS
pointing to GitHub Pages. The site configuration supplies the matching address
for canonical links and the sitemap.

## The moving Enter button

[Fitts's Revenge](/projects/fitts-revenge) is the button on the home page that
moves away from a mouse cursor. Tab and Enter let you through, and touch and pen
work normally. I built it to let mouse users briefly experience an interface
that gets in their way.

The button estimates where the cursor is heading and chooses a position from
a 5×5 grid across the screen. It checks both the current and predicted cursor
positions, since prediction alone can miss a fast approach. The project page
explains that behavior in more detail.

Keyboard controls stay available, including in Safari, where the dialog handles
its own focus cycle. Escape closes it, and a skip button appears after a few
evasions. Reduced motion keeps the Enter button still. Without JavaScript, the
page opens without the dialog.

## Demos and other controls

JavaScript also runs the theme toggle, demo launchers, and interactive project
demos. The site doesn't send a client-side framework to the browser. Videos
have playback controls, and the project pages explain which visuals come from
the original work and which were made later to explain it.

The view counter is optional. A build setting supplies its endpoint; when that
setting is empty, the site makes no counter request and hides the counts. If a
request fails, the page still works.

One request fetches all the counts needed by a page, so a list of twenty posts
doesn't need twenty requests. Opening that list also doesn't count as viewing
every post it links to.
