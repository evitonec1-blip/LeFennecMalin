/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Keyword Cannibalization & Intent Overlap Detector
 * Ensures 1 Primary Search Intent = Exactly 1 Canonical Landing Page.
 */

import { CENTRAL_KEYWORD_DATABASE, SEOKeywordItem } from '../keywords/keywordDatabase';

export interface CannibalizationIssue {
  keyword: string;
  conflictingTabs: string[];
  conflictingUrls: string[];
  intent: string;
  recommendation: string;
}

export function detectKeywordCannibalization(): CannibalizationIssue[] {
  const keywordToItems: Record<string, SEOKeywordItem[]> = {};

  for (const item of CENTRAL_KEYWORD_DATABASE) {
    const normalized = item.keyword.trim().toLowerCase();
    if (!keywordToItems[normalized]) {
      keywordToItems[normalized] = [];
    }
    keywordToItems[normalized].push(item);
  }

  const issues: CannibalizationIssue[] = [];

  for (const [kw, items] of Object.entries(keywordToItems)) {
    if (items.length > 1) {
      // Check if they target different tabs
      const uniqueTabs = Array.from(new Set(items.map(i => i.targetTab)));
      if (uniqueTabs.length > 1) {
        issues.push({
          keyword: kw,
          conflictingTabs: uniqueTabs,
          conflictingUrls: Array.from(new Set(items.map(i => i.targetUrl))),
          intent: items[0].searchIntent,
          recommendation: `Consolidate keyword "${kw}" onto single canonical target ${items[0].targetUrl} and redirect secondary queries.`
        });
      }
    }
  }

  return issues;
}
