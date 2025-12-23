import { ZodError } from "zod";
import { ApiError } from "../utils/apiError.utils.js";

export const validate = (schemas) => (req, res, next) => {
  try {
    // 1. Check if schemas is actually provided
    if (!schemas) return next();

    // 2. Case: Single Zod Schema (Default to body)
    // If you pass validate(zodSchema), it has a .parse method
    if (typeof schemas.parse === "function") {
      req.body = schemas.parse(req.body);
      return next();
    }

    // 3. Case: Object with multiple targets { body, query, params }
    const targets = ["body", "query", "params"];

    for (const target of targets) {
      if (schemas[target]) {
        // Validate and re-assign (crucial for type conversion)
        req[target] = schemas[target].parse(req[target]);
      }
    }

    return next();
  } catch (err) {
    // If it's a Zod Validation Error, handle it nicely
    if (err instanceof ZodError) {
      const errors = err.issues?.map(
        (issue) => `${issue.path.join(".")} validation failed: ${issue.message}`
      );

      console.error("Zod Validation Error:", errors);
      return next(new ApiError(400, "Input validation failed", errors));
    }

    // This is what was causing your 500 error!
    // Log the REAL error to the console so you can see why it's crashing.
    console.error("CRITICAL VALIDATION MIDDLEWARE ERROR:", err);

    return next(new ApiError(500, `Internal Validation Error: ${err.message}`));
  }
};
