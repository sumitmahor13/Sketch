import express from 'express';
import {registerUser, verifyOTP, loginUser, forgetPassword, resetPassword, changePassword, logoutUser, googleLogin, checkAuth} from '../controllers/authController.js'
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/verify-otp', verifyOTP)
router.post('/login', loginUser);
router.post('/forget-password', forgetPassword);
router.post('/reset-password', resetPassword);
router.post('/logout', logoutUser);
router.get('/google', googleLogin);
router.get('/check-auth', checkAuth);

router.post('/change-password', isAuthenticated, changePassword);

export default router