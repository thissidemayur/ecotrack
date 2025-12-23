"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Zap,
  Leaf,
  Globe,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useFootprintStore } from "@/state/useFootprintStore";

interface StatCardProps {
  label: string;
  value: string | number;
  unit: string;
  trend?: number;
  icon: any;
  color: "emerald" | "blue" | "amber" | "purple";
}

function KpiCard({
  label,
  value,
  unit,
  trend,
  icon: Icon,
  color,
}: StatCardProps) {
  const colorMap = {
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    purple: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  };

  return (
    <Card className="bg-zinc-900/40 border-zinc-900 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group hover:border-zinc-800 transition-all duration-300">
      <CardContent className="p-5 md:p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className={cn("p-2 rounded-xl border", colorMap[color])}>
            <Icon className="size-4 md:size-5" />
          </div>
          {trend !== undefined && trend !== 0 && (
            <div
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold",
                trend > 0
                  ? "bg-red-500/10 text-red-500"
                  : "bg-emerald-500/10 text-emerald-500"
              )}
            >
              {trend > 0 ? (
                <TrendingUp className="size-3" />
              ) : (
                <TrendingDown className="size-3" />
              )}
              {Math.abs(trend).toFixed(1)}%
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
            {label}
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl md:text-3xl font-black text-white tracking-tighter">
              {value}
            </span>
            <span className="text-[10px] text-zinc-600 font-bold uppercase">
              {unit}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SnapshotPulseGrid({
  lastResult,
  totalEmissions,
}: {
  lastResult: any;
  totalEmissions: number;
}) {
  const { analytics } = useFootprintStore();

  // Simple math to see if carbon went up or down compared to last month
  const emissionTrend = useMemo(() => {
    if (analytics.length < 2) return 0;
    const current = analytics[analytics.length - 1].totalEmissions;
    const previous = analytics[analytics.length - 2].totalEmissions;
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  }, [analytics]);

  const avgFootprint = useMemo(() => {
    if (analytics.length === 0) return 0;
    const total = analytics.reduce((acc, curr) => acc + curr.totalEmissions, 0);
    return (total / analytics.length).toFixed(1);
  }, [analytics]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <KpiCard
        label="Latest Entry"
        value={lastResult?.results?.total_co2e?.toFixed(1) || "0.0"}
        unit="kg"
        trend={emissionTrend}
        icon={Activity}
        color="emerald"
      />
      <KpiCard
        label="Total History"
        value={totalEmissions.toLocaleString()}
        unit="kg Total"
        icon={Globe}
        color="blue"
      />
      <KpiCard
        label="Monthly Average"
        value={avgFootprint}
        unit="kg / Month"
        icon={Zap}
        color="amber"
      />
      <KpiCard
        label="Records Logged"
        value={analytics.length}
        unit="Entries"
        icon={Leaf}
        color="purple"
      />
    </div>
  );
}
