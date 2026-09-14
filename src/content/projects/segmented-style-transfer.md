---
title: 'Interactive Segmented Style Transfer'
description: >-
  I built an application for selecting an object in a photo and applying an
  artistic style while keeping the original background. I compared four
  style-transfer models for quality and speed.
period: 'Sept 2022 – Dec 2022'
stack: ['Python', 'Computer vision', 'FocalClick', 'Style transfer', 'ArtFID']
links:
  - label: 'Course report'
    href: '/artifacts/segmented-style-transfer/style-transfer-course-report-2022.pdf'
  - label: 'Progress presentation'
    href: '/artifacts/segmented-style-transfer/progress-presentation-2022.mp4'
  - label: 'Segmentation dependency'
    href: 'https://github.com/XavierCHEN34/ClickSEG'
featured: true
order: 23
---

I built an application for selecting an object in a photo and applying an
artistic style to it. The selected area changes while the surrounding image
stays the same. This was a University of Michigan computer-vision course
project with Yu Peng, Christopher Yeh, and Yu-Ju Chiu.

## Selecting and styling an object

I proposed the idea and led the design, implementation, model comparisons,
and integration into the final application.

Positive and negative clicks guide FocalClick toward the object and away from
areas to leave out. It produces a mask that marks the area to edit, so users
can refine the selection without tracing the whole outline. A style-transfer
model processes the photo and a reference style image. The application then
uses the mask to combine the styled object with the original background.

I used existing segmentation and style-transfer implementations. My work
covered the interaction, integration, and evaluation.

## Comparing quality and speed

I compared four models using ArtFID on 1,000 sampled DAVIS585/WikiArt
image-mask-style combinations. Stylization timing was averaged across 600
transfers per model.

| Model | ArtFID (lower is better) | Stylization time (ms) |
| --- | ---: | ---: |
| AdaAttN | 27.419 | 37.3597 |
| PAMA | 27.541 | 9.2811 |
| IEContraAST | 27.946 | 10.1938 |
| AdaIN | 27.955 | 4.9166 |

AdaAttN had the lowest ArtFID, while AdaIN had the shortest stylization time.
The timings cover stylization only, excluding segmentation, mask application,
and compositing. The report doesn't specify the hardware or measure how long
the full application takes. This table keeps the reported numbers and
corrects the report's reversed ArtFID arrow and inconsistent summary.

## Progress presentation

<video controls preload="metadata" width="968" height="546" aria-label="Interactive Segmented Style Transfer progress presentation">
  <source src="/artifacts/segmented-style-transfer/progress-presentation-2022.mp4" type="video/mp4" />
  <p><a href="/artifacts/segmented-style-transfer/progress-presentation-2022.mp4">Open the progress presentation</a>.</p>
</video>

The four-minute recording shows the pipeline (0:30), click-based selection
and styling examples (1:30), and an earlier ArtFID experiment (2:43). I
finished combining the parts into one application after this presentation.
Its experimental scores differ from the course report and are kept separate
from the table above.

The linked report is the final course write-up. The full application source
hasn't been recovered; the ClickSEG link points to the segmentation
dependency. The report and recording use DAVIS and WikiArt images credited
in the report.
