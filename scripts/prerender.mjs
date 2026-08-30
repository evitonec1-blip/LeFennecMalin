/**
 * prerender.mjs
 *
 * Generates static HTML files for key SEO routes after `vite build`.
 * Each file gets a real <title>, <meta description>, <canonical>,
 * JSON-LD (Organization + BreadcrumbList + FAQPage where applicable),
 * AND a visible <main> block with H1 + introductory text.
 *
 * This ensures:
 *  - Fix 2: AI crawlers see 500+ chars of real text without JavaScript
 *  - Fix 4: JSON-LD is present in the raw HTML (not injected by useEffect)
 *
 * Run automatically as part of `npm run build`.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../dist');
const SITE = 'https://www.lefennecmalin.ch';
const UPDATED = '2026-08-27';

const org = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Le Fennec Malin',
  url: SITE,
  logo: `${SITE}/fennec-logo.jpg`,
  description: "Comparateur d'assurances suisse independant — assurance maladie LAMal, 3eme pilier, subsides.",
  areaServed: { '@type': 'Country', name: 'Switzerland' },
  foundingLocation: { '@type': 'Place', name: 'Suisse' },
  sameAs: [
    `${SITE}/fr/a-propos/`,
    `${SITE}/fr/methodologie/`,
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'contact@lefennecmalin.ch',
    availableLanguage: ['French', 'German', 'Italian', 'English'],
    areaServed: 'CH',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CH',
    addressLocality: 'Suisse',
  },
  legalName: 'SAITHAMA Sarl',
  knowsAbout: [
    'Assurance maladie LAMal Suisse',
    '3eme pilier suisse',
    'Subsides LAMal',
    'Comparateur assurance suisse',
    'OFSP Priminfo',
  ],
};

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Le Fennec Malin',
  url: SITE,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

function breadcrumb(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE}${item.url}`,
    })),
  };
}

function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

const LANG_PREFIXES = {
  'fr-CH': 'fr',
  'de-CH': 'de',
  'it-CH': 'it',
  'en-CH': 'en',
  'es': 'es',
  'pt': 'pt',
};

// For a given FR URL, derive all language variants
function buildHreflangTags(frPath) {
  // Map /fr/xxx/ → /de/xxx/, /it/xxx/, etc.
  // Special case: some paths are fr-only (canton pages use fr slug)
  const slug = frPath.replace(/^\/fr\//, '');
  const hreflangs = [
    { lang: 'fr-CH', url: `${SITE}/fr/${slug}` },
    { lang: 'de-CH', url: `${SITE}/de/${slug}` },
    { lang: 'it-CH', url: `${SITE}/it/${slug}` },
    { lang: 'en-CH', url: `${SITE}/en/${slug}` },
    { lang: 'es',    url: `${SITE}/es/${slug}` },
    { lang: 'pt',    url: `${SITE}/pt/${slug}` },
    { lang: 'x-default', url: `${SITE}/fr/${slug}` },
  ];
  return hreflangs
    .map(h => `  <link rel="alternate" hreflang="${h.lang}" href="${h.url}">`)
    .join('\n');
}

const ROUTES = [
  {
    url: '/fr/',
    title: "Le Fennec Malin — Comparateur d'Assurances Suisse 2026",
    description: "Comparez les assurances maladie (LAMal) et le 3ème pilier en Suisse. Données officielles OFSP 2026. Gratuit, neutre, 100% indépendant. Économisez jusqu'à CHF 3'000/an.",
    h1: "Comparateur d'assurances en Suisse",
    schemas: [org, website, breadcrumb([{ name: 'Accueil', url: '/fr/' }])],
    body: `<p>Le Fennec Malin est un comparateur d'assurances suisse 100% indépendant. Comparez les primes des 37 caisses maladie agréées par l'OFSP (assurance de base LAMal) et simulez votre capital retraite avec le 3ème pilier.</p>
<p>Données officielles Priminfo 2026. Résultat personnalisé en 2 minutes. Gratuit et sans engagement.</p>
<h2>Nos outils de comparaison</h2>
<ul>
<li><a href="/fr/assurance-maladie/">Comparateur assurance maladie (LAMal)</a> — 37 caisses, toutes franchises, tous modèles</li>
<li><a href="/fr/3eme-pilier/">Comparateur 3ème pilier</a> — simulation retraite et optimisation fiscale</li>
<li><a href="/fr/subsides/">Subsides LAMal</a> — vérifiez si vous pouvez réduire vos primes</li>
</ul>`,
  },
  {
    url: '/fr/assurance-maladie/',
    title: "Comparateur Assurance Maladie Suisse 2026 — LAMal | Le Fennec Malin",
    description: "Comparez les primes des 37 caisses maladie suisses agréées (LAMal) 2026. Données officielles OFSP & Priminfo. Économisez jusqu'à CHF 3'000/an. Gratuit.",
    h1: "Comparateur assurance maladie Suisse 2026",
    schemas: [
      org,
      breadcrumb([{ name: 'Accueil', url: '/fr/' }, { name: 'Assurance maladie', url: '/fr/assurance-maladie/' }]),
      faqSchema([
        { q: "Comment économiser sur l'assurance maladie en Suisse ?", a: "Augmentez votre franchise (jusqu'à CHF 2'500), choisissez un modèle alternatif (Telmed, HMO, médecin de famille) et comparez les caisses chaque année. Les prestations de base (LAMal) sont identiques dans toutes les caisses." },
        { q: "Peut-on changer de caisse maladie en Suisse ?", a: "Oui. La résiliation doit parvenir à la caisse au plus tard le 30 novembre pour un changement au 1er janvier. Pour les franchises CHF 300 en modèle standard, un changement au 1er juillet est possible." },
        { q: "Les primes LAMal varient-elles selon le canton ?", a: "Oui. Les primes sont fixées par région de primes (1, 2 ou 3) selon les coûts de santé locaux. Genève et Vaud ont les primes les plus élevées de Suisse romande." },
      ]),
    ],
    body: `<p>L'assurance maladie de base (LAMal) est obligatoire pour tous les résidents en Suisse. Les prestations de base sont identiques dans toutes les 37 caisses agréées — seul le prix varie.</p>
<p>En 2026, la prime moyenne suisse a augmenté de 6%. Comparer les caisses peut faire économiser jusqu'à CHF 3'000 par an pour un ménage de deux adultes.</p>
<h2>Franchises disponibles</h2>
<p>CHF 300 · CHF 500 · CHF 1'000 · CHF 1'500 · CHF 2'000 · CHF 2'500</p>
<h2>Modèles d'assurance</h2>
<ul>
<li>Modèle standard — libre choix du médecin</li>
<li>Médecin de famille — jusqu'à −12% sur la prime</li>
<li>Télémédecine (Telmed) — jusqu'à −15% sur la prime</li>
<li>Réseau de soins (HMO) — jusqu'à −25% sur la prime</li>
</ul>
<h2>Comparer par canton</h2>
<ul>
<li><a href="/fr/assurance-maladie/geneve/">Assurance maladie Genève</a></li>
<li><a href="/fr/assurance-maladie/vaud/">Assurance maladie Vaud</a></li>
<li><a href="/fr/assurance-maladie/valais/">Assurance maladie Valais</a></li>
<li><a href="/fr/assurance-maladie/fribourg/">Assurance maladie Fribourg</a></li>
<li><a href="/fr/assurance-maladie/neuchatel/">Assurance maladie Neuchâtel</a></li>
<li><a href="/fr/assurance-maladie/jura/">Assurance maladie Jura</a></li>
</ul>`,
  },
  {
    url: '/fr/3eme-pilier/',
    title: "Comparateur 3ème Pilier Suisse 2026 — Pilier 3a & 3b | Le Fennec Malin",
    description: "Comparez les offres du 3ème pilier suisse. Déduisez jusqu'à CHF 7'258/an (salariés) ou CHF 36'288/an (indépendants). Simulation gratuite, données AFC 2026.",
    h1: "Comparateur 3ème pilier suisse 2026",
    schemas: [
      org,
      breadcrumb([{ name: 'Accueil', url: '/fr/' }, { name: '3ème Pilier', url: '/fr/3eme-pilier/' }]),
      faqSchema([
        { q: "Combien puis-je déduire avec le pilier 3a en 2026 ?", a: "CHF 7'258 par an pour les salariés affiliés à une caisse de pension (LPP). CHF 36'288 par an (ou 20% du revenu net) pour les indépendants sans caisse de pension." },
        { q: "Quelle est la différence entre le pilier 3a et le pilier 3b ?", a: "Le pilier 3a est déductible des impôts mais les fonds sont bloqués jusqu'à la retraite (sauf exceptions). Le pilier 3b offre une flexibilité totale mais avec des avantages fiscaux limités." },
      ]),
    ],
    body: `<p>Le 3ème pilier est la composante facultative du système suisse de retraite. Il permet d'épargner pour la retraite tout en bénéficiant d'avantages fiscaux immédiats.</p>
<h2>Plafonds de déduction fiscale 2026</h2>
<ul>
<li>Salariés (avec LPP) : CHF 7'258/an déductibles du revenu imposable</li>
<li>Indépendants (sans LPP) : CHF 36'288/an ou 20% du revenu net</li>
</ul>
<h2>Assureurs comparés</h2>
<p>Swiss Life · AXA · Zurich · Helvetia · Allianz · Generali · La Mobilière · PAX · Retraites Populaires · Vaudoise · Groupe Mutuel</p>
<h2>Types de produits</h2>
<ul>
<li>Pilier 3a bancaire (compte épargne ou fonds en actions)</li>
<li>Pilier 3a assurance (avec couvertures décès et invalidité)</li>
<li>Pilier 3b — prévoyance libre sans plafond</li>
</ul>`,
  },
  {
    url: '/fr/comparateur-assurance-suisse/',
    title: "Comparateur Assurance Suisse 2026 | Le Fennec Malin",
    description: "Comparez toutes les assurances en Suisse : maladie LAMal, 3ème pilier, prévoyance. Données officielles OFSP 2026. Gratuit, 100% indépendant.",
    h1: "Comparateur d'assurances en Suisse 2026",
    schemas: [org, website, breadcrumb([{ name: 'Accueil', url: '/fr/' }, { name: 'Comparateur Assurances', url: '/fr/comparateur-assurance-suisse/' }])],
    body: `<p>Le Fennec Malin compare les assurances maladie et la prévoyance en Suisse. Service gratuit, neutre et 100% indépendant. Données officielles OFSP & Priminfo 2026.</p>
<h2>Commencer une comparaison</h2>
<ul>
<li><a href="/fr/assurance-maladie/">Comparer l'assurance maladie (LAMal)</a> — 37 caisses, toutes franchises</li>
<li><a href="/fr/3eme-pilier/">Comparer le 3ème pilier</a> — simulation retraite et fiscalité</li>
</ul>`,
  },
  {
    url: '/fr/methodologie/',
    title: "Méthodologie et Sources | Le Fennec Malin",
    description: "Comment Le Fennec Malin calcule ses comparaisons : sources OFSP, méthode de classement, indépendance et transparence commerciale.",
    h1: "Méthodologie et sources de données",
    schemas: [org, breadcrumb([{ name: 'Accueil', url: '/fr/' }, { name: 'Méthodologie', url: '/fr/methodologie/' }])],
    body: `<p>Le Fennec Malin utilise les données officielles de l'OFSP (Priminfo.admin.ch) pour l'assurance maladie et de l'AFC pour le 3ème pilier. Les résultats sont classés par prix croissant sans aucune influence commerciale sur le classement.</p>
<p>Les primes LAMal affichées sont les primes officielles approuvées par l'État — identiques qu'on passe par Le Fennec Malin ou directement par la caisse.</p>`,
  },
];

// Canton routes
const CANTONS = [
  { slug: 'geneve', name: 'Genève', avg: 'CHF 631', zone: 'Région 1' },
  { slug: 'vaud', name: 'Vaud', avg: 'CHF 580', zone: 'Région 1' },
  { slug: 'valais', name: 'Valais', avg: 'CHF 411', zone: 'Région 2' },
  { slug: 'fribourg', name: 'Fribourg', avg: 'CHF 478', zone: 'Région 2' },
  { slug: 'neuchatel', name: 'Neuchâtel', avg: 'CHF 512', zone: 'Région 1' },
  { slug: 'jura', name: 'Jura', avg: 'CHF 398', zone: 'Région 2' },
  { slug: 'berne', name: 'Berne', avg: 'CHF 504', zone: 'Région 1' },
  { slug: 'zurich', name: 'Zurich', avg: 'CHF 558', zone: 'Région 1' },
];

for (const c of CANTONS) {
  ROUTES.push({
    url: `/fr/assurance-maladie/${c.slug}/`,
    title: `Assurance Maladie ${c.name} 2026 — Comparez les Primes LAMal | Le Fennec Malin`,
    description: `Comparez les primes d'assurance maladie (LAMal) à ${c.name} 2026. Prime moyenne ${c.avg}/mois. Données officielles OFSP. Trouvez la caisse la moins chère.`,
    h1: `Assurance maladie ${c.name} 2026`,
    schemas: [
      org,
      breadcrumb([
        { name: 'Accueil', url: '/fr/' },
        { name: 'Assurance maladie', url: '/fr/assurance-maladie/' },
        { name: c.name, url: `/fr/assurance-maladie/${c.slug}/` },
      ]),
      faqSchema([
        { q: `Combien coûte l'assurance maladie à ${c.name} en 2026 ?`, a: `La prime moyenne d'un adulte à ${c.name} est d'environ ${c.avg} par mois pour une franchise CHF 300 en modèle standard (${c.zone}, données OFSP 2026).` },
        { q: `Quelle est la caisse la moins chère à ${c.name} ?`, a: `Le classement dépend de votre âge, franchise, modèle de soins et commune. Utilisez le comparateur Le Fennec Malin pour obtenir un résultat personnalisé pour ${c.name}.` },
      ]),
    ],
    body: `<p>Comparez les primes d'assurance maladie (LAMal) dans le canton de ${c.name}. Prime moyenne 2026 : ${c.avg}/mois (adulte, franchise CHF 300, modèle standard, ${c.zone}).</p>
<p>Les prestations de base LAMal sont identiques dans toutes les caisses. Seul le prix varie selon la caisse, la franchise et le modèle choisi.</p>
<h2>Caisses actives à ${c.name}</h2>
<p>Assura · CSS · Helsana · Concordia · SWICA · Sanitas · KPT · Visana · Mutuel</p>
<p><a href="/fr/assurance-maladie/">Retour à toutes les caisses maladie</a></p>`,
  });
}

function buildHtml(route) {
  const canonical = `${SITE}${route.url}`;
  if (!fs.existsSync(path.join(distDir, 'index.html'))) {
    console.error('[prerender] dist/index.html not found — run vite build first');
    process.exit(1);
  }
  const shell = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

  const schemaBlocks = route.schemas
    .map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join('\n  ');

  const hreflangTags = buildHreflangTags(route.url);

  const headInject = `
  <title>${route.title}</title>
  <meta name="description" content="${route.description.replace(/"/g, '&quot;')}">
  <link rel="canonical" href="${canonical}">
${hreflangTags}
  <meta property="og:title" content="${route.title.replace(/"/g, '&quot;')}">
  <meta property="og:description" content="${route.description.replace(/"/g, '&quot;')}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${SITE}/fennec-avatar.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="robots" content="index, follow">
  <meta name="last-modified" content="${UPDATED}">
  ${schemaBlocks}`;

  // SSR body: injected directly into DOM so crawlers see it without JS
  // Hidden visually so it doesn't affect the React UI, but present in HTML
  const bodyInject = `
<div id="ssr-content" aria-hidden="true" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap">
  <main>
    <h1>${route.h1}</h1>
    ${route.body}
    <p>Source : OFSP/Priminfo 2026, AFC. Mis à jour le ${UPDATED}.</p>
    <nav>
      <a href="${SITE}/fr/">Accueil</a>
      <a href="${SITE}/fr/assurance-maladie/">Assurance maladie</a>
      <a href="${SITE}/fr/3eme-pilier/">3ème pilier</a>
      <a href="${SITE}/sitemap.xml">Sitemap</a>
      <a href="${SITE}/llms.txt">Agent instructions</a>
      <a href="${SITE}/openapi.json">OpenAPI spec</a>
    </nav>
  </main>
</div>`;

  let html = shell;
  // Replace <title> if exists, else inject before </head>
  if (html.includes('<title>')) {
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`);
  }
  // Replace meta description if exists
  if (html.includes('name="description"')) {
    html = html.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${route.description.replace(/"/g, '&quot;')}">`);
  }
  // Inject everything before </head>
  html = html.replace('</head>', `${headInject}\n</head>`);
  // Inject noscript SSR body before </body>
  html = html.replace('</body>', `${bodyInject}\n</body>`);

  return html;
}

// Trust anchor pages (Fix 13 — 500+ chars, real content for E-E-A-T)
ROUTES.push(
  {
    url: '/fr/a-propos/',
    title: "À Propos — Le Fennec Malin, comparateur suisse indépendant",
    description: "Découvrez Le Fennec Malin : comparateur d'assurances suisse 100% indépendant. Notre mission, nos valeurs, nos sources de données et notre engagement envers la transparence.",
    h1: "À propos de Le Fennec Malin",
    schemas: [org, breadcrumb([{ name: 'Accueil', url: '/fr/' }, { name: 'À propos', url: '/fr/a-propos/' }])],
    body: `<p>Le Fennec Malin est un comparateur d'assurances suisse 100% indépendant, opéré par SAITHAMA Sàrl, société de droit suisse. Notre mission est de simplifier la comparaison des assurances maladie (LAMal) et de la prévoyance (3ème pilier) pour les résidents en Suisse.</p>
<h2>Notre mission</h2>
<p>Rendre la comparaison d'assurances simple, transparente et gratuite. Les primes de l'assurance maladie de base (LAMal) représentent souvent le deuxième poste de dépenses des ménages suisses. Comparer peut faire économiser jusqu'à CHF 3'000 par an sans perdre une seule prestation.</p>
<h2>Nos valeurs</h2>
<ul>
<li><strong>Indépendance totale</strong> — aucune compagnie d'assurance ne détient de participation dans Le Fennec Malin</li>
<li><strong>Données officielles</strong> — nous utilisons exclusivement les données OFSP/Priminfo pour l'assurance maladie</li>
<li><strong>Transparence</strong> — nos méthodes de calcul et nos relations commerciales sont documentées</li>
<li><strong>Protection des données</strong> — conformité nLPD suisse (en vigueur depuis septembre 2023)</li>
</ul>
<h2>Notre mascotte Fenny</h2>
<p>Fenny le fennec est le guide de Le Fennec Malin. Comme le petit renard du désert, Fenny est curieux, agile et toujours à l'écoute de vos besoins. Il vous guide à travers la complexité des assurances suisses avec simplicité et bienveillance.</p>
<h2>Contact</h2>
<p>Email : contact@lefennecmalin.ch<br>
Opérateur : SAITHAMA Sàrl, Suisse</p>`,
  },
  {
    url: '/fr/methodologie/',
    title: "Méthodologie — Sources et transparence | Le Fennec Malin",
    description: "Comment Le Fennec Malin calcule ses comparaisons : sources OFSP/Priminfo 2026, méthode de classement, indépendance et relations commerciales.",
    h1: "Méthodologie et sources de données",
    schemas: [org, breadcrumb([{ name: 'Accueil', url: '/fr/' }, { name: 'Méthodologie', url: '/fr/methodologie/' }])],
    body: `<p>Le Fennec Malin utilise les données officielles de l'OFSP (Priminfo.admin.ch) pour l'assurance maladie et de l'Administration Fédérale des Contributions (AFC) pour le 3ème pilier.</p>
<h2>Sources de données</h2>
<ul>
<li><strong>Assurance maladie (LAMal)</strong> : Priminfo.admin.ch (OFSP/BAG) — base officielle fédérale, mise à jour annuellement</li>
<li><strong>3ème pilier</strong> : AFC/ESTV — plafonds et paramètres fiscaux 2026</li>
<li><strong>Régions de primes</strong> : Fichier officiel NPA/PLZ → région de primes OFSP 2026</li>
</ul>
<h2>Méthode de classement</h2>
<p>Les résultats assurance maladie sont classés par prime mensuelle croissante pour le profil sélectionné. Aucun assureur ne peut payer pour améliorer son classement. Les primes affichées sont les primes officielles approuvées par l'État — identiques qu'on passe par Le Fennec Malin ou directement par la caisse.</p>
<h2>Relations commerciales</h2>
<p>Le Fennec Malin peut percevoir une commission si un utilisateur souscrit un contrat via la plateforme. Cette commission n'influence jamais le classement des résultats ni le contenu éditorial.</p>
<h2>Conformité</h2>
<p>Conforme à la nLPD suisse (nouvelle Loi fédérale sur la protection des données, en vigueur depuis le 1er septembre 2023). Aucune donnée personnelle n'est revendue à des tiers.</p>
<p>Mis à jour le ${UPDATED}. Source : OFSP, priminfo.admin.ch, AFC.</p>`,
  },
  {
    url: '/fr/mentions-legales/',
    title: "Mentions Légales | Le Fennec Malin",
    description: "Mentions légales, éditeur et informations juridiques de Le Fennec Malin, comparateur d'assurances suisse.",
    h1: "Mentions légales",
    schemas: [org, breadcrumb([{ name: 'Accueil', url: '/fr/' }, { name: 'Mentions légales', url: '/fr/mentions-legales/' }])],
    body: `<h2>Éditeur du site</h2>
<p>Le site lefennecmalin.ch est édité par la société <strong>SAITHAMA Sàrl</strong>, société de droit suisse.<br>
Contact : contact@lefennecmalin.ch</p>
<h2>Hébergement</h2>
<p>Le site est hébergé sur l'infrastructure Vercel Inc. (101 2nd St., San Francisco, CA 94105, USA), avec des serveurs en Europe pour les utilisateurs suisses.</p>
<h2>Propriété intellectuelle</h2>
<p>La marque FENNY, le logotype et la mascotte Fenny sont la propriété exclusive de SAITHAMA Sàrl. Toute reproduction sans autorisation écrite préalable est interdite.</p>
<h2>Responsabilité</h2>
<p>Les comparaisons et simulations fournies par Le Fennec Malin sont indicatives et ne constituent pas un engagement contractuel. Les primes exactes dépendent des conditions contractuelles de chaque assureur. Pour l'assurance maladie de base (LAMal), les données sont issues de Priminfo.admin.ch (OFSP).</p>
<h2>Données personnelles</h2>
<p>Le traitement des données personnelles est conforme à la nLPD suisse (en vigueur depuis le 1er septembre 2023). Voir notre <a href="/fr/confidentialite/">politique de confidentialité</a>.</p>
<h2>Droit applicable</h2>
<p>Le présent site est soumis au droit suisse. Tout litige sera soumis à la juridiction compétente en Suisse.</p>`,
  }
);

// Add remaining missing cantons
const ADDITIONAL_CANTONS = [
  { slug: 'bale-ville', name: 'Bâle-Ville', avg: 'CHF 621', zone: 'Région 1' },
  { slug: 'bale-campagne', name: 'Bâle-Campagne', avg: 'CHF 488', zone: 'Région 2' },
  { slug: 'tessin', name: 'Tessin', avg: 'CHF 521', zone: 'Région 1' },
  { slug: 'lucerne', name: 'Lucerne', avg: 'CHF 467', zone: 'Région 2' },
  { slug: 'soleure', name: 'Soleure', avg: 'CHF 432', zone: 'Région 2' },
  { slug: 'saint-gall', name: 'Saint-Gall', avg: 'CHF 498', zone: 'Région 2' },
  { slug: 'argovie', name: 'Argovie', avg: 'CHF 451', zone: 'Région 2' },
  { slug: 'thurgovie', name: 'Thurgovie', avg: 'CHF 426', zone: 'Région 2' },
  { slug: 'zoug', name: 'Zoug', avg: 'CHF 489', zone: 'Région 1' },
  { slug: 'grisons', name: 'Grisons', avg: 'CHF 412', zone: 'Région 2' },
  { slug: 'schaffhouse', name: 'Schaffhouse', avg: 'CHF 421', zone: 'Région 2' },
  { slug: 'glaris', name: 'Glaris', avg: 'CHF 409', zone: 'Région 3' },
  { slug: 'uri', name: 'Uri', avg: 'CHF 395', zone: 'Région 3' },
  { slug: 'schwyz', name: 'Schwyz', avg: 'CHF 448', zone: 'Région 2' },
  { slug: 'obwald', name: 'Obwald', avg: 'CHF 388', zone: 'Région 3' },
  { slug: 'nidwald', name: 'Nidwald', avg: 'CHF 402', zone: 'Région 3' },
  { slug: 'appenzell-rhodes-exterieures', name: 'Appenzell Rhodes-Extérieures', avg: 'CHF 418', zone: 'Région 3' },
  { slug: 'appenzell-rhodes-interieures', name: 'Appenzell Rhodes-Intérieures', avg: 'CHF 392', zone: 'Région 3' },
];

for (const c of ADDITIONAL_CANTONS) {
  ROUTES.push({
    url: `/fr/assurance-maladie/${c.slug}/`,
    title: `Assurance Maladie ${c.name} 2026 — Primes LAMal | Le Fennec Malin`,
    description: `Comparez les primes d'assurance maladie (LAMal) dans le canton de ${c.name} 2026. Prime moyenne ${c.avg}/mois. Données officielles OFSP.`,
    h1: `Assurance maladie ${c.name} 2026`,
    schemas: [
      org,
      breadcrumb([
        { name: 'Accueil', url: '/fr/' },
        { name: 'Assurance maladie', url: '/fr/assurance-maladie/' },
        { name: c.name, url: `/fr/assurance-maladie/${c.slug}/` },
      ]),
      faqSchema([
        { q: `Combien coûte l'assurance maladie à ${c.name} en 2026 ?`, a: `La prime moyenne d'un adulte à ${c.name} est d'environ ${c.avg} par mois pour une franchise CHF 300 en modèle standard (${c.zone}, données OFSP 2026).` },
        { q: `Quelle est la caisse la moins chère à ${c.name} ?`, a: `Le classement dépend de votre âge, franchise, modèle de soins et commune. Utilisez le comparateur Le Fennec Malin pour un résultat personnalisé pour ${c.name}.` },
      ]),
    ],
    body: `<p>Comparez les primes d'assurance maladie (LAMal) dans le canton de ${c.name}. Prime moyenne 2026 : ${c.avg}/mois (adulte, franchise CHF 300, modèle standard, ${c.zone}, source OFSP).</p>
<p>Les prestations de base LAMal sont identiques dans toutes les caisses — seul le prix varie selon la caisse, la franchise et le modèle choisi.</p>
<p><a href="/fr/assurance-maladie/">Retour au comparateur assurance maladie suisse</a></p>`,
  });
}

// Generate all routes
let count = 0;
for (const route of ROUTES) {
  const filePath = path.join(distDir, route.url, 'index.html');
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, buildHtml(route));
  console.log(`[prerender] ✓ ${route.url}`);
  count++;
}

console.log(`[prerender] Done — ${count} pages generated with SSR content + JSON-LD.`);
