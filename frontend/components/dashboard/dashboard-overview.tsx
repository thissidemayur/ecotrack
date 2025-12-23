"use client";

import {
  LayoutDashboard,
  MousePointer2,
  Activity,
  Sparkles,
  Monitor,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function DashboardPreviewSection() {
  return (
    <section className="py-24 bg-zinc-950 px-6 relative overflow-hidden border-t border-zinc-900">
      {/* 1. Background Ambient Glow (Lifting the section) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] size-[600px] bg-emerald-500/10 blur-[140px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl">
        {/* 2. HEADER: Setting the Context */}
        <div className="text-center mb-20 space-y-6">
          <Badge
            variant="outline"
            className="px-4 py-1.5 border-emerald-500/30 bg-emerald-500/5 text-emerald-500 backdrop-blur-md gap-2 mx-auto"
          >
            <Monitor className="size-3" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em]">
              Application Interface v1.0
            </span>
          </Badge>

          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] italic">
            Centralized <br />
            <span className="text-emerald-500 not-italic uppercase">
              Intelligence.
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-lg text-zinc-400 leading-relaxed">
            Witness the full architecture of your carbon footprint. Our
            dashboard unifies energy, transport, and consumption metrics into a
            single, high-fidelity command center.
          </p>
        </div>

        {/* 3. THE FULL-SCREEN SHOWCASE */}
        <div className="relative group max-w-[1100px] mx-auto">
          {/* Floating Action Indicator */}
          <div className="absolute -top-6 -right-4 z-30 hidden md:flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-2xl font-bold text-xs shadow-[0_10px_30px_rgba(16,185,129,0.3)] animate-bounce">
            <MousePointer2 className="size-3" /> Data Visualization Active
          </div>

          {/* Large Browser Mockup */}
          <div className="relative border border-zinc-800 rounded-[2.5rem] bg-zinc-900 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-700 group-hover:border-emerald-500/40">
            {/* Window Header (Top Bar) */}
            <div className="h-12 bg-zinc-950 border-b border-zinc-800 flex items-center px-8">
              <div className="flex gap-2 w-24">
                <div className="size-3 rounded-full bg-zinc-800" />
                <div className="size-3 rounded-full bg-zinc-800" />
                <div className="size-3 rounded-full bg-zinc-800" />
              </div>

              <div className="flex-1 flex justify-center">
                <div className="bg-zinc-900 border border-zinc-800 px-6 py-1.5 rounded-xl text-[10px] font-mono text-zinc-500 flex items-center gap-3">
                  <Activity className="size-3 text-emerald-500" />
                  <span className="opacity-50 tracking-tighter uppercase italic">
                    Secure Session:{" "}
                  </span>
                  <span className="text-zinc-300">
                    ecotrack.systems/dashboard/main_hub
                  </span>
                </div>
              </div>

              <div className="w-24 flex justify-end">
                <Sparkles className="size-4 text-emerald-500/30" />
              </div>
            </div>

            {/* The Actual Page Image Container */}
            <div className="relative aspect-[16/8] w-full bg-zinc-900 flex items-center justify-center group-hover:scale-[1.01] transition-transform duration-700">
              {/* IMAGE PLACEHOLDER (Change to your screenshot later) */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05),transparent)] flex flex-col items-center justify-center">
                <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded-3xl flex flex-col items-center gap-4">
                  <LayoutDashboard className="size-16 text-zinc-800" />
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] italic text-center leading-loose">
                    {"//"} Full_Platform_Screenshot <br />
                    {"// "}Insert_1920x1080_PNG_Here
                  </p>
                </div>
              </div>

              {/* UNCOMMENT THIS WHEN YOU HAVE THE IMAGE:
             
              */}
              <Image
                src="/dashboard.png"
                alt="Full EcoTrack Dashboard Interface"
                fill
                className="object-cover object-top"
                priority
              />

              {/* Glassy Overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-40" />
            </div>
          </div>

          {/* Optional: Descriptive Footer under the frame */}
          <div className="mt-8 flex justify-center gap-12 text-zinc-600">
            <div className="flex items-center gap-2">
              <div className="size-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-mono uppercase tracking-widest">
                Real-time Sync
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-1.5 rounded-full bg-blue-500" />
              <span className="text-[10px] font-mono uppercase tracking-widest">
                AES-256 Encryption
              </span>
            </div>
            <div className="flex items-center gap-2 text-emerald-500 italic">
              <span className="text-[10px] font-mono uppercase tracking-widest">
                System_Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
