import { config } from "dotenv";
import mongoose from "mongoose";
config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Error connecting to MongoDB");
        process.exit(1);
        
    }
}