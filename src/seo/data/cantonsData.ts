/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CantonSEOData {
  code: string;
  name: string;
  slug: string;
  capital: string;
  regionsCount: number;
  regionsDescription: string;
  avgAdultPremium300: string; // Range for Adult Franchise 300 in 2026
  avgAdultPremium2500: string; // Range for Adult Franchise 2500 in 2026
  popularInsurers: string[];
  subsideAgency: string;
  subsideDescription: string;
  subsideLink?: string;
  keyPoints: string[];
  faqs: { question: string; answer: string }[];
  metaDescription: string;
}

export const CANTONS_SEO_DATA: Record<string, CantonSEOData> = {
  geneve: {
    code: 'GE',
    name: 'Genève',
    slug: 'geneve',
    capital: 'Genève',
    regionsCount: 1,
    regionsDescription: 'Le canton de Genève forme une région de primes unique (Région 1). Toutes les communes appliquent les mêmes barèmes de base.',
    avgAdultPremium300: 'CHF 480 – CHF 560 / mois',
    avgAdultPremium2500: 'CHF 370 – CHF 440 / mois',
    popularInsurers: ['Assura', 'Groupe Mutuel (Avenir/EasySana)', 'CSS', 'Helsana', 'Swica', 'Concordia'],
    subsideAgency: 'SAM (Service de l\'assurance-maladie du canton de Genève)',
    subsideDescription: 'À Genève, le SAM octroie des subsides d\'assurance-maladie aux personnes et familles dont le revenu déterminant unifié (RDU) ne dépasse pas les barèmes légaux fixés par le Conseil d\'État.',
    keyPoints: [
      'Canton avec l\'une des primes moyennes les plus élevées de Suisse.',
      'Région de primes 1 unique pour l\'ensemble du canton de Genève.',
      'Potentiel d\'économies annuel supérieur à CHF 1\'500 par adulte en optant pour un modèle Telmed ou Médecin de famille avec franchise 2\'500.',
      'Réseau dense de centres médicaux HMO et cabinets de santé partenaires.'
    ],
    faqs: [
      {
        question: "Pourquoi les primes d'assurance maladie sont-elles si élevées à Genève ?",
        answer: "Le coût des prestations de santé (densité médicale, consultations spécialisées, hôpitaux universitaires HUG) est plus élevé à Genève que dans la plupart des autres cantons. La LAMal imposant que les primes couvrent les coûts réels du canton, les primes genevoises reflètent ces dépenses de santé."
      },
      {
        question: "Comment demander un subside d'assurance maladie à Genève ?",
        answer: "La demande s'effectue auprès du Service de l'assurance-maladie (SAM). Pour les personnes éligibles, l'attribution se fait souvent de manière automatique sur la base de la taxation fiscale, mais une demande formelle peut être déposée en cas de baisse de revenus."
      },
      {
        question: "Quelle est la caisse maladie la moins chère à Genève en 2026 ?",
        answer: "Les caisses comme Assura, Mutuel Assurance et KPT proposent généralement les primes de base les plus compétitives du canton. Cependant, le classement varie selon votre modèle (Standard, Telmed, Médecin de famille) et votre classe d'âge. Comparez vos options pour votre NPA exact."
      },
      {
        question: "Puis-je changer de caisse maladie si j'habite à Genève ?",
        answer: "Oui. Toutes les caisses maladie agréées LAMal sont tenues d'accepter chaque résident genevois sans réserve ni questionnaire médical. Vous devez envoyer votre lettre de résiliation avant le 30 novembre pour une prise d'effet au 1er janvier."
      }
    ],
    metaDescription: "Comparez les primes d'assurance maladie 2026 dans le canton de Genève (GE). Région de primes 1, caisses les moins chères (Assura, CSS, Helsana), subsides SAM."
  },

  vaud: {
    code: 'VD',
    name: 'Vaud',
    slug: 'vaud',
    capital: 'Lausanne',
    regionsCount: 2,
    regionsDescription: 'Le canton de Vaud est divisé en 2 régions de primes : Région 1 (Lausanne et agglomération) et Région 2 (districts plus ruraux).',
    avgAdultPremium300: 'CHF 430 – CHF 520 / mois',
    avgAdultPremium2500: 'CHF 320 – CHF 410 / mois',
    popularInsurers: ['Assura', 'CSS', 'Groupe Mutuel', 'Helsana', 'Visana', 'Swica'],
    subsideAgency: 'OVAM (Office vaudois de l\'assurance-maladie)',
    subsideDescription: 'Dans le canton de Vaud, l\'OVAM gère les subsides à l\'assurance-maladie. Le système vaudois plafonne la prime à un pourcentage maximum du revenu déterminant du ménage (loi d\'application de la LAMal / LVLAMal).',
    keyPoints: [
      'Deux régions de primes avec des différences tarifaires entre Lausanne (R1) et les autres districts (R2).',
      'Plafonnement des primes pour les ménages à revenu modeste via la LVLAMal.',
      'Offre étendue de modèles réseaux de soins (réseau Delta, Vidymed, etc.).',
      'Économies potentielles moyennes de CHF 1\'200 à CHF 2\'400 par an pour un couple.'
    ],
    faqs: [
      {
        question: "Quelles sont les régions de primes dans le canton de Vaud ?",
        answer: "Le canton de Vaud comprend la Région 1 (notamment Lausanne, Morges, Nyon et le littoral) et la Région 2 (zones de la Broye, Nord vaudois, Alpes vaudoises). Les primes de la Région 2 sont généralement légèrement inférieures à celles de la Région 1."
      },
      {
        question: "Comment fonctionne le plafonnement vaudois des primes (LVLAMal) ?",
        answer: "Le canton de Vaud garantit que la charge d'assurance maladie ne dépasse pas un pourcentage du revenu du ménage (généralement entre 10% et 14%). L'OVAM verse la différence directement à votre caisse maladie sous forme de subside."
      },
      {
        question: "Quel modèle d'assurance choisir dans le canton de Vaud ?",
        answer: "Le modèle Médecin de famille ou Réseau de soins (ex: réseaux Delta ou Réseau Santé Vaud) est particulièrement avantageux dans le canton de Vaud, offrant 10% à 15% de rabais par rapport au modèle standard tout en conservant un suivi médical personnalisé."
      }
    ],
    metaDescription: "Comparez les primes d'assurance maladie 2026 dans le canton de Vaud (VD). Régions 1 et 2, subsides OVAM, modèles alternatifs à Lausanne et dans le canton."
  },

  fribourg: {
    code: 'FR',
    name: 'Fribourg',
    slug: 'fribourg',
    capital: 'Fribourg',
    regionsCount: 2,
    regionsDescription: 'Le canton de Fribourg est divisé en 2 régions de primes (Région 1 pour les districts urbains et Région 2 pour les zones périphériques).',
    avgAdultPremium300: 'CHF 390 – CHF 470 / mois',
    avgAdultPremium2500: 'CHF 280 – CHF 360 / mois',
    popularInsurers: ['Concordia', 'CSS', 'Groupe Mutuel', 'Assura', 'Helsana', 'Sanitas'],
    subsideAgency: 'ECAS (Établissement cantonal des assurances sociales de Fribourg)',
    subsideDescription: 'L\'ECAS octroie les réductions individuelles de primes (RIP) aux assurés de condition modeste domiciliés dans le canton de Fribourg.',
    keyPoints: [
      'Primes moyennes plus modérées que les cantons lémaniques.',
      'Forte présence des caisses traditionnelles (Concordia, CSS, Groupe Mutuel).',
      'Réseau bilingue français / allemand adapté aux deux communautés linguistiques du canton.',
      'Réduction substantielle des primes pour les enfants et jeunes adultes.'
    ],
    faqs: [
      {
        question: "Comment obtenir une réduction de prime d'assurance maladie à Fribourg ?",
        answer: "L'ECAS évalue le droit aux subsides en se basant sur la dernière taxation fiscale fribourgeoise. Si vos revenus ont baissé significativement, vous pouvez déposer une demande extraordinaire auprès de l'ECAS."
      },
      {
        question: "Quelles sont les caisses maladie les plus populaires dans le canton de Fribourg ?",
        answer: "Concordia, CSS et Groupe Mutuel bénéficient d'un ancrage historique fort dans le canton, mais Assura et d'autres assureurs en ligne offrent d'excellents tarifs pour les assurés recherchant avant tout le prix le plus bas."
      }
    ],
    metaDescription: "Comparez les caisses maladie 2026 dans le canton de Fribourg (FR). Tarifs officiels OFSP, subsides ECAS et comparatif complet des primes LAMal."
  },

  neuchatel: {
    code: 'NE',
    name: 'Neuchâtel',
    slug: 'neuchatel',
    capital: 'Neuchâtel',
    regionsCount: 1,
    regionsDescription: 'Le canton de Neuchâtel constitue une région de primes unique pour toutes ses communes du Littoral, des Montagnes et du Val-de-Ruz.',
    avgAdultPremium300: 'CHF 440 – CHF 530 / mois',
    avgAdultPremium2500: 'CHF 330 – CHF 420 / mois',
    popularInsurers: ['Assura', 'CSS', 'Groupe Mutuel', 'Visana', 'Helsana', 'Swica'],
    subsideAgency: 'OCAS (Office cantonal des assurances sociales de Neuchâtel)',
    subsideDescription: 'L\'OCAS gère l\'octroi des subsides d\'assurance maladie dans le canton de Neuchâtel pour soulager le budget des ménages neuchâtelois.',
    keyPoints: [
      'Région de primes 1 unique sur tout le territoire neuchâtelois.',
      'Importance des modèles réseau de soins pour réduire la charge des primes.',
      'Possibilité de combiner franchise 2\'500 et modèle Telmed pour un coût minimum garanti.'
    ],
    faqs: [
      {
        question: "Comment faire baisser sa prime d'assurance maladie à Neuchâtel ?",
        answer: "Passez à la franchise maximale (CHF 2'500) si vous êtes en bonne santé, optez pour un modèle alternatif (Telmed ou médecin de famille) et excluez le risque accident si vous travaillez au moins 8 heures par semaine."
      }
    ],
    metaDescription: "Comparatif des assurances maladie dans le canton de Neuchâtel (NE) 2026. Primes officielles OFSP, subsides OCAS et économies garanties."
  },

  valais: {
    code: 'VS',
    name: 'Valais',
    slug: 'valais',
    capital: 'Sion',
    regionsCount: 2,
    regionsDescription: 'Le canton du Valais est découpé en 2 régions de primes : Région 1 et Région 2.',
    avgAdultPremium300: 'CHF 340 – CHF 420 / mois',
    avgAdultPremium2500: 'CHF 230 – CHF 310 / mois',
    popularInsurers: ['Groupe Mutuel', 'CSS', 'Concordia', 'Helsana', 'Assura', 'Visana'],
    subsideAgency: 'Caisse cantonale de compensation du Valais (CCVs)',
    subsideDescription: 'La CCVs attribue les subsides d\'assurance maladie aux assurés valaisans répondant aux critères de revenu et de fortune.',
    keyPoints: [
      'Primes parmi les plus abordables de Suisse romande.',
      'Siège historique du Groupe Mutuel à Martigny.',
      'Nombreux modèles régionaux performants (Réseau RéMI, cabinets de groupe).'
    ],
    faqs: [
      {
        question: "Pourquoi les primes maladie sont-elles moins chères en Valais ?",
        answer: "Le canton du Valais présente un coût moyen des soins par habitant inférieur à la moyenne lémanique, ce qui se traduit directement par des primes LAMal plus douces pour les assurés valaisans."
      }
    ],
    metaDescription: "Assurance maladie dans le canton du Valais (VS) 2026. Primes les plus basses de Suisse romande, caisses agréées et simulateur officiel."
  },

  jura: {
    code: 'JU',
    name: 'Jura',
    slug: 'jura',
    capital: 'Delémont',
    regionsCount: 1,
    regionsDescription: 'Le canton du Jura forme une seule région de primes pour l\'ensemble de ses districts (Delémont, Porrentruy, Franches-Montagnes).',
    avgAdultPremium300: 'CHF 380 – CHF 460 / mois',
    avgAdultPremium2500: 'CHF 270 – CHF 350 / mois',
    popularInsurers: ['CSS', 'Groupe Mutuel', 'Assura', 'Concordia', 'Helsana'],
    subsideAgency: 'Caisse de compensation du canton du Jura',
    subsideDescription: 'La Caisse de compensation jurassienne gère les subsides individuels à l\'assurance-maladie pour les contribuables jurassiens.',
    keyPoints: [
      'Région de primes unique pour le Jura.',
      'Primes modérées avec d\'excellents rabais pour les familles et jeunes adultes.'
    ],
    faqs: [
      {
        question: "Comment choisir sa caisse maladie dans le Jura ?",
        answer: "Toutes les caisses offrant les mêmes remboursements pour l'assurance obligatoire, comparez le montant de la prime mensuelle et vérifiez si votre médecin traitant figure dans la liste des réseaux partenaires de la caisse choisie."
      }
    ],
    metaDescription: "Comparez les primes d'assurance maladie dans le canton du Jura (JU) 2026. Données officielles OFSP, conseils et subsides jurassiens."
  },

  berne: {
    code: 'BE',
    name: 'Berne',
    slug: 'berne',
    capital: 'Berne',
    regionsCount: 3,
    regionsDescription: 'Le canton de Berne est divisé en 3 régions de primes (Région 1 agglomération bernoise, Région 2 villes secondaires et Région 3 Jura bernois et zones rurales).',
    avgAdultPremium300: 'CHF 400 – CHF 490 / mois',
    avgAdultPremium2500: 'CHF 290 – CHF 380 / mois',
    popularInsurers: ['Visana', 'KPT', 'CSS', 'Helsana', 'Swica', 'Assura'],
    subsideAgency: 'Office des assurances sociales du canton de Berne (ASB)',
    subsideDescription: 'L\'ASB traite les demandes de réductions de primes pour les résidents bernois et francophones du Jura bernois.',
    keyPoints: [
      'Canton bilingue avec 3 régions de primes distinctes.',
      'Fief historique des caisses Visana et KPT.',
      'Grand choix de modèles innovants de télémédecine et réseaux de soins.'
    ],
    faqs: [
      {
        question: "Quelles sont les primes d'assurance maladie dans le Jura bernois ?",
        answer: "Le Jura bernois se situe généralement en Région 3, avec des primes souvent plus avantageuses que l'agglomération de Berne ou de Bienne."
      }
    ],
    metaDescription: "Assurance maladie dans le canton de Berne (BE) et Jura bernois 2026. Comparatif bilingue des primes LAMal, subsides ASB et caisses."
  },

  zurich: {
    code: 'ZH',
    name: 'Zurich',
    slug: 'zurich',
    capital: 'Zurich',
    regionsCount: 3,
    regionsDescription: 'Le canton de Zurich compte 3 régions de primes : Région 1 (Ville de Zurich et Winterthour), Région 2 et Région 3 (districts périphériques).',
    avgAdultPremium300: 'CHF 360 – CHF 440 / mois',
    avgAdultPremium2500: 'CHF 250 – CHF 330 / mois',
    popularInsurers: ['Swica', 'Helsana', 'Sanitas', 'CSS', 'KPT', 'Assura'],
    subsideAgency: 'SVA Zürich',
    subsideDescription: 'SVA Zürich administre les réductions de primes (Prämienverbilligung - IPV) pour l\'ensemble des résidents du canton de Zurich.',
    keyPoints: [
      'Plus grand marché d\'assurance santé de Suisse.',
      'Siège des plus grands assureurs suisses (Swica, Sanitas, Helsana).',
      'Très forte adoption des modèles HMO et télémédecine.'
    ],
    faqs: [
      {
        question: "Wie funktioniert der Krankenkassenvergleich in Zürich?",
        answer: "Die Grundversicherung nach KVG bietet bei allen Krankenkassen identische gesetzliche Leistungen. Ein Wechsel zu einem alternativen Modell (HMO / Telmed) mit Franchise 2'500 spart jährlich bis zu CHF 1'800 pro Person."
      }
    ],
    metaDescription: "Krankenkassenvergleich Zürich (ZH) 2026. Primes d'assurance maladie dans le canton de Zurich, caisses agréées et subsides SVA Zürich."
  }
};
