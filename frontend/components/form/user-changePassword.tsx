"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserApi } from "@/hooks/useUserApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Lock } from "lucide-react";
import z from "zod";

// 1. UPDATED SCHEMA
export const changePasswordSchema = z
  .object({
    // Changed to 'oldPassword' to match your naming convention
    oldPassword: z.string().min(1, "Current password is required."),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters long")
      .max(128, "Password is too long")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[A-Z]/, "Must contain at least one Uppercase letter")
      .regex(/[a-z]/, "Must contain at least one Lowercase letter"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .superRefine((data, ctx) => {
    // Check 1: New matches Old
    if (data.oldPassword === data.newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "New password cannot be the same as the current one.",
        path: ["newPassword"],
      });
    }
    // Check 2: New matches Confirm
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match.",
        path: ["confirmPassword"],
      });
    }
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export function ChangePasswordForm({ onSuccess }: { onSuccess?: () => void }) {
  const { changePassword, isUserLoading } = useUserApi();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordInput) => {
    console.log("Submitting password change...", data);
    const result = await changePassword(data);
    if (result?.success) {
      reset();
      if (onSuccess) onSuccess();
    }
  };

  // Debugging: Log errors to console if submission fails
  if (Object.keys(errors).length > 0) {
    console.log("Validation Errors:", errors);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 1. Old Password */}
      <div className="space-y-2">
        <Label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
          Current Password
        </Label>
        <Input
          type="password"
          placeholder="••••••••"
          {...register("oldPassword")} // MATCHES SCHEMA
          className="bg-zinc-900 border-zinc-800 rounded-xl h-11 text-white focus:border-red-500/50"
        />
        {errors.oldPassword && (
          <p className="text-[10px] text-red-400 font-medium italic">
            {errors.oldPassword.message}
          </p>
        )}
      </div>

      <hr className="border-zinc-900" />

      {/* 2. New Password */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            New Password
          </Label>
          <Input
            type="password"
            placeholder="At least 8 characters"
            {...register("newPassword")} // MATCHES SCHEMA
            className="bg-zinc-900 border-zinc-800 rounded-xl h-11 text-white focus:border-emerald-500/50"
          />
          {errors.newPassword && (
            <p className="text-[10px] text-red-400 font-medium italic">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* 3. Confirm New Password */}
        <div className="space-y-2">
          <Label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            Repeat New Password
          </Label>
          <Input
            type="password"
            placeholder="Confirm new password"
            {...register("confirmPassword")} // MATCHES SCHEMA
            className="bg-zinc-900 border-zinc-800 rounded-xl h-11 text-white focus:border-emerald-500/50"
          />
          {errors.confirmPassword && (
            <p className="text-[10px] text-red-400 font-medium italic">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <Button
        disabled={isUserLoading}
        type="submit"
        className="w-full bg-red-600 hover:bg-red-500 text-white font-black rounded-xl h-12 uppercase tracking-widest transition-all shadow-lg"
      >
        {isUserLoading ? (
          <Loader2 className="animate-spin size-4" />
        ) : (
          <div className="flex items-center gap-2">
            <Lock className="size-3" />
            Update Security Key
          </div>
        )}
      </Button>

      <p className="text-center text-[9px] text-zinc-600 font-medium uppercase tracking-tighter">
        For your safety, you will need to log back in after changing your
        password.
      </p>
    </form>
  );
}
