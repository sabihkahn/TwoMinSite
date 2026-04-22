import { Request,Response } from "express"
import logger from "../utils/logger"

export const register = async(req:Request,res:Response) =>{
try {
     
        res.status(200).send({message:"hello from userController"})
        
     
} catch (error) {
    res.status(500).send({message:"Internal server error"})
    logger.error("An error occur in usercontroller while register")
}
}