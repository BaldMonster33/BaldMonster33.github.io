---
title: AWS Observability Analytics
description: >-
  Day job. I work on services that ingest, store, and query telemetry at AWS
  scale, and on the console surfaces engineers use to investigate incidents.
  Specifics stay internal.
period: '2023 – present'
stack: ['Java', 'AWS', 'Distributed systems']
demo:
  type: scene
  path: observability
  cta: 'Investigate a synthetic incident'
  controls: 'Scrub or play the incident timeline, filter by service or trace span, then test a working hypothesis.'
featured: true
order: 10
---

The public demo is intentionally synthetic: its service names, metric values,
trace spans, deploy event, and failure mode are invented. It shows the shape of
the work without describing internal architecture or exposing operational data.

Scrub through the incident and the same regression appears in three connected
views. Aggregate latency rises while traffic remains flat; the service map
localizes the change; representative traces reveal repeated calls; and a
correlated configuration event gives the investigation a concrete hypothesis
to test. This is the workflow I care about—turning telemetry from a pile of
charts into evidence an engineer can act on.
