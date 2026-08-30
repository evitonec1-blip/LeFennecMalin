/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { MunicipalitySEOData } from '../data/municipalityTypes';
import { LocalBreadcrumbs } from '../components/LocalBreadcrumbs';
import { LocalHero } from '../components/LocalHero';
import { LocalInsuranceStats } from '../components/LocalInsuranceStats';
import { LocalInsurersSection } from '../components/LocalInsurersSection';
import { LocalSubsidySection } from '../components/LocalSubsidySection';
import { LocalDemographicsSection } from '../components/LocalDemographicsSection';
import { LocalHospitalsSection } from '../components/LocalHospitalsSection';
import { LocalFAQSection } from '../components/LocalFAQSection';
import { LocalRelatedCommunes } from '../components/LocalRelatedCommunes';
import { LocalComparisonCTA } from '../components/LocalComparisonCTA';
import { Language } from '../../i18n/translations';

interface LocalCityPageProps {
  municipality: MunicipalitySEOData;
  lang?: Language;
  onOpenComparator: () => void;
  onNavigate?: (tab: string) => void;
}

export const LocalCityPage: React.FC<LocalCityPageProps> = ({
  municipality,
  lang = 'fr',
  onOpenComparator,
  onNavigate
}) => {
  // Update document title and meta description
  useEffect(() => {
    document.title = municipality.seoTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', municipality.metaDescription);
    }
    window.scrollTo(0, 0);
  }, [municipality]);

  const breadcrumbs = [
    { label: 'Assurance Maladie', url: `/${lang}/assurance-maladie/` },
    { label: `Canton de ${municipality.canton}`, url: `/${lang}/local/${municipality.cantonSlug}/` },
    { label: municipality.name }
  ];

  // Schema.org FAQPage & FinancialService JSON-LD
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FinancialService',
        name: `Assurance Maladie ${municipality.name} — Le Fennec Malin`,
        description: municipality.metaDescription,
        url: `https://www.lefennecmalin.ch/${lang}/local/${municipality.cantonSlug}/${municipality.slug}/`,
        areaServed: {
          '@type': 'AdministrativeArea',
          name: `${municipality.name}, Canton de ${municipality.canton}, Suisse`,
          postalCode: municipality.postalCodes[0]
        },
        provider: {
          '@type': 'Organization',
          name: 'Le Fennec Malin',
          url: 'https://www.lefennecmalin.ch'
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: municipality.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: `https://www.lefennecmalin.ch/${lang}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: `Canton de ${municipality.canton}`,
            item: `https://www.lefennecmalin.ch/${lang}/local/${municipality.cantonSlug}/`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: municipality.name,
            item: `https://www.lefennecmalin.ch/${lang}/local/${municipality.cantonSlug}/${municipality.slug}/`
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-100/60 font-sans">
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* Breadcrumbs */}
      <LocalBreadcrumbs items={breadcrumbs} lang={lang} />

      {/* Hero Section */}
      <LocalHero municipality={municipality} onOpenComparator={onOpenComparator} />

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Core Stats and Official Rates */}
        <LocalInsuranceStats municipality={municipality} />

        {/* Insurers Ranking Table */}
        <LocalInsurersSection municipality={municipality} onOpenComparator={onOpenComparator} />

        {/* Canton Subsidies Info */}
        <LocalSubsidySection municipality={municipality} />

        {/* Demographic & Profile Breakdowns */}
        <LocalDemographicsSection municipality={municipality} />

        {/* Local Healthcare & Hospitals */}
        <LocalHospitalsSection municipality={municipality} />

        {/* Mid-page Conversion CTA */}
        <LocalComparisonCTA municipality={municipality} onOpenComparator={onOpenComparator} />

        {/* Localized FAQs with JSON-LD Schema */}
        <LocalFAQSection municipality={municipality} />

        {/* Cross-linking to Neighboring Communes */}
        <LocalRelatedCommunes municipality={municipality} lang={lang} />
      </main>
    </div>
  );
};
