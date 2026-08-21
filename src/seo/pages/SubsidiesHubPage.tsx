/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Subsidies / Subsides Hub Page (/subsides/)
 * Comprehensive Guide to Swiss Health Insurance Subsidies across all 26 Cantons.
 */

import React, { useState } from 'react';
import { 
  Coins, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  FileText, 
  Calendar, 
  AlertCircle, 
  Building2, 
  ExternalLink,
  PhoneCall,
  UserCheck,
  ShieldCheck,
  TrendingUp,
  Percent
} from 'lucide-react';
import SEOHead, { breadcrumbSchema, faqSchema, organizationSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { ALL_26_CANTONS, CANTONS_SEO_DATA } from '../data/cantonsData';
import { useLanguage } from '../../i18n/LanguageContext';
import { AppTab } from '../../types';

interface Props {
  onStartComparison: (cantonCode?: string) => void;
  onGoHome: () => void;
  onNavigate: (url: string) => void;
  onSelectCanton?: (cantonSlug: string) => void;
}

const SUBSIDIES_FAQS = [
  {
    question: "Qu'est-ce qu'un subside d'assurance-maladie en Suisse ?",
    answer: "Un subside d'assurance-maladie (ou réduction de prime individuelle - RIP / IPV) est une aide financière mensuelle versée par votre canton de domicile pour prendre en charge tout ou partie de votre prime d'assurance obligatoire des soins (LAMal). Ce montant est déduit directement de la facture envoyée par votre caisse maladie."
  },
  {
    question: "Qui a droit aux subsides cantonaux d'assurance maladie ?",
    answer: "Toute personne assurée en Suisse (salarié, indépendant, retraité, étudiant, apprenti, demandeur d'emploi) dont le revenu et la fortune du ménage ne dépassent pas les plafonds légaux fixés par son canton de domicile. Les conditions varient considérablement d'un canton à l'autre."
  },
  {
    question: "Comment est calculé le droit aux subsides (RDU vs Revenu imposable) ?",
    answer: "La majorité des cantons romands (comme Genève et Vaud) calculent le Revenu Déterminant Unifié (RDU), qui prend en compte le revenu net, une fraction de la fortune nette et le nombre d'enfants à charge. Dans d'autres cantons, c'est le revenu net imposable issu de la dernière taxation fiscale qui fait foi."
  },
  {
    question: "Le subside est-il versé sur mon compte bancaire ou à ma caisse maladie ?",
    answer: "En règle générale, le subside cantonal est versé directement à votre caisse maladie, qui déduit ce montant sur votre décompte de prime mensuel. Si votre subside est supérieur au montant de votre prime, le solde n'est généralement pas remboursé en espèces."
  },
  {
    question: "L'octroi du subside est-il automatique ou faut-il faire une demande ?",
    answer: "Dans certains cantons (comme Genève ou Vaud pour les personnes taxées de manière ordinaire), l'éligibilité est calculée automatiquement lors du traitement de la déclaration d'impôt. Toutefois, en cas de baisse récente de revenus, de divorce, de fin de chômage ou d'arrivée en Suisse, vous devez impérativement déposer une demande extraordinaire avant la date limite cantonale."
  },
  {
    question: "Puis-je changer de caisse maladie si je reçois des subsides ?",
    answer: "Oui, absolument ! Le fait de percevoir un subside n'entrave en rien votre droit de résilier votre contrat pour choisir une caisse maladie moins chère au 1er janvier. Changer pour un assureur économique permet souvent de couvrir l'intégralité de la prime avec le subside."
  }
];

export default function SubsidiesHubPage({ onStartComparison, onGoHome, onNavigate, onSelectCanton }: Props) {
  const { language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [filterRegion, setFilterRegion] = useState<string>('all');

  const structured = [
    organizationSchema,
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'Subsides Assurance Maladie', url: '/subsides/' }
    ]),
    faqSchema(SUBSIDIES_FAQS)
  ];

  const filteredCantons = ALL_26_CANTONS.filter(c => {
    if (filterRegion === 'romandie') return c.region.includes('Romandie');
    if (filterRegion === 'alemanique') return !c.region.includes('Romandie') && !c.region.includes('Tessin');
    if (filterRegion === 'tessin') return c.region.includes('Tessin');
    return true;
  });

  return (
    <>
      <SEOHead
        tab={'hub-subsides' as AppTab}
        language={language}
        title="Subsides Assurance Maladie Suisse 2026 — Guide & Barèmes par Canton | Le Fennec Malin"
        description="Guide complet des subsides LAMal en Suisse : conditions d'octroi, plafonds de revenus (RDU), démarches par canton (Genève, Vaud, Valais, Fribourg) et simulateur."
        structuredData={structured}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: onGoHome },
            { label: 'Subsides Assurance Maladie' }
          ]}
        />

        {/* Hero Banner */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
            <Coins className="w-3.5 h-3.5" />
            Aides Publiques Cantonales 2026 · LAMal
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-fennec-dark mb-4 leading-tight">
            Subsides d'assurance maladie en Suisse : barèmes et démarches 2026
          </h1>
          <p className="text-fennec-dark/75 text-base sm:text-lg leading-relaxed mb-8">
            En Suisse, près de <strong>30% des ménages</strong> ont droit à une réduction individuelle de prime (subside) financée par leur canton pour payer leur assurance obligatoire des soins (LAMal). Découvrez les conditions d'octroi, les plafonds de revenus et comment déposer votre demande.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onStartComparison()}
              className="inline-flex items-center gap-2 bg-fennec-terracotta text-white font-display font-bold px-7 py-3.5 rounded-full shadow-md hover:bg-fennec-terracotta/90 transition-all active:scale-95 text-xs uppercase tracking-wider cursor-pointer"
            >
              Calculer mes primes & subsides
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#cantons-grid"
              className="inline-flex items-center gap-2 bg-fennec-cream/40 hover:bg-fennec-cream/70 text-fennec-dark font-display font-bold px-6 py-3.5 rounded-full transition-all text-xs uppercase tracking-wider cursor-pointer"
            >
              Voir les barèmes par canton
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 3 Key Concepts of Subsidies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          <div className="bg-white rounded-3xl border border-fennec-cream/60 p-6 shadow-xs">
            <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4 text-emerald-600">
              <Coins className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-fennec-dark mb-2">
              Jusqu'à 100% de la prime
            </h3>
            <p className="text-xs text-fennec-dark/70 leading-relaxed">
              Selon vos revenus et la composition de votre foyer, le subside cantonal peut couvrir de 10% à 100% du montant de votre prime de référence LAMal.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-fennec-cream/60 p-6 shadow-xs">
            <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 text-blue-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-fennec-dark mb-2">
              Déduction automatique
            </h3>
            <p className="text-xs text-fennec-dark/70 leading-relaxed">
              Le montant octroyé est directement versé par le canton à votre assureur, réduisant directement votre facture mensuelle sans démarche bancaire.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-fennec-cream/60 p-6 shadow-xs">
            <div className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center mb-4 text-amber-600">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-fennec-dark mb-2">
              Changement de caisse libre
            </h3>
            <p className="text-xs text-fennec-dark/70 leading-relaxed">
              Vous conservez votre subside même si vous changez de caisse maladie pour le 1er janvier. Choisir une caisse économique maximise vos économies.
            </p>
          </div>
        </div>

        {/* How Subsidies Work Section */}
        <div className="bg-white rounded-3xl border border-fennec-cream/60 p-6 sm:p-10 mb-12 shadow-xs space-y-8">
          <div className="space-y-3">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-fennec-dark">
              Comment fonctionne le calcul du subside d'assurance-maladie ?
            </h2>
            <p className="text-sm text-fennec-dark/75 leading-relaxed">
              Chaque canton suisse dispose de sa propre législation pour fixer le montant des aides, mais la règle fondamentale repose sur le ratio entre le coût de la prime moyenne cantonale et les capacités contributives du ménage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-[#FAF7F3] rounded-2xl border border-fennec-cream/50 space-y-3">
              <h3 className="font-display font-bold text-base text-fennec-dark flex items-center gap-2">
                <Percent className="w-4 h-4 text-fennec-terracotta" />
                1. Le Revenu Déterminant Unifié (RDU)
              </h3>
              <p className="text-xs text-fennec-dark/75 leading-relaxed">
                Utilisé notamment dans les cantons de Genève, Vaud et Neuchâtel, le RDU regroupe :
              </p>
              <ul className="text-xs text-fennec-dark/70 space-y-1.5 list-disc pl-4">
                <li>Le revenu net imposable de tous les membres du foyer fiscal</li>
                <li>Une part de la fortune nette (généralement 1/10e ou 1/15e au-delà d'une franchise)</li>
                <li>Des déductions forfaitaires par enfant à charge (CHF 5'000 à CHF 10'000 / enfant)</li>
              </ul>
            </div>

            <div className="p-5 bg-[#FAF7F3] rounded-2xl border border-fennec-cream/50 space-y-3">
              <h3 className="font-display font-bold text-base text-fennec-dark flex items-center gap-2">
                <Calendar className="w-4 h-4 text-fennec-terracotta" />
                2. Les Délais et Modalités de Demande
              </h3>
              <p className="text-xs text-fennec-dark/75 leading-relaxed">
                Selon votre situation fiscale :
              </p>
              <ul className="text-xs text-fennec-dark/70 space-y-1.5 list-disc pl-4">
                <li><strong>Traitement d'office :</strong> Calculé lors de votre avis de taxation annuelle.</li>
                <li><strong>Demande sur formulaire :</strong> Indispensable pour les indépendants en création, nouveaux arrivants, étudiants majeurs ou en cas de baisse de salaire supérieure à 15-20%.</li>
                <li><strong>Délai légal :</strong> Déposer sa demande avant le 30 novembre pour rétroactivité au 1er janvier.</li>
              </ul>
            </div>
          </div>

          {/* Checklist Documents */}
          <div className="p-5 bg-amber-500/10 rounded-2xl border border-amber-500/20 space-y-3">
            <h3 className="font-display font-bold text-sm text-amber-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-700" />
              Documents indispensables pour une demande de subside extraordinaire
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-950/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Dernière police d'assurance maladie (LAMal 2026)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>3 dernières fiches de salaire ou attestation de chômage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Dernière décision de taxation fiscale cantonale</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Pièce d'identité et permis de séjour (B, C, G ou L)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Canton Directory Section */}
        <div id="cantons-grid" className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-fennec-dark">
                Barèmes et organismes de subsides par canton
              </h2>
              <p className="text-xs sm:text-sm text-fennec-dark/70 mt-1">
                Sélectionnez votre canton pour consulter le service officiel, les seuils RDU et le lien direct de demande.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-fennec-cream/30 rounded-full text-xs font-semibold self-start sm:self-auto">
              <button
                onClick={() => setFilterRegion('all')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${filterRegion === 'all' ? 'bg-fennec-dark text-white' : 'text-fennec-dark/70 hover:text-fennec-dark'}`}
              >
                Tous (26)
              </button>
              <button
                onClick={() => setFilterRegion('romandie')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${filterRegion === 'romandie' ? 'bg-fennec-dark text-white' : 'text-fennec-dark/70 hover:text-fennec-dark'}`}
              >
                Romandie
              </button>
              <button
                onClick={() => setFilterRegion('alemanique')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${filterRegion === 'alemanique' ? 'bg-fennec-dark text-white' : 'text-fennec-dark/70 hover:text-fennec-dark'}`}
              >
                Suisse alémanique
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCantons.map((canton) => {
              const data = CANTONS_SEO_DATA[canton.slug];
              const agency = data?.subsideAgency || `Service cantonal des assurances sociales (${canton.code})`;
              const limits = data?.subsideIncomeLimits || "Consultez les barèmes officiels sur le portail cantonal.";
              const link = data?.subsideLink || `https://www.ch.ch/fr/assurances/assurance-maladie/reduction-des-primes/`;

              return (
                <div
                  key={canton.code}
                  className="bg-white rounded-2xl border border-fennec-cream/60 p-5 shadow-xs flex flex-col justify-between hover:border-fennec-terracotta/40 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 bg-fennec-terracotta/10 text-fennec-terracotta font-black text-xs rounded-lg flex items-center justify-center font-mono">
                          {canton.code}
                        </span>
                        <h3 className="font-display font-bold text-base text-fennec-dark group-hover:text-fennec-terracotta transition-colors">
                          {canton.name}
                        </h3>
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-fennec-dark/50 bg-fennec-cream/30 px-2 py-0.5 rounded-md">
                        {canton.region.split(' ')[0]}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div>
                        <span className="text-[11px] font-bold text-fennec-dark/60 block">Organisme :</span>
                        <span className="text-xs font-semibold text-fennec-dark line-clamp-1">{agency}</span>
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-fennec-dark/60 block">Seuils indicatifs :</span>
                        <p className="text-xs text-fennec-dark/75 line-clamp-2 leading-relaxed">{limits}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-fennec-cream/40 flex items-center justify-between">
                    <button
                      onClick={() => {
                        if (onSelectCanton) onSelectCanton(canton.slug);
                        else onNavigate(`/assurance-maladie/${canton.slug}/`);
                      }}
                      className="text-xs font-bold text-fennec-terracotta hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Primes {canton.name}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    {data?.subsideLink && (
                      <a
                        href={data.subsideLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-fennec-dark/60 hover:text-fennec-dark inline-flex items-center gap-1"
                      >
                        <span>Portail officiel</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-3xl border border-fennec-cream/60 p-6 sm:p-10 mb-12 shadow-xs">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-fennec-terracotta" />
            <h2 className="font-display font-black text-2xl sm:text-3xl text-fennec-dark">
              Foire aux questions sur les subsides d'assurance maladie
            </h2>
          </div>

          <div className="space-y-3">
            {SUBSIDIES_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-fennec-cream/60 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-fennec-cream/20 transition-colors cursor-pointer"
                  >
                    <span className="font-display font-bold text-sm sm:text-base text-fennec-dark">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-fennec-terracotta shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-fennec-dark/40 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-fennec-dark/75 leading-relaxed border-t border-fennec-cream/40 bg-[#FAF7F3]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Bottom */}
        <div className="bg-gradient-to-br from-fennec-dark to-[#241A15] text-white rounded-3xl p-8 sm:p-10 text-center space-y-5 shadow-lg">
          <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-bold tracking-wider uppercase text-fennec-sand">
            Optimisation Budgétaire 2026
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl">
            Cumulez subsides et primes les plus basses
          </h2>
          <p className="text-white/80 text-sm max-w-xl mx-auto leading-relaxed">
            En choisissant la caisse maladie la moins chère de votre canton, votre subside couvre une proportion bien plus importante de vos coûts de santé. Calculez votre économie nette en 2 minutes.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onStartComparison()}
              className="inline-flex items-center gap-2 bg-fennec-terracotta hover:bg-fennec-terracotta/90 text-white font-display font-bold px-8 py-4 rounded-full shadow-md transition-all active:scale-95 text-xs uppercase tracking-wider cursor-pointer"
            >
              Lancer le comparateur officiel 2026
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
