import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { User } from "../models/usermodels.js";


const logout = asyncHandler(async(req , res) => {
 await User.findByIdAndUpdate(req.user._id ,
    { $set : {refreshToken : undefined}
},
{
    new : true
}
 )

 const options = {
    httpOnly : true,
    secure : true
 };

 return res.status(200)
 .clearCookie('accessToken' , options)
 .clearCookie('refreshToken' , options)
 .json( new ApiResponse (200 , {} , `${req.user.role} logged out successfully`))
})


export default logout