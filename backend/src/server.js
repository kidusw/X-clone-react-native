import express from "express";
import { ENV } from "./config/env.js";
import { connectDb } from "./config/db.js";
import cors from "cors";
import {clerkMiddleware} from "@clerk/express";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get('/',(req,res)=>{
    res.send("hello from server");
})

app.use('/api/users',userRoutes);
app.use('/api/posts',postRoutes);

// error handling middleware
app.use((err,req,res)=>{
    console.error("unhandled error:",err);
    res.status(500).json({error:err.message || "internal server error"});
})

const startServer = async()=>{
    try {

        await connectDb();
        app.listen(ENV.PORT,()=>{
    console.log('server running on port: ',ENV.PORT);
})
    } catch (error) {
        console.log("Failed to start server: ",error.message);
        process.exit(1);
    }
}

startServer();