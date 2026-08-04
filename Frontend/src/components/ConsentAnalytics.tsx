'use client';

import { Analytics } from '@vercel/analytics/next';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { trackPageView } from '@/lib/analytics';

export default function ConsentAnalytics() {
  const consent = useCookieConsent();
  const pathname = usePathname();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || consent?.analytics !== true) return;
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (!measurementId || document.querySelector('script[data-4at-ga]')) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => window.dataLayer.push(args);
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { send_page_view: false });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.dataset['4atGa'] = 'true';
    document.head.appendChild(script);
  }, [consent]);

  useEffect(() => {
    // Record the current route after consent and every subsequent client-side navigation.
    if (consent?.analytics === true) trackPageView(pathname);
  }, [consent?.analytics, pathname]);

  // Keep the existing Vercel provider behind the same analytics preference.
  return consent?.analytics === true ? <Analytics /> : null;
}
