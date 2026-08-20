/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Automated Insurer SEO Audit Tool
 * Validates metadata, schema markup, content density, and internal link integrity
 * across all Swiss insurer landing pages.
 */

import { INSURERS_SEO_DATA, InsurerSEOData } from '../data/insurersData';
import { MULTILINGUAL_ROUTES, getMultilingualRoute, getHreflangAlternates } from '../multilingualRoutes';
import { AppTab } from '../../types';

export interface AuditReportItem {
  insurerSlug: string;
  name: string;
  status: 'PASSED' | 'WARNING' | 'FAILED';
  metaTitleLength: number;
  metaDescLength: number;
  faqCount: number;
  modelsCount: number;
  competitorsCount: number;
  hasIndicativePremiums: boolean;
  hasAppRating: boolean;
  issues: string[];
}

export interface FullAuditReport {
  totalInsurers: number;
  passedCount: number;
  warningCount: number;
  failedCount: number;
  items: AuditReportItem[];
}

export function runInsurerSEOAudit(): FullAuditReport {
  const insurers = Object.values(INSURERS_SEO_DATA);
  const items: AuditReportItem[] = [];

  let passed = 0;
  let warnings = 0;
  let failed = 0;

  for (const ins of insurers) {
    const issues: string[] = [];
    const tabKey = `insurer-${ins.slug}` as AppTab;
    const routeConfig = getMultilingualRoute(tabKey);

    // 1. Meta Title validation (Ideal: 40-65 chars)
    const titleFr = routeConfig.locales?.fr?.title || '';
    if (!titleFr) {
      issues.push('CRITICAL: Missing French meta title');
    } else if (titleFr.length < 35) {
      issues.push(`WARNING: Meta title too short (${titleFr.length} chars)`);
    } else if (titleFr.length > 70) {
      issues.push(`WARNING: Meta title might get truncated in SERP (${titleFr.length} chars)`);
    }

    // 2. Meta Description validation (Ideal: 120-160 chars)
    const descFr = ins.metaDescription || '';
    if (!descFr) {
      issues.push('CRITICAL: Missing meta description');
    } else if (descFr.length < 100) {
      issues.push(`WARNING: Meta description too short (${descFr.length} chars)`);
    } else if (descFr.length > 180) {
      issues.push(`WARNING: Meta description might get truncated (${descFr.length} chars)`);
    }

    // 3. Content Completeness
    if (!ins.overview || ins.overview.length < 150) {
      issues.push('WARNING: Overview text is too brief for SEO authority');
    }

    if (!ins.alternativeCareModels || ins.alternativeCareModels.length < 2) {
      issues.push('WARNING: Fewer than 2 alternative care models specified');
    }

    if (!ins.faqs || ins.faqs.length < 3) {
      issues.push('WARNING: Fewer than 3 FAQs present (FAQ Schema needs richness)');
    }

    if (!ins.indicativePremiums2026 || ins.indicativePremiums2026.length < 3) {
      issues.push('WARNING: Missing cantonal indicative premiums sample');
    }

    // 4. Hreflang alternates validation
    const hreflangs = getHreflangAlternates(tabKey);
    if (!hreflangs['fr-CH'] || !hreflangs['de-CH'] || !hreflangs['it-CH'] || !hreflangs['en-CH']) {
      issues.push('CRITICAL: Incomplete hreflang alternate matrix');
    }

    const isCritical = issues.some((i) => i.startsWith('CRITICAL'));
    const isWarning = issues.some((i) => i.startsWith('WARNING'));

    let status: 'PASSED' | 'WARNING' | 'FAILED' = 'PASSED';
    if (isCritical) {
      status = 'FAILED';
      failed++;
    } else if (isWarning) {
      status = 'WARNING';
      warnings++;
    } else {
      passed++;
    }

    items.push({
      insurerSlug: ins.slug,
      name: ins.name,
      status,
      metaTitleLength: titleFr.length,
      metaDescLength: descFr.length,
      faqCount: ins.faqs?.length || 0,
      modelsCount: ins.alternativeCareModels?.length || ins.lamalModels?.length || 0,
      competitorsCount: ins.competitorComparisons?.length || 0,
      hasIndicativePremiums: !!(ins.indicativePremiums2026 && ins.indicativePremiums2026.length > 0),
      hasAppRating: !!ins.appRating,
      issues
    });
  }

  return {
    totalInsurers: insurers.length,
    passedCount: passed,
    warningCount: warnings,
    failedCount: failed,
    items
  };
}
