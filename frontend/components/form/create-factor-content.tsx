"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Factory, Leaf, Info, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

// Zod schema matching backend requirements
const createFactorSchema = z.object({
  factorId: z
    .string()
    .min(
      3,
      "Factor ID must be at least 3 characters (e.g., electricity_grid_us)"
    ),
  category: z
    .enum(["energy", "transport", "consumption", "waste", "other"])
    .nullable()
    .refine((val) => val !== null, {
      message: "Please select a category",
    }),
  unit: z.string().min(1, "Unit is required (e.g., 'kWh', 'km', 'kg')"),
  value: z.coerce
    .number()
    .describe("Positive for emissions, negative for credits/savings"),
  source: z.string().min(5, "Source documentation is required"),
  version: z.string().min(1, "Version string is required (e.g., v1.0.2024)"),
  region: z.string().optional(),
});

type CreateFactorFormValues = z.infer<typeof createFactorSchema>;

export function CreateFactorContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(createFactorSchema),
    defaultValues: {
      factorId: "",
      category: undefined,
      unit: "",
      value: undefined,
      source: "",
      version: "",
      region: "",
    },
  });

  const watchedValues = form.watch();

  const onSubmit = async (data: CreateFactorFormValues) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Creating emission factor:", data);

    toast.success("Emission factor created successfully!");

    setIsLoading(false);

    // Navigate back to factors list
    router.push("/admin/factors");
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Create Emission Factor
          </h1>
          <p className="text-zinc-400">
            Add a new emission factor to the database
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-8 shadow-2xl">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Factor ID */}
                  <FormField
                    control={form.control}
                    name="factorId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-200 flex items-center gap-2">
                          Factor ID <span className="text-red-500">*</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-zinc-500 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  Use snake_case for consistency (e.g.,
                                  electricity_grid_us)
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="electricity_grid_us"
                            className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-zinc-500">
                          Unique identifier for this emission factor
                        </FormDescription>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Category & Unit - Side by side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-200">
                            Category <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value as string}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              <SelectItem value="energy">Energy</SelectItem>
                              <SelectItem value="transport">
                                Transport
                              </SelectItem>
                              <SelectItem value="consumption">
                                Consumption
                              </SelectItem>
                              <SelectItem value="waste">Waste</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="unit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-200">
                            Unit <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="kWh, km, kg"
                              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Value */}
                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-200 flex items-center gap-2">
                          Emission Factor Value{" "}
                          <span className="text-red-500">*</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-zinc-500 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  Positive values = emissions produced
                                  <br />
                                  Negative values = emissions saved (e.g.,
                                  recycling -0.15)
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.0001"
                            placeholder="0.92"
                            className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                            {...field}
                            value={field.value as number ?? 0}
                          />
                        </FormControl>
                        <FormDescription className="text-zinc-500">
                          Positive for emissions, negative for savings (decimals
                          supported)
                        </FormDescription>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Region & Version */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="region"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-200">
                            Region
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Global, US, Europe"
                              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-zinc-500">
                            Optional
                          </FormDescription>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="version"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-200">
                            Version <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="v1.0.2024"
                              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Source */}
                  <FormField
                    control={form.control}
                    name="source"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-200">
                          Source <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="EPA 2023, IEA Emission Factors Database, https://example.com"
                            className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 min-h-24 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-zinc-500">
                          Documentation or URL reference for this factor
                        </FormDescription>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Submit Buttons */}
                  <div className="flex items-center gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6"
                    >
                      {isLoading ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Leaf className="h-4 w-4 mr-2" />
                          Create Emission Factor
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/admin/factors")}
                      className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>

          {/* Right Column - Info & Preview */}
          <div className="lg:col-span-1 space-y-6">
            {/* Info Card */}
            <div className="bg-gradient-to-br from-sky-900/30 to-emerald-900/30 backdrop-blur-xl border border-sky-500/20 rounded-xl p-6 shadow-2xl">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-sky-500/20 rounded-lg">
                  <Factory className="h-5 w-5 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    What is an Emission Factor?
                  </h3>
                </div>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-3">
                An emission factor is a coefficient that quantifies the
                emissions or removals of a greenhouse gas per unit of activity.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                For example, burning 1 kWh of coal-generated electricity might
                produce 0.92 kg CO₂e.
              </p>
              <div className="mt-4 pt-4 border-t border-sky-500/20">
                <p className="text-xs text-zinc-500 italic">
                  💡 Tip: Waste factors are often negative, representing
                  emissions saved through recycling.
                </p>
              </div>
            </div>

            {/* Live Preview */}
            <div className="bg-zinc-900/50 backdrop-blur-xl border border-emerald-500/20 rounded-xl p-6 shadow-2xl sticky top-8">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-semibold text-white">
                  Live JSON Preview
                </h3>
              </div>
              <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800 overflow-x-auto">
                <pre className="text-xs font-mono text-emerald-400">
                  {JSON.stringify(
                    {
                      factorId: watchedValues.factorId || "...",
                      category: watchedValues.category || "...",
                      unit: watchedValues.unit || "...",
                      value:
                        watchedValues.value !== undefined
                          ? watchedValues.value
                          : "...",
                      source: watchedValues.source || "...",
                      version: watchedValues.version || "...",
                      ...(watchedValues.region && {
                        region: watchedValues.region,
                      }),
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
              <p className="text-xs text-zinc-500 mt-3">
                This JSON will be sent to your backend when you submit the form.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
