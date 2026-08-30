/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { ALL_MUNICIPALITIES, getActiveCantonSlugs, getMunicipalitiesByCanton } from '../data/municipalitiesData';
import { LocalBreadcrumbs } from '../components/LocalBreadcrumbs';
import { MapPin, Users, ArrowRight, ShieldCheck, Calculator, Building2 } from 'lucide-react';
import { Language } from '../../i18n/translations';

interface LocalHubPageProps {
  lang?: Language;
  onOpenComparator: () => void;
}

export const LocalHubPage: React.FC<LocalHubPageProps> = ({ lang = 'fr', onOpenComparator }) => {
  useEffect(() => {
    document.title = 'Assurance Maladie par Ville & Commune en Suisse — Répertoire Local 2026';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        "Comparez les primes d'assurance maladie officielles 2026 pour plus de 30 grandes villes et communes suisses (Genève, Lausanne, Zurich, Bâle, Berne, Lugano, Fribourg, etc.)."
      );
    }
    window.scrollTo(0, 0);
  }, []);

  const breadcrumbs = [
    { label: 'Assurance Maladie', url: `/${lang}/assurance-maladie/` },
    { label: 'Villes & Communes de Suisse' }
  ];

  const cantonSlugs = getActiveCantonSlugs();

  return (
    <div className="min-h-screen bg-slate-100/60 font-sans">
      <LocalBreadcrumbs items={breadcrumbs} lang={lang} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <MapPin className="w-3.5 h-3.5" />
              Répertoire Local Suisse
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              <Building2 className="w-3.5 h-3.5" />
              30 Villes & Communes Clés
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Assurance Maladie par Ville & Commune en Suisse
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed mb-8">
            En Suisse, les primes d'assurance maladie varient selon votre canton, votre commune et votre région de primes OFSP. Explorez les tarifs officiels 2026, découvrez les caisses les plus avantageuses et les aides cantonales par ville.
          </p>

          <button
            onClick={onOpenComparator}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 transition-all text-base cursor-pointer"
          >
            <Calculator className="w-5 h-5" />
            <span>Calculer mes primes par NPA</span>
          </button>
        </div>
      </section>

      {/* Directory by Canton */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {cantonSlugs.map((cantonSlug) => {
            const cities = getMunicipalitiesByCanton(cantonSlug);
            if (cities.length === 0) return null;
            const cantonName = cities[0].canton;

            return (
              <div key={cantonSlug} className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 gap-2">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                      Canton de {cantonName} ({cities[0].cantonCode})
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {cities.length} ville{cities.length > 1 ? 's' : ''} référencée{cities.length > 1 ? 's' : ''}
                    </p>
                  </div>
                  <a
                    href={`/${lang}/local/${cantonSlug}/`}
                    className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
                  >
                    <span>Voir le hub {cantonName}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cities.map((city) => (
                    <a
                      key={city.slug}
                      href={`/${lang}/local/${city.cantonSlug}/${city.slug}/`}
                      className="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200/70 hover:border-emerald-300 transition-all group"
                    >
                      <div className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                        {city.name}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {city.postalCodes[0]} • {city.population}
                      </div>
                      <div className="text-xs font-semibold text-emerald-700 mt-2 flex items-center justify-between">
                        <span>{city.cheapestInsurers[0]?.adult2500 || 'Dès CHF 370.-'}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
