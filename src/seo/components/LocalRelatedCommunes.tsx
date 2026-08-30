/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, ArrowRight, Building, Layers } from 'lucide-react';
import { MunicipalitySEOData } from '../data/municipalityTypes';
import { Language } from '../../i18n/translations';

interface LocalRelatedCommunesProps {
  municipality: MunicipalitySEOData;
  lang?: Language;
}

export const LocalRelatedCommunes: React.FC<LocalRelatedCommunesProps> = ({ municipality, lang = 'fr' }) => {
  return (
    <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Communes Voisines & Réseau Régional
          </h2>
          <p className="text-sm text-slate-500">
            Comparez également les primes d'assurance maladie dans les communes limitrophes
          </p>
        </div>
        <a
          href={`/${lang}/local/${municipality.cantonSlug}/`}
          className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
        >
          <span>Toutes les villes de {municipality.canton}</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Parent Canton Link */}
        <a
          href={`/${lang}/assurance-maladie/${municipality.cantonSlug}/`}
          className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-500/50 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Canton</span>
          </div>
          <div className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
            Canton de {municipality.canton}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center justify-between">
            <span>Guide cantonal global</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </a>

        {/* Nearby Cities */}
        {municipality.nearbyCommunes.map((commune) => (
          <a
            key={commune.slug}
            href={`/${lang}/local/${commune.cantonSlug}/${commune.slug}/`}
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-500/50 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Commune</span>
            </div>
            <div className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
              {commune.name}
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center justify-between">
              <span>{commune.population ? `${commune.population} hab.` : 'Voir primes 2026'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
