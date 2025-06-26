import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import User from "../models/User.js"

export const isAuthenticated = async (req, res, next) => {
    try {
        //get token from cookie
        const token = req.cookies.token;

        if(!token){
            return res.status(404).json({
                success:false,
                message:"Unauthorized: Token not found!"
            })
        }

        //verify token
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        //send user data in req
        req.user = await User.findById(decode.userId).select("-password");
        next();
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Unauthorized: Invalid Token"
        })
    }
}