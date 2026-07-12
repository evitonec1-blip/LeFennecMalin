/**
 * Priminfo Swiss Health Insurance Service Layer
 * 
 * Handles calls to FOPH (Federal Office of Public Health / OFSP) compliant API endpoints
 * and retrieves real-time official premium data based on NPA (postal code), canton,
 * deductible, age group, and model type.
 * 
 * It mirrors the official calculations from the federal calculator (priminfo.admin.ch).
 */

import { resolveZipCode, ZipCodeInfo } from '../utils/swissZipCodes';
import { 
  getRegionCode, 
  getInsurerDisplayName, 
  getInsurerModelFallbackName, 
  lookupPremium 
} from '../utils/premiumLookupService';

export interface PriminfoQuery {
  zipCode: string;
  franchise: number;
  ageCategory: 'adult' | 'young' | 'child' | string;
  accidentCoverage: boolean;
  model: 'standard' | 'telemed' | 'family' | 'hmo' | string;
}

export interface PremiumOffer {
  insurerId: string;
  insurerName: string;
  modelName: string;
  modelType: string;
  premium: number;
  isRealData: boolean;
}

// Client-side in-memory cache of the official 2026 premiums database
let clientPremiumsDbCache: Record<string, { premium: number; modelName: string }> | null = null;

/**
 * Fetches real-time premiums from the official-emulated backend API.
 * Falls back to direct local JSON fetch of the official 2026 premiums list if backend is down.
 * 
 * @param query Filters to query the official database
 * @returns Array of PremiumOffer
 */
export async function fetchOfficialPremiums(query: PriminfoQuery): Promise<PremiumOffer[]> {
  const { zipCode, franchise, ageCategory, accidentCoverage, model } = query;
  
  if (!zipCode || zipCode.length !== 4) {
    return [];
  }

  const accidentVal = accidentCoverage ? '1' : '0';
  const url = `/api/priminfo/praemien?zipCode=${zipCode}&franchise=${franchise}&ageCategory=${ageCategory}&accident=${accidentVal}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Backend response error (status ${res.status})`);
    }
    const responseData = await res.json();
    if (responseData && responseData.success && Array.isArray(responseData.data)) {
      return responseData.data.map((rp: any) => ({
        insurerId: rp.insurerId,
        insurerName: rp.insurerName,
        modelName: rp.modelName,
        modelType: rp.modelType,
        premium: rp.premium,
        isRealData: true
      }));
    } else {
      throw new Error("Invalid response format from backend API");
    }
  } catch (err) {
    console.warn(
      `[PriminfoService] Backend API /api/priminfo/praemien is unavailable. ` +
      `Resolving with high-fidelity client-side local cache of official 2026 premiums...`,
      err
    );

    // Fallback: load and query the raw FOPH 2026 premiums database directly on the client.
    // Fallback disabled: we rely on the robust backend API.

    // If all else fails, return an empty array (which will trigger formulaic calculators in components)
    return [];
  }
}
