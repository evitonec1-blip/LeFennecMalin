/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Swiss Health Insurance Subsidy Calculator Engine
 */

import { UserProfile, SubsidyEstimate, CantonCode } from './types';
import { getCantonSubsidyRule } from './rules';

export function calculateSubsidyEligibility(profile: UserProfile): SubsidyEstimate {
  const rule = getCantonSubsidyRule(profile.canton);
  const evaluation = rule.evaluate(profile);

  let headline = '';
  let subheadline = '';
  let alternativeSavingsHint: string | undefined = undefined;

  const cantonLabel = rule.cantonName;
  const agency = rule.agencyName;

  if (evaluation.status === 'likely_eligible') {
    headline = `Bonne nouvelle ! Vous pourriez être éligible au subside (${cantonLabel}) 🎉`;
    if (evaluation.estimatedMonthlyMin && evaluation.estimatedMonthlyMax) {
      subheadline = `Estimation indicative : entre CHF ${evaluation.estimatedMonthlyMin}.- et CHF ${evaluation.estimatedMonthlyMax}.- / mois déduits de vos primes d'assurance maladie.`;
    } else {
      subheadline = `Votre profil remplit les conditions de revenus et de composition de ménage pour une réduction de prime dans le canton de ${cantonLabel}.`;
    }
    alternativeSavingsHint = `Même avec un subside cantonal, choisir une caisse maladie économique vous permet de réduire votre reste à charge personnel à zéro !`;
  } else if (evaluation.status === 'not_eligible') {
    headline = `Pas de subside ? Pas de panique, Fenny a une autre idée ! 💡`;
    subheadline = `Selon les barèmes officiels 2026 de ${agency}, votre revenu estimé dépasse probablement le seuil d'octroi pour le canton de ${cantonLabel}.`;
    alternativeSavingsHint = `En comparant les 37 caisses maladie agrées de ${cantonLabel} et en ajustant votre franchise (300 vs 2500) ou votre modèle (Telmed, Médecin de famille), vous pouvez économiser jusqu'à CHF 1'500.- par an par adulte.`;
  } else {
    headline = `Dossier spécifique : Vérification recommandée auprès de ${agency}`;
    subheadline = `Votre situation présente des critères nécessitant un examen particulier (statut de frontalier, formation ou barème spécial).`;
    alternativeSavingsHint = `Vérifiez directement avec l'organisme cantonal ou comparez dès maintenant les caisses maladie les plus avantageuses dans votre région.`;
  }

  let amountLabel = '';
  if (evaluation.estimatedMonthlyMin && evaluation.estimatedMonthlyMax) {
    amountLabel = `CHF ${evaluation.estimatedMonthlyMin} – ${evaluation.estimatedMonthlyMax} / mois`;
  }

  return {
    status: evaluation.status,
    confidence: evaluation.confidence,
    headline,
    subheadline,
    estimatedMonthlyAmount: evaluation.estimatedMonthlyMin
      ? {
          min: evaluation.estimatedMonthlyMin,
          max: evaluation.estimatedMonthlyMax || evaluation.estimatedMonthlyMin,
          label: amountLabel,
        }
      : undefined,
    reasons: evaluation.reasons,
    matchedCriteria: evaluation.matchedCriteria,
    cantonInfo: {
      name: rule.cantonName,
      code: rule.canton,
      agencyName: rule.agencyName,
      portalUrl: rule.portalUrl,
      deadline: rule.deadline,
      calculationBasis: rule.calculationBasisLabel,
    },
    stepsToApply: rule.steps,
    requiredDocuments: rule.requiredDocs,
    alternativeSavingsHint,
    sourceUrl: rule.sourceUrl,
    lastUpdated: rule.lastUpdated,
    disclaimer:
      "Cette estimation est indicative et basée sur les barèmes légaux 2026. L'octroi définitif et le montant exact du subside sont exclusivement arrêtés par l'autorité cantonale compétente.",
  };
}
