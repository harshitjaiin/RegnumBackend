const userDataSchema = require('../models/userDataModel');
const { generateVerificationToken, verifyToken, generateOTP } = require('../utils/tokenUtils');
const { sendVerificationEmail, sendOTPEmail } = require('../services/emailService');

// Join waitlist and send verification email
const joinWaitlist = async (req, res) => {
    const { email } = req.body;

    try {
        const existingUser = await userDataSchema.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists!" });
        }

        const token = generateVerificationToken(email);
        await sendVerificationEmail(email, token);
        await User.create({ email, verificationToken: token });

        res.status(200).json({ msg: "Verification Mail Sent!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error processing your request!" });
    }
};

// Verify email using the token
const verifyMail = async (req, res) => {
    const { token } = req.query;

    try {
        const payload = verifyToken(token);
        const email = payload.email;

        const user = await userDataSchema.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid Link!" });
        }

        user.isVerified = true;
        user.verificationToken = null;
        await user.save();

        res.redirect(`https://regnum.life/verified/index.html`);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Invalid or expired Token, Try Again" });
    }
};

// Send OTP
const UserDataModel = require('../models/userDataModel');
const { generateOTP } = require('../utils/tokenUtils');
const { sendOTPEmail } = require('../services/emailService');

// Send OTP
const sendOTP = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    try {
        // Check if the user already exists
        let existingUser = await UserDataModel.findOne({ email });

        // If user exists, delete the existing document
        if (existingUser) {
            await UserDataModel.deleteOne({ email });
        }

        // Generate OTP
        const otp = generateOTP();
        // Calculate OTP expiration (15 minutes from now)
        const otpExpires = new Date(Date.now() + 15 * 60 * 1000);
        console.log(otp);
        console.log(otpExpires);

        // Create a new user entry with email, otp, and otpExpires
        await UserDataModel.create({
            email,
            otp,
            otpExpires
        });

        // Send OTP email
        await sendOTPEmail(email, otp);

        res.status(200).send("OTP sent to email.");
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).send("Error processing your request!");
    }
};

module.exports = {
    sendOTP
};

// Verify OTP
const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    console.log(email);
    try {
        const user = await userDataSchema.findOne({ email });

        if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ error: "Invalid email or OTP!" });
        }

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

// Update user data incrementally
const updateUser = async (req, res) => {
    const { email, ...updateData } = req.body;

    try {
        const user = await userDataSchema.findOneAndUpdate(
            { email },
            { $set: updateData },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        res.status(200).json({ msg: "User data updated successfully.", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating user data!" });
    }
};

module.exports = {
    joinWaitlist,
    verifyMail,
    verifyOTP,
    sendOTP,
    updateUser
};
