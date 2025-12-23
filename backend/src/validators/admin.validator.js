// /validators/admin.validator.js

import { z } from "zod";

// --- Schema for Filtering Aggregated Footprints ---
/**
 * @schema adminFootprintsQuerySchema
 * @description Validates the query parameters used by the Admin to filter and search footprint logs.
 * This schema maps to the potential filters discussed in Phase 4.
 */
export const adminFootprintsQuerySchema = z
  .object({
    // Query parameters are always strings initially, so we use .transform or .pipe

    // 1. Search by User Identifier
    // Allows searching by partial username or email
    search: z
      .string()
      .trim()
      .optional()
      .describe("Search term for username or email."),

    // 2. Filter by Region
    region: z
      .string()
      .trim()
      .optional()
      .describe("Filter logs by user region."),

    // 3. Filter by Home Size (sqm) - Minimum
    // Must be a positive integer
    min_home_size_sqm: z
      .string()
      .optional()
      .transform((val) => {
        const num = Number(val);
        // Only include if it's a valid, positive number
        return !isNaN(num) && num > 0 ? num : undefined;
      })
      .pipe(z.number().optional())
      .describe("Minimum home size in square meters."),

    // 4. Filter by Total CO2e - Minimum
    // Used to find users with high/low emissions
    min_co2e: z
      .string()
      .optional()
      .transform((val) => {
        const num = Number(val);
        // Only include if it's a valid, non-negative number
        return !isNaN(num) && num >= 0 ? num : undefined;
      })
      .pipe(z.number().optional())
      .describe("Minimum total CO2e (kg) value."),

    // 5. Filter by Total CO2e - Maximum
    max_co2e: z
      .string()
      .optional()
      .transform((val) => {
        const num = Number(val);
        return !isNaN(num) && num >= 0 ? num : undefined;
      })
      .pipe(z.number().optional())
      .describe("Maximum total CO2e (kg) value."),

    // 6. Pagination (Optional, for large datasets)
    page: z
      .string()
      .optional()
      .transform((val) => {
        const num = Number(val);
        return !isNaN(num) && num >= 1 ? num : 1;
      })
      .pipe(z.number().int().optional())
      .describe("Current page number."),

    limit: z
      .string()
      .optional()
      .transform((val) => {
        const num = Number(val);
        return !isNaN(num) && num >= 1 ? num : 10;
      })
      .pipe(z.number().int().optional())
      .describe("Results per page."),
  })
  .strict("Query parameters contain an unknown key."); // Prevent unexpected query injection

// --- Schema for User ID Validation ---
/**
 * @schema adminUserIdSchema
 * @description Validates the user ID parameter in the URL for validation and management actions.
 */
export const adminUserIdSchema = z
  .object({
    // Assumes MongoDB ObjectId format, which is a 24-character hex string
    userId: z
      .string()
      .length(24, "Invalid User ID format. Must be a 24-character hex string."),
  })
  .strict("URL parameters contain an unknown key.");
