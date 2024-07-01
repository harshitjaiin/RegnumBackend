const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.generateVerificationToken = (email) => {
    return jwt.sign({ email }, config.jwtSecret, { expiresIn: '1h' });
};

exports.verifyToken = (token) => {
    return jwt.verify(token, config.jwtSecret);
};

exports.generateOTP = () => {
    return Math.floor(10001 + Math.random() * 90000).toString(); // Generates a 5-digit OTP
};
