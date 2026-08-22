"""
Build script: generates public/premiums_2026.json and public/npa_to_region.json
DIRECTLY from the real official OFSP data files in data/ — no network calls,
no invented insurers, no guessed postal-code regions.

Run with: python3 scripts/build_public_data.py
"""
import csv, json, os, gzip
from io import StringIO

BASE = os.path.join(os.path.dirname(__file__), '..')
DATA = os.path.join(BASE, 'data')
PUBLIC = os.path.join(BASE, 'public')
DIST = os.path.join(BASE, 'dist')

NUMERIC_TO_SLUG = {
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
    '1568': 'sana24',
}

AGE_MAP = {'AKL-KIN': 'child', 'AKL-JUG': 'young', 'AKL-ERW': 'adult'}
MODEL_MAP = {'TAR-BASE': 'standard', 'TAR-HAM': 'family', 'TAR-HMO': 'hmo', 'TAR-DIV': 'telemed'}
ACCIDENT_MAP = {'MIT-UNF': True, 'OHN-UNF': False}

# ---------- 1. premiums_2026.json ----------
db = {}
csv_path = os.path.join(DATA, 'premiums_2026.csv')
gz_path = os.path.join(DATA, 'premiums_2026.csv.gz')

if os.path.exists(csv_path):
    f_in = open(csv_path, encoding='utf-8')
elif os.path.exists(gz_path):
    f_in = gzip.open(gz_path, 'rt', encoding='utf-8')
else:
    raise FileNotFoundError("Neither premiums_2026.csv nor premiums_2026.csv.gz found in data/")

with f_in as f:
    reader = csv.reader(f)
    headers = next(reader)
    n = 0
    skipped = 0
    for row in reader:
        if not row or len(row) < 14:
            continue
        jahr = row[3].strip() if len(row) > 3 else '2026'
        if jahr != '2026':
            continue
        n += 1
        versicherer = row[0].strip()
        canton = row[1].strip().upper()
        raw_reg = row[5].strip()
        akl = row[6].strip()
        unfall = row[7].strip()
        tariftyp = row[9].strip()
        franchise_str = row[12].strip()
        praemie_str = row[13].strip()
        model_name = row[16].strip() if len(row) > 16 else ''

        age = AGE_MAP.get(akl)
        model = MODEL_MAP.get(tariftyp)
        accident = ACCIDENT_MAP.get(unfall)
        if age is None or model is None or accident is None:
            skipped += 1
            continue

        if not franchise_str.startswith('FRA-'):
            skipped += 1
            continue

        try:
            deductible = int(franchise_str.replace('FRA-', ''))
            premium = float(praemie_str)
        except ValueError:
            skipped += 1
            continue

        # Clean region code format
        if raw_reg.startswith('PR-REG CHPR-REG CH'):
            region = raw_reg.replace('PR-REG CHPR-REG CH', 'PR-REG CH')
        elif not raw_reg.startswith('PR-REG CH'):
            region = f"PR-REG CH{raw_reg}"
        else:
            region = raw_reg

        entry = {"premium": premium, "modelName": model_name}

        # Numeric key
        key1 = f"{versicherer}_{canton}_{region}_{age}_{deductible}_{model}_{str(accident).lower()}"
        if key1 not in db or premium < db[key1]['premium']:
            db[key1] = entry

        # Slug key
        slug = NUMERIC_TO_SLUG.get(versicherer)
        if slug:
            key2 = f"{slug}_{canton}_{region}_{age}_{deductible}_{model}_{str(accident).lower()}"
            if key2 not in db or premium < db[key2]['premium']:
                db[key2] = entry

print(f"[premiums] read {n} rows, skipped {skipped} unmappable rows, wrote {len(db)} unique keys")

with open(os.path.join(PUBLIC, 'premiums_2026.json'), 'w', encoding='utf-8') as f:
    json.dump(db, f, ensure_ascii=False)

with open(os.path.join(BASE, 'premiums_2026.json'), 'w', encoding='utf-8') as f:
    json.dump(db, f, ensure_ascii=False)

if os.path.exists(DIST):
    with open(os.path.join(DIST, 'premiums_2026.json'), 'w', encoding='utf-8') as f:
        json.dump(db, f, ensure_ascii=False)

# ---------- 2. npa_to_region.json ----------
npa_map = {}
npa_csv = os.path.join(DATA, 'npa_to_region_2026.csv')
if os.path.exists(npa_csv):
    with open(npa_csv, encoding='utf-8') as f:
        reader = csv.DictReader(f)
        n2 = 0
        for row in reader:
            n2 += 1
            npa = row['npa'].strip()
            entry = {
                "locality": row['locality'],
                "canton": row['canton'],
                "premium_region": row['premium_region'],
                "premium_region_code": f"PR-REG CH{row['premium_region']}",
                "bfs_number": row['bfs_number'],
                "commune": row['commune'],
                "npa_spans_multiple_regions_flag": int(row['npa_spans_multiple_regions_flag'] or 0),
            }
            npa_map.setdefault(npa, []).append(entry)

    print(f"[npa] read {n2} rows, {len(npa_map)} distinct NPA")

    with open(os.path.join(PUBLIC, 'npa_to_region.json'), 'w', encoding='utf-8') as f:
        json.dump(npa_map, f, ensure_ascii=False)

print("Done. public/premiums_2026.json and public/npa_to_region.json regenerated from real OFSP data only.")
