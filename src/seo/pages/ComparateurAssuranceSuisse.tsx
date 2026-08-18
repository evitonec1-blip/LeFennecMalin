import React from 'react';
import { Shield, TrendingUp, ArrowRight, Star } from 'lucide-react';
import SEOHead, { breadcrumbSchema, organizationSchema, websiteSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';

interface Props {
  onStartHealth: () => void;
  onStartLife: () => void;
  onGoHome: () => void;
}

export default function ComparateurAssuranceSuisse({ onStartHealth, onStartLife, onGoHome }: Props) {
  const structured = [
    organizationSchema,
    websiteSchema,
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'Comparateur Assurance Suisse', url: '/comparateur-assurance-suisse/' },
    ]),
  ];

  return (
    <>
      <SEOHead
        title="Comparateur Assurance Suisse 2026 — Maladie, 3ème Pilier | Le Fennec Malin"
        description="Comparez toutes les assurances en Suisse : assurance maladie LAMal, 3ème pilier, prévoyance. Données officielles 2026. Gratuit, indépendant, 100% neutre."
        canonical="/comparateur-assurance-suisse/"
        structuredData={structured}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', onClick: onGoHome },
            { label: 'Comparateur Assurances Suisse' },
          ]}
        />

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-fennec-terracotta/10 text-fennec-terracotta text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
            <Star className="w-3.5 h-3.5" />
            100% Indépendant · Gratuit · Données officielles 2026
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-fennec-dark mb-4 leading-tight">
            Comparateur d'assurances en Suisse
          </h1>
          <p className="text-fennec-dark/70 text-lg leading-relaxed">
            Comparez les assurances maladie (LAMal) et la prévoyance (3ème pilier) en Suisse. Fenny sélectionne les meilleures offres adaptées à votre profil — en toute neutralité et transparence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-3xl border border-fennec-cream/60 shadow-md p-7">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="font-display font-black text-fennec-dark text-xl mb-2">Assurance Maladie</h2>
            <p className="text-fennec-dark/60 text-sm mb-4 leading-relaxed">Comparez les 37 caisses agréées LAMal. Données officielles OFSP & Priminfo 2026. Modèles médecin de famille, HMO, Telmed.</p>
            <ul className="space-y-1.5 mb-5">
              {['37 caisses comparées', 'Données OFSP 2026', 'Modèles alternatifs', 'Par canton et franchise'].map(f => (
                <li key={f} className="text-xs text-fennec-dark/60 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button onClick={onStartHealth} className="w-full bg-fennec-dark text-white font-display font-bold py-3 rounded-full text-sm hover:bg-fennec-dark/90 transition-all flex items-center justify-center gap-2">
              Comparer les primes LAMal <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-fennec-cream/60 shadow-md p-7">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="font-display font-black text-fennec-dark text-xl mb-2">3ème Pilier</h2>
            <p className="text-fennec-dark/60 text-sm mb-4 leading-relaxed">Simulez votre capital retraite et vos économies fiscales. Pilier 3a déductible jusqu'à CHF 7'258 par an. Comparez 11 assureurs.</p>
            <ul className="space-y-1.5 mb-5">
              {['11 assureurs comparés', 'Données AFC 2026', 'Pilier 3a et 3b', 'Optimisation fiscale'].map(f => (
                <li key={f} className="text-xs text-fennec-dark/60 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button onClick={onStartLife} className="w-full bg-fennec-terracotta text-white font-display font-bold py-3 rounded-full text-sm hover:bg-fennec-terracotta/90 transition-all flex items-center justify-center gap-2">
              Simuler mon 3ème pilier <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="font-display font-bold text-xl text-fennec-dark mb-4">Pourquoi comparer ses assurances en Suisse ?</h2>
          <div className="space-y-3 text-fennec-dark/70 text-sm leading-relaxed">
            <p>La Suisse est l'un des pays où les dépenses d'assurance représentent une part importante du budget des ménages. L'assurance maladie obligatoire (LAMal) seule coûte en moyenne CHF 400-600 par mois par adulte selon le canton et le profil.</p>
            <p>Or, <strong>les prestations de base de l'assurance maladie sont identiques dans toutes les caisses</strong>. Seul le prix diffère. En comparant chaque année, un ménage de 2 adultes peut économiser CHF 1'000 à CHF 3'000 par an — sans perdre une seule prestation.</p>
            <p>Pour le 3ème pilier, les différences de frais et de rendements entre assureurs peuvent représenter <strong>des dizaines de milliers de francs de capital sur 25 ans</strong>. La comparaison s'impose donc avant toute souscription.</p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="font-display font-bold text-xl text-fennec-dark mb-4">Comment fonctionne Le Fennec Malin ?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { num: '1', label: 'Choisissez', desc: 'Assurance maladie ou 3ème pilier' },
              { num: '2', label: 'Remplissez', desc: 'Votre profil en 2 minutes' },
              { num: '3', label: 'Comparez', desc: 'Les offres triées par prix' },
              { num: '4', label: 'Économisez', desc: 'Jusqu\'à CHF 3\'000 par an' },
            ].map(step => (
              <div key={step.num} className="bg-fennec-cream/30 rounded-2xl p-4 text-center">
                <div className="w-9 h-9 rounded-full bg-fennec-terracotta text-white font-display font-black text-sm flex items-center justify-center mx-auto mb-2">
                  {step.num}
                </div>
                <p className="font-display font-bold text-fennec-dark text-sm">{step.label}</p>
                <p className="text-fennec-dark/50 text-xs mt-0.5">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-fennec-cream/40 rounded-2xl p-6 text-sm text-fennec-dark/60 leading-relaxed">
          <p className="font-display font-bold text-fennec-dark mb-2">Transparence & indépendance</p>
          <p>Le Fennec Malin est un comparateur 100% indépendant. Nos résultats sont basés sur les données officielles OFSP (Priminfo.admin.ch) pour l'assurance maladie et sur les barèmes actuariels de l'Administration Fédérale des Contributions (AFC) pour le 3ème pilier. Nous ne recevons pas de rémunération des caisses pour leur positionnement dans les résultats. Conformément à la nLPD suisse.</p>
        </div>

        <p className="text-fennec-dark/30 text-xs text-center mt-6">Mis à jour le 18 août 2026</p>
      </div>
    </>
  );
}
