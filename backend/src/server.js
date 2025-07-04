import express from "express";
import { ENV } from "./config/env.js";
import { connectDb } from "./config/db.js";

const app = express();

connectDb();

app.get('/',(req,res)=>{
    res.send("hello from server");
})



app.listen(ENV.PORT,()=>{
    console.log('server running on port: ',ENV.PORT);
})