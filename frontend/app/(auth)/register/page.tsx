import { RegisterForm } from "@/components/form/auth-registerForm";
import { Leaf, Users, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-zinc-950">
      {/* 1. LEFT SIDE: THE SIGNUP FORM */}
      <div className="flex flex-col gap-4 p-6 md:p-10 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-emerald-500/[0.01] pointer-events-none" />

        {/* LOGO AREA */}
        <div className="flex justify-center gap-2 md:justify-start relative z-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-emerald-500 text-zinc-950 flex size-9 items-center justify-center rounded-xl transition-transform group-hover:scale-105">
              <Leaf className="size-5" />
            </div>
            <span className="font-bold text-white text-xl tracking-tight">
              EcoTrack
            </span>
          </Link>
        </div>

        {/* FORM AREA */}
        <div className="flex flex-1 items-center justify-center relative z-10">
          <div className="w-full max-w-sm">
            {/* The RegisterForm internal logic should have GitHub removed as well */}
            <RegisterForm />
          </div>
        </div>
      </div>

      {/* 2. RIGHT SIDE: THE WELCOMING VISUAL */}
      <div className="relative hidden lg:flex flex-col justify-center items-center overflow-hidden border-l border-zinc-900 px-12">
        <div className="absolute inset-0 bg-zinc-950 z-0" />

        {/* Simple CSS-based nature glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-emerald-500/[0.03] rounded-full blur-[120px]" />

        <div className="relative z-10 space-y-12 max-w-md">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white leading-tight">
              Be a part of something{" "}
              <span className="text-emerald-500">meaningful.</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Join a small community of neighbors tracking their footprint to
              build a cleaner, greener future for everyone.
            </p>
          </div>

          {/* Simple Trust Points for non-technical users */}
          <div className="grid gap-6">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Users className="size-5" />
              </div>
              <p className="text-sm font-medium text-zinc-300">
                Join our first 10+ early members
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Globe className="size-5" />
              </div>
              <p className="text-sm font-medium text-zinc-300">
                Simple tools for a better planet
              </p>
            </div>
          </div>
        </div>

        {/* Subtle Brand Watermark */}
        <div className="absolute bottom-10 text-zinc-800 font-bold uppercase tracking-[0.5em] text-[10px]">
          EcoTrack Community
        </div>
      </div>
    </div>
  );
}
