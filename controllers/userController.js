const User = require('../models/userModel');
const { generateVerificationToken, verifyToken } = require('../utils/tokenUtils');
const { sendVerificationEmail, sendOTPEmail } = require('../services/emailService');
const generateOTP = require('../utils/otpUtils');

const joinWaitlist = async (req, res) => {
    console.log("I'm inside waitlist!!");
    const { email } = req.body;

    try {
        const token = generateVerificationToken(email);
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60000); // OTP valid for 10 minutes

        await User.create({ email, verificationToken: token, otp, otpExpires });

        await sendVerificationEmail(email, token);
        await sendOTPEmail(email, otp);
        res.status(200).json({
            "msg":"Verification Mail and OTP Sent!"
        });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            "msg":"Error processing your request!"
        });
    }
};

const verifyMail = async (req, res) => {
    const { token } = req.query;

    try {
        const payload = verifyToken(token);
        const email = payload.email;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send("Invalid Link!");
        }

        user.isVerified = true;
        user.verificationToken = null;
        await user.save();

        res.status(200).json({
            "msg": "Email successfully verified."
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "msg":"Invalid or expired Token, Try Again"
        });
    }
};

const verifyOTP = async (req, res) => {
    console.log(req.query);
    const { email, otp } = req.query;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send("Invalid email or OTP!");
        }

        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).send("Invalid or expired OTP!");
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        res.status(200).json({
            "msg": "OTP successfully verified."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "msg":"Error processing your request!"
        });
    }
};

module.exports = {
    joinWaitlist,
    verifyMail,
    verifyOTP
};
