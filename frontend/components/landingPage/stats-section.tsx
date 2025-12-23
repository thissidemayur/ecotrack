"use client";

import { Database, Zap, Cpu } from "lucide-react";

const stats = [
  {
    icon: Database,
    value: "500+",
    label: "Emission Factors",
    description: "Mapped to localized regional data",
    color: "text-blue-500",
  },
  {
    icon: Cpu,
    value: "100%",
    label: "Calculated CO₂e",
    description: "Standardized GWP-100 metrics",
    color: "text-emerald-500",
  },
  {
    icon: Zap,
    value: "< 200ms",
    label: "Engine Latency",
    description: "High-performance data processing",
    color: "text-amber-500",
  },
];

export function StatsSection() {
  return (
    <section className="py-24 bg-zinc-950 border-y border-zinc-900 relative">
      {/* Decorative vertical lines for a technical look */}
      <div className="absolute inset-0 flex justify-around pointer-events-none opacity-[0.03]">
        <div className="w-px h-full bg-white" />
        <div className="w-px h-full bg-white" />
        <div className="w-px h-full bg-white" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-24">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4 group"
            >
              {/* Icon with a subtle "pulse" glow */}
              <div className="relative mb-2">
                <div className="absolute inset-0 bg-white/5 blur-xl rounded-full scale-150" />
                <stat.icon
                  className={`size-8 ${stat.color} relative z-10 transition-transform duration-500 group-hover:scale-110`}
                />
              </div>

              <div className="space-y-1">
                <div className="text-4xl md:text-6xl font-black text-white tracking-tighter italic font-mono">
                  {stat.value}
                </div>
                <div className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </div>

              <div className="text-sm text-zinc-500 max-w-[200px] leading-relaxed italic">
                {stat.description}
              </div>

              {/* Technical "Status" light */}
              <div className="pt-4 flex items-center gap-2">
                <div className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                <span className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest">
                  System_Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
