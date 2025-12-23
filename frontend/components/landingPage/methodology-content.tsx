"use client";

import {
  Database,
  Zap,
  TreePine,
  Trash2,
  Microscope,
  BookOpen,
  LineChart,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MethodologyContent() {
  return (
    <div className="bg-zinc-950 text-zinc-300 pb-24">
      {/* 1. Header Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <Badge
            variant="outline"
            className="border-emerald-500/30 text-emerald-500 bg-emerald-500/5"
          >
            Scientific Rigor
          </Badge>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter italic">
            Calculation <span className="text-emerald-500">Methodology</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
            A transparent look at the standards, formulas, and data sources that
            power the EcoTrack engine.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 space-y-20">
        {/* 2. The Core Formula - LaTeX Style */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
            <Microscope className="size-6 text-emerald-500" />
            <h2 className="text-2xl font-bold text-white tracking-tight italic">
              The Math
            </h2>
          </div>

          <div className="relative p-1 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-transparent">
            <div className="bg-zinc-900/90 backdrop-blur-xl rounded-[1.4rem] p-8 md:p-12 text-center space-y-6">
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
                Standardized Emission Equation
              </p>

              {/* Re-inserted the actual formula here */}
              <div className="text-2xl md:text-4xl font-light text-white font-serif italic tracking-wide py-4">
                {"$E = \\sum (A_{i} \\times EF_{i})$"}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-zinc-800">
                <div className="space-y-1">
                  <p className="text-emerald-500 font-mono text-xl">{"$E$"}</p>
                  <p className="text-[10px] text-zinc-500 uppercase">
                    Total Emissions (kg CO₂e)
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-emerald-500 font-mono text-xl">
                    {"$A_i$"}
                  </p>
                  <p className="text-[10px] text-zinc-500 uppercase">
                    Activity Data (Unit)
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-emerald-500 font-mono text-xl">
                    {"$EF_i$"}
                  </p>
                  <p className="text-[10px] text-zinc-500 uppercase">
                    Emission Factor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 3. Categorized Factors */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
            <Database className="size-6 text-emerald-500" />
            <h2 className="text-2xl font-bold text-white tracking-tight italic">
              Emission Factors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Energy",
                icon: Zap,
                color: "text-amber-400",
                list: ["Grid Electricity", "Natural Gas", "Heating Fuels"],
              },
              {
                title: "Transport",
                icon: LineChart,
                color: "text-blue-400",
                list: ["Petrol/Diesel", "Public Transit", "Aviation"],
              },
              {
                title: "Consumption",
                icon: TreePine,
                color: "text-emerald-400",
                list: ["Food Supply Chain", "Goods & Services", "Water Usage"],
              },
              {
                title: "Waste",
                icon: Trash2,
                color: "text-rose-400",
                list: ["Landfill Methane", "Recycling Offsets", "Compost"],
              },
            ].map((cat, i) => (
              <Card
                key={i}
                className="bg-zinc-900/40 border-zinc-800 p-6 space-y-4 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <cat.icon className={cn("size-5", cat.color)} />
                  <h3 className="font-bold text-white">{cat.title}</h3>
                </div>
                <ul className="space-y-2">
                  {cat.list.map((item, j) => (
                    <li
                      key={j}
                      className="text-xs text-zinc-500 flex items-center gap-2"
                    >
                      <div className="size-1 rounded-full bg-zinc-700" /> {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* 4. Verified Sources - Logogrid style */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
            <BookOpen className="size-6 text-emerald-500" />
            <h2 className="text-2xl font-bold text-white tracking-tight italic">
              Data Sources
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["EPA", "DEFRA", "IEA", "GHG Protocol"].map((source) => (
              <div
                key={source}
                className="h-20 flex items-center justify-center bg-zinc-900/50 border border-zinc-800 rounded-xl grayscale hover:grayscale-0 transition-all cursor-default group"
              >
                <span className="text-zinc-500 group-hover:text-emerald-500 font-black tracking-widest">
                  {source}
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm text-center text-zinc-500 italic">
            Factors are updated annually to reflect changes in the global energy
            mix.
          </p>
        </section>

        {/* 5. CO2e Explanation */}
        <section className="p-8 rounded-[2rem] bg-zinc-900/50 border border-zinc-800 space-y-4 relative overflow-hidden">
          <ShieldCheck className="absolute -right-4 -bottom-4 size-32 text-emerald-500/5" />
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Understanding $CO_{2}e$
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed relative z-10">
            Carbon Dioxide Equivalent ($CO_{2}e$) is the standard metric used to
            compare the emissions from various greenhouse gases on the basis of
            their global-warming potential (GWP). For example, while Methane
            ($CH_{4}$) is shorter-lived, it is **25 times** more potent than
            $CO_{2}$ over a 100-year period. Our engine normalizes these
            variables so you get a single, actionable score.
          </p>
        </section>
      </div>
    </div>
  );
}
