/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Canton de Vaud (VD) — Subsidy Rules
 * Source: Office vaudois de l'assurance-maladie (OVAM) — État de Vaud
 * Calculation: Limite de charge de primes à 10% du revenu déterminant (Loi d'application LAMal vaudoise)
 */

import { CantonSubsidyRule, UserProfile, EligibilityStatus, ConfidenceLevel } from '../types';

export const vaudSubsidyRule: CantonSubsidyRule = {
  canton: 'VD',
  cantonName: 'Vaud',
  cantonSlug: 'vaud',
  agencyName: "Office vaudois de l'assurance-maladie (OVAM Vaud)",
  portalUrl: 'https://www.vd.ch/themes/sante-soins-et-handicap/assurance-maladie/subside-a-lassurance-maladie',
  deadline: '31 décembre 2026 (calcul d’office lors de la taxation ou demande ordinaire)',
  calculationBasis: 'rdu',
  calculationBasisLabel: 'Plafonnement des primes à 10% du Revenu Déterminant Vaudois',
  summary:
    'Dans le canton de Vaud, le mécanisme cantonal vise à ce que la prime d’assurance maladie ne dépasse pas 10% du revenu déterminant unifié du ménage. Les enfants et jeunes adultes en formation bénéficient d’une protection renforcée.',
  officialIncomeCeilings: {
    single: 'Revenu déterminant inférieur à env. CHF 54’000 / an (barème progressif)',
    couple: 'Revenu déterminant inférieur à env. CHF 72’000 / an',
    familyWithOneChild: 'Revenu déterminant inférieur à env. CHF 84’000 / an',
    childBonus: '+ env. CHF 12’000 de déduction par enfant ou jeune adulte en formation',
    studentSpecific: 'Jeunes adultes (18-25 ans) en formation : prime prise en charge jusqu’à 100% selon le RDU familial',
  },
  evaluate: (profile: UserProfile) => {
    const reasons: string[] = [];
    const matchedCriteria: string[] = [];

    let approxIncome = 0;
    switch (profile.incomeBracket) {
      case 'less_20k':
        approxIncome = 18000;
        break;
      case '20k_30k':
        approxIncome = 25000;
        break;
      case '30k_40k':
        approxIncome = 35000;
        break;
      case '40k_50k':
        approxIncome = 45000;
        break;
      case '50k_60k':
        approxIncome = 55000;
        break;
      case '60k_80k':
        approxIncome = 70000;
        break;
      case '80k_100k':
        approxIncome = 90000;
        break;
      case 'more_100k':
        approxIncome = 115000;
        break;
    }
    if (profile.exactIncome && profile.exactIncome > 0) {
      approxIncome = profile.exactIncome;
    }

    const isSingle = profile.householdType === 'single' || profile.householdType === 'student' || profile.householdType === 'apprentice';
    const isCouple = profile.adultsCount >= 2 || profile.householdType === 'couple' || profile.householdType === 'family';

    let maxThresholdFull = 36000;
    let maxThresholdPartial = 54000;

    if (isCouple) {
      maxThresholdFull = 52000;
      maxThresholdPartial = 74000;
    }

    const totalKids = profile.childrenCount + profile.youngAdultsInTrainingCount;
    maxThresholdFull += totalKids * 9000;
    maxThresholdPartial += totalKids * 12000;

    if (profile.trainingStatus === 'student' || profile.trainingStatus === 'apprentice') {
      maxThresholdPartial += 6000;
      matchedCriteria.push('Statut étudiant / apprenti pris en compte avec déduction pour formation dans le canton de Vaud.');
    }

    let status: EligibilityStatus = 'not_eligible';
    let confidence: ConfidenceLevel = 'high';
    let minAmt = 0;
    let maxAmt = 0;

    if (approxIncome <= maxThresholdFull) {
      status = 'likely_eligible';
      confidence = 'high';
      minAmt = isSingle ? 220 : 420;
      maxAmt = isSingle ? 500 : 1050;
      matchedCriteria.push(`Revenu déterminant estimé (~CHF ${approxIncome.toLocaleString('fr-CH')}) sous le seuil d'intervention forte de l'OVAM.`);
      reasons.push("Votre ménage est hautement prioritaire selon le mécanisme vaudois de plafonnement à 10% du revenu.");
    } else if (approxIncome <= maxThresholdPartial) {
      status = 'likely_eligible';
      confidence = 'medium';
      minAmt = isSingle ? 100 : 180;
      maxAmt = isSingle ? 280 : 500;
      matchedCriteria.push(`Revenu déterminant estimé sous le barème d'éligibilité vaudois (CHF ${maxThresholdPartial.toLocaleString('fr-CH')}).`);
      reasons.push("Vous pourriez bénéficier d'un subside dégressif pour compenser le coût de la prime de référence vaudoise.");
    } else {
      status = 'not_eligible';
      confidence = 'high';
      reasons.push(`Le revenu estimé (~CHF ${approxIncome.toLocaleString('fr-CH')}) dépasse le plafond de subventionnement vaudois pour votre taille de ménage (env. CHF ${maxThresholdPartial.toLocaleString('fr-CH')}).`);
    }

    return {
      status,
      confidence,
      estimatedMonthlyMin: minAmt,
      estimatedMonthlyMax: maxAmt,
      reasons,
      matchedCriteria,
    };
  },
  steps: [
    {
      title: "1. Contrôle de la taxation fiscale vaudoise",
      desc: "L'OVAM traite automatiquement les données fiscales. Si votre situation a changé en 2026, déposez une demande de réévaluation.",
    },
    {
      title: "2. Formulaire en ligne OVAM",
      desc: "Utilisez le portail officiel de l'État de Vaud pour soumettre vos pièces justificatives.",
    },
    {
      title: "3. Déduction de la prime",
      desc: "L'OVAM verse la participation directement à votre assureur-maladie agréé.",
    },
  ],
  requiredDocs: [
    "Police d'assurance maladie LAMal 2026",
    "Dernier avis de taxation fiscale cantonale vaudoise",
    "Justificatifs de revenus récents (3 dernières fiches de paie ou indemnités chômage)",
    "Attestation de formation pour les jeunes adultes (18-25 ans)",
  ],
  sourceUrl: 'https://www.vd.ch/themes/sante-soins-et-handicap/assurance-maladie/subside-a-lassurance-maladie',
  lastUpdated: 'Août 2026 (Barèmes et décrets officiels du Grand Conseil Vaudois)',
};
