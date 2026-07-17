export type LeadWidgetAnalyticsEvent =
  | "widget_displayed"
  | "widget_opened"
  | "form_started"
  | "form_submitted"
  | "form_completed";

// Clean extension point — wire this into PostHog (already installed in the
// project) or another analytics provider once tracking is greenlit.
export function trackLeadWidgetEvent(
  event: LeadWidgetAnalyticsEvent,
  payload?: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;
  void event;
  void payload;
}
