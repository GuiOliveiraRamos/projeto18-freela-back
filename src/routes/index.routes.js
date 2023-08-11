import { Router } from "express";
import signRoutes from "./user.routes.js";
import miaudelosRoutes from "./miaudelos.routes.js";

const router = Router();

router.use(signRoutes);
router.use(miaudelosRoutes);

export default router;
