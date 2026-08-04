"use client";

import dynamic from "next/dynamic";
import { ProductCurtain } from "@/components/academy/ProductCurtain";
import { DeferredSection } from "@/components/academy/DeferredSection";

const SectionLoader = () => <div className="h-[50vh] w-full animate-pulse bg-surface/50" />;

const About = dynamic(() => import("@/components/academy/About").then(mod => mod.About), { loading: () => <SectionLoader /> });
const OurProgram = dynamic(() => import("@/components/academy/OurProgram").then(mod => mod.OurProgram), { loading: () => <SectionLoader /> });
const Outcomes = dynamic(() => import("@/components/academy/Outcomes").then(mod => mod.Outcomes), { loading: () => <SectionLoader /> });
const Faculty = dynamic(() => import("@/components/academy/Faculty").then(mod => mod.Faculty), { loading: () => <SectionLoader /> });
const Testimonials = dynamic(() => import("@/components/academy/Testimonials").then(mod => mod.Testimonials), { loading: () => <SectionLoader /> });
const FAQ = dynamic(() => import("@/components/academy/FAQ").then(mod => mod.FAQ), { loading: () => <SectionLoader /> });
const CTA = dynamic(() => import("@/components/academy/CTA").then(mod => mod.CTA), { loading: () => <SectionLoader /> });



export function PageShell({ ctaRoute }: { ctaRoute: string }) {
  return (
    <>
      <About />
      <OurProgram />
      <Outcomes />
      <ProductCurtain>
        <DeferredSection section="courses" sectionId="courses" />
        <DeferredSection section="course-recommender" sectionId="course-recommender" href={ctaRoute} />
        <Faculty />
        <Testimonials />
        <FAQ />
        <CTA />
      </ProductCurtain>
    </>
  );
}

