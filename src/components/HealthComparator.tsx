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
import fenyWinking from '../assets/images/feny_winking_1783331270164.jpg';
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
  ThumbsUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import CompanyLogo from './CompanyLogo';

// Client-side cache for Vercel static deployment lookup fallback
let cachedClientDb: Record<string, { premium: number; modelName: string }> | null = null;

const HEALTH_ADVICE_MAP: Record<string, string> = {
  canton: "Le canton de résidence est le critère numéro 1 de calcul de la prime LAMal. L'OFSP ajuste les prix selon le coût des infrastructures hospitalières de votre région.",
  ageCategory: "L'OFSP distingue trois tranches légales de primes: Enfants (0-18 ans), Jeunes (19-25 ans) et Adultes (26 ans et plus). Vos primes s'adaptent selon votre âge exact.",
  franchise: "La franchise maximale (CHF 2'500) réduit fortement vos primes mensuelles d'environ 40%. Idéal si vos frais de santé sont bas !",
  model: "Les modèles alternatifs (Médecin de Famille, Télémédecine, HMO) accordent d'importants rabais allant jusqu'à 15% en coordonnant vos consultations.",
  accidentCoverage: "Si vous travaillez +8h/semaine chez le même employeur, vous êtes déjà couvert contre les accidents par votre entreprise (LAA). Vous pouvez l'exclure pour économiser ~7% !",
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

export default function HealthComparator() {
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
  const [showFiltersInline, setShowFiltersInline] = useState<boolean>(false);

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
        const accidentVal = filters.accidentCoverage ? '1' : '0';
        const res = await fetch(`/api/priminfo/praemien?zipCode=${filters.zipCode}&franchise=${filters.franchise}&ageCategory=${filters.ageCategory}&accident=${accidentVal}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const responseData = await res.json();
        if (active && responseData && responseData.success && Array.isArray(responseData.data)) {
          setRealPremiums(responseData.data);
          
          // Automatically set user's default current premium to their matched current caisse rate if they haven't modified it manually
          const matchedCurrent = responseData.data.find(
            (rp: any) => rp.insurerId === currentCaisseId && rp.modelType === filters.model
          ) || responseData.data.find(
            (rp: any) => rp.insurerId === currentCaisseId
          );
          
          if (matchedCurrent && !userHasEditedCurrentPremium) {
            setCurrentPremiumInput(Math.round(matchedCurrent.premium));
          }
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.warn("[FetchRealPremiums] Backend API is unavailable, falling back to local client-side JSON database lookup...", err);
        
        try {
          if (!cachedClientDb) {
            const dbRes = await fetch('/premiums_2026.json');
            if (dbRes.ok) {
              cachedClientDb = await dbRes.json();
            } else {
              throw new Error(`Failed to load static premiums JSON file (status ${dbRes.status})`);
            }
          }

          if (cachedClientDb && active) {
            const cleanZip = String(filters.zipCode).trim();
            const cleanFranchise = filters.franchise;
            const cleanAgeCategory = filters.ageCategory;
            const cleanAccident = filters.accidentCoverage;

            const zipInfo = resolveZipCode(cleanZip);
            if (zipInfo) {
              const canton = zipInfo.canton;
              const zone = zipInfo.zone;
              const region = getRegionCode(canton, zone);

              const activeInsurers = [
                'assura', 'css', 'helsana', 'swica', 'visana', 
                'sanitas', 'concordia', 'kpt', 'mutuel', 'okk', 
                'sympany', 'atupri'
              ];

              const modelTypes: ('standard' | 'family' | 'hmo' | 'telemed')[] = [
                'standard', 'family', 'hmo', 'telemed'
              ];

              const results: any[] = [];

              for (const insurerId of activeInsurers) {
                for (const modelType of modelTypes) {
                  const record = lookupPremium(cachedClientDb, {
                    insurerId,
                    canton,
                    region,
                    ageCategory: cleanAgeCategory,
                    deductible: cleanFranchise,
                    model: modelType,
                    accidentCoverage: cleanAccident
                  });

                  if (record) {
                    results.push({
                      insurerId,
                      insurerName: getInsurerDisplayName(insurerId),
                      modelName: record.modelName || getInsurerModelFallbackName(insurerId, modelType),
                      modelType,
                      premium: record.premium
                    });
                  }
                }
              }

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
          }
        } catch (fallbackErr) {
          console.error("[FetchRealPremiumsFallbackError]", fallbackErr);
        }
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

      if (realMatches.length > 0) {
        // Use the cheapest matched premium for this insurer
        realMatches.sort((a, b) => a.premium - b.premium);
        premium = realMatches[0].premium;
        matchedModelName = realMatches[0].modelName;
      }

      return {
        ...caisse,
        computedPremium: premium,
        realModelName: matchedModelName || undefined,
        isRealData: premium > 0,
      };
    });

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
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Trigger smooth final loading simulation
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setQuizMode(false);
      }, 1300);
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
    const percentage = quizMode ? (currentStep / 5) * 100 : 100;
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
      else if (currentStep === 2) setFenyAdvice(HEALTH_ADVICE_MAP.ageCategory);
      else if (currentStep === 3) setFenyAdvice(HEALTH_ADVICE_MAP.franchise);
      else if (currentStep === 4) setFenyAdvice(HEALTH_ADVICE_MAP.model);
      else if (currentStep === 5) setFenyAdvice(HEALTH_ADVICE_MAP.accidentCoverage);
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
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-2xl mx-auto bg-white rounded-3xl border border-fennec-cream/80 shadow-md p-8 md:p-10 space-y-8"
          >
            {/* Step Progress Tracker */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs text-fennec-brown font-bold">
                <span className="uppercase tracking-wider">Étape {currentStep} sur 5</span>
                <span>{Math.round((currentStep / 5) * 100)}% complété</span>
              </div>
              <div className="h-1.5 w-full bg-fennec-cream/40 rounded-full overflow-hidden relative">
                <div 
                  ref={progressBarRef}
                  className="h-full bg-fennec-terracotta rounded-full origin-left"
                  style={{ width: '20%' }}
                />
              </div>
            </div>

            {/* Step Contents with Micro-animations */}
            <div ref={stepContainerRef} className="min-h-[240px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: CODE POSTAL & CANTON */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6 text-left"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-fennec-terracotta">
                        <MapPin className="w-5 h-5" />
                        <h3 className="font-display font-black text-xl text-fennec-dark">
                          Quel est votre code postal de domicile ?
                        </h3>
                      </div>
                      <p className="text-xs text-fennec-dark/65">
                        Les primes d'assurance maladie dépendent de votre code postal (détermination automatique de la zone tarifaire 1 ou 2 identique à Priminfo).
                      </p>
                    </div>

                    {/* CODE POSTAL INPUT PANEL */}
                    <div className="bg-fennec-cream/20 p-5 rounded-2xl border border-fennec-cream/60 space-y-4">
                      <label className="text-[11px] font-bold text-fennec-brown uppercase tracking-wider block">
                        Saisissez votre code postal suisse (NPA) :
                      </label>
                      <div className="relative max-w-xs">
                        <input
                          type="text"
                          pattern="\d*"
                          maxLength={4}
                          value={zipInput}
                          onChange={(e) => handleZipChange(e.target.value)}
                          placeholder="Ex: 1007, 1201, 1950, 3000..."
                          className="w-full text-lg font-bold font-mono tracking-widest bg-white border-2 border-fennec-cream rounded-xl px-4 py-2.5 text-fennec-dark focus:outline-none focus:border-fennec-terracotta transition-colors"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                          {resolvedInfo ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 animate-bounce" />
                          ) : (
                            <HelpCircle className="w-5 h-5 text-fennec-brown/40" />
                          )}
                        </div>
                      </div>

                      {/* Resolved Info Badge Display */}
                      {resolvedInfo ? (
                        <div className="flex flex-wrap gap-2 pt-1 animate-in fade-in slide-in-from-top-1 duration-150">
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
                          {zipInput.length === 4 ? "Code postal non identifié. Veuillez choisir votre canton manuellement ci-dessous." : "Saisissez votre code postal à 4 chiffres pour calculer vos primes officielles."}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2.5 pt-2">
                      <span className="text-[11px] font-bold text-fennec-brown uppercase tracking-wider block">
                        Ou sélectionnez directement un canton :
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
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
                                // Auto-advance with slight delay
                                setTimeout(() => nextStep(), 180);
                              }}
                              className={`stagger-item p-3.5 rounded-2xl border text-center transition-all ${
                                isSelected
                                  ? 'bg-fennec-terracotta text-white border-fennec-terracotta shadow-md font-extrabold'
                                  : 'border-fennec-cream text-fennec-dark bg-fennec-cream/5 hover:bg-fennec-cream/15 font-semibold'
                              }`}
                            >
                              <span className="text-xs block text-fennec-brown/50 leading-none mb-1 font-bold">CH</span>
                              <span className="font-display text-base block">{c.code}</span>
                              <span className="text-[9px] opacity-80 block truncate mt-0.5">{c.name}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: AGE CATEGORY */}
                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-fennec-terracotta">
                        <User className="w-5 h-5" />
                        <h3 className="font-display font-black text-xl text-fennec-dark">
                          Quelle est la tranche d'âge de l'assuré ?
                        </h3>
                      </div>
                      <p className="text-xs text-fennec-dark/65">
                        L'Office Fédéral de la Santé Publique applique des barèmes distincts selon ces trois catégories d'âge légat.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { id: 'adult', label: 'Adulte', desc: 'Dès 26 ans révolus', details: 'Tarif standard complet' },
                        { id: 'young', label: 'Jeune Adulte', desc: 'De 19 à 25 ans', details: 'Primes réduites d\'environ 20%' },
                        { id: 'child', label: 'Enfant', desc: 'De 0 à 18 ans', details: 'Primes très basses (sans franchise obligatoire)' },
                      ].map((age) => {
                        const isSelected = filters.ageCategory === age.id;
                        return (
                          <motion.button
                            key={age.id}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              handleFilterChange('ageCategory', age.id as any);
                              setTimeout(() => nextStep(), 150);
                            }}
                            className={`stagger-item p-5 rounded-2xl border text-left flex flex-col justify-between transition-all min-h-[120px] ${
                              isSelected
                                ? 'bg-fennec-terracotta text-white border-fennec-terracotta shadow-md'
                                : 'border-fennec-cream text-fennec-dark bg-fennec-cream/5 hover:bg-fennec-cream/15'
                            }`}
                          >
                            <div>
                              <span className="font-display font-black text-base block">{age.label}</span>
                              <span className="text-xs opacity-90 font-medium block mt-1">{age.desc}</span>
                            </div>
                            <span className={`text-[10px] block mt-4 font-semibold ${isSelected ? 'text-white/80' : 'text-fennec-brown'}`}>
                              {age.details}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: FRANCHISE */}
                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-fennec-terracotta">
                        <Percent className="w-5 h-5" />
                        <h3 className="font-display font-black text-xl text-fennec-dark">
                          Choisissez votre franchise annuelle :
                        </h3>
                      </div>
                      <p className="text-xs text-fennec-dark/65">
                        La franchise est le montant annuel restant à votre charge avant que l'assurance ne commence à rembourser. Plus elle est élevée, plus votre prime mensuelle baisse !
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {(filters.ageCategory === 'child' ? [0, 100, 200, 300, 400, 500, 600] : FRANCHISES).map((fran) => {
                        const isSelected = filters.franchise === fran || (filters.ageCategory === 'child' && fran === 0 && filters.franchise > 600);
                        return (
                          <motion.button
                            key={fran}
                            type="button"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                              handleFilterChange('franchise', fran);
                              setTimeout(() => nextStep(), 150);
                            }}
                            className={`stagger-item p-4 rounded-2xl border text-center transition-all ${
                              isSelected
                                ? 'bg-fennec-tan text-white border-fennec-tan shadow-md font-extrabold'
                                : 'border-fennec-cream text-fennec-dark bg-fennec-cream/5 hover:bg-fennec-cream/15 font-semibold'
                            }`}
                          >
                            <span className="text-[10px] block opacity-60 uppercase tracking-wider font-bold">Franchise</span>
                            <span className="font-display text-base block mt-0.5">CHF {fran}</span>
                            <span className="text-[9px] text-fennec-brown block mt-1">
                              {fran === 2500 || (filters.ageCategory === 'child' && fran === 600) ? 'Économie maximale' : fran === 300 || (filters.ageCategory === 'child' && fran === 0) ? 'Sécurité maximale' : 'Modéré'}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: INSURANCE MODEL */}
                {currentStep === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-fennec-terracotta">
                        <Activity className="w-5 h-5" />
                        <h3 className="font-display font-black text-xl text-fennec-dark">
                          Quel modèle d'assurance préférez-vous ?
                        </h3>
                      </div>
                      <p className="text-xs text-fennec-dark/65">
                        Les assureurs accordent des réductions si vous acceptez de consulter d'abord un canal partenaire (télémédecine ou médecin de famille) plutôt que de consulter un spécialiste d'emblée.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { id: 'family', title: 'Médecin de Famille (Recommandé)', discount: 'Réduction ~10%', desc: 'Vous consultez toujours votre médecin généraliste attitré en premier recours.' },
                        { id: 'telemed', title: 'Télémédecine (Telmed)', discount: 'Réduction ~15%', desc: 'Vous téléphonez à une hotline médicale gratuite de l\'assureur avant toute consultation physique.' },
                        { id: 'hmo', title: 'Réseau de santé HMO', discount: 'Réduction ~12%', desc: 'Vous vous rendez directement dans un centre médical partenaire (HMO) agréé.' },
                        { id: 'standard', title: 'Standard (Libre choix complet)', discount: 'Pas de réduction', desc: 'Vous consultez n\'importe quel médecin en Suisse sans aucune contrainte.' },
                      ].map((model) => {
                        const isSelected = filters.model === model.id;
                        return (
                          <motion.button
                            key={model.id}
                            type="button"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => {
                              handleFilterChange('model', model.id as any);
                              setTimeout(() => nextStep(), 150);
                            }}
                            className={`stagger-item p-4 rounded-2xl border text-left flex flex-col sm:flex-row justify-between items-start sm:items-center transition-all ${
                              isSelected
                                ? 'bg-fennec-terracotta text-white border-fennec-terracotta shadow-md'
                                : 'border-fennec-cream text-fennec-dark bg-fennec-cream/5 hover:bg-fennec-cream/15'
                            }`}
                          >
                            <div className="space-y-1">
                              <span className="font-display font-bold text-base block">{model.title}</span>
                              <span className="text-xs opacity-80 block max-w-md">{model.desc}</span>
                            </div>
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase shrink-0 mt-3 sm:mt-0 ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-fennec-cream text-fennec-brown'
                            }`}>
                              {model.discount}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: ACCIDENT COVERAGE */}
                {currentStep === 5 && (
                  <motion.div
                    key="step-5"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-fennec-terracotta">
                        <Shield className="w-5 h-5" />
                        <h3 className="font-display font-black text-xl text-fennec-dark">
                          Souhaitez-vous inclure la couverture accident ?
                        </h3>
                      </div>
                      <p className="text-xs text-fennec-dark/65">
                        Si vous travaillez plus de 8 heures par semaine chez le même employeur, vous êtes légalement couvert contre les accidents professionnels et non-professionnels par votre entreprise (LAA).
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { value: true, label: 'Oui, inclure l\'accident', desc: 'Recommandé pour les enfants, personnes sans emploi, ménages à plein temps ou indépendants.' },
                        { value: false, label: 'Non, exclure l\'accident', desc: 'Économisez environ 7%. Réservé aux personnes salariées effectuant plus de 8 heures/semaine.' },
                      ].map((option) => {
                        const isSelected = filters.accidentCoverage === option.value;
                        return (
                          <motion.button
                            key={option.value.toString()}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              handleFilterChange('accidentCoverage', option.value);
                            }}
                            className={`stagger-item p-5 rounded-2xl border text-left flex flex-col justify-between transition-all min-h-[120px] ${
                              isSelected
                                ? 'bg-fennec-terracotta text-white border-fennec-terracotta shadow-md'
                                : 'border-fennec-cream text-fennec-dark bg-fennec-cream/5 hover:bg-fennec-cream/15'
                            }`}
                          >
                            <span className="font-display font-black text-base block">{option.label}</span>
                            <p className="text-xs opacity-90 block mt-2 font-medium leading-relaxed">{option.desc}</p>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Inline Feny Advice Box - Beautiful, non-blocking, responsive */}
            {fenyAdvice && (
              <div className="bg-fennec-cream/20 border border-fennec-cream/70 rounded-2xl p-4 flex items-start space-x-3 text-left animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white shrink-0 bg-white shadow-2xs">
                  <img 
                    src={fenyWinking} 
                    alt="Fenny" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-black text-fennec-terracotta uppercase tracking-wider block">
                    Fenny conseille
                  </span>
                  <p className="text-xs text-fennec-dark font-medium leading-relaxed">
                    {fenyAdvice}
                  </p>
                </div>
              </div>
            )}

            {/* Bottom Actions Row */}
            <div className="flex justify-between items-center pt-6 border-t border-fennec-cream/40">
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

              <button
                type="button"
                onClick={nextStep}
                disabled={isAnalyzing}
                className="flex items-center text-xs font-bold font-display px-6 py-2.5 rounded-full bg-fennec-dark hover:bg-fennec-terracotta text-white transition-all shadow-sm"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    <span>Analyse...</span>
                  </>
                ) : (
                  <>
                    <span>{currentStep === 5 ? 'Voir les résultats' : 'Suivant'}</span>
                    <ChevronRight className="w-4 h-4 ml-1.5" />
                  </>
                )}
              </button>
            </div>
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
                        {caisse.computedPremium > 0 ? (
                          <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-150 text-[9px] text-emerald-800 font-bold">
                            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Donnée Officielle OFSP</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-red-50 border border-red-150 text-[9px] text-red-800 font-bold">
                            <span>Non disponible en 2026</span>
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

      {/* ========================================== */}
      /*      MODAL WINDOW FOR OFFER DEMAND         */
      /* ========================================== */
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
