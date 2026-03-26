import activationAccountService from "../services/activation.service.js";
/**
 * Activate a user's account using an activation token and activation code.
 * If the activation token is valid, and the activation code matches the one in the token,
 * the user's email is marked as verified in the database.
 * @param {Object} req.body - The request body containing the activation token and activation code.
 * @param {Response} res - The response object to send the response back to the client.
 * @returns {Promise<Response>} - A promise containing the response object.
 * @throws {Error} - If the activation token is invalid, or the activation code does not match the one in the token.
 */
const activateAccountController = async (req, res) => {
    try {
        const { activationToken, activationCode } = req.body;
        const user = await activationAccountService(activationToken, activationCode);
        res.status(200).json({ success: true, message: "Account activated successfully", data: user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}


export default activateAccountController;