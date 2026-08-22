/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Remaining Swiss Cantons (BL, AG, TI, SG, TG, LU, ZG, SO, SH, AR, AI, GR, GL, NW, OW, UR, SZ)
 */

import { CantonSubsidyRule, UserProfile, CantonCode, EligibilityStatus, ConfidenceLevel } from '../types';

function estimateIncome(profile: UserProfile): number {
  if (profile.exactIncome && profile.exactIncome > 0) return profile.exactIncome;
  switch (profile.incomeBracket) {
    case 'less_20k': return 18000;
    case '20k_30k': return 25000;
    case '30k_40k': return 35000;
    case '40k_50k': return 45000;
    case '50k_60k': return 55000;
    case '60k_80k': return 70000;
    case '80k_100k': return 90000;
    case 'more_100k': return 115000;
    default: return 40000;
  }
}

function makeGenericRule(
  canton: CantonCode,
  cantonName: string,
  cantonSlug: string,
  agencyName: string,
  portalUrl: string,
  singleLimit: number,
  coupleLimit: number,
  childBonus: number,
  summary: string
): CantonSubsidyRule {
  return {
    canton,
    cantonName,
    cantonSlug,
    agencyName,
    portalUrl,
    deadline: '31 décembre 2026',
    calculationBasis: 'taxable_income_and_wealth',
    calculationBasisLabel: 'Revenu déterminant cantonal',
    summary,
    officialIncomeCeilings: {
      single: `Revenu sous env. CHF ${singleLimit.toLocaleString('fr-CH')} / an`,
      couple: `Revenu sous env. CHF ${coupleLimit.toLocaleString('fr-CH')} / an`,
      familyWithOneChild: `Revenu sous env. CHF ${(coupleLimit + childBonus).toLocaleString('fr-CH')} / an`,
      childBonus: `+ env. CHF ${childBonus.toLocaleString('fr-CH')} par enfant`,
    },
    evaluate: (profile: UserProfile) => {
      const income = estimateIncome(profile);
      const isCouple = profile.adultsCount >= 2 || profile.householdType === 'couple' || profile.householdType === 'family';
      const totalKids = profile.childrenCount + profile.youngAdultsInTrainingCount;
      const limit = (isCouple ? coupleLimit : singleLimit) + totalKids * childBonus;
      const reasons: string[] = [];
      const matchedCriteria: string[] = [];

      if (income <= limit) {
        matchedCriteria.push(`Revenu estimé sous le barème cantonal (${cantonName}).`);
        reasons.push(`Vous pourriez être éligible à une réduction de primes selon les directives de ${agencyName}.`);
        return {
          status: 'likely_eligible',
          confidence: 'medium',
          estimatedMonthlyMin: isCouple ? 140 : 70,
          estimatedMonthlyMax: isCouple ? 550 : 280,
          reasons,
          matchedCriteria,
        };
      }
      reasons.push(`Le revenu estimé dépasse le barème cantonal de ${agencyName} (CHF ${limit.toLocaleString('fr-CH')}).`);
      return { status: 'not_eligible', confidence: 'high', reasons, matchedCriteria };
    },
    steps: [
      { title: `1. Procédure ${agencyName}`, desc: "Vérifiez vos barèmes ou déposez votre demande officielle." },
      { title: "2. Justificatifs", desc: "Transmettez votre police LAMal 2026 et votre avis de taxation." }
    ],
    requiredDocs: ["Police LAMal 2026", `Dernier avis fiscal (${canton})`],
    sourceUrl: portalUrl,
    lastUpdated: 'Août 2026',
  };
}

export const remainingCantonsRules: Record<string, CantonSubsidyRule> = {
  BL: makeGenericRule('BL', 'Bâle-Campagne', 'bale-campagne', 'SVA Basel-Landschaft', 'https://www.sva-bl.ch/praemienverbilligung/', 42000, 58000, 9500, 'Gestion IPV par la SVA Basel-Landschaft.'),
  AG: makeGenericRule('AG', 'Argovie', 'argovie', 'SVA Aargau', 'https://www.sva-ag.ch/leistungen/praemienverbilligung', 41000, 57000, 9000, 'Gestion IPV par la SVA Aargau à Aarau.'),
  TI: makeGenericRule('TI', 'Tessin', 'tessin', 'Istituto delle assicurazioni sociali (IAS Bellinzona)', 'https://www4.ti.ch/dss/das/ias/prestazioni/riduzione-dei-premi-dellassicurazione-malattia-rip/', 40000, 56000, 8500, 'Gestione RIP da parte dello IAS Bellinzona nel Cantone Ticino.'),
  SG: makeGenericRule('SG', 'Saint-Gall', 'saint-gall', 'SVA St. Gallen', 'https://www.svasg.ch/praemienverbilligung', 40000, 55000, 8500, 'IPV-Regelung der SVA St. Gallen.'),
  TG: makeGenericRule('TG', 'Thurgovie', 'thurgovie', 'Krankenkassen-Kontrollstelle Thurgau (SVA TG)', 'https://www.svatg.ch/praemienverbilligung', 39000, 54000, 8500, 'Prämienverbilligung im Kanton Thurgau.'),
  LU: makeGenericRule('LU', 'Lucerne', 'lucerne', 'WAS Wirtschaft Arbeit Soziales Luzern', 'https://was-luzern.ch/ausgleichskasse/praemienverbilligung/', 41000, 57000, 9000, 'IPV-Verfahren der Ausgleichskasse WAS Luzern.'),
  ZG: makeGenericRule('ZG', 'Zoug', 'zoug', 'Ausgleichskasse Zug', 'https://www.akzug.ch/praemienverbilligung', 46000, 64000, 10000, 'IPV-Verfahren im Kanton Zug.'),
  SO: makeGenericRule('SO', 'Soleure', 'soleure', 'Ausgleichskasse des Kantons Solothurn (AKSO)', 'https://www.akso.ch/praemienverbilligung/', 39000, 54000, 8500, 'IPV-Regeln der AKSO Solothurn.'),
  SH: makeGenericRule('SH', 'Schaffhouse', 'schaffhouse', 'SVA Schaffhausen', 'https://www.svash.ch/praemienverbilligung/', 39000, 54000, 8500, 'IPV-Verfahren der SVA Schaffhausen.'),
  AR: makeGenericRule('AR', 'Appenzell Rhodes-Extérieures', 'appenzell-ar', 'SVA Appenzell Ausserrhoden', 'https://www.sva-ar.ch/praemienverbilligung/', 38000, 53000, 8000, 'IPV im Kanton Appenzell Ausserrhoden.'),
  AI: makeGenericRule('AI', 'Appenzell Rhodes-Intérieures', 'appenzell-ai', 'Sozialversicherungen Appenzell Innerrhoden', 'https://www.ai.ch/themen/gesundheit-alter-und-soziales/sozialversicherungen', 38000, 53000, 8000, 'IPV im Kanton Appenzell Innerrhoden.'),
  GR: makeGenericRule('GR', 'Grisons', 'grisons', 'SVA Graubünden (Chur)', 'https://www.sva.gr.ch/praemienverbilligung', 40000, 56000, 8500, 'IPV-Abwicklung der SVA Graubünden.'),
  GL: makeGenericRule('GL', 'Glaris', 'glaris', 'Ausgleichskasse des Kantons Glarus', 'https://www.akglarus.ch/praemienverbilligung/', 39000, 54000, 8500, 'IPV im Kanton Glarus.'),
  NW: makeGenericRule('NW', 'Nidwald', 'nidwald', 'Ausgleichskasse Nidwalden', 'https://www.aknw.ch/praemienverbilligung/', 42000, 58000, 9000, 'IPV im Kanton Nidwalden.'),
  OW: makeGenericRule('OW', 'Obwald', 'obwald', 'Ausgleichskasse Obwalden', 'https://www.akow.ch/praemienverbilligung/', 40000, 56000, 8500, 'IPV im Kanton Obwalden.'),
  UR: makeGenericRule('UR', 'Uri', 'uri', 'Ausgleichskasse Uri', 'https://www.akuri.ch/praemienverbilligung/', 38000, 53000, 8000, 'IPV im Kanton Uri.'),
  SZ: makeGenericRule('SZ', 'Schwytz', 'schwyz', 'Ausgleichskasse Schwyz', 'https://www.aksz.ch/praemienverbilligung/', 43000, 60000, 9500, 'IPV im Kanton Schwyz.'),
};
