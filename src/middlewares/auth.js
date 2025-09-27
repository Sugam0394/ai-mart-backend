import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import jwt from 'jsonwebtoken'
import { User } from "../models/usermodels.js";

const verifyJWT  = asyncHandler(async(req , res , next) => {
 try {
    // login here
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer " , "")
    if (!token) {
        throw new ApiError(401 , 'unAuthorized required')
    }

    const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?.id).select('-password -refreshToken');
    if (!user) {
        throw new ApiError(401 , 'Invalid access token')
    }

    
    req.user = user;
    next()

 } catch (error) {
    throw new ApiError(401 , error?.message || 'invalid access token')
 }
})

export default verifyJWT