import { Document } from "mongoose";


export interface Usertype extends Document {

    name: string,
    email: string,
    password: string,
    websitesbrands: [{
        theme: string,
        shopname: string,
        shopdescription: string,
        shoplogo: string,
        shopemail: string,
        shoplinks: [{ link: string }],
        shopadress: string,
        phone: { type: String },
        city: { type: String },
        country: { type: String },
        mapLocation: { type: String },
        shophomepageimg: string,
        shopProducts: [{

            productname: string,
            quantity: number,
            productdescription: string,
            productmainphoto: string,
            productextraphotos: [{ imagesproduct: string }],
            reviews: [{ name: string, message: string }],


        }]

    }],
    createdAt: Date;
    updatedAt: Date;

}