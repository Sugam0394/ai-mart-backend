import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema({
name : {
    type : String,
    required : true,
    trim : true
    
},
email : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    trim : true
},
password : {
    type : String,
    required : true,
    minlength : 7
},
role : {
    type : String,
    enum : ['user' , 'admin'] 
},
profilePicture : {
    type : String,
    default : ''

},
isVerified : {
    type : Boolean,
    default : false
},
refreshToken : {
    type : String,
    default : ''
},
lastLogin: {
    type : Date
},

} , {timestamps: true})



// password hashing before save
userSchema.pre('save' , async function (next) {
    if (!this.isModified('password')) 
        return next();
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password , salt)
        next();
    
})

// Method to heck password 
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password , this.password)
}


// Access Token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            id : this._id ,
            role : this.role
        },
        process.env.ACCESS_TOKEN_SECRET ,
        {expiresIn : '15m'}
    )
}


// Refresh Token 
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {id : this._id ,
         role : this.role
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn : '7d'}
    )
}

export const User = mongoose.model('User' , userSchema)