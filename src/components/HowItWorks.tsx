/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, FileText, CheckSquare, BarChart3, TrendingDown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import fenyThinking from '../assets/images/feny_thinking_1783331247759.jpg';
import fenyAnalyse from '../assets/images/feny_analyse_1783331235825.jpg';
import fenyAvatar from '../assets/images/feny_avatar_1783331224698.jpg';
import fenyResults from '../assets/images/feny_results_1783331258491.jpg';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      num: "1",
      title: t('step1_title'),
      desc: t('step1_desc'),
      icon: <CheckSquare className="w-6 h-6 text-fennec-dark" />,
      avatar: fenyThinking
    },
    {
      num: "2",
      title: t('step2_title'),
      desc: t('step2_desc'),
      icon: <FileText className="w-6 h-6 text-fennec-dark" />,
      avatar: fenyAnalyse
    },
    {
      num: "3",
      title: t('step3_title'),
      desc: t('step3_desc'),
      icon: <BarChart3 className="w-6 h-6 text-fennec-dark" />,
      avatar: fenyAvatar
    },
    {
      num: "4",
      title: t('step4_title'),
      desc: t('step4_desc'),
      icon: <TrendingDown className="w-6 h-6 text-white" />,
      avatar: fenyResults
    }
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <span className="text-[11px] font-bold tracking-widest text-fennec-terracotta uppercase block mb-1">
          {t('how_it_works_badge')}
        </span>
        <h2 className="font-display font-extrabold text-3xl text-fennec-dark">
          {t('how_it_works_title')}
        </h2>
        <p className="mt-2 text-base text-fennec-dark/70 max-w-2xl mx-auto">
          {t('how_it_works_subtitle')}
        </p>
      </div>

      <div className="relative">
        {/* Horizontal connection line for desktop */}
        <div className="hidden md:block absolute top-1/2 left-4 right-4 h-1 bg-fennec-cream -translate-y-1/2 z-0 rounded" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl p-6 border border-fennec-cream/40 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center relative group"
            >
              {/* Step number badge */}
              <span className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-fennec-terracotta text-white font-display font-bold text-sm flex items-center justify-center shadow-md">
                {step.num}
              </span>

              {/* Mascot Bubble */}
              <div className="w-20 h-20 rounded-2xl border-2 border-fennec-cream overflow-hidden mb-5 bg-fennec-cream/20 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={step.avatar} 
                  alt={`Fenny step ${step.num}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/fennec-logo.jpg';
                  }}
                />
              </div>

              {/* Title & Description */}
              <h3 className="font-display font-bold text-lg text-fennec-dark mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-fennec-dark/70 leading-relaxed">
                {step.desc}
              </p>

              {/* Icon indicator */}
              <div className={`mt-4 p-2 rounded-full ${idx === 3 ? 'bg-fennec-red shadow-sm' : 'bg-fennec-cream/30'}`}>
                {step.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
