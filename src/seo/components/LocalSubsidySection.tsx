/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Landmark, CheckCircle, FileText, ArrowUpRight, MapPin } from 'lucide-react';
import { MunicipalitySEOData } from '../data/municipalityTypes';

interface LocalSubsidySectionProps {
  municipality: MunicipalitySEOData;
}

export const LocalSubsidySection: React.FC<LocalSubsidySectionProps> = ({ municipality }) => {
  return (
    <section className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-12 shadow-md">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
            <Landmark className="w-3.5 h-3.5" />
            Aides Cantonales aux Primes — Canton de {municipality.canton}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Subsides d'Assurance Maladie à {municipality.name}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
            {municipality.subsidyEligibilitySummary} Si vos revenus ou votre situation familiale ont évolué, vous avez peut-être droit à une prise en charge partielle ou totale de vos primes LAMal.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-200">
            <div className="flex items-start gap-2 bg-white/5 p-3 rounded-lg border border-white/10">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Organisme cantonal compétent :</strong>
                <span>{municipality.subsidyAgency}</span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-white/5 p-3 rounded-lg border border-white/10">
              <FileText className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Adresse administrative :</strong>
                <span>{municipality.subsidyOfficeAddress}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 flex flex-col gap-3">
          <a
            href={`/fr/subsides/${municipality.cantonSlug}/`}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold bg-white text-slate-900 hover:bg-slate-100 transition-colors text-sm shadow-sm"
          >
            <span>Guide complet subsides {municipality.canton}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
