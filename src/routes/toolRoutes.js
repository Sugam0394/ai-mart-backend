import { Router } from "express";
import { createTool } from "../controllers/toolController.js";
import verifyJWT from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";
import { getTool } from "../controllers/toolController.js";
import { updateTool } from "../controllers/toolController.js";
import { deleteTool } from "../controllers/toolController.js";
import { getAllTool } from "../controllers/toolController.js";

const toolRouter = Router();

toolRouter.route('/createTool').post(verifyJWT ,isAdmin , createTool )
toolRouter.route('/getTool/:id').get(verifyJWT , getTool)
toolRouter.route('/getAllTools').get(verifyJWT , getAllTool )
toolRouter.route('/updateTool/:id').patch(verifyJWT , isAdmin , updateTool )
toolRouter.route('/deleteTool/:id').delete(verifyJWT , isAdmin , deleteTool )

export default toolRouter