import { Router } from "express";
import signRoutes from "./user.routes.js";

const router = Router();

router.use(signRoutes);
export default router;
