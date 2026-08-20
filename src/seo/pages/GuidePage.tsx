/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, UserCheck, ArrowRight, CheckCircle2, AlertCircle, Calculator, Info, ChevronDown, ChevronUp, Share2, ArrowLeft } from 'lucide-react';
import SEOHead, { breadcrumbSchema, faqSchema, organizationSchema, articleSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { GuideSEOData } from '../data/guidesData';
import { useLanguage } from '../../i18n/LanguageContext';
import { AppTab } from '../../types';

interface Props {
  guide: GuideSEOData;
  tabKey: AppTab;
  onStartComparison: () => void;
  onGoHome: () => void;
  onNavigate: (url: string) => void;
}

export default function GuidePage({ guide, tabKey, onStartComparison, onGoHome, onNavigate }: Props) {
  const { language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const structured = [
    organizationSchema,
    articleSchema(
      guide.title,
      guide.summary,
      `/guides/${guide.slug}/`,
      guide.publishedDate,
      guide.updatedDate,
      guide.author.name
    ),
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'Guides & Conseils', url: '/guides/' },
      { name: guide.title, url: `/guides/${guide.slug}/` },
    ]),
    faqSchema(guide.faqs),
  ];

  return (
    <>
      <SEOHead
        tab={tabKey}
        language={language}
        structuredData={structured}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: onGoHome },
            { label: 'Guides Prévoyance & LAMal', onClick: () => onNavigate('/fr/guides/modeles-assurance/') },
            { label: guide.title },
          ]}
        />

        {/* Article Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-fennec-terracotta/10 text-fennec-terracotta text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            {guide.badge}
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight mb-4">
            {guide.title}
          </h1>

          <p className="text-lg text-stone-600 leading-relaxed mb-6 font-medium">
            {guide.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-500 pb-6 border-b border-stone-200">
            <div className="flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-fennec-terracotta" />
              <span>{guide.author.name}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-stone-400" />
              <span>{guide.readingTime} de lecture</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-stone-400" />
              <span>Mis à jour le {new Date(guide.updatedDate).toLocaleDateString('fr-CH', { month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* Key Takeaways Box */}
        <div className="bg-amber-50/60 rounded-2xl border border-amber-200 p-6 mb-8 shadow-sm">
          <h2 className="text-base font-bold text-amber-950 uppercase tracking-wider mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-600" />
            L'essentiel en 30 secondes
          </h2>
          <ul className="space-y-2.5">
            {guide.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-amber-950 text-sm leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Table of Contents */}
        <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 mb-8">
          <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider mb-3">
            Sommaire du dossier
          </h3>
          <nav className="space-y-2">
            {guide.tableOfContents.map((item, idx) => (
              <a
                key={idx}
                href={`#${item.id}`}
                className="block text-sm text-stone-700 hover:text-fennec-terracotta hover:underline font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Article Sections */}
        <div className="space-y-10 mb-12">
          {guide.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-stone-900 mb-4 pb-2 border-b border-stone-100">
                {section.title}
              </h2>
              <div className="space-y-4 text-stone-700 text-base leading-relaxed">
                {section.content.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {section.callout && (
                <div
                  className={`mt-4 rounded-xl p-4 border flex items-start gap-3 ${
                    section.callout.type === 'calc'
                      ? 'bg-blue-50/80 border-blue-200 text-blue-950'
                      : section.callout.type === 'warning'
                      ? 'bg-rose-50/80 border-rose-200 text-rose-950'
                      : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                  }`}
                >
                  {section.callout.type === 'calc' && <Calculator className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />}
                  {section.callout.type === 'warning' && <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />}
                  {section.callout.type === 'info' && <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
                  <div>
                    <h4 className="font-bold text-sm mb-1">{section.callout.title}</h4>
                    <p className="text-xs sm:text-sm leading-relaxed">{section.callout.text}</p>
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Interactive In-Article Action Banner */}
        <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 mb-12 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Envie de calculer vos économies personnalisées ?</h3>
            <p className="text-stone-300 text-sm">
              Accédez au simulateur suisse officiel et comparez toutes les caisses agréées en 2 minutes.
            </p>
          </div>
          <button
            onClick={onStartComparison}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-fennec-terracotta hover:bg-fennec-rust text-white font-bold px-6 py-3.5 rounded-xl shrink-0 transition-transform hover:scale-105"
          >
            <span>Lancer la simulation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* FAQs */}
        {guide.faqs && guide.faqs.length > 0 && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 mb-12">
            <h2 className="text-xl font-bold text-stone-900 mb-6">
              Questions fréquentes sur ce sujet
            </h2>
            <div className="space-y-3">
              {guide.faqs.map((faq, idx) => (
                <div key={idx} className="border border-stone-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-stone-900 hover:bg-stone-50 transition-colors"
                  >
                    <span className="pr-4">{faq.question}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="w-5 h-5 text-stone-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                    )}
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-4 text-stone-600 text-sm leading-relaxed border-t border-stone-100 pt-3 bg-stone-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
