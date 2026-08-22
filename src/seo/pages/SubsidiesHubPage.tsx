/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Subsidies / Subsides Hub Page (/subsides/ or /subside)
 * Comprehensive Guide & Fenny Simulator for Swiss Health Insurance Subsidies across all 26 Cantons.
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
  Percent,
  Sparkles
} from 'lucide-react';
import SEOHead, { breadcrumbSchema, faqSchema, organizationSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { ALL_26_CANTONS, CANTONS_SEO_DATA } from '../data/cantonsData';
import { useLanguage } from '../../i18n/LanguageContext';
import { AppTab } from '../../types';
import FennySubsidySimulator from '../../components/FennySubsidySimulator';

// Mascot image
import fenyWinking from '../../assets/images/feny_mascot_avatar_1783245725195.jpg';

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
    answer: "Toute personne assurée en Suisse (salarié, indépendant, retraité, étudiant, apprenti, demandeur d'emploi) dont le revenu et la fortune du ménage ne dépassent pas les plafonds légaux fixés par son canton de domicile. Les conditions varient d'un canton à l'autre."
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
    answer: "Dans certains cantons (comme Genève ou Vaud pour les personnes taxées de manière ordinaire), l'éligibilité est calculée automatiquement lors du traitement de la déclaration d'impôt. Toutefois, en cas de baisse récente de revenus, de séparation, de fin de chômage ou d'arrivée en Suisse, vous devez impérativement déposer une demande extraordinaire avant la date limite cantonale."
  },
  {
    question: "Puis-je changer de caisse maladie si je reçois des subsides ?",
    answer: "Oui, absolument ! Le fait de percevoir un subside n'entrave en rien votre droit de résilier votre contrat pour choisir une caisse maladie moins chère au 1er janvier. Changer pour un assureur économique permet souvent de couvrir l'intégralité de la prime avec le subside et d'annuler votre reste à charge."
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

  const scrollToSimulator = () => {
    const el = document.getElementById('fenny-subsidy-simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGuide = () => {
    const el = document.getElementById('subsidy-guide-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEOHead
        tab={'hub-subsides' as AppTab}
        language={language}
        title="Subsides Assurance Maladie Suisse 2026 — Simulateur Fenny & Barèmes 26 Cantons | Le Fennec Malin"
        description="Vérifiez votre éligibilité aux subsides d'assurance maladie (LAMal 2026) avec Fenny. Simulateur gratuit, barèmes RDU par canton (Genève, Vaud, Valais, Fribourg...) et démarches officielles."
        structuredData={structured}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: onGoHome },
            { label: 'Subsides Assurance Maladie' }
          ]}
        />

        {/* Hero Banner with Fenny Companion */}
        <div className="mb-12 bg-gradient-to-br from-[#FAF7F3] via-white to-orange-50/20 rounded-3xl border border-fennec-cream/80 p-6 sm:p-10 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                <Coins className="w-3.5 h-3.5" />
                Aides Publiques Cantonales 2026 · LAMal
              </div>
              <h1 className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-fennec-dark leading-tight">
                Fenny t’aide à vérifier si tu peux bénéficier d’un subside !
              </h1>
              <p className="text-fennec-dark/75 text-base sm:text-lg leading-relaxed">
                Le subside peut réduire une partie de vos primes d’assurance maladie. Répondez à quelques questions et découvrez si vous pourriez être éligible selon les barèmes officiels 2026 de votre canton.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={scrollToSimulator}
                  className="inline-flex items-center gap-2 bg-fennec-terracotta text-white font-display font-bold px-7 py-3.5 rounded-full shadow-md hover:bg-fennec-terracotta/90 transition-all active:scale-95 text-xs uppercase tracking-wider cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  Vérifier mon droit au subside
                </button>
                <button
                  type="button"
                  onClick={scrollToGuide}
                  className="inline-flex items-center gap-2 bg-white hover:bg-fennec-cream/40 text-fennec-dark border border-fennec-cream/80 font-display font-bold px-6 py-3.5 rounded-full transition-all text-xs uppercase tracking-wider cursor-pointer shadow-xs"
                >
                  Comprendre les subsides
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mascot Visual Badge */}
            <div className="shrink-0 self-center md:self-auto flex flex-col items-center">
              <div className="relative">
                <img
                  src={fenyWinking}
                  alt="Fenny mascotte comparateur subside"
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover border-4 border-white shadow-lg"
                />
                <span className="absolute -bottom-2 -right-2 bg-emerald-600 text-white font-black text-[11px] px-3 py-1 rounded-full shadow-xs">
                  2026 Validé
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE FENNY SUBSIDY SIMULATOR */}
        <div className="mb-14">
          <FennySubsidySimulator
            onStartHealthComparison={onStartComparison}
            onNavigateCantonGuide={(slug) => {
              if (onSelectCanton) {
                onSelectCanton(slug);
              } else {
                onNavigate(`/subsides/${slug}/`);
              }
            }}
          />
        </div>

        {/* 3 Key Concepts of Subsidies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
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

        {/* How Subsidies Work Section (Guide) */}
        <div id="subsidy-guide-section" className="bg-white rounded-3xl border border-fennec-cream/60 p-6 sm:p-10 mb-14 shadow-xs space-y-8">
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
                <li>Des déductions forfaitaires par enfant à charge (CHF 8'000 à CHF 12'000 / enfant)</li>
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
                <li><strong>Délai légal :</strong> Déposer sa demande avant le 30 novembre pour effet rétroactif au 1er janvier.</li>
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
        <div id="cantons-grid" className="mb-14">
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
                type="button"
                onClick={() => setFilterRegion('all')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${filterRegion === 'all' ? 'bg-fennec-dark text-white' : 'text-fennec-dark/70 hover:text-fennec-dark'}`}
              >
                Tous (26)
              </button>
              <button
                type="button"
                onClick={() => setFilterRegion('romandie')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${filterRegion === 'romandie' ? 'bg-fennec-dark text-white' : 'text-fennec-dark/70 hover:text-fennec-dark'}`}
              >
                Romandie
              </button>
              <button
                type="button"
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
                        <h3 className="font-display font-bold text-base text-fennec-dark">
                          {canton.name}
                        </h3>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-fennec-dark/40 bg-fennec-cream/30 px-2 py-0.5 rounded-full">
                        {canton.region}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4 text-xs">
                      <div>
                        <span className="text-fennec-dark/50 block text-[11px] font-bold">Organisme :</span>
                        <p className="font-medium text-fennec-dark/85 line-clamp-1">{agency}</p>
                      </div>
                      <div>
                        <span className="text-fennec-dark/50 block text-[11px] font-bold">Plafonds :</span>
                        <p className="text-fennec-dark/70 text-[11px] line-clamp-2 leading-relaxed">{limits}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-fennec-cream/50 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectCanton) {
                          onSelectCanton(canton.slug);
                        } else {
                          onNavigate(`/subsides/${canton.slug}/`);
                        }
                      }}
                      className="text-xs font-bold text-fennec-terracotta hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Guide complet</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-fennec-dark/50 hover:text-fennec-dark inline-flex items-center gap-1"
                    >
                      <span>Portail</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl border border-fennec-cream/60 p-6 sm:p-10 mb-14 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-700">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-black text-2xl text-fennec-dark">
                Foire aux questions sur les subsides LAMal
              </h2>
              <p className="text-xs text-fennec-dark/60">
                Tout ce que vous devez savoir pour obtenir votre réduction individuelle de prime.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {SUBSIDIES_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-fennec-cream/60 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-display font-bold text-sm sm:text-base text-fennec-dark flex items-center justify-between gap-4 hover:bg-[#FAF7F3] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-fennec-terracotta shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-fennec-dark/50 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-fennec-dark/75 leading-relaxed bg-[#FAF7F3]/40 border-t border-fennec-cream/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Comparison CTA Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-fennec-dark to-stone-900 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
              Maximisez vos économies avec la caisse la moins chère
            </h3>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
              Même avec un subside, le choix d'un assureur économique permet d'annuler totalement votre reste à charge. Comparez les 37 caisses suisses en 2 minutes.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onStartComparison()}
            className="inline-flex items-center gap-2 bg-fennec-terracotta hover:bg-fennec-terracotta/90 text-white font-display font-bold px-7 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md shrink-0 cursor-pointer"
          >
            <span>Comparer maintenant</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </>
  );
}
