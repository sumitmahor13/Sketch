import User from "../models/User.js";
import OTP from "../models/OTP.js"
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async(req, res) => {
    try {
        const {firstName, lastName, email, password } = req.body;

        //Validation
        if(!firstName || !lastName || !email || !password){
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
        const {firstName, lastName, email, password, otp} = req.body;

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
            firstName,
			lastName,
			email,
			password: hashedPassword,
            isVerified:true,
			profileImage:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
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
        let token = generateToken(existUser._id)

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
                firstName: existUser.firstName,
                lastName: existUser.lastName,
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