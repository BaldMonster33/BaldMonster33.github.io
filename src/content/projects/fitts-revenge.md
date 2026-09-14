---
title: Fitts's Revenge
description: >-
  An Enter button that dodges your mouse. You can still use the keyboard,
  touch, or a pen to get in. I built it as a small experiment about what
  happens when an interface gets in your way.
period: 'Aug 2026'
stack: ['Astro', 'TypeScript', 'CSS', 'a11y']
demo:
  type: component
  id: fitts-revenge
  cta: 'Try the button'
featured: true
order: 15
---

On the home page, the Enter button moves away as you try to click it. Press
Tab and Enter, though, and you can go straight through. Touch and pen work
normally too.

The name comes from Fitts's Law, which relates pointing time to a target's size
and distance. Designers use it to make buttons easier to reach. Here, the button
keeps moving away from the cursor.

## Why I made it

An interface can work for someone using a mouse and still be difficult or
impossible to use with a keyboard. I reversed that situation to give mouse users
a brief experience of a control getting in their way. It's a small interaction
experiment, not a simulation of someone's experience with a disability.

There are several ways through:

- Tab and Enter activate the button without making it dodge. The dialog handles
  its own focus cycle, including in Safari.
- Touch and pen activate it directly.
- Escape closes the dialog, and a skip button appears after a few evasions.
- With reduced motion enabled, the Enter button stays still.
- Without JavaScript, the page opens without the dialog.

## How the button moves

The first version moved away only when the cursor got close, so a slow approach
could catch it. The current version uses the cursor's direction and speed to
estimate where it's heading. It chooses a new position from a 5×5 grid across
the viewport, which lets it move across the screen instead of getting pushed
into a corner.

Checking only the predicted cursor position caused another problem: a fast
approach could look as if the cursor would pass the button safely. The code now
checks both the current and predicted positions and uses whichever is closer.

You can read about the rest of the site in
[how this site is built](/blog/colophon).
