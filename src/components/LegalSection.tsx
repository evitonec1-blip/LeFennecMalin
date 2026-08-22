/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldAlert, Key, Building2, Server, FileText, Lock, Mail, MapPin, Scale } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface LegalSectionProps {
  mode: 'legal' | 'privacy';
}

export default function LegalSection({ mode }: LegalSectionProps) {
  const { language } = useLanguage();

  const c = {
    fr: {
      legal_title: "Mentions Légales & Impressum",
      legal_subtitle: "Conformité suisse, informations sur l'éditeur et politique de responsabilité",
      s1_title: "1. Éditeur du site & Raison sociale",
      s1_company: "SAITHAMA Sàrl",
      s1_address: "Chemin des Dailles 8, 1033 Cheseaux-sur-Lausanne, Suisse (Canton de Vaud)",
      s1_uid: "IDE / UID : CHE-272.095.360",
      s1_registry: "Registre du commerce : Canton de Vaud",
      s1_email: "contact@lefennecmalin.ch",
      s1_desc: "Le site internet lefennecmalin.ch est édité et exploité par la société suisse SAITHAMA Sàrl, immatriculée au registre du commerce du Canton de Vaud.",
      s2_title: "2. Hébergement & Sécurité de l'infrastructure",
      s2_host: "Google Cloud Platform (Google LLC)",
      s2_host_loc: "Datacenters situés au sein de l'Union Européenne (certifications ISO/IEC 27001, SOC 2/3)",
      s2_desc: "L'hébergement de la plateforme est assuré sur des infrastructures cloud hautement sécurisées, répondant strictement aux exigences de la Loi fédérale sur la protection des données (nLPD) et du RGPD.",
      s3_title: "3. Propriété intellectuelle & Droits d'auteur",
      s3_desc: "La marque Le Fennec Malin, la mascotte 'Fenny', l'ensemble des éléments graphiques, textuels, algorithmes de comparaison et logos sont la propriété exclusive de SAITHAMA Sàrl. Toute reproduction, même partielle, est interdite sans accord écrit préalable.",
      s4_title: "4. Limitation de responsabilité & Données OFSP",
      s4_desc: "Les calculs et simulations de primes d'assurance maladie obligatoire (LAMal) sont basés sur les barèmes officiels approuvés par l'Office Fédéral de la Santé Publique (OFSP) et fournis par priminfo.admin.ch pour 2026. Malgré tout le soin apporté à la précision des données, Le Fennec Malin ne saurait être tenu responsable d'éventuelles inexactitudes des barèmes officiels.",
      s5_title: "5. Indépendance, neutralité & Modèle économique",
      s5_desc: "Le Fennec Malin est un comparateur 100% indépendant. Nous ne détenons aucune participation dans des compagnies d'assurance et aucune compagnie ne détient de participation dans notre capital. Conformément à la LAMal, le montant de votre prime de base est strictement identique par notre intermédiaire qu'en direct auprès de l'assureur.",
      
      privacy_title: "Politique de Confidentialité & Protection des Données",
      privacy_subtitle: "Protection stricte de votre sphère privée selon la nouvelle loi suisse (nLPD) et le RGPD",
      p1_title: "1. Notre engagement de confidentialité",
      p1_desc: "La protection de votre sphère privée est au cœur de nos priorités. Le traitement de vos données personnelles sur lefennecmalin.ch s'effectue en stricte conformité avec la Loi fédérale suisse sur la protection des données révisée (nLPD, entrée en vigueur le 1er septembre 2023) ainsi qu'avec le Règlement Général sur la Protection des Données (RGPD) pour les utilisateurs transfrontaliers.",
      p2_title: "2. Données collectées & Finalités du traitement",
      p2_desc: "Dans le cadre de l'utilisation de nos comparateurs d'assurances et simulateurs (LAMal, 3ème pilier, assurances de choses), nous collectons uniquement les informations indispensables pour calculer votre prime exacte : canton et code postal (NPA), tranche d'âge, modèle d'assurance choisi, franchise souhaitée, et le cas échéant vos coordonnées pour l'envoi personnalisé d'un comparatif ou d'une offre.",
      p3_title: "3. Sécurité, non-revente & Transmission des données",
      p3_desc: "Vos données personnelles ne sont JAMAIS vendues, louées ou cédées à des tiers à des fins de prospection publicitaire. Vos données ne sont transmises à des partenaires assureurs ou intermédiaires qualifiés que sur votre demande expresse lors de la validation d'une demande de devis.",
      p4_title: "4. Vos droits d'accès, de rectification et d'effacement",
      p4_desc: "Conformément à la nLPD, vous disposez d'un droit permanent d'accès, de rectification, de portabilité et de suppression intégrale de vos données personnelles. Vous pouvez exercer ce droit à tout moment par simple email à contact@lefennecmalin.ch.",
      p5_title: "5. Cookies techniques & Respect de votre vie privée",
      p5_desc: "Nous utilisons exclusivement des cookies techniques légers indispensables au bon fonctionnement de la navigation (mémorisation de votre canton et de vos filtres de simulation) ainsi que des outils de mesure d'audience anonymisés ne traçant pas votre identité."
    },
    de: {
      legal_title: "Impressum & Rechtliche Hinweise",
      legal_subtitle: "Schweizer Konformität, Herausgeber-Angaben und Haftungsausschluss",
      s1_title: "1. Website-Betreiber & Firmenangaben",
      s1_company: "SAITHAMA Sàrl",
      s1_address: "Chemin des Dailles 8, 1033 Cheseaux-sur-Lausanne, Schweiz (Kanton Waadt)",
      s1_uid: "UID / IDE : CHE-272.095.360",
      s1_registry: "Handelsregister : Kanton Waadt",
      s1_email: "contact@lefennecmalin.ch",
      s1_desc: "Die Website lefennecmalin.ch wird von der Schweizer Gesellschaft SAITHAMA Sàrl betrieben, eingetragen im Handelsregister des Kantons Waadt.",
      s2_title: "2. Hosting & Infrastruktur-Sicherheit",
      s2_host: "Google Cloud Platform (Google LLC)",
      s2_host_loc: "Rechenzentren in der Europäischen Union (ISO/IEC 27001, SOC 2/3 zertifiziert)",
      s2_desc: "Das Hosting der Plattform erfolgt auf hochsicheren Cloud-Servern unter vollständiger Einhaltung des revidierten Schweizer Datenschutzgesetzes (revDSG) und der DSGVO.",
      s3_title: "3. Geistiges Eigentum & Urheberrecht",
      s3_desc: "Die Marke Le Fennec Malin, das Maskottchen 'Fenny', sämtliche Grafiken, Texte, Algorithmen und Logos sind ausschließliches Eigentum der SAITHAMA Sàrl.",
      s4_title: "4. Haftungsausschluss & BAG-Daten",
      s4_desc: "Die Prämienberechnungen für die obligatorische Krankenpflegeversicherung (KVG) basieren auf den offiziellen Tarifen des Bundesamts für Gesundheit (BAG / priminfo.admin.ch) für 2026.",
      s5_title: "5. Unabhängigkeit & Neutralität",
      s5_desc: "Le Fennec Malin ist ein 100% unabhängiger Vergleichsdienst. Es bestehen keinerlei Kapitalbeteiligungen von oder an Versicherungsgesellschaften. Gesetzlich geregelt: Ihre KVG-Grundversicherungsprämie ist über unseren Vergleich exakt gleich hoch wie direkt bei der Kasse.",
      
      privacy_title: "Datenschutzerklärung (revDSG)",
      privacy_subtitle: "Strikter Schutz Ihrer Privatsphäre nach dem neuen Schweizer Datenschutzgesetz",
      p1_title: "1. Unser Datenschutzversprechen",
      p1_desc: "Der Schutz Ihrer Privatsphäre steht für uns an erster Stelle. Die Bearbeitung von Personendaten erfolgt in strikter Übereinstimmung mit dem revidierten Schweizer Datenschutzgesetz (revDSG) sowie der DSGVO.",
      p2_title: "2. Erhobene Daten & Zweck der Bearbeitung",
      p2_desc: "Wir erheben ausschliesslich Daten, die für die Durchführung des Versicherungsvergleichs zwingend erforderlich sind: Wohnort/PLZ, Altersklasse, Versicherungsmodell, Franchise und Kontaktdaten zur Offertenerstellung.",
      p3_title: "3. Datensicherheit & Kein Verkauf von Daten",
      p3_desc: "Ihre Daten werden niemals an Dritte zu Werbezwecken verkauft oder vermietet. Eine Weiterleitung an Partnerversicherer erfolgt ausschliesslich bei Ihrer ausdrücklichen Anfrage.",
      p4_title: "4. Ihre Rechte (Auskunft, Berichtigung, Löschung)",
      p4_desc: "Sie haben gemäss revDSG jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten Daten sowie das Recht auf Berichtigung oder vollständige Löschung via contact@lefennecmalin.ch.",
      p5_title: "5. Cookies & Technische Speicherung",
      p5_desc: "Wir verwenden ausschliesslich essenzielle technische Cookies zur Speicherung Ihrer Filtereinstellungen und anonymisierte Reichweitenmessung."
    },
    en: {
      legal_title: "Legal Notice & Impressum",
      legal_subtitle: "Swiss regulatory compliance, publisher information and liability terms",
      s1_title: "1. Publisher & Corporate Information",
      s1_company: "SAITHAMA Sàrl",
      s1_address: "Chemin des Dailles 8, 1033 Cheseaux-sur-Lausanne, Switzerland (Canton of Vaud)",
      s1_uid: "UID / IDE : CHE-272.095.360",
      s1_registry: "Commercial Registry : Canton of Vaud",
      s1_email: "contact@lefennecmalin.ch",
      s1_desc: "The website lefennecmalin.ch is owned, published and operated by the Swiss company SAITHAMA Sàrl, registered in the Commercial Registry of the Canton of Vaud.",
      s2_title: "2. Hosting & Infrastructure Security",
      s2_host: "Google Cloud Platform (Google LLC)",
      s2_host_loc: "Secure EU Datacenters (ISO/IEC 27001, SOC 2/3 certified)",
      s2_desc: "Hosted on highly secure, enterprise-grade cloud servers fully compliant with the Swiss Federal Act on Data Protection (FADP) and EU GDPR.",
      s3_title: "3. Intellectual Property & Copyright",
      s3_desc: "The Le Fennec Malin trademark, 'Fenny' mascot, visual designs, text, comparison models and proprietary algorithms are the exclusive property of SAITHAMA Sàrl.",
      s4_title: "4. Disclaimer & Official FOPH Data",
      s4_desc: "Mandatory Swiss health insurance (LAMal/KVG) simulations are computed from official Federal Office of Public Health (FOPH / priminfo.admin.ch) datasets for 2026.",
      s5_title: "5. Independence & Tariff Neutrality",
      s5_desc: "Le Fennec Malin operates with 100% independence with no equity links to any insurance provider. By Swiss federal law, basic health insurance premiums are strictly identical whether comparing through our platform or directly with insurance funds.",
      
      privacy_title: "Privacy Policy (Swiss FADP / GDPR)",
      privacy_subtitle: "Strict protection of personal data under the revised Swiss Federal Data Protection Act",
      p1_title: "1. Commitment to Privacy",
      p1_desc: "We treat your personal data with utmost confidentiality in full adherence to the revised Swiss Federal Act on Data Protection (FADP) and European GDPR.",
      p2_title: "2. Data Collection & Processing Purposes",
      p2_desc: "We solely collect information required to compute accurate insurance quotes: postal code/canton, age group, deductible, insurance model, and contact details upon quote request.",
      p3_title: "3. Security & Zero-Sale Guarantee",
      p3_desc: "We never sell or rent your personal data to third parties for marketing. Information is only shared with accredited partners when you explicitly request a personalized offer.",
      p4_title: "4. Access, Rectification & Erasure Rights",
      p4_desc: "Under Swiss FADP, you hold absolute rights to inspect, correct, export, or permanently delete your personal information at any time via contact@lefennecmalin.ch.",
      p5_title: "5. Technical Cookies",
      p5_desc: "We only deploy lightweight functional cookies required to remember your canton and calculation settings across sessions."
    },
    it: {
      legal_title: "Note Legali & Impressum",
      legal_subtitle: "Conformità svizzera, informazioni sull'editore e responsabilità",
      s1_title: "1. Editore del sito & Ragione sociale",
      s1_company: "SAITHAMA Sàrl",
      s1_address: "Chemin des Dailles 8, 1033 Cheseaux-sur-Lausanne, Svizzera (Cantone Vaud)",
      s1_uid: "IDE / UID : CHE-272.095.360",
      s1_registry: "Registro di commercio : Cantone Vaud",
      s1_email: "contact@lefennecmalin.ch",
      s1_desc: "Il sito web lefennecmalin.ch è gestito ed edito dalla società svizzera SAITHAMA Sàrl, iscritta al registro di commercio del Cantone Vaud.",
      s2_title: "2. Hosting & Sicurezza dell'infrastruttura",
      s2_host: "Google Cloud Platform (Google LLC)",
      s2_host_loc: "Data center sicuri nell'Unione Europea (certificazioni ISO/IEC 27001, SOC 2/3)",
      s2_desc: "L'hosting è effettuato su server cloud europei conformi alla nuova legge federale svizzera sulla protezione dei dati (nLPD) e al GDPR.",
      s3_title: "3. Proprietà intellettuale",
      s3_desc: "Il marchio Le Fennec Malin, la mascotte 'Fenny' e tutti i contenuti sono di proprietà esclusiva di SAITHAMA Sàrl.",
      s4_title: "4. Limitazione di responsabilità & Dati UFSP",
      s4_desc: "I calcoli delle simulazioni per l'assicurazione obbligatoria (LAMal) si basano sui dati ufficiali dell'Ufficio Federale della Sanità Pubblica (UFSP / priminfo.admin.ch) per il 2026.",
      s5_title: "5. Indipendenza e neutralità tariffaria",
      s5_desc: "Le Fennec Malin è un comparatore indipendente al 100%. Per legge federale, i premi LAMal sono identici sia tramite il nostro portale sia direttamente con la cassa malati.",
      
      privacy_title: "Informativa sulla Privacy (nLPD)",
      privacy_subtitle: "Protezione rigorosa dei dati personali secondo la legge federale svizzera",
      p1_title: "1. Impegno per la riservatezza",
      p1_desc: "Garantiamo la protezione dei tuoi dati in piena conformità con la nuova legge federale svizzera sulla protezione dei dati (nLPD) e il GDPR.",
      p2_title: "2. Dati raccolti e finalità",
      p2_desc: "Raccogliamo solo i parametri indispensabili per il calcolo del preventivo: NPA/cantone, età, modello e franchigia prescelti.",
      p3_title: "3. Nessuna vendita di dati",
      p3_desc: "I tuoi dati non vengono mai venduti né ceduti per scopi commerciali a terzi.",
      p4_title: "4. I tuoi diritti (Accesso, Rettifica, Cancellazione)",
      p4_desc: "Hai il diritto di richiedere l'accesso, la rettifica o la cancellazione immediata dei tuoi dati scrivendo a contact@lefennecmalin.ch.",
      p5_title: "5. Cookie tecnici",
      p5_desc: "Utilizziamo solo cookie tecnici indispensabili alla navigazione e memorizzazione delle tue preferenze di calcolo."
    },
    es: {
      legal_title: "Aviso Legal & Impressum",
      legal_subtitle: "Conformidad suiza, datos del editor y política de responsabilidad",
      s1_title: "1. Editor del sitio & Razón social",
      s1_company: "SAITHAMA Sàrl",
      s1_address: "Chemin des Dailles 8, 1033 Cheseaux-sur-Lausanne, Suiza (Cantón de Vaud)",
      s1_uid: "IDE / UID : CHE-272.095.360",
      s1_registry: "Registro mercantil : Cantón de Vaud",
      s1_email: "contact@lefennecmalin.ch",
      s1_desc: "El sitio web lefennecmalin.ch es editado y gestionado por la empresa suiza SAITHAMA Sàrl, inscrita en el registro mercantil del Cantón de Vaud.",
      s2_title: "2. Alojamiento & Seguridad",
      s2_host: "Google Cloud Platform (Google LLC)",
      s2_host_loc: "Servidores seguros en la Unión Europea (ISO/IEC 27001, SOC 2/3)",
      s2_desc: "Alojamiento en infraestructura en la nube de alta seguridad conforme a la ley suiza de protección de datos (nLPD) y al RGPD.",
      s3_title: "3. Propiedad intelectual",
      s3_desc: "La marca Le Fennec Malin, la mascota 'Fenny' y los contenidos son propiedad exclusiva de SAITHAMA Sàrl.",
      s4_title: "4. Limitación de responsabilidad & Datos OFSP",
      s4_desc: "Las simulaciones se basan en los datos oficiales de la Oficina Federal de Salud Pública de Suiza (OFSP / priminfo.admin.ch) para 2026.",
      s5_title: "5. Independencia y neutralidad",
      s5_desc: "Le Fennec Malin es 100% independiente. Por ley federal, las primas básicas LAMal tienen exactamente el mismo precio a través de nosotros que directamente con la aseguradora.",
      
      privacy_title: "Política de Privacidad (nLPD)",
      privacy_subtitle: "Protección de datos personales conforme a la nueva ley federal suiza",
      p1_title: "1. Compromiso de confidencialidad",
      p1_desc: "Tratamos tus datos con total confidencialidad según la nueva ley federal suiza de protección de datos (nLPD) y el RGPD.",
      p2_title: "2. Datos recopilados",
      p2_desc: "Solo solicitamos los datos necesarios para calcular el presupuesto exacto: código postal/cantón, edad, modelo y franquicia.",
      p3_title: "3. Prohibición de venta de datos",
      p3_desc: "Tus datos nunca se venden ni se ceden a terceros para fines comerciales sin tu consentimiento.",
      p4_title: "4. Derechos de acceso y cancelación",
      p4_desc: "Puedes ejercer tus derechos de acceso, rectificación y supresión de datos escribiendo a contact@lefennecmalin.ch.",
      p5_title: "5. Cookies técnicas",
      p5_desc: "Solo empleamos cookies técnicas necesarias para el funcionamiento del comparador."
    },
    pt: {
      legal_title: "Aviso Legal & Impressum",
      legal_subtitle: "Conformidade suíça, dados do editor e política de responsabilidade",
      s1_title: "1. Editor do site & Denominação social",
      s1_company: "SAITHAMA Sàrl",
      s1_address: "Chemin des Dailles 8, 1033 Cheseaux-sur-Lausanne, Suíça (Cantão de Vaud)",
      s1_uid: "IDE / UID : CHE-272.095.360",
      s1_registry: "Registo comercial : Cantão de Vaud",
      s1_email: "contact@lefennecmalin.ch",
      s1_desc: "O website lefennecmalin.ch é editado e explorado pela sociedade suíça SAITHAMA Sàrl, inscrita no registo comercial do Cantão de Vaud.",
      s2_title: "2. Alojamento & Segurança",
      s2_host: "Google Cloud Platform (Google LLC)",
      s2_host_loc: "Servidores seguros na União Europeia (ISO/IEC 27001, SOC 2/3)",
      s2_desc: "Alojamento em infraestrutura na nuvem altamente segura, em conformidade com a nova lei suíça de proteção de dados (nLPD) e o RGPD.",
      s3_title: "3. Propriedade intelectual",
      s3_desc: "A marca Le Fennec Malin, a mascote 'Fenny' e todos os conteúdos são propriedade exclusiva da SAITHAMA Sàrl.",
      s4_title: "4. Limitação de responsabilidade & Dados OFSP",
      s4_desc: "As simulações baseiam-se nos dados oficiais do Departamento Federal de Saúde Pública suíço (OFSP / priminfo.admin.ch) para 2026.",
      s5_title: "5. Independência e neutralidade",
      s5_desc: "Le Fennec Malin é 100% independente. Por lei federal, os prémios do seguro de base LAMal são rigorosamente idênticos através de nós ou diretamente com a seguradora.",
      
      privacy_title: "Política de Privacidade (nLPD)",
      privacy_subtitle: "Proteção rigorosa de dados pessoais segundo a nova lei federal suíça",
      p1_title: "1. Compromisso de confidencialidade",
      p1_desc: "Protegemos os seus dados em total conformidade com a nova lei federal suíça de proteção de dados (nLPD) e o RGPD.",
      p2_title: "2. Dados recolhidos",
      p2_desc: "Apenas recolhemos as informações indispensáveis para calcular a sua simulação exata: código postal/cantão, idade, modelo e franquia.",
      p3_title: "3. Não comercialização de dados",
      p3_desc: "Os seus dados nunca são vendidos nem cedidos a terceiros para fins comerciais sem o seu consentimento expresso.",
      p4_title: "4. Direitos de acesso e apagamento",
      p4_desc: "Pode exercer os seus direitos de acesso, retificação e eliminação de dados enviando um email para contact@lefennecmalin.ch.",
      p5_title: "5. Cookies técnicos",
      p5_desc: "Utilizamos unicamente cookies técnicos essenciais para manter as suas preferências de cálculo."
    }
  }[language] || {
    legal_title: "Mentions Légales & Impressum",
    legal_subtitle: "Conformité suisse, informations sur l'éditeur et politique de responsabilité",
    s1_title: "1. Éditeur du site & Raison sociale",
    s1_company: "SAITHAMA Sàrl",
    s1_address: "Chemin des Dailles 8, 1033 Cheseaux-sur-Lausanne, Suisse (Canton de Vaud)",
    s1_uid: "IDE / UID : CHE-272.095.360",
    s1_registry: "Registre du commerce : Canton de Vaud",
    s1_email: "contact@lefennecmalin.ch",
    s1_desc: "Le site internet lefennecmalin.ch est édité et exploité par la société suisse SAITHAMA Sàrl.",
    s2_title: "2. Hébergement & Sécurité",
    s2_host: "Google Cloud Platform (Google LLC)",
    s2_host_loc: "Datacenters en Europe (nLPD & RGPD)",
    s2_desc: "Hébergement haute sécurité conforme nLPD.",
    s3_title: "3. Propriété intellectuelle",
    s3_desc: "Propriété exclusive de SAITHAMA Sàrl.",
    s4_title: "4. Limitation de responsabilité",
    s4_desc: "Données basées sur les barèmes officiels OFSP / priminfo.admin.ch 2026.",
    s5_title: "5. Indépendance",
    s5_desc: "Comparateur 100% indépendant et neutre.",
    privacy_title: "Politique de Confidentialité (nLPD)",
    privacy_subtitle: "Protection stricte selon la nouvelle loi suisse sur la protection des données",
    p1_title: "1. Confidentialité", p1_desc: "Protection stricte conforme nLPD.",
    p2_title: "2. Données collectées", p2_desc: "Uniquement les données nécessaires à la simulation.",
    p3_title: "3. Sécurité", p3_desc: "Aucune vente ou location de données.",
    p4_title: "4. Vos droits", p4_desc: "Droit d'accès et d'effacement via contact@lefennecmalin.ch.",
    p5_title: "5. Cookies", p5_desc: "Cookies techniques uniquement."
  };

  if (mode === 'legal') {
    return (
      <div id="legal-notice-page" className="bg-white rounded-3xl border border-fennec-cream p-6 sm:p-10 md:p-12 space-y-8 max-w-4xl mx-auto shadow-sm">
        <div className="flex items-center space-x-4 border-b border-fennec-cream/40 pb-6">
          <div className="p-3 bg-red-50 text-fennec-red rounded-2xl shrink-0">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-fennec-dark">
              {c.legal_title}
            </h1>
            <p className="text-sm text-fennec-brown font-semibold">
              {c.legal_subtitle}
            </p>
          </div>
        </div>

        <div className="space-y-8 text-sm text-fennec-dark/85 leading-relaxed">
          {/* 1. Éditeur */}
          <section id="legal-publisher" className="space-y-3 bg-[#FAF7F3] p-5 sm:p-6 rounded-2xl border border-fennec-cream/60">
            <div className="flex items-center gap-2 text-fennec-dark">
              <Building2 className="w-5 h-5 text-fennec-terracotta" />
              <h2 className="font-display font-extrabold text-lg text-fennec-dark">{c.s1_title}</h2>
            </div>
            <p className="text-justify">{c.s1_desc}</p>
            
            <div className="mt-3 pt-3 border-t border-fennec-cream/50 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-fennec-dark/90">
              <div className="flex items-center gap-2">
                <span className="font-bold text-fennec-terracotta">Société :</span>
                <span>{c.s1_company}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-fennec-terracotta">{c.s1_uid}</span>
              </div>
              <div className="flex items-start gap-2 sm:col-span-2">
                <MapPin className="w-3.5 h-3.5 text-fennec-terracotta shrink-0 mt-0.5" />
                <span>{c.s1_address}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-fennec-terracotta">{c.s1_registry}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-fennec-terracotta shrink-0" />
                <a href={`mailto:${c.s1_email}`} className="text-fennec-terracotta hover:underline font-bold">
                  {c.s1_email}
                </a>
              </div>
            </div>
          </section>

          {/* 2. Hébergement */}
          <section id="legal-hosting" className="space-y-3 p-5 sm:p-6 rounded-2xl border border-fennec-cream/60 bg-white">
            <div className="flex items-center gap-2 text-fennec-dark">
              <Server className="w-5 h-5 text-fennec-terracotta" />
              <h2 className="font-display font-extrabold text-lg text-fennec-dark">{c.s2_title}</h2>
            </div>
            <p className="text-justify">{c.s2_desc}</p>
            <div className="text-xs text-fennec-dark/80 bg-[#FAF7F3] p-3 rounded-xl border border-fennec-cream/40 space-y-1">
              <p><strong>Hébergeur :</strong> {c.s2_host}</p>
              <p><strong>Localisation :</strong> {c.s2_host_loc}</p>
            </div>
          </section>

          {/* 3. Propriété intellectuelle */}
          <section id="legal-ip" className="space-y-2">
            <div className="flex items-center gap-2 text-fennec-dark">
              <FileText className="w-5 h-5 text-fennec-terracotta" />
              <h2 className="font-display font-extrabold text-lg text-fennec-dark">{c.s3_title}</h2>
            </div>
            <p className="text-justify pl-7">{c.s3_desc}</p>
          </section>

          {/* 4. Limitation de responsabilité */}
          <section id="legal-liability" className="space-y-2">
            <div className="flex items-center gap-2 text-fennec-dark">
              <Scale className="w-5 h-5 text-fennec-terracotta" />
              <h2 className="font-display font-extrabold text-lg text-fennec-dark">{c.s4_title}</h2>
            </div>
            <p className="text-justify pl-7">{c.s4_desc}</p>
          </section>

          {/* 5. Indépendance */}
          <section id="legal-independence" className="space-y-2">
            <div className="flex items-center gap-2 text-fennec-dark">
              <Lock className="w-5 h-5 text-fennec-terracotta" />
              <h2 className="font-display font-extrabold text-lg text-fennec-dark">{c.s5_title}</h2>
            </div>
            <p className="text-justify pl-7">{c.s5_desc}</p>
          </section>
        </div>
      </div>
    );
  }

  // Privacy Statement Mode
  return (
    <div id="privacy-policy-page" className="bg-white rounded-3xl border border-fennec-cream p-6 sm:p-10 md:p-12 space-y-8 max-w-4xl mx-auto shadow-sm">
      <div className="flex items-center space-x-4 border-b border-fennec-cream/40 pb-6">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
          <Key className="w-8 h-8" />
        </div>
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-fennec-dark">
            {c.privacy_title}
          </h1>
          <p className="text-sm text-fennec-brown font-semibold">
            {c.privacy_subtitle}
          </p>
        </div>
      </div>

      <div className="space-y-6 text-sm text-fennec-dark/85 leading-relaxed">
        <section className="space-y-2 p-5 bg-[#FAF7F3] rounded-2xl border border-fennec-cream/60">
          <h2 className="font-display font-extrabold text-base text-fennec-dark">{c.p1_title}</h2>
          <p className="text-justify">{c.p1_desc}</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-extrabold text-base text-fennec-dark">{c.p2_title}</h2>
          <p className="text-justify">{c.p2_desc}</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-extrabold text-base text-fennec-dark">{c.p3_title}</h2>
          <p className="text-justify">{c.p3_desc}</p>
        </section>

        <section className="space-y-2 p-5 bg-emerald-50/60 rounded-2xl border border-emerald-200/50">
          <h2 className="font-display font-extrabold text-base text-emerald-950">{c.p4_title}</h2>
          <p className="text-justify text-emerald-900">{c.p4_desc}</p>
          <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-emerald-950">
            <Mail className="w-4 h-4 text-emerald-700" />
            <span>Contact DPO & Protection des données : <strong>contact@lefennecmalin.ch</strong></span>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-extrabold text-base text-fennec-dark">{c.p5_title}</h2>
          <p className="text-justify">{c.p5_desc}</p>
        </section>
      </div>
    </div>
  );
}

