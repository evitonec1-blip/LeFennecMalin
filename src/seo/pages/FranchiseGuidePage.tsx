/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Franchise Guide Page — Master Franchise 300 vs 2500 CHF & Mathematical Rule
 */

import React, { useState } from 'react';
import { 
  Calculator, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingDown, 
  Info,
  DollarSign
} from 'lucide-react';
import SEOHead, { breadcrumbSchema, faqSchema, organizationSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { useLanguage } from '../../i18n/LanguageContext';
import { AppTab } from '../../types';

interface Props {
  onNavigate: (tab: AppTab) => void;
  onStartComparison: () => void;
}

const FRANCHISE_FAQS = [
  {
    question: "Quelle est la règle mathématique des CHF 1'800 pour la franchise ?",
    answer: "La règle financière suisse est simple : si vos dépenses médicales annuelles prévues sont inférieures à 1'800 CHF, la franchise de CHF 2'500 est toujours la plus économique (vous économisez jusqu'à 1'540 CHF sur vos primes annuelles). Si vos dépenses dépassent 1'800 CHF, la franchise minimale de CHF 300 devient plus avantageuse."
  },
  {
    question: "Pourquoi les franchises intermédiaires (500, 1000, 1500, 2000) sont-elles déconseillées ?",
    answer: "En Suisse, le rabais légal accordé sur les primes pour les franchises intermédiaires ne compense pas le risque financier supplémentaire engagé. Statistiquement, dans 95% des cas, l'assuré est soit gagnant avec 2'500 CHF, soit gagnant avec 300 CHF. Les franchises intermédiaires constituent un 'piège financier' sans avantage réel."
  },
  {
    question: "Quand et comment modifier sa franchise LAMal ?",
    answer: "Vous pouvez baisser votre franchise (ex: passer de 2500 à 300) chaque année jusqu'au 30 novembre avec effet au 1er janvier. Pour augmenter votre franchise (ex: passer de 300 à 2500), le délai est fixé au 31 décembre de l'année précédente."
  },
  {
    question: "Quelle est la franchise recommandée pour un enfant ?",
    answer: "Pour les enfants de 0 à 18 ans, la franchise standard est de 0 CHF. Il existe des franchises facultatives (100 à 600 CHF), mais les rabais consentis sont minimes comparés à la fréquence élevée des consultations pédiatriques. La franchise 0 CHF est unanimement recommandée."
  }
];

export default function FranchiseGuidePage({ onNavigate, onStartComparison }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [estimatedExpenses, setEstimatedExpenses] = useState<number>(800);
  const { language } = useLanguage();

  // Franchise math simulation
  // Franchise 300: Base + Min(300, expenses) + 10% of remainder up to 700
  // Franchise 2500: Base - Discount(approx 1540 CHF/yr) + Min(2500, expenses) + 10% remainder
  const discount2500 = 1540;
  const outOfPocket300 = Math.min(300, estimatedExpenses) + Math.min(700, Math.max(0, estimatedExpenses - 300) * 0.1);
  const outOfPocket2500 = Math.min(2500, estimatedExpenses) + Math.min(700, Math.max(0, estimatedExpenses - 2500) * 0.1);
  
  // Total relative cost (comparing 2500 vs 300)
  const netAdvantage2500 = discount2500 - (outOfPocket2500 - outOfPocket300);
  const is2500Best = netAdvantage2500 > 0;

  const structured = [
    organizationSchema,
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'LAMal', url: '/fr/lamal/' },
      { name: 'Guide Franchise', url: '/fr/lamal/franchise/' },
    ]),
    faqSchema(FRANCHISE_FAQS),
  ];

  return (
    <>
      <SEOHead
        tab="lamal-franchise"
        language={language}
        structuredData={structured}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: () => onNavigate('home') },
            { label: 'LAMal', onClick: () => onNavigate('hub-lamal') },
            { label: 'Franchise LAMal' },
          ]}
        />

        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-200">
            <Calculator className="w-3.5 h-3.5" />
            Simulation & Optimisation Chiffrée
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Franchise Assurance Maladie Suisse : 300 ou 2500 CHF ?
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            Découvrez la règle des 1'800 CHF, simulez votre coût réel selon vos dépenses de santé 
            et évitez le piège des franchises intermédiaires.
          </p>
        </div>

        {/* Interactive Simulation Widget */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-600" />
            Simulateur de rentabilité Franchise 300 vs Franchise 2500
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Déplacez le curseur pour estimer vos dépenses médicales annuelles brutes (consultations, médicaments, analyses).
          </p>

          <div className="mb-8 bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-700">Dépenses médicales annuelles estimées :</label>
              <span className="text-xl font-extrabold text-emerald-700 bg-white px-4 py-1 rounded-lg border border-slate-200 shadow-xs">
                CHF {estimatedExpenses.toLocaleString('fr-CH')}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={estimatedExpenses}
              onChange={(e) => setEstimatedExpenses(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>0 CHF (Aucun soin)</span>
              <span>1'800 CHF (Seuil de bascule)</span>
              <span>5'000 CHF+ (Soins lourds)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-5 rounded-xl border-2 transition-all ${is2500Best ? 'border-emerald-500 bg-emerald-50/40' : 'border-slate-200 bg-white'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900 text-lg">Option A : Franchise 2'500 CHF</span>
                {is2500Best && (
                  <span className="px-2.5 py-0.5 bg-emerald-600 text-white text-xs font-bold rounded-full">Recommandé</span>
                )}
              </div>
              <p className="text-xs text-slate-600 mb-3">Idéal pour les personnes en bonne santé avec peu de consultations.</p>
              <div className="text-sm space-y-1.5 border-t border-slate-200 pt-3">
                <div className="flex justify-between text-slate-600">
                  <span>Rabais sur les primes :</span>
                  <span className="font-semibold text-emerald-700">- CHF 1'540/an</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Participation aux soins :</span>
                  <span className="font-semibold">CHF {Math.round(outOfPocket2500)}</span>
                </div>
              </div>
            </div>

            <div className={`p-5 rounded-xl border-2 transition-all ${!is2500Best ? 'border-emerald-500 bg-emerald-50/40' : 'border-slate-200 bg-white'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900 text-lg">Option B : Franchise 300 CHF</span>
                {!is2500Best && (
                  <span className="px-2.5 py-0.5 bg-emerald-600 text-white text-xs font-bold rounded-full">Recommandé</span>
                )}
              </div>
              <p className="text-xs text-slate-600 mb-3">Idéal pour les traitements réguliers, maladies chroniques ou grossesse.</p>
              <div className="text-sm space-y-1.5 border-t border-slate-200 pt-3">
                <div className="flex justify-between text-slate-600">
                  <span>Rabais sur les primes :</span>
                  <span className="font-semibold text-slate-400">0 CHF/an</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Participation aux soins :</span>
                  <span className="font-semibold">CHF {Math.round(outOfPocket300)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-slate-100 border border-slate-200 text-sm text-slate-700 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Verdict pour votre situation : </span>
              {is2500Best ? (
                <span>
                  Avec CHF {estimatedExpenses} de dépenses, la <strong>Franchise 2'500</strong> vous fait économiser 
                  environ <strong>CHF {Math.abs(Math.round(netAdvantage2500))}</strong> par an par rapport à la franchise 300.
                </span>
              ) : (
                <span>
                  Avec CHF {estimatedExpenses} de dépenses, la <strong>Franchise 300</strong> est plus avantageuse de 
                  <strong> CHF {Math.abs(Math.round(netAdvantage2500))}</strong> par an.
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Warning Section */}
        <section className="mb-12 bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-bold text-amber-900 mb-2">Attention au piège des franchises intermédiaires</h2>
              <p className="text-sm text-amber-800 leading-relaxed mb-4">
                Les franchises de 500, 1000, 1500 et 2000 CHF sont proposées par la loi, mais sont mathématiquement 
                défavorables. Le rabais de prime accordé par les caisses ne compense pas le risque supplémentaire que vous 
                assumez.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-amber-900 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-700" />
                  Moins de 1'800 CHF de soins : Choisissez 2'500 CHF
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-700" />
                  Plus de 1'800 CHF de soins : Choisissez 300 CHF
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            Questions fréquentes sur les franchises
          </h2>
          <div className="space-y-4">
            {FRANCHISE_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 rounded-xl bg-white overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between font-bold text-slate-900 hover:text-emerald-600 transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Envie de calculer vos primes exactes avec votre franchise ?</h3>
            <p className="text-slate-400 text-sm max-w-xl">
              Utilisez notre comparateur gratuit avec les barèmes 2026 de l'Office Fédéral de la Santé Publique.
            </p>
          </div>
          <button
            onClick={onStartComparison}
            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            Lancer la Comparaison
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </>
  );
}
