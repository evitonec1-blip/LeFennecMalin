/**
 * Premium Lookup Service and JSON Data Store Utility
 * Defines a structured schema and provides efficient lookups aligned with
 * official priminfo.admin.ch calculation parameters:
 * (canton, region, yob/ageCategory, deductible, model, accidentCoverage).
 */

import { resolveZipCode, ZipCodeInfo } from './swissZipCodes';

export interface PremiumRecord {
  premium: number;
  modelName: string;
}

export type AgeCategory = 'adult' | 'young' | 'child';
export type ModelType = 'standard' | 'family' | 'hmo' | 'telemed';

export interface PremiumLookupQuery {
  insurerId: string;
  canton: string;
  region: string;
  ageCategory: AgeCategory | string;
  yob?: number;
  deductible: number;
  model: ModelType | string;
  accidentCoverage: boolean;
}

/**
 * Maps Year of Birth (yob) directly to official Swiss LAMal age categories:
 * - Children (0–18 years): yob >= currentYear - 18 (e.g., 2008..2026 for 2026)
 * - Young Adults (19–25 years): yob between currentYear - 25 and currentYear - 19 (e.g., 2001..2007)
 * - Adults (26+ years): yob <= currentYear - 26 (e.g., <= 2000)
 */
export function getAgeCategoryFromYob(yob: number | string, referenceYear: number = 2026): AgeCategory {
  const year = typeof yob === 'number' ? yob : parseInt(String(yob), 10);
  if (isNaN(year) || year <= 0) return 'adult';
  const age = referenceYear - year;
  if (age <= 18) return 'child';
  if (age <= 25) return 'young';
  return 'adult';
}

/**
 * Returns official statutory deductibles (franchises) under Swiss LAMal law:
 * - Adults (26+) & Young Adults (19–25): CHF 300, 500, 1000, 1500, 2000, 2500
 * - Children (0–18): CHF 0, 100, 200, 300, 400, 500, 600
 */
export function getStatutoryFranchises(ageCategory: string): number[] {
  if (ageCategory === 'child') {
    return [0, 100, 200, 300, 400, 500, 600];
  }
  return [300, 500, 1000, 1500, 2000, 2500];
}

/**
 * Normalizes Priminfo model codes (BASE, HAM, HMO, TEL) to app model types.
 */
export function normalizeModelCode(model: string): ModelType {
  const m = model.toLowerCase().trim();
  if (m === 'base' || m === 'standard') return 'standard';
  if (m === 'ham' || m === 'family' || m === 'hausarzt') return 'family';
  if (m === 'hmo') return 'hmo';
  if (m === 'tel' || m === 'telemed' || m === 'télémédecine') return 'telemed';
  return 'standard';
}

/**
 * Generates the standard lookup key for the pre-compiled premiums database.
 * Key structure: `insurerId_canton_region_ageCategory_deductible_model_accident`
 * E.g., `css_GE_PR-REG CH1_adult_2500_telemed_true`
 */
export function generatePremiumKey(query: PremiumLookupQuery): string {
  const insurer = query.insurerId.toLowerCase().trim();
  const canton = query.canton.toUpperCase().trim();
  const region = query.region.trim(); // E.g., "PR-REG CH1"
  
  // Resolve age category from yob if provided, otherwise clean string
  const resolvedAgeCat = query.yob 
    ? getAgeCategoryFromYob(query.yob) 
    : (query.ageCategory || 'adult').toLowerCase().trim();
    
  const deductible = Number(query.deductible);
  const model = normalizeModelCode(query.model);
  const accident = !!query.accidentCoverage;

  return `${insurer}_${canton}_${region}_${resolvedAgeCat}_${deductible}_${model}_${accident}`;
}

/**
 * Resolves a region code based on Swiss canton rules and ZIP zone numbers.
 */
export function getRegionCode(canton: string, zone: number): string {
  const singleRegionCantons = [
    'AG', 'AI', 'AR', 'BS', 'GE', 'GL', 'JU', 'NE', 'NW', 'OW', 'SO', 'SZ', 'TG', 'UR', 'ZG', 'ZE', 'ZR'
  ];
  const hasThreeRegions = ['BE', 'GR', 'LU', 'SG', 'ZH'];
  const hasTwoRegions = ['BL', 'FR', 'SH', 'TI', 'VD', 'VS'];

  if (singleRegionCantons.includes(canton)) {
    return 'PR-REG CH0';
  }

  let safeZone = zone;
  if (hasThreeRegions.includes(canton)) {
    safeZone = Math.max(1, Math.min(3, zone));
    return `PR-REG CH${safeZone}`;
  } else if (hasTwoRegions.includes(canton)) {
    safeZone = Math.max(1, Math.min(2, zone));
    return `PR-REG CH${safeZone}`;
  }

  return 'PR-REG CH0';
}

/**
 * Performs an efficient O(1) database lookup using the pre-compiled hashmap.
 */
export function lookupPremium(
  database: Record<string, PremiumRecord>,
  query: PremiumLookupQuery
): PremiumRecord | null {
  const key = generatePremiumKey(query);
  const record = database[key];
  return record || null;
}

/**
 * Official OFSP insurer registry (numeric BAG/OFSP code -> legal name),
 * sourced verbatim from assureurs-maladie-admis-2026-01-01.xlsx (data/insurers_2026.json).
 * DO NOT hand-edit these values — regenerate from the official file if it changes.
 */
export const OFFICIAL_INSURERS: Record<string, string> = {
    '8': 'CSS Assurance-maladie SA',
    '32': 'Aquilana Versicherungen',
    '134': 'Einsiedler Krankenkasse',
    '194': 'Sumiswalder Krankenkasse',
    '246': 'Genossenschaft Krankenkasse Steffisburg',
    '290': 'CONCORDIA Assurance suisse de maladie et accidents SA',
    '312': 'Atupri Assurance de la santé SA',
    '343': 'Avenir Assurance',
    '360': 'Krankenkasse Luzerner Hinterland',
    '376': 'KPT Caisse-maladie SA',
    '455': 'ÖKK Kranken- und Unfallversicherungen AG',
    '509': 'Vivao Sympany SA',
    '780': 'Genossenschaft Glarner Krankenversicherung',
    '820': 'curaulta',
    '881': 'EGK Grundversicherungen AG',
    '923': 'Genossenschaft KRANKENKASSE SLKK',
    '941': 'sodalis gesundheitsgruppe',
    '966': 'vita surselva',
    '1040': 'Verein Krankenkasse Visperterminen',
    '1113': 'Caisse-maladie de la vallée d\'Entremont société coopérative',
    '1179': 'Mutuelle',
    '1318': 'Stiftung Krankenkasse Wädenswil',
    '1322': 'Krankenkasse Birchmeier',
    '1384': 'SWICA Assurance-maladie SA',
    '1386': 'Galenos AG',
    '1401': 'rhenusana',
    '1402': 'Taggeldkasse bildende KünstlerInnen',
    '1479': 'Mutuel Assurance',
    '1491': 'Gewerbliche Krankenkasse',
    '1507': 'AMB Assurances SA',
    '1509': 'Sanitas Grundversicherungen AG',
    '1520': 'HOTELA Caisse maladie',
    '1522': 'Krankenkasse Schweizerischer Metallbaufirmen',
    '1535': 'Philos Assurance',
    '1542': 'Assura-Basis SA',
    '1555': 'Visana AG',
    '1560': 'Agrisano Krankenkasse AG',
    '1562': 'Helsana Assurances SA',
    '1568': 'sana24 AG',
};

/**
 * Insurer codes that actually sell compulsory health insurance (AOS/LAMal).
 * Excludes the 5 codes flagged `daily_allowance_only: true` in the official
 * registry (they only sell daily-allowance insurance, never AOS premiums).
 */
export const ACTIVE_INSURER_IDS: string[] = [
  '8', '32', '134', '194', '246', '290', '312', '343', '360', '376', '455',
  '509', '780', '820', '881', '923', '941', '966', '1040', '1113', '1318',
  '1322', '1384', '1386', '1401', '1479', '1507', '1509', '1535', '1542',
  '1555', '1560', '1562', '1568'
];

/**
 * Returns the official insurer name by its OFSP numeric code.
 * If the code isn't in the official registry, returns a clearly-flagged
 * placeholder instead of guessing a name — never invent an insurer name.
 */
export function getInsurerDisplayName(id: string): string {
  const code = id.trim();
  return OFFICIAL_INSURERS[code] || `Assureur inconnu (code ${code})`;
}

/**
 * Returns fallback model display name based on model type if not explicitly set in the official data.
 */
export function getInsurerModelFallbackName(id: string, type: string): string {
  const displayNames: Record<string, string> = {
    standard: 'Base / Standard (AOS - BASE)',
    telemed: 'Télémédecine (TEL)',
    family: 'Médecin de Famille (HAM)',
    hmo: 'Réseau de soins / HMO'
  };
  return displayNames[type.toLowerCase()] || type;
}

/**
 * Translates German/English model names into clean French display names.
 */
export function translateModelNameToFrench(modelName: string, modelType?: string): string {
  if (!modelName) {
    if (modelType === 'family') return 'Médecin de famille (HAM)';
    if (modelType === 'telemed') return 'Télémédecine (TEL)';
    if (modelType === 'hmo') return 'Réseau de soins (HMO)';
    return 'Assurance de base (Standard)';
  }

  let name = modelName.trim();

  const translations: [RegExp, string][] = [
    [/Hausarztversicherung/gi, 'Médecin de famille'],
    [/Hausarzt-Modell/gi, 'Médecin de famille'],
    [/Hausarztmodell/gi, 'Médecin de famille'],
    [/Hausarztsystem/gi, 'Médecin de famille'],
    [/Hausarzt Modell/gi, 'Médecin de famille'],
    [/\bHausarzt\b/gi, 'Médecin de famille'],
    [/Grundversicherung/gi, 'Assurance de base'],
    [/Gesundheitspraxisversicherung/gi, 'Cabinet médical'],
    [/Gesundheitszentrum/gi, 'Centre de santé (HMO)'],
    [/Gesundheitsplan/gi, 'Plan de santé'],
    [/Gesundheitsnetz/gi, 'Réseau de santé'],
    [/Gesundheitnetz/gi, 'Réseau de santé'],
    [/Telemedizin/gi, 'Télémédecine'],
    [/\bohne\b/gi, 'sans'],
    [/\bmit\b/gi, 'avec'],
    [/Taggeldkasse/gi, 'Indemnités journalières'],
  ];

  for (const [regex, replacement] of translations) {
    name = name.replace(regex, replacement);
  }

  return name.replace(/\s+/g, ' ').trim();
}

