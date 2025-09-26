import mongoose,{Schema} from "mongoose";

const reviewSchema = new mongoose.Schema({
user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true
},
tool : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Tool',
    required : true,
},
rating : {
    type : Number,
    required : true,
    min : [1 , 'Rating must be at least 1'],
    max: [5, "Rating cannot exceed 5"]
},
comment : {
    type : String,
    trim : true,
},



}, {timestamps:true})

reviewSchema.index({user : 1, tool : 1 }, {unique : true})

export const Review = mongoose.model('Review' , reviewSchema)