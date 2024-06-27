const nodemailer = require('nodemailer');
const config = require('../config/config');
const port = config.port;
const transporter = nodemailer.createTransport({
    service: config.email.service,
    auth: {
        user: config.email.user,
        pass: "ctjn rdbg gego fjsg"
    }
});

const sendVerificationEmail = async (email, token) => {
    const verificationLink = `https://regnum-backend-bice.vercel.app/verify-email?token=${token}`;
    console.log("Im inside sending mail!")
    const mailOptions = {
        from: config.email.user,
        to: email,
        subject: 'Email Verification',
        text: `Click the following link to verify your email: ${verificationLink}`
    };

    await transporter.sendMail(mailOptions);
};

const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: config.email.user,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}.`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = {
    sendVerificationEmail,
    sendOTPEmail
};
