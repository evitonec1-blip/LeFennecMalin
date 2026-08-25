/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Swiss Canton Insurance Deep-Dive Page (/assurance-maladie/:cantonSlug/)
 * Comprehensive, data-dense local SEO system covering all 26 Swiss cantons.
 */

import React, { useState } from 'react';
import { 
  Shield, 
  ArrowRight, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Building, 
  Award, 
  HelpCircle, 
  Scale, 
  TrendingDown, 
  Activity, 
  Hospital, 
  ExternalLink,
  PhoneCall,
  UserCheck,
  Building2,
  Check,
  Calendar,
  FileText,
  Clock,
  Sparkles,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';
import SEOHead, { breadcrumbSchema, faqSchema, organizationSchema, financialServiceSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { CantonSEOData, ALL_26_CANTONS } from '../data/cantonsData';
import { useLanguage } from '../../i18n/LanguageContext';
import { AppTab } from '../../types';
import { getLocalizedPath } from '../multilingualRoutes';
import RelatedContent from '../components/RelatedContent';
import CantonCrossLinks from '../components/CantonCrossLinks';

interface CantonPageProps {
  data: CantonSEOData;
  onStartComparison: (cantonCode?: string) => void;
  onGoHome: () => void;
  onGoHealthHub: () => void;
  onSelectCanton?: (cantonSlug: string) => void;
  onNavigate?: (url: string) => void;
}

const INSURER_SLUG_MAP: Record<string, string> = {
  'CSS': 'css',
  'CSS Assurance': 'css',
  'Helsana': 'helsana',
  'Swica': 'swica',
  'Groupe Mutuel': 'groupemutuel',
  'Mutuel Assurance': 'groupemutuel',
  'Philos': 'groupemutuel',
  'Avenir': 'groupemutuel',
  'Assura': 'assura',
  'Concordia': 'concordia',
  'Visana': 'visana',
  'Sanitas': 'sanitas',
  'KPT': 'kpt',
  'KPT / CPT': 'kpt',
  'Sympany': 'sympany',
  'Atupri': 'atupri',
  'Agrisano': 'agrisano',
  'Aquilana': 'aquilana',
  'ÖKK': 'oekk',
  'Provita': 'sanitas',
  'EasySana': 'groupemutuel',
  'Avanex': 'helsana',
  'Progrès': 'helsana',
  'Sana24': 'visana',
  'Visperterminen': 'visana',
};

function getInsurerSlug(name: string): string | null {
  for (const [key, slug] of Object.entries(INSURER_SLUG_MAP)) {
    if (name.toLowerCase().includes(key.toLowerCase())) {
      return slug;
    }
  }
  return null;
}

export default function CantonPage({ 
  data, 
  onStartComparison, 
  onGoHome, 
  onGoHealthHub, 
  onSelectCanton,
  onNavigate 
}: CantonPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { language } = useLanguage();

  const handleInternalLink = (url: string, e?: React.MouseEvent) => {
    if (e && (e.metaKey || e.ctrlKey)) return;
    if (e) e.preventDefault();
    if (onNavigate) {
      onNavigate(url);
    } else if (url.startsWith('/fr/assurance-maladie/')) {
      const parts = url.split('/').filter(Boolean);
      const slug = parts[parts.length - 1];
      if (slug && slug !== 'assurance-maladie' && onSelectCanton) {
        onSelectCanton(slug);
      } else {
        onGoHealthHub();
      }
    }
  };

  const structured = [
    organizationSchema,
    financialServiceSchema(
      `Assurance Maladie ${data.name} 2026`,
      `Comparateur officiel des primes d'assurance maladie dans le canton de ${data.name} (${data.code}). Données OFSP 2026.`,
      `/assurance-maladie/${data.slug}/`
    ),
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'Assurance Maladie', url: '/assurance-maladie/' },
      { name: `${data.name} (${data.code})`, url: `/assurance-maladie/${data.slug}/` },
    ]),
    faqSchema(data.faqs),
  ];

  return (
    <>
      <SEOHead
        tab={`canton-${data.slug}` as AppTab}
        language={language}
        structuredData={structured}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: onGoHome },
            { label: 'Assurance Maladie', onClick: onGoHealthHub },
            { label: `${data.name} (${data.code})` },
          ]}
        />

        {/* Hero Header */}
        <div className="mb-10 text-left">
          <div className="inline-flex items-center gap-2 bg-fennec-terracotta/10 text-fennec-terracotta text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
            <MapPin className="w-3.5 h-3.5" />
            Canton de {data.name} ({data.code}) · Données Officielles OFSP 2026
          </div>
          
          <h1 className="font-display font-black text-3xl sm:text-4xl text-fennec-dark mb-4 leading-tight">
            {data.h1 || `Assurance maladie dans le canton de ${data.name} (${data.code}) : Primes 2026 & Comparatif`}
          </h1>
          
          <p className="text-fennec-dark/75 text-base sm:text-lg leading-relaxed mb-6">
            Découvrez les tarifs officiels 2026 de l'assurance maladie obligatoire (LAMal) dans le canton de {data.name}. Comparez l'ensemble des caisses agréées, optimisez votre franchise et vos modèles alternatifs pour économiser jusqu'à plus de CHF 1'500.- par an.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onStartComparison(data.code)}
              className="inline-flex items-center gap-2 bg-fennec-terracotta text-white font-display font-bold px-7 py-3.5 rounded-full shadow-md hover:bg-fennec-terracotta/90 transition-all active:scale-95 text-sm uppercase tracking-wider cursor-pointer"
            >
              Comparer les primes à {data.name}
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={getLocalizedPath(`subside-${data.slug}` as AppTab, language)}
              onClick={(e) => handleInternalLink(getLocalizedPath(`subside-${data.slug}` as AppTab, language), e)}
              className="inline-flex items-center gap-2 bg-amber-50 text-amber-900 border border-amber-300/80 font-display font-bold px-6 py-3.5 rounded-full hover:bg-amber-100/80 transition-all text-sm cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-700" />
              Subsides {data.name}
            </a>
          </div>
        </div>

        {/* Canton Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-10">
          <div className="bg-white rounded-2xl border border-fennec-cream/60 p-4 sm:p-5 shadow-xs">
            <span className="text-[10px] sm:text-[11px] font-bold text-fennec-dark/50 uppercase tracking-wider block">Prime moyenne (F300)</span>
            <p className="font-display font-black text-fennec-terracotta text-lg sm:text-xl mt-1">{data.avgAdultPremium300}</p>
            <span className="text-fennec-dark/60 text-xs mt-0.5 block">Adulte dès 26 ans</span>
          </div>

          <div className="bg-white rounded-2xl border border-fennec-cream/60 p-4 sm:p-5 shadow-xs">
            <span className="text-[10px] sm:text-[11px] font-bold text-fennec-dark/50 uppercase tracking-wider block">Prime mini (F2500)</span>
            <p className="font-display font-black text-emerald-700 text-lg sm:text-xl mt-1">{data.avgAdultPremium2500}</p>
            <span className="text-fennec-dark/60 text-xs mt-0.5 block">Modèles alternatifs</span>
          </div>

          <div className="bg-white rounded-2xl border border-fennec-cream/60 p-4 sm:p-5 shadow-xs">
            <span className="text-[10px] sm:text-[11px] font-bold text-fennec-dark/50 uppercase tracking-wider block">Prime Jeune (19-25)</span>
            <p className="font-display font-black text-blue-700 text-lg sm:text-xl mt-1">{data.avgYoungPremium}</p>
            <span className="text-fennec-dark/60 text-xs mt-0.5 block">Rabais jeunes adultes</span>
          </div>

          <div className="bg-white rounded-2xl border border-fennec-cream/60 p-4 sm:p-5 shadow-xs">
            <span className="text-[10px] sm:text-[11px] font-bold text-fennec-dark/50 uppercase tracking-wider block">Prime Enfant (0-18)</span>
            <p className="font-display font-black text-purple-700 text-lg sm:text-xl mt-1">{data.avgChildPremium}</p>
            <span className="text-fennec-dark/60 text-xs mt-0.5 block">Dès le 3e enfant rabais</span>
          </div>
        </div>

        {/* Canton Regional Structure */}
        <div className="bg-white rounded-3xl border border-fennec-cream/60 p-6 sm:p-8 mb-10 shadow-xs space-y-4 text-left">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="font-display font-bold text-xl text-fennec-dark flex items-center gap-2">
              <Building className="w-5 h-5 text-fennec-terracotta" />
              Spécificités et régions de primes à {data.name}
            </h2>
            <span className="text-xs bg-fennec-cream/50 text-fennec-dark px-3 py-1 rounded-full font-bold">
              {data.regionsCount} région{data.regionsCount > 1 ? 's' : ''} de primes OFSP · {data.population}
            </span>
          </div>
          <p className="text-sm text-fennec-dark/75 leading-relaxed">
            {data.regionsDescription}
          </p>

          {/* Main Communes and NPA */}
          {data.mainCommunes && data.mainCommunes.length > 0 && (
            <div className="pt-2">
              <span className="text-xs font-bold text-fennec-dark/60 uppercase tracking-wider block mb-2">
                Principales communes et districts de {data.name} :
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {data.mainCommunes.map((commune, i) => (
                  <div key={i} className="bg-fennec-cream/20 border border-fennec-cream/50 rounded-xl p-3">
                    <div className="flex items-baseline justify-between gap-1">
                      <span className="font-display font-bold text-xs text-fennec-dark">{commune.name}</span>
                      <span className="text-[10px] font-mono text-fennec-terracotta font-bold">{commune.npa}</span>
                    </div>
                    {commune.description && (
                      <p className="text-[11px] text-fennec-dark/60 mt-1 line-clamp-1">{commune.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key cantonal points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
            {data.keyPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-2.5 bg-fennec-cream/25 p-3.5 rounded-xl border border-fennec-cream/40">
                <CheckCircle className="w-4 h-4 text-fennec-terracotta shrink-0 mt-0.5" />
                <span className="text-xs text-fennec-dark font-medium leading-normal">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cheapest Insurers Table */}
        {data.cheapestInsurers && data.cheapestInsurers.length > 0 && (
          <div className="bg-white rounded-3xl border border-fennec-cream/60 p-6 sm:p-8 mb-10 shadow-xs space-y-4 text-left">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="font-display font-bold text-xl text-fennec-dark flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-emerald-600" />
                Top caisses maladie les plus économiques à {data.name} (2026)
              </h2>
              <span className="text-xs text-fennec-dark/60">Estimations moyennes OFSP</span>
            </div>
            <p className="text-xs text-fennec-dark/70">
              Primes mensuelles indicatives par adulte (dès 26 ans) selon le modèle alternatif le plus avantageux :
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-fennec-cream/60 text-fennec-dark/60 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-2">Assureur</th>
                    <th className="py-3 px-2">Modèle</th>
                    <th className="py-3 px-2 text-emerald-700">Franchise 2'500</th>
                    <th className="py-3 px-2 text-fennec-terracotta">Franchise 300</th>
                    <th className="py-3 px-2 hidden sm:table-cell">Spécificité</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-fennec-cream/40">
                  {data.cheapestInsurers.map((ins, idx) => {
                    const insurerSlug = getInsurerSlug(ins.name);

                    return (
                      <tr key={idx} className="hover:bg-fennec-cream/20 transition-colors">
                        <td className="py-3 px-2 font-display font-bold text-fennec-dark">
                          <div className="flex items-center gap-1.5">
                            <span className="w-4 h-4 rounded-full bg-fennec-terracotta/15 text-fennec-terracotta text-[10px] flex items-center justify-center font-bold shrink-0">
                              {idx + 1}
                            </span>
                            {insurerSlug ? (
                              <a
                                href={`/fr/caisses-maladie/${insurerSlug}/`}
                                onClick={(e) => handleInternalLink(`/fr/caisses-maladie/${insurerSlug}/`, e)}
                                className="hover:text-fennec-terracotta hover:underline transition-colors"
                              >
                                {ins.name}
                              </a>
                            ) : (
                              <span>{ins.name}</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-2 text-fennec-dark/70 font-medium">{ins.model}</td>
                        <td className="py-3 px-2 font-bold text-emerald-700">{ins.adult2500}</td>
                        <td className="py-3 px-2 font-bold text-fennec-terracotta">{ins.adult300}</td>
                        <td className="py-3 px-2 text-fennec-dark/60 hidden sm:table-cell text-[11px]">{ins.highlight}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="pt-2 text-center sm:text-left">
              <button
                onClick={() => onStartComparison(data.code)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-fennec-terracotta hover:underline cursor-pointer"
              >
                Calculer ma prime personnalisée selon mon âge et mon NPA <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Franchise Guide and Break-Even Point */}
        {data.franchiseGuide && (
          <div className="bg-white rounded-3xl border border-fennec-cream/60 p-6 sm:p-8 mb-10 shadow-xs space-y-4 text-left">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="font-display font-bold text-xl text-fennec-dark flex items-center gap-2">
                <Scale className="w-5 h-5 text-blue-600" />
                Franchise 300 vs 2'500 dans le canton de {data.name}
              </h2>
              <a
                href="/fr/outils/calculateur-franchise/"
                onClick={(e) => handleInternalLink('/fr/outils/calculateur-franchise/', e)}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                Calculateur de franchise <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            <p className="text-sm text-fennec-dark/75 leading-relaxed">
              {data.franchiseGuide.intro}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60">
                <span className="text-xs font-bold text-amber-900 block mb-1">Franchise 300 (Soins fréquents)</span>
                <p className="text-xs text-amber-950/80 leading-relaxed">{data.franchiseGuide.recommendation300}</p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/60">
                <span className="text-xs font-bold text-emerald-900 block mb-1">Franchise 2'500 (Bonne santé)</span>
                <p className="text-xs text-emerald-950/80 leading-relaxed">{data.franchiseGuide.recommendation2500}</p>
              </div>
            </div>

            <div className="p-4 bg-fennec-cream/25 rounded-2xl border border-fennec-cream/50 flex items-center gap-3">
              <Activity className="w-5 h-5 text-fennec-terracotta shrink-0" />
              <div className="text-xs text-fennec-dark">
                <span className="font-bold">Point de bascule financier : </span>
                {data.franchiseGuide.breakEvenPoint}
              </div>
            </div>
          </div>
        )}

        {/* Alternative Models & Medical Networks */}
        {data.modelsGuide && (
          <div className="bg-white rounded-3xl border border-fennec-cream/60 p-6 sm:p-8 mb-10 shadow-xs space-y-4 text-left">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="font-display font-bold text-xl text-fennec-dark flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                Modèles d'assurance alternatifs à {data.name}
              </h2>
              <a
                href="/fr/lamal/modeles/"
                onClick={(e) => handleInternalLink('/fr/lamal/modeles/', e)}
                className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1"
              >
                Guide des modèles <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            <p className="text-sm text-fennec-dark/75 leading-relaxed">
              Pour réduire vos primes sans rogner sur la qualité des soins, les modèles alternatifs offrent des réductions substantielles :
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-fennec-cream/25 border border-fennec-cream/50">
                <div className="flex items-center gap-1.5 text-xs font-bold text-fennec-dark mb-1">
                  <PhoneCall className="w-3.5 h-3.5 text-fennec-terracotta" /> Telmed
                </div>
                <span className="text-emerald-700 font-bold text-xs">{data.modelsGuide.telmedSavings}</span>
                <p className="text-[11px] text-fennec-dark/60 mt-1">Appel téléphonique ou app avant consultation.</p>
              </div>

              <div className="p-4 rounded-2xl bg-fennec-cream/25 border border-fennec-cream/50">
                <div className="flex items-center gap-1.5 text-xs font-bold text-fennec-dark mb-1">
                  <UserCheck className="w-3.5 h-3.5 text-blue-600" /> Médecin de famille
                </div>
                <span className="text-emerald-700 font-bold text-xs">{data.modelsGuide.doctorFamilySavings}</span>
                <p className="text-[11px] text-fennec-dark/60 mt-1">Votre généraliste traitant coordonne vos soins.</p>
              </div>

              <div className="p-4 rounded-2xl bg-fennec-cream/25 border border-fennec-cream/50">
                <div className="flex items-center gap-1.5 text-xs font-bold text-fennec-dark mb-1">
                  <Building2 className="w-3.5 h-3.5 text-purple-600" /> Réseau de soins HMO
                </div>
                <span className="text-emerald-700 font-bold text-xs">{data.modelsGuide.hmoSavings}</span>
                <p className="text-[11px] text-fennec-dark/60 mt-1">Centres médicaux partenaires du canton.</p>
              </div>
            </div>

            {data.modelsGuide.localNetworks && data.modelsGuide.localNetworks.length > 0 && (
              <div className="pt-2">
                <span className="text-xs font-bold text-fennec-dark/60 uppercase tracking-wider block mb-1.5">
                  Réseaux de médecins actifs à {data.name} :
                </span>
                <div className="flex flex-wrap gap-2">
                  {data.modelsGuide.localNetworks.map((net, i) => (
                    <span key={i} className="px-2.5 py-1 bg-fennec-cream/40 rounded-lg text-xs text-fennec-dark font-medium border border-fennec-cream/60">
                      {net}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Subsidies & Cantonal Social Help */}
        <div className="bg-amber-50/80 border border-amber-200/90 rounded-3xl p-6 sm:p-8 mb-10 space-y-4 text-left shadow-xs">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-amber-900 font-display font-bold text-lg">
              <Award className="w-5 h-5 text-amber-700" />
              Subsides d'assurance maladie à {data.name} ({data.subsideAgency})
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`/fr/subsides/${data.slug}/`}
                onClick={(e) => handleInternalLink(`/fr/subsides/${data.slug}/`, e)}
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-200/80 hover:bg-amber-200 px-3.5 py-1.5 rounded-full transition-colors"
              >
                Guide subsides {data.name} <ArrowRight className="w-3 h-3" />
              </a>
              {data.subsideLink && (
                <a
                  href={data.subsideLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-white/80 hover:bg-white px-3 py-1.5 rounded-full border border-amber-300 transition-colors"
                >
                  Portail officiel <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
          
          <p className="text-xs sm:text-sm text-amber-950/85 leading-relaxed">
            {data.subsideDescription}
          </p>
          
          {data.subsideIncomeLimits && (
            <p className="text-xs text-amber-900/90 font-medium">
              <span className="font-bold">Critères d'octroi : </span>{data.subsideIncomeLimits}
            </p>
          )}
          
          <div className="pt-2 border-t border-amber-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-amber-900">Conseil Le Fennec Malin : </span>
              <span className="text-xs text-amber-950/80">
                Même si vous bénéficiez d'un subside cantonal, changer pour une caisse moins chère réduit le solde restant à votre charge.
              </span>
            </div>
            <a
              href="/fr/subsides/"
              onClick={(e) => handleInternalLink('/fr/subsides/', e)}
              className="text-xs font-bold text-amber-800 hover:underline shrink-0"
            >
              Tous les 26 cantons →
            </a>
          </div>
        </div>

        {/* 4 Golden Rules for Savings in Canton */}
        <div className="bg-white rounded-3xl border border-fennec-cream/60 p-6 sm:p-8 mb-10 shadow-xs space-y-4 text-left">
          <h2 className="font-display font-bold text-xl text-fennec-dark flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            4 règles d'or pour économiser sur sa prime à {data.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-fennec-cream/20 border border-fennec-cream/40">
              <span className="font-display font-bold text-xs text-fennec-dark block mb-1">1. Ajustez votre franchise</span>
              <p className="text-[11px] text-fennec-dark/70">Passez à CHF 2'500 si vous êtes en bonne santé pour économiser jusqu'à CHF 1'540/an.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-fennec-cream/20 border border-fennec-cream/40">
              <span className="font-display font-bold text-xs text-fennec-dark block mb-1">2. Passez au modèle alternatif</span>
              <p className="text-[11px] text-fennec-dark/70">Telmed ou Médecin de famille vous accordent 10% à 20% de rabais sur la prime de base.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-fennec-cream/20 border border-fennec-cream/40">
              <span className="font-display font-bold text-xs text-fennec-dark block mb-1">3. Suspendez la couverture accident</span>
              <p className="text-[11px] text-fennec-dark/70">Salarié(e) dès 8h/semaine, vous êtes déjà assuré(e) par la LAA de votre employeur.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-fennec-cream/20 border border-fennec-cream/40">
              <span className="font-display font-bold text-xs text-fennec-dark block mb-1">4. Déposez votre demande de subside</span>
              <p className="text-[11px] text-fennec-dark/70">Vérifiez vos droits auprès de {data.subsideAgency} pour alléger vos factures mensuelles.</p>
            </div>
          </div>
        </div>

        {/* How to Switch Insurance in Canton */}
        <div className="bg-white rounded-3xl border border-fennec-cream/60 p-6 sm:p-8 mb-10 shadow-xs space-y-4 text-left">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="font-display font-bold text-xl text-fennec-dark flex items-center gap-2">
              <Calendar className="w-5 h-5 text-fennec-terracotta" />
              Comment changer de caisse maladie à {data.name} ?
            </h2>
            <a
              href="/fr/lamal/changer-caisse-maladie/"
              onClick={(e) => handleInternalLink('/fr/lamal/changer-caisse-maladie/', e)}
              className="text-xs font-bold text-fennec-terracotta hover:underline flex items-center gap-1"
            >
              Guide de résiliation complet <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-fennec-dark/75 leading-relaxed">
            <p>
              Changer d'assureur LAMal est un droit garanti par la législation fédérale. Voici les règles essentielles pour les résidents de {data.name} :
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 bg-fennec-cream/25 rounded-xl border border-fennec-cream/40">
                <span className="font-bold text-xs text-fennec-dark block mb-1">1. Date limite : 30 Novembre</span>
                <p className="text-[11px] text-fennec-dark/70">Votre lettre de résiliation doit impérativement parvenir à votre assureur avant le 30 novembre à 17h.</p>
              </div>

              <div className="p-3.5 bg-fennec-cream/25 rounded-xl border border-fennec-cream/40">
                <span className="font-bold text-xs text-fennec-dark block mb-1">2. Aucune exclusion médicale</span>
                <p className="text-[11px] text-fennec-dark/70">En LAMal, la nouvelle caisse a l'obligation légale de vous accepter sans questionnaire de santé.</p>
              </div>

              <div className="p-3.5 bg-fennec-cream/25 rounded-xl border border-fennec-cream/40">
                <span className="font-bold text-xs text-fennec-dark block mb-1">3. Prestations 100% identiques</span>
                <p className="text-[11px] text-fennec-dark/70">Le panier de soins remboursés par la loi est strictement identique chez tous les assureurs suisses.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hospital Network in Canton */}
        {data.hospitals && data.hospitals.length > 0 && (
          <div className="bg-white rounded-3xl border border-fennec-cream/60 p-6 sm:p-8 mb-10 shadow-xs space-y-3 text-left">
            <h2 className="font-display font-bold text-lg text-fennec-dark flex items-center gap-2">
              <Hospital className="w-5 h-5 text-red-600" />
              Établissements hospitaliers et soins à {data.name}
            </h2>
            <p className="text-xs text-fennec-dark/70">
              En assurance obligatoire LAMal, vous avez libre accès à tous les hôpitaux publics et répertoriés figurant sur la liste hospitalière cantonale de {data.name} :
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {data.hospitals.map((hosp, i) => (
                <span key={i} className="px-3 py-1.5 bg-fennec-cream/25 border border-fennec-cream/60 rounded-xl text-xs font-semibold text-fennec-dark flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> {hosp}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Top Insurers in Canton */}
        <div className="bg-white rounded-3xl border border-fennec-cream/60 p-6 sm:p-8 mb-10 shadow-xs space-y-4 text-left">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="font-display font-bold text-xl text-fennec-dark flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Caisses maladie agréées actives à {data.name}
            </h2>
            <a
              href="/fr/caisses-maladie/"
              onClick={(e) => handleInternalLink('/fr/caisses-maladie/', e)}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              Annuaire des 37 caisses <ArrowRight className="w-3 h-3" />
            </a>
          </div>
          <p className="text-xs sm:text-sm text-fennec-dark/70 leading-relaxed">
            Les 37 caisses suisses agréées par l'Office fédéral de la santé publique (OFSP) sont tenues d'accepter chaque résident de {data.name}. Parmi les caisses les plus souscrites dans le canton :
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {data.popularInsurers.map(ins => {
              const insurerSlug = getInsurerSlug(ins);

              return insurerSlug ? (
                <a
                  key={ins}
                  href={`/fr/caisses-maladie/${insurerSlug}/`}
                  onClick={(e) => handleInternalLink(`/fr/caisses-maladie/${insurerSlug}/`, e)}
                  className="px-3 py-1.5 bg-fennec-cream/35 hover:bg-fennec-cream/70 border border-fennec-cream/70 rounded-lg text-xs font-semibold text-fennec-dark transition-colors flex items-center gap-1"
                >
                  {ins} <ArrowUpRight className="w-3 h-3 text-fennec-dark/40" />
                </a>
              ) : (
                <span key={ins} className="px-3 py-1.5 bg-fennec-cream/35 border border-fennec-cream/70 rounded-lg text-xs font-semibold text-fennec-dark">
                  {ins}
                </span>
              );
            })}
          </div>
        </div>

        {/* Cantons Cross Navigation Grid with Real Crawlable Links */}
        <div className="bg-fennec-cream/25 rounded-3xl border border-fennec-cream/60 p-6 sm:p-8 mb-10 space-y-4 text-left">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="font-display font-bold text-lg text-fennec-dark flex items-center gap-2">
              <MapPin className="w-4 h-4 text-fennec-terracotta" />
              Comparer l'assurance maladie dans les 26 cantons suisses
            </h2>
            <a
              href="/fr/assurance-maladie/"
              onClick={(e) => handleInternalLink('/fr/assurance-maladie/', e)}
              className="text-xs font-bold text-fennec-terracotta hover:underline"
            >
              Hub principal →
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {ALL_26_CANTONS.map(c => {
              const isCurrent = c.slug === data.slug;
              const linkHref = `/fr/assurance-maladie/${c.slug}/`;

              return (
                <a
                  key={c.code}
                  href={linkHref}
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey) return;
                    e.preventDefault();
                    if (onSelectCanton) {
                      onSelectCanton(c.slug);
                    } else if (onNavigate) {
                      onNavigate(linkHref);
                    }
                  }}
                  className={`p-2 rounded-xl text-xs font-bold text-left transition-all block ${
                    isCurrent 
                      ? 'bg-fennec-terracotta text-white shadow-xs pointer-events-none' 
                      : 'bg-white hover:bg-fennec-cream/60 text-fennec-dark border border-fennec-cream/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{c.name}</span>
                    <span className={`text-[10px] ml-1 font-mono ${isCurrent ? 'text-white/80' : 'text-fennec-dark/50'}`}>{c.code}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-12 text-left">
          <h2 className="font-display font-bold text-xl text-fennec-dark mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-fennec-terracotta" />
            Questions fréquentes sur l'assurance maladie à {data.name}
          </h2>
          <div className="space-y-3">
            {data.faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-fennec-cream/60 overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-sm text-fennec-dark hover:bg-fennec-cream/20 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {openFaq === i ? <ChevronUp className="w-4 h-4 shrink-0 text-fennec-terracotta" /> : <ChevronDown className="w-4 h-4 shrink-0 text-fennec-dark/40" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pt-1 text-xs text-fennec-dark/75 leading-relaxed border-t border-fennec-cream/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Semantic Internal Linking Silo */}
        <RelatedContent
          currentPath={`/fr/assurance-maladie/${data.slug}/`}
          topicType="canton"
          currentSlug={data.slug}
          onNavigate={(url) => onNavigate(url)}
          className="mb-10"
        />

        {/* 26 Cantons Cross-Linking Matrix */}
        <div className="mb-10">
          <CantonCrossLinks
            currentCantonSlug={data.slug}
            mode="health"
            onNavigate={(url) => onNavigate(url)}
          />
        </div>

        {/* Official Sources & Methodology Badge */}
        <div className="bg-fennec-cream/20 rounded-2xl border border-fennec-cream/60 p-5 mb-10 text-center space-y-2">
          <p className="text-xs text-fennec-dark/70">
            <strong>Sources officielles : </strong>
            Office fédéral de la santé publique (OFSP / BAG), base officielle Priminfo.admin.ch 2026, Service de la santé publique du canton de {data.name}.
          </p>
          <p className="text-[11px] text-fennec-dark/50">
            Contenu rédigé et vérifié par l'équipe d'experts en prévoyance et assurance maladie Le Fennec Malin · Conforme aux exigences FINMA et à l'article 45 LSA.
          </p>
        </div>

        {/* Final CTA Banner */}
        <div className="bg-linear-to-r from-fennec-dark to-fennec-brown text-white rounded-3xl p-8 text-center space-y-4 shadow-xl">
          <h3 className="font-display font-black text-2xl">
            Comparez les primes 2026 à {data.name} dès maintenant
          </h3>
          <p className="text-white/80 text-sm max-w-xl mx-auto leading-relaxed">
            Calculez votre tarif officiel pour votre code postal (NPA), votre tranche d'âge et votre modèle préféré en moins de 2 minutes.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onStartComparison(data.code)}
              className="bg-fennec-terracotta hover:bg-fennec-terracotta/90 text-white font-display font-bold px-8 py-3.5 rounded-full text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Lancer la comparaison à {data.name}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
