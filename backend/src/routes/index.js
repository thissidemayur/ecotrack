import { Router } from "express";
import { authRouter } from "./auth.route.js";
import { userRouter } from "./user.route.js";
import { footprintRouter } from "./footprint.routes.js";
import { factorRouter } from "./emmisionFactor.route.js";
import { adminRouter } from "./admin.route.js";
const router = Router();

// --- Public / Auth Routes ---
router.use("/auth", authRouter);

router.use("/users", userRouter);

// --- Core Application Routes (User Footprint) ---
router.use("/footprints", footprintRouter);

// --- Admin Analytics Routes ---
router.use("/admin", adminRouter);

// --- Emission Factor Management Routes ---
router.use("/factors", factorRouter);

export default router;
