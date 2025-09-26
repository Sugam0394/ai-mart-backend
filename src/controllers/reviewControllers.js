import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { Review } from "../models/reviewmodel.js";
import { Tool } from "../models/toolmodel.js";



// helper function 

 const updateToolRating = async(toolId) => {
    const reviews = await Review.find({tool : toolId})

   const avgRating = reviews.length > 0 
   ? (reviews.reduce((acc , item) =>  acc +  item.rating , 0) / reviews.length).toFixed(1) : 0;

    await Tool.findByIdAndUpdate(toolId , {
        averageRating : avgRating,
        numberOfReviews : reviews.length,
    });
 };

 // create Review
 
 const createReview = asyncHandler(async(req , res , next) => {
    const {tool , rating , comment} = req.body;

    const toolExists = await Tool.findById(tool);
    if (toolExists) {
        return next(new ApiError('Tool not found' , 404))
    }

    const existingReview = await Review.findOne({tool , user : req.user._id})
    if (existingReview) {
        return next (new ApiError('You alreaday reviewd this tool' , 400))
    }

    const review = await Review.create({
        user : req.user._id,
        tool : tool,
        rating ,
        comment
    })

    await updateToolRating(tool);

    res.status(201).json({
        success : true,
        message : 'Review added successfully'
    })
 })

 const getToolReview = asyncHandler(async(req , res) => {
    const reviews = await Review.find({tool : req.params.toolId})
    .populate("user" , "name email")
    .sort({createdAt : -1});

    res.status(200).json({
        success : true,
        count : reviews.length,
        data : reviews
    })
 })

 // update review
 const updateReview = asyncHandler(async(req , res , next) => {
    const { rating , comment} = req.body;

   const review = await Review.findOne({
    _id : req.params.id ,
    user : req.user._id
   })

    if (!review) {
        return next(new ApiError('Review not found or not authorized'))
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    await review.save();


    await updateToolRating(review.tool);

    res.status(200).json({
        success : true,
        message : 'Review updated successfully',
        data : review
    }) 

 })
 // delete review
 const deleteReview = asyncHandler(async(req , res , next) => {
const review = await Review.findOne({
    _id : req.params.id,
    user : req.user._id

})
if (!review) {
    return next (new ApiError('Review not found or not authorized' , 404))
}

await review.deleteOne();
await updateToolRating(review.tool)


res.status(200).json({
    success : true,
    message : 'Review deleted successfully'
})



 })



 export{
  createReview , getToolReview , updateReview , deleteReview
 } 

