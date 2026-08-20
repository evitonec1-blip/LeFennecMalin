/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CantonSEOData } from './cantonTypes';
import { ROMANDIE_CANTONS } from './cantons/romandie';
import { BILINGUE_BERNE_CANTONS } from './cantons/bilingueBerne';
import { SUISSE_CENTRALE_CANTONS } from './cantons/suisseCentrale';
import { SUISSE_ORIENTALE_TESSIN_CANTONS } from './cantons/suisseOrientaleTessin';

export type { CantonSEOData, CheapestInsurerInfo, CantonCommuneInfo } from './cantonTypes';

/**
 * All 26 Swiss Cantons SEO Data Dictionary
 */
export const CANTONS_SEO_DATA: Record<string, CantonSEOData> = {
  ...ROMANDIE_CANTONS,
  ...BILINGUE_BERNE_CANTONS,
  ...SUISSE_CENTRALE_CANTONS,
  ...SUISSE_ORIENTALE_TESSIN_CANTONS
};

// Aliases for route backwards-compatibility
CANTONS_SEO_DATA['appenzell-ar'] = CANTONS_SEO_DATA['appenzell-rhodes-exterieures'];
CANTONS_SEO_DATA['appenzell-ai'] = CANTONS_SEO_DATA['appenzell-rhodes-interieures'];

/**
 * List of all 26 Swiss Cantons with codes and canonical slugs
 */
export const ALL_26_CANTONS = [
  { code: 'GE', name: 'Genève', slug: 'geneve', region: 'Romandie' },
  { code: 'VD', name: 'Vaud', slug: 'vaud', region: 'Romandie' },
  { code: 'VS', name: 'Valais', slug: 'valais', region: 'Romandie / Bilingue' },
  { code: 'FR', name: 'Fribourg', slug: 'fribourg', region: 'Romandie / Bilingue' },
  { code: 'NE', name: 'Neuchâtel', slug: 'neuchatel', region: 'Romandie' },
  { code: 'JU', name: 'Jura', slug: 'jura', region: 'Romandie' },
  { code: 'BE', name: 'Berne', slug: 'berne', region: 'Espace Mittelland / Bilingue' },
  { code: 'ZH', name: 'Zurich', slug: 'zurich', region: 'Zurich' },
  { code: 'BS', name: 'Bâle-Ville', slug: 'bale-ville', region: 'Nord-Ouest' },
  { code: 'BL', name: 'Bâle-Campagne', slug: 'bale-campagne', region: 'Nord-Ouest' },
  { code: 'AG', name: 'Argovie', slug: 'argovie', region: 'Nord-Ouest' },
  { code: 'SO', name: 'Soleure', slug: 'soleure', region: 'Nord-Ouest' },
  { code: 'LU', name: 'Lucerne', slug: 'lucerne', region: 'Suisse centrale' },
  { code: 'ZG', name: 'Zoug', slug: 'zoug', region: 'Suisse centrale' },
  { code: 'SZ', name: 'Schwyz', slug: 'schwyz', region: 'Suisse centrale' },
  { code: 'UR', name: 'Uri', slug: 'uri', region: 'Suisse centrale' },
  { code: 'OW', name: 'Obwald', slug: 'obwald', region: 'Suisse centrale' },
  { code: 'NW', name: 'Nidwald', slug: 'nidwald', region: 'Suisse centrale' },
  { code: 'SG', name: 'Saint-Gall', slug: 'saint-gall', region: 'Suisse orientale' },
  { code: 'TG', name: 'Thurgovie', slug: 'thurgovie', region: 'Suisse orientale' },
  { code: 'SH', name: 'Schaffhouse', slug: 'schaffhouse', region: 'Suisse orientale' },
  { code: 'AR', name: 'Appenzell Rhodes-Extérieures', slug: 'appenzell-rhodes-exterieures', region: 'Suisse orientale' },
  { code: 'AI', name: 'Appenzell Rhodes-Intérieures', slug: 'appenzell-rhodes-interieures', region: 'Suisse orientale' },
  { code: 'GL', name: 'Glaris', slug: 'glaris', region: 'Suisse orientale' },
  { code: 'GR', name: 'Grisons', slug: 'grisons', region: 'Suisse orientale / Trilingue' },
  { code: 'TI', name: 'Tessin', slug: 'tessin', region: 'Tessin (Suisse italienne)' }
];
