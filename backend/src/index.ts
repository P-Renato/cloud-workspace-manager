import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { env } from "./config/env";
import morgan from "morgan";
import { testDatabaseConnection } from "./config/testDatabase";
import workspaceRoutes from "./routes/workspaceRoutes";

import healthRoutes from "./routes/healthRoutes";
import authRoutes from "./routes/authRoutes"
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use(errorHandler)
testDatabaseConnection();

const PORT = env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});