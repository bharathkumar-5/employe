import { emp } from "../models/employee.model.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";


export const loginUser = async (req, res, next) => {

    const { email, password } = req.body;
    if(!email||!password){
        throw new Error("all fields required")
    }
    try{
    const employee = await emp.findOne({ email }).select('+password');

    if (!employee) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const isMatch = await argon2.verify(employee.password,password)
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({id:employee._id,name:employee.name},process.env.JWT_KEY,{expiresIn:"24h"})

    res.status(200).json({employee_details:employee, token:token});
}catch(e){
    res.status(500).json({msg:"Internal server error",error:e.message})
}
}
