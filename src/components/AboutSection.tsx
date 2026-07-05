/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Users, Compass, Eye, Heart, Ear, Lightbulb, Mountain, AlertCircle } from 'lucide-react';

export default function AboutSection() {
  return (
    <div className="w-full space-y-16">
      
      {/* Hero Header */}
      <div className="bg-fennec-cream/20 border border-fennec-cream/50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-white shadow-lg overflow-hidden shrink-0">
          <img 
            src="/assets/images/feny_mascot_avatar_1783245725195.jpg" 
            alt="Feny le Fennec" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="space-y-4">
          <span className="px-3 py-1 bg-fennec-terracotta text-white font-display text-xs font-bold rounded-full uppercase tracking-wider">
            Qui suis-je ?
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-fennec-dark leading-tight">
            Bonjour ! Je m'appelle Feny, le Fennec Malin
          </h2>
          <p className="text-base text-fennec-dark/80 leading-relaxed italic">
            "Malin, pour vous. Proche de vous."
          </p>
          <p className="text-base text-fennec-dark/80 leading-relaxed">
            Je suis le porte-parole et la mascotte officielle de <strong>Le Fennec Malin</strong>, votre comparateur suisse en assurances et finance de référence. Mon but ? Simplifier la vie des ménages suisses et les aider à économiser sans sacrifier leur protection.
          </p>
        </div>
      </div>

      {/* Why Feny Narrative */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h3 className="font-display font-bold text-2xl text-fennec-dark">
            Pourquoi avoir choisi un Fennec ?
          </h3>
          <p className="text-sm text-fennec-dark/85 leading-relaxed">
            Le fennec, ou renard des sables, est un animal fascinant doté de caractéristiques exceptionnelles qui correspondent trait pour trait à un excellent comparateur d'assurances :
          </p>
          
          <ul className="space-y-4 text-sm text-fennec-dark/85">
            <li className="flex items-start">
              <div className="p-1.5 bg-fennec-cream/40 rounded-lg text-fennec-terracotta mr-3 shrink-0">
                <Ear className="w-5 h-5" />
              </div>
              <div>
                <strong>Des oreilles immenses pour mieux écouter :</strong> Tout comme le fennec perçoit le plus infime bruit dans le désert, je reste à l'écoute constante de vos préoccupations budgétaires et de vos priorités familiales.
              </div>
            </li>
            <li className="flex items-start">
              <div className="p-1.5 bg-fennec-cream/40 rounded-lg text-fennec-terracotta mr-3 shrink-0">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <strong>Un esprit vif et astucieux :</strong> Dans la jungle complexe des lois (LAMal, LCA) et des piliers de prévoyance (3a, 3b), j'analyse, je trie et je débusque les pièges pour vous proposer des solutions limpides.
              </div>
            </li>
            <li className="flex items-start">
              <div className="p-1.5 bg-fennec-cream/40 rounded-lg text-fennec-terracotta mr-3 shrink-0">
                <Mountain className="w-5 h-5" />
              </div>
              <div>
                <strong>Résistant et proche de vous :</strong> Adapté aux climats extrêmes, je brave les tempêtes de hausses des primes maladie de Suisse 2026 pour préserver votre pouvoir d'achat.
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-fennec-cream shadow-xs space-y-6">
          <h4 className="font-display font-bold text-xl text-fennec-dark text-center border-b border-fennec-cream/40 pb-4">
            Nos Valeurs Cardinales
          </h4>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-3 p-3 hover:bg-fennec-cream/15 rounded-xl transition-colors">
              <div className="p-2 bg-rose-50 text-fennec-red rounded-lg">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-display font-bold text-sm text-fennec-dark">Bienveillance</h5>
                <p className="text-xs text-fennec-dark/70">Nous mettons l'humain et votre famille au centre des priorités.</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 hover:bg-fennec-cream/15 rounded-xl transition-colors">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-display font-bold text-sm text-fennec-dark">Transparence totale</h5>
                <p className="text-xs text-fennec-dark/70">Aucune information masquée, aucuns frais intermédiaires appliqués.</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 hover:bg-fennec-cream/15 rounded-xl transition-colors">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-display font-bold text-sm text-fennec-dark">Fiabilité helvétique</h5>
                <p className="text-xs text-fennec-dark/70">Calculs précis basés sur les barèmes de l'OFSP suisse.</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 hover:bg-fennec-cream/15 rounded-xl transition-colors">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-display font-bold text-sm text-fennec-dark">Proximité locale</h5>
                <p className="text-xs text-fennec-dark/70">Une équipe disponible basée à Lausanne pour répondre à vos doutes.</p>
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
            Un comparateur gratuit, comment est-ce possible ?
          </h4>
          <p className="text-sm md:text-base text-fennec-cream/90 leading-relaxed">
            Pour maintenir ce comparateur entièrement indépendant et gratuit, nous collaborons avec des assureurs partenaires. Si vous décidez de souscrire à une offre par notre intermédiaire, nous percevons une commission de leur part. 
          </p>
          <p className="text-sm text-fennec-sand font-semibold flex items-start">
            <AlertCircle className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
            <span>Point crucial : Les tarifs des primes d'assurance maladie de base (LAMal) sont réglementés par l'État et strictement identiques que vous passiez par nous ou en direct auprès de la caisse. Vous payez exactement le même prix !</span>
          </p>
        </div>
      </div>

    </div>
  );
}
