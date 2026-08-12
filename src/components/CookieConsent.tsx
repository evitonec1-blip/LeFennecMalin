/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Shield, Info } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem('fennec_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('fennec_cookie_consent', 'accepted_all');
    setVisible(false);
  };

  const handleDeclineAll = () => {
    localStorage.setItem('fennec_cookie_consent', 'declined_all');
    setVisible(false);
  };

  if (!visible) return null;

  const content = {
    fr: {
      title: "Respect de votre vie privée",
      subtitle: "Conformité nLPD & RGPD",
      body: "Le Fennec Malin utilise des cookies essentiels au bon fonctionnement technique de nos comparateurs d'assurances suisses, ainsi que des mesures d'audience anonymes pour améliorer votre expérience. Aucune donnée n'est revendue à des tiers.",
      decline: "Refuser",
      accept: "Tout Accepter",
      guarantee: "Garanti 100% anonyme & sécurisé"
    },
    de: {
      title: "Schutz Ihrer Privatsphäre",
      subtitle: "nDSG & DSGVO Konformität",
      body: "Le Fennec Malin nutzt essenzielle Cookies für die einwandfreie Funktion unseres Schweizer Versicherungsvergleichs sowie anonyme Nutzeranalysen. Keine Daten werden an Dritte verkauft.",
      decline: "Ablehnen",
      accept: "Alle akzeptieren",
      guarantee: "100% anonym & sicher"
    },
    en: {
      title: "Respecting Your Privacy",
      subtitle: "FADP & GDPR Compliance",
      body: "Le Fennec Malin uses essential cookies required for technical operations of our Swiss comparison engines, as well as anonymous analytics to enhance your experience. No data is sold to third parties.",
      decline: "Decline",
      accept: "Accept All",
      guarantee: "100% Anonymous & Secure"
    },
    it: {
      title: "Rispetto della tua privacy",
      subtitle: "Conformità nLPD & GDPR",
      body: "Le Fennec Malin utilizza cookie essenziali al funzionamento dei nostri comparatori assicurativi e statistiche anonime per migliorare l'esperienza. Nessun dato viene venduto a terzi.",
      decline: "Rifiuta",
      accept: "Accetta tutti",
      guarantee: "Garantito 100% anonimo e sicuro"
    },
    es: {
      title: "Respeto de tu privacidad",
      subtitle: "Conformidad nLPD & RGPD",
      body: "Le Fennec Malin utiliza cookies esenciales para el funcionamiento de nuestros comparadores de seguros y estadísticas anónimas para mejorar tu experiencia. Ningún dato es revendido a terceros.",
      decline: "Rechazar",
      accept: "Aceptar todo",
      guarantee: "Garantizado 100% anónimo y seguro"
    },
    pt: {
      title: "Respeito pela sua privacidade",
      subtitle: "Conformidade nLPD & RGPD",
      body: "Le Fennec Malin utiliza cookies essenciais para o funcionamento dos nossos comparadores de seguros e estatísticas anónimas para melhorar a sua experiência. Nenhum dado é revendido a terceiros.",
      decline: "Recusar",
      accept: "Aceitar tudo",
      guarantee: "Garantido 100% anónimo e seguro"
    }
  }[language] || {
    title: "Respect de votre vie privée",
    subtitle: "Conformité nLPD & RGPD",
    body: "Le Fennec Malin utilise des cookies essentiels au bon fonctionnement technique de nos comparateurs d'assurances suisses, ainsi que des mesures d'audience anonymes pour améliorer votre expérience. Aucune donnée n'est revendue à des tiers.",
    decline: "Refuser",
    accept: "Tout Accepter",
    guarantee: "Garanti 100% anonyme & sécurisé"
  };

  return (
    <div className="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border-2 border-fennec-cream/80 shadow-2xl p-6 text-left flex flex-col space-y-4">
        
        {/* Header Block */}
        <div className="flex items-start space-x-3">
          <div className="p-2.5 bg-fennec-cream/60 rounded-xl text-fennec-terracotta shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-display font-bold text-sm text-fennec-dark">
              {content.title}
            </h4>
            <p className="text-xs text-fennec-dark/40 uppercase tracking-wider font-extrabold">
              {content.subtitle}
            </p>
          </div>
        </div>

        {/* Core Message */}
        <p className="text-xs text-fennec-dark/80 leading-relaxed text-justify">
          {content.body}
        </p>

        {/* Buttons Action Lockup */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <button
            id="cookie-decline-btn"
            onClick={handleDeclineAll}
            className="flex-1 px-4 py-2 bg-fennec-cream/20 hover:bg-fennec-cream/50 text-fennec-dark/80 font-display font-semibold text-xs rounded-xl transition-all border border-fennec-cream/40"
          >
            {content.decline}
          </button>
          <button
            id="cookie-accept-btn"
            onClick={handleAcceptAll}
            className="flex-1 px-4 py-2 bg-fennec-terracotta hover:bg-fennec-dark text-white font-display font-bold text-xs rounded-xl transition-all shadow-xs"
          >
            {content.accept}
          </button>
        </div>

        <div className="text-[10px] text-fennec-dark/50 text-center flex items-center justify-center space-x-1">
          <Info className="w-3 h-3 text-fennec-brown" />
          <span>{content.guarantee}</span>
        </div>

      </div>
    </div>
  );
}
