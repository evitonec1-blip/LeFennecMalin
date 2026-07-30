/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ASSUREURS_VIE, getLifeInsuranceEstimate } from '../data';
import { LifeFilterState, AssureurVie } from '../types';
import { calculateSwiss3rdPillarSimulation } from '../utils/swissTax';
import fenyWinking from '../assets/images/feny_winking_1783331270164.jpg';
import fenyThinking from '../assets/images/feny_thinking_1783331247759.jpg';
import fenyAvatar from '../assets/images/feny_avatar_1783331224698.jpg';
import fenySavings from '../assets/images/feny_savings_1783249344310.jpg';
import fenyCompare from '../assets/images/feny_compare_1783249332783.jpg';
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

const LIFE_ADVICE_MAP: Record<string, string> = {
  type: "Le Pilier 3a (Lié) offre d'excellentes déductions d'impôts directes mais reste bloqué. Le Pilier 3b (Libre) est totalement flexible pour des retraits libres à tout moment.",
  personal: "Vos informations de naissance, canton et revenus déterminent directement le gain fiscal potentiel de votre 3ème pilier.",
  product: "Choisissez entre un compte d'épargne bancaire classique ou des fonds en titres (actions/ETF) pour booster votre rendement historique.",
  coverage: "Une assurance-vie combinée peut protéger vos proches en cas de décès et exonérer vos primes d'épargne si vous êtes invalide.",
  savings: "Indiquez votre capacité d'épargne. Chaque franc épargné réduit votre revenu imposable (jusqu'à CHF 7'258/an pour salarié LPP).",
  risk: "Votre profil de risque détermine la part boursière investie. Sur le long terme, les fonds en actions surperforment largement.",
  withdrawal: "Un projet de logement principal, de travail indépendant ou de départ de Suisse permet un retrait anticipé du Pilier 3a.",
  existing: "Si vous possédez déjà un 3ème pilier, analyser ses performances et ses frais actuels permet souvent d'envisager un transfert avantageux.",
  priority: "Définissez ce qui compte le plus : réduire vos coûts, booster le rendement, garder de la flexibilité ou garantir la sécurité.",
  firstName: "Votre prénom est nécessaire pour personnaliser votre dossier gratuit et votre projection fiscale.",
  lastName: "Votre nom de famille est requis par les compagnies d'assurance suisses pour générer une simulation officielle et nominative.",
  email: "Votre adresse e-mail nous permet de vous transmettre instantanément votre comparatif de rendement et gain fiscal en PDF.",
  phone: "Votre mobile suisse valide permet à notre conseiller d'ajuster la simulation avec vos données communales réelles.",
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

interface LifePensionComparatorProps {
  isEmbedded?: boolean;
  onStartQuiz?: () => void;
}

export default function LifePensionComparator({ isEmbedded = false, onStartQuiz }: LifePensionComparatorProps) {
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
    const percentage = quizMode ? (currentStep / 10) * 100 : 100;
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
      if (currentStep === 1) setFenyAdvice(LIFE_ADVICE_MAP.type);
      else if (currentStep === 2) setFenyAdvice(LIFE_ADVICE_MAP.personal);
      else if (currentStep === 3) setFenyAdvice(LIFE_ADVICE_MAP.product);
      else if (currentStep === 4) setFenyAdvice(LIFE_ADVICE_MAP.coverage);
      else if (currentStep === 5) setFenyAdvice(LIFE_ADVICE_MAP.savings);
      else if (currentStep === 6) setFenyAdvice(LIFE_ADVICE_MAP.risk);
      else if (currentStep === 7) setFenyAdvice(LIFE_ADVICE_MAP.withdrawal);
      else if (currentStep === 8) setFenyAdvice(LIFE_ADVICE_MAP.existing);
      else if (currentStep === 9) setFenyAdvice(LIFE_ADVICE_MAP.priority);
    } else {
      setFenyAdvice(null);
    }
  }, [currentStep, quizMode]);

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
          />
        </div>
        
        <div className="space-y-2 max-w-xl mx-auto">
          <h3 className="font-display font-extrabold text-2xl text-fennec-dark">
            Simulez votre gain fiscal du 3ème Pilier avec Fenny
          </h3>
          <p className="text-sm text-fennec-dark/70 leading-relaxed">
            Épargnez pour votre retraite tout en réduisant vos impôts suisses dès cette année. Comparez instantanément les offres de Pilier 3a / 3b des plus grands assureurs du pays (AXA, Zurich, Swiss Life, Helvetia, Allianz, etc.) et projetez votre capital futur.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-fennec-dark/60 max-w-lg mx-auto">
          <span className="flex items-center text-emerald-700">
            <PiggyBank className="w-4 h-4 mr-1.5 text-emerald-500 shrink-0" />
            Jusqu'à CHF 3'000 d'économie fiscale par an pour les salariés
          </span>
          <span className="flex items-center text-emerald-700">
            <Calculator className="w-4 h-4 mr-1.5 text-emerald-500 shrink-0" />
            Simulation personnalisée de capital à terme
          </span>
          <span className="flex items-center text-emerald-700">
            <Shield className="w-4 h-4 mr-1.5 text-emerald-500 shrink-0" />
            Neutre, indépendant & conforme nLPD
          </span>
        </div>

        <div className="pt-4">
          <button
            onClick={onStartQuiz}
            className="px-8 py-4 bg-fennec-dark hover:bg-fennec-terracotta text-white font-display font-extrabold text-base rounded-full shadow-lg shadow-fennec-dark/25 hover:-translate-y-0.5 transition-all flex items-center space-x-2 mx-auto animate-bounce"
          >
            <Sparkles className="w-5 h-5 text-fennec-terracotta animate-pulse" />
            <span>Lancer la simulation 3ème Pilier</span>
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
            className="fixed inset-0 z-[100] bg-[#FAF8F5] overflow-y-auto flex flex-col justify-between font-sans"
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
                <span>Retour</span>
              </button>

              <div className="flex-1 max-w-md mx-6 text-center space-y-1.5">
                <div className="flex justify-between items-center text-[10px] text-fennec-brown font-black uppercase tracking-widest">
                  <span>Question {currentStep} sur 9</span>
                  <span>{Math.round((currentStep / 9) * 100)}% complété</span>
                </div>
                <div className="h-1.5 w-full bg-fennec-cream/40 rounded-full overflow-hidden relative">
                  <div 
                    ref={progressBarRef}
                    className="h-full bg-fennec-terracotta rounded-full origin-left"
                    style={{ width: `${(currentStep / 9) * 100}%` }}
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
                <span className="hidden sm:inline">Quitter</span>
              </button>
            </header>

            {/* 2. MAIN IMMERSIVE CONTAINER (aligned higher up for improved UI/UX) */}
            <div className="flex-grow flex items-start justify-center p-4 md:p-8 pt-2 sm:pt-4 md:pt-6 overflow-y-auto">
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
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display font-black text-2xl text-fennec-dark flex items-center justify-center">
                      <Loader2 className="w-6 h-6 mr-2.5 animate-spin text-fennec-terracotta" />
                      Analyse fiscale & prévoyance...
                    </h3>
                    <p className="text-sm text-fennec-dark/70 leading-relaxed max-w-lg mx-auto">
                      Fenny évalue votre profil de prévoyance et calcule votre gain fiscal potentiel en comparant les offres de <strong>Pilier 3a / 3b</strong> des principaux assureurs suisses.
                    </p>
                  </div>

                  {/* Infinite Auto-Scrolling Logo Carousel */}
                  <div className="space-y-2 max-w-xl mx-auto pt-4">
                    <p className="text-[11px] font-black uppercase tracking-wider text-fennec-brown/60 text-center">
                      Compagnies d'assurance analysées :
                    </p>
                    <div className="relative w-full overflow-hidden py-3 border-y border-fennec-cream/30 bg-white/30 rounded-2xl">
                      {/* Left and right fade gradients */}
                      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
                      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
                      
                      {/* Scrolling wrapper */}
                      <div className="flex space-x-6 animate-scroll-left w-max">
                        {['swisslife', 'axa', 'zurich', 'helvetia', 'allianz', 'generali', 'mobiliere', 'baloise'].map((logo, idx) => (
                          <div key={`${logo}-${idx}`} className="shrink-0">
                            <CompanyLogo id={logo} className="w-20 h-11 bg-white" />
                          </div>
                        ))}
                        {['swisslife', 'axa', 'zurich', 'helvetia', 'allianz', 'generali', 'mobiliere', 'baloise'].map((logo, idx) => (
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
                            Fenny conseille
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
                      />
                    </div>
                  </div>

                  {/* Question Right Panel */}
                  <div className="lg:col-span-7 bg-white rounded-3xl border border-fennec-cream/80 shadow-md p-6 md:p-10 w-full min-h-[380px] flex flex-col justify-between">
                    <div ref={stepContainerRef} className="flex-grow flex flex-col justify-center">
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
                                  1. Quel type de 3e Pilier recherchez-vous ?
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                Le 3ème pilier vous permet de vous constituer un capital de retraite tout en économisant d'importants impôts chaque année.
                              </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                              {[
                                { id: '3a', label: 'Pilier 3a (Lié)', desc: 'Déduction fiscale maximale', details: 'Bloqué légalement jusqu\'à la retraite. Idéal pour économiser d\'importants impôts fédéraux et cantonaux.', icon: PiggyBank },
                                { id: '3b', label: 'Pilier 3b (Libre)', desc: 'Flexibilité totale des retraits', details: 'Pas de déduction fiscale de base (sauf GE/FR), mais capital disponible à tout moment sans conditions.', icon: Shield },
                                { id: 'all', label: 'Je ne sais pas encore', desc: 'Aide-moi à choisir !', details: 'Permet d\'étudier les deux solutions pour composer l\'offre la plus adaptée.', icon: Sparkles },
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
                                  2. Votre profil personnel (obligatoire)
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                L'âge, le canton et les revenus influencent fortement le calcul des primes de base et l'économie d'impôt maximale réelle.
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Birth Date & Gender */}
                              <div className="space-y-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">Date de naissance (JJ.MM.AAAA)</label>
                                  <input 
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="Ex: 09.07.1995"
                                    value={typedBirthDate}
                                    onChange={(e) => handleBirthDateTypedChange(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-fennec-cream/80 bg-white text-fennec-dark focus:outline-none focus:border-fennec-terracotta font-mono font-bold text-sm"
                                    required
                                  />
                                  {typedBirthDate.replace(/\D/g, '').length === 8 && !filters.birthDate && (
                                    <p className="text-[10px] font-semibold text-red-500 mt-1">
                                      ⚠️ Date invalide ou impossible
                                    </p>
                                  )}
                                  {filters.birthDate && parsedBirthDateInfo && (
                                    <p className="text-[10px] font-bold text-green-600 mt-1">
                                      ✓ Âge calculé : {parsedBirthDateInfo.age} ans
                                    </p>
                                  )}
                                  {typedBirthDate.replace(/\D/g, '').length < 8 && (
                                    <p className="text-[10px] text-fennec-dark/45 mt-1">
                                      Saisissez les 8 chiffres de votre date de naissance. Très rapide sur mobile.
                                    </p>
                                  )}
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">Sexe légal</label>
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
                                        {g === 'M' ? 'Homme' : 'Femme'}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">Canton de résidence</label>
                                  <select
                                    value={filters.canton || 'GE'}
                                    onChange={(e) => handleFilterChange('canton', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-fennec-cream/80 bg-white text-fennec-dark focus:outline-none focus:border-fennec-terracotta font-medium text-sm"
                                  >
                                    <option value="ZH">Zurich (ZH)</option>
                                    <option value="GE">Genève (GE)</option>
                                    <option value="VD">Vaud (VD)</option>
                                    <option value="BE">Berne (BE)</option>
                                    <option value="FR">Fribourg (FR)</option>
                                    <option value="NE">Neuchâtel (NE)</option>
                                    <option value="VS">Valais (VS)</option>
                                    <option value="JU">Jura (JU)</option>
                                    <option value="AG">Argovie (AG)</option>
                                    <option value="BS">Bâle-Ville (BS)</option>
                                    <option value="BL">Bâle-Campagne (BL)</option>
                                    <option value="SG">Saint-Gall (SG)</option>
                                    <option value="TI">Tessin (TI)</option>
                                    <option value="LU">Lucerne (LU)</option>
                                  </select>
                                </div>
                              </div>

                              {/* Profession, Income & 2nd Pillar */}
                              <div className="space-y-4">
                                <div className="space-y-1">
                                  <div className="flex items-center space-x-1">
                                    <label className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">Statut professionnel</label>
                                    <FormTooltip content={
                                      <div className="space-y-1.5 text-white">
                                        <p className="font-bold text-fennec-terracotta">Impact sur le 3e Pilier :</p>
                                        <p>• <strong>Salarié (avec LPP) :</strong> Plafond de cotisation annuel maximal fixé à <strong>CHF 7'258.-</strong> (en 2026).</p>
                                        <p>• <strong>Indépendant (sans LPP) :</strong> Déduction jusqu'à 20% du gain d'exploitation net, max <strong>CHF 36'288.-</strong>.</p>
                                        <p>• <strong>Sans activité :</strong> Pas de réduction fiscale sur le 3a (lié) mais le 3b reste totalement possible.</p>
                                      </div>
                                    } />
                                  </div>
                                  <select
                                    value={filters.employmentStatus || 'salaried'}
                                    onChange={(e) => handleFilterChange('employmentStatus', e.target.value as any)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-fennec-cream/80 bg-white text-fennec-dark focus:outline-none focus:border-fennec-terracotta font-medium text-sm"
                                  >
                                    <option value="salaried">Salarié (avec caisse de pension LPP)</option>
                                    <option value="independent">Indépendant (sans caisse de pension)</option>
                                    <option value="unemployed">Sans activité lucrative / Autre</option>
                                  </select>
                                </div>

                                <div className="space-y-1">
                                  <div className="flex items-center space-x-1">
                                    <label className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">Revenu annuel brut (CHF)</label>
                                    <FormTooltip content={
                                      <div className="space-y-1.5 text-white">
                                        <p className="font-bold text-fennec-terracotta font-sans">Progressivité de l'impôt :</p>
                                        <p>En Suisse, le taux d'imposition augmente de façon progressive avec vos revenus.</p>
                                        <p>Plus vos revenus sont importants, plus votre économie d'impôt réelle sera élevée en déduisant les cotisations de votre 3e Pilier (souvent entre 22% et 45% de gain fiscal direct !).</p>
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
                                    <label className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">Déjà affilié à un 2ème pilier (LPP) ?</label>
                                    <FormTooltip content={
                                      <div className="space-y-1.5 text-white">
                                        <p className="font-bold text-fennec-terracotta font-sans">Caisse de pension (LPP) :</p>
                                        <p>Si vous possédez une caisse de pension par votre employeur ou à titre personnel, votre plafond de cotisation 3a annuel est de <strong>CHF 7'258.-</strong>.</p>
                                        <p>Si vous n'en possédez pas (indépendant ou sans activité), vous pouvez verser jusqu'à 20% de votre revenu d'activité lucrative net, max <strong>CHF 36'288.-</strong>.</p>
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
                                        {val ? 'Oui' : 'Non'}
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
                                  3. Quel type de produit souhaitez-vous ?
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                Les solutions bancaires privilégient la flexibilité pure, tandis que les assurances combinent couverture décès-invalidité et épargne forcée.
                              </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                              {[
                                { id: 'pure-savings', label: 'Épargne pure', desc: 'Pas de risque boursier, capital garanti.', icon: PiggyBank },
                                { id: 'equity-savings', label: 'Épargne en titres (Fonds / ETF)', desc: 'Placement boursier pour dynamiser le rendement sur le long terme.', icon: TrendingUp },
                                { id: 'mixed', label: 'Formule Mixte (Fonds + Assurance)', desc: 'Combinaison flexible d\'un capital garanti et d\'un investissement actions.', icon: Sparkles },
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
                                <span className="text-xs font-bold text-fennec-dark block">Quelle part d'actions visez-vous ?</span>
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
                                  4. Prévoyance & Besoins de couverture
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                Déterminez les garanties complémentaires indispensables pour protéger vos bénéficiaires en cas de coup dur.
                              </p>
                            </div>

                            <div className="space-y-4">
                              {/* Death Coverage */}
                              <div className="p-4 border border-fennec-cream/60 rounded-2xl space-y-3 bg-fennec-cream/5">
                                <div className="flex justify-between items-center">
                                  <div className="space-y-0.5">
                                    <span className="text-sm font-bold text-fennec-dark block">Couverture décès complémentaire</span>
                                    <span className="text-xs text-fennec-dark/60 block">Versement d'un capital garanti à vos proches en cas de décès.</span>
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
                                        {val ? 'Oui' : 'Non'}
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
                                    <label className="text-[10px] font-black uppercase text-fennec-brown block mb-1">Capital décès souhaité (CHF)</label>
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
                                <span className="text-sm font-bold text-fennec-dark block">Couverture en cas d'incapacité de gain / invalidité</span>
                                <div className="grid grid-cols-2 gap-2">
                                  {[
                                    { id: 'monthly-pension', label: 'Rente mensuelle' },
                                    { id: 'none', label: 'Aucune' },
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
                                    <label className="text-[10px] font-black uppercase text-fennec-brown block mb-1">Rente mensuelle souhaitée</label>
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
                                    <span className="text-xs font-bold text-fennec-dark block">Libération des primes</span>
                                    <span className="text-[10px] text-fennec-dark/60 block">L'assureur paie à votre place en cas d'invalidité.</span>
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
                                    <span className="text-xs font-bold text-fennec-dark block">Personnes à charge</span>
                                    <span className="text-[10px] text-fennec-dark/60 block">Conjoint ou enfants à charge légale.</span>
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
                                  5. Déterminez votre capacité d'épargne
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                Définissez la fréquence, le montant à épargner et la durée souhaitée. Vous pouvez modifier ces valeurs à tout moment.
                              </p>
                            </div>

                            <div className="space-y-4">
                              {/* Frequency selector */}
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black uppercase text-fennec-brown tracking-wider">Fréquence de versement</span>
                                <div className="flex bg-fennec-cream/45 p-1 rounded-xl">
                                  {[
                                    { id: 'monthly', label: 'Mensuel' },
                                    { id: 'yearly', label: 'Annuel' },
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
                                      <span className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">Versement estimé</span>
                                      <span className="font-display text-3xl font-black text-fennec-terracotta block">
                                        CHF {currentSavingAmount.toLocaleString()}.- <span className="text-sm font-bold text-fennec-dark/60">/ {isYearly ? 'an' : 'mois'}</span>
                                      </span>
                                      <span className="text-xs text-emerald-700 font-bold block bg-emerald-50 max-w-max mx-auto px-2.5 py-0.5 rounded-full mt-1.5">
                                        Gain fiscal estimé : ~CHF {Math.round((isYearly ? currentSavingAmount : currentSavingAmount * 12) * 0.22).toLocaleString()}.- / an
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
                                        <span>CHF {maxAmount.toLocaleString()}.- / {isYearly ? 'an' : 'mois'}</span>
                                      </div>
                                    </div>
                                  </>
                                );
                              })()}

                              {/* Commitment preference */}
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">Niveau d'engagement contractuel</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {[
                                    { id: 'fixed', label: 'Fixe régulier', desc: 'Prévoyance assurée' },
                                    { id: 'both', label: 'Les deux', desc: 'Solution hybride' },
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
                                  <label className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">Horizon de placement</label>
                                  <span className="text-xs font-black text-fennec-terracotta">{filters.investmentHorizon || 25} ans (retraite estimée en {2026 + (filters.investmentHorizon || 25)})</span>
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
                                  6. Déterminez votre profil de risque boursier
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                Si vous choisissez d'allouer une part d'actions (solutions titres), votre tolérance détermine la volatilité maximale acceptable.
                              </p>
                            </div>

                            <div className="space-y-4">
                              {/* Risk tolerance select */}
                              <div className="space-y-1.5">
                                <span className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">Votre tempérament face aux fluctuations</span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {[
                                    { id: 'prudent', label: 'Prudent (0-25% actions)', desc: 'Recherche de sécurité, gains modestes.' },
                                    { id: 'balanced', label: 'Équilibré (25-50% actions)', desc: 'Compromis parfait entre croissance et stabilité.' },
                                    { id: 'dynamic', label: 'Dynamique (50-75% actions)', desc: 'Prêt à accepter des hausses et baisses modérées.' },
                                    { id: 'offensive', label: 'Offensif (100% actions)', desc: 'Volatilité maximale acceptée pour un rendement ultime.' },
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
                                <span className="text-xs font-bold text-fennec-dark block">Si les marchés chutent de 20% en quelques mois :</span>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                  {[
                                    { id: 'sell', label: 'Je vends tout par peur' },
                                    { id: 'hold', label: 'Je patiente sagement' },
                                    { id: 'buy', label: 'J\'en profite pour réinvestir' },
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
                                  <span className="text-xs font-bold text-fennec-dark block">Fonds durables / Critères ESG uniquement</span>
                                  <span className="text-[10px] text-fennec-dark/65 block">Exclure l'armement, le charbon, etc. et privilégier l'éco-responsable.</span>
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
                                      {val ? 'Oui' : 'Non'}
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
                                  7. Envisagez-vous un retrait anticipé du capital ?
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                En Suisse, la loi autorise le retrait anticipé du Pilier 3a dans des cas bien précis. L'indiquer permet de calibrer la durée d'engagement optimale.
                              </p>
                            </div>

                            <div className="space-y-4">
                              <div className="grid grid-cols-1 gap-2">
                                {[
                                  { id: 'residence', label: 'Oui, pour l\'achat de ma résidence principale', desc: 'Acquisition immobilière ou amortissement hypothécaire.' },
                                  { id: 'independent', label: 'Oui, pour me lancer comme indépendant (LPP)', desc: 'Création d\'entreprise individuelle ou début d\'activité commerciale.' },
                                  { id: 'abroad', label: 'Oui, car je prévois de quitter la Suisse', desc: 'Départ définitif de la Confédération suisse.' },
                                  { id: 'none', label: 'Non, aucun projet de retrait avant la retraite', desc: 'Laisser fructifier mon épargne jusqu\'à l\'âge légal.' },
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
                                  <span className="text-xs font-bold text-fennec-dark block">Sous quel horizon estimez-vous ce retrait ?</span>
                                  <div className="grid grid-cols-3 gap-2">
                                    {[
                                      { id: 'short', label: 'Moins de 5 ans' },
                                      { id: 'medium', label: '5 à 10 ans' },
                                      { id: 'long', label: 'Plus de 10 ans' },
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
                                  8. Possédez-vous déjà un 3ème Pilier ?
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                Si vous possédez déjà un 3e pilier bancaire ou d'assurance, nous pouvons analyser s'il est plus judicieux de le racheter ou de le compléter.
                              </p>
                            </div>

                            <div className="space-y-4">
                              <div className="flex justify-between items-center p-4 border border-fennec-cream/60 rounded-2xl bg-fennec-cream/5">
                                <div className="space-y-0.5">
                                  <span className="text-sm font-bold text-fennec-dark block">Détenez-vous un 3ème pilier actuellement ?</span>
                                  <span className="text-xs text-fennec-dark/60 block">Qu'il s'agisse d'un compte bancaire ou d'une police d'assurance active.</span>
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
                                      {val ? 'Oui' : 'Non'}
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
                                      <label className="text-[10px] font-black uppercase text-fennec-brown block">Nom de l'assureur/banque actuel</label>
                                      <input 
                                        type="text"
                                        placeholder="Ex: Swiss Life, AXA, etc."
                                        value={filters.existingInsurer || ''}
                                        onChange={(e) => handleFilterChange('existingInsurer', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-fennec-cream text-sm focus:outline-none focus:border-fennec-terracotta font-medium"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-black uppercase text-fennec-brown block">Montant déjà accumulé (CHF)</label>
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
                                    <span className="text-xs font-bold text-fennec-dark block">Quel est votre objectif de démarche ?</span>
                                    <div className="grid grid-cols-2 gap-2">
                                      {[
                                        { id: 'new', label: 'Un nouveau contrat complémentaire' },
                                        { id: 'transfer', label: 'Transfert / Rachat de mon contrat actuel' },
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
                                  9. Quelles sont vos priorités de comparaison ?
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                Cliquez sur les options pour attribuer la priorité n°1 et la priorité n°2 de votre recherche de rendement et de couverture.
                              </p>
                            </div>

                            <div className="space-y-3">
                              {[
                                { id: 'yield', label: 'Rendement potentiel le plus élevé', desc: 'Allocation boursière ou titres performants visée.' },
                                { id: 'fees', label: 'Frais d\'entrée et coûts de gestion les plus bas', desc: 'Minimiser l\'impact des frais administratifs.' },
                                { id: 'flexibility', label: 'Flexibilité totale des versements libres', desc: 'Pouvoir verser ce que vous voulez, quand vous voulez.' },
                                { id: 'security', label: 'Sécurité et capital garanti contractuellement', desc: 'Aucun risque boursier sur l\'épargne accumulée.' },
                                { id: 'coverage', label: 'Prévoyance complète (Assurances Décès/Invalidité)', desc: 'Protéger son conjoint et ses enfants de façon optimale.' },
                              ].map((item) => {
                                const isRank1 = filters.priorityRank1 === item.id;
                                const isRank2 = filters.priorityRank2 === item.id;
                                
                                let badgeText = "";
                                let badgeStyle = "";
                                if (isRank1) {
                                  badgeText = "Priorité 1";
                                  badgeStyle = "bg-fennec-terracotta text-white";
                                } else if (isRank2) {
                                  badgeText = "Priorité 2";
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
                                        Sélectionner
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
                                    <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">Prénom *</label>
                                    <input 
                                      type="text" 
                                      required
                                      placeholder="Ex: Jean"
                                      value={formData.firstName}
                                      onChange={(e) => setFormData(p => ({ ...p, firstName: e.target.value }))}
                                      className="w-full bg-white border border-fennec-cream/80 rounded-xl px-3 py-2 text-xs text-fennec-dark focus:ring-1 focus:ring-fennec-terracotta"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">Nom *</label>
                                    <input 
                                      type="text" 
                                      required
                                      placeholder="Ex: Dupont"
                                      value={formData.lastName}
                                      onChange={(e) => setFormData(p => ({ ...p, lastName: e.target.value }))}
                                      className="w-full bg-white border border-fennec-cream/80 rounded-xl px-3 py-2 text-xs text-fennec-dark focus:ring-1 focus:ring-fennec-terracotta"
                                    />
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">Adresse E-mail *</label>
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
                                  <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">Téléphone Mobile Suisse *</label>
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
                                      setVerificationError("Veuillez remplir tous les champs obligatoires.");
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
                                        setVerificationError(data.error || "Erreur lors de l'envoi du code par e-mail.");
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
                                      setVerificationError("Impossible de contacter le serveur de vérification.");
                                    }
                                  }}
                                  className="w-full py-3 bg-fennec-dark hover:bg-fennec-terracotta text-white font-display font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                                >
                                  {isSendingCode ? (
                                    <>
                                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                      <span>Envoi du code e-mail en cours...</span>
                                    </>
                                  ) : (
                                    <span>Recevoir mon code de validation par E-mail</span>
                                  )}
                                </button>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <div className="bg-amber-50 border border-amber-200 text-[11px] text-amber-800 p-3.5 rounded-xl leading-relaxed">
                                  <strong>💡 Code de sécurité envoyé par e-mail !</strong> Veuillez vérifier la boîte de réception de <strong>{formData.email}</strong> et saisir le code à 4 chiffres ci-dessous.
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">Saisir le Code de Sécurité *</label>
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
                                      setVerificationError("Veuillez saisir le code à 4 chiffres reçu par e-mail.");
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
                                        setVerificationError(data.error || "Code de vérification incorrect.");
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
                                      setVerificationError("Erreur lors de la vérification du code.");
                                    }
                                  }}
                                  className="w-full py-3 bg-fennec-red hover:bg-red-600 text-white font-display font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-fennec-red/25 flex items-center justify-center cursor-pointer"
                                >
                                  {isSendingCode ? "Vérification en cours..." : "Valider le code & afficher les résultats"}
                                </button>

                                <button 
                                  type="button"
                                  onClick={() => setVerificationStep('details')}
                                  className="w-full text-center text-[10px] text-fennec-dark/50 hover:text-fennec-dark underline font-semibold cursor-pointer"
                                >
                                  Modifier mes coordonnées
                                </button>
                              </div>
                            )}

                            {/* Balloon notification from Fenny */}
                            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 md:p-4 flex items-start space-x-3 text-emerald-800">
                              <span className="text-xl">🦊</span>
                              <div className="text-[11px] leading-relaxed">
                                <strong>Message de Fenny :</strong> "J'ai bien préparé vos résultats ! Un code de sécurité unique à 4 chiffres a été envoyé à <strong>{formData.email || 'votre e-mail'}</strong> pour débloquer instantanément vos projections de capital 3e pilier."
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
                        <span>Retour</span>
                      </button>

                      {currentStep < 10 && (
                        <button
                          type="button"
                          onClick={nextStep}
                          className="flex items-center text-xs font-bold font-display px-6 py-2.5 rounded-full bg-fennec-dark hover:bg-fennec-terracotta text-white transition-all shadow-sm"
                        >
                          <span>{currentStep === 9 ? "Étape de vérification" : "Continuer"}</span>
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
              Fenny s'engage : 100% anonyme, conforme à la nLPD suisse, aucune revente de données.
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
                  Recommencer
                </button>
              </div>

              {/* Quick Profile Summary Pills */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2.5 bg-fennec-cream/10 rounded-xl">
                  <span className="text-fennec-brown font-medium">Type de prévoyance :</span>
                  <span className="font-bold text-fennec-dark capitalize">
                    {filters.type === '3a' ? 'Pilier 3a (Lié)' : filters.type === '3b' ? 'Pilier 3b (Libre)' : 'Mixte'}
                  </span>
                </div>
                <div className="flex justify-between p-2.5 bg-fennec-cream/10 rounded-xl">
                  <span className="text-fennec-brown font-medium">Versement mensuel :</span>
                  <span className="font-bold text-fennec-dark">CHF {monthlyAmount}.- / mois</span>
                </div>
                <div className="flex justify-between p-2.5 bg-fennec-cream/10 rounded-xl">
                  <span className="text-fennec-brown font-medium">Durée du contrat :</span>
                  <span className="font-bold text-fennec-dark">{duration} ans</span>
                </div>
                <div className="flex justify-between p-2.5 bg-fennec-cream/10 rounded-xl">
                  <span className="text-fennec-brown font-medium">Votre profil :</span>
                  <span className="font-bold text-fennec-dark capitalize">
                    {filters.profile === 'young' ? 'Jeune actif' : filters.profile === 'family' ? 'Famille' : filters.profile === 'senior' ? 'Sénior' : 'Indépendant'}
                  </span>
                </div>
                <div className="flex justify-between p-2.5 bg-fennec-cream/10 rounded-xl">
                  <span className="text-fennec-brown font-medium">Priorité majeure :</span>
                  <span className="font-bold text-fennec-dark">
                    {filters.priority === 'tax-saving' ? 'Baisse d\'impôt max' : filters.priority === 'high-yield' ? 'Rendement Actions' : 'Capital Garanti 100%'}
                  </span>
                </div>
              </div>

              {/* Toggle to fine-tune filters directly */}
              <div className="border-t border-fennec-cream/30 pt-4">
                <button
                  onClick={() => setShowFiltersInline(!showFiltersInline)}
                  className="w-full text-xs font-bold text-fennec-brown/80 hover:text-fennec-dark flex items-center justify-center p-2 rounded-xl border border-fennec-cream/50 bg-fennec-cream/5 transition-all"
                >
                  <span>{showFiltersInline ? 'Masquer les ajustements' : 'Ajuster les curseurs directement'}</span>
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
                      <span>Versement mensuel</span>
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
                      <span>Durée contractuelle</span>
                      <span className="text-fennec-terracotta">{duration} ans</span>
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
                    <label className="font-bold block uppercase tracking-wider text-[10px] text-fennec-brown">Priorité</label>
                    <select
                      value={filters.priority}
                      onChange={(e) => handleFilterChange('priority', e.target.value as any)}
                      className="w-full bg-white border border-fennec-cream/60 rounded-xl px-2 py-1.5 text-xs text-fennec-dark"
                    >
                      <option value="tax-saving">Baisse d'impôt max</option>
                      <option value="high-yield">Rendement Actions/Fonds</option>
                      <option value="guaranteed">Sécurité capital garanti</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {/* Legal info panel */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 text-[11px] text-amber-900 leading-relaxed">
                <span className="font-bold flex items-center mb-1">
                  <Percent className="w-3.5 h-3.5 mr-1" /> Limites Légales 3a :
                </span>
                <p>Plafond salarié 2026 : <strong>CHF 7'258.- / an</strong></p>
                <p>Plafond indépendant 2026 : <strong>CHF 36'288.- / an</strong></p>
              </div>

            </div>

            {/* RIGHT COLUMN: COMPARATIVE LIST & PROJECTIONS */}
            <div className="lg:col-span-8 space-y-6 order-1 lg:order-2">
              
              {/* Mobile Quick Filter Header */}
              <div className="lg:hidden bg-white border border-fennec-cream rounded-2xl p-4 flex items-center justify-between shadow-xs mb-4">
                <div className="space-y-0.5 text-left">
                  <span className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">Votre simulation</span>
                  <p className="text-xs font-bold text-fennec-dark">
                    Prévoyance {filters.type === '3a' ? '3a' : filters.type === '3b' ? '3b' : 'Mixte'} • CHF {monthlyAmount}.-/mois • {duration} ans
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
                  <span>Ajuster</span>
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
                      Économie fiscale estimée
                    </span>
                    <span className="text-2xl font-display font-black text-fennec-dark block">
                      CHF {(simulatedResults[0]?.taxSavingsPerYear || 0).toLocaleString()}.- <span className="text-xs font-semibold text-emerald-600">/ an</span>
                    </span>
                    <p className="text-[11px] text-fennec-dark/70 mt-1">
                      Équivaut à une réduction fiscale totale d'environ <strong>CHF {totalTaxSavingsOverTerm.toLocaleString()}.-</strong> sur la durée.
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
                      Recommandation
                    </span>
                    <span className="text-sm font-display font-bold text-fennec-dark block mt-0.5">
                      {filters.priority === 'high-yield' 
                        ? 'Optez pour un modèle mixte Actions/Obligations' 
                        : filters.priority === 'guaranteed' 
                        ? 'Privilégiez la sécurité du capital garanti' 
                        : 'Maximisez votre 3a lié pour l\'avantage fiscal'}
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
                    Filtrer & Trier les offres 3e pilier
                  </span>
                  <span className="text-[10px] text-fennec-dark/60 block font-bold bg-fennec-cream/20 border border-fennec-cream px-2 py-0.5 rounded-md">
                    {simulatedResults.length} assureurs disponibles
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
                    <span>Tous les assureurs</span>
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
                    <span>Rendement max (Actions)</span>
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
                    <span>Sécurité & Capital</span>
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
                        Capital garanti le plus élevé
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
                              Votre Projection
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
                            <span>{isExpanded ? 'Masquer les détails' : 'Fiche technique'}</span>
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
                                  Réglementation Officielle AFC & Dépôt Actuariel 2026
                                </h5>
                                <span className="text-[9px] font-mono text-fennec-brown bg-white border border-fennec-cream/60 px-2 py-0.5 rounded font-black">
                                  CERTIFIÉ SWISS-ACCURACY • 100% FIABLE
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* Column 1: Épargne & Limites */}
                                <div className="bg-white rounded-2xl p-4 border border-fennec-cream/25 space-y-2.5">
                                  <span className="text-[10px] font-bold text-fennec-brown uppercase block tracking-wider">Épargne & Plafonds</span>
                                  <div className="space-y-1.5 text-xs">
                                    <div className="flex justify-between">
                                      <span className="text-fennec-dark/65">Versement annuel souhaité:</span>
                                      <span className="font-bold text-fennec-dark">CHF {(monthlyAmount * 12).toLocaleString()}.-</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-fennec-dark/65">Plafond légal suisse 2026:</span>
                                      <span className="font-bold text-fennec-dark">CHF {company.taxDetails?.legalLimit.toLocaleString()}.-</span>
                                    </div>
                                    <div className="flex justify-between pt-1 border-t border-fennec-cream/10">
                                      <span className="text-fennec-dark font-semibold">Montant retenu (éligible):</span>
                                      <span className="font-black text-fennec-terracotta">CHF {company.taxDetails?.allowedContribution.toLocaleString()}.-</span>
                                    </div>
                                    {company.taxDetails?.isCapped && (
                                      <p className="text-[9px] text-amber-700 bg-amber-50 p-2 rounded border border-amber-100 font-bold mt-1 leading-normal">
                                        ⚠️ Le versement dépasse le plafond suisse 3a ({filters.hasSecondPillar ? "Salarié" : "Indépendant"}). La simulation a été ajustée de manière légitime.
                                      </p>
                                    )}
                                  </div>
                                </div>

                                {/* Column 2: Frais & Primes */}
                                <div className="bg-white rounded-2xl p-4 border border-fennec-cream/25 space-y-2.5">
                                  <span className="text-[10px] font-bold text-fennec-brown uppercase block tracking-wider">Frais & Primes de Risque</span>
                                  <div className="space-y-1.5 text-xs">
                                    <div className="flex justify-between">
                                      <span className="text-fennec-dark/65">Frais administratifs nets:</span>
                                      <span className="font-bold text-fennec-dark">{company.adminFeesPercent.toFixed(2)}% / an</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-fennec-dark/65">Frais d'admin cumulés:</span>
                                      <span className="font-bold text-fennec-dark">CHF {company.totalAdminFees.toLocaleString()}.-</span>
                                    </div>
                                    <div className="flex justify-between pt-1 border-t border-fennec-cream/10">
                                      <span className="text-fennec-dark/65">Primes de risque mensuelles:</span>
                                      <span className="font-bold text-rose-700">CHF {company.riskPremiumMonthly.toFixed(2)}.-</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-fennec-dark font-semibold">Part nette d'épargne:</span>
                                      <span className="font-black text-emerald-600">CHF {company.netSavingsMonthly.toFixed(2)}.- / mois</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Column 3: Impôts & Retrait */}
                                <div className="bg-white rounded-2xl p-4 border border-fennec-cream/25 space-y-2.5">
                                  <span className="text-[10px] font-bold text-fennec-brown uppercase block tracking-wider">Optimisation Fiscale & Retrait</span>
                                  <div className="space-y-1.5 text-xs">
                                    <div className="flex justify-between">
                                      <span className="text-fennec-dark/65">Taux marginal combiné ({filters.canton}):</span>
                                      <span className="font-bold text-fennec-dark">{(company.taxDetails?.marginalTaxRate * 100).toFixed(2)}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-fennec-dark/65">Économie d'impôt par an:</span>
                                      <span className="font-black text-emerald-600">CHF {company.taxDetails?.yearlyTaxSavings.toLocaleString()}.-</span>
                                    </div>
                                    <div className="flex justify-between pt-1 border-t border-fennec-cream/10">
                                      <span className="text-fennec-dark/65">Taux d'impôt sur retrait:</span>
                                      <span className="font-bold text-amber-700">{(company.taxDetails?.withdrawalTaxRate * 100).toFixed(2)}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-fennec-dark/65">Impôt payé au versement:</span>
                                      <span className="font-bold text-red-700">CHF {company.taxDetails?.withdrawalTaxAmount.toLocaleString()}.-</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Bottom Summary Callout */}
                              <div className="bg-[#1E1916] text-white rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="space-y-1 text-left">
                                  <span className="text-[9px] font-black uppercase text-fennec-cream/60 tracking-widest block">Note actuarielle de solvabilité</span>
                                  <p className="text-xs text-white/80 leading-relaxed max-w-xl">
                                    Calculé sur un rendement boursier moyen retenu de <strong>{(company.yieldRateUsed * 100).toFixed(2)}% brut</strong>. Le gain fiscal cumulé sur la période est de <strong>CHF {company.taxDetails?.totalTaxSavingsOverHorizon.toLocaleString()}.-</strong> selon le barème officiel de la Confédération.
                                  </p>
                                </div>
                                <div className="text-left md:text-right shrink-0">
                                  <span className="text-[10px] font-bold text-emerald-400 uppercase block tracking-wider">Capital Net Réel Versé (Payout)</span>
                                  <span className="text-xl font-display font-black text-emerald-300 block">
                                    CHF {company.taxDetails?.projectedCapitalNet.toLocaleString()}.-
                                  </span>
                                  <span className="text-[9px] text-[#C1B29F] block">Après déduction de l'impôt séparé sur le retrait de capital</span>
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
                  Éléments réglementaires de la Prévoyance Individuelle :
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
                />
              </div>
              <div>
                <span className="text-[10px] font-bold text-fennec-terracotta uppercase tracking-wider block">
                  Étude de Prévoyance Offerte
                </span>
                <h4 className="font-display font-extrabold text-xl text-fennec-dark">
                  Votre étude {selectedAssureur.name}
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
                    <strong>Projection récapitulative :</strong><br />
                    Épargne mensuelle de <strong>CHF {monthlyAmount}.-</strong> sur <strong>{duration} ans</strong>. Capital final estimé (fonds) : <strong>CHF {selectedAssureur.expectedSum.toLocaleString()}.-</strong> chez {selectedAssureur.name}. Gain fiscal moyen cumulé : <strong>CHF {((selectedAssureur.taxSavingsPerYear || 0) * duration).toLocaleString()}.-</strong> d'économies d'impôts directes !
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="modal-stagger-item space-y-1.5">
                      <label className="text-xs font-bold text-fennec-dark block">Prénom *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ex: Sophie"
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
                      <label className="text-xs font-bold text-fennec-dark block">Nom de famille *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ex: Rochat"
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
                    <label className="text-xs font-bold text-fennec-dark block">Adresse E-mail *</label>
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
                    <label className="text-xs font-bold text-fennec-dark block">Téléphone Mobile Suisse *</label>
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
                    <label className="text-xs font-bold text-fennec-dark block">Votre statut d'activité</label>
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
                        Salarié(e) (Avec LPP)
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
                        Indépendant(e) (Sans LPP)
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
                      <span>Demander mon étude gratuite</span>
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
                    Simulation enregistrée !
                  </h5>
                  <p className="text-sm text-fennec-dark/80 max-w-sm mx-auto">
                    Merci <strong>{formData.firstName}</strong> ! Votre simulation fiscale pour le 3ème pilier chez <strong>{selectedAssureur.name}</strong> a bien été transmise à notre conseiller prévoyance.
                  </p>
                  <p className="text-xs text-fennec-dark/70 leading-relaxed bg-fennec-cream/10 p-4 rounded-xl border border-fennec-cream/30">
                    Nous allons préparer un comparatif de rendement personnalisé intégrant la déduction d'impôt exacte selon le barème fiscal de votre canton pour <strong>{formData.profession === 'salaried' ? 'salarié' : 'indépendant'}</strong>. Nous vous recontacterons au <strong>{formData.phone}</strong> sous 24 heures.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={handleCloseForm}
                      className="px-6 py-2 bg-fennec-dark hover:bg-fennec-terracotta text-white font-display font-bold text-xs rounded-full transition-colors"
                    >
                      Fermer la fenêtre
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
