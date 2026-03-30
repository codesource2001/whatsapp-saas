import AuthService from "../services/auth.service.js"
const authService = new AuthService();
import { successResponse, errorResponse } from "../utils/response.js"

class AuthController {
    async register(req, res, next) {
        try {
            // console.log(req.body);
            const { user, token } = await authService.register(req.body);
            successResponse(res, { user, token }, "User registered successfully", 201);
        } catch (error) {
            // console.log(error)
            errorResponse(res, error, "Failed to register user", 500);
        }
    }

    async login(req, res) {
        try {
            const user = await authService.login(req.body);
            successResponse(res, user, "User logged in successfully", 200);
        } catch (error) {
            errorResponse(res, error, "Failed to login user", 401);
        }
    }

}

export default AuthController;