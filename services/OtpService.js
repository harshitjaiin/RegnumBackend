// const nodemailer = require('nodemailer');
// const otpGenerator = require('otp-generator');
// const config = require('../config/config');

// console.log("I'm creating transport");
// const transporter = nodemailer.createTransport({
//     service: config.email.service,
//     auth: {
//         user: config.email.user,
//         pass: 'ctjn rdbg gego fjsg' // Replace with your generated app password
//     }
// });

// exports.sendVerificationOTP = async (email) => {
//     console.log("Inside verification mail");
    
//     // Generate a 6-digit OTP
//     const otp = otpGenerator.generate(6, {digits: true});

//     const mailOptions = {
//         from: config.email.user,
//         to: email,
//         subject: 'Your OTP for REGNUM!',
//         text: `Your One-Time Password (OTP) for verification is: ${otp}`
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log("OTP sent successfully to", email);
//         return otp; // Return OTP for verification/validation
//     } catch (error) {
//         console.error("Error sending OTP:", error);
//         throw error;
//     }
// };
