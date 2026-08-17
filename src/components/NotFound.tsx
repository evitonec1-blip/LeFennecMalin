import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import fenyThinking from '../assets/images/feny_thinking_1783331247759.jpg';

interface NotFoundProps {
  onGoHome: () => void;
}

export default function NotFound({ onGoHome }: NotFoundProps) {
  const { language } = useLanguage();

  const texts: Record<string, { title: string; subtitle: string; desc: string; btn: string; hint: string }> = {
    fr: { title: '404', subtitle: 'Page introuvable', desc: "Oups ! Cette page n'existe pas ou a été déplacée. Fenny a cherché partout… sans succès !", btn: 'Retour à l\'accueil', hint: 'Ou utilisez la navigation ci-dessus pour trouver ce que vous cherchez.' },
    de: { title: '404', subtitle: 'Seite nicht gefunden', desc: 'Hoppla! Diese Seite existiert nicht oder wurde verschoben. Fenny hat überall gesucht… ohne Erfolg!', btn: 'Zurück zur Startseite', hint: 'Oder verwenden Sie die Navigation oben, um das Gesuchte zu finden.' },
    en: { title: '404', subtitle: 'Page not found', desc: "Oops! This page doesn't exist or has been moved. Fenny searched everywhere… with no luck!", btn: 'Back to home', hint: 'Or use the navigation above to find what you\'re looking for.' },
    it: { title: '404', subtitle: 'Pagina non trovata', desc: 'Ops! Questa pagina non esiste o è stata spostata. Fenny ha cercato ovunque… senza successo!', btn: 'Torna alla home', hint: 'Oppure usa la navigazione qui sopra per trovare quello che cerchi.' },
    es: { title: '404', subtitle: 'Página no encontrada', desc: '¡Vaya! Esta página no existe o ha sido trasladada. ¡Fenny ha buscado por todas partes… sin éxito!', btn: 'Volver al inicio', hint: 'O usa la navegación de arriba para encontrar lo que buscas.' },
    pt: { title: '404', subtitle: 'Página não encontrada', desc: 'Ooops! Esta página não existe ou foi movida. Fenny procurou em todo o lado… sem sucesso!', btn: 'Voltar ao início', hint: 'Ou use a navegação acima para encontrar o que procura.' },
  };

  const c = texts[language] || texts.fr;

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center px-4 py-16 text-center">
      {/* Fennec image */}
      <div className="relative mb-8">
        <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-fennec-tan/40 shadow-xl mx-auto">
          <img
            src={fenyThinking}
            alt="Fenny 404"
            className="w-full h-full object-cover object-top"
          />
        </div>
        {/* Floating 404 badge */}
        <div className="absolute -top-3 -right-3 bg-fennec-terracotta text-white font-display font-black text-sm px-3 py-1.5 rounded-full shadow-lg">
          404
        </div>
      </div>

      {/* Title */}
      <h1 className="font-display font-black text-5xl text-fennec-dark mb-2 tracking-tight">
        {c.title}
      </h1>
      <h2 className="font-display font-bold text-xl text-fennec-brown mb-4">
        {c.subtitle}
      </h2>
      <p className="text-fennec-dark/60 text-base max-w-sm mb-8 leading-relaxed">
        {c.desc}
      </p>

      {/* CTA */}
      <button
        onClick={onGoHome}
        className="bg-fennec-terracotta text-white font-display font-bold px-8 py-3.5 rounded-full shadow-md hover:bg-fennec-terracotta/90 transition-all active:scale-95 text-sm uppercase tracking-wider"
      >
        {c.btn}
      </button>

      <p className="text-fennec-dark/40 text-xs mt-6 max-w-xs">{c.hint}</p>

      {/* Decorative dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 opacity-20">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-fennec-tan" />
        ))}
      </div>
    </div>
  );
}
