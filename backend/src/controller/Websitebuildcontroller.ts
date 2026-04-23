import { Request, Response } from "express";
import logger from "../utils/logger";
import { CreateWebsiteSchema } from "../zodprotection/zodCreatewebsiteSchema";
import Usermodel from "../models/usermodel";
import mongoose from "mongoose";

interface Requestwithid extends Request {
  id?: any;
}

export const CreateWebsite = async (req: Requestwithid, res: Response) => {
  try {
    const id = req.id?.id

    
    if (!id) {
      return res.status(401).send({ message: "Unauthorized: id not provided" });
    }
    
    const validationresult = CreateWebsiteSchema.safeParse(req.body);
    
    if (!validationresult.success) {
      return res
      .status(400)
      .send({ message: validationresult.error.flatten().fieldErrors });
    }
    
    const websiteData = validationresult.data;
    
    const checkifnameexist = await Usermodel.findOne({
  "websitesbrands.shopname": validationresult.data.shopname
});
    if(checkifnameexist){
      return res.status(400).send({message:"brand name already exist tryanother"})
    }

    const updatedUser = await Usermodel.findByIdAndUpdate(
      id,
      {
        $push: { websitesbrands: websiteData }
      },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(201).send({
      message: "Website created successfully",
    });

  } catch (error) {
    logger.error("Error in createWebsite controller", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};



export const getwebsite = async(req:Requestwithid,res:Response)=>{
try {
  const {webname} = req.params
  const userweb = await Usermodel.findOne( 
  {  "websitesbrands.shopname": webname },
  { "websitesbrands.$": 1 }

  )
  // next todo 

// 1: set the auth for not having spaces and weird character in shopname or webname
// 2: create a fuction which will return the htmlcode of string based on theme we can get from webname 
// 3:create add product route for the shop




  if(!userweb){
    return res.status(400).send({message:"website does't exist"})

  }

  res.status(200).send({userweb})
  
  
} catch (error) {
    logger.error("Error in gettingwebsite controller", error);
    return res.status(500).send({ message: "Internal server error" });
}
}