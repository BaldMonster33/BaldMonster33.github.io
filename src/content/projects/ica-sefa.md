---
title: 'ICA-SeFa: Interpretable Semantic Directions in GANs'
description: >-
  Co-implemented a GAN representation-analysis method and designed its human
  evaluation, testing whether discovered editing directions produced consistent,
  interpretable changes across generated images.
period: 'Winter 2021 (course origin)'
stack: ['Python', 'FastICA', 'GANs', 'Human evaluation', 'CLIP']
links:
  - label: 'Course report'
    href: '/artifacts/ica-sefa/ica-sefa-course-report-2021.pdf'
  - label: 'Presentation'
    href: 'https://drive.google.com/file/d/1GoPQ-Sas7qviviR_hrQ4NSJF5p4nLFAA/view'
featured: true
order: 21
---

Changing a GAN's latent code can alter an image's expression, hair color, pose,
or other properties. Finding a useful editing direction requires more than a
visible change: the direction should behave consistently across images and
control an interpretable factor without changing several unrelated attributes.

This University of Michigan machine-learning course research project explored
that problem through ICA-SeFa. Building on Semantic Factorization (SeFa), the
method applies FastICA to pretrained generator weights to discover semantic
directions without training another neural network. Evaluation still requires
generating images and measuring the resulting changes.

## My contribution

I co-implemented the method and owned the human-evaluation work: designing the
experiments, recruiting annotators, conducting the evaluation, and analyzing the
results. I also coauthored the report. My contribution focused on connecting the
algorithm's proposed directions to observable, repeatable behavior across
generated images.

Houming Chen proposed the idea, developed the theory and algorithm, and led its
implementation. Dongyang Zhao implemented the CLIP-based analysis; Yutong Bi
and Jiaxi Chen contributed literature review and theory development. The named
course report preserves the team's full contribution statement.

## Evaluation in the course report

The course study compared ICA-SeFa with SeFa using StyleGAN2 pretrained on
FFHQ. It combined qualitative image comparisons, an eight-annotator human
evaluation, and CLIP-based semantic analysis. Human mean opinion scores
captured judgments about the discovered directions; CLIP re-scoring examined
how image edits related to named attributes.

Together, these methods examined whether a direction represented a clear
semantic change and how strongly it affected other attributes. This made
evaluation central to the project: a visible image change alone was not enough
to establish that a discovered direction was useful or interpretable.

The linked **2021 course report** includes the experiments, example edits, and
the team's contribution statement.

## Course presentation

[Watch the team's four-minute course presentation](https://drive.google.com/file/d/1GoPQ-Sas7qviviR_hrQ4NSJF5p4nLFAA/view)
alongside the report.
