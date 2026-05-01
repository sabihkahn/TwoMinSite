

import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import logger from '../utils/logger'
import 'dotenv/config'
import User from '../models/usermodel'

interface Authrequenst extends Request {
    id?: any
}


export const checkcanuploadproduct = async (req: Authrequenst, res: Response, next: NextFunction) => {
    try {
        const userId = req.id?.id; 
        const {webname, webid} = req.body

        if (!userId) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        const user = await User.findById({_id:userId},{
            websitesbrands:{$elemMatch:{shopname:webname}}
        });


        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }


        const maxproducts = user.websitesbrands[0].maximumprodcts || 0
        const producttoal = user.websitesbrands[0].shopProducts.length || 0
         
        if(producttoal >= maxproducts){
            return res.status(400).send({message:"contact us to add more products"})
        }


        next();

    } catch (error) {
        logger.error("Error in checkcando middleware", error);
        res.status(500).send({ message: "Internal server error" });
    }
};