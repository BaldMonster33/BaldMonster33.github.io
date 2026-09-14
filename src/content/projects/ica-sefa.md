---
title: 'ICA-SeFa: Interpretable Semantic Directions in GANs'
description: >-
  I helped implement a method for editing generated faces and ran a human study
  to check whether each edit changed a recognizable feature consistently
  across different faces.
period: 'Jan 2021 – Sept 2021'
stack: ['Python', 'FastICA', 'GANs', 'Human evaluation', 'CLIP']
links:
  - label: 'Course report'
    href: '/artifacts/ica-sefa/ica-sefa-course-report-2021.pdf'
  - label: 'Presentation'
    href: 'https://drive.google.com/file/d/1GoPQ-Sas7qviviR_hrQ4NSJF5p4nLFAA/view'
featured: true
order: 21
---

This project explored how to change one feature in a generated face, such as
its hair color, without changing several others. I helped implement ICA-SeFa
for a University of Michigan machine-learning course and ran its human
evaluation.

An editing direction changes the inputs used to generate an image. ICA-SeFa
finds these directions by applying FastICA to a pretrained generator's weights,
building on Semantic Factorization (SeFa). It doesn't require training another
neural network, though evaluating the directions still requires generating
images and checking what changed.

## My contribution

I helped implement the method, designed and ran the human study, recruited
annotators, analyzed the results, and coauthored the report. The study checked
whether each direction changed a recognizable feature consistently across
different faces.

Houming Chen proposed the idea, developed the theory and algorithm, and led its
implementation. Dongyang Zhao implemented the CLIP-based analysis; Yutong Bi
and Jiaxi Chen contributed to the literature review and theory development.
The course report includes the team's full contribution statement.

## Comparing the editing directions

We compared ICA-SeFa with SeFa using StyleGAN2 pretrained on FFHQ. The
experiment found 200 directions per method and manually selected 35 from each
for eight annotators to rate. The report lists the ten highest-scoring
directions. These mean opinion scores are averages of human ratings, rather
than classification accuracy. The team also compared images side by side and
used CLIP to measure how the edits correlated with named attributes.

The selected ICA-SeFa examples showed clearer control over individual
features, and its highest-rated directions received higher human scores than
SeFa's. Because we rated a manually selected subset, these results don't
describe the average across every discovered direction.

The 2021 course report includes the experiments and example edits.
[The team's four-minute presentation](https://drive.google.com/file/d/1GoPQ-Sas7qviviR_hrQ4NSJF5p4nLFAA/view)
walks through the project.
