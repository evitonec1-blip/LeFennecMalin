/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * LAMal vs LCA Page — Mandatory Basic Insurance vs Voluntary Supplementary Insurance
 */

import React, { useState } from 'react';
import { 
  Scale, 
  ShieldAlert, 
  ShieldCheck, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Lock,
  AlertCircle 
} from 'lucide-react';
import SEOHead, { breadcrumbSchema, faqSchema, organizationSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { useLanguage } from '../../i18n/LanguageContext';
import { AppTab } from '../../types';

interface Props {
  onNavigate: (tab: AppTab) => void;
  onStartComparison: () => void;
}

const FAQS = [
  {
    question: "Puis-je avoir ma LAMal chez un assureur et mes complémentaires (LCA) chez un autre ?",
    answer: "Oui, tout à fait. La loi suisse vous autorise à souscrire votre assurance de base LAMal auprès de la caisse la moins chère (ex: Assura, KPT) et à conserver vos assurances complémentaires LCA auprès d'un assureur spécialisé (ex: Groupe Mutuel, Helsana, Swica). Aucune caisse ne peut refuser votre résiliation de base au motif que vous avez des complémentaires chez elle."
  },
  {
    question: "Quelle est la différence légale majeure entre LAMal et LCA ?",
    answer: "La LAMal relève du droit public : l'admission est obligatoire sans réserve, sans questionnaire médical, et les prestations sont identiques partout. La LCA relève du droit privé des contrats : l'assureur est libre d'accepter ou refuser votre adhésion, d'émettre des réserves médicales à vie et de fixer ses propres tarifs selon votre âge et état de santé."
  },
  {
    question: "Faut-il obligatoirement souscrire des complémentaires en Suisse ?",
    answer: "Non, les complémentaires LCA sont strictement facultatives. Elles sont cependant fortement recommandées pour les soins dentaires des enfants, la couverture des médecines douces (ostéopathie, acupuncture), les frais d'urgences et de rapatriement à l'étranger, ou le confort hospitalier (division privée ou mi-privée)."
  }
];

export default function LamalVsLcaPage({ onNavigate, onStartComparison }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { language } = useLanguage();

  const structured = [
    organizationSchema,
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'LAMal', url: '/fr/lamal/' },
      { name: 'LAMal vs LCA', url: '/fr/lamal/lamal-vs-lca/' },
    ]),
    faqSchema(FAQS),
  ];

  return (
    <>
      <SEOHead
        tab="lamal-vs-lca"
        language={language}
        structuredData={structured}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: () => onNavigate('home') },
            { label: 'LAMal', onClick: () => onNavigate('hub-lamal') },
            { label: 'LAMal vs LCA' },
          ]}
        />

        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-200">
            <Scale className="w-3.5 h-3.5" />
            Droit Public vs Droit Privé
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            LAMal vs LCA en Suisse : Quelles Différences ? (Guide 2026)
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            Comprenez la distinction fondamentale entre l'assurance de base obligatoire (LAMal) 
            et les assurances complémentaires privées (LCA) pour bâtir la meilleure couverture au meilleur coût.
          </p>
        </div>

        {/* Comparison Table */}
        <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {/* LAMal Column */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">LAMal (Base Obligatoire)</h2>
                  <span className="text-xs text-emerald-700 font-semibold">Droit public fédéral</span>
                </div>
              </div>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Obligation légale</strong> pour tous les résidents en Suisse</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Admission sans réserve :</strong> Aucun questionnaire médical autorisé</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Prestations strictement identiques</strong> dans toutes les caisses</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Résiliation chaque année</strong> au 30 novembre sans pénalité</span>
                </li>
              </ul>
            </div>

            {/* LCA Column */}
            <div className="p-6 sm:p-8 bg-slate-50/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">LCA (Complémentaires)</h2>
                  <span className="text-xs text-purple-700 font-semibold">Droit privé contractuel</span>
                </div>
              </div>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Facultatif :</strong> Soins dentaires, médecines douces, division privée</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Questionnaire de santé strict :</strong> L'assureur peut refuser ou exclure</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Tarifs libres :</strong> Évoluent selon l'âge et les risques de la caisse</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Prudence :</strong> Ne jamais résilier sans acceptation écrite préalable</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            Questions fréquentes LAMal vs LCA
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

        {/* CTA */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Séparez votre LAMal pour économiser immédiatement</h3>
            <p className="text-slate-400 text-sm max-w-xl">
              Gardez vos complémentaires actuelles et basculez votre LAMal sur l'assureur le moins cher de votre canton.
            </p>
          </div>
          <button
            onClick={onStartComparison}
            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-md whitespace-nowrap flex items-center justify-center gap-2"
          >
            Comparer la Base LAMal
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </>
  );
}
