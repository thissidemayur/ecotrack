import mongoose from "mongoose"
import { config } from "./index.js"
import { MongoDb_DB } from "../constants/index.js";
export const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(config.MONGO_URI, {
          dbName: MongoDb_DB
        });
        console.log(`MongoDB connected: ${conn.connection.host}}`)
    } catch (error) {
        console.error(`MongoDB connection Error: ${error?.message || error}`)
        process.exit(1)
    }
}