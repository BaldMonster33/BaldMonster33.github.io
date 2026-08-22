---
title: AR Navigator
description: >-
  Accessibility-minded augmented-reality wayfinding prototype that detects or
  learns a target, then guides the user to it with an arrow, spatial
  audio, and haptic feedback.
period: 'Nov 2022'
stack: ['Unity', 'AR Foundation', 'Barracuda', 'C#']
demo:
  type: scene
  path: ar-navigator
  cta: 'Try the recovered interaction'
  controls: 'Choose a mode and target, drag Phone heading, or use N to cycle, P to ping, and M to switch modes.'
links:
  - label: 'Original team trailer'
    href: 'https://youtu.be/Xf8MJ09-pX8'
featured: false
order: 50
---

The original project websites at `johnnyq.ml` and `virtualnavigator.ml` are
gone, but the application is not. I recovered the private Unity repository and
rebuilt its interaction model above without publishing the source or any camera
data. The team's original product trailer also survived:

<div class="video">
  <iframe
    src="https://www.youtube-nocookie.com/embed/Xf8MJ09-pX8"
    title="ARNav — original Virtual Navigator team trailer"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>

## What survived

The recovered project uses Unity Barracuda to run a YOLO model against the live
camera. Detected objects become targets in the AR scene; a second mode lets the
user add a labelled reference image from their photo library instead. Once a
target is selected, the application combines several cues:

- an arrow points toward it;
- spatial audio places a ping in the target's direction;
- the phone vibrates when it is pointed at the target;
- accessible labels, dynamic text, and text-to-speech expose the controls.

The recovered postmortem adds an important distinction: the two detection modes,
website, trailer, on-device YOLOv3-tiny model, arrow, spatial audio, vibration,
and accessibility work formed the delivered project. A rotating 2D map/radar
was a promising prototype that the team intentionally stopped polishing before
the deadline. Its scripts and prefabs survived in the Unity repository, so the
browser reconstruction exposes it as an explorable **recovered prototype**, not
as a claim that it fully shipped.

The browser demo is an **artifact-backed reconstruction**, not the original
camera build. Its street scene and detections are synthetic, but the modes,
target cycling, guidance cues, stop state, and accessibility intent come from
the recovered 2022 source and project postmortem. The embedded trailer above is
the original mobile application recorded by the four-person EECS 498 team.
