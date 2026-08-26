/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Shield,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Star,
  Building2,
  Users,
  FileText,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Smartphone,
  Calendar,
  AlertCircle,
  TrendingUp,
  Award,
  Clock,
  MapPin,
  HelpCircle,
  ExternalLink,
  Zap,
  Scale
} from 'lucide-react';
import SEOHead, { breadcrumbSchema, faqSchema, organizationSchema, financialServiceSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { InsurerSEOData } from '../data/insurersData';
import CompanyLogo from '../../components/CompanyLogo';
import { useLanguage } from '../../i18n/LanguageContext';
import { AppTab } from '../../types';
import { getLocalizedPath } from '../multilingualRoutes';
import RelatedContent from '../components/RelatedContent';
import InsurerCrossLinks from '../components/InsurerCrossLinks';
import CantonCrossLinks from '../components/CantonCrossLinks';

interface Props {
  insurer: InsurerSEOData;
  onStartComparison: () => void;
  onGoHome: () => void;
  onNavigate: (url: string) => void;
}

const SWISS_CANTONS_LIST = [
  { code: 'GE', name: 'Genève', slug: 'geneve' },
  { code: 'VD', name: 'Vaud', slug: 'vaud' },
  { code: 'VS', name: 'Valais', slug: 'valais' },
  { code: 'NE', name: 'Neuchâtel', slug: 'neuchatel' },
  { code: 'FR', name: 'Fribourg', slug: 'fribourg' },
  { code: 'JU', name: 'Jura', slug: 'jura' },
  { code: 'BE', name: 'Berne', slug: 'berne' },
  { code: 'ZH', name: 'Zurich', slug: 'zurich' },
  { code: 'BS', name: 'Bâle-Ville', slug: 'bale-ville' },
  { code: 'BL', name: 'Bâle-Campagne', slug: 'bale-campagne' },
  { code: 'TI', name: 'Tessin', slug: 'tessin' },
  { code: 'LU', name: 'Lucerne', slug: 'lucerne' },
  { code: 'SG', name: 'Saint-Gall', slug: 'saint-gall' },
  { code: 'AG', name: 'Argovie', slug: 'argovie' },
  { code: 'SO', name: 'Soleure', slug: 'soleure' },
  { code: 'TG', name: 'Thurgovie', slug: 'thurgovie' },
  { code: 'GR', name: 'Grisons', slug: 'grisons' },
  { code: 'SZ', name: 'Schwyz', slug: 'schwyz' },
  { code: 'ZG', name: 'Zoug', slug: 'zoug' },
  { code: 'SH', name: 'Schaffhouse', slug: 'schaffhouse' },
  { code: 'AR', name: 'Appenzell R.E.', slug: 'appenzell-rhodes-exterieures' },
  { code: 'AI', name: 'Appenzell R.I.', slug: 'appenzell-rhodes-interieures' },
  { code: 'GL', name: 'Glaris', slug: 'glaris' },
  { code: 'NW', name: 'Nidwald', slug: 'nidwald' },
  { code: 'OW', name: 'Obwald', slug: 'obwald' },
  { code: 'UR', name: 'Uri', slug: 'uri' }
];

export default function InsurerProfilePage({ insurer, onStartComparison, onGoHome, onNavigate }: Props) {
  const { language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedCantonCode, setSelectedCantonCode] = useState<string>(
    insurer.indicativePremiums2026?.[0]?.canton || 'GE'
  );
  const [showCancellationLetterModal, setShowCancellationLetterModal] = useState(false);

  const selectedCantonData = insurer.indicativePremiums2026?.find(
    (p) => p.canton === selectedCantonCode
  ) || insurer.indicativePremiums2026?.[0];

  const structured = [
    organizationSchema,
    financialServiceSchema(
      insurer.name,
      insurer.tagline,
      `/caisses-maladie/${insurer.slug}/`
    ),
    {
      '@context': 'https://schema.org',
      '@type': 'AggregateRating',
      itemReviewed: {
        '@type': 'FinancialService',
        name: insurer.name,
        image: 'https://www.lefennecmalin.ch/og-image.png'
      },
      ratingValue: insurer.satisfactionRating.toString(),
      bestRating: '6',
      worstRating: '1',
      ratingCount: '1540'
    },
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'Caisses Maladie', url: '/fr/caisses-maladie/' },
      { name: insurer.name, url: `/fr/caisses-maladie/${insurer.slug}/` }
    ]),
    faqSchema(insurer.faqs)
  ];

  return (
    <>
      <SEOHead
        tab={`insurer-${insurer.slug}` as AppTab}
        language={language}
        title={`${insurer.name} — Primes 2026, Modèles LAMal, Avis & Comparatif | Le Fennec Malin`}
        description={insurer.metaDescription}
        structuredData={structured}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: onGoHome },
            { label: 'Caisses Maladie', onClick: () => onNavigate('/fr/caisses-maladie/') },
            { label: insurer.name }
          ]}
        />

        {/* 1. HERO HEADER CARD */}
        <div id={`insurer-hero-${insurer.slug}`} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-stone-100">
            <div className="flex items-start sm:items-center gap-4">
              <CompanyLogo id={insurer.slug || insurer.id || insurer.name} className="w-16 h-16 sm:w-20 sm:h-20 shrink-0" />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
                    {insurer.name}
                  </h1>
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Agréé OFSP ({insurer.bagRegistration})
                  </span>
                </div>
                <p className="text-stone-600 text-sm mt-1.5 font-medium">
                  {insurer.tagline}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500 mt-2">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-stone-400" />
                    Siège : {insurer.headquarters} ({insurer.cantonHq})
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    Fondation : {insurer.foundedYear}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-stone-400" />
                    {insurer.membersCount}
                  </span>
                </div>
              </div>
            </div>

            <button
              id={`btn-hero-compare-${insurer.slug}`}
              onClick={onStartComparison}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-fennec-terracotta hover:bg-fennec-rust text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-all hover:scale-[1.02] shrink-0"
            >
              <span>Calculer vos primes {insurer.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 6 Essential Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 pt-6">
            <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-100">
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">Satisfaction</div>
              <div className="flex items-center gap-1 text-stone-900 font-extrabold text-lg">
                <span>{insurer.satisfactionRating}</span>
                <span className="text-xs text-stone-400 font-normal">/ 6.0</span>
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              </div>
              <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">Top benchmark</div>
            </div>

            <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-100">
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">Évolution 2026</div>
              <div className="text-stone-900 font-extrabold text-base leading-tight">
                {insurer.evolution2026.split(' ')[0]}
              </div>
              <div className="text-[10px] text-stone-500 mt-0.5">Moyenne suisse</div>
            </div>

            <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-100">
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">Solvabilité</div>
              <div className="text-emerald-700 font-extrabold text-base leading-tight">
                {insurer.reservesRatio.split(' ')[0]}
              </div>
              <div className="text-[10px] text-stone-500 mt-0.5">Réserves OFSP</div>
            </div>

            <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-100">
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">Remboursement</div>
              <div className="text-stone-900 font-extrabold text-base leading-tight">
                {insurer.reimbursementSpeed.split(' ')[0]} {insurer.reimbursementSpeed.split(' ')[1]}
              </div>
              <div className="text-[10px] text-stone-500 mt-0.5">Délai moyen</div>
            </div>

            <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-100">
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">App Mobile</div>
              <div className="flex items-center gap-1 text-stone-900 font-extrabold text-base">
                <span>{insurer.appRating?.appStore || 4.7}</span>
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              </div>
              <div className="text-[10px] text-stone-500 mt-0.5">{insurer.appRating?.name || 'Application'}</div>
            </div>

            <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-100">
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">Rabais Max</div>
              <div className="text-emerald-700 font-extrabold text-lg">
                -22%
              </div>
              <div className="text-[10px] text-stone-500 mt-0.5">Modèles alternatifs</div>
            </div>
          </div>
        </div>

        {/* 2. 2026 INDICATIVE CANTONAL PREMIUMS (INTERACTIVE WIDGET) */}
        {insurer.indicativePremiums2026 && insurer.indicativePremiums2026.length > 0 && (
          <div id={`premiums-widget-${insurer.slug}`} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-fennec-terracotta" />
                  Primes indicatives 2026 de {insurer.name} par canton
                </h2>
                <p className="text-stone-500 text-sm mt-1">
                  Tarifs mensuels indicatifs de base LAMal (adulte, jeune adulte et enfant) selon la franchise choisie.
                </p>
              </div>

              {/* Canton selector pills */}
              <div className="flex flex-wrap gap-1.5 max-w-md">
                {insurer.indicativePremiums2026.map((p) => (
                  <button
                    key={p.canton}
                    onClick={() => setSelectedCantonCode(p.canton)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      selectedCantonCode === p.canton
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {p.canton} — {p.cantonName}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Canton Rate Card */}
            {selectedCantonData && (
              <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-200">
                  <div className="flex items-center gap-2">
                    <span className="bg-fennec-terracotta text-white text-xs font-extrabold px-2.5 py-1 rounded-md">
                      Canton {selectedCantonData.canton}
                    </span>
                    <span className="font-bold text-stone-900 text-base">
                      {selectedCantonData.cantonName}
                    </span>
                  </div>
                  <div className="text-xs text-stone-500 font-medium">
                    Primes standard modèle de base (sans couverture accident)
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white p-3.5 rounded-lg border border-stone-200">
                    <div className="text-xs text-stone-500 font-medium mb-1">Adulte (Franchise 300)</div>
                    <div className="text-stone-900 font-extrabold text-lg">
                      CHF {selectedCantonData.adult300.toFixed(2)}
                      <span className="text-xs font-normal text-stone-500"> /mois</span>
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">Franchise minimale</div>
                  </div>

                  <div className="bg-white p-3.5 rounded-lg border border-stone-200">
                    <div className="text-xs text-stone-500 font-medium mb-1">Adulte (Franchise 2500)</div>
                    <div className="text-emerald-700 font-extrabold text-lg">
                      CHF {selectedCantonData.adult2500.toFixed(2)}
                      <span className="text-xs font-normal text-stone-500"> /mois</span>
                    </div>
                    <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                      Économie CHF {((selectedCantonData.adult300 - selectedCantonData.adult2500) * 12).toFixed(0)}/an
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-lg border border-stone-200">
                    <div className="text-xs text-stone-500 font-medium mb-1">Jeune adulte (19-25 ans)</div>
                    <div className="text-stone-900 font-extrabold text-lg">
                      CHF {selectedCantonData.youngAdult300.toFixed(2)}
                      <span className="text-xs font-normal text-stone-500"> /mois</span>
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">Franchise 300</div>
                  </div>

                  <div className="bg-white p-3.5 rounded-lg border border-stone-200">
                    <div className="text-xs text-stone-500 font-medium mb-1">Enfant (0-18 ans)</div>
                    <div className="text-stone-900 font-extrabold text-lg">
                      CHF {selectedCantonData.child0.toFixed(2)}
                      <span className="text-xs font-normal text-stone-500"> /mois</span>
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">Franchise 0 (légale)</div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm text-emerald-950 font-medium">
                  Les modèles alternatifs (Telmed, Médecin de famille, Réseau HMO) permettent de réduire ces montants de <strong>12% à 22%</strong> supplémentaires.
                </span>
              </div>
              <button
                onClick={onStartComparison}
                className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 rounded-lg shrink-0 transition-colors"
              >
                <span>Calculer avec mon adresse</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* 3. IN-DEPTH PRESENTATION & GOVERNANCE */}
        <div id={`overview-${insurer.slug}`} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-fennec-terracotta" />
            Histoire, structure et gouvernance de {insurer.name}
          </h2>
          <div className="prose prose-stone max-w-none text-stone-700 text-sm sm:text-base leading-relaxed space-y-4">
            <p>{insurer.overview}</p>
            {insurer.historyAndGovernance && (
              <p>{insurer.historyAndGovernance}</p>
            )}
          </div>
        </div>

        {/* 4. LAMAL ALTERNATIVE CARE MODELS */}
        <div id={`models-${insurer.slug}`} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
              <Shield className="w-6 h-6 text-fennec-terracotta" />
              Modèles d'assurance de base (LAMal) de {insurer.name}
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              Tous les modèles LAMal couvrent exactement le même catalogue légal de prestations médicales défini par la loi fédérale. Seules les modalités d'accès au médecin diffèrent en échange d'une réduction de prime.
            </p>
          </div>

          {/* Model Detailed Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {insurer.alternativeCareModels && insurer.alternativeCareModels.length > 0 ? (
              insurer.alternativeCareModels.map((model, idx) => (
                <div key={idx} className="bg-stone-50 rounded-xl p-5 border border-stone-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                        <span>{model.name}</span>
                      </h3>
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-1 rounded-full border border-emerald-200">
                        {model.discount}
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs text-stone-600 mb-4">
                      <div>
                        <strong className="text-stone-800">Premier contact :</strong> {model.firstContact}
                      </div>
                      <div>
                        <strong className="text-stone-800">Urgences :</strong> {model.emergencyRule}
                      </div>
                      <div>
                        <strong className="text-stone-800">Pharmacie :</strong> {model.pharmacyNetwork}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-200">
                    <div className="text-[11px] font-bold text-stone-700 mb-1.5 uppercase tracking-wide">Avantages clés :</div>
                    <ul className="space-y-1">
                      {model.pros.map((pro, pIdx) => (
                        <li key={pIdx} className="text-[12px] text-stone-600 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              insurer.lamalModels.map((model, idx) => (
                <div key={idx} className="bg-stone-50 rounded-xl p-5 border border-stone-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-stone-900 text-base">{model.name}</h3>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-1 rounded-full">
                      Rabais {model.discountPercent}
                    </span>
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed">{model.description}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 5. STRENGTHS & WEAKNESSES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-emerald-50/70 rounded-2xl border border-emerald-200 p-6">
            <h3 className="text-lg font-bold text-emerald-950 flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Points forts & Avantages de {insurer.name}
            </h3>
            <ul className="space-y-2.5">
              {insurer.strengths.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-emerald-900 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2 mb-4">
              <XCircle className="w-5 h-5 text-stone-400" />
              Points de vigilance & Inconvénients
            </h3>
            <ul className="space-y-2.5">
              {insurer.weaknesses.map((w, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-stone-700 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2 shrink-0" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 6. LCA COMPLEMENTARY PRODUCTS */}
        <div id={`lca-${insurer.slug}`} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-fennec-terracotta" />
            Assurances complémentaires (LCA) proposées par {insurer.name}
          </h2>
          <p className="text-stone-500 text-sm mb-6">
            Complétez la couverture de base avec des garanties adaptées : confort d'hospitalisation, médecines douces, lunettes, soins dentaires et assistance à l'étranger.
          </p>

          {insurer.lcaCategories && insurer.lcaCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {insurer.lcaCategories.map((cat, idx) => (
                <div key={idx} className="bg-stone-50 p-5 rounded-xl border border-stone-200 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-stone-900 text-base mb-2">{cat.title}</h3>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {cat.products.map((p, pIdx) => (
                        <span key={pIdx} className="bg-white text-stone-700 text-[11px] font-semibold px-2 py-0.5 rounded border border-stone-200">
                          {p}
                        </span>
                      ))}
                    </div>
                    <p className="text-stone-600 text-xs leading-relaxed mb-4">{cat.description}</p>
                  </div>
                  <div className="pt-3 border-t border-stone-200 text-xs font-bold text-emerald-700">
                    Plafond : {cat.maxCoverage}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3 mb-6">
              {insurer.lcaHighlights.map((hl, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-stone-50 p-3.5 rounded-xl border border-stone-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-stone-800 text-sm">{hl}</span>
                </div>
              ))}
            </div>
          )}

          {/* Digital Services & Apps */}
          <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-stone-400" />
                Applications & Outils digitaux {insurer.name}
              </div>
              <div className="flex flex-wrap gap-2">
                {insurer.digitalTools.map((tool, idx) => (
                  <span key={idx} className="bg-stone-100 text-stone-700 text-xs font-medium px-3 py-1.5 rounded-lg border border-stone-200">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {insurer.appRating && (
              <div className="bg-stone-50 px-4 py-3 rounded-xl border border-stone-200 flex items-center gap-3 shrink-0">
                <div className="text-center">
                  <div className="text-xs text-stone-500 font-semibold">App Store</div>
                  <div className="text-stone-900 font-extrabold text-sm">{insurer.appRating.appStore} / 5</div>
                </div>
                <div className="h-6 w-px bg-stone-200" />
                <div className="text-center">
                  <div className="text-xs text-stone-500 font-semibold">Google Play</div>
                  <div className="text-stone-900 font-extrabold text-sm">{insurer.appRating.googlePlay} / 5</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 7. HEAD-TO-HEAD COMPETITOR COMPARISONS */}
        {insurer.competitorComparisons && insurer.competitorComparisons.length > 0 && (
          <div id={`compare-${insurer.slug}`} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 mb-8">
            <h2 className="text-xl font-bold text-stone-900 mb-2 flex items-center gap-2">
              <Scale className="w-5 h-5 text-fennec-terracotta" />
              Comparatif direct : {insurer.name} face aux autres caisses
            </h2>
            <p className="text-stone-500 text-sm mb-6">
              Comparez les forces relatives de {insurer.name} face aux principaux acteurs du marché suisse.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insurer.competitorComparisons.map((comp, idx) => (
                <div key={idx} className="bg-stone-50 rounded-xl p-5 border border-stone-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <CompanyLogo id={comp.competitorSlug || comp.competitorName} className="w-10 h-10 shrink-0" />
                      <h3 className="font-bold text-stone-900 text-base">
                        {insurer.name} vs {comp.competitorName}
                      </h3>
                    </div>
                    <button
                      onClick={() => onNavigate(`/fr/caisses-maladie/${comp.competitorSlug}/`)}
                      className="text-xs text-fennec-terracotta font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Profil {comp.competitorName}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="space-y-2 text-xs text-stone-600 mt-3">
                    <div>
                      <strong className="text-stone-800">Différence clé :</strong> {comp.keyDifference}
                    </div>
                    <div>
                      <strong className="text-stone-800">Comparatif de prix :</strong> {comp.priceComparison}
                    </div>
                    <div>
                      <strong className="text-stone-800">Public cible recommandé :</strong> {comp.targetAudience}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. SWITCHING & CANCELLATION GUIDE */}
        <div id={`resiliation-${insurer.slug}`} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-fennec-terracotta" />
                Comment résilier ou changer votre assurance chez {insurer.name} ?
              </h2>
              <p className="text-stone-500 text-sm mt-0.5">
                Procédure légale conforme à la loi fédérale sur l'assurance-maladie (LAMal).
              </p>
            </div>

            <button
              onClick={() => setShowCancellationLetterModal(!showCancellationLetterModal)}
              className="inline-flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shrink-0 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Modèle de lettre de résiliation</span>
            </button>
          </div>

          <div className="bg-amber-50/70 rounded-xl p-4 border border-amber-200 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-900">
              <strong>Échéance légale impérative :</strong> Votre courrier recommandé de résiliation LAMal doit être réceptionné par {insurer.name} au plus tard le <strong>{insurer.switchingTips?.deadline || '30 novembre'}</strong>. Le cachet de la poste ne fait pas foi le dernier jour : privilégiez un envoi avant le 20 novembre.
            </div>
          </div>

          {showCancellationLetterModal && (
            <div className="bg-stone-100 p-5 rounded-xl border border-stone-300 mb-6 text-xs text-stone-800 font-mono space-y-2">
              <div className="font-bold text-stone-900 font-sans text-sm mb-2">Exemple de lettre de résiliation LAMal pour {insurer.name} :</div>
              <div>[Vos Prénom, Nom et Adresse complète]</div>
              <div>N° d'assuré / N° de police : [Votre Numéro d'Assuré {insurer.name}]</div>
              <div className="pt-2">À l'attention de :</div>
              <div className="font-semibold">{insurer.switchingTips?.address || insurer.name}</div>
              <div className="pt-2">Objet : Résiliation de mon assurance de base LAMal au 31 décembre 2026</div>
              <div className="pt-2">Madame, Monsieur,</div>
              <div>Par la présente, je vous informe de ma décision de résilier mon contrat d'assurance obligatoire des soins (LAMal) auprès de votre compagnie pour le 31 décembre 2026.</div>
              <div>Je vous remercie de bien vouloir me confirmer par écrit la bonne réception de ma résiliation ainsi que la date d'échéance de mon contrat.</div>
              <div className="pt-2">Avec mes salutations distinguées,</div>
              <div>[Signature]</div>
            </div>
          )}

          <div className="space-y-2">
            {insurer.switchingTips?.advice.map((adv, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{adv}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 9. CANTONAL DIRECTORY LINKS */}
        <div className="mb-8">
          <CantonCrossLinks
            mode="health"
            onNavigate={(url) => onNavigate(url)}
          />
        </div>

        {/* 10. FREQUENTLY ASKED QUESTIONS */}
        <div id={`faqs-${insurer.slug}`} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-fennec-terracotta" />
            Questions fréquentes sur {insurer.name} (FAQ 2026)
          </h2>
          <div className="space-y-3">
            {insurer.faqs.map((faq, idx) => (
              <div key={idx} className="border border-stone-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-stone-900 hover:bg-stone-50 transition-colors text-sm sm:text-base"
                >
                  <span className="pr-4">{faq.question}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-stone-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-stone-600 text-sm leading-relaxed border-t border-stone-100 pt-3 bg-stone-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Semantic Internal Linking Silo */}
        <RelatedContent
          currentPath={`/fr/caisses-maladie/${insurer.slug}/`}
          topicType="insurer"
          currentSlug={insurer.slug}
          onNavigate={(url) => onNavigate(url)}
          className="mb-8"
        />

        {/* 37 Swiss Insurers Matrix */}
        <div className="mb-8">
          <InsurerCrossLinks
            currentInsurerSlug={insurer.slug}
            onNavigate={(url) => onNavigate(url)}
          />
        </div>

        {/* 11. BOTTOM CTA BANNER */}
        <div className="bg-gradient-to-br from-stone-900 to-stone-800 text-white rounded-2xl p-8 text-center shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Comparez en direct les primes 2026 de {insurer.name}
          </h2>
          <p className="text-stone-300 max-w-2xl mx-auto mb-6 text-sm sm:text-base">
            Trouvez instantanément l'offre la plus avantageuse pour votre famille parmi les 37 caisses maladie agréées en Suisse.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartComparison}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-fennec-terracotta hover:bg-fennec-rust text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              <span>Lancer le comparateur neutre</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href={getLocalizedPath('hub-insurers', language)}
              onClick={(e) => { e.preventDefault(); onNavigate(getLocalizedPath('hub-insurers', language)); }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-4 rounded-xl border border-white/20 transition-colors text-sm"
            >
              <span>Voir toutes les caisses maladie</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
