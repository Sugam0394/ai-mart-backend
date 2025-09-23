import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { User } from "../models/usermodels.js";


const registerAdmin = asyncHandler(async(req , res) => {
res.status(201).json({
   message : 'Hey Sugam '
})
})

export default registerAdmin