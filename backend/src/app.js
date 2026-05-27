import express from "express"
import cors from "cors"
import helmet from "helmet"
import {config} from "./config/index.js"
import cookieParser from "cookie-parser"
import { globalRateLimiter } from "./middlewares/rateLimiter.middleware.js"
import { errorHandler } from "./middlewares/errorHandler.controller.js"
import {sanitizedBodyMiddleware } from "./middlewares/InputSanitization.js"
import { securityHeaders } from "./middlewares/security.middleware.js"
// imports for middlewares and routes
import { healthCheckRouter } from "./routes/healthCheck.js"
import router from "./routes/index.js"
import { metricMiddleware } from "./middlewares/metrics.middleware.js"
import { metricsRouter } from "./routes/metrics.route.js";


const app = express()


app.use(helmet())

app.use(
  cors({
    origin: config.CLIENT_URL,
    credentials: true, // allow cookies(Refresh token) to be sent from the client
  })
);

app.use(securityHeaders)

app.use(express.json({limit:"16kb"})) // parse incoming JSON payloads(upto 16kb to prevent DoS attacks)
app.use(express.urlencoded({extended:true, limit:"16kb"})) // parse URL-encoded payloads (often used with HTML forms)
app.use(cookieParser()) // parse cookies from incoming request headers

app.use(globalRateLimiter)
app.use(metricMiddleware)
app.use("/metrics", metricsRouter);

app.use("/api/v1",router)
app.use(healthCheckRouter);

// 6. Error Handling Middlewares
app.use(errorHandler)
export default app