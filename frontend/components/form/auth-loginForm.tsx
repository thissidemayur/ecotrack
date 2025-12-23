"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React from "react";
import { useAuthApi } from "@/hooks/useAuthApi";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Mail, Lock, LogIn, Loader2, Heart } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("That doesn't look like a valid email"),
  password: z.string().min(1, "Please enter your password"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: { password: "", email: "" },
  });

  const { isSubmitting } = form.formState;
  const { loginUser } = useAuthApi();

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await loginUser(data.email, data.password);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className={cn("flex flex-col gap-8", className)}
      {...props}
    >
      {/* 1. WELCOME SECTION */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Welcome Back!
        </h1>
        <p className="text-zinc-400 text-sm">
          Good to see you again. Let&apos;s continue saving the planet.
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
                <Lock className="size-4 text-emerald-500" /> Password
              </FieldLabel>
              <Input
                {...field}
                id="password"
                type="password"
                placeholder="Enter your password"
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

        {/* Action Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-md active:scale-95"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin size-5" />
          ) : (
            <span className="flex items-center gap-2">
              Sign In <LogIn className="size-4" />
            </span>
          )}
        </Button>

        {/* Bottom Link */}
        <div className="text-center">
          <p className="text-sm text-zinc-500">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/register"
              className="text-emerald-500 font-semibold hover:text-emerald-400 underline-offset-4 decoration-2"
            >
              Create one here
            </Link>
          </p>
        </div>
      </FieldGroup>

      {/* Safety Message */}
      <div className="flex items-center justify-center gap-2 text-zinc-600 pt-4 border-t border-zinc-900">
        <Heart className="size-3" />
        <span className="text-[11px]">
          Your data is safe and private with us.
        </span>
      </div>
    </form>
  );
}
