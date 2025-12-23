"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Globe2,
  BarChart3,
  Fingerprint,
  Zap,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { IAdminSummary } from "@/types/admin.type";

interface AdminStatProps {
  label: string;
  value: string | number;
  description: string;
  icon: any;
  status?: "nominal" | "warning" | "critical";
}

function GlobalStatCard({
  label,
  value,
  description,
  icon: Icon,
  status = "nominal",
}: AdminStatProps) {
  return (
    <Card className="bg-zinc-900/40 border-zinc-900 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group transition-all duration-300 hover:border-red-500/20 shadow-2xl">
      <CardContent className="p-6 md:p-8 space-y-4">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500">
            <Icon className="size-5" />
          </div>
          <div
            className={cn(
              "size-2 rounded-full animate-pulse",
              status === "nominal"
                ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                : status === "warning"
                ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
            )}
          />
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em] font-black italic">
            {"//"} {label}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl font-black text-white italic tracking-tighter uppercase">
              {value}
            </span>
          </div>
          <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-relaxed">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function GlobalSummaryGrid({ summaryData }: { summaryData: IAdminSummary }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
      <GlobalStatCard
        label="Total_User_Nodes"
        value={summaryData?.totalUsers?.toLocaleString() || "0"}
        description="Active account registry in global database."
        icon={Users}
      />
      <GlobalStatCard
        label="Global_Avg_Impact"
        value={summaryData?.globalAverage?.toFixed(2) || "0.00"}
        description="Mean CO₂e mass calculated across all users."
        icon={Globe2}
        status="warning"
      />
      {/* <GlobalStatCard
        label="System_Throughput"
        value={summaryData?.totalLogsCount?.toLocaleString() || "0"}
        description="Total calculation requests processed."
        icon={BarChart3}
      /> */}
      {/* <GlobalStatCard
        label="Node_Validation"
        value={summaryData?.pendingValidations || "0"}
        description="Accounts awaiting identity verification."
        icon={Fingerprint}
        status={summaryData?.pendingValidations > 0 ? "critical" : "nominal"}
      /> */}
    </div>
  );
}
