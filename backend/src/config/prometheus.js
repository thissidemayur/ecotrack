import client from "prom-client"

const collectDefaultMetrics=client.collectDefaultMetrics;

collectDefaultMetrics()

const httpRequestCounter = new client.Counter({
  name: "http_request_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "statusCode"],
});


const httpRequestDurationHistogram = new client.Histogram({
    name:"http_request_duration_seconds",
    help:"Duration of HTTP requests in seconds",
    labelNames:["method","route","statusCode"],
    buckets:[0.1,0.5,1,2.5,5,10] // buckets for response time in seconds
})

export {httpRequestCounter,httpRequestDurationHistogram,client}