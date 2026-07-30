"use client";

import { SectionPill } from "./SectionPill";

export function About() {
  return (
    <section
      id="about"
      className="w-full bg-transparent text-white section-padding overflow-x-hidden relative flex items-center"
    >
      <div className="site-shell relative z-10 w-full">
        <div>
          <SectionPill>
            ABOUT ACADEMY
          </SectionPill>
        </div>
      </div>
    </section>
  );
}
