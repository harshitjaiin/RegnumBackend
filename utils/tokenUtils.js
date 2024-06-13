const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.generateVerificationToken = (email) => {
    return jwt.sign({ email }, config.jwtSecret, { expiresIn: '1h' });
};

exports.verifyToken = (token) => {
    return jwt.verify(token, config.jwtSecret);
};
