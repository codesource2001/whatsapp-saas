import nodemailer from 'nodemailer';

/**
 * Sends an email using the nodemailer library.
 * 
 * @param {string} email - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} template - The HTML template for the email.
 * @param {object} data - The data to be used when rendering the HTML template.
 * @returns {Promise<void>} - A promise that resolves when the email is sent successfully.
 */
const sendEmail = async (email, subject, template) => {
    // Implementation for sending email
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE === 'true',
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },

    });
    try {
        await transporter.verify();
        console.log(" Email Server is ready to take our messages");
    } catch (err) {
        console.error("Email Service Verification failed:", err);
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: template,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to " + email);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }


};

export default sendEmail;