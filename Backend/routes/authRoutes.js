import express from 'express';
import {registerUser, verifyOTP, loginUser, forgetPassword, resetPassword, changePassword} from '../controllers/authController.js'

const router = express.Router();

router.post('/register', registerUser);
router.post('/verify-otp', verifyOTP)
router.post('/login', loginUser);
router.post('/forget-password', forgetPassword);
router.post('/reset-password', resetPassword);
router.post('/change-password', changePassword);
// router.post('/google-login', googleLogin);

export default router