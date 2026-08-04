"use client";

type AnalyticsEventParameters = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

// Keep analytics inert during SSR, local development, tests, and before analytics consent.
function canTrackAnalytics() {
  if (typeof window === "undefined" || process.env.NODE_ENV !== "production") return false;
  try {
    const consent = JSON.parse(localStorage.getItem("4at_cookie_consent") ?? "null") as { analytics?: boolean } | null;
    return consent?.analytics === true;
  } catch {
    return false;
  }
}

// Centralize custom GA4 events so components never access gtag or dataLayer directly.
export function trackEvent(eventName: string, parameters: AnalyticsEventParameters = {}) {
  if (!canTrackAnalytics() || !window.gtag) return;
  window.gtag("event", eventName, parameters);
}

// Use GA4's recommended form_submit event with a stable form identifier.
export function trackFormSubmit(formName: string, parameters: AnalyticsEventParameters = {}) {
  trackEvent("form_submit", { form_name: formName, ...parameters });
}

// Standardize CTA/button reporting while preserving a readable label and location.
export function trackButtonClick(buttonName: string, location: string) {
  trackEvent("button_click", { button_name: buttonName, location });
}

// Report App Router navigations after the initial page view emitted by GoogleAnalytics.
export function trackPageView(path: string) {
  trackEvent("page_view", { page_location: window.location.href, page_path: path, page_title: document.title });
}
