import express, {Application, Request, Response} from "express";
import logger from "./utils/logger";
import 'dotenv/config'
import {DBconnection} from './db/db'
import userRoutes from './routes/userRoutes'
import cookieparser from 'cookie-parser'
import {rateLimit} from 'express-rate-limit'
import websiteRoutes from './routes/GenrateWebsiteRoutes'
import dashbordroutes from './routes/DashboardRoutes'
import cors,{CorsOptions} from 'cors'
DBconnection()

const app:Application = express()



const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
})


const corsOptions: CorsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200 
};


app.use(limiter)
app.use(express.json())
app.use(cookieparser())
app.use(cors(corsOptions))

app.use('/auth/user',userRoutes)
app.use('/web',websiteRoutes)
app.use('/data',dashbordroutes)

app.get("/",(req:Request,res:Response)=>{
    try {
        logger.info("successfully get ")
        res.status(200).send({message:"all set project init"})
    } catch (error) {
        logger.error(error)
        res.status(500).send({message:"something went wrong"})
    }
})

const PORT:Number = 5000

app.listen(PORT,()=>{
    logger.info("Server started on http://localhost:5000")
})