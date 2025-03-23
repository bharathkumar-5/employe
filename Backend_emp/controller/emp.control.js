import { emp } from "../models/employee.model.js";
import argon2 from "argon2";
import crypto from "crypto";

export const createEmp=async(req,res)=>{
    try {
        const { name, email, phone,department,role,salary,isActive } = req.body;
        if(!name||!email||!phone||!department||!salary){
            res.status(400).json({message:"all fields are required"})
        }e

        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) return res.status(400).json({ message: "Email already exists!" });

        const password=crypto.randomBytes(6).toString();
        const hashedPassword = await argon2.hash(password);
        const profilePicture = req.file ? req.file.path : null;

        const newEmployee = new Employee({
            name,
            email,
            password: hashedPassword,
            phone,
            department,
            role: role || "employee",
            salary:salary,
            profilePicture,
            isActive: isActive || true
        });

        await emp.create(newEmployee);
        res.status(201).json({ message: "Employee created successfully!", employee: newEmployee });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getEmp=async(req,res)=>{
    try {
        const page = +(req.query.page) 
        const limit = parseInt(req.query.limit) 
        const skip = (page - 1) * limit;

        const employees = await emp.find().skip(skip).limit(limit);
        res.status(200).json({
            currentPage: page,
            employees,
        })
        
    } catch (e) {
        res.status(500).json({ message: "Internal server error" ,error:e.message});
    }
};

export const getEmpById=async(req,res)=>{ 
    try{
        const id=req.details.id;
        const empDetail=await emp.findById(id);
        req.status(200).json(empDetail)
    }catch(e){
        res.status(500).json({ message: "Internal server error" ,error:e.message});
    }
}

export const updateEmp=async (req,res)=>{
    const { id } = req.params;
    const { name, email, phone, department, salary } = req.body;
    try{
        let employee = await emp.findById(id);

        if (!employee) return res.status(404).json({ message: "Employee not found!" });

       
        employee.name = name || employee.name;
        employee.email = email || employee.email;
        employee.phone = phone || employee.phone;
        employee.department = department || employee.department;
        employee.salary = salary || employee.salary

        await employee.save();

        res.status(200).json({ message: "Employee updated successfully!", employee });
    }catch(err){
        res.status(500).json({ message: "Internal server error" ,error:err.message});
    }
}

export const deleteEmp=async(req,res)=>{
    const { id } = req.params;
    try{
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) return res.status(404).json({ message: "Employee not found!" });
        res.status(200).json({ message: "Employee deleted successfully" });
    }catch(e){
        res.status(500).json({ message: "Internal server error" ,error:e.message});
    }
}