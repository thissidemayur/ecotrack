"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Line, LineChart, ResponsiveContainer } from "recharts";

// Mock data for 3-month trend
const data = [
  { month: "Month 1", co2: 520 },
  { month: "Month 2", co2: 480 },
  { month: "Month 3", co2: 450 },
];

export function AnalyticsModule() {
  const currentFootprint = 450;
  const previousFootprint = 480;
  const percentageChange =
    ((currentFootprint - previousFootprint) / previousFootprint) * 100;
  const isReduction = percentageChange < 0;

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
        Your Carbon Impact
      </h3>

      {/* Current Monthly Footprint */}
      <div>
        <div className="text-3xl font-bold text-white">
          {currentFootprint}
          <span className="text-lg font-normal text-gray-400 ml-2">
            kg CO<sub>2</sub>e
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">Current month total</p>
      </div>

      {/* Trend Chart */}
      <div className="h-16 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="co2"
              stroke={isReduction ? "#10b981" : "#f97316"}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Comparative Status */}
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
          isReduction
            ? "bg-emerald-950 text-emerald-400"
            : "bg-orange-950 text-orange-400"
        }`}
      >
        {isReduction ? (
          <TrendingDown className="w-4 h-4" />
        ) : (
          <TrendingUp className="w-4 h-4" />
        )}
        <span className="text-sm font-semibold">
          {isReduction ? "↓" : "↑"} {Math.abs(percentageChange).toFixed(0)}%{" "}
          {isReduction ? "reduction" : "increase"}
        </span>
      </div>

      <p className="text-xs text-gray-500">vs. previous month</p>
    </div>
  );
}
