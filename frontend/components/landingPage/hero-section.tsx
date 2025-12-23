"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Activity, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-zinc-950 pt-20 pb-32 overflow-hidden">
      {/* 1. Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] size-[600px] bg-emerald-500/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] size-[500px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <Badge
                variant="outline"
                className="px-4 py-1.5 border-emerald-500/30 bg-emerald-500/5 text-emerald-500 backdrop-blur-md gap-2"
              >
                <Sparkles className="size-3" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em]">
                  Live IPCC v2.5 Standards
                </span>
              </Badge>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9] italic">
              Quantify Your <br />
              <span className="text-emerald-500 underline decoration-emerald-500/20 underline-offset-[12px] not-italic">
                Impact.
              </span>
            </h1>

            <p className="max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-zinc-400 leading-relaxed">
              EcoTrack transforms fragmented consumption data into a
              high-fidelity environmental blueprint. Analyze emissions against
              global benchmarks with scientific rigor.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:justify-start gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="h-14 px-8 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-emerald-900/20 group"
              >
                <Link href="/register" className="flex items-center">
                  Initialize Tracking{" "}
                  <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-8 border-zinc-800 bg-zinc-900/50 text-white hover:bg-zinc-800 rounded-2xl font-bold"
              >
                <Link href="/methodology">The Engine</Link>
              </Button>
            </div>

            {/* Micro-Stats for Trust */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-emerald-500" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-white">
                  Bank-Grade Privacy
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="size-4 text-emerald-500" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-white">
                  Real-time Analytics
                </span>
              </div>
            </div>
          </div>

          {/* Right Image Content */}
          <div className="relative group lg:block hidden">
            {/* Holographic Glow behind image */}
            <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-700" />

            <div className="relative border border-zinc-800 rounded-[2rem] overflow-hidden bg-zinc-900 shadow-2xl shadow-black">
              {/* Fake UI Header for the image container */}
              <div className="h-8 bg-zinc-800/50 border-b border-zinc-800 flex items-center px-4 gap-1.5">
                <div className="size-2 rounded-full bg-zinc-700" />
                <div className="size-2 rounded-full bg-zinc-700" />
                <div className="size-2 rounded-full bg-zinc-700" />
                <div className="ml-auto font-mono text-[8px] text-zinc-500 uppercase tracking-tighter">
                  System_Preview: Dashboard_v1
                </div>
              </div>

              <Image
                height={600}
                width={800}
                src="/landingPage.png"
                alt="Sustainable home dashboard"
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>

            {/* Floating Info Tag */}
            <div className="absolute -bottom-6 -left-6 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl shadow-2xl backdrop-blur-xl animate-bounce duration-[3000ms]">
              <div className="flex items-center gap-3">
                <div className="size-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <Zap className="size-4 text-emerald-500" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    Network Impact
                  </p>
                  <p className="text-sm font-bold text-white tracking-tight">
                    -24% CO₂e Avg.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
