/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Agent Content & Route Resolution Service for Le Fennec Malin
 * Provides agent-friendly 404 detection, Markdown content negotiation (acceptmarkdown.com),
 * and structured content for AI agents & crawlers.
 */

import { AppTab } from '../types.js';
import { Language } from '../i18n/translations.js';
import { MULTILINGUAL_ROUTES, LocalizedRouteInfo, resolveRouteFromPath } from './multilingualRoutes.js';
import { CANTONS_SEO_DATA } from './data/cantonsData.js';
import { INSURERS_SEO_DATA } from './data/insurersData.js';
import { GUIDES_SEO_DATA } from './data/guidesData.js';
import { getMunicipalityBySlug, getCantonLocalHubData, ALL_MUNICIPALITIES } from './data/municipalitiesData.js';
import { SITE_URL } from './site.js';

export interface RouteMatchResult {
  isValid: boolean;
  tab?: AppTab;
  language?: Language;
  routeInfo?: LocalizedRouteInfo;
  canonicalPath?: string;
}

// Set of static root files that are always valid
const KNOWN_STATIC_FILES = new Set([
  '/',
  '/index.html',
  '/robots.txt',
  '/sitemap.xml',
  '/sitemap-index.xml',
  '/sitemap-fr.xml',
  '/sitemap-de.xml',
  '/sitemap-it.xml',
  '/sitemap-en.xml',
  '/sitemap-es.xml',
  '/sitemap-pt.xml',
  '/llms.txt',
  '/llms-full.txt',
  '/.well-known/llms.txt',
  '/premiums_2026.json',
  '/npa_to_region.json',
  '/pilier3a.json',
  '/fennec-logo.jpg',
  '/fennec-avatar.jpg',
  '/favicon.ico'
]);

// Build a fast lookup set of all explicitly registered routes
const ALL_REGISTERED_PATHS = new Set<string>();

Object.values(MULTILINGUAL_ROUTES).forEach((routeConfig) => {
  if (routeConfig && routeConfig.locales) {
    Object.values(routeConfig.locales).forEach((localeInfo) => {
      if (localeInfo && localeInfo.path) {
        const p = localeInfo.path.toLowerCase();
        ALL_REGISTERED_PATHS.add(p);
        if (p.endsWith('/')) {
          ALL_REGISTERED_PATHS.add(p.slice(0, -1));
        } else {
          ALL_REGISTERED_PATHS.add(`${p}/`);
        }
      }
    });
  }
});

// Legacy French routes lookup
const LEGACY_PATHS = new Set([
  '/assurance-maladie/',
  '/assurance-maladie',
  '/assurance-maladie/comparateur/',
  '/assurance-maladie/comparateur',
  '/comparateur-assurance-suisse/',
  '/comparateur-assurance-suisse',
  '/3eme-pilier/',
  '/3eme-pilier',
  '/3eme-pilier/comparateur/',
  '/3eme-pilier/comparateur',
  '/subsides/',
  '/subsides',
  '/a-propos/',
  '/a-propos',
  '/faq/',
  '/faq',
  '/methodologie/',
  '/methodologie',
  '/comment-fonctionne-le-comparateur/',
  '/comment-fonctionne-le-comparateur',
  '/article-45-lsa/',
  '/article-45-lsa',
  '/qualifications-intermediaire/',
  '/qualifications-intermediaire',
  '/mentions-legales/',
  '/mentions-legales',
  '/confidentialite/',
  '/confidentialite',
  '/fr/',
  '/fr',
  '/de/',
  '/de',
  '/it/',
  '/it',
  '/en/',
  '/en',
  '/es/',
  '/es',
  '/pt/',
  '/pt'
]);

/**
 * Checks whether a given path is a valid application page or resource.
 * Returns match metadata or marks as invalid (404).
 */
export function matchAppRoute(pathname: string): RouteMatchResult {
  if (!pathname) return { isValid: false };
  
  // Clean pathname (remove trailing query/hash, lowercase, normalize slashes)
  const cleanPath = pathname.split('?')[0].split('#')[0].toLowerCase();
  const normalized = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  const normalizedWithSlash = normalized.endsWith('/') ? normalized : `${normalized}/`;
  const normalizedWithoutSlash = normalized.endsWith('/') ? normalized.slice(0, -1) : normalized;

  // 1. Check known static files
  if (KNOWN_STATIC_FILES.has(normalized) || KNOWN_STATIC_FILES.has(normalizedWithoutSlash)) {
    return { isValid: true, canonicalPath: normalized };
  }

  // 2. Check explicitly registered multilingual paths
  if (ALL_REGISTERED_PATHS.has(normalizedWithSlash) || ALL_REGISTERED_PATHS.has(normalizedWithoutSlash)) {
    const resolved = resolveRouteFromPath(normalized);
    const routeConfig = MULTILINGUAL_ROUTES[resolved.tab];
    const routeInfo = routeConfig?.locales?.[resolved.language] || routeConfig?.locales?.fr;
    return {
      isValid: true,
      tab: resolved.tab,
      language: resolved.language,
      routeInfo,
      canonicalPath: routeInfo?.path || normalizedWithSlash
    };
  }

  // 3. Check legacy paths
  if (LEGACY_PATHS.has(normalizedWithSlash) || LEGACY_PATHS.has(normalizedWithoutSlash)) {
    const resolved = resolveRouteFromPath(normalized);
    const routeConfig = MULTILINGUAL_ROUTES[resolved.tab];
    const routeInfo = routeConfig?.locales?.[resolved.language] || routeConfig?.locales?.fr;
    return {
      isValid: true,
      tab: resolved.tab,
      language: resolved.language,
      routeInfo,
      canonicalPath: routeInfo?.path || normalizedWithSlash
    };
  }

  // 4. Dynamic validation for Canton routes (/fr/assurance-maladie/:canton/)
  const cantonMatch = normalized.match(/^\/(fr|de|it|en|es|pt)\/(assurance-maladie|krankenkasse|cassa-malati|health-insurance)\/([a-z0-9-]+)\/?$/);
  if (cantonMatch) {
    const lang = cantonMatch[1] as Language;
    const slug = cantonMatch[3];
    const candidateTab = `canton-${slug}` as AppTab;
    if (MULTILINGUAL_ROUTES[candidateTab] || CANTONS_SEO_DATA[slug]) {
      const routeConfig = MULTILINGUAL_ROUTES[candidateTab];
      const routeInfo = routeConfig?.locales?.[lang] || routeConfig?.locales?.fr;
      return {
        isValid: true,
        tab: candidateTab,
        language: lang,
        routeInfo,
        canonicalPath: routeInfo?.path || normalizedWithSlash
      };
    }
  }

  // 5. Dynamic validation for Insurer routes (/fr/caisses-maladie/:insurer/)
  const insurerMatch = normalized.match(/^\/(fr|de|it|en|es|pt)\/(caisses-maladie|krankenkassen|casse-malati|health-funds)\/([a-z0-9-]+)\/?$/);
  if (insurerMatch) {
    const lang = insurerMatch[1] as Language;
    const slug = insurerMatch[3];
    const candidateTab = `insurer-${slug}` as AppTab;
    if (MULTILINGUAL_ROUTES[candidateTab] || INSURERS_SEO_DATA[slug]) {
      const routeConfig = MULTILINGUAL_ROUTES[candidateTab];
      const routeInfo = routeConfig?.locales?.[lang] || routeConfig?.locales?.fr;
      return {
        isValid: true,
        tab: candidateTab,
        language: lang,
        routeInfo,
        canonicalPath: routeInfo?.path || normalizedWithSlash
      };
    }
  }

  // 6. Dynamic validation for Subsidies routes (/fr/subsides/:canton/)
  const subsidyMatch = normalized.match(/^\/(fr|de|it|en|es|pt)\/(subsides|praemienverbilligung|sussidi-cassa-malati|health-insurance-subsidies)\/([a-z0-9-]+)\/?$/);
  if (subsidyMatch) {
    const lang = subsidyMatch[1] as Language;
    const slug = subsidyMatch[3];
    const candidateTab = `subside-${slug}` as AppTab;
    if (MULTILINGUAL_ROUTES[candidateTab]) {
      const routeConfig = MULTILINGUAL_ROUTES[candidateTab];
      const routeInfo = routeConfig?.locales?.[lang] || routeConfig?.locales?.fr;
      return {
        isValid: true,
        tab: candidateTab,
        language: lang,
        routeInfo,
        canonicalPath: routeInfo?.path || normalizedWithSlash
      };
    }
  }

  // 7. Dynamic validation for Guides routes (/fr/guides/:slug/)
  const guideMatch = normalized.match(/^\/(fr|de|it|en|es|pt)\/(guides|ratgeber|guide)\/([a-z0-9-]+)\/?$/);
  if (guideMatch) {
    const lang = guideMatch[1] as Language;
    const slug = guideMatch[3];
    const candidateTab = (slug.startsWith('guide-') ? slug : `guide-${slug}`) as AppTab;
    if (MULTILINGUAL_ROUTES[candidateTab] || GUIDES_SEO_DATA[slug]) {
      const routeConfig = MULTILINGUAL_ROUTES[candidateTab];
      const routeInfo = routeConfig?.locales?.[lang] || routeConfig?.locales?.fr;
      return {
        isValid: true,
        tab: candidateTab,
        language: lang,
        routeInfo,
        canonicalPath: routeInfo?.path || normalizedWithSlash
      };
    }
  }

  // 8. Dynamic validation for Tools routes (/fr/outils/:slug/)
  const toolMatch = normalized.match(/^\/(fr|de|it|en|es|pt)\/(outils|tools|strumenti)\/([a-z0-9-]+)\/?$/);
  if (toolMatch) {
    const lang = toolMatch[1] as Language;
    const slug = toolMatch[3];
    const candidateTab = (slug.startsWith('tool-') ? slug : `tool-${slug}`) as AppTab;
    if (MULTILINGUAL_ROUTES[candidateTab]) {
      const routeConfig = MULTILINGUAL_ROUTES[candidateTab];
      const routeInfo = routeConfig?.locales?.[lang] || routeConfig?.locales?.fr;
      return {
        isValid: true,
        tab: candidateTab,
        language: lang,
        routeInfo,
        canonicalPath: routeInfo?.path || normalizedWithSlash
      };
    }
  }

  // 9. Dynamic validation for Local City routes (/fr/local/:canton/:city/)
  const localCityMatch = normalized.match(/^\/(fr|de|it|en|es|pt)\/local\/([a-z0-9-]+)\/([a-z0-9-]+)\/?$/);
  if (localCityMatch) {
    const lang = localCityMatch[1] as Language;
    const cantonSlug = localCityMatch[2];
    const citySlug = localCityMatch[3];
    const municipality = getMunicipalityBySlug(cantonSlug, citySlug);
    if (municipality) {
      return {
        isValid: true,
        tab: `local-city-${cantonSlug}-${citySlug}` as AppTab,
        language: lang,
        canonicalPath: `/${lang}/local/${cantonSlug}/${citySlug}/`
      };
    }
  }

  // 10. Dynamic validation for Local Canton Hub routes (/fr/local/:canton/)
  const localCantonMatch = normalized.match(/^\/(fr|de|it|en|es|pt)\/local\/([a-z0-9-]+)\/?$/);
  if (localCantonMatch) {
    const lang = localCantonMatch[1] as Language;
    const cantonSlug = localCantonMatch[2];
    const hub = getCantonLocalHubData(cantonSlug);
    if (hub) {
      return {
        isValid: true,
        tab: `local-canton-${cantonSlug}` as AppTab,
        language: lang,
        canonicalPath: `/${lang}/local/${cantonSlug}/`
      };
    }
  }

  // 11. Dynamic validation for Master Local Hub (/fr/local/)
  const localHubMatch = normalized.match(/^\/(fr|de|it|en|es|pt)\/local\/?$/);
  if (localHubMatch) {
    const lang = localHubMatch[1] as Language;
    return {
      isValid: true,
      tab: 'local-hub' as AppTab,
      language: lang,
      canonicalPath: `/${lang}/local/`
    };
  }

  // Not a valid route -> real 404
  return { isValid: false };
}

/**
 * Generates an agent-friendly Markdown document for any valid route.
 * Complies with acceptmarkdown.com content negotiation specification.
 */
export function generatePageMarkdown(pathname: string, tab?: AppTab, language: Language = 'fr'): string {
  const resolvedTab = tab || resolveRouteFromPath(pathname).tab;
  const routeConfig = MULTILINGUAL_ROUTES[resolvedTab];
  const routeInfo = routeConfig?.locales?.[language] || routeConfig?.locales?.fr;

  const title = routeInfo?.title || "Le Fennec Malin — Comparateur d'Assurances Suisse";
  const description = routeInfo?.description || "Comparateur d'assurances maladie (LAMal) et prévoyance (3ème pilier) 100% neutre en Suisse.";
  const h1 = routeInfo?.h1 || "Comparateur d'Assurances en Suisse";
  const canonicalUrl = `${SITE_URL}${routeInfo?.path || pathname}`;

  return `# ${h1}

> ${description}

- **URL**: ${canonicalUrl}
- **Language**: ${language}
- **Data Source**: Office Fédéral de la Santé Publique (OFSP / BAG / UFSP) — Official 2026 Premiums Database
- **Provider**: Le Fennec Malin (FENY SA), Switzerland

---

## Overview

Le Fennec Malin is Switzerland's independent, broker-neutral insurance and retirement pension comparator. We provide transparent, mathematical comparisons across all 26 Swiss cantons and all 37 approved Swiss health insurance providers.

### Core Comparison Verticals

1. **Swiss Basic Health Insurance (LAMal / KVG - Primes 2026)**
   - Compulsory basic coverage identical by federal law across all insurers.
   - Premium calculation by canton, age group (children 0-18, young adults 19-25, adults 26+), and accident coverage.
   - Deductible optimization (*Franchise* CHF 300, 500, 1000, 1500, 2000, 2500).
   - Alternative insurance models: Standard (free choice of doctor), Telmed (telemedicine first), Family Doctor (*Médecin de famille / Hausarzt*), and HMO (health network).
   - Official cancellation deadline: November 30.

2. **Supplementary Health Insurance (LCA / VVG)**
   - Semi-private / private hospital ward coverage (*division demi-privée / privée*).
   - Dental, optical, alternative medicine, and worldwide emergency coverage.

3. **3rd Pillar Retirement & Tax Optimization (Pilier 3a / 3b)**
   - Maximum tax-deductible contribution (2026): **CHF 7'258** for employees with 2nd pillar (LPP); **CHF 36'288** (up to 20% of net income) for self-employed without LPP.
   - Projected retirement capital accumulation and annual cantonal tax savings calculation.

---

## Machine-Readable API Endpoints for Agents

AI agents and automated systems can query live Swiss insurance data directly:

### 1. Health Insurance Premium Lookup (Primes 2026)
\`\`\`http
GET /api/priminfo/praemien?zipCode={npa}&franchise={300|500|1000|1500|2000|2500}&yob={yearOfBirth}&accident={0|1}
\`\`\`
- **Parameters**:
  - \`zipCode\` (*required*): 4-digit Swiss postal code (e.g. \`1003\`, \`8001\`, \`1201\`)
  - \`franchise\` (*optional, default 2500*): 300, 500, 1000, 1500, 2000, 2500
  - \`yob\` (*optional*): Year of birth (e.g. \`1995\`)
  - \`accident\` (*optional, default 1*): \`1\` = with accident coverage (SLA), \`0\` = without accident coverage

### 2. Swiss Zip Code & Canton Resolver
\`\`\`http
GET /api/npa-lookup?npa={zipCode}
\`\`\`
Resolves Swiss postal code to canton, official premium region (PR-REG CH1, CH2, CH3), and locality.

---

## Machine-Readable Resources & Sitemaps

- **Agent Guidance (llms.txt)**: ${SITE_URL}/llms.txt
- **Extended Agent Index (llms-full.txt)**: ${SITE_URL}/llms-full.txt
- **XML Sitemap Index**: ${SITE_URL}/sitemap.xml
- **French Sitemap**: ${SITE_URL}/sitemap-fr.xml
- **German Sitemap**: ${SITE_URL}/sitemap-de.xml
- **Italian Sitemap**: ${SITE_URL}/sitemap-it.xml
- **English Sitemap**: ${SITE_URL}/sitemap-en.xml

---

## Contact & Legal Identification
- **Company**: FENY SA (Le Fennec Malin)
- **UID / Tax ID**: CHE-272.095.360
- **Email**: contact@lefennecmalin.ch
- **Legal Mandate**: Article 45 LSA registered neutral intermediary
`;
}

/**
 * Generates an agent-friendly 404 Markdown response pointing agents to sitemaps and llms.txt.
 */
export function generate404Markdown(pathname: string): string {
  return `# 404 Not Found — Le Fennec Malin 🇨🇭

The requested path \`${pathname}\` does not exist on this server.

## Suggested Resources for AI Agents & Crawlers

- **Agent Guidance & Specification**: ${SITE_URL}/llms.txt
- **Extended LLMs Index**: ${SITE_URL}/llms-full.txt
- **XML Sitemap Index**: ${SITE_URL}/sitemap.xml
- **Live Health Premium API**: ${SITE_URL}/api/priminfo/praemien?zipCode=1003
- **NPA / Canton Lookup API**: ${SITE_URL}/api/npa-lookup?npa=1003
- **Homepage (FR)**: ${SITE_URL}/fr/
- **Homepage (DE)**: ${SITE_URL}/de/
- **Homepage (IT)**: ${SITE_URL}/it/
- **Homepage (EN)**: ${SITE_URL}/en/

---
*Le Fennec Malin — Official & Neutral Swiss Insurance Comparator (OFSP 2026 Data)*
`;
}

/**
 * Generates an agent-friendly 404 HTML response for browsers.
 */
export function generate404Html(pathname: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 — Page non trouvée | Le Fennec Malin</title>
  <meta name="robots" content="noindex, follow">
  <link rel="icon" type="image/jpeg" href="/fennec-logo.jpg">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #FAF4EC; color: #2F2921; margin: 0; padding: 40px 20px; display: flex; align-items: center; justify-content: center; min-height: 80vh; }
    .box { max-width: 600px; background: #FFFFFF; border: 1px solid #ECE1D4; border-radius: 20px; padding: 36px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); text-align: center; }
    h1 { color: #D36D53; font-size: 28px; margin-top: 0; }
    p { color: #4A4036; font-size: 15px; line-height: 1.6; }
    code { background: #F7F1EB; padding: 3px 8px; border-radius: 6px; font-size: 14px; }
    .links { margin-top: 24px; display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
    .btn { display: inline-block; background: #D36D53; color: #FFFFFF; text-decoration: none; padding: 10px 20px; border-radius: 10px; font-weight: bold; font-size: 14px; }
    .btn-outline { background: transparent; color: #2F2921; border: 1px solid #ECE1D4; }
    .footer { margin-top: 24px; font-size: 12px; color: #7F7366; }
  </style>
</head>
<body>
  <div class="box">
    <h1>Page non trouvée (Erreur 404)</h1>
    <p>La page <code>${pathname}</code> n'existe pas ou a été déplacée.</p>
    <div class="links">
      <a href="/" class="btn">Retour à l'accueil</a>
      <a href="/fr/assurance-maladie/" class="btn btn-outline">Assurance Maladie</a>
      <a href="/fr/3eme-pilier/" class="btn btn-outline">3ème Pilier</a>
      <a href="/llms.txt" class="btn btn-outline">llms.txt</a>
      <a href="/sitemap.xml" class="btn btn-outline">Plan du site XML</a>
    </div>
    <div class="footer">
      Le Fennec Malin 🇨🇭 — Comparateur d'Assurances Suisse Neutre & Officiel (OFSP 2026)
    </div>
  </div>
</body>
</html>`;
}
