import requests
import json
import csv
import io
import os
import zipfile

# 1. METADATA FETCH
# L'API JSON d'opendata.swiss pour récupérer les métadonnées
API_URL = "https://opendata.swiss/api/3/action/package_show?id=health-insurance-premiums"

# Mapping manuel des plus grands assureurs (Les IDs BAG vers nos identifiants internes)
# L'OFSP ne fournit pas les noms en clair dans le CSV principal, il faut les mapper depuis le registre BAG.
INSURER_MAPPING = {
    "1384": "helsana",  # Helsana
    "1542": "css",      # CSS
    "0290": "assura",   # Assura
    "1509": "swica",    # Swica
    "0376": "kpt",      # KPT
    "1555": "concordia",# Concordia
    "1479": "visana",   # Visana
    "0343": "sanitas",  # Sanitas
    "0509": "mutuel",   # Groupe Mutuel
    "1535": "sympany",  # Sympany
    "0455": "atupri",   # Atupri
    "0312": "okk"       # ÖKK
}

# Modèles d'assurance: l'OFSP utilise 'TAR-HAM' (Médecin de famille/HMO), 'TAR-DIV' (Telmed/Autres), 'BASE' (Standard)
MODEL_MAPPING = {
    "BASE": "standard",
    "TAR-HAM": "family", # Simplification pour le comparateur
    "TAR-DIV": "telemed"
}

def get_latest_csv_url():
    print("1. Interrogation de l'API opendata.swiss...")
    response = requests.get(API_URL)
    response.raise_for_status()
    data = response.json()
    
    # Trouver la ressource CSV pour les primes
    csv_url = None
    for resource in data['result']['resources']:
        # On cherche le lien de téléchargement direct du fichier CSV (Prämien_CH.csv)
        if "Prämien_CH.csv" in resource['download_url'] or "Pr%C3%A4mien_CH.csv" in resource['download_url']:
            csv_url = resource['download_url']
            break
            
    if not csv_url:
        raise Exception("Fichier CSV introuvable dans les métadonnées.")
        
    return csv_url

def parse_csv(csv_content):
    print("3. Parsing des données (220k+ lignes)...")
    reader = csv.DictReader(io.StringIO(csv_content), delimiter=',')
    
    database = {}
    
    for row in reader:
        insurer_id = row['Versicherer'].lstrip('0')
        # On ne garde que les assureurs que l'on gère dans notre application
        mapped_insurer = INSURER_MAPPING.get(row['Versicherer'])
        if not mapped_insurer:
            continue
            
        canton = row['Kanton']
        region = row['Region']
        
        # Mapping de l'âge
        if row['Altersklasse'] == 'AKL-ERW':
            age_cat = 'adult'
        elif row['Altersklasse'] == 'AKL-JUG':
            age_cat = 'young'
        elif row['Altersklasse'] == 'AKL-KIN':
            age_cat = 'child'
        else:
            continue
            
        franchise = row['Franchise'].replace('FRA-', '')
        if not franchise.isdigit():
            continue
            
        accident = 'true' if row['Unfalleinschluss'] == 'MIT-UNF' else 'false'
        
        # Modèle
        model_type = MODEL_MAPPING.get(row['Tariftyp'], 'standard')
        
        premium = float(row['Prämie'])
        model_name = row['Tarifbezeichnung']
        
        # Clé unique
        key = f"{mapped_insurer}_{canton}_{region}_{age_cat}_{franchise}_{model_type}_{accident}"
        
        # Si on a déjà une offre pour cette combinaison, on garde la moins chère
        if key not in database or premium < database[key]['premium']:
            database[key] = {
                "premium": premium,
                "modelName": model_name
            }
            
    return database

def main():
    try:
        csv_url = get_latest_csv_url()
        print(f"2. Téléchargement du CSV depuis {csv_url} ...")
        
        response = requests.get(csv_url)
        response.raise_for_status()
        # Le CSV est en UTF-8 avec BOM, on decode
        csv_content = response.content.decode('utf-8-sig')
        
        database = parse_csv(csv_content)
        
        output_file = 'public/premiums_2026.json'
        print(f"4. Sauvegarde de {len(database)} offres dans {output_file}...")
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(database, f, ensure_ascii=False)
            
        print("Mise à jour réussie. L'application utilise maintenant les VRAIES données de l'OFSP.")
        
    except Exception as e:
        print(f"Erreur lors de l'import: {e}")

if __name__ == "__main__":
    main()
