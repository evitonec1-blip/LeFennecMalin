/**
 * Builds public/premiums_2027.json, public/premiums_2026.json and public/npa_to_region.json
 * from the REAL official OFSP/BAG data files committed in data/.
 *
 * This script runs automatically via `npm install` (postinstall) and `npm run build`.
 */
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const DATA_DIR = path.join(process.cwd(), 'data');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

const AGE_MAP = {
  // 2026 codes
  'AKL-KIN': 'child',
  'AKL-JUG': 'young',
  'AKL-ERW': 'adult',
  // 2027 official BAG/OFSP codes
  'AKA_01_KIN': 'child',
  'AKA_02_JUG': 'young',
  'AKA_03_ERW': 'adult'
};

const MODEL_MAP = {
  // 2026 codes
  'TAR-BASE': 'standard',
  'TAR-HAM': 'family',
  'TAR-HMO': 'hmo',
  'TAR-DIV': 'telemed',
  // 2027 official BAG/OFSP codes
  'BASE': 'standard',
  'PRAXIS': 'family',
  'TEL_DIG': 'telemed',
  'FLEX': 'hmo'
};

const ACCIDENT_MAP = {
  // 2026 codes
  'MIT-UNF': true,
  'OHN-UNF': false,
  // 2027 official BAG/OFSP codes
  'MIT_UNF': true,
  'OHN_UNF': false
};

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter(l => l.length > 0);
  if (lines.length === 0) return [];
  const headers = lines[0].replace(/^\uFEFF/, '').split(',').map(h => h.trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cells = lines[i].split(',');
    const row = {};
    headers.forEach((h, idx) => { row[h] = cells[idx] ? cells[idx].trim() : ''; });
    rows.push(row);
  }
  return rows;
}

function isJsonValid(filePath, minSize = 10000) {
  if (!fs.existsSync(filePath)) return false;
  if (fs.statSync(filePath).size < minSize) return false;
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    JSON.parse(raw);
    return true;
  } catch {
    return false;
  }
}

function normalizeRegion(raw) {
  if (!raw) return 'PR-REG CH0';
  const clean = raw.trim();
  if (clean.startsWith('PR-REG CH')) return clean;
  const match = clean.match(/(\d+)/);
  if (match) {
    return `PR-REG CH${match[1]}`;
  }
  return clean;
}

function parseDeductible(row) {
  if (row.deductible_chf !== undefined && row.deductible_chf !== '') {
    return parseInt(row.deductible_chf, 10);
  }
  const franchiseRaw = row.Franchise || row.franchise || '';
  const match = franchiseRaw.match(/(\d+)$/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return NaN;
}

function parseRow(row) {
  const ageRaw = row.Altersklasse || row.age_class_code;
  const modelRaw = row.Tariftyp || row.tariff_type_code;
  const accidentRaw = row.Unfalleinschluss || row.accident_inclusion_code;

  let age = AGE_MAP[ageRaw];
  if (!age && ageRaw) {
    if (ageRaw.includes('KIN')) age = 'child';
    else if (ageRaw.includes('JUG')) age = 'young';
    else if (ageRaw.includes('ERW')) age = 'adult';
  }

  let model = MODEL_MAP[modelRaw];
  if (!model && modelRaw) {
    const m = modelRaw.toUpperCase();
    if (m === 'BASE') model = 'standard';
    else if (m === 'PRAXIS') model = 'family';
    else if (m === 'TEL_DIG') model = 'telemed';
    else if (m === 'FLEX') model = 'hmo';
  }

  let accident = ACCIDENT_MAP[accidentRaw];
  if (accident === undefined && accidentRaw) {
    if (accidentRaw.includes('MIT')) accident = true;
    else if (accidentRaw.includes('OHN')) accident = false;
  }

  if (age === undefined || model === undefined || accident === undefined) {
    return null;
  }

  const insurer = (row.Versicherer || row.insurer_code || '').trim();
  const canton = (row.Kanton || row.canton_code || '').trim().toUpperCase();
  const region = normalizeRegion(row.Region || row.premium_region_code);
  const deductible = parseDeductible(row);
  const premiumRaw = row['Prämie'] || row.monthly_premium_chf || '';
  const premium = parseFloat(premiumRaw);
  const modelName = (row.Tarifbezeichnung || row.tariff_name_raw || '').trim();

  if (!insurer || !canton || !region || isNaN(deductible) || isNaN(premium)) {
    return null;
  }

  const key = `${insurer}_${canton}_${region}_${age}_${deductible}_${model}_${accident}`;
  return { key, premium, modelName };
}

function buildPremiumsForYear(year) {
  const csvPath = path.join(DATA_DIR, `premiums_${year}.csv`);
  const gzPath = path.join(DATA_DIR, `premiums_${year}.csv.gz`);
  const jsonPath = path.join(PUBLIC_DIR, `premiums_${year}.json`);
  const rootJsonPath = path.join(process.cwd(), `premiums_${year}.json`);

  let text = '';
  if (isJsonValid(jsonPath, 100000)) {
    console.log(`[download-premiums] public/premiums_${year}.json is already valid, skipping CSV parse.`);
    if (!isJsonValid(rootJsonPath, 100000)) {
      fs.copyFileSync(jsonPath, rootJsonPath);
    }
    return;
  } else if (fs.existsSync(csvPath)) {
    console.log(`[download-premiums] Reading data/premiums_${year}.csv...`);
    text = fs.readFileSync(csvPath, 'utf-8');
  } else if (fs.existsSync(gzPath)) {
    console.log(`[download-premiums] Decompressing data/premiums_${year}.csv.gz...`);
    const buffer = fs.readFileSync(gzPath);
    text = zlib.gunzipSync(buffer).toString('utf-8');
  } else {
    console.warn(`[download-premiums] No data file found for year ${year}.`);
    return;
  }

  const rows = parseCsv(text);
  const db = {};
  let skipped = 0;

  for (const row of rows) {
    const parsed = parseRow(row);
    if (!parsed) {
      skipped++;
      continue;
    }
    const { key, premium, modelName } = parsed;
    if (!db[key] || premium < db[key].premium) {
      db[key] = { premium, modelName };
    }
  }

  console.log(`[download-premiums] [${year}] Parsed ${rows.length} rows, skipped ${skipped}, wrote ${Object.keys(db).length} unique keys.`);

  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  const serialized = JSON.stringify(db);
  fs.writeFileSync(jsonPath, serialized);
  fs.writeFileSync(rootJsonPath, serialized);

  const distDir = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, `premiums_${year}.json`), serialized);
  }
  console.log(`[download-premiums] Wrote public/premiums_${year}.json (${(fs.statSync(jsonPath).size / 1024 / 1024).toFixed(2)} MB)`);
}

function buildNpaMap() {
  const csvPath = fs.existsSync(path.join(DATA_DIR, 'npa_to_region_2027.csv'))
    ? path.join(DATA_DIR, 'npa_to_region_2027.csv')
    : path.join(DATA_DIR, 'npa_to_region_2026.csv');
  const gzPath = path.join(DATA_DIR, 'npa_to_region_2026.csv.gz');
  const jsonPath = path.join(PUBLIC_DIR, 'npa_to_region.json');

  let text = '';
  if (isJsonValid(jsonPath, 1000)) {
    console.log('[download-premiums] public/npa_to_region.json is valid, skipping NPA build.');
    return;
  } else if (fs.existsSync(csvPath)) {
    text = fs.readFileSync(csvPath, 'utf-8');
  } else if (fs.existsSync(gzPath)) {
    console.log('[download-premiums] Decompressing NPA data gz...');
    const buffer = fs.readFileSync(gzPath);
    text = zlib.gunzipSync(buffer).toString('utf-8');
  } else {
    throw new Error('Missing source files for NPA map.');
  }

  const rows = parseCsv(text);
  const npaMap = {};
  for (const row of rows) {
    const npa = (row.npa || '').trim();
    if (!npa) continue;
    const entry = {
      locality: row.locality,
      canton: row.canton,
      premium_region: row.premium_region,
      premium_region_code: `PR-REG CH${row.premium_region}`,
      bfs_number: row.bfs_number,
      commune: row.commune,
      npa_spans_multiple_regions_flag: parseInt(row.npa_spans_multiple_regions_flag || '0', 10),
    };
    if (!npaMap[npa]) npaMap[npa] = [];
    npaMap[npa].push(entry);
  }

  console.log(`[download-premiums] Parsed ${rows.length} NPA rows, ${Object.keys(npaMap).length} distinct postal codes.`);
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  fs.writeFileSync(jsonPath, JSON.stringify(npaMap));
  console.log('[download-premiums] Wrote public/npa_to_region.json');
}

try {
  buildPremiumsForYear(2027);
  buildPremiumsForYear(2026);
  buildNpaMap();
  console.log('[download-premiums] Done — official 2027 & 2026 premium databases successfully generated.');
} catch (err) {
  console.warn('[download-premiums] Warning during premiums build:', err.message);
}
