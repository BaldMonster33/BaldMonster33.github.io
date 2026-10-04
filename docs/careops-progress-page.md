# CareOps progress page

Prepared September 25, 2026. Route: `/projects/careops/`. A general-audience progress page with conversational copy. This page can be published independently of the private CareOps application; it contains no live household connection.

## Ownership and concurrent work

Another task was adding Virtual Navigator to this same checkout. After discovering its changes, this task waited more than two minutes before editing. Its layout, home-page changes, teaser, media and project entry were preserved. The shared `src/pages/projects/[id].astro` received only the CareOps import, standalone flag and render branch, keeping CRUX and Virtual Navigator branches intact.

CareOps-owned files: `src/components/CareOpsProgressPage.astro`, `src/content/projects/careops.md`, `src/assets/careops/`, this note, and `scripts/check-careops-page.mjs`. CareOps and Virtual Navigator are being prepared for a combined portfolio release, with one final integrated check of the shared route.

## Media and video

Two real early prototype screenshots are used, clearly dated August 2026 and labelled as sample data. They are not current household screenshots. Sources and image provenance are in `src/assets/careops/README.md`. Images open at full size and are emitted as responsive WebP assets.

The 40-second review belongs to Virtual Navigator (`portfolio/versions/0.5.0-7/environment-review.mp4`) and appears on that project's page. CareOps uses its own prototype screenshots.

## Facts used

Current implementation was read in the sibling `careops-demo` checkout on September 25. These are implementation-progress descriptions, not current operational-health assertions:

- Guided Chinese/English button setup: `app/start/setup-app.tsx`, `lib/operator-commands.js`, `tests/setup-flow.test.mjs`.
- Device freshness/conflict/unknown states: `lib/live-ingest.js`, `tests/live-ingest.test.mjs`.
- Durable local queue and restart behaviour: `edge/queue.mjs`, its automated tests. Real hardware outage validation remains a separate gate.
- Local repair and fresh-source re-check: `lib/lab-case.js`, `tests/lab-case.test.mjs`. Not production multi-person case management.
- Private iPhone pilot: `ios/CareOpsOperator/` and `docs/ios-operator-app.md`.
- Everyday-task helper: `lib/item-recommendations.js` and `docs/everyday-item-recommendations.md`, still local-only.

No household data, personal records, hardware identifiers, account credentials or private application endpoint is embedded or linked. No accuracy percentage, clinical benefit, safety assurance, provider endorsement or algorithmic novelty is claimed. The sample flow is visibly an illustration; hardware and workflow testing are not described as a completed end-to-end field deployment.

## Validation

Run `npm run check && npm run build && node scripts/check-careops-page.mjs` from this repository. The final static check verifies the generated route, screenshot assets, sample-data labels, project-list link, public-safe copy and retained sibling render branches.

The page was reviewed in the in-app browser at desktop and phone widths, in light and dark mode. The review caught an inherited uppercase section-title style; the CareOps component overrides it locally rather than changing shared styles. No visual test implies real-user accessibility acceptance.
