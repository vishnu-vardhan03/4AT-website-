import { BarChart3 } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function GoogleAnalyticsPanel() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-white/[0.07]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-xl text-white">Website Traffic (Google Analytics)</CardTitle>
            <CardDescription className="mt-1 text-white/45">
              Sessions, visitors, channels, and traffic trends will appear here.
            </CardDescription>
          </div>
          <span className="shrink-0 rounded-full border border-amber-300/15 bg-amber-300/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-200/70">
            Coming soon
          </span>
        </div>
      </CardHeader>
      <CardContent className="relative p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {["Active users", "Sessions", "Engagement rate"].map((label) => (
            <div key={label} className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
              <p className="text-xs text-white/35">{label}</p>
              <Skeleton className="mt-3 h-7 w-20" />
            </div>
          ))}
        </div>
        <div className="relative mt-4 h-56 overflow-hidden rounded-xl border border-dashed border-white/10 bg-white/[0.018] p-5">
          <div className="flex h-full items-end gap-2 opacity-35" aria-hidden="true">
            {[38, 56, 42, 70, 53, 82, 62, 76, 58, 88, 72, 92].map((height, index) => (
              <Skeleton key={index} className="w-full rounded-t-md rounded-b-none" style={{ height: `${height}%` }} />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-[#070a15]/40 backdrop-blur-[2px]">
            <div className="flex flex-col items-center text-center">
              <BarChart3 aria-hidden="true" className="h-7 w-7 text-white/35" />
              <p className="mt-3 text-sm font-semibold text-white/65">GA4 integration coming soon</p>
              <p className="mt-1 max-w-xs text-xs leading-relaxed text-white/35">
                Connect a Google Analytics property to activate website traffic reporting.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
