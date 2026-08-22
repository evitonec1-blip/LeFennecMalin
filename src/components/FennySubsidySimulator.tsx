/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Fenny Subsidy Interactive Simulator (Simulateur Fenny de Subside d'Assurance Maladie)
 * Mobile-first, friendly, conversion-optimized, compliant with Swiss cantonal rules (2026).
 */

import React, { useState, useEffect } from 'react';
import {
  Coins,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Building2,
  ExternalLink,
  RotateCcw,
  Sparkles,
  Users,
  User,
  GraduationCap,
  Briefcase,
  Home,
  ShieldCheck,
  Calendar,
  FileText,
  Percent,
  Check,
  TrendingDown
} from 'lucide-react';
import {
  CantonCode,
  HouseholdType,
  TrainingStatus,
  ResidenceStatus,
  IncomeBracket,
  UserProfile,
  SubsidyEstimate
} from '../subsidy/types';
import { calculateSubsidyEligibility } from '../subsidy/calculator';
import { trackSubsidyEvent } from '../subsidy/analytics';

// Mascot image imports
import fenyWinking from '../assets/images/feny_mascot_avatar_1783245725195.jpg';
import fenyAnalyse from '../assets/images/IMG_20260804_161612_upscaled.jpg';
import fenyResults from '../assets/images/feny_mascot_compare_1783245694484.jpg';

interface Props {
  initialCanton?: CantonCode | string;
  onStartHealthComparison?: (cantonCode?: string) => void;
  onNavigateCantonGuide?: (cantonSlug: string) => void;
}

const SWISS_CANTONS: { code: CantonCode; name: string; region: 'romandie' | 'alemanique' | 'tessin'; slug: string }[] = [
  { code: 'GE', name: 'Genève', region: 'romandie', slug: 'geneve' },
  { code: 'VD', name: 'Vaud', region: 'romandie', slug: 'vaud' },
  { code: 'VS', name: 'Valais', region: 'romandie', slug: 'valais' },
  { code: 'FR', name: 'Fribourg', region: 'romandie', slug: 'fribourg' },
  { code: 'NE', name: 'Neuchâtel', region: 'romandie', slug: 'neuchatel' },
  { code: 'JU', name: 'Jura', region: 'romandie', slug: 'jura' },
  { code: 'BE', name: 'Berne', region: 'romandie', slug: 'berne' },
  { code: 'ZH', name: 'Zürich', region: 'alemanique', slug: 'zurich' },
  { code: 'BS', name: 'Bâle-Ville', region: 'alemanique', slug: 'bale-ville' },
  { code: 'BL', name: 'Bâle-Campagne', region: 'alemanique', slug: 'bale-campagne' },
  { code: 'AG', name: 'Argovie', region: 'alemanique', slug: 'argovie' },
  { code: 'TI', name: 'Tessin', region: 'tessin', slug: 'tessin' },
  { code: 'SG', name: 'Saint-Gall', region: 'alemanique', slug: 'saint-gall' },
  { code: 'TG', name: 'Thurgovie', region: 'alemanique', slug: 'thurgovie' },
  { code: 'LU', name: 'Lucerne', region: 'alemanique', slug: 'lucerne' },
  { code: 'ZG', name: 'Zoug', region: 'alemanique', slug: 'zoug' },
  { code: 'SO', name: 'Soleure', region: 'alemanique', slug: 'soleure' },
  { code: 'SH', name: 'Schaffhouse', region: 'alemanique', slug: 'schaffhouse' },
  { code: 'AR', name: 'Appenzell R.-E.', region: 'alemanique', slug: 'appenzell-ar' },
  { code: 'AI', name: 'Appenzell R.-I.', region: 'alemanique', slug: 'appenzell-ai' },
  { code: 'GR', name: 'Grisons', region: 'alemanique', slug: 'grisons' },
  { code: 'GL', name: 'Glaris', region: 'alemanique', slug: 'glaris' },
  { code: 'NW', name: 'Nidwald', region: 'alemanique', slug: 'nidwald' },
  { code: 'OW', name: 'Obwald', region: 'alemanique', slug: 'obwald' },
  { code: 'UR', name: 'Uri', region: 'alemanique', slug: 'uri' },
  { code: 'SZ', name: 'Schwytz', region: 'alemanique', slug: 'schwyz' },
];

export default function FennySubsidySimulator({
  initialCanton,
  onStartHealthComparison,
  onNavigateCantonGuide,
}: Props) {
  // Step tracker: 1 = Canton, 2 = Household, 3 = Members, 4 = Training, 5 = Income, 6 = Residence, 7 = Results
  const [step, setStep] = useState<number>(1);
  const [regionFilter, setRegionFilter] = useState<'all' | 'romandie' | 'alemanique'>('romandie');

  // User Profile State
  const [canton, setCanton] = useState<CantonCode>(() => {
    if (initialCanton) {
      const upper = initialCanton.toUpperCase() as CantonCode;
      if (SWISS_CANTONS.some((c) => c.code === upper)) return upper;
    }
    return 'GE';
  });

  const [householdType, setHouseholdType] = useState<HouseholdType>('single');
  const [adultsCount, setAdultsCount] = useState<number>(1);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [youngAdultsInTrainingCount, setYoungAdultsInTrainingCount] = useState<number>(0);
  const [trainingStatus, setTrainingStatus] = useState<TrainingStatus>('none');
  const [incomeBracket, setIncomeBracket] = useState<IncomeBracket>('30k_40k');
  const [exactIncome, setExactIncome] = useState<string>('');
  const [residenceStatus, setResidenceStatus] = useState<ResidenceStatus>('resident');

  // Result state
  const [result, setResult] = useState<SubsidyEstimate | null>(null);

  // Sync initialCanton if provided
  useEffect(() => {
    if (initialCanton) {
      const upper = initialCanton.toUpperCase() as CantonCode;
      if (SWISS_CANTONS.some((c) => c.code === upper)) {
        setCanton(upper);
      }
    }
  }, [initialCanton]);

  // Track page view
  useEffect(() => {
    trackSubsidyEvent('subsidy_page_view', { canton });
  }, [canton]);

  // Handle step completion
  const handleNext = () => {
    const nextStep = step + 1;
    trackSubsidyEvent('subsidy_step_completed', { step, canton, householdType });

    if (nextStep === 7) {
      // Calculate results
      const profile: UserProfile = {
        canton,
        householdType,
        adultsCount,
        childrenCount,
        youngAdultsInTrainingCount,
        incomeBracket,
        exactIncome: exactIncome ? parseInt(exactIncome, 10) : undefined,
        trainingStatus,
        residenceStatus,
      };
      const estimate = calculateSubsidyEligibility(profile);
      setResult(estimate);
      trackSubsidyEvent('subsidy_completed', {
        canton,
        householdType,
        resultStatus: estimate.status,
      });
      if (estimate.status === 'likely_eligible') {
        trackSubsidyEvent('subsidy_potentially_eligible', { canton });
      } else {
        trackSubsidyEvent('subsidy_not_eligible', { canton });
      }
    }
    setStep(nextStep);
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setResult(null);
    trackSubsidyEvent('subsidy_reset');
  };

  // Fenny mascot message per step
  const getFennyAdvice = () => {
    switch (step) {
      case 1:
        return "Les règles de calcul changent selon votre canton de domicile. Commençons par là pour appliquer les barèmes exacts !";
      case 2:
        return "Votre situation familiale (seul, en couple, parent solo) sert de point de départ pour définir le barème de base.";
      case 3:
        return "En Suisse, les enfants et jeunes en formation ouvrent droit à des déductions et barèmes bonifiés ! Indiquez le nombre de personnes.";
      case 4:
        return "Les étudiants et apprentis de 18 à 25 ans bénéficient souvent de règles très avantageuses dans plusieurs cantons.";
      case 5:
        return "Pas besoin d'être précis au centime près ! Une simple estimation de votre revenu net imposable annuel suffit.";
      case 6:
        return "Dernière étape ! Votre statut de résidence nous permet de valider les conditions d'octroi de votre canton.";
      default:
        return "Voici l'estimation personnalisée de votre droit au subside calculée selon les directives officielles 2026 !";
    }
  };

  const filteredCantons = SWISS_CANTONS.filter((c) => {
    if (regionFilter === 'all') return true;
    if (regionFilter === 'romandie') return c.region === 'romandie';
    return c.region === 'alemanique' || c.region === 'tessin';
  });

  const selectedCantonObj = SWISS_CANTONS.find((c) => c.code === canton) || SWISS_CANTONS[0];

  return (
    <div id="fenny-subsidy-simulator" className="w-full max-w-4xl mx-auto">
      {/* Container Box */}
      <div className="bg-white rounded-3xl border border-fennec-cream/80 shadow-md overflow-hidden">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-fennec-dark to-stone-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={step === 7 ? fenyResults : (step >= 4 ? fenyAnalyse : fenyWinking)}
                alt="Fenny la mascotte"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-white/20 shadow-xs"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] font-black text-white">
                ✓
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-fennec-terracotta text-white font-bold text-[10px] uppercase tracking-wider rounded-full">
                  Simulateur Fenny 2026
                </span>
                <span className="text-white/60 text-xs font-mono">
                  Données officielles 26 cantons
                </span>
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl text-white mt-1">
                {step === 7 ? "Résultat de votre simulation" : "Vérifiez votre droit au subside"}
              </h2>
            </div>
          </div>

          {step < 7 && (
            <div className="flex items-center gap-2 self-start sm:self-auto bg-white/10 px-4 py-2 rounded-full backdrop-blur-xs">
              <span className="text-xs font-mono text-white/80">Étape</span>
              <span className="text-sm font-black text-white font-mono">{step}</span>
              <span className="text-xs text-white/40">/</span>
              <span className="text-xs text-white/60 font-mono">6</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {step < 7 && (
          <div className="w-full bg-fennec-cream/30 h-1.5 overflow-hidden">
            <div
              className="bg-fennec-terracotta h-full transition-all duration-300 ease-out"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        )}

        {/* Fenny Advice Bubble */}
        <div className="px-6 sm:px-8 pt-6 pb-2">
          <div className="bg-[#FAF7F3] border border-fennec-cream/70 rounded-2xl p-4 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full bg-fennec-terracotta/10 text-fennec-terracotta flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm">
              🦊
            </div>
            <p className="text-xs sm:text-sm text-fennec-dark/85 leading-relaxed font-medium">
              <strong className="text-fennec-dark">Fenny : </strong>
              {getFennyAdvice()}
            </p>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          
          {/* STEP 1: CANTON */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-fennec-dark">
                    Dans quel canton suisse êtes-vous domicilié(e) ?
                  </h3>
                  <p className="text-xs text-fennec-dark/70 mt-0.5">
                    Sélectionnez le canton où vous payez vos impôts et où vous résidez.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 p-1 bg-fennec-cream/30 rounded-full text-xs font-semibold self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setRegionFilter('romandie')}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                      regionFilter === 'romandie'
                        ? 'bg-fennec-dark text-white shadow-xs'
                        : 'text-fennec-dark/70 hover:text-fennec-dark'
                    }`}
                  >
                    Romandie (7)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegionFilter('alemanique')}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                      regionFilter === 'alemanique'
                        ? 'bg-fennec-dark text-white shadow-xs'
                        : 'text-fennec-dark/70 hover:text-fennec-dark'
                    }`}
                  >
                    Alémanique / TI
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegionFilter('all')}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                      regionFilter === 'all'
                        ? 'bg-fennec-dark text-white shadow-xs'
                        : 'text-fennec-dark/70 hover:text-fennec-dark'
                    }`}
                  >
                    Tous (26)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
                {filteredCantons.map((c) => {
                  const isSelected = canton === c.code;
                  return (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => {
                        setCanton(c.code);
                        trackSubsidyEvent('subsidy_canton_selected', { canton: c.code });
                      }}
                      className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'border-fennec-terracotta bg-fennec-terracotta/5 ring-2 ring-fennec-terracotta/20 shadow-xs'
                          : 'border-fennec-cream/70 bg-white hover:border-fennec-dark/40 hover:bg-[#FAF7F3]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-7 h-7 rounded-lg font-mono font-black text-xs flex items-center justify-center ${
                            isSelected
                              ? 'bg-fennec-terracotta text-white'
                              : 'bg-fennec-cream/40 text-fennec-dark'
                          }`}
                        >
                          {c.code}
                        </span>
                        <span className="font-display font-bold text-xs text-fennec-dark truncate max-w-[90px] sm:max-w-[120px]">
                          {c.name}
                        </span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-fennec-terracotta shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: HOUSEHOLD TYPE */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-fennec-dark">
                  Quelle est la situation de votre ménage ?
                </h3>
                <p className="text-xs text-fennec-dark/70 mt-0.5">
                  Les cantons fixent des plafonds spécifiques selon la structure familiale.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    type: 'single' as HouseholdType,
                    title: 'Personne seule',
                    desc: 'Célibataire, séparé(e) ou divorcé(e) sans enfant à charge',
                    icon: User,
                  },
                  {
                    type: 'couple' as HouseholdType,
                    title: 'Couple sans enfant',
                    desc: 'Marié(e)s, pacsé(e)s ou concubins avec déclaration commune',
                    icon: Users,
                  },
                  {
                    type: 'family' as HouseholdType,
                    title: 'Famille avec enfants',
                    desc: 'Couple avec un ou plusieurs enfants ou jeunes en formation',
                    icon: Home,
                  },
                  {
                    type: 'single_parent' as HouseholdType,
                    title: 'Parent solo / Monoparental',
                    desc: 'Parent seul avec enfant(s) à charge sous garde exclusive ou partagée',
                    icon: User,
                  },
                  {
                    type: 'student' as HouseholdType,
                    title: 'Étudiant / En formation',
                    desc: 'Majeur en études supérieures ou formation professionnelle',
                    icon: GraduationCap,
                  },
                  {
                    type: 'retired' as HouseholdType,
                    title: 'Retraité / Rentier AVS',
                    desc: 'Bénéficiaire d’une rente AVS / AI ou préretraité',
                    icon: ShieldCheck,
                  },
                ].map((item) => {
                  const isSelected = householdType === item.type;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => {
                        setHouseholdType(item.type);
                        if (item.type === 'couple' || item.type === 'family') {
                          setAdultsCount(2);
                        } else {
                          setAdultsCount(1);
                        }
                        if (item.type === 'family' || item.type === 'single_parent') {
                          if (childrenCount === 0) setChildrenCount(1);
                        }
                        if (item.type === 'student') {
                          setTrainingStatus('student');
                        }
                      }}
                      className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-fennec-terracotta bg-fennec-terracotta/5 ring-2 ring-fennec-terracotta/20 shadow-xs'
                          : 'border-fennec-cream/70 bg-white hover:border-fennec-dark/40 hover:bg-[#FAF7F3]'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-fennec-terracotta text-white'
                            : 'bg-fennec-cream/40 text-fennec-dark/80'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-display font-bold text-sm text-fennec-dark">
                            {item.title}
                          </h4>
                          {isSelected && (
                            <Check className="w-4 h-4 text-fennec-terracotta shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-fennec-dark/70 mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: MEMBERS COUNT */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-fennec-dark">
                  Combien de personnes composent votre ménage fiscal ?
                </h3>
                <p className="text-xs text-fennec-dark/70 mt-0.5">
                  Chaque enfant ou jeune à charge augmente le plafond de revenus autorisé.
                </p>
              </div>

              <div className="space-y-4">
                {/* Adults */}
                <div className="p-4 rounded-2xl bg-[#FAF7F3] border border-fennec-cream/60 flex items-center justify-between">
                  <div>
                    <span className="font-display font-bold text-sm text-fennec-dark block">
                      Adultes (dès 26 ans ou non en formation)
                    </span>
                    <span className="text-xs text-fennec-dark/60">
                      Personnes majeures du foyer fiscal
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                      className="w-9 h-9 rounded-xl bg-white border border-fennec-cream/80 text-fennec-dark font-bold text-lg flex items-center justify-center hover:bg-fennec-cream/30 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-display font-black text-lg text-fennec-dark w-6 text-center font-mono">
                      {adultsCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAdultsCount(Math.min(6, adultsCount + 1))}
                      className="w-9 h-9 rounded-xl bg-white border border-fennec-cream/80 text-fennec-dark font-bold text-lg flex items-center justify-center hover:bg-fennec-cream/30 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children under 18 */}
                <div className="p-4 rounded-2xl bg-[#FAF7F3] border border-fennec-cream/60 flex items-center justify-between">
                  <div>
                    <span className="font-display font-bold text-sm text-fennec-dark block">
                      Enfants mineurs (0 à 18 ans)
                    </span>
                    <span className="text-xs text-fennec-dark/60">
                      Ouvrent droit à des forfaits spécifiques de réduction
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                      className="w-9 h-9 rounded-xl bg-white border border-fennec-cream/80 text-fennec-dark font-bold text-lg flex items-center justify-center hover:bg-fennec-cream/30 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-display font-black text-lg text-fennec-dark w-6 text-center font-mono">
                      {childrenCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setChildrenCount(Math.min(8, childrenCount + 1))}
                      className="w-9 h-9 rounded-xl bg-white border border-fennec-cream/80 text-fennec-dark font-bold text-lg flex items-center justify-center hover:bg-fennec-cream/30 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Young adults in training 18-25 */}
                <div className="p-4 rounded-2xl bg-[#FAF7F3] border border-fennec-cream/60 flex items-center justify-between">
                  <div>
                    <span className="font-display font-bold text-sm text-fennec-dark block">
                      Jeunes adultes en formation (19 à 25 ans)
                    </span>
                    <span className="text-xs text-fennec-dark/60">
                      Étudiants, apprentis ou stagiaires rattachés fiscalement
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setYoungAdultsInTrainingCount(Math.max(0, youngAdultsInTrainingCount - 1))
                      }
                      className="w-9 h-9 rounded-xl bg-white border border-fennec-cream/80 text-fennec-dark font-bold text-lg flex items-center justify-center hover:bg-fennec-cream/30 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-display font-black text-lg text-fennec-dark w-6 text-center font-mono">
                      {youngAdultsInTrainingCount}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setYoungAdultsInTrainingCount(Math.min(6, youngAdultsInTrainingCount + 1))
                      }
                      className="w-9 h-9 rounded-xl bg-white border border-fennec-cream/80 text-fennec-dark font-bold text-lg flex items-center justify-center hover:bg-fennec-cream/30 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: TRAINING & STUDIES */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-fennec-dark">
                  Quelqu'un dans le ménage suit-il une formation reconnue ?
                </h3>
                <p className="text-xs text-fennec-dark/70 mt-0.5">
                  Les cantons protègent spécifiquement les jeunes en apprentissage ou études supérieures.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    status: 'none' as TrainingStatus,
                    title: 'Aucune formation en cours',
                    desc: 'Salarié(e), indépendant(e), en recherche d’emploi ou retraité(e)',
                    icon: Briefcase,
                  },
                  {
                    status: 'student' as TrainingStatus,
                    title: 'Étudiant(e) (Université, HES, EPFL...)',
                    desc: 'Formation tertiaire à plein temps avec attestation d’immatriculation',
                    icon: GraduationCap,
                  },
                  {
                    status: 'apprentice' as TrainingStatus,
                    title: 'Apprenti(e) (CFC, AFP)',
                    desc: 'Contrat d’apprentissage validé par l’office de la formation professionnelle',
                    icon: FileText,
                  },
                  {
                    status: 'young_in_training' as TrainingStatus,
                    title: 'Stagiaire ou jeune en réorientation',
                    desc: 'Stage obligatoire ou mesure d’insertion pour moins de 25 ans',
                    icon: HelpCircle,
                  },
                ].map((item) => {
                  const isSelected = trainingStatus === item.status;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.status}
                      type="button"
                      onClick={() => setTrainingStatus(item.status)}
                      className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-fennec-terracotta bg-fennec-terracotta/5 ring-2 ring-fennec-terracotta/20 shadow-xs'
                          : 'border-fennec-cream/70 bg-white hover:border-fennec-dark/40 hover:bg-[#FAF7F3]'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-fennec-terracotta text-white'
                            : 'bg-fennec-cream/40 text-fennec-dark/80'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-display font-bold text-sm text-fennec-dark">
                            {item.title}
                          </h4>
                          {isSelected && (
                            <Check className="w-4 h-4 text-fennec-terracotta shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-fennec-dark/70 mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: INCOME ESTIMATION */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-fennec-dark">
                  Quel est votre revenu net imposable annuel estimé ?
                </h3>
                <p className="text-xs text-fennec-dark/70 mt-0.5">
                  Il s'agit du revenu du foyer après déductions sociales (tel qu'indiqué sur votre avis de taxation ou 12 fiches de paie).
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { bracket: 'less_20k' as IncomeBracket, label: '< CHF 20’000' },
                  { bracket: '20k_30k' as IncomeBracket, label: '20’000 – 30’000' },
                  { bracket: '30k_40k' as IncomeBracket, label: '30’000 – 40’000' },
                  { bracket: '40k_50k' as IncomeBracket, label: '40’000 – 50’000' },
                  { bracket: '50k_60k' as IncomeBracket, label: '50’000 – 60’000' },
                  { bracket: '60k_80k' as IncomeBracket, label: '60’000 – 80’000' },
                  { bracket: '80k_100k' as IncomeBracket, label: '80’000 – 100’000' },
                  { bracket: 'more_100k' as IncomeBracket, label: '> CHF 100’000' },
                ].map((item) => {
                  const isSelected = incomeBracket === item.bracket && !exactIncome;
                  return (
                    <button
                      key={item.bracket}
                      type="button"
                      onClick={() => {
                        setIncomeBracket(item.bracket);
                        setExactIncome('');
                      }}
                      className={`p-3.5 rounded-2xl border text-center font-display font-bold text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'border-fennec-terracotta bg-fennec-terracotta text-white shadow-xs'
                          : 'border-fennec-cream/70 bg-white text-fennec-dark hover:border-fennec-dark/40 hover:bg-[#FAF7F3]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              {/* Exact income input option */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-fennec-dark/70 mb-1.5">
                  Ou entrez votre montant exact (optionnel) :
                </label>
                <div className="relative max-w-xs">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-fennec-dark/50">
                    CHF
                  </span>
                  <input
                    type="number"
                    value={exactIncome}
                    onChange={(e) => setExactIncome(e.target.value)}
                    placeholder="ex: 38500"
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-fennec-cream/80 bg-[#FAF7F3] text-sm font-display font-bold text-fennec-dark focus:outline-none focus:ring-2 focus:ring-fennec-terracotta/30"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: RESIDENCE STATUS */}
          {step === 6 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-fennec-dark">
                  Quel est votre statut de résidence ?
                </h3>
                <p className="text-xs text-fennec-dark/70 mt-0.5">
                  Certaines démarches varient selon le permis de séjour ou le statut frontalier.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    status: 'resident' as ResidenceStatus,
                    title: 'Résident en Suisse',
                    desc: 'Nationalité suisse ou permis B, C, L avec domicile principal dans le canton',
                    icon: Home,
                  },
                  {
                    status: 'frontalier_lamal' as ResidenceStatus,
                    title: 'Frontalier (Option LAMal)',
                    desc: 'Permis G travaillant en Suisse et ayant exercé le droit d’option LAMal',
                    icon: FileText,
                  },
                  {
                    status: 'other' as ResidenceStatus,
                    title: 'Nouveau résident / Autre',
                    desc: 'Arrivée récente en Suisse ou situation transitoire en cours',
                    icon: HelpCircle,
                  },
                ].map((item) => {
                  const isSelected = residenceStatus === item.status;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.status}
                      type="button"
                      onClick={() => setResidenceStatus(item.status)}
                      className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'border-fennec-terracotta bg-fennec-terracotta/5 ring-2 ring-fennec-terracotta/20 shadow-xs'
                          : 'border-fennec-cream/70 bg-white hover:border-fennec-dark/40 hover:bg-[#FAF7F3]'
                      }`}
                    >
                      <div>
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                            isSelected
                              ? 'bg-fennec-terracotta text-white'
                              : 'bg-fennec-cream/40 text-fennec-dark/80'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <h4 className="font-display font-bold text-sm text-fennec-dark">
                          {item.title}
                        </h4>
                        <p className="text-xs text-fennec-dark/70 mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="mt-3 flex items-center gap-1 text-fennec-terracotta text-xs font-bold">
                          <Check className="w-3.5 h-3.5" />
                          <span>Sélectionné</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 7: RESULTS VIEW */}
          {step === 7 && result && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Positive / Eligible Result Banner */}
              {result.status === 'likely_eligible' && (
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white border border-emerald-200 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full inline-block">
                          Éligibilité probable ({result.cantonInfo.name})
                        </span>
                        <h3 className="font-display font-black text-xl sm:text-2xl text-emerald-950 mt-1">
                          {result.headline}
                        </h3>
                      </div>
                    </div>

                    {result.estimatedMonthlyAmount && (
                      <div className="p-3 bg-white rounded-2xl border border-emerald-200/80 shadow-xs text-center shrink-0 self-start sm:self-auto">
                        <span className="text-[10px] uppercase font-bold text-emerald-800/80 block">
                          Estimation indicative
                        </span>
                        <span className="font-display font-black text-xl text-emerald-700 font-mono">
                          {result.estimatedMonthlyAmount.label}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-emerald-950/80 leading-relaxed">
                    {result.subheadline}
                  </p>

                  {/* Matched criteria badges */}
                  {result.matchedCriteria.length > 0 && (
                    <div className="pt-2 border-t border-emerald-200/60 space-y-1.5">
                      <span className="text-[11px] font-bold text-emerald-900 block">
                        Critères déterminants vérifiés :
                      </span>
                      {result.matchedCriteria.map((c, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-emerald-900/90">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Negative / Not Eligible Result Banner */}
              {result.status === 'not_eligible' && (
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50/30 to-white border border-amber-200 shadow-xs space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-full inline-block">
                        Seuil dépassé ({result.cantonInfo.name})
                      </span>
                      <h3 className="font-display font-black text-xl sm:text-2xl text-amber-950 mt-1">
                        {result.headline}
                      </h3>
                      <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed mt-2">
                        {result.subheadline}
                      </p>
                    </div>
                  </div>

                  {/* Alternative savings recommendation box */}
                  <div className="p-4 bg-white rounded-2xl border border-amber-200/80 space-y-2">
                    <h4 className="font-display font-bold text-xs sm:text-sm text-amber-950 flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-fennec-terracotta" />
                      Comment économiser jusqu'à CHF 1'500.- / an sans subside ?
                    </h4>
                    <p className="text-xs text-fennec-dark/80 leading-relaxed">
                      En Suisse, toutes les caisses remboursent exactement les mêmes soins LAMal. En choisissant l'assureur le moins cher de votre canton et en ajustant franchise et modèle alternatif (Telmed), vous réduisez drastiquement vos mensualités.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          trackSubsidyEvent('subsidy_comparator_clicked', { canton });
                          if (onStartHealthComparison) {
                            onStartHealthComparison(canton);
                          }
                        }}
                        className="inline-flex items-center gap-2 bg-fennec-terracotta hover:bg-fennec-terracotta/90 text-white font-display font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer shadow-xs"
                      >
                        <span>Comparer les caisses maladie en {result.cantonInfo.name}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Check with Authority Banner */}
              {result.status === 'check_with_authority' && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F3] border border-fennec-cream/80 shadow-xs space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-fennec-dark text-white flex items-center justify-center shrink-0 shadow-xs">
                      <HelpCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-fennec-dark/70 bg-fennec-cream/50 px-2.5 py-0.5 rounded-full inline-block">
                        Examen particulier requis ({result.cantonInfo.name})
                      </span>
                      <h3 className="font-display font-black text-xl sm:text-2xl text-fennec-dark mt-1">
                        {result.headline}
                      </h3>
                      <p className="text-xs sm:text-sm text-fennec-dark/80 leading-relaxed mt-2">
                        {result.subheadline}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Official Procedure & Portal Card */}
              <div className="bg-white rounded-2xl border border-fennec-cream/70 p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-fennec-cream/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-fennec-terracotta/10 text-fennec-terracotta flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-fennec-dark/50 tracking-wider">
                        Organisme cantonal compétent
                      </span>
                      <h4 className="font-display font-bold text-base text-fennec-dark">
                        {result.cantonInfo.agencyName}
                      </h4>
                    </div>
                  </div>

                  <a
                    href={result.cantonInfo.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackSubsidyEvent('subsidy_application_clicked', {
                        canton,
                        targetUrl: result.cantonInfo.portalUrl,
                      });
                    }}
                    className="inline-flex items-center gap-2 bg-fennec-dark hover:bg-black text-white font-display font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all self-start sm:self-auto shrink-0 shadow-xs cursor-pointer"
                  >
                    <span>Portail officiel ({result.cantonInfo.code})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Steps to apply */}
                <div>
                  <h4 className="font-display font-bold text-sm text-fennec-dark mb-3">
                    Comment déposer ou vérifier votre demande ?
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {result.stepsToApply.map((st, i) => (
                      <div
                        key={i}
                        className="p-4 bg-[#FAF7F3] rounded-xl border border-fennec-cream/50 space-y-1.5"
                      >
                        <span className="w-6 h-6 rounded-full bg-fennec-terracotta text-white text-xs font-bold flex items-center justify-center font-mono">
                          {i + 1}
                        </span>
                        <h5 className="font-display font-bold text-xs text-fennec-dark">
                          {st.title}
                        </h5>
                        <p className="text-[11px] text-fennec-dark/70 leading-relaxed">
                          {st.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Required Documents */}
                <div className="pt-2">
                  <h4 className="font-display font-bold text-sm text-fennec-dark mb-2.5 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-fennec-terracotta" />
                    Pièces justificatives à préparer
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-fennec-dark/80">
                    {result.requiredDocuments.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2.5 bg-[#FAF7F3] rounded-xl border border-fennec-cream/40"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dual Action Conversion Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-[#FAF7F3] rounded-2xl border border-fennec-cream/70">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-fennec-dark/70 hover:text-fennec-dark cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Refaire une simulation</span>
                </button>

                <div className="flex flex-wrap items-center gap-3">
                  {onNavigateCantonGuide && (
                    <button
                      type="button"
                      onClick={() => onNavigateCantonGuide(selectedCantonObj.slug)}
                      className="px-4 py-2.5 rounded-full border border-fennec-cream/90 bg-white hover:bg-fennec-cream/30 text-xs font-display font-bold text-fennec-dark transition-all cursor-pointer"
                    >
                      Guide complet {result.cantonInfo.name}
                    </button>
                  )}
                  {onStartHealthComparison && (
                    <button
                      type="button"
                      onClick={() => {
                        trackSubsidyEvent('subsidy_comparator_clicked', { canton });
                        onStartHealthComparison(canton);
                      }}
                      className="inline-flex items-center gap-2 bg-fennec-terracotta hover:bg-fennec-terracotta/90 text-white font-display font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer shadow-xs"
                    >
                      <span>Comparer les 37 caisses suisses</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Legal Disclaimer */}
              <p className="text-[11px] text-fennec-dark/50 text-justify leading-relaxed border-t border-fennec-cream/40 pt-4">
                <strong>Avertissement légal : </strong>
                {result.disclaimer} Dernière mise à jour : {result.lastUpdated}.
              </p>
            </div>
          )}

          {/* Navigation Controls (Step 1 to 6) */}
          {step < 7 && (
            <div className="mt-8 pt-6 border-t border-fennec-cream/60 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-fennec-cream/80 text-xs font-display font-bold text-fennec-dark hover:bg-[#FAF7F3] transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Retour</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-fennec-terracotta hover:bg-fennec-terracotta/90 text-white font-display font-bold px-7 py-3 rounded-full text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md cursor-pointer"
              >
                <span>{step === 6 ? 'Calculer mon éligibilité' : 'Continuer'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
