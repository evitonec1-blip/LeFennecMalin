/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CantonSEOData } from '../cantonTypes';

export const SUISSE_CENTRALE_CANTONS: Record<string, CantonSEOData> = {
  lucerne: {
    code: 'LU',
    name: 'Lucerne',
    slug: 'lucerne',
    capital: 'Lucerne',
    languagePrimary: 'de',
    population: "425'000 habitants",
    communesCount: 80,
    mainCommunes: [
      { name: 'Lucerne (Luzern)', npa: '6000 - 6006', description: 'Capitale cantonale et centre touristique mondial' },
      { name: 'Emmen', npa: '6020', description: 'Deuxième commune du canton, pôle industriel' },
      { name: 'Kriens', npa: '6010', description: 'Cité au pied du mont Pilate' },
      { name: 'Horw', npa: '6048', description: 'Commune résidentielle au bord du lac des Quatre-Cantons' },
      { name: 'Ebikon', npa: '6030', description: 'Pôle commercial du Rontal' },
      { name: 'Sursee', npa: '6210', description: 'Pôle urbain du lac de Sempach' }
    ],
    regionsCount: 2,
    regionsDescription: "Le canton de Lucerne est découpé en 2 régions de primes : Région 1 (agglomération lucernoise, Sursee) et Région 2 (Entlebuch, Willisau et zones rurales de Suisse centrale).",
    avgAdultPremium300: 'CHF 345 – CHF 430 / mois',
    avgAdultPremium2500: 'CHF 235 – CHF 320 / mois',
    avgYoungPremium: 'CHF 225 – CHF 305 / mois',
    avgChildPremium: 'CHF 75 – CHF 115 / mois',
    cheapestInsurers: [
      { name: 'CSS', slug: 'css', adult2500: 'CHF 238.40', adult300: 'CHF 348.00', model: 'Multimed', rating: 4.9, highlight: 'Siège historique à Lucerne et leadership absolu' },
      { name: 'Concordia', slug: 'concordia', adult2500: 'CHF 241.00', adult300: 'CHF 351.50', model: 'myDoc (Médecin)', rating: 4.8, highlight: 'Siège national à Lucerne et immense réseau d’agences' },
      { name: 'Assura', slug: 'assura', adult2500: 'CHF 243.80', adult300: 'CHF 354.20', model: 'Qualimed (Médecin)', rating: 4.6, highlight: 'Alternative très économique' },
      { name: 'Swica', slug: 'swica', adult2500: 'CHF 255.00', adult300: 'CHF 366.00', model: 'Favorit Telmed', rating: 4.9, highlight: 'Prestations de qualité et partenariats LUKS' },
      { name: 'Helsana', slug: 'helsana', adult2500: 'CHF 262.50', adult300: 'CHF 373.80', model: 'BeneFit PLUS Telmed', rating: 4.7, highlight: 'Modèle alternatif et conseil 24/7' }
    ],
    popularInsurers: ['CSS', 'Concordia', 'Swica', 'Helsana', 'Assura', 'Sanitas', 'Visana'],
    subsideAgency: 'WAS Luzern (Wirtschaft Arbeit Soziales - Ausgleichskasse Luzern)',
    subsideDescription: "WAS Luzern traite les demandes de réductions de primes (IPV) pour les personnes résidant dans le canton de Lucerne selon le barème officiel.",
    subsideIncomeLimits: "Évaluation sur la base des données fiscales cantonales transmises par l'administration des contributions.",
    subsideLink: 'https://was-luzern.ch/ipv',
    hospitals: ['Luzerner Kantonsspital (LUKS Luzern, Sursee, Wolhusen)', 'Hirslanden Klinik St. Anna'],
    keyPoints: [
      "Berceau et siège principal des deux plus grandes caisses d'assurance maladie de Suisse : CSS et Concordia.",
      "Primes parmi les plus douces de Suisse grâce à une maîtrise des coûts hospitaliers (LUKS).",
      "Économies annuelles pouvant dépasser CHF 1'300.- par adulte.",
      "Deux régions de primes avec des tarifs attractifs dans l'Entlebuch et le Seetal."
    ],
    franchiseGuide: {
      intro: "À Lucerne, la concurrence entre les assureurs locaux maintient des primes très attractives.",
      recommendation300: "À choisir si vos soins annuels prévus dépassent CHF 1'650.-.",
      recommendation2500: "Idéale si vous êtes en bonne santé pour payer moins de CHF 240.- par mois.",
      breakEvenPoint: "Seuil de basculement à environ CHF 1'650.- de soins par an."
    },
    modelsGuide: {
      telmedSavings: "12% à 18% d'économies",
      doctorFamilySavings: "10% à 15% de rabais",
      hmoSavings: "11% à 17% d'économies",
      localNetworks: ['mediX Luzern', 'Hausärztenetzwerk Luzern', 'LUKS Netzwerk']
    },
    faqs: [
      {
        question: "Pourquoi CSS et Concordia sont-elles si populaires à Lucerne ?",
        answer: "CSS et Concordia ont toutes deux leur siège principal à Lucerne depuis plus d'un siècle. Elles disposent du plus important maillage d'agences, de conseillers de proximité et de partenariats privilégiés avec le groupe hospitalier LUKS."
      },
      {
        question: "Comment faire une demande de subside d'assurance maladie à Lucerne auprès de WAS ?",
        answer: "WAS Luzern envoie une notification avec formulaire aux contribuables éligibles sur la base de la taxation fiscale. Les demandes d'octroi ou de révision peuvent être déposées directement en ligne sur le portail was-luzern.ch/ipv."
      },
      {
        question: "Comment sont réparties les 2 régions de primes du canton de Lucerne ?",
        answer: "La Région 1 comprend la Ville de Lucerne, Sursee, Emmen et Kriens, tandis que la Région 2 comprend les communes de l'Entlebuch et du Willisau avec des primes légèrement plus économiques."
      },
      {
        question: "Le Luzerner Kantonsspital (LUKS) est-il accessible avec n'importe quelle caisse maladie ?",
        answer: "Oui. Le Luzerner Kantonsspital (sites de Lucerne, Sursee et Wolhusen) fait partie de la liste hospitalière cantonale et est pris en charge en division commune par toutes les caisses LAMal de Suisse."
      },
      {
        question: "Quels rabais peut-on obtenir avec les modèles alternatifs à Lucerne ?",
        answer: "Les modèles Telmed ou médecin de famille (comme myDoc de Concordia ou Multimed de CSS) permettent de réaliser entre 10% et 18% d'économies mensuelles par rapport au modèle standard."
      }
    ],
    metaDescription: "Assurance maladie Lucerne (LU) 2026 : Krankenkassenvergleich Luzern & Sursee. Primes officielles OFSP, sièges CSS et Concordia, subsides WAS Luzern.",
    seoTitle: "Assurance Maladie Lucerne 2026 : Primes & Caisses Pas Chères (LU)",
    h1: "Assurance maladie dans le canton de Lucerne (LU) : comparatif 2026",
    year: 2026,
    lastUpdated: 'Août 2026'
  },

  zoug: {
    code: 'ZG',
    name: 'Zoug',
    slug: 'zoug',
    capital: 'Zoug',
    languagePrimary: 'de',
    population: "130'000 habitants",
    communesCount: 11,
    mainCommunes: [
      { name: 'Zoug (Zug)', npa: '6300', description: 'Capitale cantonale et place financière d’envergure internationale' },
      { name: 'Baar', npa: '6340', description: 'Plus grande commune du canton et pôle d’entreprises' },
      { name: 'Cham', npa: '6330', description: 'Cité au bord du lac de Zoug et site de l’AndreasKlinik' },
      { name: 'Risch-Rotkreuz', npa: '6343', description: 'Pôle technologique et universitaire (Crypto Valley)' },
      { name: 'Unterägeri', npa: '6314', description: 'Vallée d’Ägeri' },
      { name: 'Steinhausen', npa: '6312', description: 'Zone d’activités et résidentielle' }
    ],
    regionsCount: 1,
    regionsDescription: "Le canton de Zoug forme 1 région de primes unique. Grâce à un niveau de vie élevé et une gestion rigoureuse, Zoug bénéficie de primes parmi les plus basses de toute la Suisse alémanique.",
    avgAdultPremium300: 'CHF 315 – CHF 395 / mois',
    avgAdultPremium2500: 'CHF 205 – CHF 285 / mois',
    avgYoungPremium: 'CHF 195 – CHF 270 / mois',
    avgChildPremium: 'CHF 70 – CHF 105 / mois',
    cheapestInsurers: [
      { name: 'Assura', slug: 'assura', adult2500: 'CHF 208.50', adult300: 'CHF 318.00', model: 'Qualimed (Médecin)', rating: 4.6, highlight: 'Prime la plus basse du canton de Zoug' },
      { name: 'CSS', slug: 'css', adult2500: 'CHF 216.40', adult300: 'CHF 326.50', model: 'Multimed', rating: 4.9, highlight: 'Partenariat direct avec le Zuger Kantonsspital' },
      { name: 'Concordia', slug: 'concordia', adult2500: 'CHF 220.00', adult300: 'CHF 330.20', model: 'myDoc (Médecin)', rating: 4.8, highlight: 'Excellente prise en charge des familles' },
      { name: 'Swica', slug: 'swica', adult2500: 'CHF 228.90', adult300: 'CHF 339.00', model: 'Favorit Telmed', rating: 4.9, highlight: 'Qualité de service haut de gamme' },
      { name: 'Helsana', slug: 'helsana', adult2500: 'CHF 235.00', adult300: 'CHF 345.80', model: 'BeneFit PLUS Telmed', rating: 4.7, highlight: 'Application de suivi santé performante' }
    ],
    popularInsurers: ['CSS', 'Concordia', 'Swica', 'Helsana', 'Assura', 'Sanitas', 'KPT'],
    subsideAgency: 'Ausgleichskasse Zug (AK Zug)',
    subsideDescription: "L'Ausgleichskasse Zug gère les réductions de primes (Prämienverbilligung) pour les contribuables zougois éligibles.",
    subsideIncomeLimits: "Plafonds de revenus fixés par le Conseil d'État zougois.",
    subsideLink: 'https://zg.ch/ausgleichskasse',
    hospitals: ['Zuger Kantonsspital (Baar)', 'AndreasKlinik Cham Zug (Hirslanden)'],
    keyPoints: [
      "Primes parmi les plus basses de toute la Suisse aux côtés d'Appenzell et Nidwald.",
      "Fiscalité très douce combinée à des coûts de santé parmi les plus faibles du pays.",
      "Prime adulte avec franchise 2'500 descendant à peine au-dessus de CHF 200.-/mois.",
      "Région de primes unique pour les 11 communes du canton."
    ],
    franchiseGuide: {
      intro: "À Zoug, la faiblesse des primes permet de souscrire une excellente couverture pour un coût mensuel minime.",
      recommendation300: "À choisir si vos soins annuels prévus dépassent CHF 1'600.-.",
      recommendation2500: "Idéale si vous êtes en bonne santé : la prime mensuelle descend sous les CHF 210.-.",
      breakEvenPoint: "Seuil de basculement à environ CHF 1'600.- de soins par an."
    },
    modelsGuide: {
      telmedSavings: "12% à 18% d'économies",
      doctorFamilySavings: "10% à 14% de rabais",
      hmoSavings: "11% à 16% d'économies",
      localNetworks: ['Ärztenetz Zug', 'Hausärzte Zuger Kantonsspital']
    },
    faqs: [
      {
        question: "Pourquoi l'assurance maladie est-elle si bon marché à Zoug ?",
        answer: "Le canton de Zoug bénéficie d'une population active jeune, d'un niveau de vie élevé et d'une gestion hospitalière efficiente (Zuger Kantonsspital, AndreasKlinik), ce qui maintient les coûts de santé par habitant parmi les plus bas de Suisse."
      },
      {
        question: "Quelle caisse maladie choisir dans le canton de Zoug en 2026 ?",
        answer: "Assura, CSS et Concordia sont les caisses les plus recommandées à Zoug, combinant des primes sous les CHF 220.-/mois en franchise 2'500 et un accès direct aux meilleurs spécialistes du canton."
      },
      {
        question: "Comment solliciter une réduction individuelle de prime (IPV) auprès de l'AK Zug ?",
        answer: "L'Ausgleichskasse Zug procède à un examen automatique sur la base de la décision de taxation fiscale cantonale. Vous pouvez déposer une réclamation en ligne sur zg.ch/ausgleichskasse."
      },
      {
        question: "Le Zuger Kantonsspital de Baar est-il conventionné LAMal ?",
        answer: "Oui, le Zuger Kantonsspital situé à Baar accueille tous les patients affiliés à l'assurance de base obligatoire de n'importe quelle caisse suisse en division commune."
      },
      {
        question: "Comment changer d'assureur maladie à Zoug avant l'échéance du 30 novembre ?",
        answer: "Il suffit de résilier votre contrat actuel par courrier recommandé avant le 30 novembre pour adhérer à votre nouvel assureur dès le 1er janvier sans interruption de couverture."
      }
    ],
    metaDescription: "Assurance maladie Zoug (ZG) 2026 : Krankenkassenvergleich Zug & Baar. Primes les plus basses de Suisse, tarifs officiels OFSP et comparatif des caisses.",
    seoTitle: "Assurance Maladie Zoug 2026 : Primes les Moins Chères de Suisse (ZG)",
    h1: "Assurance maladie dans le canton de Zoug (ZG) : comparatif officiel 2026",
    year: 2026,
    lastUpdated: 'Août 2026'
  },

  schwyz: {
    code: 'SZ',
    name: 'Schwyz',
    slug: 'schwyz',
    capital: 'Schwyz',
    languagePrimary: 'de',
    population: "165'000 habitants",
    communesCount: 30,
    mainCommunes: [
      { name: 'Schwyz', npa: '6430', description: 'Capitale cantonale et berceau de la Confédération' },
      { name: 'Freienbach (Pfäffikon)', npa: '8807', description: 'Plus grande commune du canton, sur la rive du lac de Zurich' },
      { name: 'Einsiedeln', npa: '8840', description: 'Cité abbatiale et centre de Suisse centrale' },
      { name: 'Küssnacht am Rigi', npa: '6403', description: 'District au bord du lac des Quatre-Cantons' },
      { name: 'Wollerau', npa: '8832', description: 'Pôle économique des Höfe' },
      { name: 'Arth-Goldau', npa: '6415', description: 'Carrefour ferroviaire du Gothard' }
    ],
    regionsCount: 2,
    regionsDescription: "Le canton de Schwyz compte 2 régions de primes : Région 1 (Ausserschwyz / Höfe, Einsiedeln) et Région 2 (Innerschwyz / bassin de Schwyz et Küssnacht).",
    avgAdultPremium300: 'CHF 335 – CHF 415 / mois',
    avgAdultPremium2500: 'CHF 225 – CHF 305 / mois',
    avgYoungPremium: 'CHF 215 – CHF 290 / mois',
    avgChildPremium: 'CHF 74 – CHF 112 / mois',
    cheapestInsurers: [
      { name: 'Assura', slug: 'assura', adult2500: 'CHF 228.00', adult300: 'CHF 338.50', model: 'Qualimed (Médecin)', rating: 4.6, highlight: 'Prime la plus avantageuse du canton' },
      { name: 'CSS', slug: 'css', adult2500: 'CHF 235.60', adult300: 'CHF 346.00', model: 'Multimed', rating: 4.9, highlight: 'Convention avec les hôpitaux de Schwyz et Einsiedeln' },
      { name: 'Concordia', slug: 'concordia', adult2500: 'CHF 239.00', adult300: 'CHF 350.00', model: 'myDoc (Médecin)', rating: 4.8, highlight: 'Excellente formule famille' },
      { name: 'Swica', slug: 'swica', adult2500: 'CHF 248.50', adult300: 'CHF 359.20', model: 'Favorit Telmed', rating: 4.9, highlight: 'Qualité de service haut de gamme' },
      { name: 'Helsana', slug: 'helsana', adult2500: 'CHF 255.00', adult300: 'CHF 366.40', model: 'BeneFit PLUS Telmed', rating: 4.7, highlight: 'Conseil médical continu et app santé' }
    ],
    popularInsurers: ['CSS', 'Concordia', 'Swica', 'Helsana', 'Assura', 'Sanitas', 'Visana'],
    subsideAgency: 'Ausgleichskasse Schwyz',
    subsideDescription: "L'Ausgleichskasse Schwyz attribue les subsides de primes maladie aux ménages du canton selon les conditions légales.",
    subsideIncomeLimits: "Évaluation automatique basée sur la déclaration fiscale cantonale.",
    subsideLink: 'https://aksz.ch/praemienverbilligung',
    hospitals: ['Spital Schwyz', 'Spital Einsiedeln', 'Spital Lachen (Ausserschwyz)'],
    keyPoints: [
      "Primes très avantageuses associées à l'une des fiscalités les plus douces de Suisse.",
      "Trois hôpitaux régionaux modernes (Schwyz, Einsiedeln, Lachen).",
      "Économies de plus de CHF 1'300.-/an par adulte avec la franchise 2'500.",
      "Deux régions de primes avec des tarifs attractifs dans l'Innerschwyz."
    ],
    franchiseGuide: {
      intro: "À Schwyz, les primes modérées permettent de réaliser d'importantes économies annuelles.",
      recommendation300: "À choisir si vos soins annuels prévus dépassent CHF 1'650.-.",
      recommendation2500: "Recommandée si vous consultez peu pour payer moins de CHF 230.- par mois.",
      breakEvenPoint: "Seuil d'équilibre à environ CHF 1'650.- de soins par an."
    },
    modelsGuide: {
      telmedSavings: "12% à 18% d'économies",
      doctorFamilySavings: "10% à 14% de rabais",
      hmoSavings: "11% à 16% d'économies",
      localNetworks: ['Ärztenetz Schwyz', 'mediX linth', 'Hausarztnetzwerk Einsiedeln']
    },
    faqs: [
      {
        question: "Quelles sont les caisses maladie les plus avantageuses à Schwyz en 2026 ?",
        answer: "Assura, CSS et Concordia proposent les tarifs les plus compétitifs du canton de Schwyz, tant en Ausserschwyz (Freienbach, Pfäffikon) qu'en Innerschwyz."
      },
      {
        question: "Quelle différence entre les régions de primes 1 et 2 dans le canton de Schwyz ?",
        answer: "La Région 1 comprend les districts d'Ausserschwyz (Höfe, March, Einsiedeln) au contact de Zurich, tandis que la Région 2 regroupe les districts d'Innerschwyz (Schwyz, Küssnacht, Gersau) avec des primes légèrement inférieures."
      },
      {
        question: "Comment solliciter une réduction individuelle de primes auprès de l'AKSZ ?",
        answer: "L'Ausgleichskasse Schwyz (AKSZ) vérifie le droit à la réduction de prime lors du traitement de la taxation fiscale. Les demandes d'ajustement peuvent être introduites sur aksz.ch."
      },
      {
        question: "Les hôpitaux de Schwyz, Einsiedeln et Lachen sont-ils tous reconnus LAMal ?",
        answer: "Oui, les hôpitaux de Schwyz, d'Einsiedeln et de Lachen garantissent la couverture complète en division commune pour l'ensemble des assureurs maladie suisses."
      },
      {
        question: "Quels modèles alternatifs choisir dans le canton de Schwyz ?",
        answer: "Les modèles de médecin de famille affiliés aux réseaux Ärztenetz Schwyz ou mediX linth permettent d'économiser 10% à 16% sur sa prime annuelle."
      }
    ],
    metaDescription: "Assurance maladie Schwyz (SZ) 2026 : Krankenkassenvergleich Schwyz & Freienbach. Primes officielles OFSP, caisses agréées et subsides AKSZ.",
    seoTitle: "Assurance Maladie Schwyz 2026 : Comparatif Primes & Caisses (SZ)",
    h1: "Assurance maladie dans le canton de Schwyz (SZ) : comparatif officiel 2026",
    year: 2026,
    lastUpdated: 'Août 2026'
  },

  uri: {
    code: 'UR',
    name: 'Uri',
    slug: 'uri',
    capital: 'Altdorf',
    languagePrimary: 'de',
    population: "37'500 habitants",
    communesCount: 19,
    mainCommunes: [
      { name: 'Altdorf', npa: '6460', description: 'Capitale cantonale et cité de Guillaume Tell' },
      { name: 'Schattdorf', npa: '6467', description: 'Plus grande commune de la plaine uranaise' },
      { name: 'Erstfeld', npa: '6472', description: 'Porte nord du tunnel de base du Gothard' },
      { name: 'Flüelen', npa: '6454', description: 'Port lacustre au bord du lac des Quatre-Cantons' },
      { name: 'Andermatt', npa: '6490', description: 'Pôle touristique alpin et carrefour des cols' },
      { name: 'Bürglen', npa: '6463', description: 'Village natal de Guillaume Tell' }
    ],
    regionsCount: 1,
    regionsDescription: "Le canton d'Uri forme 1 région de primes unique. Les primes y sont historiquement très stables et parmi les plus modérées du pays.",
    avgAdultPremium300: 'CHF 310 – CHF 390 / mois',
    avgAdultPremium2500: 'CHF 200 – CHF 280 / mois',
    avgYoungPremium: 'CHF 190 – CHF 265 / mois',
    avgChildPremium: 'CHF 68 – CHF 104 / mois',
    cheapestInsurers: [
      { name: 'Assura', slug: 'assura', adult2500: 'CHF 204.00', adult300: 'CHF 314.00', model: 'Qualimed (Médecin)', rating: 4.6, highlight: 'Prime la plus basse du canton d’Uri' },
      { name: 'Concordia', slug: 'concordia', adult2500: 'CHF 211.50', adult300: 'CHF 321.80', model: 'myDoc (Médecin)', rating: 4.8, highlight: 'Caisse historique très implantée dans le canton' },
      { name: 'CSS', slug: 'css', adult2500: 'CHF 215.00', adult300: 'CHF 325.40', model: 'Multimed', rating: 4.9, highlight: 'Partenaire du Kantonsspital Uri' },
      { name: 'Swica', slug: 'swica', adult2500: 'CHF 224.20', adult300: 'CHF 334.80', model: 'Favorit Telmed', rating: 4.9, highlight: 'Excellente assistance santé continue' },
      { name: 'Helsana', slug: 'helsana', adult2500: 'CHF 231.00', adult300: 'CHF 341.50', model: 'BeneFit PLUS Telmed', rating: 4.7, highlight: 'Application mobile et conseils médicaux' }
    ],
    popularInsurers: ['Concordia', 'CSS', 'Swica', 'Helsana', 'Assura'],
    subsideAgency: 'Ausgleichskasse Uri',
    subsideDescription: "L'Ausgleichskasse Uri à Altdorf gère les réductions individuelles de primes d'assurance maladie.",
    subsideIncomeLimits: "Octroi basé sur la dernière déclaration d'impôt uranaise.",
    subsideLink: 'https://akuri.ch',
    hospitals: ['Kantonsspital Uri (Altdorf)'],
    keyPoints: [
      "Primes très stables et parmi les plus modérées de Suisse.",
      "Région de primes unique pour l'ensemble des 19 communes.",
      "Prise en charge hospitalière de proximité garantie par le nouveau Kantonsspital Uri à Altdorf.",
      "Économies de plus de CHF 1'300.-/an par adulte."
    ],
    franchiseGuide: {
      intro: "En Uri, la prime adulte avec franchise 2'500 descend sous la barre des CHF 210.-/mois.",
      recommendation300: "À choisir si vos soins annuels prévus dépassent CHF 1'600.-.",
      recommendation2500: "Idéale si vous êtes en bonne santé pour minimiser votre prime mensuelle.",
      breakEvenPoint: "Seuil de basculement à environ CHF 1'600.- de soins par an."
    },
    modelsGuide: {
      telmedSavings: "12% à 18% d'économies",
      doctorFamilySavings: "10% à 14% de rabais",
      hmoSavings: "10% à 15% d'économies",
      localNetworks: ['Ärztenetzwerk Uri', 'Hausärzte Kantonsspital Uri']
    },
    faqs: [
      {
        question: "Comment choisir sa caisse maladie dans le canton d'Uri ?",
        answer: "Concordia et CSS sont traditionnellement les caisses les plus implantées en Uri, mais Assura et Swica offrent également d'excellentes alternatives très économiques."
      },
      {
        question: "Comment fonctionne la réduction de prime (IPV) auprès de l'Ausgleichskasse Uri ?",
        answer: "L'Ausgleichskasse Uri à Altdorf calcule le droit à la réduction de prime à partir de la taxation fiscale cantonale. Les demandes particulières peuvent être faites sur akuri.ch."
      },
      {
        question: "Le Kantonsspital Uri à Altdorf est-il conventionné par toutes les caisses ?",
        answer: "Oui, le nouvel hôpital cantonal d'Uri à Altdorf offre des prestations complètes en division commune LAMal pour l'ensemble des assurés suisses."
      },
      {
        question: "Quand et comment changer d'assurance maladie en Uri ?",
        answer: "La notification de résiliation doit parvenir à votre assureur actuel au plus tard le 30 novembre. L'adhésion au nouvel assureur s'opère automatiquement au 1er janvier."
      }
    ],
    metaDescription: "Assurance maladie Uri (UR) 2026 : Krankenkassenvergleich Uri (Altdorf). Primes officielles OFSP, caisses agréées et subsides Ausgleichskasse Uri.",
    seoTitle: "Assurance Maladie Uri 2026 : Primes & Caisses Pas Chères (UR)",
    h1: "Assurance maladie dans le canton d'Uri (UR) : comparatif officiel 2026",
    year: 2026,
    lastUpdated: 'Août 2026'
  },

  obwald: {
    code: 'OW',
    name: 'Obwald',
    slug: 'obwald',
    capital: 'Sarnen',
    languagePrimary: 'de',
    population: "39'000 habitants",
    communesCount: 7,
    mainCommunes: [
      { name: 'Sarnen', npa: '6060', description: 'Capitale cantonale au bord du lac de Sarnen' },
      { name: 'Kerns', npa: '6064', description: 'Plus grande commune du canton par la superficie' },
      { name: 'Alpnach', npa: '6055', description: 'Pôle économique au pied du mont Pilate' },
      { name: 'Giswil', npa: '6074', description: 'Commune du col du Brünig' },
      { name: 'Engelberg', npa: '6390', description: 'Célèbre station de montagne et enclave obwaldienne' }
    ],
    regionsCount: 1,
    regionsDescription: "Le demi-canton d'Obwald forme 1 région de primes unique avec des tarifs très modérés.",
    avgAdultPremium300: 'CHF 320 – CHF 400 / mois',
    avgAdultPremium2500: 'CHF 210 – CHF 290 / mois',
    avgYoungPremium: 'CHF 200 – CHF 275 / mois',
    avgChildPremium: 'CHF 70 – CHF 106 / mois',
    cheapestInsurers: [
      { name: 'Assura', slug: 'assura', adult2500: 'CHF 212.00', adult300: 'CHF 322.00', model: 'Qualimed (Médecin)', rating: 4.6, highlight: 'Prime la plus basse du canton' },
      { name: 'Concordia', slug: 'concordia', adult2500: 'CHF 220.50', adult300: 'CHF 331.00', model: 'myDoc (Médecin)', rating: 4.8, highlight: 'Forte présence locale et couverture familiale' },
      { name: 'CSS', slug: 'css', adult2500: 'CHF 224.80', adult300: 'CHF 335.20', model: 'Multimed', rating: 4.9, highlight: 'Partenaire du Kantonsspital Obwalden' },
      { name: 'Swica', slug: 'swica', adult2500: 'CHF 233.00', adult300: 'CHF 344.00', model: 'Favorit Telmed', rating: 4.9, highlight: 'Excellente qualité de service' },
      { name: 'Helsana', slug: 'helsana', adult2500: 'CHF 240.20', adult300: 'CHF 351.00', model: 'BeneFit PLUS Telmed', rating: 4.7, highlight: 'Télémédecine 24h/24' }
    ],
    popularInsurers: ['Concordia', 'CSS', 'Swica', 'Helsana', 'Assura'],
    subsideAgency: 'Ausgleichskasse Obwalden',
    subsideDescription: "L'Ausgleichskasse Obwalden à Sarnen traite les demandes de réductions de primes maladie pour les résidents obwaldiens.",
    subsideIncomeLimits: "Calculé d'après les barèmes légaux du canton d'Obwald.",
    subsideLink: 'https://akow.ch',
    hospitals: ['Kantonsspital Obwalden (Sarnen)'],
    keyPoints: [
      "Primes très attractives de Suisse centrale.",
      "Région de primes unique pour les 7 communes.",
      "Partenariats médicaux avec le réseau hospitalier LUKS de Suisse centrale.",
      "Économies de plus de CHF 1'300.-/an par adulte."
    ],
    franchiseGuide: {
      intro: "À Obwald, la prime mensuelle avec franchise maximale est l'une des plus douces de Suisse.",
      recommendation300: "À choisir si vos soins annuels prévus dépassent CHF 1'620.-.",
      recommendation2500: "Idéale si vous êtes en bonne santé pour économiser plus de CHF 110.- par mois.",
      breakEvenPoint: "Seuil d'équilibre à environ CHF 1'620.- de soins par an."
    },
    modelsGuide: {
      telmedSavings: "12% à 18% d'économies",
      doctorFamilySavings: "10% à 14% de rabais",
      hmoSavings: "10% à 15% d'économies",
      localNetworks: ['Ärztenetz Unterwalden', 'Hausärztenetzwerk Obwalden']
    },
    faqs: [
      {
        question: "Comment choisir sa caisse d'assurance maladie à Obwald ?",
        answer: "Concordia, CSS et Assura offrent les meilleures prestations pour les assurés d'Obwald avec accès facilité au Kantonsspital Obwalden à Sarnen."
      },
      {
        question: "Comment déposer une demande de réduction de prime (IPV) à Obwald ?",
        answer: "L'Ausgleichskasse Obwalden à Sarnen analyse les déclarations fiscales cantonales. Si vos revenus ont diminué, déposez un dossier directement sur akow.ch."
      },
      {
        question: "Le Kantonsspital Obwalden à Sarnen est-il affilié à la LAMal ?",
        answer: "Oui, le Kantonsspital Obwalden garantit l'ensemble des soins hospitaliers et ambulatoires en division commune pour toutes les caisses d'assurance maladie suisses."
      },
      {
        question: "Comment fonctionne la franchise d'assurance maladie à Obwald ?",
        answer: "Vous pouvez opter pour une franchise allant de CHF 300.- à CHF 2'500.- par an. La franchise de CHF 2'500.- est optimale si vos frais médicaux annuels sont inférieurs à CHF 1'620.-."
      }
    ],
    metaDescription: "Assurance maladie Obwald (OW) 2026 : Krankenkassenvergleich Obwalden (Sarnen, Engelberg). Primes officielles OFSP, caisses et subsides.",
    seoTitle: "Assurance Maladie Obwald 2026 : Primes & Caisses Pas Chères (OW)",
    h1: "Assurance maladie dans le canton d'Obwald (OW) : comparatif officiel 2026",
    year: 2026,
    lastUpdated: 'Août 2026'
  },

  nidwald: {
    code: 'NW',
    name: 'Nidwald',
    slug: 'nidwald',
    capital: 'Stans',
    languagePrimary: 'de',
    population: "44'000 habitants",
    communesCount: 11,
    mainCommunes: [
      { name: 'Stans', npa: '6370', description: 'Capitale cantonale et centre économique' },
      { name: 'Hergiswil', npa: '6052', description: 'Cité au bord du lac des Quatre-Cantons' },
      { name: 'Buochs', npa: '6374', description: 'Commune riveraine du lac' },
      { name: 'Ennetbürgen', npa: '6373', description: 'Commune sur le flanc du Bürgenstock' },
      { name: 'Beckenried', npa: '6375', description: 'Port lacustre et station du Klewenalp' }
    ],
    regionsCount: 1,
    regionsDescription: "Le demi-canton de Nidwald forme 1 région de primes unique. Les primes y figurent parmi les plus basses de Suisse.",
    avgAdultPremium300: 'CHF 305 – CHF 385 / mois',
    avgAdultPremium2500: 'CHF 195 – CHF 275 / mois',
    avgYoungPremium: 'CHF 185 – CHF 260 / mois',
    avgChildPremium: 'CHF 68 – CHF 102 / mois',
    cheapestInsurers: [
      { name: 'Assura', slug: 'assura', adult2500: 'CHF 198.00', adult300: 'CHF 308.20', model: 'Qualimed (Médecin)', rating: 4.6, highlight: 'Prime la plus basse passant sous la barre des CHF 200.-' },
      { name: 'CSS', slug: 'css', adult2500: 'CHF 208.50', adult300: 'CHF 318.50', model: 'Multimed', rating: 4.9, highlight: 'Accès au Kantonsspital Nidwalden et LUKS' },
      { name: 'Concordia', slug: 'concordia', adult2500: 'CHF 212.00', adult300: 'CHF 322.00', model: 'myDoc (Médecin)', rating: 4.8, highlight: 'Très forte présence régionale' },
      { name: 'Swica', slug: 'swica', adult2500: 'CHF 220.40', adult300: 'CHF 330.80', model: 'Favorit Telmed', rating: 4.9, highlight: 'Service client haut de gamme' },
      { name: 'Helsana', slug: 'helsana', adult2500: 'CHF 227.00', adult300: 'CHF 337.50', model: 'BeneFit PLUS Telmed', rating: 4.7, highlight: 'Conseil médical permanent' }
    ],
    popularInsurers: ['CSS', 'Concordia', 'Swica', 'Helsana', 'Assura'],
    subsideAgency: 'Ausgleichskasse Nidwalden',
    subsideDescription: "L'Ausgleichskasse Nidwalden à Stans gère les réductions individuelles de primes d'assurance maladie pour le canton.",
    subsideIncomeLimits: "Octroi selon les barèmes fiscaux officiels du canton de Nidwald.",
    subsideLink: 'https://aknw.ch',
    hospitals: ['Kantonsspital Nidwalden (Stans - Spitalverbund LUKS)'],
    keyPoints: [
      "Primes parmi les plus basses de toute la Suisse (sous la barre des CHF 200.-/mois en franchise 2'500).",
      "Fiscalité très avantageuse et gestion efficace des dépenses de santé.",
      "Région de primes unique pour les 11 communes nidwaldiennes.",
      "Économies annuelles majeures avec les modèles alternatifs."
    ],
    franchiseGuide: {
      intro: "À Nidwald, les tarifs sont parmi les plus abordables de Suisse, ce qui rend l'assurance de base très économique.",
      recommendation300: "À choisir si vos soins annuels prévus dépassent CHF 1'580.-.",
      recommendation2500: "Recommandée si vous êtes en bonne santé pour passer sous les CHF 200.- par mois.",
      breakEvenPoint: "Seuil d'équilibre à environ CHF 1'580.- de soins par an."
    },
    modelsGuide: {
      telmedSavings: "12% à 18% d'économies",
      doctorFamilySavings: "10% à 14% de rabais",
      hmoSavings: "10% à 15% d'économies",
      localNetworks: ['Ärztenetz Unterwalden', 'LUKS Spitalverbund Netzwerk']
    },
    faqs: [
      {
        question: "Pourquoi l'assurance maladie est-elle si peu chère à Nidwald ?",
        answer: "Le canton de Nidwald profite d'une population à fort pouvoir d'achat, d'un faible taux de morbidité et d'une intégration hospitalière performante avec le réseau LUKS de Suisse centrale."
      },
      {
        question: "Quelle est la caisse maladie la moins chère à Nidwald en 2026 ?",
        answer: "Assura propose la prime adulte la plus basse du canton à CHF 198.-/mois avec franchise 2'500, suivie de CSS et Concordia avec une prise en charge complète au Kantonsspital Nidwalden."
      },
      {
        question: "Comment fonctionne la réduction de prime (IPV) auprès de l'Ausgleichskasse Nidwalden ?",
        answer: "L'Ausgleichskasse Nidwalden à Stans transmet directement une confirmation aux bénéficiaires d'après les données de taxation fiscale. Les demandes peuvent être soumises sur aknw.ch."
      },
      {
        question: "Comment changer de caisse d'assurance maladie à Nidwald ?",
        answer: "Envoyez une lettre recommandée de résiliation à votre caisse actuelle avant le 30 novembre pour démarrer avec votre nouvel assureur dès le 1er janvier."
      }
    ],
    metaDescription: "Assurance maladie Nidwald (NW) 2026 : Krankenkassenvergleich Nidwalden (Stans, Hergiswil). Primes sous les CHF 200/mois, caisses et subsides.",
    seoTitle: "Assurance Maladie Nidwald 2026 : Primes & Caisses Pas Chères (NW)",
    h1: "Assurance maladie dans le canton de Nidwald (NW) : comparatif officiel 2026",
    year: 2026,
    lastUpdated: 'Août 2026'
  }
};
