---
title: 'XLNet for Verifiable Commonsense Reasoning'
description: >-
  Adapted the TRIP reasoning pipeline to XLNet and used loss-function ablations
  to examine the gap between choosing a plausible story and identifying the
  physical evidence that supports that choice.
period: 'Sept 2021 – Dec 2021'
stack: ['Python', 'PyTorch', 'Hugging Face', 'XLNet', 'NLP']
links:
  - label: 'Course report'
    href: '/artifacts/xlnet-trip/xlnet-trip-course-report-2021.pdf'
  - label: 'Code'
    href: 'https://github.com/BaldMonster33/Verifiable-Coherent-NLU'
featured: true
order: 22
---

A language model can choose the more plausible of two stories while failing
to explain what makes the other impossible. That gap matters when a system's
answer needs to be supported by reasoning that a person can inspect.

For this University of Michigan natural-language-processing course project,
I evaluated XLNet on TRIP, the Tiered Reasoning for Intuitive Physics dataset
introduced by Storks and colleagues. TRIP pairs plausible and implausible
stories and tests progressively stronger forms of reasoning: choosing the
plausible story, identifying conflicting sentences, and predicting the physical
states responsible for the conflict.

## My contribution

I adapted the published TRIP pipeline to Hugging Face XLNet, fine-tuned the
model, and evaluated loss-function ablations. The project used four supervision
signals: precondition classification, effect classification, conflicting-sentence
detection, and story choice. Removing selected losses made it possible to
examine how supervision at one level affected behavior at the others.

The linked repository preserves my modified notebook in a fork of the original
research code. The dataset, tiered reasoning framework, and underlying pipeline
are credited to Storks and colleagues; my work extends that setup to XLNet.

## What the evaluation revealed

| Validation metric | All losses | No state losses |
| --- | ---: | ---: |
| Accuracy | 76.7% | 80.0% |
| Consistency | 12.7% | 0.0% |
| Verifiability | 0.0% | 0.0% |

“No state losses” omits the physical-state classification losses.

Accuracy measures correct story choices. Consistency also requires identifying
the conflicting sentence pair; verifiability additionally requires identifying
the relevant physical states. In the second configuration, higher accuracy
coincided with failure on both stronger reasoning measures. Correct answers
alone therefore gave an incomplete account of the model's behavior.

This result shaped how I approach model evaluation: measure the intermediate
capabilities needed to justify an answer, alongside the final answer itself.
An aggregate classification score can hide weaknesses that a structured
evaluation exposes.

## Report and code

The linked document is my original December 2021 course report, rather than a
peer-reviewed publication. Its BERT, RoBERTa, and DeBERTa comparisons are
reported baselines from Storks et al.; they are not independent reruns. The
table above reproduces the report's XLNet validation results. The archived
notebook and report preserve the historical work; these experiments have not
been rerun for this portfolio.
