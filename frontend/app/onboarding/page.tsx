"use client";

import { useState, useMemo } from "react";
import { Country, State, City } from "country-state-city";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Home,
  Users,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useUserApi } from "@/hooks/useUserApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const onboardingSchema = z.object({
  name: z.string().min(2, "Please tell us your name!"),
  username: z.string().min(3, "Pick a cool username (3+ letters)"),
  location: z.object({
    country: z.string().min(1, "Pick your country"),
    state: z.string().min(1, "Pick your state"),
    district: z.string().min(1, "Pick your district"),
    pincode: z.string().length(6, "Pin code should be 6 digits"),
  }),
  home_size_sqm: z.number().min(1),
  householdSize: z.number().min(1),
});

type OnboardingData = z.infer<typeof onboardingSchema>;

export default function OnBoarding() {
  const [step, setStep] = useState(1);
  const { updateProfile, isUserLoading } = useUserApi();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      location: { country: "IN", state: "", district: "", pincode: "" },
      householdSize: 1,
      home_size_sqm: 50,
    } as any,
  });

  const watchedCountry = watch("location.country") || "IN";
  const watchedState = watch("location.state");

  const countries = useMemo(() => Country.getAllCountries(), []);
  const states = useMemo(
    () => State.getStatesOfCountry(watchedCountry),
    [watchedCountry]
  );
  const cities = useMemo(
    () => City.getCitiesOfState(watchedCountry, watchedState),
    [watchedCountry, watchedState]
  );

  const nextStep = async () => {
    let fields: any[] = [];
    if (step === 1) fields = ["name", "username"];
    if (step === 2)
      fields = [
        "location.country",
        "location.state",
        "location.district",
        "location.pincode",
      ];

    const isValid = await trigger(fields);
    if (isValid) setStep((s) => s + 1);
  };

  const onSubmit = async (data: OnboardingData) => {
    if (step !== 3) return;
    await updateProfile({ ...data, onboardingComplete: true });
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse delay-700" />

      <div className="w-full max-w-xl relative z-10">
        {/* 1. PROGRESS BAR */}
        <div className="flex justify-between mb-12 relative px-2">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-900 -translate-y-1/2 z-0" />
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "relative z-10 size-10 rounded-2xl flex items-center justify-center font-bold transition-all duration-300 border-2",
                step >= s
                  ? "bg-emerald-500 border-emerald-400 text-zinc-950 scale-110 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  : "bg-zinc-950 border-zinc-800 text-zinc-500"
              )}
            >
              {step > s ? <CheckCircle2 className="size-5" /> : s}
            </div>
          ))}
        </div>

        {/* 2. STEP CONTENT */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 min-h-[400px]"
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        >
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-4xl font-black italic uppercase tracking-tighter flex items-center gap-3 leading-tight">
                  Welcome Friend!{" "}
                  <Sparkles className="text-emerald-500 animate-bounce" />
                </h2>
                <p className="text-zinc-500 font-medium italic">
                  What should we call you?
                </p>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                    Display Name
                  </Label>
                  <Input
                    {...register("name")}
                    placeholder="John Doe"
                    className="h-14 bg-zinc-900/50 border-zinc-800 rounded-2xl text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                    Cool Username
                  </Label>
                  <Input
                    {...register("username")}
                    placeholder="eco_warrior"
                    className="h-14 bg-zinc-900/50 border-zinc-800 rounded-2xl text-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-tight">
                  Your Home Base
                </h2>
                <p className="text-zinc-500 font-medium italic">
                  Where are you making an impact?
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-[10px] uppercase text-zinc-500 font-bold">
                    Country
                  </Label>
                  <select
                    {...register("location.country")}
                    className="w-full h-12 bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 text-white"
                  >
                    {countries.map((c) => (
                      <option key={c.isoCode} value={c.isoCode}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] uppercase text-zinc-500 font-bold">
                    State
                  </Label>
                  <select
                    {...register("location.state")}
                    className="w-full h-12 bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 text-white"
                  >
                    <option value="">Select State</option>
                    {states.map((s) => (
                      <option key={s.isoCode} value={s.isoCode}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] uppercase text-zinc-500 font-bold">
                    District
                  </Label>
                  <select
                    {...register("location.district")}
                    className="w-full h-12 bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 text-white"
                  >
                    <option value="">Select District</option>
                    {cities.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] uppercase text-zinc-500 font-bold">
                    Pin Code
                  </Label>
                  <Input
                    {...register("location.pincode")}
                    placeholder="6 digits"
                    className="h-12 bg-zinc-900/50 border-zinc-800 rounded-xl"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-4xl font-black italic uppercase tracking-tighter text-blue-400 leading-tight">
                  Final Touch!
                </h2>
                <p className="text-zinc-500 font-medium italic">
                  Tell us about your home life.
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-zinc-900/30 p-6 rounded-[2rem] border border-zinc-900 flex items-center gap-6">
                  <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500">
                    <Users className="size-6" />
                  </div>
                  <div className="flex-1">
                    <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      Family Members
                    </Label>
                    <Input
                      type="number"
                      {...register("householdSize", { valueAsNumber: true })}
                      className="bg-transparent border-0 border-b border-zinc-800 text-3xl font-black text-white outline-none"
                    />
                  </div>
                </div>
                <div className="bg-zinc-900/30 p-6 rounded-[2rem] border border-zinc-900 flex items-center gap-6">
                  <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500">
                    <Home className="size-6" />
                  </div>
                  <div className="flex-1">
                    <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      Home Size (m²)
                    </Label>
                    <Input
                      type="number"
                      {...register("home_size_sqm", { valueAsNumber: true })}
                      className="bg-transparent border-0 border-b border-zinc-800 text-3xl font-black text-white outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. FOOTER BUTTONS - THE ONLY BUTTONS */}
          <div className="pt-8 flex gap-4">
            {step > 1 && (
              <Button
                key="back-btn"
                type="button"
                variant="ghost"
                onClick={() => setStep((s) => s - 1)}
                className="h-14 px-8 text-zinc-500 font-bold uppercase tracking-widest hover:text-white"
              >
                Back
              </Button>
            )}

            {step < 3 ? (
              <Button
                key="next-btn"
                type="button"
                onClick={nextStep}
                className="h-14 flex-1 bg-white text-zinc-950 hover:bg-emerald-500 hover:text-white font-black uppercase tracking-widest rounded-2xl transition-all"
              >
                Next Step <ArrowRight className="ml-2 size-4" />
              </Button>
            ) : (
              <Button
                key="submit-btn"
                disabled={isUserLoading}
                type="submit"
                className="h-14 flex-1 bg-emerald-600 text-zinc-950 hover:bg-emerald-500 font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-emerald-900/20"
              >
                {isUserLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Blast Off! 🚀"
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
