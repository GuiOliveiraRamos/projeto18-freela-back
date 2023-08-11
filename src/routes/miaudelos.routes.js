import { Router } from "express";
import {
  deleteMiaudelo,
  getAllMiaudelos,
  getMyMiaudelos,
  newMiaudelo,
  setVacation,
  updateMiaudelo,
} from "../controllers/miaudelos.controllers.js";

const miaudelosRoutes = Router();

miaudelosRoutes.post("/new-miaudelo", newMiaudelo);
miaudelosRoutes.get("/my-miaudelos", getMyMiaudelos);
miaudelosRoutes.get("/miaudelos", getAllMiaudelos);
miaudelosRoutes.put("/my-miaudelos/:id", updateMiaudelo);
miaudelosRoutes.delete("/my-miaudelos/:id", deleteMiaudelo);
miaudelosRoutes.patch("/my-miaudelos/:id/vacation", setVacation);

export default miaudelosRoutes;
