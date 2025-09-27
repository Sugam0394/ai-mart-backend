import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}));

app.use(express.json({limit : '20kb'}))
app.use(express.urlencoded({extended : true , limit:"20kb"}))
app.use(express.static('public'))
app.use(cookieParser());

// users routes declaration
import router from './routes/userroutes.js';
app.use('/api/v1/users' , router)

// admin routes declaration
 import adminRouter from './routes/adminroutes.js';
app.use('/api/v1/admin' , adminRouter) 

// CRUD TOOLS
import toolRouter from './routes/toolRoutes.js';
app.use('/api/v1/tools' , toolRouter )

// review routes 
import reviewRouter from './routes/reviewroutes.js';
app.use('/api/v1/reviews' , reviewRouter)


export default app