import UserRepository from "../repositories/user.repository.js";
const userRepository = new UserRepository();
import Jwt from "../utils/jwt.js";
const jwt = new Jwt();


class AuthService {
    async register(data) {
        try {
            console.log(data);
            const user = await userRepository.create(data);
            return user;
        } catch (error) {
            throw error
        }
    }
    async login(data) {
        try {
            const user = await userRepository.findByEmail(data.email);
            if (!user) {
                throw new Error("User not found");
            }
            if (user.password !== data.password) {
                throw new Error("Invalid password");
            }
            const token = await jwt.jwtEncrypt({ id: user.id });
            const { password, ...userWithoutPassword } = user._doc;
            return { userWithoutPassword, token }
        } catch (error) {
            throw error
        }
    }
}

export default AuthService;