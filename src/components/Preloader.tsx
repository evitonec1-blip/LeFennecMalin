import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../i18n/LanguageContext';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [percentage, setPercentage] = useState(0);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const { language } = useLanguage();

  // References for curtain animations
  const creamCurtainRef = useRef<HTMLDivElement>(null);
  const terracottaCurtainRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  // References for content animations
  const logoRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const digitsContainerRef = useRef<HTMLDivElement>(null);

  const wordMap = {
    fr: ["Analyser", "Comparer", "Économiser", "Malin 🇨🇭"],
    de: ["Analysieren", "Vergleichen", "Sparen", "Schlau 🇨🇭"],
    en: ["Analyze", "Compare", "Save", "Smart 🇨🇭"],
    it: ["Analizzare", "Confrontare", "Risparmiare", "Intelligente 🇨🇭"]
  };

  const words = wordMap[language] || wordMap.fr;

  // Determine active word index based on percentage
  const targetWordIndex = percentage < 25 ? 0 : percentage < 55 ? 1 : percentage < 80 ? 2 : 3;

  // Simple text fade crossfade when word index changes
  useEffect(() => {
    if (wordsRef.current && targetWordIndex !== activeWordIndex) {
      gsap.to(wordsRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.35,
        onComplete: () => {
          setActiveWordIndex(targetWordIndex);
          gsap.to(wordsRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out"
          });
        }
      });
    }
  }, [targetWordIndex, activeWordIndex]);

  // Main GSAP counter and exit animation sequence
  useEffect(() => {
    const counterObj = { val: 0 };
    
    const tl = gsap.timeline();

    tl.to(counterObj, {
      val: 100,
      duration: 3.5,
      ease: "power2.out",
      onUpdate: () => {
        setPercentage(Math.floor(counterObj.val));
      },
    });

    tl.to([wordsRef.current, digitsContainerRef.current, logoRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.in",
    });

    tl.to(mainContainerRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: "power3.inOut"
    }, "-=0.15");

    tl.to(terracottaCurtainRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: "power3.inOut"
    }, "-=0.8");

    tl.to(creamCurtainRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: "power3.inOut",
      onComplete: () => {
        onComplete();
      }
    }, "-=0.8");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-auto">
      {/* Curtain Layer 1: Fennec Cream */}
      <div 
        ref={creamCurtainRef}
        className="absolute inset-0 bg-fennec-cream z-30"
      />

      {/* Curtain Layer 2: Fennec Terracotta */}
      <div 
        ref={terracottaCurtainRef}
        className="absolute inset-0 bg-fennec-terracotta z-20"
      />

      {/* Curtain Layer 3: Fennec Dark - Main Container */}
      <div 
        ref={mainContainerRef}
        className="absolute inset-0 bg-fennec-dark z-10 flex flex-col justify-between p-8 md:p-12 text-fennec-cream"
      >
        {/* Top bar */}
        <div ref={logoRef} className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-fennec-terracotta flex items-center justify-center text-white font-display font-extrabold text-sm">
              F
            </div>
            <span className="font-display font-extrabold tracking-wider text-sm uppercase text-white">
              Le Fennec Malin
            </span>
          </div>
          <span className="text-xs font-mono tracking-widest text-fennec-sand uppercase">
            CH 2026
          </span>
        </div>

        {/* Center Animated Word */}
        <div className="my-auto text-center overflow-hidden py-4">
          <div 
            ref={wordsRef}
            className="font-display font-black text-4xl md:text-6xl text-white tracking-tight"
          >
            {words[activeWordIndex]}
          </div>
        </div>

        {/* Bottom Progress Counter */}
        <div ref={digitsContainerRef} className="flex justify-between items-end border-t border-white/10 pt-4">
          <div className="text-xs text-fennec-sand/80 font-medium max-w-xs">
            Comparateur helvétique indépendant
          </div>
          <div className="font-mono font-black text-5xl md:text-7xl text-fennec-sand tracking-tighter">
            {percentage}<span className="text-2xl text-fennec-terracotta">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
