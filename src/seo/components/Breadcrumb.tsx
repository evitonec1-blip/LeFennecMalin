import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
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
          {item.onClick ? (
            <button
              onClick={item.onClick}
              className="hover:text-fennec-terracotta transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-fennec-dark/70 font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
