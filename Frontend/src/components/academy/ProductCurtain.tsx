"use client";

import { DarkZoneWrapper } from "@/components/academy/DarkZoneWrapper";
import { DeferredSection } from "@/components/academy/DeferredSection";

export function ProductCurtain({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {/* Dark Zone */}
      <div className="relative z-30 zone-dark">
        <DarkZoneWrapper>
          <DeferredSection section="target-audience" sectionId="audience" />

          {children}
        </DarkZoneWrapper>
      </div>
    </div>
  );
}
