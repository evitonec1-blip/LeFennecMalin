/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Head-to-Head Insurer Comparison Page (e.g., CSS vs Helsana, Swica vs Sanitas)
 */

import React, { useState } from 'react';
import { 
  Scale, 
  Star, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  ShieldCheck, 
  Building2, 
  Award,
  ExternalLink
} from 'lucide-react';
import SEOHead, { breadcrumbSchema, faqSchema, organizationSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { useLanguage } from '../../i18n/LanguageContext';
import { AppTab } from '../../types';

interface ComparisonData {
  nameA: string;
  nameB: string;
  tabA: AppTab;
  tabB: AppTab;
  tagline: string;
  marketShareA: string;
  marketShareB: string;
  satisfactionA: string;
  satisfactionB: string;
  tiersA: string;
  tiersB: string;
  prosA: string[];
  prosB: string[];
  verdict: string;
}

const COMPARISON_MAP: Record<string, ComparisonData> = {
  'compare-css-helsana': {
    nameA: 'CSS Assurance',
    nameB: 'Helsana',
    tabA: 'insurer-css',
    tabB: 'insurer-helsana',
    tagline: 'Les deux leaders historiques de l\'assurance maladie en Suisse',
    marketShareA: '~1.7 million d\'assurés (N°1)',
    marketShareB: '~1.5 million d\'assurés (N°2)',
    satisfactionA: '5.2 / 6 (Très bon)',
    satisfactionB: '5.1 / 6 (Très bon)',
    tiersA: 'Tiers Payant (Pharmacies & Hôpitaux)',
    tiersB: 'Tiers Payant (Réseau étendu)',
    prosA: ['Leader du marché suisse', 'Application myCSS ultra-complète', 'Programme de fidélité active'],
    prosB: ['Excellente couverture internationale', 'Réseau de soins Benevita', 'Stabilité financière remarquable'],
    verdict: 'CSS se distingue par une digitalisation et une expérience utilisateur légèrement supérieure via son app myCSS, tandis qu\'Helsana offre un suivi médical et des complémentaires très performantes pour les familles et frontaliers.'
  },
  'compare-helsana-swica': {
    nameA: 'Helsana',
    nameB: 'SWICA',
    tabA: 'insurer-helsana',
    tabB: 'insurer-swica',
    tagline: 'Le géant historique face au champion incontesté de la satisfaction client',
    marketShareA: '~1.5 million d\'assurés',
    marketShareB: '~850\'000 assurés',
    satisfactionA: '5.1 / 6 (Très bon)',
    satisfactionB: '5.5 / 6 (N°1 Satisfaction Suisse)',
    tiersA: 'Tiers Payant étendu',
    tiersB: 'Tiers Payant intégral (Pharmacies, Médecins, Hôpitaux)',
    prosA: ['Assise financière gigantesque', 'Conseil de proximité dans toute la Suisse', 'Offre complémentaire modulaire'],
    prosB: ['N°1 de la satisfaction client depuis plus de 10 ans', 'Contribution prévention sport jusqu\'à 1\'300 CHF/an', 'Permanence Santé24 24h/24'],
    verdict: 'SWICA l\'emporte nettement sur la satisfaction client et les généreuses contributions de prévention/fitness, tandis qu\'Helsana offre une puissance financière et des tarifs de base souvent plus compétitifs selon les cantons.'
  },
  'compare-css-swica': {
    nameA: 'CSS Assurance',
    nameB: 'SWICA',
    tabA: 'insurer-css',
    tabB: 'insurer-swica',
    tagline: 'Le numéro 1 en nombre d\'assurés face au numéro 1 de la satisfaction client',
    marketShareA: '~1.7 million d\'assurés',
    marketShareB: '~850\'000 assurés',
    satisfactionA: '5.2 / 6 (Très bon)',
    satisfactionB: '5.5 / 6 (N°1 Satisfaction)',
    tiersA: 'Tiers Payant',
    tiersB: 'Tiers Payant intégral',
    prosA: ['Leader suisse par le nombre d\'affiliés', 'Portail client myCSS', 'Tarifs attractifs dans de nombreux cantons'],
    prosB: ['Meilleur service client de Suisse', 'Remboursements ultra-rapides', 'Bonus sport & bien-être de haut niveau'],
    verdict: 'Si vous recherchez un service client d\'excellence absolue et des remboursements sportifs majeurs, SWICA est le meilleur choix. Si vous cherchez un réseau dense et une application mobile de pointe, la CSS est une référence incontournable.'
  },
  'compare-assura-mutuel': {
    nameA: 'Assura',
    nameB: 'Groupe Mutuel',
    tabA: 'insurer-assura',
    tabB: 'insurer-groupe-mutuel',
    tagline: 'Le duel des spécialistes de Suisse romande : prix discount vs offre globale',
    marketShareA: '~800\'000 assurés',
    marketShareB: '~1.3 million d\'assurés',
    satisfactionA: '4.6 / 6 (Moyen)',
    satisfactionB: '4.9 / 6 (Bon)',
    tiersA: 'Tiers Garant (Vous avancez les frais)',
    tiersB: 'Tiers Payant (Pharmacies & Hôpitaux)',
    prosA: ['Parmi les primes LAMal les plus basses de Suisse', 'Franchise 2500 très agressive', 'App simple pour envoyer les factures'],
    prosB: ['Gamme complète santé, prévoyance et patrimoine', 'Réseau d\'agences étendu en Romandie', 'Modèles alternatifs variés'],
    verdict: 'Assura est idéale pour les personnes en excellente santé cherchant les primes les plus basses possibles en tiers garant. Le Groupe Mutuel est plus adapté aux familles souhaitant un service complet et le tiers payant.'
  },
  'compare-swica-sanitas': {
    nameA: 'SWICA',
    nameB: 'Sanitas',
    tabA: 'insurer-swica',
    tabB: 'insurer-sanitas',
    tagline: 'Le duel des deux assureurs premium les plus innovants de Suisse',
    marketShareA: '~850\'000 assurés',
    marketShareB: '~840\'000 assurés',
    satisfactionA: '5.5 / 6 (Excellente)',
    satisfactionB: '5.3 / 6 (Très bonne)',
    tiersA: 'Tiers Payant intégral',
    tiersB: 'Tiers Payant étendu',
    prosA: ['Primes de prévention sport jusqu\'à 1\'300 CHF', 'Permanence médicale Santé24', 'Qualité de service reconnue'],
    prosB: ['Application mobile ultra-innovante', 'Portail de santé holistique', 'Offres complémentaires modulables'],
    verdict: 'SWICA est la référence pour les sportifs et la qualité de contact humain, tandis que Sanitas est à la pointe de la télémédecine et des outils de santé numériques.'
  },
  'compare-visana-concordia': {
    nameA: 'Visana',
    nameB: 'Concordia',
    tabA: 'insurer-visana',
    tabB: 'insurer-concordia',
    tagline: 'Deux valeurs sûres suisses alliant tradition, proximité et solidité',
    marketShareA: '~830\'000 assurés',
    marketShareB: '~700\'000 assurés',
    satisfactionA: '5.2 / 6 (Très bon)',
    satisfactionB: '5.3 / 6 (Très bon)',
    tiersA: 'Tiers Payant',
    tiersB: 'Tiers Payant',
    prosA: ['Assurance ménage/auto combinable', 'Programme myPoints', 'Excellente assise en Suisse alémanique et romande'],
    prosB: ['Modèles familiaux très généreux', 'Prime de naissance et avantages enfants', 'Service de proximité exemplaire'],
    verdict: 'Concordia est particulièrement recommandée pour les familles avec jeunes enfants grâce à ses rabais et prestations de naissance, alors que Visana offre des réductions multi-produits (santé + ménage + RC).'
  }
};

interface Props {
  comparisonId: string;
  onNavigate: (tab: AppTab) => void;
  onStartComparison: () => void;
}

export default function InsurerComparisonPage({ comparisonId, onNavigate, onStartComparison }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { language } = useLanguage();

  const comp = COMPARISON_MAP[comparisonId] || COMPARISON_MAP['compare-css-helsana'];
  const tabKey = comparisonId as AppTab;

  const faqs = [
    {
      question: `Les prestations de base sont-elles différentes entre ${comp.nameA} et ${comp.nameB} ?`,
      answer: `Non. En assurance obligatoire des soins (LAMal), le catalogue des prestations médicales remboursées est strictement identique par la loi fédérale chez ${comp.nameA} et chez ${comp.nameB}. Les seules différences concernent le montant des primes cantonales, les réseaux de médecins agréés et la qualité du service client.`
    },
    {
      question: `Puis-je changer facilement de ${comp.nameA} vers ${comp.nameB} (ou inversement) ?`,
      answer: `Oui, pour l'assurance de base LAMal, vous pouvez changer chaque année avant le 30 novembre. La nouvelle caisse a l'obligation légale de vous accepter sans condition d'âge ni questionnaire de santé.`
    },
    {
      question: `Comment savoir laquelle de ces deux caisses est la moins chère pour moi ?`,
      answer: `Les primes exactes dépendent de votre code postal, de votre âge et de votre franchise. Utilisez notre comparateur en ligne pour afficher en 2 minutes les tarifs réels 2026 de ${comp.nameA} et ${comp.nameB} dans votre commune.`
    }
  ];

  return (
    <>
      <SEOHead
        tab={tabKey}
        language={language}
        structuredData={[
          organizationSchema,
          breadcrumbSchema([
            { name: 'Accueil', url: '/' },
            { name: 'Comparatifs', url: '/fr/comparatif/' },
            { name: `${comp.nameA} vs ${comp.nameB}`, url: `/fr/comparatif/${comparisonId}/` },
          ]),
          faqSchema(faqs),
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: () => onNavigate('home') },
            { label: 'Assureurs', onClick: () => onNavigate('hub-insurers') },
            { label: `${comp.nameA} vs ${comp.nameB}` },
          ]}
        />

        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-200">
            <Scale className="w-3.5 h-3.5" />
            Comparatif Face-à-Face 2026
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {comp.nameA} vs {comp.nameB} : Le Grand Comparatif 2026
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            {comp.tagline}. Tarifs LAMal, satisfaction client, rapidité des remboursements et avantages complémentaires.
          </p>
        </div>

        {/* Head to Head Scorecard */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {/* Insurer A */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">{comp.nameA}</h2>
                <button
                  onClick={() => onNavigate(comp.tabA)}
                  className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1"
                >
                  Voir fiche complète
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="font-semibold text-slate-700">Part de marché :</span>
                  <span>{comp.marketShareA}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="font-semibold text-slate-700">Satisfaction clients :</span>
                  <span className="font-bold text-emerald-700">{comp.satisfactionA}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="font-semibold text-slate-700">Système de paiement :</span>
                  <span>{comp.tiersA}</span>
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block mb-2">Points forts :</span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {comp.prosA.map((p, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Insurer B */}
            <div className="space-y-4 md:pl-8 pt-6 md:pt-0">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">{comp.nameB}</h2>
                <button
                  onClick={() => onNavigate(comp.tabB)}
                  className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1"
                >
                  Voir fiche complète
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="font-semibold text-slate-700">Part de marché :</span>
                  <span>{comp.marketShareB}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="font-semibold text-slate-700">Satisfaction clients :</span>
                  <span className="font-bold text-emerald-700">{comp.satisfactionB}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="font-semibold text-slate-700">Système de paiement :</span>
                  <span>{comp.tiersB}</span>
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block mb-2">Points forts :</span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {comp.prosB.map((p, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Verdict Box */}
          <div className="mt-8 p-5 bg-slate-50 border border-slate-200 rounded-xl">
            <h3 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              Le Verdict Le Fennec Malin
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {comp.verdict}
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            Questions fréquentes sur {comp.nameA} et {comp.nameB}
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
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Quel est le tarif exact entre ces deux caisses chez vous ?</h3>
            <p className="text-slate-400 text-sm max-w-xl">
              Comparez les primes 2026 de {comp.nameA} et {comp.nameB} selon votre commune de résidence.
            </p>
          </div>
          <button
            onClick={onStartComparison}
            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-md whitespace-nowrap flex items-center justify-center gap-2"
          >
            Comparer {comp.nameA} et {comp.nameB}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </>
  );
}
