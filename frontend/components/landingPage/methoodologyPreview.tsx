"use client";

import { Microscope, ArrowRight, Binary, Code2, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function MethodologyPreviewSection() {
  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden border-y border-zinc-900">
      {/* Background Decorative Element */}
      <div className="absolute left-0 top-0 h-full w-1/2 bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 1. The Visual Math Terminal */}
          <div className="relative group order-2 lg:order-1">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

            <div className="relative bg-zinc-900/90 border border-zinc-800 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-8 opacity-50">
                <Code2 className="size-4 text-emerald-500" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
                  Calculation_Core_v1.0
                </span>
              </div>

              {/* The Formula Output */}
              <div className="space-y-6">
                <p className="text-[10px] font-mono text-emerald-500/50 uppercase tracking-widest">
                  {"//"} Standardized_Emission_Equation
                </p>
                <div className="text-3xl md:text-5xl font-light text-white font-serif italic tracking-wide py-4">
                  {"$E = \\sum (A_{i} \\times EF_{i})$"}
                </div>

                {/* Variable Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-zinc-800/50">
                  <div className="flex items-center gap-3">
                    <div className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-xs font-mono text-zinc-400">
                      Activity_Data (A)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="size-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    <span className="text-xs font-mono text-zinc-400">
                      Emission_Factor (EF)
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative "Scanning" Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent animate-scan" />
            </div>
          </div>

          {/* 2. Copy & Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
              <Binary className="size-3 text-emerald-500" />
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                Scientific Rigor
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-none">
              Built on <br />
              <span className="text-emerald-500 not-italic uppercase">
                Real Science.
              </span>
            </h2>

            <p className="text-zinc-400 text-lg leading-relaxed">
              We don&apos;t believe in &quot;guesstimates.&quot; EcoTrack
              utilizes global standards from the IPCC and EPA to provide a
              verifiable carbon inventory of your lifestyle.
            </p>

            <ul className="space-y-4">
              {[
                {
                  icon: Cpu,
                  text: "Algorithms mapped to GHG Protocol standards.",
                },
                {
                  icon: Microscope,
                  text: "Regionally adjusted electricity grid factors.",
                },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 group">
                  <div className="p-2 bg-zinc-900 rounded-lg group-hover:text-emerald-500 transition-colors">
                    <item.icon className="size-4" />
                  </div>
                  <span className="text-sm text-zinc-500 group-hover:text-zinc-300 transition-colors italic">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Button
                asChild
                variant="link"
                className="text-emerald-500 p-0 h-auto hover:text-emerald-400 group"
              >
                <Link
                  href="/methodology"
                  className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
                >
                  Explore full methodology{" "}
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
