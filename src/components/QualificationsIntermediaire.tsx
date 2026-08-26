/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UserCheck, ExternalLink, AlertTriangle, Shield, ArrowLeft, Search, CheckCircle, FileCheck } from 'lucide-react';
import { AppTab } from '../types';
import { teleportToTop } from '../utils/scrollUtils';

interface QualificationsIntermediaireProps {
  onGoBack?: () => void;
  onTabChange?: (tab: AppTab) => void;
}

export default function QualificationsIntermediaire({ onGoBack, onTabChange }: QualificationsIntermediaireProps) {
  const handleBack = () => {
    if (onGoBack) {
      onGoBack();
    } else if (onTabChange) {
      onTabChange('home');
    }
    teleportToTop();
  };

  const finmaRegisterUrl = "https://www.finma.ch/fr/surveillance/versicherungsvermittler/registersuche/";

  return (
    <div id="qualifications-intermediaire-page" className="max-w-4xl mx-auto space-y-10 py-6 px-4 sm:px-6">
      
      {/* Top Breadcrumb & Back action */}
      <div className="flex items-center justify-between border-b border-fennec-cream/40 pb-4">
        <button
          id="btn-back-from-qualif"
          onClick={handleBack}
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-fennec-dark/70 hover:text-fennec-terracotta transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au comparateur</span>
        </button>
        <div className="flex items-center space-x-2 text-xs text-fennec-brown">
          <UserCheck className="w-3.5 h-3.5 text-fennec-terracotta" />
          <span className="font-semibold">Vérification & Sécurité Client</span>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="bg-gradient-to-br from-white via-[#FAF7F3] to-[#F5ECE3] rounded-3xl border border-fennec-cream p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="p-4 bg-fennec-dark text-white rounded-2xl shrink-0 shadow-md">
            <UserCheck className="w-8 h-8 text-fennec-sand" />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-900 rounded-full text-xs font-bold tracking-wide">
              <Shield className="w-3.5 h-3.5 text-amber-700" />
              <span>Transparence & Rôle de la plateforme</span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-fennec-dark tracking-tight">
              Qualifications de l’intermédiaire
            </h1>
            <p className="text-sm text-fennec-dark/75 leading-relaxed">
              Information essentielle concernant le rôle de mise en relation du comparateur et la vérification des intermédiaires d'assurance auprès des autorités suisses.
            </p>
          </div>
        </div>
      </div>

      {/* Main Notice Box */}
      <div className="bg-white rounded-3xl border border-fennec-cream p-6 sm:p-10 shadow-sm space-y-8">
        
        {/* Paragraph 1: Plateforme de comparaison */}
        <div className="p-5 bg-[#FAF7F3] rounded-2xl border border-fennec-cream/60 space-y-3">
          <div className="flex items-center gap-2.5 text-fennec-dark font-display font-extrabold text-base">
            <FileCheck className="w-5 h-5 text-fennec-terracotta" />
            <h3>Rôle exclusif de comparaison et de mise en relation</h3>
          </div>
          <p className="text-sm text-fennec-dark/85 leading-relaxed text-justify">
            Le comparateur agit exclusivement comme plateforme de comparaison et de mise en relation. Il n’exerce aucune activité de conseil et ne garantit ni les qualifications, ni les autorisations, ni les accréditations des intermédiaires présentés.
          </p>
        </div>

        {/* Paragraph 2: Responsabilité de vérification */}
        <div className="space-y-3 pl-2 sm:pl-4 border-l-4 border-fennec-terracotta">
          <h3 className="font-display font-extrabold text-base text-fennec-dark">
            Responsabilité du client avant tout conseil ou engagement
          </h3>
          <p className="text-sm text-fennec-dark/85 leading-relaxed text-justify">
            Il appartient exclusivement au client de vérifier, avant tout conseil ou engagement, que l’intermédiaire qui le contacte ou se rend à son domicile dispose des qualifications, autorisations et accréditations requises pour le service ou le produit concerné.
          </p>
        </div>

        {/* Paragraph 3: Autorités compétentes */}
        <div className="space-y-3 pl-2 sm:pl-4 border-l-4 border-fennec-sand">
          <h3 className="font-display font-extrabold text-base text-fennec-dark">
            Démarche de contrôle auprès des autorités
          </h3>
          <p className="text-sm text-fennec-dark/85 leading-relaxed text-justify">
            Cette vérification relève de la seule responsabilité du client et doit être effectuée directement auprès des registres ou autorités compétentes lorsque cela est applicable.
          </p>
        </div>

        {/* Paragraph 4: Limite de responsabilité */}
        <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/60 flex items-start gap-3.5">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-950 leading-relaxed text-justify">
            Le comparateur ne peut être tenu responsable des qualifications, autorisations, conseils, actes ou prestations fournis par l’intermédiaire, ni de tout dommage pouvant en résulter, dans les limites autorisées par la loi.
          </p>
        </div>

        {/* Highlighted FINMA Register Box */}
        <div className="bg-gradient-to-r from-fennec-dark to-[#4A3E31] text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <Search className="w-6 h-6 text-fennec-tan" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-widest text-fennec-tan uppercase block">
                Registre public officiel FINMA
              </span>
              <h3 className="font-display font-extrabold text-lg sm:text-xl text-white">
                Contrôlez le statut de votre intermédiaire
              </h3>
            </div>
          </div>

          <p className="text-xs text-fennec-cream/80 leading-relaxed">
            L'Autorité fédérale de surveillance des marchés financiers (FINMA) met à disposition du public un registre officiel permettant de vérifier gratuitement l'agrément et l'immatriculation de tout intermédiaire d'assurance en Suisse.
          </p>

          <div className="pt-2">
            <a
              id="btn-finma-register"
              href={finmaRegisterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-fennec-terracotta hover:bg-fennec-red text-white font-display font-bold text-sm rounded-xl shadow-md hover:scale-101 transition-all"
            >
              <span>Contrôlez maintenant sur le registre FINMA</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          
          <span className="text-[10px] text-fennec-cream/60 block pt-1 font-mono break-all">
            {finmaRegisterUrl}
          </span>
        </div>

      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-fennec-cream/50 shadow-2xs">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-semibold text-fennec-dark">
            Consultez également l'Article 45 LSA pour connaître les obligations légales de l'intermédiaire
          </span>
        </div>
        <div className="flex items-center gap-3">
          {onTabChange && (
            <button
              id="btn-goto-article-45-lsa"
              onClick={() => {
                onTabChange('article-45-lsa');
                teleportToTop();
              }}
              className="px-4 py-2 bg-fennec-cream/60 hover:bg-fennec-cream text-fennec-dark text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              ← Article 45 LSA
            </button>
          )}
          <button
            id="btn-return-home-qualif"
            onClick={handleBack}
            className="px-5 py-2 bg-fennec-dark hover:bg-fennec-terracotta text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Retour au comparateur
          </button>
        </div>
      </div>

    </div>
  );
}
