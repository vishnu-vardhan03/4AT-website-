"use client";

import React from "react";
import { SectionPill } from "./SectionPill";

export function OurProgram({ sectionId = "program" }: { sectionId?: string }) {
  return (
    <section
      id={sectionId}
      className="w-full bg-transparent text-white section-padding overflow-x-hidden relative flex items-center"
    >
      <div className="site-shell relative z-10 w-full">
        {/* Left-Aligned Section Header Zone */}
        <div className="max-w-[1250px] w-full flex flex-col gap-4 text-left">
          <div>
            <SectionPill>
              OUR PROGRAM
            </SectionPill>
          </div>

          <h2 className="section-title w-full">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 font-sans">
              The FinTech Engineering Program
            </span>
          </h2>

          <p className="section-desc max-w-[1150px] mt-2">
            The FinTech Engineering Program (FEP) bridges the gap between academia and industry — equipping commerce graduates with the practical skills of a finance professional with 2–3 years&apos; experience, and a path to certification, internship and placement.
          </p>
        </div>
      </div>
    </section>
  );
}
