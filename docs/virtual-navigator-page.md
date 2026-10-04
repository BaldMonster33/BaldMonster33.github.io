# Virtual Navigator development page

Prepared September 25, 2026.

## Page and scope

- Route: `/projects/virtual-navigator/`
- Local review: `http://127.0.0.1:4335/projects/virtual-navigator/`
- A visual introduction for a general audience, with the current 40-second review, four screenshots, a short development timeline, and concise context about what the prototype does today.
- Linked from the homepage featured work and the Projects page.
- The original `/virtual-navigator/` website and `/projects/ar-navigator/` course-project story remain unchanged.
- Prepared for a combined portfolio release with the CareOps progress page.

## Media

The video is an unchanged copy of `VirtualNavigator/portfolio/versions/0.5.0-7/environment-review.mp4`: 40 seconds, 1920 × 1080, 30 fps, silent. SHA-256 comparison against the source passed. It shows a scripted sequence in the native visionOS Simulator app. Device responses belong to the authored room; the page does not claim real home-device integration or accessibility validation.

Asset sources and credits are recorded in `src/assets/virtual-navigator/README.md`. Screenshots are optimized by Astro. The player has native controls, optional scene-description captions, a text walkthrough, and chapter buttons. It does not autoplay or preload the video.

## Validation

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: passed.
- `git diff --check`: passed.
- Browser: video plays; chapter buttons seek correctly, including a chapter selected before video metadata loads.
- Browser: checked desktop (1280), tablet (768), phone (390), and narrow phone (320) widths; no horizontal overflow. Light and dark themes checked.
- Browser: text walkthrough expands; Projects teaser opens the page; homepage contains the new teaser.
- Built HTML: canonical/social URL and social image point to the public route; media assets are included.
- Viewport screenshots are recorded in the source project's `portfolio/site-review/2026-09-25/` folder.

## Publication boundary

Virtual Navigator and CareOps share the project route. Both contributors have coordinated a combined portfolio release, with one final integrated build and deployment check. The shared layout, homepage, Projects listing, and dynamic project route are included. This release does not change access to the private CareOps application or operate any connected hardware.
