# Scripts — génération des données de primes

Un seul pipeline de données à connaître désormais :

## `download-premiums.js` (utilisé automatiquement par le build)

Appelé automatiquement par `npm install` (postinstall) et `npm run build`. Il :
- lit `data/premiums_2026.csv`, `data/insurers_2026.json`, `data/npa_to_region_2026.csv` (les vrais fichiers officiels OFSP/priminfo),
- ne fait AUCUN appel réseau,
- ne contient AUCUN mapping assureur codé en dur — tout vient des fichiers `data/`,
- génère `public/premiums_2026.json` et `public/npa_to_region.json`.

**Si les prix affichés sont faux ou obsolètes, le problème vient presque toujours des fichiers dans `data/`, pas de ce script.** Remplace les fichiers CSV/JSON dans `data/` par une version plus récente téléchargée sur priminfo.admin.ch, puis relance `npm run build`.

## `build_public_data.py` (équivalent Python, usage manuel/debug)

Fait exactement la même chose que `download-premiums.js` mais en Python, utile pour vérifier ou déboguer les données hors du pipeline Node. Pas appelé automatiquement.

## ⚠️ Anciens scripts supprimés

Les scripts précédents (`prepare_data_folder.py`, `fetch_real_premiums.py/js`, `fetch-ofsp-data.js`, `download_and_parse_premiums.py`) ont été supprimés : chacun contenait son propre mapping numéro-assureur → nom **différent et incorrect**, ce qui causait des primes affichées sous le mauvais nom d'assureur (et dans un cas, la duplication des prix de Helsana sous un assureur fictif "Progrès"). Ne recrée pas ce genre de script avec un mapping tapé à la main — passe toujours par les fichiers `data/insurers_2026.json` réels.
