import { Router } from "express";
import { schemaValidation } from "../middlewares/schema.validation.js";
import { schemaSignIn, schemaSignUp } from "../schemas/users.schemas.js";
import { signIn, signUp } from "../controllers/signup.controllers.js";

const signRoutes = Router();

signRoutes.post("/signup", schemaValidation(schemaSignUp), signUp);
signRoutes.post("/", schemaValidation(schemaSignIn), signIn);

export default signRoutes;
