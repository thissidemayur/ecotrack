"use client";

import { ActivityHeatmap } from "@/components/dashboard/activity-heatmap";
import { LogManagementTable } from "./log-management-table";
import { Leaderboards } from "./leaderboards";
import { KpiCards } from "./kpi-cards";

export function AdminContent() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">
          Monitor global analytics and manage platform data
        </p>
      </div>

      {/* Section A: Global KPIs */}
      <KpiCards />

      {/* Section B: Real-Time Leaderboards */}
      <Leaderboards />

      {/* Section D: Activity Heatmap */}
      <ActivityHeatmap />

      {/* Section C: Log Management Table */}
      <LogManagementTable />
    </div>
  );
}
