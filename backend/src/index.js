import { connectDB } from "./config/mongo.js";
import app from "./app.js";
import { config } from "./config/index.js";
import { connectRedis } from "./config/redis.js";


const startServer = async () => {
  try {
    await connectDB();
    await connectRedis();

    app.listen(config.PORT, config.HOST, () => {
      console.log(`Server running`);
    });
  } catch (error) {
    console.error("Startup failed:", error);
    process.exit(1);
  }
};

startServer();