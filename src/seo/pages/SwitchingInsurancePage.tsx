/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Switching Insurance Page — Step-by-Step Guide & Interactive Resignation Letter Generator
 */

import React, { useState } from 'react';
import { 
  Calendar, 
  FileText, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  Check, 
  Printer, 
  AlertTriangle 
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

const SWITCH_FAQS = [
  {
    question: "Quelle est la date limite pour résilier son assurance maladie LAMal ?",
    answer: "La lettre de résiliation doit impérativement parvenir à votre assureur au plus tard le dernier jour ouvré de novembre (le 30 novembre). Attention : c'est la date de réception par la caisse qui fait foi, et non la date du cachet de la poste. Envoyez toujours votre courrier en recommandé au plus tard le 25 novembre."
  },
  {
    question: "Dois-je attendre la confirmation de ma nouvelle caisse avant de résilier l'ancienne ?",
    answer: "Pour l'assurance de base LAMal, la nouvelle caisse a l'obligation légale de vous accepter sans réserve. Vous pouvez donc envoyer votre résiliation en toute tranquillité. En revanche, pour les assurances complémentaires (LCA), ne résiliez JAMAIS avant d'avoir reçu l'acceptation formelle et sans réserve de votre nouvel assureur."
  },
  {
    question: "Puis-je changer d'assureur si j'ai des primes impayées ?",
    answer: "Non. En vertu de l'article 64a de la LAMal, un assuré qui a des factures de primes ou de participations aux coûts impayées ne peut pas changer de caisse maladie tant que l'intégralité de la dette n'a pas été réglée."
  }
];

export default function SwitchingInsurancePage({ onNavigate, onStartComparison }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const { language } = useLanguage();

  // Generator form state
  const [fullName, setFullName] = useState('Jean Dupont');
  const [address, setAddress] = useState('Rue de la Gare 10, 1003 Lausanne');
  const [currentInsurer, setCurrentInsurer] = useState('Assura');
  const [policyNumber, setPolicyNumber] = useState('12345678');

  const letterText = `
${fullName}
${address}

À l'attention de :
${currentInsurer} — Service des Résiliations
Suisse

Fait le ${new Date().toLocaleDateString('fr-CH')}, à ${address.split(',')[1] || 'Lausanne'}

Objet : Résiliation de mon assurance obligatoire des soins (LAMal)
Numéro de police : ${policyNumber}

Madame, Monsieur,

Par la présente, je vous informe de ma décision de résilier mon contrat d'assurance obligatoire des soins (LAMal) souscrit sous le numéro de police ${policyNumber}, avec effet au 31 décembre prochain.

Je vous remercie de bien vouloir me faire parvenir une confirmation écrite de cette résiliation dans les meilleurs délais.

Je vous informe que ma nouvelle caisse maladie prendra contact avec vous afin de vous transmettre l'attestation de reprise de couverture légale.

Dans cette attente, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

${fullName}
(Signature)
  `.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const structured = [
    organizationSchema,
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'LAMal', url: '/fr/lamal/' },
      { name: 'Changer de Caisse', url: '/fr/lamal/changer-assurance-maladie/' },
    ]),
    faqSchema(SWITCH_FAQS),
  ];

  return (
    <>
      <SEOHead
        tab="lamal-changer-caisse"
        language={language}
        structuredData={structured}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: () => onNavigate('home') },
            { label: 'LAMal', onClick: () => onNavigate('hub-lamal') },
            { label: 'Changer de Caisse Maladie' },
          ]}
        />

        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-200">
            <Calendar className="w-3.5 h-3.5" />
            Délai légal : 30 Novembre
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Comment Changer d'Assurance Maladie en Suisse : Guide & Lettre 2026
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            Toutes les démarches pour résilier votre contrat LAMal avant le 30 novembre, 
            les précautions indispensables pour vos complémentaires et notre modèle de lettre gratuit prêt à l'emploi.
          </p>
        </div>

        {/* 3 Step Checklist */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center mb-4">
              1
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Comparez avant fin octobre</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              L'OFSP publie les nouvelles primes fin septembre. Comparez immédiatement les tarifs pour votre canton.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center mb-4">
              2
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Souscrivez la nouvelle offre</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Faites votre demande en ligne auprès de la nouvelle caisse pour recevoir vos documents d'affiliation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center mb-4">
              3
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Envoyez avant le 30 nov.</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Envoyez votre lettre de résiliation en recommandé afin qu'elle parvienne à la caisse avant le 30 novembre.
            </p>
          </div>
        </section>

        {/* Interactive Letter Generator */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl font-bold text-slate-900">Générateur de lettre de résiliation LAMal</h2>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">Gratuit</span>
          </div>
          <p className="text-xs text-slate-500 mb-6">
            Remplissez vos coordonnées ci-dessous pour personnaliser instantanément votre modèle de lettre prêt à imprimer.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Votre Nom et Prénom</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Votre Caisse Actuelle</label>
              <input
                type="text"
                value={currentInsurer}
                onChange={(e) => setCurrentInsurer(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Votre Adresse & NPA/Ville</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Numéro de police / assuré</label>
              <input
                type="text"
                value={policyNumber}
                onChange={(e) => setPolicyNumber(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="relative bg-slate-50 border border-slate-200 rounded-xl p-5 font-mono text-xs text-slate-700 whitespace-pre-wrap leading-relaxed mb-6">
            {letterText}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copié dans le presse-papiers !' : 'Copier le texte de la lettre'}
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Imprimer directement
            </button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            Questions fréquentes sur la résiliation
          </h2>
          <div className="space-y-4">
            {SWITCH_FAQS.map((faq, index) => {
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
          currentPath="/fr/guide-assurance-maladie/changer-assurance-maladie/"
          topicType="guide"
          currentSlug="changer-assurance-maladie"
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
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Prêt à trouver votre nouvel assureur ?</h3>
            <p className="text-slate-400 text-sm max-w-xl">
              Comparez les primes 2026 de toutes les caisses et réalisez jusqu'à 1'200 CHF d'économie par an.
            </p>
          </div>
          <button
            onClick={onStartComparison}
            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            Comparer les Caisses 2026
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </>
  );
}
