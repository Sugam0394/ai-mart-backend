 import { Router } from "express";
import { registerUser }from "../controllers/usercontrollers.js";
import upload from "../middlewares/multer.js";
import { loginUser } from "../controllers/usercontrollers.js";

 const router = Router()

 router.route('/register').post(
    upload.fields([
{
    name : 'profilePicture',
    maxCount : 1,
}
    ]),
registerUser
)
router.route('/login').post(loginUser)



 export default router