import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import jwt from 'jsonwebtoken'
import { User } from "../models/usermodels.js";
 

const generateToken = asyncHandler(async(req , res) => {

    const incomingToken = req.cookies.refreshToken || req.body.refreshToken
    if (!incomingToken) {
        throw new ApiError(401 , 'UnAuthorized reguest')
    }


    const decodedToken = jwt.verify(
        incomingToken,
        process.env.REFRESH_TOKEN_SECRET
    )


    const user = await User.findById(decodedToken?.id)
    if (!user) {
        throw new ApiError(401 , 'Invalid refresh Token')
    }

    if (incomingToken  !== user?.refreshToken) {
        throw new ApiError(401 , 'Token is expiry')
    }

    const options = {
        httpOnly : true,
        secure : true
    }

    const accessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken;

    await user.save({validateBeforeSave : false})

    return res.status(200)
    .clearCookie('accessToken' , accessToken , options)
    .clearCookie('refreshToken' , newRefreshToken , options)
    .json(new ApiResponse(
        200 ,
        { accessToken , refreshToken : newRefreshToken},
        "Access token refreshed successfully"
    ))
})

export default generateToken