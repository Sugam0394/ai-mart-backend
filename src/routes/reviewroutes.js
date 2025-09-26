 import { Router } from "express";
 import { createReview, } from "../controllers/reviewControllers.js";
 import verifyJWT from "../middlewares/auth.js";
 import isAdmin from "../middlewares/isAdmin.js";
 import { getToolReview } from "../controllers/reviewControllers.js";
 import { updateReview } from "../controllers/reviewControllers.js";
 import { deleteReview } from "../controllers/reviewControllers.js";

 const reviewRouter = Router();

 reviewRouter.route('/create').post( verifyJWT , createReview)
 reviewRouter.route('/review/:toolId').get(verifyJWT , isAdmin , getToolReview)
 reviewRouter.route('/update/:id').patch( verifyJWT , updateReview)
 reviewRouter.route('/delete/:id').delete(verifyJWT , deleteReview )
 

 export default reviewRouter