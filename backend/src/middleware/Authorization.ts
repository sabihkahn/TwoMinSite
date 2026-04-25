import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import logger from '../utils/logger'
import 'dotenv/config'

interface Authrequenst extends Request {
    id?: any
}

// so Authrequenst  helps us adding user in Request as it is not before so we extended it with the user and use it in parameter


export const Authorization = (req: Authrequenst, res: Response, next: NextFunction) => {
    try {

        const token = req.cookies?.jwt || req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(400).send({ message: "no token provided" })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET!)
       

        if (!decode) {
            return res.status(400).send({ message: "unauthorized" })
        }
        req.id = decode;
        next()

    } catch (error) {
        res.status(500).send({ message: "Unauthorized Token expired or invalid" })
        logger.error("an error occur in authorization ", error)
    }



}