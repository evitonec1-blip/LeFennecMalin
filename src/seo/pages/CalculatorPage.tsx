/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, CheckCircle2, TrendingUp, Sparkles, AlertCircle, HelpCircle, Shield, ChevronRight } from 'lucide-react';
import SEOHead, { breadcrumbSchema, organizationSchema, financialServiceSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { useLanguage } from '../../i18n/LanguageContext';
import { AppTab } from '../../types';

interface Props {
  toolType: 'franchise' | 'impot-3a' | 'frontalier';
  onStartComparison: () => void;
  onGoHome: () => void;
  onNavigate: (url: string) => void;
}

export default function CalculatorPage({ toolType, onStartComparison, onGoHome, onNavigate }: Props) {
  const { language } = useLanguage();

  // Franchise Tool State
  const [estimatedExpenses, setEstimatedExpenses] = useState<number>(800);
  const [adultAge, setAdultAge] = useState<'adult' | 'young'>('adult');
  const [cantonRate, setCantonRate] = useState<number>(450); // standard base premium 300

  // 3a Tax Tool State
  const [income3a, setIncome3a] = useState<number>(95000);
  const [canton3a, setCanton3a] = useState<string>('geneve');
  const [contribution3a, setContribution3a] = useState<number>(7258);
  const [maritalStatus, setMaritalStatus] = useState<'single' | 'married'>('single');

  // Frontalier Tool State
  const [salaryCHF, setSalaryCHF] = useState<number>(85000);
  const [householdMembers, setHouseholdMembers] = useState<number>(1);

  // Franchise calculation logic
  const franchiseCalculations = useMemo(() => {
    // Premium 300 annual = cantonRate * 12
    const premium300Year = cantonRate * 12;
    // Premium 2500 annual = (cantonRate - 128) * 12
    const premium2500Year = Math.max(100, cantonRate - 128) * 12;

    // Out of pocket for 300: min(expenses, 300) + 10% of remaining up to 700
    const out300Franchise = Math.min(estimatedExpenses, 300);
    const remaining300 = Math.max(0, estimatedExpenses - 300);
    const quotePart300 = Math.min(remaining300 * 0.1, 700);
    const total300 = premium300Year + out300Franchise + quotePart300;

    // Out of pocket for 2500: min(expenses, 2500) + 10% of remaining up to 700
    const out2500Franchise = Math.min(estimatedExpenses, 2500);
    const remaining2500 = Math.max(0, estimatedExpenses - 2500);
    const quotePart2500 = Math.min(remaining2500 * 0.1, 700);
    const total2500 = premium2500Year + out2500Franchise + quotePart2500;

    const diff = total300 - total2500;
    const is2500Better = diff >= 0;
    const bestChoice = is2500Better ? 2500 : 300;
    const savingsAmount = Math.abs(diff);

    return {
      premium300Year,
      premium2500Year,
      total300: Math.round(total300),
      total2500: Math.round(total2500),
      bestChoice,
      savingsAmount: Math.round(savingsAmount),
      breakevenThreshold: 1850,
    };
  }, [estimatedExpenses, cantonRate]);

  // 3a Tax calculation logic
  const tax3aCalculations = useMemo(() => {
    // Approximate marginal tax rates by canton
    const marginalRates: Record<string, number> = {
      geneve: 0.32,
      vaud: 0.30,
      neuchatel: 0.31,
      fribourg: 0.28,
      valais: 0.26,
      jura: 0.29,
      berne: 0.29,
      zurich: 0.24,
      zoug: 0.16,
      bale: 0.28,
    };
    const rate = marginalRates[canton3a] || 0.28;
    const factorMarital = maritalStatus === 'married' ? 0.9 : 1.0;
    const effectiveRate = rate * factorMarital;
    const annualTaxSavings = Math.round(contribution3a * effectiveRate);

    // 10-year projection at 4% annual return
    const years = 15;
    let projectedCapital = 0;
    for (let i = 0; i < years; i++) {
      projectedCapital = (projectedCapital + contribution3a) * 1.04;
    }

    return {
      annualTaxSavings,
      total10YearsSavings: annualTaxSavings * 10,
      projectedCapital: Math.round(projectedCapital),
      effectiveRatePercent: Math.round(effectiveRate * 100),
    };
  }, [income3a, canton3a, contribution3a, maritalStatus]);

  // Frontalier calculation logic
  const frontalierCalculations = useMemo(() => {
    // CMU calculation: 8% on gross income after allowance (approx EUR/CHF parity 0.95)
    const cmuExemption = 11000; // approximate RFR base deduction in CHF
    const taxableBase = Math.max(0, salaryCHF - cmuExemption);
    const annualCMU = Math.round(taxableBase * 0.08);
    const monthlyCMU = Math.round(annualCMU / 12);

    // LAMal Frontalier: approx CHF 170 / month per adult
    const monthlyLAMal = 170 * householdMembers;
    const annualLAMal = monthlyLAMal * 12;

    const annualDiff = annualCMU - annualLAMal;
    const isLAMalCheaper = annualDiff > 0;

    return {
      monthlyCMU,
      annualCMU,
      monthlyLAMal,
      annualLAMal,
      annualDiff: Math.abs(annualDiff),
      isLAMalCheaper,
    };
  }, [salaryCHF, householdMembers]);

  const toolMetadata = {
    franchise: {
      tabKey: 'tool-calculateur-franchise' as AppTab,
      title: 'Calculateur de Franchise d\'Assurance Maladie Suisse 2026',
      desc: 'Simulez en direct la franchise optimale (CHF 300 vs CHF 2\'500) selon vos dépenses médicales annuelles prévues et économisez jusqu\'à CHF 1\'540/an.',
      canonical: '/outils/calculateur-franchise/',
    },
    'impot-3a': {
      tabKey: 'tool-calculateur-impot-3a' as AppTab,
      title: 'Simulateur d\'Économie d\'Impôt 3ème Pilier 3a 2026',
      desc: 'Calculez instantanément le montant exact d\'impôts que vous économisez en versant sur votre pilier 3a selon votre canton et revenu.',
      canonical: '/outils/calculateur-impot-3a/',
    },
    frontalier: {
      tabKey: 'tool-simulateur-frontalier' as AppTab,
      title: 'Simulateur Droit d\'Option Frontalier : LAMal Suisse vs CMU France',
      desc: 'Comparez le coût réel entre la prime fixe LAMal frontalier et la cotisation CMU à 8% selon votre salaire annuel en francs suisses.',
      canonical: '/outils/simulateur-frontalier/',
    },
  }[toolType];

  const structured = [
    organizationSchema,
    financialServiceSchema(toolMetadata.title, toolMetadata.desc, toolMetadata.canonical),
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'Outils & Simulateurs', url: '/outils/' },
      { name: toolMetadata.title, url: toolMetadata.canonical },
    ]),
  ];

  return (
    <>
      <SEOHead
        tab={toolMetadata.tabKey}
        language={language}
        structuredData={structured}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: onGoHome },
            { label: 'Simulateurs Prévoyance & Santé' },
            { label: toolMetadata.title },
          ]}
        />

        {/* Title Banner */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-fennec-terracotta/10 text-fennec-terracotta text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full mb-3">
            <Calculator className="w-3.5 h-3.5" />
            Outil de simulation 100% neutre & gratuit
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            {toolMetadata.title}
          </h1>
          <p className="text-stone-600 mt-2 text-base leading-relaxed">
            {toolMetadata.desc}
          </p>
        </div>

        {/* FRANCHISE CALCULATOR VIEW */}
        {toolType === 'franchise' && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Inputs */}
              <div>
                <h2 className="text-lg font-bold text-stone-900 mb-5 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-fennec-terracotta" />
                  1. Vos paramètres de dépenses
                </h2>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-bold text-stone-800">
                        Dépenses médicales annuelles estimées
                      </label>
                      <span className="text-fennec-terracotta font-black text-lg">
                        CHF {estimatedExpenses}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={6000}
                      step={100}
                      value={estimatedExpenses}
                      onChange={(e) => setEstimatedExpenses(Number(e.target.value))}
                      className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-fennec-terracotta"
                    />
                    <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                      <span>0 (Aucun soin)</span>
                      <span>CHF 2'000 (Seuil pivot)</span>
                      <span>CHF 6'000+ (Soins lourds)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-stone-800 mb-2">
                      Prime mensuelle de base estimée (Franchise 300)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[350, 450, 520].map((rate) => (
                        <button
                          key={rate}
                          type="button"
                          onClick={() => setCantonRate(rate)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                            cantonRate === rate
                              ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          CHF {rate} / mois
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1.5">
                      (Varie selon votre canton : ex. Valais env. CHF 350, Vaud env. CHF 450, Genève env. CHF 520)
                    </p>
                  </div>
                </div>
              </div>

              {/* Results Box */}
              <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-extrabold text-stone-500 uppercase tracking-wider mb-1">
                    Résultat de l'analyse mathématique
                  </div>
                  <div className="text-2xl font-black text-stone-900 flex items-center gap-2 mb-4">
                    <span>Recommandation : Franchise CHF {franchiseCalculations.bestChoice}</span>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-4">
                    <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      Économie nette sur votre budget annuel
                    </div>
                    <div className="text-3xl font-black text-emerald-700 mt-1">
                      + CHF {franchiseCalculations.savingsAmount} / an
                    </div>
                    <p className="text-xs text-emerald-800 mt-1">
                      par rapport à la franchise CHF {franchiseCalculations.bestChoice === 2500 ? '300' : '2500'}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-stone-600">
                    <div className="flex justify-between py-1.5 border-b border-stone-200">
                      <span>Coût total annuel en Franchise 2'500 :</span>
                      <span className="font-bold text-stone-900">CHF {franchiseCalculations.total2500}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-stone-200">
                      <span>Coût total annuel en Franchise 300 :</span>
                      <span className="font-bold text-stone-900">CHF {franchiseCalculations.total300}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onStartComparison}
                  className="w-full mt-6 inline-flex items-center justify-center gap-2 bg-fennec-terracotta hover:bg-fennec-rust text-white font-bold py-3 px-4 rounded-xl text-sm transition-transform hover:scale-[1.02]"
                >
                  <span>Trouver la caisse la moins chère</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3A TAX SIMULATOR VIEW */}
        {toolType === 'impot-3a' && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-bold text-stone-900 mb-5">
                  1. Votre situation fiscale & versement
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Canton de domicile
                    </label>
                    <select
                      value={canton3a}
                      onChange={(e) => setCanton3a(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-semibold text-stone-900"
                    >
                      <option value="geneve">Genève (GE)</option>
                      <option value="vaud">Vaud (VD)</option>
                      <option value="fribourg">Fribourg (FR)</option>
                      <option value="valais">Valais (VS)</option>
                      <option value="neuchatel">Neuchâtel (NE)</option>
                      <option value="jura">Jura (JU)</option>
                      <option value="berne">Berne (BE)</option>
                      <option value="zurich">Zurich (ZH)</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                        Versement annuel 3a (Plafond 2026 : CHF 7'258)
                      </label>
                      <span className="font-bold text-fennec-terracotta text-sm">CHF {contribution3a}</span>
                    </div>
                    <input
                      type="range"
                      min={1000}
                      max={7258}
                      step={100}
                      value={contribution3a}
                      onChange={(e) => setContribution3a(Number(e.target.value))}
                      className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-fennec-terracotta"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      État civil
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setMaritalStatus('single')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                          maritalStatus === 'single'
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-stone-50 text-stone-700 border-stone-200'
                        }`}
                      >
                        Célibataire / Seul
                      </button>
                      <button
                        type="button"
                        onClick={() => setMaritalStatus('married')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                          maritalStatus === 'married'
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-stone-50 text-stone-700 border-stone-200'
                        }`}
                      >
                        Marié(e) / Pacsé(e)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3a Result */}
              <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-extrabold text-stone-500 uppercase tracking-wider mb-1">
                    Économie d'impôt immédiate (Année 2026)
                  </div>
                  <div className="text-3xl font-black text-emerald-700 mb-2">
                    CHF {tax3aCalculations.annualTaxSavings}
                  </div>
                  <p className="text-xs text-stone-600 mb-6">
                    soit environ {tax3aCalculations.effectiveRatePercent}% de votre versement récupéré sous forme de réduction d'impôts directs.
                  </p>

                  <div className="bg-white rounded-xl p-4 border border-stone-200 space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-500">Économie fiscale cumulée sur 10 ans :</span>
                      <span className="font-bold text-stone-900">CHF {tax3aCalculations.total10YearsSavings}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-stone-500">Capital estimé à la retraite (15 ans @ 4%) :</span>
                      <span className="font-bold text-emerald-700 text-sm">CHF {tax3aCalculations.projectedCapital}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('/fr/3eme-pilier/')}
                  className="w-full mt-6 inline-flex items-center justify-center gap-2 bg-fennec-terracotta hover:bg-fennec-rust text-white font-bold py-3 px-4 rounded-xl text-sm transition-transform hover:scale-[1.02]"
                >
                  <span>Comparer les meilleurs 3ème piliers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FRONTALIER SIMULATOR VIEW */}
        {toolType === 'frontalier' && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-bold text-stone-900 mb-5">
                  1. Votre salaire brut suisse annuel
                </h2>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                        Salaire brut annuel
                      </label>
                      <span className="font-bold text-fennec-terracotta text-sm">CHF {salaryCHF.toLocaleString('fr-CH')}</span>
                    </div>
                    <input
                      type="range"
                      min={40000}
                      max={180000}
                      step={5000}
                      value={salaryCHF}
                      onChange={(e) => setSalaryCHF(Number(e.target.value))}
                      className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-fennec-terracotta"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Nombre d'adultes à assurer
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setHouseholdMembers(1)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                          householdMembers === 1
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-stone-50 text-stone-700 border-stone-200'
                        }`}
                      >
                        1 Adulte
                      </button>
                      <button
                        type="button"
                        onClick={() => setHouseholdMembers(2)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                          householdMembers === 2
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-stone-50 text-stone-700 border-stone-200'
                        }`}
                      >
                        2 Adultes (Couple)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Frontalier Results */}
              <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-extrabold text-stone-500 uppercase tracking-wider mb-1">
                    Résultat du comparatif Droit d'option
                  </div>
                  <div className="text-xl font-black text-stone-900 mb-3">
                    {frontalierCalculations.isLAMalCheaper ? (
                      <span className="text-emerald-700">La LAMal Frontalier est la plus avantageuse</span>
                    ) : (
                      <span className="text-blue-700">La CMU est légèrement plus avantageuse</span>
                    )}
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-stone-200 space-y-2.5 text-xs mb-4">
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-600">Cotisation CMU France (8%) :</span>
                      <span className="font-bold text-stone-900">env. CHF {frontalierCalculations.monthlyCMU} / mois</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-600">Prime LAMal Frontalier Suisse (Fixe) :</span>
                      <span className="font-bold text-stone-900">env. CHF {frontalierCalculations.monthlyLAMal} / mois</span>
                    </div>
                    <div className="flex justify-between py-1 font-bold text-emerald-700 text-sm">
                      <span>Économie annuelle :</span>
                      <span>CHF {frontalierCalculations.annualDiff} / an</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('/fr/guides/frontalier-assurance-maladie/')}
                  className="w-full mt-6 inline-flex items-center justify-center gap-2 bg-fennec-terracotta hover:bg-fennec-rust text-white font-bold py-3 px-4 rounded-xl text-sm transition-transform hover:scale-[1.02]"
                >
                  <span>Lire le guide complet Frontalier</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Other Tools Hub */}
        <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-stone-900 mb-4">
            Tous nos simulateurs & outils d'aide à la décision
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => onNavigate('/fr/outils/calculateur-franchise/')}
              className="bg-white p-4 rounded-xl border border-stone-200 text-left hover:border-fennec-terracotta transition-colors group"
            >
              <div className="font-bold text-stone-900 text-sm group-hover:text-fennec-terracotta">
                Calculateur de Franchise
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Optimisez entre 300 et 2500 selon vos soins.
              </p>
            </button>

            <button
              onClick={() => onNavigate('/fr/outils/calculateur-impot-3a/')}
              className="bg-white p-4 rounded-xl border border-stone-200 text-left hover:border-fennec-terracotta transition-colors group"
            >
              <div className="font-bold text-stone-900 text-sm group-hover:text-fennec-terracotta">
                Simulateur Impôts 3a
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Économie d'impôt annuelle par canton.
              </p>
            </button>

            <button
              onClick={() => onNavigate('/fr/outils/simulateur-frontalier/')}
              className="bg-white p-4 rounded-xl border border-stone-200 text-left hover:border-fennec-terracotta transition-colors group"
            >
              <div className="font-bold text-stone-900 text-sm group-hover:text-fennec-terracotta">
                Simulateur Frontalier
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Comparatif LAMal vs CMU à 8%.
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
