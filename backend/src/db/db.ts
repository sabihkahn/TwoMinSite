import mongoose from "mongoose";
import logger from "../utils/logger";


export const DBconnection = async() =>{

try {
    logger.info(process.env.Mongoose_URI)
await mongoose.connect(process.env.Mongoose_URI!).then((res)=>{
   logger.info("db connected success ✔")
})
    

} catch (error) {

    logger.error("error occur in db ",error)

}}

