/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CaisseMaladie, AssureurVie, Testimonial } from './types';

export const SWISS_CANTONS = [
  { code: 'GE', name: 'Genève' },
  { code: 'VD', name: 'Vaud' },
  { code: 'VS', name: 'Valais' },
  { code: 'NE', name: 'Neuchâtel' },
  { code: 'FR', name: 'Fribourg' },
  { code: 'JU', name: 'Jura' },
  { code: 'BE', name: 'Berne' },
  { code: 'ZH', name: 'Zurich' },
  { code: 'BS', name: 'Bâle-Ville' },
  { code: 'TI', name: 'Tessin' },
];

export const FRANCHISES = [300, 500, 1000, 1500, 2000, 2500];

export const CAISSES_MALADIE: CaisseMaladie[] = [
  { id: 'assura', name: 'Assura', rating: 4.1, ratingStars: 4, logo: 'AS', basePrice: 320, isPartner: true, notes: 'Modèles Telmed très compétitifs' },
  { id: 'css', name: 'CSS Assurance', rating: 4.7, ratingStars: 5, logo: 'CSS', basePrice: 375, isPartner: true, notes: 'Leader en Suisse, excellent service client' },
  { id: 'helsana', name: 'Helsana', rating: 4.6, ratingStars: 5, logo: 'HL', basePrice: 380, isPartner: true, notes: 'Grand réseau de soins partenaires' },
  { id: 'swica', name: 'Swica', rating: 4.8, ratingStars: 5, logo: 'SW', basePrice: 395, isPartner: false, notes: 'Élue meilleure satisfaction client' },
  { id: 'visana', name: 'Visana', rating: 4.5, ratingStars: 4, logo: 'VS', basePrice: 370, isPartner: false, notes: 'Remises de fidélité attractives sur les complémentaires' },
  { id: 'sanitas', name: 'Sanitas', rating: 4.6, ratingStars: 5, logo: 'SN', basePrice: 368, isPartner: true, notes: 'Excellente application mobile de remboursement' },
  { id: 'concordia', name: 'Concordia', rating: 4.7, ratingStars: 5, logo: 'CC', basePrice: 372, isPartner: false, notes: 'Soutien familial fort et bonus' },
  { id: 'kpt', name: 'KPT / CPT', rating: 4.5, ratingStars: 4, logo: 'KPT', basePrice: 355, isPartner: true, notes: 'Caisse en ligne moderne et rapide' },
  { id: 'mutuel', name: 'Groupe Mutuel', rating: 4.3, ratingStars: 4, logo: 'GM', basePrice: 362, isPartner: true, notes: 'Acteur majeur en Suisse Romande' },
  { id: 'okk', name: 'ÖKK', rating: 4.4, ratingStars: 4, logo: 'OKK', basePrice: 365, isPartner: false, notes: 'Couvertures de sport et prévention étendues' },
  { id: 'sympany', name: 'Sympany', rating: 4.4, ratingStars: 4, logo: 'SY', basePrice: 360, isPartner: false, notes: 'Remboursements clairs et équitables' },
  { id: 'atupri', name: 'Atupri', rating: 4.3, ratingStars: 4, logo: 'AT', basePrice: 358, isPartner: false, notes: 'Modèles de prévention numérique innovants' },
];

export const ASSUREURS_VIE: AssureurVie[] = [
  {
    id: 'swisslife',
    name: 'Swiss Life',
    rating: 4.7,
    ratingStars: 5,
    logo: 'SL',
    isPartner: true,
    supportedTypes: ['3a', '3b', 'mixte'],
    guarantees: ['Capital Garanti', 'Exonération de prime', 'Options de versement flexibles'],
    pros: ['Leader suisse de la prévoyance', 'Rendements stables historiquement', 'Sécurité maximale du capital'],
  },
  {
    id: 'axa',
    name: 'AXA Prévoyance',
    rating: 4.6,
    ratingStars: 5,
    logo: 'AXA',
    isPartner: true,
    supportedTypes: ['3a', '3b', 'deces'],
    guarantees: ['Rente invalidité', 'Protection en cas de décès', 'Fonds durables certifiés'],
    pros: ['Solutions modulables pour les familles', 'Conseillers de proximité dans toute la Suisse', 'Très bonne flexibilité fiscale'],
  },
  {
    id: 'zurich',
    name: 'Zurich Assurance',
    rating: 4.5,
    ratingStars: 4,
    logo: 'ZH',
    isPartner: true,
    supportedTypes: ['3a', '3b', 'mixte', 'deces'],
    guarantees: ['Rendement axé sur les fonds', 'Garantie de capital au choix', 'Rente de conjoint'],
    pros: ['Fonds d\'investissement de premier plan', 'Options de durabilité ESG de haut niveau', 'Service d\'assistance prévoyance performant'],
  },
  {
    id: 'helvetia',
    name: 'Helvetia',
    rating: 4.4,
    ratingStars: 4,
    logo: 'HE',
    isPartner: false,
    supportedTypes: ['3a', '3b', 'mixte'],
    guarantees: ['Taux d\'intérêt garanti', 'Option de rachat flexible', 'Prévoyance liée et libre'],
    pros: ['Parfait pour les indépendants', 'Combinaison avec assurance habitation facilitée', 'Structure solide et centenaire'],
  },
  {
    id: 'allianz',
    name: 'Allianz Suisse',
    rating: 4.4,
    ratingStars: 4,
    logo: 'AZ',
    isPartner: true,
    supportedTypes: ['3a', '3b', 'deces'],
    guarantees: ['Rente de survivant', 'Capital décès sur-mesure', 'Bonus de fidélité de rendement'],
    pros: ['Idéal pour les jeunes actifs', 'Processus de souscription simplifié', 'Présence mondiale et solidité financière'],
  },
  {
    id: 'generali',
    name: 'Generali Suisse',
    rating: 4.2,
    ratingStars: 4,
    logo: 'GE',
    isPartner: false,
    supportedTypes: ['3a', '3b', 'mixte'],
    guarantees: ['Fonds thématiques performants', 'Couverture d\'incapacité de gain', 'Garanties par palier'],
    pros: ['Primes mensuelles très compétitives', 'Excellent configurateur d\'épargne en ligne', 'Large choix de profils de risque'],
  },
  {
    id: 'mobiliere',
    name: 'La Mobilière',
    rating: 4.8,
    ratingStars: 5,
    logo: 'MOB',
    isPartner: false,
    supportedTypes: ['3a', '3b', 'deces'],
    guarantees: ['Participation aux coopératives / bénéfices', 'Prévoyance décès famille', 'Soutien aux orphelins'],
    pros: ['Remboursement de bénéfices en espèces', 'Élue caisse la plus sympathique de Suisse', 'Idéal pour les couples mariés avec enfants'],
  },
  {
    id: 'baloise',
    name: 'Baloise Assurances',
    rating: 4.3,
    ratingStars: 4,
    logo: 'BAL',
    isPartner: true,
    supportedTypes: ['3a', '3b', 'mixte', 'deces'],
    guarantees: ['Garantie d\'épargne progressive', 'Couverture décès simplifiée', 'Fonds sécurisés'],
    pros: ['Solutions de prévoyance immobilière uniques', 'Combinaison de placements novatrice', 'Excellent service sinistre/invalidité'],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Marc-Antoine B.',
    location: 'Lausanne (VD)',
    rating: 5,
    date: 'Juin 2026',
    text: 'Grâce aux conseils avisés de Feny, j\'ai ajusté ma franchise à CHF 2\'500 et choisi un modèle médecin de famille chez un assureur partenaire. Économie nette : CHF 180 par mois !',
    product: 'Assurance Maladie',
  },
  {
    id: 't2',
    name: 'Sarah M.',
    location: 'Genève (GE)',
    rating: 5,
    date: 'Mai 2026',
    text: 'Le comparateur de 3e pilier m\'a permis de comprendre enfin la différence entre 3a et 3b. La souscription a été simple, rapide et sans frais d\'intermédiaire cachés. Très satisfaite.',
    product: 'Prévoyance 3ème Pilier',
  },
  {
    id: 't3',
    name: 'Jean-Daniel K.',
    location: 'Sierre (VS)',
    rating: 5,
    date: 'Avril 2026',
    text: 'Malin, gratuit et transparent ! Feny a trié les caisses maladie de mon canton en quelques secondes. Les prestations obligatoires étant identiques, j\'ai pris la moins chère sans aucune hésitation.',
    product: 'Assurance Maladie',
  },
];

/**
 * Simulates a Swiss health insurance monthly premium based on parameters.
 * Formulas match Swiss standards:
 * - Base price is scaled by canton factor.
 * - Age Category: Young adult gets ~20% discount, Child gets ~70% discount.
 * - Franchise: 300 (base rate + CHF 110), 500 (base + 95), 1000 (base + 70), 1500 (base + 45), 2000 (base + 20), 2500 (base rate - CHF 10).
 * - Model: Standard (1.0x), Telmed (0.85x), Family Doctor (0.9x), HMO (0.88x).
 * - Accident coverage: sans accident (0.93x), avec accident (1.0x).
 */
export function calculateHealthPremium(
  caisse: CaisseMaladie,
  canton: string,
  ageCategory: 'adult' | 'young' | 'child',
  franchise: number,
  model: 'standard' | 'telemed' | 'family' | 'hmo',
  accidentCoverage: boolean
): number {
  // 1. Canton Multiplier
  let cantonMultiplier = 1.0;
  switch (canton) {
    case 'GE': cantonMultiplier = 1.28; break;
    case 'VD': cantonMultiplier = 1.22; break;
    case 'BS': cantonMultiplier = 1.34; break;
    case 'NE': cantonMultiplier = 1.18; break;
    case 'BE': cantonMultiplier = 1.08; break;
    case 'ZH': cantonMultiplier = 1.12; break;
    case 'FR': cantonMultiplier = 1.02; break;
    case 'JU': cantonMultiplier = 0.98; break;
    case 'VS': cantonMultiplier = 0.88; break;
    case 'TI': cantonMultiplier = 1.15; break;
    default: cantonMultiplier = 1.0;
  }

  let premium = caisse.basePrice * cantonMultiplier;

  // 2. Age Category Multiplier & Base adjustment
  if (ageCategory === 'young') {
    premium = premium * 0.82; // 18% discount
  } else if (ageCategory === 'child') {
    premium = premium * 0.28; // 72% discount for children
  }

  // 3. Franchise Adjustment (relative to reference franchise 2500)
  // For adults/young adults, franchise 300 costs more. For children, franchises are different but we simplify.
  let franchiseAdjustment = 0;
  if (ageCategory === 'child') {
    // For children, standard franchise is 0, but if franchise > 0 they get small discount
    franchiseAdjustment = franchise > 0 ? -15 : 0;
  } else {
    // Ref: 2500 is base
    switch (franchise) {
      case 300: franchiseAdjustment = 115; break;
      case 500: franchiseAdjustment = 98; break;
      case 1000: franchiseAdjustment = 72; break;
      case 1500: franchiseAdjustment = 46; break;
      case 2000: franchiseAdjustment = 22; break;
      case 2500: franchiseAdjustment = -10; break;
      default: franchiseAdjustment = 0;
    }
  }
  premium += franchiseAdjustment;

  // 4. Model Factor
  let modelFactor = 1.0;
  switch (model) {
    case 'telemed': modelFactor = 0.85; break;
    case 'family': modelFactor = 0.90; break;
    case 'hmo': modelFactor = 0.88; break;
    default: modelFactor = 1.0;
  }
  premium = premium * modelFactor;

  // 5. Accident Coverage (default is true = avec accident. False = sans accident)
  if (!accidentCoverage) {
    premium = premium * 0.93; // 7% discount
  }

  // Return rounded to 1 decimal place (Swiss style, often rounded to 5 centimes but decimal is fine)
  return Math.round(premium * 10) / 10;
}

/**
 * Estimates monthly life insurance / 3rd pillar savings returns.
 * In Switzerland, the maximum pillar 3a amount is capped.
 * For 2025/2026:
 * - With LPP (salaried): CHF 7'258 / year (approx CHF 604.8 / month)
 * - Without LPP (independent): 20% of income, max CHF 36'288 / year.
 */
export function getLifeInsuranceEstimate(
  assureur: AssureurVie,
  type: string,
  monthlyInvestment: number,
  durationYears: number,
  priority: string
): {
  guaranteedSum: number;
  expectedSum: number;
  taxSavingsPerYear: number;
} {
  const annualInvestment = monthlyInvestment * 12;
  const totalInvestment = annualInvestment * durationYears;

  // Assume basic tax rate of 22% in Switzerland for deductions on pillar 3a
  const isEligibleForTaxDeduction = type === '3a';
  const taxSavingsPerYear = isEligibleForTaxDeduction ? Math.round(annualInvestment * 0.22) : 0;

  // Calculations for projection:
  // Guaranteed yields: SwissLife, Mobiliere, Helvetia have higher guaranteed rates.
  let guaranteedRate = 0.005; // 0.5%
  if (['swisslife', 'helvetia', 'mobiliere'].includes(assureur.id)) {
    guaranteedRate = 0.0085; // 0.85% guaranteed
  }

  // Expected returns depend on priority:
  // - high-yield: focus on funds (e.g. Zurich, AXA, Generali, Baloise) -> ~3.5%
  // - guaranteed: focus on cash security -> ~1.2%
  // - others: ~2.4%
  let expectedRate = 0.024;
  if (priority === 'high-yield') {
    expectedRate = 0.038;
  } else if (priority === 'guaranteed') {
    expectedRate = 0.012;
  }

  // Compound interest calculation
  let guaranteedSum = 0;
  let expectedSum = 0;

  for (let t = 1; t <= durationYears; t++) {
    guaranteedSum = (guaranteedSum + annualInvestment) * (1 + guaranteedRate);
    expectedSum = (expectedSum + annualInvestment) * (1 + expectedRate);
  }

  return {
    guaranteedSum: Math.round(guaranteedSum),
    expectedSum: Math.round(expectedSum),
    taxSavingsPerYear,
  };
}
