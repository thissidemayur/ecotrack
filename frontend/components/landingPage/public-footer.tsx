"use client";

import Link from "next/link";
import {
  Leaf,
  Globe,
  Terminal,
  Cpu,
  Activity,
  Fingerprint,
} from "lucide-react";
import { FaInstagram, FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 pt-16 pb-8 selection:bg-emerald-500/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* 1. Brand & Identity */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-emerald-500 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                <Leaf className="w-5 h-5 text-zinc-950" />
              </div>
              <span className="text-xl font-black text-white tracking-tighter italic">
                EcoTrack
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-500 max-w-xs italic">
              Empowering individuals to quantify and neutralize their
              environmental impact through bank-grade data architecture.
            </p>
            <div className="flex items-center gap-3 px-3 py-1.5 bg-zinc-900/50 border border-zinc-800 rounded-lg w-fit">
              <Activity className="size-3 text-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                Network: Online
              </span>
            </div>
          </div>

          {/* 2. Product Links */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-mono font-black text-zinc-600 uppercase tracking-[0.2em]">
              {"//"} Engine_Modules
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/calculate"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Calculation Engine
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/history"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Data History
                </Link>
              </li>
              <li>
                <Link
                  href="/methodology"
                  className="hover:text-emerald-500 transition-colors italic underline decoration-zinc-800 underline-offset-4"
                >
                  Methodology v1.0
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Resources & Governance */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-mono font-black text-zinc-600 uppercase tracking-[0.2em]">
              {"//"} Documentation
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/resources"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Knowledge Hub
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Reduction Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Privacy Protocol
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Terms of Fair Use
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Connect & Architecture */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-mono font-black text-zinc-600 uppercase tracking-[0.2em]">
              {"//"} Dev_Control
            </h3>
            <ul className="space-y-3 text-sm mb-6">
              <li>
                <Link
                  href="/about"
                  className="hover:text-emerald-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Secure Contact
                </Link>
              </li>
              <li>
                <a
                  href="https://thissidemayur.me"
                  target="_blank"
                  rel="noopener"
                  className="hover:text-emerald-500 transition-colors flex items-center gap-2"
                >
                  <Globe className="size-3" />{" "}
                  <span className="underline decoration-emerald-500/20 underline-offset-4 font-bold">
                    thissidemayur.me
                  </span>
                </a>
              </li>
            </ul>

            <div className="flex gap-3">
              {[
                {
                  icon: FaGithub,
                  href: "https://github.com/thissidemayur",
                  label: "GitHub",
                },
                {
                  icon: FaLinkedin,
                  href: "https://linkedin.com/in/thissidemayur",
                  label: "LinkedIn",
                },
                {
                  icon: FaXTwitter,
                  href: "https://x.com/thissidemayur",
                  label: "X",
                },
                {
                  icon: FaInstagram,
                  href: "https://instagram.com/thissidemayur",
                  label: "Instagram",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener"
                  className="size-9 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* --- Bottom Metadata Bar --- */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-mono uppercase tracking-widest text-zinc-600">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p>&copy; {currentYear} ECOTRACK_SYSTEMS</p>
            <div className="flex items-center gap-2">
              <Cpu className="size-3" />
              <span>Architecture: Cloud_Native</span>
            </div>
          </div>

          <a
            href={"https://thissidemayur.me"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-2 group cursor-pointer">
              <span className="text-zinc-500 group-hover:text-emerald-500 transition-colors">
                {/* Wrap the text in a string or simply remove the double slashes if you prefer */}
                Built_by{" "}
                <span className="text-white font-black group-hover:text-emerald-500 transition-colors">
                  Mayur
                </span>{" "}
                {" // "} Dev_ops
              </span>
              <Fingerprint className="size-4 opacity-50 group-hover:opacity-100 group-hover:text-emerald-500 transition-all" />
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}
