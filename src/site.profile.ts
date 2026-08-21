/**
 * The PUBLIC profile. Replaces src/site.profile.ts on the way out of the export,
 * and is the only file whose contents differ between the two versions of the
 * site. Everything else under src/ is byte-identical.
 *
 * Nothing internal may appear in this file: it is published verbatim.
 */
export const PROFILE = {
  /**
   * Where this build is served. Canonical links, Open Graph tags, the sitemap
   * and the RSS feed are all derived from it, so it has to be the address
   * visitors actually reach — a canonical pointing somewhere that does not
   * resolve is worse than none at all.
   *
   * Temporarily the GitHub Pages address, because www.qinle.ltd does not
   * resolve yet. Moving to the custom domain takes both halves together:
   *   1. set this to 'https://www.qinle.ltd'
   *   2. add publish/overlay/public/CNAME containing `www.qinle.ltd`, and set
   *      the same value under Settings -> Pages -> Custom domain
   * Doing only (2) makes GitHub redirect the Pages address to the custom domain
   * while every link in the markup still claims the old one.
   */
  url: 'https://baldmonster33.github.io',

  /**
   * Where the view counter answers, or '' for no counter.
   *
   * Empty: GitHub Pages has nowhere to run one, so the public build ships
   * without it — no request is made and every count stays hidden. Deploy
   * counter/ and set the PUBLIC_VIEWS_ENDPOINT repository variable to turn it
   * on without touching a component.
   */
  viewsEndpoint: '',
} as const;
