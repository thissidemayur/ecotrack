"use client";

import {
  BarChart3,
  Globe,
  Trophy,
  TrendingDown,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const benefits = [
  {
    icon: BarChart3,
    title: "High-Fidelity Analytics",
    description:
      "Visualize categorical emissions with granular interactive telemetry and historical trend mapping.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    size: "md:col-span-2",
  },
  {
    icon: Globe,
    title: "Macro Benchmarking",
    description:
      "Real-time comparison against regional and global household averages.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    size: "md:col-span-1",
  },
  {
    icon: ShieldCheck,
    title: "Zero-Party Security",
    description:
      "Your data is encrypted and strictly private. We never sell your environmental identity.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    size: "md:col-span-1",
  },
  {
    icon: Trophy,
    title: "Optimization Milestones",
    description:
      "Identify high-impact reduction opportunities and set systematic neutrality goals.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    size: "md:col-span-2",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-24 bg-zinc-950 px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <Badge
              variant="outline"
              className="border-emerald-500/30 text-emerald-500 bg-emerald-500/5 px-4 py-1"
            >
              Platform Capabilities
            </Badge>
            <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-none uppercase">
              Engineered for <br />{" "}
              <span className="text-emerald-500">Neutrality</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm md:text-right max-w-xs font-mono uppercase tracking-tight">
            {"//"} Advanced features designed for precise carbon lifecycle
            management.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={cn(
                "group relative p-8 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-900 transition-all duration-500 hover:border-emerald-500/30 overflow-hidden",
                benefit.size
              )}
            >
              {/* Subtle Ambient Glow inside cards */}
              <div className="absolute -right-10 -top-10 size-32 bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/10 transition-colors" />

              <div className="relative z-10 space-y-8 flex flex-col h-full justify-between">
                <div
                  className={cn(
                    "size-12 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                    benefit.bg
                  )}
                >
                  <benefit.icon className={cn("size-6", benefit.color)} />
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white tracking-tight italic">
                    {benefit.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">
                    {benefit.description}
                  </p>
                </div>

                {/* Technical watermark */}
                <div className="pt-4 flex items-center gap-2 text-[9px] font-mono text-zinc-700 group-hover:text-emerald-500/50 transition-colors">
                  <Zap className="size-3" /> READY_FOR_DEPLOYMENT
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
