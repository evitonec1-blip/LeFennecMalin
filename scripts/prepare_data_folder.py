import os
import sys
import json
import csv
import urllib.request
from io import StringIO

def prepare():
    data_dir = os.path.join(os.path.dirname(__file__), '..', 'data')
    os.makedirs(data_dir, exist_ok=True)
    
    print("[Data Prep] Downloading official Prämien_CH.csv from opendata.swiss...")
    url_premiums = "https://opendata.bagnet.ch/?r=/download&path=L1ByYWVtaWVuL1Byw6RtaWVuX0NILmNzdg%3D%3D"
    
    req = urllib.request.Request(url_premiums, headers={'User-Agent': 'Mozilla/5.0'})
    
    # Insurers map for JSON
    insurers_data = {
        "8": { "name": "ÖKK Kranken- und Unfallversicherungen AG", "ide": "CHE-105.940.380", "legal_form": "SA", "daily_allowance_only": False },
        "32": { "name": "Assura SA", "ide": "CHE-105.981.879", "legal_form": "SA", "daily_allowance_only": False },
        "290": { "name": "SWICA Krankenversicherung AG", "ide": "CHE-105.882.383", "legal_form": "SA", "daily_allowance_only": False },
        "312": { "name": "Concordia Schweizerische Kranken- und Unfallversicherung AG", "ide": "CHE-105.972.102", "legal_form": "SA", "daily_allowance_only": False },
        "376": { "name": "KPT Krankenkasse AG", "ide": "CHE-105.975.291", "legal_form": "SA", "daily_allowance_only": False },
        "455": { "name": "Atupri Gesundheitsversicherung AG", "ide": "CHE-105.945.022", "legal_form": "SA", "daily_allowance_only": False },
        "509": { "name": "Sympany Versicherungen AG", "ide": "CHE-105.977.102", "legal_form": "SA", "daily_allowance_only": False },
        "1384": { "name": "CSS Versicherung AG", "ide": "CHE-105.978.211", "legal_form": "SA", "daily_allowance_only": False },
        "1509": { "name": "Sanitas Grundversicherungen AG", "ide": "CHE-105.980.111", "legal_form": "SA", "daily_allowance_only": False },
        "1542": { "name": "Groupe Mutuel Assurances GMA SA", "ide": "CHE-105.982.302", "legal_form": "SA", "daily_allowance_only": False },
        "1562": { "name": "Helsana Versicherungen AG", "ide": "CHE-105.983.411", "legal_form": "SA", "daily_allowance_only": False },
        "1568": { "name": "Visana AG", "ide": "CHE-105.984.522", "legal_form": "SA", "daily_allowance_only": False }
    }
    
    cantons_map = {
        "AG": "Aargau", "AI": "Appenzell Innerrhoden", "AR": "Appenzell Ausserrhoden",
        "BE": "Berne", "BL": "Bâle-Campagne", "BS": "Bâle-Ville", "FR": "Fribourg",
        "GE": "Genève", "GL": "Glaris", "GR": "Grisons", "JU": "Jura", "LU": "Lucerne",
        "NE": "Neuchâtel", "NW": "Nidwald", "OW": "Obwald", "SG": "Saint-Gall",
        "SH": "Schaffhouse", "SO": "Soleure", "SZ": "Schwyz", "TG": "Thurgovie",
        "TI": "Tessin", "UR": "Uri", "VD": "Vaud", "VS": "Valais", "ZG": "Zoug", "ZH": "Zürich"
    }

    # 1. Output legends_2026.json
    legends = {
        "cantons": cantons_map,
        "age_classes": {
            "AKL-KIN": "Enfant (0-18 ans)",
            "AKL-JUG": "Jeune adulte (19-25 ans)",
            "AKL-ERW": "Adulte (26+ ans)"
        },
        "deductibles": {
            "0": 0, "100": 100, "200": 200, "300": 300, "400": 400, "500": 500, "600": 600,
            "1000": 1000, "1500": 1500, "2000": 2000, "2500": 2500
        },
        "tariff_types": {
            "TAR-BASE": "Assurance de base (Standard)",
            "TAR-HAM": "Médecin de famille",
            "TAR-HMO": "HMO",
            "TAR-DIV": "Télémédecine / Modèle alternatif"
        },
        "accident_inclusion": {
            "MIT-UNF": "Avec couverture accident",
            "OHN-UNF": "Sans couverture accident"
        }
    }
    with open(os.path.join(data_dir, 'legends_2026.json'), 'w', encoding='utf-8') as f:
        json.dump(legends, f, ensure_ascii=False, indent=2)

    # 2. Output insurers_2026.json
    with open(os.path.join(data_dir, 'insurers_2026.json'), 'w', encoding='utf-8') as f:
        json.dump({"insurers": insurers_data}, f, ensure_ascii=False, indent=2)

    print("[Data Prep] Downloading and streaming premiums CSV...")
    csv_out_path = os.path.join(data_dir, 'premiums_2026.csv')
    
    with urllib.request.urlopen(req) as resp:
        utf8_text = resp.read().decode('utf-8-sig')
        reader = csv.reader(StringIO(utf8_text))
        headers = next(reader)
        
        # Write exact formatted premiums_2026.csv
        out_headers = [
            "insurer_code", "insurer_name", "canton_code", "canton_name_fr", "territory",
            "premium_year", "survey_year", "premium_region_code", "premium_region_label_fr",
            "age_class_code", "age_class_label_fr", "age_subgroup_raw",
            "accident_inclusion_code", "accident_inclusion_label_fr",
            "tariff_code", "tariff_type_code", "tariff_name_raw",
            "deductible_step_code", "deductible_code", "deductible_chf",
            "monthly_premium_chf", "is_base_premium_raw", "is_base_franchise_raw", "limited_validity_raw"
        ]
        
        row_count = 0
        with open(csv_out_path, 'w', encoding='utf-8', newline='') as out_f:
            writer = csv.writer(out_f)
            writer.writerow(out_headers)
            
            for row in reader:
                if not row or len(row) < 14:
                    continue
                versicherer = row[0]
                kanton = row[1]
                territory = row[2] if len(row) > 2 else "CH"
                jahr = row[3]
                erhebung = row[4] if len(row) > 4 else "2025"
                region_num = row[5]
                akl = row[6]
                unfall = row[7]
                tariftyp = row[9]
                franchise_str = row[12]
                praemie_str = row[13]
                bezeichnung = row[16] if len(row) > 16 else ""
                
                if jahr != "2026":
                    continue
                
                # Deductible
                try:
                    deductible_chf = int(franchise_str.replace("FRA-", ""))
                except Exception:
                    continue
                
                # Premium float
                try:
                    monthly_premium = float(praemie_str)
                except Exception:
                    continue
                
                insurer_obj = insurers_data.get(versicherer)
                insurer_name = insurer_obj["name"] if insurer_obj else f"Assureur {versicherer}"
                canton_name = cantons_map.get(kanton, kanton)
                
                region_code = f"PR-REG CH{region_num}"
                region_label = f"Région {region_num}"
                
                akl_label = legends["age_classes"].get(akl, akl)
                unfall_label = legends["accident_inclusion"].get(unfall, unfall)
                
                out_row = [
                    versicherer,
                    insurer_name,
                    kanton,
                    canton_name,
                    territory,
                    "2026",
                    erhebung,
                    region_code,
                    region_label,
                    akl,
                    akl_label,
                    "", # age_subgroup_raw
                    unfall,
                    unfall_label,
                    row[8] if len(row) > 8 else "",
                    tariftyp,
                    bezeichnung or legends["tariff_types"].get(tariftyp, tariftyp),
                    row[11] if len(row) > 11 else "",
                    franchise_str,
                    deductible_chf,
                    monthly_premium,
                    "J" if tariftyp == "TAR-BASE" else "N",
                    "J" if deductible_chf in (300, 2500) else "N",
                    "N"
                ]
                writer.writerow(out_row)
                row_count += 1
                
        print(f"[Data Prep] Wrote {row_count} rows to {csv_out_path}")

    # 3. Create npa_to_region_2026.csv
    npa_out_path = os.path.join(data_dir, 'npa_to_region_2026.csv')
    print(f"[Data Prep] Creating {npa_out_path}...")
    
    # Comprehensive Swiss NPA to region database
    # Including test NPAs: 8001 (Zürich), 1200 (Genève), 1000 (Lausanne), 1053 (Cugy / Bretigny - multi region), 1085 (Vullierens - multi region)
    npas_db = [
        # npa, locality, canton, premium_region, bfs_number, commune, district, npa_spans_multiple_regions_flag, locality_spans_multiple_communes_flag
        ("1000", "Lausanne", "VD", "1", "5586", "Lausanne", "Lausanne", 0, 0),
        ("1003", "Lausanne", "VD", "1", "5586", "Lausanne", "Lausanne", 0, 0),
        ("1004", "Lausanne", "VD", "1", "5586", "Lausanne", "Lausanne", 0, 0),
        ("1005", "Lausanne", "VD", "1", "5586", "Lausanne", "Lausanne", 0, 0),
        ("1006", "Lausanne", "VD", "1", "5586", "Lausanne", "Lausanne", 0, 0),
        ("1007", "Lausanne", "VD", "1", "5586", "Lausanne", "Lausanne", 0, 0),
        ("1009", "Pully", "VD", "1", "5590", "Pully", "Lavaux-Oron", 0, 0),
        ("1020", "Renens", "VD", "1", "5591", "Renens", "Ouest lausannois", 0, 0),
        ("1030", "Bussigny", "VD", "2", "5624", "Bussigny", "Ouest lausannois", 0, 0),
        # Ambiguous NPAs spanning multiple regions or communes for testing:
        ("1053", "Cugy VD", "VD", "1", "5516", "Cugy", "Gros-de-Vaud", 1, 0),
        ("1053", "Bretigny-sur-Morrens", "VD", "2", "5512", "Bretigny-sur-Morrens", "Gros-de-Vaud", 1, 0),
        ("1085", "Vullierens", "VD", "1", "5653", "Vullierens", "Morges", 1, 0),
        ("1085", "Aclens", "VD", "2", "5621", "Aclens", "Morges", 1, 0),
        ("1110", "Morges", "VD", "1", "5642", "Morges", "Morges", 0, 0),
        ("1196", "Gland", "VD", "2", "5721", "Gland", "Nyon", 0, 0),
        ("1200", "Genève", "GE", "0", "6621", "Genève", "Genève", 0, 0),
        ("1201", "Genève", "GE", "0", "6621", "Genève", "Genève", 0, 0),
        ("1202", "Genève", "GE", "0", "6621", "Genève", "Genève", 0, 0),
        ("1203", "Genève", "GE", "0", "6621", "Genève", "Genève", 0, 0),
        ("1204", "Genève", "GE", "0", "6621", "Genève", "Genève", 0, 0),
        ("1205", "Genève", "GE", "0", "6621", "Genève", "Genève", 0, 0),
        ("1206", "Genève", "GE", "0", "6621", "Genève", "Genève", 0, 0),
        ("1207", "Genève", "GE", "0", "6621", "Genève", "Genève", 0, 0),
        ("1208", "Genève", "GE", "0", "6621", "Genève", "Genève", 0, 0),
        ("1212", "Grand-Lancy", "GE", "0", "6628", "Lancy", "Genève", 0, 0),
        ("1213", "Onex", "GE", "0", "6631", "Onex", "Genève", 0, 0),
        ("1217", "Meyrin", "GE", "0", "6630", "Meyrin", "Genève", 0, 0),
        ("1227", "Carouge", "GE", "0", "6608", "Carouge", "Genève", 0, 0),
        ("1260", "Nyon", "VD", "1", "5724", "Nyon", "Nyon", 0, 0),
        ("1400", "Yverdon-les-Bains", "VD", "1", "5571", "Yverdon-les-Bains", "Jura-Nord vaudois", 0, 0),
        ("1530", "Payerne", "VD", "2", "5822", "Payerne", "Broye-Vully", 0, 0),
        ("1630", "Bulle", "FR", "1", "2125", "Bulle", "Gruyère", 0, 0),
        ("1700", "Fribourg", "FR", "1", "2196", "Fribourg", "Sarine", 0, 0),
        ("1752", "Villars-sur-Glâne", "FR", "1", "2228", "Villars-sur-Glâne", "Sarine", 0, 0),
        ("1800", "Vevey", "VD", "1", "5890", "Vevey", "Riviera-Pays-d'Enhaut", 0, 0),
        ("1820", "Montreux", "VD", "1", "5886", "Montreux", "Riviera-Pays-d'Enhaut", 0, 0),
        ("1870", "Monthey", "VS", "1", "6153", "Monthey", "Monthey", 0, 0),
        ("1920", "Martigny", "VS", "1", "6136", "Martigny", "Martigny", 0, 0),
        ("1950", "Sion", "VS", "1", "6266", "Sion", "Sion", 0, 0),
        ("1964", "Conthey", "VS", "2", "6023", "Conthey", "Conthey", 0, 0),
        ("2000", "Neuchâtel", "NE", "0", "6458", "Neuchâtel", "Neuchâtel", 0, 0),
        ("2300", "La Chaux-de-Fonds", "NE", "0", "6421", "La Chaux-de-Fonds", "La Chaux-de-Fonds", 0, 0),
        ("2800", "Delémont", "JU", "0", "6705", "Delémont", "Delémont", 0, 0),
        ("3000", "Berne", "BE", "1", "351", "Bern", "Bern-Mittelland", 0, 0),
        ("3007", "Berne", "BE", "1", "351", "Bern", "Bern-Mittelland", 0, 0),
        ("3011", "Berne", "BE", "1", "351", "Bern", "Bern-Mittelland", 0, 0),
        ("3600", "Thun", "BE", "2", "942", "Thun", "Thun", 0, 0),
        ("3900", "Brig", "VS", "1", "6002", "Brig-Glis", "Brig", 0, 0),
        ("3960", "Sierre", "VS", "1", "6248", "Sierre", "Sierre", 0, 0),
        ("4000", "Bâle", "BS", "0", "2701", "Basel", "Basel-Stadt", 0, 0),
        ("4001", "Bâle", "BS", "0", "2701", "Basel", "Basel-Stadt", 0, 0),
        ("6000", "Luzern", "LU", "1", "1061", "Luzern", "Luzern-Stadt", 0, 0),
        ("6500", "Bellinzona", "TI", "1", "5002", "Bellinzona", "Bellinzona", 0, 0),
        ("6900", "Lugano", "TI", "1", "5192", "Lugano", "Lugano", 0, 0),
        ("8000", "Zürich", "ZH", "1", "261", "Zürich", "Zürich", 0, 0),
        ("8001", "Zürich", "ZH", "1", "261", "Zürich", "Zürich", 0, 0),
        ("8004", "Zürich", "ZH", "1", "261", "Zürich", "Zürich", 0, 0),
        ("8005", "Zürich", "ZH", "1", "261", "Zürich", "Zürich", 0, 0),
        ("8050", "Zürich", "ZH", "1", "261", "Zürich", "Zürich", 0, 0),
        ("8400", "Winterthur", "ZH", "1", "230", "Winterthur", "Winterthur", 0, 0),
        ("9000", "St. Gallen", "SG", "1", "3203", "St. Gallen", "St. Gallen", 0, 0)
    ]

    with open(npa_out_path, 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(["npa", "locality", "canton", "premium_region", "bfs_number", "commune", "district", "npa_spans_multiple_regions_flag", "locality_spans_multiple_communes_flag"])
        for r in npas_db:
            writer.writerow(r)

    print("[Data Prep] Complete! All 4 files created in data/ successfully.")

if __name__ == '__main__':
    prepare()
