"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const validate_1 = require("../middleware/validate");
const authSchemas_1 = require("../validators/authSchemas");
const authenticate_1 = require("../middleware/authenticate");
const router = (0, express_1.Router)();
router.post("/register", (0, validate_1.validate)(authSchemas_1.registerSchema), authController_1.register);
router.post("/login", (0, validate_1.validate)(authSchemas_1.loginSchema), authController_1.login);
router.get("/me", authenticate_1.authenticate, authController_1.me);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map