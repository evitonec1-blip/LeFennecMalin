import { useEffect } from 'react';
import { SITE_URL } from '../site';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  structuredData?: object | object[];
  noindex?: boolean;
}

const BASE_URL = SITE_URL;
const DEFAULT_IMAGE = `${BASE_URL}/fennec-avatar.jpg`;

export default function SEOHead({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_IMAGE,
  structuredData,
  noindex = false,
}: SEOHeadProps) {
  const fullCanonical = canonical.startsWith('http') ? canonical : `${BASE_URL}${canonical}`;

  useEffect(() => {
    // Title
    document.title = title;

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

    setMeta('meta[name="description"]', 'name=description', description);
    setMeta('meta[name="robots"]', 'name=robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setLink('canonical', fullCanonical);

    // Open Graph
    setMeta('meta[property="og:title"]', 'property=og:title', ogTitle || title);
    setMeta('meta[property="og:description"]', 'property=og:description', ogDescription || description);
    setMeta('meta[property="og:url"]', 'property=og:url', fullCanonical);
    setMeta('meta[property="og:image"]', 'property=og:image', ogImage);
    setMeta('meta[property="og:type"]', 'property=og:type', 'website');
    setMeta('meta[property="og:site_name"]', 'property=og:site_name', 'Le Fennec Malin');

    // Twitter
    setMeta('meta[name="twitter:title"]', 'name=twitter:title', ogTitle || title);
    setMeta('meta[name="twitter:description"]', 'name=twitter:description', ogDescription || description);
    setMeta('meta[name="twitter:image"]', 'name=twitter:image', ogImage);
    setMeta('meta[name="twitter:card"]', 'name=twitter:card', 'summary_large_image');

    // Structured data
    const existingLD = document.querySelectorAll('script[data-seo="true"]');
    existingLD.forEach(el => el.remove());

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
      // Cleanup structured data on unmount
      document.querySelectorAll('script[data-seo="true"]').forEach(el => el.remove());
    };
  }, [title, description, canonical, ogTitle, ogDescription, ogImage, structuredData, noindex]);

  return null;
}

// Pre-built structured data helpers
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Le Fennec Malin',
  url: BASE_URL,
  logo: `${BASE_URL}/fennec-logo.jpg`,
  description: 'Comparateur d\'assurances suisse indépendant — assurance maladie, 3ème pilier, prévoyance.',
  areaServed: { '@type': 'Country', name: 'Switzerland' },
  foundingLocation: { '@type': 'Place', name: 'Suisse' },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Le Fennec Malin',
  url: BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/?q={search_term_string}`,
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
