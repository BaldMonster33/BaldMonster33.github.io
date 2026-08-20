/**
 * Dates render identically on the build machine and in every browser, so the
 * timezone is pinned to UTC rather than inherited from the environment.
 */
const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(date: Date): string {
  return formatter.format(date);
}

/** `2026-08-19`, for `<time datetime>` and archive grouping. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
