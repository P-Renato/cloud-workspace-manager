"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const env_1 = require("./config/env");
const morgan_1 = __importDefault(require("morgan"));
const testDatabase_1 = require("./config/testDatabase");
const workspaceRoutes_1 = __importDefault(require("./routes/workspaceRoutes"));
const workspaceTemplateRoutes_1 = __importDefault(require("./routes/workspaceTemplateRoutes"));
const healthRoutes_1 = __importDefault(require("./routes/healthRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
const http_1 = require("http");
const socketServer_1 = require("./socket/socketServer");
const terminalSocket_1 = require("./socket/terminalSocket");
const prometheus_1 = require("./config/prometheus");
const metrics_1 = require("./middleware/metrics");
dotenv_1.default.config({
    path: process.env.NODE_ENV === "production"
        ? ".env.production"
        : ".env",
});
const app = (0, express_1.default)();
console.log("========== MY SERVER STARTED ==========");
const server = (0, http_1.createServer)(app);
const io = (0, socketServer_1.initializeSocket)(server);
(0, terminalSocket_1.registerTerminalSocket)(io);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(metrics_1.metricsMiddleware);
// Prometheus endpoint, maybe later I will refactor it
app.get("/metrics", async (_req, res) => {
    res.set("Content-Type", prometheus_1.register.contentType);
    res.end(await prometheus_1.register.metrics());
});
app.use("/api", healthRoutes_1.default);
app.use("/api/auth", authRoutes_1.default);
app.use("/api/workspaces", workspaceRoutes_1.default);
app.use("/api/workspace-templates", workspaceTemplateRoutes_1.default);
app.use(errorHandler_1.errorHandler);
(0, testDatabase_1.testDatabaseConnection)();
const PORT = env_1.env.PORT || 3000;
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map