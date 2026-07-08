"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const env_1 = require("../src/config/env");
const morgan_1 = __importDefault(require("morgan"));
const testDatabase_1 = require("./config/testDatabase");
const workspaceRoutes_1 = __importDefault(require("./routes/workspaceRoutes"));
const healthRoutes_1 = __importDefault(require("./routes/healthRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/api", healthRoutes_1.default);
app.use("/api/auth", authRoutes_1.default);
app.use("/api/workspaces", workspaceRoutes_1.default);
app.use(errorHandler_1.errorHandler);
(0, testDatabase_1.testDatabaseConnection)();
const PORT = env_1.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map