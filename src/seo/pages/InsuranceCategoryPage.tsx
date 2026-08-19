/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Car, Home, Shield, Heart, Plane, Scale, PawPrint, ArrowRight, CheckCircle, ChevronDown, ChevronUp, HelpCircle, Star } from 'lucide-react';
import SEOHead, { breadcrumbSchema, faqSchema, organizationSchema, financialServiceSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { CategorySEOData } from '../data/categoriesData';

interface CategoryPageProps {
  data: CategorySEOData;
  onStartComparison: (categorySlug: string) => void;
  onGoHome: () => void;
  onNavigate: (url: string) => void;
}

export default function InsuranceCategoryPage({ data, onStartComparison, onGoHome, onNavigate }: CategoryPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const getIcon = () => {
    switch (data.iconName) {
      case 'car': return <Car className="w-8 h-8 text-blue-600" />;
      case 'home': return <Home className="w-8 h-8 text-emerald-600" />;
      case 'shield': return <Shield className="w-8 h-8 text-indigo-600" />;
      case 'heart': return <Heart className="w-8 h-8 text-rose-600" />;
      case 'plane': return <Plane className="w-8 h-8 text-sky-600" />;
      case 'scale': return <Scale className="w-8 h-8 text-amber-600" />;
      case 'paw': return <PawPrint className="w-8 h-8 text-orange-600" />;
      default: return <Shield className="w-8 h-8 text-fennec-terracotta" />;
    }
  };

  const structured = [
    organizationSchema,
    financialServiceSchema(
      data.name,
      data.tagline,
      `/${data.slug}/`
    ),
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: data.name, url: `/${data.slug}/` },
    ]),
    faqSchema(data.faqs),
  ];

  return (
    <>
      <SEOHead
        title={`${data.name} Suisse 2026 — Comparatif & Devis Gratuit | Le Fennec Malin`}
        description={data.tagline}
        canonical={`/${data.slug}/`}
        structuredData={structured}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: onGoHome },
            { label: data.name },
          ]}
        />

        {/* Hero Banner */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-fennec-terracotta/10 text-fennec-terracotta text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
            <Star className="w-3.5 h-3.5" />
            {data.badge} · Comparateur 100% Neutre
          </div>
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-white rounded-2xl border border-fennec-cream/70 shadow-xs shrink-0">
              {getIcon()}
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-fennec-dark leading-tight">
              {data.h1}
            </h1>
          </div>
          <p className="text-fennec-dark/70 text-lg leading-relaxed mb-6">
            {data.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onStartComparison(data.slug)}
              className="inline-flex items-center gap-2 bg-fennec-terracotta text-white font-display font-bold px-7 py-3.5 rounded-full shadow-md hover:bg-fennec-terracotta/90 transition-all active:scale-95 text-sm uppercase tracking-wider cursor-pointer"
            >
              Demander un comparatif gratuit
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onGoHome}
              className="inline-flex items-center gap-2 bg-fennec-cream/40 text-fennec-dark font-display font-bold px-6 py-3.5 rounded-full hover:bg-fennec-cream/70 transition-all text-sm cursor-pointer"
            >
              Tous nos comparateurs
            </button>
          </div>
        </div>

        {/* Why Compare Section */}
        <div className="bg-white rounded-3xl border border-fennec-cream/60 p-7 mb-10 shadow-xs space-y-4">
          <h2 className="font-display font-bold text-xl text-fennec-dark">
            {data.whyCompareTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {data.whyComparePoints.map((pt, i) => (
              <div key={i} className="flex items-start gap-2.5 bg-fennec-cream/25 p-4 rounded-xl border border-fennec-cream/40">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs text-fennec-dark font-medium leading-relaxed">{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Coverage Types / Product Hierarchy */}
        <div className="mb-10 space-y-4">
          <h2 className="font-display font-bold text-xl text-fennec-dark">
            Les formules et garanties disponibles en Suisse
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.coverageTypes.map((cov, i) => (
              <div key={i} className="bg-white rounded-2xl border border-fennec-cream/60 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-fennec-dark text-base mb-2">{cov.title}</h3>
                  <p className="text-xs text-fennec-dark/70 leading-relaxed mb-4">{cov.desc}</p>
                </div>
                <ul className="space-y-1.5 border-t border-fennec-cream/35 pt-3">
                  {cov.highlights.map((h, j) => (
                    <li key={j} className="text-[11px] text-fennec-dark/60 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-fennec-terracotta shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="font-display font-bold text-xl text-fennec-dark mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-fennec-terracotta" />
            Questions fréquentes — {data.name}
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

        {/* Related Categories / Hub-and-Spoke Links */}
        <div className="bg-white rounded-3xl border border-fennec-cream/60 p-7 mb-10 shadow-xs space-y-3">
          <h3 className="font-display font-bold text-base text-fennec-dark">
            Assurances associées en Suisse
          </h3>
          <div className="flex flex-wrap gap-2 pt-1">
            {data.relatedCategories.map(cat => (
              <button
                key={cat.url}
                onClick={() => onNavigate(cat.url)}
                className="px-4 py-2 bg-fennec-cream/30 hover:bg-fennec-cream/70 border border-fennec-cream/60 rounded-xl text-xs font-semibold text-fennec-dark transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>{cat.name}</span>
                <ArrowRight className="w-3 h-3 text-fennec-terracotta" />
              </button>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-linear-to-r from-fennec-dark to-fennec-brown text-white rounded-3xl p-8 text-center space-y-4 shadow-xl">
          <h3 className="font-display font-black text-2xl">
            Prêt à trouver la meilleure offre pour votre {data.name.toLowerCase()} ?
          </h3>
          <p className="text-white/80 text-sm max-w-xl mx-auto leading-relaxed">
            Service 100% indépendant, gratuit et sans aucun engagement. Obtenez une simulation personnalisée adaptée à votre budget.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onStartComparison(data.slug)}
              className="bg-fennec-terracotta hover:bg-fennec-terracotta/90 text-white font-display font-bold px-8 py-3.5 rounded-full text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Calculer mes économies
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
