/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppTab } from '../types';
import { Shield, ExternalLink, Heart, Mail, Phone, Info } from 'lucide-react';
import fenyAvatar from '../assets/images/feny_avatar_1783331224698.jpg';

interface FooterProps {
  onTabChange: (tab: AppTab) => void;
}

export default function Footer({ onTabChange }: FooterProps) {
  const handleNavClick = (tab: AppTab) => {
    onTabChange(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-fennec-dark text-fennec-cream pt-16 pb-8 border-t-4 border-fennec-tan">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mega Menu Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Contact */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border border-white/20 overflow-hidden bg-white/10">
                <img 
                  src={fenyAvatar} 
                  alt="Fenny" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display text-2xl font-black text-white tracking-tight">
                FENN<span className="text-fennec-red">Y</span>
              </span>
            </div>
            <p className="text-xs text-fennec-cream/70 italic font-medium">
              "Malin, pour vous. Proche de vous."
            </p>
            <p className="text-sm text-fennec-cream/80 leading-relaxed">
              Le comparateur astucieux et indépendant en Suisse pour vos assurances maladie, 3ème pilier et prévoyance familiale.
            </p>
            <div className="pt-2 space-y-2 text-xs text-fennec-cream/90">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-fennec-sand" />
                <span>contact@lefennecmalin.ch</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-fennec-sand" />
                <span>+41 (0) 21 588 05 20</span>
              </div>
            </div>
          </div>

          {/* Col 2: Assurance Maladie */}
          <div>
            <h4 className="font-display text-base font-bold text-white mb-4 tracking-wide uppercase border-l-2 border-fennec-red pl-2">
              Assurance Maladie
            </h4>
            <ul className="space-y-2.5 text-sm text-fennec-cream/80">
              <li>
                <button onClick={() => handleNavClick('health-comparator')} className="hover:text-white hover:underline transition-colors text-left">
                  Comparatif des caisses 2026
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('faq')} className="hover:text-white hover:underline transition-colors text-left">
                  Comprendre la loi LAMal
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('health-comparator')} className="hover:text-white hover:underline transition-colors text-left">
                  Assurances complémentaires LCA
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('health-comparator')} className="hover:text-white hover:underline transition-colors text-left">
                  Primes par canton suisse
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Prévoyance / Vie */}
          <div>
            <h4 className="font-display text-base font-bold text-white mb-4 tracking-wide uppercase border-l-2 border-fennec-tan pl-2">
              3e Pilier & Prévoyance
            </h4>
            <ul className="space-y-2.5 text-sm text-fennec-cream/80">
              <li>
                <button onClick={() => handleNavClick('life-comparator')} className="hover:text-white hover:underline transition-colors text-left">
                  Comparateur 3ème Pilier A & B
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('faq')} className="hover:text-white hover:underline transition-colors text-left">
                  Rendements & Placements
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('life-comparator')} className="hover:text-white hover:underline transition-colors text-left">
                  Plafonds déductibles 2025 / 2026
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('life-comparator')} className="hover:text-white hover:underline transition-colors text-left">
                  Assurance décès et invalidité
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Informations & Liens officiels */}
          <div>
            <h4 className="font-display text-base font-bold text-white mb-4 tracking-wide uppercase border-l-2 border-fennec-sand pl-2">
              Ressources & Légal
            </h4>
            <ul className="space-y-2.5 text-sm text-fennec-cream/80">
              <li>
                <button onClick={() => handleNavClick('about')} className="hover:text-white hover:underline transition-colors text-left">
                  À propos de Fenny et ses valeurs
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('faq')} className="hover:text-white hover:underline transition-colors text-left">
                  Vos questions fréquentes (FAQ)
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('legal')} className="hover:text-white hover:underline transition-colors text-left">
                  Mentions Légales
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('privacy')} className="hover:text-white hover:underline transition-colors text-left">
                  Politique de Confidentialité
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Regulatory & Swiss Footnotes */}
        <div className="py-8 text-xs text-fennec-cream/60 space-y-4 leading-relaxed border-b border-white/5">
          <div className="flex items-start bg-white/5 p-4 rounded-xl border border-white/10">
            <Info className="w-5 h-5 mr-3 text-fennec-sand shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-white uppercase block">Avis de conformité et neutralité suisse :</span>
              <p>
                Le Fennec Malin (lefennecmalin.ch) est un comparateur d'assurances 100% neutre et indépendant. Les calculs de primes maladie obligatoires sont simulés sur la base des barèmes officiels approuvés par l'<strong>Office Fédéral de la Santé Publique (OFSP)</strong> et fournis par <a href="https://www.priminfo.admin.ch" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-semibold inline-flex items-center">priminfo.admin.ch <ExternalLink className="w-2.5 h-2.5 ml-0.5" /></a>.
              </p>
              <p>
                Conformément à la loi fédérale sur l'assurance-maladie (LAMal), les prestations de base de l'assurance obligatoire sont strictement identiques d'un assureur à l'autre. Seules les primes mensuelles et le service de remboursement diffèrent.
              </p>
              <p className="mt-2 text-[10px]">
                *Divulgation de transparence : Afin de vous garantir un service entièrement gratuit et dénué de publicité intrusive, nous pouvons percevoir une rémunération d’apporteur d’adresses de la part de nos assureurs partenaires lors de l'établissement d'une offre. Cela n'impacte en aucun cas le tarif de votre prime (neutralité tarifaire garantie).
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright and official links */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-fennec-cream/50 space-y-4 sm:space-y-0">
          <div>
            © 2026 Le Fennec Malin — Tous droits réservés.
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="https://www.bag.admin.ch" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors flex items-center"
            >
              BAG / OFSP <ExternalLink className="w-3 h-3 ml-1" />
            </a>
            <span>•</span>
            <a 
              href="https://www.priminfo.admin.ch" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors flex items-center"
            >
              Priminfo.ch <ExternalLink className="w-3 h-3 ml-1" />
            </a>
            <span>•</span>
            <button onClick={() => handleNavClick('legal')} className="hover:text-white transition-colors">
              Mentions légales
            </button>
            <span>•</span>
            <button onClick={() => handleNavClick('privacy')} className="hover:text-white transition-colors">
              Confidentialité
            </button>
          </div>
        </div>

        {/* Crafted indication as per human, literal design values */}
        <div className="pt-6 text-center text-[10px] text-fennec-cream/30 flex items-center justify-center">
          <span>Propulsé par Fenny — Malin, fiable et proche de vous</span>
          <Heart className="w-3 h-3 ml-1 text-fennec-red fill-current" />
        </div>

      </div>
    </footer>
  );
}
