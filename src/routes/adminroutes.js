import { Router } from "express";
import {registerAdmin}from "../controllers/admincontroller.js";
import { loginAdmin } from "../controllers/admincontroller.js";
 import upload from "../middlewares/multer.js";

const adminRouter = Router();

adminRouter.route('/register').post(
    upload.fields([
    {
        name : 'profilePicture',
        maxCount : 1
    }
    ]),
registerAdmin
)
adminRouter.route('/login').post(loginAdmin)

export default adminRouter