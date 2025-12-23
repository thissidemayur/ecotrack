// /validators/user.validator.js
import { z } from "zod";

// Schema for updating user profile details (e.g., username, region)
export const updateProfileSchema = z
  .object({
    // Allows updating the username, but still applies cleaning/validation rules
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(30)
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      )
      .trim()
      .toLowerCase()
      .optional(),

    // The region field (e.g., US-CA, IN-DL)
    region: z.string().max(50, "Region name is too long").optional(),

    // Home size is required for comparison features
    home_size_sqm: z
      .number()
      .int()
      .min(1, "Home size must be positive")
      .optional(),

    // Any other profile fields (e.g., number of household members)
    // household_members: z.number().int().min(1).max(10).optional()
  })
  .strict()
  .partial(); // Use .partial() to allow the user to send only a subset of fields

// Schema for changing the user's password
export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required."),

    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters long")
      .max(128, "Password is too long")
      // Enforce strong password rules
      .regex(/[0-9]/, "New password must contain at least one number")
      .regex(/[A-Z]/, "New password must contain at least one Uppercase letter")
      .regex(
        /[a-z]/,
        "New password must contain at least one Lowercase letter"
      ),

    // Ensures new password is not the same as the old one (can be checked in service too)
  })
  .superRefine((data, ctx) => {
    if (data.oldPassword === data.newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "New password cannot be the same as the current password.",
        path: ["newPassword"],
      });
    }
  });
