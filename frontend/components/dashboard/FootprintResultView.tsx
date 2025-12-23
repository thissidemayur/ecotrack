"use client";

import { useFootprintStore } from "@/state/useFootprintStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Leaf,
  Zap,
  Car,
  ShoppingBag,
  Trash2,
  RefreshCcw,
  Activity,
  ShieldCheck,
  Share2,
} from "lucide-react";
import { ICarbpnCalculationData } from "@/types/footprintApi.type";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function FootprintResultView({
  data,
}: {
  data: ICarbpnCalculationData;
}) {
  const setLastResult = useFootprintStore((state) => state.setLastResult);

  const categories = [
    {
      label: "Energy",
      value: data.results.breakdown_co2e.energy,
      icon: Zap,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20",
    },
    {
      label: "Transport",
      value: data.results.breakdown_co2e.transport,
      icon: Car,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      border: "border-amber-400/20",
    },
    {
      label: "Consumption",
      value: data.results.breakdown_co2e.consumption,
      icon: ShoppingBag,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      border: "border-purple-400/20",
    },
    {
      label: "Waste",
      value: data.results.breakdown_co2e.waste,
      icon: Trash2,
      color: "text-red-400",
      bg: "bg-red-400/10",
      border: "border-red-400/20",
    },
  ];

  const TIME_PERIOD = data.period || "Current";
  const DATE_CALCULATED = new Date(data.dateCalculated).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10 animate-in fade-in slide-in-from-bottom-8 duration-700 overflow-x-hidden">
      {/* 1. TOP HEADER: Status & Identity */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <Activity className="size-5 text-emerald-500 animate-pulse" />
          </div>
          <div className="space-y-0.5 text-center md:text-left">
            <h3 className="text-xs font-mono font-black text-emerald-500 uppercase tracking-[0.3em]">
              Analysis_Complete
            </h3>
            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
              Calculated_On: {DATE_CALCULATED}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-zinc-800 bg-zinc-900/50 text-zinc-400 rounded-xl h-9 text-[10px] font-mono uppercase tracking-widest"
        >
          <Share2 className="mr-2 size-3" /> Export_Report
        </Button>
      </div>

      {/* 2. THE RESULT CARD: Hero Metric */}
      <Card className="bg-zinc-900/40 border-zinc-800 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden shadow-2xl relative">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Leaf className="size-64 text-emerald-500 -rotate-12" />
        </div>

        <CardHeader className="text-center pb-0 pt-10">
          <div className="mx-auto w-16 h-16 bg-zinc-950 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
            <Leaf className="w-8 h-8 text-emerald-500" />
          </div>
          <CardTitle className="text-2xl md:text-4xl font-black text-white italic tracking-tighter uppercase">
            Carbon <span className="text-emerald-500">Inventory</span>
          </CardTitle>
          <p className="text-zinc-500 text-sm font-medium mt-2">
            Temporal audit for the{" "}
            <span className="text-zinc-300 italic">[{TIME_PERIOD}]</span> cycle
          </p>
        </CardHeader>

        <CardContent className="p-6 md:p-10 space-y-10">
          {/* Main Score Display: Neon Depth */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-emerald-500/10 blur-xl rounded-[2rem] group-hover:bg-emerald-500/20 transition-all duration-700" />
            <div className="relative text-center p-10 bg-zinc-950/80 border border-emerald-500/10 rounded-[2rem] flex flex-col items-center justify-center">
              <h2 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter leading-none">
                {data.results.total_co2e.toLocaleString()}
              </h2>
              <div className="mt-4 flex flex-col items-center">
                <span className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-[0.4em]">
                  kg CO₂e Total Mass
                </span>
                <div className="mt-4 flex items-center gap-2 px-3 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
                  <ShieldCheck className="size-3 text-emerald-500" />
                  <span className="text-[9px] font-mono text-zinc-500 uppercase">
                    Verifiable_Data_Node
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Breakdown: Precision Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.label}
                className={cn(
                  "p-5 rounded-2xl border flex items-center justify-between transition-all duration-300 group hover:-translate-y-1",
                  cat.bg,
                  cat.border
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-zinc-950 rounded-lg group-hover:scale-110 transition-transform">
                    <cat.icon className={cn("size-4", cat.color)} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-zinc-400 text-[10px] font-mono uppercase tracking-widest font-bold">
                      {cat.label}
                    </span>
                    <span className="text-white text-lg font-black italic tracking-tighter">
                      {cat.value.toFixed(1)}
                      <span className="ml-1.5 text-[10px] not-italic text-zinc-500 font-mono uppercase">
                        kg CO₂e
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
            <Button
              onClick={() => setLastResult(null)}
              className="w-full sm:w-auto px-8 h-14 bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-black rounded-2xl text-xs uppercase italic tracking-widest shadow-xl shadow-emerald-900/20 transition-all active:scale-95"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Calculate New Footprint
            </Button>
            <Button
             
              variant="ghost"
              className= "  text-zinc-500 hover:text-black text-[10px] font-mono uppercase tracking-[0.2em]"
            >
              <Link  href={"/methodology"} >
              View_Full_Methodology
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Footer System Log */}
      <div className="mt-8 flex justify-center gap-6 opacity-30">
        <div className="flex items-center gap-2">
          <div className="size-1 rounded-full bg-emerald-500" />
          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
            System_Protocol_v2.1
          </span>
        </div>
        <div className="flex items-center gap-2 text-emerald-500">
          <span className="text-[8px] font-mono uppercase tracking-widest italic font-bold">
            Encrypted_Result
          </span>
        </div>
      </div>
    </div>
  );
}
