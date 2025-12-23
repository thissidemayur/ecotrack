"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserApi } from "@/hooks/useUserApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, ShieldAlert, Lock } from "lucide-react";
import z from "zod";

// Simplified Rules (Validation)
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Please enter your old password"),
    newPassword: z
      .string()
      .min(8, "Your new password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Please type your new password again"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "The new passwords do not match",
    path: ["confirmPassword"],
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
    const result = await changePassword(data);
    if (result.success) {
      reset();
      if (onSuccess) onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 1. Old Password */}
      <div className="space-y-2">
        <Label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
          Current Password
        </Label>
        <div className="relative">
          <Input
            type="password"
            placeholder="••••••••"
            {...register("currentPassword")}
            className="bg-zinc-900 border-zinc-800 rounded-xl h-11 focus:ring-red-500/20 text-white"
          />
        </div>
        {errors.currentPassword && (
          <p className="text-[10px] text-red-400 font-medium italic">
            {errors.currentPassword.message}
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
            {...register("newPassword")}
            className="bg-zinc-900 border-zinc-800 rounded-xl h-11 focus:ring-emerald-500/20 text-white"
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
            {...register("confirmPassword")}
            className="bg-zinc-900 border-zinc-800 rounded-xl h-11 focus:ring-emerald-500/20 text-white"
          />
          {errors.confirmPassword && (
            <p className="text-[10px] text-red-400 font-medium italic">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      {/* Action Button */}
      <Button
        disabled={isUserLoading}
        type="submit"
        className="w-full bg-red-600 hover:bg-red-500 text-white font-black rounded-xl h-12 uppercase tracking-widest transition-all shadow-lg shadow-red-950/20"
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
