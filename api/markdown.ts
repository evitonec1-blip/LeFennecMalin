type VercelRequest = {
  headers: Record<string, string | string[] | undefined>;
  query?: Record<string, string | string[] | undefined>;
};

type VercelResponse = {
  setHeader: (key: string, value: string) => VercelResponse;
  status: (code: number) => VercelResponse;
  json: (body: any) => void;
  send: (body: string) => void;
};

/**
 * /api/markdown — returns page content as Markdown when requested.
 * Implements acceptmarkdown.com content negotiation:
 *   - Requires Vary: Accept header so CDNs don't serve cached HTML to agents
 *   - Returns text/markdown for Accept: text/markdown requests
 *   - Falls back to JSON summary for Accept: application/json
 */

const MARKDOWN_PAGES: Record<string, () => string> = {
  '/fr/': () => `# Le Fennec Malin — Comparateur d'Assurances Suisse

**URL:** https://www.lefennecmalin.ch/fr/

Le Fennec Malin est un comparateur d'assurances suisse 100% indépendant.

## Ce que nous comparons

- **Assurance maladie (LAMal)** — 37 caisses agréées OFSP, données 2026
- **3ème Pilier (3a/3b)** — simulation retraite et optimisation fiscale
- **Subsides LAMal** — aide cantonale à la réduction des primes

## Liens principaux

- [Comparateur assurance maladie](/fr/assurance-maladie/)
- [Comparateur 3ème pilier](/fr/3eme-pilier/)
- [Subsides LAMal](/fr/subsides/)
- [Méthodologie](/fr/methodologie/)

_Source des données : OFSP/Priminfo 2026, AFC. Mis à jour : août 2026._
`,

  '/fr/assurance-maladie/': () => `# Comparateur Assurance Maladie Suisse 2026

**URL:** https://www.lefennecmalin.ch/fr/assurance-maladie/

Comparez les primes des 37 caisses maladie suisses agréées (LAMal) 2026.

## Données clés 2026

- **37 caisses comparées** — toutes les caisses agréées OFSP
- **Primes officielles** — données Priminfo.admin.ch
- **Économies possibles** — jusqu'à CHF 3'000/an selon le profil

## Modèles d'assurance disponibles

- Modèle standard (libre choix du médecin)
- Médecin de famille (−8 à −12%)
- Télémédecine / Telmed (−8 à −15%)
- Réseau de soins HMO (−15 à −25%)

## Franchises

CHF 300 / 500 / 1'000 / 1'500 / 2'000 / 2'500

## Cantons couverts

Genève, Vaud, Valais, Fribourg, Neuchâtel, Jura, Berne, Zurich et tous les 26 cantons suisses.

_Source : OFSP/Priminfo 2026. Mis à jour : août 2026._
`,

  '/fr/3eme-pilier/': () => `# Comparateur 3ème Pilier Suisse 2026

**URL:** https://www.lefennecmalin.ch/fr/3eme-pilier/

Simulez votre capital retraite et vos économies fiscales avec le pilier 3a ou 3b.

## Plafonds de déduction fiscale 2026

- **Salariés (avec LPP):** CHF 7'258/an déductibles
- **Indépendants (sans LPP):** CHF 36'288/an déductibles (ou 20% du revenu net)

## Assureurs comparés

Swiss Life, AXA, Zurich, Helvetia, Allianz, Generali, La Mobilière, PAX, Retraites Populaires, Vaudoise, Groupe Mutuel

## Types de produits

- Pilier 3a bancaire (compte épargne ou fonds actions)
- Pilier 3a assurance (avec couvertures décès/invalidité)
- Pilier 3b (prévoyance libre, pas de plafond)

_Source : AFC/ESTV 2026. Mis à jour : août 2026._
`,

  '/fr/methodologie/': () => `# Méthodologie Le Fennec Malin

**URL:** https://www.lefennecmalin.ch/fr/methodologie/

## Sources de données

- **Assurance maladie (LAMal):** Priminfo.admin.ch (OFSP/BAG) — base officielle fédérale
- **3ème pilier:** Administration Fédérale des Contributions (AFC/ESTV)
- **Subsides:** Autorités cantonales compétentes

## Méthode de classement

Les résultats assurance maladie sont classés par prix croissant pour le profil sélectionné.
Aucun assureur ne peut payer pour améliorer son classement.

## Indépendance

Le Fennec Malin est 100% indépendant. Aucune compagnie d'assurance ne détient de participation.
Les primes LAMal affichées sont identiques qu'on passe par Le Fennec Malin ou directement par la caisse.

## Relations commerciales

Le Fennec Malin peut percevoir une commission si un utilisateur souscrit via la plateforme.
Cette commission n'influence jamais le classement des résultats.

_Conforme nLPD suisse. Mis à jour : août 2026._
`,
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Always add Vary: Accept so CDNs cache HTML and Markdown separately
  res.setHeader('Vary', 'Accept, Accept-Encoding');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');

  const requestedPath = (req.query.path as string) || '/fr/';
  const normalizedPath = requestedPath.endsWith('/') ? requestedPath : `${requestedPath}/`;

  const accept = req.headers['accept'] || '';
  const wantsMarkdown = accept.includes('text/markdown') || accept.includes('*/*');

  const generator = MARKDOWN_PAGES[normalizedPath] || MARKDOWN_PAGES['/fr/'];
  const markdownContent = generator();

  if (wantsMarkdown && !accept.includes('text/html')) {
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    return res.status(200).send(markdownContent);
  }

  // JSON fallback
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.status(200).json({
    path: normalizedPath,
    content: markdownContent,
    contentType: 'text/markdown',
    source: 'Le Fennec Malin',
    dataSource: 'OFSP/Priminfo 2026, AFC',
    updatedAt: '2026-08-19',
    links: {
      sitemap: 'https://www.lefennecmalin.ch/sitemap.xml',
      llms: 'https://www.lefennecmalin.ch/llms.txt',
    }
  });
}
