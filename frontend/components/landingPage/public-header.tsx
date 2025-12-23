"use client";

import Link from "next/link";
import { Leaf, Menu, X, ChevronDown, Sparkles, ArrowRight, Microscope, HelpCircle, BookOpen, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function PublicHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const resourceLinks = [
    { name: "Methodology", href: "/methodology", desc: "How we calculate" },
    { name: "Guides", href: "/guides", desc: "Reduction steps" },
    { name: "FAQ", href: "/faq", desc: "Common questions" },
    { name: "Privacy", href: "/privacy", desc: "Data security" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4",
        isScrolled ? "pt-4" : "pt-6"
      )}
    >
      <nav
        className={cn(
          "mx-auto max-w-7xl transition-all duration-500 rounded-2xl border flex items-center justify-between px-6 h-16",
          isScrolled
            ? "bg-zinc-900/70 border-zinc-800 backdrop-blur-xl shadow-2xl"
            : "bg-transparent border-transparent"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-emerald-500 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <Leaf className="w-5 h-5 text-zinc-950" />
          </div>
          <span className="text-xl font-black text-white tracking-tighter italic">
            EcoTrack
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-400 hover:text-emerald-500 px-4 py-2 transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {/* Resources Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-zinc-400 hover:text-emerald-500 px-4 py-2 transition-all duration-300 outline-none data-[state=open]:text-emerald-500">
              Resources{" "}
              <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="center"
              sideOffset={15}
              className="relative overflow-hidden bg-zinc-950 border-zinc-800/80 text-zinc-300 w-80 p-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in-95 duration-200"
            >
              {/* Ambient Background Light Source */}
              <div className="absolute -top-10 -left-10 size-40 bg-emerald-500/10 blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 size-32 bg-blue-500/5 blur-[80px] pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 gap-1">
                {/* Header with soft color */}
                <div className="px-3 py-2 mb-1 flex items-center justify-between">
                  <p className="text-[10px] font-mono text-emerald-500/80 uppercase tracking-[0.2em] font-bold">
                    Resources Center
                  </p>
                  <div className="size-1 rounded-full bg-emerald-500/50" />
                </div>

                {resourceLinks.map((item) => {
                  const Icon =
                    item.name === "Methodology"
                      ? Microscope
                      : item.name === "Guides"
                      ? BookOpen
                      : item.name === "FAQ"
                      ? HelpCircle
                      : ShieldCheck;

                  return (
                    <DropdownMenuItem
                      key={item.href}
                      asChild
                      className="focus:bg-transparent p-0 cursor-pointer"
                    >
                      <Link
                        href={item.href}
                        className="group flex items-start gap-4 p-3 rounded-xl transition-all duration-300 outline-none hover:bg-white/[0.04] border border-transparent hover:border-white/[0.05]"
                      >
                        {/* Icon Container with Glass Effect */}
                        <div className="mt-0.5 p-2 bg-zinc-900/80 border border-zinc-800 rounded-lg group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-all duration-300 shadow-inner">
                          <Icon className="size-4 text-zinc-500 group-hover:text-zinc-950 transition-colors" />
                        </div>

                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-zinc-500 leading-tight group-hover:text-zinc-400 transition-colors">
                            {item.desc}
                          </span>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </div>

              {/* Footer with clearer contrast */}
              <div className="relative z-10 mt-2 pt-2 border-t border-zinc-800/60">
                <Link
                  href="/resources"
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-zinc-900/50 hover:bg-zinc-800 transition-all duration-300 border border-zinc-800 group"
                >
                  <span className="text-[11px] font-bold text-zinc-400 group-hover:text-emerald-400 transition-colors uppercase tracking-wider">
                    Full Directory
                  </span>
                  <ArrowRight className="size-3 text-zinc-600 group-hover:text-emerald-400 transition-all group-hover:translate-x-1" />
                </Link>
              </div>
            </DropdownMenuContent>
            
          </DropdownMenu>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-bold text-zinc-400 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Button
            asChild
            className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl px-6 font-bold shadow-lg shadow-emerald-900/20"
          >
            <Link href="/register">
              <Sparkles className="w-4 h-4 mr-2" /> Start Tracking
            </Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-zinc-400 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-zinc-950 z-[90] p-6 space-y-8 animate-in fade-in slide-in-from-top-5">
          <div className="flex flex-col gap-4">
            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
              Navigation
            </p>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold text-white italic"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
              Resources
            </p>
            <div className="grid grid-cols-2 gap-4">
              {resourceLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl"
                >
                  <span className="text-white font-bold block">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-zinc-500 uppercase">
                    {item.desc}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-900 flex flex-col gap-4">
            <Button
              asChild
              className="w-full h-14 bg-emerald-600 font-bold rounded-2xl"
            >
              <Link href="/register">Start Tracking Now</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="w-full h-14 border-zinc-800 bg-transparent text-white rounded-2xl"
            >
              <Link href="/login">Login to Account</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
