/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Language } from '../i18n/translations';

interface FlagIconProps {
  code: Language;
  className?: string;
}

/**
 * Renders a crisp SVG country flag instead of relying on Unicode flag emoji,
 * which many platforms (notably Windows) do not render as actual flags —
 * they fall back to showing the raw letter codes (e.g. "FR").
 */
export default function FlagIcon({ code, className = 'w-5 h-5' }: FlagIconProps) {
  const common = 'rounded-full object-cover shrink-0';
  const cls = `${common} ${className}`;

  switch (code) {
    case 'fr':
      return (
        <svg viewBox="0 0 36 36" className={cls} aria-hidden="true">
          <circle cx="18" cy="18" r="18" fill="#fff" />
          <path d="M0 18a18 18 0 0 1 12-16.97v33.94A18 18 0 0 1 0 18Z" fill="#0055A4" />
          <path d="M36 18a18 18 0 0 1-12 16.97V1.03A18 18 0 0 1 36 18Z" fill="#EF4135" />
        </svg>
      );
    case 'de':
     
      return (
        <svg viewBox="0 0 36 36" className={cls} aria-hidden="true">
          <circle cx="18" cy="18" r="18" fill="#DD0000" />
          <path d="M0 12h36v-.03A18 18 0 0 0 18 0 18 18 0 0 0 0 11.97Z" fill="#000" />
          <path d="M0 24h36a18 18 0 0 1-36 0Z" fill="#FFCE00" />
        </svg>
      );
    case 'en':
      return (
        <svg viewBox="0 0 36 36" className={cls} aria-hidden="true">
          <circle cx="18" cy="18" r="18" fill="#012169" />
          <path d="M4 4 32 32M32 4 4 32" stroke="#fff" strokeWidth="4" />
          <path d="M4 4 32 32M32 4 4 32" stroke="#C8102E" strokeWidth="1.6" />
          <path d="M18 0v36M0 18h36" stroke="#fff" strokeWidth="6.5" />
          <path d="M18 0v36M0 18h36" stroke="#C8102E" strokeWidth="3.6" />
          <circle cx="18" cy="18" r="18" fill="none" stroke="#012169" strokeWidth="0" />
        </svg>
      );
    case 'it':
      return (
        <svg viewBox="0 0 36 36" className={cls} aria-hidden="true">
          <circle cx="18" cy="18" r="18" fill="#fff" />
          <path d="M0 18a18 18 0 0 1 12-16.97v33.94A18 18 0 0 1 0 18Z" fill="#009246" />
          <path d="M36 18a18 18 0 0 1-12 16.97V1.03A18 18 0 0 1 36 18Z" fill="#CE2B37" />
        </svg>
      );
    default:
      return null;
  }
}
