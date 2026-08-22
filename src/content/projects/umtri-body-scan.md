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
  cta: 'Run the recovered application'
  controls: 'Select synthetic PLY scans, run the recovered batch workflow, inspect all nine camera views and 2D-to-3D stages, orbit the output, tune confidence, and export a synthetic joint CSV.'
links:
  - label: 'Dr. Park'
    href: 'https://sites.google.com/view/danielpark/home'
  - label: 'UMTRI'
    href: 'https://www.umtri.umich.edu'
featured: true
order: 20
---

The original private repository and an August 2022 application email were still
recoverable. They show that this was more than an analysis script: I shipped a
Tkinter desktop interface, a command-line workflow, and separate PyInstaller
packages for macOS and Windows. The interface supported model-folder discovery,
batch selection, configurable OpenPose and output folders, optional result
visualization, CSV writing, run progress, and logs.

Underneath that interface was a nine-view reconstruction pipeline. A PLY scan
was rendered with VTK at 45° intervals from 0° through 360°. OpenPose produced
25 BODY_25 joints per view as x, y, and confidence. Detections below 0.30 were
discarded; accepted points were ray-picked onto the rotated mesh, transformed
back into the scan's original coordinate system, and combined across views by
minimizing distance to the recovered 3D rays.

The interactive application is a **privacy-safe reconstruction** of both the
shipped interface and its processing stages. Choose one or more generated PLY
subjects, use **Run Selected** or **Run All**, inspect the generated views,
BODY_25 detections, scan rays, optimized joints and dimensions, then export a
synthetic CSV. Every vertex and value is generated in the browser. No
participant scan, photograph, research output, proprietary model, or
confidential code is included.

The artifacts also explain two useful debugging lessons: an early version
captured eight images while downstream code expected nine, and the C# and
Python implementations initially disagreed about transformation order. Making
the camera count and coordinate frames visible was as important as the pose
model itself.
