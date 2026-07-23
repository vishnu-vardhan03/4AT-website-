"use client";

import dynamic from "next/dynamic";
import { ProductCurtain } from "@/components/academy/ProductCurtain";
import { DeferredSection } from "@/components/academy/DeferredSection";

const SectionLoader = () => <div className="h-[50vh] w-full animate-pulse bg-surface/50" />;

const About = dynamic(() => import("@/components/academy/About").then(mod => mod.About), { loading: () => <SectionLoader /> });
const CoreFeatures = dynamic(() => import("@/components/academy/CoreFeatures").then(mod => mod.CoreFeatures), { loading: () => <SectionLoader /> });
const CredibilityRecruiters = dynamic(() => import("@/components/academy/CredibilityRecruiters").then(mod => mod.CredibilityRecruiters), { loading: () => <SectionLoader /> });
const Faculty = dynamic(() => import("@/components/academy/Faculty").then(mod => mod.Faculty), { loading: () => <SectionLoader /> });
const TestimonialsSocialProof = dynamic(() => import("@/components/academy/TestimonialsSocialProof").then(mod => mod.TestimonialsSocialProof), { loading: () => <SectionLoader /> });

import { HowItWorks } from "@/components/academy/HowItWorks";

export function PageShell({ ctaRoute }: { ctaRoute: string }) {
  return (
    <>
      <About />
      <CoreFeatures />
      <ProductCurtain>
        <DeferredSection section="lms-courses" sectionId="courses" />
        <HowItWorks sectionId="features" />
        <CredibilityRecruiters />
        <Faculty />
        <TestimonialsSocialProof />
        <DeferredSection section="enrollment-cta" sectionId="enroll" href={ctaRoute} />
      </ProductCurtain>
    </>
  );
}

