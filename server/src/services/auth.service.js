import UserRepository from "../repositories/user.repository.js";
const userRepository = new UserRepository();
import Jwt from "../utils/jwt.js";
import bcrypt from "bcrypt";
const jwt = new Jwt();


class AuthService {
    async register(data) {
        try {
            // console.log(data);
            // const { password } = data;
            // const hashPassword = await bcrypt.hash(password, 10);
            // data.password = hashPassword
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

            // const isMatchPassword = await bcrypt.compare(data.password, user.password);
            const isMatchPassword = await user.comparePassword(data.password);

            if (!isMatchPassword) {
                throw new Error("Invalid password");
            }

            const token = await jwt.jwtEncrypt({ id: user.id, email: user.email });
            // const { password, ...userWithoutPassword } = user._doc;
            // return { user: userWithoutPassword, token }
            return { token }
        } catch (error) {
            throw error
        }
    }
}

export default AuthService;