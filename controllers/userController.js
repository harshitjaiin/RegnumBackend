const User = require('../models/userModel');
const { generateVerificationToken, verifyToken, generateOTP } = require('../utils/tokenUtils');
const { sendVerificationEmail, sendOTPEmail } = require('../services/emailService');

const joinWaitlist = async (req, res) => {
    console.log("I'm inside waitlist!!");
    const { email } = req.body;

    try {
        // Check if User exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists!" });
        }

        const token = generateVerificationToken(email);
        await sendVerificationEmail(email, token);

        // Create new user with verification token
        await User.create({ email, verificationToken: token });

        res.status(200).json({ msg: "Verification Mail Sent!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error processing your request!" });
    }
};

const verifyMail = async (req, res) => {
    const { token } = req.query;
    console.log(token);
    try {
        // Verify the token
        const payload = verifyToken(token);
        const email = payload.email;
        console.log(email);

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Invalid Link!" });
        }

        // Update user's verification status
        user.isVerified = true;
        user.verificationToken = null;
        await user.save();

        res.redirect(`https://regnum.life/verified/index.html`);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Invalid or expired Token, Try Again" });
    }
};

const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ error: "Invalid email or OTP!" });
        }

        // Update user's OTP verification status
        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        res.status(200).json({ msg: "OTP successfully verified." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error processing your request!" });
    }
};

const sendOTP = async (req, res) => {
    const { email } = req.body;

    try {
        // Generate new OTP
        const otp = generateOTP();

        // Find user by email
        let user = await User.findOne({ email });

        if (!user) {
            // If user doesn't exist, create a new one
            user = await User.create({ email });
        }

        // Update user with OTP details
        user.otp = otp;
        user.isVerified = false;
        user.otpExpires = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes
        await user.save();

        // Send OTP email
        await sendOTPEmail(email, otp);

        res.status(200).send("OTP sent to email.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error processing your request!");
    }
};

module.exports = {
    joinWaitlist,
    verifyMail,
    verifyOTP,
    sendOTP
};
