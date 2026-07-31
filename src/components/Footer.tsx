/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppTab } from '../types';
import { Shield, ExternalLink, Heart, Mail, Phone, Info, X, Sparkles, TrendingUp, Award, Check } from 'lucide-react';
import fenyAvatar from '../assets/images/feny_avatar_1783331224698.jpg';

interface FooterProps {
  onTabChange: (tab: AppTab) => void;
}

export default function Footer({ onTabChange }: FooterProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

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
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/fennec-avatar.jpg';
                  }}
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
                <button onClick={() => handleNavClick('health-comparator')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                  Comparatif des caisses 2026
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('faq')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                  Comprendre la loi LAMal
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('lca')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                  Assurances complémentaires LCA
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('cantons')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
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
                <button onClick={() => handleNavClick('life-comparator')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                  Comparateur 3ème Pilier A & B
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('rendements')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                  Rendements & Placements
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('plafonds')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                  Plafonds déductibles 2025 / 2026
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('deces')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
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
        <div className="pt-6 text-center text-[10px] text-fennec-cream/40 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
          <span className="flex items-center">
            Propulsé par Fenny — Malin, fiable et proche de vous
            <Heart className="w-3 h-3 ml-1 text-fennec-red fill-current" />
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Made by{' '}
            <a
              href="https://evitonec.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fennec-sand hover:text-white transition-colors underline font-medium"
            >
              evitonec
            </a>
          </span>
        </div>

      </div>

      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md" onClick={() => setActiveModal(null)}>
          <div className="bg-[#FAF8F5] text-fennec-dark max-w-lg w-full rounded-3xl p-6 md:p-8 border border-fennec-cream shadow-2xl relative space-y-6" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setActiveModal(null)} 
              className="absolute top-4 right-4 p-2 text-fennec-dark/50 hover:text-fennec-dark hover:bg-fennec-cream/20 rounded-full transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'lca' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-fennec-red">
                  <Heart className="w-6 h-6 shrink-0" />
                  <h3 className="font-display font-black text-xl">Assurances Complémentaires LCA</h3>
                </div>
                <p className="text-xs text-fennec-dark/70 leading-relaxed">
                  Contrairement à l'assurance de base (LAMal), les assurances complémentaires (LCA) relèvent du droit privé. Les assureurs ont le droit de poser des questions de santé détaillées et de refuser des candidats ou d'émettre des réserves.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="p-3 bg-white rounded-xl border border-fennec-cream/45 space-y-1">
                    <span className="text-xs font-bold text-fennec-dark block">⚕️ Complémentaires Ambulatoires</span>
                    <span className="text-[11px] text-fennec-dark/65 block leading-normal">
                      Couvre les médecines douces, l'ostéopathie, l'aide visuelle (lunettes/lentilles), les abonnements de fitness, et certains soins d'urgence à l'étranger.
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-fennec-cream/45 space-y-1">
                    <span className="text-xs font-bold text-fennec-dark block">🏥 Complémentaires Hospitalières</span>
                    <span className="text-[11px] text-fennec-dark/65 block leading-normal">
                      Permet de choisir votre médecin traitant à l'hôpital et de séjourner en division mi-privée (chambre à 2 lits) ou privée (chambre individuelle) partout en Suisse.
                    </span>
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 text-[11px] text-amber-800 p-3 rounded-xl">
                  <strong>💡 Conseil de Fenny :</strong> Souscrivez vos complémentaires le plus tôt possible, idéalement lorsque vous êtes en parfaite santé pour éviter tout refus !
                </div>
              </div>
            )}

            {activeModal === 'cantons' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-fennec-red">
                  <Info className="w-6 h-6 shrink-0" />
                  <h3 className="font-display font-black text-xl">Primes d'assurance maladie par canton</h3>
                </div>
                <p className="text-xs text-fennec-dark/70 leading-relaxed">
                  Chaque canton suisse définit ses propres primes d'assurance obligatoire (LAMal) en fonction des coûts de la santé régionaux. Les cantons sont souvent subdivisés en 3 régions de primes distinctes.
                </p>
                <div className="bg-white rounded-2xl border border-fennec-cream/45 overflow-hidden">
                  <div className="grid grid-cols-2 bg-fennec-cream/35 p-2 border-b border-fennec-cream/40 text-xs font-bold">
                    <span>Canton</span>
                    <span>Estimation Moyenne 2026</span>
                  </div>
                  <div className="divide-y divide-fennec-cream/30 text-[11px] font-mono">
                    <div className="grid grid-cols-2 p-2"><span>Genève (GE)</span><span className="font-bold text-fennec-red">~ CHF 480 - 540 / mois</span></div>
                    <div className="grid grid-cols-2 p-2"><span>Vaud (VD)</span><span className="font-bold text-fennec-red">~ CHF 430 - 490 / mois</span></div>
                    <div className="grid grid-cols-2 p-2"><span>Neuchâtel (NE)</span><span className="font-bold text-fennec-red">~ CHF 450 - 510 / mois</span></div>
                    <div className="grid grid-cols-2 p-2"><span>Zurich (ZH)</span><span className="font-bold text-fennec-red">~ CHF 360 - 410 / mois</span></div>
                    <div className="grid grid-cols-2 p-2"><span>Valais (VS)</span><span className="font-bold text-emerald-700">~ CHF 320 - 370 / mois</span></div>
                  </div>
                </div>
                <p className="text-[10px] text-fennec-dark/50 italic text-center">
                  *Estimations indicatives moyennes pour un adulte avec une franchise de CHF 300.- et couverture accident.
                </p>
              </div>
            )}

            {activeModal === 'rendements' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-fennec-tan">
                  <TrendingUp className="w-6 h-6 shrink-0" />
                  <h3 className="font-display font-black text-xl">Rendements & Placements Prévoyance</h3>
                </div>
                <p className="text-xs text-fennec-dark/70 leading-relaxed">
                  Le choix du support pour votre 3e pilier détermine le rendement à long terme et la croissance de votre capital de retraite.
                </p>
                <div className="space-y-3 pt-1">
                  <div className="p-3 bg-white rounded-xl border border-fennec-cream/45 space-y-1">
                    <span className="text-xs font-bold text-fennec-dark block">🏦 Compte 3a Epargne Classique (Cash)</span>
                    <span className="text-[11px] text-fennec-dark/65 block leading-normal">
                      Sécurité absolue du capital garanti à 100%. Idéal à moins de 5 ans de la retraite, mais soumis à des taux d'intérêt faibles (~1.0% à 1.25%).
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-fennec-cream/45 space-y-1">
                    <span className="text-xs font-bold text-fennec-dark block">📈 Compte 3a Investissement Titres (Fonds)</span>
                    <span className="text-[11px] text-fennec-dark/65 block leading-normal">
                      Investi en bourse de 20% à 100% d'actions. Rendement historique moyen de 3.5% à 5.5% par an. Recommandé pour les horizons à long terme (&gt; 10 ans).
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeModal === 'plafonds' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-fennec-tan">
                  <Shield className="w-6 h-6 shrink-0" />
                  <h3 className="font-display font-black text-xl">Plafonds Déductibles 3a (2025/2026)</h3>
                </div>
                <p className="text-xs text-fennec-dark/70 leading-relaxed">
                  L'administration fédérale fixe chaque année les montants déductibles maximaux pour la prévoyance liée (Pilier 3a).
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-4 bg-white rounded-xl border border-fennec-cream/45 text-center space-y-1">
                    <span className="text-[10px] font-bold text-fennec-dark/60 block uppercase">Avec 2ème Pilier (Salariés)</span>
                    <span className="text-lg font-display font-black text-fennec-terracotta block">CHF 7'258.-</span>
                    <span className="text-[9px] text-fennec-dark/50 block">Plafond annuel officiel</span>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-fennec-cream/45 text-center space-y-1">
                    <span className="text-[10px] font-bold text-fennec-dark/60 block uppercase">Sans 2ème Pilier (Indépendants)</span>
                    <span className="text-lg font-display font-black text-fennec-terracotta block">CHF 36'288.-</span>
                    <span className="text-[9px] text-fennec-dark/50 block">Max 20% du revenu net</span>
                  </div>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 p-3.5 rounded-xl text-center font-bold">
                  💰 Économisez en moyenne entre CHF 1'000.- et 3'500.- d'impôt par an selon votre canton en cotisant au maximum !
                </div>
              </div>
            )}

            {activeModal === 'deces' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-fennec-tan">
                  <Award className="w-6 h-6 shrink-0" />
                  <h3 className="font-display font-black text-xl">Assurance Décès & Invalidité</h3>
                </div>
                <p className="text-xs text-fennec-dark/70 leading-relaxed">
                  La prévoyance d'assurance (3a ou 3b) permet d'associer un volet d'épargne forcée avec des garanties de risques pour protéger vos proches et vous-même contre les accidents de la vie.
                </p>
                <div className="space-y-3 pt-1">
                  <div className="p-3 bg-white rounded-xl border border-fennec-cream/45 flex items-start space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-fennec-dark block">Exonération des Primes</span>
                      <span className="text-[11px] text-fennec-dark/65 block leading-normal">
                        Si vous tombez en incapacité de gain prolongée, l'assureur finance l'intégralité des cotisations annuelles à votre place. Votre capital de retraite est ainsi totalement garanti.
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-fennec-cream/45 flex items-start space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-fennec-dark block">Rente d'invalidité & Capital Décès</span>
                      <span className="text-[11px] text-fennec-dark/65 block leading-normal">
                        Versement régulier d'une rente d'invalidité ou d'un capital unique important à vos bénéficiaires désignés pour assurer leur sécurité financière immédiate.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2 text-center">
              <button 
                onClick={() => setActiveModal(null)} 
                className="px-6 py-2 bg-fennec-dark text-white font-display font-bold text-xs uppercase tracking-wider rounded-full hover:bg-fennec-terracotta transition-all cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
