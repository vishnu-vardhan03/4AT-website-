"use client";

import FUITestimonialWithSlide from "@/components/ui/SlidingTestimonial";

export function TestimonialsSocialProof() {
  return (
    <section
      id="testimonials"
      className="w-full bg-transparent text-white pt-2 md:pt-4 pb-12 md:pb-16 overflow-x-hidden relative max-w-full"
    >
      {/* Background ambient lighting blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] max-w-full h-[450px] bg-[#1a1a1a]/8 rounded-full blur-[110px]" />
      </div>

      <FUITestimonialWithSlide />
    </section>
  );
}
