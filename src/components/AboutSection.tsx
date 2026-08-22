/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Users, Eye, Heart, Ear, Lightbulb, Mountain, AlertCircle, Award, Scale, CheckCircle2, ArrowRight, FileCheck } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import fenyThinking from '../assets/images/feny_thinking_1783331247759.jpg';
import { AppTab } from '../types';

interface AboutSectionProps {
  onStartComparison?: () => void;
  onTabChange?: (tab: AppTab) => void;
}

export default function AboutSection({ onStartComparison, onTabChange }: AboutSectionProps) {
  const { language } = useLanguage();

  const c = {
    fr: {
      who_am_i: "À Propos & Notre Mission",
      greeting: "Le Fennec Malin — Comparateur d'Assurance 100% Indépendant en Suisse",
      tagline: '"Malin, pour vous. Proche de vous."',
      intro: "Le Fennec Malin (lefennecmalin.ch) est une plateforme numérique helvétique dédiée à la transparence, l'analyse comparative et l'optimisation des assurances maladie (LAMal/LCA), de la prévoyance (3ème pilier 3a/3b) et des assurances de choses en Suisse.",
      mascot_intro: "Porté par notre mascotte Fenny, le fennec aux grandes oreilles toujours attentif aux besoins des familles suisses, notre mission est de démystifier le système assurantiel helvétique et de redonner du pouvoir d'achat aux assurés sans aucun compromis sur la qualité de leur couverture.",
      
      authority_title: "Notre Expertise & Rigueur Actuarielle Suisse",
      authority_desc: "La crédibilité de nos comparateurs repose sur une méthodologie mathématique rigoureuse et des sources de données officielles certifiées par la Confédération suisse.",
      auth_1_title: "Données Officielles OFSP 2026",
      auth_1_desc: "Nos algorithmes intègrent l'intégralité des 250'000+ tarifs officiels publiés par l'Office Fédéral de la Santé Publique (OFSP / priminfo.admin.ch) pour les 26 cantons suisses.",
      auth_2_title: "Indépendance & Neutralité 100%",
      auth_2_desc: "Aucune compagnie d'assurance ne détient de participation dans le capital de notre société éditrice SAITHAMA Sàrl. Les résultats sont classés par ordre objectif de prix et de prestations.",
      auth_3_title: "Conformité FINMA & Art. 45 LSA",
      auth_3_desc: "Nos conseillers et intermédiaires partenaires respectent scrupuleusement les exigences de la Loi sur la surveillance des assurances (LSA) et sont formés aux normes AFA et au registre fédéral FINMA.",
      
      why_fennec: "Pourquoi le Fennec comme emblème ?",
      why_fennec_desc: "Le fennec des sables incarne trois qualités fondamentales pour un comparateur d'assurances de premier ordre :",
      ear_title: "Une écoute ultra-attentive :",
      ear_desc: "Tout comme le fennec capte les moindres vibrations, nous analysons vos besoins réels (famille, budget, santé) avant de recommander le moindre modèle ou franchise.",
      lightbulb_title: "Un esprit d'analyse affûté :",
      lightbulb_desc: "Dans la complexité des modèles alternatifs (Telmed, HMO, Réseau de soins) et de la fiscalité du 3ème pilier, nous débusquons les surcoûts inutiles.",
      mountain_title: "Une résistance aux hausses de primes :",
      mountain_desc: "Face à l'inflation constante des primes de base en Suisse (+6% en moyenne en 2026), nous offrons des stratégies concrètes d'économies pouvant atteindre plus de CHF 1'500.- par an par adulte.",
      
      values_title: "Nos 4 Valeurs Cardinales",
      benevolence: "Bienveillance & Empathie",
      benevolence_desc: "Nous plaçons l'humain, la protection des enfants et le budget des ménages au centre de nos priorités.",
      transparency: "Transparence Totale",
      transparency_desc: "Aucun frais caché, aucun surcoût d'intermédiation : vos primes LAMal sont strictement identiques qu'en direct.",
      reliability: "Rigueur Suisse & Sécurité nLPD",
      reliability_desc: "Hébergement sécurisé, calculs vérifiés et protection stricte de vos données privées selon la nLPD révisée.",
      local: "Ancrage Local & Disponibilité",
      local_desc: "Une équipe basée en Suisse romande à votre disposition pour vous orienter en toute sérénité.",
      
      legal_entity_title: "Informations sur l'Éditeur & Déclarations Légales",
      company_name: "Raison sociale : SAITHAMA Sàrl",
      company_address: "Siège social : Chemin des Dailles 8, 1033 Cheseaux-sur-Lausanne, Suisse (Vaud)",
      company_uid: "Numéro d'identification des entreprises (IDE) : CHE-272.095.360",
      company_finma: "Réglementation : Déclarations d'information selon l'Article 45 LSA (Loi sur la surveillance des assurances).",
      company_contact: "Contact : contact@lefennecmalin.ch",
      
      free_title: "Gratuité du service : comment fonctionne notre modèle ?",
      free_desc: "L'utilisation de nos comparateurs et calculateurs en ligne est 100% gratuite et sans aucun engagement pour les assurés. Afin de financer notre infrastructure technique et l'actualisation permanente des données, nous pouvons percevoir une rémunération standard d'apporteur d'affaires de la part de nos partenaires agréés lorsque vous demandez une mise en relation pour un devis personnalisé.",
      crucial_point: "Règle d'or légale : Les tarifs des primes d'assurance maladie de base (LAMal) sont fixés par l'OFSP et sont STRICTEMENT IDENTIQUES que vous souscriviez par notre intermédiaire ou directement auprès de la caisse maladie.",
      
      cta_compare: "Lancer un comparatif gratuit",
      cta_lsa: "Consulter la fiche Art. 45 LSA",
      cta_finma: "Qualifications des intermédiaires"
    },
    de: {
      who_am_i: "Über Uns & Unsere Mission",
      greeting: "Le Fennec Malin — 100% Unabhängiger Schweizer Versicherungsvergleich",
      tagline: '"Schlau für Sie. Nah bei Ihnen."',
      intro: "Le Fennec Malin (lefennecmalin.ch) ist eine Schweizer Plattform für transparente Vergleiche und Optimierungen in den Bereichen Grund- und Zusatzversicherung (KVG/VVG), 3. Säule (3a/3b) und Sachversicherungen.",
      mascot_intro: "Begleitet von unserem Maskottchen Fenny, dem Wüstenfuchs mit den grossen Ohren, ist es unsere Mission, das Schweizer Versicherungssystem verständlich zu machen und Schweizer Haushalten echte Ersparnisse zu ermöglichen.",
      
      authority_title: "Unsere Fachkompetenz & Schweizer Datenqualität",
      authority_desc: "Unsere Vergleiche basieren auf exakten mathematischen Modellen und offiziellen Bundesdaten.",
      auth_1_title: "Offizielle BAG-Daten 2026",
      auth_1_desc: "Über 250'000 offizielle Tarife des Bundesamts für Gesundheit (BAG / priminfo.admin.ch) für alle 26 Schweizer Kantone.",
      auth_2_title: "100% Unabhängig & Neutral",
      auth_2_desc: "Keine Versicherungsgesellschaft hält Anteile an unserer Betreibergesellschaft SAITHAMA Sàrl.",
      auth_3_title: "FINMA-Konformität & Art. 45 VAG",
      auth_3_desc: "Unsere Partner-Vermittler erfüllen alle Anforderungen des Versicherungsaufsichtsgesetzes (VAG) und der FINMA.",
      
      why_fennec: "Warum der Fennek als Wappentier?",
      why_fennec_desc: "Der Wüstenfuchs verkörpert die drei Kernstärken eines erstklassigen Vergleichsdienstes:",
      ear_title: "Aufmerksames Zuhören:",
      ear_desc: "Wir hören auf Ihre individuellen Bedürfnisse, bevor wir Modelle oder Franchisen empfehlen.",
      lightbulb_title: "Scharfer Verstand:",
      lightbulb_desc: "Wir durchleuchten Sparmodelle (Telmed, HMO, Hausarzt) und steuerliche 3a-Vorteile.",
      mountain_title: "Schutz vor Prämienanstiegen:",
      mountain_desc: "Wir helfen Ihnen, trotz steigender KVG-Prämien bis zu CHF 1'500.- pro erwachsene Person pro Jahr zu sparen.",
      
      values_title: "Unsere 4 Grundwerte",
      benevolence: "Fürsorge & Empathie",
      benevolence_desc: "Familien und reale Bedürfnisse stehen im Mittelpunkt.",
      transparency: "Volle Transparenz",
      transparency_desc: "Keine versteckten Gebühren: KVG-Prämien sind gesetzlich identisch.",
      reliability: "Schweizer Präzision & revDSG",
      reliability_desc: "Sicheres Hosting und strikte Einhaltung des neuen Datenschutzgesetzes.",
      local: "Lokale Präsenz in der Schweiz",
      local_desc: "Ein engagiertes Schweizer Team für verlässliche Beratung.",
      
      legal_entity_title: "Herausgeberangaben & Rechtliche Hinweise",
      company_name: "Firmenname: SAITHAMA Sàrl",
      company_address: "Sitz: Chemin des Dailles 8, 1033 Cheseaux-sur-Lausanne, Schweiz (Waadt)",
      company_uid: "Unternehmens-Identifikationsnummer (UID): CHE-272.095.360",
      company_finma: "Regulierung: Informationspflichten gemäss Art. 45 VAG (Versicherungsaufsichtsgesetz).",
      company_contact: "Kontakt: contact@lefennecmalin.ch",
      
      free_title: "Kostenloser Service: Wie finanzieren wir uns?",
      free_desc: "Die Nutzung unserer Online-Rechner ist für Sie 100% kostenlos und unverbindlich. Zur Finanzierung erhalten wir bei erfolgreicher Vermittlung einer Offerte eine marktübliche Aufwandsentschädigung von Partnern.",
      crucial_point: "Wichtige Bundesregel: Die Grundversicherungsprämien (KVG) sind staatlich reguliert und über uns EXAKT IDENTISCH wie direkt bei der Kasse.",
      
      cta_compare: "Kostenlosen Vergleich starten",
      cta_lsa: "Art. 45 VAG Informationsblatt",
      cta_finma: "Vermittlerqualifikationen"
    },
    en: {
      who_am_i: "About Us & Our Mission",
      greeting: "Le Fennec Malin — 100% Independent Swiss Insurance Comparison",
      tagline: '"Smart for you. Close to you."',
      intro: "Le Fennec Malin (lefennecmalin.ch) is a Swiss digital platform dedicated to transparency, unbiased analytics, and optimization across health insurance (LAMal/LCA), pillar 3a/3b retirement planning, and general insurance in Switzerland.",
      mascot_intro: "Led by our mascot Fenny, the big-eared fennec attentive to Swiss families, our mission is to demystify the Swiss insurance ecosystem and help households save money without compromising on coverage quality.",
      
      authority_title: "Our Expertise & Swiss Actuarial Standards",
      authority_desc: "Our comparison engines are built on strict mathematical modeling and official Swiss government datasets.",
      auth_1_title: "Official FOPH 2026 Dataset",
      auth_1_desc: "We integrate over 250,000 official tariffs published by the Federal Office of Public Health (FOPH / priminfo.admin.ch) for all 26 Swiss cantons.",
      auth_2_title: "100% Independence & Neutrality",
      auth_2_desc: "No insurance carrier holds equity in our publishing company SAITHAMA Sàrl. Results are ordered strictly by price and policy value.",
      auth_3_title: "FINMA & Art. 45 ISA Regulatory Compliance",
      auth_3_desc: "Our certified advisors strictly adhere to the Insurance Oversight Act (ISA / LSA) and are registered under Swiss FINMA / VB guidelines.",
      
      why_fennec: "Why the Fennec Mascot?",
      why_fennec_desc: "The desert fennec embodies three core traits of a premier Swiss insurance comparison engine:",
      ear_title: "Attentive listening:",
      ear_desc: "We listen closely to your family, healthcare, and budget priorities before suggesting deductibles or models.",
      lightbulb_title: "Sharp analytical precision:",
      lightbulb_desc: "We cut through the noise of alternative care models (Telmed, HMO) and 3a tax calculations.",
      mountain_title: "Protection against premium hikes:",
      mountain_desc: "We empower you with actionable strategies to save up to CHF 1,500+ per adult per year.",
      
      values_title: "Our 4 Core Values",
      benevolence: "Care & Empathy",
      benevolence_desc: "Family financial well-being is at the center of everything we do.",
      transparency: "Total Transparency",
      transparency_desc: "Zero hidden broker fees: basic LAMal health rates are legally identical.",
      reliability: "Swiss Precision & FADP Compliance",
      reliability_desc: "Strict adherence to the revised Swiss Federal Act on Data Protection.",
      local: "Swiss Local Presence",
      local_desc: "A dedicated team based in French-speaking Switzerland to assist you.",
      
      legal_entity_title: "Corporate Identification & Legal Disclosures",
      company_name: "Corporate name: SAITHAMA Sàrl",
      company_address: "Registered office: Chemin des Dailles 8, 1033 Cheseaux-sur-Lausanne, Switzerland (Vaud)",
      company_uid: "Enterprise Identification Number (UID/IDE): CHE-272.095.360",
      company_finma: "Regulation: Disclosures under Article 45 ISA (Insurance Supervision Act).",
      company_contact: "Contact: contact@lefennecmalin.ch",
      
      free_title: "100% Free Service: How does our model work?",
      free_desc: "Using our comparison calculators is 100% free with no obligation. We finance our platform operations via standard referral fees paid by accredited partner insurers when you request a custom quote.",
      crucial_point: "Federal Law Mandate: Basic health insurance (LAMal) rates are set by the FOPH and are STRICTLY EQUAL whether you switch through us or directly with the fund.",
      
      cta_compare: "Start Free Comparison",
      cta_lsa: "View Art. 45 ISA Disclosure",
      cta_finma: "Intermediary Qualifications"
    },
    it: {
      who_am_i: "Chi siamo & La nostra missione",
      greeting: "Le Fennec Malin — Comparatore Svizzero 100% Indipendente",
      tagline: '"Intelligente per te. Vicino a te."',
      intro: "Le Fennec Malin (lefennecmalin.ch) è una piattaforma digitale svizzera dedicata alla trasparenza e al confronto imparziale di casse malati (LAMal/LCA), previdenza (3° pilastro) e assicurazioni in Svizzera.",
      mascot_intro: "Guidati da Fenny, il fennec dalle grandi orecchie, la nostra missione è semplificare il sistema assicurativo svizzero e far risparmiare le famiglie senza compromettere la qualità delle coperture.",
      
      authority_title: "Esperienza & Standard Attuariali Svizzeri",
      authority_desc: "I nostri calcoli si basano su formule precise e sui dati ufficiali della Confederazione svizzera.",
      auth_1_title: "Dati Ufficiali UFSP 2026",
      auth_1_desc: "Oltre 250'000 tariffe ufficiali pubblicate dall'Ufficio Federale della Sanità Pubblica (UFSP / priminfo.admin.ch) per tutti i 26 cantoni.",
      auth_2_title: "Indipendenza e Neutralità 100%",
      auth_2_desc: "Nessuna compagnia assicurativa partecipa al capitale della nostra società SAITHAMA Sàrl.",
      auth_3_title: "Conformità FINMA & Art. 45 LSA",
      auth_3_desc: "I nostri consulenti operano secondo le prescrizioni della Legge sulla sorveglianza degli assicuratori (LSA) e del registro FINMA.",
      
      why_fennec: "Perché il fennec come simbolo?",
      why_fennec_desc: "Il fennec rappresenta le qualità cardine di un eccellente comparatore assicurativo:",
      ear_title: "Ascolto attento:",
      ear_desc: "Ascoltiamo attentamente le tue priorità di budget prima di consigliare modelli o franchigie.",
      lightbulb_title: "Analisi accurata:",
      lightbulb_desc: "Analizziamo modelli alternativi (Telmed, HMO) e vantaggi fiscali del 3° pilastro.",
      mountain_title: "Difesa dagli aumenti dei premi:",
      mountain_desc: "Ti aiutiamo a risparmiare fino a CHF 1'500.- all'anno per persona adulta.",
      
      values_title: "I Nostri 4 Valori Fondamentali",
      benevolence: "Premura ed Empatia",
      benevolence_desc: "Al centro mettiamo la tutela delle famiglie e delle persone.",
      transparency: "Trasparenza Totale",
      transparency_desc: "Nessun costo nascosto: i premi LAMal sono identici per legge.",
      reliability: "Precisione Svizzera & nLPD",
      reliability_desc: "Conformità rigorosa alla nuova legge federale sulla protezione dei dati.",
      local: "Presenza Locale in Svizzera",
      local_desc: "Un team affidabile basato in Svizzera al tuo servizio.",
      
      legal_entity_title: "Dati dell'Editore & Note Regolamentari",
      company_name: "Ragione sociale: SAITHAMA Sàrl",
      company_address: "Sede: Chemin des Dailles 8, 1033 Cheseaux-sur-Lausanne, Svizzera (Vaud)",
      company_uid: "Numero di identificazione delle imprese (IDE): CHE-272.095.360",
      company_finma: "Regolamentazione: Obblighi informativi secondo l'Art. 45 LSA (Sorveglianza degli assicuratori).",
      company_contact: "Contatto: contact@lefennecmalin.ch",
      
      free_title: "Servizio 100% Gratuito: Come ci finanziamo?",
      free_desc: "I nostri calcolatori online sono gratuiti e senza impegno. Riceviamo compensi standard di segnalazione dai partner assicurativi unicamente su tua richiesta di preventivo.",
      crucial_point: "Regola di legge: Le tariffe LAMal sono stabilite dall'UFSP e sono IDENTICHE tramite noi o direttamente con la cassa malati.",
      
      cta_compare: "Avvia un confronto gratuito",
      cta_lsa: "Scheda Art. 45 LSA",
      cta_finma: "Qualifiche intermediari"
    },
    es: {
      who_am_i: "Sobre Nosotros & Nuestra Misión",
      greeting: "Le Fennec Malin — Comparador Suizo 100% Independiente",
      tagline: '"Inteligente para ti. Cerca de ti."',
      intro: "Le Fennec Malin (lefennecmalin.ch) es una plataforma digital suiza dedicada a la transparencia y la optimización de seguros de salud (LAMal/LCA), 3er pilar y seguros generales en Suiza.",
      mascot_intro: "Junto a nuestra mascota Fenny, el fennec con grandes orejas atento a las familias, nuestra misión es simplificar el sistema de seguros suizo y proteger el poder adquisitivo de los asegurados.",
      
      authority_title: "Nuestra Experiencia & Rigor Actuarial Suizo",
      authority_desc: "Nuestros comparadores se fundamentan en modelos matemáticos rigurosos y datos oficiales de la Confederación Suiza.",
      auth_1_title: "Datos Oficiales OFSP 2026",
      auth_1_desc: "Más de 250'000 tarifas oficiales de la Oficina Federal de Salud Pública (OFSP / priminfo.admin.ch) en los 26 cantones.",
      auth_2_title: "Independencia 100%",
      auth_2_desc: "Ninguna aseguradora tiene participación en nuestra empresa editora SAITHAMA Sàrl.",
      auth_3_title: "Conformidad FINMA & Art. 45 LSA",
      auth_3_desc: "Nuestros asesores cumplen estrictamente la Ley de Supervisión de Seguros (LSA) y normas de la FINMA.",
      
      why_fennec: "¿Por qué el fennec como emblema?",
      why_fennec_desc: "El fennec reúne las tres cualidades clave de un excelente comparador de seguros:",
      ear_title: "Escucha activa:",
      ear_desc: "Analizamos tus prioridades de salud y presupuesto antes de recomendar opciones.",
      lightbulb_title: "Agilidad analítica:",
      lightbulb_desc: "Identificamos las ventajas de los modelos Telmed, HMO y del ahorro en el 3er pilar.",
      mountain_title: "Resistencia a las subidas de primas:",
      mountain_desc: "Te ayudamos a ahorrar más de CHF 1'500.- al año por adulto frente al aumento de costes.",
      
      values_title: "Nuestros 4 Valores Fundamentales",
      benevolence: "Atención y Empatía",
      benevolence_desc: "Ponemos a las personas y familias en el centro de nuestras prioridades.",
      transparency: "Transparencia Total",
      transparency_desc: "Sin comisiones ocultas: las primas LAMal son idénticas por ley federal.",
      reliability: "Fiabilidad Suiza & nLPD",
      reliability_desc: "Protección rigurosa de datos según la nueva ley federal de protección de datos.",
      local: "Presencia Local en Suiza",
      local_desc: "Un equipo disponible en Suiza para acompañarte en tus decisiones.",
      
      legal_entity_title: "Información del Editor & Datos Legales",
      company_name: "Razón social: SAITHAMA Sàrl",
      company_address: "Sede: Chemin des Dailles 8, 1033 Cheseaux-sur-Lausanne, Suiza (Vaud)",
      company_uid: "Número de identificación de empresas (IDE): CHE-272.095.360",
      company_finma: "Regulación: Deberes de información según el Art. 45 LSA (Supervisión de seguros).",
      company_contact: "Contacto: contact@lefennecmalin.ch",
      
      free_title: "Servicio 100% Gratuito: ¿Cómo funciona?",
      free_desc: "Nuestros comparadores son 100% gratuitos y sin compromiso. Nos financiamos mediante comisiones estándar abonadas por las aseguradoras asociadas cuando solicitas una oferta personalizada.",
      crucial_point: "Principio legal básico: Las primas del seguro de base (LAMal) son fijadas por la OFSP y son EXACTAMENTE IGUALES a través de nosotros que con la aseguradora directa.",
      
      cta_compare: "Iniciar comparativa gratuita",
      cta_lsa: "Ficha Art. 45 LSA",
      cta_finma: "Cualificaciones de intermediarios"
    },
    pt: {
      who_am_i: "Sobre Nós & Nossa Missão",
      greeting: "Le Fennec Malin — Comparador Suíço 100% Independente",
      tagline: '"Inteligente para si. Perto de si."',
      intro: "Le Fennec Malin (lefennecmalin.ch) é uma plataforma digital suíça dedicada à transparência e otimização de seguros de saúde (LAMal/LCA), 3º pilar e seguros em geral na Suíça.",
      mascot_intro: "Com a nossa mascote Fenny, a raposa do deserto atenta às famílias suíças, a nossa missão é simplificar o sistema de seguros e devolver poder de compra aos segurados.",
      
      authority_title: "Nossa Especialização & Rigor Atuarial Suíço",
      authority_desc: "Os nossos comparadores assentam em modelos matemáticos e dados oficiais da Confederação Suíça.",
      auth_1_title: "Dados Oficiais OFSP 2026",
      auth_1_desc: "Mais de 250'000 tarifas oficiais publicadas pelo Departamento Federal de Saúde Pública (OFSP / priminfo.admin.ch) para os 26 cantões.",
      auth_2_title: "Independência 100%",
      auth_2_desc: "Nenhuma seguradora tem participação no capital da nossa empresa SAITHAMA Sàrl.",
      auth_3_title: "Conformidade FINMA & Art. 45 LSA",
      auth_3_desc: "Os nossos parceiros cumprem rigorosamente a Lei de Supervisão de Seguros (LSA) e os requisitos da FINMA.",
      
      why_fennec: "Porque escolhemos o Fennec?",
      why_fennec_desc: "O fennec sintetiza três qualidades essenciais de um comparador de excelência:",
      ear_title: "Audição atenta:",
      ear_desc: "Ouvimos as suas prioridades de saúde e orçamento antes de recomendar qualquer franquia ou modelo.",
      lightbulb_title: "Espírito analítico:",
      lightbulb_desc: "Identificamos as melhores opções Telmed, HMO e vantagens fiscais do 3º pilar.",
      mountain_title: "Defesa contra subidas de prémios:",
      mountain_desc: "Ajudamos a poupar mais de CHF 1'500.- por ano por adulto perante o aumento dos custos de saúde.",
      
      values_title: "Os Nossos 4 Valores Cardeais",
      benevolence: "Cuidado e Empatia",
      benevolence_desc: "Colocamos as famílias e o orçamento das pessoas no centro de tudo.",
      transparency: "Transparência Total",
      transparency_desc: "Sem custos ocultos: os prémios LAMal são estritamente iguais por lei federal.",
      reliability: "Rigor Suíço & nLPD",
      reliability_desc: "Alojamento seguro e conformidade estrita com a nova lei suíça de proteção de dados.",
      local: "Presença Local na Suíça",
      local_desc: "Uma equipa disponível na Suíça para responder a todas as suas dúvidas.",
      
      legal_entity_title: "Informações do Editor & Enquadramento Legal",
      company_name: "Firma: SAITHAMA Sàrl",
      company_address: "Sede: Chemin des Dailles 8, 1033 Cheseaux-sur-Lausanne, Suíça (Vaud)",
      company_uid: "Número de identificação de empresas (IDE): CHE-272.095.360",
      company_finma: "Regulamentação: Obrigações de informação do Art. 45 LSA (Supervisão de seguros).",
      company_contact: "Contacto: contact@lefennecmalin.ch",
      
      free_title: "Serviço 100% Gratuito: Como nos financiamos?",
      free_desc: "Os nossos simuladores online são 100% gratuitos e sem compromisso. Financiamos a plataforma através de remunerações padrão das seguradoras parceiras quando solicita uma cotação personalizada.",
      crucial_point: "Mandato legal: As tarifas do seguro básico (LAMal) são fixadas pela OFSP e são ESTRITAMENTE IDÊNTICAS connosco ou diretamente com a seguradora.",
      
      cta_compare: "Iniciar simulação gratuita",
      cta_lsa: "Consultar ficha Art. 45 LSA",
      cta_finma: "Qualificações de intermediários"
    }
  }[language] || {
    who_am_i: "À Propos & Notre Mission",
    greeting: "Le Fennec Malin — Comparateur d'Assurance 100% Indépendant en Suisse",
    tagline: '"Malin, pour vous. Proche de vous."',
    intro: "Plateforme indépendante de comparaison d'assurances en Suisse.",
    mascot_intro: "Notre mission est de simplifier les démarches d'assurance et d'optimiser le budget des ménages suisses.",
    authority_title: "Notre Expertise & Données Officielles",
    authority_desc: "Calculs basés sur les données officielles de la Confédération suisse.",
    auth_1_title: "Données OFSP 2026", auth_1_desc: "250'000+ tarifs officiels intégrés.",
    auth_2_title: "Indépendance 100%", auth_2_desc: "Aucune participation de compagnies d'assurance.",
    auth_3_title: "Conformité FINMA", auth_3_desc: "Conseillers conformes à l'Art. 45 LSA.",
    why_fennec: "Pourquoi le Fennec ?", why_fennec_desc: "Symbole d'écoute et d'agilité.",
    ear_title: "Écoute", ear_desc: "Analyse personnalisée de vos besoins.",
    lightbulb_title: "Agilité", lightbulb_desc: "Démystification des contrats d'assurance.",
    mountain_title: "Résistance", mountain_desc: "Solutions d'économies durables.",
    values_title: "Nos Valeurs",
    benevolence: "Bienveillance", benevolence_desc: "Priorité à l'humain.",
    transparency: "Transparence", transparency_desc: "Aucun frais masqué.",
    reliability: "Rigueur", reliability_desc: "Conformité nLPD.",
    local: "Proximité", local_desc: "Équipe basée en Suisse.",
    legal_entity_title: "Informations sur l'Éditeur",
    company_name: "SAITHAMA Sàrl", company_address: "1033 Cheseaux-sur-Lausanne",
    company_uid: "CHE-272.095.360", company_finma: "Art. 45 LSA", company_contact: "contact@lefennecmalin.ch",
    free_title: "Modèle gratuit", free_desc: "Service sans frais pour l'utilisateur.",
    crucial_point: "Tarifs LAMal strictement identiques.",
    cta_compare: "Comparer les primes", cta_lsa: "Art. 45 LSA", cta_finma: "Intermédiaires FINMA"
  };

  return (
    <div id="about-us-authority-page" className="w-full space-y-12 max-w-5xl mx-auto">
      
      {/* Hero Header with Brand Authority */}
      <div className="bg-white border border-fennec-cream rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full border-4 border-fennec-cream/60 shadow-md overflow-hidden shrink-0 bg-[#FAF7F3]">
          <img 
            src={fenyThinking} 
            alt="Fenny Le Fennec Malin" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/fennec-thinking.jpg';
            }}
          />
        </div>
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-fennec-terracotta/10 text-fennec-terracotta font-display text-xs font-bold rounded-full uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>{c.who_am_i}</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-fennec-dark leading-tight">
            {c.greeting}
          </h1>
          <p className="text-base font-semibold text-fennec-terracotta italic">
            {c.tagline}
          </p>
          <p className="text-sm sm:text-base text-fennec-dark/85 leading-relaxed text-justify">
            {c.intro}
          </p>
          <p className="text-sm text-fennec-dark/80 leading-relaxed text-justify">
            {c.mascot_intro}
          </p>
        </div>
      </div>

      {/* Authority, Actuarial & Regulatory Pillars */}
      <div className="bg-[#FAF7F3] border border-fennec-cream rounded-3xl p-6 sm:p-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center justify-center p-2.5 bg-emerald-100/80 text-emerald-800 rounded-2xl mb-1">
            <Scale className="w-6 h-6" />
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-fennec-dark">
            {c.authority_title}
          </h2>
          <p className="text-sm text-fennec-brown">
            {c.authority_desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-fennec-cream/70 shadow-xs space-y-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl w-fit">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-fennec-dark">
              {c.auth_1_title}
            </h3>
            <p className="text-xs text-fennec-dark/75 leading-relaxed text-justify">
              {c.auth_1_desc}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-fennec-cream/70 shadow-xs space-y-3">
            <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl w-fit">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-fennec-dark">
              {c.auth_2_title}
            </h3>
            <p className="text-xs text-fennec-dark/75 leading-relaxed text-justify">
              {c.auth_2_desc}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-fennec-cream/70 shadow-xs space-y-3">
            <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl w-fit">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-fennec-dark">
              {c.auth_3_title}
            </h3>
            <p className="text-xs text-fennec-dark/75 leading-relaxed text-justify">
              {c.auth_3_desc}
            </p>
          </div>
        </div>
      </div>

      {/* Why Fenny Narrative + Values */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Why the Mascot Story */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-fennec-cream space-y-6">
          <h3 className="font-display font-extrabold text-2xl text-fennec-dark">
            {c.why_fennec}
          </h3>
          <p className="text-sm text-fennec-dark/85 leading-relaxed text-justify">
            {c.why_fennec_desc}
          </p>
          
          <ul className="space-y-4 text-sm text-fennec-dark/85">
            <li className="flex items-start bg-[#FAF7F3] p-4 rounded-2xl border border-fennec-cream/50">
              <div className="p-2 bg-fennec-terracotta/10 rounded-xl text-fennec-terracotta mr-3 shrink-0">
                <Ear className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-fennec-dark font-display block mb-0.5">{c.ear_title}</strong>
                <span className="text-xs text-fennec-dark/80">{c.ear_desc}</span>
              </div>
            </li>
            <li className="flex items-start bg-[#FAF7F3] p-4 rounded-2xl border border-fennec-cream/50">
              <div className="p-2 bg-fennec-terracotta/10 rounded-xl text-fennec-terracotta mr-3 shrink-0">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-fennec-dark font-display block mb-0.5">{c.lightbulb_title}</strong>
                <span className="text-xs text-fennec-dark/80">{c.lightbulb_desc}</span>
              </div>
            </li>
            <li className="flex items-start bg-[#FAF7F3] p-4 rounded-2xl border border-fennec-cream/50">
              <div className="p-2 bg-fennec-terracotta/10 rounded-xl text-fennec-terracotta mr-3 shrink-0">
                <Mountain className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-fennec-dark font-display block mb-0.5">{c.mountain_title}</strong>
                <span className="text-xs text-fennec-dark/80">{c.mountain_desc}</span>
              </div>
            </li>
          </ul>
        </div>

        {/* 4 Cardinal Values */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-fennec-cream shadow-xs space-y-5">
          <h4 className="font-display font-extrabold text-xl text-fennec-dark border-b border-fennec-cream/50 pb-3">
            {c.values_title}
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-rose-50/50 rounded-xl border border-rose-100">
              <div className="p-2 bg-rose-100 text-fennec-red rounded-lg shrink-0">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-display font-bold text-sm text-fennec-dark">{c.benevolence}</h5>
                <p className="text-xs text-fennec-dark/70 mt-0.5">{c.benevolence_desc}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-amber-50/50 rounded-xl border border-amber-100">
              <div className="p-2 bg-amber-100 text-amber-700 rounded-lg shrink-0">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-display font-bold text-sm text-fennec-dark">{c.transparency}</h5>
                <p className="text-xs text-fennec-dark/70 mt-0.5">{c.transparency_desc}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-display font-bold text-sm text-fennec-dark">{c.reliability}</h5>
                <p className="text-xs text-fennec-dark/70 mt-0.5">{c.reliability_desc}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-lg shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-display font-bold text-sm text-fennec-dark">{c.local}</h5>
                <p className="text-xs text-fennec-dark/70 mt-0.5">{c.local_desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corporate Identification & Official FINMA Disclosures Box */}
      <div className="bg-white border-2 border-fennec-cream rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-fennec-cream/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#FAF7F3] text-fennec-dark rounded-xl border border-fennec-cream">
              <Scale className="w-6 h-6 text-fennec-terracotta" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-lg text-fennec-dark">
                {c.legal_entity_title}
              </h3>
              <p className="text-xs text-fennec-brown">
                {c.company_finma}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {onTabChange && (
              <>
                <button
                  onClick={() => onTabChange('article-45-lsa')}
                  className="px-3 py-1.5 bg-[#FAF7F3] hover:bg-fennec-cream/40 text-fennec-dark rounded-lg font-bold border border-fennec-cream transition-colors cursor-pointer"
                >
                  {c.cta_lsa}
                </button>
                <button
                  onClick={() => onTabChange('qualifications-intermediaire')}
                  className="px-3 py-1.5 bg-[#FAF7F3] hover:bg-fennec-cream/40 text-fennec-dark rounded-lg font-bold border border-fennec-cream transition-colors cursor-pointer"
                >
                  {c.cta_finma}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono text-fennec-dark/90 bg-[#FAF7F3] p-4 sm:p-6 rounded-2xl">
          <div>
            <span className="font-bold text-fennec-terracotta block mb-0.5">Société Éditrice</span>
            <span>SAITHAMA Sàrl</span>
          </div>
          <div>
            <span className="font-bold text-fennec-terracotta block mb-0.5">Registre & Identifiant</span>
            <span>CHE-272.095.360 (Vaud)</span>
          </div>
          <div>
            <span className="font-bold text-fennec-terracotta block mb-0.5">Siège Social</span>
            <span>1033 Cheseaux-sur-Lausanne, VD</span>
          </div>
        </div>
      </div>

      {/* Free Comparison Model & Guarantee */}
      <div className="relative rounded-3xl overflow-hidden bg-fennec-dark text-white p-8 md:p-12 shadow-md">
        <div className="relative z-10 max-w-3xl space-y-5">
          <h4 className="font-display font-black text-2xl md:text-3xl text-white">
            {c.free_title}
          </h4>
          <p className="text-sm md:text-base text-fennec-cream/90 leading-relaxed text-justify">
            {c.free_desc}
          </p>
          <div className="p-4 bg-white/10 rounded-2xl border border-white/15 text-sm text-fennec-sand font-medium flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-fennec-sand shrink-0 mt-0.5" />
            <span className="leading-snug">{c.crucial_point}</span>
          </div>

          {onStartComparison && (
            <div className="pt-2">
              <button
                onClick={onStartComparison}
                className="px-6 py-3.5 bg-fennec-terracotta hover:bg-fennec-terracotta/90 text-white font-display font-bold text-sm rounded-xl shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>{c.cta_compare}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
