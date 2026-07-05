/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppTab =
  | 'home'
  | 'health-comparator'
  | 'life-comparator'
  | 'about'
  | 'faq'
  | 'legal'
  | 'privacy';

export interface CaisseMaladie {
  id: string;
  name: string;
  rating: number; // Customer satisfaction rating out of 5
  ratingStars: number;
  logo: string; // Shorthand/placeholder or visual symbol
  basePrice: number; // Base price for Geneva, adult, franchise 2500, Standard model
  isPartner: boolean;
  notes: string;
}

export interface AssureurVie {
  id: string;
  name: string;
  rating: number;
  ratingStars: number;
  logo: string;
  isPartner: boolean;
  supportedTypes: ('3a' | '3b' | 'mixte' | 'deces')[];
  guarantees: string[];
  pros: string[];
}

export interface HealthFilterState {
  canton: string;
  ageCategory: 'adult' | 'young' | 'child';
  franchise: number;
  model: 'standard' | 'telemed' | 'family' | 'hmo';
  accidentCoverage: boolean;
  sortBy: 'price' | 'rating' | 'name';
}

export interface LifeFilterState {
  type: 'all' | '3a' | '3b' | 'deces' | 'mixte';
  profile: 'all' | 'young' | 'family' | 'senior' | 'independent';
  priority: 'all' | 'low-premium' | 'high-yield' | 'guaranteed' | 'tax-saving';
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  product: string;
}
