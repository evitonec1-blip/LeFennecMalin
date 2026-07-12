/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Sparkles, HelpCircle, CheckCircle, Scale, Eye, Heart, Search, Star, MapPin } from 'lucide-react';

export default function TrustStrip() {
  const stats = [
    {
      icon: (
        <div className="p-3 bg-rose-50 text-fennec-red rounded-xl border border-rose-100">
          <Scale className="w-6 h-6" />
        </div>
      ),
      value: "100% Indépendant",
      description: "Aucun assureur ne nous contrôle. Nos résultats sont objectifs et neutres.",
    },
    {
      icon: (
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
          <Shield className="w-6 h-6" />
        </div>
      ),
      value: "Données de l'OFSP & Priminfo 2026",
      description: "Données officielles de l'Office Fédéral de la Santé Publique et de Priminfo.",
    },
    {
      icon: (
        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
          <Sparkles className="w-6 h-6" />
        </div>
      ),
      value: "Gratuit & Sans engagement",
      description: "Aucuns frais cachés ni de majoration de primes. Vous économisez librement.",
    },
  ];

  const brandValues = [
    { name: "Bienveillant", icon: <Heart className="w-6 h-6 text-rose-500" />, desc: "Fenny veille sur votre budget avec bienveillance" },
    { name: "Curieux & Malin", icon: <Search className="w-6 h-6 text-amber-600" />, desc: "Toujours à la recherche des meilleures offres du marché" },
    { name: "Fiable", icon: <Shield className="w-6 h-6 text-emerald-600" />, desc: "Données certifiées et conformité réglementaire stricte" },
    { name: "Simple", icon: <Star className="w-6 h-6 text-blue-500" />, desc: "Des formulaires clairs, sans jargon inutile" },
    { name: "Proche de vous", icon: <MapPin className="w-6 h-6 text-red-500" />, desc: "Établi en Suisse, proche de votre réalité locale" },
  ];

  return (
    <div className="w-full space-y-8">
      {/* 3 Main Trust Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="flex items-start bg-white p-6 rounded-2xl border border-fennec-cream/50 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="mr-4 shrink-0">
              {stat.icon}
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-fennec-dark mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-fennec-dark/70 leading-relaxed">
                {stat.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Brand values sub-strip */}
      <div className="bg-fennec-cream/30 border border-fennec-cream/60 rounded-2xl py-6 px-4 md:px-8">
        <div className="text-center mb-6">
          <span className="text-[11px] font-bold tracking-widest text-fennec-terracotta uppercase block mb-1">
            Proche de vous
          </span>
          <h4 className="font-display font-bold text-xl text-fennec-dark">
            Les 5 engagements en or de notre fennec malin
          </h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {brandValues.map((val, idx) => (
            <div 
              key={idx} 
              className={`bg-white/80 backdrop-blur-sm hover:bg-white p-4 rounded-xl text-center border border-fennec-cream/40 transition-colors shadow-2xs group flex flex-col items-center ${
                idx === 4 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <div className="mb-2 group-hover:scale-110 transition-transform duration-200">
                {val.icon}
              </div>
              <span className="font-display font-bold text-sm text-fennec-dark mb-1">
                {val.name}
              </span>
              <span className="text-[11px] text-fennec-dark/60 leading-tight">
                {val.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
