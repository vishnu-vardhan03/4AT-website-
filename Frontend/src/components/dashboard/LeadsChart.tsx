"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { LeadsStats } from "./types";

const categories = [
  { key: "academyLeads", name: "Academy", color: "#38bdf8" },
  { key: "consultingLeads", name: "Consulting", color: "#a78bfa" },
  { key: "aiLeads", name: "AI", color: "#34d399" },
] as const;

type LeadsChartProps = { stats: LeadsStats };

export function LeadsChart({ stats }: LeadsChartProps) {
  const data = categories.map((category) => ({
    name: category.name,
    value: stats[category.key],
    color: category.color,
  }));
  const hasLeads = stats.totalLeads > 0;

  return (
    <Card>
      <CardHeader className="border-b border-white/[0.07]">
        <CardTitle className="text-xl text-white">Leads by Category</CardTitle>
        <CardDescription className="mt-1 text-white/45">
          Current distribution across the 4AT business lines.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5 sm:p-6">
        <div className="mb-8 flex flex-wrap gap-x-6 gap-y-3" aria-label="Lead category legend">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2 text-xs font-semibold text-white/60">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              {item.name}
            </div>
          ))}
        </div>

        {hasLeads ? (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="h-[300px] min-w-0" aria-label="Donut chart of leads by category">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data} dataKey="value" nameKey="name" innerRadius={72} outerRadius={105} paddingAngle={4} stroke="none">
                    {data.map((item) => <Cell key={item.name} fill={item.color} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: "#f8fafc" }} />
                  <text x="50%" y="47%" textAnchor="middle" fill="#ffffff" fontSize="32" fontWeight="800">
                    {stats.totalLeads}
                  </text>
                  <text x="50%" y="57%" textAnchor="middle" fill="rgba(255,255,255,.45)" fontSize="12">
                    total leads
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="h-[300px] min-w-0" aria-label="Bar chart of leads by category">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ top: 12, right: 20, bottom: 12, left: 8 }}>
                  <CartesianGrid stroke="rgba(255,255,255,.06)" horizontal={false} />
                  <XAxis type="number" allowDecimals={false} stroke="rgba(255,255,255,.28)" tickLine={false} axisLine={false} />
                  <YAxis type="category" dataKey="name" width={78} stroke="rgba(255,255,255,.55)" tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: "rgba(255,255,255,.035)" }} contentStyle={tooltipStyle} itemStyle={{ color: "#f8fafc" }} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={28}>
                    {data.map((item) => <Cell key={item.name} fill={item.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="flex h-[300px] items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] text-sm text-white/45">
            No lead data is available yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const tooltipStyle = {
  border: "1px solid rgba(255,255,255,.12)",
  borderRadius: "12px",
  background: "#0b1020",
  boxShadow: "0 18px 50px rgba(0,0,0,.3)",
};
