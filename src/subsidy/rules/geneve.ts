/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Canton of Geneva (GE) — Subsidy Rules
 * Source: Service de l'assurance-maladie (SAM) — République et Canton de Genève
 * Calculation: Revenu Déterminant Unifié (RDU)
 */

import { CantonSubsidyRule, UserProfile, EligibilityStatus, ConfidenceLevel } from '../types';

export const genevaSubsidyRule: CantonSubsidyRule = {
  canton: 'GE',
  cantonName: 'Genève',
  cantonSlug: 'geneve',
  agencyName: "Service de l'assurance-maladie (SAM Genève)",
  portalUrl: 'https://www.ge.ch/demander-subsides-assurance-maladie',
  deadline: '30 novembre 2026 (pour effet rétroactif au 1er janvier 2026)',
  calculationBasis: 'rdu',
  calculationBasisLabel: 'Revenu Déterminant Unifié (RDU)',
  summary:
    'À Genève, le subside est accordé selon le Revenu Déterminant Unifié (RDU). Il prend en charge de 10% à 100% de la prime de référence cantonale fixée par le Conseil d’État.',
  officialIncomeCeilings: {
    single: 'RDU inférieur à env. CHF 39’000 / an (subside partiel jusqu’à ~CHF 48’000)',
    couple: 'RDU inférieur à env. CHF 56’000 / an (subside partiel jusqu’à ~CHF 68’000)',
    familyWithOneChild: 'RDU inférieur à env. CHF 68’000 / an',
    childBonus: '+ env. CHF 10’000 de déduction forfaitaire par enfant à charge supplémentaire',
    studentSpecific: 'Tarif jeune en formation bonifié avec barème RDU adapté (subside jusqu’à 100%)',
  },
  evaluate: (profile: UserProfile) => {
    const reasons: string[] = [];
    const matchedCriteria: string[] = [];

    // Approximate numeric income estimation from bracket or exact
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

    // Household multiplier calculation (Geneva RDU scale approximation)
    const isSingle = profile.householdType === 'single' || profile.householdType === 'student' || profile.householdType === 'apprentice';
    const hasChildren = profile.childrenCount > 0 || profile.youngAdultsInTrainingCount > 0;
    const isCouple = profile.adultsCount >= 2 || profile.householdType === 'couple' || profile.householdType === 'family';

    // RDU Thresholds
    let maxThresholdFull = 32000;
    let maxThresholdPartial = 45000;

    if (isCouple) {
      maxThresholdFull = 48000;
      maxThresholdPartial = 66000;
    }

    // Add child allowances
    const totalKids = profile.childrenCount + profile.youngAdultsInTrainingCount;
    maxThresholdFull += totalKids * 8000;
    maxThresholdPartial += totalKids * 11000;

    // Student specific boost
    if (profile.trainingStatus === 'student' || profile.trainingStatus === 'apprentice') {
      maxThresholdPartial += 5000;
      matchedCriteria.push('Statut étudiant / jeune en formation éligible aux barèmes jeunesse du SAM');
    }

    // Frontalier check
    if (profile.residenceStatus === 'frontalier_lamal') {
      reasons.push("Frontalier avec droit d'option LAMal à Genève : dossier instruit sous réserve des conventions bilatérales et barème RDU frontalier.");
    }

    let status: EligibilityStatus = 'not_eligible';
    let confidence: ConfidenceLevel = 'high';
    let minAmt = 0;
    let maxAmt = 0;

    if (approxIncome <= maxThresholdFull) {
      status = 'likely_eligible';
      confidence = 'high';
      minAmt = isSingle ? 250 : 450;
      maxAmt = isSingle ? 540 : 1100;
      matchedCriteria.push(`Revenu ménage estimé (~CHF ${approxIncome.toLocaleString('fr-CH')}) inférieur au seuil de plein droit genevois (CHF ${maxThresholdFull.toLocaleString('fr-CH')}).`);
      reasons.push("Votre profil se situe dans la tranche de prise en charge forte ou totale de la prime moyenne genevoise.");
    } else if (approxIncome <= maxThresholdPartial) {
      status = 'likely_eligible';
      confidence = 'medium';
      minAmt = isSingle ? 120 : 200;
      maxAmt = isSingle ? 300 : 550;
      matchedCriteria.push(`Revenu ménage estimé sous le plafond genevois de subside partiel (CHF ${maxThresholdPartial.toLocaleString('fr-CH')}).`);
      reasons.push("Vous pourriez bénéficier d'une réduction partielle de votre prime mensuelle.");
    } else {
      status = 'not_eligible';
      confidence = 'high';
      reasons.push(`Le revenu estimé (~CHF ${approxIncome.toLocaleString('fr-CH')}) dépasse le plafond d'octroi genevois pour cette composition de ménage (env. CHF ${maxThresholdPartial.toLocaleString('fr-CH')}).`);
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
      title: "1. Vérifiez votre situation fiscale RDU",
      desc: "Munissez-vous de votre dernier avis de taxation genevois (RDU) ou de vos 12 fiches de paie si vous êtes imposé à la source.",
    },
    {
      title: "2. Déposez votre demande en ligne sur le portail e-démarches",
      desc: "Accédez au téléservice officiel du Service de l'assurance-maladie (SAM) de l'État de Genève.",
    },
    {
      title: "3. Versement direct à l'assureur",
      desc: "Une fois le subside validé, le SAM transmet directement le montant à votre caisse maladie chaque mois.",
    },
  ],
  requiredDocs: [
    "Dernière police d'assurance-maladie LAMal 2026",
    "Dernier avis de taxation fiscale genevoise (ou certificat de salaire annuel pour les personnes imposées à la source)",
    "Attestation d'études ou de contrat d'apprentissage pour les 18-25 ans",
    "Pièce d'identité suisse ou permis de séjour (B, C, G ou L)",
  ],
  sourceUrl: 'https://www.ge.ch/demander-subsides-assurance-maladie',
  lastUpdated: 'Août 2026 (Données barèmes 2026/2027 de l’État de Genève)',
};
