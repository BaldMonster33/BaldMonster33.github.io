---
title: 'AR Navigator: dev log'
description: >-
  Notes and the original trailer for our mobile object-finding prototype,
  which uses an arrow, spatial sound, and vibration to indicate direction.
date: 2022-11-10
tags: ['xr', 'portfolio']
---

Virtual Navigator was our four-person EECS 498 capstone project. I proposed
the idea to explore how a phone could help people with vision impairments find
everyday objects. We built a Unity prototype that uses an arrow, spatial sound,
and vibration to point toward a selected target.

<div class="video">
  <iframe
    src="https://www.youtube-nocookie.com/embed/Xf8MJ09-pX8"
    title="ARNav — original Virtual Navigator team trailer"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>

## How it worked

The app used AR Foundation and ARKit for the camera view and tracking, and
Barracuda to run the YOLOv3-tiny object-detection model on the phone. Users could
select a detected object or add a labelled reference image from the photo
library. An arrow and spatial sound indicated direction, and the phone
vibrated when it lined up with the target. Spoken labels supported the controls.

Our December 7 peer playtest confirmed that sound and vibration worked, but
testers were confused by the two target modes. We focused on connecting those
search flows and revising the interface. A partially developed radar map was
set aside. We also planned speech-to-text and entity recognition so users
could name a target without going through a visual menu.

These peer playtests helped us revise the design. They didn't establish how
well the prototype would work for people with vision impairments.

## What was recovered

The original WordPress post, “Dev Log – XRNavigation,” was published at
`johnnyq.ml` on November 10, 2022. When recovering this project, I couldn't find
the post at that domain or in the public web archives I checked. Its title and
date survived in browser history. The course submission retained the project
description and technology list, and the trailer and complete Unity project
survived on YouTube and in the team repository.

I reconstructed these notes from those records. The original WordPress text
hasn't been recovered. The browser demo on the
[project page](/projects/ar-navigator) uses generated scenery and detections
to recreate the interaction, while the video above shows the original mobile
application.
