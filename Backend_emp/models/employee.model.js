import {Schema , model} from "mongoose";

const employeeSchema= new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 4,
        select: false 
    },
    phone: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true,
        enum: ["Engineering", "HR", "Finance", "Marketing", "Sales", "Admin"]
    },
    role: { 
        type: String, 
        enum: ["admin", "employee"], 
        default: "employee" 
    },
    salary: {
        type: Number,
        required: true
    },
    profilePicture: {
        type: String, 
        default: ""
    },
    isActive: {
        type: Boolean,
        default: true
    }

});

const emp= model("employee",employeeSchema)

export {emp};