"use client";

import { LoginForm } from "@/components/form/auth-loginForm";
import { Leaf, Sparkles, Target, Zap } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-zinc-950 selection:bg-emerald-500/30">
      {/* 1. LEFT SIDE: THE LOGIN PORTAL */}
      <div className="flex flex-col gap-6 p-6 md:p-10 relative overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] size-64 bg-emerald-500/10 blur-[120px] rounded-full" />

        <div className="flex justify-center gap-2 md:justify-start relative z-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-emerald-500/10 text-emerald-500 flex size-10 items-center justify-center rounded-xl border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all group-hover:scale-110 group-hover:rotate-3">
              <Leaf className="size-6" />
            </div>
            <span className="font-black text-white text-xl tracking-tighter italic uppercase">
              EcoTrack
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center relative z-10">
          <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            <LoginForm />
          </div>
        </div>

        <div className="relative z-10 text-center md:text-left">
          <p className="text-[10px] text-zinc-600 uppercase font-black tracking-[0.3em]">
            System Ver 1.0.4 // Early Access
          </p>
        </div>
      </div>

      {/* 2. RIGHT SIDE: THE "MISSION BRIEFING" (Creative & Honest) */}
      <div className="relative hidden lg:flex flex-col items-center justify-center overflow-hidden border-l border-zinc-900 bg-zinc-900/10">
        {/* Animated Background Pulse */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        </div>

        {/* The Grid */}
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative z-10 max-w-md px-12 space-y-10">
          {/* Top Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
            <Target className="size-3" /> Mission Briefing
          </div>

          <div className="space-y-6">
            <h2 className="text-5xl font-black text-white leading-[0.95] italic uppercase tracking-tighter">
              The <span className="text-emerald-500">First Few</span> Lead The
              Way.
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed font-medium italic">
              You are among the first 20 pioneers joining EcoTrack. Your data
              today helps us build the tools for millions tomorrow.
            </p>
          </div>

          {/* Creative Feature Cards instead of fake stats */}
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-md flex items-start gap-4 group hover:border-emerald-500/30 transition-all">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                <Zap className="size-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase italic">
                  Founding Member Status
                </h4>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Unlock exclusive &quot;Origin&quot; badges on your dashboard.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-md flex items-start gap-4 group hover:border-emerald-500/30 transition-all">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                <Sparkles className="size-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase italic">
                  Community Driven
                </h4>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Help shape the app&apos;s future with direct feedback.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Element */}
        <div className="absolute bottom-10 flex items-center gap-2 opacity-20">
          <div className="size-1 bg-emerald-500 rounded-full animate-ping" />
          <span className="text-[8px] font-mono uppercase tracking-[0.5em] text-white">
            Establishing Connection...
          </span>
        </div>
      </div>
    </div>
  );
}
