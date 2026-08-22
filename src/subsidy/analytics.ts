/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Privacy-friendly Subsidy Funnel Analytics Dispatcher
 */

export type SubsidyAnalyticsEvent =
  | 'subsidy_page_view'
  | 'subsidy_started'
  | 'subsidy_step_completed'
  | 'subsidy_completed'
  | 'subsidy_canton_selected'
  | 'subsidy_potentially_eligible'
  | 'subsidy_not_eligible'
  | 'subsidy_application_clicked'
  | 'subsidy_comparator_clicked'
  | 'subsidy_reset';

export function trackSubsidyEvent(
  event: SubsidyAnalyticsEvent,
  metadata?: {
    canton?: string;
    step?: number;
    householdType?: string;
    resultStatus?: string;
    targetUrl?: string;
  }
) {
  try {
    if (typeof window !== 'undefined') {
      // Dispatch custom DOM event for listening integrations
      const customEvent = new CustomEvent('fenny_subsidy_analytics', {
        detail: {
          event,
          timestamp: new Date().toISOString(),
          ...metadata,
        },
      });
      window.dispatchEvent(customEvent);

      // Check if dataLayer exists (GTM / GA4) without sending sensitive income values
      if ((window as any).dataLayer && Array.isArray((window as any).dataLayer)) {
        (window as any).dataLayer.push({
          event,
          subsidyCanton: metadata?.canton,
          subsidyStep: metadata?.step,
          subsidyResult: metadata?.resultStatus,
        });
      }

      console.debug(`[Fenny Analytics] ${event}`, metadata || {});
    }
  } catch (err) {
    // Fail silently
  }
}
