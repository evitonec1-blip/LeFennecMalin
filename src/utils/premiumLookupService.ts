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
 * Returns a user-friendly name for an insurer by its ID
 */
export function getInsurerDisplayName(id: string): string {
  const names: Record<string, string> = {
    okk: 'ÖKK',
    assura: 'Assura',
    glarner: 'Glarner Krankenversicherung',
    waedenswil: 'KK Wädenswil',
    aquilana: 'Aquilana',
    swica: 'Swica',
    concordia: 'Concordia',
    amb: 'AMB Assurances',
    einsiedeln: 'KK Einsiedeln',
    kpt: 'KPT / CPT',
    atupri: 'Atupri',
    sympany: 'Vivao Sympany',
    steffisburg: 'KK Steffisburg',
    agrisano: 'Agrisano',
    simplon: 'KK Simplon',
    visperterminen: 'KK Visperterminen',
    zeneggen: 'KK Zeneggen',
    galenos: 'Galenos',
    compact: 'Compact',
    sodalis: 'Sodalis',
    luzernerhinterland: 'KK Luzerner Hinterland',
    css: 'CSS',
    sana24: 'Sana24',
    rhenusana: 'rhenusana',
    mutuel: 'Mutuel Assurance',
    easysana: 'Easy Sana',
    sanitas: 'Sanitas',
    philos: 'Philos',
    avenir: 'Avenir',
    vivacare: 'vivacare',
    moovesympany: 'Moove Sympany',
    progres: 'Progrès',
    visana: 'Visana',
    helsana: 'Helsana'
  };
  return names[id.toLowerCase().trim()] || id;
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

