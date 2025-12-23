// app/(public)/layout.tsx
import { PublicHeader } from "@/components/landingPage/public-header";
import { PublicFooter } from "@/components/landingPage/public-footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 selection:bg-emerald-500/30">
      {/* Fixed/Sticky Header for easy navigation */}
      <PublicHeader />

      <main className="flex-1 relative">
        {/* Global Ambient Glows for all Landing Pages */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[400px] bg-emerald-500/5 blur-[120px] pointer-events-none -z-10" />

        {/* Content Wrapper */}
        <div className="relative z-10 w-full">{children}</div>
      </main>

      {/* Modern Footer with a subtle divider */}
      <div className="border-t border-zinc-900 bg-zinc-950/50 backdrop-blur-sm">
        <PublicFooter />
      </div>
    </div>
  );
}
