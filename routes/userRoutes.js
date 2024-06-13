const express = require('express');
const { joinWaitlist, verifyMail, verifyOTP } = require('../controllers/userController');

const router = express.Router();

router.post('/join-waitlist', joinWaitlist);
router.get('/verify-email', verifyMail);
router.get('/verify-otp', verifyOTP);

module.exports = router;
