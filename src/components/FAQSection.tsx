/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { language } = useLanguage();

  const c = {
    fr: {
      tag: "Vos Questions",
      title: "Fenny vous répond en toute clarté",
      subtitle: "Les questions les plus courantes sur le fonctionnement des assurances suisses décortiquées par notre fennec malin.",
      faqs: [
        {
          question: "Quelle est la différence entre l'assurance maladie obligatoire (LAMal) et complémentaire (LCA) ?",
          answer: (
            <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed text-justify">
              <p>
                L'<strong>assurance obligatoire des soins (AOS / LAMal)</strong> est obligatoire pour toute personne résidant ou travaillant en Suisse. Ses prestations sont strictement identiques chez toutes les caisses maladie (définies par la loi fédérale). Seul le montant des primes varie selon l'assureur, la franchise et votre lieu de résidence.
              </p>
              <p>
                Les <strong>assurances complémentaires (LCA)</strong> sont facultatives. Elles couvrent et complètent des prestations non incluses dans la LAMal (médecines douces, lunettes, soins dentaires, chambre privée à l'hôpital, fitness).
              </p>
            </div>
          )
        },
        {
          question: "Comment puis-je économiser sur mes primes d'assurance maladie obligatoire en Suisse ?",
          answer: (
            <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed">
              <p>Il existe quatre leviers principaux validés par Fenny :</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Augmenter la franchise :</strong> Passer de CHF 300 à CHF 2'500 par an réduit vos primes mensuelles.</li>
                <li><strong>Changer de modèle d'assurance :</strong> Optez pour le modèle Télémédecine (Telmed), Médecin de Famille ou HMO.</li>
                <li><strong>Exclure la couverture accident :</strong> Si vous travaillez plus de 8h/semaine chez le même employeur (couvert par LAA).</li>
                <li><strong>Demander un subside cantonal :</strong> Selon vos revenus et votre canton.</li>
              </ul>
            </div>
          )
        },
        {
          question: "Qu'est-ce qu'un 3ème Pilier et pourquoi est-il fortement recommandé ?",
          answer: (
            <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed">
              <p>
                Le 1er pilier (AVS) et le 2e pilier (LPP) ne couvrent généralement que 60% de votre dernier salaire lors de la retraite.
              </p>
              <p>
                Le <strong>3ème pilier (prévoyance privée)</strong> sert à combler cette lacune pour maintenir votre niveau de vie actuel tout en bénéficiant d'avantages fiscaux immédiats.
              </p>
            </div>
          )
        },
        {
          question: "Quelle est la différence entre le pilier 3a (lié) et le pilier 3b (libre) ?",
          answer: (
            <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed">
              <p>
                Le <strong>Pilier 3a (Prévoyance liée)</strong> offre des déductions fiscales intégrales mais les fonds sont bloqués jusqu'à la retraite.
              </p>
              <p>
                Le <strong>Pilier 3b (Prévoyance libre)</strong> n'est pas bloqué (retrait possible à tout moment) mais les avantages fiscaux dépendent du canton.
              </p>
            </div>
          )
        },
        {
          question: "Quels sont les plafonds de déduction fiscale du 3ème pilier 3a pour 2025 / 2026 ?",
          answer: (
            <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed">
              <p>Pour les personnes salariées (affiliées au 2e pilier / LPP) : <strong>CHF 7'258.- par an</strong>.</p>
              <p>Pour les personnes indépendantes : 20% du revenu net, jusqu'à <strong>CHF 36'288.- par an</strong>.</p>
            </div>
          )
        },
        {
          question: "Les services du Fennec Malin sont-ils vraiment 100% gratuits ?",
          answer: (
            <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed">
              <p>
                <strong>Oui, absolument !</strong> L'utilisation du site et les simulations sont 100% gratuites sans aucuns frais cachés ni majoration de primes.
              </p>
            </div>
          )
        }
      ]
    },
    de: {
      tag: "Ihre Fragen",
      title: "Fenny antwortet Ihnen klar und transparent",
      subtitle: "Die häufigsten Fragen zur Funktionsweise Schweizer Versicherungen, erklärt von unserem schlauen Fennek.",
      faqs: [
        {
          question: "Was ist der Unterschied zwischen Obligatorischer Krankenpflegeversicherung (KVG) und Zusatzversicherung (VVG)?",
          answer: (
            <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed text-justify">
              <p>
                Die <strong>Grundversicherung (KVG)</strong> ist obligatorisch für alle in der Schweiz wohnhaften Personen. Die Leistungen sind bei allen Krankenkassen gesetzlich exakt identisch.
              </p>
              <p>
                Die <strong>Zusatzversicherungen (VVG)</strong> sind freiwillig. Sie decken ergänzende Leistungen ab (Komplementärmedizin, Zahnbehandlungen, Sehhilfen, halbprivate/private Spitalzimmer).
              </p>
            </div>
          )
        },
        {
          question: "Wie kann ich bei den Krankenkassenprämien in der Schweiz sparen?",
          answer: (
            <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed">
              <p>Es gibt vier Haupthebel :</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Franchise erhöhen:</strong> Die Anhebung von CHF 300 auf CHF 2'500 senkt Ihre Prämien deutlich.</li>
                <li><strong>Alternative Modelle wählen:</strong> Hausarzt, Telmed oder HMO-Modell sparen bis zu 20%.</li>
                <li><strong>Unfalldeckung ausschließen:</strong> Wenn Sie mehr als 8h/Woche beim selben Arbeitgeber angestellt sind.</li>
                <li><strong>Prämienverbilligung beantragen:</strong> Je nach Kanton und Einkommen.</li>
              </ul>
            </div>
          )
        },
        {
          question: "Was ist die 3. Säule und warum ist sie empfehlenswert?",
          answer: (
            <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed">
              <p>
                AHV (1. Säule) und Pensionskasse (2. Säule) decken im Ruhestand meist nur ca. 60% des gewohnten Einkommens ab.
              </p>
              <p>
                Die <strong>3. Säule (private Vorsorge)</strong> schließt diese Lücke und sichert Ihren Lebensstandard bei gleichzeitigen Steuervorteilen.
              </p>
            </div>
          )
        },
        {
          question: "Was ist der Unterschied zwischen Säule 3a (gebunden) und Säule 3b (frei)?",
          answer: (
            <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed">
              <p>
                Die <strong>Säule 3a</strong> ist steuerlich voll abzugsfähig, jedoch bis zur Pensionierung gebunden.
              </p>
              <p>
                Die <strong>Säule 3b</strong> ist flexibel und jederzeit verfügbar.
              </p>
            </div>
          )
        },
        {
          question: "Wie hoch sind die Maximalbeträge für die Säule 3a in 2025 / 2026?",
          answer: (
            <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed">
              <p>Für Angestellte mit Pensionskasse: <strong>CHF 7'258.- pro Jahr</strong>.</p>
              <p>Für Selbstständige ohne Pensionskasse: bis zu <strong>CHF 36'288.- pro Jahr</strong>.</p>
            </div>
          )
        },
        {
          question: "Sind die Dienste von Le Fennec Malin wirklich 100% kostenlos?",
          answer: (
            <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed">
              <p>
                <strong>Ja, absolut!</strong> Die Nutzung der Webseite und alle Vergleiche sind zu 100% kostenlos und unverbindlich.
              </p>
            </div>
          )
        }
      ]
    },
    en: {
      tag: "Your Questions",
      title: "Fenny answers clearly and transparently",
      subtitle: "The most common questions about Swiss insurance answered by our smart fennec.",
      faqs: [
        {
          question: "What is the difference between mandatory health insurance (LAMal/KVG) and supplementary insurance (LCA/VVG)?",
          answer: (
            <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed text-justify">
              <p>
                <strong>Basic insurance (LAMal)</strong> is mandatory for everyone living or working in Switzerland. Benefits are identical across all insurers by federal law.
              </p>
              <p>
                <strong>Supplementary insurance (LCA)</strong> is optional and covers services outside basic care (dental, alternative medicine, private hospital rooms).
              </p>
            </div>
          )
        },
        {
          question: "How can I save on my mandatory health insurance premiums in Switzerland?",
          answer: (
            <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed">
              <p>Four primary strategies:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Increase annual deductible:</strong> Raising deductible from CHF 300 to CHF 2,500 significantly lowers monthly premiums.</li>
                <li><strong>Switch care models:</strong> Opting for Telmed, GP, or HMO models offers 10%-20% discounts.</li>
                <li><strong>Exclude accident coverage:</strong> If employed 8+ hours/week with the same company.</li>
                <li><strong>Apply for cantonal subsidies:</strong> Based on income and household situation.</li>
              </ul>
            </div>
          )
        },
        {
          question: "What is the 3rd Pillar and why is it strongly recommended?",
          answer: (
            <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed">
              <p>
                The 1st pillar (AHV/AVS) and 2nd pillar (pension fund) generally only replace about 60% of your pre-retirement income.
              </p>
              <p>
                The <strong>3rd pillar (private pension)</strong> fills this income gap while offering immediate tax deductions.
              </p>
            </div>
          )
        },
        {
          question: "What is the difference between Pillar 3a (bound) and Pillar 3b (free)?",
          answer: (
            <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed">
              <p>
                <strong>Pillar 3a</strong> allows full tax deductions but funds are tied until retirement.
              </p>
              <p>
                <strong>Pillar 3b</strong> offers flexible withdrawals at any time.
              </p>
            </div>
          )
        },
        {
          question: "What are the tax deduction limits for Pillar 3a in 2025 / 2026?",
          answer: (
            <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed">
              <p>For employees with pension fund: <strong>CHF 7,258 per year</strong>.</p>
              <p>For self-employed without pension fund: up to <strong>CHF 36,288 per year</strong>.</p>
            </div>
          )
        },
        {
          question: "Are Le Fennec Malin's services really 100% free?",
          answer: (
            <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed">
              <p>
                <strong>Yes, absolutely!</strong> Using our platform and running simulations is completely free with no hidden fees or markups.
              </p>
            </div>
          )
        }
      ]
    },
    it: {
      tag: "Le Tue Domande",
      title: "Fenny ti risponde in modo chiaro e trasparente",
      subtitle: "Le domande più frequenti sul funzionamento delle assicurazioni svizzere spiegate dal nostro fennec.",
      faqs: [
        {
          question: "Qual è la differenza tra assicurazione malattia obbligatoria (LAMal) e complementare (LCA)?",
          answer: (
            <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed text-justify">
              <p>
                L'<strong>assicurazione obbligatoria (LAMal)</strong> è obbligatoria per tutti i residenti in Svizzera e garantisce le stesse prestazioni per legge.
              </p>
              <p>
                Le <strong>assicurazioni complementari (LCA)</strong> sono facoltative e coprono cure extra (dentista, medicina alternativa, camera privata).
              </p>
            </div>
          )
        },
        {
          question: "Come posso risparmiare sui premi dell'assicurazione malattia in Svizzera?",
          answer: (
            <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed">
              <p>Quattro consigli principali:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Aumentare la franchigia:</strong> Passare da CHF 300 a CHF 2'500 riduce notevolmente il premio mensile.</li>
                <li><strong>Scegliere modelli alternativi:</strong> Telmed, Medico di Famiglia o HMO.</li>
                <li><strong>Escludere la copertura infortuni:</strong> Se lavori più di 8 ore/settimana presso lo stesso datore di lavoro.</li>
                <li><strong>Richiedere sussidi cantonali:</strong> In base al reddito.</li>
              </ul>
            </div>
          )
        },
        {
          question: "Cos'è il 3° Pilastro e perché è fortemente consigliato?",
          answer: (
            <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed">
              <p>
                Il 1° e 2° pilastro coprono generalmente solo il 60% dell'ultimo stipendio alla pensione.
              </p>
              <p>
                Il <strong>3° pilastro (previdenza privata)</strong> colma questa lacuna offrendo vantaggi fiscali immediati.
              </p>
            </div>
          )
        },
        {
          question: "Qual è la differenza tra pilastro 3a (vincolato) e pilastro 3b (libero)?",
          answer: (
            <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed">
              <p>
                Il <strong>Pilastro 3a</strong> offre deduzioni fiscali complete ma i fondi sono vincolati fino alla pensione.
              </p>
              <p>
                Il <strong>Pilastro 3b</strong> è flessibile e prelevabile in qualsiasi momento.
              </p>
            </div>
          )
        },
        {
          question: "Quali sono i tetti massimi di deduzione fiscale per il 3° pilastro 3a nel 2025 / 2026?",
          answer: (
            <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed">
              <p>Per dipendenti con cassa pensione: <strong>CHF 7'258.- all'anno</strong>.</p>
              <p>Per indipendenti senza cassa pensione: fino a <strong>CHF 36'288.- all'anno</strong>.</p>
            </div>
          )
        },
        {
          question: "I servizi di Le Fennec Malin sono davvero gratuiti al 100%?",
          answer: (
            <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed">
              <p>
                <strong>Sì, assolutamente!</strong> L'uso del sito e le simulazioni sono gratuiti al 100% e senza costi nascosti.
              </p>
            </div>
          )
        }
      ]
    }
  }[language] || {
    tag: "Vos Questions",
    title: "Fenny vous répond en toute clarté",
    subtitle: "Les questions les plus courantes sur le fonctionnement des assurances suisses décortiquées par notre fennec malin.",
    faqs: []
  };

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <span className="text-[11px] font-bold tracking-widest text-fennec-terracotta uppercase block mb-1">
          {c.tag}
        </span>
        <h2 className="font-display font-extrabold text-3xl text-fennec-dark">
          {c.title}
        </h2>
        <p className="mt-2 text-base text-fennec-dark/70 max-w-xl mx-auto">
          {c.subtitle}
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {c.faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-fennec-cream/50 shadow-xs overflow-hidden transition-all duration-200 hover:border-fennec-tan"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left px-6 py-5 font-display font-bold text-base text-fennec-dark hover:text-fennec-terracotta flex justify-between items-center bg-fennec-cream/5 hover:bg-fennec-cream/10 transition-colors"
              >
                <span className="flex items-center">
                  <HelpCircle className="w-5 h-5 mr-3 text-fennec-tan shrink-0" />
                  {faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-fennec-brown shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-fennec-brown shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-6 py-5 border-t border-fennec-cream/20 bg-white">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
