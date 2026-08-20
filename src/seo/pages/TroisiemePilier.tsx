import React from 'react';
import { TrendingUp, CheckCircle, ArrowRight, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import SEOHead, { breadcrumbSchema, faqSchema, organizationSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  onStartComparison: () => void;
  onGoHome: () => void;
}

const FAQS = [
  {
    question: "Quelle est la différence entre le pilier 3a et le pilier 3b ?",
    answer: "Le pilier 3a (prévoyance liée) est déductible des impôts jusqu'aux plafonds légaux (CHF 7'258 pour les salariés, CHF 36'288 pour les indépendants en 2026), mais les fonds sont bloqués jusqu'à la retraite sauf exceptions légales. Le pilier 3b (prévoyance libre) n'a pas de plafond de cotisation et permet des retraits libres, mais avec des avantages fiscaux limités."
  },
  {
    question: "Combien puis-je déduire de mes impôts avec le pilier 3a en 2026 ?",
    answer: "En 2026, les plafonds de déduction fiscale pour le pilier 3a sont : CHF 7'258 par an pour les salariés affiliés à une caisse de pension (LPP), et CHF 36'288 par an (ou 20% du revenu net) pour les indépendants sans caisse de pension."
  },
  {
    question: "Vaut-il mieux ouvrir un pilier 3a en banque ou en assurance ?",
    answer: "Un pilier 3a bancaire offre plus de flexibilité (retrait possible, pas d'engagement contractuel long terme). Un pilier 3a en assurance inclut des couvertures risque (décès, invalidité) et une exemption de primes en cas d'incapacité de gain. Pour un capital pur avec le meilleur rendement, les fonds en actions via une banque ou un courtier digital surpassent souvent les assurances sur le long terme."
  },
  {
    question: "Peut-on retirer son pilier 3a avant la retraite ?",
    answer: "Oui, dans des cas précis autorisés par la loi : achat de logement principal, début d'une activité indépendante, départ définitif de Suisse, invalidité, ou 5 ans avant l'âge légal de la retraite. Ces retraits sont imposés séparément à un taux réduit."
  },
  {
    question: "Quelle part en actions choisir pour son pilier 3a ?",
    answer: "Plus vous êtes jeune, plus vous pouvez vous permettre une part élevée en actions (50-100%) car vous avez le temps d'absorber les fluctuations. À partir de 10-15 ans avant la retraite, il est conseillé de réduire progressivement la part en actions. Sur 25 ans, un fonds 100% actions a historiquement généré 4-6% de rendement annuel brut."
  },
];

export default function TroisiemePilier({ onStartComparison, onGoHome }: Props) {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const { language } = useLanguage();

  const structured = [
    organizationSchema,
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: '3ème Pilier', url: '/3eme-pilier/' },
    ]),
    faqSchema(FAQS),
  ];

  return (
    <>
      <SEOHead
        tab="seo-pilier"
        language={language}
        structuredData={structured}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: onGoHome },
            { label: '3ème Pilier (3a & 3b)' },
          ]}
        />

        {/* Hero */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-fennec-terracotta/10 text-fennec-terracotta text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            Données actuarielles AFC 2026
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-fennec-dark mb-4 leading-tight">
            Comparateur 3ème pilier suisse
          </h1>
          <p className="text-fennec-dark/70 text-lg leading-relaxed mb-6">
            Simulez votre capital retraite et vos économies d'impôts avec le pilier 3a ou 3b. Comparez les offres des principaux assureurs suisses — PAX, Swiss Life, AXA, Helvetia et bien d'autres.
          </p>
          <button
            onClick={onStartComparison}
            className="inline-flex items-center gap-2 bg-fennec-terracotta text-white font-display font-bold px-7 py-3.5 rounded-full shadow-md hover:bg-fennec-terracotta/90 transition-all active:scale-95 text-sm uppercase tracking-wider"
          >
            Simuler mon 3ème pilier
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Jusqu\'à CHF 7\'258', sub: 'Déductibles des impôts / an (salariés)' },
            { label: 'Jusqu\'à CHF 36\'288', sub: 'Déductibles des impôts / an (indépendants)' },
            { label: '11 assureurs comparés', sub: 'Swiss Life, AXA, PAX, Zurich, Helvetia…' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-fennec-cream/60 p-5 shadow-xs text-center">
              <p className="font-display font-black text-fennec-dark text-lg">{item.label}</p>
              <p className="text-fennec-dark/50 text-xs mt-1">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* 3 pillars explained */}
        <div className="mb-10">
          <h2 className="font-display font-bold text-xl text-fennec-dark mb-5">Le système des 3 piliers suisses</h2>
          <div className="space-y-4">
            {[
              { num: '1', title: '1er Pilier — AVS (Assurance vieillesse et survivants)', desc: 'Obligatoire, financé par les cotisations salariales. Couvre environ 40% du dernier revenu. Insuffisant seul pour maintenir le niveau de vie.' },
              { num: '2', title: '2ème Pilier — LPP (Prévoyance professionnelle)', desc: 'Obligatoire pour les salariés (dès CHF 22\'050 de revenu annuel). Complémente l\'AVS pour atteindre 60-70% du dernier revenu.' },
              { num: '3', title: '3ème Pilier — Prévoyance privée', desc: 'Facultatif, permet de combler l\'écart restant tout en bénéficiant d\'avantages fiscaux immédiats. Le pilier 3a est déductible des impôts ; le pilier 3b est libre.' },
            ].map(p => (
              <div key={p.num} className="flex gap-4 bg-white border border-fennec-cream/60 rounded-2xl p-5 shadow-xs">
                <div className="w-10 h-10 rounded-full bg-fennec-terracotta/10 flex items-center justify-center shrink-0">
                  <span className="font-display font-black text-fennec-terracotta">{p.num}</span>
                </div>
                <div>
                  <p className="font-display font-bold text-fennec-dark text-sm">{p.title}</p>
                  <p className="text-fennec-dark/60 text-xs mt-1">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3a vs 3b */}
        <div className="mb-10">
          <h2 className="font-display font-bold text-xl text-fennec-dark mb-5">Pilier 3a vs 3b : lequel choisir ?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border-2 border-fennec-terracotta/30 rounded-2xl p-5 shadow-xs">
              <p className="font-display font-black text-fennec-terracotta text-base mb-3">Pilier 3a (Prévoyance liée)</p>
              <ul className="space-y-2">
                {[
                  '100% déductible des impôts',
                  'Plafond CHF 7\'258 (salariés) / CHF 36\'288 (indépendants)',
                  'Fonds bloqués jusqu\'à la retraite*',
                  'Idéal pour réduire les impôts au maximum',
                ].map((pt, i) => (
                  <li key={i} className="flex gap-2 text-xs text-fennec-dark/70">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-fennec-cream/60 rounded-2xl p-5 shadow-xs">
              <p className="font-display font-black text-fennec-dark text-base mb-3">Pilier 3b (Prévoyance libre)</p>
              <ul className="space-y-2">
                {[
                  'Pas de plafond de cotisation',
                  'Retrait libre à tout moment',
                  'Avantages fiscaux variables selon canton',
                  'Idéal pour la flexibilité et les projets court terme',
                ].map((pt, i) => (
                  <li key={i} className="flex gap-2 text-xs text-fennec-dark/70">
                    <CheckCircle className="w-4 h-4 text-fennec-tan shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-fennec-dark/40 text-xs mt-3">* Sauf exceptions légales : achat résidence principale, départ Suisse, activité indépendante, invalidité.</p>
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="font-display font-bold text-xl text-fennec-dark mb-5 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-fennec-tan" />
            Questions fréquentes sur le 3ème pilier
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-fennec-cream/50 shadow-xs overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-5 py-4 font-display font-bold text-sm text-fennec-dark flex justify-between items-start gap-3"
                >
                  <span>{faq.question}</span>
                  {openFaq === i ? <ChevronUp className="w-4 h-4 shrink-0 text-fennec-brown mt-0.5" /> : <ChevronDown className="w-4 h-4 shrink-0 text-fennec-brown mt-0.5" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-fennec-dark/70 leading-relaxed border-t border-fennec-cream/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-fennec-terracotta/8 border border-fennec-terracotta/20 rounded-3xl p-8 text-center">
          <h2 className="font-display font-black text-xl text-fennec-dark mb-2">Calculez votre capital retraite maintenant</h2>
          <p className="text-fennec-dark/60 text-sm mb-5">Simulation gratuite · Données AFC 2026 · 11 assureurs comparés</p>
          <button
            onClick={onStartComparison}
            className="inline-flex items-center gap-2 bg-fennec-terracotta text-white font-display font-bold px-8 py-3.5 rounded-full shadow-md hover:bg-fennec-terracotta/90 transition-all active:scale-95 text-sm uppercase tracking-wider"
          >
            Simuler mon 3ème pilier gratuitement
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-fennec-dark/30 text-xs text-center mt-6">Mis à jour le 18 août 2026 · Sources : Administration fédérale des contributions (AFC), OFAS · Simulation indicative</p>
      </div>
    </>
  );
}
