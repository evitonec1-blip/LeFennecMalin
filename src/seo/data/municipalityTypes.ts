/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TypeScript definitions for Swiss Municipalities / Communes Local SEO Architecture.
 */

import { Language } from '../../i18n/translations';

export interface LocalCheapestInsurer {
  name: string;
  slug: string;
  adult2500: string; // e.g. "CHF 375.-"
  adult300: string;  // e.g. "CHF 485.-"
  model: string;     // e.g. "Telmed", "Médecin de famille", "HMO"
  rating?: number;
  highlight?: string;
}

export interface LocalFAQ {
  question: string;
  answer: string;
}

export interface LocalNearbyCommune {
  name: string;
  slug: string;
  cantonSlug: string;
  population?: string;
  distanceKm?: number;
}

export interface MunicipalitySEOData {
  id: string;                      // unique key, e.g. "geneve-geneve"
  name: string;                    // e.g. "Genève"
  slug: string;                    // e.g. "geneve"
  canton: string;                  // e.g. "Genève"
  cantonCode: string;              // e.g. "GE"
  cantonSlug: string;              // e.g. "geneve"
  postalCodes: string[];           // e.g. ["1201", "1202", "1203", "1204", "1205", "1206", "1207", "1208", "1209", "1211"]
  population: string;              // e.g. "203'856 habitants"
  languagePrimary: 'fr' | 'de' | 'it' | 'bilingual';
  region: string;                  // OFSP region, e.g. "Région 1 (PR-REG CH1)"
  priority: 1 | 2 | 3;            // 1: Tier 1 cities, 2: Tier 2, 3: Tier 3
  avgAdultPremium300: string;      // e.g. "CHF 510 – CHF 585 / mois"
  avgAdultPremium2500: string;     // e.g. "CHF 395 – CHF 465 / mois"
  avgYoungPremium: string;         // e.g. "CHF 330 – CHF 415 / mois"
  avgChildPremium: string;         // e.g. "CHF 120 – CHF 165 / mois"
  cheapestInsurers: LocalCheapestInsurer[];
  popularInsurers: string[];
  localHospitals: string[];        // e.g. ["HUG (Hôpitaux Universitaires de Genève)", "Clinique des Grangettes"]
  hmoCenters?: string[];           // Local care networks e.g. ["Centre Médical des Eaux-Vives", "Centre Médical de la Servette"]
  subsidyAgency: string;           // e.g. "SAM (Service de l'assurance-maladie)"
  subsidyOfficeAddress: string;    // e.g. "Route de Frontenex 62, 1207 Genève"
  subsidyEligibilitySummary: string; // e.g. "Calculé selon le Revenu Déterminant Unifié (RDU)."
  localOverview: string;           // Rich, genuinely localized intro overview (3-4 paragraphs)
  franchiseAdvice: string;         // Localized deductible analysis
  modelsAdvice: string;            // Telmed vs Family Doctor vs HMO local guidance
  familyAdvice: string;            // Localized pediatric and family discounts guidance
  youngAdultAdvice: string;        // Localized 19-25 age group and student guidance
  crossBorderAdvice?: string;      // Optional cross-border / frontalier guidance for border cities
  faqs: LocalFAQ[];
  nearbyCommunes: LocalNearbyCommune[];
  seoTitle: string;
  metaDescription: string;
  h1: string;
}

export interface CantonLocalHubData {
  cantonName: string;
  cantonSlug: string;
  cantonCode: string;
  communesCount: number;
  totalPopulation: string;
  mainCities: MunicipalitySEOData[];
  overview: string;
}
