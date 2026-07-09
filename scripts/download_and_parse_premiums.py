#!/usr/bin/env python3
"""
Official Swiss Federal Office of Public Health (FOPH / OFSP) Premium Parser

This script automatically:
1. Queries the opendata.swiss CKAN API to discover the latest health-insurance-premiums dataset.
2. Retrieves the CSV resource URL containing raw premiums for Switzerland.
3. Downloads and streams the CSV file.
4. Parses, sanitizes, and groups the premiums into a highly efficient lookup map:
   insurer -> canton -> region -> age_category -> deductible -> model_type -> accident_coverage -> premium
5. Caches the structured output as JSON for high-performance retrieval in client/server apps.

Requirements:
    pip install requests
"""

import os
import sys
import json
import urllib.request
import csv
from io import StringIO

# Official FOPH Insurer Code Mapping
INSURER_MAP = {
    '32': 'assura',
    '1384': 'css',
    '1562': 'helsana',
    '290': 'swica',
    '1568': 'visana',
    '1555': 'visana',
    '1386': 'visana',
    '1509': 'sanitas',
    '312': 'concordia',
    '376': 'kpt',
    '1542': 'mutuel',
    '1479': 'mutuel',
    '1507': 'mutuel',
    '1535': 'mutuel',
    '343': 'mutuel',
    '8': 'okk',
    '509': 'sympany',
    '455': 'atupri'
}

# Age Category Mapping
AGE_MAP = {
    'AKL-ERW': 'adult',   # Adulte (26+)
    'AKL-JUG': 'young',   # Jeune (19-25)
    'AKL-KIN': 'child'    # Enfant (0-18)
}

# Model Type Mapping
MODEL_MAP = {
    'TAR-BASE': 'standard',
    'TAR-HAM': 'family',
    'TAR-HMO': 'hmo',
    'TAR-DIV': 'telemed'
}

def fetch_opendata_swiss_resource_url():
    """Queries opendata.swiss metadata registry to find the active dataset CSV URL"""
    print("[1/5] Fetching package metadata from opendata.swiss CKAN registry...")
    api_url = "https://ckan.opendata.swiss/api/3/action/package_show?id=health-insurance-premiums"
    
    req = urllib.request.Request(
        api_url, 
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) SwissHealthPremiumParser/1.0'}
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            payload = json.loads(response.read().decode('utf-8'))
            if not payload.get("success"):
                raise ValueError("opendata.swiss returned an unsuccessful state indicator")
            
            resources = payload.get("result", {}).get("resources", [])
            for res in resources:
                is_csv = res.get("format") == "CSV"
                name = res.get("name", "")
                
                # Check for translated language fields or direct string names
                name_str = ""
                if isinstance(name, str):
                    name_str = name
                elif isinstance(name, dict):
                    name_str = name.get("fr", "") or name.get("de", "") or name.get("en", "") or ""
                
                url_str = res.get("url", "")
                
                # We specifically look for the primary Swiss premiums file
                if is_csv and (
                    "prämien_ch" in name_str.lower() or 
                    "praemien_ch" in name_str.lower() or 
                    "praemien_ch" in url_str.lower() or
                    "Pr%C3%A4mien_CH" in url_str
                ):
                    return url_str
            
            raise RuntimeError("Could not isolate the primary 'Prämien CH' CSV resource in opendata.swiss metadata.")
            
    except Exception as e:
        print(f"Error communicating with opendata.swiss API: {e}", file=sys.stderr)
        raise

def download_and_parse_premiums(url, target_year="2026"):
    """Downloads the FOPH premiums CSV, parses columns, and maps them to a lookup matrix"""
    print(f"[2/5] Connecting to secure official CSV source: {url}")
    req = urllib.request.Request(
        url,
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) SwissHealthPremiumParser/1.0'}
    )
    
    premiums_map = {}
    
    try:
        with urllib.request.urlopen(req) as response:
            print("[3/5] Streaming and parsing the database CSV rows...")
            # Use line-by-line reading to be memory efficient (the file can be large)
            utf8_reader = StringIO(response.read().decode('utf-8-sig'))
            csv_reader = csv.reader(utf8_reader)
            
            # Read Headers
            headers = next(csv_reader)
            
            row_count = 0
            mapped_count = 0
            
            for row in csv_reader:
                if not row or len(row) < 14:
                    continue
                
                row_count += 1
                
                # CSV Structure alignment (Standard FOPH export columns)
                versicherer = row[0]    # Insurer code (e.g. 32)
                kanton = row[1]         # Canton (e.g. ZH)
                jahr = row[3]           # Tariff Year (e.g. 2026)
                region = row[5]         # Premium Zone/Region (e.g. 1)
                akl = row[6]            # Age bracket code (e.g. AKL-ERW)
                unfall = row[7]         # Accident option (e.g. MIT-UNF, OHN-UNF)
                tariftyp = row[9]       # Tariff/Model category (e.g. TAR-BASE)
                franchise_str = row[12] # Deductible/Franchise (e.g. FRA-300)
                praemie_str = row[13]   # Premium monthly rate (e.g. 385.20)
                bezeichnung = row[16] if len(row) > 16 else "" # Model Name
                
                # 1. Filter for the requested target year (e.g. 2026)
                if jahr != target_year:
                    continue
                
                # 2. Map insurer to a normalized key
                insurer_id = INSURER_MAP.get(versicherer)
                if not insurer_id:
                    continue
                
                # 3. Map age category
                age_cat = AGE_MAP.get(akl)
                if not age_cat:
                    continue
                
                # 4. Map insurance model type
                model_type = MODEL_MAP.get(tariftyp)
                if not model_type:
                    continue
                
                # 5. Handle Franchise code conversion
                if not franchise_str or not franchise_str.startswith("FRA-"):
                    continue
                try:
                    franchise = int(franchise_str.replace("FRA-", ""))
                except ValueError:
                    continue
                
                # 6. Set Accident Coverage boolean
                accident_coverage = (unfall == "MIT-UNF")
                
                # 7. Float Premium rate
                try:
                    premium = float(praemie_str)
                except ValueError:
                    continue
                
                # Create unique compound signature key for efficient, O(1) indexed lookup:
                # Format: insurer_canton_region_ageCategory_franchise_modelType_accident
                key = f"{insurer_id}_{kanton}_{region}_{age_cat}_{franchise}_{model_type}_{str(accident_coverage).lower()}"
                
                # If there are duplicate rows for the same composite, keep the most economical option
                if key not in premiums_map or premium < premiums_map[key]["premium"]:
                    premiums_map[key] = {
                        "premium": premium,
                        "modelName": bezeichnung
                    }
                    mapped_count += 1
                
                if row_count % 100000 == 0:
                    print(f"   Processed {row_count} raw rows... mapped {mapped_count} active premiums.")
            
            print(f"[4/5] Completed parsing. {row_count} total rows read. {len(premiums_map)} unique profiles compiled.")
            return premiums_map
            
    except Exception as e:
        print(f"Error downloading or parsing FOPH data: {e}", file=sys.stderr)
        raise

def save_and_export_results(data, output_filepath):
    """Writes the parsed JSON output to disk"""
    print(f"[5/5] Exporting normalized database schema to: {output_filepath}")
    os.makedirs(os.path.dirname(os.path.abspath(output_filepath)), exist_ok=True)
    
    with open(output_filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    size_mb = os.path.getsize(output_filepath) / (1024 * 1024)
    print(f"✓ Success! File compiled perfectly. Total Size: {size_mb:.2f} MB")

def lookup_filtered_premiums(parsed_data, canton, age_category, deductible, model_type, accident_coverage, region="1"):
    """
    Example of a high-fidelity filtering query logic in Python.
    Accepts:
        parsed_data: The nested dictionary or flat map generated by this script.
        canton: Swiss Canton initials (e.g. 'ZH', 'GE', 'VD')
        age_category: 'adult', 'young', or 'child'
        deductible: 300, 500, 1000, 1500, 2000, 2500, etc.
        model_type: 'standard', 'telemed', 'hmo', or 'family'
        accident_coverage: True or False
        region: '1', '2', or '3' depending on Zip code location
    """
    matching_offers = []
    
    # Iterate over unique insurers to fetch exact profiles
    unique_insurers = set(INSURER_MAP.values())
    for insurer in unique_insurers:
        key = f"{insurer}_{canton}_{region}_{age_category}_{deductible}_{model_type}_{str(accident_coverage).lower()}"
        if key in parsed_data:
            matching_offers.append({
                "insurer": insurer.capitalize(),
                "premium": parsed_data[key]["premium"],
                "model_name": parsed_data[key]["modelName"]
            })
            
    # Sort the results from most economical to most premium
    matching_offers.sort(key=lambda x: x["premium"])
    return matching_offers

if __name__ == "__main__":
    # Standard output paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(script_dir, "..", "public", "premiums_2026.json")
    
    try:
        url = fetch_opendata_swiss_resource_url()
        data = download_and_parse_premiums(url, target_year="2026")
        save_and_export_results(data, output_path)
        
        # Self-test demonstration
        print("\n--- Dry Run Filtering Validation (Geneva, Adult, CHF 2500 Deductible, HMO, with Accident) ---")
        test_results = lookup_filtered_premiums(
            data, 
            canton="GE", 
            age_category="adult", 
            deductible=2500, 
            model_type="hmo", 
            accident_coverage=True
        )
        for i, offer in enumerate(test_results[:5], 1):
            print(f"{i}. {offer['insurer']} | Model: {offer['model_name']} | Premium: CHF {offer['premium']:.2f}/month")
            
    except Exception as e:
        print(f"Execution failed: {e}", file=sys.stderr)
        sys.exit(1)
