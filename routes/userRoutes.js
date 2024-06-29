const express = require('express');
const { joinWaitlist, verifyMail, verifyOTP , sendOTP, updateUser } = require('../controllers/userController');
const cors = require('cors'); // Import CORS middleware

const router = express.Router();

// CORS middleware for all routes in this router
router.use(cors());

router.get('/', (req, res) => {
    res.status(201).json({
        "msg": "working alright!"
    });
});

router.post('/join-waitlist', joinWaitlist);
router.get('/verify-email', verifyMail);
router.post('/send-otp' , sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/update-details' , updateUser);

module.exports = router;
