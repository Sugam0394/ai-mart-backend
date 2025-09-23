 import dotenv from 'dotenv'
import connectDB from './db/index.js';
import app from './app.js';
dotenv.config();

const PORT = process.env.PORT || 3000;
 
 connectDB()
 .then(() => {
    app.listen(process.env.PORT , () => {
        console.log(` ✅ server running successfully on Port : ${PORT}`)
    })
 })
 .catch((error) => {
    console.log(` ❌ mongoDB connetion failed:` , error);
    process.exit(1) // error
 })