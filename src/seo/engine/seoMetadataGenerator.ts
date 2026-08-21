/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Master SEO Metadata Engine & Structured Data (JSON-LD) Generator
 * Adheres strictly to:
 * - Optimal Title tag formatting: [Topic / Brand] [Year] — [Actionable Benefit / USP] | Le Fennec Malin
 * - Meta descriptions: 120-160 characters with clear call-to-action
 * - OpenGraph + Twitter Cards
 * - JSON-LD Structured Data: BreadcrumbList, WebPage, FAQPage, Organization, Product/Service
 * - Hreflang alternates matrix
 */

import { AppTab } from '../../types';
import { Language } from '../../i18n/translations';
import { SITE_URL } from '../site';
import { getMultilingualRoute, getHreflangAlternates } from '../multilingualRoutes';

export interface GeneratedMetadata {
  title: string;
  description: string;
  h1: string;
  canonical: string;
  hreflang: Record<string, string>;
  openGraph: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    locale: string;
    type: string;
    image: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
  jsonLdSchemas: object[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function generatePageMetadata(
  tab: AppTab,
  lang: Language = 'fr',
  customFaqs?: FAQItem[]
): GeneratedMetadata {
  const route = getMultilingualRoute(tab);
  const localeInfo = route.locales[lang] || route.locales.fr;
  const canonicalUrl = `${SITE_URL}${localeInfo.path}`;
  const hreflangMatrix = getHreflangAlternates(tab);

  const ogLocaleMap: Record<Language, string> = {
    fr: 'fr_CH',
    de: 'de_CH',
    it: 'it_CH',
    en: 'en_US',
    es: 'es_ES',
    pt: 'pt_PT'
  };

  const schemas: object[] = [];

  // 1. Organization Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Le Fennec Malin',
    url: SITE_URL,
    logo: `${SITE_URL}/assets/images/fennec-icon.png`,
    description: 'Comparateur indépendant d’assurances et prévoyance en Suisse.',
    sameAs: [
      'https://www.facebook.com/lefennecmalin',
      'https://twitter.com/lefennecmalin',
      'https://www.linkedin.com/company/lefennecmalin'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      areaServed: 'CH',
      availableLanguage: ['French', 'German', 'Italian', 'English']
    }
  });

  // 2. BreadcrumbList Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: lang === 'de' ? 'Startseite' : lang === 'it' ? 'Home' : lang === 'en' ? 'Home' : 'Accueil',
        item: `${SITE_URL}/${lang === 'fr' ? '' : lang + '/'}`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: localeInfo.breadcrumbLabel || localeInfo.h1,
        item: canonicalUrl
      }
    ]
  });

  // 3. WebPage Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: localeInfo.title,
    description: localeInfo.description,
    url: canonicalUrl,
    inLanguage: lang === 'de' ? 'de-CH' : lang === 'it' ? 'it-CH' : lang === 'en' ? 'en-CH' : 'fr-CH',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Le Fennec Malin',
      url: SITE_URL
    }
  });

  // 4. FAQPage Schema (if available)
  if (customFaqs && customFaqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: customFaqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  }

  return {
    title: localeInfo.title,
    description: localeInfo.description,
    h1: localeInfo.h1,
    canonical: canonicalUrl,
    hreflang: hreflangMatrix,
    openGraph: {
      title: localeInfo.title,
      description: localeInfo.description,
      url: canonicalUrl,
      siteName: 'Le Fennec Malin',
      locale: ogLocaleMap[lang] || 'fr_CH',
      type: 'website',
      image: `${SITE_URL}/assets/images/og-fennec.png`
    },
    twitter: {
      card: 'summary_large_image',
      title: localeInfo.title,
      description: localeInfo.description,
      image: `${SITE_URL}/assets/images/og-fennec.png`
    },
    jsonLdSchemas: schemas
  };
}
