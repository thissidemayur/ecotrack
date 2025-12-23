"use client";

import { useState } from "react";
import {
  Mail, Instagram, Linkedin, Github, ExternalLink,
  Copy, Check, Globe, Activity, Terminal, Code2, Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { socials } from "@/lib/constant";

export function ContactContent() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // SEO: Schema.org JSON-LD for Search Engines
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mayur",
    "url": "https://thissidemayur.me",
    "jobTitle": "Full Stack Developer & DevOps Engineer",
    "sameAs": [
      "https://github.com/thissidemayur",
      "https://linkedin.com/in/thissidemayur",
      "https://x.com/thissidemayur"
    ],
    "email": "mailto:thissidemayur@gmail.com"
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950">
      {/* 🛡️ SEO Metadata Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* DevOps Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_50%)]" />
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
        {/* --- Hero Section: Marketable Headline --- */}
        <section className="max-w-4xl mx-auto text-center mb-20 animate-in fade-in slide-in-from-top-10 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-emerald-500/5 border border-emerald-500/10 rounded-full backdrop-blur-sm">
            <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-500">
              Pipeline Status: Success
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter text-white">
            Deployment <br />
            <span className="text-emerald-500">Starts Here.</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
            I help brands scale by building high-performance 
            <span className="text-white italic"> full-stack applications </span> 
            with automated cloud workflows.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
             {["React", "Node.js", "AWS", "Docker", "Next.js"].map(tech => (
               <span key={tech} className="text-[10px] font-mono px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-500 rounded-md">
                 {tech}
               </span>
             ))}
          </div>
        </section>

        {/* --- Primary Contact Section: The Terminal Look --- */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          
          {/* Main Terminal Card */}
          <Card className="lg:col-span-2 bg-zinc-900/50 border-zinc-800 p-8 relative overflow-hidden group">
             <div className="flex items-center gap-2 mb-8 border-b border-zinc-800 pb-4">
                <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-red-500/20" />
                   <div className="w-3 h-3 rounded-full bg-amber-500/20" />
                   <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
                </div>
                <span className="text-xs font-mono text-zinc-600 ml-2">bash — contact.sh</span>
             </div>

             <div className="space-y-10">
                <div className="space-y-4">
                   <p className="text-xs font-mono text-zinc-500"># Direct Communication</p>
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                         <Mail className="size-6 text-emerald-500" />
                         <div>
                            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Email</p>
                            <p className="text-lg font-mono text-white">thissidemayur@gmail.com</p>
                         </div>
                      </div>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => copyToClipboard("thissidemayur@gmail.com", "mail")}
                        className="bg-zinc-800 hover:bg-emerald-600 hover:text-white transition-all rounded-md h-9"
                      >
                         {copiedField === "mail" ? <Check className="size-4" /> : <Copy className="size-4" />}
                      </Button>
                   </div>
                </div>

                <div className="space-y-4">
                   <p className="text-xs font-mono text-zinc-500"># Global Presence</p>
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                         <Globe className="size-6 text-cyan-500" />
                         <div>
                            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Web</p>
                            <p className="text-lg font-mono text-white">thissidemayur.me</p>
                         </div>
                      </div>
                      <Button asChild variant="secondary" size="sm" className="bg-zinc-800 hover:bg-cyan-600 hover:text-white transition-all rounded-md h-9">
                         <a href="https://thissidemayur.me" target="_blank" rel="noopener">
                            <ExternalLink className="size-4" />
                         </a>
                      </Button>
                   </div>
                </div>
             </div>
          </Card>

          {/* Side Info: Marketability Metrics */}
          <div className="space-y-4">
             <Card className="bg-zinc-900/30 border-zinc-800 p-6">
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                      <Cpu className="size-4" />
                   </div>
                   <h3 className="text-white font-bold text-sm">Tech Infrastructure</h3>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  I build with a focus on high availability, utilizing Docker containers and AWS orchestration.
                </p>
             </Card>

             <Card className="bg-zinc-900/30 border-zinc-800 p-6">
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                      <Code2 className="size-4" />
                   </div>
                   <h3 className="text-white font-bold text-sm">Full-Stack Vision</h3>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Seamlessly bridging the gap between pixel-perfect UIs and robust database schemas.
                </p>
             </Card>
          </div>
        </div>

        {/* --- Socials Section --- */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-emerald-500" />
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                $ sh connect --all
              </h2>
            </div>
            <div className="hidden md:block h-px flex-1 bg-zinc-900 mx-8" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.id}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Follow Mayur on ${social.label}`}
                  className="group p-6 bg-zinc-900/40 border border-zinc-800 hover:border-emerald-500/40 transition-all rounded-2xl"
                >
                  <Icon className="size-10 text-zinc-600 group-hover:text-emerald-500 mb-4 transition-colors" />
                  <p className="text-xs font-mono text-zinc-500 group-hover:text-white transition-colors">{social.label}</p>
                </a>
              );
            })}
          </div>
        </div>

        {/* --- Status Footer: The "Bot Friendly" Section --- */}
        <footer className="max-w-6xl mx-auto pt-10 border-t border-zinc-900 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="space-y-1">
              <p className="text-xs text-zinc-600 font-mono">MAYUR // CORE_DEVOPS_ENGINEER</p>
              <p className="text-[10px] text-zinc-700">© 2025 ALL_RIGHTS_RESERVED // INDIA</p>
           </div>
           
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                 <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Mayur: Available</span>
              </div>
              <div className="flex items-center gap-2">
                 <Terminal className="size-3 text-zinc-700" />
                 <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Uptime: 99.9%</span>
              </div>
           </div>
        </footer>
      </div>
    </main>
  );
}