"use client";

import {
  Zap,
  Car,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Lightbulb,
  CheckCircle,
  Info,
  BookOpen,
  Compass,
  Wind,
  Recycle,
  Utensils,
  SparklesIcon,
  Database,
  Leaf,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function GuidesContent() {
  const guideModules = [
    {
      id: "measure",
      title: "1. Measurement",
      icon: Compass,
      color: "text-blue-400",
      steps: [
        {
          t: "Gather Bills",
          d: "Collect last 3 months of electricity & gas bills.",
        },
        { t: "Check Odometer", d: "Record your vehicle's current mileage." },
        {
          t: "Waste Audit",
          d: "Estimate weekly bags of landfill vs recycling.",
        },
      ],
    },
    {
      id: "analyze",
      title: "2. Analysis",
      icon: Info,
      color: "text-amber-400",
      steps: [
        { t: "Input Data", d: "Enter values into the EcoTrack calculator." },
        { t: "Identify Peaks", d: "Find 'Carbon Hotspots' in your dashboard." },
        { t: "Compare", d: "See how you rank against the global average." },
      ],
    },
    {
      id: "reduce",
      title: "3. Reduction",
      icon: Zap,
      color: "text-emerald-400",
      steps: [
        { t: "Quick Wins", d: "Switch to LEDs and reduce meat intake." },
        { t: "Structural", d: "Improve insulation and use public transit." },
        { t: "Offset", d: "Invest in verified carbon removal projects." },
      ],
    },
  ];

  return (
    <div className="bg-zinc-950 text-zinc-300 min-h-screen pb-24 selection:bg-emerald-500/30">
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -z-10" />
        <div className="max-w-4xl mx-auto space-y-6">
          <Badge
            variant="outline"
            className="border-emerald-500/30 text-emerald-500 bg-emerald-500/5 px-4 py-1"
          >
            <SparklesIcon className="size-3 mr-2 inline" /> Mastery Roadmap
          </Badge>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter italic">
            Carbon <span className="text-emerald-500">Mastery</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Your definitive step-by-step guide to auditing consumption,
            analyzing data, and executing reduction strategies.
          </p>
        </div>
      </section>

      {/* 2. The Roadmap Section */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-zinc-900 -z-10" />
          {guideModules.map((module) => (
            <div key={module.id} className="group space-y-6 bg-zinc-950">
              <div
                className={cn(
                  "size-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center transition-all duration-500 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]",
                  module.color
                )}
              >
                <module.icon className="size-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white uppercase tracking-tighter italic">
                  {module.title}
                </h3>
                <div className="space-y-4">
                  {module.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <CheckCircle className="size-4 text-emerald-500 mt-1 shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-zinc-200">
                          {step.t}
                        </p>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                          {step.d}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Sector Guides (Tabs) */}
      <section className="max-w-5xl mx-auto px-6 space-y-12">
        <div className="flex items-center gap-4 border-b border-zinc-900 pb-4">
          <BookOpen className="size-6 text-emerald-500" />
          <h2 className="text-3xl font-black text-white italic tracking-tighter">
            Sector Guides
          </h2>
        </div>

        <Tabs defaultValue="energy" className="w-full">
          <TabsList className="bg-zinc-900 border border-zinc-800 p-1 rounded-xl mb-8 flex flex-wrap h-auto gap-1">
            <TabsTrigger
              value="energy"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg px-6 py-2 text-sm font-bold text-white"
            >
              Energy
            </TabsTrigger>
            <TabsTrigger
              value="transport"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg px-6 py-2 text-sm font-bold text-white"
            >
              Transport
            </TabsTrigger>
            <TabsTrigger
              value="consumption"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg px-6 py-2 text-sm font-bold text-white"
            >
              Consumption
            </TabsTrigger>
            <TabsTrigger
              value="waste"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg px-6 py-2 text-sm font-bold text-white"
            >
              Waste
            </TabsTrigger>
          </TabsList>

          {/* Energy Tab */}
          <TabsContent value="energy">
            <Card className="bg-zinc-900/50 border-zinc-800 p-8 rounded-[2rem] space-y-6">
              <div className="flex items-center gap-4">
                <div className="size-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                  <Zap className="size-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  The Energy Audit
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-8 text-sm text-zinc-400 leading-relaxed">
                <p>
                  Heating and cooling account for nearly 50% of home energy use.
                  To reduce your footprint, start by insulating your attic and
                  windows. A 1°C decrease in your thermostat can save up to 10%
                  on your energy bill.
                </p>
                <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800">
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                    <Lightbulb className="size-4 text-amber-500" /> Pro Tip
                  </h4>
                  <p className="text-xs italic text-zinc-500">
                    Switching to a heat pump system can reduce your
                    heating-related carbon emissions by up to 70% compared to a
                    gas boiler.
                  </p>
                </div>
              </div>
              {/* New Energy Action Grid */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-800 hover:border-amber-500/30 transition-colors">
                  <p className="text-white font-bold text-xs mb-1">
                    Smart Lighting
                  </p>
                  <p className="text-[10px] text-zinc-500">
                    LEDs use 75% less energy and last 25x longer than
                    traditional bulbs.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-800 hover:border-amber-500/30 transition-colors">
                  <p className="text-white font-bold text-xs mb-1">
                    Phantom Loads
                  </p>
                  <p className="text-[10px] text-zinc-500">
                    Unplugging unused electronics can save up to 10% on your
                    monthly bill.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-800 hover:border-amber-500/30 transition-colors">
                  <p className="text-white font-bold text-xs mb-1">
                    Solar Potential
                  </p>
                  <p className="text-[10px] text-zinc-500">
                    A standard residential solar array can offset 3-4 tons of
                    CO₂ annually.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Transport Tab */}
          <TabsContent value="transport">
            <Card className="bg-zinc-900/50 border-zinc-800 p-8 rounded-[2rem] space-y-6">
              <div className="flex items-center gap-4">
                <div className="size-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                  <Car className="size-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Transportation Logic
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-8 text-sm text-zinc-400 leading-relaxed">
                <p>
                  Transportation accounts for nearly 27% of global greenhouse
                  gas emissions. The most effective way to reduce this is by
                  adopting a &quot;Hierarchy of Mobility&quot;: Walking/Cycling
                  first, followed by Public Transit, and using private internal
                  combustion vehicles only when necessary.
                </p>
                <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800">
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                    <Car className="size-4 text-blue-500" /> Efficiency Metric
                  </h4>
                  <p className="text-xs italic text-zinc-500">
                    Switching from a standard petrol car to an Electric Vehicle
                    (EV) can reduce your transport emissions by up to 50% over
                    the vehicle&apos;s lifecycle, even when accounting for
                    battery production.
                  </p>
                </div>
              </div>
              {/* New Transport Action List */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-800">
                  <p className="text-white font-bold text-xs mb-1">
                    Slow Travel
                  </p>
                  <p className="text-[10px] text-zinc-500">
                    Opt for trains over short-haul flights to reduce trip
                    emissions by 80%.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-800">
                  <p className="text-white font-bold text-xs mb-1">
                    Eco-Driving
                  </p>
                  <p className="text-[10px] text-zinc-500">
                    Smooth acceleration and maintaining 90km/h can improve fuel
                    efficiency by 15%.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-800">
                  <p className="text-white font-bold text-xs mb-1">
                    Carpooling
                  </p>
                  <p className="text-[10px] text-zinc-500">
                    Sharing a commute with just one person halves your work-trip
                    footprint.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Consumption Tab */}
          <TabsContent value="consumption">
            <Card className="bg-zinc-900/50 border-zinc-800 p-8 rounded-[2rem] space-y-6">
              <div className="flex items-center gap-4">
                <div className="size-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500">
                  <Utensils className="size-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Mindful Consumption
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-8 text-sm text-zinc-400 leading-relaxed">
                <p>
                  Every product you buy has an embedded carbon footprint from
                  manufacturing and shipping. Adopting a plant-based diet and
                  choosing long-lasting, sustainable clothing brands can reduce
                  your consumption footprint by 30-50%.
                </p>
                <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800">
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                    <Wind className="size-4 text-purple-500" /> Carbon Fact
                  </h4>
                  <p className="text-xs italic text-zinc-500">
                    A typical vegetarian diet produces roughly half the carbon
                    emissions of a meat-heavy diet annually.
                  </p>
                </div>
              </div>
              {/* New Consumption Strategy Grid */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex gap-4 p-4 rounded-xl bg-zinc-950/50 border border-zinc-800 hover:border-purple-500/30 transition-colors">
                  <div className="p-2 bg-purple-500/10 rounded-lg h-fit text-purple-500">
                    <ShoppingBag className="size-4" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-xs uppercase tracking-tight">
                      Slow Fashion
                    </p>
                    <p className="text-[10px] text-zinc-500 mt-1">
                      Extending the life of a garment by just 9 months reduces
                      its footprint by 30%.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-zinc-950/50 border border-zinc-800 hover:border-purple-500/30 transition-colors">
                  <div className="p-2 bg-emerald-500/10 rounded-lg h-fit text-emerald-500">
                    <Leaf className="size-4" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-xs uppercase tracking-tight">
                      Eat Seasonal
                    </p>
                    <p className="text-[10px] text-zinc-500 mt-1">
                      Buying local, seasonal produce eliminates high-emission
                      air-freight shipping.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Waste Tab */}
          <TabsContent value="waste">
            <Card className="bg-zinc-900/50 border-zinc-800 p-8 rounded-[2rem] space-y-6">
              <div className="flex items-center gap-4">
                <div className="size-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                  <Trash2 className="size-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Waste & Circularity
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-8 text-sm text-zinc-400 leading-relaxed">
                <p>
                  When organic waste ends up in landfills, it decomposes
                  anaerobically and releases methane—a gas 25x more potent than
                  CO2. A circular approach to waste focuses on &quot;The 5
                  Rs&quot;: Refuse, Reduce, Reuse, Repurpose, and finally,
                  Recycle.
                </p>
                <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800">
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                    <Recycle className="size-4 text-emerald-500" /> Circular Tip
                  </h4>
                  <p className="text-xs italic text-zinc-500">
                    Composting your food scraps can reduce your total household
                    waste volume by up to 30%, significantly lowering your
                    indirect methane contribution.
                  </p>
                </div>
              </div>
              {/* New Waste Strategy Grid */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex gap-4 p-4 rounded-xl bg-zinc-950/50 border border-zinc-800">
                  <div className="p-2 bg-emerald-500/10 rounded-lg h-fit text-emerald-500">
                    <Trash2 className="size-4" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-xs uppercase tracking-tight">
                      Zero Waste Shopping
                    </p>
                    <p className="text-[10px] text-zinc-500 mt-1">
                      Choose products with minimal packaging or buy in bulk to
                      eliminate plastic footprints.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-zinc-950/50 border border-zinc-800">
                  <div className="p-2 bg-blue-500/10 rounded-lg h-fit text-blue-500">
                    <Database className="size-4" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-xs uppercase tracking-tight">
                      E-Waste Management
                    </p>
                    <p className="text-[10px] text-zinc-500 mt-1">
                      Recycle electronics at certified centers to recover rare
                      metals and prevent toxic leakage.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* 4. CTA Section */}
      <section className="max-w-5xl mx-auto px-6 mt-20">
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-12 rounded-[3rem] text-center space-y-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight relative z-10">
            Ready for your <br />{" "}
            <span className="text-emerald-500 underline decoration-emerald-500/20 underline-offset-8 italic">
              Baseline Score?
            </span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link
              href="/dashboard/calculate"
              className="h-14 px-10 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl inline-flex items-center transition-all shadow-lg shadow-emerald-900/20"
            >
              Start Calculation <ArrowRight className="ml-2 size-5" />
            </Link>
            <Link
              href="/methodology"
              className="h-14 px-10 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-2xl inline-flex items-center transition-all"
            >
              View Methodology
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

