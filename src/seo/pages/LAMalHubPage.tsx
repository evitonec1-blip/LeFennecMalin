/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * LAMal Hub Page — Pillar Page for Swiss Mandatory Health Insurance
 */

import React, { useState } from 'react';
import { 
  Shield, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  AlertCircle, 
  Percent, 
  Calendar, 
  Layers,
  HeartPulse,
  Scale
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

const LAMAL_FAQS = [
  {
    question: "Qu'est-ce que la LAMal en Suisse ?",
    answer: "La LAMal (Loi fédérale sur l'assurance-maladie) est le cadre légal instituant l'assurance obligatoire des soins (AOS) en Suisse depuis 1996. Elle garantit à chaque résident un accès universel à des soins médicaux de haute qualité, avec un catalogue de prestations strictement identique auprès de toutes les caisses agréées par l'OFSP."
  },
  {
    question: "Qui est obligé de s'affilier à la LAMal ?",
    answer: "Toute personne domiciliée en Suisse ou y exerçant une activité lucrative (y compris les frontaliers selon leur droit d'option, les résidents temporaires et les nouveau-nés) a l'obligation légale de s'assurer dans les 3 mois suivant son arrivée ou sa naissance."
  },
  {
    question: "Quelles sont les prestations couvertes par la LAMal ?",
    answer: "La LAMal prend en charge les consultations médicales chez les médecins généralistes et spécialistes, les hospitalisations en division commune dans votre canton de domicile, les médicaments figurant sur la Liste des Spécialités (LS), les frais liés à la maternité sans participation aux coûts, ainsi que certaines mesures préventives et réhabilitations."
  },
  {
    question: "Comment fonctionne la participation aux coûts (franchise et quote-part) ?",
    answer: "L'assuré participe aux frais annuels de santé via 3 éléments : la Franchise (de 300 à 2500 CHF payée en premier), la Quote-part de 10% sur les factures dépassant la franchise (plafonnée à 700 CHF/an pour les adultes et 350 CHF/an pour les enfants), et la contribution hospitalière de 15 CHF par jour d'hospitalisation."
  },
  {
    question: "Les caisses maladie peuvent-elles refuser un assuré en LAMal ?",
    answer: "Non. En assurance de base LAMal, le principe d'obligation d'admission s'applique sans exception. Aucun assureur n'a le droit de refuser un candidat, d'imposer un questionnaire de santé, ni de fixer des surprimes en fonction de l'âge ou de l'état de santé."
  }
];

export default function LAMalHubPage({ onNavigate, onStartComparison }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { language } = useLanguage();

  const structured = [
    organizationSchema,
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'LAMal Suisse', url: '/fr/lamal/' },
    ]),
    faqSchema(LAMAL_FAQS),
  ];

  return (
    <>
      <SEOHead
        tab="hub-lamal"
        language={language}
        structuredData={structured}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: () => onNavigate('home') },
            { label: 'LAMal Suisse' },
          ]}
        />

        {/* Header Hero */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-200">
            <Shield className="w-3.5 h-3.5" />
            Guide Officiel LAMal 2026
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            LAMal en Suisse : Guide Complet de l'Assurance Maladie Obligatoire 2026
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            Comprenez en détail la loi sur l'assurance-maladie (LAMal), vos droits légaux, le catalogue de prestations 
            obligatoires, le calcul des quotes-parts et les stratégies d'optimisation de vos primes mensuelles.
          </p>
        </div>

        {/* Action Bar */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 sm:p-8 text-white shadow-lg mb-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold mb-2 text-white">Comparez les primes LAMal 2026 de votre canton</h2>
            <p className="text-emerald-100 text-sm max-w-xl">
              Accédez aux barèmes officiels Priminfo de l'Office Fédéral de la Santé Publique (OFSP) pour toutes les caisses maladie agréées.
            </p>
          </div>
          <button
            onClick={onStartComparison}
            className="w-full sm:w-auto px-6 py-3.5 bg-white text-emerald-800 font-bold rounded-xl shadow-md hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            Lancer le Comparateur LAMal
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Pillar Section 1: Les 3 Piliers de la LAMal */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Scale className="w-6 h-6 text-emerald-600" />
            Les principes fondamentaux de la loi LAMal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Obligation d'assurance</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Chaque personne résidant en Suisse doit obligatoirement souscrire une police de base dans les 3 mois suivant son installation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Prestations identiques</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Le catalogue de soins couverts est fixé par la Confédération. Aucune caisse ne propose une couverture de base supérieure ou inférieure à une autre.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Admission sans réserve</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Les caisses maladie ont l'interdiction stricte de refuser un assuré ou de lui faire remplir un questionnaire de santé pour la LAMal.
              </p>
            </div>
          </div>
        </section>

        {/* Pillar Section 2: Navigation thématique vers les sous-clusters */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Layers className="w-6 h-6 text-emerald-600" />
            Explorez les dossiers spécialisés LAMal
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <a
              href={getLocalizedPath('lamal-franchise', language)}
              onClick={(e) => { e.preventDefault(); onNavigate('lamal-franchise'); }}
              className="text-left p-5 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-md transition-all group block"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Guide Chiffré</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Franchise : 300 ou 2500 CHF ?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Règle mathématique des 1'800 CHF de frais de santé et pièges des franchises intermédiaires.
              </p>
            </a>

            <a
              href={getLocalizedPath('lamal-modeles', language)}
              onClick={(e) => { e.preventDefault(); onNavigate('lamal-modeles'); }}
              className="text-left p-5 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-md transition-all group block"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Économies Primes</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Modèles d'Assurance</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Standard, Telmed, Médecin de famille et HMO : économisez jusqu'à 25% chaque mois.
              </p>
            </a>

            <a
              href={getLocalizedPath('caisse-moins-chere', language)}
              onClick={(e) => { e.preventDefault(); onNavigate('caisse-moins-chere'); }}
              className="text-left p-5 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-md transition-all group block"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Comparatif Réel</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Caisse la Moins Chère</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pourquoi aucune caisse n'est universellement la moins chère et comment trouver la vôtre.
              </p>
            </a>

            <a
              href={getLocalizedPath('meilleure-caisse-maladie', language)}
              onClick={(e) => { e.preventDefault(); onNavigate('meilleure-caisse-maladie'); }}
              className="text-left p-5 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-md transition-all group block"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Classement 2026</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Meilleure Caisse Maladie</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Satisfaction client, rapidité de remboursement, solvabilité OFSP et qualité du service.
              </p>
            </a>

            <a
              href={getLocalizedPath('lamal-changer-caisse', language)}
              onClick={(e) => { e.preventDefault(); onNavigate('lamal-changer-caisse'); }}
              className="text-left p-5 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-md transition-all group block"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Démarches & Lettre</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Changer de Caisse Maladie</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Délai du 30 novembre, modèle de lettre de résiliation gratuit et étapes pas à pas.
              </p>
            </a>

            <a
              href={getLocalizedPath('lamal-vs-lca', language)}
              onClick={(e) => { e.preventDefault(); onNavigate('lamal-vs-lca'); }}
              className="text-left p-5 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-md transition-all group block"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Base vs Privée</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">LAMal vs LCA</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Différences juridiques, questionnaires médicaux et stratégie de double affiliation.
              </p>
            </a>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            Questions fréquentes sur la LAMal
          </h2>
          <div className="space-y-4">
            {LAMAL_FAQS.map((faq, index) => {
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
          currentPath="/fr/lamal/"
          topicType="lamal"
          onNavigate={(url) => {
            const foundTab = url.includes('franchise') ? 'lamal-franchise' : url.includes('modeles') ? 'lamal-modeles' : 'seo-maladie';
            onNavigate(foundTab as AppTab);
          }}
          className="mb-12"
        />

        {/* 26 Cantons Cross-Links */}
        <div className="mb-12">
          <CantonCrossLinks
            mode="health"
            onNavigate={(url) => {
              const cantonPart = url.split('/').filter(Boolean).pop() || '';
              onNavigate(`canton-${cantonPart}` as AppTab);
            }}
          />
        </div>

      </div>
    </>
  );
}
