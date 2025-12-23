"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Filter,
  Search,
  MoreVertical,
  Eye,
  Download,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for footprint logs
const mockLogs = [
  {
    id: "LOG-8734",
    date: "2025-01-12",
    userId: "USR-2481",
    username: "green_warrior",
    totalCo2e: 185,
    homeEnergy: 62,
    transport: 45,
    consumption: 58,
    waste: 20,
  },
  {
    id: "LOG-8733",
    date: "2025-01-12",
    userId: "USR-9876",
    username: "carbon_king",
    totalCo2e: 1842,
    homeEnergy: 580,
    transport: 820,
    consumption: 342,
    waste: 100,
  },
  {
    id: "LOG-8732",
    date: "2025-01-11",
    userId: "USR-1923",
    username: "eco_champion",
    totalCo2e: 192,
    homeEnergy: 58,
    transport: 52,
    consumption: 62,
    waste: 20,
  },
  {
    id: "LOG-8731",
    date: "2025-01-11",
    userId: "USR-3456",
    username: "nature_lover",
    totalCo2e: 208,
    homeEnergy: 68,
    transport: 48,
    consumption: 72,
    waste: 20,
  },
  {
    id: "LOG-8730",
    date: "2025-01-10",
    userId: "USR-8765",
    username: "polluter_pete",
    totalCo2e: 1725,
    homeEnergy: 520,
    transport: 780,
    consumption: 325,
    waste: 100,
  },
];

export function LogManagementTable() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white">
              Footprint Log Management
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              View, filter, and manage all user submissions
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilterOpen(!filterOpen)}
            className="gap-2 bg-gray-800 border-gray-700 text-white hover:bg-gray-750"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Filtering Panel */}
        {filterOpen && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <div>
              <label className="text-xs text-gray-400 mb-2 block">
                Date Range
              </label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-2 block">
                User ID
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Search by user ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-2 block">
                Category Filter
              </label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="homeEnergy">Home Energy</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="consumption">Consumption</SelectItem>
                  <SelectItem value="waste">Waste</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border border-gray-800 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-800/50 hover:bg-gray-800/50 border-gray-800">
                <TableHead className="text-gray-400">Log ID</TableHead>
                <TableHead className="text-gray-400">Date</TableHead>
                <TableHead className="text-gray-400">User</TableHead>
                <TableHead className="text-gray-400 text-right">
                  Total CO₂e
                </TableHead>
                <TableHead className="text-gray-400 text-right">
                  Home Energy
                </TableHead>
                <TableHead className="text-gray-400 text-right">
                  Transport
                </TableHead>
                <TableHead className="text-gray-400 text-right">
                  Consumption
                </TableHead>
                <TableHead className="text-gray-400 text-right">
                  Waste
                </TableHead>
                <TableHead className="text-gray-400 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLogs.map((log) => (
                <TableRow
                  key={log.id}
                  className="border-gray-800 hover:bg-gray-800/30"
                >
                  <TableCell className="font-medium text-white">
                    <Badge
                      variant="outline"
                      className="bg-gray-800 text-emerald-400 border-gray-700"
                    >
                      {log.id}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">{log.date}</TableCell>
                  <TableCell>
                    <div>
                      <div className="text-white font-medium">
                        {log.username}
                      </div>
                      <div className="text-xs text-gray-500">{log.userId}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`font-semibold ${
                        log.totalCo2e > 1000
                          ? "text-orange-400"
                          : "text-emerald-400"
                      }`}
                    >
                      {log.totalCo2e} kg
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-gray-300">
                    {log.homeEnergy} kg
                  </TableCell>
                  <TableCell className="text-right text-gray-300">
                    {log.transport} kg
                  </TableCell>
                  <TableCell className="text-right text-gray-300">
                    {log.consumption} kg
                  </TableCell>
                  <TableCell className="text-right text-gray-300">
                    {log.waste} kg
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-gray-900 border-gray-700"
                      >
                        <DropdownMenuItem className="text-white hover:bg-gray-800 cursor-pointer">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-white hover:bg-gray-800 cursor-pointer">
                          <Download className="w-4 h-4 mr-2" />
                          Export CSV
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400 hover:bg-gray-800 cursor-pointer">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Log
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, mockLogs.length)} of{" "}
            {mockLogs.length} logs
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-750 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={
                    currentPage === page
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-gray-800 border-gray-700 text-white hover:bg-gray-750"
                  }
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-750"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
