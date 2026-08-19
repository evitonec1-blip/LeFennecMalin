import React from 'react';
import { Shield, CheckCircle, ArrowRight, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import SEOHead, { breadcrumbSchema, faqSchema, organizationSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';

interface Props {
  onStartComparison: () => void;
  onGoHome: () => void;
}

const FAQS = [
  {
    question: "Quelle est la différence entre l'assurance de base (LAMal) et les complémentaires (LCA) ?",
    answer: "L'assurance de base (LAMal) est obligatoire pour tous les résidents en Suisse. Les prestations de base sont identiques dans toutes les caisses : médecin, hospitalisation, médicaments. Les complémentaires (LCA) sont facultatives et couvrent des soins supplémentaires comme le dentaire, les médecines alternatives ou la chambre privée à l'hôpital."
  },
  {
    question: "Comment économiser sur les primes d'assurance maladie en Suisse ?",
    answer: "Quatre leviers principaux : (1) Augmenter la franchise annuelle de CHF 300 à CHF 2'500 — plus la franchise est haute, plus la prime mensuelle est basse. (2) Choisir un modèle alternatif (médecin de famille, Telmed, HMO). (3) Exclure la couverture accidents si vous êtes salarié(e) plus de 8h/semaine. (4) Comparer chaque année les caisses dans votre canton."
  },
  {
    question: "Peut-on changer de caisse maladie en Suisse ?",
    answer: "Oui. Le délai ordinaire de résiliation est le 30 novembre pour un changement au 1er janvier. Pour les assurés avec une franchise de CHF 300 ou en assurance standard, un changement au 1er juillet est possible avec résiliation au 30 juin. Les assureurs n'ont pas le droit de refuser un nouvel assuré pour l'assurance de base."
  },
  {
    question: "Qu'est-ce que le modèle Telmed ?",
    answer: "Le modèle Telmed oblige l'assuré à appeler une ligne médicale téléphonique en premier contact avant de consulter un médecin (sauf urgences). En contrepartie, la prime est réduite de 8 à 15% par rapport au modèle standard. Ce modèle convient aux personnes à l'aise avec les consultations téléphoniques."
  },
  {
    question: "Les primes LAMal varient-elles selon le canton ?",
    answer: "Oui. Les primes LAMal sont fixées par région de primes (régions 1, 2 et 3) qui reflètent les coûts de santé locaux. Genève et Vaud ont typiquement les primes les plus élevées de Suisse romande, tandis que le Jura et le Valais tendent à être moins chers."
  },
];

export default function AssuranceMaladie({ onStartComparison, onGoHome }: Props) {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const structured = [
    organizationSchema,
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'Assurance Maladie', url: '/assurance-maladie/' },
    ]),
    faqSchema(FAQS),
  ];

  return (
    <>
      <SEOHead
        title="Comparateur Assurance Maladie Suisse 2026 — LAMal | Le Fennec Malin"
        description="Comparez les primes des 37 caisses maladie suisses agréées (LAMal) 2026. Données officielles OFSP & Priminfo. Gratuit, neutre et indépendant. Économisez jusqu'à CHF 3'000 par an."
        canonical="/assurance-maladie/"
        structuredData={structured}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: onGoHome },
            { label: 'Assurance Maladie (LAMal)' },
          ]}
        />

        {/* Hero */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-fennec-terracotta/10 text-fennec-terracotta text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
            <Shield className="w-3.5 h-3.5" />
            Données officielles OFSP & Priminfo 2026
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-fennec-dark mb-4 leading-tight">
            Comparateur d'assurance maladie suisse
          </h1>
          <p className="text-fennec-dark/70 text-lg leading-relaxed mb-6">
            Comparez les 37 caisses maladie agréées (LAMal) en Suisse. Les prestations de base sont identiques par la loi — seuls le prix, la franchise et le modèle de soins changent.
          </p>
          <button
            onClick={onStartComparison}
            className="inline-flex items-center gap-2 bg-fennec-terracotta text-white font-display font-bold px-7 py-3.5 rounded-full shadow-md hover:bg-fennec-terracotta/90 transition-all active:scale-95 text-sm uppercase tracking-wider"
          >
            Comparer mes primes 2026
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Key facts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: '37 caisses comparées', sub: 'Toutes les caisses agréées OFSP' },
            { label: 'Données 2026', sub: 'Priminfo & OFSP officiels' },
            { label: 'Économies jusqu\'à CHF 3\'000', sub: 'Par an selon votre profil' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-fennec-cream/60 p-5 shadow-xs text-center">
              <p className="font-display font-black text-fennec-dark text-lg">{item.label}</p>
              <p className="text-fennec-dark/50 text-xs mt-1">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mb-10">
          <h2 className="font-display font-bold text-xl text-fennec-dark mb-5">Comment fonctionne l'assurance maladie en Suisse ?</h2>
          <div className="space-y-3 text-fennec-dark/70 leading-relaxed">
            <p>L'assurance maladie de base (LAMal) est <strong>obligatoire pour tout résident en Suisse</strong>, indépendamment de la nationalité. Elle garantit l'accès aux soins médicaux essentiels : consultations chez le médecin, hospitalisations, médicaments listés, soins d'urgence.</p>
            <p>Les prestations de base sont <strong>définies par la loi fédérale (LAMal)</strong> et sont identiques dans toutes les caisses. Ce qui varie d'une caisse à l'autre, c'est uniquement le montant de la prime mensuelle, qui dépend de votre canton, de votre âge, de votre franchise et du modèle de soins choisi.</p>
            <p>En 2026, les primes moyennes suisses ont augmenté de 6%, avec des disparités importantes selon les cantons. Genève et Vaud restent les cantons les plus chers de Suisse romande.</p>
          </div>
        </div>

        {/* Savings levers */}
        <div className="mb-10">
          <h2 className="font-display font-bold text-xl text-fennec-dark mb-5">Comment réduire votre prime en 2026 ?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Augmenter la franchise', desc: 'Passer de CHF 300 à CHF 2\'500 peut réduire votre prime de CHF 100 à CHF 180 par mois.' },
              { title: 'Choisir un modèle alternatif', desc: 'Médecin de famille, Telmed ou HMO — jusqu\'à 15% d\'économie sur la prime standard.' },
              { title: 'Exclure les accidents', desc: 'Si vous travaillez plus de 8h/semaine, votre employeur couvre déjà les accidents (LAA).' },
              { title: 'Comparer chaque année', desc: 'Les primes changent chaque 1er janvier. Quelques minutes de comparaison peuvent économiser des centaines de francs.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 bg-white border border-fennec-cream/60 rounded-2xl p-4 shadow-xs">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-display font-bold text-fennec-dark text-sm">{item.title}</p>
                  <p className="text-fennec-dark/60 text-xs mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Canton links */}
        <div className="mb-10">
          <h2 className="font-display font-bold text-xl text-fennec-dark mb-5">Assurance maladie par canton</h2>
          <p className="text-fennec-dark/60 text-sm mb-4">Les primes LAMal varient selon votre lieu de résidence. Consultez les informations spécifiques à votre canton :</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { label: 'Genève', slug: 'geneve' },
              { label: 'Vaud', slug: 'vaud' },
              { label: 'Fribourg', slug: 'fribourg' },
              { label: 'Neuchâtel', slug: 'neuchatel' },
              { label: 'Valais', slug: 'valais' },
              { label: 'Jura', slug: 'jura' },
            ].map(c => (
              <a key={c.slug} href={`/assurance-maladie/${c.slug}/`} className="bg-fennec-cream/40 rounded-xl p-3 text-center text-sm font-display font-bold text-fennec-dark hover:bg-fennec-cream/70 transition-colors">
                Assurance maladie {c.label}
              </a>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="font-display font-bold text-xl text-fennec-dark mb-5 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-fennec-tan" />
            Questions fréquentes
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

        {/* CTA bottom */}
        <div className="bg-fennec-terracotta/8 border border-fennec-terracotta/20 rounded-3xl p-8 text-center">
          <h2 className="font-display font-black text-xl text-fennec-dark mb-2">Prêt à comparer vos primes 2026 ?</h2>
          <p className="text-fennec-dark/60 text-sm mb-5">Données officielles OFSP · 37 caisses · Résultat en 2 minutes · 100% gratuit</p>
          <button
            onClick={onStartComparison}
            className="inline-flex items-center gap-2 bg-fennec-terracotta text-white font-display font-bold px-8 py-3.5 rounded-full shadow-md hover:bg-fennec-terracotta/90 transition-all active:scale-95 text-sm uppercase tracking-wider"
          >
            Lancer le comparateur LAMal
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-fennec-dark/30 text-xs text-center mt-6">Mis à jour le 18 août 2026 · Sources : OFSP, Priminfo.admin.ch · Simulation indicative</p>
      </div>
    </>
  );
}
