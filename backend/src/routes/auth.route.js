import { Router } from "express";
import { authRateLimiter } from "../middlewares/rateLimiter.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import {
  userLoginSchema,
  userRegisterSchema,
  verifyOTPSchema,
  verifyEmailSchema,
} from "../validators/auth.validator.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import {
  loginUser,
  logoutUser,
  refreshTokens,
  registerUser,
  verifyEmail,
  verifyLoginOTP,
} from "../controllers/auth.controller.js";
import { noCache } from "../middlewares/security.middleware.js";

const authRouter = Router();

authRouter.use(noCache);

// Register & Login
authRouter.post(
  "/register",
  authRateLimiter,
  validate(userRegisterSchema),
  asyncHandler(registerUser)
);

authRouter.post(
  "/login",
  authRateLimiter,
  validate(userLoginSchema),
  asyncHandler(loginUser)
);

// --- New Validated Verification Routes ---

// Verify OTP (Check body for email and otp)
authRouter.post(
  "/verify-otp",
  authRateLimiter,
  validate(verifyOTPSchema),
  asyncHandler(verifyLoginOTP)
);


// Session Management
authRouter.post("/refresh", asyncHandler(refreshTokens));
authRouter.post("/logout", asyncHandler(logoutUser));

// Verify Email (Check params for :token)
authRouter.post(
  "/verify-email/:token",
  validate(verifyEmailSchema), // middleware checks schemas.params automatically
  asyncHandler(verifyEmail)
);


export { authRouter };
