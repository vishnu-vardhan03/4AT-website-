'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const CONSENT_KEY = '4at_cookie_consent';

type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function saveConsent(consent: ConsentState) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  document.cookie = `cookie_consent=${JSON.stringify(consent)}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: consent }));
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [prefs, setPrefs] = useState<ConsentState>(DEFAULT_CONSENT);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) setVisible(true);
  }, []);

  const acceptAll = () => {
    const consent: ConsentState = { necessary: true, analytics: true, marketing: true };
    saveConsent(consent);
    setVisible(false);
    setShowManage(false);
  };

  const rejectAll = () => {
    const consent: ConsentState = { necessary: true, analytics: false, marketing: false };
    saveConsent(consent);
    setVisible(false);
    setShowManage(false);
  };

  const savePrefs = () => {
    saveConsent(prefs);
    setVisible(false);
    setShowManage(false);
  };

  if (!visible) return null;

  return (
    <>
      {!showManage && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-neutral-950/95 px-6 py-8 backdrop-blur md:px-10 md:py-10">
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-3xl text-base leading-relaxed text-neutral-300 md:text-lg">
              We use cookies to improve your experience and analyze site traffic. Read our{' '}
              <Link href="/privacy" className="underline hover:text-white">Privacy Policy</Link> and{' '}
              <Link href="/terms" className="underline hover:text-white">Terms</Link>.
            </p>
            <div className="flex shrink-0 flex-wrap gap-4">
              <button
                onClick={() => setShowManage(true)}
                className="rounded-lg border border-white/20 px-6 py-3 text-base text-neutral-300 hover:bg-white/5"
              >
                Manage Cookies
              </button>
              <button
                onClick={rejectAll}
                className="rounded-lg border border-white/20 px-6 py-3 text-base text-neutral-300 hover:bg-white/5"
              >
                Reject All
              </button>
              <button
                onClick={acceptAll}
                className="rounded-lg bg-white px-6 py-3 text-base font-medium text-black hover:bg-neutral-200"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {showManage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-2xl rounded-xl border border-white/10 bg-neutral-950 p-7 md:p-10">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">Manage Cookie Preferences</h2>
            <p className="mt-2 text-base leading-relaxed text-neutral-400">
              Choose which categories of cookies you allow. Necessary cookies are always active.
            </p>

            <div className="mt-7 space-y-5">
              <div className="flex items-start justify-between gap-5 rounded-lg border border-white/10 p-5">
                <div>
                  <p className="text-base font-medium text-white">Necessary</p>
                  <p className="mt-1 text-sm text-neutral-400">Required for core site functionality. Always on.</p>
                </div>
                <input type="checkbox" checked disabled className="mt-1 h-5 w-5 accent-neutral-500" />
              </div>

              <div className="flex items-start justify-between gap-5 rounded-lg border border-white/10 p-5">
                <div>
                  <p className="text-base font-medium text-white">Analytics</p>
                  <p className="mt-1 text-sm text-neutral-400">Helps us understand site usage (e.g. GA, PostHog).</p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.analytics}
                  onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
                  className="mt-1 h-5 w-5 accent-white"
                />
              </div>

              <div className="flex items-start justify-between gap-5 rounded-lg border border-white/10 p-5">
                <div>
                  <p className="text-base font-medium text-white">Marketing</p>
                  <p className="mt-1 text-sm text-neutral-400">Used for ad targeting and campaign tracking.</p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.marketing}
                  onChange={(e) => setPrefs((p) => ({ ...p, marketing: e.target.checked }))}
                  className="mt-1 h-5 w-5 accent-white"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={() => setShowManage(false)}
                className="rounded-lg border border-white/20 px-6 py-3 text-base text-neutral-300 hover:bg-white/5"
              >
                Back
              </button>
              <button
                onClick={savePrefs}
                className="rounded-lg bg-white px-6 py-3 text-base font-medium text-black hover:bg-neutral-200"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
