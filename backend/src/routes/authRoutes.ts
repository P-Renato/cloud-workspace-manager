import { Router } from "express";
import { register, login, me } from "../controllers/authController";
import { validate } from "../middleware/validate";
import { registerSchema, loginSchema } from "../validators/authSchemas";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.post("/register", validate(registerSchema) ,register);
router.post("/login",validate(loginSchema),login);
router.get("/me", authenticate, me);

export default router;