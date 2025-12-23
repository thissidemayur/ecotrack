"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, AlertTriangle } from "lucide-react";

// Mock data for leaderboards
const ecoHeroes = [
  { rank: 1, username: "green_warrior", userId: "USR-2481", co2e: 185 },
  { rank: 2, username: "eco_champion", userId: "USR-1923", co2e: 192 },
  { rank: 3, username: "nature_lover", userId: "USR-3456", co2e: 208 },
  { rank: 4, username: "planet_saver", userId: "USR-4782", co2e: 215 },
  { rank: 5, username: "green_thumb", userId: "USR-5621", co2e: 223 },
  { rank: 6, username: "eco_friendly", userId: "USR-6890", co2e: 231 },
  { rank: 7, username: "sustainable_sam", userId: "USR-7234", co2e: 245 },
  { rank: 8, username: "green_guru", userId: "USR-8145", co2e: 258 },
  { rank: 9, username: "eco_warrior", userId: "USR-9012", co2e: 267 },
  { rank: 10, username: "nature_first", userId: "USR-1045", co2e: 279 },
];

const ecoOffenders = [
  { rank: 1, username: "carbon_king", userId: "USR-9876", co2e: 1842 },
  { rank: 2, username: "polluter_pete", userId: "USR-8765", co2e: 1725 },
  { rank: 3, username: "wasteful_will", userId: "USR-7654", co2e: 1689 },
  { rank: 4, username: "heavy_footprint", userId: "USR-6543", co2e: 1621 },
  { rank: 5, username: "gas_guzzler", userId: "USR-5432", co2e: 1598 },
  { rank: 6, username: "energy_hog", userId: "USR-4321", co2e: 1547 },
  { rank: 7, username: "waste_maker", userId: "USR-3210", co2e: 1523 },
  { rank: 8, username: "carbon_heavy", userId: "USR-2109", co2e: 1489 },
  { rank: 9, username: "polluter_pro", userId: "USR-1098", co2e: 1456 },
  { rank: 10, username: "excessive_user", userId: "USR-0987", co2e: 1423 },
];

export function Leaderboards() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top 10 Eco-Heroes */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-400">
            <Trophy className="w-5 h-5" />
            Top 10 Eco-Heroes
          </CardTitle>
          <p className="text-sm text-gray-500">Lowest average CO₂e emissions</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {ecoHeroes.map((user) => (
              <div
                key={user.userId}
                className="flex items-center gap-4 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 font-bold text-sm">
                  {user.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white truncate">
                    {user.username}
                  </div>
                  <div className="text-xs text-gray-500">{user.userId}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-400">
                    {user.co2e} kg
                  </div>
                  <div className="text-xs text-gray-500">CO₂e</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top 10 Eco-Offenders */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <AlertTriangle className="w-5 h-5" />
            Top 10 Eco-Offenders
          </CardTitle>
          <p className="text-sm text-gray-500">
            Highest average CO₂e emissions
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {ecoOffenders.map((user) => (
              <div
                key={user.userId}
                className="flex items-center gap-4 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-950 text-orange-400 font-bold text-sm">
                  {user.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white truncate">
                    {user.username}
                  </div>
                  <div className="text-xs text-gray-500">{user.userId}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-orange-400">
                    {user.co2e.toLocaleString()} kg
                  </div>
                  <div className="text-xs text-gray-500">CO₂e</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
