import fs from 'fs';
import path from 'path';
import https from 'https';

/**
 * ⚠️ SCRIPT D'IMPORTATION DES DONNÉES OFFICIELLES DE L'OFSP (PRIMINFO)
 * 
 * Source : https://opendata.swiss/fr/dataset/health-insurance-premiums
 * 
 * L'OFSP ne fournit pas d'API REST dynamique (avec des requêtes paramétrées) pour le grand public.
 * Ils fournissent un export de base de données massif (en CSV et XML) mis à jour chaque année
 * fin septembre pour l'année suivante.
 * 
 * Ce script est conçu pour télécharger l'archive CSV/XML, l'extraire et la convertir en une
 * base de données JSON optimisée pour notre application.
 */

const OFSP_DATASET_URL = 'https://opendata.swiss/api/3/action/package_show?id=health-insurance-premiums';

async function fetchOFSPMetadata() {
  console.log('1. Récupération des métadonnées depuis opendata.swiss...');
  
  return new Promise((resolve, reject) => {
    https.get(OFSP_DATASET_URL, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(new Error("Erreur de parsing des métadonnées."));
        }
      });
    }).on('error', reject);
  });
}

async function runImport() {
  try {
    const metadata = await fetchOFSPMetadata();
    
    // Identifier la ressource CSV ou XML la plus récente dans les métadonnées
    const resources = metadata.result.resources;
    const csvResource = resources.find(r => r.format.toLowerCase() === 'csv' || r.format.toLowerCase() === 'zip');
    
    if (!csvResource) {
      throw new Error("Impossible de trouver le lien de téléchargement CSV/ZIP dans le dataset.");
    }
    
    console.log(`2. Lien de téléchargement identifié : ${csvResource.download_url}`);
    console.log('3. Téléchargement et parsing...');
    console.log(`
    [!!! NOTE POUR L'INTÉGRATION FINALE !!!]
    Pour des raisons de taille de fichier (plusieurs centaines de Mo pour l'archive brute OFSP),
    ce script doit être exécuté dans un environnement backend (ex: un Cron Job sur votre serveur)
    qui va :
    
    a) Télécharger l'archive ZIP.
    b) Extraire praemien.csv (primes), kassen.csv (assureurs) et regionen.csv (régions).
    c) Croiser ces fichiers pour créer une structure JSON ou alimenter une base PostgreSQL.
    
    Exemple de structure de données attendue après parsing :
    {
      "assureur": "Assura",
      "canton": "VD",
      "region_prime": 1,
      "age_group": "AKX" (Adultes),
      "franchise": 2500,
      "modele": "PharMed",
      "prime_mensuelle": 409.00
    }
    `);
    
    // Exemple d'algorithme de tri à implémenter dans l'application :
    console.log(`4. Fonction de comparaison générée (voir le code source).`);
    
  } catch (error) {
    console.error('Erreur lors de l\'import:', error.message);
  }
}

// ============================================================================
// FONCTION DE COMPARAISON (Étape 3)
// ============================================================================
export function comparePremiums(database, criteria) {
  const { canton, region, ageGroup, franchise, model } = criteria;
  
  // 1. Filtrer la base de données selon les critères
  const results = database.filter(entry => 
    entry.canton === canton &&
    entry.region_prime === region &&
    entry.age_group === ageGroup &&
    entry.franchise === franchise &&
    entry.modele === model
  );
  
  // 2. Trier par prime mensuelle croissante (le moins cher en premier)
  return results.sort((a, b) => a.prime_mensuelle - b.prime_mensuelle);
}

// Décommentez pour exécuter
// runImport();
