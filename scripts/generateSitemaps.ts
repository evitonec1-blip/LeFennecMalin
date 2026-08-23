/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Sitemap & SEO Scanner & Generator for Le Fennec Malin
 * 
 * Automatically scans:
 * - All 26 Cantons and regional SEO data (Romandie, Bilingue, Suisse Centrale, Tessin, Suisse Orientale)
 * - All Cantonal Subsidies Hubs and dedicated pages
 * - All 37+ Insurers & Health Funds directory and comparison pages
 * - All Multi-vertical Insurance categories (Auto, Ménage, RC, 3e Pilier, Prévoyance, etc.)
 * - All Health Guides, Tools, and Calculators
 * - Multi-language support (fr, de, it, en, es, pt) with strict hreflang cross-referencing and x-default.
 */

import fs from 'fs';
import path from 'path';
import { MULTILINGUAL_ROUTES, getLocalizedPath, AppTab } from '../src/seo/multilingualRoutes.js';
import { CANTONS_SEO_DATA, ALL_26_CANTONS } from '../src/seo/data/cantonsData.js';
import { INSURERS_SEO_DATA } from '../src/seo/data/insurersData.js';
import { CATEGORIES_SEO_DATA } from '../src/seo/data/categoriesData.js';
import { GUIDES_SEO_DATA } from '../src/seo/data/guidesData.js';
import { SITE_URL } from '../src/seo/site.js';
import { Language } from '../src/i18n/translations.js';

export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  alternates: { lang: string; href: string }[];
}

export interface SitemapSummary {
  totalPages: number;
  cantonRegionalPages: number;
  subsidyRegionalPages: number;
  insurerPages: number;
  verticalCategoryPages: number;
  guideAndToolPages: number;
  languages: string[];
  generatedFiles: string[];
}

const SUPPORTED_LANGUAGES: Language[] = ['fr', 'de', 'it', 'en', 'es', 'pt'];
const TODAY = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

const HREFLANG_REGION_MAP: Record<Language, string> = {
  fr: 'fr-CH',
  de: 'de-CH',
  it: 'it-CH',
  en: 'en-CH',
  es: 'es-CH',
  pt: 'pt-CH',
};

/**
 * Scans all data sources and compiles structured sitemap entries
 */
export function scanAndBuildSitemapEntries(): {
  byLanguage: Record<Language, SitemapEntry[]>;
  summary: SitemapSummary;
} {
  const byLanguage: Record<Language, SitemapEntry[]> = {
    fr: [],
    de: [],
    it: [],
    en: [],
    es: [],
    pt: [],
  };

  let cantonCount = 0;
  let subsidyCount = 0;
  let insurerCount = 0;
  let categoryCount = 0;
  let guideToolCount = 0;

  // Process all registered multilingual routes
  for (const [id, config] of Object.entries(MULTILINGUAL_ROUTES)) {
    const tabKey = id as AppTab;
    const category = config.category;

    // Track category counts
    if (category === 'canton') cantonCount++;
    else if (category === 'subside') subsidyCount++;
    else if (category === 'insurer' || category === 'insurance') insurerCount++;
    else if (category === 'category' || category === 'core') categoryCount++;
    else if (category === 'guide' || category === 'tool' || category === 'hub') guideToolCount++;

    const lastmod = config.lastModified || TODAY;
    const changefreq = config.changefreq || (category === 'canton' ? 'monthly' : 'weekly');
    const priority = config.priority.toFixed(2);

    // Build reciprocal hreflang list for all languages
    const alternates: { lang: string; href: string }[] = SUPPORTED_LANGUAGES.map((lang) => ({
      lang: HREFLANG_REGION_MAP[lang],
      href: `${SITE_URL}${getLocalizedPath(tabKey, lang)}`,
    }));

    // Add x-default pointing to French primary version
    alternates.push({
      lang: 'x-default',
      href: `${SITE_URL}${getLocalizedPath(tabKey, 'fr')}`,
    });

    for (const lang of SUPPORTED_LANGUAGES) {
      const locPath = getLocalizedPath(tabKey, lang);
      byLanguage[lang].push({
        loc: `${SITE_URL}${locPath}`,
        lastmod,
        changefreq,
        priority,
        alternates,
      });
    }
  }

  const totalPages = Object.values(byLanguage).reduce((acc, list) => acc + list.length, 0);

  const summary: SitemapSummary = {
    totalPages,
    cantonRegionalPages: cantonCount * SUPPORTED_LANGUAGES.length,
    subsidyRegionalPages: subsidyCount * SUPPORTED_LANGUAGES.length,
    insurerPages: insurerCount * SUPPORTED_LANGUAGES.length,
    verticalCategoryPages: categoryCount * SUPPORTED_LANGUAGES.length,
    guideAndToolPages: guideToolCount * SUPPORTED_LANGUAGES.length,
    languages: [...SUPPORTED_LANGUAGES],
    generatedFiles: [],
  };

  return { byLanguage, summary };
}

/**
 * Formats entries into standard sitemap.xml structure
 */
export function formatUrlsetXml(entries: SitemapEntry[]): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n\n`;

  for (const entry of entries) {
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(entry.loc)}</loc>\n`;
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    xml += `    <priority>${entry.priority}</priority>\n`;

    for (const alt of entry.alternates) {
      xml += `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${escapeXml(alt.href)}"/>\n`;
    }

    xml += `  </url>\n\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}

/**
 * Formats root sitemap index referencing all sub-sitemaps
 */
export function formatSitemapIndexXml(languages: Language[], lastmod: string): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const lang of languages) {
    xml += `  <sitemap>\n`;
    xml += `    <loc>${SITE_URL}/sitemap-${lang}.xml</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `  </sitemap>\n`;
  }

  xml += `</sitemapindex>\n`;
  return xml;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Main execution function to write sitemaps to public directory
 */
export function runSitemapGenerator(): SitemapSummary {
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const { byLanguage, summary } = scanAndBuildSitemapEntries();
  const generatedFiles: string[] = [];

  // Generate per-language sitemaps
  for (const lang of SUPPORTED_LANGUAGES) {
    const xml = formatUrlsetXml(byLanguage[lang]);
    const filename = `sitemap-${lang}.xml`;
    const filePath = path.join(publicDir, filename);
    fs.writeFileSync(filePath, xml, 'utf-8');
    generatedFiles.push(filename);
    console.log(`[sitemap-gen] Generated ${filename} (${byLanguage[lang].length} URLs, ${xml.length} bytes)`);
  }

  // Generate index sitemap.xml
  const indexXml = formatSitemapIndexXml(SUPPORTED_LANGUAGES, TODAY);
  const indexFilename = 'sitemap.xml';
  fs.writeFileSync(path.join(publicDir, indexFilename), indexXml, 'utf-8');
  generatedFiles.push(indexFilename);
  console.log(`[sitemap-gen] Generated index ${indexFilename} successfully.`);

  summary.generatedFiles = generatedFiles;
  return summary;
}

// Auto-run when executed directly via node or tsx
const isDirectExecution = process.argv[1]?.includes('generateSitemaps') || process.argv[1]?.includes('scan-seo');
if (isDirectExecution) {
  console.log('[sitemap-gen] Scanning SEO data sources & generating sitemaps...');
  const stats = runSitemapGenerator();
  console.log('\n=== Sitemap Generation Report ===');
  console.log(`Total URLs Indexed across all languages: ${stats.totalPages}`);
  console.log(`- Regional Canton Pages: ${stats.cantonRegionalPages}`);
  console.log(`- Regional Subsidy Pages: ${stats.subsidyRegionalPages}`);
  console.log(`- Insurer Directory Pages: ${stats.insurerPages}`);
  console.log(`- Category Pages: ${stats.verticalCategoryPages}`);
  console.log(`- Guides & Tools: ${stats.guideAndToolPages}`);
  console.log(`- Supported Languages: ${stats.languages.join(', ')}`);
  console.log(`- Files written: ${stats.generatedFiles.join(', ')}`);
  console.log('=================================\n');
}
