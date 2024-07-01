const otpGenerator = require('otp-generator');

const generateOTP = () => {
    return otpGenerator.generate(5, { digits: true });
};

module.exports = generateOTP;
