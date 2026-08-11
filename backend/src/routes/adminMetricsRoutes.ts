import { Router } from "express";

import { getAdminMetrics } from "../controllers/adminMetricsController";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.use(authenticate);

router.get("/metrics", getAdminMetrics);

export default router;