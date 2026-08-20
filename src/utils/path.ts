/**
 * The key a page is counted under.
 *
 * `trailingSlash: 'ignore'` means /blog/x and /blog/x/ both serve the same page,
 * and Astro's directory output hands us the slashed form while every `href` in
 * the templates is written without it. Both have to collapse to one string or
 * the same page accumulates two separate counts.
 *
 * Shared deliberately: the counter script imports this too, so the path a page
 * reports and the path a card asks about can never drift apart.
 */
export function normalizePath(pathname: string): string {
  const path = pathname.split(/[?#]/)[0];
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
}
