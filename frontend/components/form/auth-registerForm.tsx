"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuthApi } from "@/hooks/useAuthApi";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Mail,
  Lock,
  UserPlus,
  Loader2,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

// Matches your backend auth.validator.js rules
const formSchema = z
  .object({
    email: z
      .string()
      .min(1, "Please enter your email")
      .email("That email address doesn't look quite right"),
    password: z
      .string()
      .min(8, "Password should be at least 8 characters")
      .max(128, "Password is a bit too long")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter"),
    confirmPassword: z.string().min(1, "Please type your password again"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Your passwords don't match yet",
    path: ["confirmPassword"],
  });

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const { registerUser } = useAuthApi();

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

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const result = await registerUser(data.email, data.password);
    if (result?.success) {
      setRegisteredEmail(data.email);
      setIsSuccess(true);
    }
  };

  // If successfully submitted, show the "Check Email" state
  if (isSuccess) {
    return (
      <div
        className={cn(
          "flex flex-col items-center text-center gap-6 animate-in fade-in zoom-in duration-300",
          className
        )}
      >
        <div className="size-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
          <CheckCircle className="size-10 text-emerald-500" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
            Check Your Inbox!
          </h1>
          <p className="text-zinc-400 text-sm max-w-[280px] mx-auto">
            We sent a verification link to{" "}
            <span className="text-emerald-500 font-bold">
              {registeredEmail}
            </span>
            .
          </p>
        </div>
        <p className="text-[11px] text-zinc-600 uppercase font-bold tracking-widest">
          The link will expire in 5 minutes
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSuccess(false)}
          className="border-zinc-800 text-zinc-400 hover:text-white rounded-xl"
        >
          <ArrowRight className="size-4 mr-2 rotate-180" /> Use a different
          email
        </Button>
      </div>
    );
  }

  return (
    <form
      className={cn("flex flex-col gap-8", className)}
      {...props}
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
          Join the Mission
        </h1>
        <p className="text-zinc-500 text-xs font-medium italic">
          Start tracking your impact today. It takes less than a minute.
        </p>
      </div>

      <FieldGroup className="space-y-5">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <Mail className="size-3 text-emerald-500" /> Email Address
              </FieldLabel>
              <Input
                {...field}
                type="email"
                placeholder="pioneer@ecotrack.me"
                className="h-12 bg-zinc-900 border-zinc-800 rounded-xl text-white placeholder:text-zinc-700"
              />
              {fieldState.invalid && (
                <FieldError
                  className="text-[10px] text-red-400 mt-1 italic"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Lock className="size-3 text-emerald-500" /> Password
                </FieldLabel>
                <Input
                  {...field}
                  type="password"
                  placeholder="8+ characters"
                  className="h-12 bg-zinc-900 border-zinc-800 rounded-xl text-white placeholder:text-zinc-700"
                />
                {fieldState.invalid && (
                  <FieldError
                    className="text-[10px] text-red-400 mt-1 italic"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />

          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Lock className="size-3 text-emerald-500" /> Confirm
                </FieldLabel>
                <Input
                  {...field}
                  type="password"
                  placeholder="Repeat it"
                  className="h-12 bg-zinc-900 border-zinc-800 rounded-xl text-white placeholder:text-zinc-700"
                />
                {fieldState.invalid && (
                  <FieldError
                    className="text-[10px] text-red-400 mt-1 italic"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-black uppercase tracking-widest rounded-xl shadow-lg shadow-emerald-900/20 active:scale-95 transition-all"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin size-5" />
            ) : (
              "Initialize Account"
            )}
          </Button>
        </div>

        <div className="text-center pt-2">
          <p className="text-sm text-zinc-600 font-medium">
            Already a member?{" "}
            <Link
              href="/login"
              className="text-emerald-500 font-black hover:underline uppercase tracking-tighter"
            >
              Sign in
            </Link>
          </p>
        </div>
      </FieldGroup>
    </form>
  );
}
