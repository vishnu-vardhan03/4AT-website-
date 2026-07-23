"use client";

import React from "react";
import { Nav } from "@/components/layout/MainNav";
import { Footer } from "@/components/layout/Footer";
import { RegisterForm } from "@/components/academy/register/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <Nav />
      <div className="min-h-screen bg-[#04060f] text-white flex flex-col pt-0">

        <section className="relative pt-[70px] pb-24 sm:pt-[90px] sm:pb-32 flex-grow overflow-hidden">
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/8 blur-[150px] pointer-events-none" />

          <div className="site-shell relative z-10">
            <RegisterForm />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
