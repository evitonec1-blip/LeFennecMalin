/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Building2, Stethoscope, CheckCircle2, Shield } from 'lucide-react';
import { MunicipalitySEOData } from '../data/municipalityTypes';

interface LocalHospitalsSectionProps {
  municipality: MunicipalitySEOData;
}

export const LocalHospitalsSection: React.FC<LocalHospitalsSectionProps> = ({ municipality }) => {
  return (
    <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 mb-12">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Hôpitaux, Cliniques & Réseaux de Soins à {municipality.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Établissements de santé de référence couverts par l'assurance de base LAMal
          </p>
        </div>
      </div>

      <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
        {municipality.modelsAdvice}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>Hôpitaux & Cliniques de Proximité</span>
          </div>
          <ul className="space-y-1.5 text-sm text-slate-800 font-medium">
            {municipality.localHospitals.map((h, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {municipality.hmoCenters && municipality.hmoCenters.length > 0 && (
          <div className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-xs">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-emerald-600" />
              <span>Centres Médicaux & Réseaux HMO</span>
            </div>
            <ul className="space-y-1.5 text-sm text-slate-800 font-medium">
              {municipality.hmoCenters.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};
