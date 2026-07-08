"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const authService_1 = require("../services/authService");
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "No token provided",
        });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = (0, authService_1.verifyToken)(token);
        req.userId = decoded.userId;
        next();
    }
    catch {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
}
//# sourceMappingURL=authenticate.js.map