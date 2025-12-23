"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Pencil,
  Trash2,
  Database,
  Globe,
  Hash,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EmissionFactor } from "./emmisionFactor-management-content";
import { cn } from "@/lib/utils";

interface FactorsTableProps {
  factors: EmissionFactor[];
  onEdit: (factor: EmissionFactor) => void;
  onDelete: (factor: EmissionFactor) => void;
}

// Higher-fidelity categorical color mapping with glows
const categoryStyles: Record<
  string,
  { bg: string; text: string; dot: string }
> = {
  energy: { bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-500" },
  transport: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    dot: "bg-amber-500",
  },
  consumption: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    dot: "bg-purple-500",
  },
  waste: { bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-500" },
  other: { bg: "bg-zinc-500/10", text: "text-zinc-400", dot: "bg-zinc-500" },
};

export function FactorsTable({ factors, onEdit, onDelete }: FactorsTableProps) {
  return (
    <div className="w-full bg-transparent">
      {/* Horizontal Scroll Protection:
        On mobile, the table scrolls smoothly inside the parent without breaking the layout.
      */}
      <div className="no-scrollbar overflow-x-auto">
        <Table className="min-w-[900px] border-separate border-spacing-0">
          <TableHeader className="bg-zinc-900/40 backdrop-blur-md">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="h-12 px-6 text-[10px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] border-b border-zinc-900 italic">
                {"//"} Factor_ID
              </TableHead>
              <TableHead className="h-12 px-6 text-[10px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] border-b border-zinc-900 italic">
                Sector
              </TableHead>
              <TableHead className="h-12 px-6 text-[10px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] border-b border-zinc-900 italic">
                Metrics
              </TableHead>
              <TableHead className="h-12 px-6 text-[10px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] border-b border-zinc-900 italic">
                Region
              </TableHead>
              <TableHead className="h-12 px-6 text-[10px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] border-b border-zinc-900 italic">
                Version
              </TableHead>
              <TableHead className="h-12 px-6 text-[10px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] border-b border-zinc-900 italic text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {factors.length === 0 ? (
              <TableRow className="border-none">
                <TableCell colSpan={6} className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3 opacity-20">
                    <Database className="size-10 text-zinc-500" />
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em]">
                      Registry_Empty
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              factors.map((factor) => {
                const style =
                  categoryStyles[factor.category] || categoryStyles.other;
                return (
                  <TableRow
                    key={factor.id}
                    className="group border-none hover:bg-zinc-900/30 transition-all duration-300"
                  >
                    {/* ID & Source */}
                    <TableCell className="py-4 px-6">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-xs font-bold text-zinc-200 tracking-tight group-hover:text-emerald-400 transition-colors">
                          {factor.factorId}
                        </span>
                        <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-tighter">
                          Source: {factor.source || "Unknown"}
                        </span>
                      </div>
                    </TableCell>

                    {/* Sector Badge */}
                    <TableCell className="px-6">
                      <div
                        className={cn(
                          "inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-transparent transition-all group-hover:border-current/10",
                          style.bg,
                          style.text
                        )}
                      >
                        <div
                          className={cn("size-1.5 rounded-full", style.dot)}
                        />
                        <span className="text-[10px] font-mono font-black uppercase tracking-widest leading-none">
                          {factor.category}
                        </span>
                      </div>
                    </TableCell>

                    {/* Metrics (Value + Unit) */}
                    <TableCell className="px-6">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-white italic tracking-tighter">
                          {factor.value.toFixed(4)}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-[9px] border-zinc-800 text-zinc-500 rounded-md py-0 h-4 font-mono"
                        >
                          {factor.unit}
                        </Badge>
                      </div>
                    </TableCell>

                    {/* Region */}
                    <TableCell className="px-6">
                      <div className="flex items-center gap-2 text-zinc-400">
                        <Globe className="size-3 text-zinc-600" />
                        <span className="text-xs font-bold italic tracking-tight">
                          {factor.region || "Global"}
                        </span>
                      </div>
                    </TableCell>

                    {/* Versioning */}
                    <TableCell className="px-6">
                      <div className="flex items-center gap-1.5">
                        <Hash className="size-3 text-zinc-700" />
                        <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-tighter">
                          {factor.version}
                        </span>
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="px-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-lg text-zinc-600 hover:text-white hover:bg-zinc-800 transition-all"
                          >
                            <MoreVertical className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-zinc-950 border-zinc-900 rounded-xl shadow-2xl p-1.5 min-w-[140px]"
                        >
                          <div className="px-2 py-1.5 text-[8px] font-mono text-zinc-600 uppercase tracking-widest">
                            Entry_Actions
                          </div>
                          <DropdownMenuItem
                            onClick={() => onEdit(factor)}
                            className="flex items-center gap-2 py-2 px-2.5 rounded-lg text-xs font-bold text-zinc-300 focus:bg-emerald-500/10 focus:text-emerald-400 cursor-pointer transition-colors"
                          >
                            <Pencil className="size-3.5" />
                            Edit_Factor
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onDelete(factor)}
                            className="flex items-center gap-2 py-2 px-2.5 rounded-lg text-xs font-bold text-red-500/80 focus:bg-red-500/10 focus:text-red-400 cursor-pointer transition-colors mt-1"
                          >
                            <Trash2 className="size-3.5" />
                            Delete_Record
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
