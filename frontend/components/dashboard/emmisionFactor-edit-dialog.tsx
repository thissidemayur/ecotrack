"use client";

import type React from "react";
import { useState, useEffect } from "react";
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
import type { EmissionFactor } from "@/components/dashboard/emmisionFactor-management-content";
import { toast } from "sonner";
import { Edit3, Database, Save, AlertCircle, History } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditFactorDialogProps {
  factor: EmissionFactor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (factor: EmissionFactor) => void;
}

export function EditFactorDialog({
  factor,
  open,
  onOpenChange,
  onUpdate,
}: EditFactorDialogProps) {
  const [formData, setFormData] = useState({
    factorId: factor.factorId,
    category: factor.category,
    unit: factor.unit,
    value: String(factor.value),
    region: factor.region || "",
    version: factor.version,
    source: factor.source || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData({
      factorId: factor.factorId,
      category: factor.category,
      unit: factor.unit,
      value: String(factor.value),
      region: factor.region || "",
      version: factor.version,
      source: factor.source || "",
    });
  }, [factor]);

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
    if (!formData.version.trim())
      newErrors.version = "Revision version required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onUpdate({
      id: factor.id,
      factorId: formData.factorId,
      category: formData.category,
      unit: formData.unit,
      value: Number(formData.value),
      region: formData.region || undefined,
      version: formData.version,
      source: formData.source || undefined,
    });

    toast.success("System constant overridden successfully.");
    setErrors({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-950 border-zinc-900 text-white max-w-2xl w-[95vw] p-0 overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl">
        {/* Header with Background "Modification" Accent */}
        <div className="relative p-6 md:p-8 border-b border-zinc-900 bg-zinc-900/30">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Edit3 className="size-24 text-amber-500" />
          </div>
          <DialogHeader className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <History className="size-4 text-amber-500" />
              </div>
              <span className="text-[10px] font-mono font-black text-amber-500 uppercase tracking-[0.3em]">
                Registry_Modification_Request
              </span>
            </div>
            <DialogTitle className="text-2xl md:text-3xl font-black text-white italic tracking-tighter uppercase">
              Edit <span className="text-amber-500">Emission Factor</span>
            </DialogTitle>
            <DialogDescription className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mt-1">
              {"//"}Re-calculating_System_Coefficients_For: {factor.id}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {/* Warning Banner for Editing */}
          <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl flex items-start gap-3">
            <AlertCircle className="size-4 text-amber-500 mt-0.5 shrink-0" />
            <p className="text-[10px] font-mono text-zinc-500 uppercase leading-relaxed">
              Warning: Overriding this value will impact all telemetry data
              currently utilizing this Registry ID. Ensure versioning integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Factor ID */}
            <div className="space-y-2">
              <Label
                htmlFor="factorId"
                className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2"
              >
                <Database className="size-3" /> Registry_ID{" "}
                <span className="text-amber-500">*</span>
              </Label>
              <Input
                id="factorId"
                value={formData.factorId}
                onChange={(e) =>
                  setFormData({ ...formData, factorId: e.target.value })
                }
                className="bg-zinc-900/50 border-zinc-800 focus:border-amber-500/50 focus:ring-amber-500/10 rounded-xl h-11 text-zinc-200"
              />
              {errors.factorId && (
                <p className="text-red-500 font-mono text-[9px] uppercase tracking-tighter">
                  {errors.factorId}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label
                htmlFor="category"
                className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest"
              >
                Sector_Classification <span className="text-amber-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(v) =>
                  setFormData({ ...formData, category: v as any })
                }
              >
                <SelectTrigger className="bg-zinc-900/50 border-zinc-800 focus:border-amber-500/50 rounded-xl h-11 text-zinc-200">
                  <SelectValue placeholder="Select Sector" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-zinc-900 text-zinc-300">
                  <SelectItem
                    value="energy"
                    className="focus:bg-amber-500/10 focus:text-amber-400 font-bold"
                  >
                    Energy
                  </SelectItem>
                  <SelectItem
                    value="transport"
                    className="focus:bg-amber-500/10 focus:text-amber-400 font-bold"
                  >
                    Transport
                  </SelectItem>
                  <SelectItem
                    value="consumption"
                    className="focus:bg-amber-500/10 focus:text-amber-400 font-bold"
                  >
                    Consumption
                  </SelectItem>
                  <SelectItem
                    value="waste"
                    className="focus:bg-amber-500/10 focus:text-amber-400 font-bold"
                  >
                    Waste
                  </SelectItem>
                  <SelectItem
                    value="other"
                    className="focus:bg-amber-500/10 focus:text-amber-400 font-bold"
                  >
                    Other
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Value */}
            <div className="space-y-2">
              <Label
                htmlFor="value"
                className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest"
              >
                Coefficient_Override <span className="text-amber-500">*</span>
              </Label>
              <Input
                id="value"
                type="number"
                step="0.0001"
                value={formData.value}
                onChange={(e) =>
                  setFormData({ ...formData, value: e.target.value })
                }
                className="bg-zinc-900/50 border-zinc-800 rounded-xl h-11 text-amber-500 font-black italic"
              />
            </div>

            {/* Unit */}
            <div className="space-y-2">
              <Label
                htmlFor="unit"
                className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest"
              >
                Unit_Mapping <span className="text-amber-500">*</span>
              </Label>
              <Input
                id="unit"
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
                className="bg-zinc-900/50 border-zinc-800 rounded-xl h-11 text-zinc-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Region */}
            <div className="space-y-2">
              <Label
                htmlFor="region"
                className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest"
              >
                Region_Scope
              </Label>
              <Input
                id="region"
                value={formData.region}
                onChange={(e) =>
                  setFormData({ ...formData, region: e.target.value })
                }
                className="bg-zinc-900/50 border-zinc-800 rounded-xl h-11 text-zinc-200"
              />
            </div>

            {/* Version */}
            <div className="space-y-2">
              <Label
                htmlFor="version"
                className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest"
              >
                Revision_Hash <span className="text-amber-500">*</span>
              </Label>
              <Input
                id="version"
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
              className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest"
            >
              Audit_Reference_Log
            </Label>
            <Textarea
              id="source"
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
              className="text-zinc-500 hover:text-white font-mono text-[10px] uppercase tracking-widest order-2 md:order-1"
            >
              Abort_Override
            </Button>
            <Button
              type="submit"
              className="bg-amber-600 hover:bg-amber-500 text-zinc-950 font-black rounded-xl h-12 px-8 uppercase italic tracking-widest transition-all shadow-lg shadow-amber-900/20 order-1 md:order-2"
            >
              <Save className="size-4 mr-2" />
              Commit_Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
