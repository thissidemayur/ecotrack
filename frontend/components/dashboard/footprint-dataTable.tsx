"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Settings2,
  Database,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FootprintLogDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export const FootprintLogDataTable = <TData, TValue>({
  columns,
  data,
}: FootprintLogDataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* 1. CONTROL BAR: Search & Filtering */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 px-1">
        <div className="relative w-full sm:max-w-xs group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
          <Input
            placeholder="Search Period..."
            value={
              (table.getColumn("period")?.getFilterValue() as string) ?? ""
            }
            onChange={(e) =>
              table.getColumn("period")?.setFilterValue(e.target.value)
            }
            className="pl-10 bg-zinc-950 border-zinc-900 text-zinc-300 placeholder:text-zinc-600 focus-visible:ring-emerald-500/20 rounded-xl h-10 md:h-11 transition-all text-xs md:text-sm"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-auto bg-zinc-950 border-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl h-10 md:h-11 font-mono text-[9px] md:text-[10px] uppercase tracking-widest italic"
            >
              <Settings2 className="size-3.5 mr-2" /> View_Config
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-zinc-950 border-zinc-900 text-zinc-400 p-2 rounded-xl shadow-2xl w-56"
          >
            <div className="px-2 py-1.5 text-[9px] font-mono text-zinc-600 uppercase tracking-[0.2em] mb-1">
              Toggle_Columns
            </div>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize focus:bg-emerald-500/10 focus:text-emerald-400 rounded-lg text-xs font-bold"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id.replace("_", " ")}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 2. THE LEDGER: Responsive Container */}
      <div className="rounded-[1rem] md:rounded-[2rem] border border-zinc-900 bg-zinc-950/50 backdrop-blur-sm overflow-hidden shadow-2xl">
        <div className="no-scrollbar overflow-x-auto">
          {/* We use min-w-[800px] on small screens to ensure content remains readable while scrolling */}
          <Table className="min-w-[800px] md:min-w-[1000px] w-full border-separate border-spacing-0">
            <TableHeader className="bg-zinc-900/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-none hover:bg-transparent"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="h-12 md:h-14 px-4 md:px-6 text-zinc-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] border-b border-zinc-900 italic font-black"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="group border-none hover:bg-emerald-500/[0.02] transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="py-4 md:py-5 px-4 md:px-6 text-zinc-300 text-xs md:text-sm font-medium border-b border-zinc-900/50 group-last:border-none"
                      >
                        <div className="flex items-center">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-32 md:h-40 text-center"
                  >
                    <div className="flex flex-col items-center justify-center space-y-3 opacity-20">
                      <Database className="size-8 md:size-10 text-zinc-500" />
                      <p className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.3em]">
                        No_Telemetry_Logs
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* 3. PAGINATION: Stacked on small mobile, Row on SM+ */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-2">
        <div className="flex items-center gap-3 order-2 sm:order-1">
          <div className="size-1.5 md:size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
            Node {table.getState().pagination.pageIndex + 1} {"//"}
            {table.getPageCount()}
          </span>
        </div>

        <div className="flex items-center gap-2 order-1 sm:order-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex-1 sm:flex-none bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-white rounded-xl px-4 md:px-5 h-8 md:h-9 font-bold text-[10px] md:text-xs disabled:opacity-20 transition-all"
          >
            <ChevronLeft className="size-3.5 mr-1" /> Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="flex-1 sm:flex-none bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-white rounded-xl px-4 md:px-5 h-8 md:h-9 font-bold text-[10px] md:text-xs disabled:opacity-20 transition-all"
          >
            Next <ChevronRight className="size-3.5 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
