/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { MunicipalitySEOData } from '../data/municipalityTypes';

interface LocalFAQSectionProps {
  municipality: MunicipalitySEOData;
}

export const LocalFAQSection: React.FC<LocalFAQSectionProps> = ({ municipality }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Questions Fréquentes — Assurance Maladie à {municipality.name}
          </h2>
          <p className="text-sm text-slate-500">
            Réponses aux questions les plus posées par les résidents de {municipality.name}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {municipality.faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="border border-slate-200/80 rounded-xl bg-white overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full text-left py-4 px-5 flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer"
              >
                <span className="text-base">{faq.question}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-4 text-slate-700 text-sm leading-relaxed border-t border-slate-100 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
