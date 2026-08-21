/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Sources Officielles & Registres Publics Suisses
 * E-E-A-T Trust & Authority Foundation for Le Fennec Malin
 */

import React from 'react';
import { 
  Database, 
  ExternalLink, 
  ShieldCheck, 
  FileText, 
  Building2, 
  Landmark, 
  Scale, 
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Clock,
  BookOpen
} from 'lucide-react';
import SEOHead, { breadcrumbSchema, organizationSchema, faqSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { useLanguage } from '../../i18n/LanguageContext';
import { AppTab } from '../../types';

interface Props {
  onStartComparison: () => void;
  onGoHome: () => void;
  onNavigate?: (url: string) => void;
}

const SOURCES_FAQS = [
  {
    question: "D'où proviennent exactement les primes d'assurance maladie affichées sur Le Fennec Malin ?",
    answer: "Toutes les primes d'assurance obligatoire des soins (LAMal / KVG) proviennent directement des jeux de données ouverts officiels publiés par l'Office fédéral de la santé publique (OFSP / BAG) sur la plateforme priminfo.admin.ch pour l'année 2026. Aucune prime n'est inventée ou estimée."
  },
  {
    question: "Les données sont-elles mises à jour lors des annonces fédérales ?",
    answer: "Oui, les barèmes sont actualisés dès leur publication officielle par le Conseil fédéral et l'OFSP à la fin du mois de septembre de chaque année pour l'exercice suivant."
  },
  {
    question: "Comment sont vérifiés les plafonds et déductions du 3ème pilier (3a / 3b) ?",
    answer: "Les montants maximaux déductibles de l'impôt sur le revenu (CHF 7'258 pour les salariés affiliés au 2e pilier et CHF 36'288 pour les indépendants en 2026) sont conformes aux ordonnances de l'Administration fédérale des contributions (AFC / ESTV) et à l'OPP 3."
  },
  {
    question: "Le comparateur respecte-t-il les exigences de la FINMA et de la LSA ?",
    answer: "Oui, Le Fennec Malin respecte rigoureusement la Loi sur la surveillance des assurances (LSA, RS 961.01) et met à disposition du public toutes les informations relatives à l'Article 45 LSA ainsi que les liens vers le registre public des intermédiaires d'assurance de la FINMA."
  }
];

export default function SourcesPage({ onStartComparison, onGoHome, onNavigate }: Props) {
  const { language } = useLanguage();

  const structured = [
    organizationSchema,
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'Sources Officielles', url: '/sources/' }
    ]),
    faqSchema(SOURCES_FAQS)
  ];

  return (
    <>
      <SEOHead
        tab={'sources' as AppTab}
        language={language}
        title="Sources Officielles, Données Publiques & Références Légales | Le Fennec Malin"
        description="Transparence intégrale sur nos sources de données suisses : OFSP (Priminfo 2026), FINMA (Registre LSA), AFC (Fiscalité 3e pilier) et Fedlex."
        structuredData={structured}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: onGoHome },
            { label: 'Sources Officielles & Références' }
          ]}
        />

        {/* Hero */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-fennec-terracotta/10 text-fennec-terracotta text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
            <Database className="w-3.5 h-3.5" />
            Transparence et Rigueur Helvétique (E-E-A-T)
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-fennec-dark mb-4 leading-tight">
            Sources de données officielles et registres suisses
          </h1>
          <p className="text-fennec-dark/75 text-base sm:text-lg leading-relaxed">
            Chez <strong>Le Fennec Malin</strong>, chaque chiffre, chaque barème de prime et chaque règle fiscale repose exclusivement sur des publications officielles de la Confédération suisse et des cantons. Nous refusons catégoriquement les données spéculatives ou non vérifiées.
          </p>
        </div>

        {/* Core Pillars of Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {/* OFSP */}
          <div className="bg-white rounded-3xl border border-fennec-cream/60 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
                  Santé Publique
                </span>
                <Landmark className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="font-display font-bold text-xl text-fennec-dark mb-2">
                Office fédéral de la santé publique (OFSP / BAG)
              </h2>
              <p className="text-sm text-fennec-dark/75 leading-relaxed mb-4">
                Source primaire pour la totalité des primes d'assurance maladie obligatoire (LAMal / KVG) 2026, les régions de primes cantonales, les réductions pour modèles alternatifs (Telmed, HMO, Médecin de famille) et les statistiques des coûts de la santé.
              </p>
              <ul className="text-xs text-fennec-dark/70 space-y-1.5 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Base de données officielle Priminfo (priminfo.admin.ch)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Statistiques de la LAMal et réserve de solvabilité des caisses</span>
                </li>
              </ul>
            </div>
            <a
              href="https://www.priminfo.admin.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              <span>Consulter priminfo.admin.ch</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* FINMA */}
          <div className="bg-white rounded-3xl border border-fennec-cream/60 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">
                  Surveillance Financière
                </span>
                <ShieldCheck className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="font-display font-bold text-xl text-fennec-dark mb-2">
                Autorité fédérale de surveillance des marchés (FINMA)
              </h2>
              <p className="text-sm text-fennec-dark/75 leading-relaxed mb-4">
                Autorité suisse de régulation des banques, des compagnies d'assurance privée et des intermédiaires d'assurance. Registre public officiel garantissant la transparence des accréditations professionnelles.
              </p>
              <ul className="text-xs text-fennec-dark/70 space-y-1.5 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Registre public des intermédiaires d'assurance (Art. 45 LSA)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Surveillance des contrats d'assurance complémentaire LCA et vie</span>
                </li>
              </ul>
            </div>
            <a
              href="https://www.finma.ch/fr/surveillance/versicherungsvermittler/registersuche/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-800 transition-colors"
            >
              <span>Accéder au registre public FINMA</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* AFC / ESTV */}
          <div className="bg-white rounded-3xl border border-fennec-cream/60 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-full">
                  Fiscalité & Prévoyance
                </span>
                <Building2 className="w-5 h-5 text-amber-700" />
              </div>
              <h2 className="font-display font-bold text-xl text-fennec-dark mb-2">
                Administration fédérale des contributions (AFC / ESTV)
              </h2>
              <p className="text-sm text-fennec-dark/75 leading-relaxed mb-4">
                Source officielle pour les barèmes d'imposition du revenu, les taux d'imposition du retrait de capital de prévoyance et les plafonds de déductibilité fiscale du 3ème pilier (3a / 3b).
              </p>
              <ul className="text-xs text-fennec-dark/70 space-y-1.5 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>Plafond annuel 3a 2026 : CHF 7'258 (salariés) / CHF 36'288 (indépendants)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>Ordonnance sur les déductions fiscales pour la prévoyance (OPP 3)</span>
                </li>
              </ul>
            </div>
            <a
              href="https://www.estv.admin.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 hover:text-amber-900 transition-colors"
            >
              <span>Consulter estv.admin.ch</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* FEDLEX */}
          <div className="bg-white rounded-3xl border border-fennec-cream/60 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-full">
                  Recueil Législatif Fédéral
                </span>
                <Scale className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="font-display font-bold text-xl text-fennec-dark mb-2">
                Fedlex — Recueil officiel du droit suisse
              </h2>
              <p className="text-sm text-fennec-dark/75 leading-relaxed mb-4">
                Plateforme officielle de publication du droit fédéral suisse où sont consignées l'ensemble des lois et ordonnances régissant les contrats d'assurance et la santé publique.
              </p>
              <ul className="text-xs text-fennec-dark/70 space-y-1.5 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>LAMal (RS 832.10) — Loi sur l'assurance-maladie</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>LCA (RS 221.229.1) — Loi sur le contrat d'assurance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>LSA (RS 961.01) — Loi sur la surveillance des assurances</span>
                </li>
              </ul>
            </div>
            <a
              href="https://www.fedlex.admin.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-purple-700 hover:text-purple-800 transition-colors"
            >
              <span>Accéder à fedlex.admin.ch</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Cantonal Health Authorities Table */}
        <div className="bg-white rounded-3xl border border-fennec-cream/60 p-6 sm:p-8 mb-10 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-fennec-terracotta" />
            <h2 className="font-display font-bold text-xl sm:text-2xl text-fennec-dark">
              Services cantonaux d'assurance-maladie et de subsides
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-fennec-dark/75 leading-relaxed mb-6">
            Les critères d'octroi et barèmes des subsides d'assurance maladie sont fixés par chaque canton. Voici les services officiels compétents :
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-fennec-cream text-fennec-dark font-bold bg-fennec-cream/20">
                  <th className="py-3 px-3">Canton</th>
                  <th className="py-3 px-3">Organisme Officiel</th>
                  <th className="py-3 px-3">Portail d'information</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-fennec-cream/40 text-fennec-dark/80">
                <tr>
                  <td className="py-3 px-3 font-semibold">Genève (GE)</td>
                  <td className="py-3 px-3">Service de l'assurance-maladie (SAM)</td>
                  <td className="py-3 px-3">
                    <a href="https://www.ge.ch/subside-assurance-maladie" target="_blank" rel="noopener noreferrer" className="text-fennec-terracotta hover:underline inline-flex items-center gap-1 font-semibold">
                      ge.ch/sam <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold">Vaud (VD)</td>
                  <td className="py-3 px-3">Office vaudois de l'assurance-maladie (OVAM)</td>
                  <td className="py-3 px-3">
                    <a href="https://www.vd.ch/subside-assurance-maladie" target="_blank" rel="noopener noreferrer" className="text-fennec-terracotta hover:underline inline-flex items-center gap-1 font-semibold">
                      vd.ch/ovam <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold">Valais (VS)</td>
                  <td className="py-3 px-3">Caisse de compensation du Canton du Valais (CCAM)</td>
                  <td className="py-3 px-3">
                    <a href="https://www.vs.ch/web/sps/subsides" target="_blank" rel="noopener noreferrer" className="text-fennec-terracotta hover:underline inline-flex items-center gap-1 font-semibold">
                      vs.ch/ccam <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold">Fribourg (FR)</td>
                  <td className="py-3 px-3">Établissement cantonal des assurances sociales (ECAS)</td>
                  <td className="py-3 px-3">
                    <a href="https://www.ecasfr.ch" target="_blank" rel="noopener noreferrer" className="text-fennec-terracotta hover:underline inline-flex items-center gap-1 font-semibold">
                      ecasfr.ch <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold">Neuchâtel (NE)</td>
                  <td className="py-3 px-3">Service de l'action sociale et de l'assurance-maladie (SAS)</td>
                  <td className="py-3 px-3">
                    <a href="https://www.ne.ch/autorites/DECS/SAS/Pages/accueil.aspx" target="_blank" rel="noopener noreferrer" className="text-fennec-terracotta hover:underline inline-flex items-center gap-1 font-semibold">
                      ne.ch/sas <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold">Jura (JU)</td>
                  <td className="py-3 px-3">Caisse de compensation du canton du Jura (CCJU)</td>
                  <td className="py-3 px-3">
                    <a href="https://www.ccju.ch" target="_blank" rel="noopener noreferrer" className="text-fennec-terracotta hover:underline inline-flex items-center gap-1 font-semibold">
                      ccju.ch <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold">Berne (BE)</td>
                  <td className="py-3 px-3">Ausgleichskasse des Kantons Bern (AKB)</td>
                  <td className="py-3 px-3">
                    <a href="https://www.akb.ch" target="_blank" rel="noopener noreferrer" className="text-fennec-terracotta hover:underline inline-flex items-center gap-1 font-semibold">
                      akb.ch <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold">Zurich (ZH)</td>
                  <td className="py-3 px-3">SVA Zürich — Prämienverbilligung</td>
                  <td className="py-3 px-3">
                    <a href="https://www.svazurich.ch/ipv" target="_blank" rel="noopener noreferrer" className="text-fennec-terracotta hover:underline inline-flex items-center gap-1 font-semibold">
                      svazurich.ch/ipv <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-3xl border border-fennec-cream/60 p-6 sm:p-8 mb-10 shadow-xs">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-5 h-5 text-fennec-terracotta" />
            <h2 className="font-display font-bold text-xl sm:text-2xl text-fennec-dark">
              Questions fréquentes sur nos sources et notre indépendance
            </h2>
          </div>
          <div className="space-y-4">
            {SOURCES_FAQS.map((faq, idx) => (
              <div key={idx} className="p-4 bg-[#FAF7F3] rounded-2xl border border-fennec-cream/50">
                <h3 className="font-display font-bold text-sm text-fennec-dark mb-2">
                  {faq.question}
                </h3>
                <p className="text-xs text-fennec-dark/75 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-fennec-dark to-[#241A15] text-white rounded-3xl p-8 text-center space-y-4 shadow-md">
          <h2 className="font-display font-bold text-2xl">
            Comparez les tarifs officiels certifiés 2026
          </h2>
          <p className="text-white/80 text-sm max-w-xl mx-auto">
            Utilisez notre comparateur gratuit pour calculer vos économies réelles sur la base des barèmes de l'Office fédéral de la santé publique.
          </p>
          <button
            onClick={onStartComparison}
            className="inline-flex items-center gap-2 bg-fennec-terracotta hover:bg-fennec-terracotta/90 text-white font-display font-bold px-7 py-3.5 rounded-full shadow-md transition-all active:scale-95 text-xs uppercase tracking-wider cursor-pointer"
          >
            Lancer une simulation officielle
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
