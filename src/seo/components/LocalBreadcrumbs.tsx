/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronRight, Home, MapPin } from 'lucide-react';
import { Language } from '../../i18n/translations';

interface BreadcrumbItem {
  label: string;
  url?: string;
  onClick?: () => void;
}

interface LocalBreadcrumbsProps {
  items: BreadcrumbItem[];
  lang?: Language;
}

export const LocalBreadcrumbs: React.FC<LocalBreadcrumbsProps> = ({ items, lang = 'fr' }) => {
  return (
    <nav aria-label="Fil d'Ariane" className="w-full bg-slate-50 border-b border-slate-200/80 py-3 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex items-center flex-wrap gap-1.5 text-xs sm:text-sm text-slate-600 font-medium">
        <a
          href={`/${lang}/`}
          className="inline-flex items-center gap-1 hover:text-emerald-700 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Accueil</span>
        </a>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {isLast || !item.url ? (
                <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-none">
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.url}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                  className="hover:text-emerald-700 transition-colors truncate max-w-[180px] sm:max-w-none"
                >
                  {item.label}
                </a>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
