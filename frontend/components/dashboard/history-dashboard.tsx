"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HistoricalTrendChart } from "@/components/dashboard/historical-trend-chart";
import { FootprintBreakdownChart } from "@/components/dashboard/footprint-breakdown-chart";
import { FootprintLogDataTable } from "./footprint-dataTable";
import { footprintColumns } from "./footprint-columnTable";
import { useFootprintStore } from "@/state/useFootprintStore";
import { Table2, Activity, FileJson, History, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFootprintApi } from "@/hooks/useFootprintApi";
import { exportDataToJSON } from "@/lib/exportDataIntoJSON"; // Assuming you saved it here

export function HistoryDashboard() {
  const { allResults, isLoading, lastResult } = useFootprintStore();
  const { refreshDashboard } = useFootprintApi();

  useEffect(() => {
    refreshDashboard();
  }, [refreshDashboard]);

  const RECENT_DATA = lastResult || allResults.at(-1);

  if (isLoading && allResults.length === 0) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4 bg-zinc-950 px-6">
        <Activity className="size-10 text-emerald-500 animate-spin" />
        <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest text-center">
          Loading your history...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 md:space-y-10 p-4 md:p-6 lg:p-10 bg-zinc-950 min-h-screen overflow-x-hidden">
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full">
        <div className="space-y-2 w-full md:w-auto min-w-0">
          <Badge
            variant="outline"
            className="border-emerald-500/30 bg-emerald-500/5 text-emerald-500 font-bold text-[10px] uppercase tracking-widest px-3"
          >
            <History className="mr-1.5 size-3" /> Personal Records
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-none break-words">
            Past <span className="text-emerald-500">Results</span>
          </h1>
          <p className="text-zinc-500 font-medium text-xs md:text-sm">
            A complete look at your carbon footprint over time.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {/* Use the export function here */}
          <Button
            onClick={() => exportDataToJSON(allResults)}
            variant="outline"
            size="sm"
            className="flex-1 md:flex-none border-zinc-800 bg-zinc-900/50 text-zinc-400 rounded-xl font-bold text-[10px] h-9"
          >
            <FileJson className="mr-2 size-3" /> Download JSON
          </Button>
          <Button
            onClick={() => window.print()}
            size="sm"
            className="flex-1 md:flex-none bg-emerald-600 text-zinc-950 font-black rounded-xl text-[10px] h-9"
          >
            <Download className="mr-2 size-3" /> Save as PDF
          </Button>
        </div>
      </div>

      {/* 2. SUMMARY CARD */}
      <Card className="w-full bg-zinc-900/40 border-zinc-800 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden group">
        <CardHeader className="pb-2">
          <CardTitle className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            Latest Result
          </CardTitle>
          <CardDescription className="text-white font-bold flex items-center gap-2 text-xs md:text-sm">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            Showing data for: {RECENT_DATA?.period || "No data"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline flex-wrap gap-2 md:gap-3">
            <span className="text-5xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter italic leading-none">
              {RECENT_DATA?.results?.total_co2e?.toLocaleString() || 0}
            </span>
            <span className="text-xs md:text-2xl font-bold text-zinc-600 uppercase">
              kg Total
            </span>
          </div>
          <div className="mt-4 md:mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full w-full bg-emerald-500 opacity-80" />
            </div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">
              Calculation Verified
            </span>
          </div>
        </CardContent>
      </Card>

      {/* 3. CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 w-full">
        <Card className="min-w-0 bg-zinc-900/20 border-zinc-900 rounded-[1.5rem] p-4 md:p-6 overflow-hidden flex flex-col">
          <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-4">
            Progress Over Time
          </h3>
          <div className="flex-1 min-h-[250px] w-full">
            <HistoricalTrendChart />
          </div>
        </Card>

        <Card className="min-w-0 bg-zinc-900/20 border-zinc-900 rounded-[1.5rem] p-4 md:p-6 overflow-hidden flex flex-col">
          <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-4">
            Where it comes from
          </h3>
          <div className="flex-1 min-h-[250px] w-full">
            <FootprintBreakdownChart
              total_co2e={RECENT_DATA?.results?.total_co2e || 0}
              breakdown_co2e={
                RECENT_DATA?.results?.breakdown_co2e || {
                  energy: 0,
                  transport: 0,
                  consumption: 0,
                  waste: 0,
                }
              }
            />
          </div>
        </Card>
      </div>

      {/* 4. DATA TABLE */}
      <section className="space-y-4 w-full">
        <div className="flex items-center gap-3 px-2">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <Table2 className="size-4 text-emerald-500" />
          </div>
          <h2 className="text-lg md:text-2xl font-black text-white italic uppercase tracking-tighter">
            Detailed Logbook
          </h2>
        </div>

        <Card className="w-full bg-zinc-900/30 border-zinc-900 rounded-[1rem] overflow-hidden">
          <CardContent className="p-0 sm:p-4 md:p-8">
            <div className="w-full overflow-x-auto no-scrollbar">
              <FootprintLogDataTable
                columns={footprintColumns}
                data={allResults}
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
