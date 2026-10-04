import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../', import.meta.url);
const html = await readFile(new URL('dist/projects/careops/index.html', root), 'utf8');
assert.match(html, /Did the signal/);
assert.match(html, /In development/);
assert.match(html, /Sample data, not a live household/);
assert.match(html, /An early screen, August 2026/);
assert.match(html, /CareOps is a private prototype/);
assert.match(html, /https:\/\/www\.qinle\.ltd\/projects\/careops\//);
assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1);
assert.equal((html.match(/<img[\s>]/g) ?? []).length, 2);
assert.doesNotMatch(html, /<video|<iframe|environment-review\.mp4|\/api\/v1\//);
assert.doesNotMatch(html, /\b192\.168\.|\b10\.\d+\.\d+\.\d+\b|authorization:\s*bearer|BEGIN .*PRIVATE KEY/i);
const pageCopy = html.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ');
assert.doesNotMatch(pageCopy, /field.validated|100%/i);
for (const [, src] of html.matchAll(/<img[^>]*\ssrc="([^"]+)"/g)) {
  assert.ok(src.startsWith('/_astro/'), 'media must be a built local asset');
  await access(new URL(join('dist', src), root));
}
const listing = await readFile(new URL('dist/projects/index.html', root), 'utf8');
assert.match(listing, /href="\/projects\/careops/);
const route = await readFile(new URL('src/pages/projects/[id].astro', root), 'utf8');
assert.match(route, /<CruxLaunchPage/);
assert.match(route, /<VirtualNavigatorLaunchPage/);
assert.match(route, /<CareOpsProgressPage/);
console.log('CareOps page: metadata, copy, sample-data labels, local images, privacy and existing routes checked.');
