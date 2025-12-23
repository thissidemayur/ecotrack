"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2, ShieldAlert, X } from "lucide-react";
import { toast } from "sonner";
import type { EmissionFactor } from "./emmisionFactor-management-content";
import { cn } from "@/lib/utils";

interface DeleteFactorDialogProps {
  factor: EmissionFactor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (id: string) => void;
}

export function DeleteFactorDialog({
  factor,
  open,
  onOpenChange,
  onDelete,
}: DeleteFactorDialogProps) {
  const handleDelete = () => {
    onDelete(factor.id);
    toast.error("Registry record purged from system database.");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-950 border-zinc-900 text-white max-w-md w-[95vw] p-0 overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-[0_0_50px_rgba(239,68,68,0.1)]">
        {/* Header: High-Stakes Visuals */}
        <div className="relative p-6 md:p-8 border-b border-zinc-900 bg-red-950/10">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <Trash2 className="size-20 text-red-500" />
          </div>
          <DialogHeader className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <AlertTriangle className="size-5 text-red-500 animate-pulse" />
              </div>
              <span className="text-[10px] font-mono font-black text-red-500 uppercase tracking-[0.3em]">
                Critical_Purge_Request
              </span>
            </div>
            <DialogTitle className="text-2xl font-black text-white italic tracking-tighter uppercase">
              Delete <span className="text-red-500 text-3xl">Factor?</span>
            </DialogTitle>
            <DialogDescription className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest mt-2 leading-relaxed">
              Warning: Deleting this constant will permanently remove it from
              the calculation engine registry.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Data Preview: What is being deleted? */}
        <div className="p-6 md:p-8 space-y-4">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 space-y-3 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-1 h-full bg-red-500/20" />

            <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                Registry_ID
              </span>
              <span className="text-xs font-mono font-black text-white italic tracking-tight">
                {factor.factorId}
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                Sector_Node
              </span>
              <span className="text-xs font-black text-zinc-300 uppercase italic tracking-tighter">
                {factor.category}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                Coefficient
              </span>
              <span className="text-sm font-black text-red-500 italic">
                {factor.value.toFixed(4)}{" "}
                <span className="text-[9px] not-italic text-zinc-600 font-mono">
                  {factor.unit}
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 py-3 bg-zinc-900/30 rounded-xl border border-dashed border-zinc-800">
            <ShieldAlert className="size-4 text-zinc-600 shrink-0" />
            <p className="text-[9px] font-mono text-zinc-500 uppercase leading-none">
              Authorization: Root Admin Override Required
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 md:p-8 flex flex-col sm:flex-row gap-3 bg-zinc-900/20 border-t border-zinc-900">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="flex-1 text-zinc-500 hover:text-black font-mono text-[10px] uppercase tracking-widest order-2 sm:order-1"
          >
            Cancell
          </Button>
          <Button
            onClick={handleDelete}
            className="flex-1 bg-red-600 hover:bg-red-500 text-zinc-950 font-black rounded-xl h-12 uppercase italic tracking-widest transition-all shadow-lg shadow-red-900/20 order-1 sm:order-2 active:scale-95"
          >
            Click to Confirm Deletion
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
