import React from 'react';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav 
      aria-label="Fil d'Ariane" 
      className={`text-xs text-fennec-dark/60 mb-6 ${className}`}
    >
      <ol 
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
        className="flex items-center gap-1.5 flex-wrap"
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;

          return (
            <li 
              key={i}
              itemProp="itemListElement" 
              itemScope 
              itemType="https://schema.org/ListItem"
              className="flex items-center gap-1.5"
            >
              {i > 0 && <ChevronRight className="w-3 h-3 shrink-0 text-fennec-dark/40" />}
              
              {item.href ? (
                <a
                  href={item.href}
                  itemProp="item"
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                  className={`hover:text-fennec-terracotta transition-colors ${
                    isLast ? 'text-fennec-dark font-semibold' : 'text-fennec-dark/70'
                  }`}
                >
                  <span itemProp="name">{item.label}</span>
                </a>
              ) : item.onClick ? (
                <button
                  type="button"
                  itemProp="item"
                  onClick={item.onClick}
                  className={`hover:text-fennec-terracotta transition-colors cursor-pointer ${
                    isLast ? 'text-fennec-dark font-semibold' : 'text-fennec-dark/70'
                  }`}
                >
                  <span itemProp="name">{item.label}</span>
                </button>
              ) : (
                <span 
                  itemProp="name" 
                  className={isLast ? 'text-fennec-dark font-semibold' : 'text-fennec-dark/70'}
                >
                  {item.label}
                </span>
              )}
              
              <meta itemProp="position" content={(i + 1).toString()} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

