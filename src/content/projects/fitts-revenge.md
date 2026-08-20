---
title: Fitts's Revenge
description: >-
  The splash screen on this site, and an empathy device. Fitts's Law says the
  time to hit a target falls out of its size and distance; this one refuses both,
  fleeing to wherever your cursor is not heading. A keyboard walks straight in,
  because the law never governed Tab and Enter — the same barrier a lot of people
  meet every day, pointed the other way round for once.
period: 'Aug 2026'
stack: ['Astro', 'TypeScript', 'CSS', 'a11y']
demo:
  type: component
  id: fitts-revenge
  cta: 'Try the front door'
featured: true
order: 15
---

Fitts's Law models how long it takes to acquire a target with a pointer: the
time falls out of the target's size and its distance, and nothing else. It is
one of the oldest results in interaction design and it is usually invoked to
make things easier to hit — bigger buttons, closer menus, corners you can
slam a cursor into.

This button is the same law read backwards. It refuses to hold a size and a
distance long enough to be modelled, because it moves every frame to whichever
part of the viewport is furthest from where the cursor is heading. Pointing at
it is not hard, it is undefined.

Then the keyboard walks straight in, because Fitts's Law never governed the
keyboard. Tab, Enter, done.

## Why it exists

Plenty of people arrive at a product and discover that the way they drive a
computer is the one way that does not work. Usually that means the mouse works
fine and everything else is broken. Here it is inverted, so that the majority
gets thirty seconds of the minority's experience — futility with a visible,
functioning door right next to it.

The inversion is only honest if the other routes are genuinely open, so they
are, and none of them require aim:

- Keyboard activation is detected and never dodges.
- Escape closes it.
- A `skip this` link appears once it is clear you are being toyed with.
- `prefers-reduced-motion` disables the whole act — dodging *is* the motion.
- Without JavaScript there is no door at all.

A version of this that also shut out the keyboard would not be making a point
about accessibility. It would just be inaccessible.

## Making it actually uncatchable

The first version merely flinched when the cursor got close, which is trivially
beatable — you approach slowly. Two changes fixed that. It aims at the cursor's
*predicted* position rather than its current one, and it chooses from a 5×5 grid
of candidate resting places rather than simply fleeing the cursor, because pure
repulsion can be walked into a corner and pinned.

I checked the targeting by replaying the maths headlessly against a simulated
cursor chasing the button from a slow creep to a violent flick. That caught a
bug I would not have found by hand: judging danger purely by predicted position
reads a fast, direct approach as *heading past me, no danger*, and the pursuer
could sit inside the button 7% of the time. Danger is now the nearer of where
the cursor is and where it is going, and that figure is zero at every speed
above a crawl.

There is a fuller account of the implementation in
[how this site is built](/blog/colophon).
