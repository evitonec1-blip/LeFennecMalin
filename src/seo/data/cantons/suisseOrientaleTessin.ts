/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CantonSEOData } from '../cantonTypes';

export const SUISSE_ORIENTALE_TESSIN_CANTONS: Record<string, CantonSEOData> = {
  'saint-gall': {
    code: 'SG',
    name: 'Saint-Gall',
    slug: 'saint-gall',
    capital: 'Saint-Gall',
    languagePrimary: 'de',
    population: "525'000 habitants",
    communesCount: 77,
    mainCommunes: [
      { name: 'Saint-Gall (St. Gallen)', npa: '9000 - 9016', description: 'Capitale cantonale et pôle universitaire' },
      { name: 'Rapperswil-Jona', npa: '8640', description: 'Cité des roses au bord du lac de Zurich' },
      { name: 'Wil', npa: '9500', description: 'Carrefour du Fürstenland et du Toggenbourg' },
      { name: 'Gossau', npa: '9200', description: 'Pôle économique de l’agglomération saint-galloise' },
      { name: 'Buchs', npa: '9470', description: 'Centre de la vallée du Rhin (Rheintal)' },
      { name: 'Uzwil', npa: '9240', description: 'Centre industriel et technologique' }
    ],
    regionsCount: 3,
    regionsDescription: "Le canton de Saint-Gall compte 3 régions de primes : Région 1 (agglomération de Saint-Gall), Région 2 (See-Gaster / Rapperswil-Jona, Wil) et Région 3 (Toggenbourg, Rheintal et Sarganserland) où les primes sont très modérées.",
    avgAdultPremium300: 'CHF 360 – CHF 445 / mois',
    avgAdultPremium2500: 'CHF 250 – CHF 335 / mois',
    avgYoungPremium: 'CHF 235 – CHF 315 / mois',
    avgChildPremium: 'CHF 80 – CHF 122 / mois',
    cheapestInsurers: [
      { name: 'ÖKK', slug: 'oekk', adult2500: 'CHF 251.20', adult300: 'CHF 361.00', model: 'Casamed Hausarzt', rating: 4.8, highlight: 'Caisse de référence de Suisse orientale' },
      { name: 'Assura', slug: 'assura', adult2500: 'CHF 253.50', adult300: 'CHF 363.80', model: 'Qualimed (Médecin)', rating: 4.6, highlight: 'Tarif le plus bas pour les profils autonomes' },
      { name: 'CSS', slug: 'css', adult2500: 'CHF 269.00', adult300: 'CHF 380.50', model: 'Multimed', rating: 4.9, highlight: 'Partenaire du Kantonsspital St. Gallen (KSSG)' },
      { name: 'Concordia', slug: 'concordia', adult2500: 'CHF 273.40', adult300: 'CHF 385.00', model: 'myDoc (Médecin)', rating: 4.8, highlight: 'Offre très avantageuse pour les familles' },
      { name: 'Swica', slug: 'swica', adult2500: 'CHF 281.00', adult300: 'CHF 392.50', model: 'Favorit Telmed', rating: 4.9, highlight: 'Service client exceptionnel' }
    ],
    popularInsurers: ['ÖKK', 'CSS', 'Concordia', 'Swica', 'Helsana', 'Assura', 'KPT'],
    subsideAgency: 'SVA St. Gallen (Sozialversicherungsanstalt des Kantons St. Gallen)',
    subsideDescription: "La SVA St. Gallen gère les réductions individuelles de primes (IPV) pour les résidents saint-gallois de condition modeste.",
    subsideIncomeLimits: "Plafonds calculés sur la base de la décision de taxation fiscale cantonale.",
    subsideLink: 'https://svasg.ch/ipv',
    hospitals: ['Kantonsspital St. Gallen (KSSG)', 'Spital Linth (Uznach)', 'Spital Grabs', 'Spital Wil'],
    keyPoints: [
      "Grand canton de Suisse orientale avec 3 régions de primes distinctes.",
      "Présence historique forte d'ÖKK et du réseau médical cantonal KSSG.",
      "Économies de plus de CHF 1'300.-/an par adulte avec la franchise 2'500.",
      "Accès à des réseaux de médecins de famille très bien coordonnés (mediX säntis)."
    ],
    franchiseGuide: {
      intro: "À Saint-Gall, les primes modérées permettent d'optimiser facilement son coût de santé selon sa région de résidence.",
      recommendation300: "À choisir si vos soins annuels prévus dépassent CHF 1'650.-.",
      recommendation2500: "Idéale si vous êtes en bonne santé pour économiser plus de CHF 110.- par mois.",
      breakEvenPoint: "Seuil de rentabilité à environ CHF 1'650.- de soins par an."
    },
    modelsGuide: {
      telmedSavings: "12% à 18% d'économies",
      doctorFamilySavings: "10% à 14% de rabais",
      hmoSavings: "11% à 16% d'économies",
      localNetworks: ['mediX säntis', 'Hausarztnetzwerk St. Gallen', 'KSSG Partnernetzwerk']
    },
    faqs: [
      {
        question: "Quelle caisse maladie choisir à Saint-Gall et Rapperswil en 2026 ?",
        answer: "ÖKK, Assura, CSS et Concordia sont les caisses les plus recommandées à Saint-Gall pour leur rapport qualité-prix et leurs conventions directes avec le KSSG."
      },
      {
        question: "Comment sont réparties les 3 régions de primes du canton de Saint-Gall ?",
        answer: "La Région 1 comprend la Ville de Saint-Gall et Gossau. La Région 2 comprend Rapperswil-Jona, Wil et See-Gaster. La Région 3 comprend le Toggenbourg, le Rheintal et le Sarganserland, où les primes sont jusqu'à 6% plus basses."
      },
      {
        question: "Comment solliciter une réduction individuelle de primes (IPV) auprès de la SVA St. Gallen ?",
        answer: "La SVA St. Gallen évalue le droit à l'IPV automatiquement après réception des données fiscales. Les demandes de réexamen ou changements de situation financière peuvent être déposés sur svasg.ch/ipv."
      },
      {
        question: "Le Kantonsspital St. Gallen (KSSG) est-il pris en charge par l'assurance de base ?",
        answer: "Oui, le KSSG à Saint-Gall ainsi que les hôpitaux de Grabs, Uznach (Spital Linth) et Wil sont couverts en division commune par la LAMal de l'ensemble des assureurs maladie suisses."
      },
      {
        question: "Quels rabais peut-on obtenir avec les réseaux de médecins de famille mediX säntis ?",
        answer: "Les modèles de médecin de famille affiliés au réseau de soins coordonnés mediX säntis offrent des réductions de 10% à 16% sur les primes mensuelles."
      }
    ],
    metaDescription: "Assurance maladie Saint-Gall (SG) 2026 : Krankenkassenvergleich St. Gallen & Rapperswil. Primes officielles OFSP, caisses (ÖKK, CSS) et subsides SVA SG.",
    seoTitle: "Assurance Maladie Saint-Gall 2026 : Primes & Caisses (SG)",
    h1: "Assurance maladie dans le canton de Saint-Gall (SG) : comparatif officiel 2026",
    year: 2026,
    lastUpdated: 'Août 2026'
  },

  thurgovie: {
    code: 'TG',
    name: 'Thurgovie',
    slug: 'thurgovie',
    capital: 'Frauenfeld',
    languagePrimary: 'de',
    population: "288'000 habitants",
    communesCount: 80,
    mainCommunes: [
      { name: 'Frauenfeld', npa: '8500', description: 'Capitale cantonale et centre administratif' },
      { name: 'Kreuzlingen', npa: '8280', description: 'Plus grande ville du canton, au bord du lac de Constance' },
      { name: 'Arbon', npa: '9320', description: 'Cité historique et pôle industriel du lac' },
      { name: 'Amriswil', npa: '8580', description: 'Centre économique de l’Oberthurgau' },
      { name: 'Weinfelden', npa: '8570', description: 'Cœur du canton et siège parlementaire' },
      { name: 'Romanshorn', npa: '8590', description: 'Port lacustre et carrefour ferroviaire' }
    ],
    regionsCount: 2,
    regionsDescription: "Le canton de Thurgovie compte 2 régions de primes : Région 1 (Frauenfeld, Kreuzlingen et zones urbaines) et Région 2 (zones rurales du Seerücken et Thurtal).",
    avgAdultPremium300: 'CHF 350 – CHF 435 / mois',
    avgAdultPremium2500: 'CHF 240 – CHF 325 / mois',
    avgYoungPremium: 'CHF 230 – CHF 310 / mois',
    avgChildPremium: 'CHF 78 – CHF 118 / mois',
    cheapestInsurers: [
      { name: 'Assura', slug: 'assura', adult2500: 'CHF 242.00', adult300: 'CHF 352.40', model: 'Qualimed (Médecin)', rating: 4.6, highlight: 'Prime la plus économique du canton' },
      { name: 'CSS', slug: 'css', adult2500: 'CHF 256.00', adult300: 'CHF 367.50', model: 'Multimed', rating: 4.9, highlight: 'Partenariat avec Spital Thurgau AG' },
      { name: 'Concordia', slug: 'concordia', adult2500: 'CHF 259.80', adult300: 'CHF 371.00', model: 'myDoc (Médecin)', rating: 4.8, highlight: 'Forte présence régionale' },
      { name: 'Swica', slug: 'swica', adult2500: 'CHF 268.50', adult300: 'CHF 380.00', model: 'Favorit Telmed', rating: 4.9, highlight: 'Siège proche à Winterthour' },
      { name: 'Helsana', slug: 'helsana', adult2500: 'CHF 275.20', adult300: 'CHF 386.90', model: 'BeneFit PLUS Telmed', rating: 4.7, highlight: 'Conseil médical 24/7' }
    ],
    popularInsurers: ['CSS', 'Concordia', 'Swica', 'Helsana', 'Assura', 'KPT', 'ÖKK'],
    subsideAgency: 'SVTG (Sozialversicherungszentrum Thurgau)',
    subsideDescription: "Le SVTG à Frauenfeld gère les réductions individuelles de primes (IPV) pour les résidents thurgoviens.",
    subsideIncomeLimits: "Attribution selon la taxation fiscale du canton de Thurgovie.",
    subsideLink: 'https://svtg.ch/ipv',
    hospitals: ['Spital Thurgau (Kantonsspital Frauenfeld, Kantonsspital Münsterlingen)'],
    keyPoints: [
      "Primes parmi les plus avantageuses du nord-est de la Suisse.",
      "Prise en charge hospitalière d'excellence avec Spital Thurgau (Frauenfeld et Münsterlingen).",
      "Économies annuelles pouvant dépasser CHF 1'300.- par adulte.",
      "Modèles alternatifs très adoptés (DocNet Thurgau, mediX Thurgau)."
    ],
    franchiseGuide: {
      intro: "En Thurgovie, les primes modérées permettent d'économiser substantiellement sur son budget santé.",
      recommendation300: "À choisir si vos soins annuels prévus dépassent CHF 1'650.-.",
      recommendation2500: "Idéale si vous êtes en bonne santé pour payer moins de CHF 250.- par mois.",
      breakEvenPoint: "Seuil d'équilibre à environ CHF 1'650.- de soins par an."
    },
    modelsGuide: {
      telmedSavings: "12% à 18% d'économies",
      doctorFamilySavings: "10% à 14% de rabais",
      hmoSavings: "11% à 16% d'économies",
      localNetworks: ['DocNet Thurgau', 'mediX Thurgau', 'Hausarztnetzwerk Bodensee']
    },
    faqs: [
      {
        question: "Quelle caisse maladie choisir à Frauenfeld et Kreuzlingen en 2026 ?",
        answer: "Assura, CSS et Concordia sont les caisses les plus demandées en Thurgovie pour leur excellent compromis tarif/qualité de remboursement."
      },
      {
        question: "Comment fonctionnent les 2 régions de primes en Thurgovie ?",
        answer: "La Région 1 couvre Frauenfeld, Kreuzlingen et Arbon. La Région 2 comprend les districts plus ruraux du canton où les primes mensuelles sont légèrement plus basses."
      },
      {
        question: "Comment obtenir un subside d'assurance maladie (IPV) en Thurgovie auprès du SVTG ?",
        answer: "Le Sozialversicherungszentrum Thurgau (SVTG) examine d'office l'éligibilité à partir de la taxation fiscale. Les demandes peuvent être suivies et renouvelées en ligne sur svtg.ch/ipv."
      },
      {
        question: "Les hôpitaux de Frauenfeld et Münsterlingen sont-ils accessibles avec toutes les caisses ?",
        answer: "Oui, la société hospitalière Spital Thurgau AG (hôpitaux cantonaux de Frauenfeld et Münsterlingen) est conventionnée LAMal pour l'ensemble des assureurs de Suisse."
      },
      {
        question: "Comment changer de caisse maladie en Thurgovie avant le 30 novembre ?",
        answer: "La lettre recommandée de résiliation doit parvenir à votre assureur avant le 30 novembre à minuit pour garantir un changement effectif au 1er janvier."
      }
    ],
    metaDescription: "Assurance maladie Thurgovie (TG) 2026 : Krankenkassenvergleich Thurgau (Frauenfeld, Kreuzlingen). Primes officielles OFSP, caisses et subsides SVTG.",
    seoTitle: "Assurance Maladie Thurgovie 2026 : Primes & Caisses (TG)",
    h1: "Assurance maladie dans le canton de Thurgovie (TG) : comparatif officiel 2026",
    year: 2026,
    lastUpdated: 'Août 2026'
  },

  schaffhouse: {
    code: 'SH',
    name: 'Schaffhouse',
    slug: 'schaffhouse',
    capital: 'Schaffhouse',
    languagePrimary: 'de',
    population: "85'000 habitants",
    communesCount: 26,
    mainCommunes: [
      { name: 'Schaffhouse (Schaffhausen)', npa: '8200', description: 'Capitale cantonale et cité du Munot' },
      { name: 'Neuhausen am Rheinfall', npa: '8212', description: 'Site des célèbres chutes du Rhin' },
      { name: 'Thayngen', npa: '8240', description: 'Commune frontière du Reiat' },
      { name: 'Stein am Rhein', npa: '8260', description: 'Joyau médiéval au bord du lac Inférieur' },
      { name: 'Beringen', npa: '8222', description: 'Vallée du Klettgau' }
    ],
    regionsCount: 1,
    regionsDescription: "Le canton de Schaffhouse forme 1 région de primes unique au nord du Rhin.",
    avgAdultPremium300: 'CHF 380 – CHF 465 / mois',
    avgAdultPremium2500: 'CHF 270 – CHF 355 / mois',
    avgYoungPremium: 'CHF 255 – CHF 335 / mois',
    avgChildPremium: 'CHF 85 – CHF 126 / mois',
    cheapestInsurers: [
      { name: 'KPT', slug: 'kpt', adult2500: 'CHF 272.50', adult300: 'CHF 384.00', model: 'KPTwin.doc', rating: 4.8, highlight: 'Prime très compétitive dans le canton' },
      { name: 'Assura', slug: 'assura', adult2500: 'CHF 274.00', adult300: 'CHF 385.50', model: 'Qualimed (Médecin)', rating: 4.6, highlight: 'Tarif le plus bas pour franchise 2500' },
      { name: 'CSS', slug: 'css', adult2500: 'CHF 289.40', adult300: 'CHF 402.00', model: 'Multimed', rating: 4.9, highlight: 'Partenaire des Spitäler Schaffhausen' },
      { name: 'Swica', slug: 'swica', adult2500: 'CHF 295.00', adult300: 'CHF 408.00', model: 'Favorit Telmed', rating: 4.9, highlight: 'Service client haut de gamme' },
      { name: 'Helsana', slug: 'helsana', adult2500: 'CHF 302.80', adult300: 'CHF 415.50', model: 'BeneFit PLUS Telmed', rating: 4.7, highlight: 'Conseil de santé permanent' }
    ],
    popularInsurers: ['KPT', 'CSS', 'Swica', 'Helsana', 'Assura', 'Concordia'],
    subsideAgency: 'SVA Schaffhausen',
    subsideDescription: "La SVA Schaffhausen administre les réductions individuelles de primes (IPV) pour les résidents schaffhousois.",
    subsideIncomeLimits: "Évaluation sur la base des déclarations fiscales cantonales.",
    subsideLink: 'https://svash.ch/ipv',
    hospitals: ['Spitäler Schaffhausen (Kantonsspital Schaffhausen)'],
    keyPoints: [
      "Enclave suisse au nord du Rhin avec une région de primes unique.",
      "Prise en charge hospitalière de qualité aux Spitäler Schaffhausen.",
      "Économies annuelles atteignant CHF 1'350.- par adulte avec la franchise 2'500.",
      "Excellente couverture des réseaux médicaux MediX."
    ],
    franchiseGuide: {
      intro: "À Schaffhouse, le choix de franchise permet d'ajuster son coût selon sa fréquence de soins.",
      recommendation300: "À choisir si vos soins annuels prévus dépassent CHF 1'700.-.",
      recommendation2500: "Recommandée si vous êtes en bonne santé pour économiser plus de CHF 110.- par mois.",
      breakEvenPoint: "Seuil de rentabilité à environ CHF 1'700.- de soins par an."
    },
    modelsGuide: {
      telmedSavings: "12% à 18% d'économies",
      doctorFamilySavings: "10% à 14% de rabais",
      hmoSavings: "11% à 16% d'économies",
      localNetworks: ['mediX Schaffhausen', 'Hausärztenetzwerk Schaffhausen']
    },
    faqs: [
      {
        question: "Quelle caisse maladie choisir à Schaffhouse en 2026 ?",
        answer: "KPT, Assura et CSS offrent les meilleures primes LAMal à Schaffhouse et Neuhausen avec accès garanti au Kantonsspital Schaffhausen."
      },
      {
        question: "Comment solliciter une réduction individuelle de primes (IPV) à la SVA Schaffhausen ?",
        answer: "La SVA Schaffhausen transmet les propositions d'IPV d'après les données fiscales. Les demandes de révision peuvent être introduites sur svash.ch/ipv."
      },
      {
        question: "Le Kantonsspital Schaffhausen est-il affilié à toutes les caisses d'assurance maladie ?",
        answer: "Oui, les Spitäler Schaffhausen (Kantonsspital) garantissent l'accès en division commune pour l'ensemble des assureurs suisses de base."
      },
      {
        question: "Comment économiser sur sa prime d'assurance maladie à Schaffhouse ?",
        answer: "En combinant la franchise de CHF 2'500.- avec un modèle de médecin de famille ou de télémédecine (mediX Schaffhausen, KPTwin.doc), vous pouvez économiser jusqu'à CHF 1'350.- par an."
      }
    ],
    metaDescription: "Assurance maladie Schaffhouse (SH) 2026 : Krankenkassenvergleich Schaffhausen. Primes officielles OFSP, caisses (KPT, CSS, Swica) et subsides SVA SH.",
    seoTitle: "Assurance Maladie Schaffhouse 2026 : Primes & Caisses (SH)",
    h1: "Assurance maladie dans le canton de Schaffhouse (SH) : comparatif 2026",
    year: 2026,
    lastUpdated: 'Août 2026'
  },

  'appenzell-rhodes-exterieures': {
    code: 'AR',
    name: 'Appenzell Rhodes-Extérieures',
    slug: 'appenzell-rhodes-exterieures',
    capital: 'Herisau',
    languagePrimary: 'de',
    population: "56'000 habitants",
    communesCount: 20,
    mainCommunes: [
      { name: 'Herisau', npa: '9100', description: 'Chef-lieu et plus grande commune du canton' },
      { name: 'Teufen', npa: '9053', description: 'Commune résidentielle du Mittelland appenzellois' },
      { name: 'Heiden', npa: '9410', description: 'Vorderland et cité d’Henri Dunant' },
      { name: 'Speicher', npa: '9042', description: 'Commune résidentielle avec vue sur le Säntis' },
      { name: 'Gais', npa: '9056', description: 'Village thermal et carrefour des chemins appenzellois' }
    ],
    regionsCount: 1,
    regionsDescription: "Le demi-canton d'Appenzell Rhodes-Extérieures forme 1 région de primes unique avec des tarifs très modérés.",
    avgAdultPremium300: 'CHF 330 – CHF 410 / mois',
    avgAdultPremium2500: 'CHF 220 – CHF 300 / mois',
    avgYoungPremium: 'CHF 210 – CHF 285 / mois',
    avgChildPremium: 'CHF 72 – CHF 110 / mois',
    cheapestInsurers: [
      { name: 'ÖKK', slug: 'oekk', adult2500: 'CHF 222.00', adult300: 'CHF 332.50', model: 'Casamed Hausarzt', rating: 4.8, highlight: 'Caisse leader en région appenzelloise' },
      { name: 'Assura', slug: 'assura', adult2500: 'CHF 224.50', adult300: 'CHF 335.00', model: 'Qualimed (Médecin)', rating: 4.6, highlight: 'Prime la plus basse pour franchise 2500' },
      { name: 'CSS', slug: 'css', adult2500: 'CHF 235.80', adult300: 'CHF 346.20', model: 'Multimed', rating: 4.9, highlight: 'Partenariat avec SVAR Herisau' },
      { name: 'Concordia', slug: 'concordia', adult2500: 'CHF 239.00', adult300: 'CHF 349.50', model: 'myDoc (Médecin)', rating: 4.8, highlight: 'Excellente couverture familiale' },
      { name: 'Swica', slug: 'swica', adult2500: 'CHF 248.00', adult300: 'CHF 358.50', model: 'Favorit Telmed', rating: 4.9, highlight: 'Service client haut de gamme' }
    ],
    popularInsurers: ['ÖKK', 'CSS', 'Concordia', 'Swica', 'Helsana', 'Assura'],
    subsideAgency: 'SVA Appenzell Ausserrhoden',
    subsideDescription: "La SVA Appenzell Ausserrhoden à Herisau gère les réductions de primes maladie.",
    subsideIncomeLimits: "Attribution selon les barèmes fiscaux du canton.",
    subsideLink: 'https://sva-ar.ch/ipv',
    hospitals: ['Spitalverbund Appenzell Ausserrhoden (SVAR Herisau, Heiden)', 'KSSG St. Gallen'],
    keyPoints: [
      "Primes très avantageuses de Suisse orientale.",
      "Prise en charge hospitalière de proximité avec les sites du SVAR.",
      "Économies de plus de CHF 1'300.-/an par adulte avec la franchise 2'500.",
      "Partenariats médicaux avec le réseau mediX säntis."
    ],
    franchiseGuide: {
      intro: "En Appenzell Rhodes-Extérieures, la prime adulte avec franchise maximale descend sous la barre des CHF 225.-/mois.",
      recommendation300: "À choisir si vos soins annuels prévus dépassent CHF 1'640.-.",
      recommendation2500: "Recommandée si vous êtes en bonne santé pour payer moins de CHF 230.- par mois.",
      breakEvenPoint: "Seuil d'équilibre à environ CHF 1'640.- de soins par an."
    },
    modelsGuide: {
      telmedSavings: "12% à 18% d'économies",
      doctorFamilySavings: "10% à 14% de rabais",
      hmoSavings: "11% à 16% d'économies",
      localNetworks: ['mediX säntis', 'Hausärztenetzwerk Appenzell']
    },
    faqs: [
      {
        question: "Quelles caisses maladie choisir en Appenzell Rhodes-Extérieures ?",
        answer: "ÖKK, Assura, CSS et Concordia sont les caisses les plus recommandées pour les habitants d'Herisau, Teufen et Heiden."
      },
      {
        question: "Comment solliciter une réduction de prime (IPV) auprès de la SVA Appenzell Ausserrhoden ?",
        answer: "La SVA Appenzell Ausserrhoden à Herisau évalue les déclarations fiscales et transmet les attestations d'octroi. Consultez sva-ar.ch pour toute démarche."
      },
      {
        question: "Les hôpitaux du SVAR (Herisau, Heiden) sont-ils conventionnés LAMal ?",
        answer: "Oui, le Spitalverbund Appenzell Ausserrhoden (SVAR) assure les soins en division commune pour toutes les caisses d'assurance maladie de Suisse."
      },
      {
        question: "Comment changer de caisse maladie en Appenzell Rhodes-Extérieures ?",
        answer: "La résiliation écrite doit parvenir à votre assureur au plus tard le 30 novembre pour une affiliation au 1er janvier."
      }
    ],
    metaDescription: "Assurance maladie Appenzell Rhodes-Extérieures (AR) 2026 : Krankenkassenvergleich Herisau & Teufen. Primes officielles OFSP, caisses et subsides SVA AR.",
    seoTitle: "Assurance Maladie Appenzell Rhodes-Extérieures 2026 : Primes (AR)",
    h1: "Assurance maladie en Appenzell Rhodes-Extérieures (AR) : comparatif 2026",
    year: 2026,
    lastUpdated: 'Août 2026'
  },

  'appenzell-rhodes-interieures': {
    code: 'AI',
    name: 'Appenzell Rhodes-Intérieures',
    slug: 'appenzell-rhodes-interieures',
    capital: 'Appenzell',
    languagePrimary: 'de',
    population: "16'500 habitants",
    communesCount: 5,
    mainCommunes: [
      { name: 'Appenzell (Bezirk Appenzell)', npa: '9050', description: 'Chef-lieu et cœur traditionnel du canton' },
      { name: 'Schwende-Rüte', npa: '9057', description: 'District au pied du massif de l’Alpstein' },
      { name: 'Schlatt-Haslen', npa: '9050', description: 'District rural et agricole' },
      { name: 'Gonten', npa: '9108', description: 'Vallée verdoyante et thermalisme' },
      { name: 'Oberegg', npa: '9413', description: 'Enclave appenzelloise dans le Vorderland' }
    ],
    regionsCount: 1,
    regionsDescription: "Le demi-canton d'Appenzell Rhodes-Intérieures forme 1 région de primes unique. C'est historiquement le canton où les primes d'assurance maladie sont les moins chères de toute la Suisse.",
    avgAdultPremium300: 'CHF 265 – CHF 335 / mois',
    avgAdultPremium2500: 'CHF 155 – CHF 225 / mois',
    avgYoungPremium: 'CHF 145 – CHF 210 / mois',
    avgChildPremium: 'CHF 55 – CHF 85 / mois',
    cheapestInsurers: [
      { name: 'ÖKK', slug: 'oekk', adult2500: 'CHF 158.40', adult300: 'CHF 268.00', model: 'Casamed Hausarzt', rating: 4.8, highlight: 'Prime record la plus basse de Suisse' },
      { name: 'Assura', slug: 'assura', adult2500: 'CHF 161.00', adult300: 'CHF 270.50', model: 'Qualimed (Médecin)', rating: 4.6, highlight: 'Tarif discount exceptionnel' },
      { name: 'CSS', slug: 'css', adult2500: 'CHF 172.50', adult300: 'CHF 282.00', model: 'Multimed', rating: 4.9, highlight: 'Partenariat avec l’Appenzeller Kantonsspital' },
      { name: 'Concordia', slug: 'concordia', adult2500: 'CHF 176.00', adult300: 'CHF 286.00', model: 'myDoc (Médecin)', rating: 4.8, highlight: 'Excellente formule famille' },
      { name: 'Swica', slug: 'swica', adult2500: 'CHF 184.20', adult300: 'CHF 294.50', model: 'Favorit Telmed', rating: 4.9, highlight: 'Qualité de service n°1' }
    ],
    popularInsurers: ['ÖKK', 'CSS', 'Concordia', 'Swica', 'Helsana', 'Assura'],
    subsideAgency: 'Gesundheits- und Sozialdepartement Appenzell Innerrhoden',
    subsideDescription: "Le département de la santé et des affaires sociales gère les subsides de primes pour les ménages d'Appenzell Rhodes-Intérieures.",
    subsideIncomeLimits: "Octroi direct selon la taxation fiscale cantonale.",
    subsideLink: 'https://ai.ch',
    hospitals: ['Appenzeller Kantonsspital (Appenzell)', 'Kantonsspital St. Gallen (KSSG)'],
    keyPoints: [
      "Primes les moins chères de toute la Suisse (la prime adulte avec franchise 2'500 descend sous CHF 160.-/mois).",
      "Très faible taux d'hospitalisation et coût médical par habitant le plus bas du pays.",
      "Prise en charge médicale de qualité à l'Appenzeller Kantonsspital et au KSSG.",
      "Région de primes unique pour les 5 districts."
    ],
    franchiseGuide: {
      intro: "En Appenzell Rhodes-Intérieures, le coût de l'assurance est le plus faible de Suisse.",
      recommendation300: "À choisir si vos soins annuels prévus dépassent CHF 1'500.-.",
      recommendation2500: "Recommandée si vous êtes en bonne santé : la prime mensuelle descend sous CHF 160.- par mois.",
      breakEvenPoint: "Seuil d'équilibre à environ CHF 1'500.- de soins par an."
    },
    modelsGuide: {
      telmedSavings: "12% à 18% d'économies",
      doctorFamilySavings: "10% à 14% de rabais",
      hmoSavings: "10% à 15% d'économies",
      localNetworks: ['Hausärzte Appenzell', 'mediX säntis']
    },
    faqs: [
      {
        question: "Pourquoi l'assurance maladie est-elle la moins chère de Suisse en Appenzell Rhodes-Intérieures ?",
        answer: "Le canton d'Appenzell Rhodes-Intérieures affiche le coût de la santé par habitant le plus bas de la Confédération grâce à une faible densité d'actes médicaux superflus, une excellente hygiène de vie et un recours raisonné aux soins d'urgence."
      },
      {
        question: "Quelle est la prime mensuelle minimale à Appenzell en 2026 ?",
        answer: "Avec une prime mensuelle débutant à environ CHF 158.40 pour un adulte (franchise 2'500 et modèle médecin ÖKK / Assura), Appenzell Rhodes-Intérieures détient le record suisse du tarif le plus bas."
      },
      {
        question: "Comment sont pris en charge les soins hospitaliers à Appenzell ?",
        answer: "L'Appenzeller Kantonsspital et le KSSG de Saint-Gall assurent la couverture complète en division commune pour l'ensemble des assureurs de la LAMal."
      },
      {
        question: "Comment demander un subside d'assurance maladie à Appenzell Rhodes-Intérieures ?",
        answer: "Le Gesundheits- und Sozialdepartement à Appenzell traite directement les demandes selon le barème cantonal officiel disponible sur ai.ch."
      }
    ],
    metaDescription: "Assurance maladie Appenzell Rhodes-Intérieures (AI) 2026 : les primes les moins chères de Suisse dès CHF 158/mois. Krankenkassenvergleich Appenzell officiel.",
    seoTitle: "Assurance Maladie Appenzell Rhodes-Intérieures 2026 (AI)",
    h1: "Assurance maladie en Appenzell Rhodes-Intérieures (AI) : primes les plus basses 2026",
    year: 2026,
    lastUpdated: 'Août 2026'
  },

  glaris: {
    code: 'GL',
    name: 'Glaris',
    slug: 'glaris',
    capital: 'Glaris',
    languagePrimary: 'de',
    population: "41'000 habitants",
    communesCount: 3,
    mainCommunes: [
      { name: 'Glarus (Glaris-Centre)', npa: '8750', description: 'Capitale cantonale et siège de la Landsgemeinde' },
      { name: 'Glarus Nord (Näfels, Niederurnen)', npa: '8752 / 8754', description: 'Plus grande commune du canton, au bord du lac de Walenstadt' },
      { name: 'Glarus Süd (Schwanden, Linthal)', npa: '8762 / 8783', description: 'Plus grande commune de Suisse par la superficie' }
    ],
    regionsCount: 1,
    regionsDescription: "Le canton de Glaris forme 1 région de primes unique pour ses 3 grandes communes fusionnées.",
    avgAdultPremium300: 'CHF 340 – CHF 425 / mois',
    avgAdultPremium2500: 'CHF 230 – CHF 315 / mois',
    avgYoungPremium: 'CHF 220 – CHF 295 / mois',
    avgChildPremium: 'CHF 76 – CHF 115 / mois',
    cheapestInsurers: [
      { name: 'Assura', slug: 'assura', adult2500: 'CHF 232.00', adult300: 'CHF 342.50', model: 'Qualimed (Médecin)', rating: 4.6, highlight: 'Prime la plus accessible du canton' },
      { name: 'CSS', slug: 'css', adult2500: 'CHF 245.50', adult300: 'CHF 356.00', model: 'Multimed', rating: 4.9, highlight: 'Partenaire du Kantonsspital Glarus (KSGL)' },
      { name: 'Concordia', slug: 'concordia', adult2500: 'CHF 249.00', adult300: 'CHF 360.00', model: 'myDoc (Médecin)', rating: 4.8, highlight: 'Forte implantation locale' },
      { name: 'Swica', slug: 'swica', adult2500: 'CHF 258.00', adult300: 'CHF 369.50', model: 'Favorit Telmed', rating: 4.9, highlight: 'Excellente qualité de service' },
      { name: 'Helsana', slug: 'helsana', adult2500: 'CHF 265.20', adult300: 'CHF 376.80', model: 'BeneFit PLUS Telmed', rating: 4.7, highlight: 'Assistance médicale permanente' }
    ],
    popularInsurers: ['CSS', 'Concordia', 'Swica', 'Helsana', 'Assura', 'KPT'],
    subsideAgency: 'SVA Glarus',
    subsideDescription: "La SVA Glarus gère les réductions individuelles de primes (IPV) pour les ménages glaronais.",
    subsideIncomeLimits: "Octroi fondé sur la déclaration d'impôt glaronaise.",
    subsideLink: 'https://svaglarus.ch/ipv',
    hospitals: ['Kantonsspital Glarus (KSGL)'],
    keyPoints: [
      "Primes très modérées dans un canton aux 3 grandes communes fusionnées.",
      "Prise en charge hospitalière de qualité au Kantonsspital Glarus.",
      "Économies annuelles pouvant dépasser CHF 1'300.- par adulte avec la franchise 2'500.",
      "Modèles alternatifs simples et efficaces."
    ],
    franchiseGuide: {
      intro: "À Glaris, la prime mensuelle avec franchise maximale est très avantageuse.",
      recommendation300: "À choisir si vos soins annuels prévus dépassent CHF 1'640.-.",
      recommendation2500: "Recommandée si vous êtes en bonne santé pour payer moins de CHF 235.- par mois.",
      breakEvenPoint: "Seuil de rentabilité à environ CHF 1'640.- de soins par an."
    },
    modelsGuide: {
      telmedSavings: "12% à 18% d'économies",
      doctorFamilySavings: "10% à 14% de rabais",
      hmoSavings: "10% à 15% d'économies",
      localNetworks: ['Ärztenetzwerk Glarnerland', 'Hausärzte KSGL']
    },
    faqs: [
      {
        question: "Quelle caisse maladie choisir dans le canton de Glaris ?",
        answer: "Assura, CSS et Concordia sont les caisses les plus demandées à Glaris, Näfels et Schwanden pour leur excellent rapport prix/remboursement."
      },
      {
        question: "Comment solliciter l'IPV auprès de la SVA Glarus ?",
        answer: "La SVA Glarus examine la déclaration fiscale et notifie les bénéficiaires éligibles. Les demandes complémentaires peuvent être envoyées sur svaglarus.ch/ipv."
      },
      {
        question: "Le Kantonsspital Glarus (KSGL) est-il reconnu par l'assurance obligatoire ?",
        answer: "Oui, le KSGL est l'établissement hospitalier central du canton et prend en charge tous les assurés suisses en division commune."
      },
      {
        question: "Comment résilier son assurance maladie à Glaris avant le 30 novembre ?",
        answer: "Transmettez votre courrier recommandé avant le 30 novembre pour garantir le changement de caisse au 1er janvier."
      }
    ],
    metaDescription: "Assurance maladie Glaris (GL) 2026 : Krankenkassenvergleich Glarus (Glarus Nord, Süd). Primes officielles OFSP, caisses et subsides SVA GL.",
    seoTitle: "Assurance Maladie Glaris 2026 : Primes & Caisses Pas Chères (GL)",
    h1: "Assurance maladie dans le canton de Glaris (GL) : comparatif officiel 2026",
    year: 2026,
    lastUpdated: 'Août 2026'
  },

  grisons: {
    code: 'GR',
    name: 'Grisons',
    slug: 'grisons',
    capital: 'Coire',
    languagePrimary: 'bilingual',
    population: "203'000 habitants",
    communesCount: 101,
    mainCommunes: [
      { name: 'Coire (Chur)', npa: '7000', description: 'Capitale cantonale et plus ancienne ville de Suisse' },
      { name: 'Davos', npa: '7270', description: 'Station alpine internationale et pôle de recherche médicale' },
      { name: 'Saint-Moritz (St. Moritz)', npa: '7500', description: 'Joyau de la Haute-Engadine' },
      { name: 'Landquart', npa: '7302', description: 'Carrefour de la vallée du Rhin et siège d’ÖKK' },
      { name: 'Ilanz / Glion', npa: '7130', description: 'Première ville sur le Rhin et centre de la Surselva' },
      { name: 'Domat/Ems', npa: '7013', description: 'Pôle industriel et résidentiel' }
    ],
    regionsCount: 3,
    regionsDescription: "Le canton trilingue des Grisons compte 3 régions de primes : Région 1 (Coire et vallée du Rhin), Région 2 (régions touristiques : Davos, Engadine, Prättigau) et Région 3 (vallées périphériques : Surselva, Val Poschiavo, Val Bregaglia).",
    avgAdultPremium300: 'CHF 335 – CHF 415 / mois',
    avgAdultPremium2500: 'CHF 225 – CHF 305 / mois',
    avgYoungPremium: 'CHF 215 – CHF 290 / mois',
    avgChildPremium: 'CHF 75 – CHF 112 / mois',
    cheapestInsurers: [
      { name: 'ÖKK', slug: 'oekk', adult2500: 'CHF 226.50', adult300: 'CHF 336.80', model: 'Casamed Hausarzt', rating: 4.8, highlight: 'Siège principal à Landquart et caisse n°1 des Grisons' },
      { name: 'Aquilana', slug: 'aquilana', adult2500: 'CHF 228.00', adult300: 'CHF 338.20', model: 'CASAMED', rating: 4.7, highlight: 'Très bon positionnement tarifaire' },
      { name: 'Assura', slug: 'assura', adult2500: 'CHF 229.40', adult300: 'CHF 339.50', model: 'Qualimed (Médecin)', rating: 4.6, highlight: 'Prime accessible sur les 3 régions' },
      { name: 'CSS', slug: 'css', adult2500: 'CHF 242.00', adult300: 'CHF 352.50', model: 'Multimed', rating: 4.9, highlight: 'Convention avec le Kantonsspital Graubünden (KSGR)' },
      { name: 'Concordia', slug: 'concordia', adult2500: 'CHF 246.50', adult300: 'CHF 357.00', model: 'myDoc (Médecin)', rating: 4.8, highlight: 'Forte présence dans les vallées grisonnes' }
    ],
    popularInsurers: ['ÖKK', 'CSS', 'Concordia', 'Aquilana', 'Swica', 'Helsana', 'Assura'],
    subsideAgency: 'SVA Graubünden (Chur)',
    subsideDescription: "La SVA Graubünden à Coire gère les réductions individuelles de primes (IPV) pour les résidents des Grisons.",
    subsideIncomeLimits: "Évaluation automatisée sur la base de la déclaration fiscale cantonale.",
    subsideLink: 'https://sva.gr.ch/ipv',
    hospitals: ['Kantonsspital Graubünden (KSGR Chur)', 'Spital Davos', 'Spital Oberengadin (Samedan)', 'Regionalspital Surselva (Ilanz)'],
    keyPoints: [
      "Plus grand canton suisse par la superficie, avec 3 langues officielles (allemand, romanche, italien).",
      "Fief historique et siège de l'assureur ÖKK à Landquart.",
      "Trois régions de primes avec des tarifs parmi les plus avantageux de Suisse.",
      "Réseau hospitalier régional très dense (KSGR, Davos, Samedan, Ilanz)."
    ],
    franchiseGuide: {
      intro: "Aux Grisons, la faiblesse relative des primes rend l'optimisation de franchise très rentable.",
      recommendation300: "À choisir si vos soins annuels prévus dépassent CHF 1'650.-.",
      recommendation2500: "Idéale si vous êtes en bonne santé : la prime mensuelle descend sous les CHF 230.-.",
      breakEvenPoint: "Seuil de rentabilité à environ CHF 1'650.- de soins par an."
    },
    modelsGuide: {
      telmedSavings: "12% à 18% d'économies",
      doctorFamilySavings: "10% à 14% de rabais",
      hmoSavings: "11% à 16% d'économies",
      localNetworks: ['mediX grischuna', 'Ärzte-Netzwerk Graubünden', 'Hausärzte KSGR']
    },
    faqs: [
      {
        question: "Quelle est la caisse maladie la plus populaire dans les Grisons ?",
        answer: "ÖKK, dont le siège central est situé à Landquart, est l'assureur historique et le plus souscrit du canton des Grisons, suivi par CSS, Concordia et Aquilana."
      },
      {
        question: "Comment se découpent les 3 régions de primes dans les Grisons ?",
        answer: "La Région 1 comprend Coire et la vallée du Rhin. La Région 2 comprend Davos, la Haute-Engadine et le Prättigau. La Région 3 couvre la Surselva et les vallées du sud (Poschiavo, Bregaglia)."
      },
      {
        question: "Comment demander une réduction de prime (IPV) auprès de la SVA Graubünden ?",
        answer: "La SVA Graubünden à Coire transmet automatiquement les attestations aux ménages éligibles. Les demandes de réévaluation peuvent être faites sur sva.gr.ch/ipv."
      },
      {
        question: "Les hôpitaux de Coire (KSGR), Davos et Samedan sont-ils tous pris en charge ?",
        answer: "Oui, tous les hôpitaux de la liste hospitalière grisonne (KSGR Chur, Spital Davos, Spital Oberengadin Samedan, Regionalspital Surselva) sont couverts en division commune LAMal."
      },
      {
        question: "Quels sont les rabais offerts par les réseaux médicaux aux Grisons ?",
        answer: "En adhérant aux réseaux mediX grischuna ou Hausärzte KSGR via votre caisse, vous bénéficiez de 10% à 16% d'économies mensuelles sur vos primes."
      }
    ],
    metaDescription: "Assurance maladie Grisons (GR) 2026 : Krankenkassenvergleich Graubünden (Chur, Davos, St. Moritz). Primes officielles OFSP, caisses (ÖKK, CSS) et subsides SVA GR.",
    seoTitle: "Assurance Maladie Grisons 2026 : Primes & Caisses (GR)",
    h1: "Assurance maladie dans le canton des Grisons (GR) : comparatif officiel 2026",
    year: 2026,
    lastUpdated: 'Août 2026'
  },

  tessin: {
    code: 'TI',
    name: 'Tessin',
    slug: 'tessin',
    capital: 'Bellinzone',
    languagePrimary: 'it',
    population: "355'000 habitants",
    communesCount: 106,
    mainCommunes: [
      { name: 'Lugano', npa: '6900 - 6908', description: 'Capitale économique et financière du canton italophone' },
      { name: 'Bellinzone (Bellinzona)', npa: '6500', description: 'Capitale politique et cité des trois châteaux de l’UNESCO' },
      { name: 'Locarno', npa: '6600', description: 'Cité du Festival du film et rivage du lac Majeur' },
      { name: 'Mendrisio', npa: '6850', description: 'Pôle universitaire et centre du Mendrisiotto' },
      { name: 'Chiasso', npa: '6830', description: 'Porte sud de la Suisse et pôle frontière' },
      { name: 'Biasca', npa: '6710', description: 'Carrefour des Trois Vallées léventines' }
    ],
    regionsCount: 2,
    regionsDescription: "Le canton du Tessin compte 2 régions de primes : Région 1 (Sottoceneri : Lugano et Mendrisiotto) et Région 2 (Sopraceneri : Bellinzone, Locarno, Riviera, Léventine, Blenio, Vallemaggia).",
    avgAdultPremium300: 'CHF 445 – CHF 540 / mois',
    avgAdultPremium2500: 'CHF 335 – CHF 430 / mois',
    avgYoungPremium: 'CHF 295 – CHF 390 / mois',
    avgChildPremium: 'CHF 110 – CHF 155 / mois',
    cheapestInsurers: [
      { name: 'Assura', slug: 'assura', adult2500: 'CHF 336.80', adult300: 'CHF 448.20', model: 'Qualimed (Médecin)', rating: 4.6, highlight: 'Prime la plus économique du Tessin' },
      { name: 'CSS', slug: 'css', adult2500: 'CHF 352.00', adult300: 'CHF 464.50', model: 'Multimed', rating: 4.9, highlight: 'Partenariat direct avec l’EOC (Ente Ospedaliero Cantonale)' },
      { name: 'Groupe Mutuel', slug: 'groupe-mutuel', adult2500: 'CHF 358.40', adult300: 'CHF 470.00', model: 'PrimaTel (Telmed)', rating: 4.7, highlight: 'Forte présence au Tessin' },
      { name: 'Helsana', slug: 'helsana', adult2500: 'CHF 368.00', adult300: 'CHF 481.50', model: 'BeneFit PLUS Telmed', rating: 4.7, highlight: 'Service en langue italienne 24h/24' },
      { name: 'Swica', slug: 'swica', adult2500: 'CHF 375.20', adult300: 'CHF 488.90', model: 'Favorit Telmed', rating: 4.9, highlight: 'Service client d’excellence' }
    ],
    popularInsurers: ['CSS', 'Helsana', 'Groupe Mutuel', 'Swica', 'Assura', 'Sanitas', 'Concordia'],
    subsideAgency: 'IAS Ticino (Istituto delle assicurazioni sociali)',
    subsideDescription: "L'IAS Ticino à Bellinzone administre la réduction individuelle des primes (RIP - Riduzione individuale dei premi) pour les ménages résidant au Tessin.",
    subsideIncomeLimits: "Revenu déterminant calculé d'après les directives du Conseil d'État tessinois.",
    subsideLink: 'https://iasticino.ch/rip',
    hospitals: ['Ente Ospedaliero Cantonale (EOC - Ospedale Civico Lugano, San Giovanni Bellinzona, La Carità Locarno, Beata Vergine Mendrisio)', 'Clinica Luganese Moncucco'],
    keyPoints: [
      "Unique canton suisse de langue officielle 100% italienne.",
      "Primes plus élevées que la moyenne suisse en raison d'une structure démographique plus âgée et d'un recours fréquent aux spécialistes.",
      "Deux régions de primes avec des tarifs légèrement plus bas dans le Sopraceneri (Bellinzone/Locarno).",
      "Économies de plus de CHF 1'400.-/an par adulte en optimisant sa franchise."
    ],
    franchiseGuide: {
      intro: "Au Tessin, le coût élevé des primes rend le choix judicieux de la franchise déterminant pour le budget familial.",
      recommendation300: "À choisir si vos dépenses médicales annuelles dépassent CHF 1'750.-.",
      recommendation2500: "Recommandée si vous êtes en bonne santé pour économiser plus de CHF 110.- par mois.",
      breakEvenPoint: "Seuil d'équilibre à environ CHF 1'750.- de soins par an."
    },
    modelsGuide: {
      telmedSavings: "13% à 19% d'économies",
      doctorFamilySavings: "10% à 15% de rabais",
      hmoSavings: "12% à 17% d'économies",
      localNetworks: ['Rete medica Ticino', 'MediX Ticino', 'Rete dei medici EOC']
    },
    faqs: [
      {
        question: "Come scegliere la cassa malati più conveniente in Ticino nel 2026 ?",
        answer: "Assura, CSS e Groupe Mutuel offrono i premi più competitivi nel cantone Ticino per la franchigia 2'500 con modelli alternativi (medico di famiglia o telemedicina)."
      },
      {
        question: "Come richiedere la riduzione individuale dei premi (RIP) in Ticino presso l'IAS ?",
        answer: "L'Istituto delle assicurazioni sociali (IAS) a Bellinzona esamina i dati fiscali cantonali e invia una proposta agli aventi diritto. È possibile fare domanda online su iasticino.ch/rip."
      },
      {
        question: "Qual è la differenza di premio tra Sopraceneri e Sottoceneri ?",
        answer: "La Regione 1 (Sottoceneri: Lugano, Mendrisio) presenta premi leggermente superiori rispetto alla Regione 2 (Sopraceneri: Bellinzona, Locarno, Valli), dove il costo medio è di circa 4-6% inferiore."
      },
      {
        question: "Gli ospedali dell'Ente Ospedaliero Cantonale (EOC) sono coperti da tutte le casse malati ?",
        answer: "Sì, tutti gli stabilimenti pubblici dell'EOC (Civico e Italiano a Lugano, San Giovanni a Bellinzona, La Carità a Locarno, Beata Vergine a Mendrisio) sono accessibili con la LAMal di base in divisione comune."
      },
      {
        question: "Quali sono le regole per i frontalieri italiani in Ticino ?",
        answer: "I lavoratori frontalieri con permesso G possono esercitare il diritto di opzione formale entro 3 mesi dall'inizio dell'attività, scegliendo tra l'assicurazione sanitaria svizzera LAMal frontalieri e il Servizio Sanitario Nazionale italiano."
      }
    ],
    metaDescription: "Assurance maladie Tessin (TI) 2026 : comparez les primes officielles OFSP à Lugano, Bellinzone, Locarno. Casse malati e sussidi RIP.",
    seoTitle: "Assurance Maladie Tessin 2026 : Comparatif Primes & Caisses (TI)",
    h1: "Assurance maladie dans le canton du Tessin (TI) : comparatif officiel 2026",
    year: 2026,
    lastUpdated: 'Août 2026'
  }
};
