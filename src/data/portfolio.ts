import { z } from 'astro:content';

const localMedia = z.string().regex(/^\/media\/projects\/[a-z0-9/-]+\.(svg|webp|png|jpg|jpeg|mp4)$/);
const media = z.object({
  type: z.enum(['image', 'video']), src: localMedia, poster: localMedia.optional(),
  alt: z.string().min(1), caption: z.string(), credit: z.string().optional(),
}).refine((value) => value.type !== 'video' || Boolean(value.poster), 'Video needs a still poster');
const chart = z.object({
  title: z.string(), subtitle: z.string().optional(), labels: z.array(z.string()).min(1),
  series: z.array(z.object({ name: z.string(), values: z.array(z.number().nonnegative()), color: z.enum(['primary', 'secondary']).optional() })).min(1),
  max: z.number().positive(), unit: z.string(),
}).refine((value) => value.series.every((s) => s.values.length === value.labels.length && s.values.every((n) => n <= value.max)), 'Chart values must match labels and fit the axis');

const storySchema = z.object({
  headline: z.string(), intro: z.string(), context: z.string(), role: z.string(), hero: media,
  metrics: z.array(z.object({value: z.string(), label: z.string(), note: z.string().optional()})).min(1).max(4),
  question: z.object({title: z.string(), text: z.string()}),
  steps: z.array(z.object({title: z.string(), text: z.string()})).min(1),
  gallery: z.array(media).default([]),
  finding: z.object({title: z.string(), text: z.string()}),
  charts: z.array(chart).default([]), details: z.array(z.string()), credits: z.array(z.string()),
  sweep: z.object({src: localMedia, title: z.string(), alt: z.string(), caption: z.string(), labels: z.tuple([z.string(), z.string(), z.string()])}).optional(),
  comparison: z.object({before: localMedia, after: localMedia, alt: z.string(), caption: z.string()}).optional(),
});

export type PortfolioStory = z.infer<typeof storySchema>;
export type PortfolioMedia = z.infer<typeof media>;
export type PortfolioChart = z.infer<typeof chart>;
const files = import.meta.glob('./portfolio/*.json', { eager: true, import: 'default' });
export const portfolioStories = Object.fromEntries(Object.entries(files).map(([path, value]) => {
  const id = path.split('/').pop()!.replace(/\.json$/, '');
  return [id, storySchema.parse(value)];
})) as Record<string, PortfolioStory>;

export const academicOrder = ['segmented-style-transfer', 'soundaround', 'ica-sefa', 'xlnet-trip', 'umtri-body-scan', 'vr-lab-classroom', 'ar-tree-planting-game', 'ar-navigator'];
