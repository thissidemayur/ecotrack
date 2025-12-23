// This router handles the complex data querying required for the Admin Dashboard.
import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import { hasRole } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { 
    adminFootprintsQuerySchema,
    adminUserIdSchema 
} from "../validators/admin.validator.js"; 

// Import Controllers
import {
  getGlobalSummary,
  getAggregatedFootprints,
  validateUserAccount,
} from "../controllers/admin.controller.js";
import { USER_ROLES } from "../constants/index.js";

const adminRouter = Router();

// Ensure all admin routes are protected and restricted to ADMIN role
adminRouter.use(isAuth, hasRole([USER_ROLES.ADMIN]));

// --- ADMIN Endpoints ---

// GET: /api/v1/admin/summary
// ----------------------------------------------------
// Retrieves key metrics for the dashboard (e.g., Total Users, Global Avg Footprint,
// Top 10 High/Low Footprints, often using Redis cache for performance).
adminRouter.get("/summary", asyncHandler(getGlobalSummary));

// GET: /api/v1/admin/footprints?filter=...
// ----------------------------------------------------
// Retrieves FootprintLogs aggregated or filtered based on query parameters
// (e.g., by region, home size, energy consumption).
// GET: /api/v1/admin/footprints?filter=...
adminRouter.get(
  "/footprints",
  validate({query: adminFootprintsQuerySchema}), // Apply validation to query parameters
  asyncHandler(getAggregatedFootprints)
);

// POST: /api/v1/admin/users/:userId/validate
// ----------------------------------------------------
// Endpoint to validate a user account (if user validation is a feature).
adminRouter.post("/users/:userId/validate", 
  validate({params: adminUserIdSchema}),
   asyncHandler(validateUserAccount));

export { adminRouter };
