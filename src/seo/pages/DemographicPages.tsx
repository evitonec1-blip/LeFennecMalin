/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Demographic & Target Audience Segment Pages
 * - Family Health Insurance (Rabais famille, enfants, nouveau-nés)
 * - Young Adults (19-25 ans, rabais légaux OFSP)
 * - Students (Étudiants suisses et internationaux)
 * - New Residents (Nouveaux arrivants, permis B/C/L, délai 3 mois)
 */

import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  Sparkles, 
  Plane, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Baby, 
  Heart, 
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

// -------------------------------------------------------------
// 1. FAMILY HEALTH INSURANCE PAGE
// -------------------------------------------------------------
export function FamilyInsurancePage({ onNavigate, onStartComparison }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { language } = useLanguage();

  const faqs = [
    {
      question: "Comment fonctionne le rabais famille pour l'assurance maladie en Suisse ?",
      answer: "En Suisse, les enfants (0-18 ans) bénéficient déjà de primes réduites de 70% à 80% par rapport aux adultes. De plus, plusieurs caisses (comme Groupe Mutuel, Helsana, CSS, Concordia) accordent des rabais supplémentaires dès le 2e ou 3e enfant affilié auprès du même assureur."
    },
    {
      question: "Quand faut-il assurer un nouveau-né (assurance prénatale) ?",
      answer: "Il est fortement recommandé de souscrire une assurance prénatale avant la naissance de l'enfant. Cela permet de garantir son acceptation sans questionnaire médical dans les assurances complémentaires (soins dentaires, médecine douce, lunettes), même en cas de complication ou problème de santé à la naissance."
    },
    {
      question: "Quelle franchise choisir pour un enfant ?",
      answer: "La franchise 0 CHF est unanimement recommandée pour les enfants. Les enfants consultent souvent le pédiatre (vaccins, contrôles, maladies infantiles). Les rabais offerts pour les franchises à option (100 à 600 CHF) sont trop faibles pour compenser les frais à votre charge."
    }
  ];

  return (
    <>
      <SEOHead
        tab="lamal-famille"
        language={language}
        structuredData={[
          organizationSchema,
          breadcrumbSchema([
            { name: 'Accueil', url: '/' },
            { name: 'LAMal', url: '/fr/lamal/' },
            { name: 'Assurance Famille', url: '/fr/lamal/famille/' },
          ]),
          faqSchema(faqs),
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: () => onNavigate('home') },
            { label: 'LAMal', onClick: () => onNavigate('hub-lamal') },
            { label: 'Assurance Maladie Famille' },
          ]}
        />

        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-200">
            <Users className="w-3.5 h-3.5" />
            Budget & Protection Familiale
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Assurance Maladie Famille en Suisse : Rabais, Enfants & Prénatale 2026
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            Optimisez le budget santé de votre foyer : découvrez les meilleures caisses avec rabais famille, 
            la gestion des franchises enfants et les conseils essentiels pour la prénatale.
          </p>
        </div>

        {/* 3 Family Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mb-4">
              <Baby className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Assurance Prénatale</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Assurez votre futur bébé avant sa naissance sans questionnaire de santé pour couvrir dentaire et hospitalisation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Rabais Dès le 2e Enfant</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Jusqu'à 50% de réduction additionnelle sur les primes des enfants chez certains grands assureurs suisses.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Franchise 0 CHF Enfant</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Plafond annuel de quote-part à 350 CHF max par enfant (au lieu de 700 CHF pour les adultes).
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            Questions fréquentes famille
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
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
        <div className="bg-emerald-800 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Calculez les primes pour toute la famille</h3>
            <p className="text-emerald-100 text-sm">Comparez en quelques clics le tarif global pour adultes et enfants.</p>
          </div>
          <button
            onClick={onStartComparison}
            className="px-6 py-3.5 bg-white text-emerald-900 font-bold rounded-xl shadow-md hover:bg-emerald-50 whitespace-nowrap flex items-center gap-2"
          >
            Lancer le Comparateur Famille
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}

// -------------------------------------------------------------
// 2. YOUNG ADULT INSURANCE PAGE (19-25 ANS)
// -------------------------------------------------------------
export function YoungAdultInsurancePage({ onNavigate, onStartComparison }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { language } = useLanguage();

  const faqs = [
    {
      question: "Qu'est-ce que le tarif Jeune Adulte en Suisse ?",
      answer: "Les personnes âgées de 19 à 25 ans révolus bénéficient d'une tranche d'âge spécifique définie par la LAMal. La plupart des caisses proposent des rabais statutaires pouvant atteindre 20% à 30% par rapport aux primes adultes ordinaires."
    },
    {
      question: "Que se passe-t-il l'année de mes 26 ans ?",
      answer: "Au 1er janvier qui suit votre 25e anniversaire, vous passez automatiquement au tarif adulte sans rabais jeune. C'est le moment idéal pour revoir votre franchise et comparer les caisses concurrentes pour limiter la hausse."
    }
  ];

  return (
    <>
      <SEOHead
        tab="lamal-jeunes-adultes"
        language={language}
        structuredData={[
          organizationSchema,
          breadcrumbSchema([
            { name: 'Accueil', url: '/' },
            { name: 'LAMal', url: '/fr/lamal/' },
            { name: 'Jeunes Adultes', url: '/fr/lamal/jeunes-adultes/' },
          ]),
          faqSchema(faqs),
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: () => onNavigate('home') },
            { label: 'LAMal', onClick: () => onNavigate('hub-lamal') },
            { label: 'Jeunes Adultes (19-25 ans)' },
          ]}
        />

        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-purple-200">
            <Sparkles className="w-3.5 h-3.5" />
            Tranche d'Âge 19-25 ans
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Assurance Maladie Jeunes Adultes en Suisse : Rabais & Bons Plans 2026
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            Profitez des réductions spéciales accordées par les caisses maladie aux 19-25 ans, 
            combinez Telmed et franchise 2500 pour payer votre assurance au prix le plus bas.
          </p>
        </div>

        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-2">Simulez votre prime 19-25 ans</h3>
            <p className="text-slate-400 text-sm">Découvrez quelles caisses offrent le meilleur rabais dans votre canton.</p>
          </div>
          <button
            onClick={onStartComparison}
            className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-md whitespace-nowrap flex items-center gap-2"
          >
            Comparer pour Jeune Adulte
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            Questions fréquentes 19-25 ans
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
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
      </div>
    </>
  );
}

// -------------------------------------------------------------
// 3. STUDENT INSURANCE PAGE
// -------------------------------------------------------------
export function StudentInsurancePage({ onNavigate, onStartComparison }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { language } = useLanguage();

  const faqs = [
    {
      question: "Les étudiants étrangers peuvent-ils être exemptés de la LAMal ?",
      answer: "Oui. Les étudiants étrangers en séjour temporaire d'études (permis L ou B étudiant) peuvent demander une dispense d'affiliation LAMal auprès de l'autorité cantonale de santé s'ils possèdent une assurance européenne (CEAM) ou une police privée équivalente (Swisscare, Scorestudies)."
    },
    {
      question: "Les étudiants suisses ont-ils droit aux subsides de primes cantonaux ?",
      answer: "Absolument. Tout étudiant suisse ou titulaire d'un permis d'établissement avec un revenu modeste peut déposer une demande de subside cantonal de prime, couvrant souvent 50% à 100% de la prime de base."
    }
  ];

  return (
    <>
      <SEOHead
        tab="lamal-etudiant"
        language={language}
        structuredData={[
          organizationSchema,
          breadcrumbSchema([
            { name: 'Accueil', url: '/' },
            { name: 'LAMal', url: '/fr/lamal/' },
            { name: 'Étudiants', url: '/fr/lamal/etudiant/' },
          ]),
          faqSchema(faqs),
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: () => onNavigate('home') },
            { label: 'LAMal', onClick: () => onNavigate('hub-lamal') },
            { label: 'Étudiants' },
          ]}
        />

        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-200">
            <GraduationCap className="w-3.5 h-3.5" />
            Guide Étudiant & Exemption
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Assurance Maladie Étudiant en Suisse : Règles, Exemption & Subsides 2026
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            Toutes les règles d'affiliation pour étudiants suisses et internationaux : dispenses de LAMal, 
            assurances pour séjour d'études et démarches pour obtenir les subsides cantonaux.
          </p>
        </div>

        <div className="bg-emerald-700 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-2">Trouvez l'offre étudiante la plus économique</h3>
            <p className="text-emerald-100 text-sm">Comparez les primes pour votre canton d'études.</p>
          </div>
          <button
            onClick={onStartComparison}
            className="px-6 py-3.5 bg-white text-emerald-900 font-bold rounded-xl shadow-md whitespace-nowrap flex items-center gap-2"
          >
            Comparer les Offres Étudiants
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            Questions fréquentes étudiants
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
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
      </div>
    </>
  );
}

// -------------------------------------------------------------
// 4. NEW RESIDENT INSURANCE PAGE
// -------------------------------------------------------------
export function NewResidentInsurancePage({ onNavigate, onStartComparison }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { language } = useLanguage();

  const faqs = [
    {
      question: "Quel est le délai pour souscrire son assurance maladie en arrivant en Suisse ?",
      answer: "Vous disposez d'un délai légal strict de 3 mois à compter de la date de votre prise de domicile ou de délivrance de votre permis de séjour (permis B, L, C). La couverture est rétroactive au premier jour de votre arrivée."
    },
    {
      question: "Que se passe-t-il si je dépasse le délai de 3 mois ?",
      answer: "En cas de dépassement, l'autorité cantonale vous affiliera d'office auprès d'une caisse désignée (sans que vous puissiez choisir le tarif) et vous serez soumis à une surprime pour affiliation tardive."
    }
  ];

  return (
    <>
      <SEOHead
        tab="lamal-nouveaux-arrivants"
        language={language}
        structuredData={[
          organizationSchema,
          breadcrumbSchema([
            { name: 'Accueil', url: '/' },
            { name: 'LAMal', url: '/fr/lamal/' },
            { name: 'Nouveaux Arrivants', url: '/fr/lamal/nouveaux-arrivants/' },
          ]),
          faqSchema(faqs),
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: () => onNavigate('home') },
            { label: 'LAMal', onClick: () => onNavigate('hub-lamal') },
            { label: 'Nouveaux Arrivants en Suisse' },
          ]}
        />

        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-200">
            <Plane className="w-3.5 h-3.5" />
            Installation en Suisse
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Assurance Maladie Nouveaux Arrivants en Suisse : Guide Démarches 2026
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            Vous venez de vous installer en Suisse ? Tout ce que vous devez savoir sur le délai des 3 mois, 
            la rétroactivité, le choix du modèle et les démarches d'affiliation obligatoire.
          </p>
        </div>

        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-2">Découvrez les prix dans votre nouvelle commune</h3>
            <p className="text-slate-400 text-sm">Comparez toutes les caisses suisses agréées OFSP en 2 minutes.</p>
          </div>
          <button
            onClick={onStartComparison}
            className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-md whitespace-nowrap flex items-center gap-2"
          >
            Comparer les Caisses
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            Questions fréquentes nouveaux arrivants
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
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
      </div>
    </>
  );
}
