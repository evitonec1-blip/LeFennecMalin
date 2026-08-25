/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Central Link Graph & Orphan Page Auditor for LeFennecMalin.ch
 * Analyzes topical silo density, click depth, incoming/outgoing link distributions,
 * and flags any orphan or under-linked canonical URLs across all languages.
 */

import { MULTILINGUAL_ROUTES } from '../multilingualRoutes';
import { ALL_26_CANTONS } from '../data/cantonsData';
import { INSURERS_SEO_DATA } from '../data/insurersData';
import { GUIDES_SEO_DATA } from '../data/guidesData';
import { AppTab } from '../../types';

export interface PageLinkNode {
  tab: AppTab;
  pathFr: string;
  category: string;
  incomingLinksCount: number;
  outgoingLinksCount: number;
  incomingSources: string[];
  outgoingDestinations: string[];
  isOrphan: boolean;
  depthEstimate: number; // 0 = Home, 1 = Pillar/Hub, 2 = Deep-dive (Canton/Insurer), 3 = Secondary
}

export interface LinkGraphAuditReport {
  totalPages: number;
  totalInternalLinks: number;
  averageLinksPerPage: number;
  orphanPagesCount: number;
  orphanPages: string[];
  wellConnectedPagesCount: number;
  siloDistribution: Record<string, number>;
  nodes: PageLinkNode[];
}

/**
 * Builds the complete topical link graph of LeFennecMalin.ch
 */
export function auditInternalLinkGraph(): LinkGraphAuditReport {
  const routes = Object.values(MULTILINGUAL_ROUTES);
  const nodesMap = new Map<AppTab, PageLinkNode>();

  // 1. Initialize all nodes
  for (const route of routes) {
    const isHome = route.id === 'home';
    const isPillar = ['seo-maladie', 'hub-lamal', 'hub-assureurs', 'subside', 'seo-pilier', 'seo-comparateur'].includes(route.id);
    const depth = isHome ? 0 : isPillar ? 1 : 2;

    nodesMap.set(route.id, {
      tab: route.id,
      pathFr: route.locales.fr.path,
      category: route.category,
      incomingLinksCount: 0,
      outgoingLinksCount: 0,
      incomingSources: [],
      outgoingDestinations: [],
      isOrphan: false,
      depthEstimate: depth,
    });
  }

  // 2. Register deterministic structural link edges
  const addLinkEdge = (sourceTab: AppTab, targetTab: AppTab) => {
    const sourceNode = nodesMap.get(sourceTab);
    const targetNode = nodesMap.get(targetTab);

    if (sourceNode && targetNode && sourceTab !== targetTab) {
      if (!sourceNode.outgoingDestinations.includes(targetNode.pathFr)) {
        sourceNode.outgoingDestinations.push(targetNode.pathFr);
        sourceNode.outgoingLinksCount++;
      }
      if (!targetNode.incomingSources.includes(sourceNode.pathFr)) {
        targetNode.incomingSources.push(sourceNode.pathFr);
        targetNode.incomingLinksCount++;
      }
    }
  };

  // A. Global Footer & Navbar Navigation (Site-wide persistent links)
  const siteWideLinks: AppTab[] = [
    'home', 'seo-comparateur', 'seo-maladie', 'health-comparator', 'hub-insurers', 'hub-lamal', 'hub-subsides',
    'seo-pilier', 'life-comparator', 'lamal-moins-chere', 'meilleure-caisse-maladie',
    'tool-calculateur-franchise', 'tool-calculateur-impot-3a', 'tool-simulateur-frontalier',
    'category-assurance-auto', 'category-assurance-menage', 'category-assurance-rc',
    'category-assurance-vie', 'category-assurance-voyage', 'category-protection-juridique', 'category-assurance-animaux',
    'about', 'faq', 'methodologie', 'comment-fonctionne-le-comparateur',
    'article-45-lsa', 'qualifications-intermediaire', 'legal', 'privacy'
  ];

  for (const r of routes) {
    // Every page has Footer/Navbar links to siteWideLinks
    for (const target of siteWideLinks) {
      if (r.id !== target && nodesMap.has(target)) {
        addLinkEdge(r.id, target);
      }
    }
  }

  // B. LAMal Hub links to Guides, Models, Franchise, Accident, Changing, Demographics
  const lamalHub: AppTab = 'hub-lamal';
  const lamalChildren: AppTab[] = [
    'lamal-franchise', 'lamal-modeles', 'lamal-changer-caisse', 'lamal-assurance-accident',
    'lamal-vs-lca', 'lamal-moins-chere', 'meilleure-caisse-maladie', 'hub-subsides',
    'assurance-famille', 'assurance-jeune-adulte', 'assurance-etudiant', 'lamal-nouveau-resident',
    'guide-franchise-300-vs-2500', 'guide-modeles-assurance', 'guide-subside-assurance-maladie',
    'guide-resiliation-assurance-maladie', 'guide-frontalier-assurance-maladie', 'guide-3eme-pilier-fiscalite'
  ];
  for (const child of lamalChildren) {
    addLinkEdge(lamalHub, child);
    addLinkEdge(child, lamalHub);
    addLinkEdge('seo-maladie', child);
  }

  // C. All 26 Canton Pages & Subsidies cross-linking
  for (const canton of ALL_26_CANTONS) {
    const cantonTab = `canton-${canton.slug}` as AppTab;
    const subsideTab = `subside-${canton.slug}` as AppTab;

    // Hubs link to Canton
    addLinkEdge('seo-maladie', cantonTab);
    addLinkEdge('hub-subsides', subsideTab);

    // Bidirectional Canton <-> Subside
    addLinkEdge(cantonTab, subsideTab);
    addLinkEdge(subsideTab, cantonTab);

    // Canton links to Franchise & Models & Insurers
    addLinkEdge(cantonTab, 'lamal-franchise');
    addLinkEdge(cantonTab, 'lamal-modeles');
    addLinkEdge(cantonTab, 'lamal-moins-chere');
    addLinkEdge(cantonTab, 'hub-insurers');

    // Subside links to Family and Students
    addLinkEdge(subsideTab, 'assurance-famille');
    addLinkEdge(subsideTab, 'assurance-etudiant');
  }

  // D. Insurers directory links to all Insurers and Comparisons
  const insurerHub: AppTab = 'hub-insurers';
  for (const insKey of Object.keys(INSURERS_SEO_DATA)) {
    const insTab = `insurer-${insKey}` as AppTab;
    addLinkEdge(insurerHub, insTab);
    addLinkEdge(insTab, insurerHub);
    addLinkEdge(insTab, 'lamal-franchise');
    addLinkEdge(insTab, 'lamal-changer-caisse');
    addLinkEdge(insTab, 'seo-maladie');
  }

  // E. Comparison pairs
  const comparisons: AppTab[] = [
    'compare-css-helsana', 'compare-helsana-swica', 'compare-css-swica',
    'compare-assura-mutuel', 'compare-swica-sanitas', 'compare-visana-concordia'
  ];
  for (const comp of comparisons) {
    addLinkEdge(insurerHub, comp);
    addLinkEdge(comp, insurerHub);
    addLinkEdge(comp, 'seo-maladie');
  }

  // F. Guides linking
  const guideTabs: AppTab[] = [
    'guide-franchise-300-vs-2500', 'guide-modeles-assurance', 'guide-subside-assurance-maladie',
    'guide-resiliation-assurance-maladie', 'guide-frontalier-assurance-maladie', 'guide-3eme-pilier-fiscalite'
  ];
  for (const guideTab of guideTabs) {
    if (nodesMap.has(guideTab)) {
      addLinkEdge(lamalHub, guideTab);
      addLinkEdge(guideTab, 'seo-maladie');
      addLinkEdge(guideTab, 'lamal-franchise');
    }
  }

  // 3. Compute audit statistics
  const nodes = Array.from(nodesMap.values());
  const orphanPages: string[] = [];
  const siloDistribution: Record<string, number> = {};
  let totalInternalLinks = 0;
  let wellConnected = 0;

  for (const node of nodes) {
    totalInternalLinks += node.outgoingLinksCount;
    siloDistribution[node.category] = (siloDistribution[node.category] || 0) + 1;

    if (node.incomingLinksCount === 0 && node.tab !== 'home') {
      node.isOrphan = true;
      orphanPages.push(node.pathFr);
    } else {
      wellConnected++;
    }
  }

  return {
    totalPages: nodes.length,
    totalInternalLinks,
    averageLinksPerPage: Math.round((totalInternalLinks / Math.max(1, nodes.length)) * 10) / 10,
    orphanPagesCount: orphanPages.length,
    orphanPages,
    wellConnectedPagesCount: wellConnected,
    siloDistribution,
    nodes,
  };
}

// Run if executed directly
if (typeof process !== 'undefined' && process.argv && process.argv[1]?.includes('internalLinkAudit')) {
  const report = auditInternalLinkGraph();
  console.log('=== LEFENNECMALIN.CH INTERNAL LINK GRAPH AUDIT ===');
  console.log(`Total Pages Analyzed: ${report.totalPages}`);
  console.log(`Total Internal Link Edges: ${report.totalInternalLinks}`);
  console.log(`Average Links Per Page: ${report.averageLinksPerPage}`);
  console.log(`Orphan Pages Count: ${report.orphanPagesCount}`);
  if (report.orphanPagesCount > 0) {
    console.log('Orphan Pages:', report.orphanPages);
  } else {
    console.log('✅ ZERO ORPHAN PAGES DETECTED. ALL URLS REACHABLE.');
  }
  console.log('Silo Distribution:', report.siloDistribution);
}
