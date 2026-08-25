/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Centralized High-Authority Internal Linking Architecture for LeFennecMalin.ch
 * Strictly enforces semantic canonical URL resolution, multilingual awareness,
 * topical silo hierarchy, and descriptive anchor text across all pages.
 */

import { Language } from '../i18n/translations';
import { AppTab } from '../types';
import { getLocalizedPath } from './multilingualRoutes';
import { ALL_26_CANTONS, CANTONS_SEO_DATA } from './data/cantonsData';
import { INSURERS_SEO_DATA } from './data/insurersData';

export interface InternalLinkItem {
  tab: AppTab;
  path: string;
  label: string;
  anchorText: string;
  description?: string;
  category: 'core' | 'health' | 'canton' | 'insurer' | 'guide' | 'subside' | 'demographic' | 'pension';
}

/**
 * Neighboring and affinity clusters for Swiss cantons to maintain hyper-relevant geographic linking
 */
export const CANTON_GEO_AFFINITIES: Record<string, string[]> = {
  geneve: ['vaud', 'valais', 'neuchatel', 'fribourg'],
  vaud: ['geneve', 'fribourg', 'valais', 'neuchatel', 'berne'],
  valais: ['vaud', 'fribourg', 'berne', 'geneve'],
  fribourg: ['vaud', 'berne', 'neuchatel', 'valais'],
  neuchatel: ['jura', 'vaud', 'berne', 'fribourg'],
  jura: ['neuchatel', 'berne', 'bale-campagne', 'bale-ville'],
  berne: ['fribourg', 'vaud', 'soleure', 'zurich', 'jura'],
  zurich: ['argovie', 'schwyz', 'zoug', 'saint-gall', 'thurgovie'],
  'bale-ville': ['bale-campagne', 'argovie', 'soleure', 'jura'],
  'bale-campagne': ['bale-ville', 'soleure', 'argovie', 'jura'],
  argovie: ['zurich', 'bale-campagne', 'soleure', 'lucerne'],
  soleure: ['berne', 'bale-campagne', 'argovie'],
  lucerne: ['zoug', 'schwyz', 'nidwald', 'obwald', 'argovie'],
  zoug: ['zurich', 'lucerne', 'schwyz'],
  schwyz: ['zurich', 'zoug', 'lucerne', 'uri', 'saint-gall'],
  uri: ['schwyz', 'nidwald', 'obwald', 'tessin', 'valais'],
  obwald: ['nidwald', 'lucerne', 'berne', 'uri'],
  nidwald: ['obwald', 'lucerne', 'schwyz', 'uri'],
  'saint-gall': ['zurich', 'thurgovie', 'grisons', 'schwyz', 'glaris'],
  thurgovie: ['saint-gall', 'zurich', 'schaffhouse'],
  schaffhouse: ['zurich', 'thurgovie'],
  'appenzell-rhodes-exterieures': ['saint-gall', 'appenzell-rhodes-interieures'],
  'appenzell-rhodes-interieures': ['saint-gall', 'appenzell-rhodes-exterieures'],
  glaris: ['saint-gall', 'schwyz', 'grisons', 'uri'],
  grisons: ['saint-gall', 'glaris', 'uri', 'tessin'],
  tessin: ['grisons', 'uri', 'valais'],
};

/**
 * Top Swiss health insurers and their primary rivalries for head-to-head comparisons
 */
export const INSURER_COMPARISON_LINKS = [
  { tab: 'compare-css-helsana' as AppTab, nameA: 'CSS', nameB: 'Helsana', anchor: 'comparer CSS et Helsana' },
  { tab: 'compare-helsana-swica' as AppTab, nameA: 'Helsana', nameB: 'SWICA', anchor: 'comparer Helsana et SWICA' },
  { tab: 'compare-css-swica' as AppTab, nameA: 'CSS', nameB: 'SWICA', anchor: 'comparer CSS et SWICA' },
  { tab: 'compare-assura-mutuel' as AppTab, nameA: 'Assura', nameB: 'Groupe Mutuel', anchor: 'comparer Assura et Groupe Mutuel' },
  { tab: 'compare-swica-sanitas' as AppTab, nameA: 'SWICA', nameB: 'Sanitas', anchor: 'comparer SWICA et Sanitas' },
  { tab: 'compare-visana-concordia' as AppTab, nameA: 'Visana', nameB: 'Concordia', anchor: 'comparer Visana et Concordia' },
];

/**
 * Pillar guides & strategic landing pages
 */
export const PILLAR_GUIDES_CONFIG: { tab: AppTab; anchor: string; title: string; category: 'health' | 'guide' }[] = [
  {
    tab: 'lamal-franchise',
    anchor: 'choisir sa franchise d\'assurance maladie',
    title: 'Guide Franchise 300 vs 2500 CHF',
    category: 'guide',
  },
  {
    tab: 'lamal-modeles',
    anchor: 'comparer les modèles Telmed, HMO et Médecin de famille',
    title: 'Modèles alternatifs de soins',
    category: 'guide',
  },
  {
    tab: 'subside',
    anchor: 'demander un subside d\'assurance maladie',
    title: 'Subsides et réductions de primes en Suisse',
    category: 'health',
  },
  {
    tab: 'lamal-changer-caisse',
    anchor: 'résilier et changer de caisse maladie avant le 30 novembre',
    title: 'Changer de caisse maladie',
    category: 'guide',
  },
  {
    tab: 'caisse-moins-chere',
    anchor: 'trouver la caisse maladie la moins chère dans votre canton',
    title: 'Caisse maladie la moins chère 2026',
    category: 'guide',
  },
  {
    tab: 'meilleure-caisse-maladie',
    anchor: 'consulter le classement des meilleures caisses maladie',
    title: 'Meilleures caisses maladie de Suisse',
    category: 'guide',
  },
  {
    tab: 'lamal-assurance-accident',
    anchor: 'exclure la couverture accident de votre LAMal',
    title: 'Couverture accident LAA vs LAMal',
    category: 'guide',
  },
  {
    tab: 'lamal-vs-lca',
    anchor: 'distinguer assurance de base LAMal et complémentaires LCA',
    title: 'LAMal vs Assurances Complémentaires LCA',
    category: 'guide',
  },
  {
    tab: 'guide-famille',
    anchor: 'assurer sa famille et ses enfants au meilleur prix',
    title: 'Assurance maladie pour les familles',
    category: 'guide',
  },
  {
    tab: 'guide-jeunes-adultes',
    anchor: 'bénéficier des rabais jeunes adultes 19-25 ans',
    title: 'Assurance maladie jeunes adultes',
    category: 'guide',
  },
  {
    tab: 'guide-etudiants',
    anchor: 'optimiser l\'assurance maladie étudiant en Suisse',
    title: 'Assurance maladie pour étudiants',
    category: 'guide',
  },
  {
    tab: 'guide-nouveaux-arrivants',
    anchor: 's\'assurer en Suisse dans le délai légal de 3 mois',
    title: 'Guide pour les nouveaux arrivants en Suisse',
    category: 'guide',
  },
];

/**
 * Get localized semantic internal links for a canton page
 */
export function getCantonInternalLinks(cantonSlug: string, lang: Language = 'fr'): {
  subsidyLink: InternalLinkItem;
  healthLink: InternalLinkItem;
  neighborLinks: InternalLinkItem[];
  pillarLinks: InternalLinkItem[];
  topInsurerLinks: InternalLinkItem[];
} {
  const canton = CANTONS_SEO_DATA[cantonSlug] || CANTONS_SEO_DATA['geneve'];
  const subsideTab = `subside-${cantonSlug}` as AppTab;
  const healthTab = `canton-${cantonSlug}` as AppTab;

  const subsidyLink: InternalLinkItem = {
    tab: subsideTab,
    path: getLocalizedPath(subsideTab, lang),
    label: `Subside ${canton.name}`,
    anchorText: `subsides d'assurance maladie à ${canton.name}`,
    description: `Consultez les barèmes RDU et formulaires d'octroi pour le canton de ${canton.name}.`,
    category: 'subside',
  };

  const healthLink: InternalLinkItem = {
    tab: healthTab,
    path: getLocalizedPath(healthTab, lang),
    label: `Assurance Maladie ${canton.name}`,
    anchorText: `assurance maladie dans le canton de ${canton.name}`,
    description: `Barèmes officiels OFSP 2026 pour le canton de ${canton.name}.`,
    category: 'canton',
  };

  const neighborSlugs = CANTON_GEO_AFFINITIES[cantonSlug] || ['vaud', 'geneve', 'fribourg', 'valais'];
  const neighborLinks: InternalLinkItem[] = neighborSlugs.map(nSlug => {
    const cData = ALL_26_CANTONS.find(c => c.slug === nSlug) || { name: nSlug, code: nSlug.toUpperCase(), slug: nSlug };
    const tab = `canton-${nSlug}` as AppTab;
    return {
      tab,
      path: getLocalizedPath(tab, lang),
      label: `${cData.name} (${cData.code})`,
      anchorText: `assurance maladie à ${cData.name}`,
      category: 'canton',
    };
  });

  const pillarLinks: InternalLinkItem[] = PILLAR_GUIDES_CONFIG.slice(0, 5).map(g => ({
    tab: g.tab,
    path: getLocalizedPath(g.tab, lang),
    label: g.title,
    anchorText: g.anchor,
    category: 'guide',
  }));

  const topInsurerSlugs = ['css', 'helsana', 'swica', 'assura', 'groupemutuel', 'sanitas'];
  const topInsurerLinks: InternalLinkItem[] = topInsurerSlugs.map(iSlug => {
    const ins = INSURERS_SEO_DATA[iSlug] || { name: iSlug.toUpperCase(), slug: iSlug };
    const tab = `insurer-${iSlug}` as AppTab;
    return {
      tab,
      path: getLocalizedPath(tab, lang),
      label: ins.name,
      anchorText: `caisse maladie ${ins.name}`,
      category: 'insurer',
    };
  });

  return {
    subsidyLink,
    healthLink,
    neighborLinks,
    pillarLinks,
    topInsurerLinks,
  };
}

/**
 * Get localized semantic internal links for an insurer profile page
 */
export function getInsurerInternalLinks(insurerSlug: string, lang: Language = 'fr'): {
  directoryLink: InternalLinkItem;
  comparisonLinks: InternalLinkItem[];
  relatedInsurers: InternalLinkItem[];
  pillarLinks: InternalLinkItem[];
  priorityCantons: InternalLinkItem[];
} {
  const directoryLink: InternalLinkItem = {
    tab: 'hub-assureurs',
    path: getLocalizedPath('hub-assureurs', lang),
    label: 'Toutes les caisses maladie suisses',
    anchorText: 'comparer l\'ensemble des 37 caisses maladie agréées OFSP',
    category: 'insurer',
  };

  const comparisonLinks: InternalLinkItem[] = INSURER_COMPARISON_LINKS
    .filter(comp => comp.anchor.toLowerCase().includes(insurerSlug) || comp.tab.includes(insurerSlug))
    .slice(0, 3)
    .map(comp => ({
      tab: comp.tab,
      path: getLocalizedPath(comp.tab, lang),
      label: `${comp.nameA} vs ${comp.nameB}`,
      anchorText: comp.anchor,
      category: 'insurer',
    }));

  const allInsurerKeys = Object.keys(INSURERS_SEO_DATA).filter(k => k !== insurerSlug);
  const relatedInsurers: InternalLinkItem[] = allInsurerKeys.slice(0, 6).map(k => {
    const ins = INSURERS_SEO_DATA[k];
    const tab = `insurer-${k}` as AppTab;
    return {
      tab,
      path: getLocalizedPath(tab, lang),
      label: ins.name,
      anchorText: `caisse maladie ${ins.name}`,
      category: 'insurer',
    };
  });

  const pillarLinks: InternalLinkItem[] = [
    {
      tab: 'lamal-franchise',
      path: getLocalizedPath('lamal-franchise', lang),
      label: 'Calculateur de Franchise',
      anchorText: 'calculer votre franchise optimale',
      category: 'guide',
    },
    {
      tab: 'lamal-changer-caisse',
      path: getLocalizedPath('lamal-changer-caisse', lang),
      label: 'Lettre de résiliation',
      anchorText: 'modèle de résiliation gratuit',
      category: 'guide',
    },
    {
      tab: 'subside',
      path: getLocalizedPath('subside', lang),
      label: 'Subsides cantonaux',
      anchorText: 'vérifier votre éligibilité aux subsides',
      category: 'subside',
    },
    {
      tab: 'lamal-modeles',
      path: getLocalizedPath('lamal-modeles', lang),
      label: 'Modèles de soins',
      anchorText: 'comparer les modèles Telmed et Réseau de soins',
      category: 'guide',
    }
  ];

  const priorityCantons: InternalLinkItem[] = [
    { tab: 'canton-geneve', path: getLocalizedPath('canton-geneve', lang), label: 'Genève (GE)', anchorText: 'primes LAMal à Genève', category: 'canton' },
    { tab: 'canton-vaud', path: getLocalizedPath('canton-vaud', lang), label: 'Vaud (VD)', anchorText: 'primes LAMal dans le canton de Vaud', category: 'canton' },
    { tab: 'canton-valais', path: getLocalizedPath('canton-valais', lang), label: 'Valais (VS)', anchorText: 'primes LAMal en Valais', category: 'canton' },
    { tab: 'canton-fribourg', path: getLocalizedPath('canton-fribourg', lang), label: 'Fribourg (FR)', anchorText: 'primes LAMal à Fribourg', category: 'canton' },
    { tab: 'canton-neuchatel', path: getLocalizedPath('canton-neuchatel', lang), label: 'Neuchâtel (NE)', anchorText: 'primes LAMal à Neuchâtel', category: 'canton' },
    { tab: 'canton-zurich', path: getLocalizedPath('canton-zurich', lang), label: 'Zurich (ZH)', anchorText: 'primes LAMal à Zurich', category: 'canton' },
  ];

  return {
    directoryLink,
    comparisonLinks,
    relatedInsurers,
    pillarLinks,
    priorityCantons,
  };
}
