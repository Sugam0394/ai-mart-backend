import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { User } from "../models/usermodels.js";
import uploadCloudinary from "../utils/cloudinary.js";

const registerUser = asyncHandler(async(req , res) => {
// user details
 const { name , email , password} = req.body
 

 // validation
 if (!name || !email || !password) {
    throw new ApiError(400 , 'All fields are required')
 }
 // single email regex 

 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if (!emailRegex.test(email)) {
    throw new ApiError(400 , 'Invalid email forget')
 }

 // user find

 const existedUser = await User.findOne({
    $or : [{email}]
 })

  
if (existedUser) {
    throw new ApiError(409 , 'User with email is already exists')
}

// file handling

const profileImage = req.files?.profilePicture?.[0]?.path;

let image = null;

if (profileImage) {
    image = await uploadCloudinary(profileImage)
}

 // user create in db

 let user = await User.create({
    name,
    email ,
    password,
    profilePicture : image?.url || "",
 })

 const createdUser = await User.findById(user._id).select('-password -refreshToken')

 if (!createdUser) {
    throw new ApiError(500 , 'Something went wrong in createdUser')
 }

 return res.status(201).json(
    new ApiResponse(201 , createdUser , 'user registered successfully')
 )

})

export default registerUser