/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Cantons of Valais (VS), Fribourg (FR), Neuchâtel (NE), Jura (JU), Berne (BE), Zürich (ZH), Basel (BS, BL)
 */

import { CantonSubsidyRule, UserProfile, EligibilityStatus, ConfidenceLevel, CantonCode } from '../types';

function estimateIncomeNumber(profile: UserProfile): number {
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

// 1. VALAIS (VS)
export const valaisSubsidyRule: CantonSubsidyRule = {
  canton: 'VS',
  cantonName: 'Valais',
  cantonSlug: 'valais',
  agencyName: 'Caisse cantonale de compensation du Valais (CCVs Sion)',
  portalUrl: 'https://www.vs.ch/web/ccvs/reduction-des-primes',
  deadline: '31 décembre 2026',
  calculationBasis: 'taxable_income_and_wealth',
  calculationBasisLabel: 'Revenu net imposable + 1/15e de la fortune nette',
  summary: 'En Valais, la CCVs calcule le droit au subside sur la base du revenu net imposable majoré d’une fraction de la fortune. Des forfaits spécifiques s’appliquent aux enfants et aux familles.',
  officialIncomeCeilings: {
    single: 'Revenu déterminant sous env. CHF 42’000 / an',
    couple: 'Revenu déterminant sous env. CHF 58’000 / an',
    familyWithOneChild: 'Revenu déterminant sous env. CHF 68’000 / an',
    childBonus: '+ env. CHF 9’000 par enfant à charge',
    studentSpecific: 'Régime jeunes en formation avec déduction spécifique jusqu’à 25 ans',
  },
  evaluate: (profile: UserProfile) => {
    const income = estimateIncomeNumber(profile);
    const isCouple = profile.adultsCount >= 2 || profile.householdType === 'couple' || profile.householdType === 'family';
    const totalKids = profile.childrenCount + profile.youngAdultsInTrainingCount;
    const limit = (isCouple ? 58000 : 42000) + totalKids * 9000;

    const reasons: string[] = [];
    const matchedCriteria: string[] = [];

    if (income <= limit * 0.7) {
      matchedCriteria.push(`Revenu estimé sous le barème prioritaire de la CCVs Valais (CHF ${(limit * 0.7).toLocaleString('fr-CH')}).`);
      reasons.push("Votre ménage est hautement éligible pour une réduction significative des primes en Valais.");
      return { status: 'likely_eligible', confidence: 'high', estimatedMonthlyMin: isCouple ? 350 : 180, estimatedMonthlyMax: isCouple ? 750 : 380, reasons, matchedCriteria };
    } else if (income <= limit) {
      matchedCriteria.push(`Revenu estimé sous le plafond légal valaisan (CHF ${limit.toLocaleString('fr-CH')}).`);
      reasons.push("Vous pourriez être éligible à un subside partiel dégressif.");
      return { status: 'likely_eligible', confidence: 'medium', estimatedMonthlyMin: isCouple ? 120 : 80, estimatedMonthlyMax: isCouple ? 350 : 200, reasons, matchedCriteria };
    }
    reasons.push(`Le revenu estimé dépasse le barème cantonal valaisan (CHF ${limit.toLocaleString('fr-CH')}).`);
    return { status: 'not_eligible', confidence: 'high', reasons, matchedCriteria };
  },
  steps: [
    { title: "1. Contrôle taxation fiscale valaisanne", desc: "La CCVs attribue les subsides d'office selon la dernière décision de taxation." },
    { title: "2. Formulaire extraordinaire CCVs", desc: "À déposer si vos revenus 2026 ont baissé de plus de 15%." },
    { title: "3. Décompte d'assurance", desc: "Le montant est déduit chaque mois de votre facture LAMal." }
  ],
  requiredDocs: ["Police d'assurance 2026", "Dernier avis fiscal cantonal VS", "Pièce d'identité / Permis de séjour"],
  sourceUrl: 'https://www.vs.ch/web/ccvs/reduction-des-primes',
  lastUpdated: 'Août 2026 (Données officielles CCVs Sion)',
};

// 2. FRIBOURG (FR)
export const fribourgSubsidyRule: CantonSubsidyRule = {
  canton: 'FR',
  cantonName: 'Fribourg',
  cantonSlug: 'fribourg',
  agencyName: "Établissement cantonal des assurances sociales (ECAS / CCFR Fribourg)",
  portalUrl: 'https://www.ecasfr.ch/reduction-des-primes',
  deadline: '31 août 2026 (pour effet ordinaire) ou 31 décembre (demande tardive)',
  calculationBasis: 'rdu',
  calculationBasisLabel: 'Revenu Déterminant Fribourgeois (RDU)',
  summary: 'Dans le canton de Fribourg, l’ECAS gère l’octroi des réductions de primes avec des paliers progressifs pour les personnes seules, couples et familles nombreuses.',
  officialIncomeCeilings: {
    single: 'Revenu déterminant sous env. CHF 40’000 / an',
    couple: 'Revenu déterminant sous env. CHF 56’000 / an',
    familyWithOneChild: 'Revenu déterminant sous env. CHF 66’000 / an',
    childBonus: '+ env. CHF 8’500 par enfant à charge',
    studentSpecific: 'Étudiants et apprentis : forfait jeunes avec prise en charge partielle à totale',
  },
  evaluate: (profile: UserProfile) => {
    const income = estimateIncomeNumber(profile);
    const isCouple = profile.adultsCount >= 2 || profile.householdType === 'couple' || profile.householdType === 'family';
    const totalKids = profile.childrenCount + profile.youngAdultsInTrainingCount;
    const limit = (isCouple ? 56000 : 40000) + totalKids * 8500;

    const reasons: string[] = [];
    const matchedCriteria: string[] = [];

    if (income <= limit * 0.7) {
      matchedCriteria.push(`Revenu ménage éligible au barème 1 de l'ECAS Fribourg.`);
      reasons.push("Subside cantonal élevé probable pour compenser la prime fribourgeoise.");
      return { status: 'likely_eligible', confidence: 'high', estimatedMonthlyMin: isCouple ? 300 : 160, estimatedMonthlyMax: isCouple ? 700 : 360, reasons, matchedCriteria };
    } else if (income <= limit) {
      matchedCriteria.push(`Revenu sous le plafond légal fribourgeois.`);
      reasons.push("Subside dégressif envisageable selon la composition de votre ménage.");
      return { status: 'likely_eligible', confidence: 'medium', estimatedMonthlyMin: isCouple ? 100 : 60, estimatedMonthlyMax: isCouple ? 280 : 170, reasons, matchedCriteria };
    }
    reasons.push(`Le revenu estimé dépasse le barème cantonal fribourgeois (CHF ${limit.toLocaleString('fr-CH')}).`);
    return { status: 'not_eligible', confidence: 'high', reasons, matchedCriteria };
  },
  steps: [
    { title: "1. Décision fiscale fribourgeoise", desc: "Notification automatique envoyée aux ménages éligibles." },
    { title: "2. Demande sur le guichet en ligne ECAS", desc: "En cas de modification récente de situation familiale ou professionnelle." },
    { title: "3. Versement", desc: "Attribution directe sur la facture mensuelle de l'assureur." }
  ],
  requiredDocs: ["Police LAMal 2026", "Avis de taxation FR", "Justificatifs de revenus actuels"],
  sourceUrl: 'https://www.ecasfr.ch/reduction-des-primes',
  lastUpdated: 'Août 2026 (ECAS Fribourg)',
};

// 3. NEUCHÂTEL (NE)
export const neuchatelSubsidyRule: CantonSubsidyRule = {
  canton: 'NE',
  cantonName: 'Neuchâtel',
  cantonSlug: 'neuchatel',
  agencyName: "Office cantonal de l'assurance-maladie (OCAM / OCSS Neuchâtel)",
  portalUrl: 'https://www.ne.ch/autorites/DECS/SAS/OCAM/Pages/accueil.aspx',
  deadline: '31 décembre 2026',
  calculationBasis: 'rdu',
  calculationBasisLabel: 'Revenu Déterminant Unifié Neuchâtelois',
  summary: 'À Neuchâtel, les subsides sont calculés selon le RDU intégrant le revenu net et une fraction de fortune avec barèmes bonifiés pour les enfants.',
  officialIncomeCeilings: {
    single: 'RDU sous env. CHF 38’000 / an',
    couple: 'RDU sous env. CHF 54’000 / an',
    familyWithOneChild: 'RDU sous env. CHF 64’000 / an',
    childBonus: '+ env. CHF 9’000 par enfant',
  },
  evaluate: (profile: UserProfile) => {
    const income = estimateIncomeNumber(profile);
    const isCouple = profile.adultsCount >= 2 || profile.householdType === 'couple' || profile.householdType === 'family';
    const totalKids = profile.childrenCount + profile.youngAdultsInTrainingCount;
    const limit = (isCouple ? 54000 : 38000) + totalKids * 9000;
    const reasons: string[] = [];
    const matchedCriteria: string[] = [];

    if (income <= limit) {
      matchedCriteria.push("Revenu estimé sous le barème cantonal neuchâtelois.");
      reasons.push("Vous pourriez avoir droit à un subside partiel ou complet selon votre avis de taxation.");
      return { status: 'likely_eligible', confidence: 'medium', estimatedMonthlyMin: isCouple ? 180 : 90, estimatedMonthlyMax: isCouple ? 650 : 340, reasons, matchedCriteria };
    }
    reasons.push("Revenu supérieur aux barèmes d'octroi de l'OCAM Neuchâtel.");
    return { status: 'not_eligible', confidence: 'high', reasons, matchedCriteria };
  },
  steps: [
    { title: "1. Traitement OCAM", desc: "Attribution automatique par croisement fiscal." },
    { title: "2. Demande extraordinaire", desc: "Sur le portail cantonal neuchâtelois en cas de modification de revenu." }
  ],
  requiredDocs: ["Police LAMal 2026", "Avis fiscal NE", "Contrat d'apprentissage / attestation d'études"],
  sourceUrl: 'https://www.ne.ch/autorites/DECS/SAS/OCAM/Pages/accueil.aspx',
  lastUpdated: 'Août 2026 (OCAM Neuchâtel)',
};

// 4. JURA (JU)
export const juraSubsidyRule: CantonSubsidyRule = {
  canton: 'JU',
  cantonName: 'Jura',
  cantonSlug: 'jura',
  agencyName: "Caisse de compensation du Canton du Jura (OCC Delémont)",
  portalUrl: 'https://www.caisseavsjura.ch/assurance-maladie/reduction-des-primes',
  deadline: '31 décembre 2026',
  calculationBasis: 'taxable_income',
  calculationBasisLabel: 'Revenu imposable et situation de famille',
  summary: 'Dans la République et Canton du Jura, l’OCC applique des barèmes par échelons pour garantir l’accès aux soins de base à prime modérée.',
  officialIncomeCeilings: {
    single: 'Revenu imposable sous env. CHF 36’000 / an',
    couple: 'Revenu imposable sous env. CHF 50’000 / an',
    familyWithOneChild: 'Revenu imposable sous env. CHF 60’000 / an',
    childBonus: '+ env. CHF 8’000 par enfant',
  },
  evaluate: (profile: UserProfile) => {
    const income = estimateIncomeNumber(profile);
    const isCouple = profile.adultsCount >= 2 || profile.householdType === 'couple' || profile.householdType === 'family';
    const totalKids = profile.childrenCount + profile.youngAdultsInTrainingCount;
    const limit = (isCouple ? 50000 : 36000) + totalKids * 8000;
    const reasons: string[] = [];
    const matchedCriteria: string[] = [];

    if (income <= limit) {
      matchedCriteria.push("Revenu estimé sous le barème jurassien.");
      reasons.push("Subside probable avec versement direct à votre assureur.");
      return { status: 'likely_eligible', confidence: 'medium', estimatedMonthlyMin: isCouple ? 160 : 80, estimatedMonthlyMax: isCouple ? 600 : 310, reasons, matchedCriteria };
    }
    reasons.push("Revenu supérieur aux barèmes d'octroi de l'OCC Jura.");
    return { status: 'not_eligible', confidence: 'high', reasons, matchedCriteria };
  },
  steps: [
    { title: "1. Formulaire OCC", desc: "À remplir en ligne ou à renvoyer à l'OCC à Delémont." }
  ],
  requiredDocs: ["Police LAMal 2026", "Avis fiscal JU"],
  sourceUrl: 'https://www.caisseavsjura.ch/assurance-maladie/reduction-des-primes',
  lastUpdated: 'Août 2026 (OCC Jura)',
};

// 5. BERNE (BE)
export const berneSubsidyRule: CantonSubsidyRule = {
  canton: 'BE',
  cantonName: 'Berne',
  cantonSlug: 'berne',
  agencyName: "Office de la santé / Caisse de compensation du canton de Berne (AKB / ASB)",
  portalUrl: 'https://www.akb.ch/fr/prestations/reduction-des-primes/',
  deadline: '31 décembre 2026',
  calculationBasis: 'rdu',
  calculationBasisLabel: 'Revenu déterminant bernois',
  summary: 'Dans le canton de Berne, l’AKB/ASB verse des subsides dégressifs calculés lors de la taxation fiscale ordinaire.',
  officialIncomeCeilings: {
    single: 'Revenu déterminant sous env. CHF 41’000 / an',
    couple: 'Revenu déterminant sous env. CHF 58’000 / an',
    familyWithOneChild: 'Revenu déterminant sous env. CHF 68’000 / an',
    childBonus: '+ env. CHF 9’000 par enfant',
  },
  evaluate: (profile: UserProfile) => {
    const income = estimateIncomeNumber(profile);
    const isCouple = profile.adultsCount >= 2 || profile.householdType === 'couple' || profile.householdType === 'family';
    const totalKids = profile.childrenCount + profile.youngAdultsInTrainingCount;
    const limit = (isCouple ? 58000 : 41000) + totalKids * 9000;
    const reasons: string[] = [];
    const matchedCriteria: string[] = [];

    if (income <= limit) {
      matchedCriteria.push("Revenu sous le seuil d'intervention bernois.");
      reasons.push("Subside cantonal envisageable avec déduction mensuelle sur vos primes.");
      return { status: 'likely_eligible', confidence: 'medium', estimatedMonthlyMin: isCouple ? 180 : 90, estimatedMonthlyMax: isCouple ? 650 : 330, reasons, matchedCriteria };
    }
    reasons.push("Revenu estimé supérieur aux barèmes de l'AKB Berne.");
    return { status: 'not_eligible', confidence: 'high', reasons, matchedCriteria };
  },
  steps: [{ title: "1. Demande AKB", desc: "Enregistrement en ligne sur le portail de la Caisse de compensation de Berne." }],
  requiredDocs: ["Police LAMal 2026", "Avis fiscal BE"],
  sourceUrl: 'https://www.akb.ch/fr/prestations/reduction-des-primes/',
  lastUpdated: 'Août 2026 (AKB Berne)',
};

// 6. ZÜRICH (ZH)
export const zurichSubsidyRule: CantonSubsidyRule = {
  canton: 'ZH',
  cantonName: 'Zürich',
  cantonSlug: 'zurich',
  agencyName: 'SVA Zürich (Sozialversicherungsanstalt des Kantons Zürich)',
  portalUrl: 'https://svazurich.ch/unsere-produkte/praemienverbilligung.html',
  deadline: '31. März 2026 (Antragsfrist) bzw. 31. Dezember 2026',
  calculationBasis: 'taxable_income_and_wealth',
  calculationBasisLabel: 'Massgebendes Gesamteinkommen (MGE)',
  summary: 'Im Kanton Zürich berechnet die SVA Zürich die Individuelle Prämienverbilligung (IPV) anhand des massgebenden Gesamteinkommens.',
  officialIncomeCeilings: {
    single: 'MGE unter ca. CHF 43’000 / Jahr',
    couple: 'MGE unter ca. CHF 60’000 / Jahr',
    familyWithOneChild: 'MGE unter ca. CHF 72’000 / Jahr',
    childBonus: '+ ca. CHF 10’000 pro Kind',
  },
  evaluate: (profile: UserProfile) => {
    const income = estimateIncomeNumber(profile);
    const isCouple = profile.adultsCount >= 2 || profile.householdType === 'couple' || profile.householdType === 'family';
    const totalKids = profile.childrenCount + profile.youngAdultsInTrainingCount;
    const limit = (isCouple ? 60000 : 43000) + totalKids * 10000;
    const reasons: string[] = [];
    const matchedCriteria: string[] = [];

    if (income <= limit) {
      matchedCriteria.push("Gesamteinkommen unter den Richtlinien der SVA Zürich.");
      reasons.push("Sie haben voraussichtlich Anspruch auf IPV-Prämienverbilligung im Kanton Zürich.");
      return { status: 'likely_eligible', confidence: 'medium', estimatedMonthlyMin: isCouple ? 180 : 90, estimatedMonthlyMax: isCouple ? 620 : 320, reasons, matchedCriteria };
    }
    reasons.push("Einkommen übersteigt die IPV-Grenzwerte der SVA Zürich.");
    return { status: 'not_eligible', confidence: 'high', reasons, matchedCriteria };
  },
  steps: [{ title: "1. IPV-Antrag SVA Zürich", desc: "Online-Einreichung auf svazurich.ch." }],
  requiredDocs: ["Krankenkassenpolice 2026", "Steuerveranlagung Kanton Zürich"],
  sourceUrl: 'https://svazurich.ch/unsere-produkte/praemienverbilligung.html',
  lastUpdated: 'August 2026 (SVA Zürich)',
};

// 7. BASEL (BS & BL)
export const baselStadtSubsidyRule: CantonSubsidyRule = {
  canton: 'BS',
  cantonName: 'Bâle-Ville',
  cantonSlug: 'bale-ville',
  agencyName: 'Amt für Sozialbeiträge Basel-Stadt (ASV)',
  portalUrl: 'https://www.asv.bs.ch/krankenkassenpraemien.html',
  deadline: '31. Dezember 2026',
  calculationBasis: 'taxable_income',
  calculationBasisLabel: 'Massgebendes Einkommen Basel-Stadt',
  summary: 'In Basel-Stadt übernimmt das ASV für anspruchsberechtigte Haushalte substanzielle Anteile der Richtprämie.',
  officialIncomeCeilings: {
    single: 'Einkommen unter ca. CHF 45’000 / Jahr',
    couple: 'Einkommen unter ca. CHF 62’000 / Jahr',
    familyWithOneChild: 'Einkommen unter ca. CHF 74’000 / Jahr',
    childBonus: '+ ca. CHF 11’000 pro Kind',
  },
  evaluate: (profile: UserProfile) => {
    const income = estimateIncomeNumber(profile);
    const isCouple = profile.adultsCount >= 2 || profile.householdType === 'couple' || profile.householdType === 'family';
    const totalKids = profile.childrenCount + profile.youngAdultsInTrainingCount;
    const limit = (isCouple ? 62000 : 45000) + totalKids * 11000;
    const reasons: string[] = [];
    const matchedCriteria: string[] = [];

    if (income <= limit) {
      matchedCriteria.push("Einkommen im förderfähigen Bereich des Kantons Basel-Stadt.");
      reasons.push("Gute Chancen auf eine Prämienverbilligung.");
      return { status: 'likely_eligible', confidence: 'medium', estimatedMonthlyMin: isCouple ? 200 : 100, estimatedMonthlyMax: isCouple ? 700 : 360, reasons, matchedCriteria };
    }
    reasons.push("Einkommen liegt über den ASV-Grenzwerten.");
    return { status: 'not_eligible', confidence: 'high', reasons, matchedCriteria };
  },
  steps: [{ title: "1. Antrag ASV Basel-Stadt", desc: "Online-Antrag auf asv.bs.ch einreichen." }],
  requiredDocs: ["Police 2026", "Steuerentscheid BS"],
  sourceUrl: 'https://www.asv.bs.ch/krankenkassenpraemien.html',
  lastUpdated: 'August 2026 (ASV Basel-Stadt)',
};
