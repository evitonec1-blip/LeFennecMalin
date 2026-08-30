/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Users, GraduationCap, Baby, Briefcase, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { MunicipalitySEOData } from '../data/municipalityTypes';

interface LocalDemographicsSectionProps {
  municipality: MunicipalitySEOData;
}

export const LocalDemographicsSection: React.FC<LocalDemographicsSectionProps> = ({ municipality }) => {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
          Conseils Spécialisés
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Assurance Maladie à {municipality.name} selon Votre Profil
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Découvrez nos recommandations d'optimisation adaptées aux familles, jeunes et frontaliers de {municipality.name}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Families */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:border-slate-300 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold mb-4">
            <Baby className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Familles & Enfants</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            {municipality.familyAdvice}
          </p>
          <ul className="text-xs text-slate-500 space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Franchise légale à CHF 0.- pour les enfants</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Rabais dès le 2ème enfant sur les complémentaires</span>
            </li>
          </ul>
        </div>

        {/* Young Adults */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:border-slate-300 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Jeunes & Étudiants (19-25 ans)</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            {municipality.youngAdultAdvice}
          </p>
          <ul className="text-xs text-slate-500 space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Réduction moyenne de 20% par rapport au plein tarif adulte</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Franchise 2500 hautement recommandée en l'absence de soins</span>
            </li>
          </ul>
        </div>

        {/* Models & Franchise */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:border-slate-300 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Optimisation Modèle & Franchise</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            {municipality.franchiseAdvice}
          </p>
          <ul className="text-xs text-slate-500 space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Modèles Telmed et Médecin de famille avec rabais de 15% à 25%</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Économie garantie de plus de CHF 1'300.- / an</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
