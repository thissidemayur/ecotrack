"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Fingerprint, ShieldCheck } from "lucide-react";

export function FinalCtaSection() {
  return (
    <section className="py-24 bg-zinc-950 px-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative group">
        {/* The Outer Glow Border Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-zinc-800 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000" />

        <div className="relative bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl rounded-[3rem] p-12 md:p-20 overflow-hidden">
          {/* Subtle Watermark Icon */}
          <Fingerprint className="absolute -right-10 -bottom-10 size-64 text-emerald-500/5 -rotate-12 pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
            {/* Launch Badge */}
            <div className="flex justify-center">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-mono uppercase tracking-[0.2em] font-bold">
                <Sparkles className="size-3" /> System_Ready_For_Deployment
              </div>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-[0.9] uppercase">
              Join the <br />{" "}
              <span className="text-emerald-500 not-italic">
                Carbon &nbsp; Revolution.
              </span>
            </h2>

            <p className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Initialize your environmental dashboard today. Transform
              fragmented data into a strategic roadmap for a sustainable future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                asChild
                size="lg"
                className="h-16 px-10 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xl shadow-2xl shadow-emerald-900/40 group transition-all duration-300"
              >
                <Link href="/register">
                  Initialize Account
                  <ArrowRight className="ml-2 size-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-16 px-8 border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-white rounded-2xl font-bold transition-all"
              >
                <Link href="/methodology" className="flex items-center gap-2">
                  <ShieldCheck className="size-4" /> View Governance
                </Link>
              </Button>
            </div>

            {/* Micro-Legal/Trust Text */}
            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest pt-4">
              Open-Access // Zero-Party Data // IPCC v2.5 Compliant
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
