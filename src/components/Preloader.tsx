import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [percentage, setPercentage] = useState(0);
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  // References for curtain animations
  const creamCurtainRef = useRef<HTMLDivElement>(null);
  const terracottaCurtainRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  // References for content animations
  const logoRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const digitsContainerRef = useRef<HTMLDivElement>(null);

  const words = ["Analyser", "Comparer", "Économiser", "Malin 🇨🇭"];

  // Determine active word index based on percentage
  const targetWordIndex = percentage < 25 ? 0 : percentage < 55 ? 1 : percentage < 80 ? 2 : 3;

  // Simple text fade crossfade when word index changes
  useEffect(() => {
    if (wordsRef.current && targetWordIndex !== activeWordIndex) {
      // Simple fade out, update word, fade back in
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
    
    // Create master timeline for preloader
    const tl = gsap.timeline();

    // 1. Smooth simple numerical increment from 0 to 100
    tl.to(counterObj, {
      val: 100,
      duration: 4.2,
      ease: "power2.out",
      onUpdate: () => {
        setPercentage(Math.floor(counterObj.val));
      },
    });

    // 2. Simple exit sequence
    tl.to([wordsRef.current, digitsContainerRef.current, logoRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.in",
    });

    // Elegant peeling curtains
    tl.to(mainContainerRef.current, {
      yPercent: -100,
      duration: 1.0,
      ease: "power3.inOut"
    }, "-=0.15");

    tl.to(terracottaCurtainRef.current, {
      yPercent: -100,
      duration: 1.0,
      ease: "power3.inOut"
    }, "-=0.9");

    tl.to(creamCurtainRef.current, {
      yPercent: -100,
      duration: 1.0,
      ease: "power3.inOut",
      onComplete: () => {
        onComplete();
      }
    }, "-=0.9");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden select-none pointer-events-auto">
      {/* Layer 1: Cream Curtain (bottom layer) */}
      <div 
        ref={creamCurtainRef} 
        className="absolute inset-0 bg-[#FDFBF9] z-10" 
      />

      {/* Layer 2: Terracotta Curtain (middle layer) */}
      <div 
        ref={terracottaCurtainRef} 
        className="absolute inset-0 bg-[#B86F4E] z-20" 
      />

      {/* Layer 3: Main Dark Container (top layer) */}
      <div 
        ref={mainContainerRef} 
        className="absolute inset-0 bg-[#2D251E] z-30 flex flex-col justify-between p-8 md:p-12"
      >
        {/* Header inside preloader */}
        <div ref={logoRef} className="flex justify-between items-center w-full">
          <div className="flex items-center space-x-2">
            <span className="font-display font-black text-xl text-white tracking-widest">LE FENNEC MALIN</span>
            <span className="bg-[#E53935] text-white text-[10px] font-black px-1.5 py-0.5 rounded-sm">SUISSE 🇨🇭</span>
          </div>
        </div>

        {/* Central Word Transition (Simple Opacity/Y Reveal) */}
        <div className="text-center w-full px-4 relative">
          <div className="h-24 md:h-32 flex items-center justify-center overflow-hidden">
            <div 
              ref={wordsRef} 
              className="font-display font-black text-4xl sm:text-6xl md:text-8xl text-white tracking-wider uppercase"
            >
              {words[activeWordIndex] === "Malin 🇨🇭" ? (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAC89B] via-[#F3E6D6] to-white animate-pulse">
                  {words[activeWordIndex]}
                </span>
              ) : (
                words[activeWordIndex]
              )}
            </div>
          </div>
          <p className="text-[#F3E6D6]/30 text-[10px] sm:text-xs mt-4 tracking-widest uppercase font-mono">
            Chargement des données officielles OFSP...
          </p>
        </div>

        {/* Bottom Spacer */}
        <div className="h-4" />

        {/* Bottom-Right Clean Numerical Counter */}
        <div 
          ref={digitsContainerRef} 
          className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-40 flex items-baseline select-none text-white font-mono"
        >
          <span className="font-mono font-black text-5xl sm:text-7xl md:text-8xl tracking-tight">
            {percentage}
          </span>
          <span className="text-xl sm:text-2xl md:text-4xl font-mono text-[#F3E6D6]/50 ml-2 font-black">%</span>
        </div>
      </div>
    </div>
  );
}
