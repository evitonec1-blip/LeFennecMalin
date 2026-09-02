/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppTab } from '../types';
import { Shield, ExternalLink, Heart, Mail, Info, X, TrendingUp, Award, Check, Scale, UserCheck } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSelector from './LanguageSelector';
import { teleportToTop } from '../utils/scrollUtils';
import fenyAvatar from '../assets/images/feny_mascot_avatar_1783245725195.jpg';

interface FooterProps {
  onTabChange: (tab: AppTab) => void;
}

export default function Footer({ onTabChange }: FooterProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { language, t } = useLanguage();

  const handleNavClick = (tab: AppTab) => {
    onTabChange(tab);
    teleportToTop();
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
      col4_l5: "Article 45 LSA",
      col4_l6: "Qualifications de l’intermédiaire",
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
      col4_l5: "Artikel 45 VAG",
      col4_l6: "Qualifikationen des Vermittlers",
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
      col4_l5: "Article 45 ISA",
      col4_l6: "Intermediary Qualifications",
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
      col4_l5: "Articolo 45 LSA",
      col4_l6: "Qualifiche dell'intermediario",
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
    },
    es: {
      tagline: '"Inteligente para ti. Cerca de ti."',
      desc: "El comparador inteligente e independiente en Suiza para seguros de enfermedad, 3er pilar y previsión familiar.",
      col2_title: "Seguro de Enfermedad",
      col2_l1: "Comparativa cajas de salud 2026",
      col2_l2: "Entender la ley LAMal",
      col2_l3: "Seguros complementarios LCA",
      col2_l4: "Primas por cantón suizo",
      col3_title: "3er Pilar & Previsión",
      col3_l1: "Comparador 3er Pilar A & B",
      col3_l2: "Rendimientos & Inversiones",
      col3_l3: "Límites deducibles 2025 / 2026",
      col3_l4: "Seguro de fallecimiento e invalidez",
      col4_title: "Recursos & Aviso Legal",
      col4_l1: "Información sobre Fenny y sus valores",
      col4_l2: "Preguntas frecuentes (FAQ)",
      col4_l3: "Aviso Legal",
      col4_l4: "Política de Privacidad",
      col4_l5: "Artículo 45 LSA",
      col4_l6: "Cualificaciones del intermediario",
      compliance_title: "Declaración de conformidad y neutralidad suiza:",
      compliance_p1: "Le Fennec Malin es un comparador 100% neutral e independiente. Los cálculos de las simulaciones se basan en los datos oficiales OFSP y Priminfo.",
      compliance_p2: "Según la ley LAMal, las prestaciones básicas son idénticas para todas las cajas de salud.",
      compliance_p3: "*Nota de transparencia: Para garantizar un servicio gratuito, podríamos recibir comisiones de nuestros socios aseguradores.",
      powered_by: "Desarrollado con Fenny — Inteligente, fiable y cerca de ti",
      close: "Cerrar",
      lca_desc: "A diferencia del seguro básico (LAMal), los seguros complementarios (LCA) se rigen por el derecho privado. Los aseguradores pueden hacer preguntas detalladas sobre la salud.",
      lca_amb_title: "⚕️ Complementarios Ambulatorios",
      lca_amb_desc: "Medicinas alternativas, osteopatía, gafas/lentillas, abonos de fitness, urgencias en el extranjero.",
      lca_hosp_title: "🏥 Complementarios Hospitalarios",
      lca_hosp_desc: "Elección del médico tratante en el hospital y estancia en habitación semiprivada o privada en toda Suiza.",
      cantons_desc: "Cada cantón suizo establece sus propias primas del seguro obligatorio (LAMal) en función de los costes sanitarios regionales.",
      canton_col: "Cantón",
      estimate_col: "Estimación Media 2026",
      per_month: "/ mes",
      rendements_desc: "La elección del soporte para tu 3er pilar determina el rendimiento a largo plazo y el crecimiento de tu capital de jubilación.",
      classic_title: "🏦 Cuenta 3a Ahorro Clásico",
      classic_desc: "Seguridad del capital garantizada. Tipos de interés estables.",
      invest_title: "📈 Cuenta 3a Inversión en Acciones",
      invest_desc: "Invertido en bolsa (del 20% al 100% en acciones). Alto rendimiento histórico a largo plazo.",
      with_2nd_pillar: "Con 2º Pilar",
      without_2nd_pillar: "Sin 2º Pilar",
      deces_desc: "Cobertura de riesgos para proteger a tus seres queridos y a ti mismo de los imprevistos de la vida.",
      made_by: "Desarrollado por"
    },
    pt: {
      tagline: '"Inteligente para si. Perto de si."',
      desc: "O comparador inteligente e independente na Suíça para seguros de saúde, 3º pilar e previdência familiar.",
      col2_title: "Seguro de Saúde",
      col2_l1: "Comparativo caixas de saúde 2026",
      col2_l2: "Compreender a lei LAMal",
      col2_l3: "Seguros complementares LCA",
      col2_l4: "Prémios por cantão suíço",
      col3_title: "3º Pilar & Previdência",
      col3_l1: "Comparador 3º Pilar A & B",
      col3_l2: "Rendimentos & Investimentos",
      col3_l3: "Limites dedutíveis 2025 / 2026",
      col3_l4: "Seguro de falecimento e invalidez",
      col4_title: "Recursos & Aviso Legal",
      col4_l1: "Informação sobre Fenny e os seus valores",
      col4_l2: "Perguntas frequentes (FAQ)",
      col4_l3: "Aviso Legal",
      col4_l4: "Política de Privacidade",
      col4_l5: "Artigo 45 LSA",
      col4_l6: "Qualificações do intermediário",
      compliance_title: "Declaração de conformidade e neutralidade suíça:",
      compliance_p1: "Le Fennec Malin é um comparador 100% neutro e independente. Os cálculos das simulações baseiam-se nos dados oficiais OFSP e Priminfo.",
      compliance_p2: "Segundo a lei LAMal, as prestações básicas são idênticas para todas as caixas de saúde.",
      compliance_p3: "*Nota de transparência: Para garantir um serviço gratuito, poderemos receber comissões dos nossos parceiros seguradores.",
      powered_by: "Desenvolvido com Fenny — Inteligente, fiável e perto de si",
      close: "Fechar",
      lca_desc: "Ao contrário do seguro de base (LAMal), os seguros complementares (LCA) regem-se pelo direito privado. Os seguradores podem fazer perguntas detalhadas sobre a saúde.",
      lca_amb_title: "⚕️ Complementares Ambulatórios",
      lca_amb_desc: "Medicinas alternativas, osteopatia, óculos/lentes de contacto, assinaturas de fitness, urgências no estrangeiro.",
      lca_hosp_title: "🏥 Complementares Hospitalares",
      lca_hosp_desc: "Escolha do médico assistente no hospital e estadia em quarto semiprivado ou privado em toda a Suíça.",
      cantons_desc: "Cada cantão suíço estabelece os seus próprios prémios do seguro obrigatório (LAMal) em função dos custos de saúde regionais.",
      canton_col: "Cantão",
      estimate_col: "Estimativa Média 2026",
      per_month: "/ mês",
      rendements_desc: "A escolha do suporte para o seu 3º pilar determina o rendimento a longo prazo e o crescimento do seu capital de reforma.",
      classic_title: "🏦 Conta 3a Poupança Clássica",
      classic_desc: "Segurança do capital garantida. Taxas de juro estáveis.",
      invest_title: "📈 Conta 3a Investimento em Ações",
      invest_desc: "Investido em bolsa (de 20% a 100% em ações). Alto rendimento histórico a longo prazo.",
      with_2nd_pillar: "Com 2º Pilar",
      without_2nd_pillar: "Sem 2º Pilar",
      deces_desc: "Cobertura de riscos para proteger os seus entes queridos e a si próprio dos imprevistos da vida.",
      made_by: "Desenvolvido por"
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
    col4_l5: "Article 45 LSA",
    col4_l6: "Qualifications de l’intermédiaire",
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
                <button onClick={() => handleNavClick('methodologie')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                  Méthodologie & Sources OFSP
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('comment-fonctionne-le-comparateur')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                  Comment ça fonctionne
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('faq')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                  {fc.col4_l2}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('article-45-lsa')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                  {fc.col4_l5}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('qualifications-intermediaire')} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                  {fc.col4_l6}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* SEO Cross-Links Section: Swiss Cantons, Insurers, Guides & Calculators */}
        <div className="py-8 border-b border-white/10 space-y-6 text-xs text-fennec-cream/70">
          <div>
            <span className="font-display font-bold text-white uppercase text-[11px] tracking-wider block mb-3">
              🇨🇭 Primes d'assurance maladie dans les 26 cantons suisses :
            </span>
            <div className="flex flex-wrap gap-x-3 gap-y-2 leading-relaxed">
              <button onClick={() => handleNavClick('canton-geneve')} className="hover:text-white hover:underline cursor-pointer">Genève (GE)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('canton-vaud')} className="hover:text-white hover:underline cursor-pointer">Vaud (VD)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('canton-valais')} className="hover:text-white hover:underline cursor-pointer">Valais (VS)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('canton-fribourg')} className="hover:text-white hover:underline cursor-pointer">Fribourg (FR)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('canton-neuchatel')} className="hover:text-white hover:underline cursor-pointer">Neuchâtel (NE)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('canton-jura')} className="hover:text-white hover:underline cursor-pointer">Jura (JU)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('canton-berne')} className="hover:text-white hover:underline cursor-pointer">Berne (BE)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('canton-zurich')} className="hover:text-white hover:underline cursor-pointer">Zurich (ZH)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('canton-bale-ville')} className="hover:text-white hover:underline cursor-pointer">Bâle-Ville (BS)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('canton-bale-campagne')} className="hover:text-white hover:underline cursor-pointer">Bâle-Campagne (BL)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('canton-argovie')} className="hover:text-white hover:underline cursor-pointer">Argovie (AG)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('canton-soleure')} className="hover:text-white hover:underline cursor-pointer">Soleure (SO)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('canton-lucerne')} className="hover:text-white hover:underline cursor-pointer">Lucerne (LU)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('canton-zoug')} className="hover:text-white hover:underline cursor-pointer">Zoug (ZG)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('canton-schwyz')} className="hover:text-white hover:underline cursor-pointer">Schwyz (SZ)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('canton-uri')} className="hover:text-white hover:underline cursor-pointer">Uri (UR)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('canton-obwald')} className="hover:text-white hover:underline cursor-pointer">Obwald (OW)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('canton-nidwald')} className="hover:text-white hover:underline cursor-pointer">Nidwald (NW)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('canton-saint-gall')} className="hover:text-white hover:underline cursor-pointer">Saint-Gall (SG)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('canton-thurgovie')} className="hover:text-white hover:underline cursor-pointer">Thurgovie (TG)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('canton-schaffhouse')} className="hover:text-white hover:underline cursor-pointer">Schaffhouse (SH)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('canton-appenzell-rhodes-exterieures')} className="hover:text-white hover:underline cursor-pointer">Appenzell AR</button>
              <span>·</span>
              <button onClick={() => handleNavClick('canton-appenzell-rhodes-interieures')} className="hover:text-white hover:underline cursor-pointer">Appenzell AI</button>
              <span>·</span>
              <button onClick={() => handleNavClick('canton-glaris')} className="hover:text-white hover:underline cursor-pointer">Glaris (GL)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('canton-grisons')} className="hover:text-white hover:underline cursor-pointer">Grisons (GR)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('canton-tessin')} className="hover:text-white hover:underline cursor-pointer">Tessin (TI)</button>
            </div>
          </div>

          <div>
            <span className="font-display font-bold text-white uppercase text-[11px] tracking-wider block mb-3">
              🏥 Caisses maladie suisses agréées OFSP (Profils & Avis 2026) :
            </span>
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              <button onClick={() => handleNavClick('insurer-css')} className="hover:text-white hover:underline cursor-pointer">CSS Assurance</button>
              <span>·</span>
              <button onClick={() => handleNavClick('insurer-helsana')} className="hover:text-white hover:underline cursor-pointer">Helsana</button>
              <span>·</span>
              <button onClick={() => handleNavClick('insurer-swica')} className="hover:text-white hover:underline cursor-pointer">SWICA</button>
              <span>·</span>
              <button onClick={() => handleNavClick('insurer-groupe-mutuel')} className="hover:text-white hover:underline cursor-pointer">Groupe Mutuel</button>
              <span>·</span>
              <button onClick={() => handleNavClick('insurer-assura')} className="hover:text-white hover:underline cursor-pointer">Assura</button>
              <span>·</span>
              <button onClick={() => handleNavClick('insurer-concordia')} className="hover:text-white hover:underline cursor-pointer">Concordia</button>
              <span>·</span>
              <button onClick={() => handleNavClick('insurer-sanitas')} className="hover:text-white hover:underline cursor-pointer">Sanitas</button>
              <span>·</span>
              <button onClick={() => handleNavClick('insurer-visana')} className="hover:text-white hover:underline cursor-pointer">Visana</button>
              <span>·</span>
              <button onClick={() => handleNavClick('insurer-kpt')} className="hover:text-white hover:underline cursor-pointer">KPT / CPT</button>
              <span>·</span>
              <button onClick={() => handleNavClick('insurer-sympany')} className="hover:text-white hover:underline cursor-pointer">Sympany</button>
              <span>·</span>
              <button onClick={() => handleNavClick('insurer-oekk')} className="hover:text-white hover:underline cursor-pointer">ÖKK</button>
              <span>·</span>
              <button onClick={() => handleNavClick('insurer-atupri')} className="hover:text-white hover:underline cursor-pointer">Atupri</button>
              <span>·</span>
              <button onClick={() => handleNavClick('insurer-egk')} className="hover:text-white hover:underline cursor-pointer">EGK Santé</button>
              <span>·</span>
              <button onClick={() => handleNavClick('insurer-aquilana')} className="hover:text-white hover:underline cursor-pointer">Aquilana</button>
            </div>
          </div>

          <div>
            <span className="font-display font-bold text-white uppercase text-[11px] tracking-wider block mb-3">
              📐 Simulateurs d'optimisation & Guides d'experts :
            </span>
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              <button onClick={() => handleNavClick('comparer-assureurs-primes-2026')} className="hover:text-white hover:underline cursor-pointer font-bold text-amber-300">Comparez les Assureurs (Nouvelles Primes 2026)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('lamal-primes-2026')} className="hover:text-white hover:underline cursor-pointer font-bold text-fennec-sand">Étude Primes OFSP 2026 (26 Cantons)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('observatoire')} className="hover:text-white hover:underline cursor-pointer font-bold text-emerald-300">Observatoire des Primes (Open Data)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('lamal-frontalier')} className="hover:text-white hover:underline cursor-pointer">Frontaliers (LAMal vs CMU 8%)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('lamal-seniors')} className="hover:text-white hover:underline cursor-pointer">Seniors & Retraités (Franchise 300)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('tool-calculateur-franchise')} className="hover:text-white hover:underline cursor-pointer">Calculateur Franchise (300 vs 2500)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('tool-calculateur-impot-3a')} className="hover:text-white hover:underline cursor-pointer">Simulateur Impôts 3ème Pilier 3a</button>
              <span>·</span>
              <button onClick={() => handleNavClick('tool-simulateur-frontalier')} className="hover:text-white hover:underline cursor-pointer">Simulateur Droit d'Option</button>
              <span>·</span>
              <button onClick={() => handleNavClick('guide-modeles-assurance')} className="hover:text-white hover:underline cursor-pointer">Modèles Telmed / HMO / Médecin</button>
              <span>·</span>
              <button onClick={() => handleNavClick('guide-subside-assurance-maladie')} className="hover:text-white hover:underline cursor-pointer">Subsides & Aides aux Primes</button>
              <span>·</span>
              <button onClick={() => handleNavClick('guide-resiliation-assurance-maladie')} className="hover:text-white hover:underline cursor-pointer">Délais & Résiliation 30 Novembre</button>
              <span>·</span>
              <button onClick={() => handleNavClick('sources')} className="hover:text-white hover:underline cursor-pointer text-fennec-cream/90">Sources Officielles (OFSP & FINMA)</button>
            </div>
          </div>

          <div>
            <span className="font-display font-bold text-white uppercase text-[11px] tracking-wider block mb-3">
              🛡️ Tous nos comparateurs d'assurances en Suisse :
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <button onClick={() => handleNavClick('seo-maladie')} className="hover:text-white hover:underline cursor-pointer">Assurance Maladie LAMal</button>
              <span>·</span>
              <button onClick={() => handleNavClick('seo-pilier')} className="hover:text-white hover:underline cursor-pointer">3ème Pilier (3a / 3b)</button>
              <span>·</span>
              <button onClick={() => handleNavClick('category-assurance-auto')} className="hover:text-white hover:underline cursor-pointer">Assurance Auto & Casco</button>
              <span>·</span>
              <button onClick={() => handleNavClick('category-assurance-menage')} className="hover:text-white hover:underline cursor-pointer">Assurance Ménage</button>
              <span>·</span>
              <button onClick={() => handleNavClick('category-assurance-rc')} className="hover:text-white hover:underline cursor-pointer">RC Privée</button>
              <span>·</span>
              <button onClick={() => handleNavClick('category-assurance-vie')} className="hover:text-white hover:underline cursor-pointer">Assurance Vie & Décès</button>
              <span>·</span>
              <button onClick={() => handleNavClick('category-protection-juridique')} className="hover:text-white hover:underline cursor-pointer">Protection Juridique</button>
              <span>·</span>
              <button onClick={() => handleNavClick('category-assurance-voyage')} className="hover:text-white hover:underline cursor-pointer">Assurance Voyage</button>
              <span>·</span>
              <button onClick={() => handleNavClick('category-assurance-animaux')} className="hover:text-white hover:underline cursor-pointer">Assurance Animaux</button>
            </div>
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
            <span>•</span>
            <button onClick={() => handleNavClick('article-45-lsa')} className="hover:text-white transition-colors cursor-pointer">
              {fc.col4_l5}
            </button>
            <span>•</span>
            <button onClick={() => handleNavClick('qualifications-intermediaire')} className="hover:text-white transition-colors cursor-pointer">
              {fc.col4_l6}
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
              href="https://www.leadsempire.ch/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fennec-sand hover:text-white transition-colors underline font-medium"
            >
            leadsempire
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
