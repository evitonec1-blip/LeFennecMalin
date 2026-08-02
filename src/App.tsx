/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { AppTab } from './types';
import { TESTIMONIALS } from './data';
import { useLanguage } from './i18n/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import TrustStrip from './components/TrustStrip';
import HowItWorks from './components/HowItWorks';
import ProductsGrid from './components/ProductsGrid';
import AboutSection from './components/AboutSection';
import FAQSection from './components/FAQSection';
import LegalSection from './components/LegalSection';
import HealthComparator from './components/HealthComparator';
import LifePensionComparator from './components/LifePensionComparator';
import CookieConsent from './components/CookieConsent';
import { ArrowRight, ShieldCheck, HelpCircle, ArrowUpRight, Scale, Sparkles, CheckCircle, Calendar } from 'lucide-react';
import gsap from 'gsap';

import fenyAnalyse from './assets/images/feny_analyse_1783331235825.jpg';
import fenyWinking from './assets/images/feny_winking_1783331270164.jpg';
import fenyResults from './assets/images/feny_results_1783331258491.jpg';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('home');
  const [activeVertical, setActiveVertical] = useState<'health' | 'life'>('health');
  const { t } = useLanguage();
  
  const contentRef = useRef<HTMLDivElement>(null);

  // Stagger reveal of page content on mount
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Select header & hero elements
    gsap.set('.hero-animate', { opacity: 0, y: 35 });
    gsap.set('header', { yPercent: -100, opacity: 0 });
    
    tl.to('header', {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    });
    
    tl.to('.hero-animate', {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out'
    }, '-=0.45');
  }, []);

  // Subtle GSAP fade-in transition when switching tabs or active comparator verticals
  useEffect(() => {
    if (contentRef.current) {
      gsap.killTweensOf(contentRef.current);
      gsap.set(contentRef.current, { opacity: 0, y: 12 });
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: 'power2.out',
      });
    }
  }, [currentTab, activeVertical]);

  // Partner logos data
  const dataSources = [
    { name: "priminfo.admin.ch", desc: t('data_source_priminfo_desc') },
    { name: "OFSP / BAG", desc: t('data_source_ofsp_desc') }
  ];

  const handleCtaClick = (vertical: 'health' | 'life') => {
    setActiveVertical(vertical);
    if (vertical === 'health') {
      setCurrentTab('health-comparator');
    } else {
      setCurrentTab('life-comparator');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#FDFBF9] flex flex-col justify-between font-sans selection:bg-fennec-tan/20">
      
      {/* Header Navigation */}
      <Header currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* Main Content Area */}
      <main ref={contentRef} className={`flex-grow ${(currentTab === 'home' || currentTab === 'about' || currentTab === 'faq') ? 'pb-24 md:pb-0' : ''}`}>
        
        {currentTab === 'home' && (
          <div className="space-y-20 pb-24">
            
            {/* 1. HERO SECTION */}
            <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF4EC] via-[#FDFBF9] to-white pt-12 md:pt-16 pb-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Hero Left Content */}
                  <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                    
                    {/* Headline */}
                    <h1 className="hero-animate opacity-0 font-display font-black text-3xl sm:text-4xl md:text-5xl text-fennec-dark leading-tight tracking-tight">
                      {t('hero_title_1')} <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-fennec-terracotta to-fennec-tan">
                        {t('hero_title_2')}
                      </span>
                    </h1>

                    {/* Subheading */}
                    <p className="hero-animate opacity-0 text-base sm:text-lg text-fennec-dark/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed text-justify">
                      {t('hero_subtitle')}
                    </p>

                    {/* Three Inline Stats Strip */}
                    <div className="hero-animate opacity-0 grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 pt-2">
                      <div className="bg-white p-3.5 rounded-2xl border border-fennec-cream/40 shadow-2xs text-center">
                        <span className="font-display font-black text-xl md:text-2xl text-fennec-terracotta block">
                          37
                        </span>
                        <span className="text-[10px] text-fennec-dark/60 font-semibold uppercase tracking-wider block mt-0.5">
                          {t('stat_insurers')}
                        </span>
                      </div>
                      <div className="bg-white p-3.5 rounded-2xl border border-fennec-cream/40 shadow-2xs text-center">
                        <span className="font-display font-black text-xl md:text-2xl text-fennec-terracotta block">
                          11
                        </span>
                        <span className="text-[10px] text-fennec-dark/60 font-semibold uppercase tracking-wider block mt-0.5">
                          Assureurs Vie
                        </span>
                      </div>
                      <div className="bg-white p-3.5 rounded-2xl border border-fennec-cream/40 shadow-2xs text-center flex flex-col justify-center items-center">
                        <span className="font-display font-black text-xs md:text-sm text-fennec-red block uppercase tracking-wide leading-none">
                          {t('stat_savings')}
                        </span>
                        <span className="font-display font-black text-sm md:text-base text-fennec-red block uppercase tracking-tight py-0.5">
                          CHF 3'000.-
                        </span>
                        <span className="text-[9px] text-fennec-dark/60 font-bold uppercase tracking-wider block">
                          / an
                        </span>
                      </div>
                    </div>

                    {/* Hero Big Tab CTAs */}
                    <div className="hero-animate opacity-0 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto lg:mx-0">
                      <button
                        onClick={() => handleCtaClick('health')}
                        className={`w-full h-full px-6 py-4 rounded-2xl font-display font-extrabold text-sm sm:text-base transition-all duration-300 flex items-center justify-center text-center space-x-2.5 ${
                          activeVertical === 'health'
                            ? 'bg-fennec-terracotta text-white shadow-lg shadow-fennec-terracotta/20 scale-102 border-b-4 border-amber-900/10'
                            : 'bg-white hover:bg-fennec-cream/25 border border-fennec-cream/70 text-fennec-dark hover:text-fennec-terracotta'
                        }`}
                      >
                        <span className="leading-tight">{t('compare_health')}</span>
                      </button>
                      
                      <button
                        onClick={() => handleCtaClick('life')}
                        className={`w-full h-full px-6 py-4 rounded-2xl font-display font-extrabold text-sm sm:text-base transition-all duration-300 flex items-center justify-center text-center space-x-2.5 ${
                          activeVertical === 'life'
                            ? 'bg-fennec-terracotta text-white shadow-lg shadow-fennec-terracotta/20 scale-102 border-b-4 border-amber-900/10'
                            : 'bg-white hover:bg-fennec-cream/25 border border-fennec-cream/70 text-fennec-dark hover:text-fennec-terracotta'
                        }`}
                      >
                        <span className="leading-tight">{t('compare_life')}</span>
                      </button>
                    </div>

                  </div>

                  {/* Hero Right Mascot Visual */}
                  <div className="hero-animate opacity-0 lg:col-span-5 flex justify-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-fennec-cream/30 rounded-full blur-3xl z-0" />
                    
                    <div className="relative z-10 w-full max-w-sm aspect-square bg-white rounded-3xl p-4 border border-fennec-cream/60 shadow-lg group hover:scale-101 transition-transform">
                      <img 
                        src={fenyAnalyse} 
                        alt="Fenny le fennec malin" 
                        className="w-full h-full object-cover rounded-2xl"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/fennec-logo.jpg';
                        }}
                      />
                      
                      {/* Floating Speech Bubble */}
                      <div className="absolute -bottom-4 -left-4 bg-fennec-dark text-white p-3 rounded-2xl border border-white/10 shadow-md max-w-xs animate-bounce-slow">
                        <div className="flex items-start space-x-2">
                          <span className="text-[11px] bg-fennec-terracotta px-1.5 py-0.5 rounded font-bold uppercase tracking-wider text-white">{t('switzerland')}</span>
                          <p className="text-[11px] font-medium leading-snug">
                            "{t('fenny_quote')}" — <strong>Fenny</strong>
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* 2. TRUST STATS STRIP CONTAINER */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <TrustStrip />
            </section>

            {/* 3. CORE INTERACTIVE COMPARATOR MODULE */}
            <section id="comparator-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
              <div className="bg-[#FAF7F3] rounded-[40px] p-6 sm:p-10 border border-fennec-cream/60 shadow-xs relative overflow-hidden">
                
                {/* Module switcher heading tabs */}
                <div className="flex justify-center mb-8 border-b border-fennec-cream pb-6 gap-2">
                  <button
                    onClick={() => setActiveVertical('health')}
                    className={`w-1/2 sm:w-auto text-center px-5 py-2.5 rounded-full font-display font-extrabold text-sm transition-all ${
                      activeVertical === 'health'
                        ? 'bg-fennec-dark text-white shadow-xs'
                        : 'text-fennec-dark/70 hover:bg-fennec-cream/30'
                    }`}
                  >
                    {t('health_fund_lamal')}
                  </button>
                  <button
                    onClick={() => setActiveVertical('life')}
                    className={`w-1/2 sm:w-auto text-center px-5 py-2.5 rounded-full font-display font-extrabold text-sm transition-all ${
                      activeVertical === 'life'
                        ? 'bg-fennec-dark text-white shadow-xs'
                        : 'text-fennec-dark/70 hover:bg-fennec-cream/30'
                    }`}
                  >
                    {t('pension_3rd_pillar')}
                  </button>
                </div>

                {/* Show appropriate component */}
                {activeVertical === 'health' ? (
                  <HealthComparator isEmbedded={true} onStartQuiz={() => handleCtaClick('health')} />
                ) : (
                  <LifePensionComparator isEmbedded={true} onStartQuiz={() => handleCtaClick('life')} />
                )}

              </div>
            </section>

            {/* 4. HOW IT WORKS TRACKER */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <HowItWorks />
            </section>

            {/* 5. DATA SOURCE STRIP (GRAYSCALE BADGES) */}
            <section className="bg-fennec-cream/20 py-8 border-y border-fennec-cream/40">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-xs font-bold uppercase tracking-wider text-fennec-brown mb-6">
                  {t('data_sources_title')}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 opacity-75">
                  {dataSources.map((ds, idx) => (
                    <div 
                      key={idx}
                      className="bg-white/80 border border-fennec-cream/40 px-4 py-2 rounded-xl text-center shadow-2xs hover:scale-102 transition-transform cursor-default"
                    >
                      <span className="font-display font-extrabold text-xs text-fennec-dark block">
                        {ds.name}
                      </span>
                      <span className="text-[9px] text-fennec-brown block">
                        {ds.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 6. TESTIMONIALS CAROUSEL */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <span className="text-[11px] font-bold tracking-widest text-fennec-terracotta uppercase block mb-1">
                  {t('community_reviews')}
                </span>
                <h2 className="font-display font-extrabold text-3xl text-fennec-dark">
                  {t('what_they_say_about_fenny')}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TESTIMONIALS.map((item) => (
                  <div 
                    key={item.id}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1.03,
                        y: -5,
                        boxShadow: "0 20px 25px -5px rgba(184, 115, 51, 0.1), 0 10px 10px -6px rgba(184, 115, 51, 0.1)",
                        borderColor: "#D2B48C",
                        duration: 0.35,
                        ease: "power2.out"
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1,
                        y: 0,
                        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                        borderColor: "rgba(236, 225, 212, 0.4)",
                        duration: 0.35,
                        ease: "power2.out"
                      });
                    }}
                    className="bg-white p-6 rounded-3xl border border-fennec-cream/40 shadow-xs relative group flex flex-col justify-between transition-all cursor-default"
                  >
                    {/* Winking fennec avatar stamp top-right */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full overflow-hidden border border-fennec-cream shadow-2xs">
                      <img 
                        src={fenyWinking} 
                        alt="Fenny Avatar" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/fennec-avatar.jpg';
                        }}
                      />
                    </div>

                    <div>
                      {/* Rating stars */}
                      <div className="flex text-amber-400 mb-3.5">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <span key={i} className="text-sm">★</span>
                        ))}
                      </div>

                      {/* Text */}
                      <p className="text-sm text-fennec-dark/80 italic leading-relaxed mb-6">
                        "{t(`testimonial_${item.id}_text` as any, item.text)}"
                      </p>
                    </div>

                    {/* Meta info */}
                    <div className="pt-4 border-t border-fennec-cream/20 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-display font-bold text-fennec-dark block">
                          {item.name}
                        </span>
                        <span className="text-fennec-brown font-semibold block">
                          {item.location}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 bg-fennec-cream text-fennec-dark rounded-full font-bold text-[9px] uppercase">
                        {t(item.productCategory === 'health' ? 'testimonial_product_health' : 'testimonial_product_life', item.product)}
                      </span>
                    </div>

                  </div>
                ))}
              </div>

              {/* Highlighting block */}
              <div className="bg-gradient-to-r from-fennec-dark to-[#5E5448] text-white rounded-3xl p-6 md:p-8 mt-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-white/20">
                    <img 
                      src={fenyResults} 
                      alt="Fenny" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/fennec-logo.jpg';
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-lg text-white">
                      {t('testimonial_banner_title')}
                    </h4>
                    <p className="text-xs text-fennec-cream/80 max-w-xl">
                      {t('testimonial_banner_desc')}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => handleCtaClick('health')}
                  className="px-6 py-3 bg-fennec-terracotta hover:bg-fennec-red text-white font-display font-bold text-xs rounded-full transition-colors flex items-center space-x-1 shrink-0 shadow-sm"
                >
                  <span>{t('join_community')}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

            </section>

            {/* 7. ALL PRODUCTS GRID */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ProductsGrid onTabChange={setCurrentTab} />
            </section>

            {/* 8. LONG FORM SEO CONTENT BLOCKS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-fennec-cream/30 pt-16">
              <div className="max-w-3xl mx-auto space-y-10">
                
                <div className="space-y-4">
                  <h3 className="font-display font-extrabold text-2xl text-fennec-dark">
                    {t('seo_health_title')}
                  </h3>
                  <p className="text-sm text-fennec-dark/80 leading-relaxed text-justify">
                    {t('seo_health_p1')}
                  </p>
                  <p className="text-sm text-fennec-dark/80 leading-relaxed text-justify">
                    {t('seo_health_p2')}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-display font-extrabold text-2xl text-fennec-dark">
                    {t('seo_life_title')}
                  </h3>
                  <p className="text-sm text-fennec-dark/80 leading-relaxed text-justify">
                    {t('seo_life_p1')}
                  </p>
                  <p className="text-sm text-fennec-dark/80 leading-relaxed text-justify">
                    {t('seo_life_p2_pre')}<strong>{t('seo_life_p2_3a')}</strong>{t('seo_life_p2_mid')}<strong>{t('seo_life_p2_3b')}</strong>{t('seo_life_p2_end')}
                  </p>
                </div>

              </div>
            </section>

          </div>
        )}

        {/* SUB-PAGES ACCORDING TO USER'S SELECTED NAVIGATION TABS */}
        {currentTab === 'health-comparator' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <HealthComparator />
            <ProductsGrid onTabChange={setCurrentTab} />
          </div>
        )}

        {currentTab === 'life-comparator' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <LifePensionComparator />
            <ProductsGrid onTabChange={setCurrentTab} />
          </div>
        )}

        {currentTab === 'about' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <AboutSection />
          </div>
        )}

        {currentTab === 'faq' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <FAQSection />
          </div>
        )}

        {currentTab === 'legal' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <LegalSection mode="legal" />
          </div>
        )}

        {currentTab === 'privacy' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <LegalSection mode="privacy" />
          </div>
        )}

      </main>

      {/* Footer Navigation */}
      <Footer onTabChange={setCurrentTab} />

      {/* Sticky Bottom Mobile Bar for phone users */}
      {(currentTab === 'home' || currentTab === 'about' || currentTab === 'faq') && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-fennec-cream/50 px-3 py-2.5 shadow-2xl grid grid-cols-2 gap-2.5 pb-safe-bottom">
          <button
            onClick={() => {
              setCurrentTab('health-comparator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full min-w-0 py-3 px-2 bg-fennec-red hover:bg-red-600 text-white font-display font-extrabold text-[11px] rounded-xl flex items-center justify-center space-x-1.5 shadow-md shadow-fennec-red/20 transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate text-center">{t('health_insurance')}</span>
          </button>
          <button
            onClick={() => {
              setCurrentTab('life-comparator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full min-w-0 py-3 px-2 bg-fennec-dark hover:bg-fennec-terracotta text-white font-display font-extrabold text-[11px] rounded-xl flex items-center justify-center space-x-1.5 shadow-md shadow-fennec-dark/20 transition-all active:scale-95"
          >
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate text-center">{t('life_insurance')}</span>
          </button>
        </div>
      )}

      {/* Cookie consent notice */}
      <CookieConsent />

    </div>
  );
}
