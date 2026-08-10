"use client";

import { DarkZoneWrapper } from "@/components/academy/DarkZoneWrapper";

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
          {children}
        </DarkZoneWrapper>
      </div>
    </div>
  );
}
