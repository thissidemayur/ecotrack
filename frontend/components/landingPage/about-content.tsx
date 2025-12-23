"use client";

import {
  Target,
  Users,
  Leaf,
  TrendingDown,
  Sparkles,
  ShieldCheck,
  Globe,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function AboutContent() {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Lead Architect",
      tech: "Node.js & Redis",
      color: "text-blue-400",
    },
    {
      name: "Marcus Rodriguez",
      role: "UX Engineer",
      tech: "React & Tailwind",
      color: "text-emerald-400",
    },
    {
      name: "Priya Patel",
      role: "Data Scientist",
      tech: "Python & Modeling",
      color: "text-amber-400",
    },
    {
      name: "James Kim",
      role: "API Developer",
      tech: "PostgreSQL",
      color: "text-purple-400",
    },
  ];

  return (
    <div className="bg-zinc-950 text-zinc-300 selection:bg-emerald-500/30">
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-emerald-500/5 blur-[120px] rounded-full" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <Badge
            variant="outline"
            className="px-4 py-1 border-emerald-500/30 text-emerald-500 bg-emerald-500/5 backdrop-blur-md"
          >
            <Sparkles className="w-3 h-3 mr-2" /> Student-Led Innovation
          </Badge>

          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]">
            Data Driven.
            <br />
            <span className="text-emerald-500 italic text-4xl md:text-7xl">
              Planet Focused.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed pt-4">
            EcoTrack is an advanced analytics engine built to transform
            lifestyle data into a blueprint for a carbon-neutral future.
          </p>
        </div>
      </section>

      {/* 2. MISSION BENTO GRID */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Mission Card */}
          <div className="md:col-span-2 p-8 md:p-12 rounded-[2.5rem] bg-zinc-900/40 border border-zinc-800 flex flex-col justify-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter italic">
              Our Mission
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              To democratize carbon intelligence. We provide households with
              accurate, science-backed tools to measure and reduce their
              environmental impact—making Net Zero a tangible goal for everyone,
              not just corporations.
            </p>
          </div>

          {/* Goal & Vision Mini Cards */}
          <div className="p-8 rounded-[2.5rem] bg-emerald-600 text-white flex flex-col justify-between group overflow-hidden relative">
            <Target className="w-12 h-12 mb-8 group-hover:scale-110 transition-transform" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2 tracking-tighter italic">
                The Goal
              </h3>
              <p className="text-emerald-50 text-sm leading-relaxed">
                Turning complex emission factors into actionable life changes.
              </p>
            </div>
            <div className="absolute -right-4 -bottom-4 size-24 bg-white/10 rounded-full blur-2xl" />
          </div>

          <div className="p-8 rounded-[2.5rem] bg-zinc-900 border border-zinc-800 flex flex-col justify-between group">
            <Globe className="w-12 h-12 text-emerald-500 mb-8 group-hover:rotate-12 transition-transform" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tighter italic">
                The Vision
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                A world where every purchase decision is guided by carbon
                transparency.
              </p>
            </div>
          </div>

          <div className="md:col-span-2 p-8 rounded-[2.5rem] bg-gradient-to-br from-zinc-900/80 to-zinc-950 border border-zinc-800 flex flex-col md:flex-row items-center gap-8">
            <div className="p-4 bg-zinc-800 rounded-2xl shrink-0">
              <Code2 className="w-10 h-10 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                Open Methodology
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Our algorithms are based on IPCC and EPA standards. We believe
                in total transparency of the math that calculates your impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. IMPACT SECTION */}
      <section className="py-24 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">
              Why it matters.
            </h2>
            <p className="text-zinc-500">
              The power of individual action, quantified.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                  <TrendingDown className="size-5" />
                </div>
                <h4 className="text-white font-bold tracking-tight">
                  Behavioral Shift
                </h4>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Studies prove that access to real-time carbon data makes
                individuals{" "}
                <span className="text-white font-bold">40% more likely</span> to
                reduce energy waste. Awareness is the first step to reduction.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                  <ShieldCheck className="size-5" />
                </div>
                <h4 className="text-white font-bold tracking-tight">
                  Data Integrity
                </h4>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">
                We bridge the gap between scientific journals and your
                dashboard, making high-level environmental science accessible to
                the average household.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TEAM SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <Badge className="bg-zinc-800 text-zinc-400 border-zinc-700">
            Engineering Team
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter">
            The Architects
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative bg-zinc-900/40 border border-zinc-800 rounded-[2rem] p-6 text-center hover:border-emerald-500/50 transition-all duration-500"
            >
              <div className="relative w-32 h-32 mx-auto mb-6 rounded-3xl overflow-hidden bg-zinc-800 grayscale group-hover:grayscale-0 transition-all duration-500">
                <Image
                  fill
                  src={"" }
                  alt={member.name}
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-emerald-500 transition-colors">
                {member.name}
              </h3>
              <p className="text-xs text-zinc-500 mb-4">{member.role}</p>
              <div
                className={cn(
                  "text-[10px] font-mono uppercase tracking-widest pt-4 border-t border-zinc-800",
                  member.color
                )}
              >
                {member.tech}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-emerald-600 rounded-[3rem] p-12 md:p-20 text-center space-y-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity" />
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter relative z-10 leading-none">
            Join the <br />
            Carbon Revolution.
          </h2>
          <div className="relative z-10 pt-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-emerald-600 hover:bg-zinc-100 h-14 px-10 rounded-2xl text-lg font-black shadow-2xl shadow-emerald-900/40"
            >
              <Link href="/register">Start Tracking Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
