/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shield, ArrowRight, CheckCircle, ChevronDown, ChevronUp, MapPin, Building, Award, HelpCircle, FileText } from 'lucide-react';
import SEOHead, { breadcrumbSchema, faqSchema, organizationSchema, financialServiceSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { CantonSEOData } from '../data/cantonsData';

interface CantonPageProps {
  data: CantonSEOData;
  onStartComparison: (cantonCode?: string) => void;
  onGoHome: () => void;
  onGoHealthHub: () => void;
}

export default function CantonPage({ data, onStartComparison, onGoHome, onGoHealthHub }: CantonPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const structured = [
    organizationSchema,
    financialServiceSchema(
      `Assurance Maladie ${data.name} 2026`,
      `Comparateur officiel des primes d'assurance maladie dans le canton de ${data.name} (${data.code}). Données OFSP 2026.`,
      `/assurance-maladie/${data.slug}/`
    ),
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'Assurance Maladie', url: '/assurance-maladie/' },
      { name: `${data.name} (${data.code})`, url: `/assurance-maladie/${data.slug}/` },
    ]),
    faqSchema(data.faqs),
  ];

  return (
    <>
      <SEOHead
        title={`Assurance Maladie ${data.name} (${data.code}) 2026 — Primes & Comparatif LAMal`}
        description={data.metaDescription}
        canonical={`/assurance-maladie/${data.slug}/`}
        structuredData={structured}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: onGoHome },
            { label: 'Assurance Maladie', onClick: onGoHealthHub },
            { label: `${data.name} (${data.code})` },
          ]}
        />

        {/* Hero Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-fennec-terracotta/10 text-fennec-terracotta text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
            <MapPin className="w-3.5 h-3.5" />
            Canton de {data.name} ({data.code}) · Données Officielles 2026
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-fennec-dark mb-4 leading-tight">
            Assurance maladie dans le canton de {data.name} ({data.code})
          </h1>
          <p className="text-fennec-dark/70 text-lg leading-relaxed mb-6">
            Découvrez les tarifs 2026 de l'assurance maladie obligatoire (LAMal) dans le canton de {data.name}. Comparez toutes les caisses agréées et trouvez la formule la plus avantageuse pour votre commune et votre profil.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onStartComparison(data.code)}
              className="inline-flex items-center gap-2 bg-fennec-terracotta text-white font-display font-bold px-7 py-3.5 rounded-full shadow-md hover:bg-fennec-terracotta/90 transition-all active:scale-95 text-sm uppercase tracking-wider cursor-pointer"
            >
              Comparer les primes à {data.name}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onGoHealthHub}
              className="inline-flex items-center gap-2 bg-fennec-cream/40 text-fennec-dark font-display font-bold px-6 py-3.5 rounded-full hover:bg-fennec-cream/70 transition-all text-sm cursor-pointer"
            >
              Tous les cantons suisses
            </button>
          </div>
        </div>

        {/* Canton Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-2xl border border-fennec-cream/60 p-5 shadow-xs">
            <span className="text-[11px] font-bold text-fennec-dark/50 uppercase tracking-wider block">Prime moyenne (Franchise 300)</span>
            <p className="font-display font-black text-fennec-terracotta text-xl mt-1">{data.avgAdultPremium300}</p>
            <span className="text-fennec-dark/60 text-xs mt-1 block">Adulte dès 26 ans</span>
          </div>

          <div className="bg-white rounded-2xl border border-fennec-cream/60 p-5 shadow-xs">
            <span className="text-[11px] font-bold text-fennec-dark/50 uppercase tracking-wider block">Prime optimale (Franchise 2'500)</span>
            <p className="font-display font-black text-emerald-700 text-xl mt-1">{data.avgAdultPremium2500}</p>
            <span className="text-fennec-dark/60 text-xs mt-1 block">Modèles alternatifs / Telmed</span>
          </div>

          <div className="bg-white rounded-2xl border border-fennec-cream/60 p-5 shadow-xs">
            <span className="text-[11px] font-bold text-fennec-dark/50 uppercase tracking-wider block">Régions de primes OFSP</span>
            <p className="font-display font-black text-fennec-dark text-xl mt-1">{data.regionsCount} région{data.regionsCount > 1 ? 's' : ''}</p>
            <span className="text-fennec-dark/60 text-xs mt-1 block">{data.capital} et districts</span>
          </div>
        </div>

        {/* Local Specifics & Key Points */}
        <div className="bg-white rounded-3xl border border-fennec-cream/60 p-7 mb-10 shadow-xs space-y-4">
          <h2 className="font-display font-bold text-xl text-fennec-dark flex items-center gap-2">
            <Building className="w-5 h-5 text-fennec-tan" />
            Spécificités cantonales de l'assurance maladie à {data.name}
          </h2>
          <p className="text-sm text-fennec-dark/70 leading-relaxed">
            {data.regionsDescription}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {data.keyPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-2.5 bg-fennec-cream/25 p-3.5 rounded-xl border border-fennec-cream/40">
                <CheckCircle className="w-4 h-4 text-fennec-terracotta shrink-0 mt-0.5" />
                <span className="text-xs text-fennec-dark font-medium leading-normal">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subsidies & Cantonal Social Help */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-7 mb-10 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-display font-bold text-lg">
            <Award className="w-5 h-5 text-amber-700" />
            Subsides d'assurance maladie à {data.name} ({data.subsideAgency})
          </div>
          <p className="text-xs text-amber-950/80 leading-relaxed">
            {data.subsideDescription}
          </p>
          <div className="pt-2">
            <span className="text-xs font-bold text-amber-900">Conseil Le Fennec Malin : </span>
            <span className="text-xs text-amber-950/80">
              Même si vous touchez un subside cantonal, changer pour une caisse moins chère vous permet de réduire le montant restant à votre charge ou de conserver un meilleur pouvoir d'achat.
            </span>
          </div>
        </div>

        {/* Top Insurers in Canton */}
        <div className="bg-white rounded-3xl border border-fennec-cream/60 p-7 mb-10 shadow-xs space-y-4">
          <h2 className="font-display font-bold text-xl text-fennec-dark flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Caisses maladie actives dans le canton de {data.name}
          </h2>
          <p className="text-sm text-fennec-dark/70 leading-relaxed">
            Les 37 caisses suisses agréées par l'Office fédéral de la santé publique (OFSP) sont tenues d'accepter sans réserve chaque résident de {data.name}. Parmi les caisses les plus souscrites dans le canton :
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {data.popularInsurers.map(ins => (
              <span key={ins} className="px-3 py-1.5 bg-fennec-cream/35 border border-fennec-cream/70 rounded-lg text-xs font-semibold text-fennec-dark">
                {ins}
              </span>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="font-display font-bold text-xl text-fennec-dark mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-fennec-terracotta" />
            Questions fréquentes sur l'assurance maladie à {data.name}
          </h2>
          <div className="space-y-3">
            {data.faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-fennec-cream/60 overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-sm text-fennec-dark hover:bg-fennec-cream/20 transition-colors"
                >
                  <span>{faq.question}</span>
                  {openFaq === i ? <ChevronUp className="w-4 h-4 shrink-0 text-fennec-terracotta" /> : <ChevronDown className="w-4 h-4 shrink-0 text-fennec-dark/40" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pt-1 text-xs text-fennec-dark/75 leading-relaxed border-t border-fennec-cream/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Banner */}
        <div className="bg-linear-to-r from-fennec-dark to-fennec-brown text-white rounded-3xl p-8 text-center space-y-4 shadow-xl">
          <h3 className="font-display font-black text-2xl">
            Comparez les primes 2026 à {data.name} dès maintenant
          </h3>
          <p className="text-white/80 text-sm max-w-xl mx-auto leading-relaxed">
            Calculez votre tarif exact pour votre code postal (NPA), votre tranche d'âge et votre modèle préféré en moins de 2 minutes.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onStartComparison(data.code)}
              className="bg-fennec-terracotta hover:bg-fennec-terracotta/90 text-white font-display font-bold px-8 py-3.5 rounded-full text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Lancer la comparaison à {data.name}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
