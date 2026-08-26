/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppTab } from '../types';
import { ArrowRight, Sparkles, Activity, Shield, Car, Home, Key, Scale } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '../i18n/LanguageContext';
import { teleportToTop } from '../utils/scrollUtils';
import fenyAnalyse from '../assets/images/feny_analyse_1783331235825.jpg';
import fenyResults from '../assets/images/feny_mascot_compare_1783245694484.jpg';

interface ProductsGridProps {
  onTabChange: (tab: AppTab) => void;
}

export default function ProductsGrid({ onTabChange }: ProductsGridProps) {
  const { t } = useLanguage();

  const activeProducts = [
    {
      id: 'health-comparator' as AppTab,
      icon: <Activity className="w-8 h-8 text-fennec-terracotta" />,
      title: t('health_card_title'),
      tagline: "",
      desc: t('health_card_desc'),
      badge: t('health_card_badge'),
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      cta: t('health_card_cta'),
      image: fenyAnalyse,
    },
    {
      id: 'life-comparator' as AppTab,
      icon: <Shield className="w-8 h-8 text-fennec-tan" />,
      title: t('life_card_title'),
      tagline: t('life_card_tagline'),
      desc: t('life_card_desc'),
      badge: t('life_card_badge'),
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      cta: t('life_card_cta'),
      image: fenyResults,
    },
  ];

  const upcomingProducts = [
    {
      icon: <Car className="w-6 h-6 text-fennec-brown" />,
      title: t('auto_insurance'),
      desc: t('auto_desc'),
    },
    {
      icon: <Home className="w-6 h-6 text-fennec-brown" />,
      title: t('household_insurance'),
      desc: t('household_desc'),
    },
    {
      icon: <Key className="w-6 h-6 text-fennec-brown" />,
      title: t('mortgage_switzerland'),
      desc: t('mortgage_desc'),
    },
    {
      icon: <Scale className="w-6 h-6 text-fennec-brown" />,
      title: t('legal_protection'),
      desc: t('legal_desc'),
    },
  ];

  const handleProductClick = (tab: AppTab) => {
    onTabChange(tab);
    teleportToTop();
  };

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <span className="text-[11px] font-bold tracking-widest text-fennec-terracotta uppercase block mb-1">
          {t('products_range_badge')}
        </span>
        <h2 className="font-display font-extrabold text-3xl text-fennec-dark">
          {t('products_range_title')}
        </h2>
        <p className="mt-2 text-base text-fennec-dark/70 max-w-xl mx-auto">
          {t('products_range_subtitle')}
        </p>
      </div>

      {/* Active Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {activeProducts.map((p) => (
          <div 
            key={p.id}
            onClick={() => handleProductClick(p.id)}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.02,
                y: -6,
                boxShadow: "0 20px 25px -5px rgba(184, 115, 51, 0.12), 0 10px 10px -6px rgba(184, 115, 51, 0.12)",
                borderColor: "#D2B48C",
                duration: 0.35,
                ease: "power2.out"
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                y: 0,
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
                borderColor: "#ECE1D4",
                duration: 0.35,
                ease: "power2.out"
              });
            }}
            className="bg-white rounded-3xl border border-fennec-cream overflow-hidden shadow-sm flex flex-col justify-between group cursor-pointer"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>{p.icon}</div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${p.badgeColor}`}>
                  {p.badge}
                </span>
              </div>
              <h3 className="font-display font-bold text-2xl text-fennec-dark mb-1 group-hover:text-fennec-terracotta transition-colors">
                {p.title}
              </h3>
              {p.tagline && (
                <p className="text-sm font-bold text-fennec-terracotta mb-4">
                  {p.tagline}
                </p>
              )}
              <p className="text-sm text-fennec-dark/75 leading-relaxed">
                {p.desc}
              </p>
            </div>

            {/* Bottom visual section with CTA */}
            <div className="px-8 pb-8 pt-0 flex items-center justify-between mt-auto border-t border-fennec-cream/20 bg-fennec-cream/5">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full border border-fennec-cream overflow-hidden">
                  <img 
                    src={p.image} 
                    alt="Fenny Icon" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/fennec-logo.jpg';
                    }}
                  />
                </div>
                <span className="text-xs font-semibold text-fennec-brown">{t('fenny_compares_for_you')}</span>
              </div>
              <button 
                onClick={() => handleProductClick(p.id)}
                className="inline-flex items-center px-5 py-2.5 bg-fennec-terracotta hover:bg-fennec-dark text-white font-display font-bold text-sm rounded-full transition-all group-hover:shadow-md"
              >
                <span>{p.cta}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Products Section */}
      <div className="bg-fennec-cream/10 border border-fennec-cream/30 rounded-3xl p-8">
        <h4 className="font-display font-bold text-lg text-fennec-dark mb-6 flex items-center">
          <Sparkles className="w-5 h-5 text-fennec-tan mr-2" />
          {t('coming_soon_title')}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingProducts.map((p, idx) => (
            <div 
              key={idx}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.03,
                  y: -4,
                  boxShadow: "0 12px 20px -5px rgba(0, 0, 0, 0.04)",
                  borderColor: "#D2B48C",
                  duration: 0.3,
                  ease: "power2.out"
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  y: 0,
                  boxShadow: "none",
                  borderColor: "rgba(236, 225, 212, 0.4)",
                  duration: 0.3,
                  ease: "power2.out"
                });
              }}
              className="bg-white/60 p-5 rounded-2xl border border-fennec-cream/40 flex flex-col justify-between transition-all cursor-default"
            >
              <div>
                <div className="mb-3 block">{p.icon}</div>
                <h5 className="font-display font-bold text-base text-fennec-dark mb-1">
                  {p.title}
                </h5>
                <p className="text-xs text-fennec-dark/70 leading-relaxed">
                  {p.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-fennec-cream/10 flex justify-between items-center">
                <span className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider">
                  {t('coming_soon_badge')}
                </span>
                <span className="w-2 h-2 rounded-full bg-fennec-tan animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
