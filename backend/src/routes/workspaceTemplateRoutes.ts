import { Router } from "express";
import { getTemplates } from "../controllers/workspaceTemplateController";

const router = Router();

router.get("/", getTemplates);

export default router;