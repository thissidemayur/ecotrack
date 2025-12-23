"use client";

import { useEffect, useMemo } from "react";
import { useFootprintStore } from "@/state/useFootprintStore";
import { DashboardWrapper } from "@/components/providers/DashboardProvider";
import { SnapshotPulseGrid } from "@/components/dashboard/snapshot";
import { LastResultHero } from "@/components/dashboard/LastResultHero";
import { HistoricalTrendChart } from "@/components/dashboard/historical-trend-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { Button } from "@/components/ui/button";
import { Plus, Activity, Terminal, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useFootprintApi } from "@/hooks/useFootprintApi";

export default function RootDashboard() {
  const { allResults, lastResult, isLoading, analytics } = useFootprintStore();
  const { refreshDashboard } = useFootprintApi();

  useEffect(() => {
    refreshDashboard();
  }, [refreshDashboard]);

  // Calculate global cumulative mass for the Pulse Grid
  const totalCumulativeEmissions = useMemo(() => {
    return analytics.reduce((sum, currentMonth) => {
      return sum + currentMonth.totalEmissions;
    }, 0); // Start the sum at 0
  }, [analytics]); 

  if (isLoading && allResults.length === 0) {
    return (
      <DashboardWrapper className="flex flex-col items-center justify-center min-h-[70vh]">
        <Activity className="size-10 text-emerald-500 animate-spin mb-4" />
        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">
          Syncing_Global_Nodes...
        </p>
      </DashboardWrapper>
    );
  }

  return (
    <DashboardWrapper>
      <div className="space-y-8 md:space-y-12">
        {/* 1. COMMAND HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Terminal className="size-3 text-emerald-500" />
              <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] font-black italic">
                Mission_Control_v1.0.0
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
              Command <span className="text-emerald-500">Center</span>
            </h1>
            <p className="text-zinc-500 font-medium italic text-xs md:text-sm">
              Real-time synchronization of environmental telemetry nodes.
            </p>
          </div>

          <Link href={"/dashboard/calculate"} className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-black rounded-2xl h-12 px-8 uppercase italic tracking-widest shadow-xl shadow-emerald-900/20 active:scale-95 transition-all flex items-center">
            <Plus className="mr-2 size-4" /> New_Entry
          </Link>
        </header>

        {/* 2. TELEMETRY PULSE (KPIs) */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SnapshotPulseGrid
            lastResult={lastResult}
            totalEmissions={totalCumulativeEmissions}
          />
        </section>

        {/* 3. HERO SNAPSHOT: Total Mass & Sectoral Breakdown */}
        <section className="animate-in fade-in slide-in-from-bottom-6 duration-700">
          <LastResultHero lastResult={lastResult} />
        </section>

        {/* 4. HISTORICAL TRENDING */}
        <div className="grid grid-cols-1 gap-6">
          <div className="min-h-[400px] w-full min-w-0">
            <HistoricalTrendChart />
          </div>
        </div>

        {/* 5. RECENT ACTIVITY & SYSTEM INSIGHT */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* The list takes 2 columns on large screens, stacks on mobile */}
          <div className="lg:col-span-2 min-w-0">
            <RecentActivity activities={allResults} />
          </div>

          {/* Hardware-Style Insight Card */}
          <div className="bg-zinc-900/10 border border-zinc-900 rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 size-40 bg-emerald-500/5 blur-[50px] rounded-full group-hover:bg-emerald-500/10 transition-colors" />
            <div className="space-y-4 relative z-10">
              <h3 className="text-xs font-mono font-black text-zinc-500 uppercase tracking-widest italic decoration-emerald-500/20 underline underline-offset-8">
                {"//"} Node_Summary
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed italic">
                &quot;System telemetry indicates a stable trajectory. The latest
                emission node for{" "}
                <span className="text-emerald-500">{lastResult?.period}</span>{" "}
                has been successfully indexed and verified.&quot;
              </p>
            </div>
            <Link href="/dashboard/history">
              <Button
                variant="ghost"
                className="w-fit p-0 h-auto text-[10px] font-mono text-emerald-500 uppercase tracking-widest hover:bg-transparent group/btn"
              >
                Access_Deep_Audit{" "}
                <ArrowUpRight className="ml-2 size-3 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </DashboardWrapper>
  );
}
