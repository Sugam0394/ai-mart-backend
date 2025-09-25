 import { Router } from "express";
import { registerUser }from "../controllers/usercontrollers.js";
import upload from "../middlewares/multer.js";
import { loginUser } from "../controllers/usercontrollers.js";
import verifyJWT from "../middlewares/auth.js";
 import logout from "../controllers/logout.js";
import generateToken from "../middlewares/generateToken.js";
 
 
 


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
 router.route('/logout').post(verifyJWT , logout)
router.route('/refreshToken').post(generateToken)
 




 export default router