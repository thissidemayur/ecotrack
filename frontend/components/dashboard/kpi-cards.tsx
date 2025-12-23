"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Globe } from "lucide-react";
import { Line, LineChart, ResponsiveContainer } from "recharts";

// Mock data for KPI trends
const avgCo2Trend = [
  { value: 580 },
  { value: 565 },
  { value: 548 },
  { value: 535 },
  { value: 522 },
  { value: 512 },
];

const usersTrend = [
  { value: 1250 },
  { value: 1320 },
  { value: 1450 },
  { value: 1580 },
  { value: 1720 },
  { value: 1847 },
];

const logsTrend = [
  { value: 8500 },
  { value: 9200 },
  { value: 9800 },
  { value: 10500 },
  { value: 11200 },
  { value: 12456 },
];

export function KpiCards() {
  const kpis = [
    {
      title: "Global Average CO₂e",
      value: "512",
      unit: "kg",
      trend: avgCo2Trend,
      change: "-11.7%",
      isPositive: true,
      icon: Globe,
      color: "emerald",
    },
    {
      title: "Total Registered Users",
      value: "1,847",
      unit: "users",
      trend: usersTrend,
      change: "+47.8%",
      isPositive: true,
      icon: Users,
      color: "emerald",
    },
    {
      title: "Total Logs Recorded",
      value: "12,456",
      unit: "logs",
      trend: logsTrend,
      change: "+46.5%",
      isPositive: true,
      icon: FileText,
      color: "emerald",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              {kpi.title}
            </CardTitle>
            <kpi.icon className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold text-white">{kpi.value}</span>
              <span className="text-sm text-gray-500">{kpi.unit}</span>
            </div>

            {/* Sparkline Chart */}
            <div className="h-12 mb-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={kpi.trend}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={kpi.isPositive ? "#10b981" : "#f97316"}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Trend Badge */}
            <div
              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${
                kpi.isPositive
                  ? "bg-emerald-950 text-emerald-400"
                  : "bg-orange-950 text-orange-400"
              }`}
            >
              {kpi.change} <span className="text-gray-500">last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
