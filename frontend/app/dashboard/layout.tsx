// app/dashboard/layout.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* 1. Ensure the container is exactly screen width */}
      <div className="flex h-screen w-full bg-zinc-950 overflow-hidden">
        <AppSidebar />

        {/* 2. 'min-w-0' is critical here to stop charts from expanding this div */}
        <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
          <Header />

          {/* 3. This is the only scroll area. We remove padding here to let the Wrapper handle it */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}