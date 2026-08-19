/**
 * Canonical production origin for Le Fennec Malin.
 *
 * Single source of truth for every absolute URL (canonical, og:url,
 * og:image, sitemap <loc>, robots Sitemap: directive, JSON-LD `url`).
 * The apex host `lefennecmalin.ch` 301-redirects to `www.` (vercel.json),
 * so www is the canonical hostname.
 *
 * Update ONLY here when the production domain changes.
 */
export const SITE_URL = 'https://www.lefennecmalin.ch';
