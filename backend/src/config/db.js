import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDb = async()=>{
    try {
       await mongoose.connect(ENV.MONGO_URI);
       console.log("connected to database successfully✅");
       
    } catch (error) {
        console.log("Error connecting to MONGODB");
        
        process.exit(1);
    }
}