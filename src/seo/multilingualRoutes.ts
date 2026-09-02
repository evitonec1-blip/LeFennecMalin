/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from '../i18n/translations';
import { AppTab } from '../types';
import { SITE_URL } from './site';
import { CANTONS_SEO_DATA, ALL_26_CANTONS } from './data/cantonsData';
import { INSURERS_SEO_DATA } from './data/insurersData';
import { GUIDES_SEO_DATA } from './data/guidesData';

export interface LocalizedRouteInfo {
  path: string;
  title: string;
  description: string;
  h1: string;
  breadcrumbLabel: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
}

export interface MultilingualRouteConfig {
  id: AppTab;
  category: 'core' | 'health' | 'canton' | 'insurance' | 'pension' | 'guide' | 'tool' | 'trust' | 'legal' | 'subside';
  priority: number;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  lastModified?: string;
  locales: {
    fr: LocalizedRouteInfo;
    de: LocalizedRouteInfo;
    it: LocalizedRouteInfo;
    en: LocalizedRouteInfo;
    es?: LocalizedRouteInfo;
    pt?: LocalizedRouteInfo;
  };
}

/**
 * Base Core Routes
 */
export const MULTILINGUAL_ROUTES: Record<AppTab, MultilingualRouteConfig> = ({
  home: {
    id: 'home',
    category: 'core',
    priority: 1.0,
    changefreq: 'weekly',
    lastModified: '2026-08-19',
    locales: {
      fr: {
        path: '/fr/',
        title: "Le Fennec Malin — Comparateur d'Assurances Suisse 🇨🇭 100% Neutre",
        description: "Comparez gratuitement les assurances maladie (LAMal), 3ème pilier, auto, ménage et prévoyance en Suisse. Données officielles OFSP 2026. Calculez vos économies en 2 minutes.",
        h1: "Comparateur d’assurances en Suisse",
        breadcrumbLabel: "Accueil",
        primaryKeyword: "comparateur assurance suisse",
        secondaryKeywords: ["comparatif assurance suisse", "comparer assurance suisse", "assurance maladie suisse", "3eme pilier suisse"]
      },
      de: {
        path: '/de/',
        title: "Le Fennec Malin — Unabhängiger Versicherungsvergleich Schweiz 🇨🇭",
        description: "Kostenloser Vergleich von Krankenkassen (KVG), 3. Säule, Auto-, Hausrat- und Vorsorgeversicherungen in der Schweiz. Offizielle BAG-Daten 2026. Bis zu CHF 3'000 sparen.",
        h1: "Unabhängiger Versicherungsvergleich für die Schweiz",
        breadcrumbLabel: "Startseite",
        primaryKeyword: "versicherungsvergleich schweiz",
        secondaryKeywords: ["krankenkassenvergleich schweiz", "krankenkasse vergleich 2026", "3 saeule vergleich schweiz", "bag praemienvergleich"]
      },
      it: {
        path: '/it/',
        title: "Le Fennec Malin — Confronto Assicurazioni Svizzera 🇨🇭 100% Indipendente",
        description: "Confronta gratuitamente cassa malati (LAMal), 3° pilastro, auto, mobilia e previdenza in Svizzera. Dati ufficiali UFSP 2026. Risparmia fino a CHF 3'000 all'anno.",
        h1: "Confronto assicurazioni e cassa malati in Svizzera",
        breadcrumbLabel: "Home",
        primaryKeyword: "confronto assicurazioni svizzera",
        secondaryKeywords: ["confronto cassa malati svizzera", "premi cassa malati 2026", "terzo pilastro svizzera", "ufsp priminfo"]
      },
      en: {
        path: '/en/',
        title: "Le Fennec Malin — Independent Swiss Insurance Comparison 🇨🇭",
        description: "Compare Swiss health insurance (LAMal/KVG), 3rd pillar pension, car, and household insurance. Official 2026 FOPH data. Calculate your savings in 2 minutes.",
        h1: "Independent Swiss Insurance & Health Fund Comparator",
        breadcrumbLabel: "Home",
        primaryKeyword: "swiss insurance comparison",
        secondaryKeywords: ["compare health insurance switzerland", "swiss health insurance calculator", "3rd pillar switzerland 3a", "foph official premiums 2026"]
      }
    }
  },

  'seo-comparateur': {
    id: 'seo-comparateur',
    category: 'core',
    priority: 0.95,
    changefreq: 'weekly',
    lastModified: '2026-08-19',
    locales: {
      fr: {
        path: '/fr/comparateur-assurance-suisse/',
        title: "Comparateur Assurance Suisse 2026 — Devis Gratuit & Neutre | Le Fennec Malin",
        description: "Comparatif indépendant de toutes les assurances en Suisse : LAMal, 3e pilier, auto, ménage, RC, juridique. Trouvez la meilleure offre en toute transparence.",
        h1: "Comparateur d'assurances en Suisse — Comparatif 2026",
        breadcrumbLabel: "Comparateur Suisse",
        primaryKeyword: "comparateur assurance suisse",
        secondaryKeywords: ["comparatif assurance suisse neutre", "courtier suisse independant", "devis assurance suisse"]
      },
      de: {
        path: '/de/versicherungsvergleich-schweiz/',
        title: "Versicherungsvergleich Schweiz 2026 — Kostenlos & Unabhängig | Le Fennec Malin",
        description: "Neutraler Vergleich aller Schweizer Versicherungen: Krankenkasse, 3. Säule, Auto, Hausrat, Rechtsschutz. Finden Sie das beste Angebot transparent und schnell.",
        h1: "Versicherungsvergleich Schweiz — Neutral & Unabhängig 2026",
        breadcrumbLabel: "Versicherungsvergleich Schweiz",
        primaryKeyword: "versicherungsvergleich schweiz",
        secondaryKeywords: ["versicherungen vergleichen schweiz", "kostenlose versicherungsofferte", "schweizer versicherungsportal"]
      },
      it: {
        path: '/it/confronto-assicurazioni-svizzera/',
        title: "Confronto Assicurazioni Svizzera 2026 — Preventivo Gratuito | Le Fennec Malin",
        description: "Confronto neutrale di tutte le assicurazioni in Svizzera: cassa malati, 3° pilastro, auto, mobilia domestica, protezione giuridica. Calcola subito le migliori offerte.",
        h1: "Confronto Assicurazioni Svizzera — Guida & Calcolatore 2026",
        breadcrumbLabel: "Confronto Assicurazioni Svizzera",
        primaryKeyword: "confronto assicurazioni svizzera",
        secondaryKeywords: ["confrontare assicurazioni svizzera", "preventivo gratuito assicurazione", "portale assicurativo svizzero"]
      },
      en: {
        path: '/en/swiss-insurance-comparison/',
        title: "Swiss Insurance Comparison 2026 — Free & Neutral Quotes | Le Fennec Malin",
        description: "Comprehensive neutral comparison of all Swiss insurance policies: health insurance, 3rd pillar, car, home, and legal protection. Transparent advice in English.",
        h1: "Swiss Insurance Comparison — Comprehensive 2026 Guide",
        breadcrumbLabel: "Swiss Insurance Comparison",
        primaryKeyword: "swiss insurance comparison",
        secondaryKeywords: ["compare swiss insurances online", "independent swiss insurance broker", "switzerland insurance quotes"]
      }
    }
  },

  'seo-maladie': {
    id: 'seo-maladie',
    category: 'health',
    priority: 0.95,
    changefreq: 'weekly',
    lastModified: '2026-08-19',
    locales: {
      fr: {
        path: '/fr/assurance-maladie/',
        title: "Assurance Maladie Suisse 2026 — Primes Officielles OFSP & Comparateur | Le Fennec Malin",
        description: "Comparez les primes 2026 des 37 caisses maladie suisses (LAMal). Données officielles OFSP / Priminfo, franchise 300 à 2500, modèles Telmed et médecin de famille.",
        h1: "Assurance Maladie Suisse (LAMal) — Comparatif des Primes 2026",
        breadcrumbLabel: "Assurance Maladie",
        primaryKeyword: "assurance maladie suisse",
        secondaryKeywords: ["primes assurance maladie 2026", "comparateur caisse maladie", "lamal suisse", "priminfo 2026"]
      },
      de: {
        path: '/de/krankenkasse/',
        title: "Krankenkassenvergleich Schweiz 2026 — Offizielle BAG-Prämien | Le Fennec Malin",
        description: "Vergleichen Sie die Prämien 2026 aller 37 Schweizer Krankenkassen (KVG). Offizielle BAG / Priminfo Daten, Franchise 300 bis 2500, Telmed-, Hausarzt- und HMO-Modelle.",
        h1: "Krankenkassenvergleich Schweiz (KVG) — Offizielle Prämien 2026",
        breadcrumbLabel: "Krankenkasse",
        primaryKeyword: "krankenkassenvergleich schweiz",
        secondaryKeywords: ["krankenkassenpraemien 2026", "krankenkasse wechseln schweiz", "kvg grundversicherung", "priminfo bag"]
      },
      it: {
        path: '/it/cassa-malati/',
        title: "Confronto Casse Malati Svizzera 2026 — Premi Ufficiali UFSP | Le Fennec Malin",
        description: "Confronta i premi 2026 delle 37 casse malati svizzere (LAMal). Dati ufficiali UFSP / Priminfo, franchigia 300 a 2500, modelli Telmed, medico di famiglia e HMO.",
        h1: "Assicurazione Malattia Svizzera (LAMal) — Premi 2026",
        breadcrumbLabel: "Cassa Malati",
        primaryKeyword: "confronto casse malati svizzera",
        secondaryKeywords: ["premi cassa malati 2026", "cambiare cassa malati", "lamal assicurazione base", "ufsp priminfo"]
      },
      en: {
        path: '/en/health-insurance/',
        title: "Swiss Health Insurance 2026 — Official FOPH Premiums & Comparator | Le Fennec Malin",
        description: "Compare 2026 premiums of all 37 Swiss compulsory health insurance funds (LAMal/KVG). Official FOPH data, deductibles CHF 300-2500, Telmed, GP, and HMO models.",
        h1: "Swiss Health Insurance (LAMal / KVG) — 2026 Comparison",
        breadcrumbLabel: "Health Insurance",
        primaryKeyword: "swiss health insurance",
        secondaryKeywords: ["health insurance switzerland 2026", "swiss health insurance comparator", "lamal compulsory insurance", "foph official premiums"]
      }
    }
  },

  'health-comparator': {
    id: 'health-comparator',
    category: 'health',
    priority: 0.9,
    changefreq: 'daily',
    lastModified: '2026-08-19',
    locales: {
      fr: {
        path: '/fr/assurance-maladie/comparateur/',
        title: "Simulateur & Comparateur de Primes Maladie Suisse 2026 | Le Fennec Malin",
        description: "Calculez vos primes d'assurance maladie en direct. Choisissez votre canton, franchise et modèle pour afficher les tarifs officiels des caisses maladie suisses.",
        h1: "Simulateur de primes d'assurance maladie Suisse 2026",
        breadcrumbLabel: "Simulateur Primes",
        primaryKeyword: "simulateur primes maladie suisse",
        secondaryKeywords: ["calculateur assurance maladie", "comparateur primes lamal", "devis cassa malati"]
      },
      de: {
        path: '/de/krankenkasse/praemienrechner/',
        title: "Krankenkassen-Prämienrechner Schweiz 2026 | Le Fennec Malin",
        description: "Berechnen Sie Ihre Krankenkassenprämien live. Wählen Sie Kanton, Franchise und Modell für die offiziellen Tarife aller Schweizer Krankenkassen.",
        h1: "Krankenkassen-Prämienrechner Schweiz 2026",
        breadcrumbLabel: "Prämienrechner",
        primaryKeyword: "krankenkassen praemienrechner",
        secondaryKeywords: ["praemienrechner schweiz 2026", "krankenkasse berechnen", "kvg vergleich live"]
      },
      it: {
        path: '/it/cassa-malati/calcolatore-premi/',
        title: "Calcolatore Premi Cassa Malati Svizzera 2026 | Le Fennec Malin",
        description: "Calcola i tuoi premi cassa malati in tempo reale. Seleziona cantone, franchigia e modello per visualizzare i costi ufficiali di tutte le casse malati.",
        h1: "Calcolatore premi cassa malati Svizzera 2026",
        breadcrumbLabel: "Calcolatore Premi",
        primaryKeyword: "calcolatore premi cassa malati",
        secondaryKeywords: ["calcolo premio lamal", "simulatore cassa malati svizzera", "confronto live premi"]
      },
      en: {
        path: '/en/health-insurance/calculator/',
        title: "Swiss Health Insurance Premium Calculator 2026 | Le Fennec Malin",
        description: "Calculate your Swiss health insurance premiums in real time. Choose canton, deductible, and insurance model for official Swiss fund rates.",
        h1: "Swiss Health Insurance Premium Calculator 2026",
        breadcrumbLabel: "Premium Calculator",
        primaryKeyword: "swiss health insurance calculator",
        secondaryKeywords: ["calculate health insurance switzerland", "live lamal premium tool", "swiss insurance estimator"]
      }
    }
  },

  'hub-insurers': {
    id: 'hub-insurers',
    category: 'health',
    priority: 0.9,
    changefreq: 'weekly',
    lastModified: '2026-08-20',
    locales: {
      fr: {
        path: '/fr/caisses-maladie/',
        title: "Caisses Maladie Suisse 2026 — Annuaire & Comparatif Officiel | Le Fennec Malin",
        description: "Annuaire complet des caisses maladie suisses (CSS, Helsana, Swica, Groupe Mutuel, Assura, Sanitas, Visana, Concordia, KPT, etc.). Primes 2026, satisfaction et comparateur neutre.",
        h1: "Caisses Maladie en Suisse — Annuaire & Fiches Complètes 2026",
        breadcrumbLabel: "Caisses Maladie",
        primaryKeyword: "caisses maladie suisse",
        secondaryKeywords: ["annuaire caisse maladie", "comparatif caisses maladie 2026", "meilleure caisse maladie suisse"]
      },
      de: {
        path: '/de/krankenkassen/',
        title: "Krankenkassen Schweiz 2026 — Verzeichnis & Offizieller Vergleich | Le Fennec Malin",
        description: "Vollständiges Verzeichnis aller Schweizer Krankenkassen (CSS, Helsana, Swica, Visana, KPT, Sanitas usw.). Offizielle Prämien 2026, Modelle und Testberichte.",
        h1: "Krankenkassen in der Schweiz — Übersicht & Profile 2026",
        breadcrumbLabel: "Krankenkassen",
        primaryKeyword: "krankenkassen schweiz",
        secondaryKeywords: ["schweizer krankenkassen verzeichnis", "beste krankenkasse schweiz", "krankenkassen vergleich 2026"]
      },
      it: {
        path: '/it/casse-malati/',
        title: "Casse Malati Svizzera 2026 — Elenco & Confronto Ufficiale | Le Fennec Malin",
        description: "Elenco completo delle casse malati in Svizzera (CSS, Helsana, Swica, Groupe Mutuel, Assura, ecc.). Premi 2026, modelli e recensioni clienti.",
        h1: "Casse Malati in Svizzera — Elenco & Schede Dettagliate 2026",
        breadcrumbLabel: "Casse Malati",
        primaryKeyword: "casse malati svizzera",
        secondaryKeywords: ["elenco casse malati", "migliore cassa malati svizzera", "confronto casse malati 2026"]
      },
      en: {
        path: '/en/health-funds/',
        title: "Swiss Health Insurance Funds 2026 — Directory & Reviews | Le Fennec Malin",
        description: "Complete guide and directory of Swiss health insurance funds (CSS, Helsana, Swica, Sanitas, Assura, etc.). Official 2026 rates, customer ratings and English comparison.",
        h1: "Health Insurance Companies in Switzerland — 2026 Directory",
        breadcrumbLabel: "Health Funds",
        primaryKeyword: "swiss health insurance companies",
        secondaryKeywords: ["switzerland health funds directory", "best swiss health insurer", "swiss health insurance comparison 2026"]
      }
    }
  },

  // ==========================================
  // MASTER SEMANTIC CLUSTERS (SEO TOPICAL HUBS)
  // ==========================================
  'hub-lamal': {
    id: 'hub-lamal',
    category: 'health',
    priority: 0.95,
    changefreq: 'weekly',
    lastModified: '2026-08-20',
    locales: {
      fr: {
        path: '/fr/lamal/',
        title: "LAMal Suisse 2026 — Tout Comprendre sur l'Assurance Maladie Obligatoire | Le Fennec Malin",
        description: "Guide exhaustif sur la loi LAMal en Suisse : obligations, catalogue de prestations couvertes, choix des franchises, modèles alternatifs et calcul des primes 2026.",
        h1: "LAMal en Suisse : Guide Complet de l'Assurance Maladie Obligatoire 2026",
        breadcrumbLabel: "LAMal Suisse",
        primaryKeyword: "LAMal Suisse",
        secondaryKeywords: ["assurance LAMal", "loi assurance maladie suisse", "primes lamal 2026"]
      },
      de: {
        path: '/de/kvg/',
        title: "KVG Schweiz 2026 — Der Grosse Krankenversicherungs-Leitfaden | Le Fennec Malin",
        description: "Alles über das Krankenversicherungsgesetz (KVG) in der Schweiz: Obligatorium, Leistungen, Franchisen, Sparmodelle und Prämienberechnung 2026.",
        h1: "KVG Schweiz: Grundversicherung & Gesetzliche Grundlagen 2026",
        breadcrumbLabel: "KVG Leitfaden",
        primaryKeyword: "kvg schweiz",
        secondaryKeywords: ["krankenversicherungsgesetz", "grundversicherung schweiz", "kvg leistungen"]
      },
      it: {
        path: '/it/lamal/',
        title: "LAMal Svizzera 2026 — Guida Completa all'Assicurazione Malattia Obbligatoria | Le Fennec Malin",
        description: "Tutto sulla legge federale LAMal in Svizzera: obbligo assicurativo, catalogo prestazioni, scelta della franchigia e modelli di risparmio.",
        h1: "LAMal Svizzera: Guida Ufficiale all'Assicurazione Malattia Base 2026",
        breadcrumbLabel: "LAMal Svizzera",
        primaryKeyword: "lamal svizzera",
        secondaryKeywords: ["legge assicurazione malattia", "premi base lamal 2026", "prestazioni lamal"]
      },
      en: {
        path: '/en/lamal/',
        title: "Swiss Health Insurance Law (LAMal/KVG) 2026 — Official Guide | Le Fennec Malin",
        description: "Comprehensive guide to Swiss mandatory health insurance (LAMal/KVG): mandatory affiliation, covered benefits, deductibles, and premium calculation.",
        h1: "Swiss Mandatory Health Insurance (LAMal / KVG) — 2026 Guide",
        breadcrumbLabel: "LAMal Guide",
        primaryKeyword: "lamal switzerland",
        secondaryKeywords: ["swiss health insurance law", "mandatory health insurance benefits", "swiss basic healthcare"]
      }
    }
  },

  'lamal-franchise': {
    id: 'lamal-franchise',
    category: 'health',
    priority: 0.9,
    changefreq: 'monthly',
    lastModified: '2026-08-20',
    locales: {
      fr: {
        path: '/fr/lamal/franchise/',
        title: "Franchise LAMal 2026 — 300 ou 2500 ? Règle des CHF 1'800 & Calculateur | Le Fennec Malin",
        description: "Quelle franchise d'assurance maladie choisir en 2026 ? Simulation chiffrée, règle mathématique des CHF 1800, piège des franchises intermédiaires et délais légaux.",
        h1: "Franchise Assurance Maladie Suisse : Comment Choisir entre 300 et 2500 CHF ?",
        breadcrumbLabel: "Franchise LAMal",
        primaryKeyword: "franchise assurance maladie",
        secondaryKeywords: ["franchise 300 ou 2500", "quelle franchise choisir", "regle 1800 chf franchise"]
      },
      de: {
        path: '/de/kvg/franchise/',
        title: "Franchise Krankenkasse Schweiz 2026 — 300 oder 2500 wählen? | Le Fennec Malin",
        description: "Die optimale Franchise in der Schweiz wählen: CHF 300 oder CHF 2500? Rechner, 1'800-Franken-Regel und Fristen für den Wechsel.",
        h1: "Krankenkassen-Franchise Schweiz: 300 oder 2500 CHF wählen?",
        breadcrumbLabel: "Franchisen-Wahl",
        primaryKeyword: "franchise krankenkasse schweiz",
        secondaryKeywords: ["franchise 300 oder 2500", "optimale franchise berechnen"]
      },
      it: {
        path: '/it/lamal/franchigia/',
        title: "Franchigia Cassa Malati 2026 — 300 o 2500 CHF? Guida al Calcolo | Le Fennec Malin",
        description: "Come scegliere la franchigia della cassa malati in Svizzera. Regola dei 1800 franchi, simulazione e scadenze per la modifica.",
        h1: "Franchigia Cassa Malati in Svizzera: Scegliere tra 300 e 2500 CHF",
        breadcrumbLabel: "Franchigia LAMal",
        primaryKeyword: "franchigia cassa malati",
        secondaryKeywords: ["franchigia 300 o 2500", "scelta franchigia svizzera"]
      },
      en: {
        path: '/en/lamal/deductible/',
        title: "Swiss Health Deductibles 2026 — Choosing CHF 300 vs CHF 2500 | Le Fennec Malin",
        description: "Which Swiss health insurance deductible should you choose in 2026? The CHF 1,800 threshold rule, intermediate deductible traps, and simulator.",
        h1: "Swiss Health Insurance Deductible: CHF 300 or CHF 2,500?",
        breadcrumbLabel: "Deductibles Guide",
        primaryKeyword: "swiss insurance deductible",
        secondaryKeywords: ["deductible 300 vs 2500", "how to choose swiss deductible"]
      }
    }
  },

  'lamal-modeles': {
    id: 'lamal-modeles',
    category: 'health',
    priority: 0.9,
    changefreq: 'monthly',
    lastModified: '2026-08-20',
    locales: {
      fr: {
        path: '/fr/lamal/modeles/',
        title: "Modèles d'Assurance Maladie 2026 — Standard, Telmed, Médecin de famille, HMO | Le Fennec Malin",
        description: "Comparatif des modèles LAMal : jusqu'à 25% d'économies sur vos primes. Règles de délégation, exceptions d'urgence (gynécologue, ophtalmologue) et comparatif.",
        h1: "Modèles d'Assurance Maladie en Suisse : Standard vs Telmed vs HMO",
        breadcrumbLabel: "Modèles d'Assurance",
        primaryKeyword: "modèle assurance maladie",
        secondaryKeywords: ["modele standard vs telmed", "medecin de famille hmo", "rabais modele alternatif"]
      },
      de: {
        path: '/de/kvg/versicherungsmodelle/',
        title: "Versicherungsmodelle Schweiz 2026 — Standard, Telmed, Hausarzt, HMO | Le Fennec Malin",
        description: "Vergleich aller KVG-Sparmodelle: Sparen Sie bis zu 25% Prämie mit Telmed, Hausarzt- oder HMO-Modell. Regeln und Notfallausnahmen.",
        h1: "Krankenkassen-Modelle in der Schweiz: Standard, Telmed, Hausarzt & HMO",
        breadcrumbLabel: "Versicherungsmodelle",
        primaryKeyword: "versicherungsmodelle schweiz",
        secondaryKeywords: ["telmed modell", "hausarztmodell schweiz", "hmo modell vergleich"]
      },
      it: {
        path: '/it/lamal/modelli/',
        title: "Modelli di Assicurazione Malattia 2026 — Standard, Telmed, Medico di Famiglia | Le Fennec Malin",
        description: "Confronto dei modelli alternativi LAMal in Svizzera: risparmia fino al 25% con Telmed, Medico di famiglia o rete HMO.",
        h1: "Modelli di Assicurazione Malattia in Svizzera: Standard, Telmed o Medico di Famiglia?",
        breadcrumbLabel: "Modelli LAMal",
        primaryKeyword: "modelli assicurazione malattia",
        secondaryKeywords: ["modello telmed", "medico di famiglia svizzera", "modello hmo"]
      },
      en: {
        path: '/en/lamal/models/',
        title: "Swiss Healthcare Models 2026 — Standard, Telmed, GP & HMO | Le Fennec Malin",
        description: "Compare Swiss insurance models: save up to 25% with Telmed, Family Doctor (GP), or HMO networks. Direct access rules and emergency protocols.",
        h1: "Swiss Health Insurance Models: Standard vs Telmed vs HMO",
        breadcrumbLabel: "Insurance Models",
        primaryKeyword: "swiss insurance models",
        secondaryKeywords: ["telmed model switzerland", "family doctor model", "hmo network switzerland"]
      }
    }
  },

  'lamal-moins-chere': {
    id: 'lamal-moins-chere',
    category: 'health',
    priority: 0.92,
    changefreq: 'weekly',
    lastModified: '2026-08-20',
    locales: {
      fr: {
        path: '/fr/lamal/caisse-maladie-la-moins-chere/',
        title: "Caisse Maladie la Moins Chère en Suisse 2026 — Comparatif Réel par Canton | Le Fennec Malin",
        description: "Quelle est la caisse maladie la moins chère en Suisse ? Découvrez pourquoi il n'existe aucun assureur universellement le moins cher et comparez selon votre profil.",
        h1: "Caisse Maladie la Moins Chère en Suisse : Comparatif Réel & Astuces 2026",
        breadcrumbLabel: "Moins Chère",
        primaryKeyword: "caisse maladie la moins chère",
        secondaryKeywords: ["assurance maladie pas chere suisse", "trouver la caisse la moins chere", "primes les plus basses 2026"]
      },
      de: {
        path: '/de/kvg/guenstigste-krankenkasse/',
        title: "Günstigste Krankenkasse Schweiz 2026 — Echter Vergleich nach Kanton | Le Fennec Malin",
        description: "Welche ist die billigste Krankenkasse der Schweiz? Vergleichen Sie reale Prämien nach Wohnort und Alter für maximale Ersparnis.",
        h1: "Die günstigste Krankenkasse der Schweiz: Realer Kantons-Vergleich 2026",
        breadcrumbLabel: "Günstigste Kasse",
        primaryKeyword: "guenstigste krankenkasse schweiz",
        secondaryKeywords: ["billigste krankenkasse", "praemien sparen schweiz"]
      },
      it: {
        path: '/it/lamal/cassa-malati-piu-economica/',
        title: "Cassa Malati Più Economica Svizzera 2026 — Confronto Reale per Cantone | Le Fennec Malin",
        description: "Qual è la cassa malati meno cara in Svizzera? Confronto reale dei premi per cantone, franchigia e modello.",
        h1: "Cassa Malati Più Economica in Svizzera: Classifica Reale 2026",
        breadcrumbLabel: "Più Economica",
        primaryKeyword: "cassa malati piu economica",
        secondaryKeywords: ["cassa malati meno cara", "risparmiare cassa malati svizzera"]
      },
      en: {
        path: '/en/lamal/cheapest-health-insurance/',
        title: "Cheapest Health Insurance Switzerland 2026 — Real Cantonal Rates | Le Fennec Malin",
        description: "Find the lowest health insurance premiums in Switzerland for 2026. Understand why rates vary by canton and how to save up to CHF 1,200/year.",
        h1: "The Cheapest Health Insurance in Switzerland: 2026 Breakdown",
        breadcrumbLabel: "Cheapest Fund",
        primaryKeyword: "cheapest health insurance switzerland",
        secondaryKeywords: ["lowest swiss health premiums", "save money swiss healthcare"]
      }
    }
  },

  'meilleure-caisse-maladie': {
    id: 'meilleure-caisse-maladie',
    category: 'health',
    priority: 0.92,
    changefreq: 'weekly',
    lastModified: '2026-08-20',
    locales: {
      fr: {
        path: '/fr/meilleure-caisse-maladie/',
        title: "Meilleure Caisse Maladie Suisse 2026 — Classement, Satisfaction & Solvabilité | Le Fennec Malin",
        description: "Classement 2026 des meilleures caisses maladie suisses. Notes de satisfaction client, taux de réserves OFSP, rapidité de remboursement et qualité du service.",
        h1: "Quelle est la Meilleure Caisse Maladie en Suisse ? Classement & Avis 2026",
        breadcrumbLabel: "Meilleure Caisse",
        primaryKeyword: "meilleure caisse maladie suisse",
        secondaryKeywords: ["classement caisses maladie", "satisfaction caisse maladie", "solvabilite ofsp"]
      },
      de: {
        path: '/de/beste-krankenkasse/',
        title: "Beste Krankenkasse Schweiz 2026 — Ranking, Kundenzufriedenheit & Solvenz | Le Fennec Malin",
        description: "Die besten Krankenkassen der Schweiz im Test: Kundenzufriedenheit, BAG-Reserven, Auszahlungsgeschwindigkeit und Servicequalität 2026.",
        h1: "Die beste Krankenkasse der Schweiz: Offizielles Ranking & Test 2026",
        breadcrumbLabel: "Beste Kasse",
        primaryKeyword: "beste krankenkasse schweiz",
        secondaryKeywords: ["krankenkassen test 2026", "kundenzufriedenheit krankenkassen"]
      },
      it: {
        path: '/it/migliore-cassa-malati/',
        title: "Migliore Cassa Malati Svizzera 2026 — Classifica, Soddisfazione & Riserve | Le Fennec Malin",
        description: "Classifica 2026 delle migliori casse malati in Svizzera: soddisfazione clienti, tempi di rimborso e solidità finanziaria UFSP.",
        h1: "Qual è la Migliore Cassa Malati in Svizzera? Classifica Ufficiale 2026",
        breadcrumbLabel: "Migliore Cassa",
        primaryKeyword: "migliore cassa malati svizzera",
        secondaryKeywords: ["classifica casse malati", "soddisfazione clienti cassa malati"]
      },
      en: {
        path: '/en/best-health-insurance-switzerland/',
        title: "Best Health Insurance in Switzerland 2026 — Ratings, Service & Solvency | Le Fennec Malin",
        description: "Official 2026 ranking of Swiss health insurance funds. Customer satisfaction scores, FOPH reserve ratios, and claims reimbursement speed.",
        h1: "The Best Health Insurance Companies in Switzerland — 2026 Ranking",
        breadcrumbLabel: "Best Insurer",
        primaryKeyword: "best health insurance switzerland",
        secondaryKeywords: ["top swiss health insurers", "swiss insurance satisfaction rating"]
      }
    }
  },

  'lamal-changer-caisse': {
    id: 'lamal-changer-caisse',
    category: 'health',
    priority: 0.9,
    changefreq: 'monthly',
    lastModified: '2026-08-20',
    locales: {
      fr: {
        path: '/fr/lamal/changer-caisse-maladie/',
        title: "Changer de Caisse Maladie en Suisse — Délai 30 Novembre & Lettre Type | Le Fennec Malin",
        description: "Comment changer de caisse maladie en Suisse ? Délai strict du 30 novembre, modèle gratuit de lettre de résiliation, règles pour les complémentaires et arriérés.",
        h1: "Changer de Caisse Maladie en Suisse : Guide Pas à Pas & Modèle de Résiliation",
        breadcrumbLabel: "Changer de Caisse",
        primaryKeyword: "changer de caisse maladie",
        secondaryKeywords: ["resiliation assurance maladie suisse", "delai 30 novembre lamal", "modele lettre resiliation caisse maladie"]
      },
      de: {
        path: '/de/kvg/krankenkasse-wechseln/',
        title: "Krankenkasse Wechseln Schweiz — Kündigungsfrist 30. November & Vorlage | Le Fennec Malin",
        description: "Krankenkasse kündigen und wechseln in der Schweiz: Frist bis 30. November, kostenlose Kündigungsvorlage, Zusatzversicherungs-Regeln und offizielle Abläufe.",
        h1: "Krankenkasse wechseln in der Schweiz: Schritt-für-Schritt & Kündigungsbrief",
        breadcrumbLabel: "Krankenkasse wechseln",
        primaryKeyword: "krankenkasse wechseln",
        secondaryKeywords: ["krankenkasse kuendigen", "kuendigungsfrist 30 november", "kuendigungsschreiben krankenkasse"]
      },
      it: {
        path: '/it/lamal/cambiare-cassa-malati/',
        title: "Cambiare Cassa Malati Svizzera — Scadenza 30 Novembre & Modello Lettera | Le Fennec Malin",
        description: "Come disdire e cambiare cassa malati in Svizzera: termine imperativo del 30 novembre, lettera tipo di disdetta gratuita e regole per le complementari.",
        h1: "Come Cambiare Cassa Malati in Svizzera: Guida & Modello di Disdetta",
        breadcrumbLabel: "Cambiare Cassa",
        primaryKeyword: "cambiare cassa malati",
        secondaryKeywords: ["disdetta cassa malati svizzera", "termine 30 novembre cassa malati", "lettera disdetta lamal"]
      },
      en: {
        path: '/en/lamal/switch-health-insurance/',
        title: "How to Switch Swiss Health Insurance — Nov 30 Deadline & Cancellation Letter | Le Fennec Malin",
        description: "Complete guide on switching your Swiss health insurer: mandatory November 30 deadline, free cancellation letter template, and supplementary policy safety.",
        h1: "How to Switch Health Insurance in Switzerland: Step-by-Step Guide",
        breadcrumbLabel: "Switch Insurance",
        primaryKeyword: "switch health insurance switzerland",
        secondaryKeywords: ["cancel swiss health insurance", "november 30 deadline lamal", "cancellation letter template"]
      }
    }
  },

  'assurance-famille': {
    id: 'assurance-famille',
    category: 'health',
    priority: 0.88,
    changefreq: 'monthly',
    lastModified: '2026-08-20',
    locales: {
      fr: {
        path: '/fr/assurance-maladie/famille/',
        title: "Assurance Maladie Famille & Enfant Suisse 2026 — Rabais & Primes | Le Fennec Malin",
        description: "Guide de l'assurance maladie pour les familles en Suisse : rabais dès le 2ème et 3ème enfant, franchise 0 CHF, couverture prénatale et optimisation de budget.",
        h1: "Assurance Maladie pour Famille et Enfants en Suisse : Primes & Rabais 2026",
        breadcrumbLabel: "Famille & Enfants",
        primaryKeyword: "assurance maladie famille",
        secondaryKeywords: ["assurance maladie enfant suisse", "rabais famille caisse maladie", "assurance prenatale bebe"]
      },
      de: {
        path: '/de/krankenkassen/familie/',
        title: "Krankenkasse für Familien & Kinder Schweiz 2026 — Rabatte & Prämien | Le Fennec Malin",
        description: "Familienrabatte bei Schweizer Krankenkassen: Franchise CHF 0 für Kinder, Ermässigungen ab dem 2. Kind, Pränatale Versicherung und Spartipps.",
        h1: "Familien-Krankenkasse in der Schweiz: Prämienrabatte & Schutz für Kinder",
        breadcrumbLabel: "Familie & Kinder",
        primaryKeyword: "krankenkasse familie schweiz",
        secondaryKeywords: ["krankenkasse fuer kinder", "familienrabatt krankenkasse", "praenatale versicherung"]
      },
      it: {
        path: '/it/casse-malati/famiglia/',
        title: "Cassa Malati per Famiglie & Bambini Svizzera 2026 — Sconti & Premi | Le Fennec Malin",
        description: "Guida per famiglie in Svizzera: sconti dal 2° e 3° figlio, franchigia 0 CHF per minori, assicurazione prenatale e risparmio.",
        h1: "Cassa Malati per Famiglie e Bambini in Svizzera: Agevolazioni 2026",
        breadcrumbLabel: "Famiglia & Bambini",
        primaryKeyword: "cassa malati famiglia svizzera",
        secondaryKeywords: ["cassa malati bambini", "sconti famiglia cassa malati"]
      },
      en: {
        path: '/en/health-insurance/family/',
        title: "Swiss Family & Child Health Insurance 2026 — Discounts & Maternity | Le Fennec Malin",
        description: "Guide for families in Switzerland: multi-child discounts, CHF 0 deductible for children, prenatal registration, and budget optimization.",
        h1: "Health Insurance for Families and Children in Switzerland: 2026 Guide",
        breadcrumbLabel: "Family & Children",
        primaryKeyword: "family health insurance switzerland",
        secondaryKeywords: ["child health insurance switzerland", "family discounts health insurance"]
      }
    }
  },

  'assurance-jeune-adulte': {
    id: 'assurance-jeune-adulte',
    category: 'health',
    priority: 0.85,
    changefreq: 'monthly',
    lastModified: '2026-08-20',
    locales: {
      fr: {
        path: '/fr/assurance-maladie/jeune-adulte/',
        title: "Assurance Maladie Jeune Adulte (19-25 ans) 2026 — Rabais & Tarifs | Le Fennec Malin",
        description: "Assurance maladie jeune adulte en Suisse : économisez jusqu'à 40% sur vos primes LAMal de 19 à 25 ans. Astuces pour choisir son modèle et sa franchise.",
        h1: "Assurance Maladie Jeune Adulte en Suisse (19 à 25 ans) : Réductions & Conseils",
        breadcrumbLabel: "Jeunes Adultes",
        primaryKeyword: "assurance maladie jeune adulte",
        secondaryKeywords: ["tarif jeune 19-25 ans", "rabais jeune adulte lamal", "economiser prime jeune"]
      },
      de: {
        path: '/de/krankenkassen/junge-erwachsene/',
        title: "Krankenkasse für Junge Erwachsene (19-25) Schweiz 2026 | Le Fennec Malin",
        description: "Rabatte für junge Erwachsene von 19 bis 25 Jahren: Bis zu 40% tiefere Grundversicherungs-Prämien. Die besten Modelle und Franchisen.",
        h1: "Krankenkasse für junge Erwachsene (19 bis 25 Jahre): Tarife & Rabatte",
        breadcrumbLabel: "Junge Erwachsene",
        primaryKeyword: "krankenkasse junge erwachsene",
        secondaryKeywords: ["jugendrabatt krankenkasse", "praemien 19 bis 25 jahre"]
      },
      it: {
        path: '/it/casse-malati/giovani-adulti/',
        title: "Cassa Malati Giovani Adulti (19-25 anni) Svizzera 2026 | Le Fennec Malin",
        description: "Agevolazioni per giovani dai 19 ai 25 anni in Svizzera: tariffe ridotte fino al 40%, scelta della franchigia e modelli ottimali.",
        h1: "Cassa Malati per Giovani Adulti in Svizzera: Sconti 19-25 Anni",
        breadcrumbLabel: "Giovani Adulti",
        primaryKeyword: "cassa malati giovani adulti",
        secondaryKeywords: ["sconti giovani cassa malati", "tariffe 19-25 anni lamal"]
      },
      en: {
        path: '/en/health-insurance/young-adults/',
        title: "Swiss Health Insurance for Young Adults (19-25) 2026 | Le Fennec Malin",
        description: "Young adult discounts in Switzerland: save up to 40% on mandatory LAMal premiums between ages 19 and 25 with optimal models and deductibles.",
        h1: "Health Insurance for Young Adults (19-25) in Switzerland",
        breadcrumbLabel: "Young Adults",
        primaryKeyword: "young adult health insurance switzerland",
        secondaryKeywords: ["swiss youth insurance discounts", "health rates age 19 to 25"]
      }
    }
  },

  'assurance-etudiant': {
    id: 'assurance-etudiant',
    category: 'health',
    priority: 0.85,
    changefreq: 'monthly',
    lastModified: '2026-08-20',
    locales: {
      fr: {
        path: '/fr/assurance-maladie/etudiant/',
        title: "Assurance Maladie Étudiant Suisse 2026 — Formules Économiques & Exonérations | Le Fennec Malin",
        description: "Guide complet pour les étudiants suisses et internationaux : primes réduites, subsides cantonaux pour études et démarches d'exemption LAMal.",
        h1: "Assurance Maladie pour Étudiants en Suisse : Offres, Subsides & Exonération",
        breadcrumbLabel: "Étudiants",
        primaryKeyword: "assurance maladie étudiant suisse",
        secondaryKeywords: ["assurance etudiant international suisse", "exoneration lamal etudiant", "subside etudiant"]
      },
      de: {
        path: '/de/krankenkassen/studenten/',
        title: "Krankenkasse für Studenten in der Schweiz 2026 | Le Fennec Malin",
        description: "Günstige Krankenkassenangebote für Schweizer und internationale Studierende: Prämienverbilligung, Befreiung vom KVG-Obligatorium und Spartipps.",
        h1: "Krankenversicherung für Studierende in der Schweiz",
        breadcrumbLabel: "Studenten",
        primaryKeyword: "krankenkasse studenten schweiz",
        secondaryKeywords: ["studentenversicherung schweiz", "kvg befreiung studium"]
      },
      it: {
        path: '/it/casse-malati/studenti/',
        title: "Cassa Malati per Studenti in Svizzera 2026 | Le Fennec Malin",
        description: "Tutto sull'assicurazione malattia per studenti svizzeri e internazionali: premi agevolati, sussidi cantonali e domande di esenzione.",
        h1: "Assicurazione Malattia per Studenti in Svizzera: Guida 2026",
        breadcrumbLabel: "Studenti",
        primaryKeyword: "cassa malati studenti svizzera",
        secondaryKeywords: ["assicurazione studenti internazionali", "sussidi studio cassa malati"]
      },
      en: {
        path: '/en/health-insurance/students/',
        title: "Swiss Student Health Insurance 2026 — International & Local | Le Fennec Malin",
        description: "Health insurance solutions for local and international students in Switzerland: premium reductions, cantonal subsidies, and exemption criteria.",
        h1: "Health Insurance for Students in Switzerland: Complete 2026 Guide",
        breadcrumbLabel: "Students",
        primaryKeyword: "student health insurance switzerland",
        secondaryKeywords: ["international student health insurance", "swiss lamal exemption student"]
      }
    }
  },

  'lamal-nouveau-resident': {
    id: 'lamal-nouveau-resident',
    category: 'health',
    priority: 0.9,
    changefreq: 'monthly',
    lastModified: '2026-08-20',
    locales: {
      fr: {
        path: '/fr/lamal/nouveau-resident-suisse/',
        title: "Assurance Maladie Nouveau Résident & Expatrié Suisse — Guide 3 Mois | Le Fennec Malin",
        description: "Arriver en Suisse : délai obligatoire de 3 mois pour souscrire la LAMal, rétroactivité, permis B/C, choix de franchise et affiliation pas à pas.",
        h1: "Nouveau Résident & Expatrié en Suisse : Démarches Assurance Maladie Obligatoire",
        breadcrumbLabel: "Nouveau Résident",
        primaryKeyword: "assurance maladie nouveau résident suisse",
        secondaryKeywords: ["delai 3 mois affiliation suisse", "expatriation suisse assurance maladie", "permis b assurance maladie"]
      },
      de: {
        path: '/de/kvg/neuzuzueger-schweiz/',
        title: "Krankenversicherung für Neuzuzüger in die Schweiz 2026 | Le Fennec Malin",
        description: "In die Schweiz gezogen: 3-Monats-Frist für das KVG-Obligatorium, Rückwirkung der Deckung, B-/C-Bewilligung und Anbieterwahl.",
        h1: "Neuzuzüger in die Schweiz: Leitfaden zur obligatorischen Krankenpflegeversicherung",
        breadcrumbLabel: "Neuzuzüger",
        primaryKeyword: "krankenkasse neuzuzueger schweiz",
        secondaryKeywords: ["anmeldung krankenkasse frist 3 monate", "auswandern schweiz versicherung"]
      },
      it: {
        path: '/it/lamal/nuovi-residenti-svizzera/',
        title: "Cassa Malati per Nuovi Residenti in Svizzera — Termine 3 Mesi | Le Fennec Malin",
        description: "Trasferirsi in Svizzera: termine di 3 mesi per l'affiliazione LAMal obbligatoria, retroattività dei premi, permesso B/C e consigli pratici.",
        h1: "Nuovi Residenti ed Espatriati in Svizzera: Guida all'Assicurazione Malattia",
        breadcrumbLabel: "Nuovi Residenti",
        primaryKeyword: "cassa malati nuovi residenti svizzera",
        secondaryKeywords: ["termine affiliazione 3 mesi svizzera", "permesso b cassa malati"]
      },
      en: {
        path: '/en/lamal/new-residents-switzerland/',
        title: "Health Insurance for New Residents & Expats in Switzerland | Le Fennec Malin",
        description: "Moving to Switzerland: mandatory 3-month affiliation deadline, retroactive coverage, B/C work permits, and choosing your insurance provider.",
        h1: "New Residents & Expats in Switzerland: Mandatory Health Insurance Guide",
        breadcrumbLabel: "New Residents",
        primaryKeyword: "health insurance new residents switzerland",
        secondaryKeywords: ["swiss 3 month insurance deadline", "expat health insurance switzerland"]
      }
    }
  },

  'lamal-frontalier': {
    id: 'lamal-frontalier',
    category: 'health',
    priority: 0.95,
    changefreq: 'weekly',
    lastModified: '2026-08-20',
    locales: {
      fr: {
        path: '/fr/lamal/frontalier/',
        title: "Assurance Maladie Frontalier Suisse 2026 : LAMal vs CMU & Droit d'Option | Le Fennec Malin",
        description: "Guide complet frontalier suisse 2026 : comparatif officiel LAMal vs CMU (8%), simulateur d'économies, document S1 / E106 et délai légal des 3 mois.",
        h1: "Assurance Maladie Frontalier Suisse : LAMal vs CMU & Droit d'Option",
        breadcrumbLabel: "Frontaliers Suisse",
        primaryKeyword: "assurance maladie frontalier suisse",
        secondaryKeywords: ["lamal frontalier", "droit d'option frontalier suisse", "simulateur cmu lamal", "formulaire s1 cpam"]
      },
      de: {
        path: '/de/kvg/grenzgaenger/',
        title: "Krankenversicherung für Grenzgänger Schweiz 2026 — KVG vs. Wohnland | Le Fennec Malin",
        description: "Grenzgänger-Krankenversicherung Schweiz: Optionsrecht (3-Monats-Frist), Formular S1 / E106, Prämienvergleich und Kostenanalyse.",
        h1: "Krankenversicherung für Grenzgänger in die Schweiz: KVG & Optionsrecht",
        breadcrumbLabel: "Grenzgänger",
        primaryKeyword: "krankenkasse grenzgaenger schweiz",
        secondaryKeywords: ["optionsrecht grenzgaenger", "kvg grenzgaenger praemien", "formular s1"]
      },
      it: {
        path: '/it/lamal/frontalieri/',
        title: "Cassa Malati Frontalieri Svizzera 2026 — Diritto d'Opzione LAMal | Le Fennec Malin",
        description: "Guida per frontalieri in Svizzera: diritto d'opzione entro 3 mesi, formulario S1, confronto costi e copertura sanitaria bilaterale.",
        h1: "Assicurazione Malattia per Frontalieri in Svizzera: Guida LAMal 2026",
        breadcrumbLabel: "Frontalieri",
        primaryKeyword: "cassa malati frontalieri svizzera",
        secondaryKeywords: ["diritto opzione frontalieri", "premio lamal frontalieri", "formulario s1"]
      },
      en: {
        path: '/en/lamal/cross-border-workers/',
        title: "Swiss Cross-Border Health Insurance 2026 — LAMal vs CMU Guide | Le Fennec Malin",
        description: "Complete guide for cross-border commuters in Switzerland: 3-month legal option right, S1/E106 form, flat vs income-based premium savings calculator.",
        h1: "Cross-Border Commuters Health Insurance (LAMal Option Right)",
        breadcrumbLabel: "Cross-Border Workers",
        primaryKeyword: "cross border health insurance switzerland",
        secondaryKeywords: ["swiss frontalier health insurance", "lamal vs cmu", "s1 form switzerland"]
      }
    }
  },

  'lamal-seniors': {
    id: 'lamal-seniors',
    category: 'health',
    priority: 0.9,
    changefreq: 'monthly',
    lastModified: '2026-08-20',
    locales: {
      fr: {
        path: '/fr/lamal/seniors/',
        title: "Assurance Maladie Senior & Retraité Suisse 2026 : Primes, Franchise 300 & EMS | Le Fennec Malin",
        description: "Guide officiel assurance maladie pour les personnes de 65 ans et plus en Suisse : franchise optimale 300 CHF, soins Spitex/CMS, génériques et subsides AVS.",
        h1: "Assurance Maladie Senior & Retraité en Suisse : Optimisation 2026",
        breadcrumbLabel: "Seniors & Retraités",
        primaryKeyword: "assurance maladie senior suisse",
        secondaryKeywords: ["caisse maladie retraite suisse", "franchise 300 senior", "soins spitex lamal"]
      },
      de: {
        path: '/de/kvg/senioren/',
        title: "Krankenkasse für Senioren & Rentner Schweiz 2026 — Franchise & Spitex | Le Fennec Malin",
        description: "Krankenversicherung ab 65 Jahren in der Schweiz: Optimale Franchise CHF 300, Spitex-Leistungen, Generika-Regeln und Prämienverbilligung für AHV-Rentner.",
        h1: "Krankenkasse für Senioren und Rentner in der Schweiz: Leitfaden 2026",
        breadcrumbLabel: "Senioren & Rentner",
        primaryKeyword: "krankenkasse senioren schweiz",
        secondaryKeywords: ["krankenkasse ab 65", "franchise 300 rentner", "spitex grundversicherung"]
      },
      it: {
        path: '/it/lamal/anziani-pensionati/',
        title: "Cassa Malati per Anziani e Pensionati Svizzera 2026 | Le Fennec Malin",
        description: "Assicurazione malattia per over 65 in Svizzera: franchigia 300 CHF raccomandata, cure a domicilio Spitex, farmaci generici e sussidi AVS.",
        h1: "Cassa Malati per Anziani e Pensionati in Svizzera: Guida 2026",
        breadcrumbLabel: "Anziani & Pensionati",
        primaryKeyword: "cassa malati anziani svizzera",
        secondaryKeywords: ["cassa malati pensionati", "franchigia 300 anziani", "cure a domicilio lamal"]
      },
      en: {
        path: '/en/lamal/seniors-retirees/',
        title: "Swiss Health Insurance for Seniors & Retirees (65+) 2026 | Le Fennec Malin",
        description: "Official guide to health insurance for retirees in Switzerland: CHF 300 deductible strategy, home care (Spitex), nursing homes, and AHV subsidies.",
        h1: "Swiss Health Insurance for Seniors & Retirees: 2026 Guide",
        breadcrumbLabel: "Seniors & Retirees",
        primaryKeyword: "health insurance seniors switzerland",
        secondaryKeywords: ["retiree health insurance swiss", "deductible 300 seniors", "spitex coverage"]
      }
    }
  },

  'lamal-primes-2026': {
    id: 'lamal-primes-2026',
    category: 'health',
    priority: 0.95,
    changefreq: 'weekly',
    lastModified: '2026-08-20',
    locales: {
      fr: {
        path: '/fr/lamal/primes-2026/',
        title: "Primes Assurance Maladie Suisse 2026 : Données Officielles OFSP & Classement des 26 Cantons | Le Fennec Malin",
        description: "Étude statistique complète des primes LAMal 2026 : classement des 26 cantons suisses, prix moyens par âge, modèles de soins et seuils de rentabilité.",
        h1: "Prix & Primes de l'Assurance Maladie en Suisse en 2026",
        breadcrumbLabel: "Primes 2026 (Étude)",
        primaryKeyword: "primes assurance maladie 2026",
        secondaryKeywords: ["prix assurance maladie suisse", "tableau primes cantons 2026", "statistiques ofsp priminfo"]
      },
      de: {
        path: '/de/kvg/praemien-2026/',
        title: "Krankenkassenprämien Schweiz 2026 : Offizielle BAG-Daten & Kantonsvergleich | Le Fennec Malin",
        description: "Umfassende Statistik der KVG-Prämien 2026: Ranking aller 26 Kantone, Durchschnittspreise nach Altersgruppen, Sparmodelle und Analysemethodik.",
        h1: "Krankenkassenprämien in der Schweiz 2026: Offizielle BAG-Statistik",
        breadcrumbLabel: "Prämien 2026 (Studie)",
        primaryKeyword: "krankenkassenpraemien 2026",
        secondaryKeywords: ["praemienvergleich 26 kantone", "bag priminfo daten", "kosten grundversicherung"]
      },
      it: {
        path: '/it/lamal/premi-2026/',
        title: "Premi Cassa Malati Svizzera 2026 : Dati Ufficiali UFSP & Classifica 26 Cantoni | Le Fennec Malin",
        description: "Studio statistico completo dei premi LAMal 2026: graduatoria dei 26 cantoni svizzeri, prezzi medi per fascia d'età e modelli di risparmio.",
        h1: "Prezzi e Premi dell'Assicurazione Malattia in Svizzera nel 2026",
        breadcrumbLabel: "Premi 2026 (Studio)",
        primaryKeyword: "premi cassa malati 2026",
        secondaryKeywords: ["classifica premi cantoni svizzeri", "dati ufsp priminfo", "prezzo cassa malati"]
      },
      en: {
        path: '/en/lamal/premiums-2026/',
        title: "Swiss Health Insurance Premiums 2026 : Official FOPH Data & 26 Cantons Ranking | Le Fennec Malin",
        description: "Comprehensive 2026 Swiss health insurance premium study: ranking of all 26 cantons, average prices by age group, care models and break-even math.",
        h1: "Swiss Health Insurance Prices & Premiums in 2026",
        breadcrumbLabel: "2026 Premiums (Study)",
        primaryKeyword: "swiss health insurance premiums 2026",
        secondaryKeywords: ["switzerland 26 cantons premium ranking", "official foph data", "average healthcare costs"]
      }
    }
  },

  'comparer-assureurs-primes-2026': {
    id: 'comparer-assureurs-primes-2026',
    category: 'health',
    priority: 0.95,
    changefreq: 'weekly',
    lastModified: '2026-09-02',
    locales: {
      fr: {
        path: '/fr/assurance-maladie/comparer-assureurs-primes-2026/',
        title: "Comparez les Assureurs & Nouvelles Primes 2026 en Suisse | Le Fennec Malin",
        description: "Comparez les nouvelles primes 2026 de toutes les caisses maladie suisses (CSS, Helsana, Swica, Mutuel, Assura, Concordia, Visana, Sanitas, KPT). Données officielles OFSP, classements par canton et économies jusqu'à 1'800 CHF/an.",
        h1: "Comparez les assureurs et les nouvelles primes 2026 en Suisse",
        breadcrumbLabel: "Nouvelles Primes 2026",
        primaryKeyword: "comparez les assureurs nouvelles primes 2026",
        secondaryKeywords: ["comparer assureurs primes 2026", "nouvelles primes assurance maladie 2026", "comparatif caisses maladie 2026", "primes ofsp 2026"]
      },
      de: {
        path: '/de/krankenkassen/neue-praemien-2026-vergleichen/',
        title: "Krankenkassen & Neue Prämien 2026 Vergleichen | Le Fennec Malin",
        description: "Vergleichen Sie die neuen Krankenkassenprämien 2026 aller Schweizer Kassen (CSS, Helsana, Swica, Sanitas, Visana usw.). Offizielle BAG-Daten, Spartipps und Wechselrechner.",
        h1: "Krankenkassen vergleichen: Neue Prämien 2026 in der Schweiz",
        breadcrumbLabel: "Neue Prämien 2026 vergleichen",
        primaryKeyword: "neue krankenkassenpraemien 2026 vergleichen",
        secondaryKeywords: ["krankenkassen vergleich 2026", "neue bag praemien 2026", "sparpotenzial krankenkasse"]
      },
      it: {
        path: '/it/casse-malati/confronta-nuovi-premi-2026/',
        title: "Confronta le Casse Malati e i Nuovi Premi 2026 | Le Fennec Malin",
        description: "Confronta i nuovi premi 2026 di tutte le casse malati svizzere. Dati ufficiali UFSP, classifiche cantonali e simulatore di risparmio fino a 1'800 CHF all'anno.",
        h1: "Confronta le casse malati e i nuovi premi 2026 in Svizzera",
        breadcrumbLabel: "Confronta Premi 2026",
        primaryKeyword: "confronta assicuratori nuovi premi 2026",
        secondaryKeywords: ["nuovi premi cassa malati 2026", "confronto casse malati 2026", "risparmio cassa malati"]
      },
      en: {
        path: '/en/health-insurance/compare-insurers-2026-premiums/',
        title: "Compare Swiss Health Insurers & New 2026 Premiums | Le Fennec Malin",
        description: "Compare new 2026 health insurance premiums across all Swiss providers (CSS, Helsana, Swica, Sanitas, Assura, Mutuel, Visana). Official FOPH rates & savings simulator.",
        h1: "Compare Swiss Insurers & New 2026 Health Premiums",
        breadcrumbLabel: "Compare 2026 Premiums",
        primaryKeyword: "compare insurers new premiums 2026",
        secondaryKeywords: ["swiss health insurance comparison 2026", "new foph premiums 2026", "switch health fund switzerland"]
      },
      es: {
        path: '/es/seguro-medico/comparar-aseguradoras-primas-2026/',
        title: "Compare las Aseguradoras y Nuevas Primas 2026 en Suiza | Le Fennec Malin",
        description: "Compare las nuevas primas 2026 de todas las cajas de salud suizas. Datos oficiales OFSP, comparativa por cantón y ahorros de hasta 1'800 CHF/año.",
        h1: "Comparar aseguradoras y nuevas primas de seguro de salud 2026 en Suiza",
        breadcrumbLabel: "Comparar Primas 2026",
        primaryKeyword: "comparar aseguradoras nuevas primas 2026",
        secondaryKeywords: ["nuevas primas seguro suiza 2026", "ahorrar seguro enfermedad suiza"]
      },
      pt: {
        path: '/pt/seguro-saude/comparar-seguradoras-premios-2026/',
        title: "Compare as Seguradoras e Novos Prémios 2026 na Suíça | Le Fennec Malin",
        description: "Compare os novos prémios 2026 de todas as caixas de saúde suíças. Dados oficiais OFSP, classificações cantonais e simulador de poupança até 1'800 CHF/ano.",
        h1: "Comparar seguradoras e novos prémios de saúde 2026 na Suíça",
        breadcrumbLabel: "Comparar Prémios 2026",
        primaryKeyword: "comparar seguradoras novos premios 2026",
        secondaryKeywords: ["novos premios saude suica 2026", "poupar seguro saude suica"]
      }
    }
  },

  'lamal-vs-lca': {
    id: 'lamal-vs-lca',
    category: 'health',
    priority: 0.9,
    changefreq: 'monthly',
    lastModified: '2026-08-20',
    locales: {
      fr: {
        path: '/fr/lamal-vs-lca/',
        title: "LAMal vs LCA — Différence entre Assurance de Base et Complémentaire | Le Fennec Malin",
        description: "Comprendre la différence entre LAMal (obligatoire) et LCA (privée facultative) en Suisse. Questionnaire médical, exclusion de prestations et double affiliation.",
        h1: "LAMal vs LCA : Comprendre la Différence entre Base et Complémentaire en Suisse",
        breadcrumbLabel: "LAMal vs LCA",
        primaryKeyword: "LAMal vs LCA",
        secondaryKeywords: ["difference lamal lca", "assurance de base vs complementaire", "questionnaire medical lca"]
      },
      de: {
        path: '/de/kvg-vs-vvg/',
        title: "KVG vs. VVG — Unterschied zwischen Grund- & Zusatzversicherung | Le Fennec Malin",
        description: "Der Unterschied zwischen KVG (obligatorisch) und VVG (privat) in der Schweiz: Aufnahmezwang, Gesundheitsfragen, Kündigung und Doppelabdeckung.",
        h1: "KVG vs. VVG: Grundversicherung und Zusatzversicherung im Vergleich",
        breadcrumbLabel: "KVG vs VVG",
        primaryKeyword: "kvg vs vvg",
        secondaryKeywords: ["unterschied grundversicherung zusatzversicherung", "gesundheitspruefung vvg"]
      },
      it: {
        path: '/it/lamal-vs-lca/',
        title: "LAMal vs LCA — Differenza tra Assicurazione Base e Complementare | Le Fennec Malin",
        description: "Differenze tra LAMal (obbligatoria) e LCA (facoltativa) in Svizzera: questionario medico, riserve e possibilità di separare le polizze.",
        h1: "LAMal vs LCA: Differenza tra Assicurazione di Base e Complementare",
        breadcrumbLabel: "LAMal vs LCA",
        primaryKeyword: "lamal vs lca",
        secondaryKeywords: ["differenza lamal lca", "assicurazione complementare svizzera"]
      },
      en: {
        path: '/en/lamal-vs-vvg/',
        title: "LAMal vs LCA (VVG) — Basic vs Supplementary Swiss Insurance | Le Fennec Malin",
        description: "Key differences between mandatory LAMal and private LCA/VVG insurance in Switzerland: medical questionnaires, exclusion clauses, and insurer splitting.",
        h1: "LAMal vs LCA: Basic vs Supplementary Health Insurance in Switzerland",
        breadcrumbLabel: "LAMal vs LCA",
        primaryKeyword: "lamal vs lca switzerland",
        secondaryKeywords: ["basic vs supplementary health insurance", "swiss medical questionnaire"]
      }
    }
  },

  'lamal-assurance-accident': {
    id: 'lamal-assurance-accident',
    category: 'health',
    priority: 0.85,
    changefreq: 'monthly',
    lastModified: '2026-08-20',
    locales: {
      fr: {
        path: '/fr/lamal/assurance-accident/',
        title: "Assurance Accident LAMal — Avec ou Sans Accident ? Règle des 8h LAA | Le Fennec Malin",
        description: "Faut-il inclure la couverture accident dans son assurance maladie ? Règle des 8h/semaine LAA employeur, économie de 7% sur la prime et cas des sans-emploi.",
        h1: "Assurance Accident LAMal : Faut-il l'Inclure dans sa Caisse Maladie ?",
        breadcrumbLabel: "Couverture Accident",
        primaryKeyword: "assurance accident LAMal",
        secondaryKeywords: ["avec ou sans accident lamal", "regle 8 heures laa", "economiser prime accident"]
      },
      de: {
        path: '/de/kvg/unfalldeckung/',
        title: "Unfalldeckung Krankenkasse — Mit oder ohne Unfall versichern? (8h-Regel) | Le Fennec Malin",
        description: "Unfalldeckung in der Grundversicherung ein- oder ausschliessen? UVG-Arbeitgeberdeckung ab 8 Stunden pro Woche, Ersparnis von ca. 7% der Prämie.",
        h1: "Unfalldeckung in der Krankenkasse: Mit oder ohne Unfall versichern?",
        breadcrumbLabel: "Unfalldeckung",
        primaryKeyword: "unfalldeckung krankenkasse",
        secondaryKeywords: ["unfall ein oder ausschluss", "uvg 8 stunden regel", "praemie sparen ohne unfall"]
      },
      it: {
        path: '/it/lamal/copertura-infortuni/',
        title: "Copertura Infortuni Cassa Malati — Con o Senza Infortuni? Regola 8h | Le Fennec Malin",
        description: "Includere o escludere la copertura infortuni nella cassa malati? Regola delle 8 ore settimanali LAINF col datore di lavoro e risparmio sul premio.",
        h1: "Copertura Infortuni nella Cassa Malati: Con o Senza?",
        breadcrumbLabel: "Copertura Infortuni",
        primaryKeyword: "copertura infortuni cassa malati",
        secondaryKeywords: ["con o senza infortunio cassa malati", "regola 8 ore lainf"]
      },
      en: {
        path: '/en/lamal/accident-coverage/',
        title: "Accident Coverage Swiss Health Insurance — With or Without Accident (8h Rule) | Le Fennec Malin",
        description: "Should you include accident coverage in your Swiss health insurance? Employer UVG/LAA 8h/week rule, saving ~7% on premiums, and non-employed cases.",
        h1: "Accident Coverage in Swiss Health Insurance: With or Without?",
        breadcrumbLabel: "Accident Coverage",
        primaryKeyword: "swiss health insurance accident coverage",
        secondaryKeywords: ["with or without accident insurance", "8 hours uvg rule switzerland"]
      }
    }
  },

  'seo-pilier': {
    id: 'seo-pilier',
    category: 'pension',
    priority: 0.9,
    changefreq: 'weekly',
    lastModified: '2026-08-19',
    locales: {
      fr: {
        path: '/fr/3eme-pilier/',
        title: "3ème Pilier Suisse 2026 — Guide 3a & 3b, Fiscalité & Rendement | Le Fennec Malin",
        description: "Tout comprendre sur le 3ème pilier en Suisse : plafond 2026 de CHF 7'258, déduction fiscale, 3a bancaire vs 3a assurance, retraits et placements en fonds.",
        h1: "3ème Pilier Suisse (3a & 3b) — Guide & Comparatif Prévoyance 2026",
        breadcrumbLabel: "3ème Pilier",
        primaryKeyword: "3eme pilier suisse",
        secondaryKeywords: ["pilier 3a suisse", "plafond 3a 2026", "deduction fiscale 3eme pilier", "3eme pilier bancaire vs assurance"]
      },
      de: {
        path: '/de/3-saeule/',
        title: "3. Säule Schweiz 2026 — Säule 3a & 3b, Steuern & Rendite | Le Fennec Malin",
        description: "Alles über die 3. Säule in der Schweiz: Maximalbetrag 2026 (CHF 7'258), Steuern sparen, Bank vs. Versicherung, Vorsorgefonds und Auszahlung.",
        h1: "3. Säule Schweiz (Säule 3a & 3b) — Vorsorge-Vergleich & Ratgeber 2026",
        breadcrumbLabel: "3. Säule",
        primaryKeyword: "3 saeule schweiz",
        secondaryKeywords: ["saeule 3a maximalbetrag 2026", "steuern sparen 3 saeule", "saeule 3a bank vs versicherung", "saeule 3a vergleich"]
      },
      it: {
        path: '/it/terzo-pilastro/',
        title: "3° Pilastro Svizzera 2026 — Pilastro 3a & 3b, Fisco & Rendimento | Le Fennec Malin",
        description: "Guida completa al 3° pilastro in Svizzera: tetto massimo 2026 di CHF 7'258, risparmio fiscale, banca vs assicurazione, prelievo e fondi di previdenza.",
        h1: "Terzo Pilastro Svizzera (3a & 3b) — Guida & Confronto Previdenza 2026",
        breadcrumbLabel: "3° Pilastro",
        primaryKeyword: "terzo pilastro svizzera",
        secondaryKeywords: ["pilastro 3a massimale 2026", "deduzione fiscale 3 pilastro", "pilastro 3a banca o assicurazione", "previdenza svizzera 3a"]
      },
      en: {
        path: '/en/3rd-pillar/',
        title: "Swiss 3rd Pillar Pension 2026 — Pillar 3a & 3b Guide, Taxes & Returns | Le Fennec Malin",
        description: "Complete guide to the Swiss 3rd pillar: 2026 maximum limit CHF 7,258, tax deductions, bank vs. insurance 3a, fund investments, and retirement planning.",
        h1: "Swiss 3rd Pillar Pension (3a & 3b) — 2026 Guide & Comparison",
        breadcrumbLabel: "3rd Pillar",
        primaryKeyword: "3rd pillar switzerland",
        secondaryKeywords: ["pillar 3a maximum 2026", "swiss tax savings 3rd pillar", "3a bank vs insurance switzerland", "swiss pension pillar 3"]
      }
    }
  },

  'life-comparator': {
    id: 'life-comparator',
    category: 'pension',
    priority: 0.85,
    changefreq: 'weekly',
    lastModified: '2026-08-19',
    locales: {
      fr: {
        path: '/fr/3eme-pilier/comparateur/',
        title: "Comparateur 3ème Pilier & Assurance-Vie Suisse 2026 | Le Fennec Malin",
        description: "Comparez les meilleures solutions de 3ème pilier et d'assurance-vie en Suisse. Économies d'impôts jusqu'à CHF 2'500/an, capital garanti ou fonds en actions.",
        h1: "Comparateur 3ème pilier et prévoyance vieillesse Suisse",
        breadcrumbLabel: "Comparateur 3a",
        primaryKeyword: "comparateur 3eme pilier suisse",
        secondaryKeywords: ["comparatif pilier 3a", "assurance vie 3a suisse", "meilleur 3eme pilier 2026"]
      },
      de: {
        path: '/de/3-saeule/vergleich/',
        title: "Säule 3a & Lebensversicherung Vergleich Schweiz 2026 | Le Fennec Malin",
        description: "Vergleichen Sie die besten Säule 3a- und Lebensversicherungslösungen der Schweiz. Steuern sparen, garantierte Renditen oder ETF-Vorsorge.",
        h1: "Säule 3a & Lebensversicherung Vergleich Schweiz",
        breadcrumbLabel: "Säule 3a Vergleich",
        primaryKeyword: "saeule 3a vergleich schweiz",
        secondaryKeywords: ["lebensversicherung vergleich schweiz", "beste saeule 3a 2026", "vorsorge vergleich"]
      },
      it: {
        path: '/it/terzo-pilastro/confronto/',
        title: "Confronto Pilastro 3a & Assicurazione Vita Svizzera 2026 | Le Fennec Malin",
        description: "Confronta le migliori soluzioni di pilastro 3a e assicurazione vita in Svizzera. Risparmio fiscale fino a CHF 2'500 all'anno e rendimenti garantiti.",
        h1: "Confronto Terzo Pilastro e Assicurazione Vita Svizzera",
        breadcrumbLabel: "Confronto 3a",
        primaryKeyword: "confronto pilastro 3a",
        secondaryKeywords: ["assicurazione vita svizzera", "miglior terzo pilastro 2026", "previdenza privata 3a"]
      },
      en: {
        path: '/en/3rd-pillar/comparison/',
        title: "Pillar 3a & Life Insurance Comparison Switzerland 2026 | Le Fennec Malin",
        description: "Compare the best Swiss Pillar 3a and life insurance options. Maximize tax deductions, choose guaranteed capital or equity investment funds.",
        h1: "Swiss Pillar 3a & Life Pension Comparison",
        breadcrumbLabel: "Pillar 3a Comparison",
        primaryKeyword: "pillar 3a comparison switzerland",
        secondaryKeywords: ["swiss life insurance comparison", "best pillar 3a 2026", "swiss pension comparator"]
      }
    }
  },

  // Cantons (Generated helper functions map all 26 Swiss cantons dynamically)
  ...generateAllCantonRoutes(),

  // Insurers Profiles
  ...generateAllInsurerRoutes(),

  // Insurer Comparisons
  ...generateAllComparisonRoutes(),

  // Guides
  ...generateAllGuideRoutes(),

  // Tools & Interactive Calculators
  ...generateAllToolRoutes(),

  // Insurance Categories
  ...generateAllCategoryRoutes(),

  // Trust & Regulatory Pages
  'about': {
    id: 'about',
    category: 'trust',
    priority: 0.7,
    changefreq: 'monthly',
    locales: {
      fr: { path: '/fr/a-propos/', title: "À Propos de Le Fennec Malin — Notre Mission & Équipe", description: "Découvrez l'histoire de Le Fennec Malin, courtier et comparateur suisse indépendant.", h1: "À Propos de Le Fennec Malin", breadcrumbLabel: "À Propos", primaryKeyword: "a propos fennec malin", secondaryKeywords: [] },
      de: { path: '/de/ueber-uns/', title: "Über Le Fennec Malin — Unsere Mission & Team", description: "Erfahren Sie mehr über Le Fennec Malin, Ihren unabhängigen Schweizer Vergleichsdienst.", h1: "Über Le Fennec Malin", breadcrumbLabel: "Über uns", primaryKeyword: "ueber fennec malin", secondaryKeywords: [] },
      it: { path: '/it/chi-siamo/', title: "Chi Siamo — La Missione di Le Fennec Malin", description: "Scopri Le Fennec Malin, il portale svizzero neutrale per il confronto assicurativo.", h1: "Chi Siamo", breadcrumbLabel: "Chi siamo", primaryKeyword: "chi siamo fennec malin", secondaryKeywords: [] },
      en: { path: '/en/about-us/', title: "About Le Fennec Malin — Independent Swiss Broker", description: "Learn about Le Fennec Malin, your 100% neutral Swiss insurance comparison portal.", h1: "About Le Fennec Malin", breadcrumbLabel: "About us", primaryKeyword: "about fennec malin", secondaryKeywords: [] }
    }
  },
  'faq': {
    id: 'faq',
    category: 'trust',
    priority: 0.75,
    changefreq: 'monthly',
    locales: {
      fr: { path: '/fr/faq/', title: "FAQ Assurance & Prévoyance Suisse | Le Fennec Malin", description: "Réponses d'experts à toutes vos questions sur les assurances en Suisse.", h1: "Foire Aux Questions", breadcrumbLabel: "FAQ", primaryKeyword: "faq assurance suisse", secondaryKeywords: [] },
      de: { path: '/de/faq/', title: "FAQ Versicherungen Schweiz | Le Fennec Malin", description: "Expertenantworten auf alle Fragen rund um Schweizer Versicherungen.", h1: "Häufig gestellte Fragen (FAQ)", breadcrumbLabel: "FAQ", primaryKeyword: "faq versicherungen schweiz", secondaryKeywords: [] },
      it: { path: '/it/faq/', title: "Domande Frequenti (FAQ) | Le Fennec Malin", description: "Tutte le risposte sui contratti assicurativi e casse malati in Svizzera.", h1: "Domande Frequenti (FAQ)", breadcrumbLabel: "FAQ", primaryKeyword: "faq assicurazioni svizzera", secondaryKeywords: [] },
      en: { path: '/en/faq/', title: "Frequently Asked Questions | Le Fennec Malin", description: "Expert answers to all your questions about Swiss insurance.", h1: "Frequently Asked Questions", breadcrumbLabel: "FAQ", primaryKeyword: "swiss insurance faq", secondaryKeywords: [] }
    }
  },
  'methodologie': {
    id: 'methodologie',
    category: 'trust',
    priority: 0.75,
    changefreq: 'monthly',
    locales: {
      fr: { path: '/fr/methodologie/', title: "Méthodologie & Sources Officielles de Calcul | Le Fennec Malin", description: "Découvrez notre méthodologie de calcul certifiée OFSP/Priminfo.", h1: "Méthodologie & Sources Officielles", breadcrumbLabel: "Méthodologie", primaryKeyword: "methodologie calcul primes suisse", secondaryKeywords: [] },
      de: { path: '/de/methodik/', title: "Berechnungsmethodik & Offizielle Quellen | Le Fennec Malin", description: "Unsere transparente Berechnungsmethodik basierend auf BAG-Daten.", h1: "Berechnungsmethodik & Datenquellen", breadcrumbLabel: "Methodik", primaryKeyword: "berechnungsmethodik bag praemien", secondaryKeywords: [] },
      it: { path: '/it/metodologia/', title: "Metodologia & Fonti Ufficiali | Le Fennec Malin", description: "La nostra metodologia di calcolo certificata UFSP / Priminfo.", h1: "Metodologia & Fonti Ufficiali", breadcrumbLabel: "Metodologia", primaryKeyword: "metodologia calcolo premi", secondaryKeywords: [] },
      en: { path: '/en/methodology/', title: "Calculation Methodology & Sources | Le Fennec Malin", description: "Our certified calculation methodology based on official FOPH datasets.", h1: "Calculation Methodology & Official Sources", breadcrumbLabel: "Methodology", primaryKeyword: "swiss insurance methodology", secondaryKeywords: [] }
    }
  },
  'comment-fonctionne-le-comparateur': {
    id: 'comment-fonctionne-le-comparateur',
    category: 'trust',
    priority: 0.75,
    changefreq: 'monthly',
    locales: {
      fr: { path: '/fr/comment-fonctionne-le-comparateur/', title: "Comment Fonctionne Notre Comparateur ? | Le Fennec Malin", description: "Guide étape par étape sur l'utilisation du comparateur d'assurances.", h1: "Comment fonctionne le comparateur ?", breadcrumbLabel: "Fonctionnement", primaryKeyword: "fonctionnement comparateur suisse", secondaryKeywords: [] },
      de: { path: '/de/wie-funktioniert-der-vergleich/', title: "Wie funktioniert der Vergleichsrechner? | Le Fennec Malin", description: "Schritt-für-Schritt-Anleitung für den Schweizer Versicherungsvergleich.", h1: "Wie funktioniert der Vergleich?", breadcrumbLabel: "Funktionsweise", primaryKeyword: "wie funktioniert versicherungsvergleich", secondaryKeywords: [] },
      it: { path: '/it/come-funziona-il-confronto/', title: "Come Funziona il Nostro Comparatore? | Le Fennec Malin", description: "Guida passo dopo passo all'uso del calcolatore assicurativo.", h1: "Come funziona il confronto?", breadcrumbLabel: "Funzionamento", primaryKeyword: "come funziona comparatore", secondaryKeywords: [] },
      en: { path: '/en/how-the-comparator-works/', title: "How Does the Comparison Engine Work? | Le Fennec Malin", description: "Step-by-step guide on how our Swiss insurance comparator works.", h1: "How Does the Comparator Work?", breadcrumbLabel: "How it works", primaryKeyword: "how swiss comparator works", secondaryKeywords: [] }
    }
  },
  'sources': {
    id: 'sources',
    category: 'trust',
    priority: 0.75,
    changefreq: 'monthly',
    lastModified: '2026-08-20',
    locales: {
      fr: { path: '/fr/sources-officielles/', title: "Sources Officielles & Jeux de Données (OFSP, FINMA, Fedlex) | Le Fennec Malin", description: "Consultez l'ensemble des sources officielles et bases réglementaires utilisées par Le Fennec Malin : OFSP, Priminfo, FINMA, Fedlex, OFS.", h1: "Sources Officielles & Références Réglementaires", breadcrumbLabel: "Sources", primaryKeyword: "sources officielles assurance suisse", secondaryKeywords: ["donnees ofsp priminfo", "references finma lsa", "fedlex lamal"] },
      de: { path: '/de/offizielle-quellen/', title: "Offizielle Quellen & Datensätze (BAG, FINMA, Fedlex) | Le Fennec Malin", description: "Übersicht aller offiziellen Datenquellen und gesetzlichen Grundlagen von Le Fennec Malin : BAG, Priminfo, FINMA, Fedlex, BFS.", h1: "Offizielle Quellen & Datenbasis", breadcrumbLabel: "Quellen", primaryKeyword: "offizielle quellen krankenkasse schweiz", secondaryKeywords: ["bag priminfo daten", "finma aufsicht", "fedlex kvg"] },
      it: { path: '/it/fonti-ufficiali/', title: "Fonti Ufficiali & Banche Dati (UFSP, FINMA, Fedlex) | Le Fennec Malin", description: "Elenco completo delle fonti ufficiali utilizzate da Le Fennec Malin: UFSP, Priminfo, FINMA, Fedlex e UST.", h1: "Fonti Ufficiali & Riferimenti Normativi", breadcrumbLabel: "Fonti", primaryKeyword: "fonti ufficiali cassa malati svizzera", secondaryKeywords: ["dati ufsp priminfo", "finma lsa", "fedlex lamal"] },
      en: { path: '/en/official-sources/', title: "Official Data Sources & References (FOPH, FINMA, Fedlex) | Le Fennec Malin", description: "Explore all official government and regulatory data sources used by Le Fennec Malin: FOPH, Priminfo, FINMA, Fedlex, and FSO.", h1: "Official Data Sources & Regulatory Framework", breadcrumbLabel: "Official Sources", primaryKeyword: "official swiss insurance sources", secondaryKeywords: ["foph open data", "finma regulation", "fedlex swiss law"] }
    }
  },
  'observatoire': {
    id: 'observatoire',
    category: 'trust',
    priority: 0.9,
    changefreq: 'weekly',
    lastModified: '2026-08-20',
    locales: {
      fr: { path: '/fr/observatoire/', title: "Observatoire des Primes & Recherche Santé Suisse 2026 | Le Fennec Malin", description: "Études statistiques originales, séries chronologiques 2016-2026 et jeux de données ouverts sur l'assurance maladie suisse (OFSP, OFS, Priminfo).", h1: "Observatoire des Primes & Données de Recherche Santé 2026", breadcrumbLabel: "Observatoire & Données", primaryKeyword: "observatoire primes suisse", secondaryKeywords: ["statistiques lamal ofsp", "recherche sante suisse", "donnees ouvertes primes maladie"] },
      de: { path: '/de/praemien-observatorium/', title: "Prämien-Observatorium & Gesundheitsdaten Schweiz 2026 | Le Fennec Malin", description: "Originale statistische Studien, Zeitreihen 2016-2026 und offene Datensätze zur Schweizer Krankenversicherung (BAG, BFS, Priminfo).", h1: "Prämien-Observatorium & Forschungsdaten 2026", breadcrumbLabel: "Observatorium", primaryKeyword: "praemien observatorium schweiz", secondaryKeywords: ["bag krankenkassen statistik", "gesundheitsdaten schweiz open data"] },
      it: { path: '/it/osservatorio-premi/', title: "Osservatorio Premi & Ricerca Sanitaria Svizzera 2026 | Le Fennec Malin", description: "Studi statistici originali, serie storiche 2016-2026 e open data sull'assicurazione malattia svizzera (UFSP, UST, Priminfo).", h1: "Osservatorio Premi & Dati di Ricerca 2026", breadcrumbLabel: "Osservatorio", primaryKeyword: "osservatorio premi svizzera", secondaryKeywords: ["statistiche lamal ufsp", "ricerca cassa malati svizzera"] },
      en: { path: '/en/insurance-observatory/', title: "Swiss Health Premium Observatory & Research Data 2026 | Le Fennec Malin", description: "Original research studies, historical time-series 2016-2026, and open datasets on Swiss health insurance (FOPH, FSO, Priminfo).", h1: "Swiss Health Premium Observatory & Research Data 2026", breadcrumbLabel: "Observatory", primaryKeyword: "swiss health insurance observatory", secondaryKeywords: ["foph premium statistics", "swiss healthcare research open data"] }
    }
  },
  'article-45-lsa': {
    id: 'article-45-lsa',
    category: 'legal',
    priority: 0.5,
    changefreq: 'yearly',
    locales: {
      fr: { path: '/fr/article-45-lsa/', title: "Informations Réglementaires Article 45 LSA | Le Fennec Malin", description: "Devoir d'information légal selon la Loi sur la surveillance des assurances.", h1: "Article 45 LSA — Information Légale", breadcrumbLabel: "Art. 45 LSA", primaryKeyword: "article 45 lsa suisse", secondaryKeywords: [] },
      de: { path: '/de/artikel-45-vag/', title: "Gesetzliche Informationspflicht Art. 45 VAG | Le Fennec Malin", description: "Gesetzliche Pflichtinformationen gemäss Schweizer Versicherungsaufsichtsgesetz.", h1: "Artikel 45 VAG — Information", breadcrumbLabel: "Art. 45 VAG", primaryKeyword: "artikel 45 vag schweiz", secondaryKeywords: [] },
      it: { path: '/it/articolo-45-lsa/', title: "Informativa Legale Articolo 45 LSA | Le Fennec Malin", description: "Dovere di informazione legale secondo la Legge sulla sorveglianza degli assicuratori.", h1: "Articolo 45 LSA — Informativa", breadcrumbLabel: "Art. 45 LSA", primaryKeyword: "articolo 45 lsa", secondaryKeywords: [] },
      en: { path: '/en/article-45-isa/', title: "Regulatory Disclosure Article 45 ISA | Le Fennec Malin", description: "Legal disclosure under the Swiss Insurance Supervision Act.", h1: "Article 45 ISA — Regulatory Disclosure", breadcrumbLabel: "Art. 45 ISA", primaryKeyword: "article 45 isa swiss", secondaryKeywords: [] }
    }
  },
  'qualifications-intermediaire': {
    id: 'qualifications-intermediaire',
    category: 'legal',
    priority: 0.5,
    changefreq: 'yearly',
    locales: {
      fr: { path: '/fr/qualifications-intermediaire/', title: "Qualifications et Registre FINMA | Le Fennec Malin", description: "Certifications professionnelles et agréments de courtage en Suisse.", h1: "Qualifications de l'Intermédiaire", breadcrumbLabel: "Qualifications FINMA", primaryKeyword: "registre finma intermediaire", secondaryKeywords: [] },
      de: { path: '/de/vermittlerqualifikationen/', title: "Vermittlerqualifikationen & FINMA-Register | Le Fennec Malin", description: "Berufliche Qualifikationen und FINMA-Registrierung in der Schweiz.", h1: "Vermittlerqualifikationen", breadcrumbLabel: "FINMA-Register", primaryKeyword: "finma vermittlerregister", secondaryKeywords: [] },
      it: { path: '/it/qualifiche-intermediario/', title: "Qualifiche dell'Intermediario & FINMA | Le Fennec Malin", description: "Certificazioni professionali e registrazione FINMA in Svizzera.", h1: "Qualifiche dell'Intermediario", breadcrumbLabel: "Registro FINMA", primaryKeyword: "registro finma intermediari", secondaryKeywords: [] },
      en: { path: '/en/broker-qualifications/', title: "Broker Qualifications & FINMA Registry | Le Fennec Malin", description: "Professional credentials, broker certifications and FINMA compliance.", h1: "Broker Qualifications", breadcrumbLabel: "FINMA Qualifications", primaryKeyword: "swiss broker qualifications", secondaryKeywords: [] }
    }
  },
  'legal': {
    id: 'legal',
    category: 'legal',
    priority: 0.4,
    changefreq: 'yearly',
    locales: {
      fr: { path: '/fr/mentions-legales/', title: "Mentions Légales | Le Fennec Malin", description: "Informations légales et éditeur du site Le Fennec Malin.", h1: "Mentions Légales", breadcrumbLabel: "Mentions Légales", primaryKeyword: "mentions legales", secondaryKeywords: [] },
      de: { path: '/de/impressum/', title: "Impressum | Le Fennec Malin", description: "Rechtliche Hinweise und Angaben zum Betreiber von Le Fennec Malin.", h1: "Impressum", breadcrumbLabel: "Impressum", primaryKeyword: "impressum", secondaryKeywords: [] },
      it: { path: '/it/note-legali/', title: "Note Legali & Impressum | Le Fennec Malin", description: "Informazioni legali ed editore del sito Le Fennec Malin.", h1: "Note Legali", breadcrumbLabel: "Note Legali", primaryKeyword: "note legali", secondaryKeywords: [] },
      en: { path: '/en/legal-notice/', title: "Legal Notice & Impressum | Le Fennec Malin", description: "Legal information and publisher details for Le Fennec Malin.", h1: "Legal Notice", breadcrumbLabel: "Legal Notice", primaryKeyword: "legal notice", secondaryKeywords: [] }
    }
  },
  'privacy': {
    id: 'privacy',
    category: 'legal',
    priority: 0.4,
    changefreq: 'yearly',
    locales: {
      fr: { path: '/fr/confidentialite/', title: "Politique de Confidentialité (nLPD) | Le Fennec Malin", description: "Protection des données personnelles conforme à la loi suisse nLPD et au RGPD.", h1: "Politique de Confidentialité", breadcrumbLabel: "Confidentialité", primaryKeyword: "protection donnees nlpd", secondaryKeywords: [] },
      de: { path: '/de/datenschutz/', title: "Datenschutzerklärung (revDSG) | Le Fennec Malin", description: "Schutz Ihrer persönlichen Daten gemäss Schweizer Datenschutzgesetz (revDSG).", h1: "Datenschutzerklärung", breadcrumbLabel: "Datenschutz", primaryKeyword: "datenschutz revdsg", secondaryKeywords: [] },
      it: { path: '/it/protezione-dati/', title: "Informativa sulla Privacy (nLPD) | Le Fennec Malin", description: "Protezione dei dati personali secondo la nuova legge svizzera nLPD.", h1: "Informativa sulla Privacy", breadcrumbLabel: "Privacy", primaryKeyword: "privacy nlpd", secondaryKeywords: [] },
      en: { path: '/en/privacy-policy/', title: "Privacy Policy (FADP / GDPR) | Le Fennec Malin", description: "Personal data protection in compliance with the Swiss FADP and European GDPR.", h1: "Privacy Policy", breadcrumbLabel: "Privacy", primaryKeyword: "swiss privacy fadp", secondaryKeywords: [] }
    }
  }
} as unknown as Record<AppTab, MultilingualRouteConfig>);

/**
 * Generates all 26 Swiss canton route configurations
 */
function generateAllCantonRoutes(): Record<string, MultilingualRouteConfig> {
  const cantonConfigs: Record<string, MultilingualRouteConfig> = {};

  const cantonSlugTranslations: Record<string, { de: string; it: string; en: string; deName: string; itName: string; enName: string }> = {
    geneve: { de: 'genf', it: 'ginevra', en: 'geneva', deName: 'Genf', itName: 'Ginevra', enName: 'Geneva' },
    vaud: { de: 'waadt', it: 'vaud', en: 'vaud', deName: 'Waadt', itName: 'Vaud', enName: 'Vaud' },
    valais: { de: 'wallis', it: 'vallese', en: 'valais', deName: 'Wallis', itName: 'Vallese', enName: 'Valais' },
    fribourg: { de: 'freiburg', it: 'friburgo', en: 'fribourg', deName: 'Freiburg', itName: 'Friburgo', enName: 'Fribourg' },
    neuchatel: { de: 'neuenburg', it: 'neuchatel', en: 'neuchatel', deName: 'Neuenburg', itName: 'Neuchâtel', enName: 'Neuchâtel' },
    jura: { de: 'jura', it: 'giura', en: 'jura', deName: 'Jura', itName: 'Giura', enName: 'Jura' },
    berne: { de: 'bern', it: 'berna', en: 'bern', deName: 'Bern', itName: 'Berna', enName: 'Bern' },
    zurich: { de: 'zuerich', it: 'zurigo', en: 'zurich', deName: 'Zürich', itName: 'Zurigo', enName: 'Zurich' },
    'bale-ville': { de: 'basel-stadt', it: 'basilea-citta', en: 'basel-city', deName: 'Basel-Stadt', itName: 'Basilea Città', enName: 'Basel-City' },
    'bale-campagne': { de: 'basel-landschaft', it: 'basilea-campagna', en: 'basel-countryside', deName: 'Basel-Landschaft', itName: 'Basilea Campagna', enName: 'Basel-Landschaft' },
    argovie: { de: 'aargau', it: 'argovia', en: 'aargau', deName: 'Aargau', itName: 'Argovia', enName: 'Aargau' },
    tessin: { de: 'tessin', it: 'ticino', en: 'ticino', deName: 'Tessin', itName: 'Ticino', enName: 'Ticino' },
    'saint-gall': { de: 'st-gallen', it: 'san-gallo', en: 'st-gallen', deName: 'St. Gallen', itName: 'San Gallo', enName: 'St. Gallen' },
    thurgovie: { de: 'thurgau', it: 'turgovia', en: 'thurgau', deName: 'Thurgau', itName: 'Turgovia', enName: 'Thurgau' },
    lucerne: { de: 'luzern', it: 'lucerna', en: 'lucerne', deName: 'Luzern', itName: 'Lucerna', enName: 'Lucerne' },
    zoug: { de: 'zug', it: 'zugo', en: 'zug', deName: 'Zug', itName: 'Zugo', enName: 'Zug' },
    soleure: { de: 'solothurn', it: 'soletta', en: 'solothurn', deName: 'Solothurn', itName: 'Soletta', enName: 'Solothurn' },
    schaffhouse: { de: 'schaffhausen', it: 'sciaffusa', en: 'schaffhausen', deName: 'Schaffhausen', itName: 'Sciaffusa', enName: 'Schaffhausen' },
    'appenzell-ar': { de: 'appenzell-ausserrhoden', it: 'appenzello-esterno', en: 'appenzell-ausserrhoden', deName: 'Appenzell Ausserrhoden', itName: 'Appenzello Esterno', enName: 'Appenzell Ausserrhoden' },
    'appenzell-rhodes-exterieures': { de: 'appenzell-ausserrhoden', it: 'appenzello-esterno', en: 'appenzell-ausserrhoden', deName: 'Appenzell Ausserrhoden', itName: 'Appenzello Esterno', enName: 'Appenzell Ausserrhoden' },
    'appenzell-ai': { de: 'appenzell-innerrhoden', it: 'appenzello-interno', en: 'appenzell-innerrhoden', deName: 'Appenzell Innerrhoden', itName: 'Appenzello Interno', enName: 'Appenzell Innerrhoden' },
    'appenzell-rhodes-interieures': { de: 'appenzell-innerrhoden', it: 'appenzello-interno', en: 'appenzell-innerrhoden', deName: 'Appenzell Innerrhoden', itName: 'Appenzello Interno', enName: 'Appenzell Innerrhoden' },
    grisons: { de: 'graubuenden', it: 'grigioni', en: 'graubuenden', deName: 'Graubünden', itName: 'Grigioni', enName: 'Grisons' },
    glaris: { de: 'glarus', it: 'glarona', en: 'glarus', deName: 'Glarus', itName: 'Glarona', enName: 'Glarus' },
    nidwald: { de: 'nidwalden', it: 'nidvaldo', en: 'nidwalden', deName: 'Nidwalden', itName: 'Nidvaldo', enName: 'Nidwalden' },
    obwald: { de: 'obwalden', it: 'obvaldo', en: 'obwalden', deName: 'Obwalden', itName: 'Obvaldo', enName: 'Obwalden' },
    uri: { de: 'uri', it: 'uri', en: 'uri', deName: 'Uri', itName: 'Uri', enName: 'Uri' },
    schwyz: { de: 'schwyz', it: 'svitto', en: 'schwyz', deName: 'Schwyz', itName: 'Svitto', enName: 'Schwyz' },
  };

  for (const cantonInfo of ALL_26_CANTONS) {
    const slug = cantonInfo.slug;
    const data = CANTONS_SEO_DATA[slug];
    if (!data) continue;
    const tabKey = `canton-${slug}` as AppTab;
    const trans = cantonSlugTranslations[slug] || { de: slug, it: slug, en: slug, deName: data.name, itName: data.name, enName: data.name };

    cantonConfigs[tabKey] = {
      id: tabKey,
      category: 'canton',
      priority: 0.85,
      changefreq: 'monthly',
      locales: {
        fr: {
          path: `/fr/assurance-maladie/${slug}/`,
          title: `Assurance Maladie ${data.name} (${data.code}) 2026 — Comparatif & Devis | Le Fennec Malin`,
          description: data.metaDescription,
          h1: `Assurance maladie dans le canton de ${data.name} (${data.code})`,
          breadcrumbLabel: `${data.name} (${data.code})`,
          primaryKeyword: `assurance maladie ${data.name.toLowerCase()}`,
          secondaryKeywords: [`caisse maladie ${data.name.toLowerCase()}`, `primes ${data.code.toLowerCase()} 2026`, `subside ${data.name.toLowerCase()}`]
        },
        de: {
          path: `/de/krankenkasse/${trans.de}/`,
          title: `Krankenkasse ${trans.deName} (${data.code}) 2026 — Prämienvergleich & Rechner`,
          description: `Offizieller Krankenkassenvergleich 2026 für den Kanton ${trans.deName} (${data.code}). BAG-Prämien, IPV-Prämienverbilligung und Wechseltipps.`,
          h1: `Krankenkassen im Kanton ${trans.deName} (${data.code})`,
          breadcrumbLabel: `${trans.deName} (${data.code})`,
          primaryKeyword: `krankenkasse ${trans.deName.toLowerCase()}`,
          secondaryKeywords: [`krankenkassenpraemien ${data.code.toLowerCase()} 2026`, `praemienverbilligung ${trans.deName.toLowerCase()}`]
        },
        it: {
          path: `/it/cassa-malati/${trans.it}/`,
          title: `Cassa Malati ${trans.itName} (${data.code}) 2026 — Confronto Premi UFSP`,
          description: `Confronto ufficiale 2026 dei premi cassa malati nel Cantone ${trans.itName} (${data.code}). Sussidi, franchigie e calcolatore gratuito.`,
          h1: `Cassa malati nel Cantone ${trans.itName} (${data.code})`,
          breadcrumbLabel: `${trans.itName} (${data.code})`,
          primaryKeyword: `cassa malati ${trans.itName.toLowerCase()}`,
          secondaryKeywords: [`premi ${data.code.toLowerCase()} 2026`, `sussidi cassa malati ${trans.itName.toLowerCase()}`]
        },
        en: {
          path: `/en/health-insurance/${trans.en}/`,
          title: `Health Insurance ${trans.enName} (${data.code}) 2026 — Official Rates & Comparison`,
          description: `Compare official 2026 health insurance premiums in the canton of ${trans.enName} (${data.code}). FOPH rates, subsidies and English guide.`,
          h1: `Health Insurance in Canton ${trans.enName} (${data.code})`,
          breadcrumbLabel: `${trans.enName} (${data.code})`,
          primaryKeyword: `health insurance ${trans.enName.toLowerCase()}`,
          secondaryKeywords: [`swiss health insurance ${data.code.toLowerCase()}`, `insurance premiums ${trans.enName.toLowerCase()}`]
        }
      }
    };
  }

  return cantonConfigs;
}

/**
 * Generates all 26 Swiss Canton Subsidy Routes & Subsidies Hub
 */
function generateAllSubsidiesRoutes(): Record<string, MultilingualRouteConfig> {
  const subsidyConfigs: Record<string, MultilingualRouteConfig> = {};

  const cantonSlugTranslations: Record<string, { de: string; it: string; en: string; deName: string; itName: string; enName: string }> = {
    geneve: { de: 'genf', it: 'ginevra', en: 'geneva', deName: 'Genf', itName: 'Ginevra', enName: 'Geneva' },
    vaud: { de: 'waadt', it: 'vaud', en: 'vaud', deName: 'Waadt', itName: 'Vaud', enName: 'Vaud' },
    valais: { de: 'wallis', it: 'vallese', en: 'valais', deName: 'Wallis', itName: 'Vallese', enName: 'Valais' },
    fribourg: { de: 'freiburg', it: 'friburgo', en: 'fribourg', deName: 'Freiburg', itName: 'Friburgo', enName: 'Fribourg' },
    neuchatel: { de: 'neuenburg', it: 'neuchatel', en: 'neuchatel', deName: 'Neuenburg', itName: 'Neuchâtel', enName: 'Neuchâtel' },
    jura: { de: 'jura', it: 'giura', en: 'jura', deName: 'Jura', itName: 'Giura', enName: 'Jura' },
    berne: { de: 'bern', it: 'berna', en: 'bern', deName: 'Bern', itName: 'Berna', enName: 'Bern' },
    zurich: { de: 'zuerich', it: 'zurigo', en: 'zurich', deName: 'Zürich', itName: 'Zurigo', enName: 'Zurich' },
    'bale-ville': { de: 'basel-stadt', it: 'basilea-citta', en: 'basel-city', deName: 'Basel-Stadt', itName: 'Basilea Città', enName: 'Basel-City' },
    'bale-campagne': { de: 'basel-landschaft', it: 'basilea-campagna', en: 'basel-countryside', deName: 'Basel-Landschaft', itName: 'Basilea Campagna', enName: 'Basel-Landschaft' },
    argovie: { de: 'aargau', it: 'argovia', en: 'aargau', deName: 'Aargau', itName: 'Argovia', enName: 'Aargau' },
    tessin: { de: 'tessin', it: 'ticino', en: 'ticino', deName: 'Tessin', itName: 'Ticino', enName: 'Ticino' },
    'saint-gall': { de: 'st-gallen', it: 'san-gallo', en: 'st-gallen', deName: 'St. Gallen', itName: 'San Gallo', enName: 'St. Gallen' },
    thurgovie: { de: 'thurgau', it: 'turgovia', en: 'thurgau', deName: 'Thurgau', itName: 'Turgovia', enName: 'Thurgau' },
    lucerne: { de: 'luzern', it: 'lucerna', en: 'lucerne', deName: 'Luzern', itName: 'Lucerna', enName: 'Lucerne' },
    zoug: { de: 'zug', it: 'zugo', en: 'zug', deName: 'Zug', itName: 'Zugo', enName: 'Zug' },
    soleure: { de: 'solothurn', it: 'soletta', en: 'solothurn', deName: 'Solothurn', itName: 'Soletta', enName: 'Solothurn' },
    schaffhouse: { de: 'schaffhausen', it: 'sciaffusa', en: 'schaffhausen', deName: 'Schaffhausen', itName: 'Sciaffusa', enName: 'Schaffhausen' },
    'appenzell-ar': { de: 'appenzell-ausserrhoden', it: 'appenzello-esterno', en: 'appenzell-ausserrhoden', deName: 'Appenzell Ausserrhoden', itName: 'Appenzello Esterno', enName: 'Appenzell Ausserrhoden' },
    'appenzell-rhodes-exterieures': { de: 'appenzell-ausserrhoden', it: 'appenzello-esterno', en: 'appenzell-ausserrhoden', deName: 'Appenzell Ausserrhoden', itName: 'Appenzello Esterno', enName: 'Appenzell Ausserrhoden' },
    'appenzell-ai': { de: 'appenzell-innerrhoden', it: 'appenzello-interno', en: 'appenzell-innerrhoden', deName: 'Appenzell Innerrhoden', itName: 'Appenzello Interno', enName: 'Appenzell Innerrhoden' },
    'appenzell-rhodes-interieures': { de: 'appenzell-innerrhoden', it: 'appenzello-interno', en: 'appenzell-innerrhoden', deName: 'Appenzell Innerrhoden', itName: 'Appenzello Interno', enName: 'Appenzell Innerrhoden' },
    grisons: { de: 'graubuenden', it: 'grigioni', en: 'graubuenden', deName: 'Graubünden', itName: 'Grigioni', enName: 'Grisons' },
    glaris: { de: 'glarus', it: 'glarona', en: 'glarus', deName: 'Glarus', itName: 'Glarona', enName: 'Glarus' },
    nidwald: { de: 'nidwalden', it: 'nidvaldo', en: 'nidwalden', deName: 'Nidwalden', itName: 'Nidvaldo', enName: 'Nidwalden' },
    obwald: { de: 'obwalden', it: 'obvaldo', en: 'obwalden', deName: 'Obwalden', itName: 'Obvaldo', enName: 'Obwalden' },
    uri: { de: 'uri', it: 'uri', en: 'uri', deName: 'Uri', itName: 'Uri', enName: 'Uri' },
    schwyz: { de: 'schwyz', it: 'svitto', en: 'schwyz', deName: 'Schwyz', itName: 'Svitto', enName: 'Schwyz' },
  };

  // Subsidies Hub
  subsidyConfigs['hub-subsides'] = {
    id: 'hub-subsides',
    category: 'subside',
    priority: 0.9,
    changefreq: 'monthly',
    locales: {
      fr: {
        path: '/fr/subsides/',
        title: "Subsides Assurance Maladie Suisse 2026 — Guide & Barèmes par Canton | Le Fennec Malin",
        description: "Guide complet de la réduction des primes d'assurance maladie (subsides LAMal / IPV) dans les 26 cantons suisses. Barèmes, plafonds de revenus, formulaires et délais officiels 2026.",
        h1: "Subsides d'Assurance Maladie en Suisse : Guide Officiel 2026 par Canton",
        breadcrumbLabel: "Subsides Suisse",
        primaryKeyword: "subsides assurance maladie suisse",
        secondaryKeywords: ["reduction primes lamal suisse", "subside caisse maladie 2026", "aide assurance maladie suisse"]
      },
      de: {
        path: '/de/praemienverbilligung/',
        title: "Prämienverbilligung Schweiz (IPV) 2026 — Alle 26 Kantone im Überblick",
        description: "Individuelle Prämienverbilligung (IPV) 2026 in allen Schweizer Kantonen: Einkommensgrenzen, Antragsfristen, Online-Rechner und offizielle Stellen.",
        h1: "Prämienverbilligung (IPV) in der Schweiz: Kantonale Richtlinien 2026",
        breadcrumbLabel: "Prämienverbilligung",
        primaryKeyword: "praemienverbilligung schweiz",
        secondaryKeywords: ["ipv kantone 2026", "krankenkassen praemienverbilligung antrag"]
      },
      it: {
        path: '/it/sussidi-cassa-malati/',
        title: "Sussidi Cassa Malati Svizzera (RIP) 2026 — Guida per tutti i 26 Cantoni",
        description: "Riduzione dei premi dell'assicurazione malattia (RIP) in Svizzera: limiti di reddito, scadenze, modelli di domanda e recapiti cantonali.",
        h1: "Riduzione dei Premi dell'Assicurazione Malattia (RIP) in Svizzera",
        breadcrumbLabel: "Sussidi Cassa Malati",
        primaryKeyword: "sussidi cassa malati svizzera",
        secondaryKeywords: ["riduzione premi cassa malati", "rip cantoni svizzera"]
      },
      en: {
        path: '/en/health-insurance-subsidies/',
        title: "Swiss Health Insurance Subsidies (IPV) 2026 — Guide to All 26 Cantons",
        description: "Complete guide to mandatory Swiss health insurance premium reductions (IPV) across all 26 cantons. Income limits, application deadlines, and official contacts.",
        h1: "Health Insurance Premium Reductions (IPV) in Switzerland: 2026 Guide",
        breadcrumbLabel: "Health Subsidies",
        primaryKeyword: "swiss health insurance subsidies",
        secondaryKeywords: ["ipv switzerland health premium reduction", "canton health subsidies"]
      }
    }
  };

  // 26 Cantonal Subsidy Pages
  for (const cantonInfo of ALL_26_CANTONS) {
    const slug = cantonInfo.slug;
    const data = CANTONS_SEO_DATA[slug];
    if (!data) continue;
    const tabKey = `subside-${slug}` as AppTab;
    const trans = cantonSlugTranslations[slug] || { de: slug, it: slug, en: slug, deName: data.name, itName: data.name, enName: data.name };
    const agencyName = (data as any).subsideAgency || 'Caisse de compensation cantonale';

    subsidyConfigs[tabKey] = {
      id: tabKey,
      category: 'subside',
      priority: 0.86,
      changefreq: 'monthly',
      locales: {
        fr: {
          path: `/fr/subsides/${slug}/`,
          title: `Subsides d'Assurance Maladie ${data.name} (${data.code}) 2026 — Barème, Demande & Délais`,
          description: `Guide officiel des subsides d'assurance maladie dans le canton de ${data.name} (${data.code}) en 2026. Barème de revenu, organisme cantonal (${agencyName}), démarches et délais.`,
          h1: `Subsides d'assurance maladie dans le canton de ${data.name} (${data.code})`,
          breadcrumbLabel: `Subsides ${data.code}`,
          primaryKeyword: `subside assurance maladie ${data.name.toLowerCase()}`,
          secondaryKeywords: [`subside caisse maladie ${data.code.toLowerCase()}`, `reduction prime ${data.name.toLowerCase()}`, `${agencyName.toLowerCase()}`]
        },
        de: {
          path: `/de/praemienverbilligung/${trans.de}/`,
          title: `Prämienverbilligung ${trans.deName} (${data.code}) 2026 — Antrag, Fristen & Rechner`,
          description: `Prämienverbilligung (IPV) 2026 im Kanton ${trans.deName} (${data.code}). Einkommensgrenzen, offizielle Ausgleichskasse (${agencyName}) und Antragsverfahren.`,
          h1: `Prämienverbilligung im Kanton ${trans.deName} (${data.code})`,
          breadcrumbLabel: `IPV ${data.code}`,
          primaryKeyword: `praemienverbilligung ${trans.deName.toLowerCase()}`,
          secondaryKeywords: [`ipv ${data.code.toLowerCase()}`, `krankenkassenverbilligung ${trans.deName.toLowerCase()}`]
        },
        it: {
          path: `/it/sussidi-cassa-malati/${trans.it}/`,
          title: `Sussidi Cassa Malati ${trans.itName} (${data.code}) 2026 — Requisiti & Scadenze`,
          description: `Riduzione individuale dei premi nel Cantone ${trans.itName} (${data.code}) per il 2026. Requisiti di reddito, ente ufficiale (${agencyName}) e scadenze.`,
          h1: `Sussidi cassa malati nel Cantone ${trans.itName} (${data.code})`,
          breadcrumbLabel: `Sussidi ${data.code}`,
          primaryKeyword: `sussidi cassa malati ${trans.itName.toLowerCase()}`,
          secondaryKeywords: [`rip ${data.code.toLowerCase()}`, `riduzione premi ${trans.itName.toLowerCase()}`]
        },
        en: {
          path: `/en/health-insurance-subsidies/${trans.en}/`,
          title: `Health Insurance Subsidies in ${trans.enName} (${data.code}) 2026 — Eligibility & Deadlines`,
          description: `How to apply for health insurance premium subsidies in Canton ${trans.enName} (${data.code}) in 2026. Income thresholds, official office (${agencyName}) and deadlines.`,
          h1: `Health Insurance Subsidies in Canton ${trans.enName} (${data.code})`,
          breadcrumbLabel: `Subsidies ${data.code}`,
          primaryKeyword: `health insurance subsidies ${trans.enName.toLowerCase()}`,
          secondaryKeywords: [`ipv ${data.code.toLowerCase()}`, `canton ${trans.enName.toLowerCase()} health discount`]
        }
      }
    };
  }

  return subsidyConfigs;
}

/**
 * Generates all 14 Swiss insurer profile routes
 */
function generateAllInsurerRoutes(): Record<string, MultilingualRouteConfig> {
  const insurerConfigs: Record<string, MultilingualRouteConfig> = {};

  for (const [slug, insurer] of Object.entries(INSURERS_SEO_DATA)) {
    const tabKey = `insurer-${slug}` as AppTab;

    insurerConfigs[tabKey] = {
      id: tabKey,
      category: 'insurance',
      priority: 0.8,
      changefreq: 'monthly',
      locales: {
        fr: {
          path: `/fr/caisses-maladie/${slug}/`,
          title: `${insurer.name} 2026 : Primes, Modèles LAMal & Avis Clients | Le Fennec Malin`,
          description: insurer.metaDescription,
          h1: `${insurer.name} — Présentation & Comparatif des Primes 2026`,
          breadcrumbLabel: insurer.name,
          primaryKeyword: `caisse maladie ${insurer.name.toLowerCase()}`,
          secondaryKeywords: [`primes ${insurer.name.toLowerCase()} 2026`, `avis ${insurer.name.toLowerCase()}`, `resiliation ${insurer.name.toLowerCase()}`]
        },
        de: {
          path: `/de/krankenkassen/${slug}/`,
          title: `${insurer.name} 2026: Prämien, KVG-Modelle & Kundenbewertung`,
          description: `Offizielle Prämien 2026 der ${insurer.name}. KVG Grundversicherung, Telmed/Hausarzt, Kundenzufriedenheit und Wechsel.`,
          h1: `${insurer.name} — Prämien & Erfahrungen 2026`,
          breadcrumbLabel: insurer.name,
          primaryKeyword: `krankenkasse ${insurer.name.toLowerCase()}`,
          secondaryKeywords: [`${insurer.name.toLowerCase()} praemien 2026`, `${insurer.name.toLowerCase()} kuendigen`]
        },
        it: {
          path: `/it/casse-malati/${slug}/`,
          title: `${insurer.name} 2026: Premi, Modelli LAMal & Recensioni`,
          description: `Tutti i premi 2026 di ${insurer.name} in Svizzera. Modelli Telmed e medico di famiglia, soddisfazione clienti e confronto.`,
          h1: `${insurer.name} — Premi & Informazioni 2026`,
          breadcrumbLabel: insurer.name,
          primaryKeyword: `cassa malati ${insurer.name.toLowerCase()}`,
          secondaryKeywords: [`premi ${insurer.name.toLowerCase()} 2026`]
        },
        en: {
          path: `/en/health-funds/${slug}/`,
          title: `${insurer.name} Switzerland 2026: Premiums, Plans & Reviews`,
          description: `Official 2026 health insurance rates for ${insurer.name}. LAMal basic models, complementary options, ratings and comparison.`,
          h1: `${insurer.name} — Swiss Health Insurance Overview`,
          breadcrumbLabel: insurer.name,
          primaryKeyword: `${insurer.name.toLowerCase()} switzerland`,
          secondaryKeywords: [`${insurer.name.toLowerCase()} health insurance review`]
        }
      }
    };
  }

  return insurerConfigs;
}

/**
 * Generates all Head-to-Head Comparison Routes
 */
function generateAllComparisonRoutes(): Record<string, MultilingualRouteConfig> {
  const comps: Record<string, { fr: string; de: string; it: string; en: string; titleFr: string }> = {
    'compare-css-helsana': { fr: 'css-vs-helsana', de: 'css-vs-helsana', it: 'css-vs-helsana', en: 'css-vs-helsana', titleFr: 'CSS vs Helsana' },
    'compare-helsana-swica': { fr: 'helsana-vs-swica', de: 'helsana-vs-swica', it: 'helsana-vs-swica', en: 'helsana-vs-swica', titleFr: 'Helsana vs SWICA' },
    'compare-css-swica': { fr: 'css-vs-swica', de: 'css-vs-swica', it: 'css-vs-swica', en: 'css-vs-swica', titleFr: 'CSS vs SWICA' },
    'compare-assura-mutuel': { fr: 'assura-vs-groupe-mutuel', de: 'assura-vs-groupe-mutuel', it: 'assura-vs-groupe-mutuel', en: 'assura-vs-groupe-mutuel', titleFr: 'Assura vs Groupe Mutuel' },
    'compare-swica-sanitas': { fr: 'swica-vs-sanitas', de: 'swica-vs-sanitas', it: 'swica-vs-sanitas', en: 'swica-vs-sanitas', titleFr: 'SWICA vs Sanitas' },
    'compare-visana-concordia': { fr: 'visana-vs-concordia', de: 'visana-vs-concordia', it: 'visana-vs-concordia', en: 'visana-vs-concordia', titleFr: 'Visana vs Concordia' },
  };

  const configs: Record<string, MultilingualRouteConfig> = {};
  for (const [id, c] of Object.entries(comps)) {
    const tabKey = id as AppTab;
    configs[tabKey] = {
      id: tabKey,
      category: 'insurance',
      priority: 0.78,
      changefreq: 'monthly',
      locales: {
        fr: {
          path: `/fr/comparatif/${c.fr}/`,
          title: `${c.titleFr} 2026 : Comparatif Détaillé, Primes & Avis | Le Fennec Malin`,
          description: `Comparatif direct entre ${c.titleFr} en Suisse : tarifs LAMal, modèles alternatifs, qualité du service client et satisfactions.`,
          h1: `${c.titleFr} — Lequel choisir en 2026 ?`,
          breadcrumbLabel: c.titleFr,
          primaryKeyword: `comparatif ${c.titleFr.toLowerCase()}`,
          secondaryKeywords: [`difference ${c.titleFr.toLowerCase()}`]
        },
        de: {
          path: `/de/vergleich/${c.de}/`,
          title: `${c.titleFr} 2026: Direkter Krankenkassen-Vergleich Schweiz`,
          description: `Direkter Prämien- und Leistungsvergleich zwischen ${c.titleFr}. Modelle, Kundenzufriedenheit und Wechselvorteile.`,
          h1: `${c.titleFr} — Vergleich 2026`,
          breadcrumbLabel: c.titleFr,
          primaryKeyword: `${c.titleFr.toLowerCase()} vergleich`,
          secondaryKeywords: []
        },
        it: {
          path: `/it/confronto/${c.it}/`,
          title: `${c.titleFr} 2026: Confronto Diretto Casse Malati`,
          description: `Confronto diretto premi e modelli tra ${c.titleFr} in Svizzera.`,
          h1: `${c.titleFr} — Confronto 2026`,
          breadcrumbLabel: c.titleFr,
          primaryKeyword: `confronto ${c.titleFr.toLowerCase()}`,
          secondaryKeywords: []
        },
        en: {
          path: `/en/compare/${c.en}/`,
          title: `${c.titleFr} Switzerland 2026: Side-by-Side Comparison`,
          description: `Detailed comparison between ${c.titleFr} health insurance funds in Switzerland.`,
          h1: `${c.titleFr} — Side-by-Side Review`,
          breadcrumbLabel: c.titleFr,
          primaryKeyword: `${c.titleFr.toLowerCase()} comparison`,
          secondaryKeywords: []
        }
      }
    };
  }

  return configs;
}

/**
 * Generates all Guide & Content Hub routes
 */
function generateAllGuideRoutes(): Record<string, MultilingualRouteConfig> {
  const guideConfigs: Record<string, MultilingualRouteConfig> = {};

  const guideTranslations: Record<string, { de: string; it: string; en: string }> = {
    'guide-franchise-300-vs-2500': { de: 'franchise-300-oder-2500', it: 'franchigia-300-o-2500', en: 'deductible-300-vs-2500' },
    'guide-modeles-assurance': { de: 'versicherungsmodelle-schweiz', it: 'modelli-assicurazione-malattia', en: 'swiss-insurance-models' },
    'guide-subside-assurance-maladie': { de: 'praemienverbilligung-schweiz', it: 'sussidi-cassa-malati-svizzera', en: 'health-insurance-subsidies' },
    'guide-resiliation-assurance-maladie': { de: 'krankenkasse-kuendigen-schweiz', it: 'disdetta-cassa-malati-svizzera', en: 'cancel-swiss-health-insurance' },
    'guide-frontalier-assurance-maladie': { de: 'grenzgaenger-krankenversicherung-schweiz', it: 'frontalieri-assicurazione-malattia', en: 'cross-border-health-insurance-switzerland' },
    'guide-3eme-pilier-fiscalite': { de: '3-saeule-steuern-sparen', it: 'terzo-pilastro-risparmio-fiscale', en: '3rd-pillar-tax-deductions' },
    'guide-franchises': { de: 'krankenkasse-franchisen', it: 'franchigie-cassa-malati', en: 'swiss-deductibles' },
    'guide-modele-telmed': { de: 'telmed-modell-schweiz', it: 'modello-telmed-svizzera', en: 'telmed-model-switzerland' },
    'guide-modele-hmo': { de: 'hmo-modell-schweiz', it: 'modello-hmo-svizzera', en: 'hmo-model-switzerland' },
    'guide-modele-medecin-famille': { de: 'hausarztmodell-schweiz', it: 'medico-di-famiglia-svizzera', en: 'gp-family-doctor-model' },
    'guide-changer-caisse-maladie': { de: 'krankenkasse-wechseln', it: 'cambiare-cassa-malati', en: 'switching-health-fund' },
    'guide-assurance-complementaire-lca': { de: 'zusatzversicherungen-vvg', it: 'assicurazioni-complementari-lca', en: 'supplementary-health-insurance' },
    'guide-assurance-dentaire': { de: 'zahnzusatzversicherung-schweiz', it: 'assicurazione-dentale-svizzera', en: 'dental-insurance-switzerland' },
    'guide-assurance-hospitalisation': { de: 'spitalzusatzversicherung-schweiz', it: 'assicurazione-ospedaliera-svizzera', en: 'hospital-insurance-switzerland' },
    'guide-3eme-pilier-3a-vs-3b': { de: 'saeule-3a-vs-3b', it: 'pilastro-3a-vs-3b', en: 'pillar-3a-vs-3b' },
    'guide-3eme-pilier-retrait': { de: 'saeule-3a-auszahlung-vorbezug', it: 'prelievo-terzo-pilastro', en: 'pillar-3a-early-withdrawal' },
    'guide-assurance-maladie-famille-enfant': { de: 'krankenkasse-familien-kinder', it: 'cassa-malati-famiglie-bambini', en: 'family-child-health-insurance' },
    'guide-assurance-maladie-jeune-etudiant': { de: 'krankenkasse-junge-erwachsene-studenten', it: 'cassa-malati-giovani-studenti', en: 'student-young-adult-health-insurance' },
  };

  for (const [key, guide] of Object.entries(GUIDES_SEO_DATA)) {
    const tabKey = (key.startsWith('guide-') ? key : `guide-${key}`) as AppTab;
    const trans = guideTranslations[tabKey] || { de: guide.slug, it: guide.slug, en: guide.slug };

    guideConfigs[tabKey] = {
      id: tabKey,
      category: 'guide',
      priority: 0.8,
      changefreq: 'monthly',
      locales: {
        fr: {
          path: `/fr/guides/${guide.slug}/`,
          title: `${guide.title} | Le Fennec Malin`,
          description: guide.metaDescription,
          h1: guide.title,
          breadcrumbLabel: guide.title.split(':')[0],
          primaryKeyword: guide.title.toLowerCase(),
          secondaryKeywords: []
        },
        de: {
          path: `/de/ratgeber/${trans.de}/`,
          title: `${guide.title} — Ratgeber Schweiz | Le Fennec Malin`,
          description: guide.summary,
          h1: guide.title,
          breadcrumbLabel: 'Ratgeber',
          primaryKeyword: trans.de.replace(/-/g, ' '),
          secondaryKeywords: []
        },
        it: {
          path: `/it/guide/${trans.it}/`,
          title: `${guide.title} — Guida Svizzera | Le Fennec Malin`,
          description: guide.summary,
          h1: guide.title,
          breadcrumbLabel: 'Guida',
          primaryKeyword: trans.it.replace(/-/g, ' '),
          secondaryKeywords: []
        },
        en: {
          path: `/en/guides/${trans.en}/`,
          title: `${guide.title} — Swiss Guide | Le Fennec Malin`,
          description: guide.summary,
          h1: guide.title,
          breadcrumbLabel: 'Guide',
          primaryKeyword: trans.en.replace(/-/g, ' '),
          secondaryKeywords: []
        }
      }
    };
  }

  return guideConfigs;
}

/**
 * Generates all Tool & Interactive Calculator routes
 */
function generateAllToolRoutes(): Record<string, MultilingualRouteConfig> {
  return {
    'tool-calculateur-franchise': {
      id: 'tool-calculateur-franchise',
      category: 'tool',
      priority: 0.9,
      changefreq: 'monthly',
      locales: {
        fr: {
          path: '/fr/outils/calculateur-franchise/',
          title: "Calculateur de Franchise d'Assurance Maladie 2026 | Le Fennec Malin",
          description: "Simulez en direct la franchise optimale (300 vs 2500) selon vos dépenses médicales annuelles prévues et économisez jusqu'à CHF 1'540/an.",
          h1: "Calculateur de Franchise d'Assurance Maladie Suisse 2026",
          breadcrumbLabel: "Calculateur Franchise",
          primaryKeyword: "calculateur franchise assurance maladie",
          secondaryKeywords: ["franchise 300 vs 2500 calcul", "simulateur franchise suisse"]
        },
        de: {
          path: '/de/tools/franchisenrechner/',
          title: "Franchisenrechner Schweiz 2026 — Optimale Franchise berechnen",
          description: "Berechnen Sie die optimale Franchise (300 vs 2500) basierend auf Ihren erwarteten Gesundheitskosten.",
          h1: "Franchisenrechner Krankenkasse Schweiz 2026",
          breadcrumbLabel: "Franchisenrechner",
          primaryKeyword: "franchisenrechner krankenkasse",
          secondaryKeywords: []
        },
        it: {
          path: '/it/strumenti/calcolatore-franchigia/',
          title: "Calcolatore Franchigia Cassa Malati 2026 | Le Fennec Malin",
          description: "Calcola la franchigia ottimale (300 vs 2500) in base alle spese mediche stimate.",
          h1: "Calcolatore Franchigia Cassa Malati Svizzera 2026",
          breadcrumbLabel: "Calcolatore Franchigia",
          primaryKeyword: "calcolatore franchigia",
          secondaryKeywords: []
        },
        en: {
          path: '/en/tools/deductible-calculator/',
          title: "Swiss Health Deductible Calculator 2026 | Le Fennec Malin",
          description: "Simulate the best deductible (CHF 300 vs CHF 2500) based on your estimated medical expenses.",
          h1: "Swiss Health Insurance Deductible Calculator 2026",
          breadcrumbLabel: "Deductible Calculator",
          primaryKeyword: "swiss deductible calculator",
          secondaryKeywords: []
        }
      }
    },
    'tool-calculateur-impot-3a': {
      id: 'tool-calculateur-impot-3a',
      category: 'tool',
      priority: 0.9,
      changefreq: 'monthly',
      locales: {
        fr: {
          path: '/fr/outils/calculateur-impot-3a/',
          title: "Simulateur d'Économie d'Impôt 3ème Pilier 3a 2026 | Le Fennec Malin",
          description: "Calculez instantanément le montant d'impôts économisé en versant sur votre pilier 3a (plafond CHF 7'258) par canton.",
          h1: "Simulateur d'Économie d'Impôt 3ème Pilier 3a 2026",
          breadcrumbLabel: "Simulateur Impôts 3a",
          primaryKeyword: "simulateur impot 3eme pilier",
          secondaryKeywords: ["calculateur deduction fiscale 3a", "gain fiscal pilier 3a"]
        },
        de: {
          path: '/de/tools/steuerersparnis-rechner-3a/',
          title: "Steuerrechner Säule 3a Schweiz 2026 — Steuerersparnis berechnen",
          description: "Berechnen Sie live Ihre Steuerersparnis durch Einzahlungen in die Säule 3a pro Kanton.",
          h1: "Steuerrechner Säule 3a Schweiz 2026",
          breadcrumbLabel: "Steuerrechner 3a",
          primaryKeyword: "steuerrechner saeule 3a",
          secondaryKeywords: []
        },
        it: {
          path: '/it/strumenti/calcolatore-imposte-3a/',
          title: "Calcolatore Risparmio Fiscale 3° Pilastro 2026 | Le Fennec Malin",
          description: "Calcola le imposte risparmiate con il versamento nel pilastro 3a.",
          h1: "Calcolatore Risparmio Fiscale 3° Pilastro 2026",
          breadcrumbLabel: "Calcolatore Imposte 3a",
          primaryKeyword: "calcolatore imposte terzo pilastro",
          secondaryKeywords: []
        },
        en: {
          path: '/en/tools/tax-calculator-3a/',
          title: "Swiss Pillar 3a Tax Savings Calculator 2026 | Le Fennec Malin",
          description: "Calculate your exact annual income tax savings by contributing to Swiss Pillar 3a.",
          h1: "Swiss Pillar 3a Tax Savings Calculator 2026",
          breadcrumbLabel: "3a Tax Calculator",
          primaryKeyword: "pillar 3a tax calculator",
          secondaryKeywords: []
        }
      }
    },
    'tool-simulateur-frontalier': {
      id: 'tool-simulateur-frontalier',
      category: 'tool',
      priority: 0.88,
      changefreq: 'monthly',
      locales: {
        fr: {
          path: '/fr/outils/simulateur-frontalier/',
          title: "Simulateur Droit d'Option Frontalier : LAMal vs CMU | Le Fennec Malin",
          description: "Comparez en direct le coût de la prime fixe LAMal frontalier vs la cotisation CMU à 8% selon votre salaire suisse.",
          h1: "Simulateur Droit d'Option Frontalier — LAMal ou CMU ?",
          breadcrumbLabel: "Simulateur Frontalier",
          primaryKeyword: "simulateur frontalier lamal cmu",
          secondaryKeywords: ["calculateur cmu vs lamal", "droit doption frontalier simulation"]
        },
        de: {
          path: '/de/tools/grenzgaenger-rechner/',
          title: "Grenzrechner Schweiz: KVG vs. Wohnlandversicherung",
          description: "Vergleich für Grenzgänger zwischen Schweizer KVG und ausländischer Krankenversicherung.",
          h1: "Grenzgänger-Krankenversicherungsrechner",
          breadcrumbLabel: "Grenzrechner",
          primaryKeyword: "grenzgaenger versicherungsrechner",
          secondaryKeywords: []
        },
        it: {
          path: '/it/strumenti/simulatore-frontalieri/',
          title: "Simulatore Frontalieri Svizzera: LAMal vs SSN",
          description: "Confronto per lavoratori frontalieri tra assicurazione svizzera e italiana.",
          h1: "Simulatore Assicurazione Frontalieri",
          breadcrumbLabel: "Simulatore Frontalieri",
          primaryKeyword: "simulatore frontalieri svizzera",
          secondaryKeywords: []
        },
        en: {
          path: '/en/tools/cross-border-simulator/',
          title: "Cross-Border Worker Insurance Calculator: Swiss LAMal vs EU",
          description: "Compare Swiss LAMal health insurance fixed premium vs home country public health deductions.",
          h1: "Cross-Border Health Insurance Simulator",
          breadcrumbLabel: "Cross-Border Tool",
          primaryKeyword: "cross border swiss insurance calculator",
          secondaryKeywords: []
        }
      }
    }
  };
}

/**
 * Generates all other insurance categories
 */
function generateAllCategoryRoutes(): Record<string, MultilingualRouteConfig> {
  const categories: Record<string, { frSlug: string; deSlug: string; itSlug: string; enSlug: string; titleFr: string; titleDe: string; titleIt: string; titleEn: string; descFr: string; descDe: string; descIt: string; descEn: string }> = {
    'category-assurance-auto': {
      frSlug: 'assurance-auto', deSlug: 'autoversicherung', itSlug: 'assicurazione-auto', enSlug: 'car-insurance',
      titleFr: "Assurance Auto Suisse 2026 — Comparatif RC, Casco Partielle & Complète",
      titleDe: "Autoversicherung Schweiz 2026 — Haftpflicht, Teil- & Vollkasko Vergleich",
      titleIt: "Assicurazione Auto Svizzera 2026 — RC, Casco Parziale & Totale",
      titleEn: "Swiss Car Insurance 2026 — Third Party & Comprehensive Comparison",
      descFr: "Comparez les assurances auto en Suisse : RC obligatoire, casco partielle et casco complète.",
      descDe: "Vergleichen Sie Schweizer Autoversicherungen transparent und sparen Sie bis zu 40%.",
      descIt: "Confronta le polizze auto in Svizzera e risparmia fino a CHF 500.",
      descEn: "Compare Swiss car insurance policies: liability, partial, and full comprehensive."
    },
    'category-assurance-menage': {
      frSlug: 'assurance-menage', deSlug: 'hausratversicherung', itSlug: 'assicurazione-mobilia', enSlug: 'household-insurance',
      titleFr: "Assurance Ménage & Inventaire du Ménage Suisse 2026",
      titleDe: "Hausratversicherung Schweiz 2026 — Schutz für Ihr Zuhause",
      titleIt: "Assicurazione Mobilia Domestica Svizzera 2026",
      titleEn: "Swiss Household Contents Insurance 2026",
      descFr: "Protection de vos biens contre l'incendie, les dégâts d'eau et le vol.",
      descDe: "Umfassender Schutz für Ihr Mobiliar gegen Feuer, Wasser und Diebstahl.",
      descIt: "Proteggi i tuoi beni domestici contro furto, incendio e danni d'acqua.",
      descEn: "Protect your home contents against theft, water damage, and fire."
    },
    'category-assurance-rc': {
      frSlug: 'assurance-rc', deSlug: 'privathaftpflicht', itSlug: 'responsabilita-civile-privata', enSlug: 'personal-liability',
      titleFr: "Assurance Responsabilité Civile Privée (RC) Suisse 2026",
      titleDe: "Privathaftpflichtversicherung Schweiz 2026",
      titleIt: "Assicurazione Responsabilità Civile Privata Svizzera 2026",
      titleEn: "Personal Liability Insurance Switzerland 2026",
      descFr: "Couverture indispensable contre les dommages causés aux tiers et aux logements loués.",
      descDe: "Unverzichtbarer Schutz bei Personen- und Sachschäden an Dritten.",
      descIt: "Copertura indispensabile per danni involontari a terzi o alloggi in affitto.",
      descEn: "Essential coverage against accidental damages caused to third parties."
    },
    'category-assurance-vie': {
      frSlug: 'assurance-vie', deSlug: 'lebensversicherung', itSlug: 'assicurazione-vita', enSlug: 'life-insurance',
      titleFr: "Assurance-Vie Suisse 2026 — Prévoyance Décès & Invalidité",
      titleDe: "Lebensversicherung Schweiz 2026 — Todesfall & Erwerbsunfähigkeit",
      titleIt: "Assicurazione Vita Svizzera 2026 — Protezione Famiglia",
      titleEn: "Swiss Life Insurance 2026 — Family & Disability Protection",
      descFr: "Protégez financièrement vos proches en cas de décès ou d'invalidité.",
      descDe: "Finanzielle Absicherung Ihrer Familie bei Todesfall oder Erwerbsunfähigkeit.",
      descIt: "Proteggi il futuro finanziario dei tuoi cari in caso di decesso o invalidità.",
      descEn: "Secure your family's financial future against unexpected life events."
    },
    'category-assurance-voyage': {
      frSlug: 'assurance-voyage', deSlug: 'reiseversicherung', itSlug: 'assicurazione-viaggi', enSlug: 'travel-insurance',
      titleFr: "Assurance Voyage & Annulation Suisse 2026 — Assistance Monde",
      titleDe: "Reiseversicherung Schweiz 2026 — Annullierung & Assistance",
      titleIt: "Assicurazione Viaggio & Annullamento Svizzera 2026",
      titleEn: "Swiss Travel & Cancellation Insurance 2026",
      descFr: "Couverture frais médicaux à l'étranger, rapatriement et annulation de voyage.",
      descDe: "Schutz bei Krankheitskosten im Ausland, Reiserücktritt und Notfällen weltweit.",
      descIt: "Copertura spese mediche all'estero, rimpatrio e annullamento viaggi.",
      descEn: "Worldwide medical coverage, repatriation, and trip cancellation."
    },
    'category-protection-juridique': {
      frSlug: 'protection-juridique', deSlug: 'rechtsschutzversicherung', itSlug: 'protezione-giuridica', enSlug: 'legal-protection',
      titleFr: "Protection Juridique Privée & Circulation Suisse 2026",
      titleDe: "Rechtsschutzversicherung Schweiz 2026 — Privat & Verkehr",
      titleIt: "Protezione Giuridica Privata & Circolazione Svizzera 2026",
      titleEn: "Swiss Legal Expenses & Protection Insurance 2026",
      descFr: "Prise en charge des frais d'avocats, d'expertise et de justice en Suisse.",
      descDe: "Übernahme von Anwalts- und Gerichtskosten bei Rechtsstreitigkeiten.",
      descIt: "Copertura delle spese legali, peritali e processuali in Svizzera.",
      descEn: "Coverage of lawyer and court fees for personal and traffic disputes."
    },
    'category-assurance-animaux': {
      frSlug: 'assurance-animaux', deSlug: 'tierversicherung', itSlug: 'assicurazione-animali', enSlug: 'pet-insurance',
      titleFr: "Assurance Animaux de Compagnie Suisse 2026 — Chien & Chat",
      titleDe: "Tierversicherung Schweiz 2026 — Hund & Katze",
      titleIt: "Assicurazione Animali Domestici Svizzera 2026 — Cane & Gatto",
      titleEn: "Swiss Pet Insurance 2026 — Dogs & Cats",
      descFr: "Remboursement des frais vétérinaires, chirurgies et médicaments pour chien et chat.",
      descDe: "Kostenerstattung für Tierarzt, Operationen und Medikamente.",
      descIt: "Rimborso spese veterinarie, chirurgia e farmaci per cani e gatti.",
      descEn: "Veterinary fee reimbursements, surgery, and medications for dogs and cats."
    }
  };

  const configs: Record<string, MultilingualRouteConfig> = {};
  for (const [id, cat] of Object.entries(categories)) {
    const tabKey = id as AppTab;
    configs[tabKey] = {
      id: tabKey,
      category: 'insurance',
      priority: 0.7,
      changefreq: 'monthly',
      locales: {
        fr: { path: `/fr/${cat.frSlug}/`, title: `${cat.titleFr} | Le Fennec Malin`, description: cat.descFr, h1: cat.titleFr, breadcrumbLabel: cat.titleFr.split(' ')[1] || cat.frSlug, primaryKeyword: cat.frSlug.replace(/-/g, ' '), secondaryKeywords: [] },
        de: { path: `/de/${cat.deSlug}/`, title: `${cat.titleDe} | Le Fennec Malin`, description: cat.descDe, h1: cat.titleDe, breadcrumbLabel: cat.titleDe.split(' ')[0], primaryKeyword: cat.deSlug.replace(/-/g, ' '), secondaryKeywords: [] },
        it: { path: `/it/${cat.itSlug}/`, title: `${cat.titleIt} | Le Fennec Malin`, description: cat.descIt, h1: cat.titleIt, breadcrumbLabel: cat.titleIt.split(' ')[1] || cat.itSlug, primaryKeyword: cat.itSlug.replace(/-/g, ' '), secondaryKeywords: [] },
        en: { path: `/en/${cat.enSlug}/`, title: `${cat.titleEn} | Le Fennec Malin`, description: cat.descEn, h1: cat.titleEn, breadcrumbLabel: cat.titleEn.split(' ')[1] || cat.enSlug, primaryKeyword: cat.enSlug.replace(/-/g, ' '), secondaryKeywords: [] }
      }
    };
  }

  return configs;
}

// Merge all dynamically generated routes into MULTILINGUAL_ROUTES
Object.assign(
  MULTILINGUAL_ROUTES,
  generateAllCantonRoutes(),
  generateAllSubsidiesRoutes(),
  generateAllInsurerRoutes(),
  generateAllComparisonRoutes(),
  generateAllGuideRoutes(),
  generateAllToolRoutes(),
  generateAllCategoryRoutes()
);

/**
 * Returns the MultilingualRouteConfig for a given tab, falling back safely to 'home'
 */
export function getMultilingualRoute(tab: AppTab): MultilingualRouteConfig {
  return MULTILINGUAL_ROUTES[tab] || MULTILINGUAL_ROUTES.home;
}

/**
 * Returns the localized URL path for a given tab and language
 */
export function getLocalizedPath(tab: AppTab, lang: Language): string {
  const route = getMultilingualRoute(tab);
  if (route.locales[lang]?.path) {
    return route.locales[lang]!.path;
  }
  const frPath = route.locales.fr?.path || '/fr/';
  if (frPath.startsWith('/fr/')) {
    return `/${lang}/${frPath.slice(4)}`;
  }
  return `/${lang}${frPath.startsWith('/') ? '' : '/'}${frPath}`;
}

/**
 * Returns the full absolute URL for canonical tags
 */
export function getLocalizedUrl(tab: AppTab, lang: Language): string {
  return `${SITE_URL}${getLocalizedPath(tab, lang)}`;
}

/**
 * Returns the full LocalizedRouteInfo metadata
 */
export function getLocalizedRouteInfo(tab: AppTab, lang: Language): LocalizedRouteInfo {
  const route = getMultilingualRoute(tab);
  if (route.locales[lang]) {
    return route.locales[lang]!;
  }
  const fr = route.locales.fr;
  return {
    ...fr,
    path: getLocalizedPath(tab, lang),
  };
}

/**
 * Generates the full hreflang alternate URLs matrix
 */
export function getHreflangAlternates(tab: AppTab): Record<string, string> {
  const frUrl = `${SITE_URL}${getLocalizedPath(tab, 'fr')}`;
  const deUrl = `${SITE_URL}${getLocalizedPath(tab, 'de')}`;
  const itUrl = `${SITE_URL}${getLocalizedPath(tab, 'it')}`;
  const enUrl = `${SITE_URL}${getLocalizedPath(tab, 'en')}`;
  const esUrl = `${SITE_URL}${getLocalizedPath(tab, 'es')}`;
  const ptUrl = `${SITE_URL}${getLocalizedPath(tab, 'pt')}`;

  return {
    'fr-CH': frUrl,
    'de-CH': deUrl,
    'it-CH': itUrl,
    'en-CH': enUrl,
    'es-CH': esUrl,
    'pt-CH': ptUrl,
    'x-default': frUrl,
  };
}

/**
 * Resolves path into { tab: AppTab, language: Language }
 */
export function resolveRouteFromPath(pathname: string): { tab: AppTab; language: Language } {
  if (!pathname) return { tab: 'home', language: 'fr' };
  let clean = pathname.trim().split('?')[0].split('#')[0];
  if (clean === '/index.html' || clean === '' || clean === '/') {
    return { tab: 'home', language: 'fr' };
  }
  if (!clean.startsWith('/')) {
    clean = `/${clean}`;
  }
  const normalized = clean.endsWith('/') ? clean : `${clean}/`;
  const withoutTrailingSlash = clean.endsWith('/') && clean.length > 1 ? clean.slice(0, -1) : clean;

  // 1. Check direct match in MULTILINGUAL_ROUTES across all tabs and locales
  for (const tabKey of Object.keys(MULTILINGUAL_ROUTES) as AppTab[]) {
    const route = MULTILINGUAL_ROUTES[tabKey];
    if (!route?.locales) continue;
    for (const [langKey, info] of Object.entries(route.locales)) {
      if (info && (info.path === normalized || info.path === clean || info.path === withoutTrailingSlash)) {
        return { tab: route.id, language: langKey as Language };
      }
    }
  }

  // 2. Handle root language routes
  if (normalized === '/' || normalized === '') return { tab: 'home', language: 'fr' };
  if (normalized === '/de/' || clean === '/de') return { tab: 'home', language: 'de' };
  if (normalized === '/it/' || clean === '/it') return { tab: 'home', language: 'it' };
  if (normalized === '/en/' || clean === '/en') return { tab: 'home', language: 'en' };
  if (normalized === '/es/' || normalized === '/sp/' || clean === '/es' || clean === '/sp') return { tab: 'home', language: 'es' };
  if (normalized === '/pt/' || clean === '/pt') return { tab: 'home', language: 'pt' };
  if (normalized === '/fr/' || clean === '/fr') return { tab: 'home', language: 'fr' };

  // 2b. Check if path starts with /es/, /sp/ or /pt/ and matches a localized version of a French route
  if (normalized.startsWith('/es/') || normalized.startsWith('/sp/') || normalized.startsWith('/pt/')) {
    const isSp = normalized.startsWith('/sp/');
    const lang = (isSp ? 'es' : normalized.slice(1, 3)) as Language;
    const pathSuffix = isSp ? normalized.slice(4) : normalized.slice(4);
    const frEquivalent = `/fr/${pathSuffix}`;
    for (const tabKey of Object.keys(MULTILINGUAL_ROUTES) as AppTab[]) {
      const route = MULTILINGUAL_ROUTES[tabKey];
      if (route?.locales?.fr?.path === frEquivalent) {
        return { tab: route.id, language: lang };
      }
    }
  }

  // 3. Handle Canton Slugs dynamically (e.g. /fr/assurance-maladie/geneve/, /es/assurance-maladie/geneve/)
  const cantonMatch = normalized.match(/(?:\/(fr|de|it|en|es|sp|pt))?\/(?:assurance-maladie|krankenkasse|cassa-malati|health-insurance)\/([a-z0-9-]+)\/?$/);
  if (cantonMatch) {
    const rawLang = cantonMatch[1] || 'fr';
    const lang = (rawLang === 'sp' ? 'es' : rawLang) as Language;
    const slug = cantonMatch[2];
    const candidateTab = `canton-${slug}` as AppTab;
    if (MULTILINGUAL_ROUTES[candidateTab]) {
      return { tab: candidateTab, language: lang };
    }
  }

  // 4. Handle Local SEO Communes / Municipalities dynamically (/fr/local/:canton/:city/)
  const localCityMatch = normalized.match(/(?:\/(fr|de|it|en|es|sp|pt))?\/local\/([a-z0-9-]+)\/([a-z0-9-]+)\/?$/);
  if (localCityMatch) {
    const rawLang = localCityMatch[1] || 'fr';
    const lang = (rawLang === 'sp' ? 'es' : rawLang) as Language;
    const cantonSlug = localCityMatch[2];
    const citySlug = localCityMatch[3];
    return { tab: `local-city-${cantonSlug}-${citySlug}` as AppTab, language: lang };
  }

  // 5. Handle Local SEO Canton Hubs dynamically (/fr/local/:canton/)
  const localCantonMatch = normalized.match(/(?:\/(fr|de|it|en|es|sp|pt))?\/local\/([a-z0-9-]+)\/?$/);
  if (localCantonMatch) {
    const rawLang = localCantonMatch[1] || 'fr';
    const lang = (rawLang === 'sp' ? 'es' : rawLang) as Language;
    const cantonSlug = localCantonMatch[2];
    return { tab: `local-canton-${cantonSlug}` as AppTab, language: lang };
  }

  // 6. Handle Master Local SEO Hub (/fr/local/)
  const localHubMatch = normalized.match(/(?:\/(fr|de|it|en|es|sp|pt))?\/local\/?$/);
  if (localHubMatch) {
    const rawLang = localHubMatch[1] || 'fr';
    const lang = (rawLang === 'sp' ? 'es' : rawLang) as Language;
    return { tab: 'local-hub', language: lang };
  }

  // 7. Handle Subsidies Slugs dynamically (/fr/subsides/:slug/, /es/subsides/:slug/, /de/praemienverbilligung/:slug/)
  const subsidyMatch = normalized.match(/(?:\/(fr|de|it|en|es|sp|pt))?\/(?:subsides|praemienverbilligung|sussidi-cassa-malati|health-insurance-subsidies)\/([a-z0-9-]+)\/?$/);
  if (subsidyMatch) {
    const rawLang = subsidyMatch[1] || 'fr';
    const lang = (rawLang === 'sp' ? 'es' : rawLang) as Language;
    const slug = subsidyMatch[2];
    const candidateTab = `subside-${slug}` as AppTab;
    if (MULTILINGUAL_ROUTES[candidateTab]) {
      return { tab: candidateTab, language: lang };
    }
  }

  // 5. Handle Subsidies Hub dynamically
  const subsidyHubMatch = normalized.match(/(?:\/(fr|de|it|en|es|sp|pt))?\/(?:subsides|praemienverbilligung|sussidi-cassa-malati|health-insurance-subsidies)\/?$/);
  if (subsidyHubMatch) {
    const rawLang = subsidyHubMatch[1] || 'fr';
    const lang = (rawLang === 'sp' ? 'es' : rawLang) as Language;
    return { tab: 'hub-subsides', language: lang };
  }

  // 6. Handle Insurer Slugs dynamically (/fr/caisses-maladie/:slug/, /es/caisses-maladie/:slug/)
  const insurerMatch = normalized.match(/(?:\/(fr|de|it|en|es|sp|pt))?\/(?:caisses-maladie|krankenkassen|casse-malati|health-funds)\/([a-z0-9-]+)\/?$/);
  if (insurerMatch) {
    const rawLang = insurerMatch[1] || 'fr';
    const lang = (rawLang === 'sp' ? 'es' : rawLang) as Language;
    const slug = insurerMatch[2];
    const candidateTab = `insurer-${slug}` as AppTab;
    if (MULTILINGUAL_ROUTES[candidateTab]) {
      return { tab: candidateTab, language: lang };
    }
  }

  // 7. Handle Guides Slugs dynamically (/fr/guides/:slug/)
  const guideMatch = normalized.match(/(?:\/(fr|de|it|en|es|sp|pt))?\/(?:guides|ratgeber|guide)\/([a-z0-9-]+)\/?$/);
  if (guideMatch) {
    const rawLang = guideMatch[1] || 'fr';
    const lang = (rawLang === 'sp' ? 'es' : rawLang) as Language;
    const slug = guideMatch[2];
    const candidateTab = (slug.startsWith('guide-') ? slug : `guide-${slug}`) as AppTab;
    if (MULTILINGUAL_ROUTES[candidateTab]) {
      return { tab: candidateTab, language: lang };
    }
  }

  // 8. Handle Tools Slugs dynamically (/fr/outils/:slug/)
  const toolMatch = normalized.match(/(?:\/(fr|de|it|en|es|sp|pt))?\/(?:outils|tools|strumenti)\/([a-z0-9-]+)\/?$/);
  if (toolMatch) {
    const rawLang = toolMatch[1] || 'fr';
    const lang = (rawLang === 'sp' ? 'es' : rawLang) as Language;
    const slug = toolMatch[2];
    const candidateTab = (slug.startsWith('tool-') ? slug : `tool-${slug}`) as AppTab;
    if (MULTILINGUAL_ROUTES[candidateTab]) {
      return { tab: candidateTab, language: lang };
    }
  }

  // 9. Legacy French non-prefixed paths (backward compatibility)
  const legacyMap: Record<string, AppTab> = {
    '/assurance-maladie/': 'seo-maladie',
    '/assurance-maladie/comparateur/': 'health-comparator',
    '/comparateur-assurance-suisse/': 'seo-comparateur',
    '/3eme-pilier/': 'seo-pilier',
    '/3eme-pilier/comparateur/': 'life-comparator',
    '/subsides/': 'hub-subsides',
    '/a-propos/': 'about',
    '/faq/': 'faq',
    '/methodologie/': 'methodologie',
    '/comment-fonctionne-le-comparateur/': 'comment-fonctionne-le-comparateur',
    '/article-45-lsa/': 'article-45-lsa',
    '/qualifications-intermediaire/': 'qualifications-intermediaire',
    '/mentions-legales/': 'legal',
    '/confidentialite/': 'privacy',
  };

  if (legacyMap[normalized]) {
    return { tab: legacyMap[normalized], language: 'fr' };
  }

  // Fallback by language prefix
  if (normalized.startsWith('/de/')) return { tab: 'home', language: 'de' };
  if (normalized.startsWith('/it/')) return { tab: 'home', language: 'it' };
  if (normalized.startsWith('/en/')) return { tab: 'home', language: 'en' };
  if (normalized.startsWith('/es/') || normalized.startsWith('/sp/')) return { tab: 'home', language: 'es' };
  if (normalized.startsWith('/pt/')) return { tab: 'home', language: 'pt' };

  return { tab: 'not-found', language: 'fr' };
}
