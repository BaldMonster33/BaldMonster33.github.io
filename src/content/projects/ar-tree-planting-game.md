---
title: AR Tree-Planting Game
description: >-
  A phone game where players explore a map, plant virtual trees on nearby
  surfaces, and defend them from squirrels with acorns. Built with Maxwell
  Zuber for our Michigan XR course.
period: 'Oct 2022'
stack: ['Unity', 'AR Foundation', 'C#']
demo:
  type: scene
  path: ar-tree-planting
  cta: 'Try the browser planting demo'
  controls: 'Browser reconstruction: switch between Plant and Interact, place a seed, choose items, and grow a tree. These simplified interactions differ from the original mobile game.'
links:
  - label: 'Original team demo'
    href: 'https://youtu.be/YerayK96dG4'
featured: true
order: 30
---

Maxwell Zuber and I built *Ann Arbor Go*, a phone game about planting virtual
trees around Ann Arbor. Players explore a map with compass and landmark cues,
switch to the camera view to place seeds on detected surfaces, and defend
trees from squirrels by throwing acorns.

I worked on the mode and navigation controls, camera setup, and acorn
interactions. We shared the implementation, with both of us working across the
game. Inventory, shop controls, tree growth, and planted-tree information
connect the map and AR scenes. This is a single-player game; the shared state
connects scenes within one game.

Problems deploying to the iPhone delayed our device tests. When we could test
on the phone, movement that had felt fast in the Unity Editor felt slow. My
course postmortem records that difference and the need for regular device tests.

The browser demo uses a generated park and simplified planting controls. Its
water and boost actions and five growth stages differ from the original mobile
game. The linked recording shows the team's original *Ann Arbor Go* demo. The
repository and course postmortem survive, but the original deployable mobile
build hasn't been recovered.
