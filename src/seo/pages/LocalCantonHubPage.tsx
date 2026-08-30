/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { CantonLocalHubData } from '../data/municipalityTypes';
import { LocalBreadcrumbs } from '../components/LocalBreadcrumbs';
import { MapPin, Users, ArrowRight, ShieldCheck, ChevronRight, Calculator, Building, Landmark } from 'lucide-react';
import { Language } from '../../i18n/translations';

interface LocalCantonHubPageProps {
  hubData: CantonLocalHubData;
  lang?: Language;
  onOpenComparator: () => void;
}

export const LocalCantonHubPage: React.FC<LocalCantonHubPageProps> = ({
  hubData,
  lang = 'fr',
  onOpenComparator
}) => {
  useEffect(() => {
    document.title = `Assurance Maladie Canton de ${hubData.cantonName} — Villes & Communes 2026`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        `Consultez les primes d'assurance maladie 2026 pour les principales communes du Canton de ${hubData.cantonName} (${hubData.cantonCode}). Comparatif officiel OFSP par ville et subsides.`
      );
    }
    window.scrollTo(0, 0);
  }, [hubData]);

  const breadcrumbs = [
    { label: 'Assurance Maladie', url: `/${lang}/assurance-maladie/` },
    { label: `Canton de ${hubData.cantonName}` }
  ];

  return (
    <div className="min-h-screen bg-slate-100/60 font-sans">
      <LocalBreadcrumbs items={breadcrumbs} lang={lang} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <MapPin className="w-3.5 h-3.5" />
              Canton de {hubData.cantonName} ({hubData.cantonCode})
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              <Users className="w-3.5 h-3.5" />
              {hubData.totalPopulation}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Assurance Maladie dans le Canton de {hubData.cantonName}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed mb-8">
            {hubData.overview}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenComparator}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 transition-all text-base cursor-pointer"
            >
              <Calculator className="w-5 h-5" />
              <span>Calculateur de Primes Canton de {hubData.cantonName}</span>
            </button>
            <a
              href={`/${lang}/subsides/${hubData.cantonSlug}/`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700 transition-colors text-sm"
            >
              <Landmark className="w-4 h-4 text-emerald-400" />
              <span>Guide Subsides {hubData.cantonName}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main content: Cities directory */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
            Répertoire Communal
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Communes et Villes du Canton de {hubData.cantonName}
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Sélectionnez votre ville pour consulter les tarifs officiels des 37 caisses maladie, les hôpitaux et les aides financières locales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hubData.mainCities.map((city) => (
            <a
              key={city.slug}
              href={`/${lang}/local/${city.cantonSlug}/${city.slug}/`}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {city.name}
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {city.postalCodes[0]}
                  </span>
                </div>

                <div className="text-xs text-slate-500 mb-4 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>{city.population}</span>
                  <span>•</span>
                  <span>{city.region}</span>
                </div>

                <div className="space-y-2 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dès (Franchise 2500) :</span>
                    <strong className="text-emerald-700 font-bold">{city.cheapestInsurers[0]?.adult2500 || 'Dès CHF 360.-'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Caisse la moins chère :</span>
                    <span className="font-semibold text-slate-800">{city.cheapestInsurers[0]?.name || 'KPT'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                <span>Voir le comparatif 2026</span>
                <ChevronRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
};
