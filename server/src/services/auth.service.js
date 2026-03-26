import UserRepository from "../repositories/user.repository.js";
const userRepository = new UserRepository();
import Jwt from "../utils/jwt.js";
import bcrypt from "bcrypt";
const jwt = new Jwt();

import ejs from "ejs";
import path from "path";

import createActivationToken from "../utils/activation.js";
import sendMail from "../services/email.service.js";


class AuthService {
    async register(data) {
        try {
            const user = await userRepository.create(data);
            const { token, activationCode } = await createActivationToken(user);

            const data = { user: { name: `${user.firstName} ${user.lastName} ` }, acivationCode: activationCode }

            const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), data);

            await sendMail({ email: user.email, subject: "Account Activation", template: html, data });

            return { user, token };
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

            // isEmailVerified: { type: Boolean, default: false },
            if (!user.isEmailVerified) {
                throw new Error("User email not verified found");
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