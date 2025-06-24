import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './config/db.js'
import corsOptions from "./config/corsOptions.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"

dotenv.config();
const app = express();

//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())

//routes
app.use('/api/v1/auth', authRoutes);

let PORT = process.env.PORT || 5000;

dbConnect();

app.listen(PORT, () => {
    console.log(`✅ Server is running on PORT ${PORT}`)
});

