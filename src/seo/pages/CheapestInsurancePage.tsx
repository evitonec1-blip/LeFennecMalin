/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Cheapest Insurance Page — Real Cantonal Truth & Premium Breakdown
 */

import React, { useState } from 'react';
import { 
  TrendingDown, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  Coins 
} from 'lucide-react';
import SEOHead, { breadcrumbSchema, faqSchema, organizationSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { useLanguage } from '../../i18n/LanguageContext';
import { AppTab } from '../../types';

interface Props {
  onNavigate: (tab: AppTab) => void;
  onStartComparison: () => void;
}

const CHEAPEST_FAQS = [
  {
    question: "Existe-t-il une caisse maladie universellement la moins chère en Suisse ?",
    answer: "Non. Aucune caisse maladie n'est la moins chère sur tout le territoire. Les tarifs LAMal dépendent de 4 critères stricts fixés par l'OFSP : votre canton et région de primes, votre tranche d'âge (enfant, jeune adulte 19-25 ans, adulte), la franchise choisie (300 à 2500 CHF), et l'inclusion ou non de l'assurance accident."
  },
  {
    question: "Quelles caisses se disputent souvent les prix les plus bas ?",
    answer: "Des assureurs comme Assura, KPT / CPT, Mutuel Assurance (Groupe Mutuel), et Atupri figurent fréquemment parmi les caisses aux primes les plus compétitives, notamment sur les modèles Telmed et Médecin de famille."
  },
  {
    question: "Une caisse moins chère offre-t-elle de moins bons remboursements ?",
    answer: "Absolument pas pour l'assurance de base LAMal. Le catalogue des prestations remboursées est 100% identique par la loi fédérale. La différence se situe uniquement au niveau du service client, de la digitalisation et du modèle de tiers garant (payer d'avance) ou tiers payant (la caisse paie directement le médecin)."
  }
];

export default function CheapestInsurancePage({ onNavigate, onStartComparison }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { language } = useLanguage();

  const structured = [
    organizationSchema,
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'LAMal', url: '/fr/lamal/' },
      { name: 'Caisse Moins Chère', url: '/fr/lamal/caisse-maladie-la-moins-chere/' },
    ]),
    faqSchema(CHEAPEST_FAQS),
  ];

  return (
    <>
      <SEOHead
        tab="lamal-moins-chere"
        language={language}
        structuredData={structured}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: () => onNavigate('home') },
            { label: 'LAMal', onClick: () => onNavigate('hub-lamal') },
            { label: 'Caisse la Moins Chère' },
          ]}
        />

        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-200">
            <Coins className="w-3.5 h-3.5" />
            Transparence & Barèmes 2026
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Caisse Maladie la Moins Chère en Suisse : Comparatif Réel 2026
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            Pourquoi aucune caisse n'est universellement la moins chère et comment dénicher le tarif le plus bas 
            pour votre commune et votre profil sans sacrifier la qualité.
          </p>
        </div>

        {/* The 4 Factors that determine your price */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Les 4 critères qui fixent votre tarif réel</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">1. Votre Canton</h3>
              <p className="text-xs text-slate-600">
                Les primes varient fortement d'un canton à l'autre selon les coûts hospitaliers locaux.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3">
                <TrendingDown className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">2. Votre Franchise</h3>
              <p className="text-xs text-slate-600">
                Franchise 2500 CHF = jusqu'à 1'540 CHF d'économie par an sur votre prime.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-3">
                <Coins className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">3. Le Modèle</h3>
              <p className="text-xs text-slate-600">
                Telmed ou Médecin de famille permet de réduire la facture de 10% à 25%.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">4. L'Accident</h3>
              <p className="text-xs text-slate-600">
                Exclure la couverture accident si vous travaillez plus de 8h/semaine (LAA).
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {CHEAPEST_FAQS.map((faq, index) => {
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
            <h3 className="text-xl font-bold mb-2">Trouvez la caisse la moins chère pour votre adresse</h3>
            <p className="text-slate-400 text-sm max-w-xl">
              Entrez votre code postal et découvrez le classement exact des primes 2026.
            </p>
          </div>
          <button
            onClick={onStartComparison}
            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            Lancer le Comparateur Gratuit
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </>
  );
}
