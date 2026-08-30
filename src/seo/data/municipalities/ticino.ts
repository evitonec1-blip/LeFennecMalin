/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Swiss Italian / Ticino Municipalities SEO Data (Lugano, Bellinzona)
 */

import { MunicipalitySEOData } from '../municipalityTypes';

export const TICINO_MUNICIPALITIES: MunicipalitySEOData[] = [
  // 29. LUGANO (Canton Tessin)
  {
    id: 'tessin-lugano',
    name: 'Lugano',
    slug: 'lugano',
    canton: 'Tessin',
    cantonCode: 'TI',
    cantonSlug: 'tessin',
    postalCodes: ['6900', '6901', '6902', '6903', '6904', '6905', '6906', '6907'],
    population: "63'500 habitants",
    languagePrimary: 'it',
    region: 'Région Unique (PR-REG CH1)',
    priority: 1,
    avgAdultPremium300: 'CHF 510 – CHF 585 / mois',
    avgAdultPremium2500: 'CHF 400 – CHF 470 / mois',
    avgYoungPremium: 'CHF 325 – CHF 410 / mois',
    avgChildPremium: 'CHF 120 – CHF 165 / mois',
    cheapestInsurers: [
      { name: 'KPT', slug: 'kpt', adult2500: 'CHF 392.40', adult300: 'CHF 502.10', model: 'Medico di famiglia' },
      { name: 'Assura', slug: 'assura', adult2500: 'CHF 396.80', adult300: 'CHF 506.50', model: 'Pharmed' },
      { name: 'Mutuel Assurance', slug: 'groupemutuel', adult2500: 'CHF 406.20', adult300: 'CHF 515.90', model: 'PrimaTel' },
      { name: 'CSS', slug: 'css', adult2500: 'CHF 415.50', adult300: 'CHF 525.20', model: 'Multimed' }
    ],
    popularInsurers: ['CSS', 'Groupe Mutuel', 'Helsana', 'Assura', 'Swica', 'Sanitas'],
    localHospitals: ['Ospedale Regionale di Lugano (Civico & Italiano - EOC)', 'Cardiocentro Ticino', 'Clinica Luganese Moncucco', 'Clinica Sant’Anna (Sorengo)'],
    subsidyAgency: 'IAS (Istituto delle assicurazioni sociali del Cantone Ticino)',
    subsidyOfficeAddress: 'Via Ghiringhelli 15a, 6500 Bellinzona',
    subsidyEligibilitySummary: 'Riduzione dei premi dell’assicurazione malattia (RIPAM) calcolata dall’IAS Ticino sul reddito imponibile.',
    localOverview: "Principale polo economico e finanziario della Svizzera italiana: a Lugano (6900), i residenti beneficiano dell'eccellenza dell'EOC (Ospedale Civico e Italiano) e del Cardiocentro Ticino. Nel 2026, il confronto delle casse malati permette di risparmiare oltre CHF 1'600 all'anno per persona.",
    franchiseAdvice: "La franchigia a 2500 CHF consente un risparmio mensile di circa CHF 110 per chi non ha spese mediche ricorrenti.",
    modelsAdvice: "I modelli Medico di famiglia e Telmed sono ampiamente diffusi tra i medici luganesi con sconti fino al 20%.",
    familyAdvice: "Famiglie luganesi con figli possono richiedere i sussidi RIPAM cantonali.",
    youngAdultAdvice: "Tariffe agevolate per gli studenti dell'USI (Università della Svizzera italiana) e SUPSI (19-25 anni).",
    crossBorderAdvice: "Lugano e il Sottoceneri contano migliaia di frontalieri italiani con diritto di opzione LAMal vs SSN.",
    faqs: [
      {
        question: "Qual è la cassa malati più economica a Lugano nel 2026?",
        answer: "KPT e Assura offrono i premi base più bassi a Lugano nel 2026, a partire da CHF 392.40/mese con franchigia 2500."
      },
      {
        question: "Come richiedere il sussidio cassa malati (RIPAM) a Lugano?",
        answer: "La richiesta si effettua tramite l'Istituto delle assicurazioni sociali (IAS), Via Ghiringhelli 15a, 6500 Bellinzona o online su ias.ti.ch."
      }
    ],
    nearbyCommunes: [
      { name: 'Bellinzona', slug: 'bellinzone', cantonSlug: 'tessin', population: "44'000" },
      { name: 'Chiasso', slug: 'chiasso', cantonSlug: 'tessin', population: "8'000" }
    ],
    seoTitle: "Confronto Casse Malati Lugano 2026 — Premi LAMal & Sussidi RIPAM IAS (6900)",
    metaDescription: "Confronta i premi delle casse malati 2026 a Lugano (6900). Dati ufficiali UFSP, casse più economiche, EOC, Cardiocentro e sussidi RIPAM.",
    h1: "Confronto Casse Malati a Lugano — Premi 2026"
  },

  // 30. BELLINZONA (Canton Tessin)
  {
    id: 'tessin-bellinzone',
    name: 'Bellinzona',
    slug: 'bellinzone',
    canton: 'Tessin',
    cantonCode: 'TI',
    cantonSlug: 'tessin',
    postalCodes: ['6500', '6501'],
    population: "44'000 habitants",
    languagePrimary: 'it',
    region: 'Région Unique (PR-REG CH1)',
    priority: 1,
    avgAdultPremium300: 'CHF 510 – CHF 585 / mois',
    avgAdultPremium2500: 'CHF 400 – CHF 470 / mois',
    avgYoungPremium: 'CHF 325 – CHF 410 / mois',
    avgChildPremium: 'CHF 120 – CHF 165 / mois',
    cheapestInsurers: [
      { name: 'KPT', slug: 'kpt', adult2500: 'CHF 392.40', adult300: 'CHF 502.10', model: 'Medico di famiglia' },
      { name: 'Assura', slug: 'assura', adult2500: 'CHF 396.80', adult300: 'CHF 506.50', model: 'Pharmed' }
    ],
    popularInsurers: ['CSS', 'Groupe Mutuel', 'Helsana', 'Assura', 'Swica'],
    localHospitals: ['Ospedale Regionale di Bellinzona e Valli (San Giovanni - EOC)', 'Istituto Oncologico della Svizzera Italiana (IOSI)'],
    subsidyAgency: 'IAS Bellinzona',
    subsidyOfficeAddress: 'Via Ghiringhelli 15a, 6500 Bellinzona',
    subsidyEligibilitySummary: 'Sede centrale dell’IAS per i sussidi RIPAM di tutto il Ticino.',
    localOverview: "Capitale del Cantone Ticino e sede dell'Ospedale San Giovanni (EOC) e dello IOSI: Bellinzona (6500) unisce centralità amministrativa e cure sanitarie di primo livello.",
    franchiseAdvice: "La franchigia 2500 permette di risparmiare oltre CHF 1'300 all'anno.",
    modelsAdvice: "I medici dell'agglomerato bellinzonese aderiscono ampiamente ai modelli alternativi.",
    familyAdvice: "Sussidi RIPAM molto accessibili per le famiglie.",
    youngAdultAdvice: "Sconti per giovani dai 19 ai 25 anni.",
    faqs: [
      {
        question: "Dove si trova l'ufficio cantonale per i sussidi cassa malati a Bellinzona?",
        answer: "La sede centrale dell'IAS (Istituto delle assicurazioni sociali) si trova proprio a Bellinzona in Via Ghiringhelli 15a."
      }
    ],
    nearbyCommunes: [
      { name: 'Lugano', slug: 'lugano', cantonSlug: 'tessin' },
      { name: 'Locarno', slug: 'locarno', cantonSlug: 'tessin' }
    ],
    seoTitle: "Confronto Casse Malati Bellinzona 2026 — Premi LAMal & IAS (6500)",
    metaDescription: "Confronta le casse malati 2026 a Bellinzona (6500). Tariffe ufficiali UFSP, Ospedale San Giovanni e sede centrale sussidi IAS.",
    h1: "Confronto Casse Malati a Bellinzona — Premi 2026"
  }
];
