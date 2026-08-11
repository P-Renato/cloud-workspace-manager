import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { env } from "./config/env";
import morgan from "morgan";
import { testDatabaseConnection } from "./config/testDatabase";
import workspaceRoutes from "./routes/workspaceRoutes";
import workspaceTemplateRoutes from "./routes/workspaceTemplateRoutes";
import healthRoutes from "./routes/healthRoutes";
import authRoutes from "./routes/authRoutes"
import { errorHandler } from "./middleware/errorHandler";
import { createServer } from "http";
import { initializeSocket } from "./socket/socketServer";
import { registerTerminalSocket } from "./socket/terminalSocket";
import { register } from "./config/prometheus";
import { metricsMiddleware } from "./middleware/metrics";
import adminMetricsRoutes from "./routes/adminMetricsRoutes";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env",
});

const app = express();
console.log("========== MY SERVER STARTED ==========");
const server = createServer(app);
const io = initializeSocket(server);
registerTerminalSocket(io);

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(metricsMiddleware);

// Prometheus endpoint, maybe later I will refactor it
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);

  res.end(await register.metrics());
});

app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/workspace-templates", workspaceTemplateRoutes);
app.use("/api/admin", adminMetricsRoutes);
app.use(errorHandler)
testDatabaseConnection();

const PORT = env.PORT || 3000;

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});