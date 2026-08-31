type VercelRequest = {
  headers: Record<string, string | string[] | undefined>;
  query?: Record<string, string | string[] | undefined>;
  url?: string;
};

type VercelResponse = {
  setHeader: (key: string, value: string) => VercelResponse;
  status: (code: number) => VercelResponse;
  json: (body: any) => void;
  send: (body: string) => void;
  redirect: (code: number, url: string) => void;
};
import fs from 'fs';
import path from 'path';

/**
 * _404-handler — returns a real HTTP 404 for paths that don't match any
 * known route. This prevents "soft-404" where agents get HTTP 200 + app
 * shell for every path, making them believe every URL exists.
 *
 * Invoked via vercel.json rewrite ONLY for paths not matched by static files.
 */

// All known valid path prefixes — kept in sync with multilingualRoutes.ts
const KNOWN_PREFIXES = [
  '/fr/', '/de/', '/it/', '/en/', '/es/', '/pt/',
  '/sp/', // legacy ES alias
  '/api/',
  '/assets/',
  '/sitemap', '/robots.txt', '/llms.txt', '/fennec',
  '/premiums_2026.json', '/npa_to_region.json', '/pilier3a.json',
];

const KNOWN_EXACT = new Set([
  '/', '/fr', '/de', '/it', '/en', '/es', '/pt',
  '/sitemap.xml', '/sitemap-index.xml',
  '/sitemap-fr.xml', '/sitemap-de.xml', '/sitemap-it.xml',
  '/sitemap-en.xml', '/sitemap-es.xml', '/sitemap-pt.xml',
  '/robots.txt', '/llms.txt',
  '/fennec-avatar.jpg', '/fennec-logo.jpg',
]);

function isKnownPath(pathname: string): boolean {
  if (KNOWN_EXACT.has(pathname)) return true;
  if (KNOWN_EXACT.has(pathname.replace(/\/$/, ''))) return true;
  return KNOWN_PREFIXES.some(prefix => pathname.startsWith(prefix));
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  const pathname = req.url?.split('?')[0] || '/';

  if (isKnownPath(pathname)) {
    // Serve the SPA shell — client-side routing will handle it
    const distPath = path.join(process.cwd(), 'dist', 'index.html');
    if (fs.existsSync(distPath)) {
      const html = fs.readFileSync(distPath, 'utf-8');
      return res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').send(html);
    }
    return res.status(200).send('<div id="root"></div>');
  }

  // Unknown path — return a real 404 with agent-friendly body
  const accept = req.headers['accept'] || '';
  const wantsMarkdown = accept.includes('text/markdown');
  const wantsJson = accept.includes('application/json') && !accept.includes('text/html');

  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex');

  if (wantsJson) {
    return res.status(404).json({
      error: 'Not Found',
      path: pathname,
      message: 'This path does not exist on Le Fennec Malin.',
      links: {
        sitemap: 'https://www.lefennecmalin.ch/sitemap.xml',
        llms: 'https://www.lefennecmalin.ch/llms.txt',
        home: 'https://www.lefennecmalin.ch/',
      }
    });
  }

  if (wantsMarkdown) {
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.setHeader('Vary', 'Accept, Accept-Encoding');
    return res.status(404).send(`# 404 — Page Not Found

The path \`${pathname}\` does not exist on Le Fennec Malin.

## Find what you need

- [Sitemap](https://www.lefennecmalin.ch/sitemap.xml)
- [Agent instructions](https://www.lefennecmalin.ch/llms.txt)
- [Homepage](https://www.lefennecmalin.ch/)
- [Health insurance comparator](https://www.lefennecmalin.ch/fr/assurance-maladie/)
- [Third-pillar comparator](https://www.lefennecmalin.ch/fr/3eme-pilier/)
`);
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(404).send(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>404 — Page introuvable | Le Fennec Malin</title>
  <meta name="robots" content="noindex">
  <link rel="canonical" href="https://www.lefennecmalin.ch/">
</head>
<body>
  <h1>404 — Page introuvable</h1>
  <p>Le chemin <code>${pathname}</code> n'existe pas sur Le Fennec Malin.</p>
  <ul>
    <li><a href="/sitemap.xml">Sitemap XML</a></li>
    <li><a href="/llms.txt">Instructions pour agents (llms.txt)</a></li>
    <li><a href="/">Retour à l'accueil</a></li>
    <li><a href="/fr/assurance-maladie/">Comparateur assurance maladie</a></li>
  </ul>
</body>
</html>`);
}
