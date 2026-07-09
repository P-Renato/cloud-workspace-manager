"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const authService_1 = require("../services/authService");
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
function authenticate(req, _res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(new UnauthorizedError_1.UnauthorizedError("No token provided"));
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = (0, authService_1.verifyToken)(token);
        req.userId =
            decoded.userId;
        next();
    }
    catch {
        return next(new UnauthorizedError_1.UnauthorizedError("Invalid token"));
    }
}
//# sourceMappingURL=authenticate.js.map