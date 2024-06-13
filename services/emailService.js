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

    const mailOptions = {
        from: config.email.user,
        to: email,
        subject: 'Email Verification',
        text: `Click the following link to verify your email: ${verificationLink}`
    };

    await transporter.sendMail(mailOptions);
};

const sendOTPEmail = async (email, otp) => {
    const otpLink = `https://regnum-backend-bice.vercel.app/verify-otp?email=${email}&otp=${otp}`;

    const mailOptions = {
        from: config.email.user,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. Click the following link to enter your OTP: ${otpLink}`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = {
    sendVerificationEmail,
    sendOTPEmail
};
