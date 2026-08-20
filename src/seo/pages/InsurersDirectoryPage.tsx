/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Shield,
  ArrowRight,
  CheckCircle2,
  Star,
  Building2,
  Users,
  Search,
  Sparkles,
  Award,
  TrendingUp,
  Scale,
  ExternalLink,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import SEOHead, { breadcrumbSchema, faqSchema, organizationSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { INSURERS_SEO_DATA, InsurerSEOData } from '../data/insurersData';
import { useLanguage } from '../../i18n/LanguageContext';
import { AppTab } from '../../types';

interface Props {
  onStartComparison: () => void;
  onGoHome: () => void;
  onNavigate: (url: string) => void;
}

const DIRECTORY_FAQS = [
  {
    question: "Toutes les caisses maladie proposent-elles les mêmes remboursements de base (LAMal) ?",
    answer: "Oui, la loi fédérale sur l'assurance-maladie (LAMal) impose un catalogue de prestations strictement identique à toutes les caisses suisses (consultations, hospitalisations en division commune, médicaments prescrits, maternité). Seuls le montant des primes, la qualité du service client et les modèles d'accès aux soins varient."
  },
  {
    question: "Quelle est la différence entre le tiers payant et le tiers garant ?",
    answer: "En tiers payant, la caisse maladie règle directement les factures de médecin, d'hôpital et de pharmacie. En tiers garant (courant chez les caisses économiques comme Assura), vous avancez l'argent et demandez le remboursement à votre assureur."
  },
  {
    question: "Peut-on séparer son assurance de base LAMal et ses assurances complémentaires LCA auprès de deux caisses différentes ?",
    answer: "Oui, la loi vous autorise parfaitement à souscrire votre assurance de base auprès de la caisse la moins chère et à conserver vos assurances complémentaires auprès d'un autre assureur sans pénalité."
  },
  {
    question: "Quand et comment changer de caisse maladie en Suisse ?",
    answer: "Pour l'assurance obligatoire des soins (LAMal), vous pouvez changer de caisse chaque année pour le 1er janvier, à condition d'envoyer votre lettre de résiliation recommandée avant le 30 novembre (dernier jour ouvrable)."
  }
];

export default function InsurersDirectoryPage({ onStartComparison, onGoHome, onNavigate }: Props) {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'marketShare' | 'name'>('rating');

  const insurersList = Object.values(INSURERS_SEO_DATA);

  const filteredInsurers = insurersList.filter((ins) => {
    const term = searchTerm.toLowerCase();
    return (
      ins.name.toLowerCase().includes(term) ||
      ins.headquarters.toLowerCase().includes(term) ||
      ins.tagline.toLowerCase().includes(term)
    );
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.satisfactionRating - a.satisfactionRating;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return parseInt(b.foundedYear.toString()) - parseInt(a.foundedYear.toString());
  });

  const structured = [
    organizationSchema,
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'Caisses Maladie', url: '/fr/caisses-maladie/' }
    ]),
    faqSchema(DIRECTORY_FAQS)
  ];

  return (
    <>
      <SEOHead
        tab={'hub-insurers' as AppTab}
        language={language}
        title="Caisses Maladie Suisse 2026 — Annuaire, Primes & Comparatif des Assureurs | Le Fennec Malin"
        description="Guide complet et comparatif des caisses maladie en Suisse : CSS, Helsana, Swica, Groupe Mutuel, Assura, Sanitas, Visana, Concordia, KPT. Primes officielles 2026 et avis."
        structuredData={structured}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: onGoHome },
            { label: 'Caisses Maladie' }
          ]}
        />

        {/* Hero Header */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-10 mb-8">
          <div className="max-w-3xl">
            <span className="bg-fennec-terracotta/10 text-fennec-rust text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-fennec-terracotta/20 inline-block mb-3">
              Annuaire officiel 2026
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight mb-4">
              Les Caisses Maladie en Suisse : Comparatif & Fiches Officielles 2026
            </h1>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
              Consultez les fiches détaillées des principaux assureurs-maladie agréés par l'OFSP en Suisse. Comparez leurs primes 2026, la solidité de leurs réserves, leurs délais de remboursement et la satisfaction de leurs assurés.
            </p>
          </div>

          {/* Quick Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-stone-100">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher une caisse (ex: CSS, Helsana)..."
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fennec-terracotta focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs font-semibold text-stone-500 shrink-0">Trier par :</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-stone-50 border border-stone-200 text-stone-800 text-xs font-bold py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-fennec-terracotta"
              >
                <option value="rating">Satisfaction client (Score)</option>
                <option value="name">Ordre alphabétique</option>
              </select>
            </div>
          </div>
        </div>

        {/* Insurers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredInsurers.map((ins) => (
            <div
              key={ins.id}
              id={`card-insurer-${ins.slug}`}
              className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between flex-1"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-base shadow-sm"
                      style={{ backgroundColor: ins.brandColor }}
                    >
                      {ins.name.slice(0, 3).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="font-extrabold text-stone-900 text-lg leading-snug">
                        {ins.name}
                      </h2>
                      <span className="text-xs text-stone-500">
                        {ins.headquarters} ({ins.cantonHq}) · {ins.bagRegistration}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-stone-600 text-xs leading-relaxed line-clamp-2 mb-4">
                  {ins.tagline}
                </p>

                {/* Key stats pill row */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                  <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                    <div className="text-[10px] uppercase font-bold text-stone-400">Satisfaction</div>
                    <div className="flex items-center gap-1 text-stone-900 font-extrabold text-sm">
                      <span>{ins.satisfactionRating} / 6.0</span>
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    </div>
                  </div>

                  <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                    <div className="text-[10px] uppercase font-bold text-stone-400">Évolution 2026</div>
                    <div className="text-stone-900 font-extrabold text-sm">
                      {ins.evolution2026.split(' ')[0]}
                    </div>
                  </div>
                </div>

                {/* Strengths list */}
                <ul className="space-y-1.5 mb-6 text-xs text-stone-700">
                  {ins.strengths.slice(0, 2).map((s, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-stone-100 flex items-center gap-2">
                <button
                  onClick={() => onNavigate(`/fr/caisses-maladie/${ins.slug}/`)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-bold py-2.5 px-3 rounded-xl transition-colors"
                >
                  <span>Fiche complète</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onStartComparison}
                  className="inline-flex items-center justify-center gap-1 bg-fennec-terracotta hover:bg-fennec-rust text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-colors shrink-0"
                >
                  <span>Comparer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Head-to-Head Comparisons Hub Box */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2 flex items-center gap-2">
            <Scale className="w-6 h-6 text-fennec-terracotta" />
            Comparatifs directs entre assureurs suisses
          </h2>
          <p className="text-stone-500 text-sm mb-6">
            Découvrez nos face-à-face neutres pour choisir entre deux caisses concurrentes :
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div
              onClick={() => onNavigate('/fr/caisses-maladie/css/')}
              className="p-4 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl cursor-pointer transition-all"
            >
              <div className="font-bold text-stone-900 text-sm mb-1">CSS vs Helsana</div>
              <p className="text-xs text-stone-500">Comparatif des deux géants leaders de l'assurance santé suisse.</p>
            </div>

            <div
              onClick={() => onNavigate('/fr/caisses-maladie/assura/')}
              className="p-4 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl cursor-pointer transition-all"
            >
              <div className="font-bold text-stone-900 text-sm mb-1">Assura vs Groupe Mutuel</div>
              <p className="text-xs text-stone-500">Le match de la Romandie : prime économique contre service de proximité.</p>
            </div>

            <div
              onClick={() => onNavigate('/fr/caisses-maladie/swica/')}
              className="p-4 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl cursor-pointer transition-all"
            >
              <div className="font-bold text-stone-900 text-sm mb-1">SWICA vs Sanitas</div>
              <p className="text-xs text-stone-500">Comparatif axé sur les contributions sportives et l'innovation digitale.</p>
            </div>
          </div>
        </div>

        {/* Directory FAQs */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-fennec-terracotta" />
            Questions fréquentes sur les caisses maladie en Suisse
          </h2>
          <div className="space-y-4">
            {DIRECTORY_FAQS.map((faq, idx) => (
              <div key={idx} className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <h3 className="font-bold text-stone-900 text-sm sm:text-base mb-2">{faq.question}</h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-br from-stone-900 to-stone-800 text-white rounded-2xl p-8 text-center shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Calculez vos primes 2026 auprès de toutes les caisses
          </h2>
          <p className="text-stone-300 max-w-2xl mx-auto mb-6 text-sm sm:text-base">
            Notre comparateur neutre applique les tarifs officiels certifiés OFSP pour vous indiquer immédiatement la caisse la moins chère selon votre canton et votre franchise.
          </p>
          <button
            onClick={onStartComparison}
            className="inline-flex items-center gap-2 bg-fennec-terracotta hover:bg-fennec-rust text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-transform hover:scale-105"
          >
            <span>Lancer la comparaison gratuite</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
}
