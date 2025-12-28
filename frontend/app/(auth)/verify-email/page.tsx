"use client";

import { useEffect, useState, useRef, Suspense } from "react"; // 1. Import Suspense
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthApi } from "@/hooks/useAuthApi";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// 2. Move your logic into a separate internal component
function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { verifyEmail } = useAuthApi();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  const hasCalled = useRef(false);
  const token = searchParams.get("token");

  useEffect(() => {
    const triggerVerification = async () => {
      if (!token) {
        setStatus("error");
        return;
      }

      if (hasCalled.current) return;
      hasCalled.current = true;

      try {
        const result = await verifyEmail(token);
        if (result?.success) {
          setStatus("success");
          setTimeout(() => router.push("/dashboard"), 3000);
        } else {
          setStatus("error");
        }
      } catch (err) {
        setStatus("error");
      }
    };

    triggerVerification();
  }, [token, verifyEmail, router]);

  return (
    <div className="w-full max-w-md bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2rem] text-center space-y-6">
      {status === "loading" && (
        <div className="animate-in fade-in duration-500">
          <Loader2 className="size-12 text-emerald-500 animate-spin mx-auto" />
          <h1 className="text-xl font-bold text-white uppercase italic mt-4">
            Verifying your mission...
          </h1>
        </div>
      )}

      {status === "success" && (
        <div className="animate-in zoom-in duration-300">
          <CheckCircle2 className="size-12 text-emerald-500 mx-auto" />
          <h1 className="text-xl font-bold text-white uppercase italic mt-4">
            Verification Complete!
          </h1>
          <p className="text-zinc-400 text-sm">
            Welcome to EcoTrack. Redirecting to your dashboard...
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="animate-in slide-in-from-top-2 duration-300">
          <XCircle className="size-12 text-red-500 mx-auto" />
          <h1 className="text-xl font-bold text-white uppercase italic mt-4">
            Link Expired or Invalid
          </h1>
          <p className="text-zinc-400 text-sm mb-4">
            This link has already been used or has timed out.
          </p>
          <Button
            variant="outline"
            onClick={() => router.push("/register")}
            className="border-zinc-800 text-zinc-400 hover:text-white"
          >
            Back to Registration
          </Button>
        </div>
      )}
    </div>
  );
}

// 3. The main export wraps the content in a Suspense Boundary
export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
      <Suspense
        fallback={
          <div className="text-center">
            <Loader2 className="size-12 text-emerald-500 animate-spin mx-auto" />
            <p className="text-zinc-500 mt-4 italic uppercase font-bold tracking-widest text-xs">
              Initializing Secure Link...
            </p>
          </div>
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
