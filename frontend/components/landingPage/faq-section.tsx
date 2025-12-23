"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircleQuestion, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const faqs = [
  {
    question: "How precise are the calculation engines?",
    answer:
      "EcoTrack utilizes high-fidelity emission factors sourced from the IPCC, EPA, and DEFRA. By mapping region-specific grid intensities, we provide the most statistically significant estimate possible for household telemetry.",
  },
  {
    question: "Which data points are required for analysis?",
    answer:
      "The engine processes metrics across four primary sectors: energy (kWh/Therms), transport (Mileage/Fuel), waste (Mass/Composition), and consumption (Categorical Spending). Granular data leads to higher confidence intervals.",
  },
  {
    question: "How is my environmental data secured?",
    answer:
      "We implement a zero-party data protocol. Your records are encrypted at rest and in transit. EcoTrack does not monetize individual user data; our platform is built on transparency and scientific integrity.",
  },
  {
    question: "Is there support for multi-property tracking?",
    answer:
      "Version 1.0 is optimized for single-household telemetry. However, our architecture supports historical snapshotting, allowing you to model different scenarios or properties as separate calculation cycles.",
  },
];

export function FaqSection() {
  return (
    <section className="py-24 bg-zinc-950 px-6 relative">
      <div className="container mx-auto max-w-4xl">
        {/* Header with Technical Badge */}
        <div className="text-center mb-16 space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-emerald-500 shadow-xl shadow-emerald-500/5">
              <MessageCircleQuestion className="size-6" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
            System <span className="text-emerald-500">Inquiry</span>
          </h2>
          <p className="text-zinc-500 max-w-lg mx-auto font-medium">
            Common technical queries regarding the EcoTrack calculation engine
            and data governance.
          </p>
        </div>

        {/* Accordion with Modern Glass Styling */}
        <div className="relative z-10">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="group border border-zinc-900 bg-zinc-900/30 rounded-[2rem] px-8 transition-all duration-300 data-[state=open]:border-emerald-500/30 data-[state=open]:bg-zinc-900/60"
              >
                <AccordionTrigger className="py-6 text-left text-zinc-200 hover:text-emerald-500 transition-colors hover:no-underline font-bold tracking-tight text-lg group-data-[state=open]:text-emerald-400">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-zinc-500 leading-relaxed italic text-sm border-t border-zinc-800/50 pt-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA for more questions */}
        <div className="mt-12 text-center">
          <p className="text-zinc-600 text-xs font-mono uppercase tracking-[0.2em] mb-4">
            Still have unresolved queries?
          </p>
          <Button
            asChild
            variant="outline"
            className="border-zinc-800 bg-zinc-900/50 text-white hover:bg-zinc-800 hover:text-emerald-500 transition-colors hover:underline rounded-xl px-6 group"
          >
            <Link href="/faq" className="flex items-center gap-2">
              Access Full Knowledge Base{" "}
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 size-64 bg-emerald-500/5 blur-[100px] pointer-events-none rounded-full" />
    </section>
  );
}
