/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Best Insurance Page — Ranking, Satisfaction Scores & OFSP Solvency
 */

import React, { useState } from 'react';
import { 
  Award, 
  Star, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Smartphone 
} from 'lucide-react';
import SEOHead, { breadcrumbSchema, faqSchema, organizationSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { useLanguage } from '../../i18n/LanguageContext';
import { AppTab } from '../../types';
import { getLocalizedPath } from '../multilingualRoutes';
import RelatedContent from '../components/RelatedContent';
import InsurerCrossLinks from '../components/InsurerCrossLinks';
import CantonCrossLinks from '../components/CantonCrossLinks';

interface Props {
  onNavigate: (tab: AppTab) => void;
  onStartComparison: () => void;
}

const BEST_FAQS = [
  {
    question: "Quels critères déterminent la 'meilleure' caisse maladie en Suisse ?",
    answer: "La meilleure caisse se juge sur 4 piliers : 1. La satisfaction client (enquêtes indépendantes K-Tipp, Comparis, Bonus.ch), 2. La rapidité et la fiabilité des remboursements, 3. La solvabilité financière et le ratio de réserves approuvé par l'OFSP, 4. La qualité des applications mobiles et du service client."
  },
  {
    question: "Quelles caisses obtiennent régulièrement les meilleures notes de satisfaction ?",
    answer: "SWICA, Sanitas, Concordia, Visana et Helsana occupent régulièrement les premières places des sondages de satisfaction auprès des assurés suisses, notamment pour la courtoisie de leur service et le traitement rapide des décomptes."
  },
  {
    question: "Faut-il choisir la caisse la moins chère ou la mieux notée ?",
    answer: "Pour l'assurance de base LAMal où les prestations médicales sont identiques partout, beaucoup d'assurés privilégient le prix. Cependant, pour les assurances complémentaires (LCA) ou si vous accordez une grande importance au service client et au tiers payant, choisir une caisse premium est un choix judicieux."
  }
];

export default function BestInsurancePage({ onNavigate, onStartComparison }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { language } = useLanguage();

  const structured = [
    organizationSchema,
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'Meilleure Caisse Maladie', url: '/fr/meilleure-caisse-maladie/' },
    ]),
    faqSchema(BEST_FAQS),
  ];

  return (
    <>
      <SEOHead
        tab="meilleure-caisse-maladie"
        language={language}
        structuredData={structured}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: () => onNavigate('home') },
            { label: 'Meilleure Caisse Maladie' },
          ]}
        />

        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-200">
            <Award className="w-3.5 h-3.5" />
            Classement & Avis Indépendants 2026
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Quelle est la Meilleure Caisse Maladie en Suisse en 2026 ?
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            Découvrez le classement officiel des caisses maladie suisses basé sur la satisfaction client, 
            la rapidité de remboursement et les réserves de solvabilité OFSP.
          </p>
        </div>

        {/* 4 Pillars of Excellence */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Satisfaction Assurés</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Basé sur les notes réelles attribuées par des dizaines de milliers d'assurés romands et alémaniques.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Remboursements Rapides</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Délais de traitement moyens constatés pour le paiement des factures de médecins et pharmacies.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Solvabilité OFSP</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Niveau de réserves financières exigé par la Confédération pour garantir la sécurité à long terme.
            </p>
          </div>
        </section>

        {/* Directory Link */}
        <div className="mb-12 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 mb-1">Consultez les fiches détaillées de tous les assureurs</h3>
            <p className="text-xs text-slate-500">CSS, Helsana, Swica, Sanitas, Assura, Groupe Mutuel, Concordia, Visana, etc.</p>
          </div>
          <button
            onClick={() => onNavigate('hub-insurers')}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5"
          >
            Voir l'annuaire des assureurs
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {BEST_FAQS.map((faq, index) => {
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

        {/* Semantic Internal Linking Silo */}
        <RelatedContent
          currentPath="/fr/guide-assurance-maladie/meilleure-assurance-maladie/"
          topicType="guide"
          currentSlug="meilleure-assurance-maladie"
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
        <div className="bg-emerald-700 text-white rounded-2xl p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Comparez prix et notes de satisfaction en temps réel</h3>
            <p className="text-emerald-100 text-sm max-w-xl">
              Trouvez le compromis parfait entre tarif mensuel avantageux et service d'excellence.
            </p>
          </div>
          <button
            onClick={onStartComparison}
            className="w-full sm:w-auto px-6 py-3.5 bg-white text-emerald-900 font-bold rounded-xl shadow-md hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            Lancer le Comparateur Neutre
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </>
  );
}
