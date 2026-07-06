/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ASSUREURS_VIE, getLifeInsuranceEstimate } from '../data';
import { LifeFilterState, AssureurVie } from '../types';
import fenyWinking from '../assets/images/feny_winking_1783331270164.jpg';
import { 
  Shield, 
  PiggyBank, 
  Sparkles, 
  Filter, 
  ChevronRight, 
  ChevronLeft,
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
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import CompanyLogo from './CompanyLogo';

const LIFE_ADVICE_MAP: Record<string, string> = {
  type: "Le Pilier 3a (Lié) offre d'excellentes déductions d'impôts directes mais reste bloqué. Le Pilier 3b (Libre) est totalement flexible pour des retraits libres à tout moment.",
  monthlyAmount: "Chaque franc épargné réduit votre revenu imposable suisse. Le plafond de versement pour salariés est fixé à CHF 7'258.- par an.",
  duration: "Une durée d'épargne longue maximise le rendement grâce aux intérêts composés et lisse l'effet des fluctuations des marchés boursiers.",
  profile: "Votre profil permet d'ajuster les clauses de protection décès/invalidité pour votre foyer avec vos objectifs de capital de retraite.",
  priority: "Votre priorité configure l'orientation de placement: capital garanti pour une sécurité totale, ou actions pour un rendement maximal historique.",
  firstName: "Votre prénom est nécessaire pour personnaliser votre dossier gratuit et votre projection fiscale.",
  lastName: "Votre nom de famille est requis par les compagnies d'assurance suisses pour générer une simulation officielle et nominative.",
  email: "Votre adresse e-mail nous permet de vous transmettre instantanément votre comparatif de rendement et gain fiscal en PDF.",
  phone: "Votre mobile suisse valide permet à notre conseiller d'ajuster la simulation avec vos données communales réelles.",
};

export default function LifePensionComparator() {
  // 1. Core State
  const [filters, setFilters] = useState<LifeFilterState>({
    type: '3a',
    profile: 'young',
    priority: 'tax-saving',
  });

  const [monthlyAmount, setMonthlyAmount] = useState<number>(300);
  const [duration, setDuration] = useState<number>(25);

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

  // Pillar 3a maximum limits reference
  const currentCeilingSalaried = 7258;
  const currentCeilingIndependent = 36288;

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
      else if (currentStep === 2) setFenyAdvice(LIFE_ADVICE_MAP.monthlyAmount);
      else if (currentStep === 3) setFenyAdvice(LIFE_ADVICE_MAP.duration);
      else if (currentStep === 4) setFenyAdvice(LIFE_ADVICE_MAP.profile);
      else if (currentStep === 5) setFenyAdvice(LIFE_ADVICE_MAP.priority);
    } else {
      setFenyAdvice(null);
    }
  }, [currentStep, quizMode]);

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
    return list.map((company) => {
      const estimate = getLifeInsuranceEstimate(
        company,
        filters.type,
        monthlyAmount,
        duration,
        filters.priority
      );
      return {
        ...company,
        ...estimate,
      };
    });
  }, [filters, monthlyAmount, duration]);

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
          /* ========================================== */
          /*         PROGRESSIVE QUESTIONNAIRE FLOW     */
          /* ========================================== */
          <motion.div
            key="pension-quiz"
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

            {/* Step Contents */}
            <div ref={stepContainerRef} className="min-h-[240px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: TYPE OF PILLAR */}
                {currentStep === 1 && (
                  <motion.div
                    key="p-step-1"
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
                          Quel type de 3e Pilier souhaitez-vous simuler ?
                        </h3>
                      </div>
                      <p className="text-xs text-fennec-dark/65">
                        Le système de prévoyance suisse sépare le 3ème pilier en deux solutions fiscales et d'épargne.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { id: '3a', label: 'Pilier 3a (Lié)', desc: 'Idéal salariés & indépendants', details: 'Déductible à 100% des impôts suisses' },
                        { id: '3b', label: 'Pilier 3b (Libre)', desc: 'Idéal épargne sans plafond', details: 'Retrait flexible à tout moment' },
                        { id: 'all', label: 'Mixte / Les Deux', desc: 'Découvrir toutes les options', details: 'Prévoyance globale sur-mesure' },
                      ].map((t) => {
                        const isSelected = filters.type === t.id;
                        return (
                          <motion.button
                            key={t.id}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              handleFilterChange('type', t.id as any);
                              setTimeout(() => nextStep(), 150);
                            }}
                            className={`stagger-item p-5 rounded-2xl border text-left flex flex-col justify-between transition-all min-h-[120px] ${
                              isSelected
                                ? 'bg-fennec-terracotta text-white border-fennec-terracotta shadow-md'
                                : 'border-fennec-cream text-fennec-dark bg-fennec-cream/5 hover:bg-fennec-cream/15'
                            }`}
                          >
                            <div>
                              <span className="font-display font-black text-base block">{t.label}</span>
                              <span className="text-xs opacity-90 font-medium block mt-1">{t.desc}</span>
                            </div>
                            <span className={`text-[10px] block mt-4 font-semibold ${isSelected ? 'text-white/80' : 'text-fennec-brown'}`}>
                              {t.details}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: MONTHLY AMOUNT */}
                {currentStep === 2 && (
                  <motion.div
                    key="p-step-2"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-fennec-terracotta">
                        <PiggyBank className="w-5 h-5" />
                        <h3 className="font-display font-black text-xl text-fennec-dark">
                          Combien souhaitez-vous épargner par mois ?
                        </h3>
                      </div>
                      <p className="text-xs text-fennec-dark/65">
                        Déterminez votre montant cible d'épargne. Vous pouvez l'ajuster à tout moment par la suite.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {[100, 200, 300, 500, 604].map((amount) => {
                        const isSelected = monthlyAmount === amount;
                        return (
                          <motion.button
                            key={amount}
                            type="button"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                              setMonthlyAmount(amount);
                              setTimeout(() => nextStep(), 150);
                            }}
                            className={`stagger-item p-4 rounded-2xl border text-center transition-all ${
                              isSelected
                                ? 'bg-fennec-terracotta text-white border-fennec-terracotta shadow-md font-extrabold'
                                : 'border-fennec-cream text-fennec-dark bg-fennec-cream/5 hover:bg-fennec-cream/15'
                            }`}
                          >
                            <span className="text-[9px] block opacity-60 uppercase font-bold">Mensuel</span>
                            <span className="font-display text-sm block mt-0.5">CHF {amount}</span>
                            <span className="text-[8px] text-fennec-brown block mt-1">
                              {amount === 604 ? 'Plafond Salarié' : amount >= 500 ? 'Épargne Forte' : 'Idéal débutant'}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between items-center text-xs font-bold text-fennec-brown">
                        <span>Ajustement libre</span>
                        <span className="text-fennec-terracotta font-black text-sm">CHF {monthlyAmount}.- / mois</span>
                      </div>
                      <input 
                        type="range"
                        min="50"
                        max="1000"
                        step="50"
                        value={monthlyAmount}
                        onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                        className="w-full accent-fennec-terracotta cursor-pointer"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: DURATION */}
                {currentStep === 3 && (
                  <motion.div
                    key="p-step-3"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-fennec-terracotta">
                        <TrendingUp className="w-5 h-5" />
                        <h3 className="font-display font-black text-xl text-fennec-dark">
                          Sur combien d'années souhaitez-vous épargner ?
                        </h3>
                      </div>
                      <p className="text-xs text-fennec-dark/65">
                        La durée recommandée correspond généralement aux années restantes jusqu'à l'âge légal de votre retraite.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {[10, 15, 20, 25, 30].map((years) => {
                        const isSelected = duration === years;
                        return (
                          <motion.button
                            key={years}
                            type="button"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                              setDuration(years);
                              setTimeout(() => nextStep(), 150);
                            }}
                            className={`stagger-item p-4 rounded-2xl border text-center transition-all ${
                              isSelected
                                ? 'bg-fennec-tan text-white border-fennec-tan shadow-md font-extrabold'
                                : 'border-fennec-cream text-fennec-dark bg-fennec-cream/5 hover:bg-fennec-cream/15 font-semibold'
                            }`}
                          >
                            <span className="text-[9px] block opacity-60 uppercase font-bold">Durée</span>
                            <span className="font-display text-sm block mt-0.5">{years} Ans</span>
                            <span className="text-[8px] text-fennec-brown block mt-1">
                              {years >= 25 ? 'Meilleurs intérêts' : 'Horizon moyen'}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between items-center text-xs font-bold text-fennec-brown">
                        <span>Ajustement libre</span>
                        <span className="text-fennec-terracotta font-black text-sm">{duration} ans</span>
                      </div>
                      <input 
                        type="range"
                        min="5"
                        max="45"
                        step="1"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-full accent-fennec-terracotta cursor-pointer"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: PREVOYANCE PROFILE */}
                {currentStep === 4 && (
                  <motion.div
                    key="p-step-4"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-fennec-terracotta">
                        <Info className="w-5 h-5" />
                        <h3 className="font-display font-black text-xl text-fennec-dark">
                          Quel est votre profil d'épargnant en Suisse ?
                        </h3>
                      </div>
                      <p className="text-xs text-fennec-dark/65">
                        Afin d'optimiser le rendement ou de prévoir des couvertures décès/invalidité adaptées, indiquez votre situation.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: 'young', label: 'Jeune actif', desc: 'Entrée dans la vie professionnelle', focus: 'Rendement & Fiscalité' },
                        { id: 'family', label: 'Famille', desc: 'Besoin de protection conjointe/enfants', focus: 'Sécurité & Couverture Décès' },
                        { id: 'independent', label: 'Indépendant(e)', desc: 'Sans caisse de pension LPP obligatoire', focus: 'Épargne forte & Déduction max' },
                        { id: 'senior', label: 'Sénior', desc: 'Proche de la retraite légale', focus: 'Sécurisation intégrale du capital' },
                      ].map((profile) => {
                        const isSelected = filters.profile === profile.id;
                        return (
                          <motion.button
                            key={profile.id}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              handleFilterChange('profile', profile.id as any);
                              setTimeout(() => nextStep(), 150);
                            }}
                            className={`stagger-item p-4 rounded-2xl border text-left flex flex-col justify-between transition-all min-h-[90px] ${
                              isSelected
                                ? 'bg-fennec-terracotta text-white border-fennec-terracotta shadow-md'
                                : 'border-fennec-cream text-fennec-dark bg-fennec-cream/5 hover:bg-fennec-cream/15'
                            }`}
                          >
                            <div>
                              <span className="font-display font-bold text-base block">{profile.label}</span>
                              <span className="text-xs opacity-90 block mt-0.5">{profile.desc}</span>
                            </div>
                            <span className="text-[10px] block font-semibold uppercase mt-3 tracking-wider opacity-75">
                              Axe principal : {profile.focus}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: PRIORITY */}
                {currentStep === 5 && (
                  <motion.div
                    key="p-step-5"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-fennec-terracotta">
                        <Award className="w-5 h-5" />
                        <h3 className="font-display font-black text-xl text-fennec-dark">
                          Quelle est votre priorité majeure ?
                        </h3>
                      </div>
                      <p className="text-xs text-fennec-dark/65">
                        Sélectionnez la finalité absolue pour votre 3e pilier afin d'orienter le comparatif de fonds d'investissement.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { id: 'tax-saving', label: 'Baisse d\'impôt immédiate maximale', desc: 'Vous ciblez l\'avantage fiscal annuel de la Confédération en priorité.' },
                        { id: 'high-yield', label: 'Rendement de placement élevé (Fonds/Actions)', desc: 'Vous acceptez une volatilité modérée en échange de gains d\'intérêts supérieurs.' },
                        { id: 'guaranteed', label: 'Sécurité maximale (Capital garanti à 100%)', desc: 'Vous exigez une certitude contractuelle absolue sur le montant final sans aucun risque.' },
                      ].map((priority) => {
                        const isSelected = filters.priority === priority.id;
                        return (
                          <motion.button
                            key={priority.id}
                            type="button"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => {
                              handleFilterChange('priority', priority.id as any);
                            }}
                            className={`stagger-item p-4 rounded-2xl border text-left flex flex-col sm:flex-row justify-between sm:items-center transition-all ${
                              isSelected
                                ? 'bg-fennec-terracotta text-white border-fennec-terracotta shadow-md'
                                : 'border-fennec-cream text-fennec-dark bg-fennec-cream/5 hover:bg-fennec-cream/15'
                            }`}
                          >
                            <div className="space-y-0.5">
                              <span className="font-display font-bold text-base block">{priority.label}</span>
                              <span className="text-xs opacity-80 block max-w-lg">{priority.desc}</span>
                            </div>
                            {isSelected && (
                              <span className="text-xs font-black bg-white/20 px-2.5 py-1 rounded-full uppercase mt-2 sm:mt-0">
                                Sélectionné
                              </span>
                            )}
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
                    alt="Feny" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-black text-fennec-terracotta uppercase tracking-wider block">
                    Feny conseille
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
            key="results-pension"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            
            {/* LEFT FILTER & PROFILE CONTROLLER */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-fennec-cream p-6 shadow-sm space-y-6 sticky top-4">
              
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
            <div className="lg:col-span-8 space-y-6">
              
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

              {/* Results list */}
              <div className="space-y-4">
                {simulatedResults.map((company) => {
                  return (
                    <div 
                      key={company.id}
                      className="bg-white rounded-3xl border border-fennec-cream/40 p-6 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6"
                    >
                      {/* Left: Logo and description */}
                      <div className="flex items-center space-x-4 w-full md:w-auto shrink-0">
                        {/* Real company logo */}
                        <CompanyLogo id={company.id} className="w-14 h-14 shrink-0" />
                        <div>
                          <h4 className="font-display font-bold text-lg text-fennec-dark">
                            {company.name}
                            {company.isPartner && (
                              <span className="ml-2 px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-bold rounded">
                                Partenaire
                              </span>
                            )}
                          </h4>
                          
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

                      {/* Middle: Projections metrics */}
                      <div className="grid grid-cols-2 gap-6 text-center md:text-right w-full md:w-auto border-y md:border-y-0 md:border-x border-fennec-cream/20 py-4 md:py-0 md:px-6">
                        <div>
                          <span className="text-[10px] font-bold text-fennec-brown uppercase block">
                            Capital Garanti
                          </span>
                          <span className="text-lg font-display font-extrabold text-fennec-dark block">
                            CHF {company.guaranteedSum.toLocaleString()}.-
                          </span>
                          <span className="text-[9px] text-fennec-dark/50 block">
                            Taux technique contractuel
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-emerald-700 uppercase block">
                            Capital Projeté (Fonds)
                          </span>
                          <span className="text-lg font-display font-black text-emerald-600 block">
                            CHF {company.expectedSum.toLocaleString()}.-
                          </span>
                          <span className="text-[9px] text-fennec-dark/50 block">
                            Sur la base de {filters.priority === 'high-yield' ? '~3.8%' : '~2.4%'} de rendement
                          </span>
                        </div>
                      </div>

                      {/* Right: CTA */}
                      <div className="w-full md:w-auto shrink-0 text-center md:text-right">
                        <button
                          onClick={() => handleOpenForm(company)}
                          className="w-full md:w-auto px-5 py-3 bg-fennec-dark hover:bg-fennec-terracotta text-white font-display font-bold text-xs rounded-full shadow-xs transition-colors inline-flex items-center justify-center"
                        >
                          <span>Simuler mon 3e pilier</span>
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>

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

            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================== */}
      /*      MODAL WINDOW FOR LIFE DEMAND          */
      /* ========================================== */
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
                  alt="Feny" 
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
