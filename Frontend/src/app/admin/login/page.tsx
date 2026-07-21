"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(false);
    const form = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      username: form.get("username"), password: form.get("password"), redirect: false,
    });
    setPending(false);
    if (result?.ok) { router.push("/admin"); router.refresh(); } else setError(true);
  }

  return (
    <main className="constant-site-background flex min-h-screen items-center justify-center bg-[#04060f] px-5 text-white">
      <div className="pointer-events-none absolute h-80 w-80 rounded-full bg-sky-400/[0.08] blur-[110px]" />
      <section className="relative w-full max-w-md rounded-3xl border border-white/[0.09] bg-white/[0.035] p-8 shadow-2xl backdrop-blur-xl sm:p-10">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">4AT Operations</div>
        <h1 className="mt-4 text-3xl font-black tracking-[-0.04em]">Admin sign in</h1>
        <p className="mt-2 text-sm text-white/45">Use the authorized administrator credentials.</p>
        <form onSubmit={submit} className="mt-8 space-y-5">
          <label className="block text-sm font-medium text-white/70">Username
            <input name="username" required autoComplete="username" className="mt-2 w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none transition focus:border-sky-300/60" />
          </label>
          <label className="block text-sm font-medium text-white/70">Password
            <input name="password" type="password" required autoComplete="current-password" className="mt-2 w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none transition focus:border-sky-300/60" />
          </label>
          {error && <p role="alert" className="text-sm text-red-300">Invalid credentials</p>}
          <button disabled={pending} className="w-full rounded-xl bg-sky-300 px-4 py-3 font-bold text-slate-950 transition hover:bg-sky-200 disabled:cursor-wait disabled:opacity-60">
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}
