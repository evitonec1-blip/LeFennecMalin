/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Centralized Internal Linking Graph & Semantic Anchor System
 * Connects Cantons <-> Insurers <-> LAMal Topics <-> Comparisons <-> Calculators
 */

import { AppTab } from '../../types';
import { Language } from '../../i18n/translations';
import { MULTILINGUAL_ROUTES, getMultilingualRoute } from '../multilingualRoutes';

export interface InternalLinkItem {
  tab: AppTab;
  path: string;
  anchorText: string;
  relTitle?: string;
  category: 'canton' | 'insurer' | 'topic' | 'comparison' | 'tool';
}

export function getInternalLinksForTab(tab: AppTab, lang: Language = 'fr'): InternalLinkItem[] {
  const links: InternalLinkItem[] = [];

  // If on a canton page -> Link to top insurers, LAMal hub, and franchise calculator
  if (tab.startsWith('canton-')) {
    const topInsurers: AppTab[] = ['insurer-css', 'insurer-helsana', 'insurer-swica', 'insurer-assura'];
    topInsurers.forEach(insTab => {
      const route = getMultilingualRoute(insTab);
      links.push({
        tab: insTab,
        path: route.locales[lang]?.path || route.locales.fr.path,
        anchorText: lang === 'de' ? `Krankenkasse ${insTab.replace('insurer-', '').toUpperCase()}` : `Assurance ${insTab.replace('insurer-', '').toUpperCase()}`,
        category: 'insurer'
      });
    });

    const lamalRoute = getMultilingualRoute('hub-lamal');
    links.push({
      tab: 'hub-lamal',
      path: lamalRoute.locales[lang]?.path || lamalRoute.locales.fr.path,
      anchorText: lang === 'de' ? 'Offizieller LAMal/KVG Leitfaden' : 'Guide Officiel LAMal Suisse',
      category: 'topic'
    });

    const franchiseRoute = getMultilingualRoute('lamal-franchise');
    links.push({
      tab: 'lamal-franchise',
      path: franchiseRoute.locales[lang]?.path || franchiseRoute.locales.fr.path,
      anchorText: lang === 'de' ? 'Franchise 300 oder 2500 wählen' : 'Choisir sa franchise 300 ou 2500',
      category: 'tool'
    });
  }

  // If on an insurer page -> Link to major cantons, comparisons, and cancellation guide
  else if (tab.startsWith('insurer-')) {
    const majorCantons: AppTab[] = ['canton-geneve', 'canton-vaud', 'canton-valais', 'canton-zurich', 'canton-berne'];
    majorCantons.forEach(canTab => {
      const route = getMultilingualRoute(canTab);
      links.push({
        tab: canTab,
        path: route.locales[lang]?.path || route.locales.fr.path,
        anchorText: route.locales[lang]?.breadcrumbLabel || 'Canton',
        category: 'canton'
      });
    });

    const switchRoute = getMultilingualRoute('lamal-changer-caisse');
    links.push({
      tab: 'lamal-changer-caisse',
      path: switchRoute.locales[lang]?.path || switchRoute.locales.fr.path,
      anchorText: lang === 'de' ? 'Krankenkasse kündigen & wechseln' : 'Comment résilier et changer de caisse',
      category: 'topic'
    });
  }

  // If on a comparison page or topic page -> Link to relevant insurers and comparator
  else {
    const hubRoute = getMultilingualRoute('hub-insurers');
    links.push({
      tab: 'hub-insurers',
      path: hubRoute.locales[lang]?.path || hubRoute.locales.fr.path,
      anchorText: lang === 'de' ? 'Verzeichnis aller Schweizer Krankenkassen' : 'Annuaire complet des caisses maladie',
      category: 'insurer'
    });

    const compRoute = getMultilingualRoute('health-comparator');
    links.push({
      tab: 'health-comparator',
      path: compRoute.locales[lang]?.path || compRoute.locales.fr.path,
      anchorText: lang === 'de' ? 'Krankenkassenvergleich 2026 starten' : 'Calculer mes primes 2026',
      category: 'tool'
    });
  }

  return links;
}
