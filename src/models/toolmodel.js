 import mongoose , {Schema} from "mongoose";

 const toolSchema = new mongoose.Schema({
   name : {
    type : String,
    required : [true , 'Tool name is required'],
    trim : true,
   },
   description : {
    type : String,
    trim : true,
   },
   category : {
    type : String,
    trim : true,
    
   },
   url : {
    type : String,
    required : [true , 'Tool url is required']
   },
   field : {
    type : String,
    enum : ['students' , 'teacher'],
    required : true,
   },

   createdBy : {
     type : mongoose.Schema.Types.ObjectId,
     ref : 'User',
     required : true,  // onlu admin can create
   },
   reviews : [
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Review'
    }
]

 }
,
{
    timestamps : true
})

 export const Tool = mongoose.model('Tool' , toolSchema)