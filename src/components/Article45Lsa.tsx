/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Scale, ExternalLink, ShieldCheck, FileText, ArrowLeft, BookOpen, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AppTab } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { teleportToTop } from '../utils/scrollUtils';

interface Article45LsaProps {
  onGoBack?: () => void;
  onTabChange?: (tab: AppTab) => void;
}

export default function Article45Lsa({ onGoBack, onTabChange }: Article45LsaProps) {
  const { language } = useLanguage();

  const handleBack = () => {
    if (onGoBack) {
      onGoBack();
    } else if (onTabChange) {
      onTabChange('home');
    }
    teleportToTop();
  };

  return (
    <div id="article-45-lsa-page" className="max-w-4xl mx-auto space-y-10 py-6 px-4 sm:px-6">
      
      {/* Top Breadcrumb & Back action */}
      <div className="flex items-center justify-between border-b border-fennec-cream/40 pb-4">
        <button
          id="btn-back-from-lsa"
          onClick={handleBack}
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-fennec-dark/70 hover:text-fennec-terracotta transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au comparateur</span>
        </button>
        <div className="flex items-center space-x-2 text-xs text-fennec-brown">
          <Scale className="w-3.5 h-3.5 text-fennec-terracotta" />
          <span className="font-semibold">Loi sur la surveillance des assurances (LSA)</span>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="bg-gradient-to-br from-white via-[#FAF7F3] to-[#F5ECE3] rounded-3xl border border-fennec-cream p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="p-4 bg-fennec-dark text-white rounded-2xl shrink-0 shadow-md">
            <Scale className="w-8 h-8 text-fennec-tan" />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-fennec-terracotta/10 text-fennec-terracotta rounded-full text-xs font-bold tracking-wide">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Texte légal officiel — Confédération suisse</span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-fennec-dark tracking-tight">
              Article 45 LSA
            </h1>
            <p className="text-sm text-fennec-dark/75 leading-relaxed">
              Loi fédérale sur la surveillance des entreprises d'assurance (LSA) — Obligations d’information, prévention des conflits d’intérêts et publicité des rémunérations.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-fennec-cream/60 flex flex-wrap items-center justify-between gap-4 text-xs text-fennec-dark/70">
          <span>Source officielle : <strong>Fedlex (Recueil officiel du droit fédéral suisse)</strong></span>
          <a
            id="link-fedlex-lsa"
            href="https://www.fedlex.admin.ch/eli/cc/2005/734/fr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-fennec-cream hover:border-fennec-terracotta text-fennec-dark hover:text-fennec-terracotta font-semibold rounded-full shadow-2xs transition-all"
          >
            <span>Consulter sur Fedlex (admin.ch)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Legal Content Container */}
      <div className="bg-white rounded-3xl border border-fennec-cream p-6 sm:p-10 shadow-sm space-y-10">

        {/* Introduction Context */}
        <div className="p-4 bg-[#FAF7F3] rounded-2xl border border-fennec-cream/50 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-fennec-terracotta shrink-0 mt-0.5" />
          <p className="text-xs text-fennec-dark/80 leading-relaxed">
            Le comparateur <strong>Le Fennec Malin</strong> s'engage pour une transparence totale envers les consommateurs suisses. Conformément aux dispositions légales de la LSA applicables aux intermédiaires d'assurance en Suisse, voici l'intégralité des articles 45, 45a et 45b de la loi :
          </p>
        </div>

        {/* Section 1: Art. 45 */}
        <section id="art-45" className="space-y-4">
          <div className="flex items-center gap-3 border-b border-fennec-cream pb-3">
            <span className="px-3 py-1 bg-fennec-dark text-white text-xs font-black rounded-lg font-mono">
              Art. 45
            </span>
            <h2 className="font-display font-extrabold text-xl text-fennec-dark">
              Obligation d’information
            </h2>
          </div>

          <div className="space-y-4 text-sm text-fennec-dark/85 leading-relaxed">
            <p className="font-semibold text-fennec-dark">
              1 L’intermédiaire d’assurance communique au preneur d’assurance les informations suivantes :
            </p>

            <div className="grid grid-cols-1 gap-3 pl-2 sm:pl-4">
              <div className="p-3.5 bg-[#FDFBF9] rounded-xl border border-fennec-cream/40 flex items-start gap-3">
                <span className="font-mono font-bold text-fennec-terracotta text-sm shrink-0">a.</span>
                <p>son nom et son adresse ;</p>
              </div>

              <div className="p-3.5 bg-[#FDFBF9] rounded-xl border border-fennec-cream/40 flex items-start gap-3">
                <span className="font-mono font-bold text-fennec-terracotta text-sm shrink-0">b.</span>
                <p>le genre d’intermédiation, lié ou non lié et, dans le premier cas, le nom et l’adresse des entreprises d’assurance sur mandat desquelles il agit ;</p>
              </div>

              <div className="p-3.5 bg-[#FDFBF9] rounded-xl border border-fennec-cream/40 flex items-start gap-3">
                <span className="font-mono font-bold text-fennec-terracotta text-sm shrink-0">c.</span>
                <p>la façon dont le preneur d’assurance peut s’informer sur la formation initiale et la formation continue de l’intermédiaire d’assurance ;</p>
              </div>

              <div className="p-3.5 bg-[#FDFBF9] rounded-xl border border-fennec-cream/40 flex items-start gap-3">
                <span className="font-mono font-bold text-fennec-terracotta text-sm shrink-0">d.</span>
                <p>l’identité de la personne à laquelle il est possible d’attribuer la responsabilité des négligences ou des fautes que l’intermédiaire d’assurance commet ou des informations erronées qu’il fournit dans le cadre de son activité ;</p>
              </div>

              <div className="p-3.5 bg-[#FDFBF9] rounded-xl border border-fennec-cream/40 flex items-start gap-3">
                <span className="font-mono font-bold text-fennec-terracotta text-sm shrink-0">e.</span>
                <p>la façon dont les données personnelles sont traitées, en particulier le but et l’étendue du traitement ainsi que les destinataires et la conservation des données traitées.</p>
              </div>
            </div>

            <p className="pt-2">
              <strong>2</strong> Les informations prévues à l’al. 1 doivent être formulées de manière compréhensible. Elles peuvent être mises à la disposition du preneur d’assurance sous une forme standardisée, sur papier ou électroniquement.
            </p>

            <p>
              <strong>3</strong> Elles doivent être fournies au preneur d’assurance de sorte que celui-ci puisse en avoir connaissance lorsqu’il propose ou accepte le contrat d’assurance.
            </p>
          </div>
        </section>

        {/* Section 2: Art. 45a */}
        <section id="art-45a" className="space-y-4">
          <div className="flex items-center gap-3 border-b border-fennec-cream pb-3">
            <span className="px-3 py-1 bg-fennec-dark text-white text-xs font-black rounded-lg font-mono">
              Art. 45a
            </span>
            <h2 className="font-display font-extrabold text-xl text-fennec-dark">
              Prévention des conflits d’intérêts
            </h2>
          </div>

          <div className="space-y-3 text-sm text-fennec-dark/85 leading-relaxed pl-2 sm:pl-4">
            <p>
              <strong>1</strong> Les intermédiaires d’assurance prennent des mesures organisationnelles adéquates pour prévenir les conflits d’intérêts qui pourraient survenir lors de l’intermédiation de services d’assurance ou pour exclure les désavantages qui pourraient résulter de ces conflits pour les preneurs d’assurance.
            </p>
            <p>
              <strong>2</strong> Si un désavantage pour les preneurs d’assurance ne peut être exclu, il doit leur être communiqué avant la conclusion du contrat d’assurance.
            </p>
            <p>
              <strong>3</strong> Le Conseil fédéral peut fixer les modalités ; il peut définir en particulier les comportements qui sont proscrits dans tous les cas en raison de conflits d’intérêts.
            </p>
          </div>
        </section>

        {/* Section 3: Art. 45b */}
        <section id="art-45b" className="space-y-4">
          <div className="flex items-center gap-3 border-b border-fennec-cream pb-3">
            <span className="px-3 py-1 bg-fennec-dark text-white text-xs font-black rounded-lg font-mono">
              Art. 45b
            </span>
            <h2 className="font-display font-extrabold text-xl text-fennec-dark">
              Publicité des rémunérations
            </h2>
          </div>

          <div className="space-y-3 text-sm text-fennec-dark/85 leading-relaxed pl-2 sm:pl-4">
            <p>
              <strong>1</strong> Les intermédiaires d’assurance non liés peuvent accepter des rémunérations de la part d’entreprises d’assurance ou d’autres tiers s’ils ont informé expressément les preneurs d’assurance de cette rémunération.
            </p>
            
            <p className="font-semibold text-fennec-dark">
              <strong>2</strong> Lorsqu’ils sont rétribués par les preneurs d’assurance, ils peuvent accepter des rémunérations de la part d’entreprises d’assurance ou d’autres tiers uniquement :
            </p>

            <div className="grid grid-cols-1 gap-2 pl-2 sm:pl-4">
              <div className="p-3 bg-[#FDFBF9] rounded-xl border border-fennec-cream/40 flex items-start gap-3">
                <span className="font-mono font-bold text-fennec-terracotta text-sm shrink-0">a.</span>
                <p>s’ils ont informé expressément les preneurs d’assurance de cette rémunération et que ceux-ci ont renoncé explicitement à ce que la rémunération leur soit transférée, ou</p>
              </div>

              <div className="p-3 bg-[#FDFBF9] rounded-xl border border-fennec-cream/40 flex items-start gap-3">
                <span className="font-mono font-bold text-fennec-terracotta text-sm shrink-0">b.</span>
                <p>si la rémunération est transférée dans son intégralité aux preneurs d’assurance.</p>
              </div>
            </div>

            <p className="pt-2">
              <strong>3</strong> Les informations visées aux al. 1 et 2 doivent comprendre le type et l’ampleur de la rémunération et précéder la fourniture du service ou la conclusion du contrat. Si le montant ne peut être déterminé à l’avance, les preneurs d’assurance doivent être informés des critères de calcul et des ordres de grandeur. Sur demande, les intermédiaires d’assurance communiquent les montants effectivement reçus.
            </p>

            <p>
              <strong>4</strong> Par rémunération, on entend les prestations que les intermédiaires d’assurance non liés reçoivent de tiers en relation avec la fourniture d’un service, notamment les commissions de courtage, les autres commissions, les provisions, les rabais ou d’autres avantages pécuniaires.
            </p>
          </div>
        </section>

      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-fennec-cream/50 shadow-2xs">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-semibold text-fennec-dark">
            Consultation conforme aux directives fédérales FINMA et LSA
          </span>
        </div>
        <div className="flex items-center gap-3">
          {onTabChange && (
            <button
              id="btn-goto-qualifications"
              onClick={() => {
                onTabChange('qualifications-intermediaire');
                teleportToTop();
              }}
              className="px-4 py-2 bg-fennec-cream/60 hover:bg-fennec-cream text-fennec-dark text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Qualifications de l’intermédiaire →
            </button>
          )}
          <button
            id="btn-return-home"
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
