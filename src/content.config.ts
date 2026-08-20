import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

/**
 * What a project's stage opens, if anything. A discriminated union so that a
 * mistyped `type` fails the build instead of rendering an empty box, and so
 * each kind can demand exactly the fields it needs.
 *
 * The three kinds share one host (`ProjectDemo.astro`) and one modal, which is
 * the point: swapping a project from `video` to `scene` later is a frontmatter
 * edit, not a layout change.
 */
const demo = z.discriminatedUnion('type', [
  /** An interactive piece that lives in this repo, opened by its own code. */
  z.object({
    type: z.literal('component'),
    /** Extend as pieces are added; an unknown id fails the build. */
    id: z.enum(['fitts-revenge']),
    /** Label for the stage button, e.g. "Try the front door". */
    cta: z.string(),
  }),
  /** A YouTube recording. Embedded only once the modal opens. */
  z.object({
    type: z.literal('video'),
    /** Bare video id, not a URL — `mFiywZ0S4WU`. */
    youtube: z.string().regex(/^[\w-]{11}$/, 'expected an 11-character YouTube id'),
    cta: z.string().default('Watch the demo'),
    /** Optional local still, e.g. `/posters/foo.jpg`. Never remote: a remote
        poster would call out to Google before anyone clicked. */
    poster: z.string().startsWith('/').optional(),
  }),
  /**
   * A playable build served from `public/demos/<path>/`. Nothing uses this
   * yet — it is here so the space is genuinely open, and so the day a WebGL
   * export lands the only new work is the export itself.
   */
  z.object({
    type: z.literal('scene'),
    /** Directory under `public/demos/`, containing an `index.html`. */
    path: z.string(),
    cta: z.string().default('Launch the demo'),
    /** CSS aspect-ratio for the stage, e.g. '16/9' or '4/3'. */
    aspect: z.string().default('16/9'),
    /** How to drive it. Shown beside the stage, because a canvas tells a
        screen reader nothing and a mouse-only demo tells a keyboard nothing. */
    controls: z.string(),
    poster: z.string().startsWith('/').optional(),
  }),
]);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    /** Card and meta-tag summary. Long write-ups belong in the body, which
        `/projects/<id>` renders. */
    description: z.string(),
    /** Displayed verbatim, so "2022" and "2022 – 2023" are both fine. */
    period: z.string(),
    stack: z.array(z.string()).default([]),
    links: z
      .array(z.object({ label: z.string(), href: z.string().url() }))
      .default([]),
    featured: z.boolean().default(false),
    /** Lower sorts first. */
    order: z.number().default(100),
    demo: demo.optional(),
  }),
});

export const collections = { blog, projects };
