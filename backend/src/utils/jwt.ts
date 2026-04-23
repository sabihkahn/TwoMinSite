import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

export function genrateToken(id: string): string {


    const token = jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: "1d",
    });

    return token;


}