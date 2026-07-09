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
    try {
      if (!clientPremiumsDbCache) {
        const dbRes = await fetch('/premiums_2026.json');
        if (!dbRes.ok) {
          throw new Error(`Failed to load client-side FOPH premiums database (status ${dbRes.status})`);
        }
        clientPremiumsDbCache = await dbRes.json();
      }

      if (clientPremiumsDbCache) {
        const cleanZip = zipCode.trim();
        const zipInfo = resolveZipCode(cleanZip);
        if (!zipInfo) {
          throw new Error(`ZIP code ${cleanZip} is invalid or unsupported under Swiss regulation`);
        }

        const canton = zipInfo.canton;
        const zone = zipInfo.zone;
        const region = getRegionCode(canton, zone);

        const activeInsurers = [
          'assura', 'css', 'helsana', 'swica', 'visana', 
          'sanitas', 'concordia', 'kpt', 'mutuel', 'okk', 
          'sympany', 'atupri'
        ];

        const modelTypes: ('standard' | 'family' | 'hmo' | 'telemed')[] = [
          'standard', 'family', 'hmo', 'telemed'
        ];

        const results: PremiumOffer[] = [];

        for (const insurerId of activeInsurers) {
          for (const modelType of modelTypes) {
            const record = lookupPremium(clientPremiumsDbCache, {
              insurerId,
              canton,
              region,
              ageCategory,
              deductible: franchise,
              model: modelType,
              accidentCoverage
            });

            if (record) {
              results.push({
                insurerId,
                insurerName: getInsurerDisplayName(insurerId),
                modelName: record.modelName || getInsurerModelFallbackName(insurerId, modelType),
                modelType,
                premium: record.premium,
                isRealData: true
              });
            }
          }
        }

        return results;
      }
    } catch (fallbackErr) {
      console.error("[PriminfoService] Critical failure in client fallback lookup:", fallbackErr);
    }
    
    // If all else fails, return an empty array (which will trigger formulaic calculators in components)
    return [];
  }
}
