/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Central Canton & Swiss Health Insurance Hub (/assurance-maladie/)
 * Authoritative master index for all 26 Swiss cantons and official 2026 LAMal premiums.
 */

import React, { useState, useMemo } from 'react';
import { 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Search, 
  TrendingDown, 
  Scale, 
  Award, 
  Building2, 
  Hospital, 
  FileText, 
  Clock, 
  ExternalLink,
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import SEOHead, { breadcrumbSchema, faqSchema, organizationSchema, financialServiceSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { ALL_26_CANTONS, CANTONS_SEO_DATA } from '../data/cantonsData';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  onStartComparison: (cantonCode?: string) => void;
  onGoHome: () => void;
  onNavigate?: (url: string) => void;
  onSelectCanton?: (cantonSlug: string) => void;
}

const FAQS = [
  {
    question: "Pourquoi les primes d'assurance maladie varient-elles d'un canton à l'autre en Suisse ?",
    answer: "Les primes LAMal ne sont pas fixées au niveau national mais par canton (et parfois par région de primes au sein d'un même canton). Elles reflètent directement les coûts de la santé effectifs supportés par chaque canton : densité hospitalière, recours aux spécialistes, consommation médicale par habitant et démographie locale. Ainsi, des cantons urbains comme Genève ou Bâle-Ville ont des primes nettement plus élevées que des cantons comme Appenzell ou le Valais."
  },
  {
    question: "Quelle est la différence entre l'assurance de base (LAMal) et les complémentaires (LCA) ?",
    answer: "L'assurance de base (LAMal) est obligatoire pour toute personne résidant en Suisse. Le catalogue des prestations remboursées est strictement défini par la loi fédérale et identique auprès des 37 caisses maladie agréées. Les assurances complémentaires (LCA) sont facultatives et soumises à un questionnaire médical : elles couvrent des prestations de confort et de prévention (médecines douces, lunettes, soins dentaires, division semi-privée ou privée à l'hôpital)."
  },
  {
    question: "Comment choisir entre la franchise de CHF 300 et la franchise de CHF 2'500 ?",
    answer: "La règle financière est simple : si vos frais médicaux annuels prévus (consultations, médicaments, examens) sont inférieurs à environ CHF 1'800 par an, la franchise maximale de CHF 2'500 est la plus rentable (économie de primes jusqu'à CHF 1'540/an). Si vos dépenses médicales dépassent CHF 2'000 par an ou en cas de maladie chronique, la franchise minimale de CHF 300 est indispensable pour minimiser votre participation aux coûts."
  },
  {
    question: "Comment changer de caisse maladie en Suisse et quel est le délai légal ?",
    answer: "Le délai légal et impératif de résiliation est le 30 novembre à 17h00 (ou dernier jour ouvrable) pour une prise d'effet au 1er janvier de l'année suivante. La lettre de résiliation doit parvenir à votre assureur actuel avant cette échéance. Pour l'assurance de base LAMal, la nouvelle caisse a l'obligation légale de vous accepter sans aucun questionnaire de santé ni réserve médicale."
  },
  {
    question: "Qu'est-ce qu'un modèle d'assurance alternatif (Telmed, Médecin de famille, HMO) ?",
    answer: "En échange d'une réduction de prime mensuelle de 5% à 25%, vous acceptez de restreindre votre premier contact médical : téléconsultation obligatoire avant tout rendez-vous (Telmed), passage obligatoire par votre généraliste désigné (Médecin de famille), ou consultation au sein d'un centre médical partenaire (Réseau HMO). En cas d'urgence vitale, la consultation directe reste garantie sans restriction."
  },
  {
    question: "Qui a droit aux subsides cantonaux de réduction des primes (IPV / RIP) ?",
    answer: "Chaque canton suisse dispose d'un système de réduction individuelle des primes destiné aux ménages, célibataires et familles à revenu modeste ou moyen. L'octroi dépend du revenu déterminant unifié (RDU) ou du revenu imposable. Selon le canton, la démarche est automatique via la déclaration fiscale ou nécessite le dépôt d'un formulaire avant le délai légal (souvent le 30 novembre ou le 31 décembre)."
  },
  {
    question: "Peut-on être refusé par une caisse maladie en Suisse ?",
    answer: "Non, pour l'assurance obligatoire des soins (LAMal), aucune caisse agréée n'a le droit de refuser un résident en Suisse, quel que soit son âge, son état de santé ou ses antécédents médicaux (art. 4 LAMal). En revanche, pour les assurances complémentaires (LCA), les assureurs sont totalement libres d'émettre des réserves médicales ou de refuser une demande."
  },
  {
    question: "Dois-je payer la couverture accident dans mon assurance maladie si je travaille ?",
    answer: "Si vous travaillez au moins 8 heures par semaine chez le même employeur, vous êtes automatiquement couvert contre les accidents professionnels et non professionnels par l'assurance accidents obligatoire de votre entreprise (LAA). Vous pouvez donc suspendre la couverture accidents de votre police LAMal pour économiser immédiatement environ 7% sur votre prime mensuelle."
  }
];

export default function AssuranceMaladie({ onStartComparison, onGoHome, onNavigate, onSelectCanton }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'romandie' | 'alemanique' | 'tessin'>('all');
  const { language } = useLanguage();

  const filteredCantons = useMemo(() => {
    return ALL_26_CANTONS.filter(c => {
      const matchesSearch = 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.region.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedRegion === 'romandie') {
        return c.region.includes('Romandie');
      } else if (selectedRegion === 'alemanique') {
        return !c.region.includes('Romandie') && !c.region.includes('Tessin');
      } else if (selectedRegion === 'tessin') {
        return c.region.includes('Tessin');
      }

      return true;
    });
  }, [searchTerm, selectedRegion]);

  const handleCantonClick = (slug: string, code: string, e?: React.MouseEvent) => {
    if (e && (e.metaKey || e.ctrlKey)) return;
    if (e) e.preventDefault();

    if (onNavigate) {
      onNavigate(`/fr/assurance-maladie/${slug}/`);
    } else if (onSelectCanton) {
      onSelectCanton(slug);
    } else {
      onStartComparison(code);
    }
  };

  const structured = [
    organizationSchema,
    financialServiceSchema(
      "Comparateur d'Assurance Maladie Suisse 2026",
      "Comparateur officiel et indépendant des primes d'assurance maladie dans les 26 cantons suisses. Données certifiées OFSP / Priminfo.",
      "/assurance-maladie/"
    ),
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'Assurance Maladie', url: '/assurance-maladie/' },
    ]),
    faqSchema(FAQS),
  ];

  return (
    <>
      <SEOHead
        tab="seo-maladie"
        language={language}
        structuredData={structured}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: onGoHome },
            { label: 'Assurance Maladie Suisse (LAMal 2026)' },
          ]}
        />

        {/* Hero Section */}
        <div className="mb-10 text-left">
          <div className="inline-flex items-center gap-2 bg-fennec-terracotta/10 text-fennec-terracotta text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
            <Shield className="w-3.5 h-3.5" />
            Portail Officiel des Primes LAMal 2026 · 26 Cantons Suisses
          </div>
          
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-fennec-dark mb-4 leading-tight">
            Assurance Maladie Suisse 2026 : Comparatif des 26 Cantons & Primes Officielles
          </h1>
          
          <p className="text-fennec-dark/75 text-base sm:text-lg leading-relaxed mb-6 max-w-3xl">
            En Suisse, les prestations de l'assurance de base obligatoire (LAMal) sont <strong>100% identiques par la loi</strong> dans les 37 caisses agréées. Cependant, les primes mensuelles varient drastiquement selon votre canton de résidence, votre commune (NPA), votre tranche d'âge et votre modèle de soins.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onStartComparison()}
              className="inline-flex items-center gap-2 bg-fennec-terracotta text-white font-display font-bold px-8 py-4 rounded-full shadow-md hover:bg-fennec-terracotta/90 transition-all active:scale-95 text-sm uppercase tracking-wider cursor-pointer"
            >
              Calculer mes primes 2026
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="/fr/subsides/"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey) return;
                e.preventDefault();
                if (onNavigate) onNavigate('/fr/subsides/');
              }}
              className="inline-flex items-center gap-2 bg-amber-50 text-amber-900 border border-amber-300/80 font-display font-bold px-6 py-4 rounded-full hover:bg-amber-100/70 transition-all text-sm cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-700" />
              Guide des Subsides 2026
            </a>
          </div>
        </div>

        {/* Quick Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-12">
          <div className="bg-white rounded-2xl border border-fennec-cream/60 p-4 sm:p-5 shadow-xs">
            <span className="text-[10px] sm:text-[11px] font-bold text-fennec-dark/50 uppercase tracking-wider block">Cantons Répertoriés</span>
            <p className="font-display font-black text-fennec-dark text-xl sm:text-2xl mt-1">26 Cantons</p>
            <span className="text-fennec-dark/60 text-xs mt-0.5 block">100% du territoire suisse</span>
          </div>

          <div className="bg-white rounded-2xl border border-fennec-cream/60 p-4 sm:p-5 shadow-xs">
            <span className="text-[10px] sm:text-[11px] font-bold text-fennec-dark/50 uppercase tracking-wider block">Caisses Agréées</span>
            <p className="font-display font-black text-fennec-terracotta text-xl sm:text-2xl mt-1">37 Assureurs</p>
            <span className="text-fennec-dark/60 text-xs mt-0.5 block">Sous surveillance OFSP</span>
          </div>

          <div className="bg-white rounded-2xl border border-fennec-cream/60 p-4 sm:p-5 shadow-xs">
            <span className="text-[10px] sm:text-[11px] font-bold text-fennec-dark/50 uppercase tracking-wider block">Données Primes</span>
            <p className="font-display font-black text-emerald-700 text-xl sm:text-2xl mt-1">Tarifs 2026</p>
            <span className="text-fennec-dark/60 text-xs mt-0.5 block">Certifiées Priminfo</span>
          </div>

          <div className="bg-white rounded-2xl border border-fennec-cream/60 p-4 sm:p-5 shadow-xs">
            <span className="text-[10px] sm:text-[11px] font-bold text-fennec-dark/50 uppercase tracking-wider block">Économies Max.</span>
            <p className="font-display font-black text-blue-700 text-xl sm:text-2xl mt-1">CHF 1'540.-</p>
            <span className="text-fennec-dark/60 text-xs mt-0.5 block">Par an et par adulte</span>
          </div>
        </div>

        {/* 26-Canton Interactive Search & Directory Hub */}
        <div className="bg-white rounded-3xl border border-fennec-cream/70 p-6 sm:p-8 mb-12 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-display font-bold text-2xl text-fennec-dark flex items-center gap-2">
                <MapPin className="w-6 h-6 text-fennec-terracotta" />
                Sélectionnez votre canton de résidence
              </h2>
              <p className="text-xs sm:text-sm text-fennec-dark/70 mt-1">
                Accédez aux primes moyennes 2026, au classement des caisses les moins chères et aux subsides de votre canton :
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-fennec-dark/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher (ex: Vaud, GE, Zurich)..."
                className="w-full pl-9.5 pr-4 py-2.5 bg-fennec-cream/30 border border-fennec-cream/70 rounded-full text-xs text-fennec-dark placeholder:text-fennec-dark/40 focus:outline-hidden focus:ring-2 focus:ring-fennec-terracotta/30"
              />
            </div>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-b border-fennec-cream/40 pb-4">
            <span className="text-xs font-bold text-fennec-dark/50 uppercase tracking-wider mr-2">Filtre :</span>
            {[
              { id: 'all', label: 'Tous les 26 cantons' },
              { id: 'romandie', label: 'Suisse Romande' },
              { id: 'alemanique', label: 'Suisse Alémanique' },
              { id: 'tessin', label: 'Tessin (Suisse Italienne)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedRegion(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedRegion === tab.id
                    ? 'bg-fennec-dark text-white'
                    : 'bg-fennec-cream/30 text-fennec-dark/70 hover:bg-fennec-cream/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Canton Cards Grid with Real Crawlable Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
            {filteredCantons.map((c) => {
              const data = CANTONS_SEO_DATA[c.slug];
              if (!data) return null;
              const linkHref = `/fr/assurance-maladie/${c.slug}/`;

              return (
                <a
                  key={c.code}
                  href={linkHref}
                  onClick={(e) => handleCantonClick(c.slug, c.code, e)}
                  className="group bg-fennec-cream/15 hover:bg-white border border-fennec-cream/60 hover:border-fennec-terracotta/40 rounded-2xl p-4 transition-all duration-200 shadow-2xs hover:shadow-md block text-left"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="font-display font-black text-base text-fennec-dark group-hover:text-fennec-terracotta transition-colors flex items-center gap-1.5">
                        {data.name}
                        <span className="text-xs font-mono font-bold bg-fennec-cream/60 text-fennec-dark/70 px-2 py-0.5 rounded-md">
                          {data.code}
                        </span>
                      </span>
                      <span className="text-[11px] text-fennec-dark/50 block mt-0.5">{c.region}</span>
                    </div>
                    <span className="p-1.5 rounded-full bg-fennec-cream/40 group-hover:bg-fennec-terracotta group-hover:text-white text-fennec-dark/60 transition-all shrink-0">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-fennec-cream/40 text-xs">
                    <div>
                      <span className="text-[10px] text-fennec-dark/50 uppercase font-semibold block">Franchise 300</span>
                      <span className="font-display font-bold text-fennec-terracotta text-xs">{data.avgAdultPremium300}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-fennec-dark/50 uppercase font-semibold block">Franchise 2'500</span>
                      <span className="font-display font-bold text-emerald-700 text-xs">{data.avgAdultPremium2500}</span>
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-fennec-dark/60">
                    <span className="truncate max-w-[170px]">{data.subsideAgency}</span>
                    <span className="text-fennec-terracotta font-bold group-hover:underline">Voir les tarifs →</span>
                  </div>
                </a>
              );
            })}
          </div>

          {filteredCantons.length === 0 && (
            <div className="text-center py-8 text-fennec-dark/60 text-sm">
              Aucun canton ne correspond à votre recherche "{searchTerm}".
            </div>
          )}
        </div>

        {/* Deep-Dive Educational Section: Why Canton Premiums Differ */}
        <div className="bg-white rounded-3xl border border-fennec-cream/60 p-6 sm:p-8 mb-12 shadow-xs space-y-5">
          <h2 className="font-display font-bold text-2xl text-fennec-dark flex items-center gap-2">
            <Layers className="w-5 h-5 text-fennec-terracotta" />
            Pourquoi existe-t-il de telles disparités de primes entre cantons ?
          </h2>
          <div className="space-y-4 text-sm text-fennec-dark/75 leading-relaxed">
            <p>
              Le système de santé suisse repose sur le principe de la <strong>solidarité cantonalisée</strong>. Chaque canton forme une communauté de risques autonome. Les primes payées par les résidents d'un canton servent exclusivement à financer les coûts médicaux générés dans ce canton.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-fennec-cream/25 border border-fennec-cream/50 rounded-2xl space-y-2">
                <Hospital className="w-4 h-4 text-red-600" />
                <h3 className="font-display font-bold text-sm text-fennec-dark">Densité des infrastructures</h3>
                <p className="text-xs text-fennec-dark/70 leading-normal">
                  Les cantons disposant d'hôpitaux universitaires et d'une forte densité de médecins spécialistes (comme Genève, Bâle et Vaud) ont une offre de soins plus élevée, ce qui génère mécaniquement des coûts par assuré plus importants.
                </p>
              </div>

              <div className="p-4 bg-fennec-cream/25 border border-fennec-cream/50 rounded-2xl space-y-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <h3 className="font-display font-bold text-sm text-fennec-dark">Régions de primes OFSP</h3>
                <p className="text-xs text-fennec-dark/70 leading-normal">
                  Certains cantons étendus (ex: Berne, Zurich, Vaud, Valais, Saint-Gall) sont subdivisés par l'OFSP en 2 ou 3 régions de primes distinctes (urbaine, intermédiaire, rurale) pour refléter les écarts de coûts locaux.
                </p>
              </div>

              <div className="p-4 bg-fennec-cream/25 border border-fennec-cream/50 rounded-2xl space-y-2">
                <Award className="w-4 h-4 text-amber-600" />
                <h3 className="font-display font-bold text-sm text-fennec-dark">Politique des subsides</h3>
                <p className="text-xs text-fennec-dark/70 leading-normal">
                  Chaque canton fixe librement ses barèmes d'octroi des subsides (IPV). Certains cantons soutiennent jusqu'à 35% de leur population avec des montants d'aide substantiels.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Levers to Cut Insurance Premiums in 2026 */}
        <div className="bg-white rounded-3xl border border-fennec-cream/60 p-6 sm:p-8 mb-12 shadow-xs space-y-5">
          <h2 className="font-display font-bold text-2xl text-fennec-dark flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-emerald-600" />
            Les 4 leviers légaux pour réduire vos primes LAMal en 2026
          </h2>
          <p className="text-sm text-fennec-dark/70">
            Quel que soit votre canton de résidence, vous pouvez appliquer ces 4 stratégies pour alléger immédiatement votre budget d'assurance maladie :
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-fennec-cream/20 border border-fennec-cream/50">
              <Scale className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display font-bold text-sm text-fennec-dark">1. Optimiser sa franchise (300 vs 2'500)</h3>
                <p className="text-xs text-fennec-dark/70 mt-1 leading-relaxed">
                  Passer de la franchise 300 à 2'500 CHF fait économiser exactement CHF 1'540.- de prime annuelle. Si vos soins sont inférieurs à CHF 1'800/an, la franchise 2'500 est toujours gagnante.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-fennec-cream/20 border border-fennec-cream/50">
              <Shield className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display font-bold text-sm text-fennec-dark">2. Choisir un modèle alternatif</h3>
                <p className="text-xs text-fennec-dark/70 mt-1 leading-relaxed">
                  Les modèles Telmed, Médecin de famille et Réseaux HMO permettent d'obtenir entre 8% et 22% de rabais par rapport au modèle traditionnel, sans aucune perte de qualité médicale.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-fennec-cream/20 border border-fennec-cream/50">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display font-bold text-sm text-fennec-dark">3. Suspendre la couverture accident</h3>
                <p className="text-xs text-fennec-dark/70 mt-1 leading-relaxed">
                  Si vous travaillez au moins 8h par semaine pour un même employeur en Suisse, vous êtes déjà couvert par la LAA. Supprimer la couverture accident de votre LAMal économise environ 7% par mois.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-fennec-cream/20 border border-fennec-cream/50">
              <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display font-bold text-sm text-fennec-dark">4. Demander son subside cantonal</h3>
                <p className="text-xs text-fennec-dark/70 mt-1 leading-relaxed">
                  Consultez les plafonds de revenus de votre canton. Même avec un revenu moyen, les familles et les jeunes adultes peuvent obtenir des réductions mensuelles de CHF 100 à CHF 400.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Subsidies Callout Box */}
        <div className="bg-linear-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/80 rounded-3xl p-6 sm:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-200/60 px-3 py-1 rounded-full">
              <Award className="w-3.5 h-3.5" />
              Subsides & Réduction des primes (IPV)
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-fennec-dark">
              Avez-vous droit à une aide financière pour payer vos primes ?
            </h3>
            <p className="text-xs sm:text-sm text-fennec-dark/75 max-w-2xl leading-relaxed">
              Consultez notre guide complet des subsides d'assurance maladie pour les 26 cantons suisses. Barèmes 2026, délais officiels et démarches auprès de votre caisse de compensation.
            </p>
          </div>
          <a
            href="/fr/subsides/"
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey) return;
              e.preventDefault();
              if (onNavigate) onNavigate('/fr/subsides/');
            }}
            className="shrink-0 bg-amber-600 hover:bg-amber-700 text-white font-display font-bold px-7 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
          >
            Consulter le guide des subsides <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="font-display font-bold text-2xl text-fennec-dark mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-fennec-terracotta" />
            Questions fréquentes sur l'assurance maladie en Suisse
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-fennec-cream/60 overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-sm text-fennec-dark hover:bg-fennec-cream/20 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-4 h-4 shrink-0 text-fennec-terracotta" />
                  ) : (
                    <ChevronDown className="w-4 h-4 shrink-0 text-fennec-dark/40" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-fennec-dark/75 leading-relaxed border-t border-fennec-cream/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Trust & E-E-A-T Badges */}
        <div className="bg-fennec-cream/20 rounded-3xl border border-fennec-cream/60 p-6 sm:p-8 mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-fennec-dark/60 uppercase tracking-wider">
            <Shield className="w-4 h-4 text-fennec-terracotta" />
            Engagement de neutralité et transparence
          </div>
          <h3 className="font-display font-bold text-lg text-fennec-dark">
            Calculs certifiés selon les bases de données officielles de l'OFSP (Priminfo)
          </h3>
          <p className="text-xs text-fennec-dark/70 max-w-2xl mx-auto leading-relaxed">
            Le Fennec Malin est un service suisse indépendant. Nos algorithmes de comparaison intègrent l'intégralité des 37 caisses maladie agrées et appliquent strictement les barèmes officiels publiés par l'Office fédéral de la santé publique (OFSP).
          </p>
          <div className="pt-2 flex flex-wrap justify-center items-center gap-4 text-xs font-bold text-fennec-terracotta">
            <a
              href="/fr/methodologie/"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey) return;
                e.preventDefault();
                if (onNavigate) onNavigate('/fr/methodologie/');
              }}
              className="hover:underline flex items-center gap-1"
            >
              Consulter notre méthodologie de calcul <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <span>·</span>
            <a
              href="/fr/article-45-lsa/"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey) return;
                e.preventDefault();
                if (onNavigate) onNavigate('/fr/article-45-lsa/');
              }}
              className="hover:underline flex items-center gap-1"
            >
              Devoir d'information Art. 45 LSA <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Final Conversion Callout */}
        <div className="bg-linear-to-r from-fennec-dark to-fennec-brown text-white rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-xl">
          <h3 className="font-display font-black text-2xl sm:text-3xl">
            Comparez les tarifs de votre canton en 2 minutes
          </h3>
          <p className="text-white/80 text-sm max-w-xl mx-auto leading-relaxed">
            Renseignez simplement votre code postal (NPA) et découvrez immédiatement les primes les plus basses adaptées à votre profil.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onStartComparison()}
              className="bg-fennec-terracotta hover:bg-fennec-terracotta/90 text-white font-display font-bold px-9 py-4 rounded-full text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Lancer le comparateur suisse gratuit
            </button>
          </div>
        </div>

        <p className="text-fennec-dark/40 text-[11px] text-center mt-6">
          Dernière mise à jour : Août 2026 · Données de primes officielles OFSP / Priminfo 2026 · Registre des intermédiaires FINMA
        </p>
      </div>
    </>
  );
}
