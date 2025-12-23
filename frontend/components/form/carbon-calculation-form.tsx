"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  CheckCircle2,
  Home,
  Car,
  ShoppingBag,
  Trash2,
  Zap,
  Fuel,
  Recycle,
  TrainFront,
  PlaneTakeoff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { FormInput } from "./FormInput";
import { ReviewCard, ReviewCardProps } from "./ReviewCard";
import { FieldGroup } from "../ui/field";
import z from "zod";
import { useFootprintStore } from "@/state/useFootprintStore";
import { FootprintResultView } from "../dashboard/FootprintResultView";
import { FormStepper } from "./FormStepper";
import { carbonCalculationSteps } from "@/lib/constant";
import { useFootprintApi } from "@/hooks/useFootprintApi";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const requiredNumberInput = z.coerce.number().min(0, "Must be 0 or greater");

const formSchema = z.object({
  activityData: z.object({
      energy: z
        .object({
          electricity_kwh: requiredNumberInput,
          natural_gas_kwh: requiredNumberInput,
          home_size_sqm: z.coerce
            .number()
            .int()
            .min(1, "Must be at least 1 m²"),
        })
        ,
      transport: z
        .object({
          car_km_petrol: requiredNumberInput,
          car_km_diesel: requiredNumberInput,
          public_bus_km: requiredNumberInput,
          flight_km_short: requiredNumberInput,
        })
        ,
      consumption: z
        .object({
          food_veg_spend_currency: requiredNumberInput,
          food_meat_spend_currency: requiredNumberInput,
          clothing_spend_currency: requiredNumberInput,
        }),
      waste: z
        .object({
          waste_landfilled_kg: requiredNumberInput,
          waste_recycled_kg: requiredNumberInput,
        }),
    }),
});

export type IEcoTrackFormValue = z.infer<typeof formSchema>;

export function CarbonCalculationForm() {
  const { createCarbonFootprintApi,refreshDashboard } = useFootprintApi();
  const [currentStep, setCurrentStep] = useState(1);
  const { setLastResult, lastResult } = useFootprintStore();

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      activityData: {
        energy: { electricity_kwh: 0, natural_gas_kwh: 0, home_size_sqm: 1 },
        transport: {
          car_km_petrol: 0,
          car_km_diesel: 0,
          public_bus_km: 0,
          flight_km_short: 0,
        },
        consumption: {
          food_veg_spend_currency: 0,
          food_meat_spend_currency: 0,
          clothing_spend_currency: 0,
        },
        waste: { waste_landfilled_kg: 0, waste_recycled_kg: 0 },
      },
    },
  });

  const formData = useWatch({
    control:form.control,
    defaultValue: form.getValues() as IEcoTrackFormValue,
  })

  const handleNext = async () => {
    const fieldsByStep = [
      ["activityData.energy"],
      ["activityData.transport"],
      ["activityData.consumption"],
      ["activityData.waste"],
    ];

    if (currentStep <= 4) {
      const isValid = await form.trigger(fieldsByStep[currentStep - 1] as any);
      if (isValid) setCurrentStep((prev) => prev + 1);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

const reviewConfig: ReviewCardProps[] = [
  {
    title: "Home Energy",
    icon: Home,
    colorClass: "text-amber-400",
    gradientFrom: "from-amber-500/10",
    items: [
      {
        label: "Electricity",
        // The () around the whole thing is the key
        value: (formData?.activityData?.energy?.electricity_kwh ?? 0) as number,
        unit: "kWh",
      },
      {
        label: "Gas",
        value: (formData?.activityData?.energy?.natural_gas_kwh ?? 0) as number,
        unit: "kWh",
      },
      {
        label: "Home Size",
        value: (formData?.activityData?.energy?.home_size_sqm ?? 1) as number,
        unit: "m²",
      },
    ],
  },
  {
    title: "Transport",
    icon: Car,
    colorClass: "text-sky-400",
    gradientFrom: "from-sky-500/10",
    items: [
      {
        label: "Petrol Car",
        value: (formData?.activityData?.transport?.car_km_petrol ??
          0) as number,
        unit: "km",
      },
      {
        label: "Public Bus",
        value: (formData?.activityData?.transport?.public_bus_km ??
          0) as number,
        unit: "km",
      },
      {
        label: "Short Flights",
        value: (formData?.activityData?.transport?.flight_km_short ??
          0) as number,
        unit: "km",
      },
    ],
  },
  {
    title: "Consumption",
    icon: ShoppingBag,
    colorClass: "text-purple-400",
    gradientFrom: "from-purple-500/10",
    items: [
      {
        label: "Veg Spending",
        value: (formData?.activityData?.consumption?.food_veg_spend_currency ??
          0) as number,
        unit: "₹",
      },
      {
        label: "Clothing",
        value: (formData?.activityData?.consumption?.clothing_spend_currency ??
          0) as number,
        unit: "₹",
      },
    ],
  },
  {
    title: "Waste Management",
    icon: Trash2,
    colorClass: "text-emerald-400",
    gradientFrom: "from-emerald-500/10",
    items: [
      {
        label: "Landfill",
        value: (formData?.activityData?.waste?.waste_landfilled_kg ??
          0) as number,
        unit: "kg",
      },
      {
        label: "Recycled",
        value: (formData?.activityData?.waste?.waste_recycled_kg ??
          0) as number,
        unit: "kg",
      },
    ],
  },
];

  const handleSubmit = async (data: IEcoTrackFormValue) => {
    try {
      const result = await createCarbonFootprintApi(data.activityData);
      if (result?.success) {
        setLastResult(result.data ?? null);
        refreshDashboard();
        form.reset();
        setCurrentStep(1);
        toast.success("Calculation complete. Data synchronized.");
      } else {
        toast.error(result?.message || "Engine failure");
      }
    } catch (error) {
      toast.error("An error occurred during calculation");
    }
  };

  if (lastResult) return <FootprintResultView data={lastResult} />;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Visual Progress Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] font-black">
            Input_Telemetry_Session
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
          Carbon <span className="text-emerald-500">Calculator</span>
        </h1>
      </div>

      <FormStepper currentStep={currentStep} steps={carbonCalculationSteps} />

      <Card className="bg-zinc-950 border-zinc-900 rounded-[2rem] overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Zap className="size-32 text-emerald-500" />
        </div>

        <CardHeader className="p-8 border-b border-zinc-900 bg-zinc-900/40 relative z-10">
          <CardTitle className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">
            {carbonCalculationSteps[currentStep - 1]?.title || "Final Manifest"}
          </CardTitle>
          <CardDescription className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mt-2 leading-relaxed">
            {"//"}{" "}
            {carbonCalculationSteps[currentStep - 1]?.description ||
              "Verify all parameters before commitment."}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8">
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FieldGroup>
              {/* Step 1: Energy */}
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-4 duration-500">
                  <FormInput
                    control={form.control}
                    name="activityData.energy.electricity_kwh"
                    label="Power Usage"
                    icon={Zap}
                    iconColor="text-emerald-400"
                    unit="kWh"
                    description="Monthly electrical grid draw"
                  />
                  <FormInput
                    control={form.control}
                    name="activityData.energy.natural_gas_kwh"
                    label="Natural Gas"
                    icon={Fuel}
                    iconColor="text-blue-400"
                    unit="kWh"
                    description="Heating/Cooking fuel intake"
                  />
                  <FormInput
                    control={form.control}
                    name="activityData.energy.home_size_sqm"
                    label="Asset Area"
                    icon={Home}
                    iconColor="text-amber-400"
                    unit="m²"
                    description="Total structure footprint"
                  />
                </div>
              )}

              {/* Step 2: Transport */}
              {currentStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-4 duration-500">
                  <FormInput
                    control={form.control}
                    name="activityData.transport.car_km_petrol"
                    label="Gasoline_Vehicle"
                    icon={Car}
                    iconColor="text-red-400"
                    unit="km"
                  />
                  <FormInput
                    control={form.control}
                    name="activityData.transport.car_km_diesel"
                    label="Diesel_Vehicle"
                    icon={Car}
                    iconColor="text-orange-400"
                    unit="km"
                  />
                  <FormInput
                    control={form.control}
                    name="activityData.transport.public_bus_km"
                    label="Bus_Transit"
                    icon={TrainFront}
                    iconColor="text-emerald-400"
                    unit="km"
                  />
                  <FormInput
                    control={form.control}
                    name="activityData.transport.flight_km_short"
                    label="Short_Haul_Air"
                    icon={PlaneTakeoff}
                    iconColor="text-sky-400"
                    unit="km"
                  />
                </div>
              )}

              {/* Step 3: Consumption */}
              {currentStep === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-4 duration-500">
                  <FormInput
                    control={form.control}
                    name="activityData.consumption.food_veg_spend_currency"
                    label="Plant_Based"
                    icon={ShoppingBag}
                    iconColor="text-emerald-400"
                    unit="₹"
                  />
                  <FormInput
                    control={form.control}
                    name="activityData.consumption.food_meat_spend_currency"
                    label="Meat_Dairy"
                    icon={ShoppingBag}
                    iconColor="text-red-400"
                    unit="₹"
                  />
                  <FormInput
                    control={form.control}
                    name="activityData.consumption.clothing_spend_currency"
                    label="Textiles"
                    icon={ShoppingBag}
                    iconColor="text-purple-400"
                    unit="₹"
                  />
                </div>
              )}

              {/* Step 4: Waste */}
              {currentStep === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-4 duration-500">
                  <FormInput
                    control={form.control}
                    name="activityData.waste.waste_landfilled_kg"
                    label="Landfill_Output"
                    icon={Trash2}
                    iconColor="text-zinc-500"
                    unit="kg"
                  />
                  <FormInput
                    control={form.control}
                    name="activityData.waste.waste_recycled_kg"
                    label="Recycled_Volume"
                    icon={Recycle}
                    iconColor="text-emerald-500"
                    unit="kg"
                  />
                </div>
              )}

              {/* Step 5: Review - Hardware Manifest Look */}
              {currentStep === 5 && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700">
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-start gap-3">
                    <ShieldCheck className="size-4 text-emerald-500 mt-0.5 shrink-0" />
                    <p className="text-[10px] font-mono text-zinc-500 uppercase leading-relaxed">
                      Security Check: All nodes ready for processing. Review
                      your calculated telemetry before committing to the global
                      registry.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reviewConfig.map((card, index) => (
                      <ReviewCard key={index} {...card} />
                    ))}
                  </div>
                </div>
              )}

              {/* NAVIGATION FOOTER */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-zinc-900 mt-4">
                <Button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  disabled={currentStep === 1}
                  variant="ghost"
                  className="text-zinc-500 hover:text-black font-mono text-[10px] uppercase tracking-widest order-2 sm:order-1"
                >
                  <ArrowLeft className="mr-2 size-3" /> Previous_Sector
                </Button>

                <div className="order-1 sm:order-2">
                  {currentStep < 5 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-black px-8 h-12 rounded-xl uppercase italic tracking-widest transition-all"
                    >
                      Next_Sector <ArrowRight className="ml-2 size-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-black px-10 h-12 rounded-xl uppercase italic tracking-widest transition-all shadow-xl shadow-emerald-900/20"
                    >
                      {form.formState.isSubmitting ? (
                        <Loader2 className="animate-spin mr-2" />
                      ) : (
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                      )}
                      Commit_Calculation
                    </Button>
                  )}
                </div>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
