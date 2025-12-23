"use client";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { LucideIcon } from "lucide-react";

interface FormInputProps {
  control: any;
  name: string;
  label: string;
  icon: LucideIcon;
  iconColor?: string;
  placeholder?: string;
  unit?: string;
  description?: string;
  prefix?: string;
}

export const FormInput = ({
  control,
  name,
  label,
  icon: Icon,
  iconColor,
  placeholder,
  unit,
  description,
  prefix,
}: FormInputProps) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <Field data-invalid={fieldState.invalid}>
        <FieldLabel className="text-gray-200 flex items-center gap-2">
          <Icon className={`w-4 h-4 ${iconColor}`} />
          {label}
        </FieldLabel>
        <FieldContent>
          <div className="relative">
            {prefix && (
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                {prefix}
              </span>
            )}
            <Input
              type="number"
              placeholder={placeholder}
              className={`bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:ring-emerald-500/20 ${
                prefix ? "pl-8" : ""
              } ${unit ? "pr-12" : ""}`}
              {...field}
            />
            {unit && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                {unit}
              </span>
            )}
          </div>
        </FieldContent>
        {description && (
          <FieldDescription className="text-gray-500">
            {description}
          </FieldDescription>
        )}
        <FieldError errors={[fieldState.error]} />
      </Field>
    )}
  />
);
