import { z } from "zod";
import { USER_ROLES } from "../constants/index.js";

// Registration & Login (Keep these as you have them)
const userRegisterSchema = z.object({
  email: z.string().email("Invalid email format").trim().toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password is too long")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[A-Z]/, "Password must contain at least one Uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one Lowercase letter"),
  role: z.enum([USER_ROLES.ADMIN, USER_ROLES.USER]).optional(),
});

const userLoginSchema = z.object({
  email: z.string().email("Invalid email format").trim().toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

// --- NEW SCHEMAS ---

// 1. OTP Verification Schema
const verifyOTPSchema = z.object({
  email: z.string().email("Invalid email format").trim().toLowerCase(),
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must only contain numbers"),
});

// 2. Email Token Verification Schema (Validates URL Params)
const verifyEmailSchema = {
  params: z.object({
    token: z.string().min(1, "Verification token is required"),
  }),
};

// 3. Refresh Token Schema (Usually comes from cookies, but validate if sent in body)
const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export {
  userRegisterSchema,
  userLoginSchema,
  verifyOTPSchema,
  verifyEmailSchema,
  refreshTokenSchema,
};
