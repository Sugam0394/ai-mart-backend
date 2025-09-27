import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { User } from "../models/usermodels.js";
import uploadCloudinary from "../utils/cloudinary.js";
 

const generateToken = async(userId) => {
   try {
      // logic here
   const user = await User.findById(userId)
   const accessToken = user.generateAccessToken();
   const refreshToken = user.generateRefreshToken();

   user.refreshToken = refreshToken
 
   await user.save({validateBeforeSave : false});

   return { accessToken , refreshToken}


 
   } catch (error) {
      throw new ApiError(500 , 'Something went wrong while generate Tokens')
   }
}

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
const loginUser = asyncHandler(async(req , res) => {
   // user details
 const {email , password} = req.body;

 if (!email || !password) {
   throw new ApiError(400 , 'email and password required');

 }

 // user search
 const user = await User.findOne({email})
 if (!user) {
   throw new ApiError(404 , 'User does not exist')
 }

 // password validation
 const isPasswordValid = await user.comparePassword(password)

 if (!isPasswordValid) {
   throw new ApiError(401 , 'invalid user credentials')
 }

 const { accessToken , refreshToken } = await generateToken(user._id)

 const loggedInUser = await User.findById(user._id).select('-password -refreshToken')

 const options = {
   httpOnly : true,
   secure : true
 }

 return res.status(200).cookie('accessToken' , accessToken , options)
 .cookie('refreshToken' , refreshToken , options)
 .json(new ApiResponse(200 , {user : loggedInUser , accessToken , refreshToken } , "User logged in successfully"))

})


 
 

export {
 registerUser,
 loginUser , generateToken ,
 
 }