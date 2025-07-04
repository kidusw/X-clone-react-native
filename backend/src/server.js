import express from "express";
import { ENV } from "./config/env.js";
import { connectDb } from "./config/db.js";
import cors from "cors";
import {clerkMiddleware} from "@clerk/express";
import userRoutes from "./routes/user.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get('/',(req,res)=>{
    res.send("hello from server");
})

app.use('/api/users',userRoutes);


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