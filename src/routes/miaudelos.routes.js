import { Router } from "express";
import {
  deleteMiaudelo,
  getMyMiaudelos,
  newMiaudelo,
  updateMiaudelo,
} from "../controllers/miaudelos.controllers.js";

const miaudelosRoutes = Router();

miaudelosRoutes.post("/new-miaudelo", newMiaudelo);
miaudelosRoutes.get("/my-miaudelos", getMyMiaudelos);
miaudelosRoutes.put("/my-miaudelos/:id", updateMiaudelo);
miaudelosRoutes.delete("/my-miaudelos/:id", deleteMiaudelo);

export default miaudelosRoutes;
