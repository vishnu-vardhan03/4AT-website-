"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type DeferredSectionName =
  | "course-directory"
  | "features"
  | "how-it-works"
  | "lms-courses"
  | "target-audience"
  | "enrollment-cta";

type DeferredSectionProps = {
  section: DeferredSectionName;
  sectionId: string;
  href?: string;
};

const CourseDirectory = dynamic(
  () => import("@/components/academy/CourseDirectory").then((mod) => mod.CourseDirectory),
  {
    ssr: false,
    loading: () => <SectionSkeleton minHeight="860px" />,
  }
);

const Features = dynamic(
  () => import("@/components/academy/Features").then((mod) => mod.Features),
  {
    ssr: false,
    loading: () => <SectionSkeleton minHeight="980px" />,
  }
);

const HowItWorks = dynamic(
  () => import("@/components/academy/HowItWorks").then((mod) => mod.HowItWorks),
  {
    ssr: false,
    loading: () => <SectionSkeleton minHeight="1100px" />,
  }
);

const LmsCourses = dynamic(
  () => import("@/components/academy/LmsCourses").then((mod) => mod.LmsCourses),
  {
    ssr: false,
    loading: () => <SectionSkeleton minHeight="980px" />,
  }
);

const TargetAudience = dynamic(
  () => import("@/components/academy/TargetAudience").then((mod) => mod.TargetAudience),
  {
    ssr: false,
    loading: () => <SectionSkeleton minHeight="980px" />,
  }
);

const EnrollmentCTA = dynamic(
  () => import("@/components/academy/EnrollmentCTA").then((mod) => mod.EnrollmentCTA),
  {
    ssr: false,
    loading: () => <SectionSkeleton minHeight="760px" />,
  }
);

function SectionSkeleton({ minHeight }: { minHeight: string }) {
  return (
    <div
      aria-hidden="true"
      className="site-shell section-frame py-10"
      style={{ minHeight }}
    >
      <div className="h-full w-full animate-pulse rounded-[28px] border border-border/70 bg-surface/70" />
    </div>
  );
}

export function DeferredSection({ section, sectionId, href }: DeferredSectionProps) {
  const hostRef = useRef<HTMLElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // If the element's bottom is already above the viewport top (scrolled past), load it immediately
    const rect = host.getBoundingClientRect();
    if (rect.bottom < 0) {
      setIsReady(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" }
    );

    observer.observe(host);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isReady) {
      ScrollTrigger.refresh();
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  return (
    <section 
      ref={hostRef} 
      id={sectionId} 
      className="w-full relative"
    >
      {isReady ? (
        <div key="loaded-wrapper">
          {(() => {
            const innerId = `${sectionId}-inner`;
            switch (section) {
              case "course-directory":
                return <CourseDirectory sectionId={innerId} />;
              case "features":
                return <Features sectionId={innerId} />;
              case "how-it-works":
                return <HowItWorks sectionId={innerId} />;
              case "lms-courses":
                return <LmsCourses sectionId={innerId} />;
              case "target-audience":
                return <TargetAudience sectionId={innerId} />;
              case "enrollment-cta":
                return <EnrollmentCTA sectionId={innerId} href={href ?? "/academy/register"} />;
              default:
                return null;
            }
          })()}
        </div>
      ) : (
        <div key="skeleton-wrapper" className="site-shell section-frame py-10">
          <SectionSkeleton minHeight={getSkeletonHeight(section)} />
        </div>
      )}
    </section>
  );
}

function getSkeletonHeight(section: DeferredSectionName) {
  switch (section) {
    case "course-directory":
      return "860px";
    case "features":
      return "980px";
    case "how-it-works":
      return "1100px";
    case "lms-courses":
      return "980px";
    case "target-audience":
      return "980px";
    case "enrollment-cta":
      return "760px";
    default:
      return "800px";
  }
}
