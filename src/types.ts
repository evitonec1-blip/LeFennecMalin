/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppTab =
  | 'home'
  | 'health-comparator'
  | 'life-comparator'
  | 'about'
  | 'faq'
  | 'legal'
  | 'privacy';

export interface CaisseMaladie {
  id: string;
  name: string;
  rating: number; // Customer satisfaction rating out of 6 (Swiss scale)
  ratingStars: number;
  logo: string; // Shorthand/placeholder or visual symbol
  basePrice: number; // Standard monthly premium at Franchise 300, baseline canton, standard model, Region 1
  isPartner: boolean;
  notes: string;
}

export interface AssureurVie {
  id: string;
  name: string;
  rating: number;
  ratingStars: number;
  logo: string;
  isPartner: boolean;
  supportedTypes: ('3a' | '3b' | 'mixte' | 'deces')[];
  guarantees: string[];
  pros: string[];
}

export interface HealthFilterState {
  canton: string;
  zipCode: string;
  zone: number;
  ageCategory: 'adult' | 'young' | 'child';
  franchise: number;
  model: 'standard' | 'telemed' | 'family' | 'hmo' | 'all';
  selectedModels?: string[];
  accidentCoverage: boolean;
  sortBy: 'price' | 'rating' | 'name';
  supplementaryType?: 'essential' | 'confort' | 'premium' | 'none';
  
  // New comprehensive questions:
  // 1. Informations personnelles
  gender?: 'M' | 'F' | 'none';
  birthDate?: string;
  nationality?: 'swiss' | 'permis-c' | 'permis-b' | 'other';
  
  // 2. Situation actuelle
  hasCurrentInsurer?: boolean;
  currentInsurerId?: string;
  currentPremium?: number;
  yearsWithCurrent?: number;
  terminationOption?: 'june' | 'december' | 'unknown';
  
  // 3. Assurance de base (LAMal)
  householdSize?: 'single' | 'couple' | 'family';
  
  // 4. Assurances complémentaires (LCA)
  hospitalDivision?: 'none' | 'commune' | 'semi-private' | 'private';
  hasAlternativeMedicine?: boolean;
  hasDental?: boolean;
  hasRiskySports?: boolean;
  hasFrequentTravel?: boolean;
  isExpecting?: boolean;
  
  // 5. État de santé (pour complémentaires)
  hasChronicConditions?: boolean;
  hasActiveTreatments?: boolean;
  hasMedicalHistory?: boolean;
  
  // 6. Préférences de service
  servicePreference?: 'online' | 'human' | 'hybrid';
  clientServiceImportance?: 'low' | 'medium' | 'high';
  maxMonthlyBudget?: number;
  
  // 7. Priorités de comparaison
  comparisonPriority?: 'price' | 'coverage' | 'reputation' | 'flexibility';
}

export interface LifeFilterState {
  type: 'all' | '3a' | '3b' | 'deces' | 'mixte' | 'dont-know';
  profile: 'all' | 'young' | 'family' | 'senior' | 'independent';
  priority: 'all' | 'low-premium' | 'high-yield' | 'guaranteed' | 'tax-saving' | 'fees' | 'flexibility' | 'coverage';
  
  // Question 2: Profil Personnel
  birthDate?: string;
  gender?: 'M' | 'F' | 'none';
  canton?: string;
  employmentStatus?: 'salaried' | 'independent' | 'unemployed';
  annualIncome?: number;
  hasSecondPillar?: boolean;

  // Question 3: Type de produit souhaité
  productType?: 'pure-savings' | 'equity-savings' | 'life-insurance' | 'mixed';
  equityPart?: '0%' | '25%' | '50%' | '75%' | '100%';

  // Question 4: Assurance-vie liée : besoins de couverture
  deathCoverageNeeded?: boolean;
  deathCoverageAmount?: number;
  disabilityCoverageNeeded?: 'rente' | 'capital' | 'none';
  disabilityPensionAmount?: number;
  premiumExemptionNeeded?: boolean;
  hasDependents?: boolean;

  // Question 5: Capacité d'épargne
  savingAmount?: number;
  savingFrequency?: 'monthly' | 'yearly';
  commitmentPreference?: 'fixed' | 'flexible' | 'both';

  // Question 6: Profil de risque (titres)
  investmentHorizon?: number; // years
  riskTolerance?: 'prudent' | 'balanced' | 'dynamic' | 'offensive';
  reactionToDrop?: 'sell' | 'hold' | 'buy-more' | 'panic';
  prefersEsg?: boolean;

  // Question 7: Projet de retrait anticipé
  earlyWithdrawalReason?: 'property' | 'independent' | 'leave-switzerland' | 'none';
  earlyWithdrawalHorizon?: 'under-5' | '5-10' | 'over-10' | 'none';

  // Question 8: Situation existante
  hasExistingThirdPillar?: boolean;
  existingInsurer?: string;
  existingAmount?: number;
  transferType?: 'new' | 'transfer';

  // Question 9: Priorités de comparaison
  priorityRank1?: 'fees' | 'yield' | 'flexibility' | 'security' | 'coverage';
  priorityRank2?: 'fees' | 'yield' | 'flexibility' | 'security' | 'coverage';
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  product: string;
}
