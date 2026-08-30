#!/usr/bin/env node
/**
 * validate-agentic.mjs
 * Tests all agentic readiness fixes against the live site.
 * Run: node scripts/validate-agentic.mjs [base-url]
 *
 * Tests:
 * 1. Real 404 for unknown paths
 * 2. SSR content (H1 + 500+ chars without JS)
 * 3. OpenAPI spec accessible and valid JSON
 * 4. JSON error responses on API errors
 * 5. Markdown content negotiation with Vary header
 * 6. llms.txt discoverable with when-to-use section
 * 7. JSON-LD on homepage
 * 8. /api/docs accessible
 * 9. Trust pages have real content
 */

const BASE = process.argv[2] || 'https://www.lefennecmalin.ch';
const PASS = '\x1b[32m✓ PASS\x1b[0m';
const FAIL = '\x1b[31m✗ FAIL\x1b[0m';
const WARN = '\x1b[33m⚠ WARN\x1b[0m';

let passed = 0, failed = 0, warned = 0;

async function check(label, fn) {
  try {
    const result = await fn();
    if (result === true) {
      console.log(`${PASS} ${label}`);
      passed++;
    } else if (result === 'warn') {
      console.log(`${WARN} ${label}`);
      warned++;
    } else {
      console.log(`${FAIL} ${label}${result ? ': ' + result : ''}`);
      failed++;
    }
  } catch (e) {
    console.log(`${FAIL} ${label}: ${e.message}`);
    failed++;
  }
}

async function fetchURL(url, options = {}) {
  const res = await fetch(url, { redirect: 'follow', ...options });
  return res;
}

console.log(`\n🦊 Le Fennec Malin — Agentic Readiness Validation`);
console.log(`   Base URL: ${BASE}\n`);

// Fix 1: Real 404 for unknown paths
await check('Fix 1a: Unknown path returns 404 (not 200)', async () => {
  const res = await fetchURL(`${BASE}/this-path-definitely-does-not-exist-xyz123`);
  if (res.status === 404) return true;
  return `Got HTTP ${res.status}, expected 404`;
});

await check('Fix 1b: 404 response has agent-friendly body', async () => {
  const res = await fetchURL(`${BASE}/nonexistent-abc`, { headers: { 'Accept': 'application/json' } });
  if (res.status !== 404) return `Got HTTP ${res.status}`;
  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('application/json')) return `Content-Type is ${ct}, expected JSON`;
  const body = await res.json();
  if (!body.error || !body.links) return 'Missing error or links in JSON body';
  return true;
});

await check('Fix 1c: WordPress probe returns 404', async () => {
  const res = await fetchURL(`${BASE}/wp-admin/admin-ajax.php`);
  return res.status === 404 ? true : `Got HTTP ${res.status}`;
});

// Fix 2: SSR content
await check('Fix 2a: Homepage has H1 in raw HTML', async () => {
  const res = await fetchURL(`${BASE}/fr/`);
  const html = await res.text();
  if (html.includes('<h1>') || html.includes('<h1 ')) return true;
  return 'No H1 found in raw HTML';
});

await check('Fix 2b: Homepage has 500+ chars of text content', async () => {
  const res = await fetchURL(`${BASE}/fr/`);
  const html = await res.text();
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length >= 500) return true;
  return `Only ${text.length} chars of text found (need 500+)`;
});

await check('Fix 2c: Assurance maladie page has SSR content', async () => {
  const res = await fetchURL(`${BASE}/fr/assurance-maladie/`);
  const html = await res.text();
  const hasH1 = html.includes('<h1>') || html.includes('<h1 ');
  const textLen = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().length;
  if (hasH1 && textLen >= 500) return true;
  return `H1: ${hasH1}, text chars: ${textLen}`;
});

// Fix 3: OpenAPI spec
await check('Fix 3a: /openapi.json returns 200', async () => {
  const res = await fetchURL(`${BASE}/openapi.json`);
  return res.status === 200 ? true : `Got HTTP ${res.status}`;
});

await check('Fix 3b: /openapi.json is valid JSON with openapi field', async () => {
  const res = await fetchURL(`${BASE}/openapi.json`);
  const json = await res.json();
  if (!json.openapi) return 'Missing openapi field';
  if (!json.paths) return 'Missing paths field';
  if (!json.info?.title) return 'Missing info.title';
  return true;
});

await check('Fix 3c: OpenAPI has premium lookup endpoint', async () => {
  const res = await fetchURL(`${BASE}/openapi.json`);
  const json = await res.json();
  return json.paths?.['/api/priminfo/praemien'] ? true : 'Missing /api/priminfo/praemien endpoint';
});

// Fix 4: JSON error responses
await check('Fix 4a: API missing param returns JSON error', async () => {
  const res = await fetchURL(`${BASE}/api/priminfo/praemien`, { headers: { 'Accept': 'application/json' } });
  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('application/json')) return `Content-Type: ${ct}`;
  const body = await res.json();
  if (!body.error) return 'Missing error field in response';
  return true;
});

await check('Fix 4b: Unknown API endpoint returns JSON', async () => {
  const res = await fetchURL(`${BASE}/api/nonexistent-endpoint`, { headers: { 'Accept': 'application/json' } });
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return true;
  return `Content-Type: ${ct}, expected JSON`;
});

// Fix 5: Markdown content negotiation
await check('Fix 5a: /api/markdown returns text/markdown', async () => {
  const res = await fetchURL(`${BASE}/api/markdown?path=/fr/`, {
    headers: { 'Accept': 'text/markdown' }
  });
  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('text/markdown')) return `Content-Type: ${ct}`;
  return true;
});

await check('Fix 5b: /api/markdown has Vary: Accept header', async () => {
  const res = await fetchURL(`${BASE}/api/markdown?path=/fr/`, {
    headers: { 'Accept': 'text/markdown' }
  });
  const vary = res.headers.get('vary') || '';
  if (vary.includes('Accept')) return true;
  return `Vary: ${vary || '(missing)'} — needs to include Accept`;
});

await check('Fix 5c: Markdown content has real text', async () => {
  const res = await fetchURL(`${BASE}/api/markdown?path=/fr/assurance-maladie/`, {
    headers: { 'Accept': 'text/markdown' }
  });
  const text = await res.text();
  if (text.length >= 200 && text.includes('#')) return true;
  return `Too short or missing headings: ${text.length} chars`;
});

// Fix 6: Developer discoverability
await check('Fix 6a: /api/docs returns 200', async () => {
  const res = await fetchURL(`${BASE}/api/docs`);
  return res.status === 200 ? true : `Got HTTP ${res.status}`;
});

await check('Fix 6b: /api/docs contains API documentation', async () => {
  const res = await fetchURL(`${BASE}/api/docs`);
  const text = await res.text();
  if (text.includes('openapi') || text.includes('API') || text.includes('endpoint')) return true;
  return 'No API documentation content found';
});

// Fix 7: API endpoints reachable
await check('Fix 7a: NPA lookup endpoint works', async () => {
  const res = await fetchURL(`${BASE}/api/priminfo/npa-lookup?npa=1201`);
  if (res.status !== 200) return `Got HTTP ${res.status}`;
  const json = await res.json();
  if (!json.success && !json.canton) return 'Missing success/canton in response';
  return true;
});

await check('Fix 7b: Premium lookup endpoint works', async () => {
  const res = await fetchURL(`${BASE}/api/priminfo/praemien?zipCode=1201&franchise=2500&ageCategory=adult`);
  if (res.status !== 200) return `Got HTTP ${res.status}`;
  const json = await res.json();
  if (!Array.isArray(json.results) && !json.results) return 'Missing results array';
  return true;
});

// Fix 9: JSON-LD structured data
await check('Fix 9a: Homepage has JSON-LD', async () => {
  const res = await fetchURL(`${BASE}/fr/`);
  const html = await res.text();
  if (html.includes('application/ld+json')) return true;
  return 'No JSON-LD found in homepage HTML';
});

await check('Fix 9b: JSON-LD has Organization type', async () => {
  const res = await fetchURL(`${BASE}/fr/`);
  const html = await res.text();
  if (html.includes('"Organization"')) return true;
  return 'No Organization schema found';
});

// Fix 11: llms.txt
await check('Fix 11a: /llms.txt returns 200', async () => {
  const res = await fetchURL(`${BASE}/llms.txt`);
  return res.status === 200 ? true : `Got HTTP ${res.status}`;
});

await check('Fix 11b: llms.txt has when-to-use section', async () => {
  const res = await fetchURL(`${BASE}/llms.txt`);
  const text = await res.text();
  if (text.toLowerCase().includes('when to use')) return true;
  return 'Missing "When to use" section';
});

await check('Fix 11c: llms.txt has API endpoint docs', async () => {
  const res = await fetchURL(`${BASE}/llms.txt`);
  const text = await res.text();
  if (text.includes('/api/priminfo/praemien')) return true;
  return 'Missing API endpoint documentation';
});

// Fix 12: Organization schema completeness
await check('Fix 12a: Organization schema has contactPoint', async () => {
  const res = await fetchURL(`${BASE}/fr/`);
  const html = await res.text();
  if (html.includes('contactPoint') && html.includes('ContactPoint')) return true;
  return 'Missing contactPoint in Organization schema';
});

// Fix 13: Trust anchor pages
await check('Fix 13a: /fr/a-propos/ has real content', async () => {
  const res = await fetchURL(`${BASE}/fr/a-propos/`);
  const html = await res.text();
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length >= 500 ? true : `Only ${text.length} chars`;
});

await check('Fix 13b: /fr/mentions-legales/ has real content', async () => {
  const res = await fetchURL(`${BASE}/fr/mentions-legales/`);
  const html = await res.text();
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length >= 500 ? true : `Only ${text.length} chars`;
});

await check('Fix 13c: /fr/methodologie/ has real content', async () => {
  const res = await fetchURL(`${BASE}/fr/methodologie/`);
  const html = await res.text();
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length >= 500 ? true : `Only ${text.length} chars`;
});

// Sitemap
await check('Sitemap: /sitemap.xml returns 200', async () => {
  const res = await fetchURL(`${BASE}/sitemap.xml`);
  return res.status === 200 ? true : `Got HTTP ${res.status}`;
});

// Canton pages
await check('Canton: /fr/assurance-maladie/geneve/ has content', async () => {
  const res = await fetchURL(`${BASE}/fr/assurance-maladie/geneve/`);
  const html = await res.text();
  if (!html.includes('Genève') && !html.includes('Geneve')) return 'Missing canton name';
  if (!html.includes('application/ld+json')) return 'Missing JSON-LD';
  return true;
});

// Summary
console.log(`\n${'─'.repeat(55)}`);
console.log(`Results: ${passed} passed, ${warned} warnings, ${failed} failed`);
console.log(`${'─'.repeat(55)}`);

if (failed > 0) {
  console.log(`\n⚠️  ${failed} check(s) failed. Deploy changes and re-run.`);
  process.exit(1);
} else {
  console.log(`\n🦊 All checks passed!`);
}
