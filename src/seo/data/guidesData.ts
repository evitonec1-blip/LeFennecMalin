/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GuideSEOData {
  slug: string;
  category: 'lamal' | 'franchise' | 'modeles' | 'subside' | 'lca' | '3a' | 'frontalier' | 'profils';
  title: string;
  badge: string;
  readingTime: string;
  publishedDate: string;
  updatedDate: string;
  author: {
    name: string;
    role: string;
  };
  summary: string;
  keyTakeaways: string[];
  tableOfContents: { id: string; label: string }[];
  sections: {
    id: string;
    title: string;
    content: string[]; // HTML/Markdown formatted or structured paragraphs
    callout?: {
      type: 'tip' | 'warning' | 'calc' | 'info';
      title: string;
      text: string;
    };
  }[];
  faqs: { question: string; answer: string }[];
  relatedTabs: string[];
  metaDescription: string;
}

export const GUIDES_SEO_DATA: Record<string, GuideSEOData> = {
  'franchise-300-vs-2500': {
    slug: 'franchise-300-vs-2500',
    category: 'franchise',
    title: 'Franchise 300 ou 2500 : Quelle est la meilleure franchise en Suisse en 2026 ?',
    badge: 'Guide Mathématique & Optimisation Primes',
    readingTime: '5 min',
    publishedDate: '2026-01-15',
    updatedDate: '2026-08-15',
    author: {
      name: 'Équipe d\'experts Le Fennec Malin',
      role: 'Spécialistes Prévoyance & Assurance LAMal'
    },
    summary: 'En Suisse, le choix de la franchise d\'assurance maladie est la décision financière qui a le plus d\'impact sur votre budget annuel. Découvrez la règle mathématique des CHF 1\'800 – 2\'000 de dépenses médicales pour faire le bon choix.',
    keyTakeaways: [
      'En Suisse, seules 2 franchises sont mathématiquement optimales pour un adulte : CHF 300 ou CHF 2\'500.',
      'Les franchises intermédiaires (CHF 500, 1\'000, 1\'500, 2\'000) sont presque toujours désavantageuses en raison du plafonnement légal des rabais de primes (70% max de la prise en charge du risque).',
      'Le seuil de basculement se situe exactement à env. CHF 1\'800 – 2\'000 de dépenses de santé annuelles brutes.',
      'Si vous dépensez moins de CHF 1\'800/an : choisissez TOUJOURS la franchise CHF 2\'500 (économie moyenne de CHF 1\'200 à 1\'540/an sur les primes).',
      'Si vous dépensez plus de CHF 2\'000/an ou avez des soins réguliers : choisissez la franchise CHF 300.'
    ],
    tableOfContents: [
      { id: 'principe-franchise', label: '1. Comment fonctionne la franchise LAMal ?' },
      { id: 'regle-mathematique', label: '2. La règle mathématique des CHF 1\'800' },
      { id: 'piege-franchises-intermediaires', label: '3. Le piège des franchises intermédiaires' },
      { id: 'simulation-chiffree', label: '4. Simulation chiffrée comparative' },
      { id: 'comment-changer', label: '5. Délais pour changer de franchise' }
    ],
    sections: [
      {
        id: 'principe-franchise',
        title: '1. Comment fonctionne la franchise en assurance maladie suisse ?',
        content: [
          'La franchise est le montant annuel des frais de santé que vous devez payer de votre propre poche avant que votre caisse maladie ne commence à rembourser vos factures médicales.',
          'Une fois votre franchise atteinte au cours d\'une année civile, vous ne payez plus que la quote-part légale de 10% (plafonnée à CHF 700 par an pour un adulte et CHF 350 pour un enfant), ainsi qu\'une participation de CHF 15 par jour en cas d\'hospitalisation.'
        ],
        callout: {
          type: 'info',
          title: 'Franchises adultes légales en Suisse',
          text: 'Pour les adultes dès 19 ans, la loi fédérale LAMal fixe 6 paliers de franchise : CHF 300 (franchise minimale obligatoire), 500, 1\'000, 1\'500, 2\'000 et 2\'500 (franchise maximale).'
        }
      },
      {
        id: 'regle-mathematique',
        title: '2. La règle mathématique : le seuil pivot des CHF 1\'800 – 2\'000',
        content: [
          'La loi fédérale sur la surveillance de l\'assurance-maladie autorise les caisses à accorder un rabais maximal de 70% de l\'augmentation de franchise choisie.',
          'Entre la franchise 300 et la franchise 2500, la différence de risque est de CHF 2\'200. Le rabais annuel maximal sur les primes peut ainsi atteindre CHF 1\'540 par an (soit environ CHF 128 à CHF 130 d\'économie par mois).',
          'Si vos frais médicaux réels dans l\'année restent sous la barre de CHF 1\'800, l\'économie réalisée chaque mois sur la prime compense largement les factures de médecin que vous avez réglées.'
        ],
        callout: {
          type: 'calc',
          title: 'Formule de calcul rapide',
          text: 'Coût total annuel = (Prime mensuelle × 12) + Min(Dépenses réelles, Franchise) + Quote-part 10% sur le surplus jusqu\'à CHF 700.'
        }
      },
      {
        id: 'piege-franchises-intermediaires',
        title: '3. Pourquoi éviter les franchises intermédiaires (500, 1000, 1500, 2000) ?',
        content: [
          'Les franchises intermédiaires offrent un rabais de prime disproportionnellement faible par rapport au surcroît de risque financier assumé.',
          'Dans 98% des cas simulés avec les tarifs officiels de l\'OFSP, un assuré se retrouve soit gagnant avec 2500 (en bonne santé), soit gagnant avec 300 (gros consommateur de soins). Les paliers intermédiaires ne constituent qu\'un compromis psychologique coûteux.'
        ]
      },
      {
        id: 'simulation-chiffree',
        title: '4. Simulation chiffrée selon vos dépenses de santé',
        content: [
          'Scénario 1 — Zéro médecin dans l\'année : Avec la franchise 2500, vous économisez 100% du rabais de prime, soit environ CHF 1\'400 à 1\'540 d\'économie nette dans votre poche.',
          'Scénario 2 — CHF 1\'000 de frais médicaux : Avec la franchise 2500, vous payez CHF 1\'000 de soins, mais vous avez économisé CHF 1\'540 de prime. Gain net : CHF 540.',
          'Scénario 3 — CHF 5\'000 de frais médicaux (ex: opération, hospitalisation) : Avec la franchise 300, vous payez 300 + 470 de quote-part = CHF 770. Avec la franchise 2500, vous payez 2500 + 250 = CHF 2\'750. La franchise 300 est alors plus avantageuse d\'environ CHF 440 sur l\'année.'
        ]
      },
      {
        id: 'comment-changer',
        title: '5. Délais légaux pour modifier votre franchise',
        content: [
          'Pour baisser votre franchise (par exemple passer de 2500 à 300) : votre demande écrite doit parvenir à votre caisse maladie au plus tard le 30 novembre.',
          'Pour augmenter votre franchise (par exemple passer de 300 à 2500) : vous avez jusqu\'au 31 décembre pour notifier votre assureur.'
        ]
      }
    ],
    faqs: [
      {
        question: "Quelle franchise choisir pour un enfant en Suisse ?",
        answer: "Pour les enfants jusqu'à 18 ans, la franchise standard est de CHF 0. Certaines caisses proposent une franchise optionnelle de CHF 600 avec un petit rabais, mais les consultations pédiatriques fréquentes rendent la franchise 0 presque toujours préférable."
      },
      {
        question: "Puis-je changer de franchise chaque année ?",
        answer: "Oui. Vous pouvez librement adapter votre franchise chaque année auprès de votre caisse actuelle, sans questionnaire médical pour l'assurance de base obligatoire."
      }
    ],
    relatedTabs: ['tool-calculateur-franchise', 'guide-modeles-assurance', 'canton-geneve', 'canton-vaud'],
    metaDescription: "Franchise 300 ou 2500 ? Comparatif mathématique 2026, seuil des CHF 1800 de dépenses médicales, calcul des économies et guide officiel LAMal."
  },

  'modeles-assurance': {
    slug: 'modeles-assurance',
    category: 'modeles',
    title: 'Modèles d\'assurance maladie en Suisse : Standard, Telmed, HMO ou Médecin de famille ?',
    badge: 'Guide Comparatif Modèles Alternatifs',
    readingTime: '6 min',
    publishedDate: '2026-02-01',
    updatedDate: '2026-08-15',
    author: {
      name: 'Équipe d\'experts Le Fennec Malin',
      role: 'Spécialistes Prévoyance & Assurance LAMal'
    },
    summary: 'En Suisse, plus de 75% des assurés ont abandonné le modèle standard au profit d\'un modèle alternatif (Telmed, HMO, Médecin de famille) permettant de réduire sa prime mensuelle jusqu\'à 25% pour des prestations de soins rigoureusement identiques.',
    keyTakeaways: [
      'Tous les modèles d\'assurance garantissent le même catalogue de prestations de base remboursées à 100% par la loi LAMal.',
      'Le modèle Standard offre le libre choix sans obligation préalable, mais coûte le plus cher.',
      'Le modèle Telmed (télémédecine) offre un rabais de 15% à 22% et convient parfaitement aux actifs connectés et personnes mobiles.',
      'Le modèle Médecin de famille (rabais de 10% à 17%) est idéal pour les familles et personnes souhaitant un médecin référent de confiance.',
      'Le modèle HMO (rabais de 15% à 25%) regroupe des spécialistes et généralistes dans un même cabinet de groupe moderne.'
    ],
    tableOfContents: [
      { id: 'comparatif-modeles', label: '1. Tableau comparatif des 4 modèles' },
      { id: 'modele-telmed', label: '2. Zoom sur le modèle Telmed' },
      { id: 'modele-medecin-famille', label: '3. Zoom sur le Médecin de famille' },
      { id: 'modele-hmo', label: '4. Zoom sur le modèle HMO' },
      { id: 'exceptions-urgences', label: '5. Que se passe-t-il en cas d\'urgence ?' }
    ],
    sections: [
      {
        id: 'comparatif-modeles',
        title: '1. Comparatif des 4 grands modèles d\'assurance maladie',
        content: [
          'En contrepartie d\'une coordination préalable de vos soins, les caisses maladie récompensent les modèles alternatifs par des rabais très substantiels sur la prime mensuelle.',
          'Ces modèles évitent les consultations redondantes chez de multiples spécialistes sans orientation médicale, ce qui génère des économies de coûts pour le système de santé.'
        ]
      },
      {
        id: 'modele-telmed',
        title: '2. Le modèle Telmed (Télémédecine)',
        content: [
          'Avant de consulter un médecin ou de vous rendre dans un cabinet, vous devez appeler un centre de conseil télémédical partenaire (Medgate, Medi24, Santé24, concordiaMed).',
          'Un médecin ou un infirmier qualifié évalue votre situation par téléphone ou vidéo, vous fournit des conseils de traitement immédiats, ou vous délivre une délégation pour consulter un médecin généraliste ou spécialiste.'
        ]
      },
      {
        id: 'modele-medecin-famille',
        title: '3. Le modèle Médecin de famille (Hausarzt)',
        content: [
          'Vous choisissez un médecin de famille agréé sur la liste du réseau de votre caisse. Il devient votre interlocuteur unique et coordonne l\'ensemble de vos soins et examens médicaux.',
          'Si un examen chez un cardiologue, dermatologue ou radiologue est requis, votre médecin de famille vous délivre un bon de délégation.'
        ]
      },
      {
        id: 'modele-hmo',
        title: '4. Le modèle HMO (Health Maintenance Organization)',
        content: [
          'Vous consultez exclusivement au sein d\'un centre médical de groupe partenaire (centre de santé HMO). Ces centres regroupent généralistes, pédiatres, physiothérapeutes et spécialistes sous un même toit avec des horaires étendus.'
        ]
      },
      {
        id: 'exceptions-urgences',
        title: '5. Urgences, gynécologue et ophtalmologue : les exceptions',
        content: [
          'Dans quasiment tous les modèles alternatifs, les consultations chez le gynécologue (contrôle annuel, suivi de grossesse), l\'ophtalmologue (examen de la vue) et le pédiatre pour les enfants restent accessibles directement sans délégation préalable.',
          'En cas d\'urgence vitale ou d\'accident à l\'étranger, vous pouvez bien entendu vous rendre immédiatement au service d\'urgence le plus proche sans appeler au préalable.'
        ]
      }
    ],
    faqs: [
      {
        question: "Que se passe-t-il si j'oublie d'appeler en modèle Telmed ?",
        answer: "La plupart des caisses envoient un premier avertissement de rappel. En cas de récidives répétées sans respect de la règle de délégation, la caisse peut réintégrer l'assuré dans le modèle standard plus cher avec perte du rabais."
      }
    ],
    relatedTabs: ['guide-franchise-300-vs-2500', 'health-comparator', 'insurer-css', 'insurer-helsana'],
    metaDescription: "Modèles d'assurance maladie suisse 2026 : Standard, Telmed, HMO, Médecin de famille. Rabais de primes jusqu'à 25%, règles d'urgence et comparatif."
  },

  'subside-assurance-maladie': {
    slug: 'subside-assurance-maladie',
    category: 'subside',
    title: 'Subsides d\'assurance maladie en Suisse 2026 : Comment obtenir une aide financière ?',
    badge: 'Guide Cantonal des Aides aux Primes (RIP)',
    readingTime: '6 min',
    publishedDate: '2026-01-20',
    updatedDate: '2026-08-15',
    author: {
      name: 'Équipe d\'experts Le Fennec Malin',
      role: 'Spécialistes Prévoyance & Assurance LAMal'
    },
    summary: 'Près d\'un tiers des résidents en Suisse ont droit à une réduction individuelle des primes d\'assurance maladie (subside cantonal). Découvrez les barèmes, plafonds de revenus et démarches dans chaque canton.',
    keyTakeaways: [
      'Le subside d\'assurance maladie (aussi appelé réduction individuelle de primes - RIP ou IPV) est une aide financière cantonale financée par la Confédération et les cantons.',
      'Le montant du subside est versé directement par le canton à votre caisse maladie et déduit de votre facture de prime mensuelle.',
      'Dans certains cantons (ex: Vaud, Genève), l\'octroi est largement automatisé sur la base de la taxation fiscale, mais une demande formelle est indispensable en cas de changement de situation (perte d\'emploi, séparation, retraite).',
      'Le canton de Vaud plafonne la charge des primes à environ 10% du revenu du ménage (LVLAMal).'
    ],
    tableOfContents: [
      { id: 'quest-ce-que-subside', label: '1. Qu\'est-ce que le subside cantonal ?' },
      { id: 'criteres-eligibilite', label: '2. Critères d\'éligibilité et calcul du RDU' },
      { id: 'cantons-romands-demarches', label: '3. Les démarches canton par canton' },
      { id: 'changement-situation', label: '4. Que faire en cas de baisse de revenus ?' }
    ],
    sections: [
      {
        id: 'quest-ce-que-subside',
        title: '1. Le principe du subside d\'assurance maladie en Suisse',
        content: [
          'La LAMal prévoit que les cantons accordent des réductions de primes aux assurés de condition économique modeste.',
          'Cette aide n\'est pas un prêt : c\'est une contribution non remboursable destinée à alléger le poids financier obligatoire des primes d\'assurance de base pour les célibataires, couples, étudiants, retraités et familles avec enfants.'
        ]
      },
      {
        id: 'criteres-eligibilite',
        title: '2. Comment est calculé votre droit au subside ?',
        content: [
          'Le droit dépend principalement de votre Revenu Déterminant Unifié (RDU) ou revenu imposable corrigé, ainsi que de votre fortune nette et de la composition de votre ménage.',
          'Plus vous avez d\'enfants à charge, plus les plafonds de revenus donnant droit à un subside à 100% ou partiel sont élevés.'
        ]
      },
      {
        id: 'cantons-romands-demarches',
        title: '3. Démarches officielles dans les principaux cantons',
        content: [
          'Genève : Géré par le SAM (Service de l\'assurance-maladie). Formulaire en ligne sur ge.ch.',
          'Vaud : Géré par l\'OVAM (Office vaudois de l\'assurance-maladie). Plafonnement légal des primes au pourcentage du revenu (LVLAMal).',
          'Valais : Caisse cantonale de compensation (CCVs) à Sion.',
          'Fribourg : Établissement cantonal des assurances sociales (ECAS).',
          'Neuchâtel : Office cantonal des assurances sociales (OCAS).',
          'Jura : Caisse de compensation du Jura (CAJU).'
        ]
      },
      {
        id: 'changement-situation',
        title: '4. Modification de revenus en cours d\'année',
        content: [
          'Si vos revenus ont chuté de plus de 15% à 20% par rapport à votre dernière déclaration fiscale (chômage, congé maternité, séparation, baisse d\'activité indépendante), vous avez le droit de déposer une demande de réévaluation extraordinaire auprès de votre office cantonal.'
        ]
      }
    ],
    faqs: [
      {
        question: "Les personnes étrangères ou permis B/C ont-elles droit aux subsides ?",
        answer: "Oui. Toute personne domiciliée en Suisse et affiliée à une caisse maladie LAMal a droit aux subsides si ses revenus respectent les barèmes de son canton de résidence, indépendamment de sa nationalité."
      }
    ],
    relatedTabs: ['canton-geneve', 'canton-vaud', 'canton-valais', 'canton-fribourg'],
    metaDescription: "Subsides assurance maladie Suisse 2026 : barèmes cantonaux (GE, VD, VS, FR, NE, JU, ZH), conditions de revenus, démarches et calcul du montant."
  },

  'resiliation-assurance-maladie': {
    slug: 'resiliation-assurance-maladie',
    category: 'lamal',
    title: 'Résiliation et changement de caisse maladie : Délais, modèle de lettre et règles légales',
    badge: 'Guide Juridique LAMal',
    readingTime: '5 min',
    publishedDate: '2026-01-10',
    updatedDate: '2026-08-15',
    author: {
      name: 'Équipe d\'experts Le Fennec Malin',
      role: 'Spécialistes Prévoyance & Assurance LAMal'
    },
    summary: 'Changer de caisse maladie en Suisse est un droit garanti par la loi fédérale. Découvrez les délais stricts du 30 novembre, les pièges à éviter avec les assurances complémentaires et les modèles de lettre type.',
    keyTakeaways: [
      'Pour l\'assurance de base (LAMal), la résiliation doit impérativement parvenir à votre assureur au plus tard le 30 novembre (date de réception, non d\'envoi).',
      'Aucune caisse maladie ne peut vous refuser pour l\'assurance de base obligatoire, quel que soit votre âge ou votre état de santé.',
      'Attention : pour les assurances complémentaires (LCA), le délai de résiliation est souvent le 30 septembre (délai de 3 mois) et vous ne devez JAMAIS résilier avant d\'avoir reçu l\'acceptation écrite sans réserve du nouvel assureur.'
    ],
    tableOfContents: [
      { id: 'delais-legaux', label: '1. Les délais légaux stricts' },
      { id: 'distinction-lamal-lca', label: '2. Distinction cruciale entre LAMal et LCA' },
      { id: 'demarche-etape-par-etape', label: '3. Les 4 étapes pour changer sereinement' },
      { id: 'modele-lettre', label: '4. Modèle de lettre de résiliation' }
    ],
    sections: [
      {
        id: 'delais-legaux',
        title: '1. Les dates limites de résiliation en Suisse',
        content: [
          'Fin novembre (30 novembre) : Date limite pour résilier votre assurance de base avec prise d\'effet au 1er janvier. La lettre doit être arrivée sur le bureau de l\'assureur le dernier jour ouvrable de novembre avant 17h.',
          'Fin juin (30 juin) : Uniquement pour les assurés ayant la franchise de base de CHF 300 dans un modèle standard avec libre choix du médecin.'
        ]
      },
      {
        id: 'distinction-lamal-lca',
        title: '2. Ne confondez pas assurance de base et complémentaire !',
        content: [
          'Vous avez le droit légal absolu d\'avoir votre assurance de base chez une caisse (par exemple Assura pour son prix bas) et vos assurances complémentaires chez une autre caisse (par exemple SWICA ou CSS pour leurs remboursements de médecine douce et fitness).',
          'Votre assureur actuel ne peut pas résilier vos complémentaires sous prétexte que vous déplacez votre assurance de base chez un concurrent.'
        ]
      },
      {
        id: 'demarche-etape-par-etape',
        title: '3. Les 4 étapes pour un changement sans risque',
        content: [
          'Étape 1 : Comparez les primes de votre canton sur Le Fennec Malin dès l\'annonce officielle des tarifs OFSP fin septembre.',
          'Étape 2 : Si vous souhaitez de nouvelles complémentaires, faites votre demande d\'adhésion en octobre.',
          'Étape 3 : Attendez la confirmation écrite sans réserve de la nouvelle caisse pour vos complémentaires.',
          'Étape 4 : Envoyez votre lettre de résiliation en recommandé pour la base (et éventuellement les anciennes complémentaires).'
        ]
      }
    ],
    faqs: [
      {
        question: "Que se passe-t-il en cas de primes impayées ?",
        answer: "Selon l'article 64a LAMal, un assuré qui a des arriérés de primes ou de participations aux coûts auprès de son assureur actuel ne peut pas changer de caisse tant que la totalité de la dette n'a pas été acquittée."
      }
    ],
    relatedTabs: ['health-comparator', 'guide-franchise-300-vs-2500', 'guide-modeles-assurance'],
    metaDescription: "Résiliation assurance maladie suisse 2026 : délai du 30 novembre, modèle de lettre type gratuit, règles LAMal et précautions pour les complémentaires."
  },

  'frontalier-assurance-maladie': {
    slug: 'frontalier-assurance-maladie',
    category: 'frontalier',
    title: 'Assurance maladie des frontaliers en Suisse : LAMal ou CMU (Droit d\'option) ?',
    badge: 'Guide Spécial Travailleurs Frontaliers',
    readingTime: '7 min',
    publishedDate: '2026-01-25',
    updatedDate: '2026-08-15',
    author: {
      name: 'Équipe d\'experts Le Fennec Malin',
      role: 'Spécialistes Prévoyance & Assurance LAMal'
    },
    summary: 'Travailler en Suisse et résider en France implique un choix d\'assurance capital dans les 3 mois suivant la prise de poste : LAMal frontalier ou CMU française (CNTFS). Décryptage du calcul et des avantages.',
    keyTakeaways: [
      'Le droit d\'option doit être exercé impérativement dans les 3 mois suivant le début de votre contrat de travail suisse. Ce choix est juridiquement irrévocable (sauf changement de situation majeure).',
      'La CMU (Sécurité Sociale française / CNTFS) prélève une cotisation proportionnelle d\'environ 8% de votre Revenu Fiscal de Référence après abattement.',
      'La LAMal frontalier (dite CMU-Suisse) est une prime fixe mensuelle en francs suisses (environ CHF 150 à 180 / mois pour un adulte sans accident chez les caisses spécialisées comme Helsana Progrès ou CSS).',
      'Pour les salaires suisses moyens et élevés (dès env. 60\'000 CHF / an pour un célibataire), la LAMal frontalier est considérablement plus économique que la CMU française.'
    ],
    tableOfContents: [
      { id: 'droit-option', label: '1. Le principe du droit d\'option' },
      { id: 'comparatif-lamal-cmu', label: '2. Comparatif financier : Prime fixe vs 8% du salaire' },
      { id: 'formulaire-s1', label: '3. Le formulaire S1 et la prise en charge bilatérale' },
      { id: 'demarches-cpam-lamal', label: '4. Démarches pas à pas auprès de la CPAM et de la caisse suisse' }
    ],
    sections: [
      {
        id: 'droit-option',
        title: '1. Comprendre le droit d\'option franco-suisse',
        content: [
          'En vertu des accords bilatéraux sur la libre circulation des personnes, tout travailleur résidant en France et exerçant une activité lucrative en Suisse est soumis par défaut au système suisse, mais dispose d\'un droit d\'option pour s\'affilier à la CMU française.',
          'Vous disposez d\'un délai légal strict de 3 mois dès votre premier jour d\'activité en Suisse pour déposer le formulaire de choix du système d\'assurance-maladie (formulaire 9bis) visé par la CPAM et le canton suisse.'
        ]
      },
      {
        id: 'comparatif-lamal-cmu',
        title: '2. Comparatif financier : Quel système choisir ?',
        content: [
          'Cotisation CMU (France) : calculée au taux de 8% sur l\'ensemble des revenus du foyer fiscal dépassant un plafond de référence. Plus votre salaire suisse augmente, plus votre cotisation française s\'envole sans plafond !',
          'Prime LAMal Frontalier (Suisse) : prime forfaitaire mensuelle fixe d\'environ CHF 150 à CHF 180 par adulte, indépendamment de votre salaire (que vous gagniez 70\'000 CHF ou 250\'000 CHF par an).'
        ]
      },
      {
        id: 'formulaire-s1',
        title: '3. Soins en France et en Suisse : le double accès avec le Formulaire S1',
        content: [
          'En optant pour la LAMal frontalier, votre caisse maladie suisse vous délivre le document portable S1 (ancien E106).',
          'En enregistrant ce formulaire auprès de votre CPAM de résidence en France, vous recevez une Carte Vitale française : vous bénéficiez ainsi du remboursement de vos soins courants en France à 100% selon les tarifs français, ET de l\'accès complet aux médecins et hôpitaux en Suisse !'
        ]
      }
    ],
    faqs: [
      {
        question: "Puis-je revenir sur mon choix de droit d'option plus tard ?",
        answer: "Non. Le choix exercé est en principe définitif et irrévocable pour toute la durée de votre statut de frontalier en Suisse. Les seuls motifs de réouverture du droit d'option sont le passage du statut de frontalier à résident suisse, une période de chômage en France suivie d'une reprise d'emploi en Suisse, ou un changement de pays de résidence."
      }
    ],
    relatedTabs: ['tool-simulateur-frontalier', 'canton-geneve', 'canton-vaud', 'canton-jura'],
    metaDescription: "Assurance maladie frontalier Suisse 2026 : LAMal vs CMU, calcul de la cotisation 8%, formulaire S1, droit d'option 3 mois et simulateur comparatif."
  },

  '3eme-pilier-fiscalite': {
    slug: '3eme-pilier-fiscalite',
    category: '3a',
    title: 'Fiscalité du 3ème pilier 3a en 2026 : Plafonds, déductions fiscales et économies d\'impôts',
    badge: 'Guide Prévoyance & Optimisation Fiscale',
    readingTime: '6 min',
    publishedDate: '2026-02-05',
    updatedDate: '2026-08-15',
    author: {
      name: 'Équipe d\'experts Le Fennec Malin',
      role: 'Spécialistes Prévoyance & Fiscalité Suisse'
    },
    summary: 'Le pilier 3a est le placement préféré des résidents suisses pour préparer sa retraite tout en réduisant immédiatement ses impôts sur le revenu. Découvrez les plafonds officiels 2026 et le calcul de vos économies.',
    keyTakeaways: [
      'Plafond 3a 2026 pour salarié affilié à une caisse de pension (2e pilier LPP) : CHF 7\'258 par an.',
      'Plafond 3a 2026 pour travailleur indépendant sans 2e pilier : 20% du revenu net d\'activité lucrative, jusqu\'à concurrence de CHF 36\'288 par an.',
      'Chaque franc versé sur votre 3ème pilier 3a est intégralement déductible de votre revenu imposable (impôt fédéral direct, cantonal et communal).',
      'Selon votre canton de domicile et votre taux marginal d\'imposition, verser le montant maximum rapporte une économie d\'impôts directe comprise entre CHF 1\'500 et CHF 2\'800 par an.'
    ],
    tableOfContents: [
      { id: 'plafonds-2026', label: '1. Montants maximaux déductibles en 2026' },
      { id: 'calcul-economie-impots', label: '2. Combien d\'impôts économisez-vous réellement ?' },
      { id: 'banque-vs-assurance-3a', label: '3. 3a bancaire vs 3a assurance : Quel choix ?' },
      { id: 'retrait-capital', label: '4. Fiscalité avantageuse lors du retrait' }
    ],
    sections: [
      {
        id: 'plafonds-2026',
        title: '1. Plafonds officiels 2026 fixés par l\'Office fédéral des assurances sociales (OFAS)',
        content: [
          'Pour les salariés avec 2ème pilier (LPP) : le montant annuel maximum déductible s\'élève à CHF 7\'258.',
          'Pour les indépendants sans 2ème pilier : le montant annuel maximum déductible s\'élève à 20% du revenu d\'activité lucrative, au maximum CHF 36\'288.'
        ]
      },
      {
        id: 'calcul-economie-impots',
        title: '2. Le calcul concret de votre gain fiscal',
        content: [
          'L\'économie d\'impôt dépend de votre tranche marginale d\'imposition : à Genève, Lausanne, Neuchâtel ou Fribourg, un versement complet de CHF 7\'258 génère typiquement entre 22% et 38% d\'économie directe sur la facture fiscale globale de l\'année de versement.'
        ]
      },
      {
        id: 'banque-vs-assurance-3a',
        title: '3. Pilier 3a Bancaire vs Pilier 3a Assurance',
        content: [
          '3a Bancaire (Compte ou Titres / ETF) : flexibilité totale, aucun engagement de versement annuel, zéro frais de résiliation.',
          '3a Assurance (Police de prévoyance liée) : combine épargne et couverture d\'assurance (rente d\'invalidité et capital décès), versement contractuel régulier.'
        ]
      }
    ],
    faqs: [
      {
        question: "Peut-on ouvrir plusieurs comptes 3ème pilier 3a ?",
        answer: "Oui, et c'est même fortement recommandé ! Détenir 3 à 5 comptes 3a distincts permet d'échelonner les retraits sur plusieurs années fiscales consécutives au moment de la retraite, ce qui réduit considérablement l'impôt progressif sur le retrait de capital."
      }
    ],
    relatedTabs: ['tool-calculateur-impot-3a', 'seo-pilier', 'life-comparator'],
    metaDescription: "Fiscalité 3ème pilier 3a Suisse 2026 : plafond déductible CHF 7258, calcul de l'économie d'impôts, 3a banque vs assurance et simulateur officiel."
  }
};
