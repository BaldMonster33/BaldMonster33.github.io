---
title: Body Dimension Estimation from Clothed 3D Scans
description: >-
  Research at the University of Michigan Transportation Research Institute under
  Dr. Byoungkeon Daniel Park. Built a standalone tool that recovers body
  measurements from scans of clothed subjects, so studies no longer need
  subjects scanned in fitted clothing.
period: 'May – Aug 2022'
stack: ['Python', 'Computer vision', '3D geometry']
demo:
  type: scene
  path: body-scan
  cta: 'Explore the recovered pipeline'
  controls: 'Drag the synthetic scan to rotate it, select any of nine camera views, step through the pipeline, and adjust the confidence threshold.'
links:
  - label: 'Dr. Park'
    href: 'https://sites.google.com/view/danielpark/home'
  - label: 'UMTRI'
    href: 'https://www.umtri.umich.edu'
featured: true
order: 20
---

The recovered research artifacts document a nine-view pipeline. A 3D scan was
rendered at 45° intervals from 0° through 360°. OpenPose produced 25 joints per
view, represented as x, y and confidence—75 values per image and 675 across the
nine renders. Accepted 2D detections were ray-picked back onto the scan and
transformed into the original 3D coordinate system before measurement.

The interactive viewer is a **privacy-safe reconstruction** of that process.
Its point cloud is generated from equations in the browser, and its dimensions
are illustrative. No participant scan, photograph, research output, or
confidential code is included.

The artifacts also explain two useful debugging lessons: an early version
captured eight images while downstream code expected nine, and the C# and
Python implementations initially disagreed about transformation order. Making
the camera count and coordinate frames visible was as important as the pose
model itself.
