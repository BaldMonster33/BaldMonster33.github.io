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
   * GitHub Pages serves the site at the custom domain below. Keep this value in
   * sync with the Pages custom-domain setting so canonical links, redirects,
   * Open Graph tags, the sitemap and the RSS feed all agree.
   */
  url: 'https://www.qinle.ltd',

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
