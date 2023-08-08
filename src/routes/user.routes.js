import { Router } from "express";
import { schemaValidation } from "../middlewares/schema.validation.js";
import { schemaSignIn, schemaSignUp } from "../schemas/users.schemas.js";

const signRoutes = Router();

signRoutes.post("/signup", schemaValidation(schemaSignUp));
signRoutes.post("/signin", schemaValidation(schemaSignIn));

export default signRoutes;
