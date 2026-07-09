"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DockerOperationError = void 0;
const AppError_1 = require("./AppError");
class DockerOperationError extends AppError_1.AppError {
    constructor(message = "Docker operation failed") {
        super(message, 500);
    }
}
exports.DockerOperationError = DockerOperationError;
//# sourceMappingURL=DockerOperationError.js.map