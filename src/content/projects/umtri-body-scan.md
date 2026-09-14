---
title: 3D Joint Estimation from Clothed Body Scans
description: >-
  I adapted Dr. Byoung-Keon (Daniel) Park's joint-estimation prototype into a
  Python desktop tool at UMTRI. It estimates 3D joints from clothed body scans
  and processes batches on macOS and Windows.
period: 'May – Sept 2022'
stack: ['Python', 'VTK', 'OpenPose', '3D geometry', 'Tkinter']
demo:
  type: scene
  path: body-scan
  cta: 'Try the illustrated demo'
  controls: 'Select a synthetic scan, inspect its rendered views and the 2D-to-3D steps, rotate the illustration, and export synthetic coordinates.'
links:
  - label: 'Dr. Park'
    href: 'https://sites.google.com/view/danielpark/home'
  - label: 'UMTRI'
    href: 'https://www.umtri.umich.edu'
featured: true
order: 20
---

At the University of Michigan Transportation Research Institute, I adapted a
C# prototype from my mentor, Byoung-Keon (Daniel) Park, into a Python desktop
tool. It estimates joint positions from several views of a clothed body scan
and exports the coordinates. Dr. Park provided the original method and
prototype; I built the Python version, debugged the coordinate transforms,
and added the interface and application packages.

The tool renders each PLY scan in VTK at 45° intervals from 0° through 360°.
That produces nine images, with the first and last showing the same
orientation. OpenPose supplies 25 candidate landmarks per image. After
filtering low-confidence detections, the tool maps the accepted points back
into 3D rays in the scan's coordinate frame. An optimization step combines
these rays to estimate joint positions. These counts describe the processing
setup; they don't measure how accurate the estimates are.

I found nine rendered images paired with only eight stored transforms.
Fixing that mismatch restored the alignment. I also added batch selection,
progress logs, optional result visualization, and joint-coordinate CSV export
through a Tkinter interface and command-line workflow, then packaged the
application for macOS and Windows.

The browser demo uses synthetic data to explain the processing stages. It is
separate from the original application and doesn't demonstrate anatomical
accuracy. The original scans, research outputs, and private source code are
not included.
