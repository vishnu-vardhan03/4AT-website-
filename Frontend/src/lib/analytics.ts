"use client";

export const COOKIE_CONSENT_KEY = "4at_cookie_consent";
export const COOKIE_CONSENT_EVENT = "cookie-consent-updated";

export type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

export type AnalyticsEventParameters = Record<
  string,
  string | number | boolean | undefined
>;

type GtagCommand =
  | [command: "js", date: Date]
  | [command: "config", measurementId: string, parameters?: AnalyticsEventParameters]
  | [command: "event", eventName: string, parameters?: AnalyticsEventParameters]
  | [command: "consent", action: "default" | "update", parameters: AnalyticsEventParameters];

declare global {
  interface Window {
    dataLayer: GtagCommand[];
    gtag?: (...args: GtagCommand) => void;
  }
}

export function parseCookieConsent(value: string | null): ConsentState | null {
  if (value === null) return null;

  try {
    const parsed: unknown = JSON.parse(value);
    if (typeof parsed !== "object" || parsed === null) return null;

    const consent = parsed as Record<string, unknown>;
    if (
      consent.necessary !== true ||
      typeof consent.analytics !== "boolean" ||
      typeof consent.marketing !== "boolean"
    ) {
      return null;
    }

    return {
      necessary: true,
      analytics: consent.analytics,
      marketing: consent.marketing,
    };
  } catch {
    return null;
  }
}

export function readCookieConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  return parseCookieConsent(window.localStorage.getItem(COOKIE_CONSENT_KEY));
}

export function hasAnalyticsConsent(): boolean {
  return readCookieConsent()?.analytics === true;
}

export function trackEvent(
  eventName: string,
  parameters: AnalyticsEventParameters = {},
): void {
  if (!hasAnalyticsConsent() || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, parameters);
}

export function trackPageView(path: string): void {
  if (typeof window === "undefined") return;
  trackEvent("page_view", {
    page_location: window.location.href,
    page_path: path,
    page_title: document.title,
  });
}

export function trackButtonClick(name: string, location: string): void {
  trackEvent("button_click", { button_name: name, location });
}

export function trackFormSubmit(
  name: string,
  parameters: AnalyticsEventParameters = {},
): void {
  trackEvent("form_submit", { form_name: name, ...parameters });
}

export {};
