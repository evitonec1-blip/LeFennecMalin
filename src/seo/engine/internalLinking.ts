/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Centralized Internal Linking Graph & Semantic Anchor System (2026)
 * Connects Cantons <-> Communes <-> Insurers <-> LAMal Topics <-> Subsidies <-> Franchises <-> Comparisons <-> Calculators
 */

import { AppTab } from '../../types';
import { Language } from '../../i18n/translations';
import { getMultilingualRoute } from '../multilingualRoutes';

export interface InternalLinkItem {
  tab: AppTab;
  path: string;
  anchorText: string;
  relTitle?: string;
  category: 'canton' | 'insurer' | 'topic' | 'comparison' | 'tool' | 'subside' | 'guide';
}

export function getInternalLinksForTab(tab: AppTab, lang: Language = 'fr'): InternalLinkItem[] {
  const links: InternalLinkItem[] = [];

  const addLink = (targetTab: AppTab, fallbackAnchor: string, category: InternalLinkItem['category']) => {
    try {
      const route = getMultilingualRoute(targetTab);
      const path = route.locales[lang]?.path || route.locales.fr?.path || '/';
      const label = route.locales[lang]?.breadcrumbLabel || fallbackAnchor;
      links.push({
        tab: targetTab,
        path,
        anchorText: label,
        category
      });
    } catch {
      // safe fallback
    }
  };

  // 1. CANTON PAGES
  if (tab.startsWith('canton-')) {
    addLink('hub-lamal', lang === 'de' ? 'Offizieller LAMal Leitfaden' : 'Guide Officiel LAMal', 'topic');
    addLink('hub-subsides', lang === 'de' ? 'Prämienverbilligung beantragen' : 'Subsides d’assurance maladie', 'subside');
    addLink('lamal-franchise', lang === 'de' ? 'Franchise 300 vs 2500 berechnen' : 'Optimiser sa franchise 300 ou 2500', 'tool');
    addLink('guide-modeles-assurance', lang === 'de' ? 'Krankenkassenmodelle im Vergleich' : 'Modèles Telmed, HMO et Médecin de famille', 'guide');
    addLink('health-comparator', lang === 'de' ? 'Prämien 2026 vergleichen' : 'Calculer mes primes 2026', 'tool');
    addLink('insurer-css', 'CSS Assurance-maladie', 'insurer');
    addLink('insurer-helsana', 'Helsana Assurances', 'insurer');
    addLink('insurer-swica', 'SWICA Organisation de santé', 'insurer');
  }

  // 2. INSURER PAGES
  else if (tab.startsWith('insurer-')) {
    addLink('canton-geneve', 'Primes LAMal Genève', 'canton');
    addLink('canton-vaud', 'Primes LAMal Vaud', 'canton');
    addLink('canton-valais', 'Primes LAMal Valais', 'canton');
    addLink('canton-fribourg', 'Primes LAMal Fribourg', 'canton');
    addLink('canton-zurich', 'Krankenkassenprämien Zürich', 'canton');
    addLink('lamal-changer-caisse', lang === 'de' ? 'Kündigungsfrist & Wechsel 2026' : 'Délais de résiliation & changement de caisse', 'topic');
    addLink('health-comparator', lang === 'de' ? 'Direkter Prämienvergleich' : 'Comparateur de primes immédiat', 'tool');
  }

  // 3. SUBSIDIES PAGES
  else if (tab.startsWith('subside-') || tab === 'hub-subsides') {
    addLink('hub-subsides', lang === 'de' ? 'Rechner Prämienverbilligung' : 'Simulateur officiel de subsides', 'tool');
    addLink('canton-geneve', 'Subsides canton de Genève', 'canton');
    addLink('canton-vaud', 'Subsides canton de Vaud (OVAM)', 'canton');
    addLink('canton-valais', 'Subsides canton du Valais', 'canton');
    addLink('canton-fribourg', 'Subsides canton de Fribourg', 'canton');
    addLink('hub-lamal', lang === 'de' ? 'LAMal Gesetzliche Grundlagen' : 'Base légale LAMal & RIP', 'topic');
  }

  // 4. FRANCHISE & CALCULATORS
  else if (tab.includes('franchise') || tab.includes('calculateur')) {
    addLink('tool-calculateur-franchise', lang === 'de' ? 'Franchisen-Optimierer' : 'Calculateur de franchise mathématique', 'tool');
    addLink('health-comparator', lang === 'de' ? 'Prämienrechner Schweiz' : 'Calculateur de primes cantonal', 'tool');
    addLink('guide-modeles-assurance', lang === 'de' ? 'Telmed & HMO Rabatte' : 'Rabais de modèles Telmed & HMO', 'guide');
    addLink('lamal-changer-caisse', lang === 'de' ? 'Krankenkasse wechseln' : 'Comment changer de caisse', 'topic');
  }

  // 5. FRONTALIER / TRANSFRONTALIER
  else if (tab.includes('frontalier') || tab === 'lamal-frontalier') {
    addLink('lamal-frontalier', lang === 'de' ? 'Grenzgänger KVG vs CMU' : 'Guide LAMal Frontalier vs CMU', 'topic');
    addLink('tool-simulateur-frontalier', lang === 'de' ? 'Grenzgänger Rechner' : 'Simulateur LAMal vs CMU', 'tool');
    addLink('guide-frontalier-assurance-maladie', lang === 'de' ? 'Optionsrecht Grenzgänger' : 'Guide Droit d’option & Formulaire S1', 'guide');
    addLink('canton-geneve', 'Frontaliers Genève (SAM)', 'canton');
    addLink('canton-vaud', 'Frontaliers Vaud (OVAM)', 'canton');
    addLink('insurer-helsana', 'Helsana Progrès Frontalier', 'insurer');
  }

  // 6. SENIORS / RETRAITES
  else if (tab.includes('senior') || tab === 'lamal-seniors') {
    addLink('lamal-seniors', lang === 'de' ? 'Krankenkasse ab 65 Jahren' : 'Assurance Maladie Senior (65+ ans)', 'topic');
    addLink('lamal-franchise', lang === 'de' ? 'Franchise 300 für Rentner' : 'Pourquoi choisir la Franchise 300', 'tool');
    addLink('hub-subsides', lang === 'de' ? 'Prämienverbilligung AHV' : 'Subsides de primes pour rentiers AVS', 'subside');
    addLink('guide-modeles-assurance', lang === 'de' ? 'Hausarztmodell für Senioren' : 'Modèle Médecin de famille senior', 'guide');
    addLink('health-comparator', lang === 'de' ? 'Prämienrechner Senioren' : 'Comparateur de primes senior', 'tool');
  }

  // 7. PRIMES 2026 / ETUDES
  else if (tab.includes('primes-2026') || tab === 'lamal-primes-2026') {
    addLink('lamal-primes-2026', lang === 'de' ? 'BAG Prämienstatistik 2026' : 'Étude Statistique Primes OFSP 2026', 'topic');
    addLink('health-comparator', lang === 'de' ? 'Prämienrechner 2026' : 'Comparateur officiel 2026', 'tool');
    addLink('hub-lamal', lang === 'de' ? 'KVG Grundversicherung' : 'Assurance de base LAMal', 'topic');
    addLink('lamal-franchise', lang === 'de' ? 'Franchisen-Vergleich' : 'Franchise 300 vs 2500', 'tool');
    addLink('sources', lang === 'de' ? 'Offizielle BAG Datenquellen' : 'Sources Officielles & Données OFSP', 'topic');
  }

  // 8. DEFAULT / HUB PAGES
  else {
    addLink('hub-insurers', lang === 'de' ? 'Alle Schweizer Krankenkassen' : 'Annuaire de toutes les caisses suisses', 'insurer');
    addLink('hub-lamal', lang === 'de' ? 'Grundversicherung LAMal' : 'Assurance obligatoire LAMal', 'topic');
    addLink('lamal-primes-2026', lang === 'de' ? 'Offizielle Prämienstatistik 2026' : 'Barème & Statistiques Primes 2026', 'topic');
    addLink('hub-subsides', lang === 'de' ? 'Prämienverbilligungen' : 'Subsides cantonaux 2026', 'subside');
    addLink('health-comparator', lang === 'de' ? 'Krankenkassenvergleich 2026' : 'Comparateur de primes 2026', 'tool');
    addLink('seo-pilier', lang === 'de' ? 'Säule 3a Steuerrechner' : '3ème pilier 3a & Déduction fiscale', 'tool');
    addLink('sources', lang === 'de' ? 'Offizielle Quellen' : 'Sources Officielles (OFSP)', 'topic');
  }

  return links;
}
