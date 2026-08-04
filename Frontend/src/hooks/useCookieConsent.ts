"use client";

import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_KEY,
  parseCookieConsent,
  readCookieConsent,
  type ConsentState,
} from "@/lib/analytics";

export function useCookieConsent(): ConsentState | null {
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    setConsent(readCookieConsent());

    const handleConsentUpdate = (event: Event) => {
      if (!(event instanceof CustomEvent)) return;
      const detail = event.detail as unknown;
      setConsent(parseCookieConsent(JSON.stringify(detail)));
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === COOKIE_CONSENT_KEY) {
        setConsent(parseCookieConsent(event.newValue));
      }
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentUpdate);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return consent;
}
