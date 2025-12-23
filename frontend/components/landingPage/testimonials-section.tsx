"use client";

import { Star, Quote, CheckCircle2, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Environmental Educator",
    quote:
      "EcoTrack’s categorical breakdown identified my primary emission leakage. The precision is unmatched for a free tool.",
    rating: 5,
    tag: "Early Adopter",
  },
  {
    name: "Michael Chen",
    role: "Full Stack Developer",
    quote:
      "The API-first approach to carbon data is brilliant. It handles complex GWP-100 calculations with incredible speed.",
    rating: 5,
    tag: "Beta Review",
  },
  {
    name: "Emily Rodriguez",
    role: "Small Business Owner",
    quote:
      "The historical trend mapping allowed us to optimize our logistics. Essential for any eco-conscious business.",
    rating: 5,
    tag: "Verified Case",
  },
  {
    name: "Dr. Aris Thorne",
    role: "Sustainability Consultant",
    quote:
      "Finally, a platform that uses IPCC standards correctly. The methodology is scientifically sound and transparent.",
    rating: 5,
    tag: "Expert Audit",
  },
  {
    name: "Julian Voss",
    role: "Urban Architect",
    quote:
      "Integrating EcoTrack into my lifestyle planning has been a game changer for estimating residential impact.",
    rating: 5,
    tag: "Beta Tester",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-zinc-950 px-6 relative overflow-hidden">
      {/* Background radial fade for focus */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="text-center mb-20 space-y-4">
          <div className="flex justify-center mb-4">
            <BadgeCheck className="size-10 text-emerald-500/50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
            Verified <span className="text-emerald-500">Endorsements</span>
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto font-medium">
            Early insights from our beta-testing community and environmental
            experts.
          </p>
        </div>

        {/* Masonry-style Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="break-inside-avoid p-8 bg-zinc-900/40 border border-zinc-800 rounded-[2rem] backdrop-blur-sm group hover:border-emerald-500/30 transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-3.5 fill-emerald-500 text-emerald-500"
                    />
                  ))}
                </div>
                <div className="px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-[9px] font-mono text-zinc-500 uppercase tracking-widest group-hover:text-emerald-400 group-hover:border-emerald-500/20 transition-colors">
                  {item.tag}
                </div>
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-2 size-10 text-emerald-500/10 -z-10" />
                <p className="text-zinc-300 mb-8 italic leading-relaxed tracking-tight">
                  {`"${item.quote}"`}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-zinc-800">
                <div className="size-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-emerald-500 text-xs border border-zinc-700">
                  {item.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    {item.name}
                    <CheckCircle2 className="size-3 text-emerald-500" />
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter font-semibold">
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
