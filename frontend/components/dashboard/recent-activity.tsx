"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, History, Calendar, CheckCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ICarbpnCalculationData } from "@/types/footprintApi.type";

export function RecentActivity({
  activities,
}: {
  activities: ICarbpnCalculationData[];
}) {
  // We only show the latest 5 entries for the dashboard preview
  const recentItems = activities.slice(-5).reverse();

  return (
    <Card className="bg-zinc-900/30 border-zinc-900 rounded-[2rem] overflow-hidden backdrop-blur-md">
      <CardHeader className="p-6 border-b border-zinc-900 bg-zinc-900/40 flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-white flex items-center gap-2 font-bold tracking-tight text-lg">
            <History className="size-4 text-emerald-500" />
            Previous Logs
          </CardTitle>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            Your latest calculations
          </p>
        </div>
        <Link href="/dashboard/history">
          <Button
            variant="ghost"
            size="sm"
            className="text-[10px] font-bold text-zinc-400 hover:text-emerald-500 uppercase tracking-widest"
          >
            See Full History
          </Button>
        </Link>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-zinc-900">
          {recentItems.length > 0 ? (
            recentItems.map((item, indx) => (
              <div
                key={indx}
                className="group flex items-center justify-between p-4 md:p-6 hover:bg-emerald-500/[0.02] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {/* Visual indicator: Red for high impact, Green for lower */}
                    <div
                      className={cn(
                        "size-2.5 rounded-full",
                        item.results.total_co2e > 500
                          ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.3)]"
                          : "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                      )}
                    />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">
                      {/* Format month name if possible, otherwise show period */}
                      Results for {item.period}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-medium text-zinc-500 uppercase">
                      <Calendar className="size-3" />
                      Saved on{" "}
                      {new Date(item.dateCalculated).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end gap-1">
                  <p className="text-base font-black text-white tracking-tight">
                    {item.results.total_co2e.toLocaleString()}{" "}
                    <span className="text-[10px] text-zinc-500 font-bold">
                      KG
                    </span>
                  </p>
                  <div className="flex items-center gap-1.5 opacity-60">
                    <span className="text-[9px] font-bold text-zinc-600 uppercase">
                      Saved Successfully
                    </span>
                    <CheckCircle className="size-2.5 text-zinc-700" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-16 text-center space-y-3">
              <History className="size-10 mx-auto text-zinc-800" />
              <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">
                No history found yet
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
