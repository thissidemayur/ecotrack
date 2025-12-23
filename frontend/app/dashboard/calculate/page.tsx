"use client";

import { CarbonCalculationForm } from "@/components/form/carbon-calculation-form";
import { useFootprintStore } from "@/state/useFootprintStore";
import { FootprintResultView } from "@/components/dashboard/FootprintResultView";
import { Calculator, Sparkles, Info } from "lucide-react";

export default function CalculatePage() {
  const lastResult = useFootprintStore((state) => state.lastResult);

  return (
    <div className="min-h-full pb-20">
      {/* 1. Header Section with Modern Typography */}
      <div className="relative mb-8 space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-emerald-500">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Calculator className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest">
              Environmental Impact
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Footprint <span className="text-emerald-500">Calculator</span>
          </h1>

          <p className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
            Measure your ecological impact by tracking household activities. Our
            algorithm uses real-time emission factors to provide accurate data.
          </p>
        </div>

        {/* 2. Interactive Tip (Modern UI Touch) */}
        {!lastResult && (
          <div className="flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 text-sm animate-in fade-in slide-in-from-top-2 duration-500">
            <Info className="w-5 h-5 shrink-0" />
            <p>
              Gather your monthly utility bills and travel logs for the most
              accurate calculation.
            </p>
          </div>
        )}
      </div>

      {/* 3. Conditional Rendering with Smooth Transitions */}
      <div className="relative mx-auto">
        {lastResult ? (
          <div className="animate-in fade-in zoom-in duration-500">
            <FootprintResultView data={lastResult} />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto lg:mx-0">
            {/* Adding a subtle background glow behind the form 
                for a modern "portal" feel
             */}
            <div className="relative p-0.5 rounded-[2rem] bg-gradient-to-b from-zinc-800 to-transparent">
              <div className="bg-zinc-950 rounded-[1.9rem] p-4 md:p-8 shadow-2xl">
                <CarbonCalculationForm />
              </div>
            </div>
          </div>
        )}
      </div>

  
    </div>
  );
}
