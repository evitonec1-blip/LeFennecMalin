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

const ACCIDENT_MAP = {
  // 2026 codes
  'MIT-UNF': true,
  'OHN-UNF': false,
  // 2027 official BAG/OFSP codes
  'MIT_UNF': true,
  'OHN_UNF': false
};

const INSURER_SLUGS = {
  '8': 'css',
  '32': 'aquilana',
  '134': 'einsiedeln',
  '194': 'sumiswalder',
  '246': 'steffisburg',
  '290': 'concordia',
  '312': 'atupri',
  '343': 'avenir',
  '360': 'luzernerhinterland',
  '376': 'kpt',
  '455': 'okk',
  '509': 'sympany',
  '780': 'glarner',
  '820': 'curaulta',
  '881': 'egk',
  '923': 'slkk',
  '941': 'sodalis',
  '966': 'surselva',
  '1040': 'visperterminen',
  '1113': 'entremont',
  '1318': 'waedenswil',
  '1322': 'birchmeier',
  '1384': 'swica',
  '1386': 'galenos',
  '1401': 'rhenusana',
  '1479': 'mutuel',
  '1507': 'amb',
  '1509': 'sanitas',
  '1535': 'philos',
  '1542': 'assura',
  '1555': 'visana',
  '1560': 'agrisano',
  '1562': 'helsana',
  '1568': 'sana24'
};

/**
 * Intelligent Swiss health model classifier.
 * Categorizes each tariff name into standard, family (Hausarzt), telemed, or hmo.
 */
function classifyModel(tariftyp, tarifbezeichnung) {
  const tClean = (tarifbezeichnung || '').trim().toLowerCase();
  const ttClean = (tariftyp || '').trim().toUpperCase();

  if (ttClean === 'BASE' || tClean.includes('grundversicherung') || tClean === 'base') {
    return 'standard';
  }

  // HMO models
  if (
    tClean.includes('hmo') ||
    tClean.includes('bestcare') ||
    tClean.includes('santé') ||
    tClean.includes('sante') ||
    tClean.includes('optimed') ||
    tClean.includes('ärztenetz') ||
    tClean.includes('aerztenetz') ||
    tClean.includes('multiaccess') ||
    tClean.includes('managed care') ||
    tClean.includes('gesundheitszentrum') ||
    tClean.includes('viva')
  ) {
    return 'hmo';
  }

  // Telemed models
  if (
    tClean.includes('telmed') ||
    tClean.includes('telemed') ||
    tClean.includes('callmed') ||
    tClean.includes('smartdoc') ||
    tClean.includes('smartcare') ||
    tClean.includes('telfirst') ||
    tClean.includes('sanatel') ||
    tClean.includes('premed') ||
    tClean.includes('flexcare') ||
    tClean.includes('primaflex') ||
    tClean.includes('med call') ||
    tClean.includes('tel care') ||
    tClean.includes('tel doc') ||
    tClean.includes('smartmed') ||
    tClean.includes('sanmed') ||
    tClean.includes('select') ||
    tClean.includes('flexhelp') ||
    tClean.includes('glarnermed') ||
    tClean.includes('meditel') ||
    tClean.includes('gesundheitnetz') ||
    tClean.includes('sumis24') ||
    tClean.includes('telcare')
  ) {
    return 'telemed';
  }

  // Family doctor models
  if (
    tClean.includes('hausarzt') ||
    tClean.includes('caremed') ||
    tClean.includes('mydoc') ||
    tClean.includes('primacare') ||
    tClean.includes('casa') ||
    tClean.includes('pharmed') ||
    tClean.includes('qualimed') ||
    tClean.includes('feminavita') ||
    tClean.includes('hausspital') ||
    tClean.includes('preventomed') ||
    tClean.includes('med direct') ||
    tClean.includes('regiomed') ||
    tClean.includes('sparmed') ||
    tClean.includes('homecare') ||
    tClean.includes('gesundheitspraxis') ||
    tClean.includes('multimed') ||
    tClean.includes('flexmed') ||
    tClean.includes('medica') ||
    tClean.includes('medpharm') ||
    tClean.includes('multichoice') ||
    tClean.includes('kptwin.doc') ||
    tClean.includes('kptwin.win')
  ) {
    return 'family';
  }

  // Fallbacks based on official Tariftyp
  if (ttClean === 'TEL_DIG' || ttClean === 'TAR-DIV') return 'telemed';
  if (ttClean === 'FLEX' || ttClean === 'TAR-HMO') return 'hmo';
  if (ttClean === 'PRAXIS' || ttClean === 'TAR-HAM') return 'family';
  return 'standard';
}

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
  const modelName = (row.Tarifbezeichnung || row.tariff_name_raw || '').trim();

  let age = AGE_MAP[ageRaw];
  if (!age && ageRaw) {
    if (ageRaw.includes('KIN')) age = 'child';
    else if (ageRaw.includes('JUG')) age = 'young';
    else if (ageRaw.includes('ERW')) age = 'adult';
  }

  const model = classifyModel(modelRaw, modelName);

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

  if (!insurer || !canton || !region || isNaN(deductible) || isNaN(premium)) {
    return null;
  }

  return { insurer, canton, region, age, deductible, model, accident, premium, modelName };
}

function buildPremiumsDatabase() {
  const gzPath27 = path.join(DATA_DIR, 'premiums_2027.csv.gz');
  const csvPath27 = path.join(DATA_DIR, 'premiums_2027.csv');

  let text = '';
  if (fs.existsSync(csvPath27)) {
    console.log('[download-premiums] Reading data/premiums_2027.csv...');
    text = fs.readFileSync(csvPath27, 'utf-8');
  } else if (fs.existsSync(gzPath27)) {
    console.log('[download-premiums] Decompressing data/premiums_2027.csv.gz...');
    const buffer = fs.readFileSync(gzPath27);
    text = zlib.gunzipSync(buffer).toString('utf-8');
  } else {
    throw new Error('data/premiums_2027.csv.gz not found.');
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
    const { insurer, canton, region, age, deductible, model, accident, premium, modelName } = parsed;

    // 1. Primary key with numeric insurer code: e.g. 8_VD_PR-REG CH1_adult_2500_telemed_true
    const key = `${insurer}_${canton}_${region}_${age}_${deductible}_${model}_${accident}`;
    if (!db[key] || premium < db[key].premium) {
      db[key] = { premium, modelName };
    }

    // 2. Also register with slug key if known: e.g. css_VD_PR-REG CH1_adult_2500_telemed_true
    const slug = INSURER_SLUGS[insurer];
    if (slug) {
      const slugKey = `${slug}_${canton}_${region}_${age}_${deductible}_${model}_${accident}`;
      if (!db[slugKey] || premium < db[slugKey].premium) {
        db[slugKey] = { premium, modelName };
      }
    }
  }

  console.log(`[download-premiums] Parsed ${rows.length} rows, skipped ${skipped}, generated ${Object.keys(db).length} keys (with dual code/slug index).`);

  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  const serialized = JSON.stringify(db);

  // Write to both 2027 and 2026 targets so all routes receive the new 2027 primes
  const targetPaths = [
    path.join(PUBLIC_DIR, 'premiums_2027.json'),
    path.join(PUBLIC_DIR, 'premiums_2026.json'),
    path.join(process.cwd(), 'premiums_2027.json'),
    path.join(process.cwd(), 'premiums_2026.json'),
  ];

  const distDir = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distDir)) {
    targetPaths.push(path.join(distDir, 'premiums_2027.json'));
    targetPaths.push(path.join(distDir, 'premiums_2026.json'));
  }

  for (const p of targetPaths) {
    fs.writeFileSync(p, serialized);
    console.log(`[download-premiums] Wrote ${p} (${(fs.statSync(p).size / 1024 / 1024).toFixed(2)} MB)`);
  }
}

function buildNpaMap() {
  const csvPath = fs.existsSync(path.join(DATA_DIR, 'npa_to_region_2027.csv'))
    ? path.join(DATA_DIR, 'npa_to_region_2027.csv')
    : path.join(DATA_DIR, 'npa_to_region_2026.csv');
  const gzPath = path.join(DATA_DIR, 'npa_to_region_2026.csv.gz');
  const jsonPath = path.join(PUBLIC_DIR, 'npa_to_region.json');

  let text = '';
  if (fs.existsSync(csvPath)) {
    text = fs.readFileSync(csvPath, 'utf-8');
  } else if (fs.existsSync(gzPath)) {
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
  buildPremiumsDatabase();
  buildNpaMap();
  console.log('[download-premiums] Done — official 2027 premium databases successfully generated.');
} catch (err) {
  console.error('[download-premiums] Error during premiums build:', err);
  process.exit(1);
}
