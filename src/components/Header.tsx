/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppTab } from '../types';
import { Menu, X, Shield, Award, HelpCircle } from 'lucide-react';
import fenyWinking from '../assets/images/feny_winking_1783331270164.jpg';
import fenyLogo from '../assets/images/feny_logo_1783331214351.jpg';

interface HeaderProps {
  currentTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

export default function Header({ currentTab, onTabChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'health-comparator', label: 'Assurance Maladie' },
    { id: 'life-comparator', label: 'Assurance Vie / 3e Pilier' },
    { id: 'about', label: 'À propos de Fenny' },
    { id: 'faq', label: 'FAQ' },
  ] as const;

  const handleNavClick = (tab: AppTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    if (currentTab === 'home') {
      window.location.href = '/';
    } else {
      onTabChange('home');
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-fennec-cream/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand Lockup */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={handleLogoClick}
          >
            <div className="relative w-12 h-12 rounded-full border-2 border-fennec-tan overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-300">
              <img 
                src={fenyWinking} 
                alt="Le Fennec Malin Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/fennec-logo.jpg';
                }}
              />
            </div>
            <div className="flex flex-col text-left justify-center">
              <span className="font-display text-[9px] font-extrabold tracking-widest text-fennec-brown uppercase leading-none mb-0.5">
                Le Fennec
              </span>
              <div className="flex items-center space-x-1 leading-none">
                <span className="font-display text-base sm:text-lg font-black tracking-tight text-fennec-dark group-hover:text-fennec-terracotta transition-colors uppercase leading-none">
                  Malin
                </span>
                <span className="px-1 py-0.5 bg-fennec-red text-[8px] font-bold text-white rounded leading-none">
                  CH
                </span>
              </div>
              <span className="text-[8px] font-bold tracking-wider text-fennec-dark/40 uppercase leading-none mt-0.5">
                Comparateur Indépendant
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-full font-display font-semibold text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-fennec-terracotta text-white shadow-sm'
                      : 'text-fennec-dark hover:bg-fennec-cream/40 hover:text-fennec-terracotta'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => handleNavClick('health-comparator')}
              className="px-5 py-2.5 bg-fennec-red hover:bg-red-600 text-white font-display font-bold rounded-full text-sm shadow-md shadow-fennec-red/25 transition-all duration-200 hover:-translate-y-0.5"
            >
              Comparer maintenant
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-fennec-dark hover:bg-fennec-cream/30 hover:text-fennec-terracotta focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-fennec-cream/30 bg-white">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-display font-bold text-base transition-colors ${
                    isActive
                      ? 'bg-fennec-cream text-fennec-terracotta'
                      : 'text-fennec-dark hover:bg-fennec-cream/20'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 border-t border-fennec-cream/30 flex flex-col space-y-3">
              <div className="flex items-center justify-center text-xs font-semibold text-emerald-700 bg-emerald-50 py-2 rounded-lg border border-emerald-100">
                <Shield className="w-4 h-4 mr-1.5 text-emerald-600" />
                Données officielles OFSP / Priminfo 2026
              </div>
              <button
                onClick={() => handleNavClick('health-comparator')}
                className="w-full text-center py-3 bg-fennec-terracotta hover:bg-fennec-dark text-white font-display font-bold rounded-xl text-base shadow-sm transition-all"
              >
                Comparer les Caisses
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
