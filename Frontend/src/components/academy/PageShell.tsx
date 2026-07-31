"use client";

import dynamic from "next/dynamic";
import { ProductCurtain } from "@/components/academy/ProductCurtain";
import { DeferredSection } from "@/components/academy/DeferredSection";

const SectionLoader = () => <div className="h-[50vh] w-full animate-pulse bg-surface/50" />;

const About = dynamic(() => import("@/components/academy/About").then(mod => mod.About), { loading: () => <SectionLoader /> });
const CoreFeatures = dynamic(() => import("@/components/academy/CoreFeatures").then(mod => mod.CoreFeatures), { loading: () => <SectionLoader /> });
const OurProgram = dynamic(() => import("@/components/academy/OurProgram").then(mod => mod.OurProgram), { loading: () => <SectionLoader /> });
const Faculty = dynamic(() => import("@/components/academy/Faculty").then(mod => mod.Faculty), { loading: () => <SectionLoader /> });
const TestimonialsSocialProof = dynamic(() => import("@/components/academy/TestimonialsSocialProof").then(mod => mod.TestimonialsSocialProof), { loading: () => <SectionLoader /> });
const AcademyFaq = dynamic(() => import("@/components/academy/AcademyFaq").then(mod => mod.AcademyFaq), { loading: () => <SectionLoader /> });
const FinalCTA = dynamic(() => import("@/components/academy/FinalCTA").then(mod => mod.FinalCTA), { loading: () => <SectionLoader /> });



export function PageShell({ ctaRoute }: { ctaRoute: string }) {
  return (
    <>
      <About />
      <CoreFeatures />
      <OurProgram />
      <ProductCurtain>
        <DeferredSection section="lms-courses" sectionId="courses" />
        <DeferredSection section="course-recommender" sectionId="course-recommender" href={ctaRoute} />
        <Faculty />
        <TestimonialsSocialProof />
        <AcademyFaq />
        <FinalCTA />
      </ProductCurtain>
    </>
  );
}

