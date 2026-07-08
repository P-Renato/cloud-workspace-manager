"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealth = void 0;
const getHealth = (_req, res) => {
    res.json({
        status: "OK",
        message: "Cloud Workspace Manager API is running",
        version: "0.1.0",
    });
};
exports.getHealth = getHealth;
//# sourceMappingURL=healthController.js.map