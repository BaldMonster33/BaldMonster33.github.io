---
title: AR Tree-Planting Game
description: >-
  Two-person augmented reality game built for a Michigan XR course. Players
  plant and tend trees anchored to real surfaces in their surroundings.
period: 'Oct 2022'
stack: ['Unity', 'AR Foundation', 'C#']
demo:
  type: scene
  path: ar-tree-planting
  cta: 'Play the recovered game loop'
  controls: 'Switch between Plant and Interact, place an acorn, choose inventory items, water the tree, and collect its seed.'
links:
  - label: 'Original team demo'
    href: 'https://youtu.be/YerayK96dG4'
featured: true
order: 30
---

The original repository and course board survived even though the deployable
mobile build did not. Together they recover the game's systems: plane-anchored
acorn placement, planting and interaction modes, ten tree stages, a shared
inventory bar, item shop, compass, landmarks, orbit controls, and synchronized
state between players.

The playable scene above is a lightweight **artifact-backed reconstruction** of
that loop. It uses a generated park instead of a device camera and compresses
the ten original tree assets into five visible stages, but the decisions and
state transitions come from the 2022 project. The linked recording is the
team's original *Ann Arbor Go* demo.
