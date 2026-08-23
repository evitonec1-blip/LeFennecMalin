/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Canton Subsidies Page (/subsides/:cantonSlug/)
 * Deep-dive cantonal subsidy guide with embedded Fenny Simulator, official agency links, thresholds, and deadlines.
 */

import React, { useState } from 'react';
import { 
  Coins, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  PhoneCall, 
  ExternalLink, 
  Calendar, 
  FileText, 
  ShieldCheck, 
  Percent, 
  AlertCircle,
  Clock,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import SEOHead, { breadcrumbSchema, faqSchema, organizationSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { CantonSEOData } from '../data/cantonTypes';
import { CANTONS_SEO_DATA } from '../data/cantonsData';
import { useLanguage } from '../../i18n/LanguageContext';
import { AppTab } from '../../types';
import FennySubsidySimulator from '../../components/FennySubsidySimulator';

// Mascot images - distinct for each section
import fenySavings from '../../assets/images/feny_mascot_savings_1783245711111.jpg';
import fenyAnalyse from '../../assets/images/IMG_20260804_161612_upscaled.jpg';
import fenyThinking from '../../assets/images/feny_thinking_1783331247759.jpg';
import fenyCompare from '../../assets/images/feny_mascot_compare_1783245694484.jpg';

interface Props {
  cantonSlug: string;
  onStartComparison: (cantonCode?: string) => void;
  onGoHome: () => void;
  onNavigate: (url: string) => void;
}

export default function CantonSubsidiesPage({ cantonSlug, onStartComparison, onGoHome, onNavigate }: Props) {
  const { language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const canton: CantonSEOData = CANTONS_SEO_DATA[cantonSlug] || CANTONS_SEO_DATA['geneve'];

  const cantonFaqs = [
    {
      question: `Qui a droit aux subsides d'assurance maladie dans le canton de ${canton.name} ?`,
      answer: `Toute personne domiciliée dans le canton de ${canton.name} dont le Revenu Déterminant Unifié (RDU) ou le revenu net imposable se situe sous les plafonds légaux. ${canton.subsideIncomeLimits}`
    },
    {
      question: `Quel organisme gère les demandes de subsides en ${canton.name} ?`,
      answer: `Dans le canton de ${canton.name}, la gestion des subsides d'assurance maladie est assurée par : ${canton.subsideAgency}.`
    },
    {
      question: `Quelle est la date limite pour déposer une demande de subside en ${canton.name} ?`,
      answer: `Pour que votre droit prenne effet dès le 1er janvier 2026, votre dossier complet doit impérativement être déposé avant le 30 novembre auprès de ${canton.subsideAgency}. En cas de baisse imprévue de revenus en cours d'année, une demande extraordinaire peut être introduite avec effet rétroactif limité.`
    },
    {
      question: `Le montant du subside change-t-il si je change d'assureur dans le canton de ${canton.name} ?`,
      answer: `Non. Le subside cantonal est calculé sur la base de la prime moyenne de référence cantonale fixée par l'OFSP. En choisissant l'un des assureurs les moins chers de ${canton.name} (ex: ${canton.cheapestInsurers.map(i => i.name).slice(0, 2).join(', ')}), votre reste à charge sera minime voire nul.`
    }
  ];

  const structured = [
    organizationSchema,
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'Subsides Assurance Maladie', url: '/subsides/' },
      { name: `Subsides ${canton.name}`, url: `/subsides/${canton.slug}/` }
    ]),
    faqSchema(cantonFaqs)
  ];

  return (
    <>
      <SEOHead
        tab={`subside-${canton.slug}` as AppTab}
        language={language}
        title={`Subside Assurance Maladie ${canton.name} 2026 : Plafonds, RDU & Démarches | Le Fennec Malin`}
        description={`Guide complet des subsides LAMal dans le canton de ${canton.name} (2026) : ${canton.subsideAgency}, barèmes RDU, conditions d'octroi et démarches en ligne.`}
        structuredData={structured}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: onGoHome },
            { label: 'Subsides', onClick: () => onNavigate('/subsides/') },
            { label: canton.name }
          ]}
        />

        {/* Back Link */}
        <button
          type="button"
          onClick={() => onNavigate('/subsides/')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-fennec-dark/60 hover:text-fennec-dark mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Tous les cantons suisses</span>
        </button>

        {/* Hero Section */}
        <div className="mb-10 bg-gradient-to-br from-[#FAF7F3] via-white to-orange-50/20 rounded-3xl border border-fennec-cream/80 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-8 bg-fennec-terracotta text-white font-black text-sm rounded-xl flex items-center justify-center font-mono shadow-xs">
                  {canton.code}
                </span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
                  Barème & Démarches 2026
                </span>
              </div>

              <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-fennec-dark leading-tight">
                Subside d'assurance maladie dans le canton de {canton.name} (2026)
              </h1>
              <p className="text-fennec-dark/75 text-sm sm:text-base leading-relaxed">
                {canton.subsideDescription}
              </p>
            </div>

            <div className="shrink-0 self-center sm:self-auto">
              <img
                src={fenySavings}
                alt={`Fenny subsides canton de ${canton.name}`}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-white shadow-md"
              />
            </div>
          </div>
        </div>

        {/* EMBEDDED FENNY SIMULATOR PRESET FOR THIS CANTON */}
        <div className="mb-10">
          <FennySubsidySimulator
            initialCanton={canton.code}
            onStartHealthComparison={onStartComparison}
            onNavigateCantonGuide={(slug) => onNavigate(`/subsides/${slug}/`)}
          />
        </div>

        {/* Official Authority Card */}
        <div className="bg-white rounded-3xl border border-fennec-cream/70 p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-fennec-cream/50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-fennec-terracotta/10 rounded-2xl flex items-center justify-center shrink-0 text-fennec-terracotta">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold tracking-wider text-fennec-dark/50 block">
                  Organisme responsable ({canton.code})
                </span>
                <h2 className="font-display font-bold text-lg sm:text-xl text-fennec-dark">
                  {canton.subsideAgency}
                </h2>
              </div>
            </div>

            {canton.subsideLink && (
              <a
                href={canton.subsideLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-fennec-dark hover:bg-black text-white font-display font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all self-start sm:self-auto shrink-0 shadow-xs"
              >
                <span>Portail officiel</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-fennec-dark/80">
            <div>
              <span className="font-bold text-fennec-dark block mb-1">Seuils et conditions financières :</span>
              <p className="leading-relaxed text-fennec-dark/75 bg-[#FAF7F3] p-4 rounded-xl border border-fennec-cream/40">
                {canton.subsideIncomeLimits}
              </p>
            </div>
            <div>
              <span className="font-bold text-fennec-dark block mb-1">Primes de référence cantonales (OFSP) :</span>
              <ul className="space-y-1.5 bg-[#FAF7F3] p-4 rounded-xl border border-fennec-cream/40">
                <li className="flex justify-between">
                  <span>Adulte (franchise 300) :</span>
                  <span className="font-bold text-fennec-dark">{canton.avgAdultPremium300}</span>
                </li>
                <li className="flex justify-between">
                  <span>Adulte (franchise 2500) :</span>
                  <span className="font-bold text-fennec-dark">{canton.avgAdultPremium2500}</span>
                </li>
                <li className="flex justify-between">
                  <span>Enfant (franchise 0) :</span>
                  <span className="font-bold text-fennec-dark">{canton.avgChildPremium}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Steps to apply */}
        <div className="bg-white rounded-3xl border border-fennec-cream/70 p-6 sm:p-8 mb-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-fennec-dark">
                Comment demander votre subside dans le canton de {canton.name} ?
              </h2>
              <p className="text-xs text-fennec-dark/70 mt-1">
                Les étapes officielles pour obtenir votre réduction de prime d'assurance maladie.
              </p>
            </div>
            <img
              src={fenyAnalyse}
              alt="Fenny analyse des démarches"
              className="w-12 h-12 rounded-2xl object-cover border border-fennec-cream/80 shadow-xs hidden sm:block shrink-0"
            />
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-2xl bg-[#FAF7F3] border border-fennec-cream/50">
              <span className="w-8 h-8 rounded-full bg-fennec-terracotta text-white font-bold text-sm flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <h3 className="font-display font-bold text-sm text-fennec-dark mb-1">
                  Vérifiez votre éligibilité selon votre dernière taxation
                </h3>
                <p className="text-xs text-fennec-dark/70 leading-relaxed">
                  Consultez votre avis de taxation ou calculez votre Revenu Déterminant Unifié. Si vous êtes imposé à la source, munissez-vous de vos 12 fiches de salaire et de votre certificat de salaire annuel.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-[#FAF7F3] border border-fennec-cream/50">
              <span className="w-8 h-8 rounded-full bg-fennec-terracotta text-white font-bold text-sm flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <h3 className="font-display font-bold text-sm text-fennec-dark mb-1">
                  Complétez le formulaire de demande auprès de {canton.subsideAgency}
                </h3>
                <p className="text-xs text-fennec-dark/70 leading-relaxed">
                  Si le subside n'a pas été octroyé d'office, remplissez la demande en ligne ou téléchargez le formulaire officiel. Joignez votre police d'assurance 2026 et vos justificatifs de revenus.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-[#FAF7F3] border border-fennec-cream/50">
              <span className="w-8 h-8 rounded-full bg-fennec-terracotta text-white font-bold text-sm flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <h3 className="font-display font-bold text-sm text-fennec-dark mb-1">
                  Versement direct à votre caisse maladie
                </h3>
                <p className="text-xs text-fennec-dark/70 leading-relaxed">
                  Dès notification de la décision, le canton de {canton.name} verse mensuellement le subside directement à votre assureur-maladie, qui déduit ce montant de votre facture de prime.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cheapest Insurers in Canton */}
        <div className="bg-white rounded-3xl border border-fennec-cream/70 p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="font-display font-bold text-xl text-fennec-dark">
                Caisses maladie les plus économiques en {canton.name} (2026)
              </h2>
              <p className="text-xs text-fennec-dark/70 mt-1">
                Optimisez votre reste à charge en combinant subside et caisse la moins chère.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onStartComparison(canton.code)}
              className="text-xs font-bold text-fennec-terracotta hover:underline inline-flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>Tout comparer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {canton.cheapestInsurers.map((ins, idx) => (
              <div key={idx} className="p-4 bg-[#FAF7F3] rounded-2xl border border-fennec-cream/60 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-md inline-block mb-2">
                    N° {idx + 1} Économique
                  </span>
                  <h3 className="font-display font-bold text-sm text-fennec-dark">{ins.name}</h3>
                  <p className="text-[11px] text-fennec-dark/60">{ins.model}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-fennec-cream/60">
                  <span className="text-xs font-bold text-fennec-dark block">{ins.adult2500}</span>
                  <span className="text-[10px] text-fennec-dark/50">Franchise 2500 / mois</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Canton Specific FAQs */}
        <div className="bg-white rounded-3xl border border-fennec-cream/70 p-6 sm:p-8 mb-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display font-bold text-xl text-fennec-dark">
              Questions fréquentes sur les subsides en {canton.name}
            </h2>
            <img
              src={fenyThinking}
              alt="Fenny réfléchit aux questions fréquentes"
              className="w-10 h-10 rounded-xl object-cover border border-fennec-cream/80 shadow-xs hidden sm:block shrink-0"
            />
          </div>

          <div className="space-y-3">
            {cantonFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-fennec-cream/60 rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-display font-bold text-xs sm:text-sm text-fennec-dark flex items-center justify-between gap-4 hover:bg-[#FAF7F3] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-fennec-terracotta shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-fennec-dark/50 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-fennec-dark/75 leading-relaxed bg-[#FAF7F3]/40 border-t border-fennec-cream/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-6 sm:p-8 rounded-3xl bg-fennec-dark text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={fenyCompare}
              alt="Fenny compare les caisses"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-white/20 shadow-xs hidden sm:block shrink-0"
            />
            <div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                Calculez vos économies 2026 dans le canton de {canton.name}
              </h3>
              <p className="text-xs text-white/70 mt-1">
                Comparez les primes officielles de toutes les caisses agréées en quelques clics.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onStartComparison(canton.code)}
            className="bg-fennec-terracotta hover:bg-fennec-terracotta/90 text-white font-display font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-all active:scale-95 shrink-0 shadow-xs cursor-pointer"
          >
            Comparer en {canton.code}
          </button>
        </div>

      </div>
    </>
  );
}
