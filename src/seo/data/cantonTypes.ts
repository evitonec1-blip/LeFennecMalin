/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CheapestInsurerInfo {
  name: string;
  slug?: string;
  adult2500: string; // e.g. "CHF 375.-"
  adult300: string;  // e.g. "CHF 485.-"
  model: string;     // e.g. "Telmed" or "Médecin de famille"
  rating?: number;   // e.g. 4.8
  highlight?: string; // e.g. "Plus économique avec franchise 2500"
}

export interface CantonCommuneInfo {
  name: string;
  npa: string;
  description?: string;
}

export interface CantonSEOData {
  code: string;                  // e.g. 'GE', 'VD'
  name: string;                  // e.g. 'Genève'
  slug: string;                  // e.g. 'geneve'
  capital: string;               // e.g. 'Genève'
  languagePrimary: 'fr' | 'de' | 'it' | 'bilingual';
  population: string;            // e.g. "520'000 habitants"
  communesCount: number;         // e.g. 45
  mainCommunes: CantonCommuneInfo[];
  regionsCount: number;          // 1, 2 or 3
  regionsDescription: string;
  avgAdultPremium300: string;    // e.g. "CHF 480 – CHF 565 / mois"
  avgAdultPremium2500: string;   // e.g. "CHF 375 – CHF 445 / mois"
  avgYoungPremium: string;       // e.g. "CHF 320 – CHF 410 / mois"
  avgChildPremium: string;       // e.g. "CHF 115 – CHF 160 / mois"
  cheapestInsurers: CheapestInsurerInfo[];
  popularInsurers: string[];
  subsideAgency: string;         // e.g. "SAM (Service de l'assurance-maladie)"
  subsideDescription: string;
  subsideIncomeLimits: string;
  subsideLink?: string;
  hospitals: string[];
  keyPoints: string[];
  franchiseGuide: {
    intro: string;
    recommendation300: string;
    recommendation2500: string;
    breakEvenPoint: string;
  };
  modelsGuide: {
    telmedSavings: string;
    doctorFamilySavings: string;
    hmoSavings: string;
    localNetworks: string[];
  };
  faqs: { question: string; answer: string }[];
  metaDescription: string;
  seoTitle: string;
  h1: string;
  year: number;
  lastUpdated: string;
}
