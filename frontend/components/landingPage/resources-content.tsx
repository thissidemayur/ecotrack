"use client";

import Link from "next/link";
import {
  BookOpen,
  FileText,
  Shield,
  FileCheck,
  ArrowRight,
  Library,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ResourcesContent() {
  const resources = [
   
    {
      icon: FileText,
      title: "Guides",
      label: "STEP-BY-STEP",
      description:
        "Step-by-step documentation on how to measure and reduce your carbon footprint effectively.",
      href: "/guides",
      gradient: "from-emerald-500/10 to-transparent",
      borderColor: "group-hover:border-emerald-500/50",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      icon: Shield,
      title: "Privacy Policy",
      label: "DATA SECURITY",
      description:
        "Learn how we protect your data with our zero-party data commitment and privacy-first approach.",
      href: "/privacy",
      gradient: "from-purple-500/10 to-transparent",
      borderColor: "group-hover:border-purple-500/50",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400",
    },
    {
      icon: FileCheck,
      title: "Terms of Service",
      label: "LEGAL STANDARDS",
      description:
        "Understand our terms, conditions, and commitment to providing free, transparent services.",
      href: "/terms",
      gradient: "from-amber-500/10 to-transparent",
      borderColor: "group-hover:border-amber-500/50",
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-400",
    },
  ];

  return (
    <div className="bg-zinc-950 text-zinc-300 min-h-screen pb-24 selection:bg-emerald-500/30">
      {/* 1. Header Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full -z-10" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <Badge
            variant="outline"
            className="border-emerald-500/30 text-emerald-500 bg-emerald-500/5 px-4 py-1"
          >
            <Library className="size-3 mr-2" /> Central Archive
          </Badge>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter italic">
            Knowledge <span className="text-emerald-500">&</span> Resources
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Your comprehensive directory for environmental science, data privacy
            protocols, and platform standards.
          </p>
        </div>
      </section>

      {/* 2. Resources Bento Grid */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource) => (
          <Link
            key={resource.href}
            href={resource.href}
            className={cn(
              "group relative flex flex-col justify-between p-8 rounded-[2rem] bg-zinc-900/40 border border-zinc-800/50",
              "hover:bg-zinc-900/60 transition-all duration-500 overflow-hidden",
              resource.borderColor
            )}
          >
            {/* Soft gradient reveal on hover */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                resource.gradient
              )}
            />

            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-start">
                <div
                  className={cn(
                    "p-4 rounded-2xl border border-white/5 transition-transform duration-500 group-hover:scale-110",
                    resource.iconBg
                  )}
                >
                  <resource.icon className={cn("size-6", resource.iconColor)} />
                </div>
                <span className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] uppercase pt-2">
                  {resource.label}
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors tracking-tight italic">
                  {resource.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                  {resource.description}
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
              Explore Module{" "}
              <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Subtle watermark for texture */}
            <resource.icon className="absolute -right-8 -bottom-8 size-40 text-white/5 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
          </Link>
        ))}
      </div>

      {/* 3. Global Stats / Quick Info */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-t border-zinc-900">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-500 font-mono text-xs uppercase tracking-widest">
              <Sparkles className="size-3" /> Updated Weekly
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Our guides are updated with the latest 2025 IPCC emission factors.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-500 font-mono text-xs uppercase tracking-widest">
              <Shield className="size-3" /> Data Sovereignty
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Documentation on how we maintain your zero-party data promise.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-500 font-mono text-xs uppercase tracking-widest">
              <Library className="size-3" /> Community First
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Open-access resources for schools, households, and green startups.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
