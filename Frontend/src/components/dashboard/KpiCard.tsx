import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type KpiCardProps = {
  label: string;
  value: number;
  icon: LucideIcon;
  accent: "sky" | "violet" | "emerald" | "brand";
};

const accents = {
  sky: { icon: "bg-sky-400/10 text-sky-300 ring-sky-400/20", glow: "bg-sky-400" },
  violet: { icon: "bg-violet-400/10 text-violet-300 ring-violet-400/20", glow: "bg-violet-400" },
  emerald: { icon: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20", glow: "bg-emerald-400" },
  brand: { icon: "bg-cyan-400/10 text-cyan-200 ring-cyan-400/20", glow: "bg-cyan-300" },
};

export function KpiCard({ label, value, icon: Icon, accent }: KpiCardProps) {
  const colors = accents[accent];

  return (
    <Card className="group relative overflow-hidden transition duration-300 hover:-translate-y-0.5 hover:border-white/15">
      <div className={cn("absolute inset-x-8 top-0 h-px opacity-70 blur-[1px]", colors.glow)} />
      <CardContent className="flex items-start justify-between p-5 sm:p-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">{label}</p>
          <p className="mt-4 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">
            {value.toLocaleString()}
          </p>
        </div>
        <div className={cn("rounded-xl p-3 ring-1", colors.icon)}>
          <Icon aria-hidden="true" className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}
