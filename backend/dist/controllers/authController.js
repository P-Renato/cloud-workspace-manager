"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userRepository_1 = require("../repositories/userRepository");
const authService_1 = require("../services/authService");
const crypto_1 = __importDefault(require("crypto"));
const register = async (req, res) => {
    const { email, password } = req.body;
    const existing = await (0, userRepository_1.findByEmail)(email);
    if (existing) {
        return res.status(400).json({ message: "User already exists" });
    }
    const passwordHash = await bcryptjs_1.default.hash(password, 10);
    const id = crypto_1.default.randomUUID();
    await (0, userRepository_1.createUser)(id, email, passwordHash);
    res.json({
        id,
        email,
    });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await (0, userRepository_1.findByEmail)(email);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const valid = await bcryptjs_1.default.compare(password, user.password_hash);
    if (!valid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = (0, authService_1.generateToken)(user.id);
    res.json({ token });
};
exports.login = login;
const me = (req, res) => {
    res.json({
        userId: req.userId,
    });
};
exports.me = me;
//# sourceMappingURL=authController.js.map