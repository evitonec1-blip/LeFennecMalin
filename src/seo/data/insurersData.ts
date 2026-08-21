/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface InsurerIndicativePremium {
  canton: string;
  cantonName: string;
  adult300: number;
  adult2500: number;
  youngAdult300: number;
  child0: number;
}

export interface InsurerCareModel {
  type: 'standard' | 'telmed' | 'medecin-famille' | 'hmo' | 'bonus';
  name: string;
  discount: string;
  firstContact: string;
  emergencyRule: string;
  pharmacyNetwork: string;
  pros: string[];
}

export interface InsurerLCACategory {
  title: string;
  products: string[];
  description: string;
  maxCoverage: string;
}

export interface InsurerCompetitorComparison {
  competitorName: string;
  competitorSlug: string;
  keyDifference: string;
  priceComparison: string;
  targetAudience: string;
}

export interface InsurerSwitchingTips {
  deadline: string;
  address: string;
  advice: string[];
}

export interface InsurerSEOData {
  id: string;
  name: string;
  slug: string;
  brandColor: string;
  headquarters: string;
  cantonHq: string;
  foundedYear: number;
  membersCount: string;
  bagRegistration: string;
  satisfactionRating: number; // Swiss satisfaction score out of 6.0
  stars: number;
  marketShare: string;
  evolution2026: string;
  reservesRatio: string;
  reimbursementSpeed: string;
  appRating: {
    appStore: number;
    googlePlay: number;
    name: string;
  };
  tagline: string;
  overview: string;
  historyAndGovernance: string;
  indicativePremiums2026: InsurerIndicativePremium[];
  lamalModels: {
    name: string;
    discountPercent: string;
    description: string;
  }[];
  alternativeCareModels: InsurerCareModel[];
  lcaHighlights: string[];
  lcaCategories: InsurerLCACategory[];
  strengths: string[];
  weaknesses: string[];
  digitalTools: string[];
  competitorComparisons: InsurerCompetitorComparison[];
  switchingTips: InsurerSwitchingTips;
  faqs: { question: string; answer: string }[];
  metaDescription: string;
}

export const INSURERS_SEO_DATA: Record<string, InsurerSEOData> = {
  css: {
    id: 'css',
    name: 'CSS Assurance',
    slug: 'css',
    brandColor: '#0066B3',
    headquarters: 'Lucerne',
    cantonHq: 'LU',
    foundedYear: 1899,
    membersCount: '1.7 million d\'assurés',
    bagRegistration: 'OFSP N° 008',
    satisfactionRating: 5.3,
    stars: 5,
    marketShare: 'N° 1 en Suisse (~19.2% de part de marché)',
    evolution2026: '+5.7% en moyenne suisse en 2026',
    reservesRatio: '185% du minimum légal OFSP (très haute solvabilité)',
    reimbursementSpeed: '2 à 4 jours ouvrés via myCSS',
    appRating: { appStore: 4.8, googlePlay: 4.7, name: 'myCSS' },
    tagline: 'Leader suisse de l\'assurance maladie obligatoire et des soins complémentaires novateurs.',
    overview: 'Fondée en 1899 à Lucerne sous le nom de Caisse Maladie Chrétienne-Sociale, la CSS est aujourd\'hui le plus grand assureur-santé de Suisse avec plus de 1.7 million d\'assurés. Reconnue pour sa solidité financière irréprochable et sa capacité d\'innovation technologique, la CSS combine une présence de proximité avec plus de 100 agences et un écosystème numérique primé (application myCSS, programme myStep).',
    historyAndGovernance: 'La CSS a évolué d\'une association d\'entraide ouvrière catholique lucernoise vers un groupe d\'assurance moderne structuré en société anonyme (CSS Holding SA) tout en préservant son ancrage mutualiste. L\'association CSS garantit l\'indépendance de l\'institution et réinvestit la totalité des excédents d\'exploitation dans la qualité du service client et la stabilité des réserves.',
    indicativePremiums2026: [
      { canton: 'GE', cantonName: 'Genève', adult300: 588.40, adult2500: 442.20, youngAdult300: 462.10, child0: 162.80 },
      { canton: 'VD', cantonName: 'Vaud', adult300: 542.10, adult2500: 398.50, youngAdult300: 418.30, child0: 148.90 },
      { canton: 'VS', cantonName: 'Valais', adult300: 432.80, adult2500: 295.40, youngAdult300: 328.60, child0: 118.20 },
      { canton: 'NE', cantonName: 'Neuchâtel', adult300: 554.20, adult2500: 412.00, youngAdult300: 430.50, child0: 154.00 },
      { canton: 'FR', cantonName: 'Fribourg', adult300: 468.90, adult2500: 326.70, youngAdult300: 362.40, child0: 128.50 },
      { canton: 'JU', cantonName: 'Jura', adult300: 526.40, adult2500: 382.10, youngAdult300: 405.00, child0: 142.30 },
      { canton: 'BE', cantonName: 'Berne', adult300: 512.60, adult2500: 368.90, youngAdult300: 394.20, child0: 139.10 },
      { canton: 'ZH', cantonName: 'Zurich', adult300: 489.30, adult2500: 345.80, youngAdult300: 376.50, child0: 132.40 },
      { canton: 'BS', cantonName: 'Bâle-Ville', adult300: 598.10, adult2500: 452.60, youngAdult300: 472.00, child0: 165.70 },
      { canton: 'TI', cantonName: 'Tessin', adult300: 538.90, adult2500: 394.30, youngAdult300: 416.80, child0: 146.20 }
    ],
    lamalModels: [
      { name: 'Standard (Libre choix)', discountPercent: '0%', description: 'Libre choix total du médecin généraliste, spécialiste et hôpital répertorié dans toute la Suisse sans restriction d\'accès direct.' },
      { name: 'Multimed (Médecin & Télémédecine)', discountPercent: '12% – 17%', description: 'Modèle hybride flexible : vous choisissez librement de consulter d\'abord votre médecin traitant désigné ou d\'obtenir un avis immédiat par télémédecine Medgate.' },
      { name: 'Telmed (Callmed)', discountPercent: '15% – 20%', description: 'Conseil médical téléphonique obligatoire auprès du centre de télémédecine Medgate (24h/24) avant toute consultation physique.' },
      { name: 'HMO / Réseau de soins', discountPercent: '16% – 22%', description: 'Prise en charge coordonnée au sein d\'un cabinet de groupe HMO partenaire CSS pour optimiser la qualité du suivi médical et réduire les coûts.' }
    ],
    alternativeCareModels: [
      {
        type: 'telmed',
        name: 'Callmed 24',
        discount: 'Jusqu\'à -20%',
        firstContact: 'Appel ou chat vidéo Medgate obligatoire 24h/24 avant toute consultation.',
        emergencyRule: 'Urgences vitales dispensées d\'appel préalable (notification requise sous 10 jours).',
        pharmacyNetwork: 'Partenariat avec pharmacies Sun Store et Zur Rose pour les génériques.',
        pros: ['Économie maximale sur la prime', 'Disponibilité 24/7 de médecins qualifiés', 'Ordonnances électroniques directes']
      },
      {
        type: 'medecin-famille',
        name: 'Multimed & Médecin de Famille',
        discount: 'Jusqu\'à -17%',
        firstContact: 'Médecin traitant conventionné inscrit sur la liste cantonale CSS.',
        emergencyRule: 'Remplaçant du médecin ou service de garde officiel.',
        pharmacyNetwork: 'Libre choix avec incitation génériques.',
        pros: ['Suivi personnalisé par un médecin de confiance', 'Possibilité d\'utiliser Medgate en déplacement', 'Délégation simple vers spécialistes']
      },
      {
        type: 'hmo',
        name: 'Réseau de Santé HMO',
        discount: 'Jusqu\'à -22%',
        firstContact: 'Centre médical HMO de votre région (ex: centres Medbase ou Réseau Delta).',
        emergencyRule: 'Centres d\'urgence partenaires ou service d\'urgence cantonal.',
        pharmacyNetwork: 'Pharmacie intégrée au centre HMO ou pharmacie de référence.',
        pros: ['Rabais le plus élevé de la CSS', 'Dossier médical unifié au sein du centre', 'Spécialistes sur place']
      }
    ],
    lcaHighlights: [
      'myFlex Hospitalisation : choisissez librement votre division (commune, demi-privée, privée) juste avant chaque hospitalisation.',
      'Soins ambulatoires et médecines douces : prise en charge jusqu\'à 80% des thérapies naturelles et ostéopathie sans ordonnance.',
      'Prévention et fitness myStep : jusqu\'à CHF 800 par an remboursés sur les abonnements sportifs, cours et check-ups santé.',
      'Assurance dentaire pour enfants et adultes : jusqu\'à CHF 3\'000/an pour l\'orthodontie et les soins de conservation.'
    ],
    lcaCategories: [
      {
        title: 'Hospitalisation (myFlex)',
        products: ['myFlex Économique', 'myFlex Balance', 'myFlex Premium'],
        description: 'Libre choix de l\'hôpital en Suisse avec surclassement flexible en chambre individuelle ou double lors de l\'admission.',
        maxCoverage: '100% en division privée mondiale avec option myFlex Premium.'
      },
      {
        title: 'Ambulatoire & Bien-être',
        products: ['Assurance de soins myFlex', 'Assurance d\'assistance voyage'],
        description: 'Remboursement des lunettes (CHF 300/an), transports d\'urgence, médicaments hors liste LAMal et sauvetage Rega.',
        maxCoverage: 'Frais de sauvetage illimités en Suisse et à l\'étranger.'
      },
      {
        title: 'Médecines alternatives',
        products: ['Compte santé CSS', 'Option médecines douces'],
        description: 'Couverture étendue des thérapeutes agrées ASCA et RME : acupuncture, chiropractie, naturopathie et massages médicaux.',
        maxCoverage: 'Jusqu\'à CHF 2\'000 / an sans franchise additionnelle.'
      }
    ],
    strengths: [
      'N° 1 en Suisse pour le volume d\'assurés et l\'assise financière (réserves > 185%).',
      'Application myCSS extrêmement fluide : scan des factures et paiement en 48 heures.',
      'Programme de fidélité active myStep offrant jusqu\'à CHF 400 de cashback par an aux assurés actifs.',
      'Présence territoriale dense en Romandie avec agences physiques à Genève, Lausanne, Fribourg, Neuchâtel et Sion.'
    ],
    weaknesses: [
      'Primes de base Standard légèrement au-dessus des caisses low-cost en l\'absence de modèle alternatif.',
      'Examen de santé rigoureux pour les modules d\'hospitalisation privée en assurance complémentaire LCA.'
    ],
    digitalTools: [
      'myCSS (App mobile & portail web)',
      'myStep (Programme de bonus santé connecté)',
      'Medgate Télémédecine intégrée',
      'Plateforme Bien-être Enjoy'
    ],
    competitorComparisons: [
      {
        competitorName: 'Helsana',
        competitorSlug: 'helsana',
        keyDifference: 'CSS dispose de l\'offre myFlex plus modulaire, tandis qu\'Helsana mise fortement sur le programme de points Helsana+.',
        priceComparison: 'Tarifs très proches en Suisse romande, CSS souvent plus compétitive sur les modèles Telmed.',
        targetAudience: 'Familles et personnes recherchant un service premium tout-en-un.'
      },
      {
        competitorName: 'Assura',
        competitorSlug: 'assura',
        keyDifference: 'CSS pratique le tiers payant systématique (la caisse avance les frais de pharmacie et d\'hôpital), alors qu\'Assura utilise majoritairement le tiers garant.',
        priceComparison: 'Assura est 10% à 20% moins chère mais nécessite d\'avancer l\'argent de toutes les consultations.',
        targetAudience: 'Assurés privilégiant le confort de remboursement rapide et l\'assistance digitale.'
      },
      {
        competitorName: 'Swica',
        competitorSlug: 'swica',
        keyDifference: 'Swica verse des contributions de prévention sportive encore plus élevées (jusqu\'à CHF 1\'300), mais CSS a une application mobile plus avancée.',
        priceComparison: 'CSS est généralement 3% à 5% plus abordable que Swica en Suisse romande.',
        targetAudience: 'Jeunes adultes et familles connectées.'
      }
    ],
    switchingTips: {
      deadline: '30 novembre 2026 (lettre reçue par CSS au plus tard le dernier jour ouvrable)',
      address: 'CSS Assurance, Tribschenstrasse 21, Case postale 2568, 6002 Lucerne',
      advice: [
        'Pour l\'assurance de base (LAMal), la résiliation est libre et sans pénalité quel que soit votre état de santé.',
        'Ne résiliez JAMAIS vos assurances complémentaires LCA avant d\'avoir reçu l\'acceptation formelle et sans réserve de votre nouvel assureur.',
        'La CSS accepte la résiliation de la franchise ordinaire (CHF 300) au 30 juin avec un préavis de 3 mois (notification avant le 31 mars).'
      ]
    },
    faqs: [
      {
        question: "Pourquoi choisir la CSS pour son assurance maladie en Suisse ?",
        answer: "La CSS combine la plus grande solidité financière de Suisse, un tiers payant généralisé, une application mobile notée 4.8/5 et un programme de prévention (myStep) qui reverse jusqu'à CHF 400/an aux assurés réguliers."
      },
      {
        question: "Quelle est la date limite pour résilier son contrat CSS LAMal ?",
        answer: "Votre lettre recommandée de résiliation doit parvenir à la CSS au plus tard le 30 novembre (dernier jour ouvrable) pour une prise d'effet au 1er janvier de l'année suivante."
      },
      {
        question: "Comment fonctionne le modèle Multimed de la CSS ?",
        answer: "Multimed est un modèle alternatif qui vous permet soit de contacter votre médecin traitant désigné, soit d'utiliser l'application Medgate pour une téléconsultation 24/7. Il offre de 12% à 17% de rabais sur la prime mensuelle."
      },
      {
        question: "La CSS propose-t-elle le tiers payant en pharmacie et à l'hôpital ?",
        answer: "Oui, la CSS applique le tiers payant pour les médicaments sur ordonnance et les séjours hospitaliers : vous n'avez pas besoin d'avancer les montants, la pharmacie ou l'hôpital facture directement la caisse."
      },
      {
        question: "Quel montant la CSS rembourse-t-elle pour le fitness et le sport ?",
        answer: "Dans le cadre de ses assurances complémentaires et du Compte Santé, la CSS peut rembourser jusqu'à CHF 800 par an pour vos abonnements en salle de sport, cours de natation, yoga et activités de prévention certifiées Qualitop."
      }
    ],
    metaDescription: "Assurance maladie CSS 2026 : primes LAMal officielles par canton, modèles Multimed & Telmed, complémentaires myFlex, avis clients et comparatif neutre."
  },

  helsana: {
    id: 'helsana',
    name: 'Helsana',
    slug: 'helsana',
    brandColor: '#D32F2F',
    headquarters: 'Dübendorf (Zurich)',
    cantonHq: 'ZH',
    foundedYear: 1996,
    membersCount: '1.4 million d\'assurés',
    bagRegistration: 'OFSP N° 1562',
    satisfactionRating: 5.2,
    stars: 5,
    marketShare: 'N° 2 en Suisse (~16.0% de part de marché)',
    evolution2026: '+6.1% en moyenne suisse en 2026',
    reservesRatio: '178% des exigences légales OFSP',
    reimbursementSpeed: '3 à 5 jours ouvrés via Helsana+',
    appRating: { appStore: 4.7, googlePlay: 4.6, name: 'Helsana & Helsana+' },
    tagline: 'L\'un des plus puissants groupes d\'assurance santé de Suisse avec Progrès.',
    overview: 'Le groupe Helsana (englobant les marques Helsana et Progrès) est l\'un des deux piliers historiques de l\'assurance maladie suisse. Assurant plus de 1.4 million de personnes et 50\'000 entreprises, Helsana se distingue par l\'excellence de sa prise en charge médicale, la densité de son réseau de soins et son programme de prévention novateur Helsana+ qui récompense l\'activité physique et les bilans de santé.',
    historyAndGovernance: 'Helsana est née en 1996 de la fusion entre Helvetia (fondée en 1899) et Artisana (fondée en 1952). Constituée en société anonyme non cotée détenue par la Fondation Helsana et l\'Association Progrès, l\'institution privilégie la pérennité à long terme, la responsabilité sociétale et le soutien à la recherche médicale en Suisse.',
    indicativePremiums2026: [
      { canton: 'GE', cantonName: 'Genève', adult300: 594.20, adult2500: 448.50, youngAdult300: 468.90, child0: 164.50 },
      { canton: 'VD', cantonName: 'Vaud', adult300: 548.60, adult2500: 404.30, youngAdult300: 424.10, child0: 151.20 },
      { canton: 'VS', cantonName: 'Valais', adult300: 438.10, adult2500: 301.20, youngAdult300: 334.80, child0: 120.40 },
      { canton: 'NE', cantonName: 'Neuchâtel', adult300: 560.80, adult2500: 418.20, youngAdult300: 436.40, child0: 156.80 },
      { canton: 'FR', cantonName: 'Fribourg', adult300: 474.30, adult2500: 331.90, youngAdult300: 368.10, child0: 130.90 },
      { canton: 'JU', cantonName: 'Jura', adult300: 532.70, adult2500: 388.40, youngAdult300: 411.30, child0: 144.60 },
      { canton: 'BE', cantonName: 'Berne', adult300: 518.90, adult2500: 374.60, youngAdult300: 399.80, child0: 141.50 },
      { canton: 'ZH', cantonName: 'Zurich', adult300: 494.50, adult2500: 351.00, youngAdult300: 381.70, child0: 134.80 },
      { canton: 'BS', cantonName: 'Bâle-Ville', adult300: 604.30, adult2500: 458.90, youngAdult300: 478.40, child0: 168.20 },
      { canton: 'TI', cantonName: 'Tessin', adult300: 544.70, adult2500: 400.10, youngAdult300: 422.30, child0: 148.70 }
    ],
    lamalModels: [
      { name: 'Standard (Base)', discountPercent: '0%', description: 'Libre choix total de tous les médecins praticiens et spécialistes sans consultation préalable requise.' },
      { name: 'BeneFit PLUS Telmed', discountPercent: '15% – 19%', description: 'Premier avis médical obligatoire par téléphone ou téléconsultation auprès du centre partenaire Medi24 disponible 24h/24.' },
      { name: 'BeneFit PLUS Médecin de famille', discountPercent: '12% – 16%', description: 'Désignation d\'un médecin de famille conventionné comme coordinateur obligatoire pour tout traitement ou redirection.' },
      { name: 'BeneFit PLUS Réseau de soins (HMO)', discountPercent: '16% – 21%', description: 'Prise en charge intégrée dans un cabinet de groupe HMO partenaire offrant un suivi pluridisciplinaire.' }
    ],
    alternativeCareModels: [
      {
        type: 'telmed',
        name: 'BeneFit PLUS Telmed (Medi24)',
        discount: 'Jusqu\'à -19%',
        firstContact: 'Appel Medi24 avant toute consultation (sauf ophtalmologue, gynécologue et pédiatre).',
        emergencyRule: 'Notification obligatoire dans les 20 jours suivant un traitement d\'urgence.',
        pharmacyNetwork: 'Pharmacies partenaires et commande en ligne Zur Rose / Mediservice.',
        pros: ['Rabais élevé', 'Triage médical téléphonique de très haute compétence', 'Plan de traitement numérisé']
      },
      {
        type: 'medecin-famille',
        name: 'BeneFit PLUS Médecin de famille',
        discount: 'Jusqu\'à -16%',
        firstContact: 'Médecin de premier recours choisi dans le réseau Helsana.',
        emergencyRule: 'Service de garde local ou urgence hospitalière.',
        pharmacyNetwork: 'Réseau libre de pharmacies conventionnées.',
        pros: ['Relation de confiance durable', 'Transmission automatique des bons de délégation', 'Tarifs stabilisés']
      },
      {
        type: 'hmo',
        name: 'BeneFit PLUS Réseau de soins',
        discount: 'Jusqu\'à -21%',
        firstContact: 'Médecins du centre HMO régional sélectionné.',
        emergencyRule: 'Pôle d\'urgence rattaché au réseau.',
        pharmacyNetwork: 'Pharmacie partenaire du centre.',
        pros: ['Optimisation complète du parcours patient', 'Gain de temps pour les examens spécialisés']
      }
    ],
    lcaHighlights: [
      'Helsana TOP : couverture ambulatoire complète hors LAMal, lunettes (jusqu\'à CHF 300), médicaments non remboursés et check-ups.',
      'Helsana HOSPITAL : modèles mi-privé et privé avec libre choix absolu du chirurgien, de la clinique et de la chambre individuelle.',
      'SANA : excellente prise en charge des médecines alternatives, thérapies naturelles et cures de convalescence.',
      'Programme de bonus Helsana+ : cumul de points convertibles directement en cash (jusqu\'à CHF 300/an par personne).'
    ],
    lcaCategories: [
      {
        title: 'Hospitalisation (HOSPITAL)',
        products: ['HOSPITAL ECO', 'HOSPITAL Demi-privée', 'HOSPITAL Privée', 'HOSPITAL Flex'],
        description: 'Sécurité maximale lors des séjours hospitaliers avec accès aux meilleures cliniques privées suisses et internationales.',
        maxCoverage: 'Prise en charge illimitée des honoraires médicaux en division privée.'
      },
      {
        title: 'Soins Ambulatoires (TOP & SANA)',
        products: ['TOP', 'SANA', 'PRIME'],
        description: 'Prise en charge des thérapies douces, ostéopathie, psychothérapie non LAMal, lunettes et lentilles de contact.',
        maxCoverage: '75% à 90% des frais de médecines naturelles jusqu\'à CHF 5\'000/an.'
      },
      {
        title: 'Dentaire (DentaPlus)',
        products: ['DentaPlus Light', 'DentaPlus Bronze', 'DentaPlus Gold'],
        description: 'Correction de la position des dents pour enfants, détartrage annuel et soins conservateurs.',
        maxCoverage: 'Jusqu\'à CHF 3\'000 / an avec taux de remboursement de 75%.'
      }
    ],
    strengths: [
      'Excellente réputation auprès du corps médical suisse et des cliniques spécialisées.',
      'Programme Helsana+ très gratifiant qui reverse de l\'argent réel sur le compte bancaire de l\'assuré.',
      'Support client bilingue d\'une grande disponibilité avec agences physiques bien réparties.',
      'Couverture internationale très solide en cas d\'urgence ou de voyage à l\'étranger.'
    ],
    weaknesses: [
      'Gamme de produits LCA relativement complexe nécessitant un conseil avisé pour éviter les doublons.',
      'Tarifs de base légèrement supérieurs à la médiane dans certains cantons romands (ex: Genève).'
    ],
    digitalTools: [
      'App Helsana (gestion des contrats et factures)',
      'App Helsana+ (bonus et prévention santé)',
      'Service Medi24 télémédecine 24/7',
      'Portail myHelsana'
    ],
    competitorComparisons: [
      {
        competitorName: 'CSS Assurance',
        competitorSlug: 'css',
        keyDifference: 'CSS est légèrement plus forte sur le programme myStep et les modèles hybrides, tandis qu\'Helsana excelle en division hospitalière privée.',
        priceComparison: 'Écarts minimes (moins de 2%) sur les cantons de Vaud et Genève.',
        targetAudience: 'Familles et cadres recherchant un haut niveau de garantie.'
      },
      {
        competitorName: 'Groupe Mutuel',
        competitorSlug: 'groupe-mutuel',
        keyDifference: 'Groupe Mutuel a un ancrage très fort en Valais et Suisse romande, alors qu\'Helsana offre un réseau plus homogène sur l\'ensemble des 26 cantons.',
        priceComparison: 'Helsana est souvent un peu plus chère qu\'Avenir ou Mutuel Assurance.',
        targetAudience: 'Assurés mobiles et frontaliers.'
      }
    ],
    switchingTips: {
      deadline: '30 novembre 2026 (lettre de résiliation en mains d\'Helsana)',
      address: 'Helsana Assurances SA, Case postale, 8081 Zurich',
      advice: [
        'Pour la LAMal, envoyez votre courrier recommandé avant le 20 novembre pour éviter tout retard postal.',
        'Les assurances complémentaires LCA Helsana ont un délai de résiliation ordinaire de 3 mois au 30 septembre ou 30 novembre selon les conditions générales.',
        'En cas d\'augmentation de prime LCA, vous disposez d\'un droit de résiliation exceptionnel de 30 jours dès notification.'
      ]
    },
    faqs: [
      {
        question: "Comment fonctionne le programme de fidélité Helsana+ ?",
        answer: "Helsana+ vous permet de collecter des points en faisant du sport (pas quotidiens, entraînements), en effectuant des examens de dépistage ou en étant membre d'un club de sport. Ces points se convertissent en virements bancaires jusqu'à CHF 300 par an."
      },
      {
        question: "Helsana propose-t-elle le modèle Telmed avec Medi24 ?",
        answer: "Oui, le modèle BeneFit PLUS Telmed s'appuie sur le centre médical Medi24. Vous devez appeler avant toute consultation physique pour bénéficier d'un rabais pouvant atteindre 19% sur votre prime mensuelle."
      },
      {
        question: "Quelles sont les conditions de résiliation chez Helsana ?",
        answer: "Pour l'assurance de base LAMal, la résiliation doit parvenir à Helsana au plus tard le 30 novembre. Pour les complémentaires LCA, le délai est généralement fixé au 30 septembre ou lors d'une hausse tarifaire annoncée."
      },
      {
        question: "Helsana et Progrès sont-elles la même compagnie ?",
        answer: "Progrès fait partie intégrante du groupe Helsana. Les deux entités partagent la même gestion administrative, les mêmes modèles de soins et le même service client, avec parfois de légères variations tarifaires selon les cantons."
      }
    ],
    metaDescription: "Helsana Assurance Maladie 2026 : primes KVG officielles, modèles BeneFit PLUS, complémentaires TOP/HOSPITAL, programme Helsana+ et comparatif."
  },

  swica: {
    id: 'swica',
    name: 'SWICA',
    slug: 'swica',
    brandColor: '#004B87',
    headquarters: 'Winterthour (Zurich)',
    cantonHq: 'ZH',
    foundedYear: 1992,
    membersCount: '850\'000 assurés',
    bagRegistration: 'OFSP N° 1384',
    satisfactionRating: 5.6,
    stars: 5,
    marketShare: 'N° 1 de la satisfaction client en Suisse (~10.5% du marché)',
    evolution2026: '+5.4% en moyenne suisse en 2026',
    reservesRatio: '192% des exigences légales OFSP (la plus solide financièrement)',
    reimbursementSpeed: '2 à 3 jours ouvrés (record suisse)',
    appRating: { appStore: 4.9, googlePlay: 4.8, name: 'SWICA & santé24' },
    tagline: 'L\'assurance santé leader de la satisfaction client et des contributions sportives en Suisse.',
    overview: 'SWICA est régulièrement élue meilleure caisse maladie de Suisse pour la qualité de son service client, la rapidité de ses remboursements et l\'excellence de sa couverture préventive. Avec son propre service de télémédecine santé24 et des contributions de prévention sportive pouvant atteindre CHF 1\'300 par an, SWICA s\'adresse particulièrement aux personnes exigeantes et soucieuses de leur bien-être.',
    historyAndGovernance: 'SWICA a été créée en 1992 par la fusion de quatre caisses historiques (OSKA, ZOKU, BKK et KKB). Elle est organisée sous forme d\'organisation de santé intégrée avec la Fondation SWICA comme actionnaire unique, ce qui garantit une gouvernance 100% axée sur la qualité des soins plutôt que sur les dividendes financiers.',
    indicativePremiums2026: [
      { canton: 'GE', cantonName: 'Genève', adult300: 602.50, adult2500: 456.20, youngAdult300: 476.10, child0: 166.80 },
      { canton: 'VD', cantonName: 'Vaud', adult300: 556.30, adult2500: 411.80, youngAdult300: 431.50, child0: 153.40 },
      { canton: 'VS', cantonName: 'Valais', adult300: 444.20, adult2500: 307.10, youngAdult300: 341.00, child0: 122.50 },
      { canton: 'NE', cantonName: 'Neuchâtel', adult300: 568.90, adult2500: 425.60, youngAdult300: 443.80, child0: 159.20 },
      { canton: 'FR', cantonName: 'Fribourg', adult300: 481.50, adult2500: 338.40, youngAdult300: 374.90, child0: 133.00 },
      { canton: 'JU', cantonName: 'Jura', adult300: 540.20, adult2500: 395.70, youngAdult300: 418.50, child0: 147.00 },
      { canton: 'BE', cantonName: 'Berne', adult300: 526.40, adult2500: 381.90, youngAdult300: 407.20, child0: 143.80 },
      { canton: 'ZH', cantonName: 'Zurich', adult300: 501.80, adult2500: 358.20, youngAdult300: 388.90, child0: 137.10 },
      { canton: 'BS', cantonName: 'Bâle-Ville', adult300: 612.40, adult2500: 466.80, youngAdult300: 486.20, child0: 170.90 },
      { canton: 'TI', cantonName: 'Tessin', adult300: 552.10, adult2500: 407.30, youngAdult300: 429.60, child0: 150.90 }
    ],
    lamalModels: [
      { name: 'Standard (Base)', discountPercent: '0%', description: 'Libre choix complet de l\'ensemble des praticiens sans restriction de réseau.' },
      { name: 'FAVORIT TELMED (santé24)', discountPercent: '15% – 20%', description: 'Triage médical obligatoire auprès du service interne santé24 avec médecins et télémédecine de pointe.' },
      { name: 'FAVORIT MEDMEDICA (Médecin de famille)', discountPercent: '12% – 17%', description: 'Coordination par votre médecin de famille référent conventionné SWICA.' },
      { name: 'FAVORIT SANTE (Réseau HMO)', discountPercent: '16% – 22%', description: 'Prise en charge au sein des centres de santé partenaires SWICA et cabinets de groupe.' }
    ],
    alternativeCareModels: [
      {
        type: 'telmed',
        name: 'FAVORIT TELMED',
        discount: 'Jusqu\'à -20%',
        firstContact: 'santé24 (service médical interne SWICA disponible 24/7 en plusieurs langues).',
        emergencyRule: 'Notification sous 10 jours ouvrables.',
        pharmacyNetwork: 'Réseau étendu de pharmacies partenaires avec conseils personnalisés.',
        pros: ['Interlocuteurs médicaux internes extrêmement qualifiés', 'Rendez-vous prioritaires', 'Conseils de prévention personnalisés']
      },
      {
        type: 'medecin-famille',
        name: 'FAVORIT MEDMEDICA',
        discount: 'Jusqu\'à -17%',
        firstContact: 'Médecin de famille choisi sur la liste des médecins agréés SWICA.',
        emergencyRule: 'Service de garde cantonal.',
        pharmacyNetwork: 'Libre choix avec privilège génériques.',
        pros: ['Suivi clinique continu', 'Délégations simplifiées pour spécialistes']
      },
      {
        type: 'hmo',
        name: 'FAVORIT SANTE',
        discount: 'Jusqu\'à -22%',
        firstContact: 'Centres de santé partenaires et réseaux de soins régionaux.',
        emergencyRule: 'Pôle d\'urgence conventionné.',
        pharmacyNetwork: 'Pharmacie intégrée au cabinet de groupe.',
        pros: ['Prise en charge multidisciplinaire', 'Rabais maximal sur prime LAMal']
      }
    ],
    lcaHighlights: [
      'COMPLETA TOP : la complémentaire ambulatoire la plus généreuse de Suisse pour les médecines douces et lunettes.',
      'Contributions sport & fitness exceptionnelles : jusqu\'à CHF 1\'300/an remboursés sur les abonnements de fitness, cours et cotisations de clubs.',
      'HOSPITAL INFRA : division privée et demi-privée avec prise en charge intégrale des thérapies innovantes.',
      'COMPLETA PREVENTA : bilans de santé complets et dépistage précoce pris en charge à 90%.'
    ],
    lcaCategories: [
      {
        title: 'Prévention & Sport (COMPLETA TOP)',
        products: ['COMPLETA TOP', 'COMPLETA FORTE'],
        description: 'Remboursement jusqu\'à CHF 800 pour le fitness et CHF 500 pour la prévention active (total jusqu\'à CHF 1\'300/an).',
        maxCoverage: 'Plafond record de CHF 1\'300 / an pour le sport et bien-être.'
      },
      {
        title: 'Médecines Alternatives',
        products: ['OPTIMA', 'COMPLETA TOP'],
        description: 'Prise en charge sans ordonnance médicale préalable de plus de 100 méthodes de thérapie naturelle et ostéopathie.',
        maxCoverage: 'Jusqu\'à 90% des frais sans limitation stricte de séances.'
      }
    ],
    strengths: [
      'N° 1 absolu de la satisfaction client dans tous les comparatifs suisses (K-Tipp, Bonus.ch, Comparis).',
      'Remboursement record pour le sport et l\'activité physique (jusqu\'à CHF 1\'300/an).',
      'Service santé24 interne composé de médecins et infirmiers hautement qualifiés.',
      'Remboursements ultra-rapides traités en moyenne en moins de 72 heures.'
    ],
    weaknesses: [
      'Primes légèrement supérieures à la moyenne sur le modèle standard de base.',
      'Conditions d\'admission exigeantes en assurance complémentaire LCA.'
    ],
    digitalTools: ['App SWICA (scan factures & carte numérique)', 'Service médical santé24 24/7', 'Portail client MySWICA'],
    competitorComparisons: [
      {
        competitorName: 'Sanitas',
        competitorSlug: 'sanitas',
        keyDifference: 'SWICA bat Sanitas sur les contributions sportives (CHF 1\'300 vs CHF 800), mais Sanitas propose une application mobile encore plus axée sur le quantified-self.',
        priceComparison: 'Primes comparables, SWICA légèrement plus avantageuse pour les familles.',
        targetAudience: 'Sportifs, adeptes de médecines douces et personnes exigeantes.'
      },
      {
        competitorName: 'Helsana',
        competitorSlug: 'helsana',
        keyDifference: 'SWICA dispose de son propre service médical interne (santé24), tandis qu\'Helsana délègue son triage téléphonique à Medi24.',
        priceComparison: 'Tarifs très similaires en Suisse romande.',
        targetAudience: 'Assurés recherchant un service client 5 étoiles.'
      }
    ],
    switchingTips: {
      deadline: '30 novembre 2026',
      address: 'SWICA Assurance-maladie SA, Römerstrasse 38, 8401 Winterthour',
      advice: [
        'Adressez votre lettre de résiliation en courrier recommandé avec accusé de réception avant la mi-novembre.',
        'Si vous avez des soins en cours, conservez vos complémentaires chez SWICA tout en adaptant votre franchise LAMal.'
      ]
    },
    faqs: [
      {
        question: "Pourquoi SWICA est-elle classée N°1 de la satisfaction client en Suisse ?",
        answer: "SWICA se distingue par des remboursements en 48-72 heures, son service médical santé24 interne, une absence quasi-totale de bureaucratie et les contributions sportives les plus élevées du marché (jusqu'à CHF 1'300/an)."
      },
      {
        question: "Combien SWICA rembourse-t-elle pour un abonnement de fitness ?",
        answer: "En combinant les complémentaires COMPLETA TOP et OPTIMA, SWICA rembourse jusqu'à 95% de votre abonnement de fitness ou club de sport, plafonné à CHF 1'300 par an."
      },
      {
        question: "Comment fonctionne le service médical santé24 chez SWICA ?",
        answer: "santé24 est une plateforme médicale interne joignable 24h/24 et 7j/7 au 044 404 86 86, permettant d'obtenir des diagnostics, ordonnances et téléconsultations en français, allemand, italien et anglais."
      },
      {
        question: "Quels sont les délais de résiliation de l'assurance de base chez SWICA ?",
        answer: "Pour changer d'assurance de base LAMal au 1er janvier, votre lettre de résiliation doit parvenir à SWICA au plus tard le 30 novembre à 17h00."
      }
    ],
    metaDescription: "SWICA Assurance Maladie 2026 : N°1 satisfaction client Suisse, primes LAMal officielles, remboursements sport jusqu'à CHF 1'300/an, avis et comparatif."
  },

  sanitas: {
    id: 'sanitas',
    name: 'Sanitas',
    slug: 'sanitas',
    brandColor: '#E65100',
    headquarters: 'Zurich',
    cantonHq: 'ZH',
    foundedYear: 1958,
    membersCount: '840\'000 assurés',
    bagRegistration: 'OFSP N° 1509',
    satisfactionRating: 5.3,
    stars: 5,
    marketShare: 'Top 4 suisse (~10.2% de part de marché)',
    evolution2026: '+5.8% en moyenne suisse en 2026',
    reservesRatio: '175% des exigences légales OFSP',
    reimbursementSpeed: '2 à 4 jours ouvrés',
    appRating: { appStore: 4.8, googlePlay: 4.7, name: 'Sanitas Portal & Coach' },
    tagline: 'L\'assurance santé pionnière du digital et de la prévention sur-mesure.',
    overview: 'Sanitas est l\'un des assureurs-maladie les plus innovants de Suisse sur le plan technologique. Avec son application primée Sanitas Portal et son assistant virtuel intelligent, Sanitas simplifie la gestion de la santé au quotidien tout en offrant des couvertures complémentaires modulaires très prisées des jeunes actifs et des familles modernes.',
    historyAndGovernance: 'Fondée en 1958 à Zurich, Sanitas s\'est transformée d\'une caisse régionale en un groupe national d\'envergure. La Fondation Sanitas détient l\'intégralité du capital et réinvestit ses excédents dans l\'innovation numérique et la recherche en santé publique.',
    indicativePremiums2026: [
      { canton: 'GE', cantonName: 'Genève', adult300: 591.30, adult2500: 445.10, youngAdult300: 465.00, child0: 163.50 },
      { canton: 'VD', cantonName: 'Vaud', adult300: 545.20, adult2500: 401.00, youngAdult300: 420.80, child0: 149.80 },
      { canton: 'VS', cantonName: 'Valais', adult300: 435.00, adult2500: 298.30, youngAdult300: 331.20, child0: 119.10 },
      { canton: 'NE', cantonName: 'Neuchâtel', adult300: 557.40, adult2500: 415.00, youngAdult300: 433.20, child0: 155.10 },
      { canton: 'FR', cantonName: 'Fribourg', adult300: 471.00, adult2500: 328.80, youngAdult300: 365.10, child0: 129.50 },
      { canton: 'JU', cantonName: 'Jura', adult300: 529.50, adult2500: 385.20, youngAdult300: 408.00, child0: 143.20 },
      { canton: 'BE', cantonName: 'Berne', adult300: 515.30, adult2500: 371.40, youngAdult300: 396.80, child0: 140.00 },
      { canton: 'ZH', cantonName: 'Zurich', adult300: 491.80, adult2500: 348.50, youngAdult300: 378.90, child0: 133.50 },
      { canton: 'BS', cantonName: 'Bâle-Ville', adult300: 601.20, adult2500: 455.30, youngAdult300: 475.00, child0: 166.80 },
      { canton: 'TI', cantonName: 'Tessin', adult300: 541.50, adult2500: 397.00, youngAdult300: 419.20, child0: 147.10 }
    ],
    lamalModels: [
      { name: 'Basic (Standard)', discountPercent: '0%', description: 'Libre choix de vos praticiens et spécialistes.' },
      { name: 'CallMed (Telmed)', discountPercent: '15% – 20%', description: 'Téléconsultation obligatoire Medgate avant toute visite médicale.' },
      { name: 'CareMed (Médecin de famille)', discountPercent: '12% – 16%', description: 'Médecin traitant conventionné de premier recours.' },
      { name: 'NetMed (Réseau HMO)', discountPercent: '15% – 22%', description: 'Réseaux de médecins et centres médicaux régionaux partenaires.' }
    ],
    alternativeCareModels: [
      {
        type: 'telmed',
        name: 'Sanitas CallMed',
        discount: 'Jusqu\'à -20%',
        firstContact: 'Medgate par appel ou application mobile Sanitas.',
        emergencyRule: 'Notification dans les 10 jours.',
        pharmacyNetwork: 'Pharmacies conventionnées avec livraison à domicile.',
        pros: ['Application ultra-intuitive', 'Planification des rappels médicaux', 'Suivi digitalisé']
      },
      {
        type: 'medecin-famille',
        name: 'Sanitas CareMed',
        discount: 'Jusqu\'à -16%',
        firstContact: 'Médecin de famille référent conventionné.',
        emergencyRule: 'Service de garde ou urgence vitale sans délai.',
        pharmacyNetwork: 'Réseau libre de pharmacies.',
        pros: ['Coordination médicale personnalisée', 'Tarifs très stables']
      },
      {
        type: 'hmo',
        name: 'Sanitas NetMed',
        discount: 'Jusqu\'à -22%',
        firstContact: 'Centres de santé partenaires et cabinets de groupe régionaux.',
        emergencyRule: 'Centre de soins d\'urgence rattaché.',
        pharmacyNetwork: 'Pharmacie partenaire du cabinet.',
        pros: ['Économies maximales', 'Prise en charge intégrée']
      }
    ],
    lcaHighlights: [
      'Sanitas Vital : modules ambulatoires personnalisables pour médecines douces, lunettes et prévention.',
      'Hospitalisation Hospital Top / Flex : choix de la division de chambre et du médecin traitant à la clinique.',
      'Sanitas Coach App : accompagnement personnalisé pour la nutrition, le sommeil et la réduction du stress.'
    ],
    lcaCategories: [
      {
        title: 'Ambulatoire & Prévention',
        products: ['Vital Basic', 'Vital Smart', 'Vital Premium'],
        description: 'Couverture flexible des médecines complémentaires, vaccins de voyage, lunettes et lentilles.',
        maxCoverage: 'Jusqu\'à 80% des frais de médecine douce sans limite stricte.'
      }
    ],
    strengths: [
      'Application mobile Sanitas Portal classée parmi les meilleures d\'Europe.',
      'Processus de remboursement rapide avec reconnaissance automatique des factures par IA.',
      'Excellente clarté contractuelle et portail client sans papier.'
    ],
    weaknesses: ['Réseau d\'agences physiques plus restreint en Suisse romande que les caisses historiques.'],
    digitalTools: ['App Sanitas Portal', 'Sanitas Coach App', 'Medgate Télémédecine intégrée'],
    competitorComparisons: [
      {
        competitorName: 'CSS Assurance',
        competitorSlug: 'css',
        keyDifference: 'Sanitas offre une expérience 100% digitale très aboutie, idéale pour les utilisateurs mobiles.',
        priceComparison: 'Primes comparables en Suisse romande.',
        targetAudience: 'Jeunes actifs, indépendants et familles connectées.'
      },
      {
        competitorName: 'SWICA',
        competitorSlug: 'swica',
        keyDifference: 'Sanitas mise sur le self-care et l\'IA, tandis que SWICA privilégie l\'accompagnement humain et les contributions sport.',
        priceComparison: 'Écarts tarifaires inférieurs à 3%.',
        targetAudience: 'Amateurs de solutions numériques performantes.'
      }
    ],
    switchingTips: {
      deadline: '30 novembre 2026',
      address: 'Sanitas Assurance Maladie, Jägergasse 3, Case postale, 8021 Zurich',
      advice: ['Privilégiez la soumission digitale de votre demande d\'assurance complémentaire avant le 30 septembre.']
    },
    faqs: [
      {
        question: "Quels sont les avantages de l'application Sanitas Portal ?",
        answer: "Elle permet de scanner instantanément vos factures avec paiement en 48h, de vérifier votre franchise en temps réel et de chatter avec un conseiller ou un médecin Medgate."
      },
      {
        question: "Comment fonctionne le modèle Telmed CallMed chez Sanitas ?",
        answer: "Avant chaque consultation, vous contactez les médecins de Medgate par téléphone ou visio via l'application Sanitas Portal. En contrepartie, vous bénéficiez d'un rabais pouvant atteindre 20% sur votre prime mensuelle."
      },
      {
        question: "Puis-je souscrire l'assurance complémentaire Sanitas sans changer de base LAMal ?",
        answer: "Oui, la législation suisse autorise la dissociation : vous pouvez conserver vos complémentaires chez Sanitas tout en choisissant un autre assureur pour la LAMal de base."
      },
      {
        question: "Quels sont les délais de résiliation de l'assurance de base chez Sanitas ?",
        answer: "La lettre de résiliation de l'assurance obligatoire des soins doit parvenir au siège de Sanitas au plus tard le 30 novembre pour une prise d'effet au 1er janvier suivant."
      }
    ],
    metaDescription: "Sanitas Assurance Maladie 2026 : primes LAMal officielles, modèles CallMed/CareMed, portail mobile primé, avis clients et comparatif."
  },

  'groupe-mutuel': {
    id: 'groupe-mutuel',
    name: 'Groupe Mutuel',
    slug: 'groupe-mutuel',
    brandColor: '#D81B60',
    headquarters: 'Martigny (Valais)',
    cantonHq: 'VS',
    foundedYear: 1993,
    membersCount: '1.3 million d\'assurés',
    bagRegistration: 'OFSP N° 1479',
    satisfactionRating: 5.0,
    stars: 4,
    marketShare: 'Leader incontesté de la Suisse romande (~15.0% du marché suisse)',
    evolution2026: '+6.4% en moyenne suisse en 2026',
    reservesRatio: '168% des exigences légales OFSP',
    reimbursementSpeed: '4 à 6 jours ouvrés',
    appRating: { appStore: 4.6, googlePlay: 4.5, name: 'Groupe Mutuel App' },
    tagline: 'Le grand leader romand de la santé, de la prévoyance et des assurances entreprises.',
    overview: 'Basé à Martigny en Valais, le Groupe Mutuel est le numéro 1 incontournable de l\'assurance maladie en Suisse romande. Regroupant plusieurs caisses affiliées (Mutuel Assurance, Avenir, Philos), le groupe assure plus de 1.3 million de personnes et protège une grande partie du tissu économique romand grâce à ses solutions globales santé-prévoyance.',
    historyAndGovernance: 'Le Groupe Mutuel est issu du regroupement progressif de plusieurs caisses mutualistes romandes fondées au début du XXe siècle en Valais, Vaud et Fribourg. L\'association faîtière Groupe Mutuel Holding veille à maintenir des primes compétitives en Romandie tout en développant son réseau d\'agences locales.',
    indicativePremiums2026: [
      { canton: 'GE', cantonName: 'Genève', adult300: 582.10, adult2500: 436.40, youngAdult300: 456.30, child0: 160.20 },
      { canton: 'VD', cantonName: 'Vaud', adult300: 536.80, adult2500: 393.20, youngAdult300: 412.50, child0: 146.70 },
      { canton: 'VS', cantonName: 'Valais', adult300: 426.50, adult2500: 289.80, youngAdult300: 322.40, child0: 115.90 },
      { canton: 'NE', cantonName: 'Neuchâtel', adult300: 548.70, adult2500: 406.80, youngAdult300: 424.60, child0: 151.80 },
      { canton: 'FR', cantonName: 'Fribourg', adult300: 462.90, adult2500: 321.40, youngAdult300: 357.20, child0: 126.30 },
      { canton: 'JU', cantonName: 'Jura', adult300: 520.10, adult2500: 376.50, youngAdult300: 399.80, child0: 140.10 },
      { canton: 'BE', cantonName: 'Berne', adult300: 506.70, adult2500: 363.20, youngAdult300: 388.40, child0: 137.00 },
      { canton: 'ZH', cantonName: 'Zurich', adult300: 483.50, adult2500: 340.60, youngAdult300: 370.80, child0: 130.40 },
      { canton: 'BS', cantonName: 'Bâle-Ville', adult300: 592.60, adult2500: 447.10, youngAdult300: 466.50, child0: 163.40 },
      { canton: 'TI', cantonName: 'Tessin', adult300: 532.80, adult2500: 388.90, youngAdult300: 410.70, child0: 144.10 }
    ],
    lamalModels: [
      { name: 'Standard (Traditionnel)', discountPercent: '0%', description: 'Libre choix des médecins et praticiens dans toute la Suisse.' },
      { name: 'PrimaTel (Telmed)', discountPercent: '15% – 20%', description: 'Consultation téléphonique préalable auprès de la centrale d\'appel médicale.' },
      { name: 'PrimaCare (Médecin de famille)', discountPercent: '12% – 16%', description: 'Médecin de famille référent désigné.' },
      { name: 'PrimaPharma (Pharmacie partenaire)', discountPercent: '14% – 18%', description: 'Passage obligatoire par une pharmacie partenaire avant orientation médicale.' },
      { name: 'Réseau de soins (HMO)', discountPercent: '15% – 21%', description: 'Centres médicaux et réseaux de santé conventionnés.' }
    ],
    alternativeCareModels: [
      {
        type: 'telmed',
        name: 'PrimaTel',
        discount: 'Jusqu\'à -20%',
        firstContact: 'Centrale médicale téléphonique avant consultation.',
        emergencyRule: 'Notification obligatoire dans les 20 jours.',
        pharmacyNetwork: 'Réseau étendu de pharmacies partenaires en Suisse romande.',
        pros: ['Économie substantielle', 'Accompagnement en français impeccable']
      },
      {
        type: 'medecin-famille',
        name: 'PrimaCare',
        discount: 'Jusqu\'à -16%',
        firstContact: 'Médecin de premier recours choisi dans le réseau Groupe Mutuel.',
        emergencyRule: 'Urgences et déplacements à l\'étranger dispensés.',
        pharmacyNetwork: 'Pharmacies conventionnées en Romandie.',
        pros: ['Relation personnalisée', 'Gestion fluide des délégations']
      },
      {
        type: 'hmo',
        name: 'Réseau de soins (HMO)',
        discount: 'Jusqu\'à -21%',
        firstContact: 'Centres médicaux et réseaux partenaires régionaux.',
        emergencyRule: 'Centre de soins d\'urgence conventionné.',
        pharmacyNetwork: 'Pharmacie intégrée au cabinet de groupe.',
        pros: ['Rabais maximal', 'Équipe médicale pluridisciplinaire']
      }
    ],
    lcaHighlights: [
      'Global Solutions : pack complet pour soins ambulatoires, médecines naturelles et lunettes.',
      'Hôpital H-Bonus : flexibilité de chambre demi-privée ou privée lors de l\'hospitalisation.',
      'Légis : protection juridique santé et litiges médicaux intégrée.'
    ],
    lcaCategories: [
      {
        title: 'Santé globale',
        products: ['Global classic', 'Global confort', 'Global mi-privé'],
        description: 'Formules tout-en-un comprenant la médecine douce, les lunettes, l\'orthodontie et les secours.',
        maxCoverage: 'Couverture optimale pour toute la famille en Suisse romande.'
      }
    ],
    strengths: [
      'Proximité géographique inégalée en Suisse romande (agences à Genève, Lausanne, Sion, Fribourg, etc.).',
      'Offre complète combinant santé, prévoyance 3ème pilier et assurances entreprises.',
      'Tarifs parmi les plus compétitifs sur les cantons romands comme le Valais et Fribourg.'
    ],
    weaknesses: [
      'Délais de traitement parfois un peu plus longs en période de renouvellement automnal.',
      'Historique de primes fluctuantes selon les entités (Avenir / Mutuel).'
    ],
    digitalTools: ['App Groupe Mutuel', 'Espace client sécurisé', 'Service de télémédecine'],
    competitorComparisons: [
      {
        competitorName: 'CSS Assurance',
        competitorSlug: 'css',
        keyDifference: 'Groupe Mutuel est le leader de proximité en Suisse romande, tandis que CSS offre une assise nationale plus forte.',
        priceComparison: 'Groupe Mutuel est très compétitif en Valais et Fribourg.',
        targetAudience: 'Résidents de Suisse romande, familles et PME.'
      },
      {
        competitorName: 'Assura',
        competitorSlug: 'assura',
        keyDifference: 'Groupe Mutuel offre le tiers payant et des agences de conseil physique, contrairement au modèle tiers garant d\'Assura.',
        priceComparison: 'Assura est légèrement moins chère sur la prime de base pure.',
        targetAudience: 'Assurés recherchant la proximité d\'une agence locale.'
      }
    ],
    switchingTips: {
      deadline: '30 novembre 2026',
      address: 'Groupe Mutuel, Rue des Cèdres 5, Case postale, 1919 Martigny',
      advice: ['N\'hésitez pas à vous rendre dans l\'une des nombreuses agences régionales pour obtenir des conseils personnalisés.']
    },
    faqs: [
      {
        question: "Quelles caisses font partie du Groupe Mutuel ?",
        answer: "Le Groupe Mutuel regroupe notamment Mutuel Assurance, Avenir Assurance et Philos Assurance sous une direction administrative commune à Martigny."
      },
      {
        question: "Comment fonctionne le modèle PrimaTel du Groupe Mutuel ?",
        answer: "PrimaTel exige un premier appel téléphonique vers la centrale médicale avant toute consultation médicale (sauf gynécologie, ophtalmologie et urgences vitales) et fait économiser jusqu'à 20% sur la prime."
      },
      {
        question: "Le Groupe Mutuel applique-t-il le tiers payant en pharmacie ?",
        answer: "Oui, la présentation de votre carte d'assuré Groupe Mutuel en pharmacie vous évite d'avancer le montant de vos médicaments prescrits sous ordonnance."
      },
      {
        question: "Quand et comment résilier sa police LAMal chez Groupe Mutuel ?",
        answer: "La lettre de résiliation en courrier recommandé doit être reçue au siège de Martigny avant le 30 novembre pour prendre effet au 1er janvier."
      }
    ],
    metaDescription: "Groupe Mutuel Assurance Maladie 2026 : primes Romandie officielles, modèles PrimaTel/Care, complémentaires Global, avis et comparateur."
  },

  assura: {
    id: 'assura',
    name: 'Assura',
    slug: 'assura',
    brandColor: '#00897B',
    headquarters: 'Pully (Vaud)',
    cantonHq: 'VD',
    foundedYear: 1978,
    membersCount: '1.0 million d\'assurés',
    bagRegistration: 'OFSP N° 1542',
    satisfactionRating: 4.5,
    stars: 4,
    marketShare: 'Leader suisse des primes économiques (~11.0% du marché)',
    evolution2026: '+5.2% en moyenne suisse en 2026',
    reservesRatio: '162% des exigences légales OFSP',
    reimbursementSpeed: '5 à 8 jours ouvrés',
    appRating: { appStore: 4.4, googlePlay: 4.3, name: 'Assura App' },
    tagline: 'L\'assureur-maladie suisse axé sur la responsabilité individuelle et les primes les plus basses.',
    overview: 'Fondée en 1978 à Pully (Vaud), Assura est le grand spécialiste des primes économiques en Suisse. En promouvant la franchise à option et le modèle du tiers garant (l\'assuré règle ses factures et demande le remboursement), Assura parvient à maintenir des primes d\'assurance de base souvent parmi les moins chères du pays pour les personnes en bonne santé.',
    historyAndGovernance: 'Créée par Jean-Paul Diserens, Assura s\'est développée avec la volonté de responsabiliser l\'assuré pour freiner la hausse des coûts de la santé. Assura SA gère l\'assurance de base selon la LAMal, tandis qu\'Assura-Médic SA prend en charge les assurances complémentaires.',
    indicativePremiums2026: [
      { canton: 'GE', cantonName: 'Genève', adult300: 552.40, adult2500: 412.10, youngAdult300: 432.00, child0: 152.00 },
      { canton: 'VD', cantonName: 'Vaud', adult300: 508.90, adult2500: 368.50, youngAdult300: 388.20, child0: 138.90 },
      { canton: 'VS', cantonName: 'Valais', adult300: 404.20, adult2500: 271.00, youngAdult300: 302.80, child0: 109.50 },
      { canton: 'NE', cantonName: 'Neuchâtel', adult300: 521.00, adult2500: 382.40, youngAdult300: 400.10, child0: 143.80 },
      { canton: 'FR', cantonName: 'Fribourg', adult300: 438.70, adult2500: 301.20, youngAdult300: 336.50, child0: 119.40 },
      { canton: 'JU', cantonName: 'Jura', adult300: 494.30, adult2500: 354.00, youngAdult300: 377.20, child0: 132.80 },
      { canton: 'BE', cantonName: 'Berne', adult300: 480.10, adult2500: 341.50, youngAdult300: 366.90, child0: 129.70 },
      { canton: 'ZH', cantonName: 'Zurich', adult300: 458.20, adult2500: 319.80, youngAdult300: 349.40, child0: 123.50 },
      { canton: 'BS', cantonName: 'Bâle-Ville', adult300: 563.00, adult2500: 422.90, youngAdult300: 441.80, child0: 155.00 },
      { canton: 'TI', cantonName: 'Tessin', adult300: 505.40, adult2500: 366.20, youngAdult300: 387.60, child0: 136.20 }
    ],
    lamalModels: [
      { name: 'Standard (Base)', discountPercent: '0%', description: 'Libre choix avec fonctionnement en tiers garant.' },
      { name: 'Med-Pharma (Médecin/Pharmacie)', discountPercent: '15% – 22%', description: 'Conseil obligatoire par une pharmacie partenaire ou un médecin de réseau.' },
      { name: 'PharMed (Médecin de famille)', discountPercent: '12% – 18%', description: 'Médecin de premier recours et délivrance de médicaments génériques.' },
      { name: 'Qualimed (HMO)', discountPercent: '16% – 25%', description: 'Réseaux de soins HMO partenaires pour une économie maximale.' }
    ],
    alternativeCareModels: [
      {
        type: 'telmed',
        name: 'Assura Med-Pharma',
        discount: 'Jusqu\'à -22%',
        firstContact: 'Pharmacie partenaire du réseau ou téléconsultation.',
        emergencyRule: 'Notification obligatoire sous 30 jours.',
        pharmacyNetwork: 'Réseau Sun Store, Amavita, Coop Vitality pour génériques prioritaires.',
        pros: ['Tarif le plus bas de Suisse dans de nombreux cantons', 'Accès direct aux pharmaciens conseils']
      },
      {
        type: 'medecin-famille',
        name: 'Assura PharMed',
        discount: 'Jusqu\'à -18%',
        firstContact: 'Médecin de famille référent désigné.',
        emergencyRule: 'Urgences dispensées de contact préalable.',
        pharmacyNetwork: 'Obligation de choisir des médicaments génériques.',
        pros: ['Primes ultra-compétitives', 'Suivi médical continu']
      },
      {
        type: 'hmo',
        name: 'Assura Qualimed',
        discount: 'Jusqu\'à -25%',
        firstContact: 'Centres de santé HMO partenaires.',
        emergencyRule: 'Urgences traitées au centre régional.',
        pharmacyNetwork: 'Pharmacie de groupe affiliée.',
        pros: ['Rabais maximal du catalogue Assura', 'Économie annuelle record']
      }
    ],
    lcaHighlights: [
      'Complémentaires Optima & Ultra : prise en charge des médecines naturelles et des séjours de cure.',
      'Denta Plus : couverture dentaire économique pour enfants et adultes.',
      'Hospitalisation Mondia : hospitalisation d\'urgence dans le monde entier.'
    ],
    lcaCategories: [
      {
        title: 'Assurances complémentaires économiques',
        products: ['Optima', 'Ultra', 'Natura'],
        description: 'Gamme ciblée sur les besoins essentiels sans surcoût inutile.',
        maxCoverage: 'Jusqu\'à 80% des médecines douces selon barème.'
      }
    ],
    strengths: [
      'Primes d\'assurance de base (LAMal) parmi les moins chères de Suisse année après année.',
      'Idéal pour les personnes jeunes, en bonne santé et souhaitant une franchise à CHF 2\'500.',
      'Application mobile intuitive pour l\'envoi rapide des factures.'
    ],
    weaknesses: [
      'Fonctionnement en tiers garant (l\'assuré doit généralement avancer le coût des consultations).',
      'Service client plus difficilement joignable en période de forte affluence.'
    ],
    digitalTools: ['App Assura', 'Espace client sécurisé en ligne'],
    competitorComparisons: [
      {
        competitorName: 'CSS Assurance',
        competitorSlug: 'css',
        keyDifference: 'Assura est nettement moins chère mais nécessite d\'avancer les frais, alors que CSS propose un service haut de gamme avec tiers payant.',
        priceComparison: 'Assura est 15% à 25% moins chère sur les primes de base.',
        targetAudience: 'Personnes attentives à leur budget et consultant peu souvent le médecin.'
      },
      {
        competitorName: 'Groupe Mutuel',
        competitorSlug: 'groupe-mutuel',
        keyDifference: 'Assura privilégie les coûts minimaux via le tiers garant, alors que Groupe Mutuel mise sur un réseau d\'agences étendu.',
        priceComparison: 'Assura est systématiquement plus économique sur les franchises 2500.',
        targetAudience: 'Jeunes adultes et assurés en bonne santé.'
      }
    ],
    switchingTips: {
      deadline: '30 novembre 2026',
      address: 'Assura SA, En Budron A1, 1052 Le Mont-sur-Lausanne',
      advice: ['Pour résilier Assura, veillez à ce que toutes vos factures antérieures soient soldées.']
    },
    faqs: [
      {
        question: "Pourquoi Assura est-elle souvent moins chère que les autres caisses ?",
        answer: "Assura applique une gestion rigoureuse des coûts administratifs, favorise le tiers garant (l'assuré contrôle ses factures) et incite à l'utilisation systématique des médicaments génériques."
      },
      {
        question: "Comment se faire rembourser ses factures chez Assura ?",
        answer: "Il suffit de photographier votre justificatif de remboursement via l'application mobile Assura. Le remboursement intervient par virement bancaire une fois votre franchise et quote-part calculées."
      },
      {
        question: "Qu'est-ce que le système du tiers garant chez Assura ?",
        answer: "Avec le tiers garant, vous réglez d'abord la facture à votre médecin, puis vous la transmettez à Assura qui vous rembourse la part dépassant votre franchise annuelle et votre quote-part légale."
      },
      {
        question: "Quelle est la date limite pour résilier son contrat chez Assura ?",
        answer: "Votre lettre de résiliation recommandée doit être réceptionnée par Assura à Pully avant le 30 novembre à 17h00."
      }
    ],
    metaDescription: "Assura Assurance Maladie 2026 : primes économiques officielles, modèles PharMed/Qualimed, tiers garant, avis clients et comparateur."
  },

  concordia: {
    id: 'concordia',
    name: 'Concordia',
    slug: 'concordia',
    brandColor: '#1565C0',
    headquarters: 'Lucerne',
    cantonHq: 'LU',
    foundedYear: 1913,
    membersCount: '700\'000 assurés',
    bagRegistration: 'OFSP N° 0290',
    satisfactionRating: 5.2,
    stars: 5,
    marketShare: 'Top 5 suisse (~8.5% de part de marché)',
    evolution2026: '+5.6% en moyenne suisse en 2026',
    reservesRatio: '180% des exigences légales OFSP',
    reimbursementSpeed: '3 à 5 jours ouvrés',
    appRating: { appStore: 4.7, googlePlay: 4.6, name: 'concordiaDirect' },
    tagline: 'L\'assureur de référence pour la protection des familles et des enfants en Suisse.',
    overview: 'Fondée en 1913 à Lucerne, Concordia est particulièrement réputée pour ses prestations exceptionnelles en faveur des familles : primes enfants très avantageuses, prime nouveau-né offerte et réductions substantielles dès le deuxième enfant. Sa solidité financière et la clarté de ses contrats en font un choix de premier ordre.',
    historyAndGovernance: 'Concordia est une association suisse de prévoyance santé indépendante. Elle réinvestit systématiquement ses surplus dans la réduction des primes pour les familles et le renforcement de ses réserves de solvabilité.',
    indicativePremiums2026: [
      { canton: 'GE', cantonName: 'Genève', adult300: 585.00, adult2500: 439.00, youngAdult300: 459.00, child0: 154.00 },
      { canton: 'VD', cantonName: 'Vaud', adult300: 539.00, adult2500: 395.00, youngAdult300: 415.00, child0: 141.00 },
      { canton: 'VS', cantonName: 'Valais', adult300: 429.00, adult2500: 292.00, youngAdult300: 325.00, child0: 111.00 },
      { canton: 'NE', cantonName: 'Neuchâtel', adult300: 551.00, adult2500: 409.00, youngAdult300: 427.00, child0: 146.00 },
      { canton: 'FR', cantonName: 'Fribourg', adult300: 465.00, adult2500: 323.00, youngAdult300: 359.00, child0: 121.00 },
      { canton: 'JU', cantonName: 'Jura', adult300: 523.00, adult2500: 379.00, youngAdult300: 402.00, child0: 135.00 },
      { canton: 'BE', cantonName: 'Berne', adult300: 509.00, adult2500: 365.00, youngAdult300: 391.00, child0: 132.00 },
      { canton: 'ZH', cantonName: 'Zurich', adult300: 486.00, adult2500: 342.00, youngAdult300: 373.00, child0: 125.00 },
      { canton: 'BS', cantonName: 'Bâle-Ville', adult300: 595.00, adult2500: 449.00, youngAdult300: 469.00, child0: 157.00 },
      { canton: 'TI', cantonName: 'Tessin', adult300: 535.00, adult2500: 391.00, youngAdult300: 413.00, child0: 138.00 }
    ],
    lamalModels: [
      { name: 'Standard (Base)', discountPercent: '0%', description: 'Libre choix traditionnel de vos médecins.' },
      { name: 'myDoc (Médecin de famille)', discountPercent: '12% – 17%', description: 'Votre médecin de famille comme premier interlocuteur de santé.' },
      { name: 'telmed (Téléconsultation)', discountPercent: '15% – 20%', description: 'Appel préalable auprès du centre médical concordiaMed 24/7.' },
      { name: 'HMO (Centres de santé)', discountPercent: '15% – 22%', description: 'Prise en charge intégrée dans un cabinet de groupe HMO.' }
    ],
    alternativeCareModels: [
      {
        type: 'medecin-famille',
        name: 'Concordia myDoc',
        discount: 'Jusqu\'à -17%',
        firstContact: 'Médecin de famille enregistré.',
        emergencyRule: 'Urgences dispensées d\'avis préalable.',
        pharmacyNetwork: 'Réseau libre de pharmacies conventionnées.',
        pros: ['Suivi idéal pour toute la famille', 'Primes particulièrement stables']
      },
      {
        type: 'telmed',
        name: 'Concordia telmed',
        discount: 'Jusqu\'à -20%',
        firstContact: 'Centre médical concordiaMed 24h/24.',
        emergencyRule: 'Notification dans les 10 jours.',
        pharmacyNetwork: 'Pharmacies partenaires.',
        pros: ['Téléconsultation 24/7', 'Rabais substantiel']
      },
      {
        type: 'hmo',
        name: 'Concordia HMO',
        discount: 'Jusqu\'à -22%',
        firstContact: 'Centres de santé HMO conventionnés.',
        emergencyRule: 'Urgences médicales au pôle régional.',
        pharmacyNetwork: 'Pharmacie intégrée au cabinet.',
        pros: ['Soins coordonnés complets', 'Économie maximale']
      }
    ],
    lcaHighlights: [
      'DIVERSA : assurance complémentaire complète pour soins ambulatoires, lunettes et secours.',
      'Bonus nouveau-né et rabais dès le deuxième enfant en assurance complémentaire.',
      'NATURA : prise en charge exceptionnelle des médecines alternatives et thérapies douces.'
    ],
    lcaCategories: [
      {
        title: 'Formules Famille & Enfants',
        products: ['DIVERSA care', 'DIVERSA premium', 'NATURA'],
        description: 'Prestations dentaires, orthodontie enfantine et prévention sportive.',
        maxCoverage: 'Jusqu\'à CHF 3\'000 / an pour l\'orthodontie des enfants.'
      }
    ],
    strengths: [
      'Meilleure offre tarifaire et rabais pour les familles nombreuses et les enfants.',
      'Service client chaleureux et très réactif.',
      'Solidité financière supérieure (réserves à 180% des normes fédérales).'
    ],
    weaknesses: ['Communication parfois plus orientée vers la Suisse alémanique.'],
    digitalTools: ['App concordiaDirect', 'Service médical concordiaMed 24/7'],
    competitorComparisons: [
      {
        competitorName: 'CSS Assurance',
        competitorSlug: 'css',
        keyDifference: 'Concordia propose des rabais enfants souvent plus généreux que la CSS.',
        priceComparison: 'Tarifs très proches, avantage Concordia pour les foyers avec 2 enfants ou plus.',
        targetAudience: 'Familles avec enfants et couples prévoyants.'
      },
      {
        competitorName: 'Visana',
        competitorSlug: 'visana',
        keyDifference: 'Concordia est spécialisée dans les réductions famille tandis que Visana cible les sportifs via myPoints.',
        priceComparison: 'Écarts minimes selon les cantons.',
        targetAudience: 'Parents recherchant des garanties pérennes pour leurs enfants.'
      }
    ],
    switchingTips: {
      deadline: '30 novembre 2026',
      address: 'CONCORDIA, Bundesplatz 15, 6002 Lucerne',
      advice: ['Pensez à affilier votre nouveau-né avant sa naissance pour bénéficier d\'une adhésion sans questionnaire médical.']
    },
    faqs: [
      {
        question: "Quels sont les avantages de Concordia pour les familles ?",
        answer: "Concordia offre des rabais substantiels dès le deuxième enfant, un cadeau de naissance de CHF 100 et la gratuité de certaines couvertures complémentaires pour les cadets."
      },
      {
        question: "Comment fonctionne le service concordiaMed chez Concordia ?",
        answer: "concordiaMed est un centre de conseil médical téléphonique gratuit disponible jour et nuit pour répondre à vos questions de santé ou orienter votre prise en charge dans le modèle telmed."
      },
      {
        question: "Quelles sont les conditions pour assurer un nouveau-né chez Concordia ?",
        answer: "En souscrivant l'assurance prénatale avant l'accouchement, votre enfant est accepté dans les assurances complémentaires sans questionnaire de santé et sans aucune réserve médicale."
      },
      {
        question: "Quand envoyer sa résiliation à Concordia ?",
        answer: "La lettre recommandée de résiliation de l'assurance obligatoire LAMal doit parvenir à Concordia à Lucerne au plus tard le 30 novembre."
      }
    ],
    metaDescription: "Concordia Assurance Maladie 2026 : primes LAMal officielles, rabais familles & enfants, modèles myDoc et telmed, avis et comparatif."
  },

  visana: {
    id: 'visana',
    name: 'Visana',
    slug: 'visana',
    brandColor: '#C2185B',
    headquarters: 'Berne',
    cantonHq: 'BE',
    foundedYear: 1996,
    membersCount: '850\'000 assurés',
    bagRegistration: 'OFSP N° 1555',
    satisfactionRating: 5.1,
    stars: 5,
    marketShare: 'Top 5 suisse (~10.0% de part de marché)',
    evolution2026: '+5.9% en moyenne suisse en 2026',
    reservesRatio: '172% des exigences légales OFSP',
    reimbursementSpeed: '3 à 5 jours ouvrés',
    appRating: { appStore: 4.7, googlePlay: 4.6, name: 'MyVisana & myPoints' },
    tagline: 'La grande caisse bernoise alliant proximité humaine, sport et innovation santé.',
    overview: 'Née à Berne, Visana est l\'un des groupes de santé les plus réputés de Suisse. Très présente tant en Suisse alémanique qu\'en Suisse romande, Visana se distingue par son programme d\'incitation sportive myPoints, sa couverture hospitalière modulaire et son service client haut de gamme.',
    historyAndGovernance: 'Visana est issue de la fusion de la KKB (fondée en 1907) et de plusieurs caisses bernoises et régionales. Elle opère sous forme de holding mutualiste dédiée au bien-être de ses assurés.',
    indicativePremiums2026: [
      { canton: 'GE', cantonName: 'Genève', adult300: 590.20, adult2500: 444.00, youngAdult300: 464.00, child0: 162.00 },
      { canton: 'VD', cantonName: 'Vaud', adult300: 544.00, adult2500: 400.00, youngAdult300: 420.00, child0: 148.00 },
      { canton: 'VS', cantonName: 'Valais', adult300: 434.00, adult2500: 297.00, youngAdult300: 330.00, child0: 118.00 },
      { canton: 'NE', cantonName: 'Neuchâtel', adult300: 556.00, adult2500: 414.00, youngAdult300: 432.00, child0: 153.00 },
      { canton: 'FR', cantonName: 'Fribourg', adult300: 470.00, adult2500: 327.00, youngAdult300: 364.00, child0: 128.00 },
      { canton: 'JU', cantonName: 'Jura', adult300: 528.00, adult2500: 384.00, youngAdult300: 407.00, child0: 142.00 },
      { canton: 'BE', cantonName: 'Berne', adult300: 514.00, adult2500: 370.00, youngAdult300: 395.00, child0: 139.00 },
      { canton: 'ZH', cantonName: 'Zurich', adult300: 490.00, adult2500: 347.00, youngAdult300: 377.00, child0: 132.00 },
      { canton: 'BS', cantonName: 'Bâle-Ville', adult300: 600.00, adult2500: 454.00, youngAdult300: 474.00, child0: 165.00 },
      { canton: 'TI', cantonName: 'Tessin', adult300: 540.00, adult2500: 396.00, youngAdult300: 418.00, child0: 145.00 }
    ],
    lamalModels: [
      { name: 'Standard (Base)', discountPercent: '0%', description: 'Libre choix total de tous les médecins.' },
      { name: 'Telmed (Tel Doc)', discountPercent: '15% – 20%', description: 'Consultation téléphonique préalable auprès de Medi24.' },
      { name: 'Médecin de famille (Med Doc)', discountPercent: '12% – 16%', description: 'Prise en charge par votre médecin traitant conventionné.' },
      { name: 'Réseau HMO (Managed Care)', discountPercent: '15% – 22%', description: 'Prise en charge coordonnée en centre médical HMO.' }
    ],
    alternativeCareModels: [
      {
        type: 'telmed',
        name: 'Visana Tel Doc',
        discount: 'Jusqu\'à -20%',
        firstContact: 'Medi24 par téléphone ou app.',
        emergencyRule: 'Notification obligatoire sous 20 jours.',
        pharmacyNetwork: 'Pharmacies conventionnées avec tiers payant.',
        pros: ['Rabais élevé', 'Simplicité d\'utilisation']
      },
      {
        type: 'medecin-famille',
        name: 'Visana Med Doc',
        discount: 'Jusqu\'à -16%',
        firstContact: 'Médecin de famille référent conventionné.',
        emergencyRule: 'Urgences dispensées.',
        pharmacyNetwork: 'Réseau étendu de pharmacies.',
        pros: ['Suivi médical continu', 'Primes stables']
      },
      {
        type: 'hmo',
        name: 'Visana Managed Care (HMO)',
        discount: 'Jusqu\'à -22%',
        firstContact: 'Centres de santé partenaires et réseaux régionaux.',
        emergencyRule: 'Pôle médical de garde.',
        pharmacyNetwork: 'Pharmacie partenaire du cabinet de groupe.',
        pros: ['Rabais maximal', 'Prise en charge intégrée']
      }
    ],
    lcaHighlights: [
      'Ambulatoire II & III : couverture étendue pour lunettes, médecines douces et secours.',
      'Programme myPoints : jusqu\'à CHF 120 par an de récompense pour vos pas quotidiens.',
      'Hôpital Flex : flexibilité de division de chambre au moment de l\'opération.'
    ],
    lcaCategories: [
      {
        title: 'Assurances complémentaires modulaires',
        products: ['Ambulatoire', 'Hospitalisation', 'Soins dentaires'],
        description: 'Combinaisons sur-mesure pour sportifs et familles.',
        maxCoverage: 'Jusqu\'à CHF 1\'000 / an de contributions bien-être et sport.'
      }
    ],
    strengths: [
      'Excellente implantation dans le canton de Berne, Fribourg, Valais et Neuchâtel.',
      'Programme de bonus santé myPoints très motivant et accessible.',
      'Réseau d\'agences et conseillers physiques très compétents.'
    ],
    weaknesses: ['Primes parfois supérieures à la moyenne à Genève.'],
    digitalTools: ['App MyVisana', 'App myPoints (bonus pas connectés)'],
    competitorComparisons: [
      {
        competitorName: 'Concordia',
        competitorSlug: 'concordia',
        keyDifference: 'Visana met l\'accent sur le sport connecté, alors que Concordia privilégie les rabais enfants.',
        priceComparison: 'Tarifs comparables en Suisse romande.',
        targetAudience: 'Actifs, sportifs et familles bernoises et romandes.'
      },
      {
        competitorName: 'CSS Assurance',
        competitorSlug: 'css',
        keyDifference: 'Visana propose le programme myPoints pour les sportifs, tandis que CSS propose myStep et active+.',
        priceComparison: 'Visana est souvent très bien placée dans le canton de Berne et Fribourg.',
        targetAudience: 'Assurés axés sur la prévention et le sport.'
      }
    ],
    switchingTips: {
      deadline: '30 novembre 2026',
      address: 'Visana Assurances SA, Weltpoststrasse 19, 3000 Berne 15',
      advice: ['Envoyez votre résiliation en recommandé avant le 20 novembre.']
    },
    faqs: [
      {
        question: "Comment fonctionne le programme myPoints de Visana ?",
        answer: "myPoints synchronise vos pas quotidiens et vos activités sportives avec votre smartphone pour vous verser jusqu'à CHF 120 de bonus en espèces chaque année."
      },
      {
        question: "Comment fonctionne le modèle Tel Doc chez Visana ?",
        answer: "Avant chaque rendez-vous médical, vous contactez la centrale de télémédecine Medi24 (par téléphone ou via l'application MyVisana) qui évalue votre situation et valide une consultation chez un spécialiste si nécessaire."
      },
      {
        question: "Quelle est la date limite pour résilier son contrat chez Visana ?",
        answer: "Pour que la résiliation de votre assurance de base LAMal soit effective au 1er janvier, votre lettre recommandée doit impérativement parvenir à Visana au plus tard le 30 novembre."
      }
    ],
    metaDescription: "Visana Assurance Maladie 2026 : primes LAMal Berne & Romandie, modèles Tel Doc/Med Doc, myPoints, avis et comparateur."
  },

  kpt: {
    id: 'kpt',
    name: 'KPT / CPT',
    slug: 'kpt',
    brandColor: '#00796B',
    headquarters: 'Berne',
    cantonHq: 'BE',
    foundedYear: 1890,
    membersCount: '600\'000 assurés',
    bagRegistration: 'OFSP N° 0376',
    satisfactionRating: 5.3,
    stars: 5,
    marketShare: 'Pionnier du 100% en ligne (~7.5% du marché)',
    evolution2026: '+5.5% en moyenne suisse en 2026',
    reservesRatio: '170% des exigences légales OFSP',
    reimbursementSpeed: '2 à 3 jours ouvrés',
    appRating: { appStore: 4.8, googlePlay: 4.7, name: 'KPTnet' },
    tagline: 'L\'assureur-santé en ligne le plus primé de Suisse pour sa simplicité et sa transparence.',
    overview: 'Fondée en 1890 à Berne pour les cheminots suisses, la KPT (CPT en français) est devenue la caisse maladie numérique de référence en Suisse. Précurseur de l\'assurance maladie sans papier depuis plus de 20 ans, KPT allie primes très attractives et service client ultra-rapide.',
    historyAndGovernance: 'À l\'origine Caisse maladie du personnel des chemins de fer (KPT), l\'institution est aujourd\'hui une société coopérative moderne où chaque assuré bénéficie de la gestion saine des coûts administratifs.',
    indicativePremiums2026: [
      { canton: 'GE', cantonName: 'Genève', adult300: 575.00, adult2500: 429.00, youngAdult300: 449.00, child0: 156.00 },
      { canton: 'VD', cantonName: 'Vaud', adult300: 529.00, adult2500: 385.00, youngAdult300: 405.00, child0: 142.00 },
      { canton: 'VS', cantonName: 'Valais', adult300: 419.00, adult2500: 282.00, youngAdult300: 315.00, child0: 112.00 },
      { canton: 'NE', cantonName: 'Neuchâtel', adult300: 541.00, adult2500: 399.00, youngAdult300: 417.00, child0: 147.00 },
      { canton: 'FR', cantonName: 'Fribourg', adult300: 455.00, adult2500: 312.00, youngAdult300: 349.00, child0: 122.00 },
      { canton: 'JU', cantonName: 'Jura', adult300: 513.00, adult2500: 369.00, youngAdult300: 392.00, child0: 136.00 },
      { canton: 'BE', cantonName: 'Berne', adult300: 499.00, adult2500: 355.00, youngAdult300: 381.00, child0: 133.00 },
      { canton: 'ZH', cantonName: 'Zurich', adult300: 476.00, adult2500: 332.00, youngAdult300: 363.00, child0: 127.00 },
      { canton: 'BS', cantonName: 'Bâle-Ville', adult300: 585.00, adult2500: 439.00, youngAdult300: 459.00, child0: 160.00 },
      { canton: 'TI', cantonName: 'Tessin', adult300: 525.00, adult2500: 381.00, youngAdult300: 403.00, child0: 139.00 }
    ],
    lamalModels: [
      { name: 'Standard (Base)', discountPercent: '0%', description: 'Libre choix avec gestion 100% numérique KPTnet.' },
      { name: 'KPTwin.doc (Médecin de famille)', discountPercent: '12% – 17%', description: 'Médecin traitant conventionné de premier recours.' },
      { name: 'KPTwin.plus (Telmed & Médecin)', discountPercent: '15% – 20%', description: 'Premier conseil par Medgate ou médecin conventionné.' },
      { name: 'KPTwin.easy (Telmed pur)', discountPercent: '17% – 22%', description: 'Téléconsultation obligatoire Medgate avant toute visite.' }
    ],
    alternativeCareModels: [
      {
        type: 'telmed',
        name: 'KPTwin.easy',
        discount: 'Jusqu\'à -22%',
        firstContact: 'Medgate par app ou téléphone.',
        emergencyRule: 'Notification sous 10 jours.',
        pharmacyNetwork: 'Pharmacies partenaires pour génériques.',
        pros: ['Économie maximale', 'Gestion 100% mobile ultra-rapide']
      },
      {
        type: 'medecin-famille',
        name: 'KPTwin.doc',
        discount: 'Jusqu\'à -17%',
        firstContact: 'Médecin de famille référent désigné.',
        emergencyRule: 'Urgences dispensées.',
        pharmacyNetwork: 'Libre choix en pharmacie.',
        pros: ['Relation de confiance avec votre médecin', 'Primes compétitives']
      },
      {
        type: 'hmo',
        name: 'KPTwin.plus',
        discount: 'Jusqu\'à -20%',
        firstContact: 'Centre Medgate ou cabinet de groupe partenaire.',
        emergencyRule: 'Prise en charge d\'urgence directe.',
        pharmacyNetwork: 'Pharmacies conventionnées KPT.',
        pros: ['Flexibilité hybride', 'Couverture optimale']
      }
    ],
    lcaHighlights: [
      'Assurance de soins KPT : médecines complémentaires, lunettes et secours.',
      'ActivePlus : bonus pour activités sportives et prévention.',
      'Assurance dentaire KPT : formules souples pour enfants.'
    ],
    lcaCategories: [
      {
        title: 'Assurances complémentaires en ligne',
        products: ['Assurance de soins', 'Assurance hospitalisation', 'Assurance dentaire'],
        description: 'Souscription simplifiée et gestion des factures en 2 clics.',
        maxCoverage: 'Prise en charge complète en Suisse et en voyage.'
      }
    ],
    strengths: [
      'Portail KPTnet et application mobile parmi les plus ergonomiques de Suisse.',
      'Primes très bien positionnées en Romandie et à Berne.',
      'Remboursement ultrarapide par virement automatique.'
    ],
    weaknesses: ['Peu d\'agences physiques pour un contact en face-à-face.'],
    digitalTools: ['App KPTnet', 'Medgate intégré', 'Portail web'],
    competitorComparisons: [
      {
        competitorName: 'Sanitas',
        competitorSlug: 'sanitas',
        keyDifference: 'KPT offre un positionnement tarifaire souvent plus agressif que Sanitas sur le digital.',
        priceComparison: 'KPT souvent moins chère de 3% à 7% sur les modèles Telmed.',
        targetAudience: 'Utilisateurs mobiles et personnes recherchant l\'efficacité.'
      },
      {
        competitorName: 'Atupri',
        competitorSlug: 'atupri',
        keyDifference: 'KPT dispose d\'une communauté numérique plus large et de fonctionnalités de paiement immédiat.',
        priceComparison: 'Tarifs très similaires.',
        targetAudience: 'Assurés connectés privilégiant l\'ergonomie mobile.'
      }
    ],
    switchingTips: {
      deadline: '30 novembre 2026',
      address: 'KPT Caisse-maladie SA, Wankdorfallee 3, Case postale, 3000 Berne 22',
      advice: ['Créez votre compte KPTnet dès votre affiliation pour gérer vos factures instantanément.']
    },
    faqs: [
      {
        question: "Qu'est-ce que le modèle KPTwin.easy ?",
        answer: "C'est le modèle Telmed de KPT qui passe obligatoirement par Medgate pour vous offrir jusqu'à 22% de rabais sur votre prime mensuelle."
      },
      {
        question: "Quels sont les avantages de la plateforme KPTnet ?",
        answer: "KPTnet vous permet de transmettre vos factures en photo, de suivre vos remboursements en direct et d'obtenir le virement sur votre compte bancaire sous 48 heures."
      },
      {
        question: "Quelle est la date limite pour résilier son contrat chez KPT / CPT ?",
        answer: "Votre lettre de résiliation LAMal en recommandé doit être réceptionnée au siège de Berne au plus tard le 30 novembre."
      }
    ],
    metaDescription: "KPT CPT Assurance Maladie 2026 : primes en ligne officielles, modèles KPTwin, portail KPTnet, avis et comparatif gratuit."
  },

  atupri: {
    id: 'atupri',
    name: 'Atupri',
    slug: 'atupri',
    brandColor: '#5C6BC0',
    headquarters: 'Berne',
    cantonHq: 'BE',
    foundedYear: 1910,
    membersCount: '180\'000 assurés',
    bagRegistration: 'OFSP N° 0312',
    satisfactionRating: 5.0,
    stars: 4,
    marketShare: 'Spécialiste de la santé connectée (~2.5% du marché)',
    evolution2026: '+5.7% en moyenne suisse en 2026',
    reservesRatio: '165% des exigences légales OFSP',
    reimbursementSpeed: '3 à 5 jours ouvrés',
    appRating: { appStore: 4.6, googlePlay: 4.5, name: 'Atupri App' },
    tagline: 'L\'assureur santé moderne centré sur l\'autonomie et la prévention active.',
    overview: 'Atupri est une caisse maladie bernoise novatrice qui place la santé préventive, le mouvement et la simplicité numérique au cœur de son offre. Reconnue pour son service client direct et ses forfaits sportifs généreux, Atupri s\'adresse à tous ceux qui souhaitent une gestion simple et autonome de leur santé.',
    historyAndGovernance: 'Fondée en 1910 à Berne, Atupri a su se réinventer pour devenir une caisse 100% indépendante et moderne sans bureaucratie superflue.',
    indicativePremiums2026: [
      { canton: 'GE', cantonName: 'Genève', adult300: 580.00, adult2500: 434.00, youngAdult300: 454.00, child0: 158.00 },
      { canton: 'VD', cantonName: 'Vaud', adult300: 534.00, adult2500: 390.00, youngAdult300: 410.00, child0: 144.00 },
      { canton: 'VS', cantonName: 'Valais', adult300: 424.00, adult2500: 287.00, youngAdult300: 320.00, child0: 114.00 },
      { canton: 'NE', cantonName: 'Neuchâtel', adult300: 546.00, adult2500: 404.00, youngAdult300: 422.00, child0: 149.00 },
      { canton: 'FR', cantonName: 'Fribourg', adult300: 460.00, adult2500: 317.00, youngAdult300: 354.00, child0: 124.00 },
      { canton: 'JU', cantonName: 'Jura', adult300: 518.00, adult2500: 374.00, youngAdult300: 397.00, child0: 138.00 },
      { canton: 'BE', cantonName: 'Berne', adult300: 504.00, adult2500: 360.00, youngAdult300: 386.00, child0: 135.00 },
      { canton: 'ZH', cantonName: 'Zurich', adult300: 481.00, adult2500: 337.00, youngAdult300: 368.00, child0: 129.00 },
      { canton: 'BS', cantonName: 'Bâle-Ville', adult300: 590.00, adult2500: 444.00, youngAdult300: 464.00, child0: 162.00 },
      { canton: 'TI', cantonName: 'Tessin', adult300: 530.00, adult2500: 386.00, youngAdult300: 408.00, child0: 141.00 }
    ],
    lamalModels: [
      { name: 'Standard (Base)', discountPercent: '0%', description: 'Libre choix.' },
      { name: 'TelFirst (Telmed)', discountPercent: '15% – 20%', description: 'Conseil par télémédecine Medgate.' },
      { name: 'CareMed (Médecin de famille)', discountPercent: '12% – 16%', description: 'Médecin traitant.' }
    ],
    alternativeCareModels: [
      {
        type: 'telmed',
        name: 'Atupri TelFirst',
        discount: 'Jusqu\'à -20%',
        firstContact: 'Medgate avant consultation.',
        emergencyRule: 'Notification obligatoire.',
        pharmacyNetwork: 'Pharmacies partenaires.',
        pros: ['Rabais attractif', 'App fluide']
      },
      {
        type: 'medecin-famille',
        name: 'Atupri CareMed',
        discount: 'Jusqu\'à -16%',
        firstContact: 'Médecin de famille conventionné.',
        emergencyRule: 'Urgences dispensées.',
        pharmacyNetwork: 'Réseau libre de pharmacies.',
        pros: ['Suivi personnalisé', 'Tarif attractif']
      }
    ],
    lcaHighlights: [
      'Mivita : complémentaire modulaire avec forfait sport jusqu\'à CHF 400/an.',
      'Denta : soins dentaires et orthodontie sans franchise.'
    ],
    lcaCategories: [
      {
        title: 'Complémentaires Mivita',
        products: ['Mivita Reala', 'Mivita Extensa'],
        description: 'Forfaits clairs et transparents pour le quotidien.',
        maxCoverage: 'Prise en charge des médecines naturelles et lunettes.'
      }
    ],
    strengths: ['Application claire et moderne', 'Contributions sportives faciles à obtenir'],
    weaknesses: ['Notoriété plus faible en Suisse romande'],
    digitalTools: ['App Atupri', 'Portail client'],
    competitorComparisons: [
      {
        competitorName: 'KPT',
        competitorSlug: 'kpt',
        keyDifference: 'Deux caisses bernoises axées sur le digital avec d\'excellents retours clients.',
        priceComparison: 'Tarifs très proches.',
        targetAudience: 'Assurés connectés et sportifs.'
      },
      {
        competitorName: 'Sympany',
        competitorSlug: 'sympany',
        keyDifference: 'Atupri est axée sur la prévention physique et le sport, tandis que Sympany met en avant le remboursement des excédents.',
        priceComparison: 'Primes comparables en Romandie.',
        targetAudience: 'Actifs et jeunes adultes.'
      }
    ],
    switchingTips: {
      deadline: '30 novembre 2026',
      address: 'Atupri Assurance de la santé, Zieglerstrasse 29, 3000 Berne 65',
      advice: ['Envoyez votre résiliation avant le 20 novembre.']
    },
    faqs: [
      {
        question: "Qu'est-ce que le modèle Atupri TelFirst ?",
        answer: "C'est le modèle Telmed d'Atupri qui offre jusqu'à 20% d'économie en consultant d'abord un médecin Medgate par téléphone ou visio."
      },
      {
        question: "Quelles sont les contributions sportives proposées par Atupri ?",
        answer: "Avec le module complémentaire Mivita, Atupri rembourse jusqu'à CHF 400 par an pour vos abonnements de fitness, clubs sportifs ou cours de prévention santé."
      },
      {
        question: "Quand résilier sa police LAMal chez Atupri ?",
        answer: "La lettre recommandée de résiliation doit parvenir à la direction d'Atupri à Berne avant le 30 novembre à 17h00."
      }
    ],
    metaDescription: "Atupri Assurance Maladie 2026 : primes KVG officielles, modèle TelFirst, complémentaires Mivita, avis et comparatif."
  },

  sympany: {
    id: 'sympany',
    name: 'Sympany',
    slug: 'sympany',
    brandColor: '#F57C00',
    headquarters: 'Bâle',
    cantonHq: 'BS',
    foundedYear: 1914,
    membersCount: '250\'000 assurés',
    bagRegistration: 'OFSP N° 0509',
    satisfactionRating: 5.1,
    stars: 5,
    marketShare: 'L\'assureur équitable bâlois (~3.5% du marché)',
    evolution2026: '+5.8% en moyenne suisse en 2026',
    reservesRatio: '168% des exigences légales OFSP',
    reimbursementSpeed: '3 à 5 jours ouvrés',
    appRating: { appStore: 4.6, googlePlay: 4.5, name: 'mySympany' },
    tagline: 'L\'assurance maladie humaine qui vous rembourse les surplus de prime.',
    overview: 'Sympany est une caisse innovante et équitable basée à Bâle. Célèbre pour son principe unique de redistribution des excédents de primes à ses assurés lorsque les coûts de santé sont moins élevés que prévu, Sympany offre un service transparent et chaleureux.',
    historyAndGovernance: 'Fondée en 1914 sous le nom d\'ÖKK Bâle, Sympany a adopté son identité moderne pour proposer une alternative éthique et responsable sur le marché suisse de la santé.',
    indicativePremiums2026: [
      { canton: 'GE', cantonName: 'Genève', adult300: 586.00, adult2500: 440.00, youngAdult300: 460.00, child0: 160.00 },
      { canton: 'VD', cantonName: 'Vaud', adult300: 540.00, adult2500: 396.00, youngAdult300: 416.00, child0: 146.00 },
      { canton: 'VS', cantonName: 'Valais', adult300: 430.00, adult2500: 293.00, youngAdult300: 326.00, child0: 116.00 },
      { canton: 'NE', cantonName: 'Neuchâtel', adult300: 552.00, adult2500: 410.00, youngAdult300: 428.00, child0: 151.00 },
      { canton: 'FR', cantonName: 'Fribourg', adult300: 466.00, adult2500: 323.00, youngAdult300: 360.00, child0: 126.00 },
      { canton: 'JU', cantonName: 'Jura', adult300: 524.00, adult2500: 380.00, youngAdult300: 403.00, child0: 140.00 },
      { canton: 'BE', cantonName: 'Berne', adult300: 510.00, adult2500: 366.00, youngAdult300: 392.00, child0: 137.00 },
      { canton: 'ZH', cantonName: 'Zurich', adult300: 487.00, adult2500: 343.00, youngAdult300: 374.00, child0: 131.00 },
      { canton: 'BS', cantonName: 'Bâle-Ville', adult300: 594.00, adult2500: 448.00, youngAdult300: 468.00, child0: 164.00 },
      { canton: 'TI', cantonName: 'Tessin', adult300: 536.00, adult2500: 392.00, youngAdult300: 414.00, child0: 143.00 }
    ],
    lamalModels: [
      { name: 'classic (Standard)', discountPercent: '0%', description: 'Libre choix.' },
      { name: 'callmed 24 (Telmed)', discountPercent: '15% – 20%', description: 'Télémédecine obligatoire avant consultation.' },
      { name: 'casamed (Médecin de famille)', discountPercent: '12% – 16%', description: 'Médecin référent.' },
      { name: 'flexmed (Modèle hybride)', discountPercent: '14% – 18%', description: 'Choix entre médecin, pharmacie ou télémédecine.' }
    ],
    alternativeCareModels: [
      {
        type: 'telmed',
        name: 'callmed 24',
        discount: 'Jusqu\'à -20%',
        firstContact: 'Centrale médicale téléphonique.',
        emergencyRule: 'Notification requise.',
        pharmacyNetwork: 'Pharmacies conventionnées.',
        pros: ['Remboursement des excédents', 'Modèle très souple']
      },
      {
        type: 'medecin-famille',
        name: 'casamed',
        discount: 'Jusqu\'à -16%',
        firstContact: 'Médecin de premier recours.',
        emergencyRule: 'Urgences dispensées.',
        pharmacyNetwork: 'Pharmacies conventionnées.',
        pros: ['Coordination médicale personnalisée', 'Tarif attractif']
      },
      {
        type: 'hmo',
        name: 'flexmed',
        discount: 'Jusqu\'à -18%',
        firstContact: 'Choix flexible entre téléconsultation, pharmacie partenaire ou médecin.',
        emergencyRule: 'Assistance directe.',
        pharmacyNetwork: 'Réseau partenaires.',
        pros: ['Liberté d\'orientation', 'Rabais équilibré']
      }
    ],
    lcaHighlights: [
      'plus / premium : couverture complémentaire étendue avec médecines douces et lunettes.',
      'hospital flex : liberté de chambre d\'hôpital.'
    ],
    lcaCategories: [
      {
        title: 'Complémentaires Sympany',
        products: ['plus', 'premium', 'hospital flex'],
        description: 'Prestations médicales complètes sans clauses abusives.',
        maxCoverage: 'Remboursement équitable et solidaire.'
      }
    ],
    strengths: ['Remboursement équitable des excédents de primes', 'Excellente satisfaction client'],
    weaknesses: ['Moins d\'agences physiques en Suisse romande'],
    digitalTools: ['App mySympany', 'Portail web'],
    competitorComparisons: [
      {
        competitorName: 'Sanitas',
        competitorSlug: 'sanitas',
        keyDifference: 'Sympany se distingue par sa promesse de redistribution des surplus financiers.',
        priceComparison: 'Tarifs compétitifs.',
        targetAudience: 'Assurés sensibles à l\'éthique et aux valeurs équitables.'
      },
      {
        competitorName: 'SWICA',
        competitorSlug: 'swica',
        keyDifference: 'Sympany redistribue les surplus financiers aux assurés alors que SWICA privilégie les forfaits prévention sport.',
        priceComparison: 'Primes proches en Suisse romande.',
        targetAudience: 'Assurés recherchant une gestion éthique et équitable.'
      }
    ],
    switchingTips: {
      deadline: '30 novembre 2026',
      address: 'Sympany, Peter Merian-Weg 4, 4002 Bâle',
      advice: ['Envoyez votre résiliation recommandée avant la fin novembre.']
    },
    faqs: [
      {
        question: "Comment Sympany rembourse-t-elle les surplus de prime ?",
        answer: "Si les dépenses de santé de votre groupe d'assurance sont inférieures aux prévisions, Sympany vous reverse directement une partie du surplus sur votre compte bancaire."
      },
      {
        question: "Qu'est-ce que le modèle hybride flexmed chez Sympany ?",
        answer: "flexmed vous donne la liberté de choisir lors de chaque nouveau pépin de santé entre un appel à la centrale de télémédecine, une visite chez votre médecin de famille ou un conseil en pharmacie partenaire."
      },
      {
        question: "Quelle est la date limite pour résilier son contrat chez Sympany ?",
        answer: "Votre courrier recommandé de résiliation doit être reçu au siège de Sympany à Bâle au plus tard le 30 novembre."
      }
    ],
    metaDescription: "Sympany Assurance Maladie 2026 : caisse équitable suisse, primes Bâle & Romandie, modèles casamed & callmed, comparatif."
  },

  oekk: {
    id: 'oekk',
    name: 'ÖKK',
    slug: 'oekk',
    brandColor: '#283593',
    headquarters: 'Landquart (Grisons)',
    cantonHq: 'GR',
    foundedYear: 1936,
    membersCount: '180\'000 assurés',
    bagRegistration: 'OFSP N° 0455',
    satisfactionRating: 5.4,
    stars: 5,
    marketShare: 'La caisse avec le bon sens montagnard (~2.5% du marché)',
    evolution2026: '+5.3% en moyenne suisse en 2026',
    reservesRatio: '182% des exigences légales OFSP',
    reimbursementSpeed: '2 à 4 jours ouvrés',
    appRating: { appStore: 4.7, googlePlay: 4.6, name: 'ÖKK App' },
    tagline: 'L\'assurance maladie simple, directe et proche des gens.',
    overview: 'Née dans les Grisons en 1936, ÖKK est l\'une des caisses les plus sympathiques et directes de Suisse. Reconnue pour son bon sens montagnard, ses conseils limpides et ses excellentes couvertures pour les familles et les adeptes de sports outdoor, ÖKK est agréée sur tout le territoire suisse.',
    historyAndGovernance: 'Fondée à Landquart, ÖKK est restée fidèle à ses racines coopératives et montagnardes en privilégiant des relations humaines et directes avec ses assurés.',
    indicativePremiums2026: [
      { canton: 'GE', cantonName: 'Genève', adult300: 588.00, adult2500: 442.00, youngAdult300: 462.00, child0: 162.00 },
      { canton: 'VD', cantonName: 'Vaud', adult300: 542.00, adult2500: 398.00, youngAdult300: 418.00, child0: 148.00 },
      { canton: 'VS', cantonName: 'Valais', adult300: 432.00, adult2500: 295.00, youngAdult300: 328.00, child0: 118.00 },
      { canton: 'NE', cantonName: 'Neuchâtel', adult300: 554.00, adult2500: 412.00, youngAdult300: 430.00, child0: 153.00 },
      { canton: 'FR', cantonName: 'Fribourg', adult300: 468.00, adult2500: 325.00, youngAdult300: 362.00, child0: 128.00 },
      { canton: 'JU', cantonName: 'Jura', adult300: 526.00, adult2500: 382.00, youngAdult300: 405.00, child0: 142.00 },
      { canton: 'BE', cantonName: 'Berne', adult300: 512.00, adult2500: 368.00, youngAdult300: 394.00, child0: 139.00 },
      { canton: 'ZH', cantonName: 'Zurich', adult300: 489.00, adult2500: 345.00, youngAdult300: 376.00, child0: 133.00 },
      { canton: 'BS', cantonName: 'Bâle-Ville', adult300: 598.00, adult2500: 452.00, youngAdult300: 472.00, child0: 166.00 },
      { canton: 'TI', cantonName: 'Tessin', adult300: 538.00, adult2500: 394.00, youngAdult300: 416.00, child0: 145.00 }
    ],
    lamalModels: [
      { name: 'ÖKK BASE (Standard)', discountPercent: '0%', description: 'Libre choix.' },
      { name: 'ÖKK TELEMED', discountPercent: '15% – 20%', description: 'Télémédecine Santé24.' },
      { name: 'ÖKK MEINARZT', discountPercent: '12% – 17%', description: 'Médecin de famille.' }
    ],
    alternativeCareModels: [
      {
        type: 'telmed',
        name: 'ÖKK TELEMED',
        discount: 'Jusqu\'à -20%',
        firstContact: 'Santé24 avant consultation.',
        emergencyRule: 'Notification requise.',
        pharmacyNetwork: 'Pharmacies conventionnées.',
        pros: ['Conseil clair', 'Prise en charge chaleureuse']
      },
      {
        type: 'medecin-famille',
        name: 'ÖKK MEINARZT',
        discount: 'Jusqu\'à -17%',
        firstContact: 'Médecin de famille choisi.',
        emergencyRule: 'Urgences dispensées.',
        pharmacyNetwork: 'Libre choix en pharmacie.',
        pros: ['Confiance mutuelle', 'Gestion locale des soins']
      }
    ],
    lcaHighlights: [
      'ÖKK START, PLUS, PREMIUM : couvertures ambulatoires et orthodontie généreuse.',
      'Assurance accident et sports de plein air renforcée.'
    ],
    lcaCategories: [
      {
        title: 'Assurances complémentaires outdoor',
        products: ['ÖKK START', 'ÖKK PLUS', 'ÖKK PREMIUM'],
        description: 'Idéal pour familles sportives et passionnés de montagne.',
        maxCoverage: 'Prestations de sauvetage et soins étendus.'
      }
    ],
    strengths: ['Relation client personnalisée et conviviale', 'Prestations adaptées aux familles et sportifs'],
    weaknesses: ['Agences physiques principalement en Suisse alémanique'],
    digitalTools: ['App ÖKK', 'Portail en ligne'],
    competitorComparisons: [
      {
        competitorName: 'Swica',
        competitorSlug: 'swica',
        keyDifference: 'ÖKK offre une approche plus intime et montagnarde, tout en partageant le service santé24.',
        priceComparison: 'Tarifs très proches.',
        targetAudience: 'Familles, sportifs et amateurs de plein air.'
      },
      {
        competitorName: 'Visana',
        competitorSlug: 'visana',
        keyDifference: 'ÖKK met en avant des garanties de sauvetage et de protection outdoor solides.',
        priceComparison: 'Tarifs comparables.',
        targetAudience: 'Amoureux de nature et familles.'
      }
    ],
    switchingTips: {
      deadline: '30 novembre 2026',
      address: 'ÖKK Kranken- und Unfallversicherungen AG, Bahnhofstrasse 13, 7302 Landquart',
      advice: ['Envoyez votre résiliation avant le 20 novembre.']
    },
    faqs: [
      {
        question: "ÖKK est-elle accessible pour les résidents de Suisse romande ?",
        answer: "Oui, ÖKK est agréée OFSP sur l'ensemble des 26 cantons suisses et propose l'ensemble de ses tarifs et services en français."
      },
      {
        question: "Comment contacter le service médical chez ÖKK ?",
        answer: "Les assurés du modèle ÖKK TELEMED bénéficient d'un accès direct 24h/24 au service de télémédecine santé24 en composant le numéro dédié indiqué sur leur carte d'assuré."
      },
      {
        question: "Quels sont les délais pour résilier son contrat chez ÖKK ?",
        answer: "Pour une résiliation au 31 décembre, votre demande en courrier recommandé doit être réceptionnée au siège d'ÖKK à Landquart avant le 30 novembre."
      }
    ],
    metaDescription: "ÖKK Assurance Maladie 2026 : tarifs et primes LAMal officielles, modèle ÖKK Telemed, complémentaires et comparateur."
  },

  egk: {
    id: 'egk',
    name: 'EGK Caisse de Santé',
    slug: 'egk',
    brandColor: '#33691E',
    headquarters: 'Laufen (Bâle-Campagne)',
    cantonHq: 'BL',
    foundedYear: 1919,
    membersCount: '100\'000 assurés',
    bagRegistration: 'OFSP N° 0881',
    satisfactionRating: 5.3,
    stars: 5,
    marketShare: 'Spécialiste N° 1 des médecines naturelles (~1.5% du marché)',
    evolution2026: '+5.6% en moyenne suisse en 2026',
    reservesRatio: '175% des exigences légales OFSP',
    reimbursementSpeed: '3 à 5 jours ouvrés',
    appRating: { appStore: 4.6, googlePlay: 4.5, name: 'EGK App' },
    tagline: 'L\'assureur de référence pour les adeptes de médecines complémentaires et de prévention douce.',
    overview: 'EGK est la caisse de santé suisse pionnière de la conciliation entre médecine académique conventionnelle et médecine naturelle/holistique. Disposant de son propre registre de thérapeutes agréés (SNE), EGK offre les remboursements les plus larges de Suisse pour la naturopathie, l\'ostéopathie et l\'homéopathie.',
    historyAndGovernance: 'Fondée en 1919 à Laufen, EGK a été la première caisse suisse à reconnaître officiellement la valeur thérapeutique des médecines douces et préventives.',
    indicativePremiums2026: [
      { canton: 'GE', cantonName: 'Genève', adult300: 592.00, adult2500: 446.00, youngAdult300: 466.00, child0: 163.00 },
      { canton: 'VD', cantonName: 'Vaud', adult300: 546.00, adult2500: 402.00, youngAdult300: 422.00, child0: 149.00 },
      { canton: 'VS', cantonName: 'Valais', adult300: 436.00, adult2500: 299.00, youngAdult300: 332.00, child0: 119.00 },
      { canton: 'NE', cantonName: 'Neuchâtel', adult300: 558.00, adult2500: 416.00, youngAdult300: 434.00, child0: 154.00 },
      { canton: 'FR', cantonName: 'Fribourg', adult300: 472.00, adult2500: 329.00, youngAdult300: 366.00, child0: 129.00 },
      { canton: 'JU', cantonName: 'Jura', adult300: 530.00, adult2500: 386.00, youngAdult300: 409.00, child0: 143.00 },
      { canton: 'BE', cantonName: 'Berne', adult300: 516.00, adult2500: 372.00, youngAdult300: 398.00, child0: 140.00 },
      { canton: 'ZH', cantonName: 'Zurich', adult300: 492.00, adult2500: 349.00, youngAdult300: 380.00, child0: 134.00 },
      { canton: 'BS', cantonName: 'Bâle-Ville', adult300: 602.00, adult2500: 456.00, youngAdult300: 476.00, child0: 167.00 },
      { canton: 'TI', cantonName: 'Tessin', adult300: 542.00, adult2500: 398.00, youngAdult300: 420.00, child0: 146.00 }
    ],
    lamalModels: [
      { name: 'EGK-Care (Standard)', discountPercent: '0%', description: 'Libre choix complet.' },
      { name: 'EGK-TelMed', discountPercent: '15% – 20%', description: 'Télémédecine.' }
    ],
    alternativeCareModels: [
      {
        type: 'telmed',
        name: 'EGK-TelMed',
        discount: 'Jusqu\'à -20%',
        firstContact: 'Centrale médicale de triage.',
        emergencyRule: 'Notification requise.',
        pharmacyNetwork: 'Pharmacies conventionnées et remèdes naturels.',
        pros: ['Rabais élevé', 'Large ouverture aux soins naturels']
      },
      {
        type: 'medecin-famille',
        name: 'EGK-DocCare',
        discount: 'Jusqu\'à -16%',
        firstContact: 'Médecin de premier recours conventionné EGK.',
        emergencyRule: 'Urgences dispensées.',
        pharmacyNetwork: 'Pharmacies partenaires.',
        pros: ['Suivi personnalisé', 'Sensibilité aux médecines intégratives']
      }
    ],
    lcaHighlights: [
      'EGK-SUN : la couverture la plus réputée de Suisse pour la naturopathie, homéopathie et ostéopathie sans ordonnance.',
      'SNE : accès direct aux thérapeutes certifiés de la Fondation pour les médecines naturelles.'
    ],
    lcaCategories: [
      {
        title: 'Médecines Naturelles & Santé Globale',
        products: ['EGK-SUN', 'EGK-KOMPLEMENTÄR'],
        description: 'La plus vaste liste de méthodes de soins douces remboursées en Suisse.',
        maxCoverage: 'Jusqu\'à 80-90% des soins naturels sans ordonnance.'
      }
    ],
    strengths: ['Remboursement inégalé des médecines naturelles', 'Conseil personnalisé et bienveillant'],
    weaknesses: ['Primes de base un peu plus élevées que les caisses low-cost'],
    digitalTools: ['App EGK', 'Portail thérapeutes SNE'],
    competitorComparisons: [
      {
        competitorName: 'SWICA',
        competitorSlug: 'swica',
        keyDifference: 'EGK est la spécialiste absolue de la médecine holistique, tandis que SWICA excelle dans les contributions fitness.',
        priceComparison: 'Tarifs proches.',
        targetAudience: 'Adeptes d\'homéopathie, phytothérapie et ostéopathie.'
      },
      {
        competitorName: 'Concordia',
        competitorSlug: 'concordia',
        keyDifference: 'EGK rembourse les médecines naturelles sans ordonnance médicale, à la différence des conditions strictes de la plupart des caisses.',
        priceComparison: 'EGK légèrement plus chère sur les primes de base.',
        targetAudience: 'Patients adeptes de santé naturelle et préventive.'
      }
    ],
    switchingTips: {
      deadline: '30 novembre 2026',
      address: 'EGK Caisse de Santé, Birspark 1, 4242 Laufen',
      advice: ['Envoyez votre résiliation avant le 20 novembre.']
    },
    faqs: [
      {
        question: "Pourquoi choisir EGK pour les médecines naturelles ?",
        answer: "EGK rembourse la plus grande variété de thérapies naturelles et complémentaires sans exiger d'ordonnance préalable d'un médecin conventionnel."
      },
      {
        question: "Qu'est-ce que le label SNE chez EGK ?",
        answer: "La Fondation SNE (Stiftung Naturheilkunde und Erfahrungsmedizin) gère le registre officiel des thérapeutes en médecine naturelle agréés et reconnus par EGK."
      },
      {
        question: "Quand résilier sa police LAMal chez EGK ?",
        answer: "La lettre recommandée de résiliation de l'assurance obligatoire des soins doit parvenir à Laufen au plus tard le 30 novembre."
      }
    ],
    metaDescription: "EGK Caisse de Santé 2026 : spécialiste médecines naturelles Suisse, primes LAMal, complémentaire SUN et comparatif."
  },

  aquilana: {
    id: 'aquilana',
    name: 'Aquilana',
    slug: 'aquilana',
    brandColor: '#00838F',
    headquarters: 'Baden (Argovie)',
    cantonHq: 'AG',
    foundedYear: 1892,
    membersCount: '70\'000 assurés',
    bagRegistration: 'OFSP N° 0032',
    satisfactionRating: 5.6,
    stars: 5,
    marketShare: 'La perle indépendante de la satisfaction client (~1.0% du marché)',
    evolution2026: '+5.2% en moyenne suisse en 2026',
    reservesRatio: '195% des exigences légales OFSP (solvabilité record)',
    reimbursementSpeed: '2 à 3 jours ouvrés',
    appRating: { appStore: 4.8, googlePlay: 4.7, name: 'myAquilana' },
    tagline: 'Petite par la taille, immense par la qualité de service et la rapidité.',
    overview: 'Aquilana est une caisse maladie à taille humaine basée à Baden (Argovie). Reconnue dans toute la Suisse pour son service client irréprochable sans attente téléphonique, ses primes très avantageuses et ses délais de remboursement record, Aquilana affiche un taux de satisfaction parmi les plus élevés du pays.',
    historyAndGovernance: 'Fondée en 1892, Aquilana est restée une société coopérative autonome et indépendante de tout grand groupe financier, ce qui lui permet de concentrer 100% de ses ressources au service direct de ses assurés.',
    indicativePremiums2026: [
      { canton: 'GE', cantonName: 'Genève', adult300: 576.00, adult2500: 430.00, youngAdult300: 450.00, child0: 156.00 },
      { canton: 'VD', cantonName: 'Vaud', adult300: 530.00, adult2500: 386.00, youngAdult300: 406.00, child0: 142.00 },
      { canton: 'VS', cantonName: 'Valais', adult300: 420.00, adult2500: 283.00, youngAdult300: 316.00, child0: 112.00 },
      { canton: 'NE', cantonName: 'Neuchâtel', adult300: 542.00, adult2500: 400.00, youngAdult300: 418.00, child0: 147.00 },
      { canton: 'FR', cantonName: 'Fribourg', adult300: 456.00, adult2500: 313.00, youngAdult300: 350.00, child0: 122.00 },
      { canton: 'JU', cantonName: 'Jura', adult300: 514.00, adult2500: 370.00, youngAdult300: 393.00, child0: 136.00 },
      { canton: 'BE', cantonName: 'Berne', adult300: 500.00, adult2500: 356.00, youngAdult300: 382.00, child0: 133.00 },
      { canton: 'ZH', cantonName: 'Zurich', adult300: 477.00, adult2500: 333.00, youngAdult300: 364.00, child0: 127.00 },
      { canton: 'BS', cantonName: 'Bâle-Ville', adult300: 586.00, adult2500: 440.00, youngAdult300: 460.00, child0: 160.00 },
      { canton: 'TI', cantonName: 'Tessin', adult300: 526.00, adult2500: 382.00, youngAdult300: 404.00, child0: 139.00 }
    ],
    lamalModels: [
      { name: 'Standard (Libre choix)', discountPercent: '0%', description: 'Libre choix total des praticiens.' },
      { name: 'CASAMED (Médecin de famille)', discountPercent: '12% – 16%', description: 'Médecin traitant conventionné.' }
    ],
    alternativeCareModels: [
      {
        type: 'medecin-famille',
        name: 'CASAMED',
        discount: 'Jusqu\'à -16%',
        firstContact: 'Médecin de premier recours conventionné.',
        emergencyRule: 'Notification requise.',
        pharmacyNetwork: 'Réseau libre.',
        pros: ['Gestion directe sans tracas', 'Remboursements en 48h']
      },
      {
        type: 'telmed',
        name: 'Aquilana Telmed',
        discount: 'Jusqu\'à -18%',
        firstContact: 'Centrale médicale partenaire avant consultation.',
        emergencyRule: 'Notification sous 10 jours.',
        pharmacyNetwork: 'Pharmacies conventionnées.',
        pros: ['Conseil téléphonique immédiat', 'Rabais substantiel']
      }
    ],
    lcaHighlights: [
      'TOP et HOSPITAL : assurances complémentaires claires et transparentes.',
      'Remboursements rapides et service personnalisé sans centrale téléphonique automatisée.'
    ],
    lcaCategories: [
      {
        title: 'Complémentaires Aquilana',
        products: ['TOP', 'HOSPITAL', 'DENTA'],
        description: 'Des contrats clairs sans clauses cachées.',
        maxCoverage: 'Prise en charge complète et rapide.'
      }
    ],
    strengths: [
      'Service client direct sans temps d\'attente téléphonique.',
      'Taux de satisfaction client record dans les enquêtes neutres (5.6/6.0).',
      'Réserves financières exceptionnelles (195% du minimum légal).'
    ],
    weaknesses: ['Moins connue du grand public que les grands groupes d\'assurance.'],
    digitalTools: ['App myAquilana', 'Portail client sécurisé'],
    competitorComparisons: [
      {
        competitorName: 'SWICA',
        competitorSlug: 'swica',
        keyDifference: 'Aquilana offre une proximité humaine encore plus personnalisée à une échelle artisanale.',
        priceComparison: 'Aquilana est souvent un peu moins chère que Swica.',
        targetAudience: 'Personnes qui détestent les centres d\'appels automatisés et privilégient l\'efficacité humaine.'
      },
      {
        competitorName: 'KPT',
        competitorSlug: 'kpt',
        keyDifference: 'Aquilana mise sur un interlocuteur attitré direct, alors que KPT mise sur des flux 100% automatisés.',
        priceComparison: 'Tarifs très proches.',
        targetAudience: 'Assurés recherchant un service premium à taille humaine.'
      }
    ],
    switchingTips: {
      deadline: '30 novembre 2026',
      address: 'Aquilana Versicherungen, Bruggerstrasse 61, 5401 Baden',
      advice: ['Envoyez votre résiliation avant le 20 novembre.']
    },
    faqs: [
      {
        question: "Aquilana est-elle une caisse maladie solide ?",
        answer: "Oui, avec plus de 130 ans d'histoire et un ratio de réserves frôlant les 200% des exigences légales de l'OFSP, Aquilana est l'une des caisses les plus saines de toute la Suisse."
      },
      {
        question: "Comment se déroule le contact avec le service client d'Aquilana ?",
        answer: "Chez Aquilana, vous êtes directement mis en relation avec un gestionnaire dédié en Suisse sans passer par des menus vocaux automatisés interminables."
      },
      {
        question: "Quelle est la date limite pour résilier son contrat chez Aquilana ?",
        answer: "Votre lettre de résiliation recommandée doit être réceptionnée à Baden au plus tard le 30 novembre."
      }
    ],
    metaDescription: "Aquilana Assurance Maladie 2026 : satisfaction client record 5.6/6, primes LAMal avantageuses, avis et comparatif."
  }
};
