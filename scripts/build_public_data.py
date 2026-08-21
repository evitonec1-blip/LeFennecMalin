"""
Build script: generates public/premiums_2026.json and public/npa_to_region.json
DIRECTLY from the real official OFSP data files in data/ — no network calls,
no invented insurers, no guessed postal-code regions.

Run with: python3 scripts/build_public_data.py
"""
import csv, json, os

BASE = os.path.join(os.path.dirname(__file__), '..')
DATA = os.path.join(BASE, 'data')
PUBLIC = os.path.join(BASE, 'public')

AGE_MAP = {'AKL-KIN': 'child', 'AKL-JUG': 'young', 'AKL-ERW': 'adult'}
MODEL_MAP = {'TAR-BASE': 'standard', 'TAR-HAM': 'family', 'TAR-HMO': 'hmo', 'TAR-DIV': 'telemed'}
ACCIDENT_MAP = {'MIT-UNF': True, 'OHN-UNF': False}

# ---------- 1. premiums_2026.json ----------
db = {}
with open(os.path.join(DATA, 'premiums_2026.csv'), encoding='utf-8') as f:
    reader = csv.DictReader(f)
    n = 0
    skipped = 0
    for row in reader:
        n += 1
        age = AGE_MAP.get(row['age_class_code'])
        model = MODEL_MAP.get(row['tariff_type_code'])
        accident = ACCIDENT_MAP.get(row['accident_inclusion_code'])
        if age is None or model is None or accident is None:
            skipped += 1
            continue
        insurer = row['insurer_code'].strip()
        canton = row['canton_code'].strip().upper()
        raw_reg = row['premium_region_code'].strip()
        # Clean region code format
        if raw_reg.startswith('PR-REG CHPR-REG CH'):
            region = raw_reg.replace('PR-REG CHPR-REG CH', 'PR-REG CH')
        elif not raw_reg.startswith('PR-REG CH'):
            region = f"PR-REG CH{raw_reg}"
        else:
            region = raw_reg
        try:
            deductible = int(float(row['deductible_chf']))
            premium = float(row['monthly_premium_chf'])
        except ValueError:
            skipped += 1
            continue

        key = f"{insurer}_{canton}_{region}_{age}_{deductible}_{model}_{str(accident).lower()}"
        entry = {"premium": premium, "modelName": row['tariff_name_raw']}
        if key not in db or premium < db[key]['premium']:
            db[key] = entry

print(f"[premiums] read {n} rows, skipped {skipped} unmappable rows, wrote {len(db)} unique keys")

with open(os.path.join(PUBLIC, 'premiums_2026.json'), 'w', encoding='utf-8') as f:
    json.dump(db, f, ensure_ascii=False)

with open(os.path.join(BASE, 'premiums_2026.json'), 'w', encoding='utf-8') as f:
    json.dump(db, f, ensure_ascii=False)

# ---------- 2. npa_to_region.json ----------
npa_map = {}
with open(os.path.join(DATA, 'npa_to_region_2026.csv'), encoding='utf-8') as f:
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
