"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type DeferredSectionName =
  | "course-directory"
  | "features"
  | "how-it-works"
  | "courses"
  | "course-recommender";

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

const Courses = dynamic(
  () => import("@/components/academy/Courses").then((mod) => mod.Courses),
  {
    ssr: false,
    loading: () => <SectionSkeleton minHeight="980px" />,
  }
);

const CourseRecommender = dynamic(
  () => import("@/components/academy/CourseRecommender").then((mod) => mod.CourseRecommender),
  {
    ssr: false,
    loading: () => <SectionSkeleton minHeight="640px" />,
  }
);

function SectionSkeleton({ minHeight }: { minHeight: string }) {
  return (
    <div
      aria-hidden="true"
      className="site-shell py-10"
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
              case "courses":
                return <Courses sectionId={innerId} />;
              case "course-recommender":
                return <CourseRecommender sectionId={innerId} href={href ?? "/academy/register"} />;

              default:
                return null;
            }
          })()}
        </div>
      ) : (
        <div key="skeleton-wrapper" className="site-shell py-10">
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
    case "courses":
      return "980px";
    case "course-recommender":
      return "640px";

    default:
      return "800px";
  }
}
