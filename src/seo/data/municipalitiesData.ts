/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Swiss Municipalities Master Dataset and Helper Queries.
 */

import { MunicipalitySEOData, CantonLocalHubData } from './municipalityTypes';
import { ROMANDIE_MUNICIPALITIES } from './municipalities/romandie';
import { GERMAN_MUNICIPALITIES } from './municipalities/german';
import { TICINO_MUNICIPALITIES } from './municipalities/ticino';

export const ALL_MUNICIPALITIES: MunicipalitySEOData[] = [
  ...ROMANDIE_MUNICIPALITIES,
  ...GERMAN_MUNICIPALITIES,
  ...TICINO_MUNICIPALITIES
];

/**
 * Lookup a municipality by canton slug and municipality slug
 */
export function getMunicipalityBySlug(cantonSlug: string, citySlug: string): MunicipalitySEOData | undefined {
  const normCanton = cantonSlug.toLowerCase().trim();
  const normCity = citySlug.toLowerCase().trim();
  return ALL_MUNICIPALITIES.find(
    (m) => m.cantonSlug.toLowerCase() === normCanton && m.slug.toLowerCase() === normCity
  );
}

/**
 * Get all municipalities belonging to a specific canton
 */
export function getMunicipalitiesByCanton(cantonSlug: string): MunicipalitySEOData[] {
  const normCanton = cantonSlug.toLowerCase().trim();
  return ALL_MUNICIPALITIES.filter((m) => m.cantonSlug.toLowerCase() === normCanton);
}

/**
 * Get all canton slugs that have municipality pages
 */
export function getActiveCantonSlugs(): string[] {
  const slugs = new Set<string>();
  ALL_MUNICIPALITIES.forEach((m) => slugs.add(m.cantonSlug));
  return Array.from(slugs);
}

/**
 * Get localized canton hub data
 */
export function getCantonLocalHubData(cantonSlug: string): CantonLocalHubData | undefined {
  const cities = getMunicipalitiesByCanton(cantonSlug);
  if (cities.length === 0) return undefined;

  const first = cities[0];
  return {
    cantonName: first.canton,
    cantonSlug: first.cantonSlug,
    cantonCode: first.cantonCode,
    communesCount: cities.length,
    totalPopulation: cities.reduce((acc, c) => acc + parseInt(c.population.replace(/\D/g, '') || '0', 10), 0).toLocaleString('fr-CH') + ' hab. (villes principales)',
    mainCities: cities,
    overview: `Découvrez les primes d'assurance maladie officielles de l'OFSP pour les principales communes et villes du Canton de ${first.canton} (${first.cantonCode}). Comparez les tarifs 2026, trouvez les assureurs les plus économiques et bénéficiez des aides cantonales aux primes.`
  };
}
