import { Request, Response } from "express";
import logger from "../utils/logger";
import Usermodel from "../models/usermodel";
import { RegisterSchema } from '../zodprotection/zodUserRegisterSchema';
import Bcrypt from 'bcrypt';
import { genrateToken } from "../utils/jwt";
import { LoginSchema } from "../zodprotection/zodUserLoginSchema";
import { updateprofileschema } from "../zodprotection/zodupdatepofile";

interface reqwithid extends Request{
    id?:any
}

export const register = async (req: Request, res: Response) => {

    const validationResult = RegisterSchema.safeParse(req.body);

    if (!validationResult.success) {
        return res.status(400).send({ message: validationResult.error.flatten().fieldErrors });
    }

    try {
        const { name, email, password } = validationResult.data;


        const existingUser = await Usermodel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: "User already exists" });
        }


        const salt = await Bcrypt.genSalt(10);
        const hashpass = await Bcrypt.hash(password, salt);

        //  CREATE THE USER
        const user = await Usermodel.create({ name, email, password: hashpass });

        //  GENERATE TOKEN  
        const token = genrateToken(user._id.toString());

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        return res.status(201).send({ message: "User created successfully"});

    } catch (error) {
        logger.error("An error occurred in usercontroller while register", error);
        return res.status(500).send({ message: "Internal server error" });
    }
};



export const login = async (req: Request, res: Response) => {


    const validationResult = LoginSchema.safeParse(req.body);

    if (!validationResult.success) {
        return res.status(400).send({
            message: "Validation failed",
            errors: validationResult.error.flatten().fieldErrors
        });
    }

    try {
        const { email, password } = validationResult.data;

        if (!email || !password) {
            return res.status(400).send({ message: "all fields are required" })
        }

        const user = await Usermodel.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).send({ message: "Invalid email or password" });
        }


        const isMatch = await Bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send({ message: "Invalid email or password" });
        }


        const token = genrateToken(user._id.toString());


        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        // 6. Success Response
        return res.status(200).send({
            message: "Login successful",
        });

    } catch (error) {
        logger.error("An error occurred in usercontroller while login", error);
        return res.status(500).send({ message: "Internal server error" });
    }
};


export const profile =  async (req: reqwithid, res: Response) => {
    try {
        const id = req.id?.id

        if(!id){
           return res.status(400).send({message:"id is not provided"})
        }

        const user = await Usermodel.findById(id).select({
            websites:0,
            websitesbrands:0
        })

        res.status(200).send({message:"profile get successfully",user:user})


    } catch (error) {
        logger.error("an error ocur in profile controller ",error)
        res.status(500).send({message:"Inernal server error"})
    }
}


export const updateprofile  =  async (req: reqwithid, res: Response) => {
     const validationResult = updateprofileschema.safeParse(req.body);

    if (!validationResult.success) {
        return res.status(400).send({
            message: "Validation failed",
            errors: validationResult.error.flatten().fieldErrors
        });
    }
try {

    const id = req.id?.id
    const {password,name} = validationResult.data
  

   

    const user = await Usermodel.findById({_id:id})

    if(!user){
        return res.status(400).send({message:"no user found"})
    }

      
     const hash = await Bcrypt.hash(password,10)
     user.password = password
     user.name = name
     await user.save()
  
    res.status(200).send({message:"user updated successfully"})

} catch (error) {
    res.status(500).send({message:"internal server error"})
    logger.error("an error occur in update profile ===> ",error)
}
}


export const checkController = async (req: reqwithid, res: Response) => {
    try {
        const id = req.id?.id
        if(!id){
            return res.status(400).send({message:"unauthorized"})
        }
        const user = await Usermodel.findById({_id:id}).select({
            password:0,
            websites:0,
            websitesbrands:0
        })
        if(!user){
            return res.status(400).send({message:"user don't found unauthorized"})
        }

        res.status(200).send({message:"successfully done"})
    } catch (error) {
        logger.error("an error occur in checkcontroller ===> ",error)
        res.status(500).send({message:"internal server error"})
    }
}
