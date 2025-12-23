// components/form/FormStepper.tsx
import { cn } from "@/lib/utils";
import { CheckCircle2, LucideIcon } from "lucide-react";

interface Step {
  id: number;
  title: string;
  icon: LucideIcon;
  description: string;
}

interface FormStepperProps {
  currentStep: number;
  steps: Step[];
}

export function FormStepper({ currentStep, steps }: FormStepperProps) {
  return (
    <div className="relative w-full px-2 sm:px-4">
      <div className="flex justify-between items-start">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div
              key={step.id}
              className="flex items-center flex-1 last:flex-none"
            >
              <div className="flex flex-col items-center flex-1 relative">
                {/* Step Circle */}
                <div
                  className={cn(
                    "relative w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10",
                    isActive
                      ? "bg-emerald-600 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-110"
                      : isCompleted
                      ? "bg-emerald-900/40 border-emerald-500 text-emerald-400"
                      : "bg-zinc-900 border-zinc-800 text-zinc-600"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 sm:w-7 sm:h-7 animate-in zoom-in duration-300" />
                  ) : (
                    <step.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}

                  {/* Active Pulse Ring */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20" />
                  )}
                </div>

                {/* Step Text Labels */}
                <div className="mt-3 text-center">
                  <span
                    className={cn(
                      "text-[10px] sm:text-sm font-bold block transition-colors duration-300 uppercase tracking-tight sm:tracking-normal",
                      isActive
                        ? "text-emerald-400"
                        : isCompleted
                        ? "text-emerald-600"
                        : "text-zinc-600"
                    )}
                  >
                    {step.title}
                  </span>
                  {/* Hide description on small screens to save space */}
                  <span className="text-[10px] text-zinc-500 mt-1 hidden lg:block max-w-[120px] mx-auto leading-tight">
                    {step.description}
                  </span>
                </div>
              </div>

              {/* Connector Line Logic */}
              {index < steps.length - 1 && (
                <div className="relative flex-1 mx-[-15px] sm:mx-2 mb-10 sm:mb-14 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700 ease-in-out",
                      isCompleted ? "w-full" : "w-0"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
