"use client"
import { ColumnDef } from "@tanstack/react-table";
import { Copy, Download, MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export type footprintRowData = {
  id: string;
  period: string;
  results: {
     total_co2e: number;
  breakdown_co2e: {
    energy: number;
    transport: number;
    consumption: number;
    waste: number;
  };
}

  dateCalculated: string;
};

export const footprintColumns: ColumnDef<footprintRowData>[] = [
  {
    accessorKey: "period",
    // header: ({ column }) => (
    //   <Button
    //     variant={"ghost"}
    //     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //   >
    //     Period <ArrowUpDown className="ml-2 h-4 w-4" />
    //   </Button>
    // ),
    header: "Period",
  },
  {
    accessorKey: "results.total_co2e",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total CO2e <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const totalCO2eVal = row.original.results.total_co2e;
      return (
        <div className="text-right ">
          {totalCO2eVal as number} 
          
          {totalCO2eVal.toFixed(2)}{" "}
          <span className="font-medium text-neutral-600">Kg</span>
        </div>
      );
    },
  },
  {
    accessorKey: "results.breakdown_co2e.energy",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Energy <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const energyVal = row.original.results.breakdown_co2e.energy;
      return (
        <div className="text-right ">
          {energyVal as number}{" "}
          <span className="font-medium text-neutral-600">Kg</span>
        </div>
      );
    },
  },
  {
    accessorKey: "results.breakdown_co2e.transport",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Transport <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const transportVal = row.original.results.breakdown_co2e.transport;
      return (
        <div className="text-right ">
          {transportVal as number}{" "}
          <span className="font-medium text-neutral-600">Kg</span>
        </div>
      );
    },
  },
  {
    accessorKey: "results.breakdown_co2e.consumption",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Consumption <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const consumptionVal = row.original.results.breakdown_co2e.consumption;
      return (
        <div className="text-right ">
          {consumptionVal as number}{" "}
          <span className="font-medium text-neutral-600">Kg</span>
        </div>
      );
    },
  },
  {
    accessorKey: "results.breakdown_co2e.waste",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Waste <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const wasteVal = row.original.results.breakdown_co2e.waste;
      return (
        <div className="text-right ">
          {wasteVal as number}{" "}
          <span className="font-medium text-neutral-600">Kg</span>
        </div>
      );
    },
  },
  {
    accessorKey: "dateCalculated",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date Submitted <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const footprint = row.original;
      return (
        <DropdownMenu>
          {/* ============ dropdown menu trigger ========== */}
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          {/* ============ dropdown menu content ========== */}
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(footprint.id)}
            >
              <Copy className="mr-2 h-4 w-4" /> Copy Id
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" /> Download As CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
