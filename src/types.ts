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
  | 'privacy'
  | 'article-45-lsa'
  | 'qualifications-intermediaire'
  | 'methodologie'
  | 'comment-fonctionne-le-comparateur'
  | 'seo-maladie'
  | 'seo-pilier'
  | 'seo-comparateur'
  // Cantons (26 cantons)
  | 'canton-geneve'
  | 'canton-vaud'
  | 'canton-valais'
  | 'canton-fribourg'
  | 'canton-neuchatel'
  | 'canton-jura'
  | 'canton-berne'
  | 'canton-zurich'
  | 'canton-bale-ville'
  | 'canton-bale-campagne'
  | 'canton-argovie'
  | 'canton-tessin'
  | 'canton-saint-gall'
  | 'canton-thurgovie'
  | 'canton-lucerne'
  | 'canton-zoug'
  | 'canton-soleure'
  | 'canton-schaffhouse'
  | 'canton-appenzell-ar'
  | 'canton-appenzell-ai'
  | 'canton-appenzell-rhodes-exterieures'
  | 'canton-appenzell-rhodes-interieures'
  | 'canton-grisons'
  | 'canton-glaris'
  | 'canton-nidwald'
  | 'canton-obwald'
  | 'canton-uri'
  | 'canton-schwyz'
  // Insurers Profiles
  | 'hub-insurers'
  | 'insurer-css'
  | 'insurer-helsana'
  | 'insurer-swica'
  | 'insurer-sanitas'
  | 'insurer-groupe-mutuel'
  | 'insurer-assura'
  | 'insurer-concordia'
  | 'insurer-visana'
  | 'insurer-kpt'
  | 'insurer-atupri'
  | 'insurer-sympany'
  | 'insurer-oekk'
  | 'insurer-egk'
  | 'insurer-aquilana'
  // Insurer Comparisons
  | 'compare-css-helsana'
  | 'compare-helsana-swica'
  | 'compare-css-swica'
  | 'compare-assura-mutuel'
  | 'compare-swica-sanitas'
  | 'compare-visana-concordia'
  // Semantic Topic Clusters (Master Architecture)
  | 'hub-lamal'
  | 'lamal-franchise'
  | 'lamal-modeles'
  | 'lamal-moins-chere'
  | 'meilleure-caisse-maladie'
  | 'lamal-changer-caisse'
  | 'assurance-famille'
  | 'lamal-famille'
  | 'assurance-jeune-adulte'
  | 'lamal-jeunes-adultes'
  | 'assurance-etudiant'
  | 'lamal-etudiant'
  | 'lamal-nouveau-resident'
  | 'lamal-nouveaux-arrivants'
  | 'lamal-vs-lca'
  | 'lamal-assurance-accident'
  // Guides & Hubs
  | 'guide-franchises'
  | 'guide-franchise-300-vs-2500'
  | 'guide-modeles-assurance'
  | 'guide-modele-telmed'
  | 'guide-modele-hmo'
  | 'guide-modele-medecin-famille'
  | 'guide-subside-assurance-maladie'
  | 'guide-changer-caisse-maladie'
  | 'guide-resiliation-assurance-maladie'
  | 'guide-assurance-complementaire-lca'
  | 'guide-assurance-dentaire'
  | 'guide-assurance-hospitalisation'
  | 'guide-3eme-pilier-3a-vs-3b'
  | 'guide-3eme-pilier-fiscalite'
  | 'guide-3eme-pilier-retrait'
  | 'guide-frontalier-assurance-maladie'
  | 'guide-assurance-maladie-famille-enfant'
  | 'guide-assurance-maladie-jeune-etudiant'
  // Interactive Tools / Calculators
  | 'tool-calculateur-franchise'
  | 'tool-calculateur-impot-3a'
  | 'tool-simulateur-frontalier'
  // Categories
  | 'category-assurance-auto'
  | 'category-assurance-menage'
  | 'category-assurance-rc'
  | 'category-assurance-vie'
  | 'category-assurance-voyage'
  | 'category-protection-juridique'
  | 'category-assurance-animaux';

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
  productCategory: 'health' | 'life';
}
