"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workspaceController_1 = require("../controllers/workspaceController");
const authenticate_1 = require("../middleware/authenticate");
const validate_1 = require("../middleware/validate");
const workspaceSchemas_1 = require("../validators/workspaceSchemas");
const router = (0, express_1.Router)();
// This is saying that all the routes in this router need authentication, so it is not required to add, manually every time a route is added
router.use(authenticate_1.authenticate);
// But only POST needs validation, because it recieves a request body
router.post("/", (0, validate_1.validate)(workspaceSchemas_1.createWorkspaceSchema), workspaceController_1.create);
router.get("/", workspaceController_1.getAll);
router.get("/:id", workspaceController_1.getById);
router.get("/:id/metadata", workspaceController_1.metadata);
router.get("/:id/logs", workspaceController_1.logs);
router.get("/:id/stats", workspaceController_1.stats);
router.delete("/:id", workspaceController_1.remove);
router.patch("/:id/start", workspaceController_1.start);
router.patch("/:id/stop", workspaceController_1.stop);
router.patch("/:id/sync", workspaceController_1.syncStatus);
exports.default = router;
//# sourceMappingURL=workspaceRoutes.js.map