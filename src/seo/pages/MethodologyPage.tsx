/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Scale, CheckCircle2, ShieldCheck, Database, FileText, ArrowRight } from 'lucide-react';
import SEOHead, { breadcrumbSchema, organizationSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  onStartComparison: () => void;
  onGoHome: () => void;
}

export default function MethodologyPage({ onStartComparison, onGoHome }: Props) {
  const { language } = useLanguage();
  const structured = [
    organizationSchema,
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'Méthodologie & Sources', url: '/methodologie/' },
    ]),
  ];

  return (
    <>
      <SEOHead
        tab="methodologie"
        language={language}
        structuredData={structured}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: onGoHome },
            { label: 'Méthodologie & Sources' },
          ]}
        />

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-fennec-terracotta/10 text-fennec-terracotta text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
            <Scale className="w-3.5 h-3.5" />
            Transparence & Rigueur Suisse
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-fennec-dark mb-4 leading-tight">
            Méthodologie de calcul et sources de données officielles
          </h1>
          <p className="text-fennec-dark/70 text-lg leading-relaxed">
            La confiance de nos utilisateurs repose sur l'exactitude de nos données, la neutralité de nos algorithmes et la transparence totale de notre modèle économique.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-2xl border border-fennec-cream/60 p-6 shadow-xs">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-3">
              <Database className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="font-display font-bold text-fennec-dark text-base mb-1.5">Données Officielles OFSP</h3>
            <p className="text-xs text-fennec-dark/70 leading-relaxed">
              Toutes les primes LAMal proviennent des bases de données ouvertes publiées par l'Office fédéral de la santé publique (OFSP / Priminfo) pour l'année 2026.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-fennec-cream/60 p-6 shadow-xs">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-display font-bold text-fennec-dark text-base mb-1.5">Neutralité Tarifaire</h3>
            <p className="text-xs text-fennec-dark/70 leading-relaxed">
              Aucune compagnie d'assurance ne peut payer pour modifier son classement ou apparaître artificiellement en tête de liste des résultats.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-fennec-cream/60 p-6 shadow-xs">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-3">
              <Scale className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="font-display font-bold text-fennec-dark text-base mb-1.5">Conformité LSA</h3>
            <p className="text-xs text-fennec-dark/70 leading-relaxed">
              Respect strict de la Loi fédérale sur la surveillance des assurances (LSA) et de ses articles 45, 45a et 45b relatifs au devoir d'information.
            </p>
          </div>
        </div>

        {/* Calculation Logic Breakdown */}
        <div className="bg-white rounded-3xl border border-fennec-cream/60 p-8 mb-10 shadow-xs space-y-6">
          <h2 className="font-display font-bold text-2xl text-fennec-dark">
            Comment calculons-nous vos primes d'assurance maladie ?
          </h2>
          <div className="space-y-4 text-sm text-fennec-dark/80 leading-relaxed">
            <p>
              Le calcul de votre prime d'assurance de base (LAMal) s'appuie sur quatre paramètres réglementaires strictement encadrés par la loi suisse :
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 bg-fennec-cream/20 rounded-2xl border border-fennec-cream/50">
                <span className="font-bold text-fennec-dark text-xs block mb-1">1. Domicile (NPA & Région de primes)</span>
                <span className="text-xs text-fennec-dark/70">
                  Votre code postal (NPA) détermine votre canton et votre région de primes officielle (Région 1, 2 ou 3) selon la cartographie OFSP.
                </span>
              </div>
              <div className="p-4 bg-fennec-cream/20 rounded-2xl border border-fennec-cream/50">
                <span className="font-bold text-fennec-dark text-xs block mb-1">2. Tranche d'Âge Légale</span>
                <span className="text-xs text-fennec-dark/70">
                  Enfants (0 à 18 ans), Jeunes adultes (19 à 25 ans) et Adultes (dès 26 ans).
                </span>
              </div>
              <div className="p-4 bg-fennec-cream/20 rounded-2xl border border-fennec-cream/50">
                <span className="font-bold text-fennec-dark text-xs block mb-1">3. Franchise Annuelle Choisie</span>
                <span className="text-xs text-fennec-dark/70">
                  De CHF 300 à CHF 2'500 pour les adultes, et de CHF 0 à CHF 600 pour les enfants.
                </span>
              </div>
              <div className="p-4 bg-fennec-cream/20 rounded-2xl border border-fennec-cream/50">
                <span className="font-bold text-fennec-dark text-xs block mb-1">4. Modèle de Soins & Option Accident</span>
                <span className="text-xs text-fennec-dark/70">
                  Modèle standard (libre choix), Médecin de famille, HMO ou Telmed, avec inclusion ou exclusion du risque accident.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Update Dates & Data Freshness */}
        <div className="bg-white rounded-3xl border border-fennec-cream/60 p-8 mb-10 shadow-xs space-y-4">
          <h2 className="font-display font-bold text-2xl text-fennec-dark">
            Fréquence de mise à jour des tarifs
          </h2>
          <p className="text-sm text-fennec-dark/80 leading-relaxed">
            Les primes de l'assurance obligatoire des soins (LAMal) sont approuvées chaque année à l'automne par le Conseil fédéral et l'Office fédéral de la santé publique (OFSP). Nos bases de données sont mises à jour immédiatement dès la publication officielle des tarifs et synchronisées en temps réel.
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold text-fennec-brown pt-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Dernière mise à jour des données : Barèmes officiels 2026 en vigueur.
          </div>
        </div>

        {/* CTA */}
        <div className="bg-linear-to-r from-fennec-dark to-fennec-brown text-white rounded-3xl p-8 text-center space-y-4 shadow-xl">
          <h3 className="font-display font-black text-2xl">
            Testez la précision de notre comparateur
          </h3>
          <p className="text-white/80 text-sm max-w-xl mx-auto leading-relaxed">
            Accédez à toutes les offres suisses officielles en quelques clics sans engagement.
          </p>
          <div className="pt-2">
            <button
              onClick={onStartComparison}
              className="bg-fennec-terracotta hover:bg-fennec-terracotta/90 text-white font-display font-bold px-8 py-3.5 rounded-full text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Lancer une simulation neutre
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
