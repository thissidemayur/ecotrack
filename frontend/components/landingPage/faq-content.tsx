"use client";

import { useState } from "react";
import {
  Search,
  HelpCircle,
  MessageSquare,
  Shield,
  Zap,
  Rocket,
  LifeBuoy,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const faqData = [
  {
    category: "Account & Security",
    icon: Shield,
    color: "text-blue-400",
    questions: [
      {
        q: "How secure is my data?",
        a: "Your data security is our top priority. All personal information is encrypted using industry-standard SSL/TLS protocols. We never share your data with third parties, and you have full control to export or delete your data at any time.",
      },
      {
        q: "Is my email address public?",
        a: "No, your email address is private and never displayed on the platform. Only platform administrators can view email addresses for account support purposes.",
      },
      {
        q: "Can I delete my account?",
        a: "Yes, you can delete your account at any time from your profile settings. This permanently removes all personal data and calculation history from our servers.",
      },
    ],
  },
  {
    category: "Data & Calculation",
    icon: Zap,
    color: "text-emerald-400",
    questions: [
      {
        q: "How often should I log my footprint?",
        a: "We recommend logging monthly to track meaningful trends. However, you can log as frequently as you like—weekly logs provide granular insights, while quarterly logs work for stable consumption.",
      },
      {
        q: "Where do I find my electricity kWh usage?",
        a: "Your kWh usage is typically found on your monthly utility bill under 'Usage' or 'Total kWh'. You can also find this in your utility provider's online portal.",
      },
      {
        q: "Can I edit past calculations?",
        a: "Yes, you can edit or delete any past calculations from your History page to correct data entry errors.",
      },
    ],
  },
  {
    category: "Getting Started",
    icon: Rocket,
    color: "text-purple-400",
    questions: [
      {
        q: "Do I need to pay to use EcoTrack?",
        a: "No, EcoTrack is completely free. Built as a student project, our mission is to make carbon tracking accessible to everyone with no hidden fees.",
      },
      {
        q: "Can I use EcoTrack on my mobile?",
        a: "Yes! EcoTrack is a fully responsive web application that works seamlessly on any modern smartphone or tablet browser.",
      },
    ],
  },
];

export function FaqContent() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (item) =>
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <div className="bg-zinc-950 text-zinc-300 min-h-screen pb-20">
      {/* 1. Header Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <Badge
            variant="outline"
            className="border-emerald-500/30 text-emerald-500 bg-emerald-500/5"
          >
            Support Center
          </Badge>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter italic">
            How can we{" "}
            <span className="text-emerald-500 underline decoration-emerald-500/30 underline-offset-8">
              help?
            </span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
            Everything you need to know about EcoTrack, data security, and
            tracking your environmental impact.
          </p>

          {/* Dynamic Search Bar */}
          <div className="max-w-xl mx-auto relative pt-8">
            <Search className="absolute left-4 top-[4.2rem] size-5 text-zinc-500" />
            <Input
              placeholder="Search questions (e.g., 'security', 'calculation')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-12 bg-zinc-900/50 border-zinc-800 rounded-2xl text-white focus:ring-emerald-500/20"
            />
          </div>
        </div>
      </section>

      {/* 2. FAQ Accordion Grid */}
      <div className="max-w-4xl mx-auto px-6 space-y-16">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((category, catIdx) => (
            <div
              key={catIdx}
              className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${catIdx * 100}ms` }}
            >
              <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
                <category.icon className={cn("size-6", category.color)} />
                <h2 className="text-2xl font-bold text-white tracking-tight italic">
                  {category.category}
                </h2>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((item, qIdx) => (
                  <AccordionItem
                    key={qIdx}
                    value={`item-${catIdx}-${qIdx}`}
                    className="border border-zinc-900 bg-zinc-900/20 rounded-2xl px-6 transition-all hover:border-zinc-800 data-[state=open]:border-emerald-500/50 data-[state=open]:bg-zinc-900/40"
                  >
                    <AccordionTrigger className="text-left text-white font-bold hover:no-underline hover:text-emerald-500 transition-colors py-6">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-zinc-400 leading-relaxed pb-6">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))
        ) : (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-3xl">
            <HelpCircle className="size-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-500 font-mono">
              NO_RESULTS_FOUND_FOR: &quot;{searchQuery}&quot;
            </p>
          </div>
        )}
      </div>

      {/* 3. Support CTA */}
      <section className="max-w-4xl mx-auto px-6 mt-20">
        <div className="relative group p-8 rounded-[2.5rem] bg-zinc-900/50 border border-zinc-800 text-center space-y-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative z-10 space-y-4">
            <div className="size-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto">
              <MessageSquare className="size-6" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              Still have questions?
            </h3>
            <p className="text-zinc-500 max-w-sm mx-auto">
              If you can&apos;t find your answer here, our team is ready to help
              you with your carbon journey.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@ecotrack.com"
                className="inline-flex items-center justify-center h-12 px-8 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/20"
              >
                Email Support
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center h-12 px-8 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-all"
              >
                Go to Contact
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
