/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Calculator } from 'lucide-react';
import { MunicipalitySEOData } from '../data/municipalityTypes';

interface LocalComparisonCTAProps {
  municipality: MunicipalitySEOData;
  onOpenComparator: () => void;
}

export const LocalComparisonCTA: React.FC<LocalComparisonCTAProps> = ({ municipality, onOpenComparator }) => {
  return (
    <section className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-12 text-center relative overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white/20 text-white border border-white/30 backdrop-blur-xs mb-4">
          <Zap className="w-3.5 h-3.5" />
          Simulateur Gratuit & Sans Engagement
        </span>

        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4">
          Prêt à réduire vos primes d'assurance maladie à {municipality.name} ?
        </h2>

        <p className="text-base sm:text-lg text-emerald-100 mb-8 leading-relaxed">
          Calculez vos primes personnalisées pour votre ménage ({municipality.postalCodes[0]} {municipality.name}) et découvrez votre potentiel d'économie exact en moins de 2 minutes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenComparator}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-white text-slate-900 hover:bg-slate-100 shadow-lg shadow-black/10 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 text-base cursor-pointer"
          >
            <Calculator className="w-5 h-5 text-emerald-600" />
            <span>Lancer le Comparateur pour {municipality.name}</span>
            <ArrowRight className="w-5 h-5 text-slate-700" />
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-100">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            Données 100% officielles OFSP 2026
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            Aucun démarchage téléphonique
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            Gratuit et indépendant
          </span>
        </div>
      </div>
    </section>
  );
};
