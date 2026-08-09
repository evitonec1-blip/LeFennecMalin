/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ASSUREURS_VIE, getLifeInsuranceEstimate } from '../data';
import { LifeFilterState, AssureurVie } from '../types';
import { calculateSwiss3rdPillarSimulation } from '../utils/swissTax';
import { useLanguage } from '../i18n/LanguageContext';
import fenyWinking from '../assets/images/Gemini_Generated_Image_qxhpmlqxhpmlqxhp.png';
import fenyThinking from '../assets/images/feny_thinking_1783331247759.jpg';
import fenyAvatar from '../assets/images/feny_mascot_avatar_1783245725195.jpg';
import fenySavings from '../assets/images/feny_mascot_savings_1783245711111.jpg';
import fenyCompare from '../assets/images/feny_mascot_compare_1783245694484.jpg';
import fenyAnalyse from '../assets/images/feny_analyse_1783331235825.jpg';
import { 
  Shield, 
  PiggyBank, 
  Sparkles, 
  Filter, 
  ChevronRight, 
  ChevronLeft,
  User,
  Calculator, 
  FileCheck, 
  Check, 
  Percent, 
  X, 
  Info,
  SlidersHorizontal,
  Loader2,
  RefreshCw,
  TrendingUp,
  Award,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import CompanyLogo from './CompanyLogo';

const LIFE_ADVICE_MAPS: Record<string, Record<string, string>> = {
  fr: {
    type: "Le Pilier 3a (Lié) offre d'excellentes déductions d'impôts directes mais reste bloqué. Le Pilier 3b (Libre) est totalement flexible pour des retraits libres à tout moment.",
    personal: "Vos informations de naissance, canton et revenus déterminent directement le gain fiscal potentiel de votre 3ème pilier.",
    product: "Choisissez entre un compte d'épargne bancaire classique ou des fonds en titres (actions/ETF) pour booster votre rendement historique.",
    coverage: "Une assurance-vie combinée peut protéger vos proches en cas de décès et exonérer vos primes d'épargne si vous êtes invalide.",
    savings: "Indiquez votre capacité d'épargne. Chaque franc épargné réduit votre revenu imposable (jusqu'à CHF 7'258/an pour salarié LPP).",
    risk: "Votre profil de risque détermine la part boursière investie. Sur le long terme, les fonds en actions surperforment largement.",
    withdrawal: "Un projet de logement principal, de travail indépendant ou de départ de Suisse permet un retrait anticipé du Pilier 3a.",
    existing: "Si vous possédez déjà un 3ème pilier, analyser ses performances et ses frais actuels permet souvent d'envisager un transfert avantageux.",
    priority: "Définissez ce qui compte le plus : réduire vos coûts, booster le rendement, garder de la flexibilité ou garantir la sécurité."
  },
  de: {
    type: "Die Säule 3a bietet direkte Steuerabzüge, ist jedoch gebunden. Die Säule 3b ist flexibel und jederzeit frei verfügbar.",
    personal: "Ihre Angaben zu Geburtsdatum, Kanton und Einkommen bestimmen den möglichen Steuervorteil Ihrer 3. Säule.",
    product: "Wählen Sie zwischen einem klassischen Sparkonto oder Wertschriftenfonds (Aktien/ETF) zur Steigerung der Rendite.",
    coverage: "Eine kombinierte Lebensversicherung schützt Ihre Angehörigen und übernimmt die Prämienzahlung bei Erwerbsunfähigkeit.",
    savings: "Geben Sie Ihre Sparkapazität an. Jeder gesparte Franken reduziert Ihr steuerbares Einkommen.",
    risk: "Ihr Risikoprofil bestimmt den Aktienanteil. Langfristig erzielen Aktienfonds höhere Renditen.",
    withdrawal: "Wohneigentum, Selbstständigkeit oder Auswanderung ermöglichen einen Vorbezug der Säule 3a.",
    existing: "Bestehende 3. Säulen können auf Kosten und Performance analysiert und gegebenenfalls optimiert werden.",
    priority: "Legen Sie Ihre Priorität fest: Kosten senken, Rendite steigern, Flexibilität wahren oder Sicherheit garantieren."
  },
  en: {
    type: "Pillar 3a offers direct tax deductions but remains tied until retirement. Pillar 3b is fully flexible with free withdrawals.",
    personal: "Your birth date, canton, and income directly calculate the tax savings potential of your 3rd pillar.",
    product: "Choose between a traditional savings account or securities funds (stocks/ETFs) to boost historical returns.",
    coverage: "A combined life policy protects your loved ones in case of death and waives premiums if disabled.",
    savings: "Specify your savings capacity. Every saved franc reduces your taxable income.",
    risk: "Your risk tolerance sets the equity percentage. In the long run, equity funds outperform cash savings.",
    withdrawal: "Homeownership, self-employment, or leaving Switzerland allow early Pillar 3a withdrawals.",
    existing: "Existing 3rd pillars can be analyzed for fees and performance to evaluate a transfer.",
    priority: "Define your priority: lower costs, boost returns, preserve flexibility, or guarantee security."
  },
  it: {
    type: "Il Pilastro 3a offre deduzioni fiscali dirette ma è vincolato. Il Pilastro 3b è flessibile con prelievi liberi.",
    personal: "Data di nascita, cantone e reddito determinano il risparmio fiscale del tuo 3° pilastro.",
    product: "Scegli tra conto risparmio bancario o fondi in titoli (azioni/ETF) per incrementare il rendimento.",
    coverage: "Un'assicurazione vita integrata protegge i tuoi cari in caso di decesso e ti esonera dal pagamento se invalido.",
    savings: "Indica la tua capacità di risparmio. Ogni franco risparmiato riduce il tuo reddito imponibile.",
    risk: "Il tuo profilo di rischio definisce la quota azionaria. A lungo termine le azioni garantiscono rendimenti superiori.",
    withdrawal: "Acquisto casa, lavoro indipendente o partenza dalla Svizzera permettono il prelievo anticipato del 3a.",
    existing: "Un 3° pilastro esistente può essere analizzato nei costi per valutare un trasferimento vantaggioso.",
    priority: "Definisci la tua priorità: ridurre i costi, aumentare la resa, mantenere la flessibilità o garantire la sicurezza."
  }
};

function FormTooltip({ content }: { content: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <span ref={tooltipRef} className="relative inline-block ml-1.5 align-middle">
      <button
        type="button"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        className="text-fennec-brown/60 hover:text-fennec-terracotta transition-colors focus:outline-none p-0.5 rounded-full hover:bg-fennec-cream/20 cursor-help flex items-center justify-center"
        aria-label="Plus d'informations"
      >
        <Info className="w-3.5 h-3.5" />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-fennec-dark text-white rounded-xl shadow-lg border border-fennec-cream/10 text-left text-xs leading-normal pointer-events-none font-sans font-normal normal-case block"
          >
            {content}
            {/* Tooltip Arrow */}
            <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-fennec-dark block" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

const LIFE_UI_TEXTS: Record<string, Record<string, string>> = {
  fr: {
    heroTitle: "Simulateur 3e Pilier & Prévoyance Suisse",
    heroSubtitle: "Trouvez la meilleure stratégie d'épargne et réduisez vos impôts jusqu'à CHF 3'000.- / an.",
    backBtn: "Retour",
    continueBtn: "Continuer",
    verificationStepBtn: "Étape de vérification",
    step1Title: "1. Quel type de 3e Pilier recherchez-vous ?",
    step1Subtitle: "Le 3ème pilier vous permet de vous constituer un capital de retraite tout en économisant d'importants impôts chaque année.",
    p3aLabel: "Pilier 3a (Lié)",
    p3aDesc: "Déduction fiscale maximale",
    p3aDetails: "Bloqué légalement jusqu'à la retraite. Idéal pour économiser d'importants impôts fédéraux et cantonaux.",
    p3bLabel: "Pilier 3b (Libre)",
    p3bDesc: "Flexibilité totale des retraits",
    p3bDetails: "Pas de déduction fiscale de base (sauf GE/FR), mais capital disponible à tout moment sans conditions.",
    pUnknownLabel: "Je ne sais pas encore",
    pUnknownDesc: "Aide-moi à choisir !",
    pUnknownDetails: "Permet d'étudier les deux solutions pour composer l'offre la plus adaptée.",
    step2Title: "2. Votre profil personnel (obligatoire)",
    step2Subtitle: "L'âge, le canton et les revenus influencent fortement le calcul des primes de base et l'économie d'impôt maximale réelle.",
    birthDateLabel: "Date de naissance de l'assuré (JJ.MM.AAAA) *",
    birthDatePlaceholder: "Ex: 28.05.1990",
    invalidDateErr: "⚠️ Date invalide ou impossible",
    calculatedAge: "✓ Âge calculé :",
    yearsOld: "ans",
    birthDateHelper: "Saisissez les 8 chiffres de votre date de naissance. Très rapide sur mobile.",
    genderLabel: "Sexe légal *",
    male: "Homme",
    female: "Femme",
    cantonLabel: "Canton de résidence *",
    employmentLabel: "Statut professionnel *",
    salaried: "Salarié (avec caisse de pension LPP)",
    independent: "Indépendant (sans caisse de pension)",
    unemployed: "Sans activité lucrative / Autre",
    incomeLabel: "Revenu annuel brut (CHF)",
    hasSecondPillarLabel: "Déjà affilié à un 2ème pilier (LPP) ?",
    yes: "Oui",
    no: "Non",
    step3Title: "3. Quel type de produit souhaitez-vous ?",
    step3Subtitle: "Les solutions bancaires privilégient la flexibilité pure, tandis que les assurances combinent couverture décès-invalidité et épargne forcée.",
    pureSavings: "Épargne pure",
    pureSavingsDesc: "Pas de risque boursier, capital garanti.",
    equitySavings: "Épargne en titres (Fonds / ETF)",
    equitySavingsDesc: "Placement boursier pour dynamiser le rendement sur le long terme.",
    mixedProduct: "Formule Mixte (Fonds + Assurance)",
    mixedProductDesc: "Combinaison flexible d'un capital garanti et d'un investissement actions.",
    equityPartTitle: "Quelle part d'actions visez-vous ?",
    step4Title: "4. Prévoyance & Besoins de couverture",
    step4Subtitle: "Déterminez les garanties complémentaires indispensables pour protéger vos bénéficiaires en cas de coup dur.",
    deathTitle: "Couverture décès complémentaire",
    deathDesc: "Versement d'un capital garanti à vos proches en cas de décès.",
    deathCapitalLabel: "Capital décès souhaité (CHF)",
    disabilityTitle: "Rente d'invalidité",
    disabilityDesc: "Rente annuelle versée en cas d'incapacité de travail.",
    premiumExemptionTitle: "Libération des primes",
    premiumExemptionDesc: "L'assureur paie à votre place en cas d'invalidité.",
    dependentsTitle: "Personnes à charge",
    dependentsDesc: "Conjoint ou enfants à charge légale.",
    step5Title: "5. Déterminez votre capacité d'épargne",
    step5Subtitle: "Définissez la fréquence, le montant à épargner et la durée souhaitée. Vous pouvez modifier ces valeurs à tout moment.",
    frequencyLabel: "Fréquence de versement",
    monthly: "Mensuel",
    yearly: "Annuel",
    estimatedSaving: "Versement estimé",
    estimatedTaxSavings: "Gain fiscal estimé : ~CHF",
    perYear: "/ an",
    perMonth: "/ mois",
    commitmentLabel: "Niveau d'engagement contractuel",
    fixedRegular: "Fixe régulier",
    fixedRegularDesc: "Prévoyance assurée",
    bothCommitment: "Les deux",
    bothCommitmentDesc: "Solution hybride",
    investmentHorizonLabel: "Horizon de placement",
    estimatedRetirementYear: "retraite estimée en",
    yearsUnit: "ans",
    step6Title: "6. Déterminez votre profil de risque boursier",
    step6Subtitle: "Si vous choisissez d'allouer une part d'actions (solutions titres), votre tolérance détermine la volatilité maximale acceptable.",
    temperamentLabel: "Votre tempérament face aux fluctuations",
    prudent: "Prudent (0-25% actions)",
    prudentDesc: "Recherche de sécurité, gains modestes.",
    balanced: "Équilibré (25-50% actions)",
    balancedDesc: "Compromis parfait entre croissance et stabilité.",
    dynamic: "Dynamique (50-75% actions)",
    dynamicDesc: "Prêt à accepter des hausses et baisses modérées.",
    offensive: "Offensif (100% actions)",
    offensiveDesc: "Volatilité maximale acceptée pour un rendement ultime.",
    marketDropTitle: "Si les marchés chutent de 20% en quelques mois :",
    sellAll: "Je vends tout par peur",
    holdWise: "Je patiente sagement",
    buyMore: "J'en profite pour réinvestir",
    esgTitle: "Fonds durables / Critères ESG uniquement",
    esgDesc: "Exclure l'armement, le charbon, etc. et privilégier l'éco-responsable.",
    step7Title: "7. Envisagez-vous un retrait anticipé du capital ?",
    step7Subtitle: "En Suisse, la loi autorise le retrait anticipé du Pilier 3a dans des cas bien précis. L'indiquer permet de calibrer la durée d'engagement optimale.",
    residenceOption: "Oui, pour l'achat de ma résidence principale",
    residenceOptionDesc: "Acquisition immobilière ou amortissement hypothécaire.",
    independentOption: "Oui, pour me lancer comme indépendant (LPP)",
    independentOptionDesc: "Création d'entreprise individuelle ou début d'activité commerciale.",
    abroadOption: "Oui, car je prévois de quitter la Suisse",
    abroadOptionDesc: "Départ définitif de la Confédération suisse.",
    noneOption: "Non, aucun projet de retrait avant la retraite",
    noneOptionDesc: "Laisser fructifier mon épargne jusqu'à l'âge légal.",
    withdrawalHorizonTitle: "Sous quel horizon estimez-vous ce retrait ?",
    under5Years: "Moins de 5 ans",
    from5to10Years: "5 à 10 ans",
    over10Years: "Plus de 10 ans",
    step8Title: "8. Possédez-vous déjà un 3ème Pilier ?",
    step8Subtitle: "Si vous possédez déjà un 3e pilier bancaire ou d'assurance, nous pouvons analyser s'il est plus judicieux de le racheter ou de le compléter.",
    hasPillarQuestion: "Détenez-vous un 3ème pilier actuellement ?",
    hasPillarDesc: "Qu'il s'agisse d'un compte bancaire ou d'une police d'assurance active.",
    insurerNameLabel: "Nom de l'assureur/banque actuel",
    accumulatedAmountLabel: "Montant déjà accumulé (CHF)",
    stepGoalTitle: "Quel est votre objectif de démarche ?",
    newContract: "Un nouveau contrat complémentaire",
    transferContract: "Transfert / Rachat de mon contrat actuel",
    step9Title: "9. Quelles sont vos priorités de comparaison ?",
    step9Subtitle: "Cliquez sur les options pour attribuer la priorité n°1 et la priorité n°2 de votre recherche de rendement et de couverture.",
    yieldPriority: "Rendement potentiel le plus élevé",
    yieldPriorityDesc: "Allocation boursière ou titres performants visée.",
    feesPriority: "Frais d'entrée et coûts de gestion les plus bas",
    feesPriorityDesc: "Minimiser l'impact des frais administratifs.",
    flexibilityPriority: "Flexibilité totale des versements libres",
    flexibilityPriorityDesc: "Pouvoir verser ce que vous voulez, quand vous voulez.",
    securityPriority: "Sécurité et capital garanti contractuellement",
    securityPriorityDesc: "Aucun risque boursier sur l'épargne accumulée.",
    coveragePriority: "Prévoyance complète (Assurances Décès/Invalidité)",
    coveragePriorityDesc: "Protéger son conjoint et ses enfants de façon optimale.",
    priority1: "Priorité 1",
    priority2: "Priorité 2",
    selectBtn: "Sélectionner",
    step10Title: "Informations personnelles",
    step10Subtitle: "Ces données réglementaires permettent d'appliquer les barèmes légaux précis de l'OFSP et d'estimer vos risques pour les complémentaires.",
    firstNameLabel: "Prénom *",
    firstNamePlaceholder: "Ex: Sophie",
    lastNameLabel: "Nom de famille *",
    lastNamePlaceholder: "Ex: Rochat",
    emailLabel: "Adresse E-mail *",
    phoneLabel: "Téléphone Mobile Suisse *",
    errFillRequired: "{ui.formErrorMsg}",
    errSendingCode: "Erreur lors de l'envoi du code par e-mail.",
    errContactServer: "Impossible de contacter le serveur de vérification.",
    sendingCodeBtn: "Envoi du code e-mail en cours...",
    receiveCodeBtn: "Recevoir mon code de validation par E-mail",
    codeSentTitle: "Code de sécurité envoyé par e-mail !",
    codeSentBody: "Veuillez vérifier la boîte de réception de {email} et saisir le code à 4 chiffres ci-dessous.",
    enterCodeLabel: "Saisir le Code de Sécurité *",
    errEnter4Digits: "Veuillez saisir le code à 4 chiffres reçu par e-mail.",
    errIncorrectCode: "Code de vérification incorrect.",
    errVerifyCode: "Erreur lors de la vérification du code.",
    verifyingBtn: "Vérification en cours...",
    validateCodeBtn: "Valider le code & afficher les résultats",
    editDetailsBtn: "Modifier mes coordonnées",
    fennyMessageTitle: "Message de Fenny :",
    fennyMessageText: "\"Afin de valider votre dossier et de vous présenter les vraies simulations certifiées du 3e pilier 2026, un code de sécurité à 4 chiffres vient d'être généré et envoyé à l'adresse {email} !\"",
    yourEmail: "votre e-mail",
    footerCommitment: "Fenny s'engage : 100% anonyme, conforme à la nLPD suisse, aucune revente de données.",
    embeddedTitle: "Simulez votre gain fiscal du 3ème Pilier avec Fenny",
    embeddedSubtitle: "Épargnez pour votre retraite tout en réduisant vos impôts suisses dès cette année. Comparez instantanément les offres de Pilier 3a / 3b des plus grands assureurs du pays (AXA, Zurich, Swiss Life, Helvetia, Allianz, etc.) et projetez votre capital futur.",
    embeddedStat1: "Jusqu'à CHF 3'000 d'économie fiscale par an pour les salariés",
    embeddedStat2: "Simulation personnalisée de capital à terme",
    embeddedStat3: "Neutre, indépendant & conforme nLPD",
    embeddedBtn: "Lancer la simulation 3ème Pilier",
    analyzingTitle: "Analyse fiscale & prévoyance...",
    restartBtn: "Recommencer",
    pensionTypeLabel: "{ui.pensionTypeLabel}",
    pillar3aLinked: "Pilier 3a (Lié)",
    pillar3bFree: "Pilier 3b (Libre)",
    mixedShort: "Mixte",
    monthlyPaymentLabel: "Versement mensuel :",
    contractDurationLabel: "{ui.contractDurationLabel}",
    yourProfileLabel: "{ui.yourProfileLabel}",
    profileYoung: "Jeune actif",
    profileFamily: "Famille",
    profileSenior: "Sénior",
    profileIndependent: "Indépendant",
    majorPriorityLabel: "{ui.majorPriorityLabel}",
    priorityTaxSaving: "Baisse d'impôt max",
    priorityHighYield: "Rendement Actions",
    priorityGuaranteed: "Capital Garanti 100%",
    hideAdjustments2: "Masquer les ajustements",
    adjustSlidersDirectly: "Ajuster les curseurs directement",
    monthlyPaymentShort: "Versement mensuel",
    contractDurationShort: "Durée contractuelle",
    priorityFieldLabel: "Priorité",
    legalLimits3aLabel: "{ui.legalLimits3aLabel}",
    salariedCapLabel: "{ui.salariedCapLabel}",
    independentCapLabel: "{ui.independentCapLabel}",
    yourSimulationLabel: "Votre simulation",
    pensionWordShort: "Prévoyance",
    adjustBtn: "Ajuster",
    officialWarningTitle: "{ui.officialWarningTitle}",
    officialWarningDesc: "{ui.officialWarningDesc}",
    estimatedTaxSavingsCardLabel: "Économie fiscale estimée",
    totalTaxReductionPrefix: "Équivaut à une réduction fiscale totale d'environ",
    totalTaxReductionSuffix: "sur la durée.",
    recommendationLabel: "Recommandation",
    recoMixed: "Optez pour un modèle mixte Actions/Obligations",
    recoGuaranteed: "Privilégiez la sécurité du capital garanti",
    recoTaxSaving: "Maximisez votre 3a lié pour l'avantage fiscal",
    recoDesc: "{ui.recoDesc}",
    filterSortLabel: "Filtrer & Trier les offres 3e pilier",
    insurersAvailableLabel: "assureurs disponibles",
    allInsurersTab: "Tous les assureurs",
    maxYieldTab: "Rendement max (Actions)",
    securityCapitalTab: "Sécurité & Capital",
    highestGuaranteedBadge: "Capital garanti le plus élevé",
    hideDetailsBtn: "Masquer les détails",
    techSheetBtn: "Fiche technique",
    yourProjectionLabel: "Votre Projection",
    officialRegulationTitle: "Réglementation Officielle AFC & Dépôt Actuariel 2026",
    certifiedBadge: "CERTIFIÉ SWISS-ACCURACY • 100% FIABLE",
    savingsLimitsLabel: "Épargne & Plafonds",
    desiredAnnualPaymentLabel: "{ui.desiredAnnualPaymentLabel}",
    legalSwissLimitLabel: "{ui.legalSwissLimitLabel}",
    eligibleAmountLabel: "{ui.eligibleAmountLabel}",
    exceedsCapPrefix: "⚠️ Le versement dépasse le plafond suisse 3a (",
    exceedsCapSuffix: "). La simulation a été ajustée de manière légitime.",
    capStatusSalaried: "Salarié",
    capStatusIndependent: "Indépendant",
    feesAndRiskPremiumsLabel: "Frais & Primes de Risque",
    netAdminFeesLabel: "{ui.netAdminFeesLabel}",
    cumulativeAdminFeesLabel: "{ui.cumulativeAdminFeesLabel}",
    monthlyRiskPremiumsLabel: "{ui.monthlyRiskPremiumsLabel}",
    netSavingsPortionLabel: "{ui.netSavingsPortionLabel}",
    taxOptimizationLabel: "Optimisation Fiscale & Retrait",
    combinedMarginalRateLabel: "Taux marginal combiné",
    taxSavingsPerYearLabel: "{ui.taxSavingsPerYearLabel}",
    withdrawalTaxRateLabel: "{ui.withdrawalTaxRateLabel}",
    taxPaidAtWithdrawalLabel: "{ui.taxPaidAtWithdrawalLabel}",
    actuarialSolvencyNoteLabel: "Note actuarielle de solvabilité",
    solvencyNotePrefix: "Calculé sur un rendement boursier moyen retenu de",
    solvencyNoteMiddle: "brut. Le gain fiscal cumulé sur la période est de",
    solvencyNoteSuffix: "selon le barème officiel de la Confédération.",
    netRealCapitalPaidLabel: "Capital Net Réel Versé (Payout)",
    afterTaxDeductionNote: "Après déduction de l'impôt séparé sur le retrait de capital",
    complianceRegElementsTitle: "Éléments réglementaires de la Prévoyance Individuelle :",
    pillar3aRegText: "{ui.pillar3aRegText}",
    pillar3bRegText: "{ui.pillar3bRegText}",
    simulationDisclaimer: "{ui.simulationDisclaimer}",
    studyOfferedLabel: "Étude de Prévoyance Offerte",
    yourStudyLabel: "Votre étude",
    summaryProjectionLabel: "Projection récapitulative :",
    monthlySavingsPrefix: "Épargne mensuelle de",
    monthlySavingsMiddle1: "sur",
    monthlySavingsMiddle2: "ans. Capital final estimé (fonds) :",
    monthlySavingsMiddle3: "chez",
    monthlySavingsMiddle4: ". Gain fiscal moyen cumulé :",
    monthlySavingsSuffix: "d'économies d'impôts directes !",
    activityStatusLabel: "Votre statut d'activité",
    salariedWithLpp: "Salarié(e) (Avec LPP)",
    independentWithoutLpp: "Indépendant(e) (Sans LPP)",
    formErrorMsg: "Veuillez remplir tous les champs obligatoires.",
    submitBtnLabel: "Demander mon étude gratuite",
    privacyNoteLabel: "{ui.privacyNoteLabel}",
    simulationSavedTitle: "Simulation enregistrée !",
    thankYouPrefix: "Merci",
    thankYouMiddle: "! Votre simulation fiscale pour le 3ème pilier chez",
    thankYouSuffix: "a bien été transmise à notre conseiller prévoyance.",
    followUpPrefix: "Nous allons préparer un comparatif de rendement personnalisé intégrant la déduction d'impôt exacte selon le barème fiscal de votre canton pour",
    followUpMiddle: ". Nous vous recontacterons au",
    followUpSuffix: "sous 24 heures.",
    professionShortSalaried: "salarié",
    professionShortIndependent: "indépendant",
    closeWindowBtn: "Fermer la fenêtre",
    analyzingDesc: "Fenny évalue votre profil de prévoyance et calcule votre gain fiscal potentiel en comparant les offres de",
    pillar3Label: "Pilier 3a / 3b",
    analyzingDescEnd: " des principaux assureurs suisses.",
    companiesAnalyzedLabel: "Compagnies d'assurance analysées :",
    fennyAdvisesLabel: "Fenny conseille",
    quitBtn: "Quitter",
    questionOfLabel: "Question {n} sur 9",
    actionLabel: "Action 9/9",
    completedLabel: "% complété",
    cantonZH: "Zurich (ZH)", cantonGE: "Genève (GE)", cantonVD: "Vaud (VD)", cantonBE: "Berne (BE)",
    cantonFR: "Fribourg (FR)", cantonNE: "Neuchâtel (NE)", cantonVS: "Valais (VS)", cantonJU: "Jura (JU)",
    cantonAG: "Argovie (AG)", cantonBS: "Bâle-Ville (BS)", cantonBL: "Bâle-Campagne (BL)", cantonSG: "Saint-Gall (SG)",
    cantonTI: "Tessin (TI)", cantonLU: "Lucerne (LU)",
    employmentTooltipTitle: "Impact sur le 3e Pilier :",
    employmentTooltipSalaried: "Salarié (avec LPP) :",
    employmentTooltipSalariedDesc: "Plafond de cotisation annuel maximal fixé à {amount} (en 2026).",
    employmentTooltipIndependent: "Indépendant (sans LPP) :",
    employmentTooltipIndependentDesc: "Déduction jusqu'à 20% du gain d'exploitation net, max {amount}.",
    employmentTooltipUnemployed: "Sans activité :",
    employmentTooltipUnemployedDesc: "Pas de réduction fiscale sur le 3a (lié) mais le 3b reste totalement possible.",
    taxTooltipTitle: "Progressivité de l'impôt :",
    taxTooltipDesc1: "En Suisse, le taux d'imposition augmente de façon progressive avec vos revenus.",
    taxTooltipDesc2: "Plus vos revenus sont importants, plus votre économie d'impôt réelle sera élevée en déduisant les cotisations de votre 3e Pilier (souvent entre 22% et 45% de gain fiscal direct !).",
    lppTooltipTitle: "Caisse de pension (LPP) :",
    lppTooltipDesc1: "Si vous possédez une caisse de pension par votre employeur ou à titre personnel, votre plafond de cotisation 3a annuel est de {amount}.",
    lppTooltipDesc2: "Si vous n'en possédez pas (indépendant ou sans activité), vous pouvez verser jusqu'à 20% de votre revenu d'activité lucrative net, max {amount}.",
    deathCoverageTitle: "Couverture décès complémentaire",
    deathCoverageDesc: "Versement d'un capital garanti à vos proches en cas de décès.",
    yesLabel: "Oui",
    noLabel: "Non",
    desiredDeathCapitalLabel: "Capital décès souhaité (CHF)",
    disabilityCoverageTitle: "Couverture en cas d'incapacité de gain / invalidité",
    monthlyPensionOption: "Rente mensuelle",
    disabilityNoneOption: "Aucune",
    desiredMonthlyPensionLabel: "Rente mensuelle souhaitée",
  },
  de: {
    heroTitle: "Säule 3a & Vorsorge Simulator Schweiz",
    heroSubtitle: "Finden Sie die beste Sparstrategie und sparen Sie bis zu CHF 3'000.- Steuern pro Jahr.",
    backBtn: "Zurück",
    continueBtn: "Weiter",
    verificationStepBtn: "Sicherheitsprüfung",
    step1Title: "1. Welche Art der 3. Säule suchen Sie?",
    step1Subtitle: "Die 3. Säule ermöglicht es Ihnen, Alterskapital aufzubauen und gleichzeitig jedes Jahr Steuern zu sparen.",
    p3aLabel: "Säule 3a (Gebunden)",
    p3aDesc: "Maximaler Steuerabzug",
    p3aDetails: "Gesetzlich gebunden bis zur Pensionierung. Ideal für hohe Steuereinsparungen.",
    p3bLabel: "Säule 3b (Frei)",
    p3bDesc: "Volle Auszahlungsflexibilität",
    p3bDetails: "Kein grundlegender Steuerabzug, jedoch jederzeit ohne Bedingungen verfügbar.",
    pUnknownLabel: "Ich weiss es noch nicht",
    pUnknownDesc: "Hilf mir beim Auswählen!",
    pUnknownDetails: "Ermöglicht die Prüfung beider Lösungen für das beste Angebot.",
    step2Title: "2. Ihr persönliches Profil (Pflichtangabe)",
    step2Subtitle: "Alter, Kanton und Einkommen beeinflussen die Grundprämien und die maximale Steuerersparnis direkt.",
    birthDateLabel: "Geburtsdatum des Versicherten (TT.MM.JJJJ) *",
    birthDatePlaceholder: "Z.B.: 28.05.1990",
    invalidDateErr: "⚠️ Ungültiges oder unmögliches Datum",
    calculatedAge: "✓ Berechnetes Alter:",
    yearsOld: "Jahre",
    birthDateHelper: "Geben Sie die 8 Ziffern Ihres Geburtsdatums ein.",
    genderLabel: "Rechtliches Geschlecht *",
    male: "Mann",
    female: "Frau",
    cantonLabel: "Wohnkanton *",
    employmentLabel: "Berufsstatus *",
    salaried: "Angestellt (mit Pensionskasse BVG)",
    independent: "Selbstständig (ohne Pensionskasse)",
    unemployed: "Nicht erwerbstätig / Andere",
    incomeLabel: "Bruttojahreseinkommen (CHF)",
    hasSecondPillarLabel: "Bereits in einer 2. Säule (BVG)?",
    yes: "Ja",
    no: "Nein",
    step3Title: "3. Welche Produktart wünschen Sie?",
    step3Subtitle: "Bankenlösungen bieten pure Flexibilität, während Versicherungen Todesfall- und Erwerbsunfähigkeitsschutz kombinieren.",
    pureSavings: "Reines Sparen",
    pureSavingsDesc: "Kein Börsenrisiko, garantiertes Kapital.",
    equitySavings: "Wertschriftensparen (Fonds / ETF)",
    equitySavingsDesc: "Anlage an der Börse für höhere langfristige Rendite.",
    mixedProduct: "Gemischte Formel (Fonds + Versicherung)",
    mixedProductDesc: "Flexible Kombination aus garantiertem Kapital und Aktienanlage.",
    equityPartTitle: "Welchen Aktienanteil streben Sie an?",
    step4Title: "4. Vorsorge & Deckungsbedarf",
    step4Subtitle: "Bestimmen Sie den Zusatzschutz zur Absicherung Ihrer Angehörigen im Ernstfall.",
    deathTitle: "Zusätzliche Todesfalldeckung",
    deathDesc: "Auszahlung eines garantierten Kapitals an Ihre Angehörigen.",
    deathCapitalLabel: "Gewünschtes Todesfallkapital (CHF)",
    disabilityTitle: "Erwerbsunfähigkeitsrente",
    disabilityDesc: "Jährliche Rente bei Arbeitsunfähigkeit.",
    premiumExemptionTitle: "Prämienbefreiung",
    premiumExemptionDesc: "Die Versicherung zahlt die Prämien bei Erwerbsunfähigkeit weiter.",
    dependentsTitle: "Unterhaltsberechtigte Personen",
    dependentsDesc: "Ehepartner oder unterhaltsberechtigte Kinder.",
    step5Title: "5. Bestimmen Sie Ihre Sparkapazität",
    step5Subtitle: "Legen Sie Häufigkeit, Betrag und gewünschte Laufzeit fest. Sie können dies jederzeit anpassen.",
    frequencyLabel: "Einzahlungshäufigkeit",
    monthly: "Monatlich",
    yearly: "Jährlich",
    estimatedSaving: "Geschätzte Einzahlung",
    estimatedTaxSavings: "Geschätzter Steuervorteil: ~CHF",
    perYear: "/ Jahr",
    perMonth: "/ Monat",
    commitmentLabel: "Vertragliche Verbindlichkeit",
    fixedRegular: "Regelmässig fest",
    fixedRegularDesc: "Garantierte Vorsorge",
    bothCommitment: "Beides",
    bothCommitmentDesc: "Hybridlösung",
    investmentHorizonLabel: "Anlagehorizont",
    estimatedRetirementYear: "geschätzte Pensionierung im Jahr",
    yearsUnit: "Jahre",
    step6Title: "6. Bestimmen Sie Ihr Risikoprofil",
    step6Subtitle: "Falls Sie einen Aktienanteil wählen, bestimmt Ihre Toleranz die maximale akzeptable Volatilität.",
    temperamentLabel: "Einstellung zu Schwankungen",
    prudent: "Konservativ (0-25% Aktien)",
    prudentDesc: "Sicherheit steht im Vordergrund, bescheidene Gewinne.",
    balanced: "Ausgewogen (25-50% Aktien)",
    balancedDesc: "Perfekter Kompromiss zwischen Wachstum und Stabilität.",
    dynamic: "Dynamisch (50-75% Aktien)",
    dynamicDesc: "Bereit für moderate Kursschwankungen.",
    offensive: "Offensiv (100% Aktien)",
    offensiveDesc: "Maximale Volatilität für höchste Renditechancen.",
    marketDropTitle: "Wenn die Märkte um 20% fallen:",
    sellAll: "Ich verkaufe alles aus Angst",
    holdWise: "Ich warte gelassen ab",
    buyMore: "Ich nutze die Chance zum Nachkaufen",
    esgTitle: "Nachhaltige Fonds / Nur ESG-Kriterien",
    esgDesc: "Ausschluss von Waffen, Kohle usw. zugunsten ökologischer Anlagen.",
    step7Title: "7. Planen Sie einen Vorbezug des Kapitals?",
    step7Subtitle: "In der Schweiz erlaubt das Gesetz den Vorbezug der Säule 3a in bestimmten Fällen.",
    residenceOption: "Ja, für den Kauf von Wohneigentum",
    residenceOptionDesc: "Immobilienerwerb oder Hypothekaramortisation.",
    independentOption: "Ja, für den Schritt in die Selbstständigkeit",
    independentOptionDesc: "Gründung einer Einzelfirma oder Aufnahme einer Geschäftstätigkeit.",
    abroadOption: "Ja, da ich die Schweiz verlasse",
    abroadOptionDesc: "Endgültiger Wegzug aus der Schweiz.",
    noneOption: "Nein, kein Vorbezug vor der Pensionierung",
    noneOptionDesc: "Mein Erspartes bis zum gesetzlichen Alter weiter wachsen lassen.",
    withdrawalHorizonTitle: "In welchem Zeithorizont ist der Vorbezug geplant?",
    under5Years: "Unter 5 Jahren",
    from5to10Years: "5 bis 10 Jahre",
    over10Years: "Über 10 Jahre",
    step8Title: "8. Besitzen Sie bereits eine 3. Säule?",
    step8Subtitle: "Falls Sie bereits eine 3. Säule bei einer Bank oder Versicherung haben, analysieren wir die Optimierung.",
    hasPillarQuestion: "Haben Sie aktuell eine 3. Säule?",
    hasPillarDesc: "Egal ob Bankkonto oder aktive Versicherungspolice.",
    insurerNameLabel: "Name der aktuellen Gesellschaft/Bank",
    accumulatedAmountLabel: "Bisher angespartes Kapital (CHF)",
    stepGoalTitle: "Was ist Ihr Ziel?",
    newContract: "Ein neuer Zusatzvertrag",
    transferContract: "Übertrag / Rückkauf des aktuellen Vertrags",
    step9Title: "9. Was sind Ihre Prioritäten beim Vergleich?",
    step9Subtitle: "Klicken Sie auf die Optionen, um Priorität 1 und Priorität 2 festzulegen.",
    yieldPriority: "Höchstmögliche Rendite",
    yieldPriorityDesc: "Fokus auf ertragreiche Wertschriften und Fonds.",
    feesPriority: "Niedrigste Abschluss- und Verwaltungsgebühren",
    feesPriorityDesc: "Verwaltungskosten minimieren.",
    flexibilityPriority: "Volle Flexibilität bei freien Einzahlungen",
    flexibilityPriorityDesc: "Jederzeit einzahlen, was und wann Sie wollen.",
    securityPriority: "Sicherheit und vertraglich garantiertes Kapital",
    securityPriorityDesc: "Kein Börsenrisiko auf dem angesparten Kapital.",
    coveragePriority: "Umfassender Schutz (Todesfall/Erwerbsunfähigkeit)",
    coveragePriorityDesc: "Optimaler Schutz für Familie und Angehörige.",
    priority1: "Priorität 1",
    priority2: "Priorität 2",
    selectBtn: "Auswählen",
    step10Title: "Persönliche Angaben",
    step10Subtitle: "Diese rechtlichen Angaben ermöglichen die Anwendung der genauen gesetzlichen Tarife und Risikobewertungen.",
    firstNameLabel: "Vorname *",
    firstNamePlaceholder: "Z.B.: Sophie",
    lastNameLabel: "Nachname *",
    lastNamePlaceholder: "Z.B.: Rochat",
    emailLabel: "E-Mail-Adresse *",
    phoneLabel: "Schweizer Mobiltelefon *",
    errFillRequired: "Bitte füllen Sie alle Pflichtfelder aus.",
    errSendingCode: "Fehler beim Senden des E-Mail-Codes.",
    errContactServer: "Server konnte nicht erreicht werden.",
    sendingCodeBtn: "E-Mail-Code wird gesendet...",
    receiveCodeBtn: "Bestätigungscode per E-Mail anfordern",
    codeSentTitle: "Sicherheitscode per E-Mail gesendet!",
    codeSentBody: "Bitte prüfen Sie das Postfach von {email} und geben Sie den 4-stelligen Code ein.",
    enterCodeLabel: "Sicherheitscode eingeben *",
    errEnter4Digits: "Bitte geben Sie den 4-stelligen E-Mail-Code ein.",
    errIncorrectCode: "Falscher Bestätigungscode.",
    errVerifyCode: "Fehler bei der Codeüberprüfung.",
    verifyingBtn: "Prüfung läuft...",
    validateCodeBtn: "Code bestätigen & Ergebnisse anzeigen",
    editDetailsBtn: "Kontaktdaten ändern",
    fennyMessageTitle: "Nachricht von Fenny:",
    fennyMessageText: "\"Um Ihre Berechnungen zu bestätigen und zertifizierte Angebote für 2026 anzuzeigen, wurde ein 4-stelliger Code an {email} gesendet!\"",
    yourEmail: "Ihre E-Mail",
    footerCommitment: "Fenny garantiert: 100% anonym, konform mit Schweizer nDSG, kein Datenverkauf.",
    embeddedTitle: "Simulieren Sie Ihren Steuervorteil der 3. Säule mit Fenny",
    embeddedSubtitle: "Sparen Sie fürs Alter und reduzieren Sie gleichzeitig ab diesem Jahr Ihre Schweizer Steuern. Vergleichen Sie sofort Säule 3a / 3b Angebote der führenden Versicherer des Landes (AXA, Zurich, Swiss Life, Helvetia, Allianz usw.) und berechnen Sie Ihr zukünftiges Kapital.",
    embeddedStat1: "Bis zu CHF 3'000 Steuereinsparung pro Jahr für Angestellte",
    embeddedStat2: "Personalisierte Endkapital-Simulation",
    embeddedStat3: "Neutral, unabhängig & nDSG-konform",
    embeddedBtn: "Simulation 3. Säule starten",
    analyzingTitle: "Steuer- und Vorsorgeanalyse...",
    restartBtn: "Neu starten",
    pensionTypeLabel: "Vorsorgeart:",
    pillar3aLinked: "Säule 3a (gebunden)",
    pillar3bFree: "Säule 3b (frei)",
    mixedShort: "Gemischt",
    monthlyPaymentLabel: "Monatliche Einzahlung:",
    contractDurationLabel: "Vertragsdauer:",
    yourProfileLabel: "Ihr Profil:",
    profileYoung: "Junger Berufstätiger",
    profileFamily: "Familie",
    profileSenior: "Senior",
    profileIndependent: "Selbstständig",
    majorPriorityLabel: "Hauptpriorität:",
    priorityTaxSaving: "Max. Steuerersparnis",
    priorityHighYield: "Aktienrendite",
    priorityGuaranteed: "100% garantiertes Kapital",
    hideAdjustments2: "Anpassungen ausblenden",
    adjustSlidersDirectly: "Regler direkt anpassen",
    monthlyPaymentShort: "Monatliche Einzahlung",
    contractDurationShort: "Vertragsdauer",
    priorityFieldLabel: "Priorität",
    legalLimits3aLabel: "Gesetzliche Grenzen Säule 3a:",
    salariedCapLabel: "Maximalbetrag Angestellte 2026:",
    independentCapLabel: "Maximalbetrag Selbstständige 2026:",
    yourSimulationLabel: "Ihre Simulation",
    pensionWordShort: "Vorsorge",
    adjustBtn: "Anpassen",
    officialWarningTitle: "Offizieller Hinweis zur 3. Säule:",
    officialWarningDesc: "Die Bedingungen der 3. Säule werden manuell aktualisiert und können sich geändert haben — prüfen Sie dies stets beim Anbieter.",
    estimatedTaxSavingsCardLabel: "Geschätzte Steuerersparnis",
    totalTaxReductionPrefix: "Entspricht einer geschätzten Gesamtsteuerersparnis von rund",
    totalTaxReductionSuffix: "über die Laufzeit.",
    recommendationLabel: "Empfehlung",
    recoMixed: "Wählen Sie ein gemischtes Aktien-/Obligationenmodell",
    recoGuaranteed: "Setzen Sie auf die Sicherheit des garantierten Kapitals",
    recoTaxSaving: "Maximieren Sie Ihre gebundene 3a für den Steuervorteil",
    recoDesc: "3a-Beiträge sind während der Sparphase von der Vermögenssteuer befreit.",
    filterSortLabel: "Angebote der 3. Säule filtern & sortieren",
    insurersAvailableLabel: "verfügbare Versicherer",
    allInsurersTab: "Alle Versicherer",
    maxYieldTab: "Max. Rendite (Aktien)",
    securityCapitalTab: "Sicherheit & Kapital",
    highestGuaranteedBadge: "Höchstes garantiertes Kapital",
    hideDetailsBtn: "Details ausblenden",
    techSheetBtn: "Datenblatt",
    yourProjectionLabel: "Ihre Projektion",
    officialRegulationTitle: "Offizielle ESTV-Regulierung & Versicherungstechnischer Bericht 2026",
    certifiedBadge: "ZERTIFIZIERT SWISS-ACCURACY • 100% ZUVERLÄSSIG",
    savingsLimitsLabel: "Sparen & Obergrenzen",
    desiredAnnualPaymentLabel: "Gewünschte Jahreseinzahlung:",
    legalSwissLimitLabel: "Gesetzliche Schweizer Grenze 2026:",
    eligibleAmountLabel: "Berücksichtigter Betrag (zulässig):",
    exceedsCapPrefix: "⚠️ Die Einzahlung überschreitet die Schweizer 3a-Grenze (",
    exceedsCapSuffix: "). Die Simulation wurde entsprechend angepasst.",
    capStatusSalaried: "Angestellt",
    capStatusIndependent: "Selbstständig",
    feesAndRiskPremiumsLabel: "Gebühren & Risikoprämien",
    netAdminFeesLabel: "Netto-Verwaltungsgebühren:",
    cumulativeAdminFeesLabel: "Kumulierte Verwaltungsgebühren:",
    monthlyRiskPremiumsLabel: "Monatliche Risikoprämien:",
    netSavingsPortionLabel: "Netto-Sparanteil:",
    taxOptimizationLabel: "Steueroptimierung & Bezug",
    combinedMarginalRateLabel: "Kombinierter Grenzsteuersatz",
    taxSavingsPerYearLabel: "Steuerersparnis pro Jahr:",
    withdrawalTaxRateLabel: "Steuersatz beim Bezug:",
    taxPaidAtWithdrawalLabel: "Beim Bezug bezahlte Steuer:",
    actuarialSolvencyNoteLabel: "Versicherungstechnischer Solvenzhinweis",
    solvencyNotePrefix: "Berechnet auf Basis einer angenommenen durchschnittlichen Börsenrendite von",
    solvencyNoteMiddle: "brutto. Die kumulierte Steuerersparnis über den Zeitraum beträgt",
    solvencyNoteSuffix: "gemäss dem offiziellen Bundestarif.",
    netRealCapitalPaidLabel: "Effektiv ausbezahltes Nettokapital",
    afterTaxDeductionNote: "Nach Abzug der separaten Kapitalbezugssteuer",
    complianceRegElementsTitle: "Regulatorische Elemente der individuellen Vorsorge:",
    pillar3aRegText: "Die Säule 3a (gebundene Vorsorge) steht Personen mit AHV-pflichtigem Einkommen in der Schweiz offen. Die Beiträge sind bis zu den jährlichen Bundesgrenzen von Ihrem steuerbaren Einkommen abzugsfähig. Kapitalbezüge bei der Pensionierung werden separat von anderen Einkünften zu einem reduzierten Satz besteuert.",
    pillar3bRegText: "Für die Säule 3b (freie Vorsorge) gilt keine gesetzliche Einzahlungsgrenze, ihre Steuerabzüge unterliegen jedoch anderen kantonalen Regelungen.",
    simulationDisclaimer: "⚠️ Dies ist eine Simulation mit ungefähren Beträgen. Dieser Vergleichsrechner begründet keine Verpflichtung für Le Fennec Malin oder die genannten Versicherungsgesellschaften.",
    studyOfferedLabel: "Kostenlose Vorsorgeanalyse",
    yourStudyLabel: "Ihre Analyse",
    summaryProjectionLabel: "Zusammenfassende Projektion:",
    monthlySavingsPrefix: "Monatliches Sparen von",
    monthlySavingsMiddle1: "über",
    monthlySavingsMiddle2: "Jahre. Geschätztes Endkapital (Fonds):",
    monthlySavingsMiddle3: "bei",
    monthlySavingsMiddle4: ". Durchschnittliche kumulierte Steuerersparnis:",
    monthlySavingsSuffix: "an direkten Steuereinsparungen!",
    activityStatusLabel: "Ihr Erwerbsstatus",
    salariedWithLpp: "Angestellt (mit BVG)",
    independentWithoutLpp: "Selbstständig (ohne BVG)",
    formErrorMsg: "Bitte füllen Sie alle Pflichtfelder aus.",
    submitBtnLabel: "Meine kostenlose Analyse anfordern",
    privacyNoteLabel: "🔒 Ihre Daten sind vertraulich. Strikte nDSG-Konformität. Keine Verpflichtung.",
    simulationSavedTitle: "Simulation gespeichert!",
    thankYouPrefix: "Danke",
    thankYouMiddle: "! Ihre Steuersimulation für die 3. Säule bei",
    thankYouSuffix: "wurde erfolgreich an unseren Vorsorgeberater übermittelt.",
    followUpPrefix: "Wir erstellen einen personalisierten Renditevergleich unter Berücksichtigung des genauen Steuerabzugs gemäss dem Steuertarif Ihres Kantons für",
    followUpMiddle: ". Wir werden Sie unter",
    followUpSuffix: "innerhalb von 24 Stunden zurückrufen.",
    professionShortSalaried: "Angestellte",
    professionShortIndependent: "Selbstständige",
    closeWindowBtn: "Fenster schliessen",
    analyzingDesc: "Fenny bewertet Ihr Vorsorgeprofil und berechnet Ihr steuerliches Sparpotenzial durch den Vergleich der Angebote der",
    pillar3Label: "Säule 3a / 3b",
    analyzingDescEnd: " wichtigsten Schweizer Versicherer.",
    companiesAnalyzedLabel: "Analysierte Versicherungsgesellschaften:",
    fennyAdvisesLabel: "Fenny empfiehlt",
    quitBtn: "Beenden",
    questionOfLabel: "Frage {n} von 9",
    actionLabel: "Aktion 9/9",
    completedLabel: "% abgeschlossen",
    cantonZH: "Zürich (ZH)", cantonGE: "Genf (GE)", cantonVD: "Waadt (VD)", cantonBE: "Bern (BE)",
    cantonFR: "Freiburg (FR)", cantonNE: "Neuenburg (NE)", cantonVS: "Wallis (VS)", cantonJU: "Jura (JU)",
    cantonAG: "Aargau (AG)", cantonBS: "Basel-Stadt (BS)", cantonBL: "Basel-Landschaft (BL)", cantonSG: "St. Gallen (SG)",
    cantonTI: "Tessin (TI)", cantonLU: "Luzern (LU)",
    employmentTooltipTitle: "Auswirkung auf die 3. Säule:",
    employmentTooltipSalaried: "Angestellt (mit BVG):",
    employmentTooltipSalariedDesc: "Maximaler jährlicher Beitragsbetrag auf {amount} festgelegt (2026).",
    employmentTooltipIndependent: "Selbstständig (ohne BVG):",
    employmentTooltipIndependentDesc: "Abzug von bis zu 20% des Nettoerwerbseinkommens, max. {amount}.",
    employmentTooltipUnemployed: "Nicht erwerbstätig:",
    employmentTooltipUnemployedDesc: "Keine Steuerreduktion bei der gebundenen 3a, die freie 3b bleibt jedoch vollständig möglich.",
    taxTooltipTitle: "Steuerprogression:",
    taxTooltipDesc1: "In der Schweiz steigt der Steuersatz progressiv mit Ihrem Einkommen.",
    taxTooltipDesc2: "Je höher Ihr Einkommen, desto grösser ist Ihre tatsächliche Steuerersparnis durch den Abzug Ihrer Beiträge zur 3. Säule (oft zwischen 22% und 45% direkter Steuergewinn!).",
    lppTooltipTitle: "Pensionskasse (BVG):",
    lppTooltipDesc1: "Falls Sie über eine Pensionskasse durch Ihren Arbeitgeber oder privat verfügen, liegt Ihr jährlicher 3a-Beitragsbetrag bei {amount}.",
    lppTooltipDesc2: "Falls nicht (Selbstständige oder Nichterwerbstätige), können Sie bis zu 20% Ihres Nettoerwerbseinkommens einzahlen, max. {amount}.",
    deathCoverageTitle: "Zusätzliche Todesfalldeckung",
    deathCoverageDesc: "Auszahlung eines garantierten Kapitals an Ihre Angehörigen im Todesfall.",
    yesLabel: "Ja",
    noLabel: "Nein",
    desiredDeathCapitalLabel: "Gewünschtes Todesfallkapital (CHF)",
    disabilityCoverageTitle: "Erwerbsunfähigkeits-/Invaliditätsdeckung",
    monthlyPensionOption: "Monatliche Rente",
    disabilityNoneOption: "Keine",
    desiredMonthlyPensionLabel: "Gewünschte monatliche Rente",
  },
  en: {
    heroTitle: "Swiss Pillar 3a & Pension Simulator",
    heroSubtitle: "Find the best savings strategy and reduce your taxes by up to CHF 3,000 / year.",
    backBtn: "Back",
    continueBtn: "Continue",
    verificationStepBtn: "Security Verification",
    step1Title: "1. Which type of 3rd Pillar are you looking for?",
    step1Subtitle: "The 3rd pillar builds your retirement capital while generating substantial tax deductions every year.",
    p3aLabel: "Pillar 3a (Tied)",
    p3aDesc: "Maximum tax deduction",
    p3aDetails: "Legally tied until retirement. Ideal for maximizing federal and cantonal tax savings.",
    p3bLabel: "Pillar 3b (Flexible)",
    p3bDesc: "Complete withdrawal flexibility",
    p3bDetails: "No standard tax deduction, but capital is accessible at any time without restrictions.",
    pUnknownLabel: "I don't know yet",
    pUnknownDesc: "Help me choose!",
    pUnknownDetails: "Allows evaluating both options to compose the best tailored offer.",
    step2Title: "2. Your personal profile (Required)",
    step2Subtitle: "Age, canton, and income directly influence base rates and maximum tax savings calculations.",
    birthDateLabel: "Insured's birth date (DD.MM.YYYY) *",
    birthDatePlaceholder: "E.g.: 28.05.1990",
    invalidDateErr: "⚠️ Invalid or impossible date",
    calculatedAge: "✓ Calculated age:",
    yearsOld: "years old",
    birthDateHelper: "Enter the 8 digits of your birth date. Very fast on mobile.",
    genderLabel: "Legal Gender *",
    male: "Male",
    female: "Female",
    cantonLabel: "Canton of Residence *",
    employmentLabel: "Employment Status *",
    salaried: "Employed (with LPP pension fund)",
    independent: "Self-employed (without LPP pension fund)",
    unemployed: "Not gainfully employed / Other",
    incomeLabel: "Gross Annual Income (CHF)",
    hasSecondPillarLabel: "Already affiliated with a 2nd pillar (LPP)?",
    yes: "Yes",
    no: "No",
    step3Title: "3. What type of product do you prefer?",
    step3Subtitle: "Banking solutions offer pure flexibility, whereas insurance combines death/disability coverage with savings.",
    pureSavings: "Pure Savings",
    pureSavingsDesc: "No market risk, guaranteed capital.",
    equitySavings: "Securities Savings (Funds / ETFs)",
    equitySavingsDesc: "Stock market investments for higher long-term returns.",
    mixedProduct: "Mixed Formula (Funds + Insurance)",
    mixedProductDesc: "Flexible combination of guaranteed capital and stock investments.",
    equityPartTitle: "What share of equities are you targeting?",
    step4Title: "4. Pension & Coverage Needs",
    step4Subtitle: "Determine the additional guarantees needed to protect your beneficiaries.",
    deathTitle: "Additional Death Coverage",
    deathDesc: "Guaranteed lump sum payout to your loved ones in case of death.",
    deathCapitalLabel: "Desired death capital (CHF)",
    disabilityTitle: "Disability Annuity",
    disabilityDesc: "Annual annuity paid in case of incapacity to work.",
    premiumExemptionTitle: "Premium Waiver",
    premiumExemptionDesc: "The insurer pays your premiums in case of disability.",
    dependentsTitle: "Dependents",
    dependentsDesc: "Spouse or legally dependent children.",
    step5Title: "5. Determine your savings capacity",
    step5Subtitle: "Set frequency, contribution amount, and desired duration. You can adjust these anytime.",
    frequencyLabel: "Contribution Frequency",
    monthly: "Monthly",
    yearly: "Yearly",
    estimatedSaving: "Estimated Contribution",
    estimatedTaxSavings: "Estimated tax savings: ~CHF",
    perYear: "/ year",
    perMonth: "/ month",
    commitmentLabel: "Contractual Commitment Level",
    fixedRegular: "Fixed regular",
    fixedRegularDesc: "Guaranteed savings plan",
    bothCommitment: "Both",
    bothCommitmentDesc: "Hybrid solution",
    investmentHorizonLabel: "Investment Horizon",
    estimatedRetirementYear: "estimated retirement in",
    yearsUnit: "years",
    step6Title: "6. Determine your risk profile",
    step6Subtitle: "If you allocate an equity share, your tolerance determines maximum acceptable volatility.",
    temperamentLabel: "Attitude toward market fluctuations",
    prudent: "Prudent (0-25% equities)",
    prudentDesc: "Focus on security and modest gains.",
    balanced: "Balanced (25-50% equities)",
    balancedDesc: "Perfect compromise between growth and stability.",
    dynamic: "Dynamic (50-75% equities)",
    dynamicDesc: "Ready to accept moderate ups and downs.",
    offensive: "Aggressive (100% equities)",
    offensiveDesc: "Maximum volatility accepted for highest return potential.",
    marketDropTitle: "If markets drop by 20% in a few months:",
    sellAll: "I sell everything out of fear",
    holdWise: "I wait patiently",
    buyMore: "I take advantage to buy more",
    esgTitle: "Sustainable Funds / ESG criteria only",
    esgDesc: "Exclude weapons, coal, etc. in favor of eco-responsible investments.",
    step7Title: "7. Are you planning an early capital withdrawal?",
    step7Subtitle: "In Switzerland, the law permits early Pillar 3a withdrawal under specific circumstances.",
    residenceOption: "Yes, to purchase my primary residence",
    residenceOptionDesc: "Real estate acquisition or mortgage repayment.",
    independentOption: "Yes, to become self-employed",
    independentOptionDesc: "Creating a sole proprietorship or starting commercial activity.",
    abroadOption: "Yes, because I plan to leave Switzerland",
    abroadOptionDesc: "Permanent departure from Switzerland.",
    noneOption: "No early withdrawal planned before retirement",
    noneOptionDesc: "Let my savings grow until the legal retirement age.",
    withdrawalHorizonTitle: "In what timeframe do you expect this withdrawal?",
    under5Years: "Less than 5 years",
    from5to10Years: "5 to 10 years",
    over10Years: "More than 10 years",
    step8Title: "8. Do you already have a 3rd Pillar?",
    step8Subtitle: "If you already hold a 3rd pillar with a bank or insurer, we can analyze optimization opportunities.",
    hasPillarQuestion: "Do you currently hold a 3rd pillar?",
    hasPillarDesc: "Whether a bank account or an active insurance policy.",
    insurerNameLabel: "Name of current provider/bank",
    accumulatedAmountLabel: "Amount already saved (CHF)",
    stepGoalTitle: "What is your main goal?",
    newContract: "A new additional contract",
    transferContract: "Transfer / Buyout of my existing contract",
    step9Title: "9. What are your comparison priorities?",
    step9Subtitle: "Click options to set Priority #1 and Priority #2 for your search.",
    yieldPriority: "Highest potential return",
    yieldPriorityDesc: "Focus on high-performing funds and stocks.",
    feesPriority: "Lowest entry and management fees",
    feesPriorityDesc: "Minimize administrative costs.",
    flexibilityPriority: "Total flexibility for free contributions",
    flexibilityPriorityDesc: "Pay what you want, when you want.",
    securityPriority: "Contractual capital security and guarantees",
    securityPriorityDesc: "No market risk on accumulated savings.",
    coveragePriority: "Comprehensive protection (Death/Disability)",
    coveragePriorityDesc: "Protect spouse and children optimally.",
    priority1: "Priority 1",
    priority2: "Priority 2",
    selectBtn: "Select",
    step10Title: "Personal information",
    step10Subtitle: "These regulatory data allow applying precise legal scales from the FOPH and evaluating complementary risks.",
    firstNameLabel: "First Name *",
    firstNamePlaceholder: "E.g.: Sophie",
    lastNameLabel: "Last Name *",
    lastNamePlaceholder: "E.g.: Rochat",
    emailLabel: "Email Address *",
    phoneLabel: "Swiss Mobile Phone *",
    errFillRequired: "Please fill in all required fields.",
    errSendingCode: "Error sending the email code.",
    errContactServer: "Unable to contact verification server.",
    sendingCodeBtn: "Sending email code...",
    receiveCodeBtn: "Receive my validation code by Email",
    codeSentTitle: "Security code sent by email!",
    codeSentBody: "Please check the inbox of {email} and enter the 4-digit code below.",
    enterCodeLabel: "Enter Security Code *",
    errEnter4Digits: "Please enter the 4-digit code received by email.",
    errIncorrectCode: "Incorrect verification code.",
    errVerifyCode: "Error verifying code.",
    verifyingBtn: "Verifying...",
    validateCodeBtn: "Validate code & view results",
    editDetailsBtn: "Edit my details",
    fennyMessageTitle: "Message from Fenny:",
    fennyMessageText: "\"To validate your simulation and show certified 2026 offers, a 4-digit code has been sent to {email}!\"",
    yourEmail: "your email",
    footerCommitment: "Fenny commits: 100% anonymous, Swiss nDPA compliant, no data reselling.",
    embeddedTitle: "Simulate your Pillar 3 tax savings with Fenny",
    embeddedSubtitle: "Save for retirement while lowering your Swiss taxes starting this year. Instantly compare Pillar 3a / 3b offers from top national insurers (AXA, Zurich, Swiss Life, Helvetia, Allianz, etc.) and project your future capital.",
    embeddedStat1: "Up to CHF 3,000 tax savings per year for employees",
    embeddedStat2: "Personalized capital maturity projection",
    embeddedStat3: "Neutral, independent & nDPA compliant",
    embeddedBtn: "Launch Pillar 3 simulation",
    analyzingTitle: "Tax & pension analysis...",
    restartBtn: "Restart",
    pensionTypeLabel: "Pension type:",
    pillar3aLinked: "Pillar 3a (tied)",
    pillar3bFree: "Pillar 3b (free)",
    mixedShort: "Mixed",
    monthlyPaymentLabel: "Monthly payment:",
    contractDurationLabel: "Contract duration:",
    yourProfileLabel: "Your profile:",
    profileYoung: "Young professional",
    profileFamily: "Family",
    profileSenior: "Senior",
    profileIndependent: "Self-employed",
    majorPriorityLabel: "Main priority:",
    priorityTaxSaving: "Max tax savings",
    priorityHighYield: "Equity returns",
    priorityGuaranteed: "100% guaranteed capital",
    hideAdjustments2: "Hide adjustments",
    adjustSlidersDirectly: "Adjust sliders directly",
    monthlyPaymentShort: "Monthly payment",
    contractDurationShort: "Contract duration",
    priorityFieldLabel: "Priority",
    legalLimits3aLabel: "3a Legal Limits:",
    salariedCapLabel: "Employee cap 2026:",
    independentCapLabel: "Self-employed cap 2026:",
    yourSimulationLabel: "Your simulation",
    pensionWordShort: "Pension",
    adjustBtn: "Adjust",
    officialWarningTitle: "Official 3rd Pillar Notice:",
    officialWarningDesc: "3rd pillar conditions are updated manually and may have changed — always verify with the provider.",
    estimatedTaxSavingsCardLabel: "Estimated tax savings",
    totalTaxReductionPrefix: "Equivalent to a total estimated tax reduction of about",
    totalTaxReductionSuffix: "over the term.",
    recommendationLabel: "Recommendation",
    recoMixed: "Opt for a mixed equity/bond model",
    recoGuaranteed: "Favor the security of guaranteed capital",
    recoTaxSaving: "Maximize your tied 3a for the tax advantage",
    recoDesc: "3a contributions are exempt from wealth tax during the saving phase.",
    filterSortLabel: "Filter & sort 3rd pillar offers",
    insurersAvailableLabel: "insurers available",
    allInsurersTab: "All insurers",
    maxYieldTab: "Max yield (Equities)",
    securityCapitalTab: "Security & Capital",
    highestGuaranteedBadge: "Highest guaranteed capital",
    hideDetailsBtn: "Hide details",
    techSheetBtn: "Data sheet",
    yourProjectionLabel: "Your Projection",
    officialRegulationTitle: "Official FTA Regulation & 2026 Actuarial Filing",
    certifiedBadge: "CERTIFIED SWISS-ACCURACY • 100% RELIABLE",
    savingsLimitsLabel: "Savings & Caps",
    desiredAnnualPaymentLabel: "Desired annual payment:",
    legalSwissLimitLabel: "Legal Swiss limit 2026:",
    eligibleAmountLabel: "Amount retained (eligible):",
    exceedsCapPrefix: "⚠️ The payment exceeds the Swiss 3a cap (",
    exceedsCapSuffix: "). The simulation has been adjusted accordingly.",
    capStatusSalaried: "Employed",
    capStatusIndependent: "Self-employed",
    feesAndRiskPremiumsLabel: "Fees & Risk Premiums",
    netAdminFeesLabel: "Net administrative fees:",
    cumulativeAdminFeesLabel: "Cumulative admin fees:",
    monthlyRiskPremiumsLabel: "Monthly risk premiums:",
    netSavingsPortionLabel: "Net savings portion:",
    taxOptimizationLabel: "Tax Optimization & Withdrawal",
    combinedMarginalRateLabel: "Combined marginal rate",
    taxSavingsPerYearLabel: "Tax savings per year:",
    withdrawalTaxRateLabel: "Withdrawal tax rate:",
    taxPaidAtWithdrawalLabel: "Tax paid on withdrawal:",
    actuarialSolvencyNoteLabel: "Actuarial solvency note",
    solvencyNotePrefix: "Calculated using an assumed average market return of",
    solvencyNoteMiddle: "gross. The cumulative tax gain over the period is",
    solvencyNoteSuffix: "per the official federal schedule.",
    netRealCapitalPaidLabel: "Actual Net Capital Paid Out",
    afterTaxDeductionNote: "After deduction of the separate capital withdrawal tax",
    complianceRegElementsTitle: "Regulatory Elements of Individual Pension Planning:",
    pillar3aRegText: "Pillar 3a (tied pension) is reserved for people with AHV-liable income in Switzerland. Contributions are deductible from taxable income up to the annual federal caps. Capital withdrawals at retirement are taxed at a reduced rate, separate from other income.",
    pillar3bRegText: "Pillar 3b (free pension) has no legal payment cap, but its tax deductions are subject to other cantonal rules.",
    simulationDisclaimer: "⚠️ This is a simulation with approximate amounts. This comparator does not bind Le Fennec Malin or the insurance companies mentioned.",
    studyOfferedLabel: "Free Pension Study",
    yourStudyLabel: "Your study",
    summaryProjectionLabel: "Summary projection:",
    monthlySavingsPrefix: "Monthly savings of",
    monthlySavingsMiddle1: "over",
    monthlySavingsMiddle2: "years. Estimated final capital (funds):",
    monthlySavingsMiddle3: "with",
    monthlySavingsMiddle4: ". Average cumulative tax gain:",
    monthlySavingsSuffix: "in direct tax savings!",
    activityStatusLabel: "Your employment status",
    salariedWithLpp: "Employed (with LPP)",
    independentWithoutLpp: "Self-employed (without LPP)",
    formErrorMsg: "Please fill in all required fields.",
    submitBtnLabel: "Request my free study",
    privacyNoteLabel: "🔒 Your data is confidential. Strict nDPA compliance. No obligation.",
    simulationSavedTitle: "Simulation saved!",
    thankYouPrefix: "Thank you",
    thankYouMiddle: "! Your tax simulation for the 3rd pillar with",
    thankYouSuffix: "has been sent to our pension advisor.",
    followUpPrefix: "We will prepare a personalized return comparison incorporating the exact tax deduction according to your canton's tax schedule for",
    followUpMiddle: ". We will call you back at",
    followUpSuffix: "within 24 hours.",
    professionShortSalaried: "employed",
    professionShortIndependent: "self-employed",
    closeWindowBtn: "Close window",
    analyzingDesc: "Fenny is assessing your pension profile and calculating your potential tax savings by comparing",
    pillar3Label: "Pillar 3a / 3b",
    analyzingDescEnd: " offers from major Swiss insurers.",
    companiesAnalyzedLabel: "Insurance companies analyzed:",
    fennyAdvisesLabel: "Fenny recommends",
    quitBtn: "Exit",
    questionOfLabel: "Question {n} of 9",
    actionLabel: "Action 9/9",
    completedLabel: "% complete",
    cantonZH: "Zurich (ZH)", cantonGE: "Geneva (GE)", cantonVD: "Vaud (VD)", cantonBE: "Bern (BE)",
    cantonFR: "Fribourg (FR)", cantonNE: "Neuchâtel (NE)", cantonVS: "Valais (VS)", cantonJU: "Jura (JU)",
    cantonAG: "Aargau (AG)", cantonBS: "Basel-Stadt (BS)", cantonBL: "Basel-Landschaft (BL)", cantonSG: "St. Gallen (SG)",
    cantonTI: "Ticino (TI)", cantonLU: "Lucerne (LU)",
    employmentTooltipTitle: "Impact on the 3rd Pillar:",
    employmentTooltipSalaried: "Employed (with LPP):",
    employmentTooltipSalariedDesc: "Maximum annual contribution cap set at {amount} (in 2026).",
    employmentTooltipIndependent: "Self-employed (without LPP):",
    employmentTooltipIndependentDesc: "Deduction of up to 20% of net operating income, max {amount}.",
    employmentTooltipUnemployed: "Not employed:",
    employmentTooltipUnemployedDesc: "No tax reduction on the tied 3a, but the free 3b remains fully available.",
    taxTooltipTitle: "Tax progression:",
    taxTooltipDesc1: "In Switzerland, the tax rate increases progressively with your income.",
    taxTooltipDesc2: "The higher your income, the greater your real tax savings from deducting your 3rd Pillar contributions (often between 22% and 45% direct tax gain!).",
    lppTooltipTitle: "Pension fund (LPP):",
    lppTooltipDesc1: "If you have a pension fund through your employer or on a private basis, your annual 3a contribution cap is {amount}.",
    lppTooltipDesc2: "If you don't (self-employed or not employed), you can contribute up to 20% of your net earned income, max {amount}.",
    deathCoverageTitle: "Supplementary death coverage",
    deathCoverageDesc: "Payment of a guaranteed capital to your loved ones in the event of death.",
    yesLabel: "Yes",
    noLabel: "No",
    desiredDeathCapitalLabel: "Desired death benefit capital (CHF)",
    disabilityCoverageTitle: "Disability / incapacity coverage",
    monthlyPensionOption: "Monthly pension",
    disabilityNoneOption: "None",
    desiredMonthlyPensionLabel: "Desired monthly pension",
  },
  it: {
    heroTitle: "Simulatore 3° Pilastro e Previdenza Svizzera",
    heroSubtitle: "Trova la migliore strategia di risparmio e riduci le imposte fino a CHF 3'000.- all'anno.",
    backBtn: "Indietro",
    continueBtn: "Continua",
    verificationStepBtn: "Verifica di sicurezza",
    step1Title: "1. Che tipo di 3° Pilastro stai cercando?",
    step1Subtitle: "Il 3° pilastro ti consente di accumulare un capitale di pensionamento risparmiando sulle imposte ogni anno.",
    p3aLabel: "Pilastro 3a (Vincolato)",
    p3aDesc: "Massima deduzione fiscale",
    p3aDetails: "Vincolato per legge fino alla pensione. Ideale per un elevato risparmio fiscale.",
    p3bLabel: "Pilastro 3b (Libero)",
    p3bDesc: "Flessibilità totale nei prelievi",
    p3bDetails: "Nessuna deduzione fiscale di base, ma capitale disponibile in qualsiasi momento senza vincoli.",
    pUnknownLabel: "Non so ancora",
    pUnknownDesc: "Aiutami a scegliere!",
    pUnknownDetails: "Consente di valutare entrambe le soluzioni per trovare l'offerta migliore.",
    step2Title: "2. Il tuo profilo personale (obbligatorio)",
    step2Subtitle: "Età, cantone e reddito influenzano direttamente il calcolo dei premi e il risparmio fiscale massimo.",
    birthDateLabel: "Data di nascita dell'assicurato (GG.MM.AAAA) *",
    birthDatePlaceholder: "Es: 28.05.1990",
    invalidDateErr: "⚠️ Data non valida o impossibile",
    calculatedAge: "✓ Età calcolata:",
    yearsOld: "anni",
    birthDateHelper: "Inserisci le 8 cifre della tua data di nascita. Molto veloce su mobile.",
    genderLabel: "Sesso legale *",
    male: "Uomo",
    female: "Donna",
    cantonLabel: "Cantone di residenza *",
    employmentLabel: "Stato professionale *",
    salaried: "Dipendente (con cassa pensione LPP)",
    independent: "Indipendente (senza cassa pensione)",
    unemployed: "Senza attività lucrativa / Altro",
    incomeLabel: "Reddito annuo lordo (CHF)",
    hasSecondPillarLabel: "Già affiliato a un 2° pilastro (LPP)?",
    yes: "Sì",
    no: "No",
    step3Title: "3. Che tipo di prodotto desideri?",
    step3Subtitle: "Le soluzioni bancarie privilegiano la flessibilità, mentre le assicurazioni combinano copertura decesso/invalidità e risparmio.",
    pureSavings: "Risparmio puro",
    pureSavingsDesc: "Nessun rischio di borsa, capitale garantito.",
    equitySavings: "Risparmio in titoli (Fondi / ETF)",
    equitySavingsDesc: "Investimento azionario per incrementare il rendimento a lungo termine.",
    mixedProduct: "Formula Mista (Fondi + Assicurazione)",
    mixedProductDesc: "Combinazione flessibile di capitale garantito e investimento in azioni.",
    equityPartTitle: "Quale quota azionaria punti ad avere?",
    step4Title: "4. Previdenza e Bisogni di copertura",
    step4Subtitle: "Determina le garanzie complementari per proteggere i tuoi beneficiari in caso di necessità.",
    deathTitle: "Copertura decesso complementare",
    deathDesc: "Erogazione di un capitale garantito ai tuoi cari in caso di decesso.",
    deathCapitalLabel: "Capitale decesso desiderato (CHF)",
    disabilityTitle: "Rendita di invalidità",
    disabilityDesc: "Rendita annua erogata in caso di incapacità lavorativa.",
    premiumExemptionTitle: "Esonero dal pagamento dei premi",
    premiumExemptionDesc: "L'assicuratore paga i premi al posto tuo in caso di invalidità.",
    dependentsTitle: "Persone a carico",
    dependentsDesc: "Coniuge o figli a carico legale.",
    step5Title: "5. Determina la tua capacità di risparmio",
    step5Subtitle: "Imposta frequenza, importo e durata desiderata. Puoi modificarli in qualsiasi momento.",
    frequencyLabel: "Frequenza di versamento",
    monthly: "Mensile",
    yearly: "Annuale",
    estimatedSaving: "Versamento stimato",
    estimatedTaxSavings: "Risparmio fiscale stimato: ~CHF",
    perYear: "/ anno",
    perMonth: "/ mese",
    commitmentLabel: "Livello di impegno contrattuale",
    fixedRegular: "Fisso regolare",
    fixedRegularDesc: "Risparmio garantito",
    bothCommitment: "Entrambi",
    bothCommitmentDesc: "Soluzione ibrida",
    investmentHorizonLabel: "Orizzonte di investimento",
    estimatedRetirementYear: "pensione stimata nel",
    yearsUnit: "anni",
    step6Title: "6. Determina il tuo profilo di rischio",
    step6Subtitle: "Se scegli una quota azionaria, la tua tolleranza definisce la volatilità massima accettabile.",
    temperamentLabel: "Atteggiamento verso le oscillazioni",
    prudent: "Prudente (0-25% azioni)",
    prudentDesc: "Ricerca di sicurezza, guadagni modesti.",
    balanced: "Equilibrato (25-50% azioni)",
    balancedDesc: "Compromesso perfetto tra crescita e stabilità.",
    dynamic: "Dinamico (50-75% azioni)",
    dynamicDesc: "Pronto ad accettare moderate fluttuazioni.",
    offensive: "Offensivo (100% azioni)",
    offensiveDesc: "Volatilità massima accettata per rendimenti elevati.",
    marketDropTitle: "Se i mercati calano del 20% in pochi mesi:",
    sellAll: "Vendo tutto per paura",
    holdWise: "Aspetto con pazienza",
    buyMore: "Ne approfitto per riacquistare",
    esgTitle: "Fondi sostenibili / Solo criteri ESG",
    esgDesc: "Escludi armi, carbone, ecc. a favore di investimenti eco-responsabili.",
    step7Title: "7. Prevedi un prelievo anticipato del capitale?",
    step7Subtitle: "In Svizzera, la legge consente il prelievo anticipato del 3a in casi specifici.",
    residenceOption: "Sì, per l'acquisto della residenza principale",
    residenceOptionDesc: "Acquisto immobiliare o ammortamento ipotecario.",
    independentOption: "Sì, per avviare un'attività indipendente",
    independentOptionDesc: "Creazione di un'impresa individuale o inizio attività commerciale.",
    abroadOption: "Sì, perché intendo lasciare la Svizzera",
    abroadOptionDesc: "Partenza definitiva dalla Svizzera.",
    noneOption: "No, nessun prelievo prima della pensione",
    noneOptionDesc: "Lasciar fruttare i miei risparmi fino all'età legale.",
    withdrawalHorizonTitle: "In quale orizzonte temporale stimi questo prelievo?",
    under5Years: "Meno di 5 anni",
    from5to10Years: "Da 5 a 10 anni",
    over10Years: "Più di 10 anni",
    step8Title: "8. Possiedi già un 3° Pilastro?",
    step8Subtitle: "Se possiedi già un 3° pilastro bancario o assicurativo, possiamo analizzarne l'ottimizzazione.",
    hasPillarQuestion: "Possiedi attualmente un 3° pilastro?",
    hasPillarDesc: "Che si tratti di un conto bancario o di una polizza attiva.",
    insurerNameLabel: "Nome dell'assicuratore/banca attuale",
    accumulatedAmountLabel: "Importo già accumulato (CHF)",
    stepGoalTitle: "Qual è il tuo obiettivo?",
    newContract: "Un nuovo contratto complementare",
    transferContract: "Trasferimento / Riscatto del contratto attuale",
    step9Title: "9. Quali sono le tue priorità di confronto?",
    step9Subtitle: "Clicca sulle opzioni per assegnare la Priorità 1 e la Priorità 2.",
    yieldPriority: "Rendimento potenziale più elevato",
    yieldPriorityDesc: "Focus su fondi e azioni performanti.",
    feesPriority: "Spese e costi di gestione più bassi",
    feesPriorityDesc: "Minimizzare l'impatto dei costi amministrativi.",
    flexibilityPriority: "Flessibilità totale nei versamenti liberi",
    flexibilityPriorityDesc: "Versa quanto vuoi, quando vuoi.",
    securityPriority: "Sicurezza e capitale garantito contrattualmente",
    securityPriorityDesc: "Nessun rischio di borsa sul capitale accumulato.",
    coveragePriority: "Protezione completa (Decesso/Invalidità)",
    coveragePriorityDesc: "Proteggere al meglio coniuge e figli.",
    priority1: "Priorità 1",
    priority2: "Priorità 2",
    selectBtn: "Seleziona",
    step10Title: "Informazioni personali",
    step10Subtitle: "Questi dati normativi consentono di applicare le tariffe legali precise dell'UFSP e valutare i rischi per le complementari.",
    firstNameLabel: "Nome *",
    firstNamePlaceholder: "Es: Sophie",
    lastNameLabel: "Cognome *",
    lastNamePlaceholder: "Es: Rochat",
    emailLabel: "Indirizzo E-mail *",
    phoneLabel: "Telefono Cellulare Svizzero *",
    errFillRequired: "Compila tutti i campi obbligatori.",
    errSendingCode: "Errore nell'invio del codice e-mail.",
    errContactServer: "Impossibile contattare il server di verifica.",
    sendingCodeBtn: "Invio codice e-mail in corso...",
    receiveCodeBtn: "Ricevi il codice di verifica via E-mail",
    codeSentTitle: "Codice di sicurezza inviato via e-mail!",
    codeSentBody: "Controlla la casella di posta di {email} e inserisci il codice a 4 cifre qui sotto.",
    enterCodeLabel: "Inserisci il Codice di Sicurezza *",
    errEnter4Digits: "Inserisci il codice a 4 cifre ricevuto via e-mail.",
    errIncorrectCode: "Codice di verifica errato.",
    errVerifyCode: "Errore durante la verifica del codice.",
    verifyingBtn: "Verifica in corso...",
    validateCodeBtn: "Conferma codice e mostra i risultati",
    editDetailsBtn: "Modifica i miei dati",
    fennyMessageTitle: "Messaggio di Fenny:",
    fennyMessageText: "\"Per convalidare la tua simulazione e mostrarti le offerte certificate 2026, è stato inviato un codice a 4 cifre all'indirizzo {email}!\"",
    yourEmail: "la tua e-mail",
    footerCommitment: "Fenny si impegna: 100% anonimo, conforme alla nLPD svizzera, nessuna rivendita dati.",
    embeddedTitle: "Simula il tuo risparmio fiscale del 3° Pilastro con Fenny",
    embeddedSubtitle: "Risparmia per la pensione riducendo le tue imposte svizzere fin da quest'anno. Confronta all'istante le offerte di Pilastro 3a / 3b dei principali assicuratori (AXA, Zurich, Swiss Life, Helvetia, Allianz, ecc.) e proietta il tuo capitale futuro.",
    embeddedStat1: "Fino a CHF 3'000 di risparmio fiscale all'anno per i dipendenti",
    embeddedStat2: "Simulazione personalizzata del capitale a scadenza",
    embeddedStat3: "Neutro, indipendente e conforme alla nLPD",
    embeddedBtn: "Avvia la simulazione 3° Pilastro",
    analyzingTitle: "Analisi fiscale e previdenziale...",
    restartBtn: "Ricomincia",
    pensionTypeLabel: "Tipo di previdenza:",
    pillar3aLinked: "Pilastro 3a (vincolato)",
    pillar3bFree: "Pilastro 3b (libero)",
    mixedShort: "Misto",
    monthlyPaymentLabel: "Versamento mensile:",
    contractDurationLabel: "Durata del contratto:",
    yourProfileLabel: "Il tuo profilo:",
    profileYoung: "Giovane lavoratore",
    profileFamily: "Famiglia",
    profileSenior: "Senior",
    profileIndependent: "Indipendente",
    majorPriorityLabel: "Priorità principale:",
    priorityTaxSaving: "Massimo risparmio fiscale",
    priorityHighYield: "Rendimento azionario",
    priorityGuaranteed: "Capitale garantito 100%",
    hideAdjustments2: "Nascondi le regolazioni",
    adjustSlidersDirectly: "Regola i cursori direttamente",
    monthlyPaymentShort: "Versamento mensile",
    contractDurationShort: "Durata contrattuale",
    priorityFieldLabel: "Priorità",
    legalLimits3aLabel: "Limiti legali 3° pilastro:",
    salariedCapLabel: "Massimale dipendenti 2026:",
    independentCapLabel: "Massimale indipendenti 2026:",
    yourSimulationLabel: "La tua simulazione",
    pensionWordShort: "Previdenza",
    adjustBtn: "Regola",
    officialWarningTitle: "Avviso ufficiale 3° pilastro:",
    officialWarningDesc: "Le condizioni del 3° pilastro vengono aggiornate manualmente e potrebbero essere cambiate — verifica sempre con il fornitore.",
    estimatedTaxSavingsCardLabel: "Risparmio fiscale stimato",
    totalTaxReductionPrefix: "Equivale a una riduzione fiscale totale stimata di circa",
    totalTaxReductionSuffix: "sull'intera durata.",
    recommendationLabel: "Raccomandazione",
    recoMixed: "Scegli un modello misto azioni/obbligazioni",
    recoGuaranteed: "Privilegia la sicurezza del capitale garantito",
    recoTaxSaving: "Massimizza il tuo 3a vincolato per il vantaggio fiscale",
    recoDesc: "I contributi del 3a sono esenti dall'imposta sulla sostanza durante la fase di risparmio.",
    filterSortLabel: "Filtra e ordina le offerte del 3° pilastro",
    insurersAvailableLabel: "assicuratori disponibili",
    allInsurersTab: "Tutti gli assicuratori",
    maxYieldTab: "Rendimento max (Azioni)",
    securityCapitalTab: "Sicurezza e Capitale",
    highestGuaranteedBadge: "Capitale garantito più alto",
    hideDetailsBtn: "Nascondi dettagli",
    techSheetBtn: "Scheda tecnica",
    yourProjectionLabel: "La tua proiezione",
    officialRegulationTitle: "Regolamento ufficiale AFC e deposito attuariale 2026",
    certifiedBadge: "CERTIFICATO SWISS-ACCURACY • 100% AFFIDABILE",
    savingsLimitsLabel: "Risparmio e massimali",
    desiredAnnualPaymentLabel: "Versamento annuo desiderato:",
    legalSwissLimitLabel: "Limite legale svizzero 2026:",
    eligibleAmountLabel: "Importo trattenuto (idoneo):",
    exceedsCapPrefix: "⚠️ Il versamento supera il massimale svizzero 3a (",
    exceedsCapSuffix: "). La simulazione è stata adeguata di conseguenza.",
    capStatusSalaried: "Dipendente",
    capStatusIndependent: "Indipendente",
    feesAndRiskPremiumsLabel: "Costi e premi di rischio",
    netAdminFeesLabel: "Costi amministrativi netti:",
    cumulativeAdminFeesLabel: "Costi amministrativi cumulati:",
    monthlyRiskPremiumsLabel: "Premi di rischio mensili:",
    netSavingsPortionLabel: "Quota netta di risparmio:",
    taxOptimizationLabel: "Ottimizzazione fiscale e prelievo",
    combinedMarginalRateLabel: "Aliquota marginale combinata",
    taxSavingsPerYearLabel: "Risparmio fiscale annuo:",
    withdrawalTaxRateLabel: "Aliquota d'imposta sul prelievo:",
    taxPaidAtWithdrawalLabel: "Imposta pagata al versamento:",
    actuarialSolvencyNoteLabel: "Nota attuariale di solvibilità",
    solvencyNotePrefix: "Calcolato su un rendimento di borsa medio stimato del",
    solvencyNoteMiddle: "lordo. Il risparmio fiscale cumulato nel periodo è di",
    solvencyNoteSuffix: "secondo la tabella ufficiale della Confederazione.",
    netRealCapitalPaidLabel: "Capitale netto reale versato",
    afterTaxDeductionNote: "Dopo la deduzione dell'imposta separata sul prelievo di capitale",
    complianceRegElementsTitle: "Elementi normativi della previdenza individuale:",
    pillar3aRegText: "Il pilastro 3a (previdenza vincolata) è riservato alle persone con reddito soggetto all'AVS in Svizzera. I contributi sono deducibili dal reddito imponibile fino ai massimali federali annuali. I prelievi di capitale al pensionamento sono tassati a un'aliquota ridotta, separatamente dagli altri redditi.",
    pillar3bRegText: "Il pilastro 3b (previdenza libera) non ha un massimale legale di versamento, ma le sue deduzioni fiscali sono soggette ad altre normative cantonali.",
    simulationDisclaimer: "⚠️ Si tratta di una simulazione con importi approssimativi. Questo comparatore non impegna Le Fennec Malin né le compagnie assicurative citate.",
    studyOfferedLabel: "Studio previdenziale gratuito",
    yourStudyLabel: "Il tuo studio",
    summaryProjectionLabel: "Proiezione riassuntiva:",
    monthlySavingsPrefix: "Risparmio mensile di",
    monthlySavingsMiddle1: "per",
    monthlySavingsMiddle2: "anni. Capitale finale stimato (fondi):",
    monthlySavingsMiddle3: "presso",
    monthlySavingsMiddle4: ". Risparmio fiscale medio cumulato:",
    monthlySavingsSuffix: "di risparmio fiscale diretto!",
    activityStatusLabel: "Il tuo stato occupazionale",
    salariedWithLpp: "Dipendente (con LPP)",
    independentWithoutLpp: "Indipendente (senza LPP)",
    formErrorMsg: "Compila tutti i campi obbligatori.",
    submitBtnLabel: "Richiedi il mio studio gratuito",
    privacyNoteLabel: "🔒 I tuoi dati sono riservati. Rigorosa conformità nLPD. Nessun impegno.",
    simulationSavedTitle: "Simulazione salvata!",
    thankYouPrefix: "Grazie",
    thankYouMiddle: "! La tua simulazione fiscale per il 3° pilastro presso",
    thankYouSuffix: "è stata trasmessa al nostro consulente previdenziale.",
    followUpPrefix: "Prepareremo un confronto di rendimento personalizzato che integra la deduzione fiscale esatta secondo la tabella fiscale del tuo cantone per",
    followUpMiddle: ". Ti ricontatteremo al",
    followUpSuffix: "entro 24 ore.",
    professionShortSalaried: "dipendente",
    professionShortIndependent: "indipendente",
    closeWindowBtn: "Chiudi finestra",
    analyzingDesc: "Fenny valuta il tuo profilo previdenziale e calcola il tuo potenziale risparmio fiscale confrontando le offerte di",
    pillar3Label: "Pilastro 3a / 3b",
    analyzingDescEnd: " dei principali assicuratori svizzeri.",
    companiesAnalyzedLabel: "Compagnie assicurative analizzate:",
    fennyAdvisesLabel: "Fenny consiglia",
    quitBtn: "Esci",
    questionOfLabel: "Domanda {n} di 9",
    actionLabel: "Azione 9/9",
    completedLabel: "% completato",
    cantonZH: "Zurigo (ZH)", cantonGE: "Ginevra (GE)", cantonVD: "Vaud (VD)", cantonBE: "Berna (BE)",
    cantonFR: "Friburgo (FR)", cantonNE: "Neuchâtel (NE)", cantonVS: "Vallese (VS)", cantonJU: "Giura (JU)",
    cantonAG: "Argovia (AG)", cantonBS: "Basilea Città (BS)", cantonBL: "Basilea Campagna (BL)", cantonSG: "San Gallo (SG)",
    cantonTI: "Ticino (TI)", cantonLU: "Lucerna (LU)",
    employmentTooltipTitle: "Impatto sul 3° pilastro:",
    employmentTooltipSalaried: "Dipendente (con LPP):",
    employmentTooltipSalariedDesc: "Massimale annuo di contribuzione fissato a {amount} (nel 2026).",
    employmentTooltipIndependent: "Indipendente (senza LPP):",
    employmentTooltipIndependentDesc: "Deduzione fino al 20% del reddito netto d'esercizio, max {amount}.",
    employmentTooltipUnemployed: "Senza attività:",
    employmentTooltipUnemployedDesc: "Nessuna riduzione fiscale sul 3a vincolato, ma il 3b resta pienamente possibile.",
    taxTooltipTitle: "Progressività dell'imposta:",
    taxTooltipDesc1: "In Svizzera, l'aliquota fiscale aumenta progressivamente con il reddito.",
    taxTooltipDesc2: "Più alto è il reddito, maggiore sarà il risparmio fiscale reale deducendo i contributi al 3° pilastro (spesso tra il 22% e il 45% di guadagno fiscale diretto!).",
    lppTooltipTitle: "Cassa pensione (LPP):",
    lppTooltipDesc1: "Se disponi di una cassa pensione tramite il datore di lavoro o a titolo privato, il tuo massimale annuo 3a è di {amount}.",
    lppTooltipDesc2: "Se non ne disponi (indipendente o senza attività), puoi versare fino al 20% del tuo reddito netto da lavoro, max {amount}.",
    deathCoverageTitle: "Copertura decesso complementare",
    deathCoverageDesc: "Versamento di un capitale garantito ai tuoi cari in caso di decesso.",
    yesLabel: "Sì",
    noLabel: "No",
    desiredDeathCapitalLabel: "Capitale decesso desiderato (CHF)",
    disabilityCoverageTitle: "Copertura in caso di incapacità di guadagno / invalidità",
    monthlyPensionOption: "Rendita mensile",
    disabilityNoneOption: "Nessuna",
    desiredMonthlyPensionLabel: "Rendita mensile desiderata",
  }
};

interface LifePensionComparatorProps {
  isEmbedded?: boolean;
  onStartQuiz?: () => void;
}

const LIFE_ADVICE_MAP = {
  firstName: "Votre prénom permettra d'éditer une offre 3e pilier sur-mesure.",
  lastName: "Votre nom de famille est requis pour les simulations fiscales.",
  email: "L'adresse e-mail à laquelle sera envoyée l'étude de prévoyance.",
  phone: "Votre numéro mobile suisse pour la validation sécurisée.",
};

export default function LifePensionComparator({ isEmbedded = false, onStartQuiz }: LifePensionComparatorProps) {
  const { language } = useLanguage();
  const ui = LIFE_UI_TEXTS[language] || LIFE_UI_TEXTS.fr;

  // 1. Core State with comprehensive Swiss 3rd pillar questions
  const [filters, setFilters] = useState<LifeFilterState>({
    type: '3a',
    profile: 'young',
    priority: 'tax-saving',
    birthDate: '1995-07-09',
    gender: 'M',
    canton: 'GE',
    employmentStatus: 'salaried',
    annualIncome: 85000,
    hasSecondPillar: true,
    productType: 'equity-savings',
    equityPart: '50%',
    deathCoverageNeeded: false,
    deathCoverageAmount: 50000,
    disabilityCoverageNeeded: 'none',
    premiumExemptionNeeded: true,
    hasDependents: false,
    savingAmount: 300,
    savingFrequency: 'monthly',
    commitmentPreference: 'fixed',
    investmentHorizon: 25,
    riskTolerance: 'balanced',
    reactionToDrop: 'hold',
    prefersEsg: true,
    earlyWithdrawalReason: 'none',
    earlyWithdrawalHorizon: 'none',
    hasExistingThirdPillar: false,
    existingInsurer: '',
    existingAmount: 0,
    transferType: 'new',
    priorityRank1: 'yield',
    priorityRank2: 'fees',
  });

  const [monthlyAmount, setMonthlyAmount] = useState<number>(300);
  const [duration, setDuration] = useState<number>(25);

  // Local state for formatted typing birthday input (JJ.MM.AAAA)
  const [typedBirthDate, setTypedBirthDate] = useState<string>(() => {
    const bd = filters.birthDate || '1995-07-09';
    const parts = bd.split('-');
    if (parts.length === 3) {
      return `${parts[2]}.${parts[1]}.${parts[0]}`;
    }
    return '09.07.1995';
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
        setFilters(prev => ({ ...prev, birthDate: iso }));
      } else {
        setFilters(prev => ({ ...prev, birthDate: undefined }));
      }
    } else {
      setFilters(prev => ({ ...prev, birthDate: undefined }));
    }
  };

  const parsedBirthDateInfo = useMemo(() => {
    if (!filters.birthDate) return null;
    const parts = filters.birthDate.split('-');
    if (parts.length !== 3) return null;
    const year = parseInt(parts[0], 10);
    const age = new Date().getFullYear() - year;
    return { age };
  }, [filters.birthDate]);

  // Synchronize savingAmount and monthlyAmount when they change in quiz
  useEffect(() => {
    if (filters.savingAmount) {
      const equiv = filters.savingFrequency === 'yearly' 
        ? Math.round(filters.savingAmount / 12) 
        : filters.savingAmount;
      setMonthlyAmount(equiv);
    }
  }, [filters.savingAmount, filters.savingFrequency]);

  useEffect(() => {
    if (filters.investmentHorizon) {
      setDuration(filters.investmentHorizon);
    }
  }, [filters.investmentHorizon]);

  // GSAP animated progress bar refs
  const progressBarRef = useRef<HTMLDivElement>(null);
  const globalProgressBarRef = useRef<HTMLDivElement>(null);
  const modalProgressRef = useRef<HTMLDivElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Feny advice tooltip state
  const [fenyAdvice, setFenyAdvice] = useState<string | null>(null);
  const fenyHelperRef = useRef<HTMLDivElement>(null);

  // UI state for the step-by-step wizard
  const [quizMode, setQuizMode] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStage, setAnalysisStage] = useState<number>(0);
  const [showFiltersInline, setShowFiltersInline] = useState<boolean>(false);
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);
  const [offersTab, setOffersTab] = useState<'all' | 'yield' | 'guaranteed'>('all');

  // SMS & Email verification states
  const [verificationStep, setVerificationStep] = useState<'details' | 'code'>('details');
  const [verificationCodeInput, setVerificationCodeInput] = useState<string>('');
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [isSendingCode, setIsSendingCode] = useState<boolean>(false);

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
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 5000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isAnalyzing]);

  // Modal contact form state
  const [selectedAssureur, setSelectedAssureur] = useState<AssureurVie | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profession: 'salaried', // salaried or independent
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Synchronize lead status profession with quiz answers
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      profession: filters.employmentStatus === 'independent' ? 'independent' : 'salaried'
    }));
  }, [filters.employmentStatus]);

  // Pillar 3a maximum limits reference
  const currentCeilingSalaried = 7258;
  const currentCeilingIndependent = 36288;

  // 1. GSAP-driven Progress Bar Animation for Wizard & Global
  useEffect(() => {
    const percentage = quizMode ? Math.min(100, (currentStep / 9) * 100) : 100;
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
    if (modalProgressRef.current && selectedAssureur) {
      const percentage = (completedFieldsCount / 4) * 100;
      gsap.to(modalProgressRef.current, {
        width: `${percentage}%`,
        duration: 0.45,
        ease: 'power2.out'
      });
    }
  }, [completedFieldsCount, selectedAssureur]);

  // Set Feny advice automatically based on active step in quiz mode
  useEffect(() => {
    if (quizMode) {
      const adviceMap = LIFE_ADVICE_MAPS[language] || LIFE_ADVICE_MAPS.fr;
      if (currentStep === 1) setFenyAdvice(adviceMap.type);
      else if (currentStep === 2) setFenyAdvice(adviceMap.personal);
      else if (currentStep === 3) setFenyAdvice(adviceMap.product);
      else if (currentStep === 4) setFenyAdvice(adviceMap.coverage);
      else if (currentStep === 5) setFenyAdvice(adviceMap.savings);
      else if (currentStep === 6) setFenyAdvice(adviceMap.risk);
      else if (currentStep === 7) setFenyAdvice(adviceMap.withdrawal);
      else if (currentStep === 8) setFenyAdvice(adviceMap.existing);
      else if (currentStep === 9) setFenyAdvice(adviceMap.priority);
    } else {
      setFenyAdvice(null);
    }
  }, [currentStep, quizMode, language]);

  // Scroll to top when analysis starts so user can see the analyzing animation
  useEffect(() => {
    if (isAnalyzing) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.scrollTo({ top: 0, behavior: 'smooth' });
      const scrollContainers = document.querySelectorAll('.overflow-y-auto');
      scrollContainers.forEach(container => {
        container.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }, [isAnalyzing]);

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
    if (selectedAssureur) {
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
  }, [selectedAssureur]);

  // Computed results
  const simulatedResults = useMemo(() => {
    // Filter first
    let list = ASSUREURS_VIE.filter((company) => {
      // Filter by type: e.g. if type is 3a, make sure supportedTypes includes 3a
      if (filters.type !== 'all' && filters.type !== 'mixte') {
        return company.supportedTypes.includes(filters.type as any);
      }
      return true;
    });

    // Score and enrich each company with projections
    const enriched = list.map((company) => {
      const estimate = getLifeInsuranceEstimate(
        company,
        filters.type,
        monthlyAmount,
        duration,
        filters.priority,
        {
          deathCoverageNeeded: filters.deathCoverageNeeded,
          deathCoverageAmount: filters.deathCoverageAmount,
          disabilityCoverageNeeded: filters.disabilityCoverageNeeded,
          premiumExemptionNeeded: filters.premiumExemptionNeeded,
          annualIncome: filters.annualIncome,
          canton: filters.canton,
          hasSecondPillar: filters.hasSecondPillar,
        }
      );

      // Perform exact, 2026-regulation compliant Swiss Tax and payout simulation
      const taxAndPayout = calculateSwiss3rdPillarSimulation({
        type: filters.type as any,
        annualIncome: filters.annualIncome || 85000,
        hasSecondPillar: filters.hasSecondPillar,
        savingAmount: monthlyAmount,
        savingFrequency: 'monthly',
        canton: filters.canton || 'GE',
        durationYears: duration,
        projectedCapitalGross: estimate.expectedSum,
      });

      return {
        ...company,
        ...estimate,
        taxDetails: taxAndPayout,
        taxSavingsPerYear: taxAndPayout.yearlyTaxSavings, // for backwards-compatibility
      };
    });

    // Sort based on the selected offers tab
    if (offersTab === 'yield') {
      return [...enriched].sort((a, b) => b.expectedSum - a.expectedSum);
    } else if (offersTab === 'guaranteed') {
      return [...enriched].sort((a, b) => b.guaranteedSum - a.guaranteedSum);
    } else if (offersTab === 'partner') {
      return [...enriched].sort((a, b) => {
        if (a.isPartner && !b.isPartner) return -1;
        if (!a.isPartner && b.isPartner) return 1;
        return b.rating - a.rating;
      });
    }

    return enriched;
  }, [filters, monthlyAmount, duration, offersTab]);

  // 6. GSAP-driven Staggered Reveal for results list cards
  useEffect(() => {
    if (!quizMode && !isAnalyzing && resultsContainerRef.current) {
      const cards = resultsContainerRef.current.querySelectorAll('.pension-result-card');
      if (cards.length > 0) {
        gsap.killTweensOf(cards);
        gsap.set(cards, { opacity: 0, y: 30 });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'opacity,transform'
        });
      }
    }
  }, [quizMode, isAnalyzing, offersTab, simulatedResults]);

  const handleFilterChange = <K extends keyof LifeFilterState>(key: K, value: LifeFilterState[K]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleOpenForm = (assureur: AssureurVie) => {
    setSelectedAssureur(assureur);
    setFormSubmitted(false);
    setFormError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseForm = () => {
    setSelectedAssureur(null);
    setFormError(null);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setFormError("Veuillez remplir tous les champs obligatoires.");
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
          type: 'life_pension',
          lead: formData,
          details: {
            monthlyAmount,
            duration,
            pillarType: filters.type,
            currentPillar: "Non spécifié"
          },
          assureur: selectedAssureur
        })
      });
    } catch (err) {
      console.error("[SubmitError]", err);
    }

    setFormSubmitted(true);
  };

  // Tax savings summary
  const totalTaxSavingsOverTerm = useMemo(() => {
    if (simulatedResults.length === 0) return 0;
    const firstCompany = simulatedResults[0];
    return firstCompany.taxSavingsPerYear * duration;
  }, [simulatedResults, duration]);

  // Next step handler in wizard
  const nextStep = () => {
    if (currentStep < 10) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Prev step handler in wizard
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

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
            <PiggyBank className="w-4 h-4 mr-1.5 text-emerald-500 shrink-0" />
            {ui.embeddedStat1}
          </span>
          <span className="flex items-center text-emerald-700">
            <Calculator className="w-4 h-4 mr-1.5 text-emerald-500 shrink-0" />
            {ui.embeddedStat2}
          </span>
          <span className="flex items-center text-emerald-700">
            <Shield className="w-4 h-4 mr-1.5 text-emerald-500 shrink-0" />
            {ui.embeddedStat3}
          </span>
        </div>

        <div className="pt-4">
          <button
            onClick={onStartQuiz}
            className="px-8 py-4 bg-fennec-dark hover:bg-fennec-terracotta text-white font-display font-extrabold text-base rounded-full shadow-lg shadow-fennec-dark/25 hover:-translate-y-0.5 transition-all flex items-center space-x-2 mx-auto animate-bounce cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-fennec-terracotta animate-pulse" />
            <span>{ui.embeddedBtn}</span>
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 relative">
      
      {/* Sleek Global GSAP Progress Bar */}
      <div className="absolute -top-6 sm:-top-10 -left-6 sm:-left-10 -right-6 sm:-right-10 h-1.5 bg-fennec-cream/20 overflow-hidden rounded-t-[40px] z-20">
        <div 
          ref={globalProgressBarRef}
          className="h-full bg-fennec-terracotta origin-left"
          style={{ width: '20%' }}
        />
      </div>
      
      {/* Title */}
      <div className="text-center md:text-left mb-6">
        <span className="text-[11px] font-bold tracking-widest text-fennec-terracotta uppercase block mb-1">
          Simulateur Fiscal & Rendement 2026
        </span>
        <h2 className="font-display font-extrabold text-3xl text-fennec-dark">
          Prévoyance Privée : Trouvez votre meilleur 3e Pilier
        </h2>
        <p className="mt-1 text-sm text-fennec-dark/70">
          Comparez les rendements et projetez vos déductions fiscales d'impôts sur la base des plafonds fédéraux suisses.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {quizMode ? (
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
                  <span>{currentStep >= 9 ? ui.actionLabel : ui.questionOfLabel.replace('{n}', String(currentStep))}</span>
                  <span>{Math.min(100, Math.round((currentStep / 9) * 100))}{ui.completedLabel}</span>
                </div>
                <div className="h-1.5 w-full bg-fennec-cream/40 rounded-full overflow-hidden relative">
                  <div 
                    ref={progressBarRef}
                    className="h-full bg-fennec-terracotta rounded-full origin-left"
                    style={{ width: `${Math.min(100, (currentStep / 9) * 100)}%` }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setQuizMode(false)}
                disabled={isAnalyzing}
                className="flex items-center text-xs font-bold font-display px-3.5 py-2 rounded-full border border-fennec-cream/60 text-fennec-dark hover:bg-fennec-cream/15 transition-all disabled:opacity-50"
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
                      {ui.analyzingDesc} <strong>{ui.pillar3Label}</strong>{ui.analyzingDescEnd}
                    </p>
                  </div>

                  {/* Infinite Auto-Scrolling Logo Carousel */}
                  <div className="space-y-2 max-w-xl mx-auto pt-4">
                    <p className="text-[11px] font-black uppercase tracking-wider text-fennec-brown/60 text-center">
                      {ui.companiesAnalyzedLabel}
                    </p>
                    <div className="relative w-full overflow-hidden py-3 border-y border-fennec-cream/30 bg-white/30 rounded-2xl">
                      {/* Left and right fade gradients */}
                      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
                      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
                      
                      {/* Scrolling wrapper */}
                      <div className="flex space-x-6 animate-scroll-left w-max">
                        {['swisslife', 'axa', 'zurich', 'helvetia', 'allianz', 'generali', 'mobiliere'].map((logo, idx) => (
                          <div key={`${logo}-${idx}`} className="shrink-0">
                            <CompanyLogo id={logo} className="w-20 h-11 bg-white" />
                          </div>
                        ))}
                        {['swisslife', 'axa', 'zurich', 'helvetia', 'allianz', 'generali', 'mobiliere'].map((logo, idx) => (
                          <div key={`${logo}-dup-${idx}`} className="shrink-0">
                            <CompanyLogo id={logo} className="w-20 h-11 bg-white" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                /* MAIN QUESTION + MASCOT GRID */
                <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start py-6">
                  
                  {/* Mascot Left Panel */}
                  <div className="lg:col-span-5 flex flex-col items-center lg:items-end space-y-4">
                    
                    {/* Floating Speech Bubble */}
                    {fenyAdvice && (
                      <div className="relative bg-white border border-fennec-cream shadow-sm p-4 rounded-3xl max-w-sm text-left animate-in fade-in slide-in-from-bottom-2 duration-200">
                        <div className="space-y-1">
                          <span className="text-[9px] font-black text-fennec-terracotta uppercase tracking-wider block">
                            {ui.fennyAdvisesLabel}
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
                          currentStep === 2 ? fenySavings :
                          currentStep === 3 ? fenyAvatar :
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
                        
                        {/* STEP 1: TYPE OF PILLAR (Single choice -> Cards) */}
                        {currentStep === 1 && (
                          <motion.div
                            key="p-step-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-6 text-left w-full animate-in fade-in duration-300"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-fennec-terracotta">
                                <Shield className="w-5 h-5 shrink-0" />
                                <h3 className="font-display font-black text-xl md:text-2xl text-fennec-dark">
                                  {ui.step1Title}
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                {ui.step1Subtitle}
                              </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                              {[
                                { id: '3a', label: ui.p3aLabel, desc: ui.p3aDesc, details: ui.p3aDetails, icon: PiggyBank },
                                { id: '3b', label: ui.p3bLabel, desc: ui.p3bDesc, details: ui.p3bDetails, icon: Shield },
                                { id: 'all', label: ui.pUnknownLabel, desc: ui.pUnknownDesc, details: ui.pUnknownDetails, icon: Sparkles },
                              ].map((t) => {
                                const isSelected = filters.type === t.id;
                                const IconComponent = t.icon;
                                return (
                                  <motion.button
                                    key={t.id}
                                    type="button"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => {
                                      handleFilterChange('type', t.id as any);
                                      setTimeout(() => nextStep(), 220);
                                    }}
                                    className={`p-4 rounded-2xl border text-left flex items-start space-x-4 transition-all ${
                                      isSelected
                                        ? 'bg-fennec-terracotta text-white border-fennec-terracotta shadow-md font-bold'
                                        : 'border-fennec-cream text-fennec-dark bg-fennec-cream/5 hover:bg-fennec-cream/15 font-semibold'
                                    }`}
                                  >
                                    <div className={`p-3 rounded-xl ${isSelected ? 'bg-white/20 text-white' : 'bg-fennec-cream text-fennec-terracotta'} shrink-0`}>
                                      <IconComponent className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1">
                                      <div className="flex items-baseline space-x-2">
                                        <span className="font-display font-black text-base">{t.label}</span>
                                        <span className="text-xs opacity-80 font-medium">({t.desc})</span>
                                      </div>
                                      <span className="text-xs opacity-90 block leading-relaxed">{t.details}</span>
                                    </div>
                                  </motion.button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 2: PERSONAL PROFILE (Detailed profile) */}
                        {currentStep === 2 && (
                          <motion.div
                            key="p-step-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-6 text-left w-full animate-in fade-in duration-300"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-fennec-terracotta">
                                <User className="w-5 h-5 shrink-0" />
                                <h3 className="font-display font-black text-xl md:text-2xl text-fennec-dark">
                                  {ui.step2Title}
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                {ui.step2Subtitle}
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Birth Date & Gender */}
                              <div className="space-y-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">{ui.birthDateLabel}</label>
                                  <input 
                                    type="text"
                                    inputMode="numeric"
                                    placeholder={ui.birthDatePlaceholder}
                                    value={typedBirthDate}
                                    onChange={(e) => handleBirthDateTypedChange(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-fennec-cream/80 bg-white text-fennec-dark focus:outline-none focus:border-fennec-terracotta font-mono font-bold text-sm"
                                    required
                                  />
                                  {typedBirthDate.replace(/\D/g, '').length === 8 && !filters.birthDate && (
                                    <p className="text-[10px] font-semibold text-red-500 mt-1">
                                      {ui.invalidDateErr}
                                    </p>
                                  )}
                                  {filters.birthDate && parsedBirthDateInfo && (
                                    <p className="text-[10px] font-bold text-green-600 mt-1">
                                      {ui.calculatedAge} {parsedBirthDateInfo.age} {ui.yearsOld}
                                    </p>
                                  )}
                                  {typedBirthDate.replace(/\D/g, '').length < 8 && (
                                    <p className="text-[10px] text-fennec-dark/45 mt-1">
                                      {ui.birthDateHelper}
                                    </p>
                                  )}
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">{ui.genderLabel}</label>
                                  <div className="grid grid-cols-2 gap-2">
                                    {['M', 'F'].map((g) => (
                                      <button
                                        key={g}
                                        type="button"
                                        onClick={() => handleFilterChange('gender', g as any)}
                                        className={`py-2 rounded-xl border font-bold text-sm text-center transition-all ${
                                          filters.gender === g
                                            ? 'bg-fennec-terracotta text-white border-fennec-terracotta'
                                            : 'border-fennec-cream/80 text-fennec-dark bg-white hover:bg-fennec-cream/10'
                                        }`}
                                      >
                                        {g === 'M' ? ui.male : ui.female}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">{ui.cantonLabel}</label>
                                  <select
                                    value={filters.canton || 'GE'}
                                    onChange={(e) => handleFilterChange('canton', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-fennec-cream/80 bg-white text-fennec-dark focus:outline-none focus:border-fennec-terracotta font-medium text-sm"
                                  >
                                    <option value="ZH">{ui.cantonZH}</option>
                                    <option value="GE">{ui.cantonGE}</option>
                                    <option value="VD">{ui.cantonVD}</option>
                                    <option value="BE">{ui.cantonBE}</option>
                                    <option value="FR">{ui.cantonFR}</option>
                                    <option value="NE">{ui.cantonNE}</option>
                                    <option value="VS">{ui.cantonVS}</option>
                                    <option value="JU">{ui.cantonJU}</option>
                                    <option value="AG">{ui.cantonAG}</option>
                                    <option value="BS">{ui.cantonBS}</option>
                                    <option value="BL">{ui.cantonBL}</option>
                                    <option value="SG">{ui.cantonSG}</option>
                                    <option value="TI">{ui.cantonTI}</option>
                                    <option value="LU">{ui.cantonLU}</option>
                                  </select>
                                </div>
                              </div>

                              {/* Profession, Income & 2nd Pillar */}
                              <div className="space-y-4">
                                <div className="space-y-1">
                                  <div className="flex items-center space-x-1">
                                    <label className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">{ui.employmentLabel}</label>
                                    <FormTooltip content={
                                      <div className="space-y-1.5 text-white">
                                        <p className="font-bold text-fennec-terracotta">{ui.employmentTooltipTitle}</p>
                                        <p>• <strong>{ui.employmentTooltipSalaried}</strong> {ui.employmentTooltipSalariedDesc.replace('{amount}', "CHF 7'258.-")}</p>
                                        <p>• <strong>{ui.employmentTooltipIndependent}</strong> {ui.employmentTooltipIndependentDesc.replace('{amount}', "CHF 36'288.-")}</p>
                                        <p>• <strong>{ui.employmentTooltipUnemployed}</strong> {ui.employmentTooltipUnemployedDesc}</p>
                                      </div>
                                    } />
                                  </div>
                                  <select
                                    value={filters.employmentStatus || 'salaried'}
                                    onChange={(e) => handleFilterChange('employmentStatus', e.target.value as any)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-fennec-cream/80 bg-white text-fennec-dark focus:outline-none focus:border-fennec-terracotta font-medium text-sm"
                                  >
                                    <option value="salaried">{ui.salaried}</option>
                                    <option value="independent">{ui.independent}</option>
                                    <option value="unemployed">{ui.unemployed}</option>
                                  </select>
                                </div>

                                <div className="space-y-1">
                                  <div className="flex items-center space-x-1">
                                    <label className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">{ui.incomeLabel}</label>
                                    <FormTooltip content={
                                      <div className="space-y-1.5 text-white">
                                        <p className="font-bold text-fennec-terracotta font-sans">{ui.taxTooltipTitle}</p>
                                        <p>{ui.taxTooltipDesc1}</p>
                                        <p>{ui.taxTooltipDesc2}</p>
                                      </div>
                                    } />
                                  </div>
                                  <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-fennec-brown/50">CHF</span>
                                    <input 
                                      type="number"
                                      value={filters.annualIncome || ''}
                                      onChange={(e) => handleFilterChange('annualIncome', Number(e.target.value))}
                                      placeholder="Ex: 85'000"
                                      className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-fennec-cream/80 bg-fennec-cream/5 text-fennec-dark focus:outline-none focus:border-fennec-terracotta font-mono font-bold text-sm"
                                    />
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <div className="flex items-center space-x-1">
                                    <label className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">{ui.hasSecondPillarLabel}</label>
                                    <FormTooltip content={
                                      <div className="space-y-1.5 text-white">
                                        <p className="font-bold text-fennec-terracotta font-sans">{ui.lppTooltipTitle}</p>
                                        <p>{ui.lppTooltipDesc1.replace('{amount}', "CHF 7'258.-")}</p>
                                        <p>{ui.lppTooltipDesc2.replace('{amount}', "CHF 36'288.-")}</p>
                                      </div>
                                    } />
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    {[true, false].map((val) => (
                                      <button
                                        key={String(val)}
                                        type="button"
                                        onClick={() => handleFilterChange('hasSecondPillar', val)}
                                        className={`py-2 rounded-xl border font-bold text-sm text-center transition-all ${
                                          filters.hasSecondPillar === val
                                            ? 'bg-fennec-tan text-white border-fennec-tan'
                                            : 'border-fennec-cream/80 text-fennec-dark bg-white hover:bg-fennec-cream/10'
                                        }`}
                                      >
                                        {val ? ui.yesLabel : ui.noLabel}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 3: PRODUCT TYPE (Savings pure, equities, life-insurance, mixed) */}
                        {currentStep === 3 && (
                          <motion.div
                            key="p-step-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-6 text-left w-full animate-in fade-in duration-300"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-fennec-terracotta">
                                <TrendingUp className="w-5 h-5 shrink-0" />
                                <h3 className="font-display font-black text-xl md:text-2xl text-fennec-dark">
                                  {ui.step3Title}
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                {ui.step3Subtitle}
                              </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                              {[
                                { id: 'pure-savings', label: ui.pureSavings, desc: ui.pureSavingsDesc, icon: PiggyBank },
                                { id: 'equity-savings', label: ui.equitySavings, desc: ui.equitySavingsDesc, icon: TrendingUp },
                                { id: 'mixed', label: ui.mixedProduct, desc: ui.mixedProductDesc, icon: Sparkles },
                              ].map((p) => {
                                const isSelected = filters.productType === p.id;
                                const IconComponent = p.icon;
                                return (
                                  <button
                                    key={p.id}
                                    type="button"
                                    onClick={() => handleFilterChange('productType', p.id as any)}
                                    className={`p-3.5 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                                      isSelected
                                        ? 'bg-fennec-terracotta text-white border-fennec-terracotta shadow-xs font-bold'
                                        : 'border-fennec-cream/80 text-fennec-dark bg-fennec-cream/5 hover:bg-fennec-cream/15'
                                    }`}
                                  >
                                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/20 text-white' : 'bg-fennec-cream text-fennec-terracotta'} shrink-0`}>
                                      <IconComponent className="w-4 h-4" />
                                    </div>
                                    <div className="space-y-0.5">
                                      <span className="font-display font-black text-sm block">{p.label}</span>
                                      <span className="text-xs opacity-90 block leading-normal">{p.desc}</span>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Sub-question for Equities/Mixed */}
                            {(filters.productType === 'equity-savings' || filters.productType === 'mixed') && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-fennec-cream/25 border border-fennec-cream rounded-2xl space-y-3"
                              >
                                <span className="text-xs font-bold text-fennec-dark block">{ui.equityPartTitle}</span>
                                <div className="grid grid-cols-4 gap-2">
                                  {['25%', '50%', '75%', '100%'].map((part) => (
                                    <button
                                      key={part}
                                      type="button"
                                      onClick={() => handleFilterChange('equityPart', part as any)}
                                      className={`py-2 rounded-xl border text-center text-xs font-black transition-all ${
                                        filters.equityPart === part
                                          ? 'bg-fennec-dark text-white border-fennec-dark'
                                          : 'bg-white text-fennec-dark border-fennec-cream/80 hover:bg-fennec-cream/15'
                                      }`}
                                    >
                                      {part}
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </motion.div>
                        )}

                        {/* STEP 4: COVERAGES & PREVOYANCE NEEDS */}
                        {currentStep === 4 && (
                          <motion.div
                            key="p-step-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-6 text-left w-full animate-in fade-in duration-300"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-fennec-terracotta">
                                <Shield className="w-5 h-5 shrink-0" />
                                <h3 className="font-display font-black text-xl md:text-2xl text-fennec-dark">
                                  {ui.step4Title}
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                {ui.step4Subtitle}
                              </p>
                            </div>

                            <div className="space-y-4">
                              {/* Death Coverage */}
                              <div className="p-4 border border-fennec-cream/60 rounded-2xl space-y-3 bg-fennec-cream/5">
                                <div className="flex justify-between items-center">
                                  <div className="space-y-0.5">
                                    <span className="text-sm font-bold text-fennec-dark block">{ui.deathCoverageTitle}</span>
                                    <span className="text-xs text-fennec-dark/60 block">{ui.deathCoverageDesc}</span>
                                  </div>
                                  <div className="flex space-x-1 shrink-0">
                                    {[true, false].map((val) => (
                                      <button
                                        key={String(val)}
                                        type="button"
                                        onClick={() => handleFilterChange('deathCoverageNeeded', val)}
                                        className={`px-3 py-1.5 rounded-lg border text-xs font-black transition-all ${
                                          filters.deathCoverageNeeded === val
                                            ? 'bg-fennec-terracotta text-white border-fennec-terracotta'
                                            : 'bg-white text-fennec-dark border-fennec-cream'
                                        }`}
                                      >
                                        {val ? ui.yesLabel : ui.noLabel}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                {filters.deathCoverageNeeded && (
                                  <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="pt-2 border-t border-fennec-cream/40"
                                  >
                                    <label className="text-[10px] font-black uppercase text-fennec-brown block mb-1">{ui.deathCapitalLabel}</label>
                                    <input 
                                      type="range"
                                      min="20000"
                                      max="250000"
                                      step="10000"
                                      value={filters.deathCoverageAmount || 50000}
                                      onChange={(e) => handleFilterChange('deathCoverageAmount', Number(e.target.value))}
                                      className="w-full accent-fennec-terracotta cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[10px] font-mono text-fennec-brown/60">
                                      <span>CHF 20'000.-</span>
                                      <span className="font-bold text-fennec-terracotta">CHF {filters.deathCoverageAmount?.toLocaleString() || "50'000"}.-</span>
                                      <span>CHF 250'000.-</span>
                                    </div>
                                  </motion.div>
                                )}
                              </div>

                              {/* Disability Coverage */}
                              <div className="p-4 border border-fennec-cream/60 rounded-2xl space-y-2 bg-fennec-cream/5">
                                <span className="text-sm font-bold text-fennec-dark block">{ui.disabilityCoverageTitle}</span>
                                <div className="grid grid-cols-2 gap-2">
                                  {[
                                    { id: 'monthly-pension', label: ui.monthlyPensionOption },
                                    { id: 'none', label: ui.disabilityNoneOption },
                                  ].map((opt) => (
                                    <button
                                      key={opt.id}
                                      type="button"
                                      onClick={() => handleFilterChange('disabilityCoverageNeeded', opt.id as any)}
                                      className={`py-2 rounded-xl border text-xs font-bold text-center transition-all ${
                                        filters.disabilityCoverageNeeded === opt.id
                                          ? 'bg-fennec-dark text-white border-fennec-dark'
                                          : 'bg-white text-fennec-dark border-fennec-cream'
                                      }`}
                                    >
                                      {opt.label}
                                    </button>
                                  ))}
                                </div>

                                {filters.disabilityCoverageNeeded === 'monthly-pension' && (
                                  <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="pt-3 border-t border-fennec-cream/40 mt-3"
                                  >
                                    <label className="text-[10px] font-black uppercase text-fennec-brown block mb-1">{ui.desiredMonthlyPensionLabel}</label>
                                    <input 
                                      type="range"
                                      min="500"
                                      max="4000"
                                      step="500"
                                      value={filters.disabilityPensionAmount || 1500}
                                      onChange={(e) => handleFilterChange('disabilityPensionAmount', Number(e.target.value))}
                                      className="w-full accent-fennec-terracotta cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[10px] font-mono text-fennec-brown/60">
                                      <span>CHF 500.-</span>
                                      <span className="font-bold text-fennec-terracotta">CHF {(filters.disabilityPensionAmount || 1500).toLocaleString()}.- / mois</span>
                                      <span>CHF 4'000.-</span>
                                    </div>
                                  </motion.div>
                                )}
                              </div>

                              {/* Exemption and Dependents */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="p-3 border border-fennec-cream/60 rounded-xl flex justify-between items-center">
                                  <div className="space-y-0.5">
                                    <span className="text-xs font-bold text-fennec-dark block">{ui.premiumExemptionTitle}</span>
                                    <span className="text-[10px] text-fennec-dark/60 block">{ui.premiumExemptionDesc}</span>
                                  </div>
                                  <input 
                                    type="checkbox"
                                    checked={filters.premiumExemptionNeeded}
                                    onChange={(e) => handleFilterChange('premiumExemptionNeeded', e.target.checked)}
                                    className="w-4 h-4 accent-fennec-terracotta shrink-0"
                                  />
                                </div>

                                <div className="p-3 border border-fennec-cream/60 rounded-xl flex justify-between items-center">
                                  <div className="space-y-0.5">
                                    <span className="text-xs font-bold text-fennec-dark block">{ui.dependentsTitle}</span>
                                    <span className="text-[10px] text-fennec-dark/60 block">{ui.dependentsDesc}</span>
                                  </div>
                                  <input 
                                    type="checkbox"
                                    checked={filters.hasDependents}
                                    onChange={(e) => handleFilterChange('hasDependents', e.target.checked)}
                                    className="w-4 h-4 accent-fennec-terracotta shrink-0"
                                  />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 5: SAVINGS CAPACITY & HORIZON */}
                        {currentStep === 5 && (
                          <motion.div
                            key="p-step-5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-6 text-left w-full animate-in fade-in duration-300"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-fennec-terracotta">
                                <PiggyBank className="w-5 h-5 shrink-0" />
                                <h3 className="font-display font-black text-xl md:text-2xl text-fennec-dark">
                                  {ui.step5Title}
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                {ui.step5Subtitle}
                              </p>
                            </div>

                            <div className="space-y-4">
                              {/* Frequency selector */}
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black uppercase text-fennec-brown tracking-wider">{ui.frequencyLabel}</span>
                                <div className="flex bg-fennec-cream/45 p-1 rounded-xl">
                                  {[
                                    { id: 'monthly', label: ui.monthly },
                                    { id: 'yearly', label: ui.yearly },
                                  ].map((f) => (
                                    <button
                                      key={f.id}
                                      type="button"
                                      onClick={() => {
                                        const isIndependent = filters.employmentStatus === 'independent';
                                        const maxAmount = isIndependent 
                                          ? (f.id === 'yearly' ? 36288 : 3024) 
                                          : (f.id === 'yearly' ? 7258 : 604);
                                        const newAmount = f.id === 'yearly' 
                                          ? Math.min((filters.savingAmount || 300) * 12, maxAmount)
                                          : Math.min(Math.round((filters.savingAmount || 3600) / 12), maxAmount);
                                        setFilters(prev => ({
                                          ...prev,
                                          savingFrequency: f.id as any,
                                          savingAmount: newAmount
                                        }));
                                      }}
                                      className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${
                                        filters.savingFrequency === f.id
                                          ? 'bg-fennec-terracotta text-white shadow-3xs'
                                          : 'text-fennec-dark hover:bg-fennec-cream/20'
                                      }`}
                                    >
                                      {f.label}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Amount display */}
                              {(() => {
                                const isIndependent = filters.employmentStatus === 'independent';
                                const isYearly = filters.savingFrequency === 'yearly';
                                const maxAmount = isIndependent 
                                  ? (isYearly ? 36288 : 3024) 
                                  : (isYearly ? 7258 : 604);
                                const minAmount = isYearly ? 500 : 50;
                                const stepAmount = isIndependent 
                                  ? (isYearly ? 500 : 50) 
                                  : (isYearly ? 100 : 10);
                                const currentSavingAmount = Math.min(filters.savingAmount || (isYearly ? 3000 : 300), maxAmount);

                                return (
                                  <>
                                    <div className="bg-fennec-cream/10 border-2 border-fennec-cream/60 rounded-2xl p-5 text-center">
                                      <span className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">{ui.estimatedSaving}</span>
                                      <span className="font-display text-3xl font-black text-fennec-terracotta block">
                                        CHF {currentSavingAmount.toLocaleString()}.- <span className="text-sm font-bold text-fennec-dark/60">{isYearly ? ui.perYear : ui.perMonth}</span>
                                      </span>
                                      <span className="text-xs text-emerald-700 font-bold block bg-emerald-50 max-w-max mx-auto px-2.5 py-0.5 rounded-full mt-1.5">
                                        {ui.estimatedTaxSavings} {Math.round((isYearly ? currentSavingAmount : currentSavingAmount * 12) * 0.22).toLocaleString()}.- {ui.perYear}
                                      </span>
                                    </div>

                                    {/* Amount slider */}
                                    <div className="space-y-1">
                                      <input 
                                        type="range"
                                        min={minAmount}
                                        max={maxAmount}
                                        step={stepAmount}
                                        value={currentSavingAmount}
                                        onChange={(e) => handleFilterChange('savingAmount', Number(e.target.value))}
                                        className="w-full accent-fennec-terracotta cursor-pointer"
                                      />
                                      <div className="flex justify-between text-[10px] font-mono text-fennec-brown/60">
                                        <span>CHF {minAmount.toLocaleString()}.-</span>
                                        <span className="font-bold text-fennec-terracotta">Max: CHF {maxAmount.toLocaleString()}.-</span>
                                        <span>CHF {maxAmount.toLocaleString()}.- {isYearly ? ui.perYear : ui.perMonth}</span>
                                      </div>
                                    </div>
                                  </>
                                );
                              })()}

                              {/* Commitment preference */}
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">{ui.commitmentLabel}</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {[
                                    { id: 'fixed', label: ui.fixedRegular, desc: ui.fixedRegularDesc },
                                    { id: 'both', label: ui.bothCommitment, desc: ui.bothCommitmentDesc },
                                  ].map((c) => (
                                    <button
                                      key={c.id}
                                      type="button"
                                      onClick={() => handleFilterChange('commitmentPreference', c.id as any)}
                                      className={`p-2.5 rounded-xl border text-center transition-all ${
                                        filters.commitmentPreference === c.id
                                          ? 'bg-fennec-dark text-white border-fennec-dark font-bold'
                                          : 'border-fennec-cream/80 text-fennec-dark bg-white hover:bg-fennec-cream/15'
                                      }`}
                                    >
                                      <span className="text-xs block font-bold">{c.label}</span>
                                      <span className="text-[9px] block opacity-70 mt-0.5">{c.desc}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Investment Horizon */}
                              <div className="space-y-1">
                                <div className="flex justify-between items-baseline">
                                  <label className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">{ui.investmentHorizonLabel}</label>
                                  <span className="text-xs font-black text-fennec-terracotta">{filters.investmentHorizon || 25} {ui.yearsUnit} ({ui.estimatedRetirementYear} {2026 + (filters.investmentHorizon || 25)})</span>
                                </div>
                                <input 
                                  type="range"
                                  min="5"
                                  max="45"
                                  step="1"
                                  value={filters.investmentHorizon || 25}
                                  onChange={(e) => handleFilterChange('investmentHorizon', Number(e.target.value))}
                                  className="w-full accent-fennec-terracotta cursor-pointer"
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 6: RISK PROFILE */}
                        {currentStep === 6 && (
                          <motion.div
                            key="p-step-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-6 text-left w-full animate-in fade-in duration-300"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-fennec-terracotta">
                                <Award className="w-5 h-5 shrink-0" />
                                <h3 className="font-display font-black text-xl md:text-2xl text-fennec-dark">
                                  {ui.step6Title}
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                {ui.step6Subtitle}
                              </p>
                            </div>

                            <div className="space-y-4">
                              {/* Risk tolerance select */}
                              <div className="space-y-1.5">
                                <span className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">{ui.temperamentLabel}</span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {[
                                    { id: 'prudent', label: ui.prudent, desc: ui.prudentDesc },
                                    { id: 'balanced', label: ui.balanced, desc: ui.balancedDesc },
                                    { id: 'dynamic', label: ui.dynamic, desc: ui.dynamicDesc },
                                    { id: 'offensive', label: ui.offensive, desc: ui.offensiveDesc },
                                  ].map((r) => (
                                    <button
                                      key={r.id}
                                      type="button"
                                      onClick={() => handleFilterChange('riskTolerance', r.id as any)}
                                      className={`p-3 rounded-xl border text-left transition-all ${
                                        filters.riskTolerance === r.id
                                          ? 'bg-fennec-terracotta text-white border-fennec-terracotta shadow-2xs font-bold'
                                          : 'border-fennec-cream text-fennec-dark bg-white hover:bg-fennec-cream/15'
                                      }`}
                                    >
                                      <span className="text-xs block font-black">{r.label}</span>
                                      <span className="text-[10px] block opacity-80 mt-0.5 leading-tight">{r.desc}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Reaction to drop */}
                              <div className="p-4 border border-fennec-cream rounded-2xl space-y-2 bg-fennec-cream/5">
                                <span className="text-xs font-bold text-fennec-dark block">{ui.marketDropTitle}</span>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                  {[
                                    { id: 'sell', label: ui.sellAll },
                                    { id: 'hold', label: ui.holdWise },
                                    { id: 'buy', label: ui.buyMore },
                                  ].map((opt) => (
                                    <button
                                      key={opt.id}
                                      type="button"
                                      onClick={() => handleFilterChange('reactionToDrop', opt.id as any)}
                                      className={`py-2 px-1 rounded-xl border text-[10px] font-black text-center transition-all ${
                                        filters.reactionToDrop === opt.id
                                          ? 'bg-fennec-dark text-white border-fennec-dark'
                                          : 'bg-white text-fennec-dark border-fennec-cream'
                                      }`}
                                    >
                                      {opt.label}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* ESG selection */}
                              <div className="p-3 border border-fennec-cream/60 rounded-xl flex justify-between items-center">
                                <div className="space-y-0.5">
                                  <span className="text-xs font-bold text-fennec-dark block">{ui.esgTitle}</span>
                                  <span className="text-[10px] text-fennec-dark/65 block">{ui.esgDesc}</span>
                                </div>
                                <div className="flex space-x-1 shrink-0">
                                  {[true, false].map((val) => (
                                    <button
                                      key={String(val)}
                                      type="button"
                                      onClick={() => handleFilterChange('prefersEsg', val)}
                                      className={`px-3 py-1 rounded-lg border text-xs font-black transition-all ${
                                        filters.prefersEsg === val
                                          ? 'bg-emerald-700 text-white border-emerald-700'
                                          : 'bg-white text-fennec-dark border-fennec-cream'
                                      }`}
                                    >
                                      {val ? ui.yesLabel : ui.noLabel}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 7: EARLY WITHDRAWAL PROJECTS */}
                        {currentStep === 7 && (
                          <motion.div
                            key="p-step-7"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-6 text-left w-full animate-in fade-in duration-300"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-fennec-terracotta">
                                <TrendingUp className="w-5 h-5 shrink-0" />
                                <h3 className="font-display font-black text-xl md:text-2xl text-fennec-dark">
                                  {ui.step7Title}
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                {ui.step7Subtitle}
                              </p>
                            </div>

                            <div className="space-y-4">
                              <div className="grid grid-cols-1 gap-2">
                                {[
                                  { id: 'residence', label: ui.residenceOption, desc: ui.residenceOptionDesc },
                                  { id: 'independent', label: ui.independentOption, desc: ui.independentOptionDesc },
                                  { id: 'abroad', label: ui.abroadOption, desc: ui.abroadOptionDesc },
                                  { id: 'none', label: ui.noneOption, desc: ui.noneOptionDesc },
                                ].map((opt) => {
                                  const isSelected = filters.earlyWithdrawalReason === opt.id;
                                  return (
                                    <button
                                      key={opt.id}
                                      type="button"
                                      onClick={() => {
                                        handleFilterChange('earlyWithdrawalReason', opt.id as any);
                                        if (opt.id === 'none') {
                                          handleFilterChange('earlyWithdrawalHorizon', 'none');
                                          setTimeout(() => nextStep(), 220);
                                        }
                                      }}
                                      className={`p-3 rounded-xl border text-left transition-all ${
                                        isSelected
                                          ? 'bg-fennec-terracotta text-white border-fennec-terracotta shadow-2xs font-bold'
                                          : 'border-fennec-cream text-fennec-dark bg-white hover:bg-fennec-cream/15'
                                      }`}
                                    >
                                      <span className="text-xs block font-black">{opt.label}</span>
                                      <span className="text-[10px] block opacity-80 mt-0.5 leading-snug">{opt.desc}</span>
                                    </button>
                                  );
                                })}
                              </div>

                              {filters.earlyWithdrawalReason !== 'none' && (
                                <motion.div 
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  className="p-4 bg-fennec-cream/25 border border-fennec-cream rounded-2xl space-y-2"
                                >
                                  <span className="text-xs font-bold text-fennec-dark block">{ui.withdrawalHorizonTitle}</span>
                                  <div className="grid grid-cols-3 gap-2">
                                    {[
                                      { id: 'short', label: ui.under5Years },
                                      { id: 'medium', label: ui.from5to10Years },
                                      { id: 'long', label: ui.over10Years },
                                    ].map((h) => (
                                      <button
                                        key={h.id}
                                        type="button"
                                        onClick={() => {
                                          handleFilterChange('earlyWithdrawalHorizon', h.id as any);
                                          setTimeout(() => nextStep(), 220);
                                        }}
                                        className={`py-2 rounded-xl border text-xs font-black text-center transition-all ${
                                          filters.earlyWithdrawalHorizon === h.id
                                            ? 'bg-fennec-dark text-white border-fennec-dark'
                                            : 'bg-white text-fennec-dark border-fennec-cream'
                                        }`}
                                      >
                                        {h.label}
                                      </button>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 8: EXISTING SITUATION */}
                        {/* STEP 8: EXISTING THIRD PILLAR */}
                        {currentStep === 8 && (
                          <motion.div
                            key="p-step-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-6 text-left w-full animate-in fade-in duration-300"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-fennec-terracotta">
                                <Shield className="w-5 h-5 shrink-0" />
                                <h3 className="font-display font-black text-xl md:text-2xl text-fennec-dark">
                                  {ui.step8Title}
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                {ui.step8Subtitle}
                              </p>
                            </div>

                            <div className="space-y-4">
                              <div className="flex justify-between items-center p-4 border border-fennec-cream/60 rounded-2xl bg-fennec-cream/5">
                                <div className="space-y-0.5">
                                  <span className="text-sm font-bold text-fennec-dark block">{ui.hasPillarQuestion}</span>
                                  <span className="text-xs text-fennec-dark/60 block">{ui.hasPillarDesc}</span>
                                </div>
                                <div className="flex space-x-1 shrink-0">
                                  {[true, false].map((val) => (
                                    <button
                                      key={String(val)}
                                      type="button"
                                      onClick={() => handleFilterChange('hasExistingThirdPillar', val)}
                                      className={`px-3 py-1.5 rounded-lg border text-xs font-black transition-all ${
                                        filters.hasExistingThirdPillar === val
                                          ? 'bg-fennec-terracotta text-white border-fennec-terracotta'
                                          : 'bg-white text-fennec-dark border-fennec-cream'
                                      }`}
                                    >
                                      {val ? ui.yes : ui.no}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {filters.hasExistingThirdPillar && (
                                <motion.div 
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  className="p-4 border border-fennec-cream/60 rounded-2xl space-y-3 bg-white"
                                >
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-black uppercase text-fennec-brown block">{ui.insurerNameLabel}</label>
                                      <input 
                                        type="text"
                                        placeholder="Ex: Swiss Life, AXA, etc."
                                        value={filters.existingInsurer || ''}
                                        onChange={(e) => handleFilterChange('existingInsurer', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-fennec-cream text-sm focus:outline-none focus:border-fennec-terracotta font-medium"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-black uppercase text-fennec-brown block">{ui.accumulatedAmountLabel}</label>
                                      <input 
                                        type="number"
                                        min="0"
                                        placeholder="Ex: 15'000"
                                        value={filters.existingAmount || ''}
                                        onChange={(e) => {
                                          const val = Number(e.target.value);
                                          handleFilterChange('existingAmount', val < 0 ? 0 : val);
                                        }}
                                        className="w-full px-3 py-2 rounded-lg border border-fennec-cream text-sm font-mono font-bold focus:outline-none focus:border-fennec-terracotta"
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-1.5 pt-2 border-t border-fennec-cream/40">
                                    <span className="text-xs font-bold text-fennec-dark block">{ui.stepGoalTitle}</span>
                                    <div className="grid grid-cols-2 gap-2">
                                      {[
                                        { id: 'new', label: ui.newContract },
                                        { id: 'transfer', label: ui.transferContract },
                                      ].map((opt) => (
                                        <button
                                          key={opt.id}
                                          type="button"
                                          onClick={() => handleFilterChange('transferType', opt.id as any)}
                                          className={`p-2 rounded-xl border text-xs font-bold text-center transition-all ${
                                            filters.transferType === opt.id
                                              ? 'bg-fennec-dark text-white border-fennec-dark'
                                              : 'bg-white text-fennec-dark border-fennec-cream'
                                          }`}
                                        >
                                          {opt.label}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 9: COMPARISON PRIORITIES */}
                        {currentStep === 9 && (
                          <motion.div
                            key="p-step-9"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-6 text-left w-full animate-in fade-in duration-300"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-fennec-terracotta">
                                <Award className="w-5 h-5 shrink-0" />
                                <h3 className="font-display font-black text-xl md:text-2xl text-fennec-dark">
                                  {ui.step9Title}
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                {ui.step9Subtitle}
                              </p>
                            </div>

                            <div className="space-y-3">
                              {[
                                { id: 'yield', label: ui.yieldPriority, desc: ui.yieldPriorityDesc },
                                { id: 'fees', label: ui.feesPriority, desc: ui.feesPriorityDesc },
                                { id: 'flexibility', label: ui.flexibilityPriority, desc: ui.flexibilityPriorityDesc },
                                { id: 'security', label: ui.securityPriority, desc: ui.securityPriorityDesc },
                                { id: 'coverage', label: ui.coveragePriority, desc: ui.coveragePriorityDesc },
                              ].map((item) => {
                                const isRank1 = filters.priorityRank1 === item.id;
                                const isRank2 = filters.priorityRank2 === item.id;
                                
                                let badgeText = "";
                                let badgeStyle = "";
                                if (isRank1) {
                                  badgeText = ui.priority1;
                                  badgeStyle = "bg-fennec-terracotta text-white";
                                } else if (isRank2) {
                                  badgeText = ui.priority2;
                                  badgeStyle = "bg-fennec-dark text-white";
                                }

                                return (
                                  <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => {
                                      if (isRank1) {
                                        // deselect rank 1
                                        handleFilterChange('priorityRank1', undefined as any);
                                      } else if (isRank2) {
                                        // deselect rank 2
                                        handleFilterChange('priorityRank2', undefined as any);
                                      } else {
                                        // select rank 1 first if free, else rank 2
                                        if (!filters.priorityRank1) {
                                          handleFilterChange('priorityRank1', item.id as any);
                                        } else {
                                          handleFilterChange('priorityRank2', item.id as any);
                                        }
                                      }
                                    }}
                                    className={`w-full p-3.5 rounded-2xl border text-left flex items-start justify-between transition-all ${
                                      isRank1 || isRank2
                                        ? 'border-fennec-terracotta/50 bg-fennec-cream/20 shadow-3xs'
                                        : 'border-fennec-cream/80 bg-white hover:bg-fennec-cream/15'
                                    }`}
                                  >
                                    <div className="space-y-0.5 flex-1 pr-4">
                                      <span className="font-display font-black text-sm text-fennec-dark block">{item.label}</span>
                                      <span className="text-xs text-fennec-dark/65 block leading-relaxed">{item.desc}</span>
                                    </div>
                                    
                                    {badgeText ? (
                                      <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full shrink-0 ${badgeStyle}`}>
                                        {badgeText}
                                      </span>
                                    ) : (
                                      <span className="text-[9px] font-bold text-fennec-brown/40 border border-fennec-cream px-2 py-1 rounded-full shrink-0">
                                        {ui.selectBtn}
                                      </span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 10: SMS & Email Verification */}
                        {currentStep === 10 && (
                          <motion.div
                            key="p-step-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-6 text-left w-full animate-in fade-in duration-300"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-fennec-red">
                                <Shield className="w-5 h-5 shrink-0" />
                                <h3 className="font-display font-black text-xl md:text-2xl text-fennec-dark">
                                  Vérification de sécurité
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                Avant d'accéder au comparatif des rendements du 3e Pilier et d'optimisation fiscale, veuillez valider vos coordonnées. Un code de sécurité unique vous sera envoyé gratuitement.
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
                                      
                                      // Log lead as pre-verify
                                      fetch('/api/submit-lead', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ type: 'life_pre_verify', lead: formData, filters })
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
                                          code: verificationCodeInput
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
                                        body: JSON.stringify({ type: 'life_verified', lead: formData, filters })
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

                      {currentStep < 10 && (
                        <button
                          type="button"
                          onClick={nextStep}
                          className="flex items-center text-xs font-bold font-display px-6 py-2.5 rounded-full bg-fennec-dark hover:bg-fennec-terracotta text-white transition-all shadow-sm"
                        >
                          <span>{currentStep === 9 ? ui.verificationStepBtn : ui.continueBtn}</span>
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
            key="results-pension"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            
            {/* LEFT FILTER & PROFILE CONTROLLER */}
            <div 
              id="life-filter-adjustment-panel"
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
                  {ui.restartBtn}
                </button>
              </div>

              {/* Quick Profile Summary Pills */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2.5 bg-fennec-cream/10 rounded-xl">
                  <span className="text-fennec-brown font-medium">{ui.pensionTypeLabel}</span>
                  <span className="font-bold text-fennec-dark capitalize">
                    {filters.type === '3a' ? ui.pillar3aLinked : filters.type === '3b' ? ui.pillar3bFree : ui.mixedShort}
                  </span>
                </div>
                <div className="flex justify-between p-2.5 bg-fennec-cream/10 rounded-xl">
                  <span className="text-fennec-brown font-medium">{ui.monthlyPaymentLabel}</span>
                  <span className="font-bold text-fennec-dark">CHF {monthlyAmount}.- {ui.perMonth}</span>
                </div>
                <div className="flex justify-between p-2.5 bg-fennec-cream/10 rounded-xl">
                  <span className="text-fennec-brown font-medium">{ui.contractDurationLabel}</span>
                  <span className="font-bold text-fennec-dark">{duration} {ui.yearsUnit}</span>
                </div>
                <div className="flex justify-between p-2.5 bg-fennec-cream/10 rounded-xl">
                  <span className="text-fennec-brown font-medium">{ui.yourProfileLabel}</span>
                  <span className="font-bold text-fennec-dark capitalize">
                    {filters.profile === 'young' ? ui.profileYoung : filters.profile === 'family' ? ui.profileFamily : filters.profile === 'senior' ? ui.profileSenior : ui.profileIndependent}
                  </span>
                </div>
                <div className="flex justify-between p-2.5 bg-fennec-cream/10 rounded-xl">
                  <span className="text-fennec-brown font-medium">{ui.majorPriorityLabel}</span>
                  <span className="font-bold text-fennec-dark">
                    {filters.priority === 'tax-saving' ? ui.priorityTaxSaving : filters.priority === 'high-yield' ? ui.priorityHighYield : ui.priorityGuaranteed}
                  </span>
                </div>
              </div>

              {/* Toggle to fine-tune filters directly */}
              <div className="border-t border-fennec-cream/30 pt-4">
                <button
                  onClick={() => setShowFiltersInline(!showFiltersInline)}
                  className="w-full text-xs font-bold text-fennec-brown/80 hover:text-fennec-dark flex items-center justify-center p-2 rounded-xl border border-fennec-cream/50 bg-fennec-cream/5 transition-all"
                >
                  <span>{showFiltersInline ? ui.hideAdjustments2 : ui.adjustSlidersDirectly}</span>
                </button>
              </div>

              {/* Inline filters */}
              {showFiltersInline && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="space-y-4 pt-2 border-t border-fennec-cream/20 overflow-hidden text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex justify-between font-bold">
                      <span>{ui.monthlyPaymentShort}</span>
                      <span className="text-fennec-terracotta">CHF {monthlyAmount}.-</span>
                    </div>
                    <input 
                      type="range"
                      min="50"
                      max="1000"
                      step="50"
                      value={monthlyAmount}
                      onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                      className="w-full accent-fennec-terracotta"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between font-bold">
                      <span>{ui.contractDurationShort}</span>
                      <span className="text-fennec-terracotta">{duration} {ui.yearsUnit}</span>
                    </div>
                    <input 
                      type="range"
                      min="5"
                      max="45"
                      step="1"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full accent-fennec-terracotta"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold block uppercase tracking-wider text-[10px] text-fennec-brown">{ui.priorityFieldLabel}</label>
                    <select
                      value={filters.priority}
                      onChange={(e) => handleFilterChange('priority', e.target.value as any)}
                      className="w-full bg-white border border-fennec-cream/60 rounded-xl px-2 py-1.5 text-xs text-fennec-dark"
                    >
                      <option value="tax-saving">{ui.priorityTaxSaving}</option>
                      <option value="high-yield">{ui.priorityHighYield}</option>
                      <option value="guaranteed">{ui.priorityGuaranteed}</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {/* Legal info panel */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 text-[11px] text-amber-900 leading-relaxed">
                <span className="font-bold flex items-center mb-1">
                  <Percent className="w-3.5 h-3.5 mr-1" /> Limites Légales 3a :
                </span>
                <p>{ui.salariedCapLabel} <strong>CHF 7'258.- {ui.perYear}</strong></p>
                <p>{ui.independentCapLabel} <strong>CHF 36'288.- {ui.perYear}</strong></p>
              </div>

            </div>

            {/* RIGHT COLUMN: COMPARATIVE LIST & PROJECTIONS */}
            <div className="lg:col-span-8 space-y-6 order-1 lg:order-2">
              
              {/* Mobile Quick Filter Header */}
              <div className="lg:hidden bg-white border border-fennec-cream rounded-2xl p-4 flex items-center justify-between shadow-xs mb-4">
                <div className="space-y-0.5 text-left">
                  <span className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">{ui.yourSimulationLabel}</span>
                  <p className="text-xs font-bold text-fennec-dark">
                    {ui.pensionWordShort} {filters.type === '3a' ? '3a' : filters.type === '3b' ? '3b' : ui.mixedShort} • CHF {monthlyAmount}.-{ui.perMonth} • {duration} {ui.yearsUnit}
                  </p>
                </div>
                <button
                  onClick={() => {
                    const target = document.getElementById('life-filter-adjustment-panel');
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
              
              {/* Mandatory 3a Warning Banner (Anti-Hallucination & Legal Requirement) */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start space-x-3 text-xs text-amber-900 shadow-3xs">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-amber-950 uppercase tracking-wider text-[11px] mb-0.5">
                    Avertissement Officiel 3e Pilier :
                  </span>
                  <p className="leading-relaxed">
                    Les conditions du 3e pilier sont mises à jour manuellement et peuvent avoir changé — vérifiez toujours auprès du fournisseur.
                  </p>
                </div>
              </div>

              {/* Projections Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Tax Savings card */}
                <div className="bg-fennec-cream/20 border border-fennec-cream p-5 rounded-2xl flex items-start space-x-4">
                  <div className="p-3 bg-white text-fennec-terracotta rounded-xl shadow-xs shrink-0">
                    <PiggyBank className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-fennec-brown uppercase block">
                      {ui.estimatedTaxSavingsCardLabel}
                    </span>
                    <span className="text-2xl font-display font-black text-fennec-dark block">
                      CHF {(simulatedResults[0]?.taxSavingsPerYear || 0).toLocaleString()}.- <span className="text-xs font-semibold text-emerald-600">/ an</span>
                    </span>
                    <p className="text-[11px] text-fennec-dark/70 mt-1">
                      {ui.totalTaxReductionPrefix} <strong>CHF {totalTaxSavingsOverTerm.toLocaleString()}.-</strong> {ui.totalTaxReductionSuffix}
                    </p>
                  </div>
                </div>

                {/* Feny suggestion */}
                <div className="bg-rose-50/50 border border-rose-100 p-5 rounded-2xl flex items-start space-x-4">
                  <div className="p-3 bg-white text-fennec-red rounded-xl shadow-xs shrink-0">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-fennec-brown uppercase block">
                      {ui.recommendationLabel}
                    </span>
                    <span className="text-sm font-display font-bold text-fennec-dark block mt-0.5">
                      {filters.priority === 'high-yield' 
                        ? ui.recoMixed 
                        : filters.priority === 'guaranteed' 
                        ? ui.recoGuaranteed 
                        : ui.recoTaxSaving}
                    </span>
                    <p className="text-[11px] text-fennec-dark/70 mt-1">
                      Les cotisations de 3a sont immunisées contre l'impôt sur la fortune durant la phase d'épargne.
                    </p>
                  </div>
                </div>

              </div>

              {/* Filter/Sorting Tab Bar */}
              <div className="space-y-2.5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-1 gap-2">
                  <span className="text-[11px] font-bold uppercase text-fennec-brown tracking-wider block">
                    {ui.filterSortLabel}
                  </span>
                  <span className="text-[10px] text-fennec-dark/60 block font-bold bg-fennec-cream/20 border border-fennec-cream px-2 py-0.5 rounded-md">
                    {simulatedResults.length} {ui.insurersAvailableLabel}
                  </span>
                </div>
                
                <div className="bg-white rounded-2xl border border-fennec-cream/40 p-1.5 shadow-3xs flex flex-wrap gap-1">
                  <button
                    onClick={() => setOffersTab('all')}
                    className={`flex-1 min-w-[125px] text-center py-2.5 px-3.5 rounded-xl font-display font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 ${
                      offersTab === 'all'
                        ? 'bg-fennec-dark text-white shadow-xs'
                        : 'text-fennec-dark/70 hover:bg-fennec-cream/20'
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>{ui.allInsurersTab}</span>
                  </button>
                  
                  <button
                    onClick={() => setOffersTab('yield')}
                    className={`flex-1 min-w-[125px] text-center py-2.5 px-3.5 rounded-xl font-display font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 ${
                      offersTab === 'yield'
                        ? 'bg-fennec-dark text-white shadow-xs'
                        : 'text-fennec-dark/70 hover:bg-fennec-cream/20'
                    }`}
                  >
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{ui.maxYieldTab}</span>
                  </button>
                  
                  <button
                    onClick={() => setOffersTab('guaranteed')}
                    className={`flex-1 min-w-[125px] text-center py-2.5 px-3.5 rounded-xl font-display font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 ${
                      offersTab === 'guaranteed'
                        ? 'bg-fennec-dark text-white shadow-xs'
                        : 'text-fennec-dark/70 hover:bg-fennec-cream/20'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5 text-blue-500" />
                    <span>{ui.securityCapitalTab}</span>
                  </button>
                </div>
              </div>

              {/* Results list */}
              <div ref={resultsContainerRef} className="space-y-4">
                {simulatedResults.map((company, index) => {
                  const isExpanded = expandedCompany === company.id;
                  
                  // Compute the top badge for this specific card
                  let badgeContent = null;
                  if (offersTab === 'guaranteed' && index === 0) {
                    badgeContent = (
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold rounded-md flex items-center gap-1 shadow-3xs">
                        <Shield className="w-3 h-3 text-blue-600" />
                        {ui.highestGuaranteedBadge}
                      </span>
                    );
                  }

                  return (
                    <div 
                      key={company.id}
                      className={`pension-result-card bg-white rounded-3xl border transition-all relative overflow-hidden flex flex-col ${
                        index === 0 && offersTab !== 'all'
                          ? 'border-fennec-terracotta/60 shadow-md ring-1 ring-fennec-terracotta/10'
                          : 'border-fennec-cream/40 shadow-xs hover:shadow-md'
                      }`}
                    >
                      {index === 0 && offersTab !== 'all' && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-fennec-terracotta to-amber-500" />
                      )}
                      
                      {/* Top Row: Flex block for main info */}
                      <div className="p-6 flex flex-col lg:flex-row justify-between items-center gap-6">
                        {/* Left: Logo and description */}
                        <div className="flex items-center space-x-4 w-full lg:w-auto shrink-0">
                          {/* Real company logo */}
                          <CompanyLogo id={company.id} className="w-14 h-14 shrink-0 bg-[#FAF8F5] p-1 rounded-2xl border border-fennec-cream/20" />
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="font-display font-bold text-lg text-fennec-dark">
                                {company.name}
                              </h4>
                              {badgeContent}
                            </div>
                            
                            {/* Pros Bulletpoints */}
                            <div className="space-y-0.5 mt-1.5">
                              {company.pros.slice(0, 2).map((pro, idx) => (
                                <div key={idx} className="flex items-center text-xs text-fennec-dark/70">
                                  <Check className="w-3.5 h-3.5 mr-1 text-emerald-600 shrink-0" />
                                  <span>{pro}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Middle: Projections metrics (Responsive Grid) */}
                        <div className="text-center lg:text-right w-full lg:w-auto border-y lg:border-y-0 lg:border-x border-fennec-cream/20 py-4 lg:py-0 lg:px-6">
                          <div>
                            <span className="text-[10px] font-bold text-fennec-brown uppercase block tracking-wider">
                              {ui.yourProjectionLabel}
                            </span>
                            <span className="text-base sm:text-lg font-display font-extrabold text-fennec-dark block">
                              CHF {company.guaranteedSum.toLocaleString()}.-
                            </span>
                          </div>
                        </div>

                        {/* Right: CTA & Expand toggles */}
                        <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5 items-stretch justify-center">
                          <button
                            onClick={() => setExpandedCompany(isExpanded ? null : company.id)}
                            className="px-4 py-2 border border-fennec-cream text-fennec-dark hover:bg-fennec-cream/20 font-display font-bold text-[10px] uppercase tracking-wider rounded-full transition-all inline-flex items-center justify-center min-h-[40px] whitespace-nowrap"
                          >
                            <SlidersHorizontal className="w-3.5 h-3.5 mr-1" />
                            <span>{isExpanded ? ui.hideDetailsBtn : ui.techSheetBtn}</span>
                          </button>
                        </div>
                      </div>

                      {/* Collapsible details pane */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="border-t border-fennec-cream/40 bg-fennec-cream/5 overflow-hidden"
                          >
                            <div className="p-6 space-y-5">
                              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-fennec-cream/20 pb-3 gap-2">
                                <h5 className="text-[11px] font-black text-fennec-dark uppercase tracking-wider flex items-center">
                                  <SlidersHorizontal className="w-4 h-4 mr-1.5 text-fennec-terracotta" />
                                  {ui.officialRegulationTitle}
                                </h5>
                                <span className="text-[9px] font-mono text-fennec-brown bg-white border border-fennec-cream/60 px-2 py-0.5 rounded font-black">
                                  {ui.certifiedBadge}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* Column 1: Épargne & Limites */}
                                <div className="bg-white rounded-2xl p-4 border border-fennec-cream/25 space-y-2.5">
                                  <span className="text-[10px] font-bold text-fennec-brown uppercase block tracking-wider">{ui.savingsLimitsLabel}</span>
                                  <div className="space-y-1.5 text-xs">
                                    <div className="flex justify-between">
                                      <span className="text-fennec-dark/65">{ui.desiredAnnualPaymentLabel}</span>
                                      <span className="font-bold text-fennec-dark">CHF {(monthlyAmount * 12).toLocaleString()}.-</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-fennec-dark/65">{ui.legalSwissLimitLabel}</span>
                                      <span className="font-bold text-fennec-dark">CHF {company.taxDetails?.legalLimit.toLocaleString()}.-</span>
                                    </div>
                                    <div className="flex justify-between pt-1 border-t border-fennec-cream/10">
                                      <span className="text-fennec-dark font-semibold">{ui.eligibleAmountLabel}</span>
                                      <span className="font-black text-fennec-terracotta">CHF {company.taxDetails?.allowedContribution.toLocaleString()}.-</span>
                                    </div>
                                    {company.taxDetails?.isCapped && (
                                      <p className="text-[9px] text-amber-700 bg-amber-50 p-2 rounded border border-amber-100 font-bold mt-1 leading-normal">
                                        {ui.exceedsCapPrefix}{filters.hasSecondPillar ? ui.capStatusSalaried : ui.capStatusIndependent}{ui.exceedsCapSuffix}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                {/* Column 2: Frais & Primes */}
                                <div className="bg-white rounded-2xl p-4 border border-fennec-cream/25 space-y-2.5">
                                  <span className="text-[10px] font-bold text-fennec-brown uppercase block tracking-wider">{ui.feesAndRiskPremiumsLabel}</span>
                                  <div className="space-y-1.5 text-xs">
                                    <div className="flex justify-between">
                                      <span className="text-fennec-dark/65">{ui.netAdminFeesLabel}</span>
                                      <span className="font-bold text-fennec-dark">{company.adminFeesPercent.toFixed(2)}% / an</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-fennec-dark/65">{ui.cumulativeAdminFeesLabel}</span>
                                      <span className="font-bold text-fennec-dark">CHF {company.totalAdminFees.toLocaleString()}.-</span>
                                    </div>
                                    <div className="flex justify-between pt-1 border-t border-fennec-cream/10">
                                      <span className="text-fennec-dark/65">{ui.monthlyRiskPremiumsLabel}</span>
                                      <span className="font-bold text-rose-700">CHF {company.riskPremiumMonthly.toFixed(2)}.-</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-fennec-dark font-semibold">{ui.netSavingsPortionLabel}</span>
                                      <span className="font-black text-emerald-600">CHF {company.netSavingsMonthly.toFixed(2)}.- / mois</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Column 3: Impôts & Retrait */}
                                <div className="bg-white rounded-2xl p-4 border border-fennec-cream/25 space-y-2.5">
                                  <span className="text-[10px] font-bold text-fennec-brown uppercase block tracking-wider">{ui.taxOptimizationLabel}</span>
                                  <div className="space-y-1.5 text-xs">
                                    <div className="flex justify-between">
                                      <span className="text-fennec-dark/65">{ui.combinedMarginalRateLabel} ({filters.canton}):</span>
                                      <span className="font-bold text-fennec-dark">{(company.taxDetails?.marginalTaxRate * 100).toFixed(2)}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-fennec-dark/65">Économie d'impôt par an:</span>
                                      <span className="font-black text-emerald-600">CHF {company.taxDetails?.yearlyTaxSavings.toLocaleString()}.-</span>
                                    </div>
                                    <div className="flex justify-between pt-1 border-t border-fennec-cream/10">
                                      <span className="text-fennec-dark/65">{ui.withdrawalTaxRateLabel}</span>
                                      <span className="font-bold text-amber-700">{(company.taxDetails?.withdrawalTaxRate * 100).toFixed(2)}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-fennec-dark/65">{ui.taxPaidAtWithdrawalLabel}</span>
                                      <span className="font-bold text-red-700">CHF {company.taxDetails?.withdrawalTaxAmount.toLocaleString()}.-</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Bottom Summary Callout */}
                              <div className="bg-[#1E1916] text-white rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="space-y-1 text-left">
                                  <span className="text-[9px] font-black uppercase text-fennec-cream/60 tracking-widest block">{ui.actuarialSolvencyNoteLabel}</span>
                                  <p className="text-xs text-white/80 leading-relaxed max-w-xl">
                                    {ui.solvencyNotePrefix} <strong>{(company.yieldRateUsed * 100).toFixed(2)}%</strong> {ui.solvencyNoteMiddle} <strong>CHF {company.taxDetails?.totalTaxSavingsOverHorizon.toLocaleString()}.-</strong> {ui.solvencyNoteSuffix}
                                  </p>
                                </div>
                                <div className="text-left md:text-right shrink-0">
                                  <span className="text-[10px] font-bold text-emerald-400 uppercase block tracking-wider">{ui.netRealCapitalPaidLabel}</span>
                                  <span className="text-xl font-display font-black text-emerald-300 block">
                                    CHF {company.taxDetails?.projectedCapitalNet.toLocaleString()}.-
                                  </span>
                                  <span className="text-[9px] text-[#C1B29F] block">{ui.afterTaxDeductionNote}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Compliance footers for Pillar 3a */}
              <div className="bg-fennec-cream/15 rounded-3xl p-6 border border-fennec-cream/30 space-y-3 text-xs text-fennec-dark/75 leading-relaxed">
                <h5 className="font-display font-bold text-sm text-fennec-dark uppercase tracking-wide flex items-center">
                  <Shield className="w-4.5 h-4.5 mr-2 text-fennec-tan" />
                  {ui.complianceRegElementsTitle}
                </h5>
                <p>
                  Le pilier 3a (prévoyance liée) est réservé aux personnes ayant un revenu soumis à l'AVS en Suisse. Les cotisations sont déductibles de votre revenu imposable à hauteur des plafonds fédéraux annuels. Les retraits de capital accumulé lors de la retraite font l'objet d'un impôt à taux réduit, séparé des autres revenus.
                </p>
                <p>
                  Le pilier 3b (prévoyance libre) ne fait l'objet d'aucun plafond légal de versement mais ses déductions fiscales sont soumises à d'autres barèmes cantonaux (par exemple, limites pour les assurances-vie de risque pur dans certains cantons romands).
                </p>
              </div>

              {/* Disclaimer */}
              <div className="bg-fennec-cream/10 rounded-2xl p-4 border border-fennec-cream/20 text-center text-[11px] text-fennec-dark/60">
                ⚠️ Il s’agit d’une simulation avec des montants approximatifs. Ce comparateur ne saurait engager Le Fennec Malin ou les compagnies d’assurances mentionnées.
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {selectedAssureur && (
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
                  {ui.studyOfferedLabel}
                </span>
                <h4 className="font-display font-extrabold text-xl text-fennec-dark">
                  {ui.yourStudyLabel} {selectedAssureur.name}
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
                  <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 leading-normal">
                    <strong>{ui.summaryProjectionLabel}</strong><br />
                    {ui.monthlySavingsPrefix} <strong>CHF {monthlyAmount}.-</strong> {ui.monthlySavingsMiddle1} <strong>{duration} {ui.yearsUnit}</strong>. {ui.monthlySavingsMiddle2} <strong>CHF {selectedAssureur.expectedSum.toLocaleString()}.-</strong> {ui.monthlySavingsMiddle3} {selectedAssureur.name}. {ui.monthlySavingsMiddle4} <strong>CHF {((selectedAssureur.taxSavingsPerYear || 0) * duration).toLocaleString()}.-</strong> {ui.monthlySavingsSuffix}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="modal-stagger-item space-y-1.5">
                      <label className="text-xs font-bold text-fennec-dark block">{ui.firstNameLabel}</label>
                      <input 
                        type="text" 
                        required
                        placeholder={ui.firstNamePlaceholder}
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({...prev, firstName: e.target.value}))}
                        onMouseEnter={() => setFenyAdvice(LIFE_ADVICE_MAP.firstName)}
                        onMouseLeave={() => setFenyAdvice(null)}
                        onFocus={() => setFenyAdvice(LIFE_ADVICE_MAP.firstName)}
                        onBlur={() => setFenyAdvice(null)}
                        className="w-full bg-fennec-cream/5 border border-fennec-cream/70 rounded-xl px-3 py-2 text-base md:text-sm text-fennec-dark focus:outline-none focus:border-fennec-tan font-medium"
                      />
                    </div>
                    <div className="modal-stagger-item space-y-1.5">
                      <label className="text-xs font-bold text-fennec-dark block">{ui.lastNameLabel}</label>
                      <input 
                        type="text" 
                        required
                        placeholder={ui.lastNamePlaceholder}
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({...prev, lastName: e.target.value}))}
                        onMouseEnter={() => setFenyAdvice(LIFE_ADVICE_MAP.lastName)}
                        onMouseLeave={() => setFenyAdvice(null)}
                        onFocus={() => setFenyAdvice(LIFE_ADVICE_MAP.lastName)}
                        onBlur={() => setFenyAdvice(null)}
                        className="w-full bg-fennec-cream/5 border border-fennec-cream/70 rounded-xl px-3 py-2 text-base md:text-sm text-fennec-dark focus:outline-none focus:border-fennec-tan font-medium"
                      />
                    </div>
                  </div>

                  <div className="modal-stagger-item space-y-1.5">
                    <label className="text-xs font-bold text-fennec-dark block">{ui.emailLabel}</label>
                    <input 
                      type="email" 
                      required
                      placeholder="sophie.rochat@bluewin.ch"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                      onMouseEnter={() => setFenyAdvice(LIFE_ADVICE_MAP.email)}
                      onMouseLeave={() => setFenyAdvice(null)}
                      onFocus={() => setFenyAdvice(LIFE_ADVICE_MAP.email)}
                      onBlur={() => setFenyAdvice(null)}
                      className="w-full bg-fennec-cream/5 border border-fennec-cream/70 rounded-xl px-3 py-2 text-base md:text-sm text-fennec-dark focus:outline-none focus:border-fennec-tan font-medium"
                    />
                  </div>

                  <div className="modal-stagger-item space-y-1.5">
                    <label className="text-xs font-bold text-fennec-dark block">{ui.phoneLabel}</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="078 987 65 43"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                      onMouseEnter={() => setFenyAdvice(LIFE_ADVICE_MAP.phone)}
                      onMouseLeave={() => setFenyAdvice(null)}
                      onFocus={() => setFenyAdvice(LIFE_ADVICE_MAP.phone)}
                      onBlur={() => setFenyAdvice(null)}
                      className="w-full bg-fennec-cream/5 border border-fennec-cream/70 rounded-xl px-3 py-2 text-base md:text-sm text-fennec-dark focus:outline-none focus:border-fennec-tan font-medium"
                    />
                  </div>

                  <div className="modal-stagger-item space-y-1.5">
                    <label className="text-xs font-bold text-fennec-dark block">{ui.activityStatusLabel}</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({...prev, profession: 'salaried'}))}
                        className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                          formData.profession === 'salaried'
                            ? 'bg-fennec-tan text-white border-fennec-tan shadow-2xs'
                            : 'bg-white text-fennec-dark border-fennec-cream/60 hover:bg-fennec-cream/10'
                        }`}
                      >
                        {ui.salariedWithLpp}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({...prev, profession: 'independent'}))}
                        className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                          formData.profession === 'independent'
                            ? 'bg-fennec-tan text-white border-fennec-tan shadow-2xs'
                            : 'bg-white text-fennec-dark border-fennec-cream/60 hover:bg-fennec-cream/10'
                        }`}
                      >
                        {ui.independentWithoutLpp}
                      </button>
                    </div>
                  </div>

                  {formError && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs font-bold rounded-xl border border-red-200">
                      Veuillez remplir tous les champs obligatoires.
                    </div>
                  )}

                  <div className="modal-stagger-item pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-fennec-terracotta hover:bg-fennec-dark text-white font-display font-extrabold text-sm rounded-full shadow-md shadow-fennec-terracotta/20 transition-all flex items-center justify-center space-x-2"
                    >
                      <Calculator className="w-4 h-4" />
                      <span>{ui.submitBtnLabel}</span>
                    </button>
                    <span className="text-[10px] text-fennec-dark/50 text-center block mt-2">
                      🔒 Vos données sont confidentielles. Conformité nLPD stricte. Aucun engagement.
                    </span>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="inline-flex p-3 bg-emerald-100 text-emerald-600 rounded-full border border-emerald-200">
                    <FileCheck className="w-10 h-10" />
                  </div>
                  <h5 className="font-display font-extrabold text-xl text-emerald-900">
                    {ui.simulationSavedTitle}
                  </h5>
                  <p className="text-sm text-fennec-dark/80 max-w-sm mx-auto">
                    {ui.thankYouPrefix} <strong>{formData.firstName}</strong>{ui.thankYouMiddle} <strong>{selectedAssureur.name}</strong> {ui.thankYouSuffix}
                  </p>
                  <p className="text-xs text-fennec-dark/70 leading-relaxed bg-fennec-cream/10 p-4 rounded-xl border border-fennec-cream/30">
                    {ui.followUpPrefix} <strong>{formData.profession === 'salaried' ? ui.professionShortSalaried : ui.professionShortIndependent}</strong>{ui.followUpMiddle} <strong>{formData.phone}</strong> {ui.followUpSuffix}
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={handleCloseForm}
                      className="px-6 py-2 bg-fennec-dark hover:bg-fennec-terracotta text-white font-display font-bold text-xs rounded-full transition-colors"
                    >
                      {ui.closeWindowBtn}
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
