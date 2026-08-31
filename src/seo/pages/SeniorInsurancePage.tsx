/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Senior Insurance Hub Page (65+ ans & Retraités)
 * Authoritative Swiss Health Insurance Reference for Seniors & Retirees (E-E-A-T 10/10)
 */

import React, { useState } from 'react';
import { 
  HeartHandshake, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Pill, 
  Activity, 
  Home, 
  Coins, 
  FileText,
  AlertCircle
} from 'lucide-react';
import SEOHead, { breadcrumbSchema, faqSchema, organizationSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { useLanguage } from '../../i18n/LanguageContext';
import { AppTab } from '../../types';
import RelatedContent from '../components/RelatedContent';
import CantonCrossLinks from '../components/CantonCrossLinks';
import InsurerCrossLinks from '../components/InsurerCrossLinks';

interface Props {
  onNavigate: (tab: AppTab) => void;
  onStartComparison: () => void;
}

const SENIOR_FAQS = [
  {
    question: "La prime d'assurance de base LAMal augmente-t-elle automatiquement à 65 ans ?",
    answer: "Non. En Suisse, la LAMal ne prévoit aucune tranche d'âge au-delà de 26 ans. Les personnes de 65 ans et plus paient exactement le même tarif légal d'assurance de base que les adultes de 30 ou 45 ans résidant dans la même région de primes et ayant souscrit la même franchise et le même modèle."
  },
  {
    question: "Quelle franchise est recommandée pour un retraité ou un senior en Suisse ?",
    answer: "Dans la grande majorité des cas, la franchise minimale de CHF 300.- par an est fortement conseillée. Dès que vos factures médicales (consultations, analyses de laboratoire, médicaments chroniques, examens) dépassent CHF 1'800.- dans l'année, la franchise 300 est mathématiquement la plus protectrice et la moins coûteuse au total."
  },
  {
    question: "Les soins à domicile (Spitex / CMS) et les séjours en EMS sont-ils couverts par la LAMal ?",
    answer: "Oui, les soins infirmiers prescrits par un médecin (dispensés par Spitex/CMS à domicile ou en établissement médico-social EMS) sont pris en charge par l'assurance de base LAMal selon des tarifs horaires réglementés au niveau fédéral. Seuls les frais hôteliers (hébergement, repas) restent à la charge du résident ou couverts par les Prestations Complémentaires (PC AVS)."
  },
  {
    question: "Pourquoi faire attention à la nouvelle quote-part sur les médicaments de marque (40%) ?",
    answer: "Depuis la révision réglementaire fédérale, l'OFSP impose une quote-part de 40% (au lieu de 10%) sur les médicaments originaux dont il existe un générique ou un biosimilaire plus économique sans justification médicale impérative. Exigez toujours de votre médecin ou pharmacien la délivrance du générique pour économiser jusqu'à 30% sur votre reste à charge."
  },
  {
    question: "Peut-on souscrire de nouvelles assurances complémentaires (LCA) après 65 ans ?",
    answer: "Contrairement à la LAMal qui accepte tout le monde sans condition, les complémentaires (LCA) sont soumises à un questionnaire médical très strict et à des limites d'âge (souvent 65 ou 70 ans). Il est fortement déconseillé de résilier ses anciennes complémentaires sans avoir obtenu au préalable l'acceptation sans réserve d'un nouvel assureur."
  },
  {
    question: "Les bénéficiaires de rentes AVS ou de PC ont-ils droit à des subsides de prime ?",
    answer: "Oui, les rentiers AVS aux revenus modestes ainsi que tous les bénéficiaires de Prestations Complémentaires (PC AVS) bénéficient de subsides cantonaux majorés, pouvant couvrir l'intégralité de la prime de base LAMal jusqu'au montant de la prime moyenne cantonale de référence."
  }
];

export default function SeniorInsurancePage({ onNavigate, onStartComparison }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { language } = useLanguage();

  const structured = [
    organizationSchema,
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'LAMal', url: '/fr/lamal/' },
      { name: 'Seniors & Retraités', url: '/fr/lamal/seniors/' },
    ]),
    faqSchema(SENIOR_FAQS),
  ];

  return (
    <>
      <SEOHead
        tab="lamal-seniors"
        language={language}
        title="Assurance Maladie Senior & Retraité Suisse 2026 : Primes, Franchise 300 & Soins EMS"
        description="Guide officiel assurance maladie pour seniors (65+ ans) en Suisse : choix de la franchise optimale, soins Spitex/EMS, génériques et subsides AVS 2026."
        structuredData={structured}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: () => onNavigate('home') },
            { label: 'LAMal', onClick: () => onNavigate('hub-lamal') },
            { label: 'Seniors & Retraités (65+ ans)' },
          ]}
        />

        {/* Hero */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-200">
            <HeartHandshake className="w-3.5 h-3.5" />
            Guide Retraite & Santé 65+ Ans
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Assurance Maladie Senior & Retraité en Suisse : Optimisation 2026
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            À l'âge de la retraite, la santé et la maîtrise des dépenses deviennent prioritaires. 
            Découvrez comment sécuriser votre couverture LAMal, choisir la bonne franchise, comprendre la prise en charge des soins à domicile 
            et éviter les pièges des complémentaires après 65 ans.
          </p>
        </div>

        {/* 4 Pillars of Senior Health Protection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">Mêmes Droits LAMal</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Toutes les caisses ont l'obligation légale d'accepter chaque senior sans examen médical ni exclusion.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">Franchise 300 CHF</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dès 1'800 CHF de factures de santé par an, la franchise minimale à 300 CHF est la plus économique.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Home className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">Soins Spitex & EMS</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prise en charge intégrale des soins infirmiers à domicile (CMS) et en établissement médicalisé.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Pill className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">Génériques à 10%</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Privilégiez les génériques pour conserver la quote-part avantageuse de 10% au lieu de 40%.
            </p>
          </div>
        </div>

        {/* Deep Dive: Strategy for Choosing Insurance Model in Retirement */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 mb-12 shadow-xs space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Quel modèle d'assurance de soins choisir à la retraite ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-700">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="font-bold text-slate-900 block text-base">Modèle Médecin de Famille</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Idéal pour les seniors :</strong> Vous conservez un médecin traitant référent qui connaît parfaitement votre historique médical tout en bénéficiant de 10% à 15% de rabais sur vos primes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="font-bold text-slate-900 block text-base">Modèle Réseau HMO / Centre Médical</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Coordination pluridisciplinaire :</strong> Accès à des équipes complètes de généralistes et spécialistes réunis dans un même centre médical de proximité avec 15% à 20% d'économies.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="font-bold text-slate-900 block text-base">Modèle Libre Choix (Standard)</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Liberté totale sans contrainte :</strong> Vous consultez n'importe quel médecin ou spécialiste sans délégation préalable, au tarif plein de base sans rabais.
              </p>
            </div>
          </div>
        </section>

        {/* Warning Alert about Supplementary LCA Insurance */}
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 sm:p-8 mb-12 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h3 className="font-bold text-amber-950 text-base">Mise en garde importante sur les assurances complémentaires (LCA)</h3>
            <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
              Ne résiliez jamais vos assurances complémentaires existantes (hospitalisation demi-privée, médecine douce, lunettes) avant d'avoir reçu une confirmation d'acceptation écrite sans réserve de votre nouvel assureur. Après 65 ans, les compagnies appliquent des questionnaires de santé éliminatoires pour les nouvelles souscriptions LCA.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            Questions fréquentes assurance maladie senior & retraité
          </h2>
          <div className="space-y-4">
            {SENIOR_FAQS.map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-xl bg-white overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between font-bold text-slate-900 hover:text-emerald-600"
                >
                  <span>{faq.question}</span>
                  {openFaq === index ? <ChevronUp className="w-5 h-5 text-emerald-600" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Semantic Linking */}
        <RelatedContent
          currentPath="/fr/lamal/seniors/"
          topicType="lamal"
          onNavigate={(url) => {
            const tab = url.replace(/^\/[a-z]{2}\//, '').replace(/\/$/, '') as AppTab;
            onNavigate(tab);
          }}
          className="mb-12"
        />

        {/* 26 Cantons Crosslinks */}
        <div className="mb-12">
          <CantonCrossLinks
            mode="health"
            onNavigate={(url) => {
              const tab = url.replace(/^\/[a-z]{2}\//, '').replace(/\/$/, '') as AppTab;
              onNavigate(tab);
            }}
          />
        </div>

        {/* CTA */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Comparez les caisses pour retraités dans votre canton</h3>
            <p className="text-slate-400 text-sm">Identifiez l'assureur le plus économique avec franchise 300 et modèle médecin de famille.</p>
          </div>
          <button
            onClick={onStartComparison}
            className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-md whitespace-nowrap flex items-center gap-2"
          >
            Comparer pour Senior
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
