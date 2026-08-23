/**
 * Builds public/premiums_2026.json and public/npa_to_region.json
 * from the REAL official OFSP data files already committed in data/.
 *
 * IMPORTANT: this script does NOT download anything and does NOT invent any
 * insurer mapping. It reads data/premiums_2026.csv, data/insurers_2026.json
 * and data/npa_to_region_2026.csv exactly as generated from the official
 * priminfo.admin.ch / opendata.swiss files, and only reformats them into
 * the lookup-key format the app expects. If you need to refresh the source
 * data (e.g. next year's premiums), replace the files in data/ with fresh
 * downloads from priminfo.admin.ch — do not hand-edit insurer mappings here.
 *
 * This script runs automatically via `npm install` (postinstall) and `npm run build`.
 */
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const DATA_DIR = path.join(process.cwd(), 'data');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

const AGE_MAP = { 'AKL-KIN': 'child', 'AKL-JUG': 'young', 'AKL-ERW': 'adult' };
const MODEL_MAP = { 'TAR-BASE': 'standard', 'TAR-HAM': 'family', 'TAR-HMO': 'hmo', 'TAR-DIV': 'telemed' };
const ACCIDENT_MAP = { 'MIT-UNF': true, 'OHN-UNF': false };

function parseCsv(text) {
  // Simple CSV parser: handles quoted fields, \r\n line endings, no embedded newlines in fields.
  const lines = text.split(/\r?\n/).filter(l => l.length > 0);
  const headers = lines[0].split(',');
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cells = lines[i].split(',');
    const row = {};
    headers.forEach((h, idx) => { row[h] = cells[idx]; });
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

function buildPremiums() {
  const csvPath = path.join(DATA_DIR, 'premiums_2026.csv');
  const gzPath = path.join(DATA_DIR, 'premiums_2026.csv.gz');
  const jsonPath = path.join(PUBLIC_DIR, 'premiums_2026.json');
  const rootJsonPath = path.join(process.cwd(), 'premiums_2026.json');
  let text = '';

  if (isJsonValid(jsonPath, 100000)) {
    console.log('[download-premiums] public/premiums_2026.json is already valid, skipping CSV parse.');
    if (!isJsonValid(rootJsonPath, 100000)) {
      fs.copyFileSync(jsonPath, rootJsonPath);
    }
    return;
  } else if (fs.existsSync(csvPath)) {
    text = fs.readFileSync(csvPath, 'utf-8');
  } else if (fs.existsSync(gzPath)) {
    console.log('[download-premiums] Decompressing data/premiums_2026.csv.gz...');
    const buffer = fs.readFileSync(gzPath);
    text = zlib.gunzipSync(buffer).toString('utf-8');
  } else {
    throw new Error(`Missing source files: checked data/premiums_2026.csv, data/premiums_2026.csv.gz, and public/premiums_2026.json.`);
  }

  const rows = parseCsv(text);

  const db = {};
  let skipped = 0;
  for (const row of rows) {
    const age = AGE_MAP[row.age_class_code];
    const model = MODEL_MAP[row.tariff_type_code];
    const accident = ACCIDENT_MAP[row.accident_inclusion_code];
    if (age === undefined || model === undefined || accident === undefined) { skipped++; continue; }

    const insurer = (row.insurer_code || '').trim();
    const canton = (row.canton_code || '').trim().toUpperCase();
    const region = (row.premium_region_code || '').trim();
    const deductible = parseInt(row.deductible_chf, 10);
    const premium = parseFloat(row.monthly_premium_chf);
    if (!insurer || !canton || !region || isNaN(deductible) || isNaN(premium)) { skipped++; continue; }

    const key = `${insurer}_${canton}_${region}_${age}_${deductible}_${model}_${accident}`;
    if (!db[key] || premium < db[key].premium) {
      db[key] = { premium, modelName: row.tariff_name_raw || '' };
    }
  }

  console.log(`[download-premiums] Parsed ${rows.length} rows, skipped ${skipped}, wrote ${Object.keys(db).length} unique keys.`);

  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  const serialized = JSON.stringify(db);
  fs.writeFileSync(jsonPath, serialized);
  fs.writeFileSync(rootJsonPath, serialized);
  const distDir = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'premiums_2026.json'), serialized);
  }
  console.log(`[download-premiums] Wrote public/premiums_2026.json (${(fs.statSync(jsonPath).size / 1024 / 1024).toFixed(2)} MB)`);
}

function buildNpaMap() {
  const csvPath = path.join(DATA_DIR, 'npa_to_region_2026.csv');
  const gzPath = path.join(DATA_DIR, 'npa_to_region_2026.csv.gz');
  const jsonPath = path.join(PUBLIC_DIR, 'npa_to_region.json');
  let text = '';

  if (isJsonValid(jsonPath, 1000)) {
    console.log('[download-premiums] public/npa_to_region.json is valid, skipping NPA build.');
    return;
  } else if (fs.existsSync(csvPath)) {
    text = fs.readFileSync(csvPath, 'utf-8');
  } else if (fs.existsSync(gzPath)) {
    console.log('[download-premiums] Decompressing data/npa_to_region_2026.csv.gz...');
    const buffer = fs.readFileSync(gzPath);
    text = zlib.gunzipSync(buffer).toString('utf-8');
  } else {
    throw new Error(`Missing source files for NPA: checked data/npa_to_region_2026.csv, data/npa_to_region_2026.csv.gz, and public/npa_to_region.json.`);
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
  console.log(`[download-premiums] Wrote public/npa_to_region.json`);
}

try {
  buildPremiums();
  buildNpaMap();
  console.log('[download-premiums] Done — data built entirely from local official OFSP files, no network calls, no invented insurers.');
} catch (err) {
  console.error('[download-premiums] Fatal error:', err.message);
  process.exit(1);
}
