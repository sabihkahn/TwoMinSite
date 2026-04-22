import express, {Application, Request, Response} from "express";
import logger from "./utils/logger";
import 'dotenv/config'
import {DBconnection} from './db/db'
import userRoutes from './routes/userRoutes'


DBconnection()

const app:Application = express()

app.use(express.json())
app.use('/auth/user',userRoutes)

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