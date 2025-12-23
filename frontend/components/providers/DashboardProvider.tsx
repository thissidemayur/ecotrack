// components/providers/DashboardProvider.tsx
import React from "react";
import { cn } from "@/lib/utils";

export function DashboardWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    // 'min-w-0' ensures that children like Recharts or Tables don't force a width larger than the viewport
    <div
      className={cn(
        "w-full min-w-0 mx-auto max-w-[1600px]",
        "p-4 md:p-8 lg:p-10",
        "animate-in fade-in duration-700",
        className
      )}
    >
      {children}
    </div>
  );
}
