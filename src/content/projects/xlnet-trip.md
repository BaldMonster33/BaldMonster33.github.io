---
title: 'XLNet for Verifiable Commonsense Reasoning'
description: >-
  I adapted the TRIP reasoning pipeline to XLNet and compared training losses
  to check whether the model could choose a plausible story and explain
  the physical conflict in the other one.
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

I adapted the TRIP reasoning pipeline to XLNet to test whether it could
identify why a short story was physically impossible. This was a University
of Michigan natural-language-processing course project.

TRIP, the Tiered Reasoning for Intuitive Physics dataset from Storks and
colleagues, pairs plausible and implausible stories. It checks the model's
story choice, the conflicting sentence pair, and the physical states before
and after an action that explain the conflict.

My work covered integrating Hugging Face XLNet, fine-tuning the model,
comparing training losses, evaluating the results, and writing the report.
The training used four signals: precondition classification, effect
classification, conflicting-sentence detection, and story choice. I removed
selected losses to examine how each part of the training affected the results.

## Validation results

| Validation metric | All losses | No state losses |
| --- | ---: | ---: |
| Accuracy | 76.7% | 80.0% |
| Consistency | 12.7% | 0.0% |
| Verifiability | 0.0% | 0.0% |

“No state losses” omits the physical-state classification losses.

Accuracy counts correct story choices. Consistency also requires the correct
conflicting sentence pair; verifiability adds the relevant physical-state
predictions. Without the state losses, story accuracy rose from 76.7% to
80.0%, while consistency fell from 12.7% to zero. Verifiability was zero in
both configurations: neither met the full requirements for explaining the
conflict in this validation table.

## Report and code

The table comes from my December 2021 course report, which wasn't a
peer-reviewed publication. The report's BERT, RoBERTa, and DeBERTa comparisons
use baselines published by Storks et al.; I didn't rerun those models. The
XLNet experiments haven't been rerun for this portfolio, and the two
configurations don't establish statistical significance.

My modified notebook is in the linked public fork of the original research
code. Storks and colleagues created the dataset, reasoning framework, and
underlying pipeline; my work adapted that setup to XLNet.
