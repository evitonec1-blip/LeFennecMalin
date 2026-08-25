/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Reusable, High-Authority Insurer Cross-Linking Grid
 * Displays top Swiss health insurers and head-to-head comparisons
 * with crawlable semantic links.
 */

import React from 'react';
import { Shield, Scale, ArrowRight, Star, Award } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { AppTab } from '../../types';
import { getLocalizedPath } from '../multilingualRoutes';
import CompanyLogo from '../../components/CompanyLogo';

interface Props {
  currentInsurerSlug?: string;
  onNavigate?: (url: string) => void;
  className?: string;
}

const TOP_INSURERS = [
  { id: 'css', name: 'CSS Assurance', rating: '5.3/6', members: '1.7M' },
  { id: 'helsana', name: 'Helsana', rating: '5.1/6', members: '1.5M' },
  { id: 'swica', name: 'SWICA', rating: '5.5/6', members: '850K' },
  { id: 'groupe-mutuel', name: 'Groupe Mutuel', rating: '4.9/6', members: '1.3M' },
  { id: 'sanitas', name: 'Sanitas', rating: '5.3/6', members: '840K' },
  { id: 'assura', name: 'Assura', rating: '4.6/6', members: '800K' },
  { id: 'visana', name: 'Visana', rating: '5.2/6', members: '830K' },
  { id: 'concordia', name: 'Concordia', rating: '5.3/6', members: '700K' },
  { id: 'kpt', name: 'KPT / CPT', rating: '5.4/6', members: '600K' },
  { id: 'sympany', name: 'Sympany', rating: '5.1/6', members: '260K' },
  { id: 'oekk', name: 'ÖKK', rating: '5.2/6', members: '180K' },
  { id: 'atupri', name: 'Atupri', rating: '5.0/6', members: '175K' },
];

const POPULAR_COMPARISONS = [
  { slug: 'compare-css-helsana', nameA: 'CSS', nameB: 'Helsana' },
  { slug: 'compare-helsana-swica', nameA: 'Helsana', nameB: 'SWICA' },
  { slug: 'compare-css-swica', nameA: 'CSS', nameB: 'SWICA' },
  { slug: 'compare-assura-mutuel', nameA: 'Assura', nameB: 'Groupe Mutuel' },
  { slug: 'compare-swica-sanitas', nameA: 'SWICA', nameB: 'Sanitas' },
  { slug: 'compare-visana-concordia', nameA: 'Visana', nameB: 'Concordia' },
];

export default function InsurerCrossLinks({
  currentInsurerSlug,
  onNavigate,
  className = ''
}: Props) {
  const { language } = useLanguage();

  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey) return;
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  const directoryPath = getLocalizedPath('hub-assureurs', language);

  return (
    <section className={`bg-white rounded-3xl border border-fennec-cream/70 p-6 sm:p-10 my-12 shadow-xs text-left ${className}`}>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-4 border-b border-fennec-cream/60">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-fennec-terracotta flex items-center gap-1.5 mb-1.5">
            <Shield className="w-3.5 h-3.5" />
            Caisses Maladie Agréées OFSP · Suisse
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-fennec-dark">
            Fiches détaillées des principaux assureurs suisses
          </h2>
          <p className="text-xs sm:text-sm text-fennec-dark/65 max-w-3xl mt-1 leading-relaxed">
            Consultez les notes de satisfaction client, les modèles alternatifs, les délais de remboursement et les avis détaillés.
          </p>
        </div>
        <a
          href={directoryPath}
          onClick={(e) => handleLinkClick(directoryPath, e)}
          className="text-xs font-bold text-fennec-terracotta hover:underline inline-flex items-center gap-1"
        >
          <span>Voir les 37 caisses suisses</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Grid of Insurers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
        {TOP_INSURERS.map(ins => {
          const tabKey = `insurer-${ins.id}` as AppTab;
          const path = getLocalizedPath(tabKey, language);
          const isCurrent = currentInsurerSlug === ins.id;

          return (
            <a
              key={ins.id}
              href={path}
              onClick={(e) => handleLinkClick(path, e)}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between group ${
                isCurrent
                  ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/20'
                  : 'bg-fennec-cream/20 hover:bg-fennec-cream/50 border-fennec-cream/60 hover:border-fennec-terracotta/40'
              }`}
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-white border border-fennec-cream/80 p-1 flex items-center justify-center mb-2 shadow-2xs">
                  <CompanyLogo id={ins.id} className="w-full h-full object-contain" />
                </div>
                <span className="font-display font-bold text-xs sm:text-sm text-fennec-dark block truncate">
                  {ins.name}
                </span>
              </div>
              <div className="mt-2.5 pt-2 border-t border-fennec-cream/40 flex items-center justify-between text-[10px] text-fennec-dark/60 font-semibold">
                <span>{ins.rating}</span>
                <span className="text-fennec-terracotta font-extrabold group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
            </a>
          );
        })}
      </div>

      {/* Head-to-Head Comparisons Box */}
      <div className="pt-6 border-t border-fennec-cream/60">
        <span className="text-xs font-bold text-fennec-dark/60 uppercase tracking-wider block mb-3">
          Duels comparatifs directs entre caisses :
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {POPULAR_COMPARISONS.map(comp => {
            const path = getLocalizedPath(comp.slug as AppTab, language);
            return (
              <a
                key={comp.slug}
                href={path}
                onClick={(e) => handleLinkClick(path, e)}
                className="px-3.5 py-2.5 rounded-xl bg-fennec-cream/20 hover:bg-fennec-cream/50 border border-fennec-cream/50 text-xs font-semibold text-fennec-dark transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <Scale className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{comp.nameA} vs {comp.nameB}</span>
                </div>
                <span className="text-[10px] text-fennec-terracotta font-bold group-hover:translate-x-0.5 transition-transform">Comparer →</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
