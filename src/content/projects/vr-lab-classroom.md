---
title: VR Lab Classroom
description: >-
  Virtual reality recreation of a university lab classroom, built with a
  teammate for a Michigan XR course, with interactive elements added on top of
  the faithful reconstruction.
period: 'Oct 2022'
stack: ['Unreal Engine', 'Blueprints', 'VR']
demo:
  type: scene
  path: vr-lab-classroom
  cta: 'Enter the recovered classroom'
  controls: 'Use WASD or arrows to move, Q/E to turn, Space to interact, or use the on-screen controls and piano keys.'
links:
  - label: 'Original walkthrough'
    href: 'https://youtu.be/NXmAPaRWJgg'
featured: false
order: 40
---

The private Unreal repository survived with 44 commits, two contributors, the
classroom assets, and the original write-up. It confirms the room included
custom props such as a printer, violin, trash can and discarded math book, plus
a motion-controller piano.

Touching the piano's keys played a default note; controller buttons selected
four notes arranged so the player could perform *Mary Had a Little Lamb*. The
browser reconstruction keeps that four-note interaction and a small
first-person artifact tour, while generating its own geometry and oscillator
tones. It deliberately does not reuse the film audio credited in the original
student build.
