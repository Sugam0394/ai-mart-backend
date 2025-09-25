import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import { Tool } from "../models/toolmodel.js";
 



// CREATE TOOL

const createTool = asyncHandler(async(req , res) => {
  const tool = await Tool.create({
   ...req.body ,
    createdBy : req.user._id

  })
    res.status(201).json({
        sucess : true,
        message : 'Tool creted successfully',
        data : tool
    })
})
// get Single tools by ID
const getTool = asyncHandler(async(req , res) => {
 const tool = await Tool.findById(req.params.id );

    if (!tool) {
        return next (new ApiError(`No tool found with ID ${req.params.id}` , 404))
    }
    res.status(200).json({
        success : true,
        message : "Tool fetched successfully",
        data : tool
    })
})
// getALLTOll
const getAllTool = asyncHandler(async(req , res) => {
    const tools = await Tool.find({createdBy : req.user._id});
    if (!tools) {
        return next (new ApiError(`No tools found with ID ${req.params.id}` , 404))
    }

    res.status(200).json({
        success : true,
        count : tools.length,
        tools
    })
    
})
// update tool by ID
const updateTool = asyncHandler(async(req , res) => {
const tool = await Tool.findByIdAndUpdate(req.params.id , req.body , {
    new : true,
    runValidators : true
})
if (!tool) {
    return next(new ApiError(`No tool found with ID ${req.params.id}` , 404))
}
res.status(200).json({
    success : true,
    message : 'Tool updated successfully',
    data : null
})
})

// delete Tool
const deleteTool = asyncHandler(async(req , res , next) => {
 const tool = await Tool.findByIdAndDelete(req.params.id);
 if (!tool) {
    return next (new ApiError(`No tool found with ID ${req.params.id}`))
 }
 res.status(200).json({
    success : true,
    message : 'Tool deleted sucessfully',
    data : null
 })
})


export  {

 createTool , getTool , getAllTool , updateTool , deleteTool 

}