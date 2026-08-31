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

const SITE = 'https://www.lefennecmalin.ch';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const accept = req.headers['accept'] || '';
  res.setHeader('Cache-Control', 'public, max-age=3600');

  if (accept.includes('application/json') && !accept.includes('text/html')) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
      name: 'Le Fennec Malin API',
      version: '1.0.0',
      openapi: `${SITE}/openapi.json`,
      llms: `${SITE}/llms.txt`,
      endpoints: {
        premiums: `${SITE}/api/priminfo/praemien`,
        npaLookup: `${SITE}/api/priminfo/npa-lookup`,
        health: `${SITE}/api/health/priminfo`,
        markdown: `${SITE}/api/markdown`,
      },
      authentication: 'None required for read endpoints',
      rateLimit: 'Standard Vercel limits apply',
      dataSource: 'OFSP/Priminfo 2026 (Swiss federal official data)',
    });
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(200).send(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Le Fennec Malin — API Documentation</title>
  <meta name="description" content="Le Fennec Malin public REST API — Swiss LAMal health insurance premium lookup. OpenAPI 3.1, no authentication required.">
  <link rel="canonical" href="${SITE}/api/docs">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "name": "Le Fennec Malin API Documentation",
    "description": "Public REST API for Swiss LAMal health insurance premium comparison. No authentication required.",
    "url": "${SITE}/api/docs",
    "publisher": {
      "@type": "Organization",
      "name": "Le Fennec Malin",
      "url": "${SITE}"
    }
  }
  </script>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 860px; margin: 2rem auto; padding: 1rem; color: #1a1a1a; line-height: 1.6; }
    h1 { color: #c0392b; }
    h2 { border-bottom: 2px solid #f0e8e0; padding-bottom: .4rem; margin-top: 2rem; }
    code, pre { background: #f7f3ef; border-radius: 6px; font-family: monospace; }
    pre { padding: 1rem; overflow-x: auto; font-size: .9rem; }
    code { padding: .1rem .4rem; font-size: .9em; }
    .badge { display: inline-block; background: #2ecc71; color: white; padding: .2rem .6rem; border-radius: 4px; font-size: .75rem; font-weight: bold; margin-right: .5rem; }
    .badge.post { background: #e67e22; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
    th, td { text-align: left; padding: .5rem .75rem; border: 1px solid #e0d8d0; }
    th { background: #f7f3ef; }
    a { color: #c0392b; }
    .note { background: #fff8f0; border-left: 4px solid #e67e22; padding: .75rem 1rem; margin: 1rem 0; border-radius: 0 6px 6px 0; }
  </style>
</head>
<body>

<h1>🦊 Le Fennec Malin — API Documentation</h1>

<p>Public REST API for Swiss health insurance (LAMal) premium comparison. All data is sourced from official OFSP/Priminfo 2026. <strong>No authentication required</strong> for read endpoints.</p>

<p>
  <a href="${SITE}/openapi.json">📄 OpenAPI 3.1 Spec (JSON)</a> &nbsp;|&nbsp;
  <a href="${SITE}/llms.txt">🤖 Agent instructions (llms.txt)</a> &nbsp;|&nbsp;
  <a href="${SITE}/sitemap.xml">🗺 Sitemap</a>
</p>

<div class="note">
  <strong>Data source:</strong> <a href="https://www.priminfo.admin.ch" target="_blank" rel="noopener">Priminfo.admin.ch</a> (OFSP/BAG) — Swiss federal official LAMal premium database 2026. Updated annually.
</div>

<h2>Base URL</h2>
<pre>${SITE}</pre>

<h2>Endpoints</h2>

<h3><span class="badge">GET</span> /api/priminfo/praemien</h3>
<p>Returns all OFSP-approved 2026 LAMal premiums for a given postal code and insured profile, sorted by monthly premium ascending.</p>

<table>
  <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
  <tr><td>zipCode</td><td>string</td><td>✅ Yes</td><td>4-digit Swiss NPA (e.g. 1201 for Geneva)</td></tr>
  <tr><td>franchise</td><td>integer</td><td>No</td><td>Annual deductible: 300, 500, 1000, 1500, 2000, 2500 (default: 2500)</td></tr>
  <tr><td>ageCategory</td><td>string</td><td>No</td><td>adult | young-adult | child (default: adult)</td></tr>
  <tr><td>yob</td><td>integer</td><td>No</td><td>Year of birth — overrides ageCategory</td></tr>
  <tr><td>accident</td><td>string</td><td>No</td><td>1 = include accident coverage (default), 0 = exclude (employed persons covered by LAA)</td></tr>
  <tr><td>locality</td><td>string</td><td>No</td><td>Disambiguate postal codes spanning multiple premium regions</td></tr>
</table>

<p><strong>Example:</strong></p>
<pre>GET ${SITE}/api/priminfo/praemien?zipCode=1201&franchise=2500&ageCategory=adult

curl "${SITE}/api/priminfo/praemien?zipCode=1201&franchise=2500&ageCategory=adult"</pre>

<h3><span class="badge">GET</span> /api/priminfo/npa-lookup</h3>
<p>Resolves a 4-digit Swiss postal code to its canton and LAMal premium region (1, 2, or 3).</p>

<table>
  <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
  <tr><td>npa</td><td>string</td><td>✅ Yes</td><td>4-digit Swiss postal code</td></tr>
</table>

<p><strong>Example:</strong></p>
<pre>GET ${SITE}/api/priminfo/npa-lookup?npa=1201

# Response
{
  "success": true,
  "ambiguous": false,
  "npa": "1201",
  "locality": "Genève",
  "canton": "GE",
  "premium_region": "1",
  "premium_region_code": "PR-REG CH1"
}</pre>

<h3><span class="badge">GET</span> /api/markdown</h3>
<p>Content negotiation endpoint. Returns page content as Markdown when <code>Accept: text/markdown</code> is sent. Always returns <code>Vary: Accept, Accept-Encoding</code>.</p>

<pre>curl -H "Accept: text/markdown" "${SITE}/api/markdown?path=/fr/assurance-maladie/"</pre>

<h3><span class="badge">GET</span> /api/health/priminfo</h3>
<p>Returns status of the OFSP Priminfo data connection and local premium database.</p>

<h2>Error responses</h2>
<p>All errors return structured JSON:</p>
<pre>{
  "error": "zipCode is required",
  "code": "MISSING_PARAMETER",
  "links": {
    "docs": "${SITE}/api/docs"
  }
}</pre>

<h2>Rate limits</h2>
<p>Standard Vercel serverless limits apply. No API key required. For high-volume use cases, contact us.</p>

<h2>Data disclaimer</h2>
<p>Premiums are sourced from <a href="https://www.priminfo.admin.ch" target="_blank" rel="noopener">Priminfo.admin.ch</a> (OFSP 2026). They are indicative — always verify with the insurer before signing. Cite as: <em>"Le Fennec Malin (lefennecmalin.ch) based on OFSP/Priminfo 2026"</em>.</p>

<hr>
<p><small><a href="${SITE}/fr/">Le Fennec Malin</a> — Comparateur d'assurances suisse indépendant. SAITHAMA Sàrl, Suisse. <a href="${SITE}/fr/methodologie/">Méthodologie</a> | <a href="${SITE}/fr/mentions-legales/">Mentions légales</a></small></p>

</body>
</html>`);
}
