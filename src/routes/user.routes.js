import { Router } from "express";
import { schemaValidation } from "../middlewares/schema.validation.js";
import { schemaSignIn, schemaSignUp } from "../schemas/users.schemas.js";
import { signUp } from "../controllers/signup.controllers.js";

const signRoutes = Router();

signRoutes.post("/signup", schemaValidation(schemaSignUp), signUp);
signRoutes.post("/signin", schemaValidation(schemaSignIn));

export default signRoutes;
