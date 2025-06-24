import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbConnect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Database Connected Sucessfully")
    } catch (error) {
        console.log("❌ Database connection failed");
        process.exit(1);
    }
}

export default dbConnect