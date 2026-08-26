/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Reusable, High-Authority Contextual Related Content Module
 * Dynamically generates semantically grouped internal links based on the active topic,
 * canton, insurer, and language to maximize PageRank flow and topical clustering.
 */

import React from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Shield, 
  Calculator, 
  FileText, 
  Scale, 
  Award, 
  Coins, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight,
  TrendingDown,
  HeartPulse,
  Users,
  GraduationCap,
  Baby,
  Globe2,
  Building2,
  HelpCircle,
  Car,
  Home,
  Briefcase
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { AppTab } from '../../types';
import { getLocalizedPath } from '../multilingualRoutes';
import { ALL_26_CANTONS, CANTONS_SEO_DATA } from '../data/cantonsData';

export type RelatedTopicType = 
  | 'canton'
  | 'subside'
  | 'insurer'
  | 'comparison'
  | 'lamal'
  | 'franchise'
  | 'modeles'
  | 'switching'
  | 'pillar3a'
  | 'category'
  | 'demographic'
  | 'calculator'
  | 'guide'
  | 'general';

interface RelatedContentProps {
  topicType: RelatedTopicType;
  currentSlug?: string;
  currentPath?: string;
  onNavigate?: (url: string) => void;
  className?: string;
}

// Neighboring and high-affinity cantons map for contextual local clustering
const CANTON_AFFINITIES: Record<string, string[]> = {
  geneve: ['vaud', 'valais', 'neuchatel', 'fribourg'],
  vaud: ['geneve', 'fribourg', 'valais', 'neuchatel', 'berne'],
  valais: ['vaud', 'fribourg', 'berne', 'geneve'],
  fribourg: ['vaud', 'berne', 'neuchatel', 'valais'],
  neuchatel: ['jura', 'vaud', 'berne', 'fribourg'],
  jura: ['neuchatel', 'berne', 'bale-campagne', 'bale-ville'],
  berne: ['fribourg', 'vaud', 'solothurn', 'zurich', 'jura'],
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

// Comparisons list
const POPULAR_COMPARISONS: { slug: string; nameA: string; nameB: string }[] = [
  { slug: 'compare-css-helsana', nameA: 'CSS', nameB: 'Helsana' },
  { slug: 'compare-helsana-swica', nameA: 'Helsana', nameB: 'SWICA' },
  { slug: 'compare-css-swica', nameA: 'CSS', nameB: 'SWICA' },
  { slug: 'compare-assura-mutuel', nameA: 'Assura', nameB: 'Groupe Mutuel' },
  { slug: 'compare-swica-sanitas', nameA: 'SWICA', nameB: 'Sanitas' },
  { slug: 'compare-visana-concordia', nameA: 'Visana', nameB: 'Concordia' },
];

export default function RelatedContent({
  topicType,
  currentSlug,
  onNavigate,
  className = '',
}: RelatedContentProps) {
  const { language } = useLanguage();

  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey) return;
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  // 1. CANTON TOPIC
  if (topicType === 'canton' && currentSlug) {
    const canton = CANTONS_SEO_DATA[currentSlug] || CANTONS_SEO_DATA['geneve'];
    const cantonName = canton.name;
    const subsideTab = `subside-${currentSlug}` as AppTab;
    const subsidePath = getLocalizedPath(subsideTab, language);
    const franchisePath = getLocalizedPath('lamal-franchise', language);
    const modelesPath = getLocalizedPath('lamal-modeles', language);
    const changerPath = getLocalizedPath('lamal-changer-caisse', language);
    const lamalHubPath = getLocalizedPath('hub-lamal', language);

    const neighborSlugs = CANTON_AFFINITIES[currentSlug] || ['vaud', 'geneve', 'valais', 'fribourg'];
    const neighborCantons = neighborSlugs
      .map(slug => ALL_26_CANTONS.find(c => c.slug === slug))
      .filter(Boolean);

    return (
      <div className={`bg-white rounded-3xl border border-fennec-cream/70 p-6 sm:p-8 my-10 shadow-xs text-left ${className}`}>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6 pb-4 border-b border-fennec-cream/60">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-fennec-terracotta flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Navigation Thématique & Dossiers Associés
            </span>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-fennec-dark">
              Guides et démarches recommandés pour {cantonName}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <a
            href={subsidePath}
            onClick={(e) => handleLinkClick(subsidePath, e)}
            className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 hover:bg-amber-100/70 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-amber-800 text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5"><Coins className="w-4 h-4 text-amber-700" /> Aides Publiques</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-sm text-amber-950 mb-1">
                Subside d'assurance maladie à {cantonName}
              </h3>
              <p className="text-[11px] text-amber-900/80 leading-relaxed">
                Conditions RDU, barèmes 2026 et démarches auprès de {canton.subsideAgency || 'l\'organe cantonal'}.
              </p>
            </div>
            <span className="text-[11px] font-extrabold text-amber-800 mt-3 inline-block">Consulter les barèmes →</span>
          </a>

          <a
            href={franchisePath}
            onClick={(e) => handleLinkClick(franchisePath, e)}
            className="p-4 rounded-2xl bg-fennec-cream/25 border border-fennec-cream/60 hover:bg-fennec-cream/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-fennec-dark/60 text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5"><Calculator className="w-4 h-4 text-fennec-terracotta" /> Optimisation Primes</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-sm text-fennec-dark mb-1">
                Franchise 300 ou 2500 CHF ?
              </h3>
              <p className="text-[11px] text-fennec-dark/70 leading-relaxed">
                La règle des 1'800 CHF de soins pour économiser jusqu'à 1'540 CHF/an à {cantonName}.
              </p>
            </div>
            <span className="text-[11px] font-extrabold text-fennec-terracotta mt-3 inline-block">Lire le guide →</span>
          </a>

          <a
            href={modelesPath}
            onClick={(e) => handleLinkClick(modelesPath, e)}
            className="p-4 rounded-2xl bg-fennec-cream/25 border border-fennec-cream/60 hover:bg-fennec-cream/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-fennec-dark/60 text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-blue-600" /> Modèles LAMal</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-sm text-fennec-dark mb-1">
                Telmed, Médecin de famille & HMO
              </h3>
              <p className="text-[11px] text-fennec-dark/70 leading-relaxed">
                Comparez les réseaux de soins alternatifs disponibles dans le canton de {cantonName}.
              </p>
            </div>
            <span className="text-[11px] font-extrabold text-fennec-terracotta mt-3 inline-block">Découvrir les modèles →</span>
          </a>
        </div>

        {neighborCantons.length > 0 && (
          <div className="pt-4 border-t border-fennec-cream/60">
            <span className="text-xs font-bold text-fennec-dark/60 uppercase tracking-wider block mb-2.5">
              Primes d'assurance maladie dans les cantons voisins :
            </span>
            <div className="flex flex-wrap gap-2">
              {neighborCantons.map(nc => {
                if (!nc) return null;
                const path = getLocalizedPath(`canton-${nc.slug}` as AppTab, language);
                return (
                  <a
                    key={nc.code}
                    href={path}
                    onClick={(e) => handleLinkClick(path, e)}
                    className="px-3 py-1.5 rounded-xl bg-fennec-cream/20 hover:bg-fennec-cream/50 border border-fennec-cream/50 text-xs font-semibold text-fennec-dark transition-all flex items-center gap-1.5"
                  >
                    <MapPin className="w-3 h-3 text-fennec-terracotta" />
                    <span>Canton de {nc.name}</span>
                    <span className="text-[10px] text-fennec-dark/40 font-mono font-bold">({nc.code})</span>
                  </a>
                );
              })}
              <a
                href={lamalHubPath}
                onClick={(e) => handleLinkClick(lamalHubPath, e)}
                className="px-3 py-1.5 rounded-xl bg-fennec-dark text-white text-xs font-bold hover:bg-fennec-dark/90 transition-all"
              >
                Tous les 26 cantons →
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. SUBSIDE TOPIC
  if (topicType === 'subside' && currentSlug) {
    const canton = CANTONS_SEO_DATA[currentSlug] || CANTONS_SEO_DATA['geneve'];
    const cantonName = canton.name;
    const cantonTab = `canton-${currentSlug}` as AppTab;
    const cantonPath = getLocalizedPath(cantonTab, language);
    const subsidiesHubPath = getLocalizedPath('hub-subsides', language);
    const changerPath = getLocalizedPath('lamal-changer-caisse', language);

    const neighborSlugs = CANTON_AFFINITIES[currentSlug] || ['vaud', 'geneve', 'valais', 'fribourg'];
    const neighborCantons = neighborSlugs
      .map(slug => ALL_26_CANTONS.find(c => c.slug === slug))
      .filter(Boolean);

    return (
      <div className={`bg-white rounded-3xl border border-fennec-cream/70 p-6 sm:p-8 my-10 shadow-xs text-left ${className}`}>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6 pb-4 border-b border-fennec-cream/60">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700 flex items-center gap-1.5 mb-1">
              <Coins className="w-3.5 h-3.5" />
              Complément d'Information & Optimisation Budget
            </span>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-fennec-dark">
              Pages associées aux subsides à {cantonName}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <a
            href={cantonPath}
            onClick={(e) => handleLinkClick(cantonPath, e)}
            className="p-4 rounded-2xl bg-fennec-cream/25 border border-fennec-cream/60 hover:bg-fennec-cream/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-fennec-dark/60 text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-fennec-terracotta" /> Primes Officielles</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-sm text-fennec-dark mb-1">
                Assurance maladie à {cantonName}
              </h3>
              <p className="text-[11px] text-fennec-dark/70 leading-relaxed">
                Consultez le comparatif des primes 2026 de l'ensemble des caisses agréées à {cantonName}.
              </p>
            </div>
            <span className="text-[11px] font-extrabold text-fennec-terracotta mt-3 inline-block">Voir les tarifs {canton.code} →</span>
          </a>

          <a
            href={changerPath}
            onClick={(e) => handleLinkClick(changerPath, e)}
            className="p-4 rounded-2xl bg-fennec-cream/25 border border-fennec-cream/60 hover:bg-fennec-cream/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-fennec-dark/60 text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5"><FileText className="w-4 h-4 text-emerald-600" /> Démarche Légale</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-sm text-fennec-dark mb-1">
                Changer de caisse maladie
              </h3>
              <p className="text-[11px] text-fennec-dark/70 leading-relaxed">
                Même avec subside, choisir une caisse moins chère annule votre reste à charge.
              </p>
            </div>
            <span className="text-[11px] font-extrabold text-fennec-terracotta mt-3 inline-block">Modèle de lettre →</span>
          </a>

          <a
            href={subsidiesHubPath}
            onClick={(e) => handleLinkClick(subsidiesHubPath, e)}
            className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 hover:bg-amber-100/70 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-amber-800 text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5"><Coins className="w-4 h-4 text-amber-700" /> Hub National</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-sm text-amber-950 mb-1">
                Subsides dans les 26 cantons
              </h3>
              <p className="text-[11px] text-amber-900/80 leading-relaxed">
                Simulateur Fenny national et tableau récapitulatif des 26 barèmes cantonaux suisses.
              </p>
            </div>
            <span className="text-[11px] font-extrabold text-amber-800 mt-3 inline-block">Simulateur Fenny →</span>
          </a>
        </div>

        {neighborCantons.length > 0 && (
          <div className="pt-4 border-t border-fennec-cream/60">
            <span className="text-xs font-bold text-fennec-dark/60 uppercase tracking-wider block mb-2.5">
              Subsides dans les cantons voisins :
            </span>
            <div className="flex flex-wrap gap-2">
              {neighborCantons.map(nc => {
                if (!nc) return null;
                const path = getLocalizedPath(`subside-${nc.slug}` as AppTab, language);
                return (
                  <a
                    key={nc.code}
                    href={path}
                    onClick={(e) => handleLinkClick(path, e)}
                    className="px-3 py-1.5 rounded-xl bg-amber-50/50 hover:bg-amber-100/70 border border-amber-200/60 text-xs font-semibold text-amber-950 transition-all flex items-center gap-1.5"
                  >
                    <Coins className="w-3 h-3 text-amber-700" />
                    <span>Subsides {nc.name}</span>
                    <span className="text-[10px] text-amber-700/60 font-mono font-bold">({nc.code})</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3. INSURER TOPIC
  if (topicType === 'insurer' && currentSlug) {
    const insurersHubPath = getLocalizedPath('hub-insurers', language);
    const changerPath = getLocalizedPath('lamal-changer-caisse', language);
    const comparatorPath = getLocalizedPath('health-comparator', language);

    // Filter relevant comparisons for this insurer
    const insurerShort = currentSlug.replace('insurer-', '').replace('compare-', '');
    const relevantComparisons = POPULAR_COMPARISONS.filter(c => c.slug.includes(insurerShort));

    return (
      <div className={`bg-white rounded-3xl border border-fennec-cream/70 p-6 sm:p-8 my-10 shadow-xs text-left ${className}`}>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6 pb-4 border-b border-fennec-cream/60">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-fennec-terracotta flex items-center gap-1.5 mb-1">
              <Shield className="w-3.5 h-3.5" />
              Navigation Caisse Maladie & Prévoyance
            </span>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-fennec-dark">
              Outils & comparatifs associés
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <a
            href={insurersHubPath}
            onClick={(e) => handleLinkClick(insurersHubPath, e)}
            className="p-4 rounded-2xl bg-fennec-cream/25 border border-fennec-cream/60 hover:bg-fennec-cream/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-fennec-dark/60 text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-blue-600" /> Annuaire</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-sm text-fennec-dark mb-1">
                Annuaire des 37 caisses suisses
              </h3>
              <p className="text-[11px] text-fennec-dark/70 leading-relaxed">
                Toutes les caisses maladie agréées par l'OFSP avec leurs notes de satisfaction et modèles.
              </p>
            </div>
            <span className="text-[11px] font-extrabold text-fennec-terracotta mt-3 inline-block">Voir l'annuaire →</span>
          </a>

          <a
            href={changerPath}
            onClick={(e) => handleLinkClick(changerPath, e)}
            className="p-4 rounded-2xl bg-fennec-cream/25 border border-fennec-cream/60 hover:bg-fennec-cream/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-fennec-dark/60 text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5"><FileText className="w-4 h-4 text-emerald-600" /> Résiliation</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-sm text-fennec-dark mb-1">
                Modèle de lettre de résiliation
              </h3>
              <p className="text-[11px] text-fennec-dark/70 leading-relaxed">
                Délais stricts du 30 novembre, adresses officielles et démarches pas à pas.
              </p>
            </div>
            <span className="text-[11px] font-extrabold text-fennec-terracotta mt-3 inline-block">Télécharger le modèle →</span>
          </a>

          <a
            href={comparatorPath}
            onClick={(e) => handleLinkClick(comparatorPath, e)}
            className="p-4 rounded-2xl bg-fennec-terracotta/10 border border-fennec-terracotta/30 hover:bg-fennec-terracotta/15 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-fennec-terracotta text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5"><Calculator className="w-4 h-4" /> Comparateur Neutre</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-sm text-fennec-dark mb-1">
                Calculateur officiel des primes 2026
              </h3>
              <p className="text-[11px] text-fennec-dark/70 leading-relaxed">
                Simulez vos primes exactes selon votre commune et comparez face aux concurrents.
              </p>
            </div>
            <span className="text-[11px] font-extrabold text-fennec-terracotta mt-3 inline-block">Lancer le comparateur →</span>
          </a>
        </div>

        {/* Head-to-Head Comparisons Links */}
        <div className="pt-4 border-t border-fennec-cream/60">
          <span className="text-xs font-bold text-fennec-dark/60 uppercase tracking-wider block mb-2.5">
            Duels comparatifs directs entre caisses maladie :
          </span>
          <div className="flex flex-wrap gap-2">
            {POPULAR_COMPARISONS.map(comp => {
              const path = getLocalizedPath(comp.slug as AppTab, language);
              const isActive = comp.slug.includes(insurerShort);
              return (
                <a
                  key={comp.slug}
                  href={path}
                  onClick={(e) => handleLinkClick(path, e)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isActive 
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold' 
                      : 'bg-fennec-cream/20 hover:bg-fennec-cream/50 border-fennec-cream/50 text-fennec-dark'
                  }`}
                >
                  <Scale className="w-3 h-3 text-emerald-700" />
                  <span>{comp.nameA} vs {comp.nameB}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 4. COMPARISON TOPIC (Head-to-head)
  if (topicType === 'comparison') {
    const insurersHubPath = getLocalizedPath('hub-insurers', language);
    const lamalHubPath = getLocalizedPath('hub-lamal', language);
    const comparatorPath = getLocalizedPath('health-comparator', language);

    return (
      <div className={`bg-white rounded-3xl border border-fennec-cream/70 p-6 sm:p-8 my-10 shadow-xs text-left ${className}`}>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6 pb-4 border-b border-fennec-cream/60">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5 mb-1">
              <Scale className="w-3.5 h-3.5" />
              Autres Comparatifs Directs de Caisses Maladie
            </span>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-fennec-dark">
              Consultez les autres duels populaires
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {POPULAR_COMPARISONS.map(comp => {
            const path = getLocalizedPath(comp.slug as AppTab, language);
            const isCurrent = currentSlug === comp.slug;
            if (isCurrent) return null;

            return (
              <a
                key={comp.slug}
                href={path}
                onClick={(e) => handleLinkClick(path, e)}
                className="p-3.5 rounded-2xl bg-fennec-cream/20 hover:bg-fennec-cream/40 border border-fennec-cream/50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    VS
                  </div>
                  <div>
                    <span className="font-display font-bold text-xs sm:text-sm text-fennec-dark block">
                      {comp.nameA} vs {comp.nameB}
                    </span>
                    <span className="text-[10px] text-fennec-dark/50">Comparatif primes & prestations</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-fennec-dark/40 group-hover:text-fennec-terracotta group-hover:translate-x-0.5 transition-all" />
              </a>
            );
          })}
        </div>

        <div className="pt-4 border-t border-fennec-cream/60 flex flex-wrap items-center justify-between gap-3">
          <a
            href={insurersHubPath}
            onClick={(e) => handleLinkClick(insurersHubPath, e)}
            className="text-xs font-bold text-fennec-dark/70 hover:text-fennec-terracotta inline-flex items-center gap-1"
          >
            <span>Consulter l'annuaire complet des 37 caisses suisses</span>
            <ArrowRight className="w-3 h-3" />
          </a>
          <a
            href={comparatorPath}
            onClick={(e) => handleLinkClick(comparatorPath, e)}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
          >
            <span>Calculer les primes selon ma commune</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  // 5. LAMAL & GUIDES TOPIC
  if (topicType === 'lamal' || topicType === 'franchise' || topicType === 'modeles' || topicType === 'switching' || topicType === 'demographic' || topicType === 'calculator') {
    const franchisePath = getLocalizedPath('lamal-franchise', language);
    const modelesPath = getLocalizedPath('lamal-modeles', language);
    const moinsCherePath = getLocalizedPath('lamal-moins-chere', language);
    const meilleurePath = getLocalizedPath('meilleure-caisse-maladie', language);
    const changerPath = getLocalizedPath('lamal-changer-caisse', language);
    const lamalLcaPath = getLocalizedPath('lamal-vs-lca', language);
    const accidentPath = getLocalizedPath('lamal-assurance-accident', language);
    const subsidiesPath = getLocalizedPath('hub-subsides', language);
    const lamalHubPath = getLocalizedPath('hub-lamal', language);
    const familyPath = getLocalizedPath('assurance-famille', language);
    const jeunePath = getLocalizedPath('assurance-jeune-adulte', language);
    const etudiantPath = getLocalizedPath('assurance-etudiant', language);
    const frontalierPath = getLocalizedPath('guide-frontalier-assurance-maladie', language);

    return (
      <div className={`bg-white rounded-3xl border border-fennec-cream/70 p-6 sm:p-8 my-10 shadow-xs text-left ${className}`}>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6 pb-4 border-b border-fennec-cream/60">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-fennec-terracotta flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Dossiers & Stratégies LAMal 2026
            </span>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-fennec-dark">
              À découvrir pour optimiser vos assurances
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <a
            href={franchisePath}
            onClick={(e) => handleLinkClick(franchisePath, e)}
            className="p-4 rounded-2xl bg-fennec-cream/25 border border-fennec-cream/60 hover:bg-fennec-cream/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-fennec-dark/60 text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5"><Calculator className="w-4 h-4 text-fennec-terracotta" /> Franchise</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-sm text-fennec-dark mb-1">
                Franchise 300 vs 2500 CHF
              </h3>
              <p className="text-[11px] text-fennec-dark/70 leading-relaxed">
                Calcul du seuil mathématique des 1'800 CHF de frais médicaux.
              </p>
            </div>
            <span className="text-[11px] font-extrabold text-fennec-terracotta mt-3 inline-block">Lire le guide →</span>
          </a>

          <a
            href={modelesPath}
            onClick={(e) => handleLinkClick(modelesPath, e)}
            className="p-4 rounded-2xl bg-fennec-cream/25 border border-fennec-cream/60 hover:bg-fennec-cream/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-fennec-dark/60 text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-blue-600" /> Modèles de soins</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-sm text-fennec-dark mb-1">
                Telmed, HMO & Médecin de famille
              </h3>
              <p className="text-[11px] text-fennec-dark/70 leading-relaxed">
                Économisez jusqu'à 25% chaque mois grâce aux modèles alternatifs.
              </p>
            </div>
            <span className="text-[11px] font-extrabold text-fennec-terracotta mt-3 inline-block">Comparer les modèles →</span>
          </a>

          <a
            href={moinsCherePath}
            onClick={(e) => handleLinkClick(moinsCherePath, e)}
            className="p-4 rounded-2xl bg-fennec-cream/25 border border-fennec-cream/60 hover:bg-fennec-cream/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-fennec-dark/60 text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5"><TrendingDown className="w-4 h-4 text-emerald-600" /> Prix Bas</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-sm text-fennec-dark mb-1">
                La caisse la moins chère
              </h3>
              <p className="text-[11px] text-fennec-dark/70 leading-relaxed">
                Comprendre pourquoi le classement des prix varie d'une commune à l'autre.
              </p>
            </div>
            <span className="text-[11px] font-extrabold text-fennec-terracotta mt-3 inline-block">Voir les tarifs →</span>
          </a>

          <a
            href={changerPath}
            onClick={(e) => handleLinkClick(changerPath, e)}
            className="p-4 rounded-2xl bg-fennec-cream/25 border border-fennec-cream/60 hover:bg-fennec-cream/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-fennec-dark/60 text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5"><FileText className="w-4 h-4 text-amber-600" /> Démarche</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-sm text-fennec-dark mb-1">
                Changer d'assureur
              </h3>
              <p className="text-[11px] text-fennec-dark/70 leading-relaxed">
                Guide complet pour résilier avant le 30 novembre avec lettre type.
              </p>
            </div>
            <span className="text-[11px] font-extrabold text-fennec-terracotta mt-3 inline-block">Guide résiliation →</span>
          </a>

          <a
            href={subsidiesPath}
            onClick={(e) => handleLinkClick(subsidiesPath, e)}
            className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 hover:bg-amber-100/70 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-amber-800 text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5"><Coins className="w-4 h-4 text-amber-700" /> Aides</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-sm text-amber-950 mb-1">
                Subsides cantonaux
              </h3>
              <p className="text-[11px] text-amber-900/80 leading-relaxed">
                Vérifiez vos droits à la réduction individuelle de prime avec Fenny.
              </p>
            </div>
            <span className="text-[11px] font-extrabold text-amber-800 mt-3 inline-block">Simulateur Fenny →</span>
          </a>

          <a
            href={lamalLcaPath}
            onClick={(e) => handleLinkClick(lamalLcaPath, e)}
            className="p-4 rounded-2xl bg-fennec-cream/25 border border-fennec-cream/60 hover:bg-fennec-cream/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-fennec-dark/60 text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5"><Scale className="w-4 h-4 text-purple-600" /> Juridique</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-sm text-fennec-dark mb-1">
                LAMal vs LCA
              </h3>
              <p className="text-[11px] text-fennec-dark/70 leading-relaxed">
                Base obligatoire vs assurances complémentaires privées.
              </p>
            </div>
            <span className="text-[11px] font-extrabold text-fennec-terracotta mt-3 inline-block">Comprendre les différences →</span>
          </a>
        </div>

        {/* Profils démographiques & frontaliers */}
        <div className="pt-4 border-t border-fennec-cream/60">
          <span className="text-xs font-bold text-fennec-dark/60 uppercase tracking-wider block mb-2.5">
            Guides selon votre profil spécifique :
          </span>
          <div className="flex flex-wrap gap-2">
            <a
              href={familyPath}
              onClick={(e) => handleLinkClick(familyPath, e)}
              className="px-3 py-1.5 rounded-xl bg-fennec-cream/20 hover:bg-fennec-cream/50 border border-fennec-cream/50 text-xs font-semibold text-fennec-dark transition-all flex items-center gap-1.5"
            >
              <Baby className="w-3.5 h-3.5 text-fennec-terracotta" />
              <span>Assurance Famille & Enfants</span>
            </a>
            <a
              href={jeunePath}
              onClick={(e) => handleLinkClick(jeunePath, e)}
              className="px-3 py-1.5 rounded-xl bg-fennec-cream/20 hover:bg-fennec-cream/50 border border-fennec-cream/50 text-xs font-semibold text-fennec-dark transition-all flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>Jeunes Adultes (19-25 ans)</span>
            </a>
            <a
              href={etudiantPath}
              onClick={(e) => handleLinkClick(etudiantPath, e)}
              className="px-3 py-1.5 rounded-xl bg-fennec-cream/20 hover:bg-fennec-cream/50 border border-fennec-cream/50 text-xs font-semibold text-fennec-dark transition-all flex items-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
              <span>Étudiants & Apprentis</span>
            </a>
            <a
              href={frontalierPath}
              onClick={(e) => handleLinkClick(frontalierPath, e)}
              className="px-3 py-1.5 rounded-xl bg-fennec-cream/20 hover:bg-fennec-cream/50 border border-fennec-cream/50 text-xs font-semibold text-fennec-dark transition-all flex items-center gap-1.5"
            >
              <Globe2 className="w-3.5 h-3.5 text-purple-600" />
              <span>Frontaliers (Droit d'option)</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // 6. PILLAR 3A TOPIC
  if (topicType === 'pillar3a') {
    const lifeCompPath = getLocalizedPath('life-comparator', language);
    const taxCalcPath = getLocalizedPath('tool-calculateur-impot-3a', language);
    const healthCompPath = getLocalizedPath('health-comparator', language);
    const guide3aPath = getLocalizedPath('guide-3eme-pilier-3a-vs-3b', language);

    return (
      <div className={`bg-white rounded-3xl border border-fennec-cream/70 p-6 sm:p-8 my-10 shadow-xs text-left ${className}`}>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6 pb-4 border-b border-fennec-cream/60">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5 mb-1">
              <Coins className="w-3.5 h-3.5" />
              Prévoyance & Optimisation Fiscale
            </span>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-fennec-dark">
              Explorez nos outils et comparateurs 3ème pilier
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href={taxCalcPath}
            onClick={(e) => handleLinkClick(taxCalcPath, e)}
            className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 hover:bg-emerald-100/70 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-emerald-800 text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5"><Calculator className="w-4 h-4 text-emerald-700" /> Simulateur Fiscal</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-sm text-emerald-950 mb-1">
                Calculateur d'impôts 3a (2026)
              </h3>
              <p className="text-[11px] text-emerald-900/80 leading-relaxed">
                Estimez immédiatement l'économie d'impôt générée par votre versement 3a (plafond CHF 7'258).
              </p>
            </div>
            <span className="text-[11px] font-extrabold text-emerald-800 mt-3 inline-block">Calculer mon gain fiscal →</span>
          </a>

          <a
            href={lifeCompPath}
            onClick={(e) => handleLinkClick(lifeCompPath, e)}
            className="p-4 rounded-2xl bg-fennec-cream/25 border border-fennec-cream/60 hover:bg-fennec-cream/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-fennec-dark/60 text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-blue-600" /> Prévoyance Liée</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-sm text-fennec-dark mb-1">
                Comparateur 3ème Pilier & Vie
              </h3>
              <p className="text-[11px] text-fennec-dark/70 leading-relaxed">
                Comparez les rendements et garanties des solutions 3a bancaires et assurances suisses.
              </p>
            </div>
            <span className="text-[11px] font-extrabold text-fennec-terracotta mt-3 inline-block">Comparer les 3a →</span>
          </a>

          <a
            href={healthCompPath}
            onClick={(e) => handleLinkClick(healthCompPath, e)}
            className="p-4 rounded-2xl bg-fennec-cream/25 border border-fennec-cream/60 hover:bg-fennec-cream/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-fennec-dark/60 text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5"><HeartPulse className="w-4 h-4 text-fennec-terracotta" /> Santé</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-sm text-fennec-dark mb-1">
                Assurance Maladie LAMal
              </h3>
              <p className="text-[11px] text-fennec-dark/70 leading-relaxed">
                Combinez optimisation fiscale et réduction de vos primes de santé mensuelles.
              </p>
            </div>
            <span className="text-[11px] font-extrabold text-fennec-terracotta mt-3 inline-block">Comparer les primes →</span>
          </a>
        </div>
      </div>
    );
  }

  // 7. CATEGORY TOPIC (Auto, Ménage, RC, Vie, Voyage, etc.)
  if (topicType === 'category') {
    const healthCompPath = getLocalizedPath('health-comparator', language);
    const lifeCompPath = getLocalizedPath('life-comparator', language);
    const autoPath = getLocalizedPath('category-assurance-auto', language);
    const menagePath = getLocalizedPath('category-assurance-menage', language);
    const rcPath = getLocalizedPath('category-assurance-rc', language);
    const juridiquePath = getLocalizedPath('category-protection-juridique', language);

    return (
      <div className={`bg-white rounded-3xl border border-fennec-cream/70 p-6 sm:p-8 my-10 shadow-xs text-left ${className}`}>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6 pb-4 border-b border-fennec-cream/60">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-fennec-terracotta flex items-center gap-1.5 mb-1">
              <Shield className="w-3.5 h-3.5" />
              Autres Assurances & Comparateurs en Suisse
            </span>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-fennec-dark">
              Découvrez nos guides et comparateurs pour chaque besoin
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href={healthCompPath}
            onClick={(e) => handleLinkClick(healthCompPath, e)}
            className="p-4 rounded-2xl bg-fennec-cream/25 border border-fennec-cream/60 hover:bg-fennec-cream/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-fennec-dark/60 text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5"><HeartPulse className="w-4 h-4 text-emerald-600" /> Santé LAMal</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-sm text-fennec-dark mb-1">
                Assurance Maladie Suisse
              </h3>
              <p className="text-[11px] text-fennec-dark/70 leading-relaxed">
                Comparez les primes 2026 de l'ensemble des caisses maladie agréées en Suisse.
              </p>
            </div>
            <span className="text-[11px] font-extrabold text-fennec-terracotta mt-3 inline-block">Comparer les primes →</span>
          </a>

          <a
            href={autoPath}
            onClick={(e) => handleLinkClick(autoPath, e)}
            className="p-4 rounded-2xl bg-fennec-cream/25 border border-fennec-cream/60 hover:bg-fennec-cream/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-fennec-dark/60 text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5"><Car className="w-4 h-4 text-blue-600" /> Mobilité</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-sm text-fennec-dark mb-1">
                Assurance Auto & Moto
              </h3>
              <p className="text-[11px] text-fennec-dark/70 leading-relaxed">
                RC véhicule, Casco partielle et Casco complète : trouvez la meilleure couverture.
              </p>
            </div>
            <span className="text-[11px] font-extrabold text-fennec-terracotta mt-3 inline-block">Guide Auto →</span>
          </a>

          <a
            href={menagePath}
            onClick={(e) => handleLinkClick(menagePath, e)}
            className="p-4 rounded-2xl bg-fennec-cream/25 border border-fennec-cream/60 hover:bg-fennec-cream/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-fennec-dark/60 text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5"><Home className="w-4 h-4 text-amber-600" /> Logement</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-sm text-fennec-dark mb-1">
                Ménage & RC Privée
              </h3>
              <p className="text-[11px] text-fennec-dark/70 leading-relaxed">
                Protégez vos biens mobiliers et couvrez votre responsabilité civile en Suisse.
              </p>
            </div>
            <span className="text-[11px] font-extrabold text-fennec-terracotta mt-3 inline-block">Guide Ménage & RC →</span>
          </a>
        </div>
      </div>
    );
  }

  return null;
}
