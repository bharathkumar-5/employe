import { configDotenv } from "dotenv";
configDotenv();
import express from "express"
import cors from "cors";
import {connect} from "mongoose";
import { empRouter } from "./router/emp.route.js";

const app=express();
app.use(express.json())
app.use(cors());

app.use("/emp",empRouter)

app.listen(process.env.PORT,async()=>{
    try{
        await connect(process.env.MONGO_URL)
        console.log("db connected");
        console.log("server started on port http://localhost:4444")
    }catch(e){
        console.log(e.message)
    }
})