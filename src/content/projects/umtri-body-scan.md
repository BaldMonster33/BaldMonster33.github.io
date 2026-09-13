---
title: 3D Joint Estimation from Clothed Body Scans
description: >-
  Research at the University of Michigan Transportation Research Institute under
  Dr. Byoung-Keon (Daniel) Park. Adapted the lab's joint-estimation prototype into
  a Python/VTK pipeline and delivered a batch desktop application for macOS and Windows.
period: 'May – Sept 2022'
stack: ['Python', 'VTK', 'OpenPose', '3D geometry', 'Tkinter']
demo:
  type: scene
  path: body-scan
  cta: 'Explore the pipeline'
  controls: 'Explore a synthetic reconstruction: select generated scans, inspect the rendered views and 2D-to-3D stages, orbit the illustration, and export synthetic coordinates.'
links:
  - label: 'Dr. Park'
    href: 'https://sites.google.com/view/danielpark/home'
  - label: 'UMTRI'
    href: 'https://www.umtri.umich.edu'
featured: true
order: 20
---

My research focused on adapting the lab's C# joint-estimation prototype into a
Python application. Mentor Byoung-Keon (Daniel) Park provided the original
method and prototype; I implemented the Python pipeline, debugged coordinate
transforms, and built the interface and application packages.

The pipeline rendered each PLY scan at 45° intervals from 0° through 360°:
nine images, including a repeated endpoint. OpenPose supplied 25 candidate
landmarks per image. Confidence filtering, inverse transforms, and optimization
over recovered rays produced estimated 3D joint coordinates. These are
implementation dimensions, not a measured accuracy result.

A key issue was the mismatch between nine rendered images and eight stored
transforms. I corrected that alignment and delivered batch selection, progress
logs, optional result visualization, and joint-coordinate CSV export through a
Tkinter interface, command-line workflow, and macOS/Windows packages.

The interactive demo is an **illustrative reconstruction using synthetic data**.
It makes the processing stages explorable in a browser; it is not the original
research executable or evidence of anatomical accuracy. The original scans,
research outputs, and private source code are not included.
