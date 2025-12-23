"use client"

import { useAuthApi } from "@/hooks/useAuthApi";
import { useUserApi } from "@/hooks/useUserApi";
import { useAuthStore } from "@/state/authStore"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AuthProvider =({children}: {children: React.ReactNode})=> {
  const { setLoading, isLoading, isAuthenticated } = useAuthStore();
  const { rotateRefreshToken } = useAuthApi();
  const {fetchMe} = useUserApi()
  const router = useRouter();

  useEffect(() => {
    const initializeApp = async () => {
      if (isAuthenticated) return; // Don't refresh if already have a token
      // Only run rotation if we aren't already authenticated
      setLoading(true);
      try {
        await rotateRefreshToken();
        await fetchMe();
      } catch (error) {
        console.error("Session recovery failed");
      } finally {
        setLoading(false);
      }
    };
    initializeApp();
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="animate-pulse font-medium text-gray-500">
          Loading your session...
        </div>
      </div>
    );
  }



  return <>{children}</>;
}