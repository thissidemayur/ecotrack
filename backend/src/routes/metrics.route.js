import {client} from "../config/prometheus.js"
import { Router } from "express"

const metricsRouter = Router()

metricsRouter.get("/",async (req,res)=>{
    res.set("Content-Type",client.register.contentType)
    const metrics = await client.register.metrics()
    res.send(metrics)
})

export  { metricsRouter };