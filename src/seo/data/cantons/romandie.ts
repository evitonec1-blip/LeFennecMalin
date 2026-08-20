/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CantonSEOData } from '../cantonTypes';

export const ROMANDIE_CANTONS: Record<string, CantonSEOData> = {
  geneve: {
    code: 'GE',
    name: 'Genève',
    slug: 'geneve',
    capital: 'Genève',
    languagePrimary: 'fr',
    population: "520'000 habitants",
    communesCount: 45,
    mainCommunes: [
      { name: 'Genève-Ville', npa: '1200 - 1209', description: 'Centre urbain et Rive droite / Rive gauche' },
      { name: 'Carouge', npa: '1227', description: 'Cité sarde et zone dynamique du Grand Genève' },
      { name: 'Vernier', npa: '1214', description: 'Deuxième commune la plus peuplée du canton' },
      { name: 'Lancy', npa: '1212', description: 'Grand Lancy et Petit-Lancy (secteur Pont-Rouge)' },
      { name: 'Meyrin', npa: '1217', description: 'Pôle aéroportuaire et CERN' },
      { name: 'Onex', npa: '1213', description: 'Zone résidentielle de la Champagne' }
    ],
    regionsCount: 1,
    regionsDescription: "Le canton de Genève forme une région de primes unique (Région 1 / PR-REG CH0). Toutes les communes appliquent les mêmes barèmes de base LAMal, sans disparité géographique cantonale.",
    avgAdultPremium300: 'CHF 480 – CHF 565 / mois',
    avgAdultPremium2500: 'CHF 375 – CHF 445 / mois',
    avgYoungPremium: 'CHF 320 – CHF 410 / mois',
    avgChildPremium: 'CHF 115 – CHF 160 / mois',
    cheapestInsurers: [
      { name: 'Assura', slug: 'assura', adult2500: 'CHF 375.20', adult300: 'CHF 485.40', model: 'Qualimed (Médecin)', rating: 4.6, highlight: 'Prime la plus basse avec franchise 2500' },
      { name: 'Groupe Mutuel', slug: 'groupe-mutuel', adult2500: 'CHF 389.50', adult300: 'CHF 498.20', model: 'PrimaTel (Telmed)', rating: 4.7, highlight: 'Large réseau de télémédecine et centres HUG' },
      { name: 'KPT', slug: 'kpt', adult2500: 'CHF 398.10', adult300: 'CHF 505.80', model: 'KPTwin.doc', rating: 4.8, highlight: 'Excellente satisfaction client et portail en ligne' },
      { name: 'CSS', slug: 'css', adult2500: 'CHF 412.00', adult300: 'CHF 522.60', model: 'Multimed', rating: 4.9, highlight: 'Leader suisse avec application myCSS performante' },
      { name: 'Helsana', slug: 'helsana', adult2500: 'CHF 421.30', adult300: 'CHF 531.00', model: 'BeneFit PLUS Telmed', rating: 4.7, highlight: 'Couverture solide et service de conseil premium' }
    ],
    popularInsurers: ['Assura', 'Groupe Mutuel', 'CSS', 'Helsana', 'Swica', 'Concordia', 'KPT', 'Sanitas'],
    subsideAgency: "SAM (Service de l'assurance-maladie de Genève)",
    subsideDescription: "À Genève, le SAM octroie des subsides d'assurance-maladie aux assurés dont le Revenu Déterminant Unifié (RDU) ne dépasse pas les barèmes légaux fixés par le Conseil d'État.",
    subsideIncomeLimits: "Plafond RDU indicatif : env. CHF 45'000.- pour une personne seule et CHF 70'000.- pour un couple avec enfants.",
    subsideLink: 'https://www.ge.ch/subside-assurance-maladie',
    hospitals: ['Hôpitaux Universitaires de Genève (HUG)', 'Clinique des Grangettes', 'Hôpital de La Tour', 'Clinique Générale-Beaulieu'],
    keyPoints: [
      "Genève a l'une des primes moyennes les plus élevées de Suisse en raison de la densité médicale et des infrastructures universitaires.",
      "Une région de primes unique pour les 45 communes du canton.",
      "Potentiel d'économies supérieur à CHF 1'800.-/an par adulte en combinant franchise 2'500 et modèle Telmed.",
      "Réseaux de soins denses : Réseau Delta Genève, Réseau Magellan, cabinets de groupe HUG."
    ],
    franchiseGuide: {
      intro: "À Genève, où le coût de la santé est élevé, le choix de la franchise est stratégique pour amortir le coût mensuel des primes.",
      recommendation300: "Choisissez la franchise 300 si vos dépenses de santé annuelles dépassent CHF 1'800.- (traitements chroniques, consultations spécialisées régulières, maternité).",
      recommendation2500: "Choisissez la franchise 2'500 si vous êtes en bonne santé et consultez rarement. Vous économiserez jusqu'à CHF 1'540.- par an sur vos primes obligatoires.",
      breakEvenPoint: "Le seuil de rentabilité se situe exactement autour de CHF 1'800.- de factures médicales par an."
    },
    modelsGuide: {
      telmedSavings: "15% à 22% de réduction par rapport au modèle standard",
      doctorFamilySavings: "10% à 16% d'économies avec engagement du médecin traitant",
      hmoSavings: "15% à 20% de rabais via les centres de santé genevois",
      localNetworks: ['Réseau Delta Genève', 'Réseau Magellan', 'Centres médicaux HUG / Vidymed']
    },
    faqs: [
      {
        question: "Quelle est la caisse maladie la moins chère à Genève en 2026 ?",
        answer: "En 2026, Assura et Groupe Mutuel (PrimaTel) se disputent la première place des primes les plus basses à Genève pour les adultes avec franchise 2'500. KPT et CSS proposent également d'excellents rapports qualité-prix sur leurs modèles alternatifs Telmed et médecin de famille."
      },
      {
        question: "Combien coûte en moyenne une assurance maladie à Genève ?",
        answer: "Pour un adulte de 26 ans et plus à Genève, la prime moyenne se situe entre CHF 480 et CHF 565 par mois pour la franchise de base (300.-) et entre CHF 375 et CHF 445 par mois pour la franchise optimale (2'500.-) en modèle alternatif."
      },
      {
        question: "Comment obtenir un subside d'assurance maladie du SAM à Genève ?",
        answer: "Le Service de l'assurance-maladie (SAM) calcule automatiquement l'éligibilité pour la majorité des contribuables lors du traitement de la déclaration d'impôt. Si votre situation financière s'est dégradée (chômage, séparation, baisse de salaire), vous pouvez déposer une demande extraordinaire directement en ligne sur ge.ch."
      },
      {
        question: "Quand et comment changer de caisse maladie à Genève ?",
        answer: "Pour l'assurance de base LAMal, vous avez jusqu'au 30 novembre à minuit pour envoyer votre lettre de résiliation par courrier recommandé à votre caisse actuelle, afin que votre nouvelle assurance prenne effet au 1er janvier. Pour la franchise 300 standard, un changement en milieu d'année (au 30 juin) est également possible."
      },
      {
        question: "Tous les hôpitaux de Genève sont-ils couverts par la LAMal ?",
        answer: "Oui, les séjours en division commune aux Hôpitaux Universitaires de Genève (HUG) et dans les établissements publics conventionnés sont intégralement pris en charge par l'assurance de base LAMal, déduction faite de votre franchise et de la quote-part de 10%."
      }
    ],
    metaDescription: "Assurance maladie Genève 2026 : comparez les primes officielles OFSP des caisses (Assura, CSS, Mutuel, Helsana). Économisez jusqu'à CHF 1'800/an.",
    seoTitle: "Assurance Maladie Genève 2026 : Comparatif Primes & Caisses Pas Chères",
    h1: "Assurance maladie à Genève : primes et comparatif officiel 2026",
    year: 2026,
    lastUpdated: 'Août 2026'
  },

  vaud: {
    code: 'VD',
    name: 'Vaud',
    slug: 'vaud',
    capital: 'Lausanne',
    languagePrimary: 'fr',
    population: "830'000 habitants",
    communesCount: 300,
    mainCommunes: [
      { name: 'Lausanne', npa: '1000 - 1018', description: 'Capitale vaudoise et pôle universitaire CHUV' },
      { name: 'Yverdon-les-Bains', npa: '1400', description: 'Pôle du Nord vaudois et lac de Neuchâtel' },
      { name: 'Montreux', npa: '1820', description: 'Riviera vaudoise et région lémanique est' },
      { name: 'Nyon', npa: '1260', description: 'District de Nyon et région La Côte' },
      { name: 'Renens / Ouest lausannois', npa: '1020', description: 'District de l’Ouest lausannois en pleine expansion' },
      { name: 'Vevey', npa: '1800', description: 'Centre économique de la Riviera' },
      { name: 'Morges', npa: '1110', description: 'Chef-lieu de district lémanique' }
    ],
    regionsCount: 2,
    regionsDescription: "Le canton de Vaud est divisé en 2 régions de primes : la Région 1 (agglomération lausannoise, La Côte, Nyon, Morges, Riviera) et la Région 2 (Nord vaudois, Broye, Alpes vaudoises, Pays-d'Enhaut) où les primes sont légèrement plus abordables.",
    avgAdultPremium300: 'CHF 430 – CHF 530 / mois',
    avgAdultPremium2500: 'CHF 320 – CHF 415 / mois',
    avgYoungPremium: 'CHF 290 – CHF 380 / mois',
    avgChildPremium: 'CHF 100 – CHF 145 / mois',
    cheapestInsurers: [
      { name: 'Assura', slug: 'assura', adult2500: 'CHF 320.80', adult300: 'CHF 432.50', model: 'Qualimed (Médecin)', rating: 4.6, highlight: 'Tarif le plus bas en Région 1 et Région 2' },
      { name: 'Groupe Mutuel', slug: 'groupe-mutuel', adult2500: 'CHF 334.40', adult300: 'CHF 446.10', model: 'PrimaTel (Telmed)', rating: 4.7, highlight: 'Très fort ancrage local et partenariats CHUV/EHC' },
      { name: 'CSS', slug: 'css', adult2500: 'CHF 352.60', adult300: 'CHF 468.20', model: 'Multimed', rating: 4.9, highlight: 'Service client n°1 et coordination médicale' },
      { name: 'Helsana', slug: 'helsana', adult2500: 'CHF 361.00', adult300: 'CHF 475.40', model: 'BeneFit PLUS Telmed', rating: 4.7, highlight: 'Application mobile et conseil médical 24/7' },
      { name: 'Visana', slug: 'visana', adult2500: 'CHF 368.50', adult300: 'CHF 482.00', model: 'Med Direct', rating: 4.8, highlight: 'Prime compétitive avec réseau de médecins vaudois' }
    ],
    popularInsurers: ['Assura', 'CSS', 'Groupe Mutuel', 'Helsana', 'Visana', 'Swica', 'KPT', 'Sanitas'],
    subsideAgency: "OVAM (Office vaudois de l'assurance-maladie)",
    subsideDescription: "Dans le canton de Vaud, l'OVAM applique la loi sur le plafonnement des primes (LVLAMal) qui limite la charge de l'assurance maladie à un pourcentage plafonné (10% à 14%) du revenu déterminant du ménage.",
    subsideIncomeLimits: "Plafonnement selon revenu : les familles et personnes dont la prime dépasse 10% du revenu net bénéficient d'une prise en charge de la différence par l'OVAM.",
    subsideLink: 'https://www.vd.ch/themes/social/assurances/assurance-maladie/subsides-a-lassurance-maladie',
    hospitals: ['Centre Hospitalier Universitaire Vaudois (CHUV)', 'Ensemble Hospitalier de la Côte (EHC Morges)', 'Hôpital de Nyon (GHOL)', 'Hôpital Riviera-Chablais (HRC)', 'Établissements Hospitaliers du Nord Vaudois (eHnv)'],
    keyPoints: [
      "Deux régions de primes avec un différentiel tarifaire d'environ 5% à 8% entre Lausanne (R1) et la Broye/Nord vaudois (R2).",
      "Système de plafonnement des primes unique en Suisse garantissant l'accessibilité financière aux familles de condition moyenne.",
      "Offre médicale de pointe centrée sur le CHUV et des réseaux régionaux efficaces (Delta Vaud, Vidymed, Réseau Santé Haut-Léman).",
      "Gain moyen de CHF 1'400.- par adulte en optimisant franchise et modèle alternatif."
    ],
    franchiseGuide: {
      intro: "Dans le canton de Vaud, le choix de franchise doit être adapté à votre fréquence de consultations au CHUV ou auprès de votre médecin généraliste.",
      recommendation300: "Optez pour la franchise 300 si vos soins médicaux annuels prévus dépassent CHF 1'750.- (suivi régulier, maladies chroniques, hospitalisations prévues).",
      recommendation2500: "Choisissez la franchise 2'500 si vous consultez peu. Vous bénéficiez d'une économie mensuelle de plus de CHF 110.- sur votre prime LAMal.",
      breakEvenPoint: "Le seuil de basculement entre franchise minimale et maximale dans le canton de Vaud se situe à CHF 1'750.- de factures par an."
    },
    modelsGuide: {
      telmedSavings: "14% à 20% d'économies sur la prime de base",
      doctorFamilySavings: "10% à 15% de rabais avec suivi personnalisé",
      hmoSavings: "12% à 18% d'économies dans les centres de santé lausannois et régionaux",
      localNetworks: ['Réseau Delta Vaud', 'Vidymed Lausanne', 'Réseau Santé Haut-Léman', 'Réseau Santé La Côte']
    },
    faqs: [
      {
        question: "Quelle est la différence entre la Région 1 et la Région 2 dans le canton de Vaud ?",
        answer: "La Région 1 regroupe les districts du Centre et du Sud vaudois (Lausanne, Morges, Nyon, Riviera-Pays-d'Enhaut, Ouest lausannois) où les coûts médicaux sont plus élevés. La Région 2 (Aigle, Broye-Vully, Gros-de-Vaud, Jura-Nord vaudois) bénéficie de primes inférieures de 5% à 8% en moyenne."
      },
      {
        question: "Comment fonctionne le plafonnement vaudois des primes (LVLAMal) avec l'OVAM ?",
        answer: "La loi vaudoise LVLAMal garantit que la prime de base ne dépasse pas 10% à 14% du revenu déterminant du ménage. L'OVAM calcule ce droit sur la base de la décision de taxation fiscale et verse l'aide directement à votre assureur maladie."
      },
      {
        question: "Quelle caisse maladie choisir à Lausanne et dans le canton de Vaud en 2026 ?",
        answer: "Assura, Groupe Mutuel et CSS sont les caisses les plus compétitives et les plus souscrites dans le canton de Vaud. Pour un suivi avec un médecin traitant vaudois, les modèles Multimed (CSS), PrimaTel (Groupe Mutuel) ou Qualimed (Assura) offrent les meilleurs rapports coût/liberté de soins."
      },
      {
        question: "Puis-je changer d'assureur si je reçois un subside de l'OVAM ?",
        answer: "Oui, absolument ! Le subside de l'OVAM est calculé sur une prime de référence cantonale. En choisissant une caisse moins chère, vous diminuez le montant résiduel à votre charge et conservez plus de pouvoir d'achat."
      }
    ],
    metaDescription: "Assurance maladie Vaud (VD) 2026 : comparez les primes officielles à Lausanne, Nyon, Yverdon et Montreux. Régions 1 et 2, subsides OVAM, comparatif caisses.",
    seoTitle: "Assurance Maladie Vaud 2026 : Primes et Caisses les Moins Chères",
    h1: "Assurance maladie dans le canton de Vaud : comparatif et primes 2026",
    year: 2026,
    lastUpdated: 'Août 2026'
  },

  valais: {
    code: 'VS',
    name: 'Valais',
    slug: 'valais',
    capital: 'Sion',
    languagePrimary: 'bilingual',
    population: "355'000 habitants",
    communesCount: 122,
    mainCommunes: [
      { name: 'Sion', npa: '1950', description: 'Capitale cantonale du Valais central' },
      { name: 'Sierre', npa: '3960', description: 'Cité du Soleil et pôle de formation' },
      { name: 'Martigny', npa: '1920', description: 'Carrefour du Bas-Valais et siège du Groupe Mutuel' },
      { name: 'Monthey', npa: '1870', description: 'Pôle industriel et économique du Chablais valaisan' },
      { name: 'Brigue-Glis (Brig)', npa: '3900', description: 'Centre économique et ferroviaire du Haut-Valais' },
      { name: 'Viège (Visp)', npa: '3930', description: 'Pôle biochimique et industriel du Haut-Valais' }
    ],
    regionsCount: 2,
    regionsDescription: "Le canton du Valais compte 2 régions de primes : la Région 1 (principaux centres urbains de la plaine du Rhône) et la Région 2 (vallées latérales et zones alpines).",
    avgAdultPremium300: 'CHF 340 – CHF 420 / mois',
    avgAdultPremium2500: 'CHF 230 – CHF 310 / mois',
    avgYoungPremium: 'CHF 210 – CHF 290 / mois',
    avgChildPremium: 'CHF 75 – CHF 115 / mois',
    cheapestInsurers: [
      { name: 'Groupe Mutuel', slug: 'groupe-mutuel', adult2500: 'CHF 232.10', adult300: 'CHF 342.80', model: 'PrimaTel (Telmed)', rating: 4.8, highlight: 'Caisse historique valaisanne avec le plus vaste réseau local' },
      { name: 'Assura', slug: 'assura', adult2500: 'CHF 234.50', adult300: 'CHF 345.00', model: 'Qualimed (Médecin)', rating: 4.6, highlight: 'Primes discount très prisées dans le canton' },
      { name: 'Concordia', slug: 'concordia', adult2500: 'CHF 248.30', adult300: 'CHF 359.70', model: 'myDoc (Médecin de famille)', rating: 4.8, highlight: 'Forte implantation locale et excellent service famille' },
      { name: 'CSS', slug: 'css', adult2500: 'CHF 255.00', adult300: 'CHF 366.40', model: 'Multimed', rating: 4.9, highlight: 'Leader suisse avec accès simplifié aux hôpitaux valaisans' },
      { name: 'Helsana', slug: 'helsana', adult2500: 'CHF 262.40', adult300: 'CHF 373.90', model: 'BeneFit PLUS Telmed', rating: 4.7, highlight: 'Assistance médicale d’urgence 24h/24' }
    ],
    popularInsurers: ['Groupe Mutuel', 'Concordia', 'CSS', 'Assura', 'Helsana', 'Visana', 'Swica'],
    subsideAgency: 'CCVs (Caisse cantonale de compensation du Valais)',
    subsideDescription: "La CCVs à Sion gère les subsides cantonaux d'assurance maladie accordés aux contribuables valaisans selon leur revenu imposable et leur composition familiale.",
    subsideIncomeLimits: "Barème cantonal d'octroi : évalué à partir du revenu net et de la fortune selon les seuils du Conseil d'État valaisan.",
    subsideLink: 'https://www.vs.ch/web/sash/subside-assurance-maladie',
    hospitals: ['Hôpital du Valais (Sion, Sierre, Martigny, Viège)', 'Clinique Romande de Réadaptation (CRR Sion)', 'Hôpital Riviera-Chablais (Rennaz)'],
    keyPoints: [
      "Primes parmi les plus basses de toute la Suisse romande grâce à une maîtrise exemplaire des coûts de santé régionaux.",
      "Présence historique du Groupe Mutuel dont le siège central est établi à Martigny.",
      "Canton bilingue (français/allemand) avec prise en charge médicale coordonnée entre Valais romand et Haut-Valais.",
      "Tarifs très avantageux pour les enfants et les jeunes adultes (19-25 ans)."
    ],
    franchiseGuide: {
      intro: "En Valais, les primes modérées permettent d'optimiser facilement son budget de santé annuel selon ses besoins réels.",
      recommendation300: "La franchise 300 est conseillée si vous avez plus de CHF 1'600.- de soins programmés par an.",
      recommendation2500: "La franchise 2'500 est idéale pour les personnes en bonne santé : la prime mensuelle descend sous la barre des CHF 240.-/mois.",
      breakEvenPoint: "Le point d'équilibre financier en Valais se situe autour de CHF 1'600.- de factures médicales annuelles."
    },
    modelsGuide: {
      telmedSavings: "12% à 18% d'économies sur la prime de base",
      doctorFamilySavings: "10% à 14% de rabais avec le médecin de famille",
      hmoSavings: "10% à 15% dans les réseaux de soins régionaux",
      localNetworks: ['Réseau RéMI Valais', 'Réseau Santé Valais', 'Réseau Delta Valais']
    },
    faqs: [
      {
        question: "Pourquoi les primes d'assurance maladie sont-elles moins chères en Valais qu'à Genève ou Vaud ?",
        answer: "Le coût moyen des soins de santé par habitant en Valais est sensiblement inférieur à celui des cantons lémaniques, principalement en raison d'un taux de recours aux soins spécialisés plus modéré et d'une structure hospitalière cantonale optimisée."
      },
      {
        question: "Quelle est la caisse maladie la plus populaire en Valais ?",
        answer: "Le Groupe Mutuel, dont le siège est à Martigny, assure une grande proportion de la population valaisanne, aux côtés de Concordia et de la CSS qui disposent également de nombreuses agences régionales à Sion, Sierre et Brigue."
      },
      {
        question: "Comment faire une demande de subside d'assurance maladie en Valais auprès de la CCVs ?",
        answer: "La Caisse de compensation du canton du Valais (CCVs) notifie automatiquement les bénéficiaires sur la base de leur déclaration fiscale. En cas de changement de situation financière, un formulaire de demande extraordinaire est disponible sur le site officiel de l'État du Valais."
      }
    ],
    metaDescription: "Assurance maladie Valais (VS) 2026 : comparez les primes les plus basses de Suisse romande à Sion, Sierre, Martigny et Monthey. Primes officielles OFSP.",
    seoTitle: "Assurance Maladie Valais 2026 : Comparatif LAMal & Primes Moins Chères",
    h1: "Assurance maladie en Valais : primes et caisses maladie 2026",
    year: 2026,
    lastUpdated: 'Août 2026'
  },

  fribourg: {
    code: 'FR',
    name: 'Fribourg',
    slug: 'fribourg',
    capital: 'Fribourg',
    languagePrimary: 'bilingual',
    population: "335'000 habitants",
    communesCount: 126,
    mainCommunes: [
      { name: 'Fribourg (Freiburg)', npa: '1700', description: 'Capitale cantonale bilingue et pôle universitaire' },
      { name: 'Bulle', npa: '1630', description: 'Centre économique de la Gruyère en fort développement' },
      { name: 'Villars-sur-Glâne', npa: '1752', description: 'Commune majeure de l’agglomération fribourgeoise' },
      { name: 'Estavayer-le-Lac', npa: '1470', description: 'Chef-lieu de la Broye fribourgeoise au bord du lac' },
      { name: 'Morat (Murten)', npa: '3280', description: 'Chef-lieu bilingue du district du Lac' },
      { name: 'Châtel-Saint-Denis', npa: '1618', description: 'Porte de la Veveyse et proximité lémanique' }
    ],
    regionsCount: 2,
    regionsDescription: "Le canton de Fribourg comporte 2 régions de primes : la Région 1 (agglomération de Fribourg, Bulle, Veveyse) et la Région 2 (zones rurales de la Singine, Glâne, Broye).",
    avgAdultPremium300: 'CHF 390 – CHF 475 / mois',
    avgAdultPremium2500: 'CHF 280 – CHF 365 / mois',
    avgYoungPremium: 'CHF 260 – CHF 340 / mois',
    avgChildPremium: 'CHF 90 – CHF 130 / mois',
    cheapestInsurers: [
      { name: 'Concordia', slug: 'concordia', adult2500: 'CHF 282.40', adult300: 'CHF 394.10', model: 'myDoc (Médecin)', rating: 4.8, highlight: 'Caisse historique très implantée avec agences à Fribourg et Bulle' },
      { name: 'Assura', slug: 'assura', adult2500: 'CHF 284.00', adult300: 'CHF 395.80', model: 'Qualimed (Médecin)', rating: 4.6, highlight: 'Tarif le plus bas pour les jeunes adultes et assurés sans soins' },
      { name: 'Groupe Mutuel', slug: 'groupe-mutuel', adult2500: 'CHF 295.20', adult300: 'CHF 408.00', model: 'PrimaTel (Telmed)', rating: 4.7, highlight: 'Accès simple aux centres médicaux de la région' },
      { name: 'CSS', slug: 'css', adult2500: 'CHF 310.50', adult300: 'CHF 424.20', model: 'Multimed', rating: 4.9, highlight: 'Couverture globale et excellente gestion des sinistres' },
      { name: 'Helsana', slug: 'helsana', adult2500: 'CHF 318.90', adult300: 'CHF 431.50', model: 'BeneFit PLUS Telmed', rating: 4.7, highlight: 'Service de télémédecine et soutien bilingue FR/DE' }
    ],
    popularInsurers: ['Concordia', 'CSS', 'Groupe Mutuel', 'Assura', 'Helsana', 'Sanitas', 'Visana'],
    subsideAgency: "ECAS (Établissement cantonal des assurances sociales de Fribourg)",
    subsideDescription: "L'ECAS octroie les réductions individuelles de primes (RIP) aux assurés de condition modeste domiciliés dans le canton de Fribourg selon le barème cantonal officiel.",
    subsideIncomeLimits: "Revenu déterminant calculé selon la composition du ménage et la dernière taxation fiscale fribourgeoise.",
    subsideLink: 'https://www.ecasfr.ch/prestations/reduction-des-primes-d-assurance-maladie',
    hospitals: ['Hôpital Fribourgeois (HFR Fribourg, Riaz, Tafers, Meyriez)', 'Clinique Générale Ste-Anne', 'Daler Hospital'],
    keyPoints: [
      "Primes équilibrées et plus douces que sur l'arc lémanique.",
      "Canton bilingue (français/allemand) offrant une flexibilité totale dans le choix linguistique de son assureur.",
      "Présence forte des caisses historiques (Concordia, CSS, Groupe Mutuel) avec agences de proximité.",
      "Économies de plus de CHF 1'300.-/an en choisissant la franchise 2'500 et un modèle alternatif."
    ],
    franchiseGuide: {
      intro: "À Fribourg, évaluez vos dépenses médicales annuelles prévisibles pour déterminer la franchise optimale.",
      recommendation300: "Choisissez 300.- si vous anticipez plus de CHF 1'700.- de soins dans l'année.",
      recommendation2500: "Optez pour 2'500.- si vous êtes en bonne santé pour économiser plus de CHF 100.- chaque mois.",
      breakEvenPoint: "Seuil de bascule à environ CHF 1'700.- de soins par an."
    },
    modelsGuide: {
      telmedSavings: "12% à 18% d'économies",
      doctorFamilySavings: "10% à 15% de rabais",
      hmoSavings: "11% à 16% d'économies",
      localNetworks: ['Réseau MedNet Fribourg', 'Réseau Delta Fribourg', 'Réseau Santé Fribourgeois']
    },
    faqs: [
      {
        question: "Comment obtenir un subside d'assurance maladie (RIP) à Fribourg auprès de l'ECAS ?",
        answer: "L'ECAS traite les droits aux réductions individuelles de primes (RIP) sur la base des données fiscales transmises par le service cantonal des contributions. Vous recevez directement une décision d'octroi par courrier si vous remplissez les conditions."
      },
      {
        question: "Quelles sont les caisses maladie les plus avantageuses dans le canton de Fribourg en 2026 ?",
        answer: "Concordia, Assura et Groupe Mutuel figurent parmi les options les plus compétitives du canton de Fribourg, tant à Fribourg-Ville qu'en Gruyère (Bulle) ou dans la Broye."
      }
    ],
    metaDescription: "Assurance maladie Fribourg (FR) 2026 : comparez les primes officielles à Fribourg, Bulle, Estavayer et Morat. Tarifs OFSP, subsides ECAS et caisses agréées.",
    seoTitle: "Assurance Maladie Fribourg 2026 : Comparateur Primes & Caisses",
    h1: "Assurance maladie dans le canton de Fribourg : comparatif officiel 2026",
    year: 2026,
    lastUpdated: 'Août 2026'
  },

  neuchatel: {
    code: 'NE',
    name: 'Neuchâtel',
    slug: 'neuchatel',
    capital: 'Neuchâtel',
    languagePrimary: 'fr',
    population: "177'000 habitants",
    communesCount: 27,
    mainCommunes: [
      { name: 'Neuchâtel', npa: '2000', description: 'Chef-lieu cantonal, pôle universitaire et Littoral' },
      { name: 'La Chaux-de-Fonds', npa: '2300', description: 'Métropole horlogère des Montagnes neuchâteloises' },
      { name: 'Le Locle', npa: '2400', description: 'Cité horlogère inscrite à l’UNESCO' },
      { name: 'Val-de-Ruz', npa: '2053', description: 'Grande commune centrale du Val-de-Ruz' },
      { name: 'Val-de-Travers', npa: '2108', description: 'Commune du vallon de l’Absinthe et de l’Areuse' },
      { name: 'Saint-Blaise / Hauterive', npa: '2072', description: 'Littoral est neuchâtelois' }
    ],
    regionsCount: 1,
    regionsDescription: "Le canton de Neuchâtel constitue une région de primes unique (Région 1). Les mêmes barèmes LAMal s'appliquent sur le Littoral, dans le Val-de-Ruz et dans les Montagnes neuchâteloises.",
    avgAdultPremium300: 'CHF 440 – CHF 535 / mois',
    avgAdultPremium2500: 'CHF 330 – CHF 425 / mois',
    avgYoungPremium: 'CHF 295 – CHF 385 / mois',
    avgChildPremium: 'CHF 105 – CHF 150 / mois',
    cheapestInsurers: [
      { name: 'Assura', slug: 'assura', adult2500: 'CHF 332.10', adult300: 'CHF 445.00', model: 'Qualimed (Médecin)', rating: 4.6, highlight: 'Prime la plus économique pour les budgets serrés' },
      { name: 'Groupe Mutuel', slug: 'groupe-mutuel', adult2500: 'CHF 348.60', adult300: 'CHF 461.20', model: 'PrimaTel (Telmed)', rating: 4.7, highlight: 'Excellente couverture avec le Réseau Hospitalier Neuchâtelois' },
      { name: 'CSS', slug: 'css', adult2500: 'CHF 362.40', adult300: 'CHF 478.00', model: 'Multimed', rating: 4.9, highlight: 'Service client haut de gamme et app mobile réactive' },
      { name: 'Visana', slug: 'visana', adult2500: 'CHF 372.00', adult300: 'CHF 486.50', model: 'Med Direct', rating: 4.8, highlight: 'Partenariats solides avec les médecins du Littoral et des Montagnes' },
      { name: 'Helsana', slug: 'helsana', adult2500: 'CHF 379.80', adult300: 'CHF 494.30', model: 'BeneFit PLUS Telmed', rating: 4.7, highlight: 'Conseil santé 24/7 et modèle alternatif éprouvé' }
    ],
    popularInsurers: ['Assura', 'CSS', 'Groupe Mutuel', 'Visana', 'Helsana', 'Swica', 'KPT'],
    subsideAgency: 'OCAS (Office cantonal des assurances sociales de Neuchâtel)',
    subsideDescription: "L'OCAS administre l'octroi des subsides d'assurance maladie dans le canton de Neuchâtel pour limiter le poids des primes sur le budget des ménages neuchâtelois.",
    subsideIncomeLimits: "Attribution selon les barèmes cantonaux fixés par l'État de Neuchâtel en fonction du revenu net déterminant.",
    subsideLink: 'https://www.ocas-ne.ch/prestations/subsides-assurance-maladie/',
    hospitals: ['Réseau Hospitalier Neuchâtelois (RHNe Pourtalès, La Chaux-de-Fonds, Val-de-Ruz)', 'Clinique Montbrillant', 'Hôpital de La Béroche'],
    keyPoints: [
      "Région de primes 1 unique pour l'ensemble du territoire neuchâtelois (Littoral, Val-de-Ruz et Montagnes).",
      "Prime moyenne plus élevée que dans le Jura ou le Valais, rendant l'optimisation de franchise indispensable.",
      "Coordination médicale assurée par le Réseau Hospitalier Neuchâtelois (RHNe).",
      "Économies annuelles atteignant jusqu'à CHF 1'500.- par adulte."
    ],
    franchiseGuide: {
      intro: "À Neuchâtel, le choix judicieux de votre franchise permet d'absorber une partie importante de la hausse des coûts de la santé.",
      recommendation300: "Privilégiez la franchise 300 si vos dépenses médicales dépassent CHF 1'750.- par an.",
      recommendation2500: "Choisissez la franchise 2'500 si vous êtes rarement malade pour économiser plus de CHF 110.- par mois.",
      breakEvenPoint: "Seuil d'équilibre à environ CHF 1'750.- de soins par an."
    },
    modelsGuide: {
      telmedSavings: "14% à 20% d'économies",
      doctorFamilySavings: "10% à 15% de rabais",
      hmoSavings: "12% à 17% d'économies",
      localNetworks: ['Réseau Médical Neuchâtelois', 'Réseau Delta Neuchâtel', 'Réseau de soins RHNe']
    },
    faqs: [
      {
        question: "Comment faire baisser sa prime d'assurance maladie dans le canton de Neuchâtel ?",
        answer: "Pour réduire votre facture à Neuchâtel : 1) Passez à la franchise maximale (2'500.-) si votre état de santé le permet ; 2) Choisissez un modèle Telmed ou Médecin de famille ; 3) Excluez la couverture accident si vous êtes salarié plus de 8 heures par semaine ; 4) Vérifiez votre éligibilité aux subsides OCAS."
      },
      {
        question: "Quelle est la caisse maladie la moins chère à Neuchâtel en 2026 ?",
        answer: "Assura et Groupe Mutuel proposent les primes les plus compétitives du canton de Neuchâtel en 2026 pour les modèles alternatifs avec franchise 2'500, suivis par CSS et Visana."
      }
    ],
    metaDescription: "Assurance maladie Neuchâtel (NE) 2026 : comparez les primes officielles à Neuchâtel et La Chaux-de-Fonds. Tarifs OFSP, subsides OCAS et caisses pas chères.",
    seoTitle: "Assurance Maladie Neuchâtel 2026 : Comparatif & Primes LAMal",
    h1: "Assurance maladie dans le canton de Neuchâtel : comparatif 2026",
    year: 2026,
    lastUpdated: 'Août 2026'
  },

  jura: {
    code: 'JU',
    name: 'Jura',
    slug: 'jura',
    capital: 'Delémont',
    languagePrimary: 'fr',
    population: "74'000 habitants",
    communesCount: 50,
    mainCommunes: [
      { name: 'Delémont', npa: '2800', description: 'Capitale jurassienne et carrefour de la vallée' },
      { name: 'Porrentruy', npa: '2900', description: 'Chef-lieu d’Ajoie et cité des Princes-Évêques' },
      { name: 'Saignelégier', npa: '2350', description: 'Chef-lieu des Franches-Montagnes et plateau équestre' },
      { name: 'Bassecourt (Haute-Sorne)', npa: '2854', description: 'Commune industrielle et résidentielle de la vallée' },
      { name: 'Courroux', npa: '2830', description: 'Commune de la couronne delémontaine' }
    ],
    regionsCount: 1,
    regionsDescription: "Le canton du Jura forme 1 région de primes unique (Région 1). Les barèmes LAMal sont identiques à Delémont, Porrentruy et dans les Franches-Montagnes.",
    avgAdultPremium300: 'CHF 380 – CHF 465 / mois',
    avgAdultPremium2500: 'CHF 270 – CHF 355 / mois',
    avgYoungPremium: 'CHF 245 – CHF 325 / mois',
    avgChildPremium: 'CHF 85 – CHF 125 / mois',
    cheapestInsurers: [
      { name: 'Assura', slug: 'assura', adult2500: 'CHF 271.80', adult300: 'CHF 383.50', model: 'Qualimed (Médecin)', rating: 4.6, highlight: 'Prime la plus accessible du canton du Jura' },
      { name: 'CSS', slug: 'css', adult2500: 'CHF 288.90', adult300: 'CHF 402.00', model: 'Multimed', rating: 4.9, highlight: 'Très forte présence avec agences à Delémont et Porrentruy' },
      { name: 'Groupe Mutuel', slug: 'groupe-mutuel', adult2500: 'CHF 292.00', adult300: 'CHF 405.40', model: 'PrimaTel (Telmed)', rating: 4.7, highlight: 'Service de santé digitalisé et partenaires H-JU' },
      { name: 'Concordia', slug: 'concordia', adult2500: 'CHF 298.50', adult300: 'CHF 411.20', model: 'myDoc (Médecin de famille)', rating: 4.8, highlight: 'Offre très avantageuse pour les familles jurassiennes' },
      { name: 'Helsana', slug: 'helsana', adult2500: 'CHF 306.40', adult300: 'CHF 419.00', model: 'BeneFit PLUS Telmed', rating: 4.7, highlight: 'Application de santé et télémédecine 24/7' }
    ],
    popularInsurers: ['CSS', 'Groupe Mutuel', 'Assura', 'Concordia', 'Helsana', 'Visana', 'Swica'],
    subsideAgency: 'CAJU (Caisse de compensation du canton du Jura)',
    subsideDescription: "La CAJU à Delémont gère les subsides individuels à l'assurance-maladie pour les contribuables jurassiens de condition modeste.",
    subsideIncomeLimits: "Revenu déterminant calculé selon les directives de l'Office de la santé du canton du Jura.",
    subsideLink: 'https://www.caju.ch/assurance-maladie/reduction-des-primes',
    hospitals: ['Hôpital du Jura (H-JU Delémont, Porrentruy, Saignelégier)'],
    keyPoints: [
      "Primes parmi les plus modérées de Suisse romande.",
      "Une région de primes unique pour les 50 communes jurassiennes.",
      "Couverture hospitalière de proximité garantie par l'Hôpital du Jura (H-JU).",
      "Économies de plus de CHF 1'300.-/an par adulte avec la franchise 2'500."
    ],
    franchiseGuide: {
      intro: "Dans le Jura, la franchise 2'500 permet d'obtenir des primes particulièrement attractives sous les CHF 280.-/mois.",
      recommendation300: "À choisir si vos soins annuels prévus dépassent CHF 1'700.-.",
      recommendation2500: "Recommandée si vous êtes en bonne santé pour économiser plus de CHF 110.- par mois.",
      breakEvenPoint: "Seuil de rentabilité à environ CHF 1'700.- de factures par an."
    },
    modelsGuide: {
      telmedSavings: "12% à 18% d'économies",
      doctorFamilySavings: "10% à 14% de rabais",
      hmoSavings: "10% à 15% d'économies",
      localNetworks: ['Réseau Médical Jurassien', 'Réseau Delta Jura']
    },
    faqs: [
      {
        question: "Comment choisir sa caisse maladie dans le Jura ?",
        answer: "Comme toutes les caisses remboursent exactement les mêmes prestations LAMal, privilégiez le tarif le plus bas et vérifiez que votre médecin traitant jurassien est conventionné si vous optez pour un modèle alternatif."
      },
      {
        question: "Comment demander un subside d'assurance maladie dans le Jura auprès de la CAJU ?",
        answer: "La CAJU procède à l'examen d'office du droit aux subsides dès réception de la taxation fiscale. Si votre situation a changé, vous pouvez remplir un formulaire de réexamen sur caju.ch."
      }
    ],
    metaDescription: "Assurance maladie Jura (JU) 2026 : comparez les primes officielles à Delémont, Porrentruy et Saignelégier. Caisses agréées, subsides CAJU et simulateur.",
    seoTitle: "Assurance Maladie Jura 2026 : Primes LAMal & Caisses Delémont",
    h1: "Assurance maladie dans le canton du Jura : comparatif officiel 2026",
    year: 2026,
    lastUpdated: 'Août 2026'
  }
};
