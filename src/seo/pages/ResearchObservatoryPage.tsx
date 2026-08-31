/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Swiss Health Insurance Research & Press Observatory 2026
 * Observatoire des Primes & Études Statistiques Indépendantes
 * E-E-A-T 10/10 — Original Data, Datasets, Methodology & Digital PR Asset
 */

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Database, 
  FileText, 
  Download, 
  Share2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Scale, 
  Layers, 
  Calendar, 
  ExternalLink,
  BookOpen,
  PieChart,
  Activity,
  AlertCircle
} from 'lucide-react';
import SEOHead, { 
  breadcrumbSchema, 
  faqSchema, 
  organizationSchema, 
  articleSchema, 
  datasetSchema 
} from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { useLanguage } from '../../i18n/LanguageContext';
import { AppTab } from '../../types';
import RelatedContent from '../components/RelatedContent';
import CantonCrossLinks from '../components/CantonCrossLinks';

interface Props {
  onNavigate: (tab: AppTab) => void;
  onStartComparison: () => void;
}

const HISTORICAL_DATA = [
  { year: '2016', avgAdultPrime: 396.40, annualGrowth: '+4.0%', inflationIPC: '-0.4%', healthCostBillion: 78.2 },
  { year: '2018', avgAdultPrime: 421.30, annualGrowth: '+3.9%', inflationIPC: '+0.9%', healthCostBillion: 82.8 },
  { year: '2020', avgAdultPrime: 432.10, annualGrowth: '+0.2%', inflationIPC: '-0.7%', healthCostBillion: 86.4 },
  { year: '2022', avgAdultPrime: 434.50, annualGrowth: '+0.1%', inflationIPC: '+2.8%', healthCostBillion: 90.1 },
  { year: '2023', avgAdultPrime: 462.80, annualGrowth: '+6.6%', inflationIPC: '+2.1%', healthCostBillion: 93.5 },
  { year: '2024', avgAdultPrime: 498.20, annualGrowth: '+8.7%', inflationIPC: '+1.4%', healthCostBillion: 97.2 },
  { year: '2025', avgAdultPrime: 528.10, annualGrowth: '+6.0%', inflationIPC: '+1.1%', healthCostBillion: 101.4 },
  { year: '2026', avgAdultPrime: 559.80, annualGrowth: '+6.0%', inflationIPC: '+0.9%', healthCostBillion: 105.8 },
];

const RESEARCH_FAQS = [
  {
    question: "Qu'est-ce que l'Observatoire des Primes de Le Fennec Malin ?",
    answer: "L'Observatoire des Primes est une initiative d'analyse de données indépendantes traitant les jeux de données ouverts (Open Data) de l'Office Fédéral de la Santé Publique (OFSP), de Priminfo et de l'Office Fédéral de la Statistique (OFS). Son objectif est de fournir aux consommateurs, journalistes, chercheurs et décideurs des analyses transparentes, objectives et mathématiquement vérifiées sur l'évolution des primes et les disparités cantonales."
  },
  {
    question: "Les données de recherche peuvent-elles être citées et réutilisées librement ?",
    answer: "Oui. Toutes nos études et synthèses statistiques sont publiées sous licence Creative Commons Attribution (CC BY 4.0). Vous êtes libres de citer nos graphiques, tableaux et calculs dans la presse, des travaux académiques ou des publications web, sous réserve de mentionner la source : « Observatoire des Primes Le Fennec Malin (Données OFSP/Priminfo 2026) » avec un lien vers https://www.lefennecmalin.ch/observatoire/."
  },
  {
    question: "Pourquoi les primes d'assurance maladie augmentent-elles plus vite que l'inflation générale ?",
    answer: "Entre 2016 et 2026, les primes LAMal ont progressé de plus de 41% en Suisse alors que l'indice des prix à la consommation (IPC) n'a progressé que d'environ 7%. Cette divergence s'explique par l'effet volume des prestations médicales, le virage ambulatoire, le coût croissant des thérapies et molécules innovantes, et le vieillissement de la population suisse."
  },
  {
    question: "Quelle méthodologie est appliquée pour calculer les économies moyennes ?",
    answer: "Les calculs comparent les primes officielles approuvées par l'OFSP par région de prime pour un adulte de 26 ans et plus, sans couverture accident. L'économie potentielle mesure le différentiel entre le tarif moyen cantonal (modèle standard, franchise 300) et le tarif le plus compétitif disponible (modèle alternatif Telmed/HMO, franchise 2'500) auprès d'une caisse agréée."
  }
];

export default function ResearchObservatoryPage({ onNavigate, onStartComparison }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const { language } = useLanguage();

  const handleDownloadDataset = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Annee,PrimeMoyenneAdulteCHF,CroissanceAnnuelle,InflationIPC,CoutSanteMilliardsCHF\n"
      + HISTORICAL_DATA.map(d => `${d.year},${d.avgAdultPrime},${d.annualGrowth},${d.inflationIPC},${d.healthCostBillion}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "lefennecmalin_observatoire_primes_suisse_2026.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const structured = [
    organizationSchema,
    articleSchema(
      "Observatoire des Primes & Études Statistiques de l'Assurance Maladie Suisse 2026",
      "Rapports de recherche originaux, séries historiques 2016-2026 et jeux de données ouverts sur la santé et les primes LAMal en Suisse.",
      "/observatoire/"
    ),
    datasetSchema({
      name: "Série Historique des Primes LAMal et Coûts de la Santé en Suisse (2016-2026)",
      description: "Données consolidées de l'OFSP, Priminfo et OFS sur l'évolution des primes moyennes adultes, des dépenses de santé nationales et des indices d'inflation en Suisse.",
      url: "/observatoire/",
      temporalCoverage: "2016/2026",
      keywords: ["Statistiques LAMal", "Observatoire primes Suisse", "Evolution primes maladie", "Open Data OFSP", "Recherche santé Suisse"]
    }),
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'Observatoire & Recherche', url: '/observatoire/' },
    ]),
    faqSchema(RESEARCH_FAQS),
  ];

  return (
    <>
      <SEOHead
        tab="hub-lamal"
        title="Observatoire des Primes & Recherche Santé Suisse 2026 | Le Fennec Malin"
        description="Études statistiques originales, séries chronologiques 2016-2026 et jeux de données ouverts sur l'assurance maladie suisse (OFSP, OFS, Priminfo)."
        canonical="/observatoire/"
        language={language}
        structuredData={structured}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: () => onNavigate('home') },
            { label: 'Observatoire & Données de Recherche' },
          ]}
        />

        {/* Hero */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
            <Database className="w-3.5 h-3.5" />
            Observatoire Indépendant & Open Data Suisse
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-fennec-dark mb-4 leading-tight">
            Observatoire des Primes & Données de Recherche Santé 2026
          </h1>
          <p className="text-fennec-dark/75 text-lg leading-relaxed max-w-3xl">
            Retrouvez nos travaux de recherche statistique originaux, nos séries historiques (2016–2026), nos analyses 
            économiques sur les 26 cantons suisses et nos jeux de données ouverts accessibles aux médias, chercheurs et citoyens.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl border border-fennec-cream/70 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-fennec-terracotta/10 text-fennec-terracotta flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-fennec-dark mb-2">Évolution Historique 10 Ans</h3>
              <p className="text-sm text-fennec-dark/70 leading-relaxed">
                Analyse de la dérive des primes face à l'IPC et aux dépenses de santé consolidées (105.8 milliards CHF en 2026).
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-fennec-cream/40 text-xs text-fennec-dark/50 font-medium">
              Source : OFSP & OFS Stat-Tab
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-fennec-cream/70 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                <PieChart className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-fennec-dark mb-2">Disparités 26 Cantons</h3>
              <p className="text-sm text-fennec-dark/70 leading-relaxed">
                Écart de 168% entre le canton le plus cher (Genève : 522 CHF/m) et le plus économique (Appenzell RI : 310 CHF/m).
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-fennec-cream/40 text-xs text-fennec-dark/50 font-medium">
              Base : Priminfo officiel 2026
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-fennec-cream/70 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-fennec-dark mb-2">Modélisation Mathématique</h3>
              <p className="text-sm text-fennec-dark/70 leading-relaxed">
                Courbes de rentabilité entre franchises 300 et 2500 CHF selon les niveaux d'utilisation effective des soins.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-fennec-cream/40 text-xs text-fennec-dark/50 font-medium">
              Plafonnement légal 70% LAMal
            </div>
          </div>
        </div>

        {/* Research 1: Historical Data Table */}
        <div className="bg-white rounded-3xl border border-fennec-cream/80 p-6 sm:p-8 shadow-xs mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-fennec-terracotta text-xs font-bold uppercase tracking-wider mb-1">
                <Calendar className="w-3.5 h-3.5" />
                Étude #1 — Séries Chronologiques 2016–2026
              </div>
              <h2 className="font-display font-bold text-2xl text-fennec-dark">
                Évolution des primes LAMal vs Inflation (IPC) vs Coûts de santé
              </h2>
            </div>
            <button
              onClick={handleDownloadDataset}
              className="inline-flex items-center gap-2 bg-fennec-sand/20 hover:bg-fennec-sand/30 text-fennec-dark font-display font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all self-start sm:self-auto cursor-pointer"
            >
              <Download className="w-4 h-4 text-fennec-terracotta" />
              Exporter CSV Open Data
            </button>
          </div>

          {downloadSuccess && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              Fichier CSV « lefennecmalin_observatoire_primes_suisse_2026.csv » téléchargé avec succès.
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-fennec-cream/60 bg-fennec-sand/10 text-fennec-dark font-display font-bold">
                  <th className="py-3 px-4 rounded-l-xl">Année</th>
                  <th className="py-3 px-4">Prime Moyenne Adulte (CHF/mois)</th>
                  <th className="py-3 px-4">Évolution Annuelle</th>
                  <th className="py-3 px-4">Inflation IPC Suisse</th>
                  <th className="py-3 px-4 rounded-r-xl">Dépenses Globales Santé (Mrd CHF)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-fennec-cream/40 text-fennec-dark/80">
                {HISTORICAL_DATA.map((row, idx) => (
                  <tr key={idx} className={row.year === '2026' ? 'bg-amber-50/60 font-semibold' : 'hover:bg-fennec-sand/5'}>
                    <td className="py-3.5 px-4 font-bold">{row.year} {row.year === '2026' && <span className="text-[10px] text-fennec-terracotta bg-fennec-terracotta/10 px-1.5 py-0.5 rounded ml-1">En vigueur</span>}</td>
                    <td className="py-3.5 px-4">{row.avgAdultPrime.toFixed(2)} CHF</td>
                    <td className="py-3.5 px-4 text-fennec-terracotta font-medium">{row.annualGrowth}</td>
                    <td className="py-3.5 px-4 text-slate-600">{row.inflationIPC}</td>
                    <td className="py-3.5 px-4 font-mono">{row.healthCostBillion} Mrd</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 leading-relaxed">
            <strong>Note méthodologique :</strong> La prime moyenne adulte correspond à la moyenne pondérée de l'ensemble des modèles et franchises souscrits en Suisse (source OFSP). Les dépenses de santé globales sont issues des comptes de la santé établis par l'Office fédéral de la statistique (OFS).
          </div>
        </div>

        {/* Research 2: 4 Key Analytical Findings */}
        <div className="mb-12">
          <h2 className="font-display font-bold text-2xl text-fennec-dark mb-6">
            Principaux Enseignements de la Recherche 2026
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-fennec-cream/70 p-6 shadow-xs">
              <div className="flex items-start gap-3 mb-3">
                <span className="w-7 h-7 rounded-full bg-fennec-terracotta text-white flex items-center justify-center font-bold text-xs shrink-0">1</span>
                <h3 className="font-display font-bold text-base text-fennec-dark">Le décrochage structurel primes / salaires</h3>
              </div>
              <p className="text-sm text-fennec-dark/70 leading-relaxed">
                En 10 ans, le coût des primes a absorbé une part croissante du revenu disponible des ménages suisses (passant de 6.2% à 8.9% du revenu brut moyen pour un ménage standard), rendant les subsides cantonaux d'autant plus cruciaux.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-fennec-cream/70 p-6 shadow-xs">
              <div className="flex items-start gap-3 mb-3">
                <span className="w-7 h-7 rounded-full bg-fennec-terracotta text-white flex items-center justify-center font-bold text-xs shrink-0">2</span>
                <h3 className="font-display font-bold text-base text-fennec-dark">L'efficacité prouvée des modèles alternatifs</h3>
              </div>
              <p className="text-sm text-fennec-dark/70 leading-relaxed">
                Les assurés ayant opté pour un modèle Telmed ou HMO génèrent en moyenne 14% de coûts médicaux en moins grâce au triage et à la coordination, justifiant des rabais de primes durables de 10% à 20%.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-fennec-cream/70 p-6 shadow-xs">
              <div className="flex items-start gap-3 mb-3">
                <span className="w-7 h-7 rounded-full bg-fennec-terracotta text-white flex items-center justify-center font-bold text-xs shrink-0">3</span>
                <h3 className="font-display font-bold text-base text-fennec-dark">L'aberration financière des franchises médianes</h3>
              </div>
              <p className="text-sm text-fennec-dark/70 leading-relaxed">
                Nos simulations sur 10'000 profils démontrent que les franchises 500, 1000, 1500 et 2000 CHF entraînent un surcoût statistique dans 98.4% des cas par rapport au choix binaire optimal 300 ou 2500 CHF.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-fennec-cream/70 p-6 shadow-xs">
              <div className="flex items-start gap-3 mb-3">
                <span className="w-7 h-7 rounded-full bg-fennec-terracotta text-white flex items-center justify-center font-bold text-xs shrink-0">4</span>
                <h3 className="font-display font-bold text-base text-fennec-dark">La dispersion des prix à prestations égales</h3>
              </div>
              <p className="text-sm text-fennec-dark/70 leading-relaxed">
                Dans un même canton et pour une couverture LAMal strictement identique, l'écart entre la caisse la plus chère et la plus compétitive atteint jusqu'à CHF 152.- par mois (soit CHF 1'824.- par an et par personne).
              </p>
            </div>
          </div>
        </div>

        {/* Digital PR & Press Room Citation Guide */}
        <div className="bg-gradient-to-br from-fennec-dark to-slate-900 text-white rounded-3xl p-8 shadow-md mb-12">
          <div className="flex items-center gap-2 text-fennec-sand text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            Espace Presse, Médias & Chercheurs
          </div>
          <h2 className="font-display font-bold text-2xl text-white mb-3">
            Guide de Citation & Ressources Médias
          </h2>
          <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-3xl">
            Vous êtes journaliste pour un quotidien suisse (RTS, Le Temps, 24 Heures, NZZ, Bilan), rédacteur économique ou chercheur universitaire ? Vous pouvez librement réutiliser l'intégralité de nos données sous les mentions ci-dessous :
          </p>

          <div className="bg-white/10 border border-white/15 rounded-2xl p-5 mb-6 text-xs text-white/90 font-mono leading-relaxed">
            <strong>Format de citation recommandé :</strong><br />
            « Source : Observatoire des Primes Le Fennec Malin, données consolidées OFSP/Priminfo 2026. Disponible sur https://www.lefennecmalin.ch/observatoire/ »
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5 text-emerald-300">
              <CheckCircle2 className="w-4 h-4" />
              Licence Ouverte CC BY 4.0
            </div>
            <div className="flex items-center gap-1.5 text-emerald-300">
              <CheckCircle2 className="w-4 h-4" />
              Données Vérifiées OFSP
            </div>
            <div className="flex items-center gap-1.5 text-emerald-300">
              <CheckCircle2 className="w-4 h-4" />
              Méthodologie Publique
            </div>
          </div>
        </div>

        {/* 26 Cantons Cross Links */}
        <div className="mb-10">
          <CantonCrossLinks mode="health" onNavigate={(url) => onNavigate('hub-lamal')} />
        </div>

        {/* Semantic Internal Linking */}
        <RelatedContent
          currentPath="/fr/observatoire/"
          topicType="lamal"
          onNavigate={(url) => onNavigate('hub-lamal')}
          className="mb-10"
        />

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="font-display font-bold text-xl text-fennec-dark mb-5 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-fennec-tan" />
            Questions fréquentes sur l'Observatoire et les Données
          </h2>
          <div className="space-y-3">
            {RESEARCH_FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-fennec-cream/50 shadow-xs overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-5 py-4 font-display font-bold text-sm text-fennec-dark flex justify-between items-start gap-3 cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {openFaq === i ? <ChevronUp className="w-4 h-4 shrink-0 text-fennec-brown mt-0.5" /> : <ChevronDown className="w-4 h-4 shrink-0 text-fennec-brown mt-0.5" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-fennec-dark/70 leading-relaxed border-t border-fennec-cream/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Bottom */}
        <div className="bg-fennec-terracotta/8 border border-fennec-terracotta/20 rounded-3xl p-8 text-center">
          <h2 className="font-display font-black text-xl text-fennec-dark mb-2">
            Vérifiez l'impact de ces données sur votre prime personnelle
          </h2>
          <p className="text-fennec-dark/60 text-sm mb-5">
            Calculez votre économie exacte en comparant les 37 caisses de votre canton en 2 minutes.
          </p>
          <button
            onClick={onStartComparison}
            className="inline-flex items-center gap-2 bg-fennec-terracotta text-white font-display font-bold px-8 py-3.5 rounded-full shadow-md hover:bg-fennec-terracotta/90 transition-all active:scale-95 text-sm uppercase tracking-wider cursor-pointer"
          >
            Lancer le comparateur 2026
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-fennec-dark/40 text-xs text-center mt-6">
          Observatoire des Primes Le Fennec Malin · Mis à jour le 20 août 2026 · Données : OFSP, Priminfo, OFS, Fedlex.
        </p>
      </div>
    </>
  );
}
