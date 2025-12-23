"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for activity heatmap (days in month)
const generateMonthData = () => {
  const days = [];
  for (let i = 1; i <= 31; i++) {
    days.push({
      day: i,
      count: Math.floor(Math.random() * 50),
    });
  }
  return days;
};

export function ActivityHeatmap() {
  const [currentMonth, setCurrentMonth] = useState("January 2025");
  const monthData = generateMonthData();

  const getIntensityColor = (count: number) => {
    if (count === 0) return "bg-gray-800";
    if (count < 10) return "bg-emerald-900/30";
    if (count < 20) return "bg-emerald-800/50";
    if (count < 30) return "bg-emerald-700/70";
    if (count < 40) return "bg-emerald-600/85";
    return "bg-emerald-500";
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white">Activity Heatmap</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Daily submission activity across the platform
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-gray-400 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-white font-medium min-w-[140px] text-center">
              {currentMonth}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-gray-400 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-xs text-gray-500 font-medium pb-2"
              >
                {day}
              </div>
            ))}
            {/* Add empty cells for month start offset */}
            {[...Array(2)].map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {monthData.map((data) => (
              <div
                key={data.day}
                className={`aspect-square rounded ${getIntensityColor(
                  data.count
                )} border border-gray-800 hover:border-emerald-500 transition-all cursor-pointer group relative`}
                title={`${data.day} Jan: ${data.count} submissions`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs text-white/70 group-hover:text-white font-medium">
                    {data.day}
                  </span>
                </div>
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-950 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 border border-gray-700">
                  {data.count} submissions
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-800">
            <span className="text-xs text-gray-500">Activity Level:</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Less</span>
              <div className="flex gap-1">
                <div className="w-4 h-4 rounded bg-gray-800 border border-gray-700" />
                <div className="w-4 h-4 rounded bg-emerald-900/30 border border-gray-700" />
                <div className="w-4 h-4 rounded bg-emerald-800/50 border border-gray-700" />
                <div className="w-4 h-4 rounded bg-emerald-700/70 border border-gray-700" />
                <div className="w-4 h-4 rounded bg-emerald-600/85 border border-gray-700" />
                <div className="w-4 h-4 rounded bg-emerald-500 border border-gray-700" />
              </div>
              <span className="text-xs text-gray-500">More</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
