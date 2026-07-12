import { Router } from "express";
import {create, getAll, getById, remove, start, stop, metadata, logs, } from "../controllers/workspaceController";
import { authenticate } from "../middleware/authenticate";
import { validate } from "../middleware/validate";

import { createWorkspaceSchema, } from "../validators/workspaceSchemas";

const router = Router();

// This is saying that all the routes in this router needs authentication, so it is not required to add, manually every time a route is added
router.use(authenticate);

// But only POST needs validation, because it recieves a request body
router.post("/", validate(createWorkspaceSchema), create);

router.get("/", getAll);

router.get("/:id", getById);

router.get("/:id/metadata", metadata);

router.get("/:id/logs", logs);

router.delete("/:id", remove);

router.patch("/:id/start", start);

router.patch("/:id/stop", stop);

export default router;