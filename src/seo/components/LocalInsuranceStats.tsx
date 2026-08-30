/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calculator, CheckCircle2, AlertCircle, Info, Shield } from 'lucide-react';
import { MunicipalitySEOData } from '../data/municipalityTypes';

interface LocalInsuranceStatsProps {
  municipality: MunicipalitySEOData;
}

export const LocalInsuranceStats: React.FC<LocalInsuranceStatsProps> = ({ municipality }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Barèmes des Primes 2026 à {municipality.name}
          </h2>
          <p className="text-sm text-slate-500">
            Fourchettes moyennes officielles selon l'Office Fédéral de la Santé Publique (OFSP / Priminfo)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Adultes (Franchise 300)
          </div>
          <div className="text-lg font-bold text-slate-900">{municipality.avgAdultPremium300}</div>
          <div className="text-xs text-slate-500 mt-1">Avec couverture accidents</div>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/60">
          <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
            Adultes (Franchise 2500)
          </div>
          <div className="text-lg font-bold text-emerald-900">{municipality.avgAdultPremium2500}</div>
          <div className="text-xs text-emerald-700 mt-1">Option la plus économique</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Jeunes Adultes (19-25 ans)
          </div>
          <div className="text-lg font-bold text-slate-900">{municipality.avgYoungPremium}</div>
          <div className="text-xs text-slate-500 mt-1">Tarif préférentiel jeunes</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Enfants (0-18 ans)
          </div>
          <div className="text-lg font-bold text-slate-900">{municipality.avgChildPremium}</div>
          <div className="text-xs text-slate-500 mt-1">Franchise légale CHF 0.-</div>
        </div>
      </div>

      {/* Localized In-Depth Analysis Paragraphs */}
      <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base border-t border-slate-100 pt-6">
        <p>{municipality.localOverview}</p>
        
        <div className="bg-blue-50/70 border border-blue-200/70 rounded-xl p-4 sm:p-5 flex items-start gap-3.5">
          <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900 leading-relaxed">
            <strong className="font-semibold block mb-1">
              Codes postaux officiels couverts à {municipality.name} :
            </strong>
            Les tarifs indiqués ci-dessus s'appliquent à tous les résidents des numéros postaux d'acheminement (NPA) :{' '}
            <span className="font-semibold text-blue-950">{municipality.postalCodes.join(', ')}</span>.
          </div>
        </div>
      </div>
    </div>
  );
};
