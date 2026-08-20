/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HelpCircle, Sparkles, Filter, Search, CheckCircle, ArrowRight, Shield } from 'lucide-react';
import SEOHead, { breadcrumbSchema, organizationSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  onStartComparison: () => void;
  onGoHome: () => void;
}

export default function HowItWorksPage({ onStartComparison, onGoHome }: Props) {
  const { language } = useLanguage();
  const structured = [
    organizationSchema,
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'Comment fonctionne le comparateur', url: '/comment-fonctionne-le-comparateur/' },
    ]),
  ];

  return (
    <>
      <SEOHead
        tab="comment-fonctionne-le-comparateur"
        language={language}
        structuredData={structured}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: onGoHome },
            { label: 'Comment fonctionne le comparateur' },
          ]}
        />

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-fennec-terracotta/10 text-fennec-terracotta text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Simple · Rapide · 100% Gratuit
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-fennec-dark mb-4 leading-tight">
            Comment fonctionne notre comparateur d'assurances ?
          </h1>
          <p className="text-fennec-dark/70 text-lg leading-relaxed">
            Trouver la meilleure assurance en Suisse ne devrait pas être complexe. Suivez les 4 étapes guidées par Fenny pour optimiser vos primes sans compromettre vos garanties.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6 mb-12">
          {[
            {
              step: '01',
              title: "Indiquez votre profil et votre lieu de résidence (NPA)",
              desc: "Votre code postal détermine votre canton et votre région de primes officielle (OFSP). Renseignez votre année de naissance pour appliquer le barème exact (enfant, jeune adulte ou adulte)."
            },
            {
              step: '02',
              title: "Personnalisez votre franchise et votre modèle de soins",
              desc: "Ajustez la franchise annuelle (de CHF 300 à 2'500) et comparez les modèles alternatifs (Telmed, Médecin de famille, HMO) pour débloquer jusqu'à 20% de rabais immédiat sur votre prime mensuelle."
            },
            {
              step: '03',
              title: "Consultez le classement neutre et transparent de toutes les caisses",
              desc: "Visualisez l'ensemble des 37 caisses suisses agréées classées par tarif réel calculé selon vos critères. Analysez les notes de satisfaction client et les spécificités de chaque assureur."
            },
            {
              step: '04',
              title: "Recevez votre offre sans engagement ou téléchargez votre lettre de résiliation",
              desc: "Finalisez votre demande en toute sécurité. Notre équipe et nos partenaires agréés vous accompagnent dans les démarches administratives pour changer de caisse avant l'échéance légale."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-fennec-cream/60 p-7 shadow-xs flex flex-col md:flex-row gap-5 items-start">
              <div className="w-12 h-12 rounded-2xl bg-fennec-terracotta text-white font-display font-black text-lg flex items-center justify-center shrink-0">
                {item.step}
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="font-display font-bold text-lg text-fennec-dark">{item.title}</h3>
                <p className="text-xs sm:text-sm text-fennec-dark/70 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Banner */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-3xl p-7 mb-10 space-y-3">
          <div className="flex items-center gap-2 text-emerald-900 font-display font-bold text-lg">
            <Shield className="w-5 h-5 text-emerald-700" />
            Garantie de neutralité absolue
          </div>
          <p className="text-xs text-emerald-950/80 leading-relaxed">
            Le Fennec Malin n'est affilié à aucune compagnie d'assurance exclusive. Notre outil traite l'ensemble des données officielles publiées par la Confédération suisse en toute impartialité.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-linear-to-r from-fennec-dark to-fennec-brown text-white rounded-3xl p-8 text-center space-y-4 shadow-xl">
          <h3 className="font-display font-black text-2xl">
            Commencez votre comparaison en 2 minutes
          </h3>
          <p className="text-white/80 text-sm max-w-xl mx-auto leading-relaxed">
            Rejoignez les milliers de ménages suisses qui optimisent leurs dépenses d'assurance avec Le Fennec Malin.
          </p>
          <div className="pt-2">
            <button
              onClick={onStartComparison}
              className="bg-fennec-terracotta hover:bg-fennec-terracotta/90 text-white font-display font-bold px-8 py-3.5 rounded-full text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Lancer le comparateur
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
