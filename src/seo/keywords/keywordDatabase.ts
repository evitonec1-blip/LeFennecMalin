/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * LE FENNEC MALIN — MASTER SEO KEYWORD & TOPICAL AUTHORITY DATABASE (2026)
 * Complete Semantic Taxonomy across 23 Master Keyword Clusters & 10 Search Universes.
 * Features search intent mapping, target tabs/URLs, volume tiers, CPC/priority metrics,
 * multilingual equivalents (FR, DE, IT, EN, ES, PT), and internal linking rules.
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
  | 'price'
  | 'calculator';

export type TopicClusterId =
  | 'assurance-maladie'
  | 'comparateur'
  | 'prix-primes'
  | 'subsides'
  | 'cantons'
  | 'communes'
  | 'franchise'
  | 'modeles'
  | 'changer-caisse'
  | 'familles-enfants'
  | 'etudiants-jeunes'
  | 'seniors'
  | 'frontaliers'
  | 'assureurs'
  | 'complementaires'
  | 'hospitalisation'
  | 'prevoyance-3a'
  | 'guides-infos'
  | 'questions-frequentes'
  | 'calculateurs'
  | 'long-tail'
  | 'commercial-high-intent'
  | 'multilingual-intl';

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
  city?: string;
  insurer?: string;
  contentType: 'hub' | 'landing' | 'guide' | 'comparator' | 'profile' | 'comparison' | 'calculator';
  language: 'fr' | 'de' | 'it' | 'en' | 'es' | 'pt';
  estimatedVolume: 'Very High (>20k/mo)' | 'High (5k-20k/mo)' | 'Medium (1k-5k/mo)' | 'Low (<1k/mo)' | 'Longtail (<500/mo)';
  competitionLevel: 'High' | 'Medium' | 'Low';
  status: 'active' | 'optimized' | 'planned';
  suggestedH2?: string;
}

export const CENTRAL_KEYWORD_DATABASE: SEOKeywordItem[] = [
  // =========================================================================
  // 1. 🏆 CORE SWISS HEALTH-INSURANCE KEYWORDS (P0)
  // =========================================================================
  {
    id: 'kw-core-01',
    keyword: 'assurance maladie',
    searchIntent: 'informational',
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
    suggestedH2: 'Comprendre l’assurance maladie obligatoire en Suisse'
  },
  {
    id: 'kw-core-02',
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
    status: 'active'
  },
  {
    id: 'kw-core-03',
    keyword: 'assurance maladie en suisse',
    searchIntent: 'informational',
    cluster: 'assurance-maladie',
    priority: 'P0',
    targetUrl: '/fr/assurance-maladie/',
    targetTab: 'seo-maladie',
    primaryOrSecondary: 'secondary',
    contentType: 'landing',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-core-04',
    keyword: 'assurance maladie Suisse 2026',
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
    suggestedH2: 'Nouveautés et primes de l’assurance maladie suisse en 2026'
  },
  {
    id: 'kw-core-05',
    keyword: 'assurance maladie obligatoire',
    searchIntent: 'informational',
    cluster: 'assurance-maladie',
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
    id: 'kw-core-06',
    keyword: 'assurance maladie de base',
    searchIntent: 'informational',
    cluster: 'assurance-maladie',
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
    id: 'kw-core-07',
    keyword: 'assurance maladie LAMal',
    searchIntent: 'commercial',
    cluster: 'assurance-maladie',
    priority: 'P0',
    targetUrl: '/fr/lamal/',
    targetTab: 'hub-lamal',
    primaryOrSecondary: 'primary',
    contentType: 'hub',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'La loi sur l’assurance-maladie (LAMal) : droits et obligations'
  },
  {
    id: 'kw-core-08',
    keyword: 'caisse maladie',
    searchIntent: 'commercial',
    cluster: 'assurance-maladie',
    priority: 'P0',
    targetUrl: '/fr/caisses-maladie/',
    targetTab: 'hub-insurers',
    primaryOrSecondary: 'primary',
    contentType: 'hub',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-core-09',
    keyword: 'caisses maladie suisses',
    searchIntent: 'commercial',
    cluster: 'assurance-maladie',
    priority: 'P0',
    targetUrl: '/fr/caisses-maladie/',
    targetTab: 'hub-insurers',
    primaryOrSecondary: 'secondary',
    contentType: 'hub',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-core-10',
    keyword: 'assurance santé suisse',
    searchIntent: 'commercial',
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
    id: 'kw-core-11',
    keyword: 'assurance maladie pour étrangers en Suisse',
    searchIntent: 'informational',
    cluster: 'assurance-maladie',
    priority: 'P1',
    targetUrl: '/fr/profils/nouveaux-arrivants/',
    targetTab: 'lamal-nouveaux-arrivants',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'Medium (1k-5k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },
  {
    id: 'kw-core-12',
    keyword: 'assurance maladie nouvel arrivant Suisse',
    searchIntent: 'informational',
    cluster: 'assurance-maladie',
    priority: 'P1',
    targetUrl: '/fr/profils/nouveaux-arrivants/',
    targetTab: 'lamal-nouveaux-arrivants',
    primaryOrSecondary: 'secondary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'Medium (1k-5k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },

  // =========================================================================
  // 2. 🔎 COMPARATEUR / COMPARAISON (P0)
  // =========================================================================
  {
    id: 'kw-comp-01',
    keyword: 'comparateur assurance maladie',
    searchIntent: 'transactional',
    cluster: 'comparateur',
    priority: 'P0',
    targetUrl: '/fr/comparateur-assurance-suisse/',
    targetTab: 'seo-comparateur',
    primaryOrSecondary: 'primary',
    contentType: 'comparator',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Comparateur de primes d’assurance maladie neutre et gratuit'
  },
  {
    id: 'kw-comp-02',
    keyword: 'comparateur assurance maladie Suisse',
    searchIntent: 'transactional',
    cluster: 'comparateur',
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
    id: 'kw-comp-03',
    keyword: 'comparateur LAMal',
    searchIntent: 'transactional',
    cluster: 'comparateur',
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
  {
    id: 'kw-comp-04',
    keyword: 'comparatif assurance maladie Suisse',
    searchIntent: 'comparison',
    cluster: 'comparateur',
    priority: 'P0',
    targetUrl: '/fr/comparateur-assurance-suisse/',
    targetTab: 'seo-comparateur',
    primaryOrSecondary: 'secondary',
    contentType: 'comparator',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-comp-05',
    keyword: 'comparer assurance maladie Suisse',
    searchIntent: 'transactional',
    cluster: 'comparateur',
    priority: 'P0',
    targetUrl: '/fr/comparateur-assurance-suisse/',
    targetTab: 'health-comparator',
    primaryOrSecondary: 'secondary',
    contentType: 'comparator',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-comp-06',
    keyword: 'comparateur primes maladie 2026',
    searchIntent: 'price',
    cluster: 'comparateur',
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
  {
    id: 'kw-comp-07',
    keyword: 'assurance maladie la moins chère',
    searchIntent: 'commercial',
    cluster: 'comparateur',
    priority: 'P0',
    targetUrl: '/fr/assurance-maladie-la-moins-chere/',
    targetTab: 'lamal-moins-chere',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Quelle est la caisse maladie la moins chère en 2026 par canton ?'
  },
  {
    id: 'kw-comp-08',
    keyword: 'meilleure assurance maladie Suisse',
    searchIntent: 'commercial',
    cluster: 'comparateur',
    priority: 'P0',
    targetUrl: '/fr/meilleure-assurance-maladie/',
    targetTab: 'meilleure-caisse-maladie',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Classement et satisfaction client des meilleures caisses maladie'
  },
  {
    id: 'kw-comp-09',
    keyword: 'quelle assurance maladie choisir',
    searchIntent: 'informational',
    cluster: 'comparateur',
    priority: 'P0',
    targetUrl: '/fr/guides/comment-choisir-son-assurance/',
    targetTab: 'hub-lamal',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },

  // =========================================================================
  // 3. 💰 PRIX / PRIMES (P0)
  // =========================================================================
  {
    id: 'kw-price-01',
    keyword: 'prix assurance maladie Suisse',
    searchIntent: 'price',
    cluster: 'prix-primes',
    priority: 'P0',
    targetUrl: '/fr/comparateur-assurance-suisse/',
    targetTab: 'health-comparator',
    primaryOrSecondary: 'primary',
    contentType: 'calculator',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Calculer le prix exact de votre assurance maladie selon votre profil'
  },
  {
    id: 'kw-price-02',
    keyword: 'combien coûte assurance maladie Suisse',
    searchIntent: 'price',
    cluster: 'prix-primes',
    priority: 'P0',
    targetUrl: '/fr/comparateur-assurance-suisse/',
    targetTab: 'health-comparator',
    primaryOrSecondary: 'secondary',
    contentType: 'calculator',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-price-03',
    keyword: 'prime assurance maladie Suisse 2026',
    searchIntent: 'price',
    cluster: 'prix-primes',
    priority: 'P0',
    targetUrl: '/fr/comparateur-assurance-suisse/',
    targetTab: 'health-comparator',
    primaryOrSecondary: 'primary',
    contentType: 'calculator',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-price-04',
    keyword: 'calculateur prime assurance maladie',
    searchIntent: 'calculator',
    cluster: 'prix-primes',
    priority: 'P0',
    targetUrl: '/fr/comparateur-assurance-suisse/',
    targetTab: 'health-comparator',
    primaryOrSecondary: 'primary',
    contentType: 'calculator',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-price-05',
    keyword: 'prime moyenne assurance maladie Suisse',
    searchIntent: 'informational',
    cluster: 'prix-primes',
    priority: 'P1',
    targetUrl: '/fr/comparateur-assurance-suisse/',
    targetTab: 'health-comparator',
    primaryOrSecondary: 'secondary',
    contentType: 'calculator',
    language: 'fr',
    estimatedVolume: 'Medium (1k-5k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },
  {
    id: 'kw-price-06',
    keyword: 'augmentation prime assurance maladie',
    searchIntent: 'informational',
    cluster: 'prix-primes',
    priority: 'P1',
    targetUrl: '/fr/guides/hausse-des-primes-2026/',
    targetTab: 'hub-lamal',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },
  {
    id: 'kw-price-07',
    keyword: 'prime assurance maladie par canton',
    searchIntent: 'price',
    cluster: 'prix-primes',
    priority: 'P0',
    targetUrl: '/fr/comparateur-assurance-suisse/',
    targetTab: 'health-comparator',
    primaryOrSecondary: 'secondary',
    contentType: 'calculator',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },

  // =========================================================================
  // 4. 💸 SUBSIDES / RÉDUCTION DES PRIMES (P0)
  // =========================================================================
  {
    id: 'kw-sub-01',
    keyword: 'subside assurance maladie',
    searchIntent: 'informational',
    cluster: 'subsides',
    priority: 'P0',
    targetUrl: '/fr/subsides-assurance-maladie/',
    targetTab: 'hub-subsides',
    primaryOrSecondary: 'primary',
    contentType: 'hub',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Tout savoir sur les subsides et réductions individuelles de primes en Suisse'
  },
  {
    id: 'kw-sub-02',
    keyword: 'subside assurance maladie Suisse',
    searchIntent: 'informational',
    cluster: 'subsides',
    priority: 'P0',
    targetUrl: '/fr/subsides-assurance-maladie/',
    targetTab: 'hub-subsides',
    primaryOrSecondary: 'primary',
    contentType: 'hub',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-sub-03',
    keyword: 'réduction prime assurance maladie',
    searchIntent: 'informational',
    cluster: 'subsides',
    priority: 'P0',
    targetUrl: '/fr/subsides-assurance-maladie/',
    targetTab: 'hub-subsides',
    primaryOrSecondary: 'secondary',
    contentType: 'hub',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-sub-04',
    keyword: 'calculateur subside assurance maladie',
    searchIntent: 'calculator',
    cluster: 'subsides',
    priority: 'P0',
    targetUrl: '/fr/subsides-assurance-maladie/',
    targetTab: 'hub-subsides',
    primaryOrSecondary: 'primary',
    contentType: 'calculator',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Simulateur d’éligibilité et calcul de votre montant de subside cantonal'
  },
  {
    id: 'kw-sub-05',
    keyword: 'droit au subside assurance maladie',
    searchIntent: 'informational',
    cluster: 'subsides',
    priority: 'P0',
    targetUrl: '/fr/subsides-assurance-maladie/',
    targetTab: 'hub-subsides',
    primaryOrSecondary: 'secondary',
    contentType: 'hub',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },
  {
    id: 'kw-sub-06',
    keyword: 'conditions subside assurance maladie',
    searchIntent: 'informational',
    cluster: 'subsides',
    priority: 'P0',
    targetUrl: '/fr/subsides-assurance-maladie/',
    targetTab: 'hub-subsides',
    primaryOrSecondary: 'secondary',
    contentType: 'hub',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },
  {
    id: 'kw-sub-07',
    keyword: 'demande subside assurance maladie',
    searchIntent: 'transactional',
    cluster: 'subsides',
    priority: 'P0',
    targetUrl: '/fr/subsides-assurance-maladie/',
    targetTab: 'hub-subsides',
    primaryOrSecondary: 'secondary',
    contentType: 'hub',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-sub-08',
    keyword: 'revenu maximum subside assurance maladie',
    searchIntent: 'informational',
    cluster: 'subsides',
    priority: 'P1',
    targetUrl: '/fr/subsides-assurance-maladie/',
    targetTab: 'hub-subsides',
    primaryOrSecondary: 'longtail',
    contentType: 'hub',
    language: 'fr',
    estimatedVolume: 'Medium (1k-5k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },

  // =========================================================================
  // 5. 🏔️ 26 CANTONS (P0 & P1)
  // =========================================================================
  {
    id: 'kw-can-ge',
    keyword: 'assurance maladie Genève',
    searchIntent: 'local',
    cluster: 'cantons',
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
    suggestedH2: 'Primes LAMal et caisses maladie à Genève en 2026'
  },
  {
    id: 'kw-can-ge-sub',
    keyword: 'subside assurance maladie Genève',
    searchIntent: 'local',
    cluster: 'subsides',
    priority: 'P0',
    targetUrl: '/fr/subsides-assurance-maladie/geneve/',
    targetTab: 'subside-geneve',
    primaryOrSecondary: 'primary',
    canton: 'GE',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-can-vd',
    keyword: 'assurance maladie Vaud',
    searchIntent: 'local',
    cluster: 'cantons',
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
    suggestedH2: 'Tarifs et comparateur d’assurance maladie dans le canton de Vaud'
  },
  {
    id: 'kw-can-vd-sub',
    keyword: 'subside assurance maladie Vaud',
    searchIntent: 'local',
    cluster: 'subsides',
    priority: 'P0',
    targetUrl: '/fr/subsides-assurance-maladie/vaud/',
    targetTab: 'subside-vaud',
    primaryOrSecondary: 'primary',
    canton: 'VD',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-can-vs',
    keyword: 'assurance maladie Valais',
    searchIntent: 'local',
    cluster: 'cantons',
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
    id: 'kw-can-fr',
    keyword: 'assurance maladie Fribourg',
    searchIntent: 'local',
    cluster: 'cantons',
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
    id: 'kw-can-ne',
    keyword: 'assurance maladie Neuchâtel',
    searchIntent: 'local',
    cluster: 'cantons',
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
    id: 'kw-can-ju',
    keyword: 'assurance maladie Jura',
    searchIntent: 'local',
    cluster: 'cantons',
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
    id: 'kw-can-be',
    keyword: 'assurance maladie Berne',
    searchIntent: 'local',
    cluster: 'cantons',
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
    id: 'kw-can-zh',
    keyword: 'krankenkasse zürich',
    searchIntent: 'local',
    cluster: 'cantons',
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
  {
    id: 'kw-can-ti',
    keyword: 'cassa malati ticino',
    searchIntent: 'local',
    cluster: 'cantons',
    priority: 'P0',
    targetUrl: '/it/cassa-malati/ticino/',
    targetTab: 'canton-tessin',
    primaryOrSecondary: 'primary',
    canton: 'TI',
    contentType: 'landing',
    language: 'it',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-can-bs',
    keyword: 'krankenkasse basel-stadt',
    searchIntent: 'local',
    cluster: 'cantons',
    priority: 'P1',
    targetUrl: '/de/krankenkassen/basel-stadt/',
    targetTab: 'canton-bale-ville',
    primaryOrSecondary: 'primary',
    canton: 'BS',
    contentType: 'landing',
    language: 'de',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },

  // =========================================================================
  // 6. 🏙️ CITY / COMMUNE SEO (P1)
  // =========================================================================
  {
    id: 'kw-city-geneve',
    keyword: 'assurance maladie Genève ville',
    searchIntent: 'local',
    cluster: 'communes',
    priority: 'P1',
    targetUrl: '/fr/local/geneve/geneve/',
    targetTab: 'canton-geneve',
    primaryOrSecondary: 'primary',
    canton: 'GE',
    city: 'Genève',
    contentType: 'landing',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Assurance maladie à Genève Ville : Primes OFSP 2026 et HUG'
  },
  {
    id: 'kw-city-lausanne',
    keyword: 'assurance maladie Lausanne',
    searchIntent: 'local',
    cluster: 'communes',
    priority: 'P1',
    targetUrl: '/fr/local/vaud/lausanne/',
    targetTab: 'canton-vaud',
    primaryOrSecondary: 'primary',
    canton: 'VD',
    city: 'Lausanne',
    contentType: 'landing',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Assurance maladie à Lausanne : Réseau CHUV et primes locales'
  },
  {
    id: 'kw-city-zurich',
    keyword: 'krankenkasse zürich stadt',
    searchIntent: 'local',
    cluster: 'communes',
    priority: 'P1',
    targetUrl: '/de/local/zurich/zurich/',
    targetTab: 'canton-zurich',
    primaryOrSecondary: 'primary',
    canton: 'ZH',
    city: 'Zürich',
    contentType: 'landing',
    language: 'de',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-city-lugano',
    keyword: 'cassa malati lugano',
    searchIntent: 'local',
    cluster: 'communes',
    priority: 'P1',
    targetUrl: '/it/local/ticino/lugano/',
    targetTab: 'canton-tessin',
    primaryOrSecondary: 'primary',
    canton: 'TI',
    city: 'Lugano',
    contentType: 'landing',
    language: 'it',
    estimatedVolume: 'Medium (1k-5k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },

  // =========================================================================
  // 7. 🧮 FRANCHISE (P0)
  // =========================================================================
  {
    id: 'kw-fra-01',
    keyword: 'franchise assurance maladie',
    searchIntent: 'informational',
    cluster: 'franchise',
    priority: 'P0',
    targetUrl: '/fr/guides/franchise-300-vs-2500/',
    targetTab: 'lamal-franchise',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Quelle franchise choisir en Suisse : 300 ou 2500 ?'
  },
  {
    id: 'kw-fra-02',
    keyword: 'franchise 300 ou 2500',
    searchIntent: 'comparison',
    cluster: 'franchise',
    priority: 'P0',
    targetUrl: '/fr/guides/franchise-300-vs-2500/',
    targetTab: 'lamal-franchise',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-fra-03',
    keyword: 'calculateur franchise assurance maladie',
    searchIntent: 'calculator',
    cluster: 'franchise',
    priority: 'P0',
    targetUrl: '/fr/calculateur-franchise/',
    targetTab: 'tool-calculateur-franchise',
    primaryOrSecondary: 'primary',
    contentType: 'calculator',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Calculateur d’optimisation mathématique de franchise (seuil des CHF 1\'800)'
  },
  {
    id: 'kw-fra-04',
    keyword: 'franchise 2500 assurance maladie',
    searchIntent: 'informational',
    cluster: 'franchise',
    priority: 'P1',
    targetUrl: '/fr/guides/franchise-300-vs-2500/',
    targetTab: 'lamal-franchise',
    primaryOrSecondary: 'secondary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },
  {
    id: 'kw-fra-05',
    keyword: 'franchise 300 assurance maladie',
    searchIntent: 'informational',
    cluster: 'franchise',
    priority: 'P1',
    targetUrl: '/fr/guides/franchise-300-vs-2500/',
    targetTab: 'lamal-franchise',
    primaryOrSecondary: 'secondary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },
  {
    id: 'kw-fra-06',
    keyword: 'franchise enfant assurance maladie',
    searchIntent: 'informational',
    cluster: 'franchise',
    priority: 'P1',
    targetUrl: '/fr/profils/familles/',
    targetTab: 'assurance-famille',
    primaryOrSecondary: 'secondary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'Medium (1k-5k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },

  // =========================================================================
  // 8. 🩺 ASSURANCE MODELS (P0)
  // =========================================================================
  {
    id: 'kw-mod-01',
    keyword: 'modèles assurance maladie Suisse',
    searchIntent: 'informational',
    cluster: 'modeles',
    priority: 'P0',
    targetUrl: '/fr/guides/modeles-assurance/',
    targetTab: 'guide-modeles-assurance',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Comparatif des modèles d’assurance : Standard, Telmed, HMO et Médecin de famille'
  },
  {
    id: 'kw-mod-02',
    keyword: 'assurance maladie Telmed',
    searchIntent: 'commercial',
    cluster: 'modeles',
    priority: 'P0',
    targetUrl: '/fr/guides/modeles-assurance/',
    targetTab: 'guide-modeles-assurance',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-mod-03',
    keyword: 'assurance maladie HMO',
    searchIntent: 'commercial',
    cluster: 'modeles',
    priority: 'P0',
    targetUrl: '/fr/guides/modeles-assurance/',
    targetTab: 'guide-modeles-assurance',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-mod-04',
    keyword: 'assurance maladie médecin de famille',
    searchIntent: 'commercial',
    cluster: 'modeles',
    priority: 'P0',
    targetUrl: '/fr/guides/modeles-assurance/',
    targetTab: 'guide-modeles-assurance',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-mod-05',
    keyword: 'Telmed ou HMO',
    searchIntent: 'comparison',
    cluster: 'modeles',
    priority: 'P1',
    targetUrl: '/fr/guides/modeles-assurance/',
    targetTab: 'guide-modeles-assurance',
    primaryOrSecondary: 'secondary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'Medium (1k-5k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },

  // =========================================================================
  // 9. 🔄 CHANGER DE CAISSE (P0)
  // =========================================================================
  {
    id: 'kw-sw-01',
    keyword: 'changer assurance maladie',
    searchIntent: 'transactional',
    cluster: 'changer-caisse',
    priority: 'P0',
    targetUrl: '/fr/guides/resiliation-assurance-maladie/',
    targetTab: 'lamal-changer-caisse',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Comment changer de caisse maladie : Délais, modèle de lettre et démarches'
  },
  {
    id: 'kw-sw-02',
    keyword: 'délai résiliation assurance maladie',
    searchIntent: 'informational',
    cluster: 'changer-caisse',
    priority: 'P0',
    targetUrl: '/fr/guides/resiliation-assurance-maladie/',
    targetTab: 'lamal-changer-caisse',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-sw-03',
    keyword: 'lettre résiliation assurance maladie',
    searchIntent: 'transactional',
    cluster: 'changer-caisse',
    priority: 'P0',
    targetUrl: '/fr/guides/resiliation-assurance-maladie/',
    targetTab: 'lamal-changer-caisse',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },

  // =========================================================================
  // 10. 👨‍👩‍👧 FAMILLES / ENFANTS (P1)
  // =========================================================================
  {
    id: 'kw-fam-01',
    keyword: 'assurance maladie famille',
    searchIntent: 'commercial',
    cluster: 'familles-enfants',
    priority: 'P1',
    targetUrl: '/fr/profils/familles/',
    targetTab: 'assurance-famille',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Assurance maladie pour famille : Rabais enfants et optimisation globale'
  },
  {
    id: 'kw-fam-02',
    keyword: 'assurance maladie bébé naissance',
    searchIntent: 'commercial',
    cluster: 'familles-enfants',
    priority: 'P1',
    targetUrl: '/fr/profils/familles/',
    targetTab: 'assurance-famille',
    primaryOrSecondary: 'secondary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'Medium (1k-5k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },

  // =========================================================================
  // 11. 🎓 ÉTUDIANTS / JEUNES (P1)
  // =========================================================================
  {
    id: 'kw-stu-01',
    keyword: 'assurance maladie étudiant Suisse',
    searchIntent: 'commercial',
    cluster: 'etudiants-jeunes',
    priority: 'P1',
    targetUrl: '/fr/profils/etudiants/',
    targetTab: 'assurance-etudiant',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'Medium',
    status: 'active',
    suggestedH2: 'Assurance maladie étudiant : Tarifs réduits et exonérations'
  },
  {
    id: 'kw-stu-02',
    keyword: 'assurance maladie jeune adulte 19-25 ans',
    searchIntent: 'commercial',
    cluster: 'etudiants-jeunes',
    priority: 'P1',
    targetUrl: '/fr/profils/jeunes-adultes/',
    targetTab: 'assurance-jeune-adulte',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },

  // =========================================================================
  // 12. 👴 SENIORS / RETRAITÉS (P1)
  // =========================================================================
  {
    id: 'kw-sen-01',
    keyword: 'assurance maladie senior Suisse',
    searchIntent: 'commercial',
    cluster: 'seniors',
    priority: 'P1',
    targetUrl: '/fr/profils/seniors/',
    targetTab: 'hub-lamal',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'Medium',
    status: 'active',
    suggestedH2: 'Assurance maladie pour seniors et retraités en Suisse'
  },

  // =========================================================================
  // 13. 🇫🇷 FRONTALIERS (P0)
  // =========================================================================
  {
    id: 'kw-fro-01',
    keyword: 'assurance maladie frontalier Suisse',
    searchIntent: 'commercial',
    cluster: 'frontaliers',
    priority: 'P0',
    targetUrl: '/fr/guides/frontalier-assurance-maladie/',
    targetTab: 'guide-frontalier-assurance-maladie',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Assurance maladie frontalier : Choisir entre LAMal et CMU (Droit d’option)'
  },
  {
    id: 'kw-fro-02',
    keyword: 'LAMal ou CMU frontalier',
    searchIntent: 'comparison',
    cluster: 'frontaliers',
    priority: 'P0',
    targetUrl: '/fr/guides/frontalier-assurance-maladie/',
    targetTab: 'guide-frontalier-assurance-maladie',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-fro-03',
    keyword: 'simulateur LAMal frontalier',
    searchIntent: 'calculator',
    cluster: 'frontaliers',
    priority: 'P0',
    targetUrl: '/fr/simulateur-frontalier/',
    targetTab: 'tool-simulateur-frontalier',
    primaryOrSecondary: 'primary',
    contentType: 'calculator',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },

  // =========================================================================
  // 14. 🏢 ASSUREURS (CSS, GROUPE MUTUEL, HELSANA, SANITAS, SWICA, ASSURA...) (P0 & P1)
  // =========================================================================
  {
    id: 'kw-ins-css',
    keyword: 'CSS assurance maladie',
    searchIntent: 'brand',
    cluster: 'assureurs',
    priority: 'P0',
    targetUrl: '/fr/caisses-maladie/css/',
    targetTab: 'insurer-css',
    primaryOrSecondary: 'primary',
    insurer: 'CSS',
    contentType: 'profile',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-ins-helsana',
    keyword: 'Helsana assurance maladie',
    searchIntent: 'brand',
    cluster: 'assureurs',
    priority: 'P0',
    targetUrl: '/fr/caisses-maladie/helsana/',
    targetTab: 'insurer-helsana',
    primaryOrSecondary: 'primary',
    insurer: 'Helsana',
    contentType: 'profile',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-ins-swica',
    keyword: 'SWICA assurance maladie',
    searchIntent: 'brand',
    cluster: 'assureurs',
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
    id: 'kw-ins-groupe-mutuel',
    keyword: 'Groupe Mutuel assurance maladie',
    searchIntent: 'brand',
    cluster: 'assureurs',
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
    id: 'kw-ins-sanitas',
    keyword: 'Sanitas assurance maladie',
    searchIntent: 'brand',
    cluster: 'assureurs',
    priority: 'P0',
    targetUrl: '/fr/caisses-maladie/sanitas/',
    targetTab: 'insurer-sanitas',
    primaryOrSecondary: 'primary',
    insurer: 'Sanitas',
    contentType: 'profile',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-ins-assura',
    keyword: 'Assura assurance maladie',
    searchIntent: 'brand',
    cluster: 'assureurs',
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
    id: 'kw-ins-visana',
    keyword: 'Visana assurance maladie',
    searchIntent: 'brand',
    cluster: 'assureurs',
    priority: 'P1',
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
    id: 'kw-ins-concordia',
    keyword: 'Concordia assurance maladie',
    searchIntent: 'brand',
    cluster: 'assureurs',
    priority: 'P1',
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
    id: 'kw-ins-kpt',
    keyword: 'KPT CPT assurance maladie',
    searchIntent: 'brand',
    cluster: 'assureurs',
    priority: 'P1',
    targetUrl: '/fr/caisses-maladie/kpt/',
    targetTab: 'insurer-kpt',
    primaryOrSecondary: 'primary',
    insurer: 'KPT / CPT',
    contentType: 'profile',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },

  // =========================================================================
  // 15. 💊 COMPLEMENTARY INSURANCE (LCA / VVG) (P1)
  // =========================================================================
  {
    id: 'kw-lca-01',
    keyword: 'assurance complémentaire Suisse',
    searchIntent: 'commercial',
    cluster: 'complementaires',
    priority: 'P1',
    targetUrl: '/fr/guides/lamal-vs-lca/',
    targetTab: 'lamal-vs-lca',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Différences entre assurance de base (LAMal) et assurances complémentaires (LCA)'
  },
  {
    id: 'kw-lca-02',
    keyword: 'assurance dentaire Suisse',
    searchIntent: 'commercial',
    cluster: 'complementaires',
    priority: 'P1',
    targetUrl: '/fr/guides/assurance-dentaire/',
    targetTab: 'guide-assurance-dentaire',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-lca-03',
    keyword: 'assurance médecine alternative douce',
    searchIntent: 'commercial',
    cluster: 'complementaires',
    priority: 'P1',
    targetUrl: '/fr/guides/assurance-complementaire-lca/',
    targetTab: 'guide-assurance-complementaire-lca',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },

  // =========================================================================
  // 16. 🏥 HOSPITAL / HEALTH (P1)
  // =========================================================================
  {
    id: 'kw-hosp-01',
    keyword: 'assurance hospitalisation Suisse',
    searchIntent: 'commercial',
    cluster: 'hospitalisation',
    priority: 'P1',
    targetUrl: '/fr/guides/assurance-hospitalisation/',
    targetTab: 'guide-assurance-hospitalisation',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Division semi-privée et privée : Couverture hospitalière en Suisse'
  },

  // =========================================================================
  // 17. 💼 3A / PRÉVOYANCE (P0 & P1)
  // =========================================================================
  {
    id: 'kw-3a-01',
    keyword: 'pilier 3a Suisse',
    searchIntent: 'commercial',
    cluster: 'prevoyance-3a',
    priority: 'P0',
    targetUrl: '/fr/3eme-pilier/',
    targetTab: 'seo-pilier',
    primaryOrSecondary: 'primary',
    contentType: 'landing',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: '3ème pilier 3a en Suisse : Plafonds 2026, déductions fiscales et rendement'
  },
  {
    id: 'kw-3a-02',
    keyword: 'comparateur 3eme pilier 3a',
    searchIntent: 'transactional',
    cluster: 'prevoyance-3a',
    priority: 'P0',
    targetUrl: '/fr/3eme-pilier/',
    targetTab: 'life-comparator',
    primaryOrSecondary: 'primary',
    contentType: 'comparator',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-3a-03',
    keyword: 'calculateur impot 3eme pilier',
    searchIntent: 'calculator',
    cluster: 'prevoyance-3a',
    priority: 'P0',
    targetUrl: '/fr/calculateur-impot-3a/',
    targetTab: 'tool-calculateur-impot-3a',
    primaryOrSecondary: 'primary',
    contentType: 'calculator',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Calculateur d’économie d’impôt 3ème pilier 3a selon votre canton'
  },

  // =========================================================================
  // 18. 📚 INFORMATION / GUIDES (P1)
  // =========================================================================
  {
    id: 'kw-gui-01',
    keyword: 'qu est ce que la LAMal',
    searchIntent: 'informational',
    cluster: 'guides-infos',
    priority: 'P1',
    targetUrl: '/fr/lamal/',
    targetTab: 'hub-lamal',
    primaryOrSecondary: 'primary',
    contentType: 'hub',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },
  {
    id: 'kw-gui-02',
    keyword: 'accident assurance maladie suisse',
    searchIntent: 'informational',
    cluster: 'guides-infos',
    priority: 'P1',
    targetUrl: '/fr/guides/couverture-accident-lpa/',
    targetTab: 'lamal-assurance-accident',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'Medium',
    status: 'active',
    suggestedH2: 'Couverture accident LAA vs LAMal : Faut-il inclure l’accident ?'
  },

  // =========================================================================
  // 19. ❓ QUESTION KEYWORDS (P1)
  // =========================================================================
  {
    id: 'kw-q-01',
    keyword: 'comment payer moins cher son assurance maladie',
    searchIntent: 'informational',
    cluster: 'questions-frequentes',
    priority: 'P1',
    targetUrl: '/fr/assurance-maladie-la-moins-chere/',
    targetTab: 'lamal-moins-chere',
    primaryOrSecondary: 'primary',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },

  // =========================================================================
  // 20. 📊 CALCULATEURS & OUTILS (P0)
  // =========================================================================
  {
    id: 'kw-calc-01',
    keyword: 'calcul primes assurance maladie suisse',
    searchIntent: 'calculator',
    cluster: 'calculateurs',
    priority: 'P0',
    targetUrl: '/fr/comparateur-assurance-suisse/',
    targetTab: 'health-comparator',
    primaryOrSecondary: 'primary',
    contentType: 'calculator',
    language: 'fr',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },

  // =========================================================================
  // 21. 🧠 HIGH-VALUE LONG-TAIL KEYWORDS (P2)
  // =========================================================================
  {
    id: 'kw-lt-01',
    keyword: 'assurance maladie moins chère Vaud 2026',
    searchIntent: 'price',
    cluster: 'long-tail',
    priority: 'P2',
    targetUrl: '/fr/assurance-maladie/vaud/',
    targetTab: 'canton-vaud',
    primaryOrSecondary: 'longtail',
    canton: 'VD',
    contentType: 'landing',
    language: 'fr',
    estimatedVolume: 'Medium (1k-5k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },
  {
    id: 'kw-lt-02',
    keyword: 'meilleure assurance maladie avec Telmed',
    searchIntent: 'comparison',
    cluster: 'long-tail',
    priority: 'P2',
    targetUrl: '/fr/guides/modeles-assurance/',
    targetTab: 'guide-modeles-assurance',
    primaryOrSecondary: 'longtail',
    contentType: 'guide',
    language: 'fr',
    estimatedVolume: 'Medium (1k-5k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },

  // =========================================================================
  // 22. 🔥 KEYWORDS COMMERCIAUX À FORTE INTENTION (P0)
  // =========================================================================
  {
    id: 'kw-com-01',
    keyword: 'devis assurance maladie Suisse',
    searchIntent: 'transactional',
    cluster: 'commercial-high-intent',
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
  {
    id: 'kw-com-02',
    keyword: 'comparer assurance maladie en ligne',
    searchIntent: 'transactional',
    cluster: 'commercial-high-intent',
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

  // =========================================================================
  // 23. 🌍 MULTILINGUAL KEYWORD EXPANSION (DE, IT, EN, ES, PT) (P0 & P1)
  // =========================================================================
  {
    id: 'kw-de-01',
    keyword: 'Krankenkassenvergleich Schweiz 2026',
    searchIntent: 'transactional',
    cluster: 'multilingual-intl',
    priority: 'P0',
    targetUrl: '/de/krankenkassenvergleich-schweiz/',
    targetTab: 'seo-comparateur',
    primaryOrSecondary: 'primary',
    contentType: 'comparator',
    language: 'de',
    estimatedVolume: 'Very High (>20k/mo)',
    competitionLevel: 'High',
    status: 'active',
    suggestedH2: 'Unabhängiger Krankenkassenvergleich Schweiz 2026'
  },
  {
    id: 'kw-de-02',
    keyword: 'Prämienverbilligung Schweiz',
    searchIntent: 'informational',
    cluster: 'multilingual-intl',
    priority: 'P0',
    targetUrl: '/de/praemienverbilligung/',
    targetTab: 'hub-subsides',
    primaryOrSecondary: 'primary',
    contentType: 'hub',
    language: 'de',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-it-01',
    keyword: 'confronto cassa malati Svizzera 2026',
    searchIntent: 'transactional',
    cluster: 'multilingual-intl',
    priority: 'P0',
    targetUrl: '/it/confronto-cassa-malati-svizzera/',
    targetTab: 'seo-comparateur',
    primaryOrSecondary: 'primary',
    contentType: 'comparator',
    language: 'it',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-en-01',
    keyword: 'Swiss health insurance comparison 2026',
    searchIntent: 'transactional',
    cluster: 'multilingual-intl',
    priority: 'P0',
    targetUrl: '/en/swiss-health-insurance-comparison/',
    targetTab: 'seo-comparateur',
    primaryOrSecondary: 'primary',
    contentType: 'comparator',
    language: 'en',
    estimatedVolume: 'High (5k-20k/mo)',
    competitionLevel: 'High',
    status: 'active'
  },
  {
    id: 'kw-es-01',
    keyword: 'seguro medico suiza comparador 2026',
    searchIntent: 'transactional',
    cluster: 'multilingual-intl',
    priority: 'P1',
    targetUrl: '/es/comparador-seguros-suiza/',
    targetTab: 'seo-comparateur',
    primaryOrSecondary: 'primary',
    contentType: 'comparator',
    language: 'es',
    estimatedVolume: 'Medium (1k-5k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  },
  {
    id: 'kw-pt-01',
    keyword: 'seguro de saude suica comparador 2026',
    searchIntent: 'transactional',
    cluster: 'multilingual-intl',
    priority: 'P1',
    targetUrl: '/pt/comparador-seguros-suica/',
    targetTab: 'seo-comparateur',
    primaryOrSecondary: 'primary',
    contentType: 'comparator',
    language: 'pt',
    estimatedVolume: 'Medium (1k-5k/mo)',
    competitionLevel: 'Medium',
    status: 'active'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPER QUERY & GROUPING UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

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

export function getKeywordsByLanguage(lang: 'fr' | 'de' | 'it' | 'en' | 'es' | 'pt'): SEOKeywordItem[] {
  return CENTRAL_KEYWORD_DATABASE.filter(k => k.language === lang);
}
