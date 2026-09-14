---
title: 'SoundAround: Wearable Sound Localization'
description: >-
  A wearable prototype that uses LEDs at the edge of the wearer's vision to
  show where a sound is coming from. I worked on its hardware, Python software,
  interaction design, testing, and results analysis.
period: 'Jan 2023 – Apr 2023'
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

SoundAround uses LEDs at the edge of the wearer's vision to show where a sound
is coming from. I proposed it with deaf and hard-of-hearing people in mind:
the lights would let someone check a sound's direction while still looking at
their surroundings.

Jeremy Zhengqi Huang and I built the prototype for our Engineering Interactive
Systems course at the University of Michigan.

## My contribution

I came up with the idea and worked on hardware assembly, Python software,
interaction design, testing, and results analysis. That meant connecting the
microphone's direction readings to the LED display, then examining how people
read the cues and where background noise made them harder to use. Jeremy and I
wrote the course report together. I didn't lead the participant study sessions.

## How the lights work

The prototype combines a ReSpeaker four-microphone array, Raspberry Pi,
programmable LED strip, and portable power bank. The microphone device supplies
direction estimates to a Python process. A separate display process reads
those estimates and lights the corresponding LED positions. Red and green
distinguish sounds in front from sounds behind the wearer.

Early feedback led to changes in how directions mapped to the LEDs. The revised
display used lower brightness, added diffusion, and dimmer idle lights to make
the cues easier to read and the device more comfortable to wear.

## What the evaluation showed

The report describes five participants completing direction-identification
tasks in a quiet lab, wearing noise-cancelling headphones for the LED-only
conditions.

| Task | Correct trials | Accuracy |
| --- | ---: | ---: |
| Front-direction identification | 22 / 25 | 88% |
| Rear-direction identification | 14 / 15 | 93.3% |

The rear task counted pointing at or very near the tested direction as correct.
These percentages describe participant responses; they don't measure the
microphone's angular accuracy. Wearing headphones also doesn't reproduce the
experience of being deaf or hard of hearing, or establish how well the device
would work for those users.

Outdoors, background noise could make the lights unstable and increase the
time needed to interpret them. Further work would need to address noise
filtering and test the display in everyday settings.

The linked source contains experimental prototype variants with known defects.
It records the course work and hasn't been verified as a reproducible release.
