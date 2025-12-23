"use client";

import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Search,
  MoreVertical,
  UserCheck,
  Mail,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface UserNode {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  signupDate: string;
}

export function UserValidationTable({ users }: { users: UserNode[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleValidate = async (userId: string) => {
    try {
      // Logic for: POST /api/v1/admin/users/:userId/validate
      // const response = await adminService.validateUser(userId);

      toast.success(`Node ${userId.slice(-6)} verified successfully`, {
        description: "User clearance level updated in global registry.",
        className: "bg-zinc-950 border-zinc-900 text-white font-mono",
      });
    } catch (error) {
      toast.error("Validation failed. Check system logs.");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 1. Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500 group-focus-within:text-red-500 transition-colors" />
          <Input
            placeholder="Search_By_Identity_Or_Email..."
            className="pl-10 bg-zinc-900/50 border-zinc-800 rounded-xl h-11 focus:border-red-500/50 transition-all font-mono text-xs uppercase tracking-widest"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/30 border border-zinc-900 rounded-xl">
          <span className="text-[10px] font-mono text-zinc-500 uppercase font-black italic">
            Queue_Status:
          </span>
          <span className="text-[10px] font-mono text-red-500 uppercase font-black">
            {filteredUsers.length}_Nodes_Pending
          </span>
        </div>
      </div>

      {/* 2. Ledger Table */}
      <div className="bg-zinc-900/20 border border-zinc-900 rounded-[2rem] overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-900/40 border-b border-zinc-900">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] py-5 pl-8">
                Identity_Node
              </TableHead>
              <TableHead className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em]">
                Clearance_Status
              </TableHead>
              <TableHead className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em]">
                Registration_Date
              </TableHead>
              <TableHead className="text-right text-[10px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] pr-8">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user._id}
                className="border-zinc-900 hover:bg-zinc-800/20 transition-colors group"
              >
                <TableCell className="py-5 pl-8">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-xs font-black text-zinc-500 group-hover:border-red-500/30 transition-colors">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-black text-white italic uppercase tracking-tighter leading-none mb-1">
                        {user.name}
                      </p>
                      <div className="flex items-center gap-1 text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                        <Mail className="size-2.5" /> {user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {user.isVerified ? (
                    <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[8px] font-mono uppercase px-2 h-5">
                      Verified_Root
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500/10 text-red-500 border-red-500/20 text-[8px] font-mono uppercase px-2 h-5">
                      Pending_Audit
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  {new Date(user.signupDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right pr-8">
                  {!user.isVerified ? (
                    <Button
                      onClick={() => handleValidate(user._id)}
                      className="bg-red-600 hover:bg-red-500 text-zinc-950 font-black rounded-xl h-9 px-4 uppercase italic tracking-widest text-[9px] transition-all shadow-lg shadow-red-900/10 active:scale-95"
                    >
                      <UserCheck className="mr-2 size-3.5" /> Validate_Node
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      disabled
                      className="text-zinc-700 opacity-50"
                    >
                      <ShieldCheck className="size-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredUsers.length === 0 && (
          <div className="p-20 text-center space-y-3">
            <ShieldCheck className="size-8 mx-auto text-zinc-800" />
            <p className="text-[10px] font-mono uppercase text-zinc-600 tracking-[0.3em]">
              No_Pending_Verifications_Found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
