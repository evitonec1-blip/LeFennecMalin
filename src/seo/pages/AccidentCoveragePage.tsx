/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Accident Coverage Page — LAA vs LAMal Accident Inclusion & 7% Premium Savings
 */

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Briefcase, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  CheckCircle2, 
  Percent, 
  AlertCircle 
} from 'lucide-react';
import SEOHead, { breadcrumbSchema, faqSchema, organizationSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { useLanguage } from '../../i18n/LanguageContext';
import { AppTab } from '../../types';
import RelatedContent from '../components/RelatedContent';
import InsurerCrossLinks from '../components/InsurerCrossLinks';
import CantonCrossLinks from '../components/CantonCrossLinks';

interface Props {
  onNavigate: (tab: AppTab) => void;
  onStartComparison: () => void;
}

const FAQS = [
  {
    question: "Dois-je inclure la couverture accident dans mon assurance maladie LAMal ?",
    answer: "Si vous travaillez au moins 8 heures par semaine chez le même employeur, vous êtes automatiquement couvert contre les accidents professionnels ET non professionnels par l'assurance accident obligatoire de votre employeur (LAA / Suva). Vous devez alors impérativement exclure le risque accident de votre police LAMal pour économiser environ 7% sur votre prime mensuelle."
  },
  {
    question: "Qui doit obligatoirement conserver la couverture accident dans sa LAMal ?",
    answer: "Doivent conserver l'accident dans leur LAMal : les personnes sans activité lucrative (étudiants, personnes au foyer, retraités), les travailleurs indépendants qui n'ont pas souscrit de police LAA volontaire, et les salariés effectuant moins de 8 heures par semaine chez leur employeur."
  },
  {
    question: "Quels sont les avantages de la LAA (employeur) par rapport à la couverture accident LAMal ?",
    answer: "La LAA (Loi sur l'assurance-accidents) est bien plus avantageuse : elle prend en charge 100% des frais médicaux sans franchise ni quote-part, verse des indemnités journalières (80% du salaire) dès le 3e jour, et prévoit des rentes d'invalidité ou de survivants en cas de séquelles permanentes."
  }
];

export default function AccidentCoveragePage({ onNavigate, onStartComparison }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { language } = useLanguage();

  const structured = [
    organizationSchema,
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'LAMal', url: '/fr/lamal/' },
      { name: 'Couverture Accident', url: '/fr/lamal/assurance-accident/' },
    ]),
    faqSchema(FAQS),
  ];

  return (
    <>
      <SEOHead
        tab="lamal-assurance-accident"
        language={language}
        structuredData={structured}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: () => onNavigate('home') },
            { label: 'LAMal', onClick: () => onNavigate('hub-lamal') },
            { label: 'Assurance Accident' },
          ]}
        />

        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-200">
            <Percent className="w-3.5 h-3.5" />
            Économisez 7% immédiatement
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Couverture Accident en Suisse : Faut-il l'inclure dans sa LAMal ? (2026)
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            Règle des 8 heures de travail par semaine (LAA), suppression du doublon d'assurance 
            et calcul de votre économie de prime mensuelle.
          </p>
        </div>

        {/* 2 Scenarios Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white border-2 border-emerald-500 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Salarié (&ge; 8h/semaine)</h2>
                <span className="text-xs text-emerald-700 font-semibold">Exclure l'accident (Option Sans Accident)</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Votre employeur vous assure déjà obligatoirement selon la LAA (Accidents professionnels + non-professionnels).
            </p>
            <div className="bg-emerald-50 rounded-xl p-4 text-xs text-emerald-900 font-medium">
              Résultat : <strong>Économisez environ 7%</strong> sur votre prime LAMal chaque mois (soit 25 à 45 CHF/mois par adulte).
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Indépendant / Sans emploi</h2>
                <span className="text-xs text-amber-700 font-semibold">Inclure l'accident (Option Avec Accident)</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Enfants, étudiants, retraités, personnes au foyer ou indépendants sans LAA privée.
            </p>
            <div className="bg-amber-50 rounded-xl p-4 text-xs text-amber-900 font-medium">
              Obligation : <strong>Maintenir la couverture accident</strong> dans votre police LAMal pour être pris en charge.
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            Questions fréquentes sur l'assurance accident
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
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

        {/* Semantic Internal Linking Silo */}
        <RelatedContent
          currentPath="/fr/lamal/accident-incluse-ou-exclue/"
          topicType="lamal"
          onNavigate={(url) => {
            const tab = url.replace(/^\/[a-z]{2}\//, '').replace(/\/$/, '') as AppTab;
            onNavigate(tab);
          }}
          className="mb-12"
        />

        {/* 37 Swiss Insurers Matrix */}
        <div className="mb-12">
          <InsurerCrossLinks
            onNavigate={(url) => {
              const tab = url.replace(/^\/[a-z]{2}\//, '').replace(/\/$/, '') as AppTab;
              onNavigate(tab);
            }}
          />
        </div>

        {/* 26 Cantons Cross Links */}
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
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Simulez vos primes avec et sans accident</h3>
            <p className="text-slate-400 text-sm max-w-xl">
              Consultez les barèmes officiels et ajustez vos options pour maximiser votre pouvoir d'achat.
            </p>
          </div>
          <button
            onClick={onStartComparison}
            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-md whitespace-nowrap flex items-center justify-center gap-2"
          >
            Comparer Avec / Sans Accident
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </>
  );
}
