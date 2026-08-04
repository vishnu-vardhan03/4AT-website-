import { trackEvent } from "@/lib/analytics";

export type LeadWidgetAnalyticsEvent =
  | "widget_displayed"
  | "widget_opened"
  | "form_started"
  | "form_submitted"
  | "form_completed";

// Forward the existing lead-widget lifecycle to the shared, consent-aware GA4 utility.
export function trackLeadWidgetEvent(
  event: LeadWidgetAnalyticsEvent,
  payload?: Record<string, unknown>,
) {
  trackEvent(event, payload as Record<string, string | number | boolean | undefined> | undefined);
}
