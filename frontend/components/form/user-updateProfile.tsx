"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserApi } from "@/hooks/useUserApi";
import { useAuthStore } from "@/state/authStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, User, AtSign, Save, MapPin, Home, Users } from "lucide-react";
import z from "zod";
import { Country, State, City } from "country-state-city";

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Please enter at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  location: z.object({
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    district: z.string().min(1, "District is required"),
    pincode: z.string().length(6, "Pincode must be 6 digits"),
  }),
  home_size_sqm: z.number().min(1, "Must be at least 1"),
  householdSize: z.number().min(1, "Must be at least 1 person"),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export function UpdateProfileForm({ onSuccess }: { onSuccess?: () => void }) {
  const { user } = useAuthStore();
  const { updateProfile, isUserLoading } = useUserApi();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      location: user?.location || { country: "IN", state: "", district: "", pincode: "" },
      home_size_sqm: user?.home_size_sqm || 1,
      householdSize: user?.householdSize || 1,
    },
  });

  const watchedCountry = watch("location.country");
  const watchedState = watch("location.state");

  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(watchedCountry);
  const cities = City.getCitiesOfState(watchedCountry, watchedState);

  const onSubmit = async (data: UpdateProfileInput) => {
    const result = await updateProfile(data);
    if (result.success && onSuccess) onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-h-[70vh] overflow-y-auto px-1 no-scrollbar"
    >
      {/* 1. BASIC INFO */}
      <div className="space-y-4">
        <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
          Personal Info
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-[10px] font-bold text-zinc-500 uppercase flex items-center gap-2">
              <User className="size-3" /> Name
            </Label>
            <Input
              {...register("name")}
              className="bg-zinc-900 border-zinc-800 rounded-xl text-white"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] font-bold text-zinc-500 uppercase flex items-center gap-2">
              <AtSign className="size-3" /> Username
            </Label>
            <Input
              {...register("username")}
              className="bg-zinc-900 border-zinc-800 rounded-xl text-white"
            />
          </div>
        </div>
      </div>

      <hr className="border-zinc-900" />

      {/* 2. LOCATION */}
      <div className="space-y-4">
        <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
          Your Location
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-[10px] font-bold text-zinc-500 uppercase">
              Country
            </Label>
            <select
              {...register("location.country")}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl h-10 px-3 text-sm text-zinc-200"
            >
              {countries.map((c) => (
                <option key={c.isoCode} value={c.isoCode}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] font-bold text-zinc-500 uppercase">
              State
            </Label>
            <select
              {...register("location.state")}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl h-10 px-3 text-sm text-zinc-200"
            >
              <option value="">Pick State</option>
              {states.map((s) => (
                <option key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] font-bold text-zinc-500 uppercase">
              District
            </Label>
            <select
              {...register("location.district")}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl h-10 px-3 text-sm text-zinc-200"
            >
              <option value="">Pick District</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] font-bold text-zinc-500 uppercase">
              Pin Code
            </Label>
            <Input
              {...register("location.pincode")}
              className="bg-zinc-900 border-zinc-800 rounded-xl text-white"
            />
          </div>
        </div>
      </div>

      <hr className="border-zinc-900" />

      {/* 3. HOUSEHOLD DETAILS */}
      <div className="space-y-4">
        <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
          Home & Family
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-[10px] font-bold text-zinc-500 uppercase flex items-center gap-2">
              <Home className="size-3" /> House Size (sqm)
            </Label>
            <Input
              type="number"
              {...register("home_size_sqm", { valueAsNumber: true })}
              className="bg-zinc-900 border-zinc-800 rounded-xl text-white"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] font-bold text-zinc-500 uppercase flex items-center gap-2">
              <Users className="size-3" /> Family Members
            </Label>
            <Input
              type="number"
              placeholder="How many people live with you?"
              {...register("householdSize", { valueAsNumber: true })}
              className="bg-zinc-900 border-zinc-800 rounded-xl text-white"
            />
          </div>
        </div>
      </div>

      <Button
        disabled={isUserLoading}
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-black rounded-xl h-12 uppercase tracking-widest transition-all"
      >
        {isUserLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Save My Profile"
        )}
      </Button>
    </form>
  );
}