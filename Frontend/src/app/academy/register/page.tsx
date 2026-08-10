"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/layout/MainNav";
import { Footer } from "@/components/layout/Footer";
import { RegisterForm } from "@/components/academy/register/RegisterForm";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-[#04060f] text-white flex flex-col pt-0">

        <section className="relative pt-[70px] pb-24 sm:pt-[90px] sm:pb-32 flex-grow overflow-hidden">
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/8 blur-[150px] pointer-events-none" />

          <div className="site-shell relative z-10">
            <button
              type="button"
              onClick={() => router.back()}
              className="mb-8 inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-xs font-semibold text-slate-300 transition-all hover-fine:border-accent/40 hover-fine:text-accent active:scale-95"
              aria-label="Back to previous page"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>
            <RegisterForm />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
