// /routes/user.route.js (Updated with Validation)

import { Router } from "express";
import { isAuth } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import {
  getMe,
  changePassword,
  updateProfile,
} from "../controllers/user.controller.js";
import { hasRole } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validation.middleware.js"; // Required import

// Import user-specific schemas
import {
  changePasswordSchema,
  updateProfileSchema,
} from "../validators/user.validator.js";
import { USER_ROLES } from "../constants/index.js";

const userRouter = Router();

// ... (userRouter.use(isAuth, hasRole([hasRole.ROLES.USER])) assumed here)

// GET: /api/v1/users/me
userRouter.get(
  "/me",
  isAuth,
  hasRole([USER_ROLES.USER,USER_ROLES.ADMIN]),
  asyncHandler(getMe)
);

// POST: /api/v1/users/change-password
userRouter.post(
  "/change-password",
  isAuth,
  hasRole([USER_ROLES.USER,USER_ROLES.ADMIN]),
  validate(changePasswordSchema),
  asyncHandler(changePassword)
);

// POST: /api/v1/users/update-profile
userRouter.post(
  "/update-profile",
  isAuth,
  hasRole([USER_ROLES.USER,USER_ROLES.ADMIN]),
  validate(updateProfileSchema),
  asyncHandler(updateProfile)
);

export { userRouter };
