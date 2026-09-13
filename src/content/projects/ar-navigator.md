---
title: AR Navigator
description: >-
  Accessibility-minded augmented-reality object-finding prototype that detects
  objects or tracks an image reference, then guides the user with an arrow, spatial
  audio, and haptic feedback.
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

I originated the accessibility-focused object-finding idea and developed the
prototype with my course team. The original Unity application combined
YOLOv3-tiny object detection with AR Foundation image-reference tracking.
Targets could be selected and cycled, then located using an arrow, spatial
audio, and vibration. Accessible labels and text-to-speech supported the controls.

Our December 7 peer playtest confirmed working sound and vibration and surfaced
confusion about the two modes. The team focused on integrating their workflows
and polishing the interface, while deferring a partially developed radar map.
These were design playtests, not an effectiveness study with people with vision
impairments.

The linked **original team trailer** shows the mobile application. The browser
demo is an **illustrative reconstruction** of its interaction using synthetic
scenery and detections. It also exposes the radar as an unfinished prototype.
No private Unity source, model weights, or camera data is served by this page.
