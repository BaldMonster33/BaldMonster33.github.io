---
title: 'AR portfolio: a tree-planting game'
description: >-
  Maxwell Zuber and I built Ann Arbor Go, a phone game for planting virtual
  trees, exploring a map, and defending trees from squirrels.
date: 2022-10-28
tags: ['xr', 'portfolio']
---

Maxwell Zuber and I built *Ann Arbor Go* for the AR half of our Michigan XR
course. Players explore a map, switch to their phone's camera to plant seeds
on detected surfaces, and throw acorns to defend the trees from squirrels.
Inventory and planted-tree information carry between the map and AR scenes.

<div class="video">
  <iframe
    src="https://www.youtube-nocookie.com/embed/YerayK96dG4"
    title="AR tree-planting game demo"
    loading="lazy"
    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>

I worked on the mode and navigation controls, camera setup, and acorn
interactions. Maxwell proposed a drone mode that lets players scout the map
before traveling. We shared the implementation, with both of us working across
the game.

Problems deploying to the iPhone delayed our device tests. Once we could try
it on the phone, movement that had felt fast in the Unity Editor felt slow.
That difference made regular device testing a lesson I recorded in the course
postmortem.

The video shows the original mobile game. The
[project page](/projects/ar-tree-planting-game) has a browser demo with a
generated park and simplified planting controls. Its water and boost actions
and growth stages differ from the mobile version. The original deployable
build hasn't been recovered.
