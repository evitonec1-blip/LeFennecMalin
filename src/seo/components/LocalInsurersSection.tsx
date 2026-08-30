/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Check, Star, ArrowRight, ExternalLink } from 'lucide-react';
import { MunicipalitySEOData } from '../data/municipalityTypes';

interface LocalInsurersSectionProps {
  municipality: MunicipalitySEOData;
  onOpenComparator: () => void;
}

export const LocalInsurersSection: React.FC<LocalInsurersSectionProps> = ({ municipality, onOpenComparator }) => {
  return (
    <section id="caisses" className="mb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
        <div>
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
            Classement 2026
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Caisses Maladie les Moins Chères à {municipality.name}
          </h2>
        </div>
        <button
          onClick={onOpenComparator}
          className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 cursor-pointer"
        >
          <span>Comparer les 37 caisses suisses</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200/80 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <th className="py-3.5 px-4 sm:px-6">Assureur</th>
              <th className="py-3.5 px-4">Modèle Recommandé</th>
              <th className="py-3.5 px-4">Adulte (Franchise 2500)</th>
              <th className="py-3.5 px-4">Adulte (Franchise 300)</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {municipality.cheapestInsurers.map((insurer, idx) => (
              <tr key={insurer.name} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-4 px-4 sm:px-6">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    {idx === 0 && (
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
                        1
                      </span>
                    )}
                    <span>{insurer.name}</span>
                  </div>
                  {insurer.highlight && (
                    <span className="inline-block mt-0.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {insurer.highlight}
                    </span>
                  )}
                </td>
                <td className="py-4 px-4 text-slate-700 font-medium">{insurer.model}</td>
                <td className="py-4 px-4 font-bold text-emerald-700">{insurer.adult2500} / mois</td>
                <td className="py-4 px-4 font-medium text-slate-600">{insurer.adult300} / mois</td>
                <td className="py-4 px-4 sm:px-6 text-right">
                  <button
                    onClick={onOpenComparator}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-emerald-600 text-white transition-colors cursor-pointer"
                  >
                    Simuler
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500 mt-3 italic">
        * Données officielles extraites des publications 2026 de l'Office Fédéral de la Santé Publique (OFSP). Les primes incluent la couverture accident légale pour une personne domiciliée à {municipality.name}.
      </p>
    </section>
  );
};
