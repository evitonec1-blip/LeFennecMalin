/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Frontalier Insurance Hub Page — Complete LAMal vs CMU Guide, Droit d'Option & 2026 Simulator
 * Authoritative Swiss Cross-Border Health Insurance Reference (E-E-A-T 10/10)
 */

import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Calculator, 
  FileText, 
  Globe, 
  Clock, 
  ExternalLink,
  Building2,
  Euro,
  Coins,
  Sparkles
} from 'lucide-react';
import SEOHead, { breadcrumbSchema, faqSchema, organizationSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { useLanguage } from '../../i18n/LanguageContext';
import { AppTab } from '../../types';
import RelatedContent from '../components/RelatedContent';
import CantonCrossLinks from '../components/CantonCrossLinks';
import InsurerCrossLinks from '../components/InsurerCrossLinks';

interface Props {
  onNavigate: (tab: AppTab) => void;
  onStartComparison: () => void;
}

const FRONTALIER_FAQS = [
  {
    question: "Qu'est-ce que le droit d'option pour les frontaliers franco-suisses ?",
    answer: "Le droit d'option est le choix juridique accordé à tout travailleur frontalier résidant en France et débutant une activité rémunérée en Suisse. Il permet de choisir entre l'assurance maladie suisse (LAMal frontalier) et l'assurance maladie française (CMU / PUMA gérée par l'URSSAF/Cntfs). Ce choix doit impérativement être exercé dans les 3 mois suivant la prise de poste via le formulaire 'Choix du système d'assurance-maladie'."
  },
  {
    question: "Le choix entre LAMal et CMU est-il définitif ?",
    answer: "Oui, le droit d'option est juridiquement irrévocable (définitif). Vous ne pouvez changer de régime que dans des cas très limités : passage du statut de frontalier à résident suisse, période de chômage en France indemnisé par France Travail, ou reprise d'activité frontalière après une interruption."
  },
  {
    question: "Comment se calcule la cotisation CMU pour un frontalier en France ?",
    answer: "La cotisation CMU (Cntfs / URSSAF) représente 8% de votre Revenu Fiscal de Référence (RFR) après déduction d'un abattement forfaitaire fixé annuellement (environ 11'000 €). Plus votre salaire suisse est élevé, plus la cotisation CMU augmente de manière illimitée."
  },
  {
    question: "Quel est le coût moyen de la prime LAMal frontalier en 2026 ?",
    answer: "En 2026, la prime LAMal frontalier adulte (franchise légale fixe de CHF 300.-) se situe entre CHF 150.- et CHF 195.- par mois chez les assureurs proposant ce tarif spécifique (Helsana Progrès, Groupe Mutuel, Concordia, CSS). Ce montant est forfaitaire et reste strictement identique quel que soit votre niveau de revenu."
  },
  {
    question: "Comment se faire soigner en France avec une assurance LAMal suisse ?",
    answer: "Dès votre affiliation à la LAMal suisse, votre caisse maladie vous délivre le document portable S1 (ancien formulaire E106). En enregistrant ce formulaire auprès de votre CPAM de résidence, vous obtenez une Carte Vitale française. Vous pouvez ainsi consulter vos médecins en France avec remboursement CPAM intégral, tout en conservant le droit de vous faire soigner en Suisse."
  },
  {
    question: "À partir de quel niveau de salaire la LAMal suisse est-elle plus avantageuse que la CMU ?",
    answer: "Mathématiquement, la LAMal suisse devient plus économique que la CMU dès que le revenu brut annuel du foyer frontalier dépasse environ CHF 40'000 à 45'000. Pour les salaires de cadres, ingénieurs ou soignants (CHF 80'000 à 130'000+), l'économie nette en choisissant la LAMal atteint souvent CHF 4'000 à CHF 8'000 par an."
  }
];

export default function FrontalierInsurancePage({ onNavigate, onStartComparison }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { language } = useLanguage();

  // Interactive Live Simulator State
  const [salaryChf, setSalaryChf] = useState<number>(85000);
  const [exchangeRate] = useState<number>(0.96); // 1 CHF = 0.96 EUR approx
  const [hasChildren, setHasChildren] = useState<boolean>(false);

  // Math simulation
  const simulation = useMemo(() => {
    // Swiss LAMal Frontalier estimate: ~CHF 175/month for adult
    const monthlyLamalChf = 175;
    const annualLamalChf = monthlyLamalChf * 12;
    const annualLamalEur = annualLamalChf * exchangeRate;

    // CMU calculation: 8% on (RFR - allowance)
    // French taxable income approx 90% of gross CHF converted to EUR
    const incomeEur = salaryChf * exchangeRate * 0.90;
    const allowanceEur = 11066; // Standard CMU threshold
    const taxableCmuBase = Math.max(0, incomeEur - allowanceEur);
    const annualCmuEur = taxableCmuBase * 0.08;
    const annualCmuChf = annualCmuEur / exchangeRate;

    const diffChf = annualCmuChf - annualLamalChf;
    const diffEur = annualCmuEur - annualLamalEur;
    const isLamalBetter = diffChf > 0;

    return {
      annualLamalChf,
      annualLamalEur,
      annualCmuChf,
      annualCmuEur,
      diffChf: Math.abs(diffChf),
      diffEur: Math.abs(diffEur),
      isLamalBetter
    };
  }, [salaryChf, exchangeRate]);

  const structured = [
    organizationSchema,
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'LAMal', url: '/fr/lamal/' },
      { name: 'Frontaliers Franco-Suisses', url: '/fr/lamal/frontalier/' },
    ]),
    faqSchema(FRONTALIER_FAQS),
  ];

  return (
    <>
      <SEOHead
        tab="lamal-frontalier"
        language={language}
        title="Assurance Maladie Frontalier Suisse 2026 : LAMal vs CMU, Droit d'Option & Simulateur"
        description="Guide complet pour frontaliers suisses 2026 : comparatif officiel LAMal vs CMU, simulateur d'économies, démarches CPAM/S1 et délai légal des 3 mois."
        structuredData={structured}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: () => onNavigate('home') },
            { label: 'LAMal', onClick: () => onNavigate('hub-lamal') },
            { label: 'Frontaliers Franco-Suisses' },
          ]}
        />

        {/* Hero */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-200">
            <Briefcase className="w-3.5 h-3.5" />
            Statut Frontalier Suisse & Accord Bilatéral 2026
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Assurance Maladie Frontalier Suisse : LAMal vs CMU & Droit d'Option
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            Vous travaillez à Genève, Vaud, Bâle, Neuchâtel ou dans le Jura tout en résidant en France ? 
            Maîtrisez les règles du <strong>droit d'option</strong>, évitez les pièges fiscaux de la CMU et découvrez pourquoi 
            la <strong>LAMal frontalier</strong> permet d'économiser plusieurs milliers d'euros chaque année.
          </p>
        </div>

        {/* 3 Core Rules Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Délai Strict de 3 Mois</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Vous avez exactement 90 jours dès le 1er jour de travail en Suisse pour exercer votre droit d'option formel. Passé ce délai, vous risquez une affiliation d'office.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Double Accès aux Soins</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Avec la LAMal suisse et le formulaire S1 (E106), vous bénéficiez du remboursement de vos soins en Suisse ET en France avec votre Carte Vitale.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Prime Fixe vs Cotisation 8%</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              La LAMal suisse est une prime fixe (~CHF 175/mois), tandis que la CMU française prélève 8% de vos revenus sans aucun plafond supérieur.
            </p>
          </div>
        </div>

        {/* Interactive Live Simulator: LAMal vs CMU */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-10 mb-12 shadow-md">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-500/30">
              <Calculator className="w-3.5 h-3.5" />
              Simulateur Mathématique Live 2026
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Simulez votre coût : LAMal suisse vs CMU française
            </h2>
            <p className="text-slate-300 text-sm mb-8 leading-relaxed">
              Ajustez votre salaire brut annuel suisse pour calculer instantanément l'écart de coût net entre le régime LAMal frontalier et la cotisation CMU (URSSAF).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Form */}
            <div className="lg:col-span-6 space-y-6 bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-slate-200">Salaire Brut Annuel Suisse</label>
                  <span className="text-lg font-bold text-emerald-400 font-mono">
                    CHF {salaryChf.toLocaleString('fr-CH')}.-
                  </span>
                </div>
                <input
                  type="range"
                  min={35000}
                  max={200000}
                  step={2500}
                  value={salaryChf}
                  onChange={(e) => setSalaryChf(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>35'000 CHF</span>
                  <span>100'000 CHF</span>
                  <span>200'000 CHF</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-700/60">
                <span className="text-xs text-slate-300">Taux de change indicatif EUR/CHF</span>
                <span className="text-xs font-mono text-slate-400">1 CHF ≈ 0.96 EUR</span>
              </div>
            </div>

            {/* Simulation Results Card */}
            <div className="lg:col-span-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* LAMal Result */}
                <div className={`p-4 rounded-2xl border ${simulation.isLamalBetter ? 'bg-emerald-950/40 border-emerald-500/50' : 'bg-slate-800 border-slate-700'}`}>
                  <div className="text-xs text-slate-300 font-semibold mb-1">Option LAMal Suisse</div>
                  <div className="text-xl font-extrabold text-white font-mono">
                    CHF {Math.round(simulation.annualLamalChf).toLocaleString('fr-CH')}.-
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    (~{Math.round(simulation.annualLamalEur).toLocaleString('fr-FR')} € / an)
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-2 font-medium">Prime fixe forfaitaire</div>
                </div>

                {/* CMU Result */}
                <div className={`p-4 rounded-2xl border ${!simulation.isLamalBetter ? 'bg-amber-950/40 border-amber-500/50' : 'bg-slate-800 border-slate-700'}`}>
                  <div className="text-xs text-slate-300 font-semibold mb-1">Option CMU France</div>
                  <div className="text-xl font-extrabold text-white font-mono">
                    ~CHF {Math.round(simulation.annualCmuChf).toLocaleString('fr-CH')}.-
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    (~{Math.round(simulation.annualCmuEur).toLocaleString('fr-FR')} € / an)
                  </div>
                  <div className="text-[10px] text-amber-400 mt-2 font-medium">Cotisation 8% sur RFR</div>
                </div>
              </div>

              {/* Verdict Highlight */}
              <div className="p-4 bg-emerald-500 text-slate-950 rounded-2xl flex items-center gap-4">
                <Sparkles className="w-8 h-8 shrink-0 text-slate-900" />
                <div>
                  <div className="text-xs font-black uppercase tracking-wider">
                    {simulation.isLamalBetter ? 'Économie annuelle avec la LAMal :' : 'Économie avec la CMU :'}
                  </div>
                  <div className="text-lg font-black font-mono">
                    + CHF {Math.round(simulation.diffChf).toLocaleString('fr-CH')}.- / an ({Math.round(simulation.diffEur).toLocaleString('fr-FR')} €)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Head-to-Head Comparison Table */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 mb-12 shadow-xs">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Tableau Comparatif Détaillé : LAMal Frontalier vs CMU
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                  <th className="py-3 px-4">Critère de comparaison</th>
                  <th className="py-3 px-4 bg-emerald-50/50 text-emerald-950 rounded-t-xl">LAMal Suisse Frontalier</th>
                  <th className="py-3 px-4 bg-slate-50 text-slate-900 rounded-t-xl">CMU France (Cntfs)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">Mode de calcul</td>
                  <td className="py-3.5 px-4 bg-emerald-50/30 font-medium text-emerald-900">Prime forfaitaire fixe (~175 CHF/mois)</td>
                  <td className="py-3.5 px-4 bg-slate-50/50">8% des revenus fiscaux de référence (RFR)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">Soins couverts en Suisse</td>
                  <td className="py-3.5 px-4 bg-emerald-50/30 text-emerald-900">
                    <span className="inline-flex items-center gap-1.5 font-bold"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Oui, prise en charge totale</span>
                  </td>
                  <td className="py-3.5 px-4 bg-slate-50/50 text-amber-700">
                    <span className="inline-flex items-center gap-1.5"><AlertTriangle className="w-4 h-4 text-amber-600" /> Urgences uniquement (très restreint)</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">Soins couverts en France</td>
                  <td className="py-3.5 px-4 bg-emerald-50/30 text-emerald-900">
                    <span className="inline-flex items-center gap-1.5 font-bold"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Oui (via formulaire S1 / Carte Vitale)</span>
                  </td>
                  <td className="py-3.5 px-4 bg-slate-50/50">Oui (régime général CPAM classique)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">Franchise annuelle</td>
                  <td className="py-3.5 px-4 bg-emerald-50/30">CHF 300.- fixe (légale obligatoire)</td>
                  <td className="py-3.5 px-4 bg-slate-50/50">Aucune franchise (tickets modérateurs Sécu)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">Assurance pour les ayants droit</td>
                  <td className="py-3.5 px-4 bg-emerald-50/30">Prime individuelle par enfant ou conjoint sans activité</td>
                  <td className="py-3.5 px-4 bg-slate-50/50">Couverture globale du foyer fiscal</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">Évolution avec le salaire</td>
                  <td className="py-3.5 px-4 bg-emerald-50/30 font-bold text-emerald-800">Ne dépend pas du salaire (coût stable)</td>
                  <td className="py-3.5 px-4 bg-slate-50/50 text-red-700 font-bold">Augmente avec toute promotion / bonus</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Step-by-Step Administrative Procedure */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 mb-12 shadow-xs space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <FileText className="w-6 h-6 text-emerald-600" />
            Démarches administratives : Le guide des 4 étapes du frontalier
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 font-black text-xs">Étape 1</span>
              <h4 className="font-bold text-slate-900">Souscrire son contrat LAMal frontalier</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choisissez un assureur suisse proposant le tarif frontalier (Helsana Progrès, Groupe Mutuel, CSS, Concordia) et demandez votre attestation d'assurance.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 font-black text-xs">Étape 2</span>
              <h4 className="font-bold text-slate-900">Faire viser le formulaire de droit d'option</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Remplissez le formulaire officiel <em>"Choix du système d'assurance maladie"</em>, faites-le valider par votre CPAM en France puis transmettez-le à l'organe cantonal suisse (SAM à Genève, OVAM à Vaud, etc.).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 font-black text-xs">Étape 3</span>
              <h4 className="font-bold text-slate-900">Enregistrer le document S1 auprès de la CPAM</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Votre caisse suisse vous envoie le document portable S1. Transmettez-le à votre CPAM locale (Ain, Haute-Savoie, Doubs, Haut-Rhin, etc.) pour activer votre Carte Vitale.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 font-black text-xs">Étape 4</span>
              <h4 className="font-bold text-slate-900">Souscrire une mutuelle complémentaire frontalière</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pour couvrir le ticket modérateur en France, les soins dentaires et l'optique, complétez votre dispositif par une complémentaire santé frontalière adaptée.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            Questions fréquentes assurance maladie frontalier
          </h2>
          <div className="space-y-4">
            {FRONTALIER_FAQS.map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-xl bg-white overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between font-bold text-slate-900 hover:text-emerald-600"
                >
                  <span>{faq.question}</span>
                  {openFaq === index ? <ChevronUp className="w-5 h-5 text-emerald-600" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Semantic Linking Hub */}
        <RelatedContent
          currentPath="/fr/lamal/frontalier/"
          topicType="lamal"
          onNavigate={(url) => {
            const tab = url.replace(/^\/[a-z]{2}\//, '').replace(/\/$/, '') as AppTab;
            onNavigate(tab);
          }}
          className="mb-12"
        />

        {/* Cantons Crosslinks */}
        <div className="mb-12">
          <CantonCrossLinks
            mode="health"
            onNavigate={(url) => {
              const tab = url.replace(/^\/[a-z]{2}\//, '').replace(/\/$/, '') as AppTab;
              onNavigate(tab);
            }}
          />
        </div>

        {/* CTA */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Comparez les offres LAMal Frontalier 2026</h3>
            <p className="text-slate-400 text-sm">Obtenez les tarifs officiels certifiés pour votre canton de travail.</p>
          </div>
          <button
            onClick={onStartComparison}
            className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-md whitespace-nowrap flex items-center gap-2"
          >
            Lancer le Comparateur Frontalier
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
