/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Automated SEO Validator Script for 26 Swiss Cantons & Multilingual Structure
 */

import { CANTONS_SEO_DATA, ALL_26_CANTONS } from '../src/seo/data/cantonsData';
import { MULTILINGUAL_ROUTES } from '../src/seo/multilingualRoutes';

interface CantonReport {
  code: string;
  name: string;
  slug: string;
  urlFr: string;
  urlDe: string;
  urlIt: string;
  urlEn: string;
  titleFr: string;
  h1Fr: string;
  metaFrLength: number;
  faqsCount: number;
  communesCount: number;
  cheapestCount: number;
  hospitalsCount: number;
  subsideAgency: string;
  subsideUrl: string;
  hasSchema: boolean;
  errors: string[];
  warnings: string[];
}

export function validateAllCantons(): {
  reports: CantonReport[];
  summary: {
    totalCantons: number;
    passed: number;
    failed: number;
    totalFaqs: number;
    totalCommunes: number;
    score: number;
  };
} {
  const reports: CantonReport[] = [];
  let totalFaqs = 0;
  let totalCommunes = 0;
  let passedCount = 0;

  ALL_26_CANTONS.forEach((c) => {
    const data = CANTONS_SEO_DATA[c.slug];
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!data) {
      errors.push(`Missing data for slug ${c.slug}`);
      reports.push({
        code: c.code,
        name: c.name,
        slug: c.slug,
        urlFr: `/assurance-maladie/${c.slug}/`,
        urlDe: `/de/krankenkassenpraemien/${c.slug}/`,
        urlIt: `/it/cassa-malati/${c.slug}/`,
        urlEn: `/en/health-insurance/${c.slug}/`,
        titleFr: '',
        h1Fr: '',
        metaFrLength: 0,
        faqsCount: 0,
        communesCount: 0,
        cheapestCount: 0,
        hospitalsCount: 0,
        subsideAgency: '',
        subsideUrl: '',
        hasSchema: false,
        errors,
        warnings,
      });
      return;
    }

    // Check URLs in multilingual routes
    const routeKey = `canton-${c.slug}`;
    const route = (MULTILINGUAL_ROUTES as any)[routeKey];
    if (!route) {
      errors.push(`No multilingual route found with ID canton-${c.slug}`);
    }

    // Check title length
    if (!data.seoTitle || data.seoTitle.length < 30) {
      warnings.push(`SEO Title too short: "${data.seoTitle}"`);
    } else if (data.seoTitle.length > 70) {
      warnings.push(`SEO Title too long (${data.seoTitle.length} chars): "${data.seoTitle}"`);
    }

    // Check meta description length
    if (!data.metaDescription || data.metaDescription.length < 90) {
      warnings.push(`Meta description too short (${data.metaDescription?.length || 0} chars)`);
    } else if (data.metaDescription.length > 165) {
      warnings.push(`Meta description too long (${data.metaDescription.length} chars)`);
    }

    // Check H1
    if (!data.h1 || !data.h1.includes(data.name)) {
      warnings.push(`H1 missing canton name: "${data.h1}"`);
    }

    // Check FAQs
    const faqs = data.faqs || [];
    totalFaqs += faqs.length;
    if (faqs.length < 4) {
      warnings.push(`Low FAQ count: ${faqs.length}`);
    }

    // Check Communes
    const communes = data.mainCommunes || [];
    totalCommunes += communes.length;
    if (communes.length < 3) {
      warnings.push(`Low commune count: ${communes.length}`);
    }

    // Check Hospitals
    const hospitals = data.hospitals || [];
    if (hospitals.length === 0) {
      warnings.push(`No hospitals defined`);
    }

    // Check Subside Agency
    if (!data.subsideAgency || data.subsideAgency.length < 3) {
      errors.push(`Missing subsidy agency`);
    }

    // Check Cheapest Insurers
    const cheapest = data.cheapestInsurers || [];
    if (cheapest.length < 3) {
      warnings.push(`Low cheapest insurers count: ${cheapest.length}`);
    }

    if (errors.length === 0) {
      passedCount++;
    }

    reports.push({
      code: data.code,
      name: data.name,
      slug: data.slug,
      urlFr: `/assurance-maladie/${data.slug}/`,
      urlDe: `/de/krankenkassenpraemien/${data.slug}/`,
      urlIt: `/it/cassa-malati/${data.slug}/`,
      urlEn: `/en/health-insurance/${data.slug}/`,
      titleFr: data.seoTitle,
      h1Fr: data.h1,
      metaFrLength: data.metaDescription?.length || 0,
      faqsCount: faqs.length,
      communesCount: communes.length,
      cheapestCount: cheapest.length,
      hospitalsCount: hospitals.length,
      subsideAgency: data.subsideAgency,
      subsideUrl: `/subsides/${data.slug}/`,
      hasSchema: true,
      errors,
      warnings,
    });
  });

  const overallScore = Number(((passedCount / ALL_26_CANTONS.length) * 10).toFixed(1));

  return {
    reports,
    summary: {
      totalCantons: ALL_26_CANTONS.length,
      passed: passedCount,
      failed: ALL_26_CANTONS.length - passedCount,
      totalFaqs,
      totalCommunes,
      score: overallScore,
    },
  };
}

// If run directly
if (typeof process !== 'undefined' && process.argv[1]?.includes('validateCantonSeo')) {
  const result = validateAllCantons();
  console.log('================================================================');
  console.log('🦊 LEFENNECMALIN — 26 CANTON SEO AUTOMATED VALIDATOR REPORT');
  console.log('================================================================');
  console.log(`Total Cantons Tested: ${result.summary.totalCantons}`);
  console.log(`Passed: ${result.summary.passed} / ${result.summary.totalCantons}`);
  console.log(`Total Indexed FAQs: ${result.summary.totalFaqs}`);
  console.log(`Total Indexed Communes/NPAs: ${result.summary.totalCommunes}`);
  console.log(`Canton Technical Quality Score: ${result.summary.score}/10`);
  console.log('----------------------------------------------------------------');
  result.reports.forEach((r) => {
    console.log(
      `[${r.code}] ${r.name.padEnd(25)} | FAQs: ${r.faqsCount} | NPAs: ${r.communesCount} | Cheap: ${r.cheapestCount} | Subside: ${r.subsideAgency.substring(0, 15)}... | Warns: ${r.warnings.length}`
    );
  });
  console.log('================================================================');
}
