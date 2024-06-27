const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://harshitjaiin:DTU188jain@harshitxdev.6zuqfbb.mongodb.net/TestServer');
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    otp: { type: String },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    otpExpires: { type: Date }
});

module.exports = mongoose.model('User', userSchema);
