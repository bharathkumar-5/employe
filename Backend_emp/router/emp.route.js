import {Router} from "express";
import { createEmp,getEmp,getEmpById,deleteEmp,updateEmp} from "../controller/emp.control.js";
import { authentication,Authorization } from "../middlewares/auth.js";

const empRouter= Router();
empRouter.post("/create",authentication,Authorization,createEmp)
empRouter.get("/get",authentication,Authorization,getEmp)
empRouter.get("/getbyid",authentication,getEmpById)
empRouter.post("/update",authentication,Authorization,updateEmp)
empRouter.delete("/delete",authentication,Authorization,deleteEmp)

export {empRouter}

