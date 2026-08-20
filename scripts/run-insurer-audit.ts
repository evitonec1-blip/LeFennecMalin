/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { runInsurerSEOAudit } from '../src/seo/audit/insurerAudit';

console.log("=================================================");
console.log("🇨🇭 RUNNING LEFENNECMALIN INSURER SEO AUDIT");
console.log("=================================================");

const report = runInsurerSEOAudit();

console.log(`Total Insurers Analyzed: ${report.totalInsurers}`);
console.log(`✅ Passed: ${report.passedCount}`);
console.log(`⚠️ Warnings: ${report.warningCount}`);
console.log(`❌ Failed: ${report.failedCount}`);
console.log("-------------------------------------------------");

report.items.forEach((item) => {
  const statusEmoji = item.status === 'PASSED' ? '✅' : item.status === 'WARNING' ? '⚠️' : '❌';
  console.log(`${statusEmoji} ${item.name} (/caisses-maladie/${item.insurerSlug}/)`);
  console.log(`   - Title: ${item.metaTitleLength} chars | Desc: ${item.metaDescLength} chars | FAQs: ${item.faqCount} | Models: ${item.modelsCount} | Comparisons: ${item.competitorsCount}`);
  if (item.issues.length > 0) {
    item.issues.forEach((iss) => console.log(`     -> ${iss}`));
  }
});

console.log("=================================================");
console.log(report.failedCount === 0 ? "🎉 ALL INSURER SEO AUDIT CHECKS PASSED!" : "🚨 ISSUES FOUND");
console.log("=================================================");
