---
title: AR Navigator
description: >-
  A mobile prototype that points toward a selected object with an arrow,
  spatial sound, and vibration. I proposed the idea for people with vision
  impairments and built it with my course team.
period: 'Nov – Dec 2022'
stack: ['Unity', 'AR Foundation', 'Barracuda', 'C#']
demo:
  type: scene
  path: ar-navigator
  cta: 'Explore the interaction'
  controls: 'Choose a mode and target, drag Phone heading, or use N to cycle, P to ping, and M to switch modes.'
links:
  - label: 'Original team trailer'
    href: 'https://youtu.be/Xf8MJ09-pX8'
featured: false
order: 50
---

AR Navigator uses an arrow, spatial sound, and vibration to point a phone
toward a selected object. I proposed the idea for people with vision
impairments and developed the prototype with my course team in Unity.

The app offers two ways to choose a target: select a common object detected by
YOLOv3-tiny, or add a labelled reference image for AR Foundation to track.
Users can cycle through targets, with spoken labels and accessibility support
for the controls.

Our December 7 peer playtest confirmed that sound and vibration worked, but
the difference between the two modes wasn't clear. We focused on connecting
the search flows and revising the interface, and set aside a partially
developed radar map. We used these playtests to improve the design; we haven't
established how well the prototype works for people with vision impairments.

The linked team trailer shows the original mobile application. The browser
demo recreates the interaction with generated scenery and detections, and
includes the unfinished radar prototype. The page doesn't serve private Unity
source, model weights, or camera data.
