import User from "../models/User.js";
import OTP from "../models/OTP.js"
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import mailSender from "../utils/mailSender.js";
import resetEmailTemplate from "../emailTemplates/resetPasswordLinkTemplate.js"
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
import oauth2client from "../utils/googleConfig.js";
import axios from "axios";
dotenv.config();

export const registerUser = async(req, res) => {
    try {
        const {name, email, password } = req.body;

        //Validation
        if(!name || !email || !password){
            res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }

        //Check Is user exists 
        let existUser = await User.findOne({email});
        if(existUser){
            return res.status(400).json({
                success:false,
                message:"User already exists !"
            })
        }

        //Generate OTP
        const otp = Math.floor((Math.random() * 900000) + 100000);
        //create entry of OTP in otpSchema
        await OTP.create({ email, otp });

        return res.status(200).json({
            success:true,
            message: "OTP sent to your email for verification.",
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message,
            message:"Internal Server Error"
        })
    }
}

export const verifyOTP = async(req, res) => {
    try {
        const {name, email, password, otp} = req.body;

        //find recent OTP 
        const recentOTP = await OTP.findOne({email}).sort({createdAt: -1}).limit(1);
        //match OTP
        if(!recentOTP || recentOTP.otp !== otp){
            return res.status(400).json({
                success:false,
                message:"Invalid or expired OTP"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
			email,
			password: hashedPassword,
            isVerified:true,
			profileImage:`https://api.dicebear.com/5.x/initials/svg?seed=${name.split(" ")[0]} ${name.split(" ")[1]}`
        });

        return res.status(201).json({
            success:true,
            message:"User registered successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"OTP verification failed"
        })
    }
}

export const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body

        //validation
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"Fields are required !"
            })
        }

        //check user existance
        const existUser = await User.findOne({email})
        if(!existUser){
            return res.status(404).json({
                success:false,
                message:"User not found !"
            })
        }

        if(!existUser.isVerified){
            return res.status(401).json({
                success:false,
                message:"Please verify your email first"
            })
        }

        //match password
        const isMatch = await bcrypt.compare(password, existUser.password);
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid password"
            })
        }

        //generate Token
        let token = generateToken(existUser._id);

        res.cookie("token", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })

        return res.status(200).json({
            success:true,
            message:"Login Sucessfully",
            user:{
                id: existUser._id,
                name: existUser.name,
                email: existUser.email,
                role: existUser.role,
                isVerified:existUser.isVerified,
                dateOfBirth: existUser.dateOfBirth,
                contactNumber: existUser.contactNumber,
                profileImage: existUser.profileImage,
            }
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to login"
        })
    }
}

export const forgetPassword = async(req, res) => {
    try {
        const {email} = req.body
        if(!email) return res.status(404).json({
            success:false,
            message:"Email is required"
        });

        //Check user with the given email
        let existUser = await User.findOne({email});
        if(!existUser){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        //generate token for reset password
        const token = jwt.sign({ userId: existUser._id }, process.env.JWT_SECRET, { expiresIn: "5m" });
    
        //generate reset link
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

        await mailSender(email, "Password reset", resetEmailTemplate(resetLink, email))

        res.status(200).json({
                success:true,
                message:"Passwrod reset link send to your email"
            })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export const resetPassword = async(req, res) => {
    try {
        const {token, newPassword, confirmPassword} = req.body;
        
        //validation
        if (newPassword !== confirmPassword)
            return res.status(400).json({ 
            success: false,
            message: "Passwords do not match" 
        });

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //find user
        const user = await User.findById(decoded.userId);
    
        if (!user) return res.status(404).json({ 
            success:false,
            message: "Invalid token or user not found" 
        });


        user.password = await bcrypt.hash(newPassword, 10)
        await user.save();

        res.status(200).json({
            success:true,
            message:"Password reset successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export const changePassword = async(req, res) => {
    try {
        const {oldPassword, newPassword} = req.body;

        if(oldPassword === newPassword){
            return res.status(400).json({
                success:false,
                message:"New password must be diffrent from old password"
            })
        }

        //get user by req headers
        const user = await User.findById(req.user._id);

        //match password
        const isMatch = bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Old password is incorrect"
            })
        }

        user.password = await bcrypt.hash(newPassword, 10)
        await user.save();

        res.status(200).json({
            success:true,
            message:"Password Change Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to Change password"
        })
    }
}

export const logoutUser = async(req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly:true,
            // secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        })

        return res.status(200).json({
            success:true,
            message:"Logged out"
        })
    } catch (error) {
        
        return res.status(500).json({
            success:false,
            message:"Failed to Logout"
        })
    }
}

export const checkAuth = async(req, res) => {
    try {
        const token = req.cookies.token;
        if(!token) {return res.status(404).json({isAuthenticated:false})}

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //get user by id and send it into response
        const user = await User.findById(decoded.userId)

        return res.status(200).json({ isAuthenticated: true, user });
    } catch (error) {
        return res.status(500).json({ isAuthenticated: false, user: null });
    }
}

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async(req, res) => {
    try {
        const { code } = req.query; // Google Code

        const googleRes = await oauth2client.getToken(code)
        
        oauth2client.setCredentials(googleRes.tokens);

        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        )

        const {email, name, picture } = userRes.data;

        //find user
        let user = await User.findOne({email});
        if (!user) {
        user = await User.create({
            name:name,
            email:email,
            password: null,
            isVerified: true,
            provider: 'google',
            profileImage: picture,
        });
        }

        const {_id} = user
        const token = generateToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            sameSite: "None",
            secure:true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })

        return res.status(200).json({
            success:true,
            token,
            user,
        });
    } catch (error) {
        return res.status(500).json({
        success:false,
        message:"Google Login Failed"
    });
    }
}
