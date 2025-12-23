"use client";

import { Search, Bell, Command } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserAccountMenu } from "../form/user-account-menu";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-4 backdrop-blur-md md:px-6">
      <div className="flex items-center gap-4">
        {/* Sidebar Trigger for Desktop & Mobile */}
        <SidebarTrigger className="-ml-1" />

        <div className="hidden h-4 w-[1px] bg-zinc-800 md:block" />

        {/* Global Search - Hidden on small mobile, visible on sm+ */}
        <div className="relative hidden max-w-sm flex-1 items-center sm:flex md:w-80 lg:w-96">
          <Search className="absolute left-3 size-4 text-zinc-500" />
          <Input
            placeholder="Search dashboard..."
            className="h-9 w-full rounded-lg border-zinc-800 bg-zinc-900/50 pl-9 text-sm text-zinc-300 placeholder:text-zinc-500 focus-visible:ring-emerald-500/20"
          />
          <kbd className="pointer-events-none absolute right-2 hidden h-5 select-none items-center gap-1 rounded border border-zinc-700 bg-zinc-800 px-1.5 font-mono text-[10px] font-medium text-zinc-500 opacity-100 lg:flex">
            <Command className="size-2.5" /> K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Mobile Search Icon (Only visible on smallest screens) */}
        <Button variant="ghost" size="icon" className="sm:hidden text-zinc-400">
          <Search className="size-5" />
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-zinc-400 hover:text-white"
        >
          <Bell className="size-5" />
          <span className="absolute right-2.5 top-2.5 flex h-2 w-2 rounded-full bg-emerald-500" />
        </Button>

        <div className="h-4 w-[1px] bg-zinc-800" />

        {/* User Account */}
        <UserAccountMenu />
      </div>
    </header>
  );
}
