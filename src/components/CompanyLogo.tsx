/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface CompanyLogoProps {
  id: string;
  className?: string;
}

const DOMAIN_MAP: Record<string, string> = {
  // Caisses Maladie
  okk: 'oekk.ch',
  'ökk': 'oekk.ch',
  assura: 'assura.ch',
  glarner: 'glarnerkv.ch',
  waedenswil: 'kkwaedenswil.ch',
  aquilana: 'aquilana.ch',
  swica: 'swica.ch',
  amb: 'groupemutuel.ch',
  einsiedeln: 'kkeinsiedeln.ch',
  kpt: 'kpt.ch',
  cpt: 'kpt.ch',
  atupri: 'atupri.ch',
  sympany: 'sympany.ch',
  steffisburg: 'kksteffisburg.ch',
  agrisano: 'agrisano.ch',
  simplon: 'kksimplon.ch',
  visperterminen: 'kkvisperterminen.ch',
  zeneggen: 'kkzeneggen.ch',
  galenos: 'galenos.ch',
  sodalis: 'sodalis.ch',
  luzernerhinterland: 'kklh.ch',
  css: 'css.ch',
  sana24: 'visana.ch',
  rhenusana: 'rhenusana.ch',
  mutuel: 'groupemutuel.ch',
  easysana: 'groupemutuel.ch',
  philos: 'groupemutuel.ch',
  avenir: 'groupemutuel.ch',
  vivacare: 'visana.ch',
  moovesympany: 'sympany.ch',
  progres: 'helsana.ch',
  visana: 'visana.ch',
  helsana: 'helsana.ch',

  // Assureurs Vie
  swisslife: 'swisslife.ch',
  'swiss life': 'swisslife.ch',
  axa: 'axa.ch',
  'axa prevoyance': 'axa.ch',
  zurich: 'zurich.ch',
  'zurich assurance': 'zurich.ch',
  helvetia: 'helvetia.ch',
  allianz: 'allianz.ch',
  'allianz suisse': 'allianz.ch',
  generali: 'generali.ch',
  'generali suisse': 'generali.ch',
  mobiliere: 'mobiliere.ch',
  'la mobiliere': 'mobiliere.ch',
  'la mobilière': 'mobiliere.ch',
  baloise: 'baloise.ch',
  'baloise assurances': 'baloise.ch',
  pax: 'pax.ch',
  retraitepopulaire: 'retraitepopulaire.ch',
  'retraite populaire': 'retraitepopulaire.ch',
  vaudoise: 'vaudoise.ch',
  'la vaudoise': 'vaudoise.ch',
  groupemutuel: 'groupemutuel.ch',
  'groupe mutuel': 'groupemutuel.ch',
};

const NUMERIC_ID_MAP: Record<string, string> = {
  '8': 'css',
  '32': 'aquilana',
  '134': 'einsiedeln',
  '194': 'sumiswalder',
  '246': 'steffisburg',
  '290': 'concordia',
  '312': 'atupri',
  '343': 'avenir',
  '360': 'luzernerhinterland',
  '376': 'kpt',
  '455': 'okk',
  '509': 'sympany',
  '780': 'glarner',
  '820': 'curaulta',
  '881': 'egk',
  '923': 'slkk',
  '941': 'sodalis',
  '966': 'surselva',
  '1040': 'visperterminen',
  '1113': 'entremont',
  '1318': 'waedenswil',
  '1322': 'birchmeier',
  '1384': 'swica',
  '1386': 'galenos',
  '1401': 'rhenusana',
  '1479': 'mutuel',
  '1507': 'amb',
  '1509': 'sanitas',
  '1535': 'philos',
  '1542': 'assura',
  '1555': 'visana',
  '1560': 'agrisano',
  '1562': 'helsana',
  '1568': 'sana24',
};

export function resolveBrandKey(rawId: string): string {
  if (!rawId) return '';
  const clean = rawId.toLowerCase().trim();
  if (NUMERIC_ID_MAP[clean]) return NUMERIC_ID_MAP[clean];
  if (clean.includes('assura')) return 'assura';
  if (clean.includes('css')) return 'css';
  if (clean.includes('helsana')) return 'helsana';
  if (clean.includes('swica')) return 'swica';
  if (clean.includes('visana')) return 'visana';
  if (clean.includes('sanitas')) return 'sanitas';
  if (clean.includes('concordia')) return 'concordia';
  if (clean.includes('kpt') || clean.includes('cpt')) return 'kpt';
  if (clean.includes('mutuel')) return 'mutuel';
  if (clean.includes('atupri')) return 'atupri';
  if (clean.includes('sympany')) return 'sympany';
  if (clean.includes('okk') || clean.includes('ökk')) return 'okk';
  if (clean.includes('agrisano')) return 'agrisano';
  if (clean.includes('aquilana')) return 'aquilana';
  if (clean.includes('sodalis')) return 'sodalis';
  if (clean.includes('rhenusana')) return 'rhenusana';
  if (clean.includes('galenos')) return 'galenos';
  if (clean.includes('avenir')) return 'avenir';
  if (clean.includes('philos')) return 'philos';
  if (clean.includes('amb')) return 'amb';
  if (clean.includes('sana24')) return 'sana24';
  if (clean.includes('glarner')) return 'glarner';
  if (clean.includes('waedenswil') || clean.includes('wädenswil')) return 'waedenswil';
  if (clean.includes('einsiedel')) return 'einsiedeln';
  if (clean.includes('steffisburg')) return 'steffisburg';
  return clean;
}

export default function CompanyLogo({ id, className = "w-16 h-16" }: CompanyLogoProps) {
  const normId = resolveBrandKey(id);
  const domain = DOMAIN_MAP[normId];

  const [retryState, setRetryState] = useState<number>(0);

  const specialUrls: Record<string, string> = {
    // Caisses Maladie (Swiss Health Insurers)
    css: 'https://www.google.com/s2/favicons?sz=128&domain=css.ch',
    helsana: 'https://www.google.com/s2/favicons?sz=128&domain=helsana.ch',
    swica: 'https://www.google.com/s2/favicons?sz=128&domain=swica.ch',
    visana: 'https://www.google.com/s2/favicons?sz=128&domain=visana.ch',
    groupemutuel: 'https://www.google.com/s2/favicons?sz=128&domain=groupemutuel.ch',
    mutuel: 'https://www.google.com/s2/favicons?sz=128&domain=groupemutuel.ch',
    avenir: 'https://www.google.com/s2/favicons?sz=128&domain=groupemutuel.ch',
    philos: 'https://www.google.com/s2/favicons?sz=128&domain=groupemutuel.ch',
    amb: 'https://www.google.com/s2/favicons?sz=128&domain=groupemutuel.ch',
    easysana: 'https://www.google.com/s2/favicons?sz=128&domain=groupemutuel.ch',
    kpt: 'https://www.google.com/s2/favicons?sz=128&domain=kpt.ch',
    cpt: 'https://www.google.com/s2/favicons?sz=128&domain=kpt.ch',
    sympany: 'https://www.google.com/s2/favicons?sz=128&domain=sympany.ch',
    assura: 'https://www.google.com/s2/favicons?sz=128&domain=assura.ch',
    atupri: 'https://www.google.com/s2/favicons?sz=128&domain=atupri.ch',
    okk: 'https://www.google.com/s2/favicons?sz=128&domain=oekk.ch',
    agrisano: 'https://www.google.com/s2/favicons?sz=128&domain=agrisano.ch',
    aquilana: 'https://www.google.com/s2/favicons?sz=128&domain=aquilana.ch',
    sodalis: 'https://www.google.com/s2/favicons?sz=128&domain=sodalis.ch',

    // Assureurs Vie (Life Insurers)
    swisslife: 'https://www.google.com/s2/favicons?sz=128&domain=swisslife.ch',
    'swiss life': 'https://www.google.com/s2/favicons?sz=128&domain=swisslife.ch',
    axa: 'https://www.google.com/s2/favicons?sz=128&domain=axa.ch',
    zurich: 'https://www.google.com/s2/favicons?sz=128&domain=zurich.ch',
    helvetia: 'https://www.google.com/s2/favicons?sz=128&domain=helvetia.ch',
    allianz: 'https://www.google.com/s2/favicons?sz=128&domain=allianz.ch',
    generali: 'https://www.google.com/s2/favicons?sz=128&domain=generali.ch',
    vaudoise: 'https://www.google.com/s2/favicons?sz=128&domain=vaudoise.ch',
    mobiliere: 'https://www.google.com/s2/favicons?sz=128&domain=mobiliere.ch',
    baloise: 'https://www.google.com/s2/favicons?sz=128&domain=baloise.ch',
  };

  useEffect(() => {
    setRetryState(0);
  }, [id, normId]);

  let imgSrc: string | null = null;

  if (retryState === 0) {
    if (specialUrls[normId]) {
      imgSrc = specialUrls[normId];
    } else if (domain) {
      imgSrc = `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;
    }
  } else if (retryState === 1) {
    if (domain) {
      imgSrc = `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;
    }
  } else if (retryState === 2) {
    if (domain) {
      imgSrc = `https://logo.clearbit.com/${domain}`;
    }
  }

  const handleImageError = () => {
    setRetryState((prev) => prev + 1);
  };

  // Render the real company logo if available and hasn't failed
  if (retryState < 3 && imgSrc) {
    return (
      <div className={`${className} bg-white rounded-2xl border border-fennec-cream/70 flex items-center justify-center p-2 shadow-2xs overflow-hidden shrink-0`}>
        <img 
          src={imgSrc} 
          alt={`${id} Logo`} 
          className="max-w-full max-h-full object-contain transition-all duration-300"
          onError={handleImageError}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Render individual SVG shapes matching the corporate visual identity of Swiss companies
  switch (normId) {
    // --- CAISSES MALADIE (Health Insurance) ---
    case 'assura':
      return (
        <div className={`${className} bg-[#E2001A] rounded-2xl flex flex-col items-center justify-center p-2 text-white shadow-2xs`}>
          <svg viewBox="0 0 100 100" className="w-10 h-10" fill="currentColor">
            <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="6" />
            <path d="M40 65 V45 C40 38 48 35 55 42 V65 M55 52 C48 56 40 56 40 52" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" />
          </svg>
          <span className="text-[9px] font-black tracking-wider leading-none mt-1 font-display">ASSURA</span>
        </div>
      );

    case 'css':
      return (
        <div className={`${className} bg-white rounded-2xl border border-fennec-cream/70 flex flex-col items-center justify-center p-2 shadow-2xs`}>
          <div className="flex space-x-0.5 items-end justify-center">
            {/* Orange and Cyan overlapping arcs */}
            <svg viewBox="0 0 60 40" className="w-10 h-6">
              <path d="M 10,20 A 12,12 0 1,1 34,20" stroke="#FF5F00" strokeWidth="6" fill="none" />
              <path d="M 26,20 A 12,12 0 1,1 50,20" stroke="#009EE0" strokeWidth="6" fill="none" />
            </svg>
          </div>
          <span className="text-[10px] font-black text-[#0B2545] leading-none mt-1 font-display">CSS</span>
        </div>
      );

    case 'helsana':
      return (
        <div className={`${className} bg-white rounded-2xl border border-fennec-cream/70 flex flex-col items-center justify-center p-2 shadow-2xs`}>
          <svg viewBox="0 0 100 60" className="w-12 h-8">
            <path d="M 15,30 Q 30,10 50,30 T 85,30" stroke="#009639" strokeWidth="8" fill="none" strokeLinecap="round" />
            <circle cx="50" cy="22" r="7" fill="#E20074" />
          </svg>
          <span className="text-[9px] font-bold text-[#009639] tracking-tight leading-none font-sans">Helsana</span>
        </div>
      );

    case 'swica':
      return (
        <div className={`${className} bg-[#004B87] rounded-2xl flex flex-col items-center justify-center p-2 text-white shadow-2xs`}>
          <svg viewBox="0 0 100 80" className="w-10 h-8" fill="none">
            {/* Red and Green cross/leaf symbol */}
            <rect x="35" y="10" width="16" height="40" rx="3" fill="#E2001A" />
            <rect x="23" y="22" width="40" height="16" rx="3" fill="#E2001A" />
            <path d="M 50,25 Q 70,25 75,45 T 50,65" stroke="#78BE20" strokeWidth="7" strokeLinecap="round" />
          </svg>
          <span className="text-[9px] font-black tracking-widest leading-none mt-1">SWICA</span>
        </div>
      );

    case 'visana':
      return (
        <div className={`${className} bg-white rounded-2xl border border-fennec-cream/70 flex flex-col items-center justify-center p-2 shadow-2xs`}>
          <div className="flex items-center space-x-1">
            <svg viewBox="0 0 40 40" className="w-6 h-6">
              <path d="M 5,30 L 20,10 L 35,30" stroke="#003366" strokeWidth="5" fill="none" />
              <circle cx="20" cy="22" r="5" fill="#E2001A" />
            </svg>
            <span className="text-xs font-black text-[#003366] font-display">VISANA</span>
          </div>
        </div>
      );

    case 'sanitas':
      return (
        <div className={`${className} bg-white rounded-2xl border border-fennec-cream/70 flex flex-col items-center justify-center p-2 shadow-2xs`}>
          <svg viewBox="0 0 100 40" className="w-12 h-5">
            <rect x="5" y="10" width="16" height="16" rx="2" fill="#E2001A" />
            <path d="M 13,13 V 23 M 9,18 H 17" stroke="white" strokeWidth="3" />
            <text x="28" y="24" fill="#002F6C" className="text-[14px] font-black" fontFamily="sans-serif">Sanitas</text>
          </svg>
        </div>
      );

    case 'concordia':
      return (
        <div className={`${className} bg-white rounded-2xl border border-fennec-cream/70 flex flex-col items-center justify-center p-2 shadow-2xs`}>
          <svg viewBox="0 0 100 50" className="w-12 h-6" fill="none">
            <path d="M 20,10 Q 50,15 80,10 L 80,30 Q 50,45 20,30 Z" fill="#0072C6" />
            <path d="M 35,15 Q 50,18 65,15 L 65,25 Q 50,35 35,25 Z" fill="#78BE20" />
          </svg>
          <span className="text-[8px] font-black text-[#0072C6] tracking-tight mt-0.5">CONCORDIA</span>
        </div>
      );

    case 'kpt':
    case 'cpt':
      return (
        <div className={`${className} bg-[#00549F] rounded-2xl flex flex-col items-center justify-center p-1 text-white shadow-2xs`}>
          <div className="flex space-x-1 items-center">
            <span className="text-sm font-black font-display tracking-tighter">KPT</span>
            <div className="flex flex-col space-y-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD100]" />
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>
        </div>
      );

    case 'mutuel':
    case 'groupe mutuel':
    case 'groupemutuel':
      return (
        <div className={`${className} bg-white rounded-2xl border border-fennec-cream/70 flex flex-col items-center justify-center p-2 shadow-2xs`}>
          <div className="flex flex-col items-center justify-center">
            <svg viewBox="0 0 80 35" className="w-12 h-6">
              <rect x="5" y="5" width="30" height="25" fill="#003865" rx="3" />
              <rect x="40" y="5" width="30" height="25" fill="#E87722" rx="3" />
              <text x="12" y="22" fill="white" className="text-[12px] font-bold">G</text>
              <text x="47" y="22" fill="white" className="text-[12px] font-bold">M</text>
            </svg>
            <span className="text-[7px] font-bold text-[#003865] uppercase tracking-wider leading-none mt-1">Groupe Mutuel</span>
          </div>
        </div>
      );

    case 'okk':
    case 'ökk':
      return (
        <div className={`${className} bg-white rounded-2xl border border-fennec-cream/70 flex flex-col items-center justify-center p-2 shadow-2xs`}>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 rounded-full bg-[#F26A36] flex items-center justify-center text-white text-[9px] font-bold">ö</div>
            <span className="text-xs font-black text-[#4A4A4A] font-display">ÖKK</span>
          </div>
        </div>
      );

    case 'sympany':
      return (
        <div className={`${className} bg-white rounded-2xl border border-fennec-cream/70 flex flex-col items-center justify-center p-2 shadow-2xs`}>
          <svg viewBox="0 0 100 45" className="w-12 h-6" fill="none">
            {/* Orange and grey star icon style */}
            <path d="M 20,22 L 35,10 L 50,22 L 35,34 Z" fill="#F05A28" />
            <circle cx="35" cy="22" r="5" fill="#FFFFFF" />
            <text x="58" y="28" fill="#4A4A4A" className="text-[14px] font-black" fontFamily="sans-serif">S</text>
          </svg>
          <span className="text-[8px] font-black text-[#F05A28] leading-none">Sympany</span>
        </div>
      );

    case 'atupri':
      return (
        <div className={`${className} bg-[#231F20] rounded-2xl flex flex-col items-center justify-center p-2 text-white shadow-2xs`}>
          <span className="text-[11px] font-black tracking-widest text-[#E30613] font-display">atupri</span>
          <span className="text-[7px] font-bold tracking-widest text-white uppercase leading-none mt-0.5">Assurance</span>
        </div>
      );

    case 'agrisano':
      return (
        <div className={`${className} bg-[#00875A] rounded-2xl flex flex-col items-center justify-center p-2 text-white shadow-2xs`}>
          <svg viewBox="0 0 40 25" className="w-8 h-5" fill="currentColor">
            <path d="M 20,3 C 10,12 10,22 20,22 C 30,22 30,12 20,3 Z" fill="white" opacity="0.9" />
            <path d="M 20,8 V 19 M 15,14 H 25" stroke="#00875A" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span className="text-[8px] font-black tracking-wider uppercase leading-none mt-0.5">Agrisano</span>
        </div>
      );

    case 'aquilana':
      return (
        <div className={`${className} bg-white rounded-2xl border border-emerald-200 flex flex-col items-center justify-center p-2 shadow-2xs`}>
          <span className="text-[10px] font-black text-[#006644] font-display uppercase tracking-wider">AQUILANA</span>
          <span className="text-[6px] font-bold text-emerald-600 tracking-widest uppercase mt-0.5">Assurance</span>
        </div>
      );

    case 'sodalis':
      return (
        <div className={`${className} bg-[#5C2D91] rounded-2xl flex flex-col items-center justify-center p-2 text-white shadow-2xs`}>
          <span className="text-xs font-black font-display tracking-tight leading-none">sodalis</span>
          <span className="text-[6px] font-semibold text-purple-200 uppercase tracking-widest mt-0.5">Gesundheit</span>
        </div>
      );

    case 'rhenusana':
      return (
        <div className={`${className} bg-[#005596] rounded-2xl flex flex-col items-center justify-center p-2 text-white shadow-2xs`}>
          <span className="text-[10px] font-black uppercase font-display tracking-wider">rhenusana</span>
        </div>
      );

    case 'galenos':
      return (
        <div className={`${className} bg-white rounded-2xl border border-blue-200 flex flex-col items-center justify-center p-2 shadow-2xs`}>
          <span className="text-[10px] font-black text-[#002D62] font-display uppercase tracking-widest">GALENOS</span>
        </div>
      );

    case 'glarner':
      return (
        <div className={`${className} bg-[#C8102E] rounded-2xl flex flex-col items-center justify-center p-2 text-white shadow-2xs`}>
          <span className="text-[9px] font-black uppercase tracking-wider font-display text-center leading-tight">Glarner</span>
          <span className="text-[6px] font-bold uppercase tracking-widest text-amber-200">Krankenkasse</span>
        </div>
      );

    case 'einsiedeln':
      return (
        <div className={`${className} bg-[#A6192E] rounded-2xl flex flex-col items-center justify-center p-1.5 text-white shadow-2xs`}>
          <span className="text-[8px] font-black uppercase tracking-tight text-center leading-tight">Einsiedler</span>
          <span className="text-[6px] font-semibold opacity-80 uppercase">Krankenkasse</span>
        </div>
      );

    case 'steffisburg':
      return (
        <div className={`${className} bg-[#003A70] rounded-2xl flex flex-col items-center justify-center p-1.5 text-white shadow-2xs`}>
          <span className="text-[8px] font-black uppercase tracking-tight text-center leading-tight">Steffisburg</span>
        </div>
      );

    case 'sumiswalder':
      return (
        <div className={`${className} bg-[#002855] rounded-2xl flex flex-col items-center justify-center p-1.5 text-white shadow-2xs`}>
          <span className="text-[7px] font-black uppercase tracking-tight text-center leading-tight">Sumiswalder</span>
        </div>
      );

    case 'luzernerhinterland':
      return (
        <div className={`${className} bg-[#008080] rounded-2xl flex flex-col items-center justify-center p-1.5 text-white shadow-2xs`}>
          <span className="text-[7px] font-black uppercase tracking-tight text-center leading-tight">Luzerner</span>
          <span className="text-[6px] font-bold text-teal-100">Hinterland</span>
        </div>
      );

    case 'curaulta':
    case 'egk':
    case 'slkk':
    case 'surselva':
    case 'visperterminen':
    case 'entremont':
    case 'waedenswil':
    case 'birchmeier':
      return (
        <div className={`${className} bg-white rounded-2xl border border-fennec-tan/50 flex flex-col items-center justify-center p-2 shadow-2xs`}>
          <span className="text-[10px] font-black text-fennec-dark uppercase tracking-wider font-display text-center leading-tight">
            {normId.toUpperCase().slice(0, 8)}
          </span>
          <span className="text-[6px] font-bold text-fennec-terracotta uppercase tracking-widest mt-0.5">Assurance</span>
        </div>
      );

    case 'sana24':
      return (
        <div className={`${className} bg-[#003366] rounded-2xl flex flex-col items-center justify-center p-2 text-white shadow-2xs`}>
          <span className="text-xs font-black font-display tracking-tight">sana24</span>
        </div>
      );

    case 'avenir':
    case 'philos':
    case 'amb':
    case 'easysana':
      return (
        <div className={`${className} bg-[#003865] rounded-2xl flex flex-col items-center justify-center p-1.5 text-white shadow-2xs`}>
          <span className="text-[9px] font-black uppercase tracking-wide font-display text-center leading-none">
            {normId.toUpperCase()}
          </span>
          <span className="text-[6px] font-bold text-amber-400 tracking-widest uppercase mt-0.5">Gr. Mutuel</span>
        </div>
      );

    // --- ASSUREURS VIE (Life Insurance) ---
    case 'swisslife':
    case 'swiss life':
      return (
        <div className={`${className} bg-white rounded-2xl border border-fennec-cream/70 flex flex-col items-center justify-center p-1 shadow-2xs`}>
          <div className="bg-[#E2001A] w-full py-0.5 px-1 rounded-t-lg text-center">
            <span className="text-[6px] font-black text-white tracking-widest">SWISS</span>
          </div>
          <div className="py-1 px-2 text-center">
            <span className="text-xs font-black text-[#231F20] font-display leading-none">Swiss Life</span>
          </div>
        </div>
      );

    case 'axa':
    case 'axa prevoyance':
      return (
        <div className={`${className} bg-[#00008F] rounded-2xl flex flex-col items-center justify-center p-2 text-white shadow-2xs relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-4 h-4 bg-[#E2001A] transform rotate-45 translate-x-2 -translate-y-2" />
          <span className="text-base font-black tracking-tighter leading-none font-display">AXA</span>
        </div>
      );

    case 'zurich':
    case 'zurich assurance':
      return (
        <div className={`${className} bg-white rounded-2xl border border-fennec-cream/70 flex flex-col items-center justify-center p-2 shadow-2xs`}>
          <svg viewBox="0 0 50 50" className="w-8 h-8">
            <circle cx="25" cy="25" r="20" fill="#003399" />
            <path d="M 16,16 H 34 L 16,34 H 34" stroke="white" strokeWidth="4" fill="none" strokeLinejoin="miter" />
          </svg>
          <span className="text-[8px] font-bold text-[#003399] tracking-tight leading-none mt-1">ZURICH</span>
        </div>
      );

    case 'helvetia':
      return (
        <div className={`${className} bg-white rounded-2xl border border-fennec-cream/70 flex flex-col items-center justify-center p-2 shadow-2xs`}>
          <svg viewBox="0 0 100 45" className="w-12 h-6" fill="none">
            {/* Helvetia red triangle symbol */}
            <polygon points="10,35 30,10 50,35" fill="#E2001A" />
            <text x="55" y="28" fill="#1C1C1C" className="text-[12px] font-black" fontFamily="sans-serif">helvetia</text>
          </svg>
        </div>
      );

    case 'allianz':
    case 'allianz suisse':
      return (
        <div className={`${className} bg-[#00377C] rounded-2xl flex flex-col items-center justify-center p-2 text-white shadow-2xs`}>
          <svg viewBox="0 0 40 40" className="w-6 h-6">
            <circle cx="20" cy="20" r="16" fill="none" stroke="white" strokeWidth="3.5" />
            <line x1="15" y1="12" x2="15" y2="28" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <line x1="20" y1="11" x2="20" y2="29" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="25" y1="12" x2="25" y2="28" stroke="white" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span className="text-[8px] font-black tracking-wider leading-none mt-1">Allianz</span>
        </div>
      );

    case 'generali':
    case 'generali suisse':
      return (
        <div className={`${className} bg-[#B81D24] rounded-2xl flex flex-col items-center justify-center p-1 text-white shadow-2xs`}>
          <span className="text-[8px] font-bold tracking-widest text-center border-b border-white/20 pb-0.5 w-full">GENERALI</span>
          {/* Stylized Lion outline */}
          <svg viewBox="0 0 40 20" className="w-8 h-4 mt-0.5" fill="currentColor">
            <path d="M 5,15 Q 12,8 20,15 T 35,15 L 35,18 H 5 Z" />
            <circle cx="10" cy="10" r="3" />
          </svg>
        </div>
      );

    case 'mobiliere':
    case 'la mobiliere':
    case 'la mobilière':
      return (
        <div className={`${className} bg-[#E2001A] rounded-2xl flex flex-col items-center justify-center p-2 text-white shadow-2xs`}>
          <span className="text-[10px] font-black leading-none uppercase tracking-widest">mobilière</span>
          <span className="text-[6px] font-bold tracking-wider leading-none mt-0.5 opacity-80">La Garantie</span>
        </div>
      );

    case 'baloise':
    case 'baloise assurances':
      return (
        <div className={`${className} bg-white rounded-2xl border border-fennec-cream/70 flex flex-col items-center justify-center p-2 shadow-2xs`}>
          <div className="flex items-center space-x-1">
            {/* Baloise blue and yellow shapes */}
            <svg viewBox="0 0 30 30" className="w-6 h-6">
              <polygon points="5,5 25,5 15,25" fill="#002D62" />
              <polygon points="12,12 28,12 20,28" fill="#FFC72C" opacity="0.85" />
            </svg>
            <span className="text-[10px] font-black text-[#002D62] font-display">Baloise</span>
          </div>
        </div>
      );

    case 'pax':
      return (
        <div className={`${className} bg-white rounded-2xl border border-fennec-cream/70 flex flex-col items-center justify-center p-2 shadow-2xs`}>
          <span className="text-sm font-black text-[#0B2545] font-display tracking-widest leading-none">PAX</span>
          <span className="text-[6px] font-bold text-amber-600 mt-0.5 tracking-wider uppercase">Prévoyance</span>
        </div>
      );

    case 'retraitepopulaire':
    case 'retraite populaire':
      return (
        <div className={`${className} bg-[#00549F] rounded-2xl flex flex-col items-center justify-center p-2 text-white shadow-2xs`}>
          <span className="text-[9px] font-black leading-tight uppercase text-center font-display">Retraite</span>
          <span className="text-[9px] font-bold leading-none uppercase text-center text-amber-300">Populaire</span>
        </div>
      );

    case 'vaudoise':
    case 'la vaudoise':
      return (
        <div className={`${className} bg-[#009639] rounded-2xl flex flex-col items-center justify-center p-2 text-white shadow-2xs`}>
          <span className="text-xs font-black uppercase font-display leading-none">Vaudoise</span>
          <span className="text-[7px] font-bold tracking-widest leading-none mt-1 opacity-90">ASSURANCES</span>
        </div>
      );

    default: {
      const alphaOnly = id.replace(/[^a-zA-Z\s]/g, '').trim();
      const displayLabel = alphaOnly.length >= 2 
        ? alphaOnly.slice(0, 6).toUpperCase() 
        : 'LAMal';
      return (
        <div className={`${className} rounded-2xl bg-gradient-to-br from-fennec-dark to-[#2B1B17] text-white flex flex-col items-center justify-center font-display shadow-2xs shrink-0 p-1 text-center border border-fennec-cream/20 relative overflow-hidden`}>
          <div className="flex items-center space-x-1 mb-0.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-600 flex items-center justify-center text-[7px] font-bold text-white leading-none">
              +
            </div>
            <span className="text-[9px] font-black tracking-wider leading-none">{displayLabel}</span>
          </div>
          <span className="text-[6px] font-semibold text-fennec-tan uppercase tracking-widest">Assurance</span>
        </div>
      );
    }
  }
}
