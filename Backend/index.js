import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './config/db.js'
import corsOptions from "./config/corsOptions.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"

dotenv.config();
const app = express();

//middlewares
app.use(cors({
  origin: "http://localhost:5173", // your frontend origin
  credentials: true, // ✅ REQUIRED for cookies
}));
app.use(express.json());
app.use(cookieParser())

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/product', productRoutes);
app.use("/api/v1/cart", cartRoutes);

let PORT = process.env.PORT || 5000;

dbConnect();

app.listen(PORT, () => {
    console.log(`✅ Server is running on PORT ${PORT}`)
});

