/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Swiss Health Insurance Subsidy Types & Models (RIP / IPV / Subsides)
 */

export type CantonCode =
  | 'GE' | 'VD' | 'VS' | 'FR' | 'NE' | 'JU'
  | 'BE' | 'ZH' | 'BS' | 'BL' | 'AG' | 'TI'
  | 'SG' | 'TG' | 'LU' | 'ZG' | 'SO' | 'SH'
  | 'AR' | 'AI' | 'GR' | 'GL' | 'NW' | 'OW'
  | 'UR' | 'SZ';

export type HouseholdType =
  | 'single'
  | 'couple'
  | 'family'
  | 'single_parent'
  | 'student'
  | 'apprentice'
  | 'retired'
  | 'other';

export type TrainingStatus =
  | 'none'
  | 'student'
  | 'apprentice'
  | 'young_in_training';

export type ResidenceStatus =
  | 'resident'
  | 'frontalier_lamal'
  | 'other';

export type IncomeBracket =
  | 'less_20k'
  | '20k_30k'
  | '30k_40k'
  | '40k_50k'
  | '50k_60k'
  | '60k_80k'
  | '80k_100k'
  | 'more_100k';

export interface UserProfile {
  canton: CantonCode;
  householdType: HouseholdType;
  adultsCount: number;
  childrenCount: number;
  youngAdultsInTrainingCount: number;
  incomeBracket: IncomeBracket;
  exactIncome?: number;
  trainingStatus: TrainingStatus;
  residenceStatus: ResidenceStatus;
  userAge?: number;
}

export type EligibilityStatus =
  | 'likely_eligible'
  | 'not_eligible'
  | 'check_with_authority'
  | 'incomplete_data';

export type ConfidenceLevel = 'high' | 'medium' | 'indicative';

export interface SubsidyEstimate {
  status: EligibilityStatus;
  confidence: ConfidenceLevel;
  headline: string;
  subheadline: string;
  estimatedMonthlyAmount?: {
    min: number;
    max: number;
    label: string;
  };
  reasons: string[];
  matchedCriteria: string[];
  cantonInfo: {
    name: string;
    code: CantonCode;
    agencyName: string;
    portalUrl: string;
    deadline: string;
    calculationBasis: string;
  };
  stepsToApply: {
    title: string;
    desc: string;
  }[];
  requiredDocuments: string[];
  alternativeSavingsHint?: string;
  sourceUrl: string;
  lastUpdated: string;
  disclaimer: string;
}

export interface CantonSubsidyRule {
  canton: CantonCode;
  cantonName: string;
  cantonSlug: string;
  agencyName: string;
  portalUrl: string;
  deadline: string;
  calculationBasis: 'rdu' | 'taxable_income' | 'taxable_income_and_wealth' | 'progressive_scale';
  calculationBasisLabel: string;
  summary: string;
  officialIncomeCeilings: {
    single: string;
    couple: string;
    familyWithOneChild: string;
    childBonus: string;
    studentSpecific?: string;
  };
  evaluate: (profile: UserProfile) => {
    status: EligibilityStatus;
    confidence: ConfidenceLevel;
    estimatedMonthlyMin?: number;
    estimatedMonthlyMax?: number;
    reasons: string[];
    matchedCriteria: string[];
  };
  steps: {
    title: string;
    desc: string;
  }[];
  requiredDocs: string[];
  sourceUrl: string;
  lastUpdated: string;
}
