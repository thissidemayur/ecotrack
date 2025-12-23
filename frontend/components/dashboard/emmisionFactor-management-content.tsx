"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  BarChart3,
  Database,
  Activity,
  ShieldAlert,
} from "lucide-react";
import { FactorsTable } from "@/components/dashboard/factor-table";
import { CreateFactorDialog } from "@/components/dashboard/emmisionFactor-create-dialog";
import { EditFactorDialog } from "@/components/dashboard/emmisionFactor-edit-dialog";
import { DeleteFactorDialog } from "@/components/dashboard/emmisionFactor-delete-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface EmissionFactor {
  id: string;
  factorId: string;
  category: "energy" | "transport" | "consumption" | "waste" | "other";
  unit: string;
  value: number;
  region?: string;
  version: string;
  source?: string;
}

export function FactorManagementContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingFactor, setEditingFactor] = useState<EmissionFactor | null>(
    null
  );
  const [deletingFactor, setDeletingFactor] = useState<EmissionFactor | null>(
    null
  );

  const [factors, setFactors] = useState<EmissionFactor[]>([
    {
      id: "1",
      factorId: "electricity_kwh_us",
      category: "energy",
      unit: "kWh",
      value: 0.92,
      region: "US",
      version: "v1.0",
      source: "EPA 2023",
    },
    {
      id: "2",
      factorId: "natural_gas_m3",
      category: "energy",
      unit: "m³",
      value: 2.03,
      region: "Global",
      version: "v1.0",
      source: "IEA 2023",
    },
    {
      id: "3",
      factorId: "car_km_petrol",
      category: "transport",
      unit: "km",
      value: 0.21,
      region: "Global",
      version: "v1.0",
      source: "DEFRA 2023",
    },
    {
      id: "6",
      factorId: "beef_kg",
      category: "consumption",
      unit: "kg",
      value: 27.0,
      region: "Global",
      version: "v1.0",
      source: "Our World in Data 2023",
    },
  ]);

  const filteredFactors = factors.filter(
    (factor) =>
      factor.factorId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      factor.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = (newFactor: Omit<EmissionFactor, "id">) => {
    setFactors([...factors, { ...newFactor, id: crypto.randomUUID() }]);
    setIsCreateOpen(false);
  };

  const handleUpdate = (updatedFactor: EmissionFactor) => {
    setFactors(
      factors.map((f) => (f.id === updatedFactor.id ? updatedFactor : f))
    );
    setEditingFactor(null);
  };

  const handleDelete = (factorId: string) => {
    setFactors(factors.filter((f) => f.id !== factorId));
    setDeletingFactor(null);
  };

  return (
    <div className="w-full bg-zinc-950 min-h-screen overflow-x-hidden">
      <div className="mx-auto max-w-[1400px] p-4 sm:p-6 lg:p-10 space-y-8 md:space-y-12">
        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2 w-full md:w-auto">
            <Badge
              variant="outline"
              className="border-emerald-500/30 bg-emerald-500/5 text-emerald-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] px-3"
            >
              <ShieldAlert className="mr-1.5 size-3" /> Root_Access_Only
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
              Emission <span className="text-emerald-500">Factors</span>
            </h1>
            <p className="text-zinc-500 font-medium italic text-xs md:text-sm max-w-lg">
              Manage calculation coefficients and global environmental
              constants.
            </p>
          </div>

          <Button
            onClick={() => setIsCreateOpen(true)}
            className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-black rounded-2xl h-12 px-8 uppercase italic tracking-widest shadow-xl shadow-emerald-900/20 active:scale-95 transition-all"
          >
            <Plus className="size-5 mr-2" />
            Add_New_Factor
          </Button>
        </div>

        {/* 2. Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <StatCard
            label="Total_Constants"
            value={factors.length}
            icon={Database}
            color="text-blue-500"
          />
          <StatCard
            label="Active_Sectors"
            value={new Set(factors.map((f) => f.category)).size}
            icon={BarChart3}
            color="text-purple-500"
          />
         
        </div>

        {/* 3. Search & Control Bar */}
        <div className="relative group w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            
          </div>
          
          
        </div>
        

        {/* 4. Table Section */}
        {/* 4. Table Section: Registry Command */}
        <section className="space-y-4 w-full overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Header & Search Bar Combo */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-1">
            {/* Status Indicator */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 size-3 bg-emerald-500/20 blur-md rounded-full animate-pulse" />
                <div className="relative size-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em] font-black leading-none">
                  Local_Registry_Sync
                </span>
                <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mt-1">
                  Status: Operational // 0.2ms Latency
                </span>
              </div>
            </div>

            {/* Integrated Search Box */}
            <div className="relative w-full md:max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="size-4 text-zinc-600 group-focus-within:text-emerald-500 transition-colors duration-300" />
              </div>
              <input
                type="text"
                placeholder="Filter Registry By ID, Category, or Source..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 bg-zinc-900/50 border border-zinc-800 text-white placeholder:text-zinc-600 text-sm pl-11 pr-4 rounded-2xl outline-none focus:border-emerald-500/40 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-300 backdrop-blur-xl"
              />
              {/* Keyboard Hint */}
              <div className="absolute inset-y-0 right-4 hidden sm:flex items-center pointer-events-none">
                <kbd className="px-2 py-1 text-[9px] font-mono bg-zinc-950 border border-zinc-800 text-zinc-500 rounded-lg">
                  CMD + F
                </kbd>
              </div>
            </div>
          </div>

          {/* Main Table Container */}
          <div className="relative group">
            {/* Subtle Glow behind the table */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/5 to-transparent rounded-[1.5rem] md:rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000" />

            <div className="relative bg-zinc-900/30 border border-zinc-900 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden backdrop-blur-sm shadow-2xl">
              <div className="no-scrollbar overflow-x-auto">
                {/* We use min-w-0 on the wrapper and min-w-[900px] on the table content 
            to ensure it scrolls horizontally on small screens without breaking layout */}
                <div className="min-w-[900px] w-full">
                  <FactorsTable
                    factors={filteredFactors}
                    onEdit={setEditingFactor}
                    onDelete={setDeletingFactor}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Metadata Bar */}
            <div className="mt-4 flex items-center justify-between px-6 opacity-30">
              <div className="flex items-center gap-4 text-[9px] font-mono uppercase tracking-widest text-zinc-500">
                <span>Entry_Count: {filteredFactors.length}</span>
                <span className="hidden sm:inline">{"//"}</span>
                <span className="hidden sm:inline">Checksum: Verified</span>
                
              </div>
              <div className="size-2 rounded-full bg-zinc-800" />
            </div>
          </div>
        </section>
      </div>

      {/* Dialogs */}
      <CreateFactorDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onCreate={handleCreate}
      />
      {editingFactor && (
        <EditFactorDialog
          factor={editingFactor}
          open={!!editingFactor}
          onOpenChange={(open) => !open && setEditingFactor(null)}
          onUpdate={handleUpdate}
        />
      )}
      {deletingFactor && (
        <DeleteFactorDialog
          factor={deletingFactor}
          open={!!deletingFactor}
          onOpenChange={(open) => !open && setDeletingFactor(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string | number;
  icon: any;
  color: string;
}) {
  return (
    <Card className="bg-zinc-900/40 border-zinc-900 rounded-[2rem] hover:bg-zinc-900/60 transition-all group border-transparent hover:border-emerald-500/20">
      <CardContent className="p-6 md:p-8 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[10px] font-mono font-black text-zinc-600 uppercase tracking-[0.2em] italic">
            {"//"} {label}
          </p>
          <p className="text-3xl md:text-4xl font-black text-white italic tracking-tighter">
            {value}
          </p>
        </div>
        <div
          className={cn(
            "p-4 rounded-2xl bg-zinc-950 border border-zinc-800 transition-colors group-hover:border-current",
            color
          )}
        >
          <Icon className="size-5 md:size-6" />
        </div>
      </CardContent>
    </Card>
  );
}
