# LeFennecMalin SEO audit and implementation record

## Baseline audit

- **Architecture:** React 19 + Vite + Express, deployed with a Vercel SPA rewrite. The comparison flows live in `HealthComparator` and `LifePensionComparator`; the existing UI and data services are preserved.
- **Rendering:** the application is client-rendered. `index.html` supplies baseline metadata, while route-level metadata is applied after hydration through `SEOHead`. This is useful for users but is still weaker than SSR/SSG for SEO-critical pages.
- **Existing SEO work:** generic comparator, LAMal, and 3ème pilier pages already existed with canonical URLs, Open Graph, JSON-LD, and a small sitemap.
- **Critical risks found:** route-level pages were not server-rendered; several planned canton URLs were listed as non-clickable labels; the metadata component did not react when structured data changed; the sitemap did not include the priority canton routes.
- **High priority:** add a scalable content model for the remaining insurance clusters, add a prerender/SSR strategy without migrating frameworks, connect Search Console and analytics, and validate claims against current official sources.
- **Medium priority:** expand insurer and guide clusters only when each page has unique Swiss-specific value, sources, update dates, and a clear comparison CTA.

## This implementation

1. Corrected route-level metadata updates and added missing Open Graph/Twitter fields.
2. Made breadcrumbs usable as real crawlable links while preserving SPA navigation callbacks.
3. Added reusable, data-driven canton page rendering for Genève, Vaud, Fribourg, Neuchâtel, Valais, and Jura.
4. Added the canton URLs to the XML sitemap and linked them from the LAMal hub.
5. Preserved existing comparison logic and kept claims deliberately qualified where a current official source is required.

## Recommended order after this increment

1. Add prerendering or server-rendered HTML for the priority SEO routes and verify the generated HTML.
2. Replace any unsourced marketing statistics with source-backed values and visible dates.
3. Build category templates for Auto, Ménage, RC, Vie, Voyage, protection juridique, Animaux, and 3ème pilier subtopics.
4. Add methodology, sources, editorial policy, and commercial disclosure pages.
5. Establish Search Console/analytics baseline and measure CTA → comparison start → completion → lead.
6. Expand German pages only after the French architecture is stable and independently researched.