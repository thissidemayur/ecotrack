"use client";

import { Cpu, Globe, Lock, Shield } from "lucide-react";

export function TechSignature() {
  return (
    <section className="py-10 border-t border-zinc-900/50 bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-30 hover:opacity-100 transition-opacity duration-500">
          <div className="flex items-center gap-2 group cursor-help">
            <Cpu className="size-4 text-emerald-500" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 group-hover:text-white transition-colors">
              Next.js 15 // Server Components
            </span>
          </div>

          <div className="flex items-center gap-2 group cursor-help">
            <Shield className="size-4 text-emerald-500" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 group-hover:text-white transition-colors">
              PostgreSQL // Prisma ORM
            </span>
          </div>

          <div className="flex items-center gap-2 group cursor-help">
            <Lock className="size-4 text-emerald-500" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 group-hover:text-white transition-colors">
              Lucia Auth // AES-256
            </span>
          </div>

          <div className="flex items-center gap-2 group cursor-help">
            <Globe className="size-4 text-emerald-500" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 group-hover:text-white transition-colors">
              IPCC 2024 Standardized
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
