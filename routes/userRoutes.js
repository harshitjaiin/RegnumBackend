const express = require('express');
const { joinWaitlist, verifyMail, verifyOTP } = require('../controllers/userController');

const router = express.Router();

router.get('/' , (req, res)=>{
    res.status(201).json({
        "msg" : "working alright!"
    })
})
router.post('/join-waitlist', joinWaitlist);
router.get('/verify-email', verifyMail);
router.get('/verify-otp', verifyOTP);

module.exports = router;
