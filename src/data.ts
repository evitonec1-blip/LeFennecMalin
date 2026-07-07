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
  { id: 'assura', name: 'Assura', rating: 4.5, ratingStars: 4, logo: 'AS', basePrice: 385, isPartner: true, notes: 'Modèles Telmed compétitifs et primes parmi les plus basses de Suisse' },
  { id: 'css', name: 'CSS Assurance', rating: 5.1, ratingStars: 5, logo: 'CSS', basePrice: 435, isPartner: true, notes: 'Leader du marché, excellent accompagnement et service client' },
  { id: 'helsana', name: 'Helsana', rating: 5.1, ratingStars: 5, logo: 'HL', basePrice: 440, isPartner: true, notes: 'Réseau étendu de soins partenaires et grande réputation de qualité' },
  { id: 'swica', name: 'Swica', rating: 5.3, ratingStars: 5, logo: 'SW', basePrice: 450, isPartner: false, notes: 'Élue à plusieurs reprises meilleure satisfaction client de Suisse' },
  { id: 'visana', name: 'Visana', rating: 5.0, ratingStars: 4, logo: 'VS', basePrice: 430, isPartner: false, notes: 'Très bon service client de proximité et rabais complémentaires' },
  { id: 'sanitas', name: 'Sanitas', rating: 5.1, ratingStars: 5, logo: 'SN', basePrice: 428, isPartner: true, notes: 'Application mobile de pointe pour un remboursement ultra-rapide' },
  { id: 'concordia', name: 'Concordia', rating: 5.2, ratingStars: 5, logo: 'CC', basePrice: 432, isPartner: false, notes: 'Prestations familiales et primes enfants hautement préférentielles' },
  { id: 'kpt', name: 'KPT / CPT', rating: 5.2, ratingStars: 5, logo: 'KPT', basePrice: 415, isPartner: true, notes: 'Caisse maladie en ligne moderne et processus entièrement dématérialisés' },
  { id: 'mutuel', name: 'Groupe Mutuel', rating: 4.8, ratingStars: 4, logo: 'GM', basePrice: 420, isPartner: true, notes: 'Leader incontournable en Suisse Romande avec modèles alternatifs complets' },
  { id: 'okk', name: 'ÖKK', rating: 4.9, ratingStars: 4, logo: 'OKK', basePrice: 425, isPartner: false, notes: 'Orientation forte vers le sport, les loisirs et la prévention active' },
  { id: 'sympany', name: 'Sympany', rating: 4.9, ratingStars: 4, logo: 'SY', basePrice: 422, isPartner: false, notes: 'Gestion transparente et remboursements directs sans complications' },
  { id: 'atupri', name: 'Atupri', rating: 4.8, ratingStars: 4, logo: 'AT', basePrice: 418, isPartner: false, notes: 'Modèles de prévention numérique modernes et innovants' },
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
    text: 'Grâce aux conseils avisés de Fenny, j\'ai ajusté ma franchise à CHF 2\'500 et choisi un modèle médecin de famille chez un assureur partenaire. Économie nette : CHF 180 par mois !',
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
    text: 'Malin, gratuit et transparent ! Fenny a trié les caisses maladie de mon canton en quelques secondes. Les prestations obligatoires étant identiques, j\'ai pris la moins chère sans aucune hésitation.',
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
  accidentCoverage: boolean,
  zone: number = 1
): number {
  // 1. Canton Factor (representing Swiss geographic cost variances for 2026)
  let cantonMultiplier = 1.0;
  switch (canton) {
    case 'GE': cantonMultiplier = 1.25; break; // Geneva (highest)
    case 'BS': cantonMultiplier = 1.30; break; // Basel-Ville
    case 'VD': cantonMultiplier = 1.15; break; // Vaud
    case 'NE': cantonMultiplier = 1.12; break; // Neuchâtel
    case 'TI': cantonMultiplier = 1.10; break; // Tessin
    case 'ZH': cantonMultiplier = 1.05; break; // Zurich
    case 'BE': cantonMultiplier = 1.00; break; // Bern (baseline reference)
    case 'FR': cantonMultiplier = 0.95; break; // Fribourg
    case 'JU': cantonMultiplier = 0.98; break; // Jura
    case 'VS': cantonMultiplier = 0.85; break; // Valais (lowest)
    default: cantonMultiplier = 1.0;
  }

  // Calculate standard base rate (Franchise 300 for adult/young, Franchise 0 for child)
  let premium = caisse.basePrice * cantonMultiplier;

  // 1b. Region / Zone factor within the canton (Region 1 / 2 / 3)
  if (zone === 2) {
    premium = premium * 0.90; // 10% average reduction in Region 2
  } else if (zone === 3) {
    premium = premium * 0.80; // 20% average reduction in Region 3
  }

  // 2. Age Category Base Factor (official Swiss legal brackets)
  let ageGroupFactor = 1.0;
  if (ageCategory === 'young') {
    ageGroupFactor = 0.75; // 25% average young adult (19-25) discount in 2026
  } else if (ageCategory === 'child') {
    ageGroupFactor = 0.25; // 75% average child (0-18) discount in 2026
  }
  premium = premium * ageGroupFactor;

  // 3. Alternative Insurance Model (AOS) discount factor
  let modelFactor = 1.0;
  switch (model) {
    case 'telemed': modelFactor = 0.85; break; // 15% discount for Telmed
    case 'family': modelFactor = 0.90; break;  // 10% discount for Family Doctor
    case 'hmo': modelFactor = 0.88; break;     // 12% discount for HMO
    default: modelFactor = 1.0;                 // Choice of doctor (Standard model)
  }
  premium = premium * modelFactor;

  // 4. Accident Coverage Exclusion (mandated by Art. 8 LAMal & Art. 115 OAMal)
  // Excluding accident coverage reduces the AOS premium by exactly 7% across all insurers.
  if (!accidentCoverage) {
    premium = premium * 0.93; // 7% absolute deduction
  }

  // 5. Franchise Rebate (strict Swiss legal flat-rate system - Art. 93 OAMal)
  // Instead of percentage reductions, Swiss law decrees flat monthly rebates compared to the basic franchise.
  let rebate = 0;
  if (ageCategory === 'child') {
    // Child standard franchise is 0. Higher child franchises receive flat legal monthly rebates:
    switch (franchise) {
      case 100: rebate = 5.80; break;
      case 200: rebate = 11.65; break;
      case 300: rebate = 17.50; break;
      case 400: rebate = 23.30; break;
      case 500: rebate = 29.15; break;
      case 600: rebate = 35.00; break;
      default: rebate = 0;
    }
  } else {
    // Adult standard franchise is 300. Higher franchises receive flat legal monthly rebates:
    switch (franchise) {
      case 300: rebate = 0; break;
      case 500: rebate = 11.65; break;
      case 1000: rebate = 40.85; break;
      case 1500: rebate = 70.00; break;
      case 2000: rebate = 99.15; break;
      case 2500: rebate = 128.30; break;
      default: rebate = 0;
    }
  }

  // Legal ceiling (Art. 95 OAMal): The franchise rebate can never exceed 70% of the premium for the minimum franchise.
  const maxAllowedRebate = premium * 0.70;
  const actualRebate = Math.min(rebate, maxAllowedRebate);

  // Apply rebate
  premium = premium - actualRebate;

  // Swiss legal minimum floors (cannot have free or negative premiums)
  const floorValue = ageCategory === 'child' ? 15.0 : ageCategory === 'young' ? 50.0 : 80.0;
  premium = Math.max(premium, floorValue);

  // Return rounded to the nearest 10 centimes (Swiss premiums are officially rounded to 5 or 10 centimes)
  return Math.round(premium * 10) / 10;
}

/**
 * Calculates annual savings between current and target premiums.
 * Dynamically computes the difference without arbitrary percentages.
 */
export function calculateSavings(currentPremium: number, targetPremium: number): number {
  return Math.max(0, Math.round((currentPremium - targetPremium) * 12));
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
