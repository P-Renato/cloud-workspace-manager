"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const healthController_1 = require("../controllers/healthController");
const router = (0, express_1.Router)();
router.get("/whoami", (_req, res) => {
    res.json({
        uid: process.getuid?.(),
        gid: process.getgid?.(),
        groups: process.getgroups?.(),
    });
});
router.get("/health", healthController_1.getHealth);
exports.default = router;
//# sourceMappingURL=healthRoutes.js.map