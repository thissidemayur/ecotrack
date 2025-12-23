"use client";

import { useMemo } from "react";
import { Leaf, Activity, Info, Target, ScanText } from "lucide-react";
import { Label, Pie, PieChart, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IFootprintBreakdown } from "@/types/footprintApi.type";
import { cn } from "@/lib/utils";

interface FootprintBreakdownChartProps {
  total_co2e: number;
  breakdown_co2e: IFootprintBreakdown;
}

const GLOBAL_AVERAGE = 410;
const SOURCE_OF_GLOBAL_AVERAGE = "IEA_2025_GLOBAL_REVIEW";

const chartConfig = {
  energy: { label: "Energy", color: "#3b82f6" }, // Deep Blue
  transport: { label: "Transport", color: "#f59e0b" }, // Amber
  consumption: { label: "Consumption", color: "#8b5cf6" }, // Purple
  waste: { label: "Waste", color: "#ef4444" }, // Red
} satisfies ChartConfig;

export function FootprintBreakdownChart({
  breakdown_co2e,
  total_co2e,
}: FootprintBreakdownChartProps) {
  const percentageDiff = ((total_co2e - GLOBAL_AVERAGE) / GLOBAL_AVERAGE) * 100;
  const isAboveAverage = percentageDiff > 0;

  return (
    <Card className="bg-zinc-900/30 border-zinc-900 rounded-[2.5rem] h-full flex flex-col backdrop-blur-md overflow-hidden">
      <CardHeader className="space-y-1 p-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2 font-black italic tracking-tighter uppercase text-lg">
            <ScanText className="size-4 text-emerald-500" />
            Sector_Breakdown
          </CardTitle>
          <BadgeCheck className="size-4 text-emerald-500/30" />
        </div>
        <CardDescription className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] italic">
          {"//"} Categorical_Mass_Distribution
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8 p-6 pt-0 flex-1 flex flex-col justify-between">
        <PieChartComponent
          breakdown_co2e={breakdown_co2e}
          total_co2e={total_co2e}
        />

        <ComparisonWithGlobalAverage
          isAboveAverage={isAboveAverage}
          percentageDiff={percentageDiff}
          total={total_co2e}
        />
      </CardContent>
    </Card>
  );
}

function PieChartComponent({
  breakdown_co2e,
  total_co2e,
}: FootprintBreakdownChartProps) {
  const chartData = useMemo(
    () => [
      {
        category: "energy",
        value: breakdown_co2e.energy,
        color: chartConfig.energy.color,
      },
      {
        category: "transport",
        value: breakdown_co2e.transport,
        color: chartConfig.transport.color,
      },
      {
        category: "consumption",
        value: breakdown_co2e.consumption,
        color: chartConfig.consumption.color,
      },
      {
        category: "waste",
        value: breakdown_co2e.waste,
        color: chartConfig.waste.color,
      },
    ],
    [breakdown_co2e]
  );

  return (
    <div className="w-full flex-1 min-h-[250px] relative">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="category"
            innerRadius="72%"
            outerRadius="90%"
            strokeWidth={8}
            stroke="transparent"
            paddingAngle={5}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                className="hover:opacity-80 transition-opacity"
              />
            ))}
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-white text-4xl font-black italic tracking-tighter"
                      >
                        {total_co2e.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-zinc-500 font-mono text-[10px] uppercase tracking-widest font-bold"
                      >
                        TOTAL_KG
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}

function ComparisonWithGlobalAverage({
  isAboveAverage,
  percentageDiff,
  total,
}: {
  isAboveAverage: boolean;
  percentageDiff: number;
  total: number;
}) {
  const progressPercentage = Math.min(
    (total / (GLOBAL_AVERAGE * 2)) * 100,
    100
  );

  return (
    <div className="relative overflow-hidden rounded-3xl bg-zinc-950/60 border border-zinc-800/50 p-6 group">
      {/* Decorative scanning line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="relative space-y-5">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-[9px] font-mono font-black text-zinc-600 uppercase tracking-[0.3em]">
              Peer_Benchmark
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white italic tracking-tighter">
                {total.toLocaleString()}
              </span>
              <span className="text-zinc-600 font-mono text-[10px] uppercase tracking-tighter">
                / {GLOBAL_AVERAGE} avg
              </span>
            </div>
          </div>

          <div
            className={cn(
              "flex flex-col items-end px-3 py-1.5 rounded-xl border transition-colors",
              isAboveAverage
                ? "bg-red-500/5 border-red-500/20"
                : "bg-emerald-500/5 border-emerald-500/20"
            )}
          >
            <span
              className={cn(
                "text-lg font-black italic leading-none tracking-tighter",
                isAboveAverage ? "text-red-500" : "text-emerald-500"
              )}
            >
              {isAboveAverage ? "↑" : "↓"} {Math.abs(percentageDiff).toFixed(1)}
              %
            </span>
            <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-600 font-bold mt-1">
              {isAboveAverage ? "CRITICAL_DELTA" : "OPTIMIZED_FLOW"}
            </span>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/50 p-[1px]">
            <div
              className={cn(
                "h-full transition-all duration-1000 ease-out rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]",
                isAboveAverage
                  ? "bg-red-500 shadow-red-500/20"
                  : "bg-emerald-500 shadow-emerald-500/20"
              )}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-tighter">
            <span>00_MIN</span>
            <span className="text-zinc-700">
              Baseline_Limit: {GLOBAL_AVERAGE}
            </span>
            <span>02_MAX</span>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-zinc-800/50">
          <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
            <Activity className="size-3 text-zinc-500" />
            <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest leading-none">
              Source: {SOURCE_OF_GLOBAL_AVERAGE}
            </span>
          </div>
          <Target className="size-3 text-zinc-700" />
        </div>
      </div>
    </div>
  );
}

// Minimal Badge-like helper since standard Lucid icon isn't imported
function BadgeCheck({ className }: { className?: string }) {
  return <Activity className={className} />;
}
