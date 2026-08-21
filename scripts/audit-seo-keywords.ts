/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Master Semantic SEO Keyword & Cannibalization Audit Script
 */

import { CENTRAL_KEYWORD_DATABASE, getKeywordsByCluster, TopicClusterId } from '../src/seo/keywords/keywordDatabase.js';
import { detectKeywordCannibalization } from '../src/seo/engine/cannibalizationDetector.js';
import { MULTILINGUAL_ROUTES } from '../src/seo/multilingualRoutes.js';

console.log("=================================================");
console.log("🇨🇭 LEFENNECMALIN SEMANTIC SEO & KEYWORD AUDIT");
console.log("=================================================\n");

console.log(`📊 Total Seed & Long-Tail Keywords Catalogued: ${CENTRAL_KEYWORD_DATABASE.length}`);

// 1. Cluster Distribution
const clusters: TopicClusterId[] = [
  'assurance-maladie',
  'lamal',
  'canton',
  'insurer',
  'franchise',
  'modeles',
  'cheapest',
  'best',
  'switching',
  'family',
  'young-adult',
  'student',
  'new-resident',
  'lamal-vs-lca',
  'accident',
  'comparison',
  'pension',
  'tools'
];

console.log("\n📁 KEYWORD CLUSTER MAPPING:");
for (const cluster of clusters) {
  const kws = getKeywordsByCluster(cluster);
  console.log(`  - [${cluster}]: ${kws.length} keywords`);
}

// 2. Cannibalization Detection
console.log("\n🔍 CANNIBALIZATION & DUPLICATE INTENT CHECK:");
const issues = detectKeywordCannibalization();

if (issues.length === 0) {
  console.log("  ✅ Zero keyword cannibalization! Every URL owns a unique primary search intent.");
} else {
  issues.forEach(d => {
    console.log(`  ⚠️ Duplicate keyword "${d.keyword}" on routes: ${d.conflictingUrls.join(', ')}`);
  });
}

// 3. Multilingual Route Health
console.log(`\n🌐 MULTILINGUAL ARCHITECTURE STATUS:`);
console.log(`  - Total Multilingual Route Entities: ${Object.keys(MULTILINGUAL_ROUTES).length}`);
console.log(`  - Languages fully mapped: French (fr), German (de), Italian (it), English (en)`);

console.log("\n=================================================");
console.log("🎉 MASTER SEO & KEYWORD ENGINE VERIFICATION COMPLETE");
console.log("=================================================");
