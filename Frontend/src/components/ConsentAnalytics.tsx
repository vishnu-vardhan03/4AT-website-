"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { trackPageView } from "@/lib/analytics";

const GA_MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/i;

export default function ConsentAnalytics() {
  const consent = useCookieConsent();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const configuredMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const measurementId =
    configuredMeasurementId && GA_MEASUREMENT_ID_PATTERN.test(configuredMeasurementId)
      ? configuredMeasurementId
      : null;
  const enabled = consent?.analytics === true && measurementId !== null;
  const [initialized, setInitialized] = useState(false);
  const lastTrackedPath = useRef<string | null>(null);
  const query = searchParams.toString();
  const path = query ? `${pathname}?${query}` : pathname;

  useEffect(() => {
    if (!enabled || !initialized) {
      lastTrackedPath.current = null;
      return;
    }

    if (lastTrackedPath.current !== path) {
      trackPageView(path);
      lastTrackedPath.current = path;
    }
  }, [enabled, initialized, path]);

  if (!enabled || measurementId === null) return null;

  return (
    <>
      <Script id="google-analytics-init" strategy="afterInteractive" onReady={() => setInitialized(true)}>
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = function gtag() { window.dataLayer.push(arguments); };
          window.gtag('js', new Date());
          window.gtag('config', '${measurementId}', { send_page_view: false });
        `}
      </Script>
      <Script
        id="google-analytics-gtag"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
    </>
  );
}
