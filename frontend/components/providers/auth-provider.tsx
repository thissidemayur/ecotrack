"use client";
import { ShieldAlert } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/state/authStore";
import { useAuthApi } from "@/hooks/useAuthApi";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuthenticated, user, accessToken } = useAuthStore();
  const { rotateRefreshToken } = useAuthApi();
  const [hasCheckedSession, setHasCheckedSession] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // 1. Define Public Routes
  const isPublicPath =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/verify-email") ||
    pathname.startsWith("/forgot-password");

  useEffect(() => {
    if (hasCheckedSession) return;

    const restoreSession = async () => {
      setHasCheckedSession(true);
      try {
        await rotateRefreshToken();
      } catch (error) {
        // session restore failed silently; auth store will be cleared by rotateRefreshToken
      }
    };

    restoreSession();
  }, [hasCheckedSession, rotateRefreshToken]);

  // 2. Handle Authentication Redirect
  // Only redirect if not loading AND (not authenticated OR no access token) AND trying to access protected route
  useEffect(() => {
    // Skip redirect logic while loading
    if (isLoading) return;

    // If user is authenticated and on an auth route, send them to dashboard
    if (isAuthenticated && accessToken && isPublicPath && pathname !== "/") {
      router.push("/dashboard");
      return;
    }

    // If user is NOT authenticated and trying to access protected route, redirect to login
    if (!isAuthenticated && !accessToken && !isPublicPath) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, accessToken, isPublicPath, pathname, router]);

  // 3. FULL-PAGE UNAUTHORIZED VIEW
  // If user is logged in but trying to access admin without admin role
  if (
    !isLoading &&
    isAuthenticated &&
    pathname.startsWith("/admin") &&
    user?.role !== "admin"
  ) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="size-20 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20 mb-6">
          <ShieldAlert className="size-10 text-red-500" />
        </div>
        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-2">
          Access <span className="text-red-500">Denied</span>
        </h1>
        <p className="text-zinc-500 max-w-sm mb-8 font-medium italic">
          Your credentials do not have the required clearance for Platform
          Governance. This attempt has been logged.
        </p>
        <Button
          onClick={() => router.push("/dashboard")}
          className="bg-zinc-100 text-zinc-950 hover:bg-white font-bold uppercase tracking-widest px-8 h-12 rounded-2xl"
        >
          Return to Base
        </Button>
      </div>
    );
  }

  // ... rest of your existing AuthProvider logic (Loading states, etc.)
  return <>{children}</>;
};
