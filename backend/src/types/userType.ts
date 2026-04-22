import { Document } from "mongoose";


export interface Usertype extends Document {

name:string,
email:string,
password:string,
websites:[{
    theme:string,
    shopname:string,
    shopdescription:string,
    shoplogo:string,
    shopemail:string,
    shoplinks:[{link:string}],
    shopadress:string,
    shophomepageimg:string,
    shopProducts:[{
        
        productname:string,
        quantity:number,
        productdescription:string,
        productmainphoto:string,
        productextraphotos:[{imagesproduct:string}],
        reviews:[{name:string,message:string}],
        

    }]
    
}],
createdAt: Date;
updatedAt: Date;

}