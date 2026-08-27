/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { CAISSES_MALADIE, SWISS_CANTONS, FRANCHISES, calculateHealthPremium, calculateSavings } from '../data';
import { HealthFilterState, CaisseMaladie } from '../types';
import { resolveZipCode } from '../utils/swissZipCodes';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  getRegionCode, 
  getInsurerDisplayName, 
  getInsurerModelFallbackName, 
  lookupPremium 
} from '../utils/premiumLookupService';
import { fetchOfficialPremiums, fetchNpaInfo, NpaLookupResult } from '../services/priminfoService';
import { teleportToTop } from '../utils/scrollUtils';
import fenyWinking from '../assets/images/Gemini_Generated_Image_qxhpmlqxhpmlqxhp.png';
import fenyThinking from '../assets/images/feny_thinking_1783331247759.jpg';
import fenyAvatar from '../assets/images/feny_mascot_avatar_1783245725195.jpg';
import fenySavings from '../assets/images/feny_mascot_savings_1783245711111.jpg';
import fenyCompare from '../assets/images/feny_mascot_compare_1783245694484.jpg';
import fenyAnalyse from '../assets/images/feny_analyse_1783331235825.jpg';
import { 
  Shield, 
  Sparkles, 
  Filter, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2, 
  Award, 
  PhoneCall, 
  X, 
  HelpCircle,
  MapPin,
  User,
  Activity,
  Percent,
  FileCheck,
  Check,
  Loader2,
  RefreshCw,
  SlidersHorizontal,
  ThumbsUp,
  Baby,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import CompanyLogo from './CompanyLogo';

// Client-side cache for Vercel static deployment lookup fallback
let cachedClientDb: Record<string, { premium: number; modelName: string }> | null = null;

const HEALTH_ADVICE_MAPS: Record<string, Record<string, string>> = {
  fr: {
    canton: "Le canton de résidence est le critère numéro 1 de calcul de la prime LAMal. L'OFSP ajuste les prix selon le coût des infrastructures hospitalières de votre région.",
    personalInfo: "L'âge, le genre et la nationalité influencent le calcul de l'assurance complémentaire (LCA). Pour l'assurance obligatoire (LAMal), la prime dépend uniquement de l'âge et de votre région.",
    currentSituation: "Indiquer votre assureur et prime actuels permet de calculer précisément vos économies potentielles.",
    lamal: "La franchise et le modèle alternatif (Médecin de famille, Telmed, HMO) sont vos leviers principaux pour économiser.",
    lcaBesoins: "Les complémentaires remboursent les soins hors LAMal (ostéopathie, dentaire, lunettes, chambre privée).",
    healthDeclaration: "Un questionnaire de santé est requis uniquement pour les assurances complémentaires (LCA).",
    preferences: "Personnaliser vos préférences nous permet de trier et de vous suggérer les assureurs offrant le meilleur rapport qualité-prix."
  },
  de: {
    canton: "Der Wohnkanton ist das Hauptkriterium für die KVG-Prämienberechnung. Das BAG passt die Preise den spitalen Kosten Ihrer Region an.",
    personalInfo: "Alter, Geschlecht und Nationalität beeinflussen die Zusatzversicherung (VVG). Für die Grundversicherung (KVG) zählt nur Alter und Region.",
    currentSituation: "Die Angabe Ihres aktuellen Versicherers ermöglicht eine genaue Berechnung Ihrer Ersparnis.",
    lamal: "Franchise und Alternativmodell (Hausarzt, Telmed, HMO) sind Ihre Haupthebel zum Sparen.",
    lcaBesoins: "Zusatzversicherungen decken Leistungen außerhalb der Grundversicherung ab (Zahn, Brille, Komplementärmedizin).",
    healthDeclaration: "Eine Gesundheitserklärung ist nur für Zusatzversicherungen (VVG) erforderlich.",
    preferences: "Ihre Präferenzen helfen uns, das beste Preis-Leistungs-Verhältnis zu finden."
  },
  en: {
    canton: "Your canton of residence is the primary factor for mandatory health insurance premiums (LAMal/KVG).",
    personalInfo: "Age, gender, and nationality affect supplementary insurance (LCA/VVG). Mandatory insurance depends solely on age and region.",
    currentSituation: "Providing your current insurer and premium helps calculate your exact potential savings.",
    lamal: "Deductible and alternative models (GP, Telmed, HMO) are key to saving up to 50% on basic coverage.",
    lcaBesoins: "Supplementary plans cover non-basic care (dental, optical, alternative medicine, private room).",
    healthDeclaration: "A health questionnaire is required only for supplementary insurance (LCA/VVG).",
    preferences: "Customizing your preferences helps us recommend insurers with the best value."
  },
  it: {
    canton: "Il cantone di residenza è il criterio principale per il calcolo del premio LAMal.",
    personalInfo: "Età, sesso e nazionalità influenzano le assicurazioni complementari (LCA). Per la LAMal contano solo età e regione.",
    currentSituation: "Indicare l'assicuratore e il premio attuale consente di calcolare esattamente i risparmi.",
    lamal: "La franchigia e i modelli alternativi (Medico di famiglia, Telmed, HMO) sono la leva principale per risparmiare.",
    lcaBesoins: "Le complementari rimborsano le cure escluse dalla LAMal (dentista, occhiali, camera privata).",
    healthDeclaration: "Il questionario medico è richiesto solo per le assicurazioni complementari (LCA).",
    preferences: "Personalizzare le preferenze ci aiuta a suggerirti gli assicuratori con il miglior rapporto qualità-prezzo."
  }
};

const HEALTH_UI_TEXTS: Record<string, Record<string, any>> = {
  fr: {
    zipTitle: "Quel est votre code postal de domicile ?",
    zipSubtitle: "Les primes d'assurance maladie dépendent de votre code postal (détermination automatique de la zone de primes 1 ou 2, identique à Priminfo).",
    zipLabel: "Saisissez votre code postal suisse (NPA) :",
    zipPlaceholder: "Ex: 1007, 1201, 1950...",
    localityPrompt: "Précisez votre localité pour le NPA",
    cantonLabel: "Canton :",
    localityLabel: "Localité :",
    zoneLabel: "Zone de primes :",
    regionText: "Région",
    unresolvedZip: "Code postal non identifié. Veuillez choisir votre canton manuellement ci-dessous.",
    enter4digits: "Saisissez votre code postal à 4 chiffres.",
    cantonDirect: "Ou sélectionnez directement un canton :",

    personalTitle: "Informations personnelles",
    personalSubtitle: "Ces données réglementaires permettent d'appliquer les barèmes légaux précis de l'OFSP et d'estimer vos risques pour les complémentaires.",
    birthdateLabel: "Date de naissance de l'assuré (JJ.MM.AAAA) *",
    birthdatePlaceholder: "Ex: 28.05.1990",
    birthdateHint: "Saisissez les 8 chiffres de votre date de naissance. Très rapide sur mobile.",
    birthdateInvalid: "⚠️ Date invalide ou impossible",
    ageCategoryLabel: "Catégorie d'âge :",
    yearsOld: "ans",
    genderLabel: "Sexe légal *",
    male: "Homme",
    female: "Femme",
    nationalityLabel: "Nationalité / Permis de séjour *",
    natSwiss: "Suisse",
    natPermitC: "Permis C (Établissement)",
    natPermitB: "Permis B (Résident)",
    natOther: "Autre / Frontalier",
    categoryRecognized: "Catégorie d'âge reconnue :",
    childCat: "Enfant (0-18 ans)",
    youngCat: "Jeune Adulte (19-25 ans)",
    adultCat: "Adulte (26 ans+)",

    situationTitle: "Votre situation actuelle",
    situationSubtitle: "Renseigner votre contrat actuel nous permet de calculer à l'exact centime près les économies réelles dont vous bénéficierez.",
    hasInsurerQuestion: "Avez-vous déjà une assurance maladie en Suisse ? *",
    yesInsured: "Oui, déjà assuré",
    noInsured: "Non, nouveau résident / autre",
    currentInsurer: "Assureur actuel",
    monthlyPremium: "Prime mensuelle totale (CHF)",
    seniority: "Ancienneté chez cet assureur",
    less2yrs: "- de 2 ans",
    between2_5yrs: "2 à 5 ans",
    more5yrs: "+ de 5 ans",
    nextTermination: "Prochaine résiliation possible",
    termNov: "30 Novembre (Fin d'année standard)",
    termJune: "30 Juin (Franchise 300 & standard uniquement)",
    termUnknown: "Je ne sais pas",

    lamalTitle: "Votre assurance de base (LAMal)",
    lamalSubtitle: "L'assurance obligatoire de base (LAMal) offre des garanties identiques chez tous les assureurs. Seuls la franchise et le modèle influencent son prix.",
    householdLabel: "Nombre de personnes à assurer",
    single: "Seul",
    couple: "En Couple",
    family: "Famille / Enfants",
    franchiseLabel: "Franchise annuelle souhaitée",
    ecoMax: "Éco Max",
    secuMax: "Sécu Max",
    standard: "Standard",
    accidentLabel: "Couverture accident",
    accidentYes: "Oui, inclure",
    accidentNo: "Non, exclure",
    modelsLabel: "Modèle(s) de coordination des soins (LAMal)",
    multipleChoice: "Plusieurs choix possibles",
    modelFamily: "Médecin de Famille",
    modelFamilyDesc: "Consultation du généraliste d'abord",
    modelTelemed: "Télémédecine (Telmed)",
    modelTelemedDesc: "Appel d'une hotline médicale d'abord",
    modelHmo: "Réseau HMO",
    modelHmoDesc: "Consultation dans un centre agréé",
    modelStandard: "Standard (Libre choix)",
    modelStandardDesc: "Accès spécialiste direct",

    lcaTitle: "Vos besoins complémentaires (LCA)",
    lcaSubtitle: "Les complémentaires remboursent les soins que la LAMal n'indemnise pas (dentaire, médecines douces, confort hospitalier, etc.).",
    lcaLevelLabel: "Niveau de couverture souhaité",
    lcaNone: "AUCUNE LCA",
    lcaEssential: "ESSENTIELLE",
    lcaConfort: "CONFORT",
    lcaPremium: "PREMIUM",
    hospitalDivisionLabel: "Division d'hospitalisation souhaitée",
    divCommune: "Division Commune",
    divSwiss: "Toute la Suisse",
    divSemiPrivate: "Demi-Privée (2 lits)",
    divPrivate: "Privée (1 lit)",
    ambulatoryNeedsLabel: "Cochez vos besoins ambulatoires spécifiques :",
    needAltMed: "Médecines douces",
    needAltMedDesc: "Ostéopathie, acupuncture...",
    needDental: "Soins dentaires",
    needDentalDesc: "Détartrages, orthodontie...",
    needSports: "Sports à risque",
    needSportsDesc: "Ski, sports aériens, plongée...",
    needTravel: "Voyages réguliers",
    needTravelDesc: "Urgences à l'étranger...",
    needMaternity: "Maternité / Grossesse",
    needMaternityDesc: "Désir d'enfant ou en cours",

    healthTitle: "Votre état de santé actuel",
    healthSubtitle: "Un questionnaire médical simplifié est requis pour souscrire à une complémentaire (LCA). Ces déclarations sont purement indicatives.",
    healthReminder: "Rappel constitutionnel : L'assurance de base obligatoire (LAMal) ne peut jamais refuser un assuré pour son état de santé. Ces questions n'impactent que l'estimation des complémentaires LCA.",
    healthChronic: "Maladies chroniques ou affections de longue durée ?",
    healthChronicDesc: "Diabète, cardiopathies, asthme sévère, dépression...",
    healthTreatment: "Traitements médicaux, thérapies ou médicaments en cours ?",
    healthTreatmentDesc: "Suivi régulier de spécialistes, traitements prescrits...",
    healthHistory: "Antécédents majeurs (hospitalisations, chirurgies) sous 5 ans ?",
    healthHistoryDesc: "Opérations chirurgicales ou longs séjours hospitaliers...",
    yes: "Oui",
    no: "Non",

    prefTitle: "Vos préférences & budget",
    prefSubtitle: "Dernière étape ! Ajustez votre budget mensuel et vos exigences pour que Fenny classe et optimise vos propositions.",
    servicePrefLabel: "Type de gestion de contrat",
    serviceOnline: "100% En ligne (Application, documents PDF)",
    serviceHuman: "Traditionnel (Réseau d'agences physiques)",
    serviceHybrid: "Hybride (Gestion App + conseiller dédié)",
    serviceImportanceLabel: "Priorité au service client",
    serviceLow: "Standard (Tous canaux numériques)",
    serviceMedium: "Élevé (Meilleurs retours satisfaction client)",
    serviceHigh: "Absolue (Remboursements rapides & assistance locale)",
    maxBudgetLabel: "Budget mensuel maximum visé",
    perMonth: "/ mois",
    prioLabel: "Votre objectif prioritaire",
    prioPrice: "Économie maximale",
    prioPriceDesc: "Priorité au tarif brut",
    prioCoverage: "Couverture maximale",
    prioCoverageDesc: "Remboursements LCA au top",
    prioReputation: "Satisfaction & Service",
    prioReputationDesc: "Assureur le mieux noté",
    prioFlexibility: "Flexibilité médicale",
    prioFlexibilityDesc: "Accès sans contrainte standard",

    verifyTitle: "Vérification de sécurité",
    verifySubtitle: "Avant d'accéder au comparatif officiel des caisses maladie 2026, veuillez valider vos coordonnées. Un code de sécurité unique vous sera envoyé gratuitement.",
    firstName: "Prénom *",
    lastName: "Nom *",
    email: "Adresse E-mail *",
    phone: "Téléphone Mobile Suisse *",
    consentCheckboxLabel: "J'accepte les conditions d'utilisation et la politique de confidentialité (nLPD), et je consens expressément à recevoir mon comparatif personnalisé gratuit et à être recontacté(e) sans engagement.",
    errConsentRequired: "Le consentement au traitement des données (nLPD) est obligatoire pour continuer.",
    sendCodeBtn: "Recevoir mon code de validation par E-mail",
    sendingCodeBtn: "Envoi du code e-mail en cours...",
    codeSentNotice: "💡 Code de sécurité envoyé par e-mail ! Veuillez vérifier la boîte de réception de",
    codeLabel: "Saisir le Code de Sécurité *",
    validateCodeBtn: "Valider le code & afficher les résultats",
    verifyingCodeBtn: "Vérification en cours...",
    modifyDetails: "Modifier mes coordonnées",
    fennyMessage: "Afin de valider votre dossier et de vous présenter les vraies primes certifiées 2026, un code de sécurité à 4 chiffres vient d'être généré et envoyé à l'adresse",

    backBtn: "Retour",
    continueBtn: "Continuer",
    verifyStepBtn: "Étape de vérification",
    pledgeFooter: "Fenny s'engage : 100% anonyme, conforme à la nLPD suisse, aucune revente de données.",
    embeddedTitle: "Simulez vos primes d'assurance maladie suisse avec Fenny",
    embeddedSubtitle: "Répondez à 5 questions simples en moins de 2 minutes. Notre algorithme indépendant compare l'intégralité des 37 caisses d'assurance maladie suisses agréées OFSP pour identifier le tarif le plus compétitif de votre canton.",
    embeddedStat1: "37 caisses agréées comparées (LAMal)",
    embeddedStat2: "Données officielles OFSP & Priminfo 2026",
    embeddedStat3: "100% gratuit, anonyme & conforme nLPD",
    embeddedBtn: "Lancer le comparateur maladie",
    resultsBadge: "Comparateur Officiel 2026",
    resultsTitle: "Comparez les primes d'assurance maladie suisse",
    resultsSubtitle: "Trouvez instantanément le tarif le plus avantageux et adapté à vos besoins réels.",
    questionOf: "Question {n} sur 7",
    actionFinal: "Action 7/7",
    percentComplete: "% complété",
    quitBtn: "Quitter",
    analyzingTitle: "Analyse comparative en cours...",
    analyzingDescPre: "Fenny interroge les bases de données officielles de l'",
    analyzingOfsp: "OFSP (OFAS) 2026",
    analyzingDescMid: " et compare en temps réel ",
    analyzing37: "37 caisses maladie",
    analyzingDescEnd: " pour la région de",
    comparingCompanies: "Compagnies en cours de comparaison :",
    fennyAdvises: "Fenny conseille",
    potentialSavingsLabel: "Économie potentielle :",
    upToLabel: "jusqu'à CHF",
    perYearLabel: "/ an",
    savingsGapDesc: "{ui.savingsGapDesc}",
    smartAdviceBadge: "Conseil Malin",
    cheapestLabel: "Le plus avantageux",
    netPriceLabel: "Prix total net 2026",
    notAvailableLabel: "Non disponible",
    envTaxLabel: "-5.15 CHF déduits (taxe environnementale)",
    sourceLabel: "Source : OFSP/priminfo, primes 2026",
    modelLabel: "Modèle :",
    getOfferBtn: "Obtenir l'offre",
    unavailableBtn: "Indisponible",
    complianceTitle: "Conformité Légale LAMal & Transparence :",
    complianceP1Title: "Prestations de base identiques :",
    complianceP1Body: "Les prestations de l'assurance obligatoire des soins (AOS) sont définies de manière univoque par la loi fédérale (LAMal). Elles sont strictement identiques auprès de toutes les caisses maladie suisses. Un traitement médical sera remboursé de la même manière, quel que soit l'assureur choisi. Seuls diffèrent la qualité administrative, l'ergonomie des outils de remboursement et l'indice de satisfaction.",
    complianceP2Title: "Origine des notes de satisfaction client (indices / 6) :",
    complianceP2Body: "Les notes affichées (exprimées sur l'échelle officielle helvétique de 1 à 6, où 6 est la note maximale) proviennent des enquêtes représentatives de satisfaction client (enquêtes 2025/2026). Ces notes mesurent la rapidité des remboursements, l'amabilité et la clarté des décomptes.",
    noResultsTitle: "Aucune offre trouvée pour cette combinaison",
    noResultsDesc: "Aucun tarif officiel n'est répertorié dans le registre fédéral pour le NPA {zip}, la franchise CHF {franchise}.- et le modèle sélectionné.",
    zipCodeLabel2: "Code Postal (NPA)",
    modelsLabel2: "Modèles d'assurance ({n}/4)",
    franchiseLabel2: "Franchise",
    supplementaryLabel2: "Assurances complémentaires",
    noneBaseOnly: "Aucune (uniquement base LAMal)",
    sortResultsLabel: "Trier les résultats",
    sortCheapest: "Primes les moins chères",
    sortSatisfaction: "Satisfaction client",
    sortAlpha: "Ordre alphabétique",
    yourSimLabel: "Votre simulation",
    modalIntroText: "Saisissez vos coordonnées pour recevoir votre dossier d'offre complet pour l'assurance obligatoire {insurer} en modèle {model}, Franchise CHF {franchise}.- dans le canton de {canton}.",
    firstNameLabel2: "Prénom *",
    firstNamePlaceholder2: "Ex: Marc",
    lastNameLabel2: "Nom de famille *",
    lastNamePlaceholder2: "Ex: Bernasconi",
    emailLabel2: "Adresse E-mail *",
    phoneLabel2: "Téléphone Mobile Suisse *",
    callbackLabel: "Quand préférez-vous être rappelé ?",
    callbackAnytime: "N'importe quand (9h00 - 18h00)",
    callbackMorning: "Le matin (9h00 - 12h00)",
    callbackLunch: "Pause déjeuner (12h00 - 14h00)",
    callbackAfternoon: "L'après-midi (14h00 - 17h00)",
    callbackEvening: "En fin de journée (17h00 - 19h00)",
    formErrorLabel: "{ui.formErrorLabel}",
    submitOfferBtn: "Valider ma demande gratuite",
    privacyNote2: "{ui.privacyNote2}",
    successTitle: "Demande transmise avec succès !",
    successBody: "Félicitations {firstName} ! Votre demande d'offre gratuite a bien été transmise à notre partenaire.",
    successFollowUp: "Un conseiller agréé indépendant va analyser votre dossier et vous contactera par téléphone d'ici quelques heures (créneau souhaité : {slot}). Votre prime finale est garantie neutre !",
    slotAnytime: "N'importe quand",
    slotMorning: "Matinée",
    slotLunch: "Pause déjeuner",
    slotAfternoon: "Après-midi",
    slotEvening: "Soirée",
    closeFormBtn: "Fermer la fenêtre",
    modelFamilyLabel2: "Médecin Famille",
    modelTelemedLabel2: "Télémédecine",
    modelHmoLabel2: "Réseau HMO",
    modelStandardLabel2: "Standard",
    constReminderTitle: "Rappel légal :",
    constReminderText: "En Suisse, toutes les caisses maladie proposent les mêmes prestations de base LAMal. Seule la prime mensuelle diffère.",
    chronicLabel: "Maladies chroniques",
    chronicDesc: "Diabète, hypertension, asthme, etc.",
    treatmentsLabel: "Traitements en cours",
    treatmentsDesc: "Suivi médical actif, médicaments réguliers.",
    historyLabel: "Antécédents médicaux",
    historyDesc: "Interventions chirurgicales, hospitalisations.",
    btnYes: "Oui",
    btnNo: "Non",
    managementTypeLabel: "Type de gestion préférée",
    mgmtOnline: "100% Digital",
    mgmtHybrid: "Hybride (digital + conseiller)",
    mgmtHuman: "Conseiller humain",
    clientServiceLabel: "Service clients",
    csHigh: "Excellent (5★)",
    csMedium: "Correct (3-4★)",
    csLow: "Basique (1-2★)",
    budgetLabel: "Budget mensuel maximal",
    budgetEco: "Économique",
    budgetPremium: "Premium",
    secTitle: "8. Étude personnalisée & Vérification",
    secSubtitle: "Saisissez vos coordonnées pour recevoir votre analyse comparative personnalisée et sécurisée.",
    firstNameLabel: "Prénom",
    firstNamePlaceholder: "Ex: Sophie",
    lastNameLabel: "Nom",
    lastNamePlaceholder: "Ex: Rochat",
    emailLabel: "Email",
    phoneLabel: "Téléphone",
    receiveCodeBtn: "Recevoir le code",
    codeSentTitle: "Code envoyé !",
    codeSentBody: "Un code à 4 chiffres a été envoyé à {email}.",
    enterCodeLabel: "Entrez le code à 4 chiffres",
    verifyingBtn: "Vérification...",
    editDetailsBtn: "Modifier mes coordonnées",
    verificationStepBtn: "Finaliser la comparaison",
    fennyMessageTitle: "Fenny confirme :",
    fennyMessageText: "Votre étude personnalisée est prête ! Vous allez recevoir un email récapitulatif à {email}.",
    yourEmail: "votre email",
    footerCommitment: "Fenny s'engage : 100% anonyme, conforme à la nLPD suisse, aucune revente de données.",
    errFillRequired: "Veuillez remplir tous les champs.",
    errSendingCode: "Erreur lors de l'envoi du code.",
    errContactServer: "Impossible de contacter le serveur.",
    errEnter4Digits: "Entrez un code à 4 chiffres.",
    errIncorrectCode: "Code incorrect. Réessayez.",
    errVerifyCode: "Erreur lors de la vérification.",
    mySituationTitle: "Ma situation actuelle",
    loadingLabel: "Chargement...",
    officialPremiumsLabel: "Primes Officielles",
    savingsCalcDesc: "Modifiez votre assureur actuel et votre prime payée pour recalculer instantanément vos économies réelles via la méthode",
    savingsCalcDescSuffix: ".",
    myInsurerLabel: "Mon assureur",
    myPremiumLabel: "Ma prime (CHF)",
    cantonResidenceLabel: "Canton de résidence :",
    zipCodeLabel: "Code postal / NPA :",
    premiumZoneLabel: "Zone de primes :",
    annualFranchiseLabel: "Franchise annuelle :",
    insuranceModelsLabel: "Modèles d'assurance :",
    accidentCoverageLabel: "Couverture Accident :",
    supplementaryLabel: "Complémentaires :",
    ageAdultLabel: "Adulte (26+)",
    ageYoungLabel: "Jeune (19-25)",
    ageChildLabel: "Enfant (0-18)",
    allModelsLabel: "Tous les modèles (4)",
    modelFamilyLabel: "Médecin famille",
    modelTelemedLabel: "Télémédecine",
    modelHmoLabel: "HMO",
    modelStandardLabel: "Standard",
    accidentIncludedLabel: "Oui, incluse",
    accidentExcludedLabel: "Non, exclue",
    basicInsuranceOnlyLabel: "Assurance de base uniquement",
    supEssentialLabel: "ESSENTIELLE",
    supConfortLabel: "CONFORT",
    supPremiumLabel: "PREMIUM",
    hideAdjustmentsLabel: "Masquer les ajustements",
    adjustFiltersLabel: "Ajuster les filtres directement",
  },
  de: {
    zipTitle: "Wie lautet Ihre Postleitzahl am Wohnort?",
    zipSubtitle: "Die Krankenkassenprämien hängen von Ihrer Postleitzahl ab (automatische Bestimmung der Prämienregion 1 oder 2, analog Priminfo).",
    zipLabel: "Geben Sie Ihre Schweizer Postleitzahl (PLZ) ein:",
    zipPlaceholder: "Z.B. 1007, 1201, 1950...",
    localityPrompt: "Präzisieren Sie Ihre Ortschaft für PLZ",
    cantonLabel: "Kanton:",
    localityLabel: "Ortschaft:",
    zoneLabel: "Prämienregion:",
    regionText: "Region",
    unresolvedZip: "Postleitzahl nicht erkannt. Bitte wählen Sie Ihren Kanton unten manuell aus.",
    enter4digits: "Geben Sie Ihre 4-stellige Postleitzahl ein.",
    cantonDirect: "Oder wählen Sie direkt einen Kanton:",

    personalTitle: "Persönliche Angaben",
    personalSubtitle: "Diese gesetzlichen Daten ermöglichen die genaue Anwendung der BAG-Tarife und die Risikoabschätzung für Zusatzversicherungen.",
    birthdateLabel: "Geburtsdatum der versicherten Person (TT.MM.JJJJ) *",
    birthdatePlaceholder: "Z.B. 28.05.1990",
    birthdateHint: "Geben Sie die 8 Ziffern Ihres Geburtsdatums ein. Sehr schnell auf dem Smartphone.",
    birthdateInvalid: "⚠️ Ungültiges oder unmögliches Datum",
    ageCategoryLabel: "Alterskategorie:",
    yearsOld: "Jahre",
    genderLabel: "Amtliches Geschlecht *",
    male: "Mann",
    female: "Frau",
    nationalityLabel: "Nationalität / Aufenthaltsbewilligung *",
    natSwiss: "Schweiz",
    natPermitC: "Bewilligung C (Niederlassung)",
    natPermitB: "Bewilligung B (Aufenthalt)",
    natOther: "Andere / Grenzgänger",
    categoryRecognized: "Erkannte Alterskategorie:",
    childCat: "Kind (0-18 Jahre)",
    youngCat: "Junger Erwachsener (19-25 Jahre)",
    adultCat: "Erwachsener (26+ Jahre)",

    situationTitle: "Ihre aktuelle Situation",
    situationSubtitle: "Die Angabe Ihres aktuellen Vertrags ermöglicht die exakte Berechnung Ihrer tatsächlichen Ersparnis.",
    hasInsurerQuestion: "Haben Sie bereits eine Krankenversicherung in der Schweiz? *",
    yesInsured: "Ja, bereits versichert",
    noInsured: "Nein, Neuzuzüger / Anderes",
    currentInsurer: "Aktueller Versicherer",
    monthlyPremium: "Gesamte Monatsprämie (CHF)",
    seniority: "Dauer bei diesem Versicherer",
    less2yrs: "< 2 Jahre",
    between2_5yrs: "2 bis 5 Jahre",
    more5yrs: "> 5 Jahre",
    nextTermination: "Nächste Kündigungsmöglichkeit",
    termNov: "30. November (Standard Jahresende)",
    termJune: "30. Juni (Nur Franchise 300 & Standard)",
    termUnknown: "Ich weiß nicht",

    lamalTitle: "Ihre Grundversicherung (KVG)",
    lamalSubtitle: "Die obligatorische Grundversicherung (KVG) bietet bei allen Kassen identische Leistungen. Nur Franchise und Modell bestimmen den Preis.",
    householdLabel: "Anzahl zu versichernder Personen",
    single: "Einzelperson",
    couple: "Paar",
    family: "Familie / Kinder",
    franchiseLabel: "Gewünschte Jahresfranchise",
    ecoMax: "Öko Max",
    secuMax: "Sicherheit Max",
    standard: "Standard",
    accidentLabel: "Unfalldeckung",
    accidentYes: "Ja, einschließen",
    accidentNo: "Nein, ausschließen",
    modelsLabel: "Versicherungsmodell(e) (KVG)",
    multipleChoice: "Mehrere Auswahlen möglich",
    modelFamily: "Hausarztmodell",
    modelFamilyDesc: "Erstkonsultation beim Hausarzt",
    modelTelemed: "Telemedizin (Telmed)",
    modelTelemedDesc: "Erstkontakt über medizinische Hotline",
    modelHmo: "HMO-Netzwerk",
    modelHmoDesc: "Behandlung in einem HMO-Zentrum",
    modelStandard: "Standard (Freie Arztwahl)",
    modelStandardDesc: "Direkter Zugang zu Spezialisten",

    lcaTitle: "Ihr Zusatzversicherungsbedarf (VVG)",
    lcaSubtitle: "Zusatzversicherungen decken Leistungen, die die KVG nicht übernimmt (Zahn, Komplementärmedizin, Spitalkomfort etc.).",
    lcaLevelLabel: "Gewünschtes Deckungsniveau",
    lcaNone: "KEINE VVG",
    lcaEssential: "ESSENZIELL",
    lcaConfort: "KOMFORT",
    lcaPremium: "PREMIUM",
    hospitalDivisionLabel: "Gewünschte Spitalabteilung",
    divCommune: "Allgemeine Abteilung",
    divSwiss: "Ganze Schweiz",
    divSemiPrivate: "Halbprivat (2-Bett)",
    divPrivate: "Privat (1-Bett)",
    ambulatoryNeedsLabel: "Spezifische ambulante Bedürfnisse auswählen:",
    needAltMed: "Komplementärmedizin",
    needAltMedDesc: "Osteopathie, Akupunktur...",
    needDental: "Zahnbehandlung",
    needDentalDesc: "Prophylaxe, Kieferorthopädie...",
    needSports: "Risikosportarten",
    needSportsDesc: "Skifahren, Flugsport, Tauchen...",
    needTravel: "Häufige Reisen",
    needTravelDesc: "Notfälle im Ausland...",
    needMaternity: "Mutterschaft / Schwangerschaft",
    needMaternityDesc: "Kinderwunsch oder bestehend",

    healthTitle: "Ihr aktueller Gesundheitszustand",
    healthSubtitle: "Für den Abschluss einer Zusatzversicherung (VVG) ist eine vereinfachte Gesundheitserklärung erforderlich.",
    healthReminder: "Verfassungsrechtlicher Hinweis: Die Grundversicherung (KVG) darf niemanden aufgrund seines Gesundheitszustands ablehnen.",
    healthChronic: "Chronische Krankheiten oder Langzeiterkrankungen?",
    healthChronicDesc: "Diabetes, Herzerkrankungen, schweres Asthma, Depression...",
    healthTreatment: "Laufende medizinische Behandlungen oder Medikamente?",
    healthTreatmentDesc: "Regelmäßige Facharztbesuche, verschriebene Therapien...",
    healthHistory: "Wichtige Vorerkrankungen (Spital, Operationen) der letzten 5 Jahre?",
    healthHistoryDesc: "Operative Eingriffe oder längere Spitalaufenthalte...",
    yes: "Ja",
    no: "Nein",

    prefTitle: "Ihre Präferenzen & Budget",
    prefSubtitle: "Letzter Schritt! Passen Sie Ihr Monatsbudget an, damit Fenny Ihre Angebote optimal sortiert.",
    servicePrefLabel: "Vertragsverwaltung",
    serviceOnline: "100% Online (App, PDF-Dokumente)",
    serviceHuman: "Traditionell (Physikalisches Agenturnetz)",
    serviceHybrid: "Hybrid (App + persönlicher Berater)",
    serviceImportanceLabel: "Kundenservice-Priorität",
    serviceLow: "Standard (Digitale Kanäle)",
    serviceMedium: "Hoch (Beste Kundenzufriedenheit)",
    serviceHigh: "Absolut (Schnelle Rückerstattung & Vor-Ort-Hilfe)",
    maxBudgetLabel: "Maximales Monatsbudget",
    perMonth: "/ Monat",
    prioLabel: "Ihr Hauptziel",
    prioPrice: "Maximale Ersparnis",
    prioPriceDesc: "Fokus auf die günstigste Prämie",
    prioCoverage: "Maximale Deckung",
    prioCoverageDesc: "Beste VVG-Rückerstattung",
    prioReputation: "Zufriedenheit & Service",
    prioReputationDesc: "Bestbewerteter Versicherer",
    prioFlexibility: "Medizinische Flexibilität",
    prioFlexibilityDesc: "Standard freie Wahl",

    verifyTitle: "Sicherheitsprüfung",
    verifySubtitle: "Bevor Sie auf den offiziellen Krankenkassenvergleich 2026 zugreifen, bestätigen Sie bitte Ihre Kontaktdaten.",
    firstName: "Vorname *",
    lastName: "Nachname *",
    email: "E-Mail-Adresse *",
    phone: "Schweizer Handynummer *",
    consentCheckboxLabel: "Ich akzeptiere die Nutzungsbedingungen und die Datenschutzerklärung (nDSG) und stimme ausdrücklich zu, meine kostenlose persönliche Vergleichsanalyse zu erhalten und unverbindlich kontaktiert zu werden.",
    errConsentRequired: "Die Zustimmung zur Datenverarbeitung (nDSG) ist erforderlich, um fortzufahren.",
    sendCodeBtn: "Bestätigungscode per E-Mail anfordern",
    sendingCodeBtn: "Code wird per E-Mail gesendet...",
    codeSentNotice: "💡 Sicherheitscode per E-Mail gesendet! Bitte prüfen Sie den Posteingang von",
    codeLabel: "Sicherheitscode eingeben *",
    validateCodeBtn: "Code bestätigen & Ergebnisse anzeigen",
    verifyingCodeBtn: "Überprüfung läuft...",
    modifyDetails: "Kontaktdaten ändern",
    fennyMessage: "Um Ihre Daten zu bestätigen und die echten zertifizierten Prämien 2026 anzuzeigen, wurde ein 4-stelliger Code gesendet an",

    backBtn: "Zurück",
    continueBtn: "Weiter",
    verifyStepBtn: "Überprüfungsschritt",
    pledgeFooter: "Fennys Versprechen: 100% anonym, nDSG-konform, kein Datenverkauf.",
    embeddedTitle: "Simulieren Sie Ihre Schweizer Krankenkassenprämien mit Fenny",
    embeddedSubtitle: "Beantworten Sie 5 einfache Fragen in weniger als 2 Minuten. Unser unabhängiger Algorithmus vergleicht alle 37 BAG-zugelassenen Schweizer Krankenkassen, um den günstigsten Tarif in Ihrem Kanton zu ermitteln.",
    embeddedStat1: "37 zugelassene Kassen verglichen (KVG)",
    embeddedStat2: "Offizielle BAG- & Priminfo-Daten 2026",
    embeddedStat3: "100% kostenlos, anonym & nDSG-konform",
    embeddedBtn: "Krankenkassenvergleich starten",
    resultsBadge: "Offizieller Vergleich 2026",
    resultsTitle: "Vergleichen Sie Schweizer Krankenkassenprämien",
    resultsSubtitle: "Finden Sie sofort den günstigsten Tarif, der zu Ihren tatsächlichen Bedürfnissen passt.",
    questionOf: "Frage {n} von 7",
    actionFinal: "Schritt 7/7",
    percentComplete: "% abgeschlossen",
    quitBtn: "Beenden",
    analyzingTitle: "Vergleichsanalyse läuft...",
    analyzingDescPre: "Fenny durchsucht die offiziellen Datenbanken des ",
    analyzingOfsp: "BAG (2026)",
    analyzingDescMid: " und vergleicht in Echtzeit ",
    analyzing37: "37 Krankenkassen",
    analyzingDescEnd: " für die Region",
    comparingCompanies: "Verglichene Versicherer:",
    fennyAdvises: "Fenny empfiehlt",
    potentialSavingsLabel: "Potenzielle Ersparnis:",
    upToLabel: "bis zu CHF",
    perYearLabel: "/ Jahr",
    savingsGapDesc: "Dies ist die durchschnittliche Differenz in Ihrem Kanton zwischen dem teuersten und dem günstigsten Angebot.",
    smartAdviceBadge: "Kluger Tipp",
    cheapestLabel: "Günstigstes Angebot",
    netPriceLabel: "Nettopreis 2026",
    notAvailableLabel: "Nicht verfügbar",
    envTaxLabel: "-5.15 CHF abgezogen (Umweltsteuer)",
    sourceLabel: "Quelle: BAG/priminfo, Prämien 2026",
    modelLabel: "Modell:",
    getOfferBtn: "Angebot erhalten",
    unavailableBtn: "Nicht verfügbar",
    complianceTitle: "KVG-Rechtskonformität & Transparenz:",
    complianceP1Title: "Identische Grundleistungen:",
    complianceP1Body: "Die Leistungen der obligatorischen Krankenpflegeversicherung (OKP) sind durch das Bundesgesetz (KVG) eindeutig definiert. Sie sind bei allen Schweizer Krankenkassen strikt identisch. Eine medizinische Behandlung wird unabhängig vom gewählten Versicherer gleich erstattet. Unterschiede bestehen nur in der Verwaltungsqualität, der Benutzerfreundlichkeit der Erstattungstools und dem Zufriedenheitsindex.",
    complianceP2Title: "Herkunft der Kundenzufriedenheitsbewertungen (Indizes / 6):",
    complianceP2Body: "Die angezeigten Bewertungen (auf der offiziellen Schweizer Skala von 1 bis 6, wobei 6 die Höchstnote ist) stammen aus repräsentativen Kundenzufriedenheitsumfragen (Umfragen 2025/2026). Diese Bewertungen messen die Schnelligkeit der Erstattungen, die Freundlichkeit und die Klarheit der Abrechnungen.",
    noResultsTitle: "Kein Angebot für diese Kombination gefunden",
    noResultsDesc: "Im Bundesregister sind für die PLZ {zip}, die Franchise CHF {franchise}.- und das gewählte Modell keine offiziellen Tarife hinterlegt.",
    zipCodeLabel2: "Postleitzahl (PLZ)",
    modelsLabel2: "Versicherungsmodelle ({n}/4)",
    franchiseLabel2: "Franchise",
    supplementaryLabel2: "Zusatzversicherungen",
    noneBaseOnly: "Keine (nur KVG-Grundversicherung)",
    sortResultsLabel: "Ergebnisse sortieren",
    sortCheapest: "Günstigste Prämien",
    sortSatisfaction: "Kundenzufriedenheit",
    sortAlpha: "Alphabetische Reihenfolge",
    yourSimLabel: "Ihre Simulation",
    modalIntroText: "Geben Sie Ihre Kontaktdaten ein, um Ihre vollständige Angebotsmappe für die obligatorische Versicherung {insurer} im Modell {model}, Franchise CHF {franchise}.- im Kanton {canton} zu erhalten.",
    firstNameLabel2: "Vorname *",
    firstNamePlaceholder2: "z.B. Marc",
    lastNameLabel2: "Nachname *",
    lastNamePlaceholder2: "z.B. Bernasconi",
    emailLabel2: "E-Mail-Adresse *",
    phoneLabel2: "Schweizer Mobiltelefon *",
    callbackLabel: "Wann möchten Sie zurückgerufen werden?",
    callbackAnytime: "Jederzeit (9:00 - 18:00)",
    callbackMorning: "Morgens (9:00 - 12:00)",
    callbackLunch: "Mittagspause (12:00 - 14:00)",
    callbackAfternoon: "Nachmittags (14:00 - 17:00)",
    callbackEvening: "Abends (17:00 - 19:00)",
    formErrorLabel: "Bitte füllen Sie alle Pflichtfelder aus.",
    submitOfferBtn: "Meine kostenlose Anfrage bestätigen",
    privacyNote2: "🔒 Verschlüsselte Daten. Kein Spam garantiert. nDSG-konform.",
    successTitle: "Anfrage erfolgreich übermittelt!",
    successBody: "Herzlichen Glückwunsch {firstName}! Ihre kostenlose Angebotsanfrage wurde erfolgreich an unseren Partner weitergeleitet.",
    successFollowUp: "Ein zugelassener unabhängiger Berater wird Ihre Unterlagen prüfen und Sie in Kürze telefonisch kontaktieren (gewünschtes Zeitfenster: {slot}). Ihre Endprämie ist neutral garantiert!",
    slotAnytime: "Jederzeit",
    slotMorning: "Vormittag",
    slotLunch: "Mittagspause",
    slotAfternoon: "Nachmittag",
    slotEvening: "Abend",
    closeFormBtn: "Fenster schliessen",
    modelFamilyLabel2: "Hausarzt",
    modelTelemedLabel2: "Telemedizin",
    modelHmoLabel2: "HMO-Netz",
    modelStandardLabel2: "Standard",
    constReminderTitle: "Rechtlicher Hinweis:",
    constReminderText: "In der Schweiz bieten alle Krankenkassen dieselben KVG-Grundleistungen an. Nur die monatliche Prämie unterscheidet sich.",
    chronicLabel: "Chronische Erkrankungen",
    chronicDesc: "Diabetes, Bluthochdruck, Asthma usw.",
    treatmentsLabel: "Laufende Behandlungen",
    treatmentsDesc: "Aktive medizinische Betreuung, regelmäßige Medikamente.",
    historyLabel: "Krankheitsgeschichte",
    historyDesc: "Operationen, Krankenhausaufenthalte.",
    btnYes: "Ja",
    btnNo: "Nein",
    managementTypeLabel: "Bevorzugter Verwaltungstyp",
    mgmtOnline: "100% Digital",
    mgmtHybrid: "Hybrid (digital + Berater)",
    mgmtHuman: "Persönlicher Berater",
    clientServiceLabel: "Kundendienst",
    csHigh: "Ausgezeichnet (5★)",
    csMedium: "Gut (3-4★)",
    csLow: "Einfach (1-2★)",
    budgetLabel: "Maximales Monatsbudget",
    budgetEco: "Günstig",
    budgetPremium: "Premium",
    secTitle: "8. Persönliche Studie & Verifizierung",
    secSubtitle: "Geben Sie Ihre Kontaktdaten ein, um Ihre personalisierte Vergleichsanalyse zu erhalten.",
    firstNameLabel: "Vorname",
    firstNamePlaceholder: "z.B. Sophie",
    lastNameLabel: "Nachname",
    lastNamePlaceholder: "z.B. Rochat",
    emailLabel: "E-Mail",
    phoneLabel: "Telefon",
    receiveCodeBtn: "Code erhalten",
    codeSentTitle: "Code gesendet!",
    codeSentBody: "Ein 4-stelliger Code wurde an {email} gesendet.",
    enterCodeLabel: "4-stelligen Code eingeben",
    verifyingBtn: "Prüfung...",
    editDetailsBtn: "Angaben bearbeiten",
    verificationStepBtn: "Vergleich abschließen",
    fennyMessageTitle: "Fenny bestätigt:",
    fennyMessageText: "Ihre persönliche Studie ist fertig! Sie erhalten eine Zusammenfassung per E-Mail an {email}.",
    yourEmail: "Ihre E-Mail",
    footerCommitment: "Fenny verpflichtet sich: 100% anonym, konform mit dem Schweizer nDSG, keine Datenweitergabe.",
    errFillRequired: "Bitte alle Felder ausfüllen.",
    errSendingCode: "Fehler beim Senden des Codes.",
    errContactServer: "Server nicht erreichbar.",
    errEnter4Digits: "Geben Sie einen 4-stelligen Code ein.",
    errIncorrectCode: "Falscher Code. Erneut versuchen.",
    errVerifyCode: "Fehler bei der Verifizierung.",
    mySituationTitle: "Meine aktuelle Situation",
    loadingLabel: "Wird geladen...",
    officialPremiumsLabel: "Offizielle Prämien",
    savingsCalcDesc: "Ändern Sie Ihren aktuellen Versicherer und Ihre bezahlte Prämie, um Ihre tatsächlichen Einsparungen sofort über die Methode",
    savingsCalcDescSuffix: " neu zu berechnen.",
    myInsurerLabel: "Meine Versicherung",
    myPremiumLabel: "Meine Prämie (CHF)",
    cantonResidenceLabel: "Wohnkanton:",
    zipCodeLabel: "PLZ:",
    premiumZoneLabel: "Prämienregion:",
    annualFranchiseLabel: "Jährliche Franchise:",
    insuranceModelsLabel: "Versicherungsmodelle:",
    accidentCoverageLabel: "Unfalldeckung:",
    supplementaryLabel: "Zusatzversicherungen:",
    ageAdultLabel: "Erwachsene (26+)",
    ageYoungLabel: "Junge (19-25)",
    ageChildLabel: "Kind (0-18)",
    allModelsLabel: "Alle Modelle (4)",
    modelFamilyLabel: "Hausarztmodell",
    modelTelemedLabel: "Telemedizin",
    modelHmoLabel: "HMO",
    modelStandardLabel: "Standard",
    accidentIncludedLabel: "Ja, inbegriffen",
    accidentExcludedLabel: "Nein, ausgeschlossen",
    basicInsuranceOnlyLabel: "Nur Grundversicherung",
    supEssentialLabel: "ESSENTIELLE",
    supConfortLabel: "COMFORT",
    supPremiumLabel: "PREMIUM",
    hideAdjustmentsLabel: "Anpassungen ausblenden",
    adjustFiltersLabel: "Filter direkt anpassen",
  },
  en: {
    zipTitle: "What is your residential postal code?",
    zipSubtitle: "Health insurance premiums depend on your postal code (automatic determination of premium region 1 or 2, same as Priminfo).",
    zipLabel: "Enter your Swiss postal code (ZIP):",
    zipPlaceholder: "Ex: 1007, 1201, 1950...",
    localityPrompt: "Please specify your locality for ZIP code",
    cantonLabel: "Canton:",
    localityLabel: "Locality:",
    zoneLabel: "Premium region:",
    regionText: "Region",
    unresolvedZip: "Postal code not identified. Please select your canton manually below.",
    enter4digits: "Enter your 4-digit postal code.",
    cantonDirect: "Or select a canton directly:",

    personalTitle: "Personal information",
    personalSubtitle: "These regulatory details apply exact official FOPH rate scales and estimate risks for supplementary insurance.",
    birthdateLabel: "Insured person's date of birth (DD.MM.YYYY) *",
    birthdatePlaceholder: "Ex: 28.05.1990",
    birthdateHint: "Enter the 8 digits of your birth date. Fast on mobile devices.",
    birthdateInvalid: "⚠️ Invalid or impossible date",
    ageCategoryLabel: "Age category:",
    yearsOld: "years",
    genderLabel: "Legal gender *",
    male: "Male",
    female: "Female",
    nationalityLabel: "Nationality / Residence permit *",
    natSwiss: "Swiss",
    natPermitC: "Permit C (Settlement)",
    natPermitB: "Permit B (Resident)",
    natOther: "Other / Cross-border",
    categoryRecognized: "Recognized age category:",
    childCat: "Child (0-18 yrs)",
    youngCat: "Young Adult (19-25 yrs)",
    adultCat: "Adult (26+ yrs)",

    situationTitle: "Your current situation",
    situationSubtitle: "Providing your current contract allows us to calculate your exact savings down to the cent.",
    hasInsurerQuestion: "Do you already have health insurance in Switzerland? *",
    yesInsured: "Yes, already insured",
    noInsured: "No, new resident / other",
    currentInsurer: "Current insurer",
    monthlyPremium: "Total monthly premium (CHF)",
    seniority: "Years with this insurer",
    less2yrs: "< 2 years",
    between2_5yrs: "2 to 5 years",
    more5yrs: "> 5 years",
    nextTermination: "Next cancellation date",
    termNov: "November 30 (Standard year-end)",
    termJune: "June 30 (Deductible 300 & standard only)",
    termUnknown: "I don't know",

    lamalTitle: "Your mandatory health insurance (LAMal)",
    lamalSubtitle: "Mandatory health insurance (LAMal) offers identical benefits across all insurers. Only deductible and care model affect the price.",
    householdLabel: "Number of persons to insure",
    single: "Single",
    couple: "Couple",
    family: "Family / Children",
    franchiseLabel: "Desired annual deductible",
    ecoMax: "Eco Max",
    secuMax: "Safety Max",
    standard: "Standard",
    accidentLabel: "Accident coverage",
    accidentYes: "Yes, include",
    accidentNo: "No, exclude",
    modelsLabel: "Care coordination model(s) (LAMal)",
    multipleChoice: "Multiple selections allowed",
    modelFamily: "General Practitioner (GP)",
    modelFamilyDesc: "Consult GP doctor first",
    modelTelemed: "Telemedicine (Telmed)",
    modelTelemedDesc: "Call medical hotline first",
    modelHmo: "HMO Network",
    modelHmoDesc: "Consult in an approved HMO center",
    modelStandard: "Standard (Free choice)",
    modelStandardDesc: "Direct access to specialists",

    lcaTitle: "Your supplementary needs (LCA)",
    lcaSubtitle: "Supplementary policies cover care not reimbursed by mandatory insurance (dental, alternative medicine, hospital comfort, etc.).",
    lcaLevelLabel: "Desired coverage level",
    lcaNone: "NO SUPPLEMENTARY",
    lcaEssential: "ESSENTIAL",
    lcaConfort: "COMFORT",
    lcaPremium: "PREMIUM",
    hospitalDivisionLabel: "Desired hospital room type",
    divCommune: "General Ward",
    divSwiss: "All Switzerland",
    divSemiPrivate: "Semi-Private (2 beds)",
    divPrivate: "Private (1 bed)",
    ambulatoryNeedsLabel: "Check your specific outpatient needs:",
    needAltMed: "Alternative medicine",
    needAltMedDesc: "Osteopathy, acupuncture...",
    needDental: "Dental care",
    needDentalDesc: "Hygiene, orthodontics...",
    needSports: "High-risk sports",
    needSportsDesc: "Skiing, air sports, diving...",
    needTravel: "Frequent travel",
    needTravelDesc: "Medical emergencies abroad...",
    needMaternity: "Maternity / Pregnancy",
    needMaternityDesc: "Planning or ongoing pregnancy",

    healthTitle: "Your current health status",
    healthSubtitle: "A simplified health questionnaire is required for supplementary coverage (LCA). These details are purely indicative.",
    healthReminder: "Constitutional reminder: Mandatory basic insurance (LAMal) can never reject anyone based on health status.",
    healthChronic: "Chronic conditions or long-term illnesses?",
    healthChronicDesc: "Diabetes, heart conditions, severe asthma, depression...",
    healthTreatment: "Ongoing medical treatments, therapy or medication?",
    healthTreatmentDesc: "Regular specialist care, prescribed therapies...",
    healthHistory: "Major medical history (hospitalization, surgery) in past 5 years?",
    healthHistoryDesc: "Surgeries or long hospital stays...",
    yes: "Yes",
    no: "No",

    prefTitle: "Your preferences & budget",
    prefSubtitle: "Last step! Adjust your monthly budget and preferences so Fenny can rank your top options.",
    servicePrefLabel: "Contract management type",
    serviceOnline: "100% Online (Mobile App, PDF files)",
    serviceHuman: "Traditional (Physical agency network)",
    serviceHybrid: "Hybrid (App + dedicated advisor)",
    serviceImportanceLabel: "Customer service priority",
    serviceLow: "Standard (All digital channels)",
    serviceMedium: "High (Top customer satisfaction)",
    serviceHigh: "Absolute (Fast reimbursements & local help)",
    maxBudgetLabel: "Target maximum monthly budget",
    perMonth: "/ month",
    prioLabel: "Your primary goal",
    prioPrice: "Maximum savings",
    prioPriceDesc: "Priority on lowest price",
    prioCoverage: "Maximum coverage",
    prioCoverageDesc: "Top supplementary coverage",
    prioReputation: "Satisfaction & Service",
    prioReputationDesc: "Highest rated fund",
    prioFlexibility: "Medical flexibility",
    prioFlexibilityDesc: "Standard free choice access",

    verifyTitle: "Security verification",
    verifySubtitle: "Before accessing the official 2026 health fund comparison, please confirm your contact details.",
    firstName: "First Name *",
    lastName: "Last Name *",
    email: "Email Address *",
    phone: "Swiss Mobile Number *",
    consentCheckboxLabel: "I accept the terms of use and privacy policy (nLPD/FADP), and I expressly consent to receiving my free personalized comparison and being contacted without obligation.",
    errConsentRequired: "Consent to data processing (nLPD) is mandatory to continue.",
    sendCodeBtn: "Receive validation code by Email",
    sendingCodeBtn: "Sending email code...",
    codeSentNotice: "💡 Security code sent by email! Please check the inbox of",
    codeLabel: "Enter Security Code *",
    validateCodeBtn: "Validate code & view results",
    verifyingCodeBtn: "Verifying...",
    modifyDetails: "Modify my contact details",
    fennyMessage: "To validate your file and present certified 2026 premiums, a 4-digit code was sent to",

    backBtn: "Back",
    continueBtn: "Continue",
    verifyStepBtn: "Verification step",
    pledgeFooter: "Fenny's pledge: 100% anonymous, Swiss FADP compliant, zero data reselling.",
    embeddedTitle: "Simulate your Swiss health insurance premiums with Fenny",
    embeddedSubtitle: "Answer 5 simple questions in under 2 minutes. Our independent algorithm compares all 37 BAG-approved Swiss health insurers to find the most competitive rate in your canton.",
    embeddedStat1: "37 approved insurers compared (LAMal)",
    embeddedStat2: "Official FOPH & Priminfo 2026 data",
    embeddedStat3: "100% free, anonymous & Swiss nDPA compliant",
    embeddedBtn: "Launch health insurance comparator",
    resultsBadge: "Official 2026 Comparator",
    resultsTitle: "Compare Swiss health insurance premiums",
    resultsSubtitle: "Instantly find the best rate suited to your actual needs.",
    questionOf: "Question {n} of 7",
    actionFinal: "Action 7/7",
    percentComplete: "% complete",
    quitBtn: "Quit",
    analyzingTitle: "Comparative analysis in progress...",
    analyzingDescPre: "Fenny is querying the official ",
    analyzingOfsp: "FOPH (2026)",
    analyzingDescMid: " databases and comparing ",
    analyzing37: "37 health insurers",
    analyzingDescEnd: " in real time for the region",
    comparingCompanies: "Companies being compared:",
    fennyAdvises: "Fenny recommends",
    potentialSavingsLabel: "Potential savings:",
    upToLabel: "up to CHF",
    perYearLabel: "/ year",
    savingsGapDesc: "This is the average gap observed in your canton between the most expensive and the most competitive offer.",
    smartAdviceBadge: "Smart Tip",
    cheapestLabel: "Best value",
    netPriceLabel: "Net price 2026",
    notAvailableLabel: "Not available",
    envTaxLabel: "-CHF 5.15 deducted (environmental tax)",
    sourceLabel: "Source: FOPH/priminfo, 2026 premiums",
    modelLabel: "Model:",
    getOfferBtn: "Get offer",
    unavailableBtn: "Unavailable",
    complianceTitle: "LAMal Legal Compliance & Transparency:",
    complianceP1Title: "Identical basic benefits:",
    complianceP1Body: "The benefits of compulsory health insurance (OKP) are unambiguously defined by federal law (LAMal). They are strictly identical across all Swiss health insurers. A medical treatment will be reimbursed in the same way regardless of the insurer chosen. Differences only exist in administrative quality, reimbursement tool usability and satisfaction index.",
    complianceP2Title: "Origin of customer satisfaction ratings (indices / 6):",
    complianceP2Body: "The ratings shown (on the official Swiss scale of 1 to 6, where 6 is the maximum) come from representative customer satisfaction surveys (2025/2026 surveys). These ratings measure reimbursement speed, friendliness and billing clarity.",
    noResultsTitle: "No offer found for this combination",
    noResultsDesc: "No official rate is listed in the federal register for ZIP {zip}, deductible CHF {franchise}.- and the selected model.",
    zipCodeLabel2: "ZIP Code (NPA)",
    modelsLabel2: "Insurance models ({n}/4)",
    franchiseLabel2: "Deductible",
    supplementaryLabel2: "Supplementary insurance",
    noneBaseOnly: "None (basic LAMal only)",
    sortResultsLabel: "Sort results",
    sortCheapest: "Cheapest premiums",
    sortSatisfaction: "Customer satisfaction",
    sortAlpha: "Alphabetical order",
    yourSimLabel: "Your simulation",
    modalIntroText: "Enter your contact details to receive your complete offer file for compulsory insurance {insurer} in model {model}, deductible CHF {franchise}.- in the canton of {canton}.",
    firstNameLabel2: "First name *",
    firstNamePlaceholder2: "e.g. Marc",
    lastNameLabel2: "Last name *",
    lastNamePlaceholder2: "e.g. Bernasconi",
    emailLabel2: "Email address *",
    phoneLabel2: "Swiss mobile phone *",
    callbackLabel: "When do you prefer to be called back?",
    callbackAnytime: "Anytime (9:00 AM - 6:00 PM)",
    callbackMorning: "Morning (9:00 AM - 12:00 PM)",
    callbackLunch: "Lunch break (12:00 - 2:00 PM)",
    callbackAfternoon: "Afternoon (2:00 - 5:00 PM)",
    callbackEvening: "Late afternoon (5:00 - 7:00 PM)",
    formErrorLabel: "Please fill in all required fields.",
    submitOfferBtn: "Submit my free request",
    privacyNote2: "🔒 Encrypted data. No spam guaranteed. nFADP compliant.",
    successTitle: "Request successfully submitted!",
    successBody: "Congratulations {firstName}! Your free offer request has been successfully forwarded to our partner.",
    successFollowUp: "A licensed independent advisor will review your file and contact you by phone within a few hours (preferred slot: {slot}). Your final premium is guaranteed neutral!",
    slotAnytime: "Anytime",
    slotMorning: "Morning",
    slotLunch: "Lunch break",
    slotAfternoon: "Afternoon",
    slotEvening: "Evening",
    closeFormBtn: "Close window",
    modelFamilyLabel2: "Family doctor",
    modelTelemedLabel2: "Telemedicine",
    modelHmoLabel2: "HMO network",
    modelStandardLabel2: "Standard",
    constReminderTitle: "Legal reminder:",
    constReminderText: "In Switzerland, all health insurers offer the same mandatory LAMal benefits. Only the monthly premium differs.",
    chronicLabel: "Chronic conditions",
    chronicDesc: "Diabetes, hypertension, asthma, etc.",
    treatmentsLabel: "Ongoing treatments",
    treatmentsDesc: "Active medical follow-up, regular medications.",
    historyLabel: "Medical history",
    historyDesc: "Surgeries, hospitalizations.",
    btnYes: "Yes",
    btnNo: "No",
    managementTypeLabel: "Preferred management type",
    mgmtOnline: "100% Digital",
    mgmtHybrid: "Hybrid (digital + advisor)",
    mgmtHuman: "Personal advisor",
    clientServiceLabel: "Customer service",
    csHigh: "Excellent (5★)",
    csMedium: "Good (3-4★)",
    csLow: "Basic (1-2★)",
    budgetLabel: "Maximum monthly budget",
    budgetEco: "Budget",
    budgetPremium: "Premium",
    secTitle: "8. Personalized Study & Verification",
    secSubtitle: "Enter your contact details to receive your personalized and secure comparison analysis.",
    firstNameLabel: "First name",
    firstNamePlaceholder: "e.g. Sophie",
    lastNameLabel: "Last name",
    lastNamePlaceholder: "e.g. Rochat",
    emailLabel: "Email",
    phoneLabel: "Phone",
    receiveCodeBtn: "Receive code",
    codeSentTitle: "Code sent!",
    codeSentBody: "A 4-digit code was sent to {email}.",
    enterCodeLabel: "Enter the 4-digit code",
    verifyingBtn: "Verifying...",
    editDetailsBtn: "Edit my details",
    verificationStepBtn: "Finalize comparison",
    fennyMessageTitle: "Fenny confirms:",
    fennyMessageText: "Your personalized study is ready! You will receive a summary email at {email}.",
    yourEmail: "your email",
    footerCommitment: "Fenny commits: 100% anonymous, compliant with Swiss nFADP, no data resale.",
    errFillRequired: "Please fill in all fields.",
    errSendingCode: "Error sending the code.",
    errContactServer: "Unable to reach the server.",
    errEnter4Digits: "Enter a 4-digit code.",
    errIncorrectCode: "Incorrect code. Please try again.",
    errVerifyCode: "Error during verification.",
    mySituationTitle: "My current situation",
    loadingLabel: "Loading...",
    officialPremiumsLabel: "Official Premiums",
    savingsCalcDesc: "Change your current insurer and premium paid to instantly recalculate your real savings using the",
    savingsCalcDescSuffix: " method.",
    myInsurerLabel: "My insurer",
    myPremiumLabel: "My premium (CHF)",
    cantonResidenceLabel: "Canton of residence:",
    zipCodeLabel: "ZIP / Postcode:",
    premiumZoneLabel: "Premium zone:",
    annualFranchiseLabel: "Annual deductible:",
    insuranceModelsLabel: "Insurance models:",
    accidentCoverageLabel: "Accident coverage:",
    supplementaryLabel: "Supplementary:",
    ageAdultLabel: "Adult (26+)",
    ageYoungLabel: "Young adult (19-25)",
    ageChildLabel: "Child (0-18)",
    allModelsLabel: "All models (4)",
    modelFamilyLabel: "Family doctor",
    modelTelemedLabel: "Telemedicine",
    modelHmoLabel: "HMO",
    modelStandardLabel: "Standard",
    accidentIncludedLabel: "Yes, included",
    accidentExcludedLabel: "No, excluded",
    basicInsuranceOnlyLabel: "Basic insurance only",
    supEssentialLabel: "ESSENTIAL",
    supConfortLabel: "COMFORT",
    supPremiumLabel: "PREMIUM",
    hideAdjustmentsLabel: "Hide adjustments",
    adjustFiltersLabel: "Adjust filters directly",
  },
  it: {
    zipTitle: "Qual è il tuo codice postale di residenza?",
    zipSubtitle: "I premi dell'assicurazione malattia dipendono dal tuo codice postale (determinazione automatica della regione di premio 1 o 2, identica a Priminfo).",
    zipLabel: "Inserisci il tuo codice postale svizzero (NPA):",
    zipPlaceholder: "Es: 1007, 1201, 1950...",
    localityPrompt: "Specifica la tua località per il NPA",
    cantonLabel: "Cantone:",
    localityLabel: "Località:",
    zoneLabel: "Zona premi:",
    regionText: "Regione",
    unresolvedZip: "Codice postale non identificato. Seleziona manualmente il tuo cantone qui sotto.",
    enter4digits: "Inserisci il tuo codice postale di 4 cifre.",
    cantonDirect: "Oppure seleziona direttamente un cantone:",

    personalTitle: "Informazioni personali",
    personalSubtitle: "Questi dati normativi consentono di applicare le tariffe legali dell'UFSP e stimare i rischi per le complementari.",
    birthdateLabel: "Data di nascita dell'assicurato (GG.MM.AAAA) *",
    birthdatePlaceholder: "Es: 28.05.1990",
    birthdateHint: "Inserisci le 8 cifre della tua data di nascita. Molto veloce su mobile.",
    birthdateInvalid: "⚠️ Data non valida o impossibile",
    ageCategoryLabel: "Categoria d'età:",
    yearsOld: "anni",
    genderLabel: "Sesso legale *",
    male: "Uomo",
    female: "Donna",
    nationalityLabel: "Nazionalità / Permesso di soggiorno *",
    natSwiss: "Svizzera",
    natPermitC: "Permesso C (Domicilio)",
    natPermitB: "Permesso B (Dimora)",
    natOther: "Altro / Frontaliero",
    categoryRecognized: "Categoria d'età riconosciuta:",
    childCat: "Bambino (0-18 anni)",
    youngCat: "Giovane Adulto (19-25 anni)",
    adultCat: "Adulto (26+ anni)",

    situationTitle: "La tua situazione attuale",
    situationSubtitle: "Inserire il tuo contratto attuale ci permette di calcolare al centesimo i risparmi reali.",
    hasInsurerQuestion: "Hai già un'assicurazione malattia in Svizzera? *",
    yesInsured: "Sì, già assicurato",
    noInsured: "No, nuovo residente / altro",
    currentInsurer: "Assicuratore attuale",
    monthlyPremium: "Premio mensile totale (CHF)",
    seniority: "Anni presso questo assicuratore",
    less2yrs: "< 2 anni",
    between2_5yrs: "da 2 a 5 anni",
    more5yrs: "> 5 anni",
    nextTermination: "Prossima disdetta possibile",
    termNov: "30 Novembre (Fine anno standard)",
    termJune: "30 Giugno (Solo franchigia 300 e standard)",
    termUnknown: "Non so",

    lamalTitle: "La tua assicurazione di base (LAMal)",
    lamalSubtitle: "L'assicurazione obbligatoria di base (LAMal) offre prestazioni identiche in tutte le casse. Solo la franchigia e il modello influiscono sul prezzo.",
    householdLabel: "Numero di persone da assicurare",
    single: "Singolo",
    couple: "Coppia",
    family: "Famiglia / Figli",
    franchiseLabel: "Franchigia annuale desiderata",
    ecoMax: "Eco Max",
    secuMax: "Sicurezza Max",
    standard: "Standard",
    accidentLabel: "Copertura infortuni",
    accidentYes: "Sì, includi",
    accidentNo: "No, escludi",
    modelsLabel: "Modello/i di coordinamento delle cure (LAMal)",
    multipleChoice: "Scelte multiple possibili",
    modelFamily: "Medico di Famiglia",
    modelFamilyDesc: "Prima consultazione dal medico curante",
    modelTelemed: "Telemedicina (Telmed)",
    modelTelemedDesc: "Prima chiamata alla hotline medica",
    modelHmo: "Rete HMO",
    modelHmoDesc: "Consultazione in un centro HMO",
    modelStandard: "Standard (Libera scelta)",
    modelStandardDesc: "Accesso diretto agli specialisti",

    lcaTitle: "Le tue esigenze complementari (LCA)",
    lcaSubtitle: "Le complementari rimborsano le cure non coperte dalla LAMal (dentista, medicine naturali, comfort ospedaliero, ecc.).",
    lcaLevelLabel: "Livello di copertura desiderato",
    lcaNone: "NESSUNA LCA",
    lcaEssential: "ESSENZIALE",
    lcaConfort: "COMFORT",
    lcaPremium: "PREMIUM",
    hospitalDivisionLabel: "Reparto ospedaliero desiderato",
    divCommune: "Reparto Comune",
    divSwiss: "Tutta la Svizzera",
    divSemiPrivate: "Semi-Privato (2 letti)",
    divPrivate: "Privato (1 letto)",
    ambulatoryNeedsLabel: "Seleziona le tue esigenze ambulatoriali specifiche:",
    needAltMed: "Medicine naturali",
    needAltMedDesc: "Osteopatia, agopuntura...",
    needDental: "Cure dentarie",
    needDentalDesc: "Igiene, ortodonzia...",
    needSports: "Sport a rischio",
    needSportsDesc: "Sci, sport aerei, immersioni...",
    needTravel: "Viaggi frequenti",
    needTravelDesc: "Emergenze all'estero...",
    needMaternity: "Maternità / Gravidanza",
    needMaternityDesc: "Pianificata o in corso",

    healthTitle: "Il tuo stato di salute attuale",
    healthSubtitle: "Per un'assicurazione complementare (LCA) è richiesto un questionario medico semplificato.",
    healthReminder: "Richiamo costituzionale: L'assicurazione di base (LAMal) non può mai rifiutare un assicurato per lo stato di salute.",
    healthChronic: "Malattie croniche o patologie a lungo termine?",
    healthChronicDesc: "Diabete, cardiopatie, asma grave, depressione...",
    healthTreatment: "Cure mediche, terapie o farmaci in corso?",
    healthTreatmentDesc: "Visite specialistiche regolari, terapie prescritte...",
    healthHistory: "Antecedenti importanti (ricoveri, interventi) negli ultimi 5 anni?",
    healthHistoryDesc: "Interventi chirurgici o lunghi degenze...",
    yes: "Sì",
    no: "No",

    prefTitle: "Le tue preferenze e budget",
    prefSubtitle: "Ultimo passaggio! Regola il tuo budget mensile affinché Fenny possa classificare al meglio le proposte.",
    servicePrefLabel: "Gestione del contratto",
    serviceOnline: "100% Online (App mobile, documenti PDF)",
    serviceHuman: "Tradizionale (Rete di agenzie fisiche)",
    serviceHybrid: "Ibrido (App + consulente dedicato)",
    serviceImportanceLabel: "Priorità al servizio clienti",
    serviceLow: "Standard (Tutti i canali digitali)",
    serviceMedium: "Elevato (Migliori valutazioni clienti)",
    serviceHigh: "Assoluta (Rimborsi rapidi & assistenza locale)",
    maxBudgetLabel: "Budget mensile massimo desiderato",
    perMonth: "/ mese",
    prioLabel: "Il tuo obiettivo principale",
    prioPrice: "Risparmio massimo",
    prioPriceDesc: "Priorità al prezzo più basso",
    prioCoverage: "Copertura massima",
    prioCoverageDesc: "Rimborsi LCA al top",
    prioReputation: "Soddisfazione & Servizio",
    prioReputationDesc: "Assicuratore con la migliore valutazione",
    prioFlexibility: "Flessibilità medica",
    prioFlexibilityDesc: "Accesso standard senza vincoli",

    verifyTitle: "Verifica di sicurezza",
    verifySubtitle: "Prima di accedere al confronto ufficiale delle casse malati 2026, conferma i tuoi dati di contatto.",
    firstName: "Nome *",
    lastName: "Cognome *",
    email: "Indirizzo E-mail *",
    phone: "Numero di cellulare svizzero *",
    consentCheckboxLabel: "Accetto le condizioni d'uso e l'informativa sulla privacy (nLPD), e acconsento espressamente a ricevere il mio confronto personalizzato gratuito e ad essere ricontattato(a) senza impegno.",
    errConsentRequired: "Il consenso al trattamento dei dati (nLPD) è obbligatorio per continuare.",
    sendCodeBtn: "Ricevi il codice di verifica via E-mail",
    sendingCodeBtn: "Invio codice in corso...",
    codeSentNotice: "💡 Codice di sicurezza inviato via e-mail! Controlla la casella di posta di",
    codeLabel: "Inserisci il Codice di Sicurezza *",
    validateCodeBtn: "Conferma codice e mostra risultati",
    verifyingCodeBtn: "Verifica in corso...",
    modifyDetails: "Modifica i miei dati",
    fennyMessage: "Per convalidare la tua richiesta e mostrare i premi certificati 2026, è stato inviato un codice a 4 cifre a",

    backBtn: "Indietro",
    continueBtn: "Continua",
    verifyStepBtn: "Passaggio di verifica",
    pledgeFooter: "Impegno di Fenny: 100% anonimo, conforme alla nLPD svizzera, nessuna rivendita dati.",
    embeddedTitle: "Simula i tuoi premi dell'assicurazione malattia svizzera con Fenny",
    embeddedSubtitle: "Rispondi a 5 semplici domande in meno di 2 minuti. Il nostro algoritmo indipendente confronta tutte le 37 casse malati svizzere autorizzate dall'UFSP per trovare la tariffa più conveniente nel tuo cantone.",
    embeddedStat1: "37 casse autorizzate confrontate (LAMal)",
    embeddedStat2: "Dati ufficiali UFSP e Priminfo 2026",
    embeddedStat3: "100% gratuito, anonimo e conforme alla nLPD",
    embeddedBtn: "Avvia il comparatore casse malati",
    resultsBadge: "Comparatore Ufficiale 2026",
    resultsTitle: "Confronta i premi dell'assicurazione malattia svizzera",
    resultsSubtitle: "Trova immediatamente la tariffa più vantaggiosa e adatta alle tue reali esigenze.",
    questionOf: "Domanda {n} su 7",
    actionFinal: "Passo 7/7",
    percentComplete: "% completato",
    quitBtn: "Esci",
    analyzingTitle: "Analisi comparativa in corso...",
    analyzingDescPre: "Fenny consulta i database ufficiali dell'",
    analyzingOfsp: "UFSP (2026)",
    analyzingDescMid: " e confronta in tempo reale ",
    analyzing37: "37 casse malati",
    analyzingDescEnd: " per la regione",
    comparingCompanies: "Compagnie in fase di confronto:",
    fennyAdvises: "Fenny consiglia",
    potentialSavingsLabel: "Risparmio potenziale:",
    upToLabel: "fino a CHF",
    perYearLabel: "/ anno",
    savingsGapDesc: "Questo è il divario medio osservato nel tuo cantone tra l'offerta più cara e quella più competitiva.",
    smartAdviceBadge: "Consiglio Furbo",
    cheapestLabel: "Il più vantaggioso",
    netPriceLabel: "Prezzo netto 2026",
    notAvailableLabel: "Non disponibile",
    envTaxLabel: "-CHF 5.15 dedotti (tassa ambientale)",
    sourceLabel: "Fonte: UFSP/priminfo, premi 2026",
    modelLabel: "Modello:",
    getOfferBtn: "Ottieni l'offerta",
    unavailableBtn: "Non disponibile",
    complianceTitle: "Conformità LAMal e Trasparenza:",
    complianceP1Title: "Prestazioni di base identiche:",
    complianceP1Body: "Le prestazioni dell'assicurazione malattia obbligatoria (AMal) sono definite in modo univoco dalla legge federale (LAMal). Sono strettamente identiche presso tutte le casse malati svizzere. Un trattamento medico sarà rimborsato allo stesso modo indipendentemente dall'assicuratore scelto. Le differenze riguardano solo la qualità amministrativa, l'ergonomia degli strumenti di rimborso e l'indice di soddisfazione.",
    complianceP2Title: "Origine delle valutazioni di soddisfazione del cliente (indici / 6):",
    complianceP2Body: "Le valutazioni mostrate (espresse sulla scala ufficiale svizzera da 1 a 6, dove 6 è il punteggio massimo) provengono da sondaggi rappresentativi sulla soddisfazione dei clienti (sondaggi 2025/2026). Queste valutazioni misurano la rapidità dei rimborsi, la cortesia e la chiarezza dei rendiconti.",
    noResultsTitle: "Nessuna offerta trovata per questa combinazione",
    noResultsDesc: "Nessuna tariffa ufficiale è registrata nel registro federale per il NPA {zip}, la franchigia CHF {franchise}.- e il modello selezionato.",
    zipCodeLabel2: "Codice postale (NPA)",
    modelsLabel2: "Modelli assicurativi ({n}/4)",
    franchiseLabel2: "Franchigia",
    supplementaryLabel2: "Assicurazioni complementari",
    noneBaseOnly: "Nessuna (solo base LAMal)",
    sortResultsLabel: "Ordina i risultati",
    sortCheapest: "Premi più economici",
    sortSatisfaction: "Soddisfazione del cliente",
    sortAlpha: "Ordine alfabetico",
    yourSimLabel: "La tua simulazione",
    modalIntroText: "Inserisci i tuoi dati di contatto per ricevere il dossier completo dell'offerta per l'assicurazione obbligatoria {insurer} nel modello {model}, franchigia CHF {franchise}.- nel cantone di {canton}.",
    firstNameLabel2: "Nome *",
    firstNamePlaceholder2: "Es: Marco",
    lastNameLabel2: "Cognome *",
    lastNamePlaceholder2: "Es: Bernasconi",
    emailLabel2: "Indirizzo e-mail *",
    phoneLabel2: "Cellulare svizzero *",
    callbackLabel: "Quando preferisci essere richiamato?",
    callbackAnytime: "In qualsiasi momento (9:00 - 18:00)",
    callbackMorning: "Mattina (9:00 - 12:00)",
    callbackLunch: "Pausa pranzo (12:00 - 14:00)",
    callbackAfternoon: "Pomeriggio (14:00 - 17:00)",
    callbackEvening: "Tarda giornata (17:00 - 19:00)",
    formErrorLabel: "Compila tutti i campi obbligatori.",
    submitOfferBtn: "Invia la mia richiesta gratuita",
    privacyNote2: "🔒 Dati crittografati. Nessuno spam garantito. Conforme alla nLPD.",
    successTitle: "Richiesta trasmessa con successo!",
    successBody: "Congratulazioni {firstName}! La tua richiesta di offerta gratuita è stata trasmessa con successo al nostro partner.",
    successFollowUp: "Un consulente indipendente abilitato analizzerà il tuo dossier e ti contatterà telefonicamente entro poche ore (fascia oraria preferita: {slot}). Il tuo premio finale è garantito neutro!",
    slotAnytime: "In qualsiasi momento",
    slotMorning: "Mattina",
    slotLunch: "Pausa pranzo",
    slotAfternoon: "Pomeriggio",
    slotEvening: "Sera",
    closeFormBtn: "Chiudi la finestra",
    modelFamilyLabel2: "Medico di famiglia",
    modelTelemedLabel2: "Telemedicina",
    modelHmoLabel2: "Rete HMO",
    modelStandardLabel2: "Standard",
    constReminderTitle: "Promemoria legale:",
    constReminderText: "In Svizzera, tutte le casse malati offrono le stesse prestazioni di base LAMal. Solo il premio mensile varia.",
    chronicLabel: "Malattie croniche",
    chronicDesc: "Diabete, ipertensione, asma, ecc.",
    treatmentsLabel: "Trattamenti in corso",
    treatmentsDesc: "Seguito medico attivo, farmaci regolari.",
    historyLabel: "Precedenti medici",
    historyDesc: "Interventi chirurgici, ricoveri ospedalieri.",
    btnYes: "Sì",
    btnNo: "No",
    managementTypeLabel: "Tipo di gestione preferita",
    mgmtOnline: "100% Digitale",
    mgmtHybrid: "Ibrido (digitale + consulente)",
    mgmtHuman: "Consulente personale",
    clientServiceLabel: "Servizio clienti",
    csHigh: "Eccellente (5★)",
    csMedium: "Buono (3-4★)",
    csLow: "Base (1-2★)",
    budgetLabel: "Budget mensile massimo",
    budgetEco: "Economico",
    budgetPremium: "Premium",
    secTitle: "8. Studio personalizzato e verifica",
    secSubtitle: "Inserisci i tuoi dati di contatto per ricevere la tua analisi comparativa personalizzata.",
    firstNameLabel: "Nome",
    firstNamePlaceholder: "Es: Sophie",
    lastNameLabel: "Cognome",
    lastNamePlaceholder: "Es: Rochat",
    emailLabel: "Email",
    phoneLabel: "Telefono",
    receiveCodeBtn: "Ricevi il codice",
    codeSentTitle: "Codice inviato!",
    codeSentBody: "Un codice a 4 cifre è stato inviato a {email}.",
    enterCodeLabel: "Inserisci il codice a 4 cifre",
    verifyingBtn: "Verifica...",
    editDetailsBtn: "Modifica i miei dati",
    verificationStepBtn: "Finalizza il confronto",
    fennyMessageTitle: "Fenny conferma:",
    fennyMessageText: "Il tuo studio personalizzato è pronto! Riceverai un'email riepilogativa a {email}.",
    yourEmail: "la tua email",
    footerCommitment: "Fenny si impegna: 100% anonimo, conforme alla nLPD svizzera, nessuna rivendita di dati.",
    errFillRequired: "Compila tutti i campi.",
    errSendingCode: "Errore durante l'invio del codice.",
    errContactServer: "Impossibile contattare il server.",
    errEnter4Digits: "Inserisci un codice a 4 cifre.",
    errIncorrectCode: "Codice errato. Riprova.",
    errVerifyCode: "Errore durante la verifica.",
    mySituationTitle: "La mia situazione attuale",
    loadingLabel: "Caricamento...",
    officialPremiumsLabel: "Premi Ufficiali",
    savingsCalcDesc: "Modifica il tuo assicuratore attuale e il premio pagato per ricalcolare istantaneamente i tuoi risparmi reali tramite il metodo",
    savingsCalcDescSuffix: ".",
    myInsurerLabel: "Il mio assicuratore",
    myPremiumLabel: "Il mio premio (CHF)",
    cantonResidenceLabel: "Cantone di residenza:",
    zipCodeLabel: "NPA / CAP:",
    premiumZoneLabel: "Zona premi:",
    annualFranchiseLabel: "Franchigia annuale:",
    insuranceModelsLabel: "Modelli assicurativi:",
    accidentCoverageLabel: "Copertura infortuni:",
    supplementaryLabel: "Complementari:",
    ageAdultLabel: "Adulto (26+)",
    ageYoungLabel: "Giovane (19-25)",
    ageChildLabel: "Bambino (0-18)",
    allModelsLabel: "Tutti i modelli (4)",
    modelFamilyLabel: "Medico di famiglia",
    modelTelemedLabel: "Telemedicina",
    modelHmoLabel: "HMO",
    modelStandardLabel: "Standard",
    accidentIncludedLabel: "Sì, inclusa",
    accidentExcludedLabel: "No, esclusa",
    basicInsuranceOnlyLabel: "Solo assicurazione di base",
    supEssentialLabel: "ESSENZIALE",
    supConfortLabel: "COMFORT",
    supPremiumLabel: "PREMIUM",
    hideAdjustmentsLabel: "Nascondi le regolazioni",
    adjustFiltersLabel: "Regola i filtri direttamente",
  },

  es: {
    zipTitle: "¿Cuál es tu código postal de residencia?",
    zipSubtitle: "Las primas del seguro de enfermedad dependen de tu código postal (determinación automática de la región de prima 1 o 2, idéntica a Priminfo).",
    zipLabel: "Introduce tu código postal suizo (NPA):",
    zipPlaceholder: "Ej: 1007, 1201, 1950...",
    localityPrompt: "Especifica tu localidad para el NPA",
    cantonLabel: "Cantón:",
    localityLabel: "Localidad:",
    ageTitle: "¿Cuál es tu situación?",
    ageSubtitle: "La edad determina la categoría de prima aplicada por la LAMal.",
    adultLabel: "Adulto (26+ años)",
    youngAdultLabel: "Joven adulto (19-25 años)",
    childLabel: "Niño (0-18 años)",
    birthDateLabel: "Fecha de nacimiento (opcional, para mayor precisión):",
    franchiseTitle: "¿Cuál es tu franquicia anual?",
    franchiseSubtitle: "Con una franquicia más alta ahorras en primas pero pagas más en caso de enfermedad.",
    modelTitle: "¿Qué modelo de atención prefieres?",
    modelSubtitle: "Cada modelo ofrece un precio diferente a cambio de ciertas obligaciones de itinerario médico.",
    accidentTitle: "¿Tu seguro incluye cobertura de accidentes?",
    accidentSubtitle: "Si eres asalariado(a) más de 8h/semana, tu empleador ya te cubre los accidentes (LAA). Puedes excluir esta cobertura y ahorrar.",
    accidentYesLabel: "Sí, cobertura de accidentes incluida",
    accidentNoLabel: "No, excluyo los accidentes (asalariado(a) LAA)",
    continueBtn: "Continuar",
    backBtn: "Atrás",
    showOffersBtn: "Ver mis ofertas",
    analyzingTitle: "Fenny analiza las mejores ofertas...",
    fennyAdvises: "Fenny te aconseja",
    resultsTitle: "Las mejores ofertas para tu perfil",
    resultsSubtitle: "Clasificadas por precio. Las prestaciones básicas obligatorias (LAMal) son idénticas para todos los seguradores.",
    monthlyLabel: "/ mes",
    yearlyLabel: "/ año",
    savingsVsCurrentLabel: "Ahorro vs. tu caja actual",
    currentPremiumLabel: "Tu prima actual (CHF/mes):",
    noCurrentPremiumLabel: "No tengo prima actual",
    potentialSavingsLabel: "Ahorro potencial estimado:",
    perYearLabel: "/ año",
    yourCurrentCaisseLabel: "Tu caja actual:",
    switchCaissePrompt: "¿Cambiarías de caja para ahorrar?",
    supplementaryTitle: "¿Y los seguros complementarios?",
    supplementarySubtitle: "Las prestaciones básicas son idénticas para todos. Los complementarios añaden confort (habitación privada, dentista, gafas...).",
    supplementaryEssentialTitle: "ESENCIAL",
    supplementaryConfortTitle: "CONFORT",
    supplementaryPremiumTitle: "PREMIUM",
    contactTitle: "Obtén tu análisis personalizado",
    contactSubtitle: "Fenny prepara un informe detallado con los mejores seguros para tu perfil.",
    firstNameLabel: "Nombre *",
    lastNameLabel: "Apellido *",
    phoneLabel: "Teléfono *",
    emailLabel: "E-mail *",
    firstNamePlaceholder: "Tu nombre",
    lastNamePlaceholder: "Tu apellido",
    phonePlaceholder: "+41 79 000 00 00",
    emailPlaceholder: "tu@email.com",
    submitBtn: "Obtener mi análisis gratuito",
    privacyNote: "🔒 Datos protegidos conforme a la nLPD suiza.",
    restartBtn: "Volver a empezar",
    errFillRequired: "Por favor, rellena todos los campos obligatorios.",
    errSendingCode: "Error al enviar el código de verificación.",
    errContactServer: "No se puede contactar con el servidor.",
    sendingCodeBtn: "Enviando...",
    receiveCodeBtn: "Recibir mi código por e-mail",
    codeSentTitle: "¡Código enviado!",
    codeSentBody: "Introduce el código de 4 dígitos enviado a {email}.",
    enterCodeLabel: "Código de seguridad *",
    errEnter4Digits: "Introduce el código de 4 dígitos.",
    errIncorrectCode: "Código incorrecto.",
    errVerifyCode: "Error al verificar el código.",
    verifyingBtn: "Verificando...",
    validateCodeBtn: "Validar y ver resultados",
    editDetailsBtn: "Modificar mis datos",
    simulationSavedTitle: "¡Simulación guardada!",
    thankYouMessage: "Gracias. Te contactaremos en 24 horas.",
    fennyQuoteResults: "¡He encontrado las mejores ofertas para tu perfil suizo!",
    noResultsTitle: "Sin resultados",
    noResultsDesc: "No se han encontrado ofertas para este perfil. Prueba con otros criterios.",
    officialDataBadge: "Datos OFSP & Priminfo 2026",
    sortByPrice: "Precio",
    sortByRating: "Valoración",
    filterLabel: "Filtrar",
    allModelsLabel: "Todos los modelos (4)",
    modelFamilyLabel: "Médico de familia",
    modelTelemedLabel: "Telemedicina",
    modelHmoLabel: "HMO",
    modelStandardLabel: "Estándar",
    accidentIncludedLabel: "Sí, incluida",
    accidentExcludedLabel: "No, excluida",
    basicInsuranceOnlyLabel: "Solo seguro básico",
    supEssentialLabel: "ESENCIAL",
    supConfortLabel: "CONFORT",
    supPremiumLabel: "PREMIUM",
    hideAdjustmentsLabel: "Ocultar ajustes",
    adjustFiltersLabel: "Ajustar filtros directamente",
  },

  pt: {
    zipTitle: "Qual é o seu código postal de residência?",
    zipSubtitle: "Os prémios do seguro de saúde dependem do seu código postal (determinação automática da região de prémio 1 ou 2, idêntica à Priminfo).",
    zipLabel: "Introduza o seu código postal suíço (NPA):",
    zipPlaceholder: "Ex: 1007, 1201, 1950...",
    localityPrompt: "Especifique a sua localidade para o NPA",
    cantonLabel: "Cantão:",
    localityLabel: "Localidade:",
    ageTitle: "Qual é a sua situação?",
    ageSubtitle: "A idade determina a categoria de prémio aplicada pela LAMal.",
    adultLabel: "Adulto (26+ anos)",
    youngAdultLabel: "Jovem adulto (19-25 anos)",
    childLabel: "Criança (0-18 anos)",
    birthDateLabel: "Data de nascimento (opcional, para maior precisão):",
    franchiseTitle: "Qual é a sua franquia anual?",
    franchiseSubtitle: "Com uma franquia mais alta poupa em prémios mas paga mais em caso de doença.",
    modelTitle: "Que modelo de cuidados prefere?",
    modelSubtitle: "Cada modelo oferece um preço diferente em troca de certas obrigações de itinerário médico.",
    accidentTitle: "O seu seguro inclui cobertura de acidentes?",
    accidentSubtitle: "Se for assalariado(a) mais de 8h/semana, o seu empregador já o cobre para acidentes (LAA). Pode excluir esta cobertura e poupar.",
    accidentYesLabel: "Sim, cobertura de acidentes incluída",
    accidentNoLabel: "Não, excluo os acidentes (assalariado(a) LAA)",
    continueBtn: "Continuar",
    backBtn: "Voltar",
    showOffersBtn: "Ver as minhas ofertas",
    analyzingTitle: "Fenny analisa as melhores ofertas...",
    fennyAdvises: "Fenny aconselha",
    resultsTitle: "As melhores ofertas para o seu perfil",
    resultsSubtitle: "Classificadas por preço. As prestações básicas obrigatórias (LAMal) são idênticas para todos os seguradores.",
    monthlyLabel: "/ mês",
    yearlyLabel: "/ ano",
    savingsVsCurrentLabel: "Poupança vs. a sua caixa atual",
    currentPremiumLabel: "O seu prémio atual (CHF/mês):",
    noCurrentPremiumLabel: "Não tenho prémio atual",
    potentialSavingsLabel: "Poupança potencial estimada:",
    perYearLabel: "/ ano",
    yourCurrentCaisseLabel: "A sua caixa atual:",
    switchCaissePrompt: "Mudaria de caixa para poupar?",
    supplementaryTitle: "E os seguros complementares?",
    supplementarySubtitle: "As prestações básicas são idênticas para todos. Os complementares acrescentam conforto (quarto privado, dentista, óculos...).",
    supplementaryEssentialTitle: "ESSENCIAL",
    supplementaryConfortTitle: "CONFORTO",
    supplementaryPremiumTitle: "PREMIUM",
    contactTitle: "Obtenha a sua análise personalizada",
    contactSubtitle: "Fenny prepara um relatório detalhado com os melhores seguros para o seu perfil.",
    firstNameLabel: "Primeiro nome *",
    lastNameLabel: "Apelido *",
    phoneLabel: "Telefone *",
    emailLabel: "E-mail *",
    firstNamePlaceholder: "O seu primeiro nome",
    lastNamePlaceholder: "O seu apelido",
    phonePlaceholder: "+41 79 000 00 00",
    emailPlaceholder: "o-seu@email.com",
    submitBtn: "Obter a minha análise gratuita",
    privacyNote: "🔒 Dados protegidos conforme à nLPD suíça.",
    restartBtn: "Recomeçar",
    errFillRequired: "Por favor, preencha todos os campos obrigatórios.",
    errSendingCode: "Erro ao enviar o código de verificação.",
    errContactServer: "Não é possível contactar o servidor.",
    sendingCodeBtn: "A enviar...",
    receiveCodeBtn: "Receber o meu código por e-mail",
    codeSentTitle: "Código enviado!",
    codeSentBody: "Introduza o código de 4 dígitos enviado para {email}.",
    enterCodeLabel: "Código de segurança *",
    errEnter4Digits: "Introduza o código de 4 dígitos.",
    errIncorrectCode: "Código incorreto.",
    errVerifyCode: "Erro ao verificar o código.",
    verifyingBtn: "A verificar...",
    validateCodeBtn: "Validar e ver resultados",
    editDetailsBtn: "Modificar os meus dados",
    simulationSavedTitle: "Simulação guardada!",
    thankYouMessage: "Obrigado. Contactar-lo-emos em 24 horas.",
    fennyQuoteResults: "Encontrei as melhores ofertas para o seu perfil suíço!",
    noResultsTitle: "Sem resultados",
    noResultsDesc: "Não foram encontradas ofertas para este perfil. Tente outros critérios.",
    officialDataBadge: "Dados OFSP & Priminfo 2026",
    sortByPrice: "Preço",
    sortByRating: "Avaliação",
    filterLabel: "Filtrar",
    allModelsLabel: "Todos os modelos (4)",
    modelFamilyLabel: "Médico de família",
    modelTelemedLabel: "Telemedicina",
    modelHmoLabel: "HMO",
    modelStandardLabel: "Standard",
    accidentIncludedLabel: "Sim, incluída",
    accidentExcludedLabel: "Não, excluída",
    basicInsuranceOnlyLabel: "Apenas seguro básico",
    supEssentialLabel: "ESSENCIAL",
    supConfortLabel: "CONFORTO",
    supPremiumLabel: "PREMIUM",
    hideAdjustmentsLabel: "Ocultar ajustes",
    adjustFiltersLabel: "Ajustar filtros diretamente",
  }
};

const CANTON_DEFAULT_ZIPS: Record<string, { zip: string; zone: number }> = {
  GE: { zip: '1201', zone: 1 },
  VD: { zip: '1000', zone: 1 },
  VS: { zip: '1950', zone: 1 },
  NE: { zip: '2000', zone: 1 },
  FR: { zip: '1700', zone: 1 },
  JU: { zip: '2800', zone: 1 },
  BE: { zip: '3000', zone: 1 },
  ZH: { zip: '8000', zone: 1 },
  BS: { zip: '4000', zone: 1 },
  TI: { zip: '6900', zone: 1 }
};

interface HealthComparatorProps {
  isEmbedded?: boolean;
  initialCanton?: string;
  onStartQuiz?: () => void;
  onGoHome?: () => void;
}

const HEALTH_ADVICE_MAP = {
  firstName: "Votre prénom permettra d'éditer une offre personnalisée.",
  lastName: "Votre nom est nécessaire pour la personnalisation des documents officiels.",
  email: "L'adresse e-mail recevra votre comparatif détaillé.",
  phone: "Numéro de téléphone suisse pour valider la demande.",
};

export default function HealthComparator({ isEmbedded = false, initialCanton, onStartQuiz, onGoHome }: HealthComparatorProps) {
  const { language } = useLanguage();
  const ui = { ...HEALTH_UI_TEXTS.fr, ...(HEALTH_UI_TEXTS[language] || {}) };

  const handleExitQuiz = () => {
    if (onGoHome) {
      onGoHome();
    } else if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  const startCanton = initialCanton && CANTON_DEFAULT_ZIPS[initialCanton] ? initialCanton : 'GE';
  const startZip = CANTON_DEFAULT_ZIPS[startCanton]?.zip || '1201';
  const startZone = CANTON_DEFAULT_ZIPS[startCanton]?.zone || 1;

  // 1. Core State
  const [filters, setFilters] = useState<HealthFilterState>({
    canton: startCanton,
    zipCode: startZip,
    zone: startZone,
    ageCategory: 'adult',
    franchise: 2500,
    model: 'all',
    selectedModels: ['family', 'telemed', 'hmo', 'standard'],
    accidentCoverage: true,
    sortBy: 'price',
    supplementaryType: 'none',
  });

  const toggleModel = (modelId: string) => {
    setFilters((prev) => {
      const current = prev.selectedModels && prev.selectedModels.length > 0
        ? prev.selectedModels
        : ['family', 'telemed', 'hmo', 'standard'];
      let updated: string[];
      if (current.includes(modelId)) {
        if (current.length > 1) {
          updated = current.filter((m) => m !== modelId);
        } else {
          updated = ['family', 'telemed', 'hmo', 'standard'];
        }
      } else {
        updated = [...current, modelId];
      }
      return {
        ...prev,
        selectedModels: updated,
        model: updated.length === 4 ? 'all' : (updated[0] as any),
      };
    });
  };

  const [zipInput, setZipInput] = useState<string>('1201');
  const [resolvedInfo, setResolvedInfo] = useState<{ zip: string; canton: string; zone: number; city: string } | null>(() => resolveZipCode('1201'));
  const [ambiguousData, setAmbiguousData] = useState<NpaLookupResult | null>(null);
  const [selectedLocality, setSelectedLocality] = useState<string | null>(null);
  const [selectedRegionCode, setSelectedRegionCode] = useState<string | null>(null);

  // Handler for zip code input change
  const handleZipChange = async (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 4);
    setZipInput(clean);
    setSelectedLocality(null);
    setSelectedRegionCode(null);

    if (clean.length === 4) {
      const npaRes = await fetchNpaInfo(clean);
      if (npaRes && npaRes.success) {
        if (npaRes.ambiguous) {
          setAmbiguousData(npaRes);
          setResolvedInfo(null);
        } else {
          setAmbiguousData(null);
          const zoneNum = parseInt(npaRes.premium_region || '1', 10) || 1;
          setResolvedInfo({
            zip: clean,
            canton: npaRes.canton || 'VD',
            zone: zoneNum,
            city: npaRes.locality || ''
          });
          setFilters(prev => ({
            ...prev,
            zipCode: clean,
            canton: npaRes.canton || 'VD',
            zone: zoneNum
          }));
        }
      } else {
        const info = resolveZipCode(clean);
        if (info) {
          setResolvedInfo(info);
          setFilters(prev => ({
            ...prev,
            zipCode: clean,
            canton: info.canton,
            zone: info.zone
          }));
        } else {
          setResolvedInfo(null);
        }
      }
    } else {
      setResolvedInfo(null);
      setAmbiguousData(null);
    }
  };

  const handleSelectLocality = (locItem: { locality: string; canton: string; premium_region: string; premium_region_code: string }) => {
    const zoneNum = parseInt(locItem.premium_region, 10) || 1;
    setSelectedLocality(locItem.locality);
    setSelectedRegionCode(locItem.premium_region);
    setResolvedInfo({
      zip: zipInput,
      canton: locItem.canton,
      zone: zoneNum,
      city: locItem.locality
    });
    setFilters(prev => ({
      ...prev,
      zipCode: zipInput,
      canton: locItem.canton,
      zone: zoneNum
    }));
  };

  // Handler for manual canton button click
  const handleCantonClick = (cantonCode: string) => {
    const defaults = CANTON_DEFAULT_ZIPS[cantonCode] || { zip: '1201', zone: 1 };
    setZipInput(defaults.zip);
    const info = resolveZipCode(defaults.zip);
    setResolvedInfo(info);
    setFilters(prev => ({
      ...prev,
      canton: cantonCode,
      zipCode: defaults.zip,
      zone: defaults.zone
    }));
  };

  // Local state for formatted typing birthday input (JJ.MM.AAAA)
  const [typedBirthDate, setTypedBirthDate] = useState<string>(() => {
    if (filters.birthDate) {
      const parts = filters.birthDate.split('-');
      if (parts.length === 3) {
        return `${parts[2]}.${parts[1]}.${parts[0]}`;
      }
    }
    return '';
  });

  const parseSwissToIso = (swissDate: string): string | null => {
    const parts = swissDate.split('.');
    if (parts.length === 3) {
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      if (day.length === 2 && month.length === 2 && year.length === 4) {
        const d = parseInt(day, 10);
        const m = parseInt(month, 10);
        const y = parseInt(year, 10);
        if (d >= 1 && d <= 31 && m >= 1 && m <= 12 && y >= 1900 && y <= 2026) {
          return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
      }
    }
    return null;
  };

  const handleBirthDateTypedChange = (val: string) => {
    // Only keep numbers
    const digits = val.replace(/\D/g, '').slice(0, 8);
    
    // Auto-format as DD.MM.YYYY
    let formatted = '';
    if (digits.length > 0) {
      formatted += digits.substring(0, 2);
    }
    if (digits.length > 2) {
      formatted += '.' + digits.substring(2, 4);
    }
    if (digits.length > 4) {
      formatted += '.' + digits.substring(4, 8);
    }
    
    setTypedBirthDate(formatted);
    
    if (digits.length === 8) {
      const iso = parseSwissToIso(formatted);
      if (iso) {
        handleBirthDateChange(iso);
      } else {
        // Clear birthDate if invalid to prevent progression
        handleFilterChange('birthDate', undefined);
      }
    } else {
      // Clear birthDate if incomplete
      handleFilterChange('birthDate', undefined);
    }
  };

  const parsedBirthDateInfo = useMemo(() => {
    if (!filters.birthDate) return null;
    const parts = filters.birthDate.split('-');
    if (parts.length !== 3) return null;
    const year = parseInt(parts[0], 10);
    const age = new Date().getFullYear() - year;
    let label = 'Adulte (26+)';
    if (age <= 18) label = 'Enfant (0-18)';
    else if (age <= 25) label = 'Jeune (19-25)';
    return { age, label };
  }, [filters.birthDate]);

  // Helper to handle birth date changes and auto-calculate legal age category
  const handleBirthDateChange = (dateVal: string) => {
    handleFilterChange('birthDate', dateVal);
    if (dateVal) {
      const birthYear = new Date(dateVal).getFullYear();
      const currentYear = 2026;
      const age = currentYear - birthYear;
      let category: 'adult' | 'young' | 'child' = 'adult';
      if (age <= 18) {
        category = 'child';
        if (filters.franchise > 600) {
          handleFilterChange('franchise', 0);
        }
      } else if (age <= 25) {
        category = 'young';
        if (filters.franchise < 300) {
          handleFilterChange('franchise', 2500);
        }
      } else {
        category = 'adult';
        if (filters.franchise < 300) {
          handleFilterChange('franchise', 2500);
        }
      }
      handleFilterChange('ageCategory', category);
    }
  };

  // GSAP animated progress bar refs
  const progressBarRef = useRef<HTMLDivElement>(null);
  const globalProgressBarRef = useRef<HTMLDivElement>(null);
  const modalProgressRef = useRef<HTMLDivElement>(null);

  // Feny advice tooltip state
  const [fenyAdvice, setFenyAdvice] = useState<string | null>(null);
  const fenyHelperRef = useRef<HTMLDivElement>(null);

  // UI state for the step-by-step wizard
  const [quizMode, setQuizMode] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStage, setAnalysisStage] = useState<number>(0);
  const [showFiltersInline, setShowFiltersInline] = useState<boolean>(false);

  // SMS & Email verification states
  const [verificationStep, setVerificationStep] = useState<'details' | 'code'>('details');
  const [verificationCodeInput, setVerificationCodeInput] = useState<string>('');
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [isSendingCode, setIsSendingCode] = useState<boolean>(false);
  const [verificationToken, setVerificationToken] = useState<string | null>(null);
  const [consentAccepted, setConsentAccepted] = useState<boolean>(false);
  const [modalConsentAccepted, setModalConsentAccepted] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;

    if (isAnalyzing) {
      setAnalysisStage(0);
      intervalId = setInterval(() => {
        setAnalysisStage(prev => (prev < 4 ? prev + 1 : prev));
      }, 1200);

      timeoutId = setTimeout(() => {
        setIsAnalyzing(false);
        setQuizMode(false);
        teleportToTop();
      }, 5000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isAnalyzing]);

  // Modal contact form state
  const [selectedCaisse, setSelectedCaisse] = useState<CaisseMaladie | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    timeSlot: 'anytime',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Real premiums fetched from the backend (priminfo.admin.ch)
  const [realPremiums, setRealPremiums] = useState<any[]>([]);
  const [loadingReal, setLoadingReal] = useState<boolean>(false);

  // User's current premium details
  const [currentCaisseId, setCurrentCaisseId] = useState<string>('1562');
  const [currentPremiumInput, setCurrentPremiumInput] = useState<number>(0);
  const [userHasEditedCurrentPremium, setUserHasEditedCurrentPremium] = useState<boolean>(false);

  // Fetch real-time official premiums from backend when filters change
  useEffect(() => {
    let active = true;
    const fetchPremiums = async () => {
      if (!filters.zipCode || filters.zipCode.length !== 4) return;
      setLoadingReal(true);
      try {
        const birthYear = filters.birthDate ? new Date(filters.birthDate).getFullYear() : undefined;
        const results = await fetchOfficialPremiums({
          zipCode: filters.zipCode,
          franchise: filters.franchise,
          ageCategory: filters.ageCategory,
          yob: birthYear && !isNaN(birthYear) ? birthYear : undefined,
          accidentCoverage: filters.accidentCoverage,
          model: filters.model,
          locality: selectedLocality || undefined,
          region: selectedRegionCode || undefined
        });

        if (active) {
          setRealPremiums(results);

          // Automatically set user's default current premium to their matched current caisse rate if they haven't modified it manually
          const matchedCurrent = results.find(
            (rp: any) => rp.insurerId === currentCaisseId && rp.modelType === filters.model
          ) || results.find(
            (rp: any) => rp.insurerId === currentCaisseId
          );

          if (matchedCurrent && !userHasEditedCurrentPremium) {
            // Cut 5.15 CHF environmental tax deduction
            const netCurrent = Math.max(0, Math.round((matchedCurrent.premium - 5.15) * 100) / 100);
            setCurrentPremiumInput(netCurrent);
          }
        }
      } catch (err) {
        console.error("[HealthComparator] Failed to fetch premiums:", err);
      } finally {
        if (active) setLoadingReal(false);
      }
    };

    fetchPremiums();
    return () => {
      active = false;
    };
  }, [filters.zipCode, filters.franchise, filters.ageCategory, filters.birthDate, filters.accidentCoverage, currentCaisseId, filters.model, filters.selectedModels, selectedLocality, selectedRegionCode]);

  // Computed premiums list: Return ALL matching offers for ALL insurers matching selected models
  const calculatedResults = useMemo(() => {
    let rawOffers: any[] = [];

    if (realPremiums && realPremiums.length > 0) {
      const activeModels = filters.selectedModels && filters.selectedModels.length > 0
        ? filters.selectedModels
        : ['family', 'telemed', 'hmo', 'standard'];

      const matchingReal = realPremiums.filter((rp) => activeModels.includes(rp.modelType));

      rawOffers = matchingReal.map((rp) => {
        const caisseMeta = CAISSES_MALADIE.find((c) => c.id === rp.insurerId) || {
          id: rp.insurerId,
          name: rp.insurerName,
          rating: 5.0,
          ratingStars: 5,
          logo: rp.insurerId,
          basePrice: 0,
          isPartner: false,
          notes: ui.sourceLabel,
        };

        // Requirement: "for the prices of the offers you show the prime price i want you to show the total price it means you must cut 5.15 for all prices"
        const netPremium = Math.max(0, rp.premium - 5.15);

        return {
          id: `${rp.insurerId}-${rp.modelType}-${rp.modelName.replace(/\s+/g, '_')}-${rp.premium}`,
          insurerId: rp.insurerId,
          name: rp.insurerName,
          rating: caisseMeta.rating,
          ratingStars: caisseMeta.ratingStars,
          logo: rp.insurerId,
          isPartner: caisseMeta.isPartner,
          notes: caisseMeta.notes,
          computedPremium: netPremium,
          rawPremium: rp.premium,
          realModelName: rp.modelName,
          modelType: rp.modelType,
          isRealData: true,
        };
      });
    }

    // Sort results
    if (filters.sortBy === 'price') {
      rawOffers.sort((a, b) => a.computedPremium - b.computedPremium);
    } else if (filters.sortBy === 'rating') {
      rawOffers.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'name') {
      rawOffers.sort((a, b) => a.name.localeCompare(b.name));
    }

    return rawOffers;
  }, [filters, realPremiums]);

  // Best/Cheapest caisse for visual highlights
  const bestValueCaisse = useMemo(() => {
    const validResults = calculatedResults.filter(r => r.computedPremium > 0);
    if (validResults.length === 0) return null;
    return validResults[0];
  }, [calculatedResults]);

  // Dynamic individual savings computation using the calculateSavings function
  const estimatedSavings = useMemo(() => {
    const validResults = calculatedResults.filter(r => r.computedPremium > 0);
    if (validResults.length === 0) return 0;
    const cheapestPremium = validResults[0].computedPremium;
    
    // If the user hasn't input or got a valid current premium, fall back to the highest premium
    const current = currentPremiumInput > 0 
      ? currentPremiumInput 
      : validResults[validResults.length - 1].computedPremium;

    return calculateSavings(current, cheapestPremium);
  }, [calculatedResults, currentPremiumInput]);

  const handleFilterChange = <K extends keyof HealthFilterState>(key: K, value: HealthFilterState[K]) => {
    setFilters((prev) => {
      const updated = { ...prev, [key]: value };
      
      // If age category changes, adjust franchise to valid default
      if (key === 'ageCategory') {
        if (value === 'child') {
          updated.franchise = 0;
        } else if (prev.ageCategory === 'child') {
          updated.franchise = 2500;
        }
      }
      return updated;
    });
  };

  const handleOpenForm = (caisse: CaisseMaladie) => {
    setSelectedCaisse(caisse);
    setFormSubmitted(false);
    setFormError(null);
    setModalConsentAccepted(false);
    teleportToTop();
  };

  const handleCloseForm = () => {
    setSelectedCaisse(null);
    setFormError(null);
    setModalConsentAccepted(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setFormError(ui.formErrorLabel);
      return;
    }
    if (!modalConsentAccepted) {
      setFormError(ui.errConsentRequired || "Le consentement au traitement des données (nLPD) est obligatoire.");
      return;
    }
    setFormError(null);
    
    try {
      await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'health',
          lead: formData,
          filters: filters,
          caisse: selectedCaisse
        })
      });
    } catch (err) {
      console.error("[SubmitError]", err);
    }

    setFormSubmitted(true);
  };

  // Next step handler in wizard
  const nextStep = () => {
    if (currentStep < 8) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Prev step handler in wizard
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Selected canton info helper
  const selectedCantonName = useMemo(() => {
    return SWISS_CANTONS.find(c => c.code === filters.canton)?.name || filters.canton;
  }, [filters.canton]);

  // 1. GSAP-driven Progress Bar Animation for Wizard & Global
  useEffect(() => {
    const percentage = quizMode ? Math.min(100, (currentStep / 7) * 100) : 100;
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${percentage}%`,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
    if (globalProgressBarRef.current) {
      gsap.to(globalProgressBarRef.current, {
        width: `${percentage}%`,
        duration: 0.6,
        ease: 'power2.out'
      });
    }
  }, [currentStep, quizMode]);

  // Set Feny advice automatically based on active step in quiz mode
  useEffect(() => {
    if (quizMode) {
      const adviceMap = HEALTH_ADVICE_MAPS[language] || HEALTH_ADVICE_MAPS.fr;
      if (currentStep === 1) setFenyAdvice(adviceMap.canton);
      else if (currentStep === 2) setFenyAdvice(adviceMap.personalInfo);
      else if (currentStep === 3) setFenyAdvice(adviceMap.currentSituation);
      else if (currentStep === 4) setFenyAdvice(adviceMap.lamal);
      else if (currentStep === 5) setFenyAdvice(adviceMap.lcaBesoins);
      else if (currentStep === 6) setFenyAdvice(adviceMap.healthDeclaration);
      else if (currentStep === 7) setFenyAdvice(adviceMap.preferences);
    } else {
      setFenyAdvice(null);
    }
  }, [currentStep, quizMode, language]);

  // 2. GSAP-driven Contact Form Progress Bar Animation inside Modal
  const completedFieldsCount = useMemo(() => {
    let count = 0;
    if (formData.firstName.trim()) count++;
    if (formData.lastName.trim()) count++;
    if (formData.email.trim()) count++;
    if (formData.phone.trim()) count++;
    return count;
  }, [formData]);

  useEffect(() => {
    if (modalProgressRef.current && selectedCaisse) {
      const percentage = (completedFieldsCount / 4) * 100;
      gsap.to(modalProgressRef.current, {
        width: `${percentage}%`,
        duration: 0.45,
        ease: 'power2.out'
      });
    }
  }, [completedFieldsCount, selectedCaisse]);

  // Teleport to top when analysis starts or step changes so user always sees top of view
  useEffect(() => {
    teleportToTop();
  }, [currentStep, quizMode, isAnalyzing]);

  // 4. GSAP-driven Staggered Reveal for step inputs/options
  const stepContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (quizMode && stepContainerRef.current) {
      const items = stepContainerRef.current.querySelectorAll('.stagger-item');
      if (items.length > 0) {
        gsap.killTweensOf(items);
        gsap.set(items, { opacity: 0, y: 15 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 0.15
        });
      }
    }
  }, [currentStep, quizMode]);

  // 5. GSAP-driven Staggered Reveal for modal fields
  useEffect(() => {
    if (selectedCaisse) {
      const timer = setTimeout(() => {
        const items = document.querySelectorAll('.modal-stagger-item');
        if (items.length > 0) {
          gsap.killTweensOf(items);
          gsap.set(items, { opacity: 0, y: 12 });
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: 'power2.out'
          });
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [selectedCaisse]);

  const isNextDisabled = useMemo(() => {
    if (currentStep === 1) return !resolvedInfo;
    if (currentStep === 2) return !filters.birthDate || !filters.gender || !filters.nationality;
    if (currentStep === 3) return filters.hasCurrentInsurer === undefined;
    if (currentStep === 6) {
      return filters.hasChronicConditions === undefined || 
             filters.hasActiveTreatments === undefined || 
             filters.hasMedicalHistory === undefined;
    }
    if (currentStep === 8) return true;
    return false;
  }, [currentStep, resolvedInfo, filters]);

  if (isEmbedded) {
    return (
      <div className="w-full text-center space-y-6 py-4 animate-in fade-in duration-300">
        <div className="relative w-28 h-28 mx-auto rounded-3xl p-2 bg-white border border-fennec-cream shadow-xs overflow-hidden">
          <img 
            src={fenyWinking} 
            alt="Fenny" 
            className="w-full h-full object-cover rounded-2xl"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/fennec-logo.jpg';
            }}
          />
        </div>
        
        <div className="space-y-2 max-w-xl mx-auto">
          <h3 className="font-display font-extrabold text-2xl text-fennec-dark">
            {ui.embeddedTitle}
          </h3>
          <p className="text-sm text-fennec-dark/70 leading-relaxed">
            {ui.embeddedSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-fennec-dark/60 max-w-lg mx-auto">
          <span className="flex items-center text-emerald-700">
            <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-500 shrink-0" />
            {ui.embeddedStat1}
          </span>
          <span className="flex items-center text-emerald-700">
            <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-500 shrink-0" />
            {ui.embeddedStat2}
          </span>
          <span className="flex items-center text-emerald-700">
            <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-500 shrink-0" />
            {ui.embeddedStat3}
          </span>
        </div>

        <div className="pt-4">
          <button
            onClick={onStartQuiz}
            className="px-8 py-4 bg-fennec-red hover:bg-red-600 text-white font-display font-extrabold text-base rounded-full shadow-lg shadow-fennec-red/25 hover:-translate-y-0.5 transition-all flex items-center space-x-2 mx-auto animate-bounce cursor-pointer"
          >
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span>{ui.embeddedBtn}</span>
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 relative">
      
      {/* Sleek Global GSAP Progress Bar at top of active comparator module */}
      <div className="absolute -top-6 sm:-top-10 -left-6 sm:-left-10 -right-6 sm:-right-10 h-1.5 bg-fennec-cream/20 overflow-hidden rounded-t-[40px] z-20">
        <div 
          ref={globalProgressBarRef}
          className="h-full bg-fennec-terracotta origin-left"
          style={{ width: '20%' }}
        />
      </div>
      
      {/* HEADER SECTION */}
      <div className="text-center md:text-left mb-6">
        <span className="text-[11px] font-bold tracking-widest text-fennec-terracotta uppercase block mb-1">
          {ui.resultsBadge}
        </span>
        <h2 className="font-display font-extrabold text-3xl text-fennec-dark">
          {ui.resultsTitle}
        </h2>
        <p className="mt-1 text-sm text-fennec-dark/70">
          {ui.resultsSubtitle}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {quizMode ? (
          /* ========================================== */
          /*         PROGRESSIVE QUESTIONNAIRE FLOW     */
          /* ========================================== */
          <motion.div
            key="quiz-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#FAF8F5] overflow-y-auto flex flex-col font-sans"
          >
            {/* 1. TOP PROGRESS NAVIGATION BAR */}
            <header className="w-full bg-white border-b border-fennec-cream/40 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-3xs">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1 || isAnalyzing}
                className={`flex items-center text-xs font-bold font-display px-3 py-2 rounded-full border transition-all ${
                  currentStep === 1 || isAnalyzing
                    ? 'opacity-20 cursor-not-allowed border-transparent text-fennec-dark/30'
                    : 'border-fennec-cream/60 text-fennec-dark hover:bg-fennec-cream/15'
                }`}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                <span>{ui.backBtn}</span>
              </button>

              <div className="flex-1 max-w-md mx-6 text-center space-y-1.5">
                <div className="flex justify-between items-center text-[10px] text-fennec-brown font-black uppercase tracking-widest">
                  <span>{currentStep >= 7 ? ui.actionFinal : ui.questionOf.replace('{n}', String(currentStep))}</span>
                  <span>{Math.min(100, Math.round((currentStep / 7) * 100))}{ui.percentComplete}</span>
                </div>
                <div className="h-1.5 w-full bg-fennec-cream/40 rounded-full overflow-hidden relative">
                  <div 
                    ref={progressBarRef}
                    className="h-full bg-fennec-terracotta rounded-full origin-left"
                    style={{ width: `${Math.min(100, (currentStep / 7) * 100)}%` }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleExitQuiz}
                disabled={isAnalyzing}
                className="flex items-center text-xs font-bold font-display px-3.5 py-2 rounded-full border border-fennec-cream/60 text-fennec-dark hover:bg-fennec-cream/15 transition-all disabled:opacity-50"
                title={ui.quitBtn}
              >
                <X className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">{ui.quitBtn}</span>
              </button>
            </header>

            {/* 2. MAIN IMMERSIVE CONTAINER (aligned higher up for improved UI/UX) */}
            <div className="flex items-start justify-center p-4 md:p-8 pt-2 sm:pt-4 md:pt-6">
              {isAnalyzing ? (
                /* SMOOTH FINAL LOADING/ANALYSIS FLOW WITH REAL ANALYSING & LOGO CAROUSEL */
                <div className="max-w-2xl mx-auto p-6 text-center space-y-6 animate-in fade-in duration-300">
                  {/* Inline CSS animation for smooth logo scrolling */}
                  <style>{`
                    @keyframes scroll-left {
                      0% { transform: translateX(0); }
                      100% { transform: translateX(-50%); }
                    }
                    .animate-scroll-left {
                      animation: scroll-left 15s linear infinite;
                    }
                  `}</style>

                  <div className="relative w-32 h-32 mx-auto rounded-3xl p-2.5 bg-white border border-fennec-cream shadow-md overflow-hidden">
                    <img 
                      src={fenyAnalyse || fenyWinking} 
                      alt="Fenny analyse" 
                      className="w-full h-full object-cover rounded-2xl animate-pulse"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/fennec-logo.jpg';
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display font-black text-2xl text-fennec-dark flex items-center justify-center">
                      <Loader2 className="w-6 h-6 mr-2.5 animate-spin text-fennec-terracotta" />
                      {ui.analyzingTitle}
                    </h3>
                    <p className="text-sm text-fennec-dark/70 leading-relaxed max-w-lg mx-auto">
                      {ui.analyzingDescPre}<strong>{ui.analyzingOfsp}</strong>{ui.analyzingDescMid}<strong>{ui.analyzing37}</strong>{ui.analyzingDescEnd} <strong>{filters.zipCode}</strong>.
                    </p>
                  </div>

                  {/* Infinite Auto-Scrolling Logo Carousel */}
                  <div className="space-y-2 max-w-xl mx-auto pt-4">
                    <p className="text-[11px] font-black uppercase tracking-wider text-fennec-brown/60 text-center">
                      {ui.comparingCompanies}
                    </p>
                    <div className="relative w-full overflow-hidden py-3 border-y border-fennec-cream/30 bg-white/30 rounded-2xl">
                      {/* Left and right fade gradients */}
                      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
                      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
                      
                      {/* Scrolling wrapper */}
                      <div className="flex space-x-6 animate-scroll-left w-max">
                        {['assura', 'css', 'helsana', 'swica', 'visana', 'sanitas', 'concordia', 'kpt', 'mutuel', 'okk', 'sympany', 'atupri'].map((logo, idx) => (
                          <div key={`${logo}-${idx}`} className="shrink-0">
                            <CompanyLogo id={logo} className="w-28 h-14 bg-white" />
                          </div>
                        ))}
                        {['assura', 'css', 'helsana', 'swica', 'visana', 'sanitas', 'concordia', 'kpt', 'mutuel', 'okk', 'sympany', 'atupri'].map((logo, idx) => (
                          <div key={`${logo}-dup-${idx}`} className="shrink-0">
                            <CompanyLogo id={logo} className="w-28 h-14 bg-white" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                /* MAIN QUESTION + MASCOT GRID */
                <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start py-6">
                  
                  {/* Mascot Left Panel — hidden on mobile */}
                  <div className="hidden lg:flex lg:col-span-5 flex-col items-end space-y-4">
                    
                    {/* Floating Speech Bubble */}
                    {fenyAdvice && (
                      <div className="relative bg-white border border-fennec-cream shadow-sm p-4 rounded-3xl max-w-sm text-left animate-in fade-in slide-in-from-bottom-2 duration-200">
                        <div className="space-y-1">
                          <span className="text-[9px] font-black text-fennec-terracotta uppercase tracking-wider block">
                            {ui.fennyAdvises}
                          </span>
                          <p className="text-xs text-fennec-dark font-medium leading-relaxed">
                            {fenyAdvice}
                          </p>
                        </div>
                        {/* Triangle Pointer for Speech Bubble (hidden on mobile, pointing right on desktop) */}
                        <div className="hidden lg:block absolute right-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-r border-b border-fennec-cream rotate-[-45deg] z-10" />
                      </div>
                    )}

                    {/* Mascot Image */}
                    <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-3xl p-3 bg-white border border-fennec-cream shadow-xs overflow-hidden">
                      <img 
                        src={
                          currentStep === 1 ? fenyThinking :
                          currentStep === 2 ? fenyAvatar :
                          currentStep === 3 ? fenySavings :
                          currentStep === 4 ? fenyCompare :
                          fenyWinking
                        } 
                        alt="Feny" 
                        className="w-full h-full object-cover rounded-2xl"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/fennec-logo.jpg';
                        }}
                      />
                    </div>
                  </div>

                  {/* Question Right Panel */}
                  <div className="lg:col-span-7 bg-white rounded-3xl border border-fennec-cream/80 shadow-md p-6 md:p-10 w-full flex flex-col gap-6">
                    <div ref={stepContainerRef} className="flex flex-col">
                      <AnimatePresence mode="wait">
                        
                        {/* STEP 1: NPA (Code Postal) */}
                        {currentStep === 1 && (
                          <motion.div
                            key="step-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-6 text-left w-full"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-fennec-terracotta">
                                <MapPin className="w-5 h-5 shrink-0" />
                                <h3 className="font-display font-black text-xl md:text-2xl text-fennec-dark">
                                  {ui.zipTitle}
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                {ui.zipSubtitle}
                              </p>
                            </div>

                            {/* NPA INPUT CONTAINER */}
                            <div className="bg-fennec-cream/20 p-5 rounded-2xl border border-fennec-cream/60 space-y-4">
                              <label className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">
                                {ui.zipLabel}
                              </label>
                              <div className="relative max-w-xs">
                                <input
                                  type="text"
                                  pattern="\d*"
                                  maxLength={4}
                                  value={zipInput}
                                  onChange={(e) => handleZipChange(e.target.value)}
                                  placeholder={ui.zipPlaceholder}
                                  className="w-full text-2xl font-bold font-mono tracking-widest bg-white border-2 border-fennec-cream rounded-xl px-4 py-3 text-fennec-dark focus:outline-none focus:border-fennec-terracotta transition-colors"
                                />
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                  {resolvedInfo ? (
                                    <CheckCircle2 className="w-6 h-6 text-emerald-500 animate-bounce" />
                                  ) : (
                                    <HelpCircle className="w-5 h-5 text-fennec-brown/40" />
                                  )}
                                </div>
                              </div>

                              {ambiguousData && ambiguousData.ambiguous && ambiguousData.localities && (
                                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 space-y-2 text-left animate-in fade-in duration-200">
                                  <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs">
                                    <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                                    <span>{ambiguousData.message || `${ui.localityPrompt} ${zipInput} :`}</span>
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                                    {ambiguousData.localities.map((loc, idx) => {
                                      const isSelected = selectedLocality === loc.locality;
                                      return (
                                        <button
                                          key={idx}
                                          type="button"
                                          onClick={() => handleSelectLocality(loc)}
                                          className={`px-3 py-2 rounded-lg text-xs text-left border font-semibold transition-all flex justify-between items-center ${
                                            isSelected
                                              ? 'bg-fennec-terracotta text-white border-fennec-terracotta shadow-xs'
                                              : 'bg-white text-fennec-dark border-amber-200 hover:border-fennec-terracotta hover:bg-fennec-cream/20'
                                          }`}
                                        >
                                          <span>{loc.locality} ({loc.canton})</span>
                                          <span className="text-[10px] font-bold opacity-80">{ui.regionText} {loc.premium_region}</span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                              {resolvedInfo ? (
                                <div className="flex flex-wrap gap-2 pt-1 animate-in fade-in duration-150">
                                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1 flex items-center space-x-1.5 text-xs text-emerald-800 font-medium">
                                    <span className="font-bold">{ui.cantonLabel}</span>
                                    <span>{SWISS_CANTONS.find(c => c.code === resolvedInfo.canton)?.name || resolvedInfo.canton} ({resolvedInfo.canton})</span>
                                  </div>
                                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1 flex items-center space-x-1.5 text-xs text-emerald-800 font-medium">
                                    <span className="font-bold">{ui.localityLabel}</span>
                                    <span>{resolvedInfo.city}</span>
                                  </div>
                                  <div className="bg-fennec-terracotta/10 border border-fennec-terracotta/20 rounded-lg px-2.5 py-1 flex items-center space-x-1.5 text-xs text-fennec-terracotta font-bold">
                                    <span className="font-bold">{ui.zoneLabel}</span>
                                    <span>{ui.regionText} {resolvedInfo.zone}</span>
                                  </div>
                                </div>
                              ) : (
                                <p className="text-[11px] text-fennec-dark/50 italic font-medium">
                                  {zipInput.length === 4 ? ui.unresolvedZip : ui.enter4digits}
                                </p>
                              )}
                            </div>

                            {/* CANTON ALTERNATIVES */}
                            <div className="space-y-2 pt-2">
                              <span className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">
                                {ui.cantonDirect}
                              </span>
                              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                {SWISS_CANTONS.map((c) => {
                                  const isSelected = filters.canton === c.code;
                                  return (
                                    <motion.button
                                      key={c.code}
                                      type="button"
                                      whileHover={{ scale: 1.03 }}
                                      whileTap={{ scale: 0.97 }}
                                      onClick={() => {
                                        handleCantonClick(c.code);
                                        setTimeout(() => nextStep(), 180);
                                      }}
                                      className={`stagger-item p-2.5 rounded-xl border text-center transition-all ${
                                        isSelected
                                          ? 'bg-fennec-terracotta text-white border-fennec-terracotta shadow-sm font-bold'
                                          : 'border-fennec-cream/80 text-fennec-dark bg-fennec-cream/5 hover:bg-fennec-cream/15'
                                      }`}
                                    >
                                      <span className="font-display text-sm block font-black">{c.code}</span>
                                      <span className="text-[8px] opacity-75 block truncate leading-none mt-0.5">{c.name}</span>
                                    </motion.button>
                                  );
                                })}
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 2: Informations Personnelles */}
                        {currentStep === 2 && (
                          <motion.div
                            key="step-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-6 w-full text-left"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-fennec-terracotta">
                                <User className="w-5 h-5 shrink-0" />
                                <h3 className="font-display font-black text-xl md:text-2xl text-fennec-dark">
                                  {ui.personalTitle}
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                {ui.personalSubtitle}
                              </p>
                            </div>

                            <div className="space-y-4">
                              {/* Date de Naissance */}
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">
                                  {ui.birthdateLabel}
                                </label>
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  placeholder={ui.birthdatePlaceholder}
                                  value={typedBirthDate}
                                  onChange={(e) => handleBirthDateTypedChange(e.target.value)}
                                  className="w-full bg-white border border-fennec-cream/80 rounded-xl px-3.5 py-2.5 text-xs text-fennec-dark focus:outline-none focus:ring-1 focus:ring-fennec-terracotta transition-all font-mono font-bold"
                                  required
                                />
                                {typedBirthDate.replace(/\D/g, '').length === 8 && !filters.birthDate && (
                                  <p className="text-[10px] font-semibold text-red-500 mt-1">
                                    {ui.birthdateInvalid}
                                  </p>
                                )}
                                {filters.birthDate && parsedBirthDateInfo && (
                                  <p className="text-[10px] font-bold text-green-600 mt-1">
                                    ✓ {ui.ageCategoryLabel} {parsedBirthDateInfo.label} ({ui.yearsOld} : {parsedBirthDateInfo.age} {ui.yearsOld})
                                  </p>
                                )}
                                {typedBirthDate.replace(/\D/g, '').length < 8 && (
                                  <p className="text-[10px] text-fennec-dark/45 mt-1">
                                    {ui.birthdateHint}
                                  </p>
                                )}
                              </div>

                              {/* Sexe */}
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">
                                  {ui.genderLabel}
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                  {[
                                    { id: 'M', label: ui.male },
                                    { id: 'F', label: ui.female }
                                  ].map((genderOption) => {
                                    const isSelected = filters.gender === genderOption.id;
                                    return (
                                      <button
                                        key={genderOption.id}
                                        type="button"
                                        onClick={() => handleFilterChange('gender', genderOption.id as any)}
                                        className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                                          isSelected
                                            ? 'bg-fennec-terracotta text-white border-fennec-terracotta shadow-sm'
                                            : 'border-fennec-cream/80 text-fennec-dark bg-fennec-cream/5 hover:bg-fennec-cream/15'
                                        }`}
                                      >
                                        {genderOption.label}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Nationalité */}
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">
                                  {ui.nationalityLabel}
                                </label>
                                <div className="grid grid-cols-2 gap-2.5">
                                  {[
                                    { id: 'swiss', label: ui.natSwiss },
                                    { id: 'permis-c', label: ui.natPermitC },
                                    { id: 'permis-b', label: ui.natPermitB },
                                    { id: 'other', label: ui.natOther },
                                  ].map((nat) => {
                                    const isSelected = filters.nationality === nat.id;
                                    return (
                                      <button
                                        key={nat.id}
                                        type="button"
                                        onClick={() => handleFilterChange('nationality', nat.id as any)}
                                        className={`p-2.5 rounded-xl border text-[11px] font-bold text-center transition-all truncate ${
                                          isSelected
                                            ? 'bg-fennec-tan text-white border-fennec-tan shadow-sm'
                                            : 'border-fennec-cream/80 text-fennec-dark bg-white hover:bg-fennec-cream/15'
                                        }`}
                                      >
                                        {nat.label}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Age Category Feedack */}
                              {filters.birthDate && (
                                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center text-xs text-emerald-800 font-bold animate-pulse">
                                  {ui.categoryRecognized}{' '}
                                  <span className="uppercase text-fennec-dark">
                                    {filters.ageCategory === 'child'
                                      ? ui.childCat
                                      : filters.ageCategory === 'young'
                                      ? ui.youngCat
                                      : ui.adultCat}
                                  </span>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 3: Situation Actuelle */}
                        {currentStep === 3 && (
                          <motion.div
                            key="step-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-6 w-full text-left"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-fennec-terracotta">
                                <Activity className="w-5 h-5 shrink-0" />
                                <h3 className="font-display font-black text-xl md:text-2xl text-fennec-dark">
                                  {ui.situationTitle}
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                {ui.situationSubtitle}
                              </p>
                            </div>

                            <div className="space-y-5">
                              {/* Has Insurer */}
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">
                                  {ui.hasInsurerQuestion}
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                  {[
                                    { value: true, label: ui.yesInsured },
                                    { value: false, label: ui.noInsured }
                                  ].map((option) => {
                                    const isSelected = filters.hasCurrentInsurer === option.value;
                                    return (
                                      <button
                                        key={option.value.toString()}
                                        type="button"
                                        onClick={() => {
                                          handleFilterChange('hasCurrentInsurer', option.value);
                                          if (!option.value) {
                                            // Reset current values if none
                                            handleFilterChange('currentPremium', 0);
                                            setCurrentPremiumInput(0);
                                          }
                                        }}
                                        className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                                          isSelected
                                            ? 'bg-fennec-terracotta text-white border-fennec-terracotta shadow-sm'
                                            : 'border-fennec-cream/80 text-fennec-dark bg-fennec-cream/5 hover:bg-fennec-cream/15'
                                        }`}
                                      >
                                        {option.label}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Conditional Form Fields */}
                              {filters.hasCurrentInsurer && (
                                <div className="space-y-4 p-4.5 bg-fennec-cream/15 rounded-2xl border border-fennec-cream/50 animate-in fade-in slide-in-from-top-2 duration-250">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Insurer list */}
                                    <div className="space-y-1.5">
                                      <label className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">
                                        {ui.currentInsurer}
                                      </label>
                                      <select
                                        value={filters.currentInsurerId || '1562'}
                                        onChange={(e) => {
                                          handleFilterChange('currentInsurerId', e.target.value);
                                          setCurrentCaisseId(e.target.value);
                                        }}
                                        className="w-full bg-white border border-fennec-cream/80 rounded-xl px-3 py-2 text-xs text-fennec-dark focus:outline-none focus:ring-1 focus:ring-fennec-terracotta"
                                      >
                                        {CAISSES_MALADIE.map((caisse) => (
                                          <option key={caisse.id} value={caisse.id}>
                                            {caisse.name}
                                          </option>
                                        ))}
                                      </select>
                                    </div>

                                    {/* Monthly premium */}
                                    <div className="space-y-1.5">
                                      <label className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">
                                        {ui.monthlyPremium}
                                      </label>
                                      <input
                                        type="number"
                                        min={0}
                                        value={filters.currentPremium || ''}
                                        placeholder="Ex: 380"
                                        onChange={(e) => {
                                          const val = Number(e.target.value);
                                          handleFilterChange('currentPremium', val);
                                          setCurrentPremiumInput(val);
                                          setUserHasEditedCurrentPremium(true);
                                        }}
                                        className="w-full bg-white border border-fennec-cream/80 rounded-xl px-3 py-2 text-xs text-fennec-dark focus:outline-none focus:ring-1 focus:ring-fennec-terracotta font-mono font-bold"
                                      />
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Years with insurer */}
                                    <div className="space-y-1.5">
                                      <label className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">
                                        {ui.seniority}
                                      </label>
                                      <div className="grid grid-cols-3 gap-1.5">
                                        {[
                                          { val: 1, label: ui.less2yrs },
                                          { val: 3, label: ui.between2_5yrs },
                                          { val: 5, label: ui.more5yrs }
                                        ].map((yearsOpt) => {
                                          const isSelected = filters.yearsWithCurrent === yearsOpt.val;
                                          return (
                                            <button
                                              key={yearsOpt.val}
                                              type="button"
                                              onClick={() => handleFilterChange('yearsWithCurrent', yearsOpt.val)}
                                              className={`py-1.5 px-0.5 rounded-lg border text-[10px] font-bold text-center transition-all ${
                                                isSelected
                                                  ? 'bg-fennec-tan text-white border-fennec-tan'
                                                  : 'border-fennec-cream/80 bg-white text-fennec-dark hover:bg-fennec-cream/15'
                                              }`}
                                            >
                                              {yearsOpt.label}
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </div>

                                    {/* Termination option */}
                                    <div className="space-y-1.5">
                                      <label className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">
                                        {ui.nextTermination}
                                      </label>
                                      <select
                                        value={filters.terminationOption || 'december'}
                                        onChange={(e) => handleFilterChange('terminationOption', e.target.value as any)}
                                        className="w-full bg-white border border-fennec-cream/80 rounded-xl px-3 py-2 text-xs text-fennec-dark focus:outline-none focus:ring-1 focus:ring-fennec-terracotta"
                                      >
                                        <option value="december">{ui.termNov}</option>
                                        <option value="june">{ui.termJune}</option>
                                        <option value="unknown">{ui.termUnknown}</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 4: Assurance de Base (LAMal) */}
                        {currentStep === 4 && (
                          <motion.div
                            key="step-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-6 w-full text-left"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-fennec-terracotta">
                                <Percent className="w-5 h-5 shrink-0" />
                                <h3 className="font-display font-black text-xl md:text-2xl text-fennec-dark">
                                  {ui.lamalTitle}
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                {ui.lamalSubtitle}
                              </p>
                            </div>

                            <div className="space-y-4">
                              {/* Household size */}
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">
                                  {ui.householdLabel}
                                </label>
                                <div className="grid grid-cols-3 gap-2.5">
                                  {[
                                    { id: 'single', label: ui.single },
                                    { id: 'couple', label: ui.couple },
                                    { id: 'family', label: ui.family },
                                  ].map((sizeOpt) => {
                                    const isSelected = filters.householdSize === sizeOpt.id;
                                    return (
                                      <button
                                        key={sizeOpt.id}
                                        type="button"
                                        onClick={() => handleFilterChange('householdSize', sizeOpt.id as any)}
                                        className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                                          isSelected
                                            ? 'bg-fennec-terracotta text-white border-fennec-terracotta shadow-xs'
                                            : 'border-fennec-cream/80 text-fennec-dark bg-fennec-cream/5 hover:bg-fennec-cream/15'
                                        }`}
                                      >
                                        {sizeOpt.label}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Franchise */}
                                <div className="space-y-1.5">
                                  <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">
                                    {ui.franchiseLabel}
                                  </label>
                                  <select
                                    value={filters.franchise}
                                    onChange={(e) => handleFilterChange('franchise', Number(e.target.value))}
                                    className="w-full bg-white border border-fennec-cream/80 rounded-xl px-3 py-2.5 text-xs text-fennec-dark focus:outline-none focus:ring-1 focus:ring-fennec-terracotta font-mono font-bold"
                                  >
                                    {(filters.ageCategory === 'child' ? [0, 100, 200, 300, 400, 500, 600] : FRANCHISES).map((franValue) => (
                                      <option key={franValue} value={franValue}>
                                        CHF {franValue} ({franValue === 2500 || (filters.ageCategory === 'child' && franValue === 600) ? ui.ecoMax : franValue === 300 || (filters.ageCategory === 'child' && franValue === 0) ? ui.secuMax : ui.standard})
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {/* Accident coverage */}
                                <div className="space-y-1.5">
                                  <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">
                                    {ui.accidentLabel}
                                  </label>
                                  <div className="grid grid-cols-2 gap-2">
                                    {[
                                      { value: true, label: ui.accidentYes },
                                      { value: false, label: ui.accidentNo }
                                    ].map((accOpt) => {
                                      const isSelected = filters.accidentCoverage === accOpt.value;
                                      return (
                                        <button
                                          key={accOpt.value.toString()}
                                          type="button"
                                          onClick={() => handleFilterChange('accidentCoverage', accOpt.value)}
                                          className={`py-2.5 px-2 rounded-xl border text-[11px] font-bold text-center transition-all ${
                                            isSelected
                                              ? 'bg-fennec-tan text-white border-fennec-tan shadow-xs'
                                              : 'border-fennec-cream/80 text-fennec-dark bg-white hover:bg-fennec-cream/15'
                                          }`}
                                        >
                                          {accOpt.label}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>

                              {/* Models selection - Multi-select */}
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">
                                    {ui.modelsLabel}
                                  </label>
                                  <span className="text-[10px] font-bold text-fennec-terracotta bg-fennec-cream/25 px-2 py-0.5 rounded-full">
                                    {ui.multipleChoice}
                                  </span>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  {[
                                    { id: 'family', label: ui.modelFamily, desc: ui.modelFamilyDesc },
                                    { id: 'telemed', label: ui.modelTelemed, desc: ui.modelTelemedDesc },
                                    { id: 'hmo', label: ui.modelHmo, desc: ui.modelHmoDesc },
                                    { id: 'standard', label: ui.modelStandard, desc: ui.modelStandardDesc },
                                  ].map((modelOpt) => {
                                    const selectedList = filters.selectedModels || ['family', 'telemed', 'hmo', 'standard'];
                                    const isSelected = selectedList.includes(modelOpt.id);
                                    return (
                                      <button
                                        key={modelOpt.id}
                                        type="button"
                                        onClick={() => toggleModel(modelOpt.id)}
                                        className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                                          isSelected
                                            ? 'bg-fennec-terracotta text-white border-fennec-terracotta shadow-xs'
                                            : 'border-fennec-cream/80 text-fennec-dark bg-fennec-cream/5 hover:bg-fennec-cream/15'
                                        }`}
                                      >
                                        <div className="flex items-center justify-between w-full">
                                          <span className="font-bold text-xs leading-none">{modelOpt.label}</span>
                                          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                                            isSelected ? 'bg-white text-fennec-terracotta' : 'border border-fennec-cream/80 text-transparent'
                                          }`}>✓</span>
                                        </div>
                                        <span className="text-[9px] opacity-80 mt-1.5 leading-tight font-medium">
                                          {modelOpt.desc}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 5: Assurances Complémentaires (LCA) */}
                        {currentStep === 5 && (
                          <motion.div
                            key="step-5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-6 w-full text-left"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-fennec-terracotta">
                                <Sparkles className="w-5 h-5 shrink-0" />
                                <h3 className="font-display font-black text-xl md:text-2xl text-fennec-dark">
                                  {ui.lcaTitle}
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                {ui.lcaSubtitle}
                              </p>
                            </div>

                            <div className="space-y-4">
                              {/* Supplementary type level */}
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">
                                  {ui.lcaLevelLabel}
                                </label>
                                <div className="grid grid-cols-4 gap-1.5">
                                  {[
                                    { id: 'none', label: ui.lcaNone },
                                    { id: 'essential', label: ui.lcaEssential },
                                    { id: 'confort', label: ui.lcaConfort },
                                    { id: 'premium', label: ui.lcaPremium }
                                  ].map((levelOpt) => {
                                    const isSelected = filters.supplementaryType === levelOpt.id;
                                    return (
                                      <button
                                        key={levelOpt.id}
                                        type="button"
                                        onClick={() => handleFilterChange('supplementaryType', levelOpt.id as any)}
                                        className={`py-2.5 px-0.5 rounded-xl border text-[10px] font-black text-center transition-all ${
                                          isSelected
                                            ? 'bg-fennec-terracotta text-white border-fennec-terracotta shadow-xs'
                                            : 'border-fennec-cream/80 text-fennec-dark bg-fennec-cream/5 hover:bg-fennec-cream/15'
                                        }`}
                                      >
                                        {levelOpt.label}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Conditional section if supplementary level is chosen */}
                              {filters.supplementaryType !== 'none' && (
                                <div className="space-y-4.5 p-4 bg-fennec-cream/15 rounded-2xl border border-fennec-cream/50 animate-in fade-in slide-in-from-top-2 duration-250">
                                  {/* Hospital division */}
                                  <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">
                                      {ui.hospitalDivisionLabel}
                                    </label>
                                    <div className="grid grid-cols-4 gap-1.5">
                                      {[
                                        { id: 'none', label: ui.divCommune },
                                        { id: 'commune', label: ui.divSwiss },
                                        { id: 'semi-private', label: ui.divSemiPrivate },
                                        { id: 'private', label: ui.divPrivate },
                                      ].map((divOpt) => {
                                        const isSelected = filters.hospitalDivision === divOpt.id;
                                        return (
                                          <button
                                            key={divOpt.id}
                                            type="button"
                                            onClick={() => handleFilterChange('hospitalDivision', divOpt.id as any)}
                                            className={`py-2 px-0.5 rounded-lg border text-[9px] font-black text-center transition-all ${
                                              isSelected
                                                ? 'bg-fennec-tan text-white border-fennec-tan'
                                                : 'border-fennec-cream/80 bg-white text-fennec-dark hover:bg-fennec-cream/15'
                                            }`}
                                          >
                                            {divOpt.label}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>

                                  {/* Specific Needs Toggles */}
                                  <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">
                                      {ui.ambulatoryNeedsLabel}
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      {[
                                        { id: 'hasAlternativeMedicine', label: ui.needAltMed, desc: ui.needAltMedDesc },
                                        { id: 'hasDental', label: ui.needDental, desc: ui.needDentalDesc },
                                        { id: 'hasRiskySports', label: ui.needSports, desc: ui.needSportsDesc },
                                        { id: 'hasFrequentTravel', label: ui.needTravel, desc: ui.needTravelDesc },
                                        { id: 'isExpecting', label: ui.needMaternity, desc: ui.needMaternityDesc }
                                      ].map((needOpt) => {
                                        const isChecked = !!(filters as any)[needOpt.id];
                                        return (
                                          <button
                                            key={needOpt.id}
                                            type="button"
                                            onClick={() => handleFilterChange(needOpt.id as any, !isChecked)}
                                            className={`p-2 rounded-xl border text-left flex items-start space-x-2.5 transition-all bg-white ${
                                              isChecked
                                                ? 'border-fennec-terracotta ring-1 ring-fennec-terracotta shadow-3xs'
                                                : 'border-fennec-cream/80 hover:bg-fennec-cream/5'
                                            }`}
                                          >
                                            <div className={`w-4 h-4 rounded border mt-0.5 shrink-0 flex items-center justify-center transition-all ${
                                              isChecked
                                                ? 'bg-fennec-terracotta border-fennec-terracotta text-white'
                                                : 'border-fennec-cream bg-white'
                                            }`}>
                                              {isChecked && <Check className="w-3 h-3 stroke-[2.5]" />}
                                            </div>
                                            <div className="leading-tight">
                                              <span className="text-[11px] font-bold text-fennec-dark block">
                                                {needOpt.label}
                                              </span>
                                              <span className="text-[9px] text-fennec-brown font-medium">
                                                {needOpt.desc}
                                              </span>
                                            </div>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 6: État de Santé (uniquement pour les complémentaires) */}
                        {currentStep === 6 && (
                          <motion.div
                            key="step-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-6 w-full text-left"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-fennec-terracotta">
                                <Shield className="w-5 h-5 shrink-0" />
                                <h3 className="font-display font-black text-xl md:text-2xl text-fennec-dark">
                                  {ui.healthTitle}
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                {ui.healthSubtitle}
                              </p>
                            </div>

                            <div className="space-y-4">
                              <div className="bg-amber-50 border border-amber-200/60 p-4 rounded-2xl flex items-start space-x-3">
                                <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 animate-pulse" />
                                <p className="text-[11px] text-amber-900 leading-relaxed font-medium">
                                  <strong>{ui.constReminderTitle}</strong> {ui.constReminderText}
                                </p>
                              </div>

                              <div className="space-y-3">
                                {[
                                  { id: 'hasChronicConditions', label: ui.chronicLabel, desc: ui.chronicDesc },
                                  { id: 'hasActiveTreatments', label: ui.treatmentsLabel, desc: ui.treatmentsDesc },
                                  { id: 'hasMedicalHistory', label: ui.historyLabel, desc: ui.historyDesc }
                                ].map((healthOpt) => {
                                  const isYesValue = (filters as any)[healthOpt.id];
                                  return (
                                    <div key={healthOpt.id} className="p-3.5 bg-fennec-cream/10 rounded-2xl border border-fennec-cream/30 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                                      <div>
                                        <h4 className="text-xs font-bold text-fennec-dark leading-snug">
                                          {healthOpt.label}
                                        </h4>
                                        <p className="text-[10px] text-fennec-brown font-medium mt-0.5">
                                          {healthOpt.desc}
                                        </p>
                                      </div>
                                      <div className="flex space-x-2 shrink-0 self-end sm:self-center">
                                        {[
                                          { value: true, label: ui.btnYes },
                                          { value: false, label: ui.btnNo }
                                        ].map((btnOpt) => {
                                          const isActive = isYesValue === btnOpt.value;
                                          return (
                                            <button
                                              key={btnOpt.value.toString()}
                                              type="button"
                                              onClick={() => handleFilterChange(healthOpt.id as any, btnOpt.value)}
                                              className={`px-3.5 py-1.5 rounded-lg border text-[10px] font-extrabold uppercase tracking-wider transition-all ${
                                                isActive
                                                  ? 'bg-fennec-terracotta text-white border-fennec-terracotta shadow-xs'
                                                  : 'border-fennec-cream bg-white text-fennec-dark hover:bg-fennec-cream/10'
                                              }`}
                                            >
                                              {btnOpt.label}
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 7: Vos Préférences, Budget & Priorités */}
                        {currentStep === 7 && (
                          <motion.div
                            key="step-7"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-6 w-full text-left"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-fennec-terracotta">
                                <SlidersHorizontal className="w-5 h-5 shrink-0" />
                                <h3 className="font-display font-black text-xl md:text-2xl text-fennec-dark">
                                  {ui.prefTitle}
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                {ui.prefSubtitle}
                              </p>
                            </div>

                            <div className="space-y-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Service preference */}
                                <div className="space-y-1.5">
                                  <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">
                                    {ui.managementTypeLabel}
                                  </label>
                                  <select
                                    value={filters.servicePreference || 'hybrid'}
                                    onChange={(e) => handleFilterChange('servicePreference', e.target.value as any)}
                                    className="w-full bg-white border border-fennec-cream/80 rounded-xl px-3 py-2.5 text-xs text-fennec-dark focus:outline-none focus:ring-1 focus:ring-fennec-terracotta"
                                  >
                                    <option value="online">{ui.mgmtOnline}</option>
                                    <option value="human">{ui.mgmtHuman}</option>
                                    <option value="hybrid">{ui.mgmtHybrid}</option>
                                  </select>
                                </div>

                                {/* Client service importance */}
                                <div className="space-y-1.5">
                                  <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">
                                    {ui.clientServiceLabel}
                                  </label>
                                  <select
                                    value={filters.clientServiceImportance || 'medium'}
                                    onChange={(e) => handleFilterChange('clientServiceImportance', e.target.value as any)}
                                    className="w-full bg-white border border-fennec-cream/80 rounded-xl px-3 py-2.5 text-xs text-fennec-dark focus:outline-none focus:ring-1 focus:ring-fennec-terracotta"
                                  >
                                    <option value="low">{ui.csLow}</option>
                                    <option value="medium">{ui.csMedium}</option>
                                    <option value="high">{ui.csHigh}</option>
                                  </select>
                                </div>
                              </div>

                              {/* Monthly budget slider */}
                              <div className="space-y-1.5 bg-fennec-cream/10 p-4 rounded-2xl border border-fennec-cream/30">
                                <div className="flex justify-between items-baseline">
                                  <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">
                                    {ui.budgetLabel}
                                  </label>
                                  <span className="text-sm font-mono font-black text-fennec-terracotta">
                                    CHF {filters.maxMonthlyBudget || 450} {ui.perMonth}
                                  </span>
                                </div>
                                <input
                                  type="range"
                                  min={100}
                                  max={900}
                                  step={10}
                                  value={filters.maxMonthlyBudget || 450}
                                  onChange={(e) => handleFilterChange('maxMonthlyBudget', Number(e.target.value))}
                                  className="w-full accent-fennec-terracotta h-1.5 bg-fennec-cream/60 rounded-lg cursor-pointer"
                                />
                                <div className="flex justify-between text-[9px] text-fennec-brown font-extrabold font-mono">
                                  <span>CHF 100 ({ui.budgetEco})</span>
                                  <span>CHF 500</span>
                                  <span>CHF 900+ ({ui.budgetPremium})</span>
                                </div>
                              </div>

                              {/* Comparison priority */}
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">
                                  {ui.prioLabel}
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                  {[
                                    { id: 'price', label: ui.prioPrice, desc: ui.prioPriceDesc },
                                    { id: 'coverage', label: ui.prioCoverage, desc: ui.prioCoverageDesc },
                                    { id: 'reputation', label: ui.prioReputation, desc: ui.prioReputationDesc },
                                    { id: 'flexibility', label: ui.prioFlexibility, desc: ui.prioFlexibilityDesc },
                                  ].map((prioOpt) => {
                                    const isSelected = filters.comparisonPriority === prioOpt.id;
                                    return (
                                      <button
                                        key={prioOpt.id}
                                        type="button"
                                        onClick={() => handleFilterChange('comparisonPriority', prioOpt.id as any)}
                                        className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                                          isSelected
                                            ? 'bg-fennec-terracotta text-white border-fennec-terracotta shadow-xs font-bold'
                                            : 'border-fennec-cream/80 text-fennec-dark bg-fennec-cream/5 hover:bg-fennec-cream/15 font-semibold'
                                        }`}
                                      >
                                        <span className="text-[11px] block leading-none">{prioOpt.label}</span>
                                        <span className="text-[8px] opacity-80 mt-1 font-medium leading-none">
                                          {prioOpt.desc}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 8: SMS & Email Verification */}
                        {currentStep === 8 && (
                          <motion.div
                            key="step-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-6 w-full text-left"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-fennec-red">
                                <Shield className="w-5 h-5 shrink-0" />
                                <h3 className="font-display font-black text-xl md:text-2xl text-fennec-dark">
                                  {ui.secTitle}
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                {ui.secSubtitle}
                              </p>
                            </div>

                            {verificationStep === 'details' ? (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">{ui.firstNameLabel}</label>
                                    <input 
                                      type="text" 
                                      required
                                      placeholder={ui.firstNamePlaceholder}
                                      value={formData.firstName}
                                      onChange={(e) => setFormData(p => ({ ...p, firstName: e.target.value }))}
                                      className="w-full bg-white border border-fennec-cream/80 rounded-xl px-3 py-2 text-xs text-fennec-dark focus:ring-1 focus:ring-fennec-terracotta"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">{ui.lastNameLabel}</label>
                                    <input 
                                      type="text" 
                                      required
                                      placeholder={ui.lastNamePlaceholder}
                                      value={formData.lastName}
                                      onChange={(e) => setFormData(p => ({ ...p, lastName: e.target.value }))}
                                      className="w-full bg-white border border-fennec-cream/80 rounded-xl px-3 py-2 text-xs text-fennec-dark focus:ring-1 focus:ring-fennec-terracotta"
                                    />
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">{ui.emailLabel}</label>
                                  <input 
                                    type="email" 
                                    required
                                    placeholder="jean.dupont@gmail.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                                    className="w-full bg-white border border-fennec-cream/80 rounded-xl px-3 py-2 text-xs text-fennec-dark focus:ring-1 focus:ring-fennec-terracotta"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">{ui.phoneLabel}</label>
                                  <input 
                                    type="tel" 
                                    required
                                    placeholder="Ex: 079 123 45 67"
                                    value={formData.phone}
                                    onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                                    className="w-full bg-white border border-fennec-cream/80 rounded-xl px-3 py-2 text-xs text-fennec-dark focus:ring-1 focus:ring-fennec-terracotta"
                                  />
                                </div>

                                {/* Mandatory Client Consent */}
                                <div className="pt-1">
                                  <label className="flex items-start space-x-2.5 cursor-pointer bg-fennec-cream/15 p-3 rounded-xl border border-fennec-cream/70 hover:bg-fennec-cream/25 transition-colors">
                                    <input 
                                      type="checkbox" 
                                      required
                                      checked={consentAccepted} 
                                      onChange={(e) => setConsentAccepted(e.target.checked)} 
                                      className="mt-0.5 w-4 h-4 rounded text-fennec-terracotta focus:ring-fennec-terracotta border-fennec-cream/80 cursor-pointer" 
                                    />
                                    <span className="text-[11px] text-fennec-dark/80 leading-snug select-none">
                                      {ui.consentCheckboxLabel}
                                    </span>
                                  </label>
                                </div>

                                {verificationError && (
                                  <div className="text-[11px] font-semibold text-fennec-red bg-red-50 p-2.5 rounded-xl border border-red-200">
                                    {verificationError}
                                  </div>
                                )}

                                <button
                                  type="button"
                                  disabled={isSendingCode}
                                  onClick={async () => {
                                    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
                                      setVerificationError(ui.errFillRequired);
                                      return;
                                    }
                                    if (!consentAccepted) {
                                      setVerificationError(ui.errConsentRequired);
                                      return;
                                    }
                                    setVerificationError(null);
                                    setIsSendingCode(true);
                                    
                                    try {
                                      const res = await fetch('/api/send-verification-code', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ 
                                          email: formData.email, 
                                          firstName: formData.firstName, 
                                          lastName: formData.lastName, 
                                          phone: formData.phone 
                                        })
                                      });
                                      const data = await res.json();
                                      if (!res.ok || !data.success) {
                                        setVerificationError(data.error || ui.errSendingCode);
                                        setIsSendingCode(false);
                                        return;
                                      }
                                      if (data.verificationToken) setVerificationToken(data.verificationToken);
                                      
                                      // Log lead as pre-verify
                                      fetch('/api/submit-lead', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ type: 'health_pre_verify', lead: formData, filters })
                                      }).catch(() => {});

                                      setIsSendingCode(false);
                                      setVerificationStep('code');
                                    } catch(e: any) {
                                      setIsSendingCode(false);
                                      setVerificationError(ui.errContactServer);
                                    }
                                  }}
                                  className="w-full py-3 bg-fennec-dark hover:bg-fennec-terracotta text-white font-display font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                                >
                                  {isSendingCode ? (
                                    <>
                                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                      <span>{ui.sendingCodeBtn}</span>
                                    </>
                                  ) : (
                                    <span>{ui.receiveCodeBtn}</span>
                                  )}
                                </button>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <div className="bg-amber-50 border border-amber-200 text-[11px] text-amber-800 p-3.5 rounded-xl leading-relaxed">
                                  <strong>💡 {ui.codeSentTitle}</strong> {ui.codeSentBody.replace('{email}', formData.email)}
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">{ui.enterCodeLabel}</label>
                                  <input 
                                    type="text" 
                                    maxLength={4}
                                    placeholder="Ex: 8392"
                                    value={verificationCodeInput}
                                    onChange={(e) => setVerificationCodeInput(e.target.value)}
                                    className="w-full text-center tracking-[0.5em] font-mono bg-white border border-fennec-cream/80 rounded-xl px-3 py-3 text-sm text-fennec-dark focus:ring-1 focus:ring-fennec-terracotta"
                                  />
                                </div>

                                {verificationError && (
                                  <div className="text-[11px] font-semibold text-fennec-red bg-red-50 p-2.5 rounded-xl border border-red-200">
                                    {verificationError}
                                  </div>
                                )}

                                <button
                                  type="button"
                                  disabled={isSendingCode}
                                  onClick={async () => {
                                    if (!verificationCodeInput || verificationCodeInput.length < 4) {
                                      setVerificationError(ui.errEnter4Digits);
                                      return;
                                    }
                                    setVerificationError(null);
                                    setIsSendingCode(true);

                                    try {
                                      const res = await fetch('/api/verify-code', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                          email: formData.email,
                                          code: verificationCodeInput,
                                          verificationToken
                                        })
                                      });
                                      const data = await res.json();
                                      setIsSendingCode(false);

                                      if (!res.ok || !data.verified) {
                                        setVerificationError(data.error || ui.errIncorrectCode);
                                        return;
                                      }

                                      // Submit final lead log
                                      fetch('/api/submit-lead', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ type: 'health_verified', lead: formData, filters })
                                      }).catch(() => {});

                                      setIsAnalyzing(true);
                                    } catch(e: any) {
                                      setIsSendingCode(false);
                                      setVerificationError(ui.errVerifyCode);
                                    }
                                  }}
                                  className="w-full py-3 bg-fennec-red hover:bg-red-600 text-white font-display font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-fennec-red/25 flex items-center justify-center cursor-pointer"
                                >
                                  {isSendingCode ? ui.verifyingBtn : ui.validateCodeBtn}
                                </button>

                                <button 
                                  type="button"
                                  onClick={() => setVerificationStep('details')}
                                  className="w-full text-center text-[10px] text-fennec-dark/50 hover:text-fennec-dark underline font-semibold cursor-pointer"
                                >
                                  {ui.editDetailsBtn}
                                </button>
                              </div>
                            )}

                            {/* Balloon notification from Fenny */}
                            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 md:p-4 flex items-start space-x-3 text-emerald-800">
                              <img 
                                src={fenyAvatar} 
                                className="w-7 h-7 rounded-full object-cover shrink-0 border border-emerald-300" 
                                alt="Fenny" 
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/fennec-avatar.jpg';
                                }}
                              />
                              <div className="text-[11px] leading-relaxed">
                                <strong>{ui.fennyMessageTitle}</strong> {ui.fennyMessageText.replace('{email}', formData.email || ui.yourEmail)}
                              </div>
                            </div>
                          </motion.div>
                        )}

                      </AnimatePresence>
                    </div>

                    {/* Step Action Buttons */}
                    <div className="flex justify-between items-center pt-6 border-t border-fennec-cream/40 mt-6 shrink-0">
                      <button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={`flex items-center text-xs font-bold font-display px-4 py-2.5 rounded-full border transition-all ${
                          currentStep === 1
                            ? 'opacity-35 cursor-not-allowed border-transparent text-fennec-dark/30'
                            : 'border-fennec-cream text-fennec-dark hover:bg-fennec-cream/15'
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4 mr-1.5" />
                        <span>{ui.backBtn}</span>
                      </button>

                      {/* Display explicit "Next" button for all questions */}
                      {currentStep < 8 && (
                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={isNextDisabled}
                          className={`flex items-center text-xs font-bold font-display px-6 py-2.5 rounded-full transition-all shadow-sm ${
                            isNextDisabled
                              ? 'bg-fennec-cream text-fennec-brown/40 cursor-not-allowed shadow-none'
                              : 'bg-fennec-dark hover:bg-fennec-terracotta text-white'
                          }`}
                        >
                          <span>{currentStep === 7 ? ui.verificationStepBtn : ui.continueBtn}</span>
                          <ChevronRight className="w-4 h-4 ml-1.5" />
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* 3. PERSISTENT MINI LEGAL FOOTER IN QUIZ */}
            <footer className="w-full text-center py-4 bg-white/50 border-t border-fennec-cream/20 text-[10px] text-fennec-dark/40 font-medium shrink-0">
              {ui.footerCommitment}
            </footer>
          </motion.div>
        ) : (
          /* ========================================== */
          /*         COMPARATIVE RESULTS DASHBOARD      */
          /* ========================================== */
          <motion.div
            key="results-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            
            {/* LEFT PROFILE & FILTER TOGGLER PANEL */}
            <div 
              id="health-filter-adjustment-panel"
              className="lg:col-span-4 bg-white rounded-3xl border border-fennec-cream p-6 shadow-sm space-y-6 order-2 lg:order-1 lg:sticky lg:top-24 scroll-mt-24"
            >
              
              <div className="flex justify-between items-center border-b border-fennec-cream/30 pb-4">
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal className="w-5 h-5 text-fennec-tan" />
                  <h3 className="font-display font-bold text-lg text-fennec-dark">
                    Votre Simulation
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setQuizMode(true);
                  }}
                  className="text-xs font-bold text-fennec-terracotta hover:underline flex items-center"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1" />
                  Recommencer
                </button>
              </div>

              {/* SAVINGS CALCULATOR / CURRENT SITUATION WIDGET */}
              <div className="bg-fennec-cream/20 border border-fennec-cream/70 rounded-2xl p-4 text-left space-y-3 shadow-3xs">
                <div className="flex justify-between items-center">
                  <h4 className="font-display font-bold text-sm text-fennec-dark flex items-center">
                    <Sparkles className="w-4 h-4 mr-1.5 text-fennec-terracotta" />
                    {ui.mySituationTitle}
                  </h4>
                  {loadingReal ? (
                    <span className="text-[9px] font-black uppercase text-fennec-terracotta bg-fennec-cream/70 px-2 py-0.5 rounded-full animate-pulse">
                      {ui.loadingLabel}
                    </span>
                  ) : realPremiums.length > 0 ? (
                    <span className="text-[9px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {ui.officialPremiumsLabel}
                    </span>
                  ) : null}
                </div>
                
                <p className="text-[10px] text-fennec-dark/70 leading-relaxed">
                  {ui.savingsCalcDesc} <code className="font-mono font-bold text-[9px]">calculateSavings()</code>{ui.savingsCalcDescSuffix}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-fennec-brown uppercase tracking-wider block">{ui.myInsurerLabel}</label>
                    <select
                      value={currentCaisseId}
                      onChange={(e) => {
                        const newId = e.target.value;
                        setCurrentCaisseId(newId);
                        setUserHasEditedCurrentPremium(false); // let useEffect reset to the default of this insurer
                      }}
                      className="w-full bg-white border border-fennec-cream/70 rounded-xl px-2.5 py-1.5 text-xs text-fennec-dark font-medium focus:outline-none focus:border-fennec-tan"
                    >
                      {CAISSES_MALADIE.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-fennec-brown uppercase tracking-wider block">{ui.myPremiumLabel}</label>
                    <input
                      type="number"
                      min={40}
                      max={1200}
                      value={currentPremiumInput || ''}
                      onChange={(e) => {
                        setCurrentPremiumInput(Number(e.target.value));
                        setUserHasEditedCurrentPremium(true);
                      }}
                      className="w-full bg-white border border-fennec-cream/70 rounded-xl px-2.5 py-1.5 text-xs text-fennec-dark font-bold focus:outline-none focus:border-fennec-tan"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Profile Summary Pills */}
              <div className="space-y-2 text-xs text-left">
                <div className="flex justify-between p-2.5 bg-fennec-cream/10 rounded-xl">
                  <span className="text-fennec-brown font-medium">{ui.cantonResidenceLabel}</span>
                  <span className="font-bold text-fennec-dark">{selectedCantonName} ({filters.canton})</span>
                </div>
                <div className="flex justify-between p-2.5 bg-fennec-cream/10 rounded-xl">
                  <span className="text-fennec-brown font-medium">{ui.zipCodeLabel}</span>
                  <span className="font-bold text-fennec-dark">{filters.zipCode}</span>
                </div>
                <div className="flex justify-between p-2.5 bg-fennec-cream/10 rounded-xl">
                  <span className="text-fennec-brown font-medium">{ui.premiumZoneLabel}</span>
                  <span className="font-bold text-fennec-dark">Région {filters.zone}</span>
                </div>
                <div className="flex justify-between p-2.5 bg-fennec-cream/10 rounded-xl">
                  <span className="text-fennec-brown font-medium">{ui.ageCategoryLabel}</span>
                  <span className="font-bold text-fennec-dark capitalize">
                    {filters.ageCategory === 'adult' ? ui.ageAdultLabel : filters.ageCategory === 'young' ? ui.ageYoungLabel : ui.ageChildLabel}
                  </span>
                </div>
                <div className="flex justify-between p-2.5 bg-fennec-cream/10 rounded-xl">
                  <span className="text-fennec-brown font-medium">{ui.annualFranchiseLabel}</span>
                  <span className="font-bold text-fennec-dark">CHF {filters.franchise}.-</span>
                </div>
                <div className="flex justify-between p-2.5 bg-fennec-cream/10 rounded-xl">
                  <span className="text-fennec-brown font-medium">{ui.insuranceModelsLabel}</span>
                  <span className="font-bold text-fennec-dark text-right text-xs">
                    {(() => {
                      const list = filters.selectedModels || ['family', 'telemed', 'hmo', 'standard'];
                      if (list.length === 4) return ui.allModelsLabel;
                      const labels: Record<string, string> = {
                        family: ui.modelFamilyLabel,
                        telemed: ui.modelTelemedLabel,
                        hmo: ui.modelHmoLabel,
                        standard: ui.modelStandardLabel
                      };
                      return list.map(m => labels[m] || m).join(', ');
                    })()}
                  </span>
                </div>
                <div className="flex justify-between p-2.5 bg-fennec-cream/10 rounded-xl">
                  <span className="text-fennec-brown font-medium">{ui.accidentCoverageLabel}</span>
                  <span className="font-bold text-fennec-dark">{filters.accidentCoverage ? ui.accidentIncludedLabel : ui.accidentExcludedLabel}</span>
                </div>
                <div className="flex justify-between p-2.5 bg-fennec-cream/10 rounded-xl">
                  <span className="text-fennec-brown font-medium">{ui.supplementaryLabel}</span>
                  <span className="font-bold text-fennec-dark">
                    {!filters.supplementaryType || filters.supplementaryType === 'none'
                      ? ui.basicInsuranceOnlyLabel
                      : filters.supplementaryType === 'essential' ? ui.supEssentialLabel
                      : filters.supplementaryType === 'confort' ? ui.supConfortLabel
                      : ui.supPremiumLabel}
                  </span>
                </div>
              </div>

              {/* Toggle to fine-tune filters directly */}
              <div className="border-t border-fennec-cream/30 pt-4">
                <button
                  onClick={() => setShowFiltersInline(!showFiltersInline)}
                  className="w-full text-xs font-bold text-fennec-brown/80 hover:text-fennec-dark flex items-center justify-center p-2 rounded-xl border border-fennec-cream/50 bg-fennec-cream/5 transition-all"
                >
                  <span>{showFiltersInline ? ui.hideAdjustmentsLabel : ui.adjustFiltersLabel}</span>
                </button>
              </div>

              {/* Inline filter form if toggled */}
              {showFiltersInline && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="space-y-4 pt-2 border-t border-fennec-cream/20 overflow-hidden"
                >
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-fennec-brown block">{ui.zipCodeLabel2}</label>
                    <input
                      type="text"
                      maxLength={4}
                      value={filters.zipCode}
                      onChange={(e) => {
                        const clean = e.target.value.replace(/\D/g, '').slice(0, 4);
                        setZipInput(clean);
                        setFilters(prev => {
                          const updated = { ...prev, zipCode: clean };
                          if (clean.length === 4) {
                            const info = resolveZipCode(clean);
                            if (info) {
                              setResolvedInfo(info);
                              updated.canton = info.canton;
                              updated.zone = info.zone;
                            }
                          }
                          return updated;
                        });
                      }}
                      className="w-full bg-white border border-fennec-cream/60 rounded-xl px-2.5 py-1.5 text-xs text-fennec-dark focus:outline-none focus:border-fennec-terracotta font-mono tracking-wider"
                    />
                    {/* Real-time details badge */}
                    <div className="text-[9px] text-fennec-dark/70 font-bold mt-1 flex justify-between items-center bg-fennec-cream/25 px-2 py-1 rounded-md">
                      <span>{ui.cantonResidenceLabel} <span className="text-fennec-terracotta">{filters.canton}</span></span>
                      <span>{ui.premiumZoneLabel} <span className="text-fennec-terracotta">{filters.zone}</span></span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-fennec-brown block">
                      {ui.modelsLabel2.replace('{n}', String(filters.selectedModels?.length || 4))}
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'family', label: ui.modelFamilyLabel2 },
                        { id: 'telemed', label: ui.modelTelemedLabel2 },
                        { id: 'hmo', label: ui.modelHmoLabel2 },
                        { id: 'standard', label: ui.modelStandardLabel2 },
                      ].map((mOpt) => {
                        const activeList = filters.selectedModels || ['family', 'telemed', 'hmo', 'standard'];
                        const isActive = activeList.includes(mOpt.id);
                        return (
                          <button
                            key={mOpt.id}
                            type="button"
                            onClick={() => toggleModel(mOpt.id)}
                            className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center justify-between transition-all ${
                              isActive
                                ? 'bg-fennec-terracotta text-white border-fennec-terracotta shadow-xs'
                                : 'bg-white text-fennec-dark border-fennec-cream/80 hover:bg-fennec-cream/10'
                            }`}
                          >
                            <span>{mOpt.label}</span>
                            <span>{isActive ? '✓' : '+'}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-fennec-brown block">{ui.franchiseLabel2}</label>
                    <select
                      value={filters.franchise}
                      onChange={(e) => handleFilterChange('franchise', Number(e.target.value))}
                      className="w-full bg-white border border-fennec-cream/60 rounded-xl px-2.5 py-1.5 text-xs text-fennec-dark focus:outline-none"
                    >
                      {(filters.ageCategory === 'child' ? [0, 100, 200, 300, 400, 500, 600] : FRANCHISES).map((fran) => (
                        <option key={fran} value={fran}>CHF {fran}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-fennec-brown block">{ui.supplementaryLabel2}</label>
                    <select
                      value={filters.supplementaryType || 'none'}
                      onChange={(e) => handleFilterChange('supplementaryType', e.target.value as any)}
                      className="w-full bg-white border border-fennec-cream/60 rounded-xl px-2.5 py-1.5 text-xs text-fennec-dark focus:outline-none"
                    >
                      <option value="none">{ui.noneBaseOnly}</option>
                      <option value="essential">ESSENTIELLE</option>
                      <option value="confort">CONFORT</option>
                      <option value="premium">PREMIUM</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-fennec-brown block">{ui.sortResultsLabel}</label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange('sortBy', e.target.value as any)}
                      className="w-full bg-white border border-fennec-cream/60 rounded-xl px-2.5 py-1.5 text-xs text-fennec-dark focus:outline-none"
                    >
                      <option value="price">{ui.sortCheapest}</option>
                      <option value="rating">{ui.sortSatisfaction}</option>
                      <option value="name">{ui.sortAlpha}</option>
                    </select>
                  </div>
                </motion.div>
              )}

            </div>

            {/* RIGHT COLUMN: RESULTS LISTING */}
            <div className="lg:col-span-8 space-y-6 order-1 lg:order-2">
              
              {/* Mobile Quick Filter Header */}
              <div className="lg:hidden bg-white border border-fennec-cream rounded-2xl p-4 flex items-center justify-between shadow-xs mb-4">
                <div className="space-y-0.5 text-left">
                  <span className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">{ui.yourSimLabel}</span>
                  <p className="text-xs font-bold text-fennec-dark">
                    NPA {filters.zipCode} ({filters.canton} - Région {filters.zone}) • {filters.ageCategory === 'adult' ? '26+ ans' : filters.ageCategory === 'young' ? '19-25 ans' : 'Enfant'} • CHF {filters.franchise}.-
                  </p>
                </div>
                <button
                  onClick={() => {
                    const target = document.getElementById('health-filter-adjustment-panel');
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-3.5 py-2 bg-fennec-cream text-fennec-dark hover:bg-fennec-sand hover:text-fennec-terracotta rounded-xl text-xs font-bold transition-all flex items-center space-x-1 shrink-0 shadow-3xs"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>{ui.adjustBtn}</span>
                </button>
              </div>
              


              {/* Savings Highlighter Badge */}
              {bestValueCaisse && (
                <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-4">
                  <div className="flex items-center space-x-3.5">
                    <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-600">
                      <Sparkles className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-emerald-950">
                        {ui.potentialSavingsLabel} <span className="text-fennec-red font-black">{ui.upToLabel} {estimatedSavings}.- {ui.perYearLabel}</span>
                      </h4>
                      <p className="text-xs text-emerald-800/80">
                        {ui.savingsGapDesc}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-display font-black text-xs uppercase tracking-wider shadow-xs">
                    {ui.smartAdviceBadge}
                  </div>
                </div>
              )}

              {/* Actual list of companies */}
              <div className="space-y-4">
                {calculatedResults.length === 0 && (
                  <div className="bg-white border border-fennec-cream rounded-3xl p-8 text-center space-y-3">
                    <AlertCircle className="w-10 h-10 text-fennec-terracotta mx-auto" />
                    <h4 className="font-display font-bold text-lg text-fennec-dark">
                      {ui.noResultsTitle}
                    </h4>
                    <p className="text-xs text-fennec-brown max-w-md mx-auto">
                      {ui.noResultsDesc.replace('{zip}', filters.zipCode).replace('{franchise}', String(filters.franchise))}
                    </p>
                    <span className="inline-block text-[10px] text-fennec-dark/60 font-medium bg-fennec-cream/20 px-3 py-1 rounded-full border border-fennec-cream">
                      Source : OFSP/priminfo, primes 2026
                    </span>
                  </div>
                )}

                {calculatedResults.map((caisse, index) => {
                  const isCheapest = index === 0 && filters.sortBy === 'price';
                  return (
                    <div 
                      key={caisse.id}
                      className={`bg-white rounded-3xl border transition-all duration-300 relative overflow-hidden flex flex-col sm:flex-row justify-between p-6 gap-6 items-center ${
                        isCheapest 
                          ? 'border-2 border-fennec-terracotta shadow-md bg-fennec-cream/5' 
                          : 'border-fennec-cream/40 shadow-xs hover:border-fennec-tan hover:shadow-md'
                      }`}
                    >
                      {/* Cheapest marker */}
                      {isCheapest && (
                        <span className="absolute top-0 left-0 bg-fennec-terracotta text-white text-[9px] font-bold uppercase py-1 px-4 rounded-br-2xl shadow-sm tracking-wider flex items-center">
                          <Award className="w-3 h-3 mr-1" />
                          {ui.cheapestLabel}
                        </span>
                      )}

                      {/* Left: Brand logo & satisfaction */}
                      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                        {/* Real circular insurer logo badge */}
                        <CompanyLogo id={caisse.insurerId || caisse.id || caisse.name} className="w-20 h-20 shrink-0" />

                        <div className="text-center sm:text-left">
                          <div className="flex items-center flex-wrap gap-2 mt-1 justify-center sm:justify-start">
                            <h4 className="font-display font-bold text-lg text-fennec-dark flex items-center">
                              {caisse.name}
                            </h4>
                            
{/* MODIFICATION: Display exact model name (realModelName) matching the offer model shown at bottom */}
{(caisse.realModelName || caisse.modelType) && (
  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-fennec-tan/30 text-fennec-dark border border-fennec-tan/50">
    {caisse.realModelName || (caisse.modelType === 'telemed' ? ui.modelTelemedLabel2 : caisse.modelType === 'hmo' ? ui.modelHmoLabel2 : caisse.modelType === 'family' ? ui.modelFamilyLabel2 : ui.modelStandardLabel2)}
  </span>
)}
                          </div>
                          <p className="text-xs text-fennec-brown font-medium mt-0.5 line-clamp-1 max-w-xs truncate">
                            {caisse.notes}
                          </p>
                          
                          {/* Customer Rating */}
                          <div className="flex items-center justify-center sm:justify-start mt-2 space-x-1.5">
                            <div className="flex text-amber-400" title={`Satisfaction : ${caisse.rating} / 6`}>
                              {Array.from({ length: 6 }).map((_, i) => (
                                <span key={i} className="text-xs">
                                  {i < Math.round(caisse.rating) ? '★' : '☆'}
                                </span>
                              ))}
                            </div>
                            <span className="text-xs font-bold text-fennec-dark/70">
                              {caisse.rating.toFixed(1)} / 6
                            </span>
                            
                          </div>
                        </div>
                      </div>

                      {/* Middle: Prime pricing */}
                      <div className="text-center sm:text-right shrink-0 space-y-1.5">
                        <div>
                          <span className="text-[10px] font-bold tracking-widest text-fennec-brown uppercase block">
                            {ui.netPriceLabel}
                          </span>
                          <div className="flex items-baseline justify-center sm:justify-end min-h-[36px]">
                            {caisse.computedPremium > 0 ? (
                              <>
                                <span className="text-xs font-extrabold text-fennec-dark mr-1">CHF</span>
                                <span className="text-3xl font-display font-black text-fennec-dark tracking-tight">
                                  {caisse.computedPremium.toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="text-sm font-bold text-fennec-brown/80 bg-fennec-cream/40 px-3 py-1 rounded-lg">
                                {ui.notAvailableLabel}
                              </span>
                            )}
                          </div>
                          {caisse.computedPremium > 0 && (
                            <span className="text-[10px] text-emerald-700 font-semibold block">
                              {ui.envTaxLabel}
                            </span>
                          )}
                        </div>

                        {/* Official OFSP / priminfo Source Notice */}
                        <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-150 text-[9px] text-emerald-800 font-bold">
                          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                          <span>{ui.sourceLabel}</span>
                        </div>

                        {/* Real retrieved model name */}
                        {caisse.realModelName && (
                          <div className="text-[9px] text-fennec-dark/70 font-mono italic block text-center sm:text-right">
                            {ui.modelLabel} {caisse.realModelName}
                          </div>
                        )}
                      </div>

                      {/* Right: CTA button */}
                      <div className="w-full sm:w-auto text-center sm:text-right shrink-0">
                        <button
                          disabled={caisse.computedPremium === 0}
                          onClick={() => handleOpenForm(caisse)}
                          className={`w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full font-display font-bold text-sm shadow-sm transition-all duration-200 ${
                            caisse.computedPremium === 0
                              ? 'bg-fennec-cream/40 text-fennec-dark/30 cursor-not-allowed border border-fennec-cream/70'
                              : isCheapest
                              ? 'bg-fennec-terracotta hover:bg-fennec-dark text-white shadow-md shadow-fennec-terracotta/15'
                              : 'bg-fennec-cream hover:bg-fennec-sand text-fennec-dark border border-fennec-tan/40'
                          }`}
                        >
                          <span>{caisse.computedPremium === 0 ? ui.unavailableBtn : ui.getOfferBtn}</span>
                          <ChevronRight className="w-4 h-4 ml-1.5" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Official disclaimers underneath list */}
              <div className="bg-fennec-cream/20 rounded-3xl p-6 border border-fennec-cream/30 space-y-4 text-xs text-fennec-dark/75 leading-relaxed">
                <h5 className="font-display font-bold text-sm text-fennec-dark uppercase tracking-wide flex items-center">
                  <Shield className="w-4.5 h-4.5 mr-2 text-fennec-tan" />
                  {ui.complianceTitle}
                </h5>
                <p>
                  <strong>{ui.complianceP1Title}</strong> {ui.complianceP1Body}
                </p>
                <p>
                  
                </p>
              
                <p>
                  <strong>{ui.complianceP2Title}</strong> {ui.complianceP2Body}
                </p>
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {selectedCaisse && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 md:pt-20 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[calc(100vh-2rem)] flex flex-col overflow-hidden shadow-2xl border border-fennec-cream relative animate-in fade-in zoom-in duration-200">
            
            {/* Close button */}
            <button 
              onClick={handleCloseForm}
              className="absolute top-4 right-4 p-2 rounded-full text-fennec-dark/60 hover:text-fennec-dark hover:bg-fennec-cream/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Mascot Banner Header */}
            <div className="bg-fennec-cream/30 p-6 flex items-center space-x-4 border-b border-fennec-cream/40">
              <div className="w-16 h-16 rounded-full border-2 border-white overflow-hidden shadow-sm shrink-0 bg-white">
                <img 
                  src={fenyWinking} 
                  alt="Fenny" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/fennec-logo.jpg';
                  }}
                />
              </div>
              <div>
                <span className="text-[10px] font-bold text-fennec-terracotta uppercase tracking-wider block">
                  {ui.smartAdviceBadge}
                </span>
                <h4 className="font-display font-extrabold text-xl text-fennec-dark">
                  {ui.getOfferBtn} {selectedCaisse.name}
                </h4>
              </div>
            </div>

            {/* Sleek GSAP Modal Progress Bar */}
            <div className="h-1 w-full bg-fennec-cream/20 overflow-hidden relative">
              <div 
                ref={modalProgressRef}
                className="h-full bg-fennec-terracotta origin-left"
                style={{ width: '0%' }}
              />
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <p className="text-xs text-fennec-dark/85 leading-relaxed">
                    {ui.modalIntroText.replace('{insurer}', selectedCaisse.name).replace('{model}', selectedCaisse.realModelName || 'LAMal').replace('{franchise}', String(filters.franchise)).replace('{canton}', filters.canton)}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="modal-stagger-item space-y-1.5">
                      <label className="text-xs font-bold text-fennec-dark block">{ui.firstNameLabel2}</label>
                      <input 
                        type="text" 
                        required
                        placeholder={ui.firstNamePlaceholder2}
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({...prev, firstName: e.target.value}))}
                        onMouseEnter={() => setFenyAdvice(HEALTH_ADVICE_MAP.firstName)}
                        onMouseLeave={() => setFenyAdvice(null)}
                        onFocus={() => setFenyAdvice(HEALTH_ADVICE_MAP.firstName)}
                        onBlur={() => setFenyAdvice(null)}
                        className="w-full bg-fennec-cream/5 border border-fennec-cream/70 rounded-xl px-3 py-2 text-base md:text-sm text-fennec-dark focus:outline-none focus:border-fennec-tan font-medium"
                      />
                    </div>
                    <div className="modal-stagger-item space-y-1.5">
                      <label className="text-xs font-bold text-fennec-dark block">{ui.lastNameLabel2}</label>
                      <input 
                        type="text" 
                        required
                        placeholder={ui.lastNamePlaceholder2}
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({...prev, lastName: e.target.value}))}
                        onMouseEnter={() => setFenyAdvice(HEALTH_ADVICE_MAP.lastName)}
                        onMouseLeave={() => setFenyAdvice(null)}
                        onFocus={() => setFenyAdvice(HEALTH_ADVICE_MAP.lastName)}
                        onBlur={() => setFenyAdvice(null)}
                        className="w-full bg-fennec-cream/5 border border-fennec-cream/70 rounded-xl px-3 py-2 text-base md:text-sm text-fennec-dark focus:outline-none focus:border-fennec-tan font-medium"
                      />
                    </div>
                  </div>

                  <div className="modal-stagger-item space-y-1.5">
                    <label className="text-xs font-bold text-fennec-dark block">{ui.emailLabel2}</label>
                    <input 
                      type="email" 
                      required
                      placeholder="nom@exemple.ch"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                      onMouseEnter={() => setFenyAdvice(HEALTH_ADVICE_MAP.email)}
                      onMouseLeave={() => setFenyAdvice(null)}
                      onFocus={() => setFenyAdvice(HEALTH_ADVICE_MAP.email)}
                      onBlur={() => setFenyAdvice(null)}
                      className="w-full bg-fennec-cream/5 border border-fennec-cream/70 rounded-xl px-3 py-2 text-base md:text-sm text-fennec-dark focus:outline-none focus:border-fennec-tan font-medium"
                    />
                  </div>

                  <div className="modal-stagger-item space-y-1.5">
                    <label className="text-xs font-bold text-fennec-dark block">{ui.phoneLabel2}</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="079 123 45 67"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                      onMouseEnter={() => setFenyAdvice(HEALTH_ADVICE_MAP.phone)}
                      onMouseLeave={() => setFenyAdvice(null)}
                      onFocus={() => setFenyAdvice(HEALTH_ADVICE_MAP.phone)}
                      onBlur={() => setFenyAdvice(null)}
                      className="w-full bg-fennec-cream/5 border border-fennec-cream/70 rounded-xl px-3 py-2 text-base md:text-sm text-fennec-dark focus:outline-none focus:border-fennec-tan font-medium"
                    />
                  </div>

                  <div className="modal-stagger-item space-y-1.5">
                    <label className="text-xs font-bold text-fennec-dark block">{ui.callbackLabel}</label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData(prev => ({...prev, timeSlot: e.target.value}))}
                      className="w-full bg-white border border-fennec-cream/70 rounded-xl px-3 py-2 text-base md:text-sm text-fennec-dark focus:outline-none focus:border-fennec-tan font-medium"
                    >
                      <option value="anytime">{ui.callbackAnytime}</option>
                      <option value="morning">{ui.callbackMorning}</option>
                      <option value="lunch">{ui.callbackLunch}</option>
                      <option value="afternoon">{ui.callbackAfternoon}</option>
                      <option value="evening">{ui.callbackEvening}</option>
                    </select>
                  </div>

                  <div className="modal-stagger-item pt-1">
                    <label className="flex items-start space-x-2.5 cursor-pointer bg-fennec-cream/15 p-3 rounded-xl border border-fennec-cream/70 hover:bg-fennec-cream/25 transition-colors">
                      <input 
                        type="checkbox" 
                        required
                        checked={modalConsentAccepted} 
                        onChange={(e) => setModalConsentAccepted(e.target.checked)} 
                        className="mt-0.5 w-4 h-4 rounded text-fennec-terracotta focus:ring-fennec-terracotta border-fennec-cream/80 cursor-pointer" 
                      />
                      <span className="text-[11px] text-fennec-dark/80 leading-snug select-none">
                        {ui.consentCheckboxLabel || "J'accepte les conditions d'utilisation et la politique de confidentialité (nLPD), et je consens expressément à recevoir mon comparatif personnalisé gratuit."}
                      </span>
                    </label>
                  </div>

                  {formError && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs font-bold rounded-xl border border-red-200">
                      {formError}
                    </div>
                  )}

                  <div className="modal-stagger-item pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-fennec-terracotta hover:bg-fennec-dark text-white font-display font-extrabold text-sm rounded-full shadow-md shadow-fennec-terracotta/20 transition-all flex items-center justify-center space-x-2"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>{ui.submitOfferBtn}</span>
                    </button>
                    <span className="text-[10px] text-fennec-dark/50 text-center block mt-2">
                      {ui.privacyNote2}
                    </span>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="inline-flex p-3 bg-emerald-100 text-emerald-600 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h5 className="font-display font-extrabold text-xl text-emerald-900">
                    {ui.successTitle}
                  </h5>
                  <p className="text-sm text-fennec-dark/80 max-w-sm mx-auto">
                    {ui.successBody.replace('{firstName}', formData.firstName)}
                  </p>
                  <p className="text-xs text-fennec-dark/70 leading-relaxed bg-fennec-cream/10 p-4 rounded-xl border border-fennec-cream/30">
                    {ui.successFollowUp.replace('{slot}', formData.timeSlot === 'anytime' ? ui.slotAnytime : formData.timeSlot === 'morning' ? ui.slotMorning : formData.timeSlot === 'lunch' ? ui.slotLunch : formData.timeSlot === 'afternoon' ? ui.slotAfternoon : ui.slotEvening)}
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={handleCloseForm}
                      className="px-6 py-2 bg-fennec-dark hover:bg-fennec-terracotta text-white font-display font-bold text-xs rounded-full transition-colors"
                    >
                      {ui.closeFormBtn}
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
