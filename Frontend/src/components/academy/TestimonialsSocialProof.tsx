"use client";

import FUITestimonialWithSlide from "@/components/ui/SlidingTestimonial";

export function TestimonialsSocialProof() {
  return (
    <section
      id="testimonials"
      className="site-shell bg-transparent text-white section-padding overflow-x-hidden relative"
    >
      {/* Background ambient lighting blobs */}
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] bg-[#1a1a1a]/8 rounded-full blur-[110px] pointer-events-none" />

      <FUITestimonialWithSlide />
    </section>
  );
}
