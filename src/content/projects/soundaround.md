---
title: 'SoundAround: Wearable Sound Localization'
description: >-
  Designed and built a wearable prototype that translates sound direction into
  peripheral LED cues, integrating microphone hardware and Python software and
  analyzing how people interpret its feedback.
period: 'Spring 2023'
stack: ['Python', 'Raspberry Pi', 'ReSpeaker', 'Interaction design', 'Human evaluation']
links:
  - label: 'Course report'
    href: '/artifacts/soundaround/soundaround-course-report-2023.pdf'
  - label: 'Historical source ZIP'
    href: '/artifacts/soundaround/historical-source.zip'
  - label: 'Code on GitHub'
    href: 'https://github.com/BaldMonster33/BaldMonster33.github.io/tree/main/project-source/soundaround'
featured: true
order: 24
---

Sound provides spatial information even when its source is outside our field
of view. SoundAround explores how a wearable interface could communicate
that direction visually, with accessibility for deaf and hard-of-hearing people
as its design motivation. Instead of asking someone to check a separate screen,
the prototype places directional feedback in their peripheral vision.

This Spring 2023 Engineering Interactive Systems course project at the
University of Michigan was a collaboration with Jeremy Zhengqi Huang.

## My contribution

I originated the idea and handled hardware assembly, Python software,
interaction design, testing, and results analysis. The engineering challenge
was connecting a stream of sound-direction estimates to a visual representation
that people could interpret while wearing the device. I worked across the
physical prototype and its software, then examined where the interaction
succeeded and where environmental noise made it harder to use. Jeremy and
I coauthored the course report; I did not lead the participant study sessions.

## From sound direction to peripheral cues

The prototype combines a ReSpeaker four-microphone array, Raspberry Pi,
programmable LED strip, and portable power bank. The microphone device supplies
direction estimates. Python shares those readings between acquisition and
display processes, translating direction into LED position and using red/green
coding to distinguish sounds in front from sounds behind the wearer.

This division connects hardware sensing, concurrent software, and interaction
design: the sensing system estimates direction, while the display makes that
estimate interpretable without requiring a handheld interface.

## What the evaluation showed

The report describes five participants completing direction-identification
tasks in a quiet lab, wearing noise-cancelling headphones for the LED-only
conditions.

| Task | Correct trials | Accuracy |
| --- | ---: | ---: |
| Front-direction identification | 22 / 25 | 88% |
| Rear-direction identification | 14 / 15 | 93.3% |

The rear task counted pointing at or very near the tested direction as correct.
These are participant task results, not angular localization accuracy. The
headphone condition does not reproduce the deaf or hard-of-hearing experience.
Outdoor tests exposed a practical limitation: background noise could make the
LED indications unstable and increase interpretation time. The linked source
preserves experimental prototype variants and known defects; it has not been
verified as a reproducible final release. The report and code document the
original course work and the questions it raised for further development.
