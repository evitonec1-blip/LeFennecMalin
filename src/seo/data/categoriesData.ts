/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CategorySEOData {
  slug: string;
  name: string;
  iconName: 'car' | 'home' | 'shield' | 'heart' | 'plane' | 'scale' | 'paw';
  badge: string;
  h1: string;
  tagline: string;
  description: string;
  whyCompareTitle: string;
  whyComparePoints: string[];
  coverageTypes: { title: string; desc: string; highlights: string[] }[];
  faqs: { question: string; answer: string }[];
  relatedCategories: { name: string; url: string }[];
}

export const CATEGORIES_SEO_DATA: Record<string, CategorySEOData> = {
  'assurance-auto': {
    slug: 'assurance-auto',
    name: 'Assurance Auto',
    iconName: 'car',
    badge: 'Comparatif Suisse 2026',
    h1: "Comparateur d'assurance auto en Suisse",
    tagline: "Comparez les assurances Responsabilité Civile (RC), Casco partielle et Casco complète pour votre véhicule en Suisse.",
    description: "En Suisse, l'assurance Responsabilité Civile automobile (RC) est obligatoire pour immatriculer tout véhicule motorisé. Les assurances Casco partielle et Casco complète (obligatoire en cas de leasing) protègent votre investissement contre le vol, la grêle, le bris de glace et les collisions.",
    whyCompareTitle: "Pourquoi comparer son assurance auto en Suisse ?",
    whyComparePoints: [
      "Les tarifs peuvent varier de plus de 60% d'une compagnie à l'autre pour un profil et un véhicule identiques.",
      "Le choix de la franchise casco (CHF 500, CHF 1'000) et des options (protection du bonus, assistance dépannage) impacte directement la prime annuelle.",
      "Rabais spécifiques pour jeunes conducteurs, véhicules électriques ou hybrides et conducteurs à faible kilométrage.",
      "Facilité de résiliation à l'échéance annuelle du contrat ou en cas de changement de véhicule."
    ],
    coverageTypes: [
      {
        title: "Responsabilité Civile (RC Auto)",
        desc: "Couverture obligatoire par la loi suisse (LCR). Elle prend en charge les dommages corporels et matériels causés aux tiers lors de l'utilisation de votre voiture.",
        highlights: ["Obligatoire pour l'expertise et la délivrance des plaques", "Plafond légal minimal de CHF 5 millions", "Couvre passagers, piétons et autres véhicules"]
      },
      {
        title: "Casco Partielle",
        desc: "Assurance facultative qui rembourse les dégâts subis par votre propre véhicule sans qu'un tiers responsable ne soit identifié.",
        highlights: ["Vol et vandalisme", "Grêle, tempête, inondations et forces naturelles", "Collision avec le gibier et bris de glace"]
      },
      {
        title: "Casco Complète (Collision)",
        desc: "Regroupe la Casco partielle et l'assurance collision. Elle indemnise vos propres dommages même en cas de faute de conduite de votre part. Obligatoire pour tout véhicule en leasing.",
        highlights: ["Obligatoire en leasing", "Couvre les dégâts de carrosserie lors d'accidents responsables", "Protection de la valeur à neuf pendant les premières années"]
      }
    ],
    faqs: [
      {
        question: "L'assurance auto est-elle obligatoire en Suisse ?",
        answer: "Seule l'assurance Responsabilité Civile (RC) est légalement obligatoire pour obtenir le permis de circulation et les plaques d'immatriculation. La casco partielle ou complète est optionnelle, sauf si votre véhicule est acheté sous contrat de leasing (la casco complète est alors exigée par la banque)."
      },
      {
        question: "Quand peut-on résilier son contrat d'assurance auto ?",
        answer: "Vous pouvez résilier votre assurance auto : (1) à l'échéance annuelle du contrat avec un préavis habituel de 3 mois, (2) lors d'un changement de véhicule, (3) après la survenance d'un sinistre indemnisé, ou (4) en cas d'augmentation des tarifs par l'assureur."
      },
      {
        question: "Comment réduire la prime de son assurance voiture ?",
        answer: "Augmentez la franchise de casco, souscrivez une clause de garage fermé, limitez le kilométrage annuel déclaré si vous roulez peu, et comparez régulièrement les offres des assureurs suisses (Allianz, AXA, Helvetia, Mobilière, Generali, Zurich)."
      }
    ],
    relatedCategories: [
      { name: 'Responsabilité Civile (RC)', url: '/assurance-rc/' },
      { name: 'Protection Juridique', url: '/protection-juridique/' },
      { name: 'Assurance Ménage', url: '/assurance-menage/' }
    ]
  },

  'assurance-menage': {
    slug: 'assurance-menage',
    name: 'Assurance Ménage',
    iconName: 'home',
    badge: 'Habitation Suisse 2026',
    h1: "Comparateur d'assurance ménage et habitation en Suisse",
    tagline: "Protégez vos biens, votre mobilier et votre logement contre l'incendie, les dégâts d'eau, le vol et le bris de glace.",
    description: "L'assurance inventaire du ménage protège l'ensemble des biens meubles situés à votre domicile (meubles, appareils électroniques, vêtements, objets de valeur) contre les sinistres du quotidien.",
    whyCompareTitle: "Pourquoi comparer son assurance ménage ?",
    whyComparePoints: [
      "Éviter la sous-assurance : déclarer une somme d'inventaire réaliste garantit un remboursement intégral en valeur à neuf.",
      "Regrouper assurance ménage et RC privée permet d'obtenir un rabais combiné de 15% à 25% sur la prime globale.",
      "Options personnalisables : vol simple hors du domicile (vélo, smartphone, valises) et couverture bris de glace du bâtiment ou du mobilier."
    ],
    coverageTypes: [
      {
        title: "Incendie et Événements Naturels",
        desc: "Couvre les dégâts causés par le feu, la fumée, la foudre, ainsi que les tempêtes, la grêle, les inondations et les avalanches.",
        highlights: ["Obligatoire dans certains cantons via l'établissement cantonal (ex: ECA dans Vaud)", "Remboursement en valeur à neuf", "Frais de déblaiement inclus"]
      },
      {
        title: "Dégâts d'Eau",
        desc: "Prise en charge des dommages provoqués par les ruptures de conduites, débordements d'appareils (lave-linge) ou infiltrations d'eau de pluie.",
        highlights: ["Rupture de canalisation", "Infiltration d'eau", "Frais de recherche de fuite"]
      },
      {
        title: "Vol avec Effraction et Détroussement",
        desc: "Indemnisation des objets dérobés ou endommagés lors d'une effraction à votre domicile.",
        highlights: ["Remplacement des serrures", "Option vol simple hors du domicile pour vélos/smartphones", "Objets de valeur assurés"]
      }
    ],
    faqs: [
      {
        question: "L'assurance ménage est-elle obligatoire en Suisse ?",
        answer: "Dans la majorité des cantons, l'assurance ménage est facultative mais très fortement recommandée. Cependant, dans 4 cantons (Vaud, Nidwald, Fribourg, Jura), l'assurance contre les incendies et les éléments naturels est obligatoire pour le mobilier."
      },
      {
        question: "Comment calculer la somme d'assurance du ménage ?",
        answer: "Il est conseillé de réaliser un inventaire pièce par pièce en estimant le coût de rachat à neuf de tous vos biens. Une règle pratique compte environ CHF 20'000 à CHF 30'000 par pièce pour un foyer standard."
      }
    ],
    relatedCategories: [
      { name: 'RC Privée', url: '/assurance-rc/' },
      { name: 'Protection Juridique', url: '/protection-juridique/' }
    ]
  },

  'assurance-rc': {
    slug: 'assurance-rc',
    name: 'RC Privée',
    iconName: 'shield',
    badge: 'Responsabilité Civile',
    h1: "Comparateur assurance responsabilité civile privée (RC) en Suisse",
    tagline: "Protégez votre patrimoine contre les conséquences financières des dommages corporels et matériels causés involontairement à des tiers.",
    description: "L'assurance responsabilité civile privée (RC privée) intervient lorsque vous, vos enfants ou vos animaux de compagnie causez un préjudice à un tiers. Indispensable pour tout locataire en Suisse.",
    whyCompareTitle: "L'importance vitale de la RC privée en Suisse",
    whyComparePoints: [
      "Exigée par la quasi-totalité des gérances immobilières suisses avant la signature d'un bail à loyer (dégâts locatifs).",
      "Plafonds de garantie élevés (généralement CHF 5 à 10 millions) pour une prime annuelle très modeste (dès CHF 80/an).",
      "Défense contre les prétentions injustifiées de tiers (fonction de protection juridique passive)."
    ],
    coverageTypes: [
      {
        title: "Dommages Locatifs",
        desc: "Couvre les dégâts causés au logement loué au-delà de l'usure normale (rayures profondes sur le parquet, lavabo fêlé).",
        highlights: ["Indispensable pour récupérer sa garantie de loyer", "Franchise modulable", "Prise en charge des frais de remise en état"]
      },
      {
        title: "Dommages Corporels & Matériels aux Tiers",
        desc: "Indemnisation des blessures involontaires infligées à autrui (accident de ski, vélo) ou de la casse d'objets prêtés ou appartenant à des tiers.",
        highlights: ["Couverture familiale pour les enfants", "Couverture mondiale", "Protection contre les prétentions excessives"]
      }
    ],
    faqs: [
      {
        question: "La RC privée est-elle obligatoire pour louer un appartement en Suisse ?",
        answer: "Bien qu'elle ne soit pas imposée par la loi fédérale, la présentation d'une attestation d'assurance RC privée couvrant les dégâts locatifs est systématiquement exigée par les régies et propriétaires suisses."
      }
    ],
    relatedCategories: [
      { name: 'Assurance Ménage', url: '/assurance-menage/' },
      { name: 'Protection Juridique', url: '/protection-juridique/' }
    ]
  },

  'assurance-vie': {
    slug: 'assurance-vie',
    name: 'Assurance Vie & Prévoyance',
    iconName: 'heart',
    badge: 'Prévoyance Décès & Invalidité',
    h1: "Comparateur assurance vie et prévoyance en Suisse",
    tagline: "Sécurisez l'avenir financier de votre famille, couvrez votre prêt hypothécaire et préparez votre retraite.",
    description: "L'assurance vie en Suisse permet de verser un capital garanti ou une rente à vos bénéficiaires en cas de décès ou d'invalidité, tout en profitant des avantages fiscaux du 3ème pilier.",
    whyCompareTitle: "Pourquoi souscrire une assurance vie en Suisse ?",
    whyComparePoints: [
      "Protection des proches : combler les lacunes des 1er (AVS) et 2ème (LPP) piliers en cas de disparition du conjoint.",
      "Garantie hypothécaire : condition souvent requise par les banques pour financer l'achat d'un bien immobilier.",
      "Fiscalité avantageuse : déduction intégrale des primes en pilier 3a de votre revenu imposable."
    ],
    coverageTypes: [
      {
        title: "Assurance Décès Pure (Risque Pur)",
        desc: "Verse un capital fixé à l'avance aux bénéficiaires si l'assuré décède pendant la durée du contrat. Idéal pour garantir une hypothèque.",
        highlights: ["Prime très abordable", "Capital constant ou dégressif", "Protection ciblée de la famille"]
      },
      {
        title: "Assurance Vie Mixte (Épargne + Risque)",
        desc: "Combine une couverture décès/invalidité avec la constitution d'un capital d'épargne pour la retraite (cadre du pilier 3a ou 3b).",
        highlights: ["Épargne forcée pour la retraite", "Avantages fiscaux 3a", "Garantie du capital"]
      }
    ],
    faqs: [
      {
        question: "Quelle est la différence entre assurance vie 3a et 3b ?",
        answer: "Le 3ème pilier lié (3a) offre une déduction fiscale directe du revenu imposable mais est soumis à des plafonds légaux et des conditions de retrait strictes. Le 3ème pilier libre (3b) offre une flexibilité totale de retrait et de choix des bénéficiaires."
      }
    ],
    relatedCategories: [
      { name: '3ème Pilier', url: '/3eme-pilier/' },
      { name: 'Assurance Maladie', url: '/assurance-maladie/' }
    ]
  },

  'assurance-voyage': {
    slug: 'assurance-voyage',
    name: 'Assurance Voyage',
    iconName: 'plane',
    badge: 'Assistance & Annulation',
    h1: "Comparateur assurance voyage et assistance à l'étranger en Suisse",
    tagline: "Partez l'esprit tranquille avec une couverture mondiale pour les frais d'annulation, le rapatriement médical et les urgences sanitaires.",
    description: "L'assurance voyage suisse couvre les imprévus avant et pendant vos déplacements : maladie subite, accident à l'étranger, perte de bagages et assistance rapatriement 24/7.",
    whyCompareTitle: "Les limites de la LAMal à l'étranger",
    whyComparePoints: [
      "En dehors de l'UE/AELE, l'assurance de base (LAMal) ne rembourse les urgences médicales qu'à hauteur du double du tarif suisse, ce qui est très insuffisant dans des pays comme les USA, le Canada ou le Japon.",
      "L'assurance voyage annuelle couvre l'ensemble de la famille pour tous les voyages de l'année pour un coût souvent inférieur à deux assurances ponctuelles.",
      "Prise en charge complète des frais de recherche, sauvetage et rapatriement sanitaire en Suisse."
    ],
    coverageTypes: [
      {
        title: "Frais d'Annulation de Voyage",
        desc: "Remboursement des billets d'avion, réservations d'hôtels et séjours non remboursables en cas de maladie, accident ou motif grave avant le départ.",
        highlights: ["Maladie de l'assuré ou d'un proche", "Complications de grossesse", "Événements imprévus"]
      },
      {
        title: "Assistance et Rapatriement Médical",
        desc: "Organisation et prise en charge intégrale du transport médical vers la Suisse et avance des frais d'hospitalisation à l'étranger.",
        highlights: ["Centrale d'urgence 24h/24", "Frais de recherche et sauvetage", "Présence d'un proche au chevet"]
      }
    ],
    faqs: [
      {
        question: "Faut-il souscrire une assurance voyage annuelle ou temporaire ?",
        answer: "Dès que vous effectuez plus d'un voyage ou week-end à l'étranger par an, l'assurance annuelle (ex: livret ETI du TCS, Allianz Travel, AXA) est beaucoup plus économique et vous protège en permanence."
      }
    ],
    relatedCategories: [
      { name: 'Assurance Maladie', url: '/assurance-maladie/' },
      { name: 'Protection Juridique', url: '/protection-juridique/' }
    ]
  },

  'protection-juridique': {
    slug: 'protection-juridique',
    name: 'Protection Juridique',
    iconName: 'scale',
    badge: 'Défense & Avocats Suisse',
    h1: "Comparateur assurance protection juridique en Suisse",
    tagline: "Défendez vos droits sans risquer vos économies en cas de litige professionnel, locatif, contractuel ou de la circulation.",
    description: "La protection juridique prend en charge les honoraires d'avocats, les frais d'expertise, les frais de justice et les dépens lors d'un litige en Suisse ou à l'étranger.",
    whyCompareTitle: "Pourquoi une protection juridique est essentielle en Suisse ?",
    whyComparePoints: [
      "Les frais d'avocat en Suisse dépassent fréquemment CHF 350 à CHF 500 de l'heure. Un litige peut coûter des dizaines de milliers de francs.",
      "Couverture des litiges du travail (licenciement abusif, harcèlement), du droit du bail (résiliation de bail, hausse de loyer) et des litiges de consommation.",
      "Accès immédiat à des juristes qualifiés pour des conseils préventifs par téléphone."
    ],
    coverageTypes: [
      {
        title: "Protection Juridique Privée",
        desc: "Défense dans votre vie quotidienne : droit du travail, droit du bail, contrats d'achat, litiges de voisinage et droit médical.",
        highlights: ["Prise en charge d'avocats externes", "Conseils juridiques illimités", "Plafond de garantie jusqu'à CHF 1'000'000"]
      },
      {
        title: "Protection Juridique Circulation",
        desc: "Protection de l'automobiliste, du cycliste et du piéton lors d'accidents de la route, contestations d'amendes ou retrait de permis.",
        highlights: ["Litiges avec les assurances adverses", "Défense pénale de la circulation", "Litiges d'achat ou réparation automobile"]
      }
    ],
    faqs: [
      {
        question: "Qu'est-ce que le délai de carence en protection juridique ?",
        answer: "Le délai de carence (généralement 1 à 3 mois après la signature) est la période durant laquelle un litige survenant n'est pas encore couvert. Il est donc indispensable de souscrire avant qu'un conflit n'éclate."
      }
    ],
    relatedCategories: [
      { name: 'Assurance Auto', url: '/assurance-auto/' },
      { name: 'RC Privée', url: '/assurance-rc/' }
    ]
  },

  'assurance-animaux': {
    slug: 'assurance-animaux',
    name: 'Assurance Animaux (Chien & Chat)',
    iconName: 'paw',
    badge: 'Santé Animale Suisse',
    h1: "Comparateur assurance chien et chat en Suisse",
    tagline: "Offrez les meilleurs soins vétérinaires à votre animal de compagnie sans craindre des factures imprévues.",
    description: "L'assurance santé pour animaux rembourse les frais vétérinaires, chirurgies, hospitalisations, médicaments et examens pour vos chiens et chats en Suisse.",
    whyCompareTitle: "Pourquoi assurer son chien ou son chat ?",
    whyComparePoints: [
      "Une opération chirurgicale ou un séjour en clinique vétérinaire en Suisse peut coûter entre CHF 1'500 et CHF 5'000.",
      "Remboursement jusqu'à 80% ou 90% des frais réels selon la formule choisie.",
      "Prise en charge des maladies chroniques, des accidents et des actes de prévention (vaccins, vermifuges)."
    ],
    coverageTypes: [
      {
        title: "Couverture Maladie & Accident",
        desc: "Remboursement des consultations, examens radiologiques, scanners, médicaments prescrits et interventions chirurgicales.",
        highlights: ["Libre choix du vétérinaire", "Plafonds annuels de CHF 2'000 à illimité", "Prise en charge des urgences"]
      },
      {
        title: "Forfait Prévention & Vaccins",
        desc: "Participation annuelle aux frais de prévention de routine : vaccins, détartrage, puce électronique et vermifuges.",
        highlights: ["Maintien de la bonne santé", "Contribution forfaitaire annuelle"]
      }
    ],
    faqs: [
      {
        question: "Jusqu'à quel âge peut-on assurer son animal de compagnie ?",
        answer: "La plupart des compagnies suisses acceptent les animaux dès l'âge de 3 mois et jusqu'à 7 ou 8 ans pour une nouvelle souscription. Une fois assuré, l'animal reste couvert à vie."
      }
    ],
    relatedCategories: [
      { name: 'RC Privée (Chiens)', url: '/assurance-rc/' },
      { name: 'Assurance Ménage', url: '/assurance-menage/' }
    ]
  }
};
