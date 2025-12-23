"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuthApi } from "@/hooks/useAuthApi";
import { toast } from "sonner";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Mail, Lock, UserPlus, Loader2 } from "lucide-react";

// Simplified Schema with friendly messages
const formSchema = z
  .object({
    email: z
      .string()
      .min(1, "Please enter your email")
      .email("That email address doesn't look quite right"),
    password: z
      .string()
      .min(8, "Password should be at least 8 characters")
      .max(128, "Password is a bit too long"),
    confirmPassword: z.string().min(1, "Please type your password again"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Your passwords don't match yet",
    path: ["confirmPassword"],
  });

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting } = form.formState;
  const { registerUser } = useAuthApi();

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const username = null; // We collect this in onboarding
    await registerUser(username, data.email, data.password);
  };

  return (
    <form
      className={cn("flex flex-col gap-8", className)}
      {...props}
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      {/* 1. WELCOME HEADER */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Create your account
        </h1>
        <p className="text-zinc-400 text-sm">
          Join our mission for a greener planet. It only takes a minute.
        </p>
      </div>

      <FieldGroup className="space-y-6">
        {/* Email Field */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="text-sm font-medium text-zinc-300 mb-1.5 flex items-center gap-2">
                <Mail className="size-4 text-emerald-500" /> Email Address
              </FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="yourname@email.com"
                className="h-12 bg-zinc-900 border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:ring-emerald-500"
              />
              <FieldDescription className="text-[11px] text-zinc-500 mt-1">
                We&apos;ll send your mission updates here.
              </FieldDescription>
              {fieldState.invalid && (
                <FieldError
                  className="text-xs text-red-400 mt-1"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />

        {/* Password Field */}
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="text-sm font-medium text-zinc-300 mb-1.5 flex items-center gap-2">
                <Lock className="size-4 text-emerald-500" /> Create a Password
              </FieldLabel>
              <Input
                {...field}
                id="password"
                type="password"
                placeholder="Must be 8+ characters"
                className="h-12 bg-zinc-900 border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:ring-emerald-500"
              />
              {fieldState.invalid && (
                <FieldError
                  className="text-xs text-red-400 mt-1"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />

        {/* Confirm Password Field */}
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="text-sm font-medium text-zinc-300 mb-1.5 flex items-center gap-2">
                <Lock className="size-4 text-emerald-500" /> Confirm your
                Password
              </FieldLabel>
              <Input
                {...field}
                id="confirm-password"
                type="password"
                placeholder="Type it once more"
                className="h-12 bg-zinc-900 border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:ring-emerald-500"
              />
              {fieldState.invalid && (
                <FieldError
                  className="text-xs text-red-400 mt-1"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-md active:scale-95"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin size-5" />
            ) : (
              <span className="flex items-center gap-2">
                Join the Movement <UserPlus className="size-4" />
              </span>
            )}
          </Button>
        </div>

        {/* Sign In Link */}
        <div className="text-center pt-2">
          <p className="text-sm text-zinc-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-emerald-500 font-semibold hover:text-emerald-400 underline-offset-4 decoration-2"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </FieldGroup>
    </form>
  );
}
