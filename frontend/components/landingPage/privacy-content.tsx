"use client";

import {
  Shield,
  Lock,
  Eye,
  Trash2,
  Globe,
  UserCheck,
  ShieldAlert,
  Fingerprint,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "../ui/card";

export function PrivacyContent() {
  return (
    <div className="bg-zinc-950 text-zinc-300 min-h-screen pb-20 selection:bg-emerald-500/30">
      <div className="container mx-auto max-w-4xl px-6">
        {/* 1. Page Header */}
        <header className="relative pt-24 pb-12 overflow-hidden text-center md:text-left">
          <div className="absolute top-0 left-0 w-full h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -z-10" />
          <Badge
            variant="outline"
            className="mb-4 border-emerald-500/30 text-emerald-500 bg-emerald-500/5 uppercase tracking-widest text-[10px]"
          >
            Data Sovereignty Protocol
          </Badge>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter italic">
            Privacy <span className="text-emerald-500">Policy</span>
          </h1>
          <p className="mt-4 text-zinc-500 font-mono text-xs uppercase tracking-tight">
            Last Updated // {new Date().toLocaleDateString("en-GB")} 
            System_Status: Secure
          </p>
        </header>

        {/* 2. The Zero-Party Manifesto Card */}
        <section className="relative p-1 rounded-[2.5rem] bg-gradient-to-br from-zinc-800 to-transparent mb-12">
          <div className="bg-zinc-900/90 backdrop-blur-xl p-8 md:p-12 rounded-[2.4rem] space-y-10">
            <div className="flex flex-col md:flex-row md:items-center gap-6 border-b border-zinc-800 pb-8">
              <div className="size-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-500/20">
                <Shield className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  The &quot;Zero-Party&quot; Data Clause
                </h2>
                <p className="text-zinc-500 font-mono text-xs uppercase mt-1">
                  Commitment to Privacy-by-Design Architecture
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {[
                {
                  title: "No Third-Party Sharing",
                  desc: "Your data is never sold or leased to marketing agencies or analytics firms.",
                  icon: Lock,
                },
                {
                  title: "No Government Backdoors",
                  desc: "Strictly private. We do not provide data access to regulatory or government bodies.",
                  icon: Globe,
                },
                {
                  title: "Zero Tracking Pixels",
                  desc: "Free of charge and free of hidden scripts. No monetization of your digital presence.",
                  icon: Eye,
                },
                {
                  title: "Ownership & Control",
                  desc: "You retain 100% ownership. Export or purge your data with a single click.",
                  icon: UserCheck,
                },
              ].map((item, i) => (
                <div key={i} className="group space-y-3">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-white text-lg tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed italic">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Right to be Forgotten Alert */}
            <div className="bg-zinc-950/50 border border-zinc-800 p-6 rounded-2xl flex items-start gap-4 group">
              <Trash2 className="w-6 h-6 text-rose-500 group-hover:animate-bounce mt-1" />
              <div>
                <h4 className="font-bold text-white">Right to be Forgotten</h4>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  Request complete deletion of your account. We will process
                  your purge request within 30 days, leaving zero trace on our
                  servers.
                </p>
              </div>
            </div>

            {/* Developer Signature */}
            <div className="pt-8 border-t border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative size-12 rounded-full overflow-hidden border-2 border-emerald-500/50 grayscale hover:grayscale-0 transition-all">
                  {/* Using a placeholder for your portrait - replace with actual Image component if needed */}
                  <div className="bg-zinc-800 w-full h-full flex items-center justify-center text-[10px] font-bold text-emerald-500">
                    M
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-white italic">Mayur</p>
                  <p className="text-[10px] font-mono text-zinc-600 uppercase">
                    Core Developer // EcoTrack
                  </p>
                </div>
              </div>
              <Fingerprint className="size-8 text-zinc-800" />
            </div>
          </div>
        </section>

        {/* 3. Detailed Clauses Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 bg-zinc-900/40 border-zinc-800 p-8 space-y-4">
            <h3 className="text-white font-bold flex items-center gap-2 italic">
              <ShieldAlert className="size-4 text-emerald-500" /> Collection &
              Usage
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              We only collect essential data: email for authentication, your
              footprint results for history, and anonymized analytics to improve
              the calculation engine. We never profile or track your behavior
              across other sites.
            </p>
          </Card>

          <Card className="bg-zinc-900/40 border-zinc-800 p-8 space-y-4">
            <h3 className="text-white font-bold flex items-center gap-2 italic">
              <Lock className="size-4 text-emerald-500" /> Encryption
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              All data is AES-256 encrypted at rest and TLS-encrypted in
              transit.
            </p>
          </Card>

          <div className="md:col-span-3 bg-emerald-600/10 border border-emerald-500/20 p-8 rounded-[2rem] text-center">
            <p className="text-zinc-300 mb-4 font-medium italic">
              &quot;Your environmental data is yours. Period.&quot;
            </p>
            <a
              href="mailto:privacy@ecotrack.app"
              className="text-emerald-500 font-bold hover:underline underline-offset-4"
            >
              privacy@ecotrack.app
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
