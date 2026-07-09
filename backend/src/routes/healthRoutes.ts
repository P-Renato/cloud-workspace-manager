import { Router } from "express";
import { getHealth } from "../controllers/healthController";

const router = Router();

router.get("/whoami", (_req, res) => {
  res.json({
    uid: process.getuid?.(),
    gid: process.getgid?.(),
    groups: process.getgroups?.(),
  });
});

router.get("/health", getHealth);

export default router;