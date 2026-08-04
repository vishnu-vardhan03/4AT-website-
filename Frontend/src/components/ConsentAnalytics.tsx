'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function ConsentAnalytics() {
  const consent = useCookieConsent();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  const enabled =
    process.env.NODE_ENV === 'production' &&
    consent?.analytics === true &&
    !!measurementId;

  useEffect(() => {
    if (!enabled) return;
    if (typeof window.gtag !== 'function') return;

    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path:
        pathname +
        (searchParams.toString()
          ? `?${searchParams.toString()}`
          : ''),
    });
  }, [enabled, pathname, searchParams]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <Script
        id="ga-script"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />

      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];

          function gtag(){
            dataLayer.push(arguments);
          }

          window.gtag = gtag;

          gtag('js', new Date());

          gtag('config', '${measurementId}', {
            send_page_view: false
          });
        `}
      </Script>
    </>
  );
}