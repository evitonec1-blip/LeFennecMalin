import fs from 'fs';
import path from 'path';
import { MULTILINGUAL_ROUTES } from '../src/seo/multilingualRoutes.js';
import { SITE_URL } from '../src/seo/site.js';

const languages = ['fr', 'de', 'it', 'en'] as const;

function generateLanguageSitemap(lang: 'fr' | 'de' | 'it' | 'en') {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n\n`;

  for (const [id, config] of Object.entries(MULTILINGUAL_ROUTES)) {
    const locale = config.locales[lang];
    if (!locale) continue;

    const locUrl = `${SITE_URL}${locale.path}`;
    const lastMod = config.lastModified || '2026-08-20';
    const changefreq = config.changefreq || 'weekly';
    const priority = config.priority.toFixed(2);

    xml += `  <url>\n`;
    xml += `    <loc>${locUrl}</loc>\n`;
    xml += `    <lastmod>${lastMod}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;

    // Hreflang alternates
    xml += `    <xhtml:link rel="alternate" hreflang="fr-CH" href="${SITE_URL}${config.locales.fr.path}"/>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="de-CH" href="${SITE_URL}${config.locales.de.path}"/>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="it-CH" href="${SITE_URL}${config.locales.it.path}"/>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="en-CH" href="${SITE_URL}${config.locales.en.path}"/>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${config.locales.fr.path}"/>\n`;
    xml += `  </url>\n\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}

const publicDir = path.join(process.cwd(), 'public');

for (const lang of languages) {
  const sitemapXml = generateLanguageSitemap(lang);
  const outPath = path.join(publicDir, `sitemap-${lang}.xml`);
  fs.writeFileSync(outPath, sitemapXml, 'utf-8');
  console.log(`Generated sitemap-${lang}.xml successfully (${sitemapXml.length} bytes)`);
}

const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-fr.xml</loc>
    <lastmod>2026-08-20</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-de.xml</loc>
    <lastmod>2026-08-20</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-it.xml</loc>
    <lastmod>2026-08-20</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-en.xml</loc>
    <lastmod>2026-08-20</lastmod>
  </sitemap>
</sitemapindex>
`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), indexXml, 'utf-8');
console.log('Generated index sitemap.xml successfully.');
