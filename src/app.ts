import express from "express"
import { config } from "dotenv";
import morgon from "morgan"
import appRouter from "./routes/index.js";
config()
const app = express();
app.use(express.json());
app.use(morgon("dev"));
app.use("/api/v1",appRouter)


export default app;