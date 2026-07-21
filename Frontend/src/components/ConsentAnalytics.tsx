'use client';

import { Analytics } from '@vercel/analytics/next';
import { useCookieConsent } from '@/hooks/useCookieConsent';

export default function ConsentAnalytics() {
  const consent = useCookieConsent();

  return consent?.analytics === true ? <Analytics /> : null;
}
