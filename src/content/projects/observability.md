---
title: AWS Observability Analytics
description: >-
  At AWS, I work on services that collect, store, and query system data, and
  the console engineers use to investigate problems. The demo here uses a
  made-up incident to show how those investigations work.
period: '2023 – present'
stack: ['Java', 'AWS', 'Distributed systems']
demo:
  type: scene
  path: observability
  cta: 'Investigate an example incident'
  controls: 'Move through the timeline, filter by service or trace span, then test a possible cause.'
featured: true
order: 10
---

In this example, requests start taking longer even though traffic hasn't
increased. Moving through the timeline lets you follow the problem from an
overall latency chart to a service map, then to traces of individual requests.
The traces show repeated calls, and a configuration change gives you a possible
cause to test.

This is the part of observability I care about: helping engineers connect
what they see in the data to a problem they can investigate. A chart can show
that something changed; the next step is working out where and why.

All services, measurements, traces, events, and causes in the demo are made up.
It illustrates an investigation without using internal AWS architecture or
operational data.
