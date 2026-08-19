import React from 'react';
import { ArrowRight, MapPin, ShieldCheck } from 'lucide-react';
import SEOHead, { breadcrumbSchema, faqSchema, organizationSchema } from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';

export type CantonSlug = 'geneve' | 'vaud' | 'fribourg' | 'neuchatel' | 'valais' | 'jura';

type CantonPageData = {
  name: string;
  code: string;
  adjective: string;
  intro: string;
  localContext: string;
  practical: string[];
  faqs: { question: string; answer: string }[];
};

export const CANTON_PAGES: Record<CantonSlug, CantonPageData> = {
  geneve: {
    name: 'Genève',
    code: 'GE',
    adjective: 'genevoise',
    intro: "À Genève, le montant d'une prime LAMal dépend de votre âge, de votre franchise, de votre modèle de soins et de votre région de primes.",
    localContext: "Le canton de Genève forme un bassin urbain et frontalier. Pour obtenir un résultat exploitable, utilisez votre commune et votre situation réelle plutôt qu'une moyenne cantonale.",
    practical: ['Vérifiez votre région de primes avec votre adresse complète.', 'Comparez séparément la franchise et le modèle de soins.', 'Consultez les conditions officielles avant toute résiliation.'],
    faqs: [{ question: 'Comment comparer une prime LAMal à Genève ?', answer: "Saisissez votre code postal genevois, votre âge, votre franchise et votre modèle de soins. Le résultat utilise les données de primes disponibles pour votre région, et non une moyenne générale." }],
  },
  vaud: {
    name: 'Vaud',
    code: 'VD',
    adjective: 'vaudoise',
    intro: "Dans le canton de Vaud, les primes LAMal varient selon la région de primes et le profil de l'assuré.",
    localContext: "Lausanne, le littoral et les zones rurales ne doivent pas être traités comme une seule zone tarifaire. La comparaison doit donc partir du code postal de résidence.",
    practical: ['Utilisez votre NPA de résidence, pas celui de votre lieu de travail.', 'Comparez les modèles standard, médecin de famille, HMO et télémédecine.', 'Gardez une trace de la date et de la source de chaque simulation.'],
    faqs: [{ question: 'Les prestations LAMal changent-elles selon la caisse dans le canton de Vaud ?', answer: "Les prestations de l'assurance de base sont définies par la LAMal. Ce sont principalement la prime, la franchise, le modèle choisi et la couverture accident qui influencent la comparaison." }],
  },
  fribourg: {
    name: 'Fribourg',
    code: 'FR',
    adjective: 'fribourgeoise',
    intro: "Une comparaison LAMal à Fribourg doit tenir compte de la région de primes associée à votre commune et de votre profil.",
    localContext: "Fribourg est un canton bilingue. Les informations administratives peuvent être disponibles en français ou en allemand; vérifiez toujours la source officielle correspondant à votre démarche.",
    practical: ['Saisissez le NPA exact de votre domicile.', 'Vérifiez si votre employeur couvre déjà les accidents.', 'Ne comparez pas une prime adulte avec une prime enfant.'],
    faqs: [{ question: 'Pourquoi deux communes fribourgeoises peuvent-elles avoir des primes différentes ?', answer: "Les primes sont liées aux régions de primes et aux caractéristiques du profil assuré. Une comparaison fiable utilise donc l'adresse et les paramètres personnels de l'assuré." }],
  },
  neuchatel: {
    name: 'Neuchâtel',
    code: 'NE',
    adjective: 'neuchâteloise',
    intro: "Pour comparer l'assurance maladie à Neuchâtel, partez du code postal, de la catégorie d'âge, de la franchise et du modèle de soins.",
    localContext: "Le canton de Neuchâtel présente des zones urbaines et rurales. Le bon niveau de détail est la région de primes officielle, pas un classement global des communes.",
    practical: ['Comparez la prime mensuelle et le coût annuel potentiel.', 'Lisez les règles du modèle de soins avant de le sélectionner.', 'Demandez une confirmation officielle avant un changement de caisse.'],
    faqs: [{ question: 'Le modèle Telmed est-il disponible à Neuchâtel ?', answer: "La disponibilité dépend de l'offre de chaque caisse et de votre région de primes. Le comparateur affiche uniquement les modèles présents dans les données utilisées pour votre profil." }],
  },
  valais: {
    name: 'Valais',
    code: 'VS',
    adjective: 'valaisanne',
    intro: "En Valais, la région de primes et la commune de résidence sont essentielles pour obtenir une comparaison LAMal pertinente.",
    localContext: "Le canton comprend des territoires très différents entre plaine, vallées et zones alpines. Une estimation cantonale unique peut donc être trompeuse pour un assuré particulier.",
    practical: ['Comparez avec votre commune actuelle.', 'Tenez compte de la couverture accident et de la franchise choisie.', 'Recontrôlez les données lors de la publication des nouvelles primes.'],
    faqs: [{ question: 'Une prime estimée pour Sion vaut-elle pour tout le Valais ?', answer: "Non. Une estimation pour une commune ne doit pas être présentée comme valable pour tout le canton. Utilisez le code postal de la personne assurée pour obtenir sa région de primes." }],
  },
  jura: {
    name: 'Jura',
    code: 'JU',
    adjective: 'jurassienne',
    intro: "Le comparateur d'assurance maladie pour le Jura utilise les paramètres personnels et la région de primes plutôt qu'un prix moyen unique.",
    localContext: "Le Jura partage une proximité géographique avec d'autres cantons et zones frontalières. Cela renforce l'importance de distinguer le lieu de résidence légal du lieu de travail.",
    practical: ['Renseignez votre domicile légal en Suisse.', 'Ne remplacez pas votre NPA par celui d’un proche ou d’un employeur.', 'Vérifiez les délais de changement auprès de votre caisse.'],
    faqs: [{ question: 'Le lieu de travail détermine-t-il ma prime LAMal dans le Jura ?', answer: "La prime de l'assurance de base dépend notamment du lieu de résidence et de la région de primes, pas simplement du lieu de travail. Utilisez donc votre adresse de résidence pour la simulation." }],
  },
};

export function isCantonSlug(value: string): value is CantonSlug {
  return value in CANTON_PAGES;
}

interface Props {
  canton: CantonSlug;
  onStartComparison: () => void;
  onGoHome: () => void;
}

export default function CantonPage({ canton, onStartComparison, onGoHome }: Props) {
  const page = CANTON_PAGES[canton];
  const faqs = page.faqs;
  const structured = [
    organizationSchema,
    breadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'Assurance maladie', url: '/assurance-maladie/' },
      { name: page.name, url: `/assurance-maladie/${canton}/` },
    ]),
    faqSchema(faqs),
  ];

  return (
    <>
      <SEOHead
        title={`Assurance maladie ${page.name} 2026 — Comparateur LAMal | Le Fennec Malin`}
        description={`Comparez les primes LAMal dans le canton de ${page.name}. Données par région de primes, franchise et modèle de soins. Simulation indicative et transparente.`}
        canonical={`/assurance-maladie/${canton}/`}
        structuredData={structured}
      />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumb items={[
          { label: 'Accueil', href: '/', onClick: onGoHome },
          { label: 'Assurance maladie', href: '/assurance-maladie/' },
          { label: page.name },
        ]} />
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 bg-fennec-terracotta/10 text-fennec-terracotta text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
            <MapPin className="w-3.5 h-3.5" />
            Canton {page.code} · Données officielles à vérifier avant décision
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-fennec-dark mb-4 leading-tight">
            Assurance maladie {page.name}
          </h1>
          <p className="text-fennec-dark/70 text-lg leading-relaxed">{page.intro}</p>
        </header>
        <section className="mb-10">
          <h2 className="font-display font-bold text-xl text-fennec-dark mb-4">Contexte local</h2>
          <p className="text-fennec-dark/70 leading-relaxed">{page.localContext}</p>
        </section>
        <section className="mb-10">
          <h2 className="font-display font-bold text-xl text-fennec-dark mb-4">Avant de comparer</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {page.practical.map((item) => (
              <div key={item} className="bg-white border border-fennec-cream/60 rounded-2xl p-4 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-fennec-terracotta mb-2" />
                <p className="text-sm text-fennec-dark/70 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-10">
          <h2 className="font-display font-bold text-xl text-fennec-dark mb-4">Questions fréquentes</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white border border-fennec-cream/60 rounded-2xl p-5">
                <h3 className="font-display font-bold text-fennec-dark text-sm mb-2">{faq.question}</h3>
                <p className="text-sm text-fennec-dark/70 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-fennec-terracotta/8 border border-fennec-terracotta/20 rounded-3xl p-8 text-center">
          <h2 className="font-display font-black text-xl text-fennec-dark mb-2">Comparer votre prime LAMal</h2>
          <p className="text-fennec-dark/60 text-sm mb-5">Le résultat dépend de votre NPA, âge, franchise, modèle de soins et couverture accident.</p>
          <button onClick={onStartComparison} className="inline-flex items-center gap-2 bg-fennec-terracotta text-white font-display font-bold px-8 py-3.5 rounded-full shadow-md hover:bg-fennec-terracotta/90 transition-all text-sm">
            Ouvrir le comparateur <ArrowRight className="w-4 h-4" />
          </button>
        </section>
        <p className="text-fennec-dark/30 text-xs text-center mt-6">Page locale informative · Vérifiez les primes et délais sur les sources officielles avant toute décision.</p>
      </article>
    </>
  );
}