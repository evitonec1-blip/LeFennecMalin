/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Central Registry of all 26 Swiss Cantons Subsidy Rules
 */

import { CantonCode, CantonSubsidyRule } from '../types';
import { genevaSubsidyRule } from './geneve';
import { vaudSubsidyRule } from './vaud';
import {
  valaisSubsidyRule,
  fribourgSubsidyRule,
  neuchatelSubsidyRule,
  juraSubsidyRule,
  berneSubsidyRule,
  zurichSubsidyRule,
  baselStadtSubsidyRule,
} from './cantonsRules';
import { remainingCantonsRules } from './allOtherCantons';

export const ALL_CANTON_SUBSIDY_RULES: Record<CantonCode, CantonSubsidyRule> = {
  GE: genevaSubsidyRule,
  VD: vaudSubsidyRule,
  VS: valaisSubsidyRule,
  FR: fribourgSubsidyRule,
  NE: neuchatelSubsidyRule,
  JU: juraSubsidyRule,
  BE: berneSubsidyRule,
  ZH: zurichSubsidyRule,
  BS: baselStadtSubsidyRule,
  BL: remainingCantonsRules['BL'],
  AG: remainingCantonsRules['AG'],
  TI: remainingCantonsRules['TI'],
  SG: remainingCantonsRules['SG'],
  TG: remainingCantonsRules['TG'],
  LU: remainingCantonsRules['LU'],
  ZG: remainingCantonsRules['ZG'],
  SO: remainingCantonsRules['SO'],
  SH: remainingCantonsRules['SH'],
  AR: remainingCantonsRules['AR'],
  AI: remainingCantonsRules['AI'],
  GR: remainingCantonsRules['GR'],
  GL: remainingCantonsRules['GL'],
  NW: remainingCantonsRules['NW'],
  OW: remainingCantonsRules['OW'],
  UR: remainingCantonsRules['UR'],
  SZ: remainingCantonsRules['SZ'],
};

export function getCantonSubsidyRule(code: string): CantonSubsidyRule {
  const upper = (code || 'GE').toUpperCase() as CantonCode;
  return ALL_CANTON_SUBSIDY_RULES[upper] || genevaSubsidyRule;
}
