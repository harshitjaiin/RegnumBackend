const otpGenerator = require('otp-generator');

const generateOTP = () => {
    return otpGenerator.generate(6, { digits: true });
};

module.exports = generateOTP;
