"use client";

import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ShieldCheck, Plus, Info, Database } from "lucide-react";
import type { EmissionFactor } from "./emmisionFactor-management-content";
import { cn } from "@/lib/utils";

interface CreateFactorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (factor: Omit<EmissionFactor, "id">) => void;
}

export function CreateFactorDialog({
  open,
  onOpenChange,
  onCreate,
}: CreateFactorDialogProps) {
  const [formData, setFormData] = useState({
    factorId: "",
    category: "" as EmissionFactor["category"] | "",
    unit: "",
    value: "",
    region: "",
    version: "",
    source: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!formData.factorId.trim()) newErrors.factorId = "Registry ID required";
    if (!formData.category) newErrors.category = "Classification required";
    if (!formData.unit.trim()) newErrors.unit = "Unit mapping required";
    if (
      !formData.value ||
      isNaN(Number(formData.value)) ||
      Number(formData.value) < 0
    ) {
      newErrors.value = "Coefficient must be ≥ 0";
    }
    if (!formData.version.trim()) newErrors.version = "Build version required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onCreate({
      factorId: formData.factorId,
      category: formData.category as EmissionFactor["category"],
      unit: formData.unit,
      value: Number(formData.value),
      region: formData.region || undefined,
      version: formData.version,
      source: formData.source || undefined,
    });

    toast.success("System constant updated successfully.");
    setFormData({
      factorId: "",
      category: "",
      unit: "",
      value: "",
      region: "",
      version: "",
      source: "",
    });
    setErrors({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-950 border-zinc-900 text-white max-w-2xl w-[95vw] p-0 overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-2xl ">
        {/* Header with Background Accent */}
        <div className=" relative p-6 md:p-8 border-b border-zinc-900 bg-zinc-900/30">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <ShieldCheck className="size-24 text-emerald-500" />
          </div>
          <DialogHeader className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <Plus className="size-4 text-emerald-500" />
              </div>
              <span className="text-[10px] font-mono font-black text-emerald-500 uppercase tracking-[0.3em]">
                System_Provisioning
              </span>
            </div>
            <DialogTitle className="text-2xl md:text-3xl font-black text-white italic tracking-tighter uppercase">
              New <span className="text-emerald-500">Emission Factor</span>
            </DialogTitle>
            <DialogDescription className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mt-1">
              {"//"} Registering_New_Environmental_Constant
            </DialogDescription>
          </DialogHeader>
        </div>

        <form
          onSubmit={handleSubmit}
          className="overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar"
        >
          {/* Row 1: Registry ID & Classification */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="factorId"
                className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2"
              >
                <Database className="size-3" /> Factor_ID{" "}
                <span className="text-emerald-500">*</span>
              </Label>
              <Input
                id="factorId"
                placeholder="e.g., GRID_KWH_US"
                value={formData.factorId}
                onChange={(e) =>
                  setFormData({ ...formData, factorId: e.target.value })
                }
                className="bg-zinc-900/50 border-zinc-800 focus:border-emerald-500/50 focus:ring-emerald-500/10 rounded-xl h-11 text-zinc-200"
              />
              {errors.factorId && (
                <p className="text-red-500 font-mono text-[9px] uppercase tracking-tighter">
                  {errors.factorId}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="category"
                className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest"
              >
                Classification <span className="text-emerald-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(v) =>
                  setFormData({ ...formData, category: v as any })
                }
              >
                <SelectTrigger className="bg-zinc-900/50 border-zinc-800 focus:border-emerald-500/50 rounded-xl h-11 text-zinc-200">
                  <SelectValue placeholder="Select Sector" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-zinc-900 text-zinc-300">
                  <SelectItem
                    value="energy"
                    className="focus:bg-emerald-500/10 focus:text-emerald-400"
                  >
                    Energy
                  </SelectItem>
                  <SelectItem
                    value="transport"
                    className="focus:bg-emerald-500/10 focus:text-emerald-400"
                  >
                    Transport
                  </SelectItem>
                  <SelectItem
                    value="consumption"
                    className="focus:bg-emerald-500/10 focus:text-emerald-400"
                  >
                    Consumption
                  </SelectItem>
                  <SelectItem
                    value="waste"
                    className="focus:bg-emerald-500/10 focus:text-emerald-400"
                  >
                    Waste
                  </SelectItem>
                  <SelectItem
                    value="other"
                    className="focus:bg-emerald-500/10 focus:text-emerald-400"
                  >
                    Other
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-red-500 font-mono text-[9px] uppercase tracking-tighter">
                  {errors.category}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Value & Unit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="value"
                className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2"
              >
                Coefficient_Value <span className="text-emerald-500">*</span>
              </Label>
              <Input
                id="value"
                type="number"
                step="0.0001"
                placeholder="0.0000"
                value={formData.value}
                onChange={(e) =>
                  setFormData({ ...formData, value: e.target.value })
                }
                className="bg-zinc-900/50 border-zinc-800 rounded-xl h-11 text-emerald-500 font-black"
              />
              {errors.value && (
                <p className="text-red-500 font-mono text-[9px] uppercase tracking-tighter">
                  {errors.value}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="unit"
                className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest"
              >
                Unit_Mapping <span className="text-emerald-500">*</span>
              </Label>
              <Input
                id="unit"
                placeholder="kWh, KM, KG"
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
                className="bg-zinc-900/50 border-zinc-800 rounded-xl h-11 text-zinc-200"
              />
              {errors.unit && (
                <p className="text-red-500 font-mono text-[9px] uppercase tracking-tighter">
                  {errors.unit}
                </p>
              )}
            </div>
          </div>

          {/* Row 3: Region & Version */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="region"
                className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest"
              >
                Region_Scope
              </Label>
              <Input
                id="region"
                placeholder="Global / US / EU"
                value={formData.region}
                onChange={(e) =>
                  setFormData({ ...formData, region: e.target.value })
                }
                className="bg-zinc-900/50 border-zinc-800 rounded-xl h-11 text-zinc-200"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="version"
                className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest"
              >
                Build_Version <span className="text-emerald-500">*</span>
              </Label>
              <Input
                id="version"
                placeholder="v1.0.0"
                value={formData.version}
                onChange={(e) =>
                  setFormData({ ...formData, version: e.target.value })
                }
                className="bg-zinc-900/50 border-zinc-800 rounded-xl h-11 text-zinc-200 font-mono"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="source"
              className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2"
            >
              <Info className="size-3" /> Audit_Reference_Source
            </Label>
            <Textarea
              id="source"
              placeholder="Provide documentation link or regulatory reference..."
              value={formData.source}
              onChange={(e) =>
                setFormData({ ...formData, source: e.target.value })
              }
              className="bg-zinc-900/50 border-zinc-800 rounded-xl min-h-[100px] text-zinc-300 resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col md:flex-row justify-end gap-3 pt-6 border-t border-zinc-900">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-zinc-500 hover:text-black font-mono text-[10px] uppercase tracking-widest order-2 md:order-1"
            >
              Cancell
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-black rounded-xl h-12 px-8 uppercase italic tracking-widest transition-all shadow-lg shadow-emerald-900/20 order-1 md:order-2"
            >
              Commit_Record
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
