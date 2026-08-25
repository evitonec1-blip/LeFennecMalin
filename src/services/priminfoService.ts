/**
 * Priminfo Swiss Health Insurance Service Layer
 * 
 * Handles calls to FOPH (Federal Office of Public Health / OFSP) compliant API endpoints
 * and retrieves real-time official premium data based on NPA (postal code), canton,
 * deductible, age group, and model type.
 * 
 * It mirrors the official calculations from the federal calculator (priminfo.admin.ch).
 */

import { 
  getInsurerDisplayName, 
  getInsurerModelFallbackName, 
  translateModelNameToFrench,
  lookupPremium,
  getRegionCode,
  ACTIVE_INSURER_IDS
} from '../utils/premiumLookupService';
import { resolveZipCode } from '../utils/swissZipCodes';

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
  const cleanNpa = npa.trim();
  try {
    const res = await fetch(`/api/priminfo/npa-lookup?npa=${encodeURIComponent(cleanNpa)}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.success) return data;
    }
  } catch (err) {
    console.error('[PriminfoService] NPA lookup error:', err);
  }

  // Robust client-side fallback
  const zipInfo = resolveZipCode(cleanNpa);
  if (zipInfo) {
    return {
      success: true,
      ambiguous: false,
      npa: zipInfo.zip,
      locality: zipInfo.city,
      canton: zipInfo.canton,
      premium_region: String(zipInfo.zone),
      premium_region_code: getRegionCode(zipInfo.canton, zipInfo.zone)
    };
  }
  return null;
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
  if (clientPremiumsDbCache && Object.keys(clientPremiumsDbCache).length > 0) {
    return clientPremiumsDbCache;
  }
  try {
    const res = await fetch("/premiums_2026.json", {
      headers: { "Accept": "application/json" },
      cache: "default"
    });
    if (!res.ok) {
      console.warn(`[PriminfoService] premiums_2026.json status: ${res.status}`);
      return {};
    }
    const text = await res.text();
    if (!text || !text.trim().startsWith('{')) {
      console.warn(`[PriminfoService] premiums_2026.json returned invalid or non-JSON content (length: ${text?.length || 0})`);
      return {};
    }
    const data = JSON.parse(text);
    clientPremiumsDbCache = data;
    return data;
  } catch (err) {
    console.error("[PriminfoService] Error loading local client-side JSON cache:", err);
    return {};
  }
}

export interface NpaRegionEntry {
  locality: string;
  canton: string;
  premium_region: string;
  premium_region_code: string;
  bfs_number: string;
  commune: string;
  npa_spans_multiple_regions_flag: number;
}

let clientNpaMapCache: Record<string, NpaRegionEntry[]> | null = null;

async function getClientNpaMap(): Promise<Record<string, NpaRegionEntry[]>> {
  if (clientNpaMapCache && Object.keys(clientNpaMapCache).length > 0) return clientNpaMapCache;
  try {
    const res = await fetch('/npa_to_region.json', {
      headers: { "Accept": "application/json" },
      cache: "default"
    });
    if (!res.ok) {
      console.warn(`[PriminfoService] npa_to_region.json status: ${res.status}`);
      return {};
    }
    const text = await res.text();
    if (!text || !text.trim().startsWith('{')) {
      console.warn(`[PriminfoService] npa_to_region.json returned invalid or non-JSON content`);
      return {};
    }
    clientNpaMapCache = JSON.parse(text);
    return clientNpaMapCache || {};
  } catch (err) {
    console.error("[PriminfoService] Failed to load npa_to_region.json:", err);
    return {};
  }
}

/**
 * Queries the local high-fidelity client-side JSON database.
 * Resolves NPA -> canton/region using the REAL official OFSP mapping
 * (npa_to_region.json), not a guessed ZIP-range heuristic. If the NPA
 * is genuinely absent from the official file, returns no results rather
 * than fabricating a canton/region.
 */
async function queryLocalCache(query: PriminfoQuery): Promise<PremiumOffer[]> {
  const { zipCode, franchise, ageCategory, accidentCoverage, locality } = query;

  let canton: string = '';
  let region: string = '';

  try {
    const npaMap = await getClientNpaMap();
    const cleanNpa = zipCode.trim();
    const entries = npaMap[cleanNpa];
    if (entries && entries.length > 0) {
      let matched = entries[0];
      if (locality) {
        const found = entries.find(e => e.locality.toLowerCase() === locality.toLowerCase());
        if (found) matched = found;
      }
      canton = matched.canton;
      region = matched.premium_region_code || `PR-REG CH${matched.premium_region}`;
    } else {
      const fallback = resolveZipCode(cleanNpa);
      if (fallback) {
        canton = fallback.canton;
        region = getRegionCode(fallback.canton, fallback.zone);
      }
    }
  } catch (err) {
    console.error("[PriminfoService] Failed to resolve NPA via official mapping:", err);
    const fallback = resolveZipCode(zipCode.trim());
    if (fallback) {
      canton = fallback.canton;
      region = getRegionCode(fallback.canton, fallback.zone);
    }
  }

  if (!canton || !region) {
    console.warn(`[PriminfoService] NPA ${zipCode} could not be resolved to any canton/region.`);
    return [];
  }

  const modelTypes: ('standard' | 'family' | 'hmo' | 'telemed')[] = [
    'standard', 'family', 'hmo', 'telemed'
  ];

  try {
    const db = await getClientPremiumsDb();
    const results: PremiumOffer[] = [];

    for (const insurerId of ACTIVE_INSURER_IDS) {
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
            modelName: translateModelNameToFrench(record.modelName || getInsurerModelFallbackName(insurerId, modelType), modelType),
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
