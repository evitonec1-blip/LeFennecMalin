/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Sitemap & SEO Scanner & Generator for Le Fennec Malin
 * 
 * Automatically iterates over exported SEO data structures:
 * - CANTONS_SEO_DATA (All 26 Swiss cantons and regional health systems)
 * - CATEGORIES_SEO_DATA (Insurance verticals: Auto, RC, Ménage, 3e Pilier, etc.)
 * - INSURERS_SEO_DATA (All 37+ Swiss health insurers & Krankenkassen)
 * - GUIDES_SEO_DATA (Explanatory guides, calculation models, switching processes)
 * - MULTILINGUAL_ROUTES (Core hubs, tools, and calculators)
 * 
 * Generates standards-compliant XML sitemaps with complete hreflang alternates
 * (fr-CH, de-CH, it-CH, en-CH, es-CH, pt-CH, and x-default).
 */

import fs from 'fs';
import path from 'path';
import { MULTILINGUAL_ROUTES, getLocalizedPath, AppTab } from '../src/seo/multilingualRoutes.js';
import { CANTONS_SEO_DATA } from '../src/seo/data/cantonsData.js';
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
  totalUrls: number;
  uniquePages: number;
  cantonsCount: number;
  insurersCount: number;
  categoriesCount: number;
  guidesCount: number;
  coreRoutesCount: number;
  languages: string[];
  generatedFiles: string[];
}

export const SUPPORTED_LANGUAGES: Language[] = ['fr', 'de', 'it', 'en', 'es', 'pt'];
const TODAY = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

export const HREFLANG_REGION_MAP: Record<Language, string> = {
  fr: 'fr-CH',
  de: 'de-CH',
  it: 'it-CH',
  en: 'en-CH',
  es: 'es-CH',
  pt: 'pt-CH',
};

/**
 * Builds a sitemap URL entry with all reciprocal hreflang tags
 */
export function buildLocalizedSitemapEntry(
  tabKey: AppTab,
  lastmod: string = TODAY,
  changefreq: SitemapEntry['changefreq'] = 'weekly',
  priority: number = 0.8,
  targetLang: Language = 'fr'
): SitemapEntry {
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

  return {
    loc: `${SITE_URL}${getLocalizedPath(tabKey, targetLang)}`,
    lastmod,
    changefreq,
    priority: priority.toFixed(2),
    alternates,
  };
}

/**
 * Scans all primary data structures (CANTONS, CATEGORIES, INSURERS, GUIDES)
 * and generates structured sitemap entries.
 */
export function scanSeoDataStructures(): {
  allEntries: SitemapEntry[];
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

  const processedTabs = new Set<AppTab>();
  let cantonsCount = 0;
  let insurersCount = 0;
  let categoriesCount = 0;
  let guidesCount = 0;
  let coreRoutesCount = 0;

  // Helper to register tab across all languages
  function registerTab(
    tabKey: AppTab,
    lastmod: string = TODAY,
    changefreq: SitemapEntry['changefreq'] = 'weekly',
    priority: number = 0.8
  ) {
    if (processedTabs.has(tabKey)) return;
    processedTabs.add(tabKey);

    for (const lang of SUPPORTED_LANGUAGES) {
      const entry = buildLocalizedSitemapEntry(tabKey, lastmod, changefreq, priority, lang);
      byLanguage[lang].push(entry);
    }
  }

  // 1. Iterate over CANTONS_SEO_DATA (Cantons & Canton Subsidies)
  const uniqueCantons = new Set<string>();
  for (const [slug, canton] of Object.entries(CANTONS_SEO_DATA)) {
    if (!canton || uniqueCantons.has(canton.code)) continue;
    uniqueCantons.add(canton.code);
    cantonsCount++;

    const cantonTab = `canton-${canton.slug}` as AppTab;
    const subsideTab = `subside-${canton.slug}` as AppTab;

    registerTab(cantonTab, canton.lastUpdated || TODAY, 'monthly', 0.85);
    registerTab(subsideTab, canton.lastUpdated || TODAY, 'monthly', 0.85);
  }

  // 2. Iterate over INSURERS_SEO_DATA (Health Funds & Insurers)
  for (const [slug, insurer] of Object.entries(INSURERS_SEO_DATA)) {
    insurersCount++;
    const insurerTab = `assurance-${insurer.slug}` as AppTab;
    registerTab(insurerTab, insurer.lastUpdated || TODAY, 'monthly', 0.80);
  }

  // 3. Iterate over CATEGORIES_SEO_DATA (Insurance Verticals)
  for (const [slug, cat] of Object.entries(CATEGORIES_SEO_DATA)) {
    categoriesCount++;
    const catTab = `assurance-${cat.slug}` as AppTab;
    registerTab(catTab, cat.lastUpdated || TODAY, 'monthly', 0.80);
  }

  // 4. Iterate over GUIDES_SEO_DATA (Guides & Educational Hubs)
  for (const [slug, guide] of Object.entries(GUIDES_SEO_DATA)) {
    guidesCount++;
    const guideTab = `guide-${guide.slug}` as AppTab;
    registerTab(guideTab, guide.lastUpdated || TODAY, 'monthly', 0.75);
  }

  // 5. Iterate over any remaining MULTILINGUAL_ROUTES (Core hubs, tools, calculators)
  for (const [id, config] of Object.entries(MULTILINGUAL_ROUTES)) {
    const tabKey = id as AppTab;
    if (!processedTabs.has(tabKey)) {
      coreRoutesCount++;
      registerTab(
        tabKey,
        config.lastModified || TODAY,
        config.changefreq || 'weekly',
        config.priority || 0.7
      );
    }
  }

  const allEntries: SitemapEntry[] = [];
  for (const lang of SUPPORTED_LANGUAGES) {
    allEntries.push(...byLanguage[lang]);
  }

  const summary: SitemapSummary = {
    totalUrls: allEntries.length,
    uniquePages: processedTabs.size,
    cantonsCount,
    insurersCount,
    categoriesCount,
    guidesCount,
    coreRoutesCount,
    languages: [...SUPPORTED_LANGUAGES],
    generatedFiles: [],
  };

  return { allEntries, byLanguage, summary };
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

  const { allEntries, byLanguage, summary } = scanSeoDataStructures();
  const generatedFiles: string[] = [];

  // 1. Generate per-language sitemaps (sitemap-fr.xml, sitemap-de.xml, etc.)
  for (const lang of SUPPORTED_LANGUAGES) {
    const xml = formatUrlsetXml(byLanguage[lang]);
    const filename = `sitemap-${lang}.xml`;
    const filePath = path.join(publicDir, filename);
    fs.writeFileSync(filePath, xml, 'utf-8');
    generatedFiles.push(filename);
    console.log(`[sitemap-gen] Generated ${filename} (${byLanguage[lang].length} URLs)`);
  }

  // 2. Generate complete all-in-one / master sitemap.xml with all URLs & hreflang entries
  const completeXml = formatUrlsetXml(allEntries);
  const completeFilename = 'sitemap.xml';
  fs.writeFileSync(path.join(publicDir, completeFilename), completeXml, 'utf-8');
  generatedFiles.push(completeFilename);
  console.log(`[sitemap-gen] Generated complete master ${completeFilename} (${allEntries.length} URLs)`);

  // 3. Also generate sitemap-index.xml for index-based crawlers
  const indexXml = formatSitemapIndexXml(SUPPORTED_LANGUAGES, TODAY);
  const indexFilename = 'sitemap-index.xml';
  fs.writeFileSync(path.join(publicDir, indexFilename), indexXml, 'utf-8');
  generatedFiles.push(indexFilename);
  console.log(`[sitemap-gen] Generated ${indexFilename}`);

  summary.generatedFiles = generatedFiles;
  return summary;
}

// Auto-run when executed directly via node or tsx
const isDirectExecution = process.argv[1]?.includes('generateSitemaps') || process.argv[1]?.includes('scan-seo');
if (isDirectExecution) {
  console.log('[sitemap-gen] Scanning SEO data sources & generating sitemaps...');
  const stats = runSitemapGenerator();
  console.log('\n=== Sitemap Generation Report ===');
  console.log(`Total URLs Generated: ${stats.totalUrls}`);
  console.log(`Unique Base Pages: ${stats.uniquePages}`);
  console.log(`- Canton Regional Structures: ${stats.cantonsCount} cantons (x2: main + subsidy)`);
  console.log(`- Insurer Profiles: ${stats.insurersCount}`);
  console.log(`- Insurance Categories: ${stats.categoriesCount}`);
  console.log(`- Guides & Educational: ${stats.guidesCount}`);
  console.log(`- Core Routes & Tools: ${stats.coreRoutesCount}`);
  console.log(`- Supported Languages: ${stats.languages.join(', ')}`);
  console.log(`- Generated Files: ${stats.generatedFiles.join(', ')}`);
  console.log('=================================\n');
}

