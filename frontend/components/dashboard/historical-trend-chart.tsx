"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useFootprintStore } from "@/state/useFootprintStore";
import { Activity, Maximize2, Database } from "lucide-react";
import { cn } from "@/lib/utils";

type DateRange = "6months" | "12months" | "all";

export function HistoricalTrendChart() {
  const { analytics } = useFootprintStore();
  const [dateRange, setDateRange] = useState<DateRange>("12months");

  const chartData = useMemo(() => {
    if (!analytics || !Array.isArray(analytics) || analytics.length === 0)
      return [];

    const limit =
      dateRange === "6months"
        ? 6
        : dateRange === "12months"
        ? 12
        : analytics.length;

    return analytics.slice(-limit).map((item) => ({
      month: item.month,
      total_co2e: item.totalEmissions || (item as any).totalEmmissions || 0,
    }));
  }, [analytics, dateRange]);

  return (
    // Responsive rounded corners: smaller on mobile, 2.5rem on desktop
    <Card className="bg-zinc-900/30 border-zinc-900 rounded-[1.5rem] md:rounded-[2.5rem] h-full flex flex-col backdrop-blur-md overflow-hidden group">
      <CardHeader className="p-4 md:p-6 pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-white flex items-center gap-2 font-black italic tracking-tighter uppercase text-base md:text-lg">
              <Activity className="size-4 text-emerald-500 animate-pulse" />
              Emission_Timeline
            </CardTitle>
            <p className="text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] italic">
              {"//"} Sequential_Telemetry
            </p>
          </div>

          <div className="flex items-center gap-1 bg-zinc-950/50 p-1 rounded-xl border border-zinc-800 self-start sm:self-auto">
            {(["6months", "12months", "all"] as const).map((range) => (
              <Button
                key={range}
                variant="ghost"
                size="sm"
                onClick={() => setDateRange(range)}
                className={cn(
                  "text-[8px] md:text-[9px] font-mono uppercase tracking-widest h-6 md:h-7 px-2 md:px-3 rounded-lg transition-all",
                  dateRange === range
                    ? "bg-emerald-600 text-zinc-950 font-black"
                    : "text-zinc-500 hover:text-white hover:bg-zinc-800"
                )}
              >
                {range === "6months"
                  ? "06M"
                  : range === "12months"
                  ? "12M"
                  : "MAX"}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-2 md:p-4 pt-4 flex-1 min-h-[250px] md:min-h-[300px] relative">
        {/* Background Grid Pattern Overlay - hidden on small mobile to keep it clean */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] mx-4 md:mx-6 mb-12 hidden sm:block" />

        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              // Adaptive Margins: more left margin on mobile to show Y labels
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#27272a"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke="#3f3f46"
                fontSize={8} // Smaller font for mobile
                fontFamily="var(--font-mono)"
                tickLine={false}
                axisLine={false}
                dy={10}
                tickFormatter={(value) => {
                  const parts = value.split("-");
                  // On mobile, show only month to save space
                  if (parts.length >= 2) {
                    return window.innerWidth < 640
                      ? parts[1]
                      : `${parts[1]}/${parts[0].slice(2)}`;
                  }
                  return value;
                }}
              />
              <YAxis
                stroke="#3f3f46"
                fontSize={8}
                fontFamily="var(--font-mono)"
                tickLine={false}
                axisLine={false}
                width={35} // Explicit width helps prevent labels from being cut off
                tickFormatter={(value) =>
                  value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value
                }
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-zinc-950 border border-zinc-800 p-2 md:p-3 rounded-xl shadow-2xl backdrop-blur-xl">
                        <p className="text-[8px] md:text-[10px] font-mono text-zinc-500 uppercase mb-1 tracking-widest">
                          {label}
                        </p>
                        <p className="text-xs md:text-sm font-black text-white italic">
                          {payload[0].value}{" "}
                          <span className="text-[8px] md:text-[10px] text-emerald-500 not-italic uppercase tracking-tighter">
                            kg CO₂e
                          </span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
                cursor={{
                  stroke: "#10b981",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
              />
              <Area
                type="monotone"
                dataKey="total_co2e"
                stroke="#10b981"
                strokeWidth={2} // Thinner line on mobile
                fillOpacity={1}
                fill="url(#colorEmissions)"
                animationDuration={1500}
                activeDot={{
                  r: 4,
                  fill: "#10b981",
                  stroke: "#09090b",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-zinc-700 space-y-4 font-mono">
            <Database className="size-6 md:size-8 opacity-20" />
            <p className="text-[8px] md:text-[10px] uppercase tracking-[0.2em]">
              No_Data_Detected
            </p>
          </div>
        )}
      </CardContent>

      {/* Chart Footer metadata */}
      <div className="px-4 md:px-8 pb-4 md:pb-6 flex items-center justify-between opacity-30">
        <div className="flex items-center gap-2 text-[8px] md:text-[9px] font-mono uppercase tracking-widest">
          <div className="size-1 md:size-1.5 rounded-full bg-emerald-500" />
          Verifiable_Stream
        </div>
        <Maximize2 className="size-3 cursor-pointer hover:text-emerald-500 transition-colors" />
      </div>
    </Card>
  );
}
