import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Fil d'Ariane" className="flex items-center gap-1 text-xs text-fennec-dark/50 mb-6 flex-wrap">
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <ChevronRight className="w-3 h-3 shrink-0" />}
          {item.href ? (
            <a
              href={item.href}
              onClick={item.onClick ? (event) => {
                event.preventDefault();
                item.onClick?.();
              } : undefined}
              className="hover:text-fennec-terracotta transition-colors"
            >
              {item.label}
            </a>
          ) : item.onClick ? (
            <button
              onClick={item.onClick}
              className="hover:text-fennec-terracotta transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-fennec-dark/70 font-medium" aria-current="page">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
