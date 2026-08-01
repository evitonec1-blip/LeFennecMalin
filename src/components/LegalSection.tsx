/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldAlert, Key } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface LegalSectionProps {
  mode: 'legal' | 'privacy';
}

export default function LegalSection({ mode }: LegalSectionProps) {
  const { language } = useLanguage();

  const c = {
    fr: {
      legal_title: "Mentions Légales",
      legal_subtitle: "Conformité suisse, éditeur et politique de responsabilité",
      s1_title: "1. Éditeur du site",
      s1_desc: "Le site internet lefennecmalin.ch est édité par la société SAITHAMA Sàrl dont le siège social est situé à Cheseaux-sur-Lausanne, Suisse.",
      s2_title: "2. Hébergement",
      s2_desc: "Le site internet est hébergé sur des serveurs sécurisés situés en Europe (Google Cloud Platform, conforme à la nLPD suisse et au RGPD européen).",
      s3_title: "3. Propriété intellectuelle",
      s3_desc: "La marque FENNY, le logo Fenny, sa charte graphique et la mascotte Fenny sont la propriété exclusive de SAITHAMA Sàrl.",
      s4_title: "4. Limitation de responsabilité",
      s4_desc: "Les simulations de primes sont fournies à titre informatif sur la base des données publiques de l'OFSP (priminfo.admin.ch).",
      s5_title: "5. Indépendance et neutralité",
      s5_desc: "Le Fennec Malin est un comparateur indépendant. Nous n'avons aucune participation au capital d'un quelconque assureur.",
      
      privacy_title: "Politique de Confidentialité",
      privacy_subtitle: "Protection stricte de vos données privées selon la nouvelle loi suisse (nLPD)",
      p1_title: "1. Notre engagement de transparence",
      p1_desc: "Chez Le Fennec Malin, nous accordons une importance capitale à la vie privée de nos utilisateurs suisses en conformité avec la nLPD.",
      p2_title: "2. Données collectées",
      p2_desc: "Dans le cadre de l'utilisation de nos comparateurs, nous recueillons uniquement les informations nécessaires pour établir un devis ou une simulation.",
      p3_title: "3. Usage et transmission des données",
      p3_desc: "Vos données de simulation ne sont jamais vendues ou louées à des tiers à des fins publicitaires.",
      p4_title: "4. Vos Droits d'accès et d'effacement",
      p4_desc: "Conformément à la nLPD, vous disposez d'un droit total d'accès, de rectification et d'effacement de l'ensemble de vos données.",
      p5_title: "5. Cookies et statistiques anonymes",
      p5_desc: "Nous utilisons de légers cookies techniques indispensables pour mémoriser votre sélection cantonale ou vos filtres."
    },
    de: {
      legal_title: "Impressum",
      legal_subtitle: "Schweizer Konformität, Herausgeber und Haftungspolitik",
      s1_title: "1. Herausgeber der Website",
      s1_desc: "Die Website lefennecmalin.ch wird von der Gesellschaft SAITHAMA Sàrl mit Sitz in Cheseaux-sur-Lausanne, Schweiz, herausgegeben.",
      s2_title: "2. Hosting",
      s2_desc: "Die Website wird auf hochsicheren Servern in Europa (Google Cloud Platform, konform mit nDSG und DSGVO) gehostet.",
      s3_title: "3. Geistiges Eigentum",
      s3_desc: "Die Marke FENNY, das Logo und das Maskottchen Fenny sind exklusives Eigentum der SAITHAMA Sàrl.",
      s4_title: "4. Haftungsbeschränkung",
      s4_desc: "Die Prämiensimulationen basieren auf den öffentlichen Daten des Bundesamts für Gesundheit (BAG / priminfo.admin.ch).",
      s5_title: "5. Unabhängigkeit und Neutralität",
      s5_desc: "Le Fennec Malin ist ein unabhängiger Vergleichsdienst ohne Kapitalbeteiligungen von Versicherungsgesellschaften.",
      
      privacy_title: "Datenschutzerklärung",
      privacy_subtitle: "Strikter Schutz Ihrer Daten nach dem neuen Schweizer Datenschutzgesetz (nDSG)",
      p1_title: "1. Transparenzversprechen",
      p1_desc: "Wir legen größten Wert auf den Schutz Ihrer persönlichen Daten in Übereinstimmung mit dem neuen Schweizer Datenschutzgesetz (nDSG).",
      p2_title: "2. Erhobene Daten",
      p2_desc: "Wir erheben ausschließlich Daten, die für die Erstellung eines Versicherungsvergleichs notwendig sind.",
      p3_title: "3. Datennutzung & Weitergabe",
      p3_desc: "Ihre Daten werden niemals an Dritte zu Werbezwecken verkauft oder vermietet.",
      p4_title: "4. Ihre Rechte",
      p4_desc: "Sie haben das Recht auf Auskunft, Berichtigung und Löschung Ihrer Daten gemäß nDSG.",
      p5_title: "5. Cookies",
      p5_desc: "Wir verwenden nur essenzielle technische Cookies zur Speicherung Ihrer Kantonsauswahl und Filter."
    },
    en: {
      legal_title: "Legal Notice",
      legal_subtitle: "Swiss compliance, publisher and liability statement",
      s1_title: "1. Site Publisher",
      s1_desc: "The website lefennecmalin.ch is published by SAITHAMA Sàrl based in Cheseaux-sur-Lausanne, Switzerland.",
      s2_title: "2. Hosting",
      s2_desc: "Hosted on secure European servers (Google Cloud Platform, fully compliant with Swiss FADP and EU GDPR).",
      s3_title: "3. Intellectual Property",
      s3_desc: "The FENNY trademark, logo, design and mascot are the exclusive property of SAITHAMA Sàrl.",
      s4_title: "4. Limitation of Liability",
      s4_desc: "Insurance simulations are provided for information purposes based on official 2026 FOPH public data (priminfo.admin.ch).",
      s5_title: "5. Independence & Neutrality",
      s5_desc: "Le Fennec Malin is an independent comparator with zero capital ownership by insurance carriers.",
      
      privacy_title: "Privacy Policy",
      privacy_subtitle: "Strict protection of your personal data under the revised Swiss Data Protection Act (FADP)",
      p1_title: "1. Commitment to Transparency",
      p1_desc: "At Le Fennec Malin, we prioritize the protection and confidentiality of your data in strict compliance with Swiss FADP.",
      p2_title: "2. Collected Data",
      p2_desc: "We only collect information strictly required to run insurance simulations and generate accurate quotes.",
      p3_title: "3. Data Usage & Sharing",
      p3_desc: "Your simulation data is never sold or rented to third parties for advertising purposes.",
      p4_title: "4. Your Rights",
      p4_desc: "In compliance with FADP, you hold total rights to access, rectify, or erase your stored personal data.",
      p5_title: "5. Cookies",
      p5_desc: "We use lightweight technical cookies essential for remembering your canton and comparison filter choices."
    },
    it: {
      legal_title: "Note Legali",
      legal_subtitle: "Conformità svizzera, editore e responsabilità",
      s1_title: "1. Editore del sito",
      s1_desc: "Il sito lefennecmalin.ch è edito dalla società SAITHAMA Sàrl con sede a Cheseaux-sur-Lausanne, Svizzera.",
      s2_title: "2. Hosting",
      s2_desc: "Hospitato su server europei altamente sicuri (Google Cloud Platform, conforme alla nLPD svizzera e GDPR).",
      s3_title: "3. Proprietà intellettuale",
      s3_desc: "Il marchio FENNY, il logo e la mascotte Fenny sono proprietà esclusiva di SAITHAMA Sàrl.",
      s4_title: "4. Limitazione di responsabilità",
      s4_desc: "Le simulazioni sono fornite a titolo informativo sulla base dei dati pubblici UFSP (priminfo.admin.ch).",
      s5_title: "5. Indipendenza e neutralità",
      s5_desc: "Le Fennec Malin è un comparatore indipendente senza partecipazioni di compagnie assicuratrici.",
      
      privacy_title: "Informativa sulla Privacy",
      privacy_subtitle: "Protezione dei tuoi dati personali in base alla nuova legge svizzera (nLPD)",
      p1_title: "1. Trasparenza",
      p1_desc: "Diamo la massima importanza alla protezione dei dati dei nostri utenti svizzeri in conformità con la nLPD.",
      p2_title: "2. Dati raccolti",
      p2_desc: "Raccogliamo solo i dati necessari per elaborare il preventivo o la simulazione richiesta.",
      p3_title: "3. Uso dei dati",
      p3_desc: "I tuoi dati non vengono mai venduti né ceduti a terzi per scopi pubblicitari.",
      p4_title: "4. I tuoi diritti",
      p4_desc: "Hai il diritto di accedere, rettificare o cancellare i tuoi dati personali in qualsiasi momento.",
      p5_title: "5. Cookie",
      p5_desc: "Utilizziamo cookie tecnici essenziali per memorizzare la selezione del cantone e i filtri di ricerca."
    }
  }[language] || {
    legal_title: "Mentions Légales",
    legal_subtitle: "Conformité suisse, éditeur et politique de responsabilité",
    s1_title: "1. Éditeur du site",
    s1_desc: "Le site internet lefennecmalin.ch est édité par la société SAITHAMA Sàrl.",
    s2_title: "2. Hébergement",
    s2_desc: "Serveurs sécurisés situés en Europe.",
    s3_title: "3. Propriété intellectuelle",
    s3_desc: "Propriété exclusive de SAITHAMA Sàrl.",
    s4_title: "4. Limitation de responsabilité",
    s4_desc: "Données informatives basées sur l'OFSP.",
    s5_title: "5. Indépendance et neutralité",
    s5_desc: "Comparateur neutre et indépendant.",
    privacy_title: "Politique de Confidentialité",
    privacy_subtitle: "Protection stricte selon la nLPD",
    p1_title: "1. Transparence", p1_desc: "",
    p2_title: "2. Données collectées", p2_desc: "",
    p3_title: "3. Usage", p3_desc: "",
    p4_title: "4. Droits", p4_desc: "",
    p5_title: "5. Cookies", p5_desc: ""
  };

  if (mode === 'legal') {
    return (
      <div className="bg-white rounded-3xl border border-fennec-cream p-8 md:p-12 space-y-8 max-w-4xl mx-auto shadow-sm">
        <div className="flex items-center space-x-4 border-b border-fennec-cream/40 pb-6">
          <div className="p-3 bg-red-50 text-fennec-red rounded-2xl">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h2 className="font-display font-black text-3xl text-fennec-dark">
              {c.legal_title}
            </h2>
            <p className="text-sm text-fennec-brown font-semibold">
              {c.legal_subtitle}
            </p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-fennec-dark/80 leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-display font-bold text-lg text-fennec-dark">{c.s1_title}</h3>
            <p className="text-justify">{c.s1_desc}</p>
            <p className="font-mono text-xs text-fennec-brown">
              CHE-272.095.360<br />
              Email : contact@lefennecmalin.ch<br />
              Tel : +41 (0) 21 588 05 20
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-display font-bold text-lg text-fennec-dark">{c.s2_title}</h3>
            <p className="text-justify">{c.s2_desc}</p>
          </section>

          <section className="space-y-2">
            <h3 className="font-display font-bold text-lg text-fennec-dark">{c.s3_title}</h3>
            <p className="text-justify">{c.s3_desc}</p>
          </section>

          <section className="space-y-2">
            <h3 className="font-display font-bold text-lg text-fennec-dark">{c.s4_title}</h3>
            <p>{c.s4_desc}</p>
          </section>

          <section className="space-y-2">
            <h3 className="font-display font-bold text-lg text-fennec-dark">{c.s5_title}</h3>
            <p>{c.s5_desc}</p>
          </section>
        </div>
      </div>
    );
  }

  // Privacy Statement Mode
  return (
    <div className="bg-white rounded-3xl border border-fennec-cream p-8 md:p-12 space-y-8 max-w-4xl mx-auto shadow-sm">
      <div className="flex items-center space-x-4 border-b border-fennec-cream/40 pb-6">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
          <Key className="w-8 h-8" />
        </div>
        <div>
          <h2 className="font-display font-black text-3xl text-fennec-dark">
            {c.privacy_title}
          </h2>
          <p className="text-sm text-fennec-brown font-semibold">
            {c.privacy_subtitle}
          </p>
        </div>
      </div>

      <div className="space-y-6 text-sm text-fennec-dark/80 leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-display font-bold text-lg text-fennec-dark">{c.p1_title}</h3>
          <p>{c.p1_desc}</p>
        </section>

        <section className="space-y-2">
          <h3 className="font-display font-bold text-lg text-fennec-dark">{c.p2_title}</h3>
          <p>{c.p2_desc}</p>
        </section>

        <section className="space-y-2">
          <h3 className="font-display font-bold text-lg text-fennec-dark">{c.p3_title}</h3>
          <p>{c.p3_desc}</p>
        </section>

        <section className="space-y-2">
          <h3 className="font-display font-bold text-lg text-fennec-dark">{c.p4_title}</h3>
          <p>{c.p4_desc}</p>
        </section>

        <section className="space-y-2">
          <h3 className="font-display font-bold text-lg text-fennec-dark">{c.p5_title}</h3>
          <p>{c.p5_desc}</p>
        </section>
      </div>
    </div>
  );
}
