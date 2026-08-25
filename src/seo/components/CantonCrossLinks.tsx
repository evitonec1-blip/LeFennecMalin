/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Reusable, High-Authority Canton Cross-Linking Grid
 * Displays all 26 Swiss Cantons grouped by linguistic and geographical regions
 * with crawlable semantic links for both health insurance and canton subsidies.
 */

import React from 'react';
import { MapPin, Coins, ArrowRight, Shield } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { AppTab } from '../../types';
import { getLocalizedPath } from '../multilingualRoutes';
import { ALL_26_CANTONS } from '../data/cantonsData';

interface Props {
  mode?: 'health' | 'subside';
  currentCantonSlug?: string;
  onNavigate?: (url: string) => void;
  title?: string;
  subtitle?: string;
  className?: string;
}

const REGION_GROUPS = [
  {
    name: 'Suisse Romande',
    badge: 'Cantons francophones & bilingues',
    cantonCodes: ['GE', 'VD', 'VS', 'FR', 'NE', 'JU']
  },
  {
    name: 'Berne & Mittelland',
    badge: 'Canton bilingue',
    cantonCodes: ['BE']
  },
  {
    name: 'Zurich & Nord-Ouest',
    badge: 'Grandes métropoles',
    cantonCodes: ['ZH', 'BS', 'BL', 'AG', 'SO']
  },
  {
    name: 'Suisse Centrale',
    badge: 'Primes attractives',
    cantonCodes: ['LU', 'ZG', 'SZ', 'UR', 'OW', 'NW']
  },
  {
    name: 'Suisse Orientale & Grisons',
    badge: 'Est de la Suisse',
    cantonCodes: ['SG', 'TG', 'SH', 'AR', 'AI', 'GL', 'GR']
  },
  {
    name: 'Tessin',
    badge: 'Suisse italienne',
    cantonCodes: ['TI']
  }
];

export default function CantonCrossLinks({
  mode = 'health',
  currentCantonSlug,
  onNavigate,
  title,
  subtitle,
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

  const defaultTitle = mode === 'subside' 
    ? 'Subsides d\'assurance maladie dans les 26 cantons suisses' 
    : 'Primes d\'assurance maladie dans les 26 cantons suisses';

  const defaultSubtitle = mode === 'subside'
    ? 'Sélectionnez votre canton de résidence pour consulter les barèmes d\'octroi, le RDU et les formulaires officiels.'
    : 'Consultez les barèmes officiels OFSP 2026, la caisse la moins chère et les démarches spécifiques à votre canton.';

  return (
    <section className={`bg-white rounded-3xl border border-fennec-cream/70 p-6 sm:p-10 my-12 shadow-xs text-left ${className}`}>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-4 border-b border-fennec-cream/60">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-fennec-terracotta flex items-center gap-1.5 mb-1.5">
            {mode === 'subside' ? <Coins className="w-3.5 h-3.5 text-amber-700" /> : <MapPin className="w-3.5 h-3.5" />}
            Maillage Territorial · Confédération Suisse
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-fennec-dark">
            {title || defaultTitle}
          </h2>
          <p className="text-xs sm:text-sm text-fennec-dark/65 max-w-3xl mt-1 leading-relaxed">
            {subtitle || defaultSubtitle}
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {REGION_GROUPS.map((group, gIdx) => {
          const cantonsInGroup = ALL_26_CANTONS.filter(c => group.cantonCodes.includes(c.code));

          return (
            <div key={gIdx} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm sm:text-base text-fennec-dark flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-fennec-terracotta" />
                  <span>{group.name}</span>
                </h3>
                <span className="text-[11px] font-semibold text-fennec-dark/50 hidden sm:inline">
                  {group.badge}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                {cantonsInGroup.map(canton => {
                  const tabKey = (mode === 'subside' ? `subside-${canton.slug}` : `canton-${canton.slug}`) as AppTab;
                  const path = getLocalizedPath(tabKey, language);
                  const isCurrent = currentCantonSlug === canton.slug;

                  return (
                    <a
                      key={canton.code}
                      href={path}
                      onClick={(e) => handleLinkClick(path, e)}
                      className={`p-3 rounded-2xl border transition-all flex flex-col justify-between group ${
                        isCurrent
                          ? 'bg-fennec-terracotta text-white border-fennec-terracotta shadow-xs font-bold'
                          : 'bg-fennec-cream/20 hover:bg-fennec-cream/50 border-fennec-cream/60 text-fennec-dark hover:border-fennec-terracotta/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-mono font-extrabold ${isCurrent ? 'text-white' : 'text-fennec-terracotta'}`}>
                          {canton.code}
                        </span>
                        <ArrowRight className={`w-3 h-3 transition-transform group-hover:translate-x-0.5 ${isCurrent ? 'text-white' : 'text-fennec-dark/30 group-hover:text-fennec-terracotta'}`} />
                      </div>
                      <span className={`text-xs font-medium truncate ${isCurrent ? 'text-white font-bold' : 'text-fennec-dark'}`}>
                        {canton.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
