/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LANGUAGES, LanguageOption, translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['fr'], fallback?: string) => string;
  currentLanguageInfo: LanguageOption;
  languages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'fennec_preferred_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      // 1. Check URL path prefix
      const path = typeof window !== 'undefined' ? window.location.pathname : '';
      if (path.startsWith('/de/') || path === '/de') return 'de';
      if (path.startsWith('/it/') || path === '/it') return 'it';
      if (path.startsWith('/en/') || path === '/en') return 'en';
      if (path.startsWith('/fr/') || path === '/fr') return 'fr';

      // 2. Check localStorage
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (['fr', 'de', 'en', 'it', 'es', 'pt'] as string[]).includes(saved)) {
        return saved as Language;
      }
    } catch {
      // Fallback
    }
    return 'fr'; // Default French
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore
    }
  };

  const t = (key: keyof typeof translations['fr'], fallback?: string): string => {
    const langDict = translations[language] || translations.fr;
    if (Object.prototype.hasOwnProperty.call(langDict, key) && langDict[key]) return langDict[key];
    return translations.fr[key] || fallback || key;
  };

  const currentLanguageInfo = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currentLanguageInfo, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
