import { useEffect } from 'react';
import { SITE_URL } from '../site';
import { Language } from '../../i18n/translations';
import { AppTab } from '../../types';
import { getMultilingualRoute, getLocalizedRouteInfo, getHreflangAlternates } from '../multilingualRoutes';

interface SEOHeadProps {
  tab?: AppTab;
  title?: string;
  description?: string;
  canonical?: string;
  language?: Language;
  hreflangAlternates?: Record<string, string>;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  structuredData?: object | object[];
  noindex?: boolean;
}

const BASE_URL = SITE_URL;
const DEFAULT_IMAGE = `${BASE_URL}/fennec-avatar.jpg`;

export const LOCALE_MAP: Record<Language, { langTag: string; ogLocale: string }> = {
  fr: { langTag: 'fr-CH', ogLocale: 'fr_CH' },
  de: { langTag: 'de-CH', ogLocale: 'de_CH' },
  it: { langTag: 'it-CH', ogLocale: 'it_CH' },
  en: { langTag: 'en-CH', ogLocale: 'en_GB' },
  es: { langTag: 'es-CH', ogLocale: 'es_ES' },
  pt: { langTag: 'pt-CH', ogLocale: 'pt_PT' },
};

export default function SEOHead({
  tab,
  title,
  description,
  canonical,
  language = 'fr',
  hreflangAlternates,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_IMAGE,
  structuredData,
  noindex = false,
}: SEOHeadProps) {
  // If tab is provided, compute default multilingual values
  const routeInfo = tab ? getLocalizedRouteInfo(tab, language) : null;
  const autoTitle = title || routeInfo?.title || 'Le Fennec Malin — Comparateur d\'Assurances Suisse';
  const autoDescription = description || routeInfo?.description || 'Comparez les assurances en Suisse.';
  const autoCanonical = canonical || (routeInfo ? routeInfo.path : '/');
  const autoHreflangs = hreflangAlternates || (tab ? getHreflangAlternates(tab) : undefined);

  const fullCanonical = autoCanonical.startsWith('http') ? autoCanonical : `${BASE_URL}${autoCanonical}`;
  const localeInfo = LOCALE_MAP[language] || LOCALE_MAP.fr;

  useEffect(() => {
    // 1. HTML lang attribute
    document.documentElement.lang = localeInfo.langTag;

    // 2. Title
    document.title = autoTitle;

    // Helper: set or create meta tag
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrVal] = attr.split('=');
        el.setAttribute(attrName, attrVal.replace(/"/g, ''));
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    // Helper: set or create link tag
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    // Basic SEO
    setMeta('meta[name="description"]', 'name=description', autoDescription);
    setMeta('meta[name="robots"]', 'name=robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setMeta('meta[name="geo.region"]', 'name=geo.region', 'CH');
    setMeta('meta[name="geo.placename"]', 'name=geo.placename', 'Switzerland');
    setLink('canonical', fullCanonical);

    // Hreflang alternates
    // Remove existing hreflang tags to prevent stale tags
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());

    if (autoHreflangs) {
      Object.entries(autoHreflangs).forEach(([hreflang, href]) => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = hreflang;
        link.href = href;
        document.head.appendChild(link);
      });
    } else {
      // Default fallback self-referencing and x-default
      const defaultAlts: Record<string, string> = {
        'fr-CH': fullCanonical,
        'x-default': fullCanonical,
      };
      Object.entries(defaultAlts).forEach(([hreflang, href]) => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = hreflang;
        link.href = href;
        document.head.appendChild(link);
      });
    }

    // Open Graph
    setMeta('meta[property="og:title"]', 'property=og:title', ogTitle || autoTitle);
    setMeta('meta[property="og:description"]', 'property=og:description', ogDescription || autoDescription);
    setMeta('meta[property="og:url"]', 'property=og:url', fullCanonical);
    setMeta('meta[property="og:image"]', 'property=og:image', ogImage);
    setMeta('meta[property="og:locale"]', 'property=og:locale', localeInfo.ogLocale);

    // Twitter
    setMeta('meta[name="twitter:title"]', 'name=twitter:title', ogTitle || autoTitle);
    setMeta('meta[name="twitter:description"]', 'name=twitter:description', ogDescription || autoDescription);
    setMeta('meta[name="twitter:image"]', 'name=twitter:image', ogImage);

    // Structured data
    document.querySelectorAll('script[data-seo="true"]').forEach(el => el.remove());

    if (structuredData) {
      const schemas = Array.isArray(structuredData) ? structuredData : [structuredData];
      schemas.forEach(schema => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo', 'true');
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
      });
    }

    return () => {
      document.querySelectorAll('script[data-seo="true"]').forEach(el => el.remove());
    };
  }, [autoTitle, autoDescription, fullCanonical, language, autoHreflangs, ogTitle, ogDescription, ogImage, noindex, localeInfo]);

  return null;
}

// Pre-built structured data helpers
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Le Fennec Malin',
  legalName: 'Le Fennec Malin',
  url: BASE_URL,
  logo: `${BASE_URL}/fennec-logo.jpg`,
  image: `${BASE_URL}/fennec-avatar.jpg`,
  description: 'Comparateur d\'assurances suisse indépendant — assurance maladie (LAMal/LCA), 3ème pilier, auto, ménage et prévoyance.',
  areaServed: {
    '@type': 'Country',
    name: 'Switzerland',
    identifier: 'CH'
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CH'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'contact@lefennecmalin.ch',
    availableLanguage: ['French', 'German', 'English', 'Italian']
  },
  taxID: 'CHE-272.095.360',
  knowsAbout: [
    'Assurance Maladie Suisse LAMal',
    'Assurance Complémentaire LCA',
    '3ème Pilier Suisse 3a et 3b',
    'Assurance Auto Casco Suisse',
    'Assurance Ménage & RC Privée'
  ]
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Le Fennec Malin',
  alternateName: 'LeFennecMalin.ch',
  url: BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/comparateur-assurance-suisse/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function financialServiceSchema(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name,
    description,
    url: url.startsWith('http') ? url : `${BASE_URL}${url}`,
    provider: {
      '@type': 'Organization',
      name: 'Le Fennec Malin',
      url: BASE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Switzerland',
    },
    serviceType: 'Insurance Comparison',
    isAccessibleForFree: true,
  };
}

export function articleSchema(title: string, description: string, url: string, datePublished = '2026-01-15', dateModified = '2026-02-01', authorName = 'Rédaction Le Fennec Malin') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: url.startsWith('http') ? url : `${BASE_URL}${url}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url.startsWith('http') ? url : `${BASE_URL}${url}`,
    },
    author: {
      '@type': 'Person',
      name: authorName,
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Le Fennec Malin',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/fennec-avatar.jpg`,
      },
    },
    datePublished: datePublished,
    dateModified: dateModified,
  };
}

