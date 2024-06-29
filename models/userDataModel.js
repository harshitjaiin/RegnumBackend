const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://harshitjaiin:DTU188jain@harshitxdev.6zuqfbb.mongodb.net/TestServer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userDataSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    FullName: { type: String },
    CountryCode: { type: String },
    PhoneNumber: { type: Number },
    DateOfBirth: { type: Date },
    Gender: { type: String },
    City: { type: String },
    AnnualIncome: { type: Number },
    LuxuryAssets: { type: [String] },
    Reference: { type: String },
    NameOfReference: { type: String },
    PhoneNoOfReference: { type: String },
    Degree: { type: String },
    AlmaMater: { type: String },
    MemberShip: { type: String },
    RegNumber: { type: String },
    InstaId: { type: String },
    ExoticPlace: { type: String },
    VisaNumber: { type: String },
    TravelPreference: { type: [String] },
    CulturePreference: { type: [String] },
    DiningPreference: { type: [String] },
    Hobbies: { type: [String] },
    FitnessPreference: { type: [String] },
    CouplePhoto1: { type: String },
    CouplePhoto2: { type: String },
    MalePicture: { type: String },
    FemalePicture: { type: String },
    otp: { type: String }, // Add OTP field
    otpExpires: { type: Date }, // Add OTP expiry field
    isVerified: { type: Boolean, default: false }, // Add verification status field
});

module.exports = mongoose.model('UserDataModel', userDataSchema);
