
const express = require('express');
const { login, signUp, sendOTP, changedPassword, logout, googleSignup, googlelogin } = require('../controllers/auth-controllers');
const { auth } = require('../middlewares/auth-middlewares');
const { resetPasswordToken, resetPassword } = require('../controllers/reset-password-controller');
const { ContactController } = require('../controllers/contact-controller');
const router = express.Router();


router.post('/login',login);
router.post('/signup',signUp);
router.post('/logout',logout);
router.post('/google-signup',googleSignup)
router.post('/google-login',googlelogin)
//send otp
router.post('/sendotp', sendOTP);

//change password
router.post('/changepassword',auth,changedPassword);

//generate token for reset password
router.post('/reset-password-token', resetPasswordToken);

///reset password after varifications
router.post('/reset-password', resetPassword);
router.post('/contact',ContactController);

module.exports = router;