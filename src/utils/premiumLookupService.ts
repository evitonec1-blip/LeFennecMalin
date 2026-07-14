/**
 * Premium Lookup Service and JSON Data Store Utility
 * Defines a structured schema and provides efficient lookups by
 * (canton, region, ageCategory, deductible, model, accidentCoverage).
 */

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
  deductible: number;
  model: ModelType | string;
  accidentCoverage: boolean;
}

/**
 * Generates the standard lookup key for the pre-compiled premiums database.
 * Key structure: `insurerId_canton_region_ageCategory_deductible_model_accident`
 * E.g., `css_GE_PR-REG CH1_adult_2500_telemed_true`
 *
 * @param query The premium lookup query parameters
 * @returns The generated database key string
 */
export function generatePremiumKey(query: PremiumLookupQuery): string {
  const insurer = query.insurerId.toLowerCase().trim();
  const canton = query.canton.toUpperCase().trim();
  const region = query.region.trim(); // E.g., "PR-REG CH1"
  const age = query.ageCategory.toLowerCase().trim();
  const deductible = Number(query.deductible);
  const model = query.model.toLowerCase().trim();
  const accident = !!query.accidentCoverage;

  return `${insurer}_${canton}_${region}_${age}_${deductible}_${model}_${accident}`;
}

/**
 * Resolves a region code based on Swiss canton rules and ZIP zone numbers.
 *
 * @param canton Standard Swiss 2-letter canton code (e.g., "GE", "BE")
 * @param zone Region zone index (e.g., 1, 2, 3)
 * @returns Standardised region code (e.g., "PR-REG CH1")
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
 *
 * @param database Loaded JSON database of premiums
 * @param query Lookup parameters
 * @returns PremiumRecord or null if not found
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
    standard: 'Base / Standard (AOS)',
    telemed: 'Télémédecine',
    family: 'Médecin de Famille',
    hmo: 'Réseau de soins / HMO'
  };
  return displayNames[type.toLowerCase()] || type;
}
