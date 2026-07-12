/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "Quelle est la différence entre l'assurance maladie obligatoire (LAMal) et complémentaire (LCA) ?",
      answer: (
        <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed text-justify">
          <p>
            L'<strong>assurance obligatoire des soins (AOS / LAMal)</strong> est obligatoire pour toute personne résidant ou travaillant en Suisse. Ses prestations sont strictement identiques chez toutes les caisses maladie (définies par la loi fédérale). Seul le montant des primes varie selon l'assureur, la franchise et votre lieu de résidence.
          </p>
          <p>
            Les <strong>assurances complémentaires (LCA)</strong> sont facultatives. Elles couvrent et complètent des prestations non incluses dans la LAMal (médecines douces, lunettes, soins dentaires, chambre privée à l'hôpital, fitness). Les assureurs se réservent le droit d'accepter votre affiliation sur la base d'un questionnaire de santé.
          </p>
        </div>
      ),
    },
    {
      question: "Comment puis-je économiser sur mes primes d'assurance maladie obligatoire en Suisse ?",
      answer: (
        <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed">
          <p>Il existe quatre leviers principaux validés par Fenny :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Augmenter la franchise :</strong> Passer de CHF 300 à CHF 2'500 par an réduit vos primes mensuelles d'environ CHF 115.- par mois. Idéal si vous êtes en bonne santé.</li>
            <li><strong>Changer de modèle d'assurance :</strong> Optez pour le modèle <em>Télémédecine (Telmed)</em>, <em>Médecin de Famille</em> ou <em>HMO</em>. Ces modèles offrent entre 10% et 20% de réduction par rapport au modèle standard (choix libre du médecin).</li>
            <li><strong>Exclure la couverture accident :</strong> Si vous travaillez plus de 8 heures par semaine chez le même employeur, vous êtes déjà couvert par l'assurance accident obligatoire de votre entreprise (LAA). L'exclure de votre caisse maladie vous fait économiser 7% sur vos primes.</li>
            <li><strong>Demander un subside cantonal :</strong> Selon vos revenus et votre canton, vous pouvez prétendre à une aide financière de l'État pour payer vos primes.</li>
          </ul>
        </div>
      ),
    },
    {
      question: "Qu'est-ce qu'un 3ème Pilier et pourquoi est-il fortement recommandé ?",
      answer: (
        <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed">
          <p>
            Le système de prévoyance suisse repose sur les trois piliers. Le 1er pilier (AVS) et le 2e pilier (LPP/caisse de pension professionnelle) ne couvrent généralement que 60% de votre dernier salaire lors de la retraite.
          </p>
          <p>
            Le <strong>3ème pilier (prévoyance privée)</strong> sert à combler cette lacune pour maintenir votre niveau de vie actuel, financer l'achat de votre résidence principale, ou vous protéger contre le risque d'invalidité ou de décès. De plus, il offre d'énormes avantages fiscaux immédiats.
          </p>
        </div>
      ),
    },
    {
      question: "Quelle est la différence entre le pilier 3a (lié) et le pilier 3b (libre) ?",
      answer: (
        <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed">
          <p>
            Le <strong>Pilier 3a (Prévoyance liée)</strong> est encouragé par la Confédération. Les versements sont intégralement déductibles des impôts, mais les fonds sont bloqués jusqu'à la retraite (retrait anticipé possible uniquement pour l'achat immobilier, le démarrage d'une activité indépendante, ou le départ définitif de Suisse). Il y a un plafond annuel strict.
          </p>
          <p>
            Le <strong>Pilier 3b (Prévoyance libre)</strong> n'est pas bloqué (retrait possible à tout moment selon les termes du contrat) et n'a pas de plafond légal. En contrepartie, les déductions fiscales sont soumises à des conditions plus restrictives selon votre canton.
          </p>
        </div>
      ),
    },
    {
      question: "Quels sont les plafonds de déduction fiscale du 3ème pilier 3a pour 2025 / 2026 ?",
      answer: (
        <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed">
          <p>Les plafonds maximaux de cotisations déductibles fixés par la Confédération suisse sont les suivants :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Pour les personnes salariées (affiliées au 2e pilier / LPP) :</strong> Le plafond est fixé à <strong>CHF 7'258.- par an</strong>.</li>
            <li><strong>Pour les personnes indépendantes (non affiliées au 2e pilier / LPP) :</strong> Le plafond est fixé à 20% du revenu net de l'activité lucrative, jusqu'à un maximum de <strong>CHF 36'288.- par an</strong>.</li>
          </ul>
          <p className="text-xs text-fennec-brown font-semibold">
            Conseil de Fenny : Versez régulièrement chaque mois (par exemple, CHF 604.- / mois) pour atteindre facilement le plafond fiscal d'ici décembre sans effort financier soudain.
          </p>
        </div>
      ),
    },
    {
      question: "Les services du Fennec Malin sont-ils vraiment 100% gratuits ?",
      answer: (
        <div className="space-y-2 text-sm text-fennec-dark/80 leading-relaxed">
          <p>
            <strong>Oui, absolument !</strong> L'utilisation du site, la simulation des primes maladie de votre canton et les comparatifs de rendement pour le 3ème pilier sont entièrement gratuits pour tous nos visiteurs.
          </p>
          <p>
            Nous ne majorons jamais les prix des primes. Nous fonctionnons de manière transparente par le biais d’une rémunération d’apporteur d’adresses que nous versent les assureurs partenaires en cas de signature. C'est ce modèle qui nous permet de rester indépendants de toute compagnie d'assurance et d'offrir nos services d'analyse et de comparaison à tous les Suisses.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <span className="text-[11px] font-bold tracking-widest text-fennec-terracotta uppercase block mb-1">
          Vos Questions
        </span>
        <h2 className="font-display font-extrabold text-3xl text-fennec-dark">
          Fenny vous répond en toute clarté
        </h2>
        <p className="mt-2 text-base text-fennec-dark/70 max-w-xl mx-auto">
          Les questions les plus courantes sur le fonctionnement des assurances suisses décortiquées par notre fennec malin.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, idx) => {
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
