import express from "express";
import { ENV } from "./config/env.js";
import { connectDb } from "./config/db.js";

const app = express();


app.get('/',(req,res)=>{
    res.send("hello from server");
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