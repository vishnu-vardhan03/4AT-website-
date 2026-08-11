"use client";

import { FormEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, KeyRound, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import logo from "@/assets/logo.png";

function getEsslCallbackUrl(): string {
  const requested = new URLSearchParams(window.location.search).get("callbackUrl");
  if (!requested) return "/essl";
  try {
    const destination = new URL(requested, window.location.origin);
    const isEsslRoute = destination.pathname === "/essl" || destination.pathname.startsWith("/essl/");
    if (destination.origin !== window.location.origin || !isEsslRoute) return "/essl";
    return `${destination.pathname}${destination.search}${destination.hash}`;
  } catch {
    return "/essl";
  }
}

export default function EsslLoginPage() {
  const router = useRouter();
  const entraEnabled = process.env.NEXT_PUBLIC_ESSL_AUTH_MODE === "entra";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessType, setAccessType] = useState<"employee" | "technician">("employee");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("error")) {
      setError("Microsoft sign-in was not completed. Verify the Entra client secret and try again.");
    }
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const normalized = email.trim().toLowerCase();
    const allowed = normalized.endsWith("@consult-4at.com") || normalized.endsWith("@4at.ai");
    if (!allowed) {
      setPending(false);
      setError("Use your @consult-4at.com or @4at.ai work email.");
      return;
    }
    const result = await signIn(accessType === "technician" ? "essl-admin" : "essl-email", { email: normalized, password, redirect: false });
    setPending(false);
    if (!result?.ok) {
      setError(accessType === "technician" ? "The ESS Support email or password is incorrect." : "This email cannot use employee access.");
      return;
    }
    router.replace(getEsslCallbackUrl());
    router.refresh();
  }

  async function signInWithMicrosoft() {
    setPending(true);
    setError("");
    try {
      await signIn("azure-ad", { callbackUrl: getEsslCallbackUrl() });
    } catch {
      setPending(false);
      setError("Microsoft sign-in could not be started. Check your connection and try again.");
    }
  }

  return (
    <main className="services-page relative grid min-h-dvh place-items-center overflow-hidden bg-background px-5 py-10 text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,.12),transparent_35%)]" />
      <section className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#05081c] shadow-[0_24px_70px_rgba(0,0,0,.45)]">
        <div className="border-b border-white/10 px-6 py-5">
          <Link href="/" className="inline-flex items-center gap-3" aria-label="Back to 4AT website">
            <span aria-hidden="true" className="brand-logo-gradient !h-9 !w-14 shrink-0" style={{ WebkitMaskImage: `url(${logo.src})`, maskImage: `url(${logo.src})` }} />
            <span className="text-xl font-black text-white">ESSL</span>
          </Link>
        </div>
        <div className="p-6 sm:p-8">
          <span className="grid size-11 place-items-center rounded-xl bg-sky-400/10 text-sky-300"><LockKeyhole className="size-5" /></span>
          <h1 className="mt-5 text-3xl font-black tracking-[-.035em] text-white">Sign in to service support</h1>
          <p className="mt-2 text-sm leading-6 text-sky-100/65">Employees raise and track requests. ESS Support manages the technician queue.</p>
          {!entraEnabled && <div className="mt-6 grid grid-cols-2 rounded-xl border border-white/10 bg-[#0a0d24] p-1" aria-label="Choose access type">
            {(["employee", "technician"] as const).map((type) => <button key={type} type="button" onClick={() => { setAccessType(type); setError(""); setEmail(type === "technician" ? "esssupport@consult-4at.com" : ""); setPassword(""); }} aria-pressed={accessType === type} className={`min-h-11 rounded-lg px-3 py-2.5 text-sm font-bold capitalize transition ${accessType === type ? "bg-sky-500 text-[#01030e]" : "text-sky-100/60 hover:text-white"}`}>{type === "technician" ? "ESS Support" : "Employee"}</button>)}
          </div>}
          {entraEnabled ? <div className="mt-7">
            {error && <p role="alert" className="mb-4 rounded-lg border border-red-400/25 bg-red-400/10 px-3 py-2.5 text-sm text-red-200">{error}</p>}
            <button type="button" onClick={() => void signInWithMicrosoft()} disabled={pending} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-3 text-sm font-bold text-[#01030e] transition hover:bg-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-400/25 disabled:cursor-wait disabled:opacity-60">
              {pending ? "Opening Microsoft sign-in…" : "Continue with Microsoft"}<ArrowRight className="size-4" />
            </button>
          </div> : <form onSubmit={submit} className="mt-7">
            <label htmlFor="essl-email" className="text-sm font-bold text-sky-100">Work email</label>
            <div className="relative mt-2">
              <Mail className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-sky-100/45" />
              <input id="essl-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required readOnly={accessType === "technician"} autoComplete="email" placeholder="name@consult-4at.com" aria-describedby="email-help" className="h-12 w-full rounded-xl border border-white/10 bg-[#0a0d24] pl-11 pr-4 text-base text-white outline-none placeholder:text-sky-100/35 focus:border-sky-400 focus:ring-4 focus:ring-sky-400/20 read-only:text-sky-100/70" />
            </div>
            <p id="email-help" className="mt-2 text-xs text-sky-100/55">{accessType === "employee" ? "Allowed domains: @consult-4at.com and @4at.ai" : "Restricted ESS Support account"}</p>
            {accessType === "technician" && <div className="mt-5"><label htmlFor="essl-password" className="text-sm font-bold text-sky-100">Password</label><div className="relative mt-2"><KeyRound className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-sky-100/45" /><input id="essl-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" className="h-12 w-full rounded-xl border border-white/10 bg-[#0a0d24] pl-11 pr-4 text-base text-white outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-400/20" /></div></div>}
            {error && <p role="alert" className="mt-4 rounded-lg border border-red-400/25 bg-red-400/10 px-3 py-2.5 text-sm text-red-200">{error}</p>}
            <button type="submit" disabled={pending} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-3 text-sm font-bold text-[#01030e] transition hover:bg-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-400/25 disabled:cursor-wait disabled:opacity-60">
              {pending ? "Signing in…" : accessType === "technician" ? "Open technician dashboard" : "Open employee dashboard"}<ArrowRight className="size-4" />
            </button>
          </form>}
          <div className="mt-6 flex items-start gap-3 border-t border-white/10 pt-5 text-xs leading-5 text-sky-100/55"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-sky-300" /><p>{entraEnabled ? "Secure sign-in is provided by Microsoft Entra ID. Use your approved 4AT work account." : "This temporary login is restricted to approved organization domains. Microsoft Entra ID should replace it before final production approval."}</p></div>
        </div>
      </section>
    </main>
  );
}
