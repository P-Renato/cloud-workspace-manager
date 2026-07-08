"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = success;
exports.failure = failure;
function success(res, data, message = "Success", status = 200) {
    return res.status(status).json({
        success: true,
        message,
        data,
    });
}
function failure(res, message, status = 400) {
    return res.status(status).json({
        success: false,
        message,
    });
}
//# sourceMappingURL=apiResponse.js.map