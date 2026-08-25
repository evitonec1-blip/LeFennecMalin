/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Insurance Models Page — Standard vs Telmed vs Médecin de famille vs HMO
 */

import React, { useState } from 'react';
import { 
  PhoneCall, 
  UserCheck, 
  Building2, 
  Shield, 
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
import { getLocalizedPath } from '../multilingualRoutes';
import RelatedContent from '../components/RelatedContent';
import CantonCrossLinks from '../components/CantonCrossLinks';

interface Props {
  onNavigate: (tab: AppTab) => void;
  onStartComparison: () => void;
}

const MODELS_FAQS = [
  {
    question: "Qu'est-ce que le modèle Telmed (Télémédecine) ?",
    answer: "Le modèle Telmed exige que vous appeliez une permanence médicale téléphonique (ex: Medgate, Santé24) avant toute consultation physique. Le médecin régulateur évalue votre situation et vous oriente vers un cabinet ou des soins à domicile si nécessaire. En échange, vous bénéficiez de 10% à 20% de rabais sur vos primes."
  },
  {
    question: "Quelles sont les exceptions où l'on peut consulter directement sans passer par Telmed ou son médecin ?",
    answer: "Toutes les caisses prévoient des exceptions directes : les urgences vitales absolues, les consultations gynécologiques de contrôle et de suivi de grossesse, les examens ophtalmologiques de routine, et les soins pédiatriques chez les enfants."
  },
  {
    question: "Que se passe-t-il si je ne respecte pas les règles de mon modèle alternatif ?",
    answer: "En cas de non-respect (consulter un spécialiste sans bon de délégation préalable), la caisse peut vous envoyer un avertissement, refuser la prise en charge de la facture, ou vous reclasser d'office dans le modèle Standard plus onéreux."
  },
  {
    question: "Quel est le modèle d'assurance le plus populaire en Suisse ?",
    answer: "Plus de 75% des assurés suisses ont abandonné le modèle Standard traditionnel au profit du modèle Médecin de famille ou Telmed, permettant d'économiser entre 300 et 800 CHF par an tout en conservant une excellente prise en charge."
  }
];

export default function InsuranceModelsPage({ onNavigate, onStartComparison }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { language } = useLanguage();

  const structured = [
    organizationSchema,
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'LAMal', url: '/fr/lamal/' },
      { name: 'Modèles d\'Assurance', url: '/fr/lamal/modeles/' },
    ]),
    faqSchema(MODELS_FAQS),
  ];

  return (
    <>
      <SEOHead
        tab="lamal-modeles"
        language={language}
        structuredData={structured}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: () => onNavigate('home') },
            { label: 'LAMal', onClick: () => onNavigate('hub-lamal') },
            { label: 'Modèles d\'Assurance' },
          ]}
        />

        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-200">
            <Percent className="w-3.5 h-3.5" />
            Économisez jusqu'à 25% sur vos primes
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Modèles d'Assurance Maladie en Suisse : Le Comparatif 2026
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            Standard (libre choix), Telmed, Médecin de famille ou HMO : comparez le fonctionnement, 
            les rabais accordés et les règles de chaque modèle d'assurance obligatoire.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Telmed */}
          <div className="bg-white border-2 border-emerald-500/80 rounded-2xl p-6 shadow-sm relative">
            <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full">
              Rabais : 10% à 20%
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Modèle Telmed (Télémédecine)</h2>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Premier contact obligatoire par téléphone ou application médicale (Medgate, Sancall) avant de consulter un médecin en cabinet.
            </p>
            <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                Disponible 24h/24 et 7j/7
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                Orientation rapide sans déplacement inutile
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                Idéal pour les personnes connectées et mobiles
              </li>
            </ul>
          </div>

          {/* Médecin de Famille */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative">
            <div className="absolute top-4 right-4 px-3 py-1 bg-blue-100 text-blue-800 font-bold text-xs rounded-full">
              Rabais : 8% à 15%
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <UserCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Modèle Médecin de Famille</h2>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Vous choisissez un médecin traitant référent qui coordonne tous vos soins et vous délivre un bon de délégation pour les spécialistes.
            </p>
            <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                Suivi médical personnalisé et durable
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                Le médecin connaît parfaitement votre historique
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                Recommandé pour les familles et seniors
              </li>
            </ul>
          </div>

          {/* HMO */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative">
            <div className="absolute top-4 right-4 px-3 py-1 bg-purple-100 text-purple-800 font-bold text-xs rounded-full">
              Rabais : 15% à 25%
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Modèle HMO (Centre de santé)</h2>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Toutes vos consultations ont lieu au sein d'un centre médical de groupe ou d'un réseau de soins partenaires de la caisse.
            </p>
            <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                Rabais de prime parmi les plus élevés de Suisse
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                Médecins généralistes et spécialistes sur place
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                Principalement disponible dans les grands centres urbains
              </li>
            </ul>
          </div>

          {/* Standard */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative">
            <div className="absolute top-4 right-4 px-3 py-1 bg-slate-100 text-slate-700 font-bold text-xs rounded-full">
              Rabais : 0% (Plein tarif)
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Modèle Standard (Libre Choix)</h2>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Liberté absolue de consulter n'importe quel médecin généraliste ou spécialiste agréé en Suisse sans avis préalable.
            </p>
            <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-600 flex-shrink-0" />
                Aucune contrainte de délégation ou de réseau
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-600 flex-shrink-0" />
                Modèle le plus cher du marché suisse
              </li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            Questions fréquentes sur les modèles d'assurance
          </h2>
          <div className="space-y-4">
            {MODELS_FAQS.map((faq, index) => {
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
          currentPath="/fr/guide-assurance-maladie/modeles-assurance-lamal/"
          topicType="guide"
          currentSlug="modeles"
          onNavigate={(url) => {
            const tab = url.replace(/^\/[a-z]{2}\//, '').replace(/\/$/, '') as AppTab;
            onNavigate(tab);
          }}
          className="mb-12"
        />

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
            <h3 className="text-xl font-bold mb-2">Quel modèle est le moins cher chez vous ?</h3>
            <p className="text-emerald-100 text-sm max-w-xl">
              Comparez les tarifs Telmed, Médecin de famille et Standard dans votre commune de résidence.
            </p>
          </div>
          <button
            onClick={onStartComparison}
            className="w-full sm:w-auto px-6 py-3.5 bg-white text-emerald-900 font-bold rounded-xl shadow-md hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            Comparer les Modèles 2026
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </>
  );
}
