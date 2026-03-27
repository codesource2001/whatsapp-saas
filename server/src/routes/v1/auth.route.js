import express from "express";
const authRouter = express.Router();
import AuthController from "../../controllers/auth.controller.js"
const authController = new AuthController();
import AuthValidator from "../../validators/auth.validator.js";
const authValidator = new AuthValidator();

// http://localhost:4001/api/v1/auth/login
authRouter.post("/login", authValidator.validateLoginRequest, authController.login);
// http://localhost:4001/api/v1/auth/register
authRouter.post("/register", authValidator.validateRegisterRequest, authController.register)

export default authRouter;