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
  yob?: number | string;
  accidentCoverage: boolean;
  model: 'standard' | 'telemed' | 'family' | 'hmo' | string;
  locality?: string;
  region?: string;
}

export interface NpaLookupResult {
  success: boolean;
  ambiguous: boolean;
  npa: string;
  message?: string;
  locality?: string;
  canton?: string;
  premium_region?: string;
  premium_region_code?: string;
  localities?: Array<{
    locality: string;
    canton: string;
    premium_region: string;
    premium_region_code: string;
    commune?: string;
  }>;
}

export async function fetchNpaInfo(npa: string): Promise<NpaLookupResult | null> {
  if (!npa || npa.trim().length !== 4) return null;
  try {
    const res = await fetch(`/api/priminfo/npa-lookup?npa=${encodeURIComponent(npa.trim())}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('[PriminfoService] NPA lookup error:', err);
    return null;
  }
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

// Circuit breaker state variables
let consecutiveFailures = 0;
let circuitBreakerLockedUntil = 0; // Timestamp (Date.now())
const FAILURE_THRESHOLD = 3;
const COOLDOWN_DURATION_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Fetches and caches the local 2026 premiums database on the client-side.
 */
async function getClientPremiumsDb(): Promise<Record<string, { premium: number; modelName: string }>> {
  if (clientPremiumsDbCache) {
    return clientPremiumsDbCache;
  }
  try {
    const res = await fetch("/premiums_2026.json");
    if (!res.ok) {
      throw new Error(`Failed to load premiums_2026.json (status ${res.status})`);
    }
    const data = await res.json();
    clientPremiumsDbCache = data;
    return data;
  } catch (err) {
    console.error("[PriminfoService] Error loading local client-side JSON cache:", err);
    throw err;
  }
}

/**
 * Queries the local high-fidelity client-side JSON database.
 */
async function queryLocalCache(query: PriminfoQuery): Promise<PremiumOffer[]> {
  const { zipCode, franchise, ageCategory, accidentCoverage } = query;
  const zipInfo = resolveZipCode(zipCode);
  if (!zipInfo) {
    return [];
  }
  const canton = zipInfo.canton;
  const zone = zipInfo.zone;
  const region = getRegionCode(canton, zone);

  const activeInsurers = [
    'okk', 'assura', 'glarner', 'waedenswil', 'aquilana', 'swica', 'concordia',
    'amb', 'einsiedeln', 'kpt', 'atupri', 'sympany', 'steffisburg', 'agrisano',
    'simplon', 'visperterminen', 'zeneggen', 'galenos', 'compact', 'sodalis',
    'luzernerhinterland', 'css', 'sana24', 'rhenusana', 'mutuel', 'easysana',
    'sanitas', 'philos', 'avenir', 'vivacare', 'moovesympany', 'progres',
    'visana', 'helsana'
  ];

  const modelTypes: ('standard' | 'family' | 'hmo' | 'telemed')[] = [
    'standard', 'family', 'hmo', 'telemed'
  ];

  try {
    const db = await getClientPremiumsDb();
    const results: PremiumOffer[] = [];

    for (const insurerId of activeInsurers) {
      for (const modelType of modelTypes) {
        const record = lookupPremium(db, {
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
  } catch (err) {
    console.error("[PriminfoService] Local cache query failed:", err);
    return [];
  }
}

/**
 * Fetches real-time premiums from the official-emulated backend API.
 * Falls back to direct local JSON fetch of the official 2026 premiums list if backend is down.
 * 
 * @param query Filters to query the official database
 * @returns Array of PremiumOffer
 */
async function fetchWithBackoff(url: string, retries = 3, delay = 500): Promise<Response> {

  try {

    const res = await fetch(url);

    if (!res.ok && res.status >= 500 && retries > 0) {

      console.warn(`[PriminfoService] Server error ${res.status}. Retrying in ${delay}ms...`);

      await new Promise(r => setTimeout(r, delay));

      return fetchWithBackoff(url, retries - 1, delay * 2);

    }

    return res;

  } catch (err) {

    if (retries > 0) {

      console.warn(`[PriminfoService] Network error. Retrying in ${delay}ms...`, err);

      await new Promise(r => setTimeout(r, delay));

      return fetchWithBackoff(url, retries - 1, delay * 2);

    }

    throw err;

  }

}

export async function fetchOfficialPremiums(query: PriminfoQuery): Promise<PremiumOffer[]> {
  const { zipCode, franchise, ageCategory, accidentCoverage } = query;
  
  if (!zipCode || zipCode.length !== 4) {
    return [];
  }

  // Check if circuit breaker is locked
  const now = Date.now();
  if (now < circuitBreakerLockedUntil) {
    const remainingSeconds = Math.ceil((circuitBreakerLockedUntil - now) / 1000);
    console.warn(
      `[PriminfoService] Circuit breaker is ACTIVE (locked due to consistent 500 errors). ` +
      `Bypassing network request. Remaining lock: ${remainingSeconds}s. ` +
      `Immediately falling back to local high-fidelity JSON cache...`
    );
    return queryLocalCache(query);
  }

  const accidentVal = accidentCoverage ? '1' : '0';
  const yobParam = query.yob ? `&yob=${query.yob}` : '';
  const modelParam = query.model ? `&model=${query.model}` : '';
  const locParam = query.locality ? `&locality=${encodeURIComponent(query.locality)}` : '';
  const regParam = query.region ? `&region=${encodeURIComponent(query.region)}` : '';
  const url = `/api/priminfo/praemien?zipCode=${zipCode}&franchise=${franchise}&ageCategory=${ageCategory}&accident=${accidentVal}${yobParam}${modelParam}${locParam}${regParam}`;

  try {
    const res = await fetchWithBackoff(url);
    if (!res.ok) {
      throw new Error(`Backend response error (status ${res.status})`);
    }
    const responseData = await res.json();
    if (responseData && responseData.success && Array.isArray(responseData.data)) {
      // Success! Reset consecutive failure counter
      consecutiveFailures = 0;
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
  } catch (err: any) {
    consecutiveFailures++;
    console.warn(
      `[PriminfoService] Backend API call failed (Consecutive failures: ${consecutiveFailures}/${FAILURE_THRESHOLD}). Error:`,
      err.message || err
    );

    if (consecutiveFailures >= FAILURE_THRESHOLD) {
      circuitBreakerLockedUntil = Date.now() + COOLDOWN_DURATION_MS;
      console.error(
        `[PriminfoService] Circuit breaker TRIPPED! 3 consecutive failures reached. ` +
        `Locking network API calls for 5 minutes (until ${new Date(circuitBreakerLockedUntil).toLocaleTimeString()}).`
      );
    }

    console.warn(`[PriminfoService] Falling back to high-fidelity client-side local JSON cache of 2026 premiums...`);
    return queryLocalCache(query);
  }
}
