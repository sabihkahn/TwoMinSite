

import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import logger from '../utils/logger'
import 'dotenv/config'
import User from '../models/usermodel'

interface Authrequenst extends Request {
    id?: any
}

// so Authrequenst  helps us adding user in Request as it is not before so we extended it with the user and use it in parameter


export const checkcando = async (req: Authrequenst, res: Response, next: NextFunction) => {
    try {

        const id = req.id?.id
        const user = await User.findById(id)
        
       
        next()

    } catch (error) {
        res.status(500).send({ message: "internal server error" })
        logger.error("an error occur in checkcando middleware ", error)
    }



}