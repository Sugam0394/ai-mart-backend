import { Router } from "express";
import {registerAdmin}from "../controllers/admincontroller.js";
import { loginAdmin } from "../controllers/admincontroller.js";
import upload from "../middlewares/multer.js";
import logout from "../controllers/logout.js";
import verifyJWT from "../middlewares/auth.js";
import generateToken from "../middlewares/generateToken.js";
 
 
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
adminRouter.route('/logout').post( verifyJWT , logout)
adminRouter.route('/refreshToken').post(generateToken)


export default adminRouter