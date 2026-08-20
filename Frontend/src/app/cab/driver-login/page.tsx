"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowLeft, ArrowRight, CarFront, KeyRound, Phone, ShieldCheck } from "lucide-react";

export default function DriverLoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true); setError("");
    const normalizedPhone = phone.replace(/\D/g, "");
    if (!/^\d{10}$/.test(normalizedPhone)) { setPending(false); setError("Enter the registered 10-digit mobile number."); return; }
    const result = await signIn("cab-driver", { phone: normalizedPhone, pin, redirect: false });
    setPending(false);
    if (!result?.ok) { setError("The registered phone number or Driver Login PIN is incorrect."); return; }
    router.replace("/cab/driver"); router.refresh();
  }

  return <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-[#050913] px-5 py-10 text-slate-100">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(16,185,129,.18),transparent_32%),radial-gradient(circle_at_85%_80%,rgba(34,211,238,.12),transparent_35%)]" />
    <section className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#091321] shadow-[0_28px_90px_rgba(0,0,0,.48)]">
      <div className="border-b border-white/10 px-7 py-6"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-emerald-400 text-slate-950"><CarFront /></span><div><p className="text-xs font-black uppercase tracking-[.2em] text-emerald-300">4AT CAB</p><p className="font-black">Driver workspace</p></div></div></div>
      <div className="p-7 sm:p-8"><h1 className="text-3xl font-black tracking-tight">Driver sign in</h1><p className="mt-2 text-sm leading-6 text-slate-400">Use the phone number registered by ESS Support and your Driver Login PIN. Microsoft Entra ID is not required.</p>
        <form onSubmit={submit} className="mt-7 space-y-5"><label className="block text-sm font-bold">Registered mobile number<div className="relative mt-2"><Phone className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500"/><input type="tel" inputMode="numeric" pattern="[0-9]{10}" minLength={10} maxLength={10} required autoComplete="tel" value={phone} onChange={(event)=>setPhone(event.target.value.replace(/\D/g,"").slice(0,10))} placeholder="9000000001" className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-12 pr-4 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/15"/></div><span className="mt-2 block text-xs font-normal text-slate-500">Enter exactly 10 digits without +91.</span></label><label className="block text-sm font-bold">Driver Login PIN<div className="relative mt-2"><KeyRound className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500"/><input type="password" inputMode="numeric" required minLength={6} maxLength={6} autoComplete="current-password" value={pin} onChange={(event)=>setPin(event.target.value.replace(/\D/g,""))} placeholder="6-digit PIN" className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-12 pr-4 tracking-[.25em] outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/15"/></div></label>{error&&<p role="alert" className="rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p>}<button disabled={pending} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 font-black text-slate-950 hover:bg-emerald-300 disabled:opacity-60">{pending?"Signing in…":"Open driver routes"}<ArrowRight className="size-4"/></button></form>
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[.025] p-4 text-xs leading-5 text-slate-400"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-300"/>Driver access is restricted to accounts created and activated by the transport administrator.</div><Link href="/" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white"><ArrowLeft className="size-4"/>Back to 4AT website</Link>
      </div>
    </section>
  </main>;
}
