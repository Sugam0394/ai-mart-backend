import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { User } from "../models/usermodels.js";
 
import uploadCloudinary from "../utils/cloudinary.js";

const generateToken = async(adminId) => {
  try {
    // logic here
    const admin = await User.findById(adminId)
    const accessToken = admin.generateAccessToken()
     const refreshToken = admin.generateRefreshToken();

     admin.refreshToken = refreshToken

     await admin.save({validateBeforeSave : false})
     return { accessToken , refreshToken}
  } catch (error) {
    throw new ApiError(500 , 'something went wrong while generate token')
  }
}

const registerAdmin = asyncHandler(async(req , res) => {
const { name , email , password} = req.body

// validation
if(!name || !email || !password){
   throw new ApiError(400 , 'All fields are required')
}

  // email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, 'Invalid email format');
  }

 //  check if admin exists
 const existedAdmin = await User.findOne({
   $or :[{email}]
 })

 if (existedAdmin) {
   throw new ApiError(409 , 'Admin with this email already exist')
 }

 // file handling
 let ImagePath = req.files?.profilePicture?.[0]?.path;

 let image = null;

 if (ImagePath) {
   image = await uploadCloudinary(ImagePath)
 }

 // create admin
 const user = await User.create({
   name,
   email,
   password,
   role : 'admin', // important
   profilePicture : image?.url || "",
 })


 const createdUser = await User.findById(user._id).select('-password -refreshToken');

 if (!createdUser) {
   throw new ApiError(500 , 'something went wrong while creating Admin' )
 }

 return res.status(201).json(
   new ApiResponse(201 , createdUser , 'admin registered successfully')
 )

})
const loginAdmin = asyncHandler(async(req , res) => {

  // admin details
  const { email , password} = req.body;

  if(!email || !password){
    throw new ApiError(400 , 'email and password required')
  }

  // admin search
  const admin = await User.findOne({email})

  if (!admin) {
    throw new ApiError(404 , 'user does not exist')
  }

  // password validation
  const isPasswordValid = await admin.comparePassword(password)

  if (!isPasswordValid) {
    throw new ApiError(401 , 'Invalid user credentials')
  }

  const {accessToken , refreshToken} = await generateToken(admin._id) 

  const loggedInUser = await User.findById(admin._id).select('-password -refreshToken')
 
 const options = {
   httpOnly : true,
   secure : true
 }

  
 return res.status(200).cookie('accessToken' , accessToken , options)
 .cookie('refreshToken' , refreshToken , options)
 .json(new ApiResponse(200 , {admin : loggedInUser , accessToken , refreshToken } , "admin logged in successfully"))


})

 

export  {
  registerAdmin , loginAdmin , generateToken}