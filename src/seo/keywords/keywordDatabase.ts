/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * LE FENNEC MALIN — CENTRAL SEO KEYWORD DATABASE 2026
 * Semantic topic cluster architecture, search intent taxonomy, URL mapping,
 * priority scoring (P0-P3), and content graph for Swiss Health Insurance & LAMal.
 */

import { AppTab } from '../../types';

export type SearchIntent =
  | 'informational'
  | 'commercial'
  | 'transactional'
  | 'navigational'
  | 'local'
  | 'brand'
  | 'comparison'
  | 'price';

export type TopicClusterId =
  | 'assurance-maladie'
  | 'lamal'
  | 'canton'
  | 'insurer'
  | 'franchise'
  | 'modeles'
  | 'cheapest'
  | 'best'
  | 'switching'
  | 'family'
  | 'young-adult'
  | 'student'
  | 'new-resident'
  | 'lamal-vs-lca'
  | 'accident'
  | 'comparison'
  | 'longtail'
  | 'pension'
  | 'tools';

export interface SEOKeywordItem {
  id: string;
  keyword: string;
  searchIntent: SearchIntent;
  cluster: TopicClusterId;
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  targetUrl: string;
  targetTab: AppTab;
  primaryOrSecondary: 'primary' | 'secondary' | 'longtail';
  canton?: string;
  insurer?: string;
  contentType: 'hub' | 'landing' | 'guide' | 'comparator' | 'profile' | 'comparison' | 'calculator';
  language: 'fr' | 'de' | 'it' | 'en';
  estimatedVolume: 'Very High (>20k/mo)' | 'High (5k-20k/mo)' | 'Medium (1k-5k/mo)' | 'Low (<1k/mo)' | 'Longtail (<500/mo)';
  competitionLevel: 'High' | 'Medium' | 'Low';
  status: 'active' | 'optimized' | 'planned';
  suggestedH2?: string;
}

export const CENTRAL_KEYWORD_DATABASE: SEOKeywordItem[] = [
  // ==========================================
  // CLUSTER A: ASSURANCE MALADIE (CORE P0)
  // ==========================================
  {
    id: 'kw-am-suisse',
    keyword: 'assurance maladie suisse',
    searchIntent: 'commercial',
    cluster: 'assurance-maladie',
    priority: 'P0',
    targetUrl: '/fr/assurance-maladie/',
    targetTab: 'seo-maladie',
    primaryOrSecondary: 'primary',
    contentType: 'landing',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Comprendre le fonctionnement de l’assurance maladie en Suisse'
  },
  {
    id: 'kw-am-suisse-2026',
    keyword: 'assurance maladie suisse 2026',
    searchIntent: 'commercial',
    cluster: 'assurance-maladie',
    priority: 'P0',
    targetUrl: '/fr/assurance-maladie/',
    targetTab: 'seo-maladie',
    primaryOrSecondary: 'secondary',
    contentType: 'landing',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Évolution des primes et nouveautés LAMal en 2026'
  },
  {
    id: 'kw-am-obligatoire',
    keyword: 'assurance maladie obligatoire suisse',
    searchIntent: 'informational',
    cluster: 'assurance-maladie',
    priority: 'P0',
    targetUrl: '/fr/assurance-maladie/',
    targetTab: 'seo-maladie',
    primaryOrSecondary: 'secondary',
    contentType: 'landing',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },
  {
    id: 'kw-am-prix',
    keyword: 'assurance maladie prix suisse',
    searchIntent: 'price',
    cluster: 'assurance-maladie',
    priority: 'P0',
    targetUrl: '/fr/assurance-maladie/',
    targetTab: 'seo-maladie',
    primaryOrSecondary: 'secondary',
    contentType: 'landing',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-am-comparatif',
    keyword: 'assurance maladie comparatif',
    searchIntent: 'transactional',
    cluster: 'assurance-maladie',
    priority: 'P0',
    targetUrl: '/fr/comparateur-assurance-suisse/',
    targetTab: 'seo-comparateur',
    primaryOrSecondary: 'primary',
    contentType: 'comparator',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-am-comparateur',
    keyword: 'comparateur assurance maladie',
    searchIntent: 'transactional',
    cluster: 'assurance-maladie',
    priority: 'P0',
    targetUrl: '/fr/comparateur-assurance-suisse/',
    targetTab: 'health-comparator',
    primaryOrSecondary: 'primary',
    contentType: 'comparator',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },

  // ==========================================
  // CLUSTER B: LAMAL (CORE P0)
  // ==========================================
  {
    id: 'kw-lamal-suisse',
    keyword: 'LAMal Suisse',
    searchIntent: 'commercial',
    cluster: 'lamal',
    priority: 'P0',
    targetUrl: '/fr/lamal/',
    targetTab: 'hub-lamal',
    primaryOrSecondary: 'primary',
    contentType: 'hub',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'La loi sur l’assurance-maladie (LAMal) expliquée de A à Z'
  },
  {
    id: 'kw-lamal-assurance',
    keyword: 'assurance LAMal',
    searchIntent: 'commercial',
    cluster: 'lamal',
    priority: 'P0',
    targetUrl: '/fr/lamal/',
    targetTab: 'hub-lamal',
    primaryOrSecondary: 'secondary',
    contentType: 'hub',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-lamal-2026',
    keyword: 'LAMal 2026',
    searchIntent: 'commercial',
    cluster: 'lamal',
    priority: 'P0',
    targetUrl: '/fr/lamal/',
    targetTab: 'hub-lamal',
    primaryOrSecondary: 'secondary',
    contentType: 'hub',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },
  {
    id: 'kw-prime-lamal',
    keyword: 'prime LAMal 2026',
    searchIntent: 'price',
    cluster: 'lamal',
    priority: 'P0',
    targetUrl: '/fr/lamal/',
    targetTab: 'hub-lamal',
    primaryOrSecondary: 'secondary',
    contentType: 'hub',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-cout-lamal',
    keyword: 'coût LAMal par mois',
    searchIntent: 'price',
    cluster: 'lamal',
    priority: 'P1',
    targetUrl: '/fr/lamal/',
    targetTab: 'hub-lamal',
    primaryOrSecondary: 'longtail',
    contentType: 'hub',
    language: 'fr',
    estimatedVolume: 'Medium (1k-5k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },

  // ==========================================
  // CLUSTER C: CANTONS (26 CANTONS - P0 & P1)
  // ==========================================
  {
    id: 'kw-canton-ge',
    keyword: 'assurance maladie Genève',
    searchIntent: 'local',
    cluster: 'canton',
    priority: 'P0',
    targetUrl: '/fr/assurance-maladie/geneve/',
    targetTab: 'canton-geneve',
    primaryOrSecondary: 'primary',
    canton: 'GE',
    contentType: 'landing',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Primes LAMal et caisses maladie les moins chères à Genève'
  },
  {
    id: 'kw-canton-ge-primes',
    keyword: 'prime assurance maladie Genève 2026',
    searchIntent: 'price',
    cluster: 'canton',
    priority: 'P0',
    targetUrl: '/fr/assurance-maladie/geneve/',
    targetTab: 'canton-geneve',
    primaryOrSecondary: 'secondary',
    canton: 'GE',
    contentType: 'landing',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-canton-vd',
    keyword: 'assurance maladie Vaud',
    searchIntent: 'local',
    cluster: 'canton',
    priority: 'P0',
    targetUrl: '/fr/assurance-maladie/vaud/',
    targetTab: 'canton-vaud',
    primaryOrSecondary: 'primary',
    canton: 'VD',
    contentType: 'landing',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Comparatif officiel des primes d’assurance maladie dans le canton de Vaud'
  },
  {
    id: 'kw-canton-vs',
    keyword: 'assurance maladie Valais',
    searchIntent: 'local',
    cluster: 'canton',
    priority: 'P0',
    targetUrl: '/fr/assurance-maladie/valais/',
    targetTab: 'canton-valais',
    primaryOrSecondary: 'primary',
    canton: 'VS',
    contentType: 'landing',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-canton-fr',
    keyword: 'assurance maladie Fribourg',
    searchIntent: 'local',
    cluster: 'canton',
    priority: 'P0',
    targetUrl: '/fr/assurance-maladie/fribourg/',
    targetTab: 'canton-fribourg',
    primaryOrSecondary: 'primary',
    canton: 'FR',
    contentType: 'landing',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-canton-ne',
    keyword: 'assurance maladie Neuchâtel',
    searchIntent: 'local',
    cluster: 'canton',
    priority: 'P0',
    targetUrl: '/fr/assurance-maladie/neuchatel/',
    targetTab: 'canton-neuchatel',
    primaryOrSecondary: 'primary',
    canton: 'NE',
    contentType: 'landing',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },
  {
    id: 'kw-canton-ju',
    keyword: 'assurance maladie Jura',
    searchIntent: 'local',
    cluster: 'canton',
    priority: 'P0',
    targetUrl: '/fr/assurance-maladie/jura/',
    targetTab: 'canton-jura',
    primaryOrSecondary: 'primary',
    canton: 'JU',
    contentType: 'landing',
    language: 'fr',
    estimatedVolume: 'Medium (1k-5k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },
  {
    id: 'kw-canton-be',
    keyword: 'assurance maladie Berne',
    searchIntent: 'local',
    cluster: 'canton',
    priority: 'P0',
    targetUrl: '/fr/assurance-maladie/berne/',
    targetTab: 'canton-berne',
    primaryOrSecondary: 'primary',
    canton: 'BE',
    contentType: 'landing',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-canton-zh',
    keyword: 'krankenkasse zürich',
    searchIntent: 'local',
    cluster: 'canton',
    priority: 'P0',
    targetUrl: '/de/krankenkassen/zurich/',
    targetTab: 'canton-zurich',
    primaryOrSecondary: 'primary',
    canton: 'ZH',
    contentType: 'landing',
    language: 'de',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },

  // ==========================================
  // CLUSTER D: INSURERS (14 INSURERS - P0 & P1)
  // ==========================================
  {
    id: 'kw-ins-helsana',
    keyword: 'Helsana assurance maladie',
    searchIntent: 'brand',
    cluster: 'insurer',
    priority: 'P0',
    targetUrl: '/fr/caisses-maladie/helsana/',
    targetTab: 'insurer-helsana',
    primaryOrSecondary: 'primary',
    insurer: 'Helsana',
    contentType: 'profile',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Modèles LAMal, primes 2026 et avis sur Helsana'
  },
  {
    id: 'kw-ins-css',
    keyword: 'CSS assurance maladie',
    searchIntent: 'brand',
    cluster: 'insurer',
    priority: 'P0',
    targetUrl: '/fr/caisses-maladie/css/',
    targetTab: 'insurer-css',
    primaryOrSecondary: 'primary',
    insurer: 'CSS',
    contentType: 'profile',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'CSS Assurance : tarifs 2026, modèles alternatifs et satisfaction'
  },
  {
    id: 'kw-ins-swica',
    keyword: 'Swica assurance maladie',
    searchIntent: 'brand',
    cluster: 'insurer',
    priority: 'P0',
    targetUrl: '/fr/caisses-maladie/swica/',
    targetTab: 'insurer-swica',
    primaryOrSecondary: 'primary',
    insurer: 'SWICA',
    contentType: 'profile',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-ins-sanitas',
    keyword: 'Sanitas assurance maladie',
    searchIntent: 'brand',
    cluster: 'insurer',
    priority: 'P0',
    targetUrl: '/fr/caisses-maladie/sanitas/',
    targetTab: 'insurer-sanitas',
    primaryOrSecondary: 'primary',
    insurer: 'Sanitas',
    contentType: 'profile',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-ins-assura',
    keyword: 'Assura assurance maladie',
    searchIntent: 'brand',
    cluster: 'insurer',
    priority: 'P0',
    targetUrl: '/fr/caisses-maladie/assura/',
    targetTab: 'insurer-assura',
    primaryOrSecondary: 'primary',
    insurer: 'Assura',
    contentType: 'profile',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-ins-mutuel',
    keyword: 'Groupe Mutuel assurance maladie',
    searchIntent: 'brand',
    cluster: 'insurer',
    priority: 'P0',
    targetUrl: '/fr/caisses-maladie/groupe-mutuel/',
    targetTab: 'insurer-groupe-mutuel',
    primaryOrSecondary: 'primary',
    insurer: 'Groupe Mutuel',
    contentType: 'profile',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-ins-concordia',
    keyword: 'Concordia assurance maladie',
    searchIntent: 'brand',
    cluster: 'insurer',
    priority: 'P0',
    targetUrl: '/fr/caisses-maladie/concordia/',
    targetTab: 'insurer-concordia',
    primaryOrSecondary: 'primary',
    insurer: 'Concordia',
    contentType: 'profile',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-ins-visana',
    keyword: 'Visana assurance maladie',
    searchIntent: 'brand',
    cluster: 'insurer',
    priority: 'P0',
    targetUrl: '/fr/caisses-maladie/visana/',
    targetTab: 'insurer-visana',
    primaryOrSecondary: 'primary',
    insurer: 'Visana',
    contentType: 'profile',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-ins-kpt',
    keyword: 'KPT CPT assurance maladie',
    searchIntent: 'brand',
    cluster: 'insurer',
    priority: 'P0',
    targetUrl: '/fr/caisses-maladie/kpt/',
    targetTab: 'insurer-kpt',
    primaryOrSecondary: 'primary',
    insurer: 'KPT / CPT',
    contentType: 'profile',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },

  // ==========================================
  // CLUSTER E: FRANCHISE LAMAL (P0 & P1)
  // ==========================================
  {
    id: 'kw-franchise-hub',
    keyword: 'franchise assurance maladie',
    searchIntent: 'informational',
    cluster: 'franchise',
    priority: 'P0',
    targetUrl: '/fr/lamal/franchise/',
    targetTab: 'lamal-franchise',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'Medium',
    status: 'active',
    suggestedH2: 'Quelle franchise LAMal choisir en Suisse en 2026 ?'
  },
  {
    id: 'kw-franchise-300-2500',
    keyword: 'franchise 300 ou 2500',
    searchIntent: 'commercial',
    cluster: 'franchise',
    priority: 'P0',
    targetUrl: '/fr/lamal/franchise/',
    targetTab: 'lamal-franchise',
    primaryOrSecondary: 'secondary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },
  {
    id: 'kw-franchise-choix',
    keyword: 'quelle franchise choisir',
    searchIntent: 'informational',
    cluster: 'franchise',
    priority: 'P0',
    targetUrl: '/fr/lamal/franchise/',
    targetTab: 'lamal-franchise',
    primaryOrSecondary: 'secondary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },

  // ==========================================
  // CLUSTER F: INSURANCE MODELS (P0 & P1)
  // ==========================================
  {
    id: 'kw-models-hub',
    keyword: 'modèle assurance maladie',
    searchIntent: 'informational',
    cluster: 'modeles',
    priority: 'P0',
    targetUrl: '/fr/lamal/modeles/',
    targetTab: 'lamal-modeles',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'Medium',
    status: 'active',
    suggestedH2: 'Standard, Telmed, HMO ou Médecin de famille : Le comparatif complet'
  },
  {
    id: 'kw-models-telmed',
    keyword: 'modèle télémédecine assurance maladie',
    searchIntent: 'commercial',
    cluster: 'modeles',
    priority: 'P0',
    targetUrl: '/fr/lamal/modeles/',
    targetTab: 'lamal-modeles',
    primaryOrSecondary: 'secondary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'Medium (1k-5k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },
  {
    id: 'kw-models-standard-telmed',
    keyword: 'modèle standard vs télémédecine',
    searchIntent: 'comparison',
    cluster: 'modeles',
    priority: 'P1',
    targetUrl: '/fr/lamal/modeles/',
    targetTab: 'lamal-modeles',
    primaryOrSecondary: 'secondary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'Medium (1k-5k/mo)',
    competitionLevel: 'Low',
    status: 'active'
  },

  // ==========================================
  // CLUSTER G: CHEAPEST INSURANCE (P0)
  // ==========================================
  {
    id: 'kw-cheapest-am',
    keyword: 'caisse maladie la moins chère',
    searchIntent: 'price',
    cluster: 'cheapest',
    priority: 'P0',
    targetUrl: '/fr/lamal/caisse-maladie-la-moins-chere/',
    targetTab: 'lamal-moins-chere',
    primaryOrSecondary: 'primary',
    contentType: 'landing',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Pourquoi aucune caisse maladie n’est universellement la moins chère'
  },
  {
    id: 'kw-cheapest-am-suisse',
    keyword: 'assurance maladie moins chère suisse',
    searchIntent: 'price',
    cluster: 'cheapest',
    priority: 'P0',
    targetUrl: '/fr/lamal/caisse-maladie-la-moins-chere/',
    targetTab: 'lamal-moins-chere',
    primaryOrSecondary: 'secondary',
    contentType: 'landing',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },

  // ==========================================
  // CLUSTER H: BEST INSURANCE (P0)
  // ==========================================
  {
    id: 'kw-best-am',
    keyword: 'meilleure caisse maladie suisse',
    searchIntent: 'commercial',
    cluster: 'best',
    priority: 'P0',
    targetUrl: '/fr/meilleure-caisse-maladie/',
    targetTab: 'meilleure-caisse-maladie',
    primaryOrSecondary: 'primary',
    contentType: 'landing',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Classement 2026 : Satisfaction client, solvabilité OFSP et remboursement'
  },
  {
    id: 'kw-best-choisir',
    keyword: 'quelle caisse maladie choisir',
    searchIntent: 'commercial',
    cluster: 'best',
    priority: 'P0',
    targetUrl: '/fr/meilleure-caisse-maladie/',
    targetTab: 'meilleure-caisse-maladie',
    primaryOrSecondary: 'secondary',
    contentType: 'landing',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },

  // ==========================================
  // CLUSTER I: SWITCHING & CANCELLATION (P0)
  // ==========================================
  {
    id: 'kw-switch-hub',
    keyword: 'changer de caisse maladie',
    searchIntent: 'commercial',
    cluster: 'switching',
    priority: 'P0',
    targetUrl: '/fr/lamal/changer-caisse-maladie/',
    targetTab: 'lamal-changer-caisse',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Délai légal du 30 novembre, modèle de lettre type et étapes officielles'
  },
  {
    id: 'kw-switch-resiliation',
    keyword: 'résiliation assurance maladie suisse',
    searchIntent: 'transactional',
    cluster: 'switching',
    priority: 'P0',
    targetUrl: '/fr/lamal/changer-caisse-maladie/',
    targetTab: 'lamal-changer-caisse',
    primaryOrSecondary: 'secondary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },

  // ==========================================
  // CLUSTER J: DEMOGRAPHICS (FAMILY, YOUNG, STUDENT, NEW RESIDENT)
  // ==========================================
  {
    id: 'kw-family-am',
    keyword: 'assurance maladie famille',
    searchIntent: 'commercial',
    cluster: 'family',
    priority: 'P0',
    targetUrl: '/fr/assurance-maladie/famille/',
    targetTab: 'assurance-famille',
    primaryOrSecondary: 'primary',
    contentType: 'landing',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'Medium',
    status: 'active',
    suggestedH2: 'Rabais pour enfants, franchise 0 CHF et optimisation du budget familial'
  },
  {
    id: 'kw-young-am',
    keyword: 'assurance maladie jeune adulte',
    searchIntent: 'commercial',
    cluster: 'young-adult',
    priority: 'P1',
    targetUrl: '/fr/assurance-maladie/jeune-adulte/',
    targetTab: 'assurance-jeune-adulte',
    primaryOrSecondary: 'primary',
    contentType: 'landing',
    language: 'fr',
    estimatedVolume: 'Medium (1k-5k/mo)',
    competitionLevel: 'Medium',
    status: 'active',
    suggestedH2: 'Tarifs 19-25 ans : Comment économiser jusqu’à 40% sur la prime adulte'
  },
  {
    id: 'kw-student-am',
    keyword: 'assurance maladie étudiant suisse',
    searchIntent: 'commercial',
    cluster: 'student',
    priority: 'P1',
    targetUrl: '/fr/assurance-maladie/etudiant/',
    targetTab: 'assurance-etudiant',
    primaryOrSecondary: 'primary',
    contentType: 'landing',
    language: 'fr',
    estimatedVolume: 'Medium (1k-5k/mo)',
    competitionLevel: 'Medium',
    status: 'active',
    suggestedH2: 'Étudiants suisses et internationaux : Exonérations et formules économiques'
  },
  {
    id: 'kw-resident-am',
    keyword: 'assurance maladie nouveau résident suisse',
    searchIntent: 'commercial',
    cluster: 'new-resident',
    priority: 'P0',
    targetUrl: '/fr/lamal/nouveau-resident-suisse/',
    targetTab: 'lamal-nouveau-resident',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'Medium',
    status: 'active',
    suggestedH2: 'Délai d’affiliation de 3 mois, permis B/C et démarches obligatoires'
  },

  // ==========================================
  // CLUSTER K: LAMAL VS LCA (P0)
  // ==========================================
  {
    id: 'kw-lamal-vs-lca',
    keyword: 'LAMal vs LCA',
    searchIntent: 'comparison',
    cluster: 'lamal-vs-lca',
    priority: 'P0',
    targetUrl: '/fr/lamal-vs-lca/',
    targetTab: 'lamal-vs-lca',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'Medium',
    status: 'active',
    suggestedH2: 'Assurance obligatoire vs complémentaire : Prestations, questionnaires et résiliation'
  },

  // ==========================================
  // CLUSTER L: ACCIDENT COVERAGE (P1)
  // ==========================================
  {
    id: 'kw-accident-am',
    keyword: 'assurance accident LAMal',
    searchIntent: 'informational',
    cluster: 'accident',
    priority: 'P1',
    targetUrl: '/fr/lamal/assurance-accident/',
    targetTab: 'lamal-assurance-accident',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'Medium (1k-5k/mo)',
    competitionLevel: 'Low',
    status: 'active',
    suggestedH2: 'Couverture accident avec ou sans LAMal : La règle des 8 heures par semaine'
  },

  // ==========================================
  // CLUSTER M: HEAD-TO-HEAD COMPARISONS (P1)
  // ==========================================
  {
    id: 'kw-cmp-helsana-css',
    keyword: 'Helsana vs CSS',
    searchIntent: 'comparison',
    cluster: 'comparison',
    priority: 'P1',
    targetUrl: '/fr/comparatifs/helsana-vs-css/',
    targetTab: 'compare-css-helsana',
    primaryOrSecondary: 'primary',
    contentType: 'comparison',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'Medium',
    status: 'active',
    suggestedH2: 'Helsana ou CSS : Comparatif des prix, réseaux de soins et satisfaction'
  },
  {
    id: 'kw-cmp-helsana-swica',
    keyword: 'Helsana vs Swica',
    searchIntent: 'comparison',
    cluster: 'comparison',
    priority: 'P1',
    targetUrl: '/fr/comparatifs/helsana-vs-swica/',
    targetTab: 'compare-helsana-swica',
    primaryOrSecondary: 'primary',
    contentType: 'comparison',
    language: 'fr',
    estimatedVolume: 'Medium (1k-5k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },
  {
    id: 'kw-cmp-css-swica',
    keyword: 'CSS vs Swica',
    searchIntent: 'comparison',
    cluster: 'comparison',
    priority: 'P1',
    targetUrl: '/fr/comparatifs/css-vs-swica/',
    targetTab: 'compare-css-swica',
    primaryOrSecondary: 'primary',
    contentType: 'comparison',
    language: 'fr',
    estimatedVolume: 'Medium (1k-5k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },
  {
    id: 'kw-cmp-assura-mutuel',
    keyword: 'Assura vs Groupe Mutuel',
    searchIntent: 'comparison',
    cluster: 'comparison',
    priority: 'P1',
    targetUrl: '/fr/comparatifs/assura-vs-groupe-mutuel/',
    targetTab: 'compare-assura-mutuel',
    primaryOrSecondary: 'primary',
    contentType: 'comparison',
    language: 'fr',
    estimatedVolume: 'Medium (1k-5k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },
  {
    id: 'kw-cmp-swica-sanitas',
    keyword: 'Swica vs Sanitas',
    searchIntent: 'comparison',
    cluster: 'comparison',
    priority: 'P1',
    targetUrl: '/fr/comparatifs/swica-vs-sanitas/',
    targetTab: 'compare-swica-sanitas',
    primaryOrSecondary: 'primary',
    contentType: 'comparison',
    language: 'fr',
    estimatedVolume: 'Medium (1k-5k/mo)',
    competitionLevel: 'Low',
    status: 'active'
  },
  {
    id: 'kw-cmp-visana-concordia',
    keyword: 'Visana vs Concordia',
    searchIntent: 'comparison',
    cluster: 'comparison',
    priority: 'P1',
    targetUrl: '/fr/comparatifs/visana-vs-concordia/',
    targetTab: 'compare-visana-concordia',
    primaryOrSecondary: 'primary',
    contentType: 'comparison',
    language: 'fr',
    estimatedVolume: 'Medium (1k-5k/mo)',
    competitionLevel: 'Low',
    status: 'active'
  }
];

// Helper search & grouping utilities
export function getKeywordsByCluster(cluster: TopicClusterId): SEOKeywordItem[] {
  return CENTRAL_KEYWORD_DATABASE.filter(k => k.cluster === cluster);
}

export function getKeywordsByPriority(priority: 'P0' | 'P1' | 'P2' | 'P3'): SEOKeywordItem[] {
  return CENTRAL_KEYWORD_DATABASE.filter(k => k.priority === priority);
}

export function getKeywordsByTab(tab: AppTab): SEOKeywordItem[] {
  return CENTRAL_KEYWORD_DATABASE.filter(k => k.targetTab === tab);
}

export function getAllPrimaryKeywords(): SEOKeywordItem[] {
  return CENTRAL_KEYWORD_DATABASE.filter(k => k.primaryOrSecondary === 'primary');
}
