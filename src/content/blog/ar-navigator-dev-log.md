---
title: 'AR Navigator: dev log'
description: >-
  Recovered notes and the original trailer for an AR and machine-learning tool
  that helps visually impaired people locate objects in a room.
date: 2022-11-10
tags: ['xr', 'portfolio']
---

Virtual Navigator was our four-person EECS 498 capstone project. We wanted to
help people with visual impairments find everyday items in a room by combining
on-device object detection with directional AR, audio, and haptic cues.

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

The Unity application used AR Foundation and ARKit for the camera-space
experience and Barracuda to run a YOLO object-detection model. A user could
select a detected object or add a labelled reference image from the photo
library. The app then combined an arrow, a rotating 2D radar, spatial sound,
speech, and vibration to guide the phone toward the target.

Our course submission described the social goal simply: give visually impaired
people a tool that helps them find items in their rooms. At submission time we
also planned speech-to-text and entity recognition so a request could become a
target without navigating a visual menu.

## What was recovered

The original WordPress post, **“Dev Log – XRNavigation,”** was published at
`johnnyq.ml` on November 10, 2022. The domain no longer resolves, and I found no
capture in the public web archives I checked. The title and date survived in
browser history; the project description and technology list survived in the
original course submission; the trailer survived on YouTube; and the complete
Unity project survived in the team repository.

This page is therefore a reconstruction from those primary artifacts, not a
verbatim copy of the lost WordPress text. The playable version on the
[project page](/projects/ar-navigator) follows the recovered interaction logic,
while the video above shows the original mobile application.
