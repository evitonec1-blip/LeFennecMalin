/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Users, Eye, Heart, Ear, Lightbulb, Mountain, AlertCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import fenyThinking from '../assets/images/feny_thinking_1783331247759.jpg';

export default function AboutSection() {
  const { language } = useLanguage();

  const c = {
    fr: {
      who_am_i: "Qui suis-je ?",
      greeting: "Bonjour ! Je m'appelle Fenny, le fennec malin",
      tagline: '"Malin, pour vous. Proche de vous."',
      intro: "Je suis le porte-parole et la mascotte officielle de Le Fennec Malin, votre comparateur suisse en assurances et finance de référence. Mon but ? Simplifier la vie des ménages suisses et les aider à économiser sans sacrifier leur protection.",
      why_fennec: "Pourquoi avoir choisi un Fennec ?",
      why_fennec_desc: "Le fennec, ou renard des sables, est un animal fascinant doté de caractéristiques exceptionnelles qui correspondent trait pour trait à un excellent comparateur d'assurances :",
      ear_title: "Des oreilles immenses pour mieux écouter :",
      ear_desc: "Tout comme le fennec perçoit le plus infime bruit dans le désert, je reste à l'écoute constante de vos préoccupations budgétaires et de vos priorités familiales.",
      lightbulb_title: "Un esprit vif et astucieux :",
      lightbulb_desc: "Dans la jungle complexe des lois (LAMal, LCA) et des piliers de prévoyance (3a, 3b), j'analyse, je trie et je débusque les pièges pour vous proposer des solutions limpides.",
      mountain_title: "Résistant et proche de vous :",
      mountain_desc: "Adapté aux climats extrêmes, je brave les tempêtes de hausses des primes maladie de Suisse 2026 pour préserver votre pouvoir d'achat.",
      values_title: "Nos Valeurs Cardinales",
      benevolence: "Bienveillance",
      benevolence_desc: "Nous mettons l'humain et votre famille au centre des priorités.",
      transparency: "Transparence totale",
      transparency_desc: "Aucune information masquée, aucuns frais intermédiaires appliqués.",
      reliability: "Fiabilité helvétique",
      reliability_desc: "Calculs précis basés sur les barèmes de l'OFSP & Priminfo suisses.",
      local: "Proximité locale",
      local_desc: "Une équipe disponible basée en Suisse pour répondre à vos doutes.",
      free_title: "Un comparateur gratuit, comment est-ce possible ?",
      free_desc: "Pour maintenir ce comparateur entièrement indépendant et gratuit, nous collaborons avec des assureurs partenaires. Si vous décidez de souscrire à une offre par notre intermédiaire, nous pouvons percevoir une rémunération d’apporteur d’adresses de la part de nos assureurs partenaires.",
      crucial_point: "Point crucial : Les tarifs des primes d'assurance maladie de base (LAMal) sont réglementés par l'État et strictly identiques que vous passiez par nous ou en direct auprès de la caisse. Vous payez exactement le même prix !"
    },
    de: {
      who_am_i: "Wer bin ich?",
      greeting: "Hallo! Ich bin Fenny, der schlaue Fennek",
      tagline: '"Schlau für Sie. Nah bei Ihnen."',
      intro: "Ich bin der offizielle Sprecher und das Maskottchen von Le Fennec Malin, Ihrem Schweizer Vergleichsdienst für Versicherungen und Finanzen. Mein Ziel? Das Leben Schweizer Haushalte zu vereinfachen und beim Sparen zu helfen.",
      why_fennec: "Warum ein Fennek?",
      why_fennec_desc: "Der Fennek, oder Wüstenfuchs, ist ein faszinierendes Tier mit erstaunlichen Eigenschaften, die perfekt zu einem exzellenten Versicherungsvergleich passen:",
      ear_title: "Riesige Ohren zum besseren Zuhören:",
      ear_desc: "Genauso wie der Fennek das leisestere Geräusch in der Wüste wahrnimmt, höre ich stets auf Ihre Budget- und Familienanliegen.",
      lightbulb_title: "Ein wacher und schlauer Geist:",
      lightbulb_desc: "Im komplexen Paragraphendschungel (KVG, VVG) und bei den Vorsorgesäulen (3a, 3b) analysiere und vergleiche ich transparent für Sie.",
      mountain_title: "Widerstandsfähig und nah bei Ihnen:",
      mountain_desc: "Angepasst an extreme Bedingungen meistere ich die Prämienanstiege 2026 in der Schweiz, um Ihre Kaufkraft zu sichern.",
      values_title: "Unsere Grundwerte",
      benevolence: "Fürsorge",
      benevolence_desc: "Wir stellen Sie und Ihre Familie in den Mittelpunkt.",
      transparency: "Volle Transparenz",
      transparency_desc: "Keine versteckten Informationen, keine Zwischengebühren.",
      reliability: "Schweizer Zuverlässigkeit",
      reliability_desc: "Präzise Berechnungen basierend auf den offiziellen BAG- & Priminfo-Tarifen.",
      local: "Lokale Nähe",
      local_desc: "Ein engagiertes Team in der Schweiz, das Ihre Fragen beantwortet.",
      free_title: "Ein kostenloser Vergleichsdienst – wie ist das möglich?",
      free_desc: "Um diesen Vergleichsdienst völlig unabhängig und kostenlos zu halten, arbeiten wir mit Partnerversicherern zusammen. Wenn Sie ein Angebot abschließen, erhalten wir gegebenenfalls eine Vermittlungsprovision von unseren Partnern.",
      crucial_point: "Wichtiger Hinweis: Die Prämien der Grundversicherung (KVG) sind staatlich reguliert und exakt identisch, egal ob Sie über uns oder direkt bei der Krankenkasse abschließen. Sie zahlen genau denselben Preis!"
    },
    en: {
      who_am_i: "Who am I?",
      greeting: "Hello! My name is Fenny, the smart fennec",
      tagline: '"Smart for you. Close to you."',
      intro: "I am the official mascot and spokesperson of Le Fennec Malin, your trusted Swiss insurance and finance comparison platform. My goal? Simplify life for Swiss households and help you save money without compromising on coverage.",
      why_fennec: "Why choose a Fennec?",
      why_fennec_desc: "The fennec, or desert fox, is a fascinating animal with extraordinary traits that align perfectly with a top-tier insurance comparison engine:",
      ear_title: "Huge ears for attentive listening:",
      ear_desc: "Just as the fennec detects the faintest rustle in the desert, I stay constantly attentive to your family budget priorities.",
      lightbulb_title: "A sharp and clever mind:",
      lightbulb_desc: "In the complex world of Swiss insurance laws (LAMal, LCA) and 3rd pillar savings (3a, 3b), I sort through options to deliver crystal-clear choices.",
      mountain_title: "Resilient and close to you:",
      mountain_desc: "Adapted to harsh climates, I help you weather the 2026 health insurance premium increases to protect your purchasing power.",
      values_title: "Our Core Values",
      benevolence: "Care & Empathy",
      benevolence_desc: "We put people and families at the heart of our priorities.",
      transparency: "Total Transparency",
      transparency_desc: "No hidden details, no added intermediary fees.",
      reliability: "Swiss Reliability",
      reliability_desc: "Accurate calculations built on official 2026 FOPH & Priminfo data.",
      local: "Local Presence",
      local_desc: "A dedicated team based in Switzerland ready to assist you.",
      free_title: "A free comparison tool – how is that possible?",
      free_desc: "To keep this comparison service 100% free and independent for users, we work with partner insurance companies. If you choose to subscribe to an offer through us, we may receive a referral fee from our partners.",
      crucial_point: "Crucial point: Basic health insurance (LAMal/KVG) premiums are strictly regulated by the Swiss government and identical whether you sign up through us or directly with the insurer. You pay the exact same price!"
    },
    it: {
      who_am_i: "Chi sono?",
      greeting: "Ciao! Mi chiamo Fenny, il fennec intelligente",
      tagline: '"Intelligente per te. Vicino a te."',
      intro: "Sono la mascotte ufficiale di Le Fennec Malin, il tuo comparatore svizzero di fiducia per assicurazioni e finanza. Il mio obiettivo? Semplificare la vita delle famiglie svizzere e aiutarle a risparmiare.",
      why_fennec: "Perché un Fennec?",
      why_fennec_desc: "Il fennec, o volpe del deserto, è un animale affascinante con caratteristiche straordinarie che riflettono un eccellente comparatore assicurativo:",
      ear_title: "Grandi orecchie per ascoltare meglio:",
      ear_desc: "Proprio come il fennec percepisce il minimo rumore nel deserto, rimango sempre in ascolto delle tue esigenze di budget e famiglia.",
      lightbulb_title: "Mente sveglia e astuta:",
      lightbulb_desc: "Nella complessa giungla delle leggi (LAMal, LCA) e dei pilastri (3a, 3b), analizzo e selezioni le opzioni più chiare per te.",
      mountain_title: "Resistente e vicino a te:",
      mountain_desc: "Adattato a climi estremi, ti aiuto ad affrontare gli aumenti dei premi 2026 in Svizzera per proteggere il tuo potere d'acquisto.",
      values_title: "I Nostri Valori Fondamentali",
      benevolence: "Premura",
      benevolence_desc: "Mettiamo la tua famiglia e le persone al centro di tutto.",
      transparency: "Trasparenza Totale",
      transparency_desc: "Nessuna informazione nascosta, nessun costo d'intermediazione.",
      reliability: "Affidabilità Svizzera",
      reliability_desc: "Calcoli precisi basati sui dati ufficiali UFSP e Priminfo.",
      local: "Vicinanza Locale",
      local_desc: "Un team dedicato basato in Svizzera per rispondere ai tuoi dubbi.",
      free_title: "Un servizio di confronto gratuito: com'è possibile?",
      free_desc: "Per mantenere questo servizio completamente indipendente e gratuito, collaboriamo con compagnie assicuratrici partner. Se decidi di sottoscrivere un'offerta tramite noi, potremmo ricevere una commissione di segnalazione dai partner.",
      crucial_point: "Punto fondamentale: I premi dell'assicurazione di base (LAMal) sono regolamentati dallo Stato e identici sia che tu passi tramite noi sia direttamente con la cassa. Paghi esattamente lo stesso prezzo!"
    }
  }[language] || {
    who_am_i: "Qui suis-je ?",
    greeting: "Bonjour ! Je m'appelle Fenny, le fennec malin",
    tagline: '"Malin, pour vous. Proche de vous."',
    intro: "Je suis le porte-parole et la mascotte officielle de Le Fennec Malin, votre comparateur suisse en assurances et finance de référence. Mon but ? Simplifier la vie des ménages suisses et les aider à économiser sans sacrifier leur protection.",
    why_fennec: "Pourquoi avoir choisi un Fennec ?",
    why_fennec_desc: "Le fennec, ou renard des sables, est un animal fascinant doté de caractéristiques exceptionnelles qui correspondent trait pour trait à un excellent comparateur d'assurances :",
    ear_title: "Des oreilles immenses pour mieux écouter :",
    ear_desc: "Tout comme le fennec perçoit le plus infime bruit dans le désert, je reste à l'écoute constante de vos préoccupations budgétaires et de vos priorités familiales.",
    lightbulb_title: "Un esprit vif et astucieux :",
    lightbulb_desc: "Dans la jungle complexe des lois (LAMal, LCA) et des piliers de prévoyance (3a, 3b), j'analyse, je trie et je débusque les pièges pour vous proposer des solutions limpides.",
    mountain_title: "Résistant et proche de vous :",
    mountain_desc: "Adapté aux climats extrêmes, je brave les tempêtes de hausses des primes maladie de Suisse 2026 pour préserver votre pouvoir d'achat.",
    values_title: "Nos Valeurs Cardinales",
    benevolence: "Bienveillance",
    benevolence_desc: "Nous mettons l'humain et votre famille au centre des priorités.",
    transparency: "Transparence totale",
    transparency_desc: "Aucune information masquée, aucuns frais intermédiaires appliqués.",
    reliability: "Fiabilité helvétique",
    reliability_desc: "Calculs précis basés sur les barèmes de l'OFSP & Priminfo suisses.",
    local: "Proximité locale",
    local_desc: "Une équipe disponible basée en Suisse pour répondre à vos doutes.",
    free_title: "Un comparateur gratuit, comment est-ce possible ?",
    free_desc: "Pour maintenir ce comparateur entièrement indépendant et gratuit, nous collaborons avec des assureurs partenaires. Si vous décidez de souscrire à une offre par notre intermédiaire, nous pouvons percevoir une rémunération d’apporteur d’adresses de la part de nos assureurs partenaires.",
    crucial_point: "Point crucial : Les tarifs des primes d'assurance maladie de base (LAMal) sont réglementés par l'État et strictement identiques que vous passiez par nous ou en direct auprès de la caisse. Vous payez exactement le même prix !"
  };

  return (
    <div className="w-full space-y-16">
      
      {/* Hero Header */}
      <div className="bg-fennec-cream/20 border border-fennec-cream/50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-white shadow-lg overflow-hidden shrink-0">
          <img 
            src={fenyThinking} 
            alt="Fenny" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/fennec-thinking.jpg';
            }}
          />
        </div>
        <div className="space-y-4">
          <span className="px-3 py-1 bg-fennec-terracotta text-white font-display text-xs font-bold rounded-full uppercase tracking-wider">
            {c.who_am_i}
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-fennec-dark leading-tight">
            {c.greeting}
          </h2>
          <p className="text-base text-fennec-dark/80 leading-relaxed italic">
            {c.tagline}
          </p>
          <p className="text-base text-fennec-dark/80 leading-relaxed text-justify">
            {c.intro}
          </p>
        </div>
      </div>

      {/* Why Fenny Narrative */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h3 className="font-display font-bold text-2xl text-fennec-dark">
            {c.why_fennec}
          </h3>
          <p className="text-sm text-fennec-dark/85 leading-relaxed text-justify">
            {c.why_fennec_desc}
          </p>
          
          <ul className="space-y-4 text-sm text-fennec-dark/85">
            <li className="flex items-start">
              <div className="p-1.5 bg-fennec-cream/40 rounded-lg text-fennec-terracotta mr-3 shrink-0">
                <Ear className="w-5 h-5" />
              </div>
              <div>
                <strong>{c.ear_title} </strong>{c.ear_desc}
              </div>
            </li>
            <li className="flex items-start">
              <div className="p-1.5 bg-fennec-cream/40 rounded-lg text-fennec-terracotta mr-3 shrink-0">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <strong>{c.lightbulb_title} </strong>{c.lightbulb_desc}
              </div>
            </li>
            <li className="flex items-start">
              <div className="p-1.5 bg-fennec-cream/40 rounded-lg text-fennec-terracotta mr-3 shrink-0">
                <Mountain className="w-5 h-5" />
              </div>
              <div>
                <strong>{c.mountain_title} </strong>{c.mountain_desc}
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-fennec-cream shadow-xs space-y-6">
          <h4 className="font-display font-bold text-xl text-fennec-dark text-center border-b border-fennec-cream/40 pb-4">
            {c.values_title}
          </h4>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-3 p-3 hover:bg-fennec-cream/15 rounded-xl transition-colors">
              <div className="p-2 bg-rose-50 text-fennec-red rounded-lg">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-display font-bold text-sm text-fennec-dark">{c.benevolence}</h5>
                <p className="text-xs text-fennec-dark/70">{c.benevolence_desc}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 hover:bg-fennec-cream/15 rounded-xl transition-colors">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-display font-bold text-sm text-fennec-dark">{c.transparency}</h5>
                <p className="text-xs text-fennec-dark/70">{c.transparency_desc}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 hover:bg-fennec-cream/15 rounded-xl transition-colors">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-display font-bold text-sm text-fennec-dark">{c.reliability}</h5>
                <p className="text-xs text-fennec-dark/70 text-justify">{c.reliability_desc}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 hover:bg-fennec-cream/15 rounded-xl transition-colors">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-display font-bold text-sm text-fennec-dark">{c.local}</h5>
                <p className="text-xs text-fennec-dark/70">{c.local_desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Spotlight banner */}
      <div className="relative rounded-3xl overflow-hidden bg-fennec-dark text-white p-8 md:p-12 shadow-md">
        <div className="absolute inset-0 opacity-10 bg-radial-gradient" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <h4 className="font-display font-extrabold text-2xl md:text-3xl text-white">
            {c.free_title}
          </h4>
          <p className="text-sm md:text-base text-fennec-cream/90 leading-relaxed text-justify">
            {c.free_desc}
          </p>
          <p className="text-sm text-fennec-sand font-semibold flex items-start">
            <AlertCircle className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
            <span>{c.crucial_point}</span>
          </p>
        </div>
      </div>

    </div>
  );
}
