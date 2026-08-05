/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppTab } from '../types';
import { Shield, ExternalLink, Heart, Mail, Phone, Info, X, TrendingUp, Award, Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSelector from './LanguageSelector';
import fenyAvatar from '../assets/images/feny_mascot_avatar_1783245725195.jpg';

interface FooterProps {
  onTabChange: (tab: AppTab) => void;
}

export default function Footer({ onTabChange }: FooterProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { language, t } = useLanguage();

  const handleNavClick = (tab: AppTab) => {
    onTabChange(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fc = {
    fr: {
      tagline: '"Malin, pour vous. Proche de vous."',
      desc: "Le comparateur astucieux et indépendant en Suisse pour vos assurances maladie, 3ème pilier et prévoyance familiale.",
      col2_title: "Assurance Maladie",
      col2_l1: "Comparatif des caisses 2026",
      col2_l2: "Comprendre la loi LAMal",
      col2_l3: "Assurances complémentaires LCA",
      col2_l4: "Primes par canton suisse",
      col3_title: "3e Pilier & Prévoyance",
      col3_l1: "Comparateur 3ème Pilier A & B",
      col3_l2: "Rendements & Placements",
      col3_l3: "Plafonds déductibles 2025 / 2026",
      col3_l4: "Assurance décès et invalidité",
      col4_title: "Ressources & Légal",
      col4_l1: "À propos de Fenny et ses valeurs",
      col4_l2: "Vos questions fréquentes (FAQ)",
      col4_l3: "Mentions Légales",
      col4_l4: "Politique de Confidentialité",
      compliance_title: "Avis de conformité et neutralité suisse :",
      compliance_p1: "Le Fennec Malin (lefennecmalin.ch) est un comparateur d'assurances 100% neutre et indépendant. Les calculs de primes maladie obligatoires sont simulés sur la base des barèmes officiels approuvés par l'Office Fédéral de la Santé Publique (OFSP) et fournis par priminfo.admin.ch.",
      compliance_p2: "Conformément à la loi fédérale sur l'assurance-maladie (LAMal), les prestations de base de l'assurance obligatoire sont strictement identiques d'un assureur à l'autre. Seules les primes mensuelles et le service de remboursement diffèrent.",
      compliance_p3: "*Divulgation de transparence : Afin de vous garantir un service entièrement gratuit et dénué de publicité intrusive, nous pouvons percevoir une rémunération d’apporteur d’adresses de la part de nos assureurs partenaires lors de l'établissement d'une offre. Cela n'impacte en aucun cas le tarif de votre prime (neutralité tarifaire garantie).",
      powered_by: "Propulsé par Fenny — Malin, fiable et proche de vous",
      close: "Fermer",
      lca_desc: "Contrairement à l'assurance de base (LAMal), les assurances complémentaires (LCA) relèvent du droit privé. Les assureurs ont le droit de poser des questions de santé détaillées.",
      lca_amb_title: "⚕️ Complémentaires Ambulatoires",
      lca_amb_desc: "Médecines douces, ostéopathie, lunettes/lentilles, abonnements de fitness, soins d'urgence à l'étranger.",
      lca_hosp_title: "🏥 Complémentaires Hospitalières",
      lca_hosp_desc: "Choix du médecin traitant à l'hôpital et séjour en division mi-privée ou privée partout en Suisse.",
      cantons_desc: "Chaque canton suisse définit ses propres primes d'assurance obligatoire (LAMal) en fonction des coûts de la santé régionaux.",
      canton_col: "Canton",
      estimate_col: "Estimation Moyenne 2026",
      per_month: "/ mois",
      rendements_desc: "Le choix du support pour votre 3e pilier détermine le rendement à long terme et la croissance de votre capital de retraite.",
      classic_title: "🏦 Compte 3a Épargne Classique",
      classic_desc: "Sécurité du capital garanti. Taux d'intérêt stables.",
      invest_title: "📈 Compte 3a Investissement Titres",
      invest_desc: "Investi en bourse (20% à 100% d'actions). Rendement historique élevé à long terme.",
      with_2nd_pillar: "Avec 2ème Pilier",
      without_2nd_pillar: "Sans 2ème Pilier",
      deces_desc: "Garanties de risques pour protéger vos proches et vous-même contre les aléas de la vie.",
      made_by: "Créé par"
    },
    de: {
      tagline: '"Schlau für Sie. Nah bei Ihnen."',
      desc: "Der schlaue und unabhängige Schweizer Vergleichsdienst für Krankenversicherungen, 3. Säule und Familienvorsorge.",
      col2_title: "Krankenversicherung",
      col2_l1: "Krankenkassenvergleich 2026",
      col2_l2: "Das KVG-Gesetz verstehen",
      col2_l3: "Zusatzversicherungen VVG",
      col2_l4: "Prämien nach Schweizer Kanton",
      col3_title: "3. Säule & Vorsorge",
      col3_l1: "Vergleich 3. Säule A & B",
      col3_l2: "Rendite & Anlagen",
      col3_l3: "Abzugsfähige Höchstbeträge 2025 / 2026",
      col3_l4: "Todesfall- und Erwerbsunfähigkeitsversicherung",
      col4_title: "Ressourcen & Rechtliches",
      col4_l1: "Über Fenny und seine Werte",
      col4_l2: "Häufige Fragen (FAQ)",
      col4_l3: "Impressum",
      col4_l4: "Datenschutzerklärung",
      compliance_title: "Schweizer Konformität & Neutralität:",
      compliance_p1: "Le Fennec Malin (lefennecmalin.ch) ist ein 100% neutraler und unabhängiger Versicherungsvergleich. Die Berechnungen der Grundversicherungsprämien basieren auf den offiziellen BAG-Tarifen (priminfo.admin.ch).",
      compliance_p2: "Gemäß KVG-Gesetz sind die Leistungen der Grundversicherung bei allen Krankenkassen exakt identisch. Nur die Monatsprämien unterscheiden sich.",
      compliance_p3: "*Transparenz-Hinweis: Um diesen Dienst kostenlos anzubieten, erhalten wir gegebenenfalls Vermittlungsprovisionen von Partnerversicherern.",
      powered_by: "Angetrieben von Fenny — Schlau, zuverlässig und nah bei Ihnen",
      close: "Schließen",
      lca_desc: "Im Gegensatz zur Grundversicherung (KVG) unterliegen Zusatzversicherungen (VVG) dem Privatrecht. Versicherer dürfen detaillierte Gesundheitsfragen stellen.",
      lca_amb_title: "⚕️ Ambulante Zusatzversicherungen",
      lca_amb_desc: "Alternativmedizin, Osteopathie, Brillen/Kontaktlinsen, Fitnessabos, Notfallbehandlung im Ausland.",
      lca_hosp_title: "🏥 Spitalzusatzversicherungen",
      lca_hosp_desc: "Freie Arztwahl im Spital und Aufenthalt in der Halbprivat- oder Privatabteilung in der ganzen Schweiz.",
      cantons_desc: "Jeder Schweizer Kanton legt seine eigenen Grundversicherungsprämien (KVG) je nach regionalen Gesundheitskosten fest.",
      canton_col: "Kanton",
      estimate_col: "Durchschnittsschätzung 2026",
      per_month: "/ Monat",
      rendements_desc: "Die Wahl der Anlageform für Ihre 3. Säule bestimmt die langfristige Rendite und das Wachstum Ihres Alterskapitals.",
      classic_title: "🏦 Klassisches 3a Sparkonto",
      classic_desc: "Garantierte Kapitalsicherheit. Stabile Zinssätze.",
      invest_title: "📈 3a Wertschriftenkonto",
      invest_desc: "An der Börse investiert (20% bis 100% Aktien). Langfristig höhere historische Rendite.",
      with_2nd_pillar: "Mit 2. Säule",
      without_2nd_pillar: "Ohne 2. Säule",
      deces_desc: "Risikoschutz zum Schutz Ihrer Angehörigen und Ihrer selbst vor den Wechselfällen des Lebens.",
      made_by: "Erstellt von"
    },
    en: {
      tagline: '"Smart for you. Close to you."',
      desc: "The smart and independent Swiss comparison platform for health insurance, 3rd pillar, and family financial security.",
      col2_title: "Health Insurance",
      col2_l1: "Health insurance comparison 2026",
      col2_l2: "Understanding Swiss health law",
      col2_l3: "Supplementary insurance (LCA/VVG)",
      col2_l4: "Premiums by Swiss canton",
      col3_title: "3rd Pillar & Pension",
      col3_l1: "3rd Pillar A & B comparison",
      col3_l2: "Returns & Investments",
      col3_l3: "Tax deduction limits 2025 / 2026",
      col3_l4: "Life and disability insurance",
      col4_title: "Resources & Legal",
      col4_l1: "About Fenny and our values",
      col4_l2: "Frequently asked questions (FAQ)",
      col4_l3: "Legal Notice",
      col4_l4: "Privacy Policy",
      compliance_title: "Swiss Neutrality & Compliance Statement:",
      compliance_p1: "Le Fennec Malin (lefennecmalin.ch) is a 100% neutral and independent comparison platform. Basic health insurance simulations use official FOPH rates from priminfo.admin.ch.",
      compliance_p2: "Under Swiss federal health law (LAMal/KVG), basic health coverage benefits are strictly identical across all providers.",
      compliance_p3: "*Transparency Notice: To provide a free service, we may receive referral commissions from partner insurance providers.",
      powered_by: "Powered by Fenny — Smart, reliable and close to you",
      close: "Close",
      lca_desc: "Unlike basic insurance (LAMal/KVG), supplementary insurance (LCA/VVG) falls under private law. Insurers are allowed to ask detailed health questions.",
      lca_amb_title: "⚕️ Outpatient Supplementary Cover",
      lca_amb_desc: "Alternative medicine, osteopathy, glasses/contact lenses, fitness subscriptions, emergency care abroad.",
      lca_hosp_title: "🏥 Hospital Supplementary Cover",
      lca_hosp_desc: "Choice of treating physician in hospital and semi-private or private ward stays anywhere in Switzerland.",
      cantons_desc: "Each Swiss canton sets its own mandatory insurance (LAMal/KVG) premiums based on regional healthcare costs.",
      canton_col: "Canton",
      estimate_col: "2026 Average Estimate",
      per_month: "/ month",
      rendements_desc: "The investment vehicle you choose for your 3rd pillar determines its long-term return and the growth of your retirement capital.",
      classic_title: "🏦 Classic 3a Savings Account",
      classic_desc: "Guaranteed capital security. Stable interest rates.",
      invest_title: "📈 3a Securities Investment Account",
      invest_desc: "Invested in the stock market (20% to 100% equities). Higher historical long-term returns.",
      with_2nd_pillar: "With 2nd Pillar",
      without_2nd_pillar: "Without 2nd Pillar",
      deces_desc: "Risk coverage to protect your loved ones and yourself against life's uncertainties.",
      made_by: "Made by"
    },
    it: {
      tagline: '"Intelligente per te. Vicino a te."',
      desc: "Il comparatore intelligente e indipendente in Svizzera per assicurazioni malattia, 3° pilastro e previdenza familiare.",
      col2_title: "Assicurazione Malattia",
      col2_l1: "Confronto casse malati 2026",
      col2_l2: "Comprendere la legge LAMal",
      col2_l3: "Assicurazioni complementari LCA",
      col2_l4: "Premi per cantone svizzero",
      col3_title: "3° Pilastro & Previdenza",
      col3_l1: "Comparatore 3° Pilastro A & B",
      col3_l2: "Rendimenti & Investimenti",
      col3_l3: "Massimali deducibili 2025 / 2026",
      col3_l4: "Assicurazione decesso e invalidità",
      col4_title: "Risorse & Note Legali",
      col4_l1: "Informazioni su Fenny e i suoi valori",
      col4_l2: "Domande frequenti (FAQ)",
      col4_l3: "Note Legali",
      col4_l4: "Informativa sulla Privacy",
      compliance_title: "Dichiarazione di conformità e neutralità svizzera:",
      compliance_p1: "Le Fennec Malin è un comparatore 100% neutrale e indipendente. I calcoli delle simulazioni si basano sui dati ufficiali UFSP e Priminfo.",
      compliance_p2: "In base alla legge LAMal, le prestazioni di base sono identiche per tutte le casse malati.",
      compliance_p3: "*Nota di trasparenza: Per garantire un servizio gratuito, potremmo ricevere provvigioni dai nostri partner assicurativi.",
      powered_by: "Sviluppato con Fenny — Intelligente, affidabile e vicino a te",
      close: "Chiudi",
      lca_desc: "A differenza dell'assicurazione di base (LAMal), le assicurazioni complementari (LCA) rientrano nel diritto privato. Gli assicuratori possono porre domande dettagliate sulla salute.",
      lca_amb_title: "⚕️ Complementari Ambulatoriali",
      lca_amb_desc: "Medicine alternative, osteopatia, occhiali/lenti a contatto, abbonamenti fitness, cure d'urgenza all'estero.",
      lca_hosp_title: "🏥 Complementari Ospedaliere",
      lca_hosp_desc: "Scelta del medico curante in ospedale e soggiorno in reparto semi-privato o privato in tutta la Svizzera.",
      cantons_desc: "Ogni cantone svizzero stabilisce i propri premi dell'assicurazione obbligatoria (LAMal) in base ai costi sanitari regionali.",
      canton_col: "Cantone",
      estimate_col: "Stima Media 2026",
      per_month: "/ mese",
      rendements_desc: "La scelta del supporto per il tuo 3° pilastro determina il rendimento a lungo termine e la crescita del tuo capitale pensionistico.",
      classic_title: "🏦 Conto 3a Risparmio Classico",
      classic_desc: "Sicurezza del capitale garantita. Tassi d'interesse stabili.",
      invest_title: "📈 Conto 3a Investimento Titoli",
      invest_desc: "Investito in borsa (dal 20% al 100% in azioni). Rendimento storico elevato nel lungo periodo.",
      with_2nd_pillar: "Con 2° Pilastro",
      without_2nd_pillar: "Senza 2° Pilastro",
      deces_desc: "Copertura dei rischi per proteggere i tuoi cari e te stesso dagli imprevisti della vita.",
      made_by: "Realizzato da"
    }
  }[language] || {
    tagline: '"Malin, pour vous. Proche de vous."',
    desc: "Le comparateur astucieux et indépendant en Suisse.",
    col2_title: "Assurance Maladie",
    col2_l1: "Comparatif des caisses 2026",
    col2_l2: "Comprendre la loi LAMal",
    col2_l3: "Assurances complémentaires LCA",
    col2_l4: "Primes par canton suisse",
    col3_title: "3e Pilier & Prévoyance",
    col3_l1: "Comparateur 3ème Pilier A & B",
    col3_l2: "Rendements & Placements",
    col3_l3: "Plafonds déductibles 2025 / 2026",
    col3_l4: "Assurance décès et invalidité",
    col4_title: "Ressources & Légal",
    col4_l1: "À propos de Fenny et ses valeurs",
    col4_l2: "Vos questions fréquentes (FAQ)",
    col4_l3: "Mentions Légales",
    col4_l4: "Politique de Confidentialité",
    compliance_title: "Avis de conformité :",
    compliance_p1: "",
    compliance_p2: "",
    compliance_p3: "",
    powered_by: "Propulsé par Fenny",
    close: "Fermer"
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
              {fc.tagline}
            </p>
            <p className="text-sm text-fennec-cream/80 leading-relaxed">
              {fc.desc}
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
              {fc.col2_title}
            </h4>
            <ul className="space-y-2.5 text-sm text-fennec-cream/80">
              <li>
                <button onClick={() => handleNavClick('health-comparator')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                  {fc.col2_l1}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('faq')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                  {fc.col2_l2}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('lca')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                  {fc.col2_l3}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('cantons')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                  {fc.col2_l4}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Prévoyance / Vie */}
          <div>
            <h4 className="font-display text-base font-bold text-white mb-4 tracking-wide uppercase border-l-2 border-fennec-tan pl-2">
              {fc.col3_title}
            </h4>
            <ul className="space-y-2.5 text-sm text-fennec-cream/80">
              <li>
                <button onClick={() => handleNavClick('life-comparator')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                  {fc.col3_l1}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('rendements')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                  {fc.col3_l2}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('plafonds')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                  {fc.col3_l3}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('deces')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                  {fc.col3_l4}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Informations & Liens officiels */}
          <div>
            <h4 className="font-display text-base font-bold text-white mb-4 tracking-wide uppercase border-l-2 border-fennec-sand pl-2">
              {fc.col4_title}
            </h4>
            <ul className="space-y-2.5 text-sm text-fennec-cream/80">
              <li>
                <button onClick={() => handleNavClick('about')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                  {fc.col4_l1}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('faq')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                  {fc.col4_l2}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('legal')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                  {fc.col4_l3}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('privacy')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                  {fc.col4_l4}
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
              <span className="font-bold text-white uppercase block">{fc.compliance_title}</span>
              <p>{fc.compliance_p1}</p>
              <p>{fc.compliance_p2}</p>
              <p className="mt-2 text-[10px]">{fc.compliance_p3}</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright and official links */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-fennec-cream/60 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <span>© 2026 Le Fennec Malin — {t('footer_rights')}</span>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <LanguageSelector variant="footer" />
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
            <button onClick={() => handleNavClick('legal')} className="hover:text-white transition-colors cursor-pointer">
              {t('legal_notice')}
            </button>
            <span>•</span>
            <button onClick={() => handleNavClick('privacy')} className="hover:text-white transition-colors cursor-pointer">
              {t('privacy_policy')}
            </button>
          </div>
        </div>

        {/* Crafted indication */}
        <div className="pt-6 text-center text-[10px] text-fennec-cream/40 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
          <span className="flex items-center">
            {fc.powered_by}
            <Heart className="w-3 h-3 ml-1 text-fennec-red fill-current" />
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            {fc.made_by}{' '}
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
                  <h3 className="font-display font-black text-xl">{fc.col2_l3}</h3>
                </div>
                <p className="text-xs text-fennec-dark/70 leading-relaxed">
                  {fc.lca_desc}
                </p>
                <div className="space-y-3 pt-2">
                  <div className="p-3 bg-white rounded-xl border border-fennec-cream/45 space-y-1">
                    <span className="text-xs font-bold text-fennec-dark block">{fc.lca_amb_title}</span>
                    <span className="text-[11px] text-fennec-dark/65 block leading-normal">
                      {fc.lca_amb_desc}
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-fennec-cream/45 space-y-1">
                    <span className="text-xs font-bold text-fennec-dark block">{fc.lca_hosp_title}</span>
                    <span className="text-[11px] text-fennec-dark/65 block leading-normal">
                      {fc.lca_hosp_desc}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeModal === 'cantons' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-fennec-red">
                  <Info className="w-6 h-6 shrink-0" />
                  <h3 className="font-display font-black text-xl">{fc.col2_l4}</h3>
                </div>
                <p className="text-xs text-fennec-dark/70 leading-relaxed">
                  {fc.cantons_desc}
                </p>
                <div className="bg-white rounded-2xl border border-fennec-cream/45 overflow-hidden">
                  <div className="grid grid-cols-2 bg-fennec-cream/35 p-2 border-b border-fennec-cream/40 text-xs font-bold">
                    <span>{fc.canton_col}</span>
                    <span>{fc.estimate_col}</span>
                  </div>
                  <div className="divide-y divide-fennec-cream/30 text-[11px] font-mono">
                    <div className="grid grid-cols-2 p-2"><span>Genève (GE)</span><span className="font-bold text-fennec-red">~ CHF 480 - 540 {fc.per_month}</span></div>
                    <div className="grid grid-cols-2 p-2"><span>Vaud (VD)</span><span className="font-bold text-fennec-red">~ CHF 430 - 490 {fc.per_month}</span></div>
                    <div className="grid grid-cols-2 p-2"><span>Neuchâtel (NE)</span><span className="font-bold text-fennec-red">~ CHF 450 - 510 {fc.per_month}</span></div>
                    <div className="grid grid-cols-2 p-2"><span>Zurich (ZH)</span><span className="font-bold text-fennec-red">~ CHF 360 - 410 {fc.per_month}</span></div>
                    <div className="grid grid-cols-2 p-2"><span>Valais (VS)</span><span className="font-bold text-emerald-700">~ CHF 320 - 370 {fc.per_month}</span></div>
                  </div>
                </div>
              </div>
            )}

            {activeModal === 'rendements' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-fennec-tan">
                  <TrendingUp className="w-6 h-6 shrink-0" />
                  <h3 className="font-display font-black text-xl">{fc.col3_l2}</h3>
                </div>
                <p className="text-xs text-fennec-dark/70 leading-relaxed">
                  {fc.rendements_desc}
                </p>
                <div className="space-y-3 pt-1">
                  <div className="p-3 bg-white rounded-xl border border-fennec-cream/45 space-y-1">
                    <span className="text-xs font-bold text-fennec-dark block">{fc.classic_title}</span>
                    <span className="text-[11px] text-fennec-dark/65 block leading-normal">
                      {fc.classic_desc}
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-fennec-cream/45 space-y-1">
                    <span className="text-xs font-bold text-fennec-dark block">{fc.invest_title}</span>
                    <span className="text-[11px] text-fennec-dark/65 block leading-normal">
                      {fc.invest_desc}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeModal === 'plafonds' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-fennec-tan">
                  <Shield className="w-6 h-6 shrink-0" />
                  <h3 className="font-display font-black text-xl">{fc.col3_l3}</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-4 bg-white rounded-xl border border-fennec-cream/45 text-center space-y-1">
                    <span className="text-[10px] font-bold text-fennec-dark/60 block uppercase">{fc.with_2nd_pillar}</span>
                    <span className="text-lg font-display font-black text-fennec-terracotta block">CHF 7'258.-</span>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-fennec-cream/45 text-center space-y-1">
                    <span className="text-[10px] font-bold text-fennec-dark/60 block uppercase">{fc.without_2nd_pillar}</span>
                    <span className="text-lg font-display font-black text-fennec-terracotta block">CHF 36'288.-</span>
                  </div>
                </div>
              </div>
            )}

            {activeModal === 'deces' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-fennec-tan">
                  <Award className="w-6 h-6 shrink-0" />
                  <h3 className="font-display font-black text-xl">{fc.col3_l4}</h3>
                </div>
                <p className="text-xs text-fennec-dark/70 leading-relaxed">
                  {fc.deces_desc}
                </p>
              </div>
            )}

            <div className="pt-2 text-center">
              <button 
                onClick={() => setActiveModal(null)} 
                className="px-6 py-2 bg-fennec-dark text-white font-display font-bold text-xs uppercase tracking-wider rounded-full hover:bg-fennec-terracotta transition-all cursor-pointer"
              >
                {fc.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
