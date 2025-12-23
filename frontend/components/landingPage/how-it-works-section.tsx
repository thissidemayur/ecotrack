"use client";

import { FileText, Activity, Target, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: FileText,
    title: "Data Telemetry",
    label: "PHASE_01",
    description:
      "Log your monthly activity metrics across energy, transport, and consumption sectors via our secure interface.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Activity,
    title: "Analysis & Benchmarking",
    label: "PHASE_02",
    description:
      "Our engine applies localized emission factors to calculate your CO₂e, comparing results against global standards.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Target,
    title: "Optimization Strategy",
    label: "PHASE_03",
    description:
      "Visualize historical trends and receive data-driven recommendations to systematically reduce your footprint.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Subtle Background Grid for Technical Feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase">
            The <span className="text-emerald-500">Processing</span> Pipeline
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto font-medium">
            A three-stage protocol designed to transform raw lifestyle data into
            actionable environmental intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-zinc-900 -z-10 border-t border-dashed border-zinc-800" />

          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative p-8 bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/50 hover:bg-zinc-900/60"
            >
              {/* Step Counter Badge */}
              <div className="absolute -top-3 -right-3 px-3 py-1 bg-zinc-950 border border-zinc-800 rounded-full">
                <span className="text-[10px] font-mono font-bold text-zinc-500 tracking-widest group-hover:text-emerald-500 transition-colors">
                  {step.label}
                </span>
              </div>

              <div className="space-y-6">
                {/* Icon Wrapper */}
                <div
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-xl",
                    step.bg
                  )}
                >
                  <step.icon className={cn("w-7 h-7", step.color)} />
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white italic tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                    {step.description}
                  </p>
                </div>

                {/* Arrow indicator for the next step */}
                {index < 2 && (
                  <div className="pt-4 md:hidden">
                    <ArrowRight className="w-5 h-5 text-emerald-500 rotate-90 mx-auto opacity-50" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
