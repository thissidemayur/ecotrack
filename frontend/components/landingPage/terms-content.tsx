"use client";

import {
  FileCheck,
  Heart,
  Scale,
  AlertCircle,
  CheckCircle,
  XCircle,
  ShieldCheck,
  Terminal,
  Fingerprint,
  Gavel,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function TermsContent() {
  return (
    <div className="bg-zinc-950 text-zinc-300 min-h-screen pb-24 selection:bg-blue-500/30">
      <div className="container mx-auto max-w-4xl px-6">
        {/* 1. Page Header */}
        <header className="relative pt-24 pb-12 overflow-hidden text-center md:text-left">
          <div className="absolute top-0 left-0 w-full h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />
          <Badge
            variant="outline"
            className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/5 uppercase tracking-widest text-[10px]"
          >
            Platform Governance // v1.0
          </Badge>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter italic">
            Terms of <span className="text-blue-500">Service</span>
          </h1>
          <p className="mt-4 text-zinc-500 font-mono text-xs uppercase tracking-tight">
            ESTABLISHED // {new Date().toLocaleDateString("en-GB")} 
            CONTRACT_STATUS: ACTIVE
          </p>
        </header>

        {/* 2. Primary Manifesto Section */}
        <section className="relative p-1 rounded-[2.5rem] bg-gradient-to-br from-zinc-800 to-transparent mb-12">
          <div className="bg-zinc-900/90 backdrop-blur-xl p-8 md:p-12 rounded-[2.4rem] space-y-12">
            {/* User-First Clause */}
            <div className="flex flex-col md:flex-row md:items-center gap-6 border-b border-zinc-800 pb-8">
              <div className="size-16 bg-blue-500/10 rounded-2xl flex items-center justify-center shrink-0 border border-blue-500/20">
                <FileCheck className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight italic">
                  Transparent & User-First
                </h2>
                <p className="text-zinc-500 font-mono text-xs uppercase mt-1">
                  Built for the community, not for profit.
                </p>
              </div>
            </div>

            {/* Grid of Rights & Responsibility */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
              {/* User Rights Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Scale className="w-5 h-5 text-blue-500" />
                  <h3 className="font-bold text-white text-lg tracking-tight uppercase tracking-widest text-xs">
                    Your Rights
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Access and export personal data at any time",
                    "Request total account and data deletion",
                    "Correct any information in your profile",
                    "Opt-out of all communications",
                  ].map((right, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0 group-hover:scale-125 transition-transform" />
                      <span className="text-sm text-zinc-400 leading-relaxed italic">
                        {right}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prohibited Activities Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Gavel className="w-5 h-5 text-red-500" />
                  <h3 className="font-bold text-white text-lg tracking-tight uppercase tracking-widest text-xs">
                    Fair Use
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Accessing unauthorized user data",
                    "Illegal or harmful exploitation",
                    "Reverse engineering the platform",
                    "Distributing malware or spam",
                  ].map((ban, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0 group-hover:scale-125 transition-transform" />
                      <span className="text-sm text-zinc-500 leading-relaxed italic">
                        {ban}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Service Nature Info */}
            <div className="bg-zinc-950/50 border border-zinc-800 p-6 rounded-2xl flex items-start gap-4">
              <Heart className="w-6 h-6 text-blue-500 shrink-0" />
              <div>
                <h4 className="font-bold text-white text-sm">
                  100% Free Service
                </h4>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  EcoTrack is provided free of charge to promote environmental
                  awareness. No hidden fees, no tiers, no monetized tracking.
                </p>
              </div>
            </div>

            {/* Developer Signature */}
            <div className="pt-8 border-t border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative size-12 rounded-full overflow-hidden border-2 border-blue-500/50 grayscale hover:grayscale-0 transition-all">
                  <div className="bg-zinc-800 w-full h-full flex items-center justify-center text-[10px] font-bold text-blue-500">
                    M
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-white italic">Mayur</p>
                  <p className="text-[10px] font-mono text-zinc-600 uppercase">
                    Lead Architect // DevOps Engineer
                  </p>
                </div>
              </div>
              <Fingerprint className="size-8 text-zinc-800" />
            </div>
          </div>
        </section>

        {/* 3. Deep-Dive Bento Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-zinc-900/40 border-zinc-800 p-8 space-y-4">
            <h3 className="text-white font-bold flex items-center gap-2 italic">
              <Terminal className="size-4 text-blue-500" /> Service SLA
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              While we strive for 99.9% uptime, EcoTrack is provided &quot;as
              is.&quot; Routine maintenance may occur to ensure calculation
              engine performance.
            </p>
          </Card>

          <Card className="bg-zinc-900/40 border-zinc-800 p-8 space-y-4">
            <h3 className="text-white font-bold flex items-center gap-2 italic">
              <ShieldCheck className="size-4 text-blue-500" /> Data Accuracy
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Calculations use standard emission factors. While we prioritize
              scientific accuracy, results are high-fidelity estimates.
            </p>
          </Card>

          <div className="md:col-span-2 bg-amber-500/5 border border-amber-500/20 p-6 rounded-3xl flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-zinc-400 italic">
              By accessing EcoTrack, you acknowledge and agree to these terms.
              Significant updates will be communicated via your registered
              email. Contact:{" "}
              <a
                href="mailto:legal@ecotrack.app"
                className="text-blue-500 hover:underline"
              >
                legal@ecotrack.app
              </a>
            </p>
          </div>
        </div>

        {/* SEO Monitoring Anchor */}
        <p className="text-[10px] text-zinc-600 text-center mt-12 font-mono uppercase tracking-widest">
          End_Of_Transmission // Reference_Id: ECO-TERMS-2025
        </p>
      </div>
    </div>
  );
}
