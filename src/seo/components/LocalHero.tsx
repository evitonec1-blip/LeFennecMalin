/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Users, ShieldCheck, TrendingDown, ArrowRight, Award } from 'lucide-react';
import { MunicipalitySEOData } from '../data/municipalityTypes';

interface LocalHeroProps {
  municipality: MunicipalitySEOData;
  onOpenComparator: () => void;
}

export const LocalHero: React.FC<LocalHeroProps> = ({ municipality, onOpenComparator }) => {
  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <MapPin className="w-3.5 h-3.5" />
            Canton de {municipality.canton} ({municipality.cantonCode})
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <Users className="w-3.5 h-3.5" />
            {municipality.population}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Award className="w-3.5 h-3.5" />
            Données certifiées OFSP 2026
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
          Assurance Maladie à {municipality.name} — Primes & Comparateur 2026
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed mb-8">
          Comparez les tarifs officiels de l'assurance de base (LAMal) pour les codes postaux de{' '}
          <strong className="text-white font-semibold">{municipality.name}</strong> ({municipality.postalCodes.join(', ')}). 
          Identifiez les caisses les moins chères, optimisez votre franchise et vérifiez vos droits aux subsides cantonaux.
        </p>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mb-8">
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4">
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Dès (Franchise 2500)</div>
            <div className="text-2xl font-bold text-emerald-400">
              {municipality.cheapestInsurers[0]?.adult2500 || municipality.avgAdultPremium2500.split('–')[0]} / mois
            </div>
            <div className="text-xs text-slate-400 mt-1">Tarif le plus bas à {municipality.name}</div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4">
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Économie Potentielle</div>
            <div className="text-2xl font-bold text-amber-400">Jusqu'à CHF 1'600.-</div>
            <div className="text-xs text-slate-400 mt-1">par an et par adulte</div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4">
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Région OFSP</div>
            <div className="text-lg font-bold text-blue-300 truncate">{municipality.region}</div>
            <div className="text-xs text-slate-400 mt-1">Tarification officielle 2026</div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={onOpenComparator}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-base cursor-pointer"
          >
            <span>Calculer mes primes à {municipality.name}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <a
            href="#caisses"
            className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700 transition-colors text-sm"
          >
            Voir les caisses les moins chères
          </a>
        </div>
      </div>
    </section>
  );
};
