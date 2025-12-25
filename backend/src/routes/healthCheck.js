import  { Router } from "express";
import mongoose from "mongoose";
import { redisClient } from "../config/redis.js";
// const healthCheckRouter = Router();

// healthCheckRouter.get ("/health", async(req, res) => {


//     try {
//         const dbStatus = mongoose.connection.readyState === 1;
//         const redisStatus = (await redisClient.ping()) === "PONG";

//         if (!dbStatus || !redisStatus) {
//           return res.status(503).json({
//             status: "unhealthy",
//             checks: {
//               mongodb: dbStatus ? "up" : "down",
//               redis: redisStatus ? "up" : "down",
//             },
//           });
//         }

//         res.status(200).json({
//           status: "healthy",
//           checks: {
//             mongodb: "up",
//             redis: "up",
//           },
//         });
//     } catch (error) {
//         console.error("Health check failed:", err);
//         res.status(503).send("Unhealthy");
//     }
 
// })


const healthCheckRouter = Router();

/**
 * @description Shallow health check for AWS ALB.
 * Responds with 200 OK instantly to prove the Node.js process is alive.
 */
healthCheckRouter.get("/health", (req, res) => {
  res.status(200).send("OK");
});

export { healthCheckRouter };
// export { healthCheckRouter };