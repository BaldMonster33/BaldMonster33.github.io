---
title: 'Interactive Segmented Style Transfer'
description: >-
  Designed and built an application that lets users select an object with
  positive and negative clicks, apply an artistic style, and preserve the
  background. Evaluated four style-transfer models for quality and speed.
period: 'Fall 2022'
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

Whole-image style transfer changes a scene even when someone only wants to
restyle one object. This University of Michigan computer-vision course project
combined interactive segmentation with neural style transfer so users could
choose what changed and retain the surrounding image.

## My contribution

I originated the idea and led the design, implementation, model evaluation,
and application integration. The project was completed with Yu Peng,
Christopher Yeh, and Yu-Ju Chiu, who are credited on the course report.

The pipeline uses FocalClick to generate and refine a mask from positive and
negative clicks. A style-transfer model processes the content and reference
style images; mask-based compositing then combines the stylized region with
the original background. This made object selection adjustable without
requiring the user to draw a precise boundary by hand. The segmentation and
stylization models were existing research implementations; my work was their
integration into an interactive application and its evaluation.

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

The report's measurements expose a quality–speed tradeoff: AdaAttN has the
lowest ArtFID, while AdaIN has the fastest stylization step. The timing
excludes mask application and compositing, and the report does not specify
hardware, so it does not establish end-to-end interaction latency. The table
above preserves the numerical results while correcting the report's reversed
ArtFID arrow and inconsistent summary.

## Progress presentation

<video controls preload="metadata" width="968" height="546" aria-label="Interactive Segmented Style Transfer progress presentation">
  <source src="/artifacts/segmented-style-transfer/progress-presentation-2022.mp4" type="video/mp4" />
  <p><a href="/artifacts/segmented-style-transfer/progress-presentation-2022.mp4">Open the progress presentation</a>.</p>
</video>

The four-minute recording covers the pipeline (0:30), click-based selection
and selective-styling examples (1:30), and an earlier ArtFID experiment (2:43).
It captures a progress checkpoint before the unified application was finished;
I completed that integration later. Its experimental scores differ from the
report and are not combined with the table above.

The linked report preserves the final course write-up. The full application
source has not been recovered; the linked ClickSEG repository is the upstream
segmentation dependency. Examples in the report and recording use DAVIS and
WikiArt material credited in the report.
