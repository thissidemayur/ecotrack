import {
  httpRequestCounter,
  httpRequestDurationHistogram,
} from "../config/prometheus.js";

const metricMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000;

    const route = req.route?.path || req.path;

    httpRequestCounter.inc({
      method: req.method,
      route,
      statusCode: res.statusCode,
    });

    httpRequestDurationHistogram.observe(
      {
        method: req.method,
        route,
        statusCode: res.statusCode,
      },
      duration,
    );
  });

  next();
};

export { metricMiddleware };
