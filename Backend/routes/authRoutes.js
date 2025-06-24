import express from 'express';
import {registerUser, verifyOTP, loginUser} from '../controllers/authController.js'

const router = express.Router();

router.post('/register', registerUser);
router.post('/verify-otp', verifyOTP)
router.post('/login', loginUser);
// router.post('/forgot-password', forgotPassword);
// router.post('reset-password', resetPassword);
// router.post('/chnage-password', changePassword);
// router.post('/google-login', googleLogin);

export default router