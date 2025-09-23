import DB_NAME from "../constant.js";
import mongoose from "mongoose";

const connectDB = async() => {
    try {
        // logic here
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log( ` ✅ MONGODB CONNECTED !! DB:HOST : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(` ❌ MONGODB CONNECTION FAILED !!`, error )
        process.exit(1)
    }
}

export default connectDB