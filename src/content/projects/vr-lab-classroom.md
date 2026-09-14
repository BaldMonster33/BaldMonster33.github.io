---
title: VR Lab Classroom
description: >-
  Maxwell Zuber and I recreated a university lab in Unreal Engine, with
  classroom props and a piano that responds to a motion controller.
period: 'Oct 2022'
stack: ['Unreal Engine', 'Blueprints', 'VR']
demo:
  type: scene
  path: vr-lab-classroom
  cta: 'Explore the browser classroom'
  controls: 'Use WASD or arrows to move, Q/E to turn, Space to interact, or use the on-screen controls and piano keys.'
links:
  - label: 'Original walkthrough'
    href: 'https://youtu.be/NXmAPaRWJgg'
featured: false
order: 40
---

Maxwell Zuber and I rebuilt one of our university labs in virtual reality.
Alongside the windows, computer stations, and fixtures, we added a printer,
violin, trash can, discarded math book, and a piano played with a motion
controller.

Touching a piano key played a default note. Controller buttons changed the
selection between C, D, E, and G, which the original write-up describes using
to play *Mary Had a Little Lamb*. The write-up credits this interaction to the
team without assigning individual components to either of us.

The private Unreal repository survives with 44 commits, two contributors, the
classroom assets, and the original write-up. The linked walkthrough shows that
build. The browser version recreates the four-note piano interaction and a
short tour of the props using new geometry and generated oscillator tones.
It doesn't reuse the film audio credited in the original student build.
