"use client";

import { Card } from "@/components/ui/card";
import {
  Zap,
  Car,
  ShoppingBag,
  Trash2,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function LastResultHero({ lastResult }: { lastResult: any }) {
  if (!lastResult) return null;

  const { total_co2e, breakdown_co2e } = lastResult.results;

  const breakdown = [
    {
      label: "Energy & Home",
      value: breakdown_co2e.energy,
      icon: Zap,
      color: "text-amber-500",
    },
    {
      label: "Travel & Transport",
      value: breakdown_co2e.transport,
      icon: Car,
      color: "text-blue-500",
    },
    {
      label: "Shopping & Food",
      value: breakdown_co2e.consumption,
      icon: ShoppingBag,
      color: "text-purple-500",
    },
    {
      label: "Waste & Trash",
      value: breakdown_co2e.waste,
      icon: Trash2,
      color: "text-emerald-500",
    },
  ];

  return (
    <Card className="bg-zinc-900/40 border-zinc-900 rounded-[2.5rem] overflow-hidden backdrop-blur-xl relative group">
      {/* Soft Decorative Glow */}
      <div className="absolute -top-24 -left-24 size-64 bg-emerald-500/5 blur-[100px] rounded-full group-hover:bg-emerald-500/10 transition-colors duration-1000" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10">
        {/* Left Side: Main Result */}
        <div className="lg:col-span-7 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-zinc-900 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="size-4 text-emerald-500" />
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Live Update
            </span>
          </div>

          <h2 className="text-sm font-bold text-zinc-400 mb-2">
            Your Last Calculation
          </h2>
          <div className="flex items-baseline gap-3">
            <span className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
              {total_co2e.toLocaleString()}
            </span>
            <span className="text-xl md:text-3xl font-bold text-zinc-700 uppercase">
              kg total
            </span>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-2">
              <CheckCircle2 className="size-3 text-emerald-500" />
              <span className="text-[10px] text-emerald-500 font-bold uppercase">
                Verified
              </span>
            </div>
            <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">
              Month: {lastResult.period}
            </span>
          </div>
        </div>

        {/* Right Side: Simple Breakdown */}
        <div className="lg:col-span-5 p-8 md:p-12 bg-zinc-950/30 space-y-8">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
            Where it comes from
          </h3>

          <div className="space-y-6">
            {breakdown.map((cat) => (
              <div key={cat.label} className="group/item">
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-3">
                    <cat.icon className={cn("size-4", cat.color)} />
                    <span className="text-xs font-bold text-zinc-300">
                      {cat.label}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-white">
                    {cat.value.toFixed(1)}{" "}
                    <span className="text-[10px] text-zinc-600 uppercase">
                      kg
                    </span>
                  </span>
                </div>

                {/* Visual Bar - Easy to read proportions */}
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full transition-all duration-1000 opacity-70",
                      cat.color.replace("text", "bg") // Use background color for the bar
                    )}
                    style={{ width: `${(cat.value / total_co2e) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
