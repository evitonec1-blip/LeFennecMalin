/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';
import { Globe, ChevronDown, Check } from 'lucide-react';

interface LanguageSelectorProps {
  variant?: 'header' | 'mobile' | 'footer';
  className?: string;
}

export default function LanguageSelector({ variant = 'header', className = '' }: LanguageSelectorProps) {
  const { language, setLanguage, languages, currentLanguageInfo, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  if (variant === 'mobile') {
    return (
      <div className={`w-full bg-fennec-cream/30 rounded-2xl p-3 border border-fennec-cream/60 ${className}`}>
        <div className="flex items-center space-x-2 mb-2 px-1 text-xs font-extrabold uppercase tracking-wider text-fennec-brown">
          <Globe className="w-3.5 h-3.5 text-fennec-terracotta" />
          <span>{t('select_language')}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {languages.map((item) => {
            const isSelected = item.code === language;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => handleSelect(item.code)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-fennec-terracotta text-white shadow-xs'
                    : 'bg-white text-fennec-dark border border-fennec-cream/60 hover:bg-fennec-cream/40'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-base leading-none">{item.flag}</span>
                  <span>{item.nativeName}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold transition-all duration-200 focus:outline-none"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <Globe className="w-3.5 h-3.5 text-fennec-tan" />
          <span className="text-sm">{currentLanguageInfo.flag}</span>
          <span className="uppercase tracking-wider font-bold">{currentLanguageInfo.shortLabel}</span>
          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 bottom-full mb-2 w-48 rounded-2xl bg-white shadow-xl border border-fennec-cream/80 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-fennec-dark/40 border-b border-fennec-cream/40 mb-1">
              {t('select_language')}
            </div>
            {languages.map((item) => {
              const isSelected = item.code === language;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => handleSelect(item.code)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-bold transition-colors ${
                    isSelected
                      ? 'bg-fennec-terracotta/10 text-fennec-terracotta'
                      : 'text-fennec-dark hover:bg-fennec-cream/40'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="text-base leading-none">{item.flag}</span>
                    <span className="font-medium">{item.nativeName}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-fennec-terracotta" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Header variant (default)
  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full bg-fennec-cream/40 hover:bg-fennec-cream/80 border border-fennec-cream/80 hover:border-fennec-terracotta/30 text-fennec-dark text-xs font-bold transition-all duration-200 focus:outline-none ${
          isOpen ? 'ring-2 ring-fennec-terracotta/30 bg-white border-fennec-terracotta/40' : ''
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-fennec-terracotta" />
        <span className="text-base leading-none">{currentLanguageInfo.flag}</span>
        <span className="uppercase font-extrabold tracking-wider text-fennec-dark text-xs">
          {currentLanguageInfo.shortLabel}
        </span>
        <ChevronDown className={`w-3 h-3 text-fennec-dark/60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white shadow-xl border border-fennec-cream/80 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-fennec-brown/60 border-b border-fennec-cream/40 mb-1 flex items-center justify-between">
            <span>Langue / Language</span>
            <Globe className="w-3 h-3 text-fennec-terracotta/60" />
          </div>
          {languages.map((item) => {
            const isSelected = item.code === language;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => handleSelect(item.code)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold transition-colors ${
                  isSelected
                    ? 'bg-fennec-terracotta/10 text-fennec-terracotta font-extrabold'
                    : 'text-fennec-dark hover:bg-fennec-cream/40'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-lg leading-none">{item.flag}</span>
                  <div className="flex flex-col text-left">
                    <span className="font-semibold text-xs leading-tight">{item.nativeName}</span>
                    <span className="text-[10px] font-normal text-fennec-dark/50">{item.name}</span>
                  </div>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-fennec-terracotta/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-fennec-terracotta" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
