import { connectDB } from "./config/mongo.js"
import app from "./app.js"
import { config } from "./config/index.js"
import { connectRedis } from "./config/redis.js"

// 1. connect to mongoDB
connectDB()
connectRedis()

// 2. Start express server
const server = app.listen(config.PORT,config.HOST,()=>{
    console.log(`Server is running in ${config.NODE_ENV} mode on port ${config.PORT}`)
    console.log(`Client URL: ${config.CLIENT_URL}`)
})

// 3.Handle unhandled rejections(eg- DB connectin fails after inital connect)
process.on("unhandledRejection",(err)=>{
    console.error(`Unhabdled Rejection Error: ${err.name} - ${err.message}`)

    // shutdown server and exot the process gracefully
    server.close(()=>{
        process.exit(1)
    })
})

