/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { CAISSES_MALADIE, SWISS_CANTONS, FRANCHISES, calculateHealthPremium, calculateSavings } from '../data';
import { HealthFilterState, CaisseMaladie } from '../types';
import { resolveZipCode } from '../utils/swissZipCodes';
import { 
  getRegionCode, 
  getInsurerDisplayName, 
  getInsurerModelFallbackName, 
  lookupPremium 
} from '../utils/premiumLookupService';
import { fetchOfficialPremiums } from '../services/priminfoService';
import fenyWinking from '../assets/images/feny_winking_1783331270164.jpg';
import fenyThinking from '../assets/images/feny_thinking_1783331247759.jpg';
import fenyAvatar from '../assets/images/feny_avatar_1783331224698.jpg';
import fenySavings from '../assets/images/feny_savings_1783249344310.jpg';
import fenyCompare from '../assets/images/feny_compare_1783249332783.jpg';
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
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import CompanyLogo from './CompanyLogo';

// Client-side cache for Vercel static deployment lookup fallback
let cachedClientDb: Record<string, { premium: number; modelName: string }> | null = null;

const HEALTH_ADVICE_MAP: Record<string, string> = {
  canton: "Le canton de résidence est le critère numéro 1 de calcul de la prime LAMal. L'OFSP ajuste les prix selon le coût des infrastructures hospitalières de votre région.",
  personalInfo: "L'âge, le genre et la nationalité influencent le calcul de l'assurance complémentaire (LCA). Pour l'assurance obligatoire (LAMal), la prime dépend uniquement de l'âge et de votre région.",
  currentSituation: "Indiquer votre assureur et prime actuels permet de calculer précisément vos économies potentielles et d'identifier si un changement de modèle est judicieux.",
  lamal: "La franchise et le modèle alternatif (Médecin de famille, Telmed, HMO) sont vos leviers principaux pour économiser jusqu'à 50% sur l'assurance de base obligatoire.",
  lcaBesoins: "Les complémentaires remboursent les soins hors LAMal (ostéopathie, dentaire, lunettes, chambre privée). Contrairement à la LAMal, l'assureur a le droit de poser des réserves.",
  healthDeclaration: "Un questionnaire de santé est requis uniquement pour les assurances complémentaires (LCA). Répondez honnêtement pour éviter une annulation ultérieure de couverture.",
  preferences: "Personnaliser vos préférences (budget, gestion en ligne, priorités) nous permet de trier et de vous suggérer les assureurs suisses offrant le meilleur rapport qualité-prix.",
  firstName: "Votre prénom nous permet de personnaliser votre offre gratuite Fenny et d'établir un dossier de simulation maladie à votre nom.",
  lastName: "Votre nom de famille est requis par les caisses maladie suisses pour valider la légitimité du calcul de prime personnalisé.",
  email: "Votre adresse e-mail nous sert à vous transmettre instantanément votre rapport comparatif complet de primes au format PDF.",
  phone: "Votre téléphone mobile suisse valide permet à un conseiller partenaire de valider la simulation et de vous confirmer la baisse de prime.",
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
  onStartQuiz?: () => void;
}

export default function HealthComparator({ isEmbedded = false, onStartQuiz }: HealthComparatorProps) {
  // 1. Core State
  const [filters, setFilters] = useState<HealthFilterState>({
    canton: 'GE',
    zipCode: '1201',
    zone: 1,
    ageCategory: 'adult',
    franchise: 2500,
    model: 'family',
    accidentCoverage: true,
    sortBy: 'price',
    supplementaryType: 'none',
  });

  const [zipInput, setZipInput] = useState<string>('1201');
  const [resolvedInfo, setResolvedInfo] = useState<{ zip: string; canton: string; zone: number; city: string } | null>(() => resolveZipCode('1201'));

  // Handler for zip code input change
  const handleZipChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 4);
    setZipInput(clean);

    if (clean.length === 4) {
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
    } else {
      setResolvedInfo(null);
    }
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
      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;
      let category: 'adult' | 'young' | 'child' = 'adult';
      if (age <= 18) {
        category = 'child';
        handleFilterChange('franchise', 0);
      } else if (age <= 25) {
        category = 'young';
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
  const [currentCaisseId, setCurrentCaisseId] = useState<string>('helsana');
  const [currentPremiumInput, setCurrentPremiumInput] = useState<number>(0);
  const [userHasEditedCurrentPremium, setUserHasEditedCurrentPremium] = useState<boolean>(false);

  // Fetch real-time official premiums from backend when filters change
  useEffect(() => {
    let active = true;
    const fetchPremiums = async () => {
      if (!filters.zipCode || filters.zipCode.length !== 4) return;
      setLoadingReal(true);
      try {
        const results = await fetchOfficialPremiums({
          zipCode: filters.zipCode,
          franchise: filters.franchise,
          ageCategory: filters.ageCategory,
          accidentCoverage: filters.accidentCoverage,
          model: filters.model
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
            setCurrentPremiumInput(Math.round(matchedCurrent.premium));
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
  }, [filters.zipCode, filters.franchise, filters.ageCategory, filters.accidentCoverage, currentCaisseId, filters.model]);

  // Computed premiums list
  const calculatedResults = useMemo(() => {
    const list = CAISSES_MALADIE.map((caisse) => {
      // Find matching real premium from the parsed list for the exact model chosen
      const realMatches = realPremiums.filter(
        (rp) => rp.insurerId === caisse.id && rp.modelType === filters.model
      );

      let premium = 0;
      let matchedModelName = '';
      let isRealData = false;

      if (realMatches.length > 0) {
        // Use the cheapest matched premium for this insurer
        realMatches.sort((a, b) => a.premium - b.premium);
        premium = realMatches[0].premium;
        matchedModelName = realMatches[0].modelName;
        isRealData = true;
      }

      // We strictly ONLY return real official data. Fake calculations are illegal.
      // If there is no real data found for this caisse, we skip it or return 0.
      
      return {
        ...caisse,
        computedPremium: premium,
        realModelName: matchedModelName || undefined,
        isRealData: isRealData,
      };
    }).filter(caisse => caisse.computedPremium > 0); // Filter out insurers with no real data

    // Sort results
    if (filters.sortBy === 'price') {
      list.sort((a, b) => {
        if (a.computedPremium === 0 && b.computedPremium === 0) return 0;
        if (a.computedPremium === 0) return 1;
        if (b.computedPremium === 0) return -1;
        return a.computedPremium - b.computedPremium;
      });
    } else if (filters.sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseForm = () => {
    setSelectedCaisse(null);
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
    const percentage = quizMode ? (currentStep / 8) * 100 : 100;
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
      if (currentStep === 1) setFenyAdvice(HEALTH_ADVICE_MAP.canton);
      else if (currentStep === 2) setFenyAdvice(HEALTH_ADVICE_MAP.personalInfo);
      else if (currentStep === 3) setFenyAdvice(HEALTH_ADVICE_MAP.currentSituation);
      else if (currentStep === 4) setFenyAdvice(HEALTH_ADVICE_MAP.lamal);
      else if (currentStep === 5) setFenyAdvice(HEALTH_ADVICE_MAP.lcaBesoins);
      else if (currentStep === 6) setFenyAdvice(HEALTH_ADVICE_MAP.healthDeclaration);
      else if (currentStep === 7) setFenyAdvice(HEALTH_ADVICE_MAP.preferences);
    } else {
      setFenyAdvice(null);
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
    if (modalProgressRef.current && selectedCaisse) {
      const percentage = (completedFieldsCount / 4) * 100;
      gsap.to(modalProgressRef.current, {
        width: `${percentage}%`,
        duration: 0.45,
        ease: 'power2.out'
      });
    }
  }, [completedFieldsCount, selectedCaisse]);

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
          />
        </div>
        
        <div className="space-y-2 max-w-xl mx-auto">
          <h3 className="font-display font-extrabold text-2xl text-fennec-dark">
            Simulez vos primes d'assurance maladie suisse avec Fenny
          </h3>
          <p className="text-sm text-fennec-dark/70 leading-relaxed">
            Répondez à <strong>5 questions simples</strong> en moins de 2 minutes. Notre algorithme indépendant compare l'intégralité des 37 caisses d'assurance maladie suisses agréées OFSP pour identifier le tarif le plus compétitif de votre canton.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-fennec-dark/60 max-w-lg mx-auto">
          <span className="flex items-center text-emerald-700">
            <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-500 shrink-0" />
            37 caisses agréées comparées (LAMal)
          </span>
          <span className="flex items-center text-emerald-700">
            <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-500 shrink-0" />
            Données officielles OFSP & Priminfo 2026
          </span>
          <span className="flex items-center text-emerald-700">
            <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-500 shrink-0" />
            100% gratuit, anonyme & conforme nLPD
          </span>
        </div>

        <div className="pt-4">
          <button
            onClick={onStartQuiz}
            className="px-8 py-4 bg-fennec-red hover:bg-red-600 text-white font-display font-extrabold text-base rounded-full shadow-lg shadow-fennec-red/25 hover:-translate-y-0.5 transition-all flex items-center space-x-2 mx-auto animate-bounce"
          >
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span>Lancer le comparateur maladie</span>
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
          Comparateur Officiel 2026
        </span>
        <h2 className="font-display font-extrabold text-3xl text-fennec-dark">
          Comparez les primes d'assurance maladie suisse
        </h2>
        <p className="mt-1 text-sm text-fennec-dark/70">
          Trouvez instantanément le tarif le plus avantageux et adapté à vos besoins réels.
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
                  <span>Question {currentStep} sur 7</span>
                  <span>{Math.round((currentStep / 7) * 100)}% complété</span>
                </div>
                <div className="h-1.5 w-full bg-fennec-cream/40 rounded-full overflow-hidden relative">
                  <div 
                    ref={progressBarRef}
                    className="h-full bg-fennec-terracotta rounded-full origin-left"
                    style={{ width: `${(currentStep / 7) * 100}%` }}
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
                      Analyse comparative en cours...
                    </h3>
                    <p className="text-sm text-fennec-dark/70 leading-relaxed max-w-lg mx-auto">
                      Fenny interroge les bases de données officielles de l'<strong>OFSP (OFAS) 2026</strong> et compare en temps réel <strong>37 caisses maladie</strong> pour la région de <strong>{filters.zipCode}</strong>.
                    </p>
                  </div>

                  {/* Infinite Auto-Scrolling Logo Carousel */}
                  <div className="space-y-2 max-w-xl mx-auto pt-4">
                    <p className="text-[11px] font-black uppercase tracking-wider text-fennec-brown/60 text-center">
                      Compagnies en cours de comparaison :
                    </p>
                    <div className="relative w-full overflow-hidden py-3 border-y border-fennec-cream/30 bg-white/30 rounded-2xl">
                      {/* Left and right fade gradients */}
                      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
                      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
                      
                      {/* Scrolling wrapper */}
                      <div className="flex space-x-6 animate-scroll-left w-max">
                        {['assura', 'css', 'helsana', 'swica', 'visana', 'sanitas', 'concordia', 'kpt', 'mutuel', 'okk', 'sympany', 'atupri'].map((logo, idx) => (
                          <div key={`${logo}-${idx}`} className="shrink-0">
                            <CompanyLogo id={logo} className="w-20 h-11 bg-white" />
                          </div>
                        ))}
                        {['assura', 'css', 'helsana', 'swica', 'visana', 'sanitas', 'concordia', 'kpt', 'mutuel', 'okk', 'sympany', 'atupri'].map((logo, idx) => (
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
                          currentStep === 2 ? fenyAvatar :
                          currentStep === 3 ? fenySavings :
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
                                  Quel est votre code postal de domicile ?
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                Les primes d'assurance maladie dépendent de votre code postal (détermination automatique de la zone de primes 1 ou 2, identique à Priminfo).
                              </p>
                            </div>

                            {/* NPA INPUT CONTAINER */}
                            <div className="bg-fennec-cream/20 p-5 rounded-2xl border border-fennec-cream/60 space-y-4">
                              <label className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">
                                Saisissez votre code postal suisse (NPA) :
                              </label>
                              <div className="relative max-w-xs">
                                <input
                                  type="text"
                                  pattern="\d*"
                                  maxLength={4}
                                  value={zipInput}
                                  onChange={(e) => handleZipChange(e.target.value)}
                                  placeholder="Ex: 1007, 1201, 1950..."
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

                              {resolvedInfo ? (
                                <div className="flex flex-wrap gap-2 pt-1 animate-in fade-in duration-150">
                                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1 flex items-center space-x-1.5 text-xs text-emerald-800 font-medium">
                                    <span className="font-bold">Canton :</span>
                                    <span>{SWISS_CANTONS.find(c => c.code === resolvedInfo.canton)?.name || resolvedInfo.canton} ({resolvedInfo.canton})</span>
                                  </div>
                                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1 flex items-center space-x-1.5 text-xs text-emerald-800 font-medium">
                                    <span className="font-bold">Localité :</span>
                                    <span>{resolvedInfo.city}</span>
                                  </div>
                                  <div className="bg-fennec-terracotta/10 border border-fennec-terracotta/20 rounded-lg px-2.5 py-1 flex items-center space-x-1.5 text-xs text-fennec-terracotta font-bold">
                                    <span className="font-bold">Zone de primes :</span>
                                    <span>Région {resolvedInfo.zone}</span>
                                  </div>
                                </div>
                              ) : (
                                <p className="text-[11px] text-fennec-dark/50 italic font-medium">
                                  {zipInput.length === 4 ? "Code postal non identifié. Veuillez choisir votre canton manuellement ci-dessous." : "Saisissez votre code postal à 4 chiffres."}
                                </p>
                              )}
                            </div>

                            {/* CANTON ALTERNATIVES */}
                            <div className="space-y-2 pt-2">
                              <span className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">
                                Ou sélectionnez directement un canton :
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
                                  Informations personnelles
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                Ces données réglementaires permettent d'appliquer les barèmes légaux précis de l'OFSP et d'estimer vos risques pour les complémentaires.
                              </p>
                            </div>

                            <div className="space-y-4">
                              {/* Date de Naissance */}
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">
                                  Date de naissance de l'assuré (JJ.MM.AAAA) *
                                </label>
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  placeholder="Ex: 28.05.1990"
                                  value={typedBirthDate}
                                  onChange={(e) => handleBirthDateTypedChange(e.target.value)}
                                  className="w-full bg-white border border-fennec-cream/80 rounded-xl px-3.5 py-2.5 text-xs text-fennec-dark focus:outline-none focus:ring-1 focus:ring-fennec-terracotta transition-all font-mono font-bold"
                                  required
                                />
                                {typedBirthDate.replace(/\D/g, '').length === 8 && !filters.birthDate && (
                                  <p className="text-[10px] font-semibold text-red-500 mt-1">
                                    ⚠️ Date invalide ou impossible
                                  </p>
                                )}
                                {filters.birthDate && parsedBirthDateInfo && (
                                  <p className="text-[10px] font-bold text-green-600 mt-1">
                                    ✓ Catégorie d'âge : {parsedBirthDateInfo.label} (Âge : {parsedBirthDateInfo.age} ans)
                                  </p>
                                )}
                                {typedBirthDate.replace(/\D/g, '').length < 8 && (
                                  <p className="text-[10px] text-fennec-dark/45 mt-1">
                                    Saisissez les 8 chiffres de votre date de naissance. Très rapide sur mobile.
                                  </p>
                                )}
                              </div>

                              {/* Sexe */}
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">
                                  Sexe légal *
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                  {[
                                    { id: 'M', label: 'Homme' },
                                    { id: 'F', label: 'Femme' }
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
                                  Nationalité / Permis de séjour *
                                </label>
                                <div className="grid grid-cols-2 gap-2.5">
                                  {[
                                    { id: 'swiss', label: 'Suisse' },
                                    { id: 'permis-c', label: 'Permis C (Établissement)' },
                                    { id: 'permis-b', label: 'Permis B (Résident)' },
                                    { id: 'other', label: 'Autre / Frontalier' },
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
                                  Catégorie d'âge reconnue :{' '}
                                  <span className="uppercase text-fennec-dark">
                                    {filters.ageCategory === 'child'
                                      ? 'Enfant (0-18 ans)'
                                      : filters.ageCategory === 'young'
                                      ? 'Jeune Adulte (19-25 ans)'
                                      : 'Adulte (26 ans+)'}
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
                                  Votre situation actuelle
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                Renseigner votre contrat actuel nous permet de calculer à l'exact centime près les économies réelles dont vous bénéficierez.
                              </p>
                            </div>

                            <div className="space-y-5">
                              {/* Has Insurer */}
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">
                                  Avez-vous déjà une assurance maladie en Suisse ? *
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                  {[
                                    { value: true, label: 'Oui, déjà assuré' },
                                    { value: false, label: 'Non, nouveau résident / autre' }
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
                                        Assureur actuel
                                      </label>
                                      <select
                                        value={filters.currentInsurerId || 'helsana'}
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
                                        Prime mensuelle totale (CHF)
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
                                        Ancienneté chez cet assureur
                                      </label>
                                      <div className="grid grid-cols-3 gap-1.5">
                                        {[
                                          { val: 1, label: '- de 2 ans' },
                                          { val: 3, label: '2 à 5 ans' },
                                          { val: 5, label: '+ de 5 ans' }
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
                                        Prochaine résiliation possible
                                      </label>
                                      <select
                                        value={filters.terminationOption || 'december'}
                                        onChange={(e) => handleFilterChange('terminationOption', e.target.value as any)}
                                        className="w-full bg-white border border-fennec-cream/80 rounded-xl px-3 py-2 text-xs text-fennec-dark focus:outline-none focus:ring-1 focus:ring-fennec-terracotta"
                                      >
                                        <option value="december">30 Novembre (Fin d'année standard)</option>
                                        <option value="june">30 Juin (Franchise 300 & standard uniquement)</option>
                                        <option value="unknown">Je ne sais pas</option>
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
                                  Votre assurance de base (LAMal)
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                L'assurance obligatoire de base (LAMal) offre des garanties identiques chez tous les assureurs. Seuls la franchise et le modèle influencent son prix.
                              </p>
                            </div>

                            <div className="space-y-4">
                              {/* Household size */}
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">
                                  Nombre de personnes à assurer
                                </label>
                                <div className="grid grid-cols-3 gap-2.5">
                                  {[
                                    { id: 'single', label: 'Seul' },
                                    { id: 'couple', label: 'En Couple' },
                                    { id: 'family', label: 'Famille / Enfants' },
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
                                    Franchise annuelle souhaitée
                                  </label>
                                  <select
                                    value={filters.franchise}
                                    onChange={(e) => handleFilterChange('franchise', Number(e.target.value))}
                                    className="w-full bg-white border border-fennec-cream/80 rounded-xl px-3 py-2.5 text-xs text-fennec-dark focus:outline-none focus:ring-1 focus:ring-fennec-terracotta font-mono font-bold"
                                  >
                                    {(filters.ageCategory === 'child' ? [0, 100, 200, 300, 400, 500, 600] : FRANCHISES).map((franValue) => (
                                      <option key={franValue} value={franValue}>
                                        CHF {franValue} ({franValue === 2500 || (filters.ageCategory === 'child' && franValue === 600) ? 'Éco Max' : franValue === 300 || (filters.ageCategory === 'child' && franValue === 0) ? 'Sécu Max' : 'Standard'})
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {/* Accident coverage */}
                                <div className="space-y-1.5">
                                  <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">
                                    Couverture accident
                                  </label>
                                  <div className="grid grid-cols-2 gap-2">
                                    {[
                                      { value: true, label: 'Oui, inclure' },
                                      { value: false, label: 'Non, exclure' }
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

                              {/* Models selection */}
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">
                                  Modèle de coordination des soins (LAMal)
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                  {[
                                    { id: 'family', label: 'Médecin de Famille', desc: 'Consultation du généraliste d\'abord' },
                                    { id: 'telemed', label: 'Télémédecine (Telmed)', desc: 'Appel d\'une hotline médicale d\'abord' },
                                    { id: 'hmo', label: 'Réseau HMO', desc: 'Consultation dans un centre agréé' },
                                    { id: 'standard', label: 'Standard (Libre choix)', desc: 'Aucun filtre, accès spécialiste direct' },
                                  ].map((modelOpt) => {
                                    const isSelected = filters.model === modelOpt.id;
                                    return (
                                      <button
                                        key={modelOpt.id}
                                        type="button"
                                        onClick={() => handleFilterChange('model', modelOpt.id as any)}
                                        className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                                          isSelected
                                            ? 'bg-fennec-terracotta text-white border-fennec-terracotta shadow-xs'
                                            : 'border-fennec-cream/80 text-fennec-dark bg-fennec-cream/5 hover:bg-fennec-cream/15'
                                        }`}
                                      >
                                        <span className="font-bold text-xs leading-none">{modelOpt.label}</span>
                                        <span className="text-[9px] opacity-80 mt-1 leading-tight font-medium">
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
                                  Vos besoins complémentaires (LCA)
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                Les complémentaires remboursent les soins que la LAMal n'indemnise pas (dentaire, médecines douces, confort hospitalier, etc.).
                              </p>
                            </div>

                            <div className="space-y-4">
                              {/* Supplementary type level */}
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">
                                  Niveau de couverture souhaité
                                </label>
                                <div className="grid grid-cols-4 gap-1.5">
                                  {[
                                    { id: 'none', label: 'AUCUNE LCA' },
                                    { id: 'essential', label: 'ESSENTIELLE' },
                                    { id: 'confort', label: 'CONFORT' },
                                    { id: 'premium', label: 'PREMIUM' }
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
                                      Division d'hospitalisation souhaitée
                                    </label>
                                    <div className="grid grid-cols-4 gap-1.5">
                                      {[
                                        { id: 'none', label: 'Division Commune' },
                                        { id: 'commune', label: 'Toute la Suisse' },
                                        { id: 'semi-private', label: 'Demi-Privée (2 lits)' },
                                        { id: 'private', label: 'Privée (1 lit)' },
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
                                      Cochez vos besoins ambulatoires spécifiques :
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      {[
                                        { id: 'hasAlternativeMedicine', label: 'Médecines douces', desc: 'Ostéopathie, acupuncture...' },
                                        { id: 'hasDental', label: 'Soins dentaires', desc: 'Détartrages, orthodontie...' },
                                        { id: 'hasRiskySports', label: 'Sports à risque', desc: 'Ski, sports aériens, plongée...' },
                                        { id: 'hasFrequentTravel', label: 'Voyages réguliers', desc: 'Urgences à l\'étranger...' },
                                        { id: 'isExpecting', label: 'Maternité / Grossesse', desc: 'Désir d\'enfant ou en cours' }
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
                                  Votre état de santé actuel
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                Un questionnaire médical simplifié est requis pour souscrire à une complémentaire (LCA). Ces déclarations sont purement indicatives.
                              </p>
                            </div>

                            <div className="space-y-4">
                              <div className="bg-amber-50 border border-amber-200/60 p-4 rounded-2xl flex items-start space-x-3">
                                <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 animate-pulse" />
                                <p className="text-[11px] text-amber-900 leading-relaxed font-medium">
                                  <strong>Rappel constitutionnel :</strong> L'assurance de base obligatoire (LAMal) <strong>ne peut jamais refuser</strong> un assuré pour son état de santé. Ces questions n'impactent que l'estimation des complémentaires LCA.
                                </p>
                              </div>

                              <div className="space-y-3">
                                {[
                                  { id: 'hasChronicConditions', label: 'Maladies chroniques ou affections de longue durée ?', desc: 'Diabète, cardiopathies, asthme sévère, dépression...' },
                                  { id: 'hasActiveTreatments', label: 'Traitements médicaux, thérapies ou médicaments en cours ?', desc: 'Suivi régulier de spécialistes, traitements prescrits...' },
                                  { id: 'hasMedicalHistory', label: 'Antécédents majeurs (hospitalisations, chirurgies) sous 5 ans ?', desc: 'Opérations chirurgicales ou longs séjours hospitaliers...' }
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
                                          { value: true, label: 'Oui' },
                                          { value: false, label: 'Non' }
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
                                  Vos préférences & budget
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                Dernière étape ! Ajustez votre budget mensuel et vos exigences pour que Fenny classe et optimise vos propositions.
                              </p>
                            </div>

                            <div className="space-y-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Service preference */}
                                <div className="space-y-1.5">
                                  <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">
                                    Type de gestion de contrat
                                  </label>
                                  <select
                                    value={filters.servicePreference || 'hybrid'}
                                    onChange={(e) => handleFilterChange('servicePreference', e.target.value as any)}
                                    className="w-full bg-white border border-fennec-cream/80 rounded-xl px-3 py-2.5 text-xs text-fennec-dark focus:outline-none focus:ring-1 focus:ring-fennec-terracotta"
                                  >
                                    <option value="online">100% En ligne (Application, documents PDF)</option>
                                    <option value="human">Traditionnel (Réseau d'agences physiques)</option>
                                    <option value="hybrid">Hybride (Gestion App + conseiller dédié)</option>
                                  </select>
                                </div>

                                {/* Client service importance */}
                                <div className="space-y-1.5">
                                  <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">
                                    Priorité au service client
                                  </label>
                                  <select
                                    value={filters.clientServiceImportance || 'medium'}
                                    onChange={(e) => handleFilterChange('clientServiceImportance', e.target.value as any)}
                                    className="w-full bg-white border border-fennec-cream/80 rounded-xl px-3 py-2.5 text-xs text-fennec-dark focus:outline-none focus:ring-1 focus:ring-fennec-terracotta"
                                  >
                                    <option value="low">Standard (Tous canaux numériques)</option>
                                    <option value="medium">Élevé (Meilleurs retours satisfaction client)</option>
                                    <option value="high">Absolue (Remboursements rapides & assistance locale)</option>
                                  </select>
                                </div>
                              </div>

                              {/* Monthly budget slider */}
                              <div className="space-y-1.5 bg-fennec-cream/10 p-4 rounded-2xl border border-fennec-cream/30">
                                <div className="flex justify-between items-baseline">
                                  <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">
                                    Budget mensuel maximum visé
                                  </label>
                                  <span className="text-sm font-mono font-black text-fennec-terracotta">
                                    CHF {filters.maxMonthlyBudget || 450} / mois
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
                                  <span>CHF 100 (Eco)</span>
                                  <span>CHF 500</span>
                                  <span>CHF 900+ (Premium)</span>
                                </div>
                              </div>

                              {/* Comparison priority */}
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-fennec-brown uppercase tracking-wider block">
                                  Votre objectif prioritaire
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                  {[
                                    { id: 'price', label: 'Économie maximale', desc: 'Priorité au tarif brut' },
                                    { id: 'coverage', label: 'Couverture maximale', desc: 'Remboursements LCA au top' },
                                    { id: 'reputation', label: 'Satisfaction & Service', desc: 'Assureur le mieux noté' },
                                    { id: 'flexibility', label: 'Flexibilité médicale', desc: 'Accès sans contrainte standard' },
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
                                  Vérification de sécurité
                                </h3>
                              </div>
                              <p className="text-xs text-fennec-dark/65 leading-relaxed">
                                Avant d'accéder au comparatif officiel des caisses maladie 2026, veuillez valider vos coordonnées. Un code de sécurité unique vous sera envoyé gratuitement.
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
                                        body: JSON.stringify({ type: 'health_pre_verify', lead: formData, filters })
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
                                        body: JSON.stringify({ type: 'health_verified', lead: formData, filters })
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
                                <strong>Message de Fenny :</strong> "Afin de valider votre dossier et de vous présenter les vraies primes certifiées 2026, un code de sécurité à 4 chiffres vient d'être généré et envoyé à l'adresse <strong>{formData.email || 'votre e-mail'}</strong> !"
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
                          <span>{currentStep === 7 ? "Étape de vérification" : "Continuer"}</span>
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
                    Ma situation actuelle
                  </h4>
                  {loadingReal ? (
                    <span className="text-[9px] font-black uppercase text-fennec-terracotta bg-fennec-cream/70 px-2 py-0.5 rounded-full animate-pulse">
                      Chargement...
                    </span>
                  ) : realPremiums.length > 0 ? (
                    <span className="text-[9px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Primes Officielles
                    </span>
                  ) : null}
                </div>
                
                <p className="text-[10px] text-fennec-dark/70 leading-relaxed">
                  Modifiez votre assureur actuel et votre prime payée pour recalculer instantanément vos économies réelles via la méthode <code className="font-mono font-bold text-[9px]">calculateSavings()</code>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-fennec-brown uppercase tracking-wider block">Mon assureur</label>
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
                    <label className="text-[9px] font-bold text-fennec-brown uppercase tracking-wider block">Ma prime (CHF)</label>
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
                  <span className="text-fennec-brown font-medium">Canton de résidence :</span>
                  <span className="font-bold text-fennec-dark">{selectedCantonName} ({filters.canton})</span>
                </div>
                <div className="flex justify-between p-2.5 bg-fennec-cream/10 rounded-xl">
                  <span className="text-fennec-brown font-medium">Code postal / NPA :</span>
                  <span className="font-bold text-fennec-dark">{filters.zipCode}</span>
                </div>
                <div className="flex justify-between p-2.5 bg-fennec-cream/10 rounded-xl">
                  <span className="text-fennec-brown font-medium">Zone de primes :</span>
                  <span className="font-bold text-fennec-dark">Région {filters.zone}</span>
                </div>
                <div className="flex justify-between p-2.5 bg-fennec-cream/10 rounded-xl">
                  <span className="text-fennec-brown font-medium">Catégorie d'âge :</span>
                  <span className="font-bold text-fennec-dark capitalize">
                    {filters.ageCategory === 'adult' ? 'Adulte (26+)' : filters.ageCategory === 'young' ? 'Jeune (19-25)' : 'Enfant (0-18)'}
                  </span>
                </div>
                <div className="flex justify-between p-2.5 bg-fennec-cream/10 rounded-xl">
                  <span className="text-fennec-brown font-medium">Franchise annuelle :</span>
                  <span className="font-bold text-fennec-dark">CHF {filters.franchise}.-</span>
                </div>
                <div className="flex justify-between p-2.5 bg-fennec-cream/10 rounded-xl">
                  <span className="text-fennec-brown font-medium">Modèle d'assurance :</span>
                  <span className="font-bold text-fennec-dark">
                    {filters.model === 'standard' ? 'Standard' : filters.model === 'telemed' ? 'Télémédecine' : filters.model === 'family' ? 'Médecin de Famille' : 'HMO'}
                  </span>
                </div>
                <div className="flex justify-between p-2.5 bg-fennec-cream/10 rounded-xl">
                  <span className="text-fennec-brown font-medium">Couverture Accident :</span>
                  <span className="font-bold text-fennec-dark">{filters.accidentCoverage ? 'Oui, incluse' : 'Non, exclue'}</span>
                </div>
                <div className="flex justify-between p-2.5 bg-fennec-cream/10 rounded-xl">
                  <span className="text-fennec-brown font-medium">Complémentaires :</span>
                  <span className="font-bold text-fennec-dark">
                    {!filters.supplementaryType || filters.supplementaryType === 'none'
                      ? "Assurance de base uniquement"
                      : filters.supplementaryType === 'essential' ? 'ESSENTIELLE'
                      : filters.supplementaryType === 'confort' ? 'CONFORT'
                      : 'PREMIUM'}
                  </span>
                </div>
              </div>

              {/* Toggle to fine-tune filters directly */}
              <div className="border-t border-fennec-cream/30 pt-4">
                <button
                  onClick={() => setShowFiltersInline(!showFiltersInline)}
                  className="w-full text-xs font-bold text-fennec-brown/80 hover:text-fennec-dark flex items-center justify-center p-2 rounded-xl border border-fennec-cream/50 bg-fennec-cream/5 transition-all"
                >
                  <span>{showFiltersInline ? 'Masquer les ajustements' : 'Ajuster les filtres directement'}</span>
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
                    <label className="text-[10px] font-bold uppercase tracking-wider text-fennec-brown block">Code Postal (NPA)</label>
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
                      <span>Canton: <span className="text-fennec-terracotta">{filters.canton}</span></span>
                      <span>Région: <span className="text-fennec-terracotta">{filters.zone}</span></span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-fennec-brown block">Modèle d'assurance</label>
                    <select
                      value={filters.model}
                      onChange={(e) => handleFilterChange('model', e.target.value as any)}
                      className="w-full bg-white border border-fennec-cream/60 rounded-xl px-2.5 py-1.5 text-xs text-fennec-dark focus:outline-none"
                    >
                      <option value="standard">Standard</option>
                      <option value="telemed">Télémédecine</option>
                      <option value="family">Médecin de famille</option>
                      <option value="hmo">Réseau HMO</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-fennec-brown block">Franchise</label>
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
                    <label className="text-[10px] font-bold uppercase tracking-wider text-fennec-brown block">Assurances complémentaires</label>
                    <select
                      value={filters.supplementaryType || 'none'}
                      onChange={(e) => handleFilterChange('supplementaryType', e.target.value as any)}
                      className="w-full bg-white border border-fennec-cream/60 rounded-xl px-2.5 py-1.5 text-xs text-fennec-dark focus:outline-none"
                    >
                      <option value="none">Aucune (uniquement base LAMal)</option>
                      <option value="essential">ESSENTIELLE</option>
                      <option value="confort">CONFORT</option>
                      <option value="premium">PREMIUM</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-fennec-brown block">Trier les résultats</label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange('sortBy', e.target.value as any)}
                      className="w-full bg-white border border-fennec-cream/60 rounded-xl px-2.5 py-1.5 text-xs text-fennec-dark focus:outline-none"
                    >
                      <option value="price">Primes les moins chères</option>
                      <option value="rating">Satisfaction client</option>
                      <option value="name">Ordre alphabétique</option>
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
                  <span className="text-[10px] font-bold text-fennec-brown uppercase tracking-wider block">Votre simulation</span>
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
                  <span>Ajuster</span>
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
                        Économie potentielle : <span className="text-fennec-red font-black">jusqu'à CHF {estimatedSavings}.- / an</span>
                      </h4>
                      <p className="text-xs text-emerald-800/80">
                        C'est l'écart moyen constaté dans votre canton entre l'offre la plus chère et l'offre la plus compétitive.
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-display font-black text-xs uppercase tracking-wider shadow-xs">
                    Conseil Malin
                  </div>
                </div>
              )}

              {/* Actual list of companies */}
              <div className="space-y-4">
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
                          Le plus avantageux
                        </span>
                      )}

                      {/* Partner badge */}
                      {caisse.isPartner && !isCheapest && (
                        <span className="absolute top-0 left-0 bg-emerald-600 text-white text-[9px] font-bold uppercase py-1 px-4 rounded-br-2xl tracking-wider flex items-center">
                          <Check className="w-3 h-3 mr-1" />
                          Partenaire Officiel
                        </span>
                      )}

                      {/* Left: Brand logo & satisfaction */}
                      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                        {/* Real circular insurer logo badge */}
                        <CompanyLogo id={caisse.id} className="w-16 h-16 shrink-0" />

                        <div className="text-center sm:text-left">
                          <h4 className="font-display font-bold text-lg text-fennec-dark flex items-center justify-center sm:justify-start">
                            {caisse.name}
                            {caisse.isPartner && (
                              <span className="ml-2 w-2 h-2 rounded-full bg-emerald-500" title="Partenaire de souscription" />
                            )}
                          </h4>
                          <p className="text-xs text-fennec-brown font-medium mt-0.5">
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
                            <span className="text-[10px] text-fennec-brown font-semibold bg-fennec-cream/20 px-1.5 py-0.5 rounded-sm" title="Source : Enquête annuelle indépendante de satisfaction client Comparis / bonus.ch">
                              Comparis & bonus.ch
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Middle: Prime pricing */}
                      <div className="text-center sm:text-right shrink-0 space-y-1.5">
                        <div>
                          <span className="text-[10px] font-bold tracking-widest text-fennec-brown uppercase block">
                            Prime mensuelle 2026
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
                                Non disponible
                              </span>
                            )}
                          </div>
                          {caisse.computedPremium > 0 && (
                            <span className="text-[10px] text-fennec-dark/60 block">
                              Sans frais additionnels
                            </span>
                          )}
                        </div>

                        {/* Official OFSP / priminfo Source Badge */}
                        {caisse.isRealData ? (
                          <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-150 text-[9px] text-emerald-800 font-bold">
                            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Donnée Officielle OFSP</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-amber-50 border border-amber-150 text-[9px] text-amber-800 font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span>Donnée Estimée 2026</span>
                          </div>
                        )}

                        {/* Real retrieved model name */}
                        {caisse.realModelName && (
                          <div className="text-[9px] text-fennec-dark/70 font-mono italic block text-center sm:text-right">
                            Modèle : {caisse.realModelName}
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
                              : caisse.isPartner
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                              : 'bg-fennec-cream hover:bg-fennec-sand text-fennec-dark'
                          }`}
                        >
                          <span>{caisse.computedPremium === 0 ? 'Indisponible' : "Obtenir l'offre"}</span>
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
                  Conformité Légale LAMal & Transparence :
                </h5>
                <p>
                  <strong>Prestations de base identiques :</strong> Les prestations de l'assurance obligatoire des soins (AOS) sont définies de manière univoque par la loi fédérale (LAMal). Elles sont <strong>strictement identiques</strong> auprès de toutes les caisses maladie suisses. Un traitement médical sera remboursé de la même manière, quel que soit l'assureur choisi. Seuls diffèrent la qualité administrative, l'ergonomie des outils de remboursement et l'indice de satisfaction.
                </p>
                <p>
                  <strong>Origine des notes de satisfaction client (indices / 6) :</strong> Les notes affichées (exprimées sur l'échelle officielle helvétique de 1 à 6, où 6 est la note maximale) proviennent directement des rapports d'enquêtes représentatifs de satisfaction client publiés de manière indépendante par <strong>Comparis et bonus.ch (enquêtes 2025/2026)</strong>. Ces notes mesurent la rapidité des remboursements, l'amabilité et la clarté des décomptes.
                </p>
                <p>
                  <strong>Calcul rigoureux des Primes par Franchise :</strong> Contrairement aux approximations forfaitaires à pourcentage fixe, les primes affichées intègrent le barème exact des rabais fédéraux maximaux autorisés par l'OFSP selon l'article 93 de l'OAMal. Choisir une franchise plus élevée (comme CHF 2'500) accorde une réduction mensuelle légale forfaitaire de CHF 128.30 (CHF 1'540/an) par rapport à la franchise de base de CHF 300, plafonnée à 70% de la prime standard pour assurer une parfaite fidélité aux valeurs officielles 2026.
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
                />
              </div>
              <div>
                <span className="text-[10px] font-bold text-fennec-terracotta uppercase tracking-wider block">
                  Offre Gratuite Fenny
                </span>
                <h4 className="font-display font-extrabold text-xl text-fennec-dark">
                  Votre offre {selectedCaisse.name}
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
                    Saisissez vos coordonnées pour recevoir votre dossier d'offre complet pour l'assurance obligatoire <strong>{selectedCaisse.name}</strong> en modèle <strong>{filters.model === 'family' ? 'Médecin de Famille' : filters.model === 'telemed' ? 'Télémédecine' : filters.model === 'hmo' ? 'HMO' : 'Standard'}</strong>, Franchise <strong>CHF {filters.franchise}.-</strong> dans le canton de <strong>{filters.canton}</strong>.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="modal-stagger-item space-y-1.5">
                      <label className="text-xs font-bold text-fennec-dark block">Prénom *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ex: Marc"
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
                      <label className="text-xs font-bold text-fennec-dark block">Nom de famille *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ex: Bernasconi"
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
                    <label className="text-xs font-bold text-fennec-dark block">Adresse E-mail *</label>
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
                    <label className="text-xs font-bold text-fennec-dark block">Téléphone Mobile Suisse *</label>
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
                    <label className="text-xs font-bold text-fennec-dark block">Quand préférez-vous être rappelé ?</label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData(prev => ({...prev, timeSlot: e.target.value}))}
                      className="w-full bg-white border border-fennec-cream/70 rounded-xl px-3 py-2 text-base md:text-sm text-fennec-dark focus:outline-none focus:border-fennec-tan font-medium"
                    >
                      <option value="anytime">N'importe quand (9h00 - 18h00)</option>
                      <option value="morning">Le matin (9h00 - 12h00)</option>
                      <option value="lunch">Pause déjeuner (12h00 - 14h00)</option>
                      <option value="afternoon">L'après-midi (14h00 - 17h00)</option>
                      <option value="evening">En fin de journée (17h00 - 19h00)</option>
                    </select>
                  </div>

                  {formError && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs font-bold rounded-xl border border-red-200">
                      Veuillez remplir tous les champs requis.
                    </div>
                  )}

                  <div className="modal-stagger-item pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-fennec-terracotta hover:bg-fennec-dark text-white font-display font-extrabold text-sm rounded-full shadow-md shadow-fennec-terracotta/20 transition-all flex items-center justify-center space-x-2"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Valider ma demande gratuite</span>
                    </button>
                    <span className="text-[10px] text-fennec-dark/50 text-center block mt-2">
                      🔒 Données cryptées sécurisées. Aucun spam garanti. Politique nLPD respectée.
                    </span>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="inline-flex p-3 bg-emerald-100 text-emerald-600 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h5 className="font-display font-extrabold text-xl text-emerald-900">
                    Demande transmise avec succès !
                  </h5>
                  <p className="text-sm text-fennec-dark/80 max-w-sm mx-auto">
                    Félicitations <strong>{formData.firstName}</strong> ! Votre demande d'offre gratuite a bien été transmise à notre partenaire.
                  </p>
                  <p className="text-xs text-fennec-dark/70 leading-relaxed bg-fennec-cream/10 p-4 rounded-xl border border-fennec-cream/30">
                    Un conseiller agréé indépendant va analyser votre dossier et vous contactera par téléphone d'ici quelques heures (créneau souhaité : {formData.timeSlot === 'anytime' ? 'N\'importe quand' : formData.timeSlot === 'morning' ? 'Matinée' : formData.timeSlot === 'lunch' ? 'Pause déjeuner' : formData.timeSlot === 'afternoon' ? 'Après-midi' : 'Soirée'}). Votre prime finale est garantie neutre !
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
